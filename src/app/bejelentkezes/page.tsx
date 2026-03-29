'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import Link from 'next/link'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [showResend, setShowResend] = useState(false)
  const [resendMessage, setResendMessage] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })

    if (result?.error) {
      if (result.error.includes('EMAIL_NOT_VERIFIED')) {
        setError('Először erősítsd meg az email címedet! Nézd meg a postaládádat.')
        setShowResend(true)
      } else {
        setError('Hibás email vagy jelszó.')
      }
      setLoading(false)
      return
    }

    router.push('/')
    router.refresh()
  }

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Bejelentkezés</h1>
      <p className="text-gray-600 mb-8">Lépj be a fiókodba.</p>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
          {showResend && (
            <button
              onClick={async () => {
                setResendMessage('')
                const res = await fetch('/api/resend-verification', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ email }),
                })
                const data = await res.json()
                setResendMessage(data.message || data.error)
              }}
              className="block mt-2 text-sm text-primary-500 hover:underline font-medium"
            >
              Megerősítő email újraküldése
            </button>
          )}
          {resendMessage && (
            <p className="mt-2 text-sm text-green-700">{resendMessage}</p>
          )}
        </div>
      )}

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
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Jelszó
          </label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
          />
          <Link
            href="/elfelejtett-jelszo"
            className="block text-sm text-primary-500 hover:underline mt-1"
          >
            Elfelejtett jelszó?
          </Link>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary-500 hover:bg-primary-600 text-white py-3 rounded-lg font-medium transition-colors disabled:opacity-50"
        >
          {loading ? 'Bejelentkezés...' : 'Bejelentkezés'}
        </button>
      </form>

      <p className="text-center text-gray-600 mt-6">
        Nincs még fiókod?{' '}
        <Link href="/regisztracio" className="text-primary-500 hover:underline">
          Regisztráció
        </Link>
      </p>
    </div>
  )
}
