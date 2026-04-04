'use client'

import Link from 'next/link'
import { useSession } from 'next-auth/react'

export default function HeroButtons() {
  const { data: session } = useSession()

  if (session) return null

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
      <Link
        href="/regisztracio"
        className="bg-yellow-400 hover:bg-yellow-300 px-8 py-3 rounded-lg text-lg font-heading font-medium transition-colors shadow-lg hover:shadow-xl"
        style={{ color: '#003d1a' }}
      >
        Ingyenes regisztráció
      </Link>
      <Link
        href="/bejelentkezes"
        className="border-2 border-white/40 hover:border-white/70 text-white px-8 py-3 rounded-lg text-lg font-heading font-medium transition-colors"
      >
        Bejelentkezés
      </Link>
    </div>
  )
}
