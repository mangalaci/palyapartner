'use client'

import { useState, useEffect, useRef } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter, useParams } from 'next/navigation'

interface Message {
  id: string
  senderId: string
  content: string
  createdAt: string
  sender: { id: string; nickname: string }
}

export default function ChatPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const params = useParams()
  const partnerId = params.id as string
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [partnerName, setPartnerName] = useState('')
  const [sending, setSending] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/bejelentkezes')
      return
    }
  }, [status, router])

  // Fetch partner name
  useEffect(() => {
    fetch(`/api/users/${partnerId}`)
      .then((res) => res.json())
      .then((data) => setPartnerName(data.nickname || ''))
      .catch(() => {})
  }, [partnerId])

  // Fetch messages
  useEffect(() => {
    if (!session) return

    function fetchMessages() {
      fetch(`/api/messages/${partnerId}`)
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) setMessages(data)
        })
        .catch(() => {})
    }

    fetchMessages()
    const interval = setInterval(fetchMessages, 5000)
    return () => clearInterval(interval)
  }, [session, partnerId])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  async function handleSend(e: React.FormEvent) {
    e.preventDefault()
    if (!newMessage.trim() || sending) return

    setSending(true)
    try {
      const res = await fetch(`/api/messages/${partnerId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: newMessage }),
      })

      if (res.ok) {
        const msg = await res.json()
        setMessages((prev) => [...prev, msg])
        setNewMessage('')
      }
    } catch {
      // ignore
    } finally {
      setSending(false)
    }
  }

  if (!session) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 text-center text-gray-400">
        Betöltés...
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-4 flex flex-col" style={{ height: 'calc(100vh - 40px)' }}>
      {/* Header */}
      <div className="flex items-center gap-3 py-3 border-b border-white/10 mb-4">
        <button onClick={() => router.push('/uzenetek')} className="text-gray-400 hover:text-white">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="w-10 h-10 rounded-full bg-primary-500/20 flex items-center justify-center text-primary-300 font-semibold border-2 border-primary-500/30">
          {partnerName.charAt(0)?.toUpperCase() || '?'}
        </div>
        <h2 className="font-semibold text-white">{partnerName}</h2>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-3 mb-4">
        {messages.map((msg) => {
          const isMine = msg.senderId === session.user.id
          return (
            <div
              key={msg.id}
              className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[75%] px-4 py-2.5 rounded-2xl ${
                  isMine
                    ? 'bg-primary-500 text-white rounded-br-md'
                    : 'bg-white/10 text-gray-200 rounded-bl-md'
                }`}
              >
                <p>{msg.content}</p>
                <p
                  className={`text-xs mt-1 ${
                    isMine ? 'text-primary-200' : 'text-gray-500'
                  }`}
                >
                  {new Date(msg.createdAt).toLocaleTimeString('hu-HU', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            </div>
          )
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Send message */}
      <form onSubmit={handleSend} className="flex gap-2 pb-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Írj üzenetet..."
          className="flex-1 px-4 py-3 border border-white/20 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none bg-white/10 text-white placeholder:text-gray-500"
        />
        <button
          type="submit"
          disabled={!newMessage.trim() || sending}
          className="bg-primary-500 hover:bg-primary-600 text-white px-5 py-3 rounded-xl font-medium transition-colors disabled:opacity-50"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </button>
      </form>
    </div>
  )
}
