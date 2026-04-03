'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface Conversation {
  partnerId: string
  partnerName: string
  lastMessage: string
  lastDate: string
  unread: number
}

export default function MessagesPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/bejelentkezes')
      return
    }

    if (session) {
      fetch('/api/messages')
        .then((res) => res.json())
        .then((data) => {
          setConversations(data)
          setLoading(false)
        })
        .catch(() => setLoading(false))
    }
  }, [session, status, router])

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 text-center text-gray-400">
        Betöltés...
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-6">Üzenetek</h1>

      {conversations.length > 0 ? (
        <div className="space-y-2">
          {conversations.map((conv) => (
            <Link
              key={conv.partnerId}
              href={`/uzenetek/${conv.partnerId}`}
              className="block bg-white rounded-xl shadow-lg p-4 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 text-lg font-semibold border-2 border-primary-300">
                  {conv.partnerName.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">
                      {conv.partnerName}
                    </h3>
                    <span className="text-xs text-gray-400">
                      {new Date(conv.lastDate).toLocaleDateString('hu-HU')}
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm truncate">
                    {conv.lastMessage}
                  </p>
                </div>
                {conv.unread > 0 && (
                  <span className="bg-primary-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                    {conv.unread}
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-300">
          Még nincsenek üzeneteid. Keress játékosokat és küldj üzenetet!
        </div>
      )}
    </div>
  )
}
