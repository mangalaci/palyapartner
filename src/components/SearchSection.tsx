'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import PlayerCard from './PlayerCard'
import { SPORTS, LEVELS } from '@/lib/types'

interface Player {
  id: string
  nickname: string
  city: string
  ageGroup: string
  sports: { sport: string; level: string }[]
}

export default function SearchSection() {
  const { data: session } = useSession()
  const [city, setCity] = useState('')
  const [sport, setSport] = useState('')
  const [level, setLevel] = useState('')
  const [players, setPlayers] = useState<Player[]>([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)

  async function handleSearch(e?: React.FormEvent) {
    e?.preventDefault()
    setLoading(true)
    setSearched(true)

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
    handleSearch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section className="bg-gray-50 border-t border-b border-gray-200">
      {/* Search Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Város (pl. Budapest)"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
              />
            </div>
          </div>
          <select
            value={sport}
            onChange={(e) => setSport(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none bg-white"
          >
            <option value="">Minden sport</option>
            {SPORTS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none bg-white"
          >
            <option value="">Minden szint</option>
            {LEVELS.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Keresés
          </button>
        </form>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <svg className="w-7 h-7 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Játékosok a közeledben
          </h2>
          {searched && (
            <span className="text-primary-500 font-medium">
              {players.length} találat
            </span>
          )}
        </div>

        {loading ? (
          <div className="text-center py-12 text-gray-500">Keresés...</div>
        ) : players.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {players.map((player) => (
              <PlayerCard
                key={player.id}
                id={player.id}
                nickname={player.nickname}
                city={player.city}
                sports={player.sports}
                ageGroup={player.ageGroup}
                isLoggedIn={!!session}
              />
            ))}
          </div>
        ) : searched ? (
          <div className="text-center py-12 text-gray-500">
            Nem találtunk játékost a megadott szűrőkkel.
          </div>
        ) : null}
      </div>
    </section>
  )
}
