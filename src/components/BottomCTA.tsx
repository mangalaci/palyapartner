'use client'

import Link from 'next/link'
import { useSession } from 'next-auth/react'
import SocialShareButtons from './SocialShareButtons'

export default function BottomCTA() {
  const { data: session } = useSession()

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
      {!session && (
        <>
          <h2 className="text-3xl font-bold text-white mb-4">
            Készen állsz?
          </h2>
          <p className="text-gray-300 mb-8 max-w-xl mx-auto">
            Regisztrálj most és találd meg a következő sportpartnered még ma!
          </p>
          <Link
            href="/regisztracio"
            className="bg-yellow-400 hover:bg-yellow-300 px-8 py-3 rounded-lg text-lg font-heading font-medium transition-colors shadow-lg hover:shadow-xl inline-block mb-8"
            style={{ color: '#003d1a' }}
          >
            Ingyenes regisztráció
          </Link>
        </>
      )}

      <div className={session ? '' : 'border-t border-white/10 pt-8'}>
        <p className="text-gray-400 mb-4">Oszd meg ismerőseiddel!</p>
        <SocialShareButtons />
      </div>
    </section>
  )
}
