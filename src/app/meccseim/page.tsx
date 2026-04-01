'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { SPORT_ICONS } from '@/lib/types'

interface Participant {
  id: string
  type: string
  userId: string
  user: { id: string; nickname: string }
}

interface Match {
  id: string
  sport: string
  level: string
  date: string
  locationName: string
  city: string
  districts: string[]
  minPlayers: number
  maxPlayers: number
  description: string | null
  status: string
  organizerId: string
  organizer: { id: string; nickname: string }
  participants: Participant[]
}

interface MyMatches {
  upcoming: Match[]
  waitlisted: Match[]
  past: Match[]
}

export default function MyMatchesPage() {
  const { data: session, status } = useSession()
  const [data, setData] = useState<MyMatches | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'upcoming' | 'waitlisted' | 'past'>('upcoming')

  useEffect(() => {
    if (status !== 'authenticated') return

    fetch('/api/matches/my')
      .then((res) => res.json())
      .then((d) => setData(d))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [status])

  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString('hu-HU', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  function getPlayerCount(match: Match) {
    return match.participants.filter((p) => p.type === 'player').length
  }

  if (status === 'unauthenticated') {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <p className="text-gray-400 mb-4">Jelentkezz be a meccseid megtekintéséhez.</p>
        <Link href="/bejelentkezes" className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-2.5 rounded-lg font-medium transition-colors">
          Bejelentkezés
        </Link>
      </div>
    )
  }

  if (loading) {
    return <div className="text-center py-12 text-gray-400">Betöltés...</div>
  }

  const tabs = [
    { key: 'upcoming' as const, label: 'Következő', count: data?.upcoming.length || 0 },
    { key: 'waitlisted' as const, label: 'Várólistán', count: data?.waitlisted.length || 0 },
    { key: 'past' as const, label: 'Korábbi', count: data?.past.length || 0 },
  ]

  const currentList = data ? data[activeTab] : []

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-white mb-6">Meccseim</h1>

      {/* Tabok */}
      <div className="flex gap-1 mb-6 bg-white/10 rounded-lg p-1">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.key
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            {tab.label}
            {tab.count > 0 && (
              <span className={`ml-1.5 inline-flex items-center justify-center h-5 min-w-5 px-1 rounded-full text-xs font-bold ${
                activeTab === tab.key ? 'bg-primary-500 text-white' : 'bg-white/20 text-gray-300'
              }`}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Lista */}
      {currentList.length > 0 ? (
        <div className="space-y-4">
          {currentList.map((match) => (
            <Link
              key={match.id}
              href={`/meccsek/${match.id}`}
              className="block bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="inline-flex items-center gap-1 bg-primary-100 text-primary-700 text-sm px-3 py-1 rounded-full font-medium border border-primary-300">
                  {SPORT_ICONS[match.sport] || ''} {match.sport}
                </span>
                <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                  {match.level}
                </span>
                {match.organizerId === session?.user?.id && (
                  <span className="text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded-full border border-orange-200">
                    Szervező
                  </span>
                )}
                {activeTab === 'waitlisted' && (
                  <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full border border-blue-200">
                    Várólistán
                  </span>
                )}
              </div>
              <p className="text-gray-900 font-medium">{formatDate(match.date)}</p>
              <p className="text-gray-500 text-sm mt-1">
                {match.locationName} · {match.city}
                {match.districts.length > 0 ? ` (${match.districts.join(', ')})` : ''}
              </p>
              <div className="flex items-center justify-between mt-3">
                <span className="text-sm text-gray-600">
                  {getPlayerCount(match)}/{match.minPlayers}-{match.maxPlayers}
                </span>
                {activeTab === 'upcoming' && getPlayerCount(match) >= match.minPlayers && (
                  <span className="text-sm text-green-600 font-semibold">Összejött!</span>
                )}
                {activeTab === 'upcoming' && getPlayerCount(match) < match.minPlayers && (
                  <span className="text-sm text-gray-500">
                    Még {match.minPlayers - getPlayerCount(match)} ember kell
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-400">
          {activeTab === 'upcoming' && 'Nincs következő meccses. Nézd meg a nyitott meccseket!'}
          {activeTab === 'waitlisted' && 'Nincs várólistás meccses.'}
          {activeTab === 'past' && 'Még nem voltál meccsen.'}
        </div>
      )}

      {activeTab === 'upcoming' && currentList.length === 0 && (
        <div className="text-center mt-4">
          <Link href="/meccsek" className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-2.5 rounded-lg font-medium transition-colors">
            Meccsek böngészése
          </Link>
        </div>
      )}
    </div>
  )
}
