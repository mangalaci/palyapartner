'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setMessage('')
    setLoading(true)

    try {
      const res = await fetch('/api/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await res.json()

      if (res.ok) {
        setMessage(data.message)
        setSent(true)
      } else {
        setError(data.error)
      }
    } catch {
      setError('Hiba történt. Próbáld újra.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Elfelejtett jelszó</h1>
      <p className="text-gray-600 mb-8">
        Add meg az email címedet, és küldünk egy linket a jelszó visszaállításához.
      </p>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      {message && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
          {message}
        </div>
      )}

      {!sent ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary-500 hover:bg-primary-600 text-white py-3 rounded-lg font-medium transition-colors disabled:opacity-50"
          >
            {loading ? 'Küldés...' : 'Visszaállító email küldése'}
          </button>
        </form>
      ) : (
        <div className="text-center">
          <div className="text-5xl mb-4">📧</div>
          <p className="text-gray-600 mb-6">
            Nézd meg a postaládádat! Ha nem találod, ellenőrizd a spam mappát is.
          </p>
        </div>
      )}

      <p className="text-center text-gray-600 mt-6">
        <Link href="/bejelentkezes" className="text-primary-500 hover:underline">
          Vissza a bejelentkezéshez
        </Link>
      </p>
    </div>
  )
}
