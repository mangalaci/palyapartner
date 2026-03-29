'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { SPORT_ICONS } from '@/lib/types'

interface PlayerProfile {
  id: string
  nickname: string
  city: string
  districts: string[]
  ageGroup: string
  bio: string | null
  sports: { sport: string; level: string }[]
  createdAt: string
}

export default function PlayerProfilePage() {
  const { data: session } = useSession()
  const params = useParams()
  const [player, setPlayer] = useState<PlayerProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPlayer() {
      try {
        const res = await fetch(`/api/users/${params.id}`)
        if (res.ok) {
          const data = await res.json()
          setPlayer(data)
        }
      } catch {
        // ignore
      } finally {
        setLoading(false)
      }
    }
    fetchPlayer()
  }, [params.id])

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 text-center text-gray-400">
        Betöltés...
      </div>
    )
  }

  if (!player) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 text-center text-gray-400">
        Játékos nem található.
      </div>
    )
  }

  const initial = player.nickname.charAt(0).toUpperCase()
  const joinDate = new Date(player.createdAt).toLocaleDateString('hu-HU', {
    year: 'numeric',
    month: 'long',
  })

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center gap-6 mb-6">
          <div className="w-20 h-20 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 text-3xl font-semibold border-2 border-primary-300">
            {initial}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {session ? player.nickname : '***'}
            </h1>
            <p className="text-gray-500 flex items-center gap-1 mt-1">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {player.city}{player.districts.length > 0 ? ` (${player.districts.join(', ')})` : ''}
            </p>
            <p className="text-gray-400 text-sm mt-1">Tag {joinDate} óta</p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">
              Sportok és szintek
            </h2>
            <div className="space-y-2">
              {player.sports.map((s) => (
                <div
                  key={s.sport}
                  className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-3 border border-gray-200"
                >
                  <span className="font-medium text-gray-900 flex items-center gap-2">
                    {SPORT_ICONS[s.sport] || '🏅'} {s.sport}
                  </span>
                  <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full border border-gray-200">
                    {s.level}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            <div className="bg-gray-50 rounded-lg px-4 py-3 flex-1 border border-gray-200">
              <p className="text-sm text-gray-400">Korosztály</p>
              <p className="font-semibold text-gray-900">{player.ageGroup} éves</p>
            </div>
          </div>

          {player.bio && (
            <div>
              <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">
                Bemutatkozás
              </h2>
              <p className="text-gray-600">{player.bio}</p>
            </div>
          )}

          {session && session.user.id !== player.id && (
            <Link
              href={`/uzenetek/${player.id}`}
              className="block text-center bg-primary-500 hover:bg-primary-600 text-white py-3 rounded-lg font-medium transition-colors"
            >
              Üzenet küldése
            </Link>
          )}

          {!session && (
            <Link
              href="/bejelentkezes"
              className="block text-center bg-primary-500 hover:bg-primary-600 text-white py-3 rounded-lg font-medium transition-colors"
            >
              Jelentkezz be az üzenetküldéshez
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
