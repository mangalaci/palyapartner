'use client'

import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

function ResetPasswordForm() {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  if (!token) {
    return (
      <div className="text-center">
        <div className="text-5xl mb-4">❌</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-3">Érvénytelen link</h1>
        <p className="text-gray-600 mb-6">Hiányzó token. Kérj új jelszó-visszaállítást.</p>
        <Link href="/elfelejtett-jelszo" className="text-primary-500 hover:underline font-medium">
          Elfelejtett jelszó
        </Link>
      </div>
    )
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setMessage('')

    if (password !== passwordConfirm) {
      setError('A két jelszó nem egyezik.')
      return
    }

    setLoading(true)

    try {
      const res = await fetch('/api/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      })

      const data = await res.json()

      if (res.ok) {
        setMessage(data.message)
        setSuccess(true)
      } else {
        setError(data.error)
      }
    } catch {
      setError('Hiba történt. Próbáld újra.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="text-center">
        <div className="text-5xl mb-4">✅</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-3">{message}</h1>
        <p className="text-gray-600 mb-6">Most már bejelentkezhetsz az új jelszavaddal.</p>
        <Link
          href="/bejelentkezes"
          className="inline-block bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          Bejelentkezés
        </Link>
      </div>
    )
  }

  return (
    <>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Új jelszó beállítása</h1>
      <p className="text-gray-600 mb-8">Add meg az új jelszavadat.</p>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Új jelszó
          </label>
          <input
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Új jelszó megerősítése
          </label>
          <input
            type="password"
            required
            minLength={6}
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary-500 hover:bg-primary-600 text-white py-3 rounded-lg font-medium transition-colors disabled:opacity-50"
        >
          {loading ? 'Mentés...' : 'Jelszó módosítása'}
        </button>
      </form>
    </>
  )
}

export default function ResetPasswordPage() {
  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <Suspense
        fallback={
          <div className="text-center py-12 text-gray-500">Betöltés...</div>
        }
      >
        <ResetPasswordForm />
      </Suspense>
    </div>
  )
}
