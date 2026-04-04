'use client'

import Link from 'next/link'
import { useSession } from 'next-auth/react'

export default function JoinButton() {
  const { data: session } = useSession()

  if (session) return null

  return (
    <div className="text-center mt-12">
      <Link
        href="/regisztracio"
        className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-3 rounded-lg text-lg font-medium transition-colors inline-block"
      >
        Csatlakozz most!
      </Link>
    </div>
  )
}
