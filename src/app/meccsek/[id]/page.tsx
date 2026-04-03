'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { SPORT_ICONS } from '@/lib/types'
import MapPicker from '@/components/MapPicker'

interface Participant {
  id: string
  type: string
  user: { id: string; nickname: string }
}

interface Match {
  id: string
  sport: string
  level: string
  date: string
  locationName: string
  lat: number | null
  lng: number | null
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

export default function MatchDetailPage() {
  const { data: session } = useSession()
  const params = useParams()
  const [match, setMatch] = useState<Match | null>(null)
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState(false)

  async function fetchMatch() {
    try {
      const res = await fetch(`/api/matches/${params.id}`)
      if (res.ok) {
        const data = await res.json()
        setMatch(data)
      }
    } catch {
      // ignore
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMatch()
  }, [params.id])

  async function handleJoin() {
    setActionLoading(true)
    try {
      const res = await fetch(`/api/matches/${params.id}/join`, { method: 'POST' })
      if (res.ok) {
        fetchMatch()
      } else {
        const data = await res.json()
        alert(data.error)
      }
    } catch {
      // ignore
    } finally {
      setActionLoading(false)
    }
  }

  async function handleLeave() {
    setActionLoading(true)
    try {
      const res = await fetch(`/api/matches/${params.id}/leave`, { method: 'POST' })
      if (res.ok) {
        fetchMatch()
      } else {
        const data = await res.json()
        alert(data.error)
      }
    } catch {
      // ignore
    } finally {
      setActionLoading(false)
    }
  }

  if (loading) {
    return <div className="text-center py-12 text-gray-300">Betöltés...</div>
  }

  if (!match) {
    return <div className="text-center py-12 text-gray-300">Meccs nem található.</div>
  }

  const players = match.participants.filter(p => p.type === 'player')
  const waitlist = match.participants.filter(p => p.type === 'waitlist')
  const playerCount = players.length
  const isParticipant = match.participants.some(p => p.user.id === session?.user?.id)
  const isOrganizer = match.organizerId === session?.user?.id
  const myParticipation = match.participants.find(p => p.user.id === session?.user?.id)
  const isFull = playerCount >= match.maxPlayers
  const isConfirmed = playerCount >= match.minPlayers
  const need = Math.max(0, match.minPlayers - playerCount)

  const formattedDate = new Date(match.date).toLocaleDateString('hu-HU', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link href="/meccsek" className="text-green-300 hover:text-white text-sm mb-4 inline-block">
        ← Vissza a meccsekhez
      </Link>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Fejléc */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-3 mb-3">
            <span className="inline-flex items-center gap-1 bg-primary-100 text-primary-700 px-3 py-1 rounded-full font-medium border border-primary-300">
              {SPORT_ICONS[match.sport] || '🏅'} {match.sport}
            </span>
            <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
              {match.level}
            </span>
          </div>
          <p className="text-gray-900 text-lg font-semibold">{formattedDate}</p>
          <p className="text-gray-600 mt-1">{match.locationName}</p>
          <p className="text-gray-500 text-sm">
            {match.city}
            {match.districts.length > 0 ? ` (${match.districts.join(', ')})` : ''}
          </p>
        </div>

        {/* Térkép */}
        {match.lat && match.lng && (
          <div className="border-b border-gray-100 p-4">
            <MapPicker lat={match.lat} lng={match.lng} onLocationSelect={() => {}} readOnly />
            <div className="mt-2">
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${match.lat},${match.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:text-primary-700 font-medium text-sm"
              >
                Navigálj ide!
              </a>
            </div>
          </div>
        )}

        {/* Szervező és megjegyzés */}
        <div className="p-6 border-b border-gray-100">
          <p className="text-gray-600 text-sm">
            Szervező: <span className="font-medium text-gray-900">{match.organizer.nickname}</span>
          </p>
          {match.description && (
            <p className="text-gray-600 text-sm mt-2">{match.description}</p>
          )}
        </div>

        {/* Résztvevők */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">
              Résztvevők ({playerCount}/{match.minPlayers}-{match.maxPlayers})
            </h3>
            {isConfirmed ? (
              <span className="text-green-600 font-semibold text-sm">✅ Összejött!</span>
            ) : (
              <span className="text-orange-500 text-sm">Még {need} ember kell</span>
            )}
          </div>
          <div className="space-y-2">
            {players.map((p) => (
              <div key={p.id} className="flex items-center gap-2 text-gray-700">
                <span className="text-green-500">✅</span>
                <span>{p.user.nickname}</span>
                {p.user.id === match.organizerId && (
                  <span className="text-xs text-gray-400">(szervező)</span>
                )}
              </div>
            ))}
            {!isFull && (
              <div className="text-gray-400 text-sm mt-2">
                ⬜ Még {match.maxPlayers - playerCount} hely szabad
              </div>
            )}
          </div>

          {/* Várólista */}
          {waitlist.length > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <h4 className="text-sm font-medium text-gray-500 mb-2">Várólista</h4>
              {waitlist.map((p, i) => (
                <div key={p.id} className="flex items-center gap-2 text-gray-500 text-sm">
                  <span>{i + 1}.</span>
                  <span>{p.user.nickname}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Akció gombok */}
        <div className="p-6 space-y-3">
          {!session ? (
            <Link
              href="/bejelentkezes"
              className="block text-center bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Jelentkezz be a csatlakozáshoz
            </Link>
          ) : !isParticipant ? (
            <button
              onClick={handleJoin}
              disabled={actionLoading}
              className="w-full bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-medium transition-colors disabled:opacity-50"
            >
              {actionLoading ? 'Kérlek várj...' : isFull ? 'Várólistára feliratkozom' : 'Csatlakozom!'}
            </button>
          ) : (
            <>
              <div className="text-center text-green-600 font-medium py-2">
                {myParticipation?.type === 'waitlist'
                  ? `Várólistán vagy (${waitlist.findIndex(p => p.user.id === session.user.id) + 1}. helyen)`
                  : '✅ Csatlakoztál ehhez a meccshez'}
              </div>
              {!isOrganizer && (
                <button
                  onClick={handleLeave}
                  disabled={actionLoading}
                  className="w-full border border-red-300 text-red-600 hover:bg-red-50 px-6 py-3 rounded-lg font-medium transition-colors disabled:opacity-50"
                >
                  {actionLoading ? 'Kérlek várj...' : 'Kilépek'}
                </button>
              )}
            </>
          )}

          {session && !isOrganizer && (
            <Link
              href={`/uzenetek/${match.organizerId}`}
              className="block text-center border border-gray-200 text-gray-700 hover:bg-gray-50 px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Üzenet a szervezőnek
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
