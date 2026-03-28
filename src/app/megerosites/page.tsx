'use client'

import Link from 'next/link'

export default function ConfirmationPage() {
  return (
    <div className="max-w-md mx-auto px-4 py-24 text-center">
      <div className="bg-white rounded-xl border border-gray-200 p-8">
        <div className="text-5xl mb-4">📧</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-3">
          Ellenőrizd az email fiókodat!
        </h1>
        <p className="text-gray-600 mb-6">
          Küldtünk egy megerősítő emailt. Kattints a benne lévő linkre a regisztráció befejezéséhez.
        </p>
        <p className="text-gray-400 text-sm mb-6">
          Ha nem találod az emailt, nézd meg a spam mappát is.
        </p>
        <Link
          href="/bejelentkezes"
          className="text-primary-500 hover:underline font-medium"
        >
          Vissza a bejelentkezéshez
        </Link>
      </div>
    </div>
  )
}
