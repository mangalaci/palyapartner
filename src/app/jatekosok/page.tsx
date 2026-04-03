'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import PlayerCard from '@/components/PlayerCard'
import { SPORTS, LEVELS } from '@/lib/types'

interface Player {
  id: string
  nickname: string
  city: string
  districts: string[]
  ageGroup: string
  photoUrl?: string | null
  sports: { sport: string; level: string }[]
}

export default function PlayersPage() {
  const { data: session } = useSession()
  const [players, setPlayers] = useState<Player[]>([])
  const [city, setCity] = useState('')
  const [sport, setSport] = useState('')
  const [level, setLevel] = useState('')
  const [loading, setLoading] = useState(true)

  async function fetchPlayers() {
    setLoading(true)
    const params = new URLSearchParams()
    if (city) params.set('city', city)
    if (sport) params.set('sport', sport)
    if (level) params.set('level', level)

    try {
      const res = await fetch(`/api/users?${params}`)
      const data = await res.json()
      setPlayers(data)
    } catch {
      setPlayers([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPlayers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 overflow-hidden">
      <h1 className="text-3xl font-bold mb-6" style={{ color: '#003d1a' }}>Játékosok</h1>

      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <input
          type="text"
          placeholder="Város (pl. Budapest)"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="flex-1 px-4 py-3 border border-white/40 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none bg-black/40 text-white font-heading placeholder:text-gray-500"
        />
        <select
          value={sport}
          onChange={(e) => setSport(e.target.value)}
          className="flex-1 px-4 py-3 border border-white/40 rounded-lg outline-none bg-black/40 text-white font-heading"
        >
          <option value="" className="bg-field-dark text-white">Minden sport</option>
          {SPORTS.map((s) => (
            <option key={s} value={s} className="bg-field-dark text-white">{s}</option>
          ))}
        </select>
        <select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          className="flex-1 px-4 py-3 border border-white/40 rounded-lg outline-none bg-black/40 text-white font-heading"
        >
          <option value="" className="bg-field-dark text-white">Minden szint</option>
          {LEVELS.map((l) => (
            <option key={l} value={l} className="bg-field-dark text-white">{l}</option>
          ))}
        </select>
        <button
          onClick={fetchPlayers}
          className="bg-yellow-400 hover:bg-yellow-300 px-8 py-3 rounded-lg font-heading text-xl transition-colors flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
          style={{ color: '#003d1a' }}
        >
          Mehet!
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-300">Betöltés...</div>
      ) : players.length > 0 ? (
        <>
          <p className="text-primary-400 font-medium mb-4">{players.length} találat</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {players.map((player) => (
              <PlayerCard
                key={player.id}
                id={player.id}
                nickname={player.nickname}
                city={player.city}
                districts={player.districts}
                sports={player.sports}
                ageGroup={player.ageGroup}
                photoUrl={player.photoUrl}
                isLoggedIn={!!session}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-12 text-gray-300">
          Nem találtunk játékost.
        </div>
      )}
    </div>
  )
}
