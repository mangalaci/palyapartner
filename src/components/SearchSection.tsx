'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import PlayerCard from './PlayerCard'
import { SPORTS, LEVELS, CITIES, BUDAPEST_DISTRICTS } from '@/lib/types'

interface Player {
  id: string
  nickname: string
  city: string
  districts: string[]
  ageGroup: string
  sports: { sport: string; level: string }[]
}

export default function SearchSection() {
  const { data: session } = useSession()
  const [city, setCity] = useState('')
  const [district, setDistrict] = useState('')
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
    if (district) params.set('district', district)
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
    <section className="border-t border-b border-white/10">
      {/* Search Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <form onSubmit={handleSearch} className="space-y-3">
          <div className="flex flex-col sm:flex-row gap-3">
            <select
              value={city}
              onChange={(e) => {
                setCity(e.target.value)
                if (e.target.value !== 'Budapest') setDistrict('')
              }}
              className="flex-1 px-4 py-3 border border-white/20 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none bg-white/10 text-white"
            >
              <option value="" className="bg-field-dark text-white">Minden város</option>
              {CITIES.map((c) => (
                <option key={c} value={c} className="bg-field-dark text-white">
                  {c}
                </option>
              ))}
            </select>
            {city === 'Budapest' && (
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="flex-1 px-4 py-3 border border-white/20 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none bg-white/10 text-white"
              >
                <option value="" className="bg-field-dark text-white">Minden kerület</option>
                {BUDAPEST_DISTRICTS.map((d) => (
                  <option key={d} value={d} className="bg-field-dark text-white">
                    {d}
                  </option>
                ))}
              </select>
            )}
            <select
              value={sport}
              onChange={(e) => setSport(e.target.value)}
              className="flex-1 px-4 py-3 border border-white/20 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none bg-white/10 text-white"
            >
              <option value="" className="bg-field-dark text-white">Minden sport</option>
              {SPORTS.map((s) => (
                <option key={s} value={s} className="bg-field-dark text-white">
                  {s}
                </option>
              ))}
            </select>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="flex-1 px-4 py-3 border border-white/20 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none bg-white/10 text-white"
            >
              <option value="" className="bg-field-dark text-white">Minden szint</option>
              {LEVELS.map((l) => (
                <option key={l} value={l} className="bg-field-dark text-white">
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
          </div>
        </form>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <svg className="w-7 h-7 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Játékosok a közeledben
          </h2>
          {searched && (
            <span className="text-primary-400 font-medium">
              {players.length} találat
            </span>
          )}
        </div>

        {loading ? (
          <div className="text-center py-12 text-gray-400">Keresés...</div>
        ) : players.length > 0 ? (
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
                isLoggedIn={!!session}
              />
            ))}
          </div>
        ) : searched ? (
          <div className="text-center py-12 text-gray-400">
            Nem találtunk játékost a megadott szűrőkkel.
          </div>
        ) : null}
      </div>
    </section>
  )
}
