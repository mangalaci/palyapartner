'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

function VerifyContent() {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (!token) {
      setStatus('error')
      setMessage('Hiányzó megerősítő token.')
      return
    }

    fetch(`/api/verify?token=${token}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setStatus('error')
          setMessage(data.error)
        } else {
          setStatus('success')
          setMessage(data.message)
        }
      })
      .catch(() => {
        setStatus('error')
        setMessage('Hiba történt a megerősítés során.')
      })
  }, [token])

  return (
    <div className="bg-white/5 rounded-xl border border-white/10 p-8">
      {status === 'loading' && (
        <>
          <p className="text-4xl mb-4">⏳</p>
          <p className="text-gray-300">Megerősítés folyamatban...</p>
        </>
      )}

      {status === 'success' && (
        <>
          <p className="text-4xl mb-4">✅</p>
          <h1 className="text-2xl font-bold text-white mb-3">{message}</h1>
          <p className="text-gray-300 mb-6">
            Most már bejelentkezhetsz a fiókodba.
          </p>
          <Link
            href="/bejelentkezes"
            className="inline-block bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Bejelentkezés
          </Link>
        </>
      )}

      {status === 'error' && (
        <>
          <p className="text-4xl mb-4">❌</p>
          <h1 className="text-2xl font-bold text-white mb-3">Hiba történt</h1>
          <p className="text-gray-400 mb-6">{message}</p>
          <Link
            href="/regisztracio"
            className="text-primary-400 hover:underline font-medium"
          >
            Vissza a regisztrációhoz
          </Link>
        </>
      )}
    </div>
  )
}

export default function VerifyPage() {
  return (
    <div className="max-w-md mx-auto px-4 py-24 text-center">
      <Suspense
        fallback={
          <div className="bg-white/5 rounded-xl border border-white/10 p-8">
            <p className="text-4xl mb-4">⏳</p>
            <p className="text-gray-300">Megerősítés folyamatban...</p>
          </div>
        }
      >
        <VerifyContent />
      </Suspense>
    </div>
  )
}
