'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { TEAM_SPORTS, LEVELS, CITIES, BUDAPEST_DISTRICTS, SPORT_ICONS } from '@/lib/types'
import CitySelect from '@/components/CitySelect'

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
  city: string
  districts: string[]
  minPlayers: number
  maxPlayers: number
  description: string | null
  status: string
  organizer: { id: string; nickname: string }
  participants: Participant[]
}

export default function MatchesPage() {
  const { data: session } = useSession()
  const [matches, setMatches] = useState<Match[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)

  // Szűrők
  const [filterCity, setFilterCity] = useState('')
  const [filterSport, setFilterSport] = useState('')

  // Form
  const [sport, setSport] = useState('')
  const [level, setLevel] = useState('')
  const [date, setDate] = useState('')
  const [locationName, setLocationName] = useState('')
  const [city, setCity] = useState('')
  const [formDistricts, setFormDistricts] = useState<string[]>([])
  const [minPlayers, setMinPlayers] = useState('6')
  const [maxPlayers, setMaxPlayers] = useState('10')
  const [description, setDescription] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function fetchMatches() {
    try {
      const params = new URLSearchParams()
      if (filterCity) params.set('city', filterCity)
      if (filterSport) params.set('sport', filterSport)
      const res = await fetch(`/api/matches?${params}`)
      const data = await res.json()
      setMatches(data)
    } catch {
      setMatches([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMatches()
  }, [filterCity, filterSport])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)

    try {
      const res = await fetch('/api/matches', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sport, level, date, locationName, city,
          districts: formDistricts, minPlayers, maxPlayers, description,
        }),
      })

      if (res.ok) {
        setSport('')
        setLevel('')
        setDate('')
        setLocationName('')
        setCity('')
        setFormDistricts([])
        setMinPlayers('6')
        setMaxPlayers('10')
        setDescription('')
        setShowForm(false)
        fetchMatches()
      }
    } catch {
      // ignore
    } finally {
      setSubmitting(false)
    }
  }

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
    return match.participants.filter(p => p.type === 'player').length
  }

  function getStatusText(match: Match) {
    const players = getPlayerCount(match)
    const need = match.minPlayers - players
    if (match.status === 'full') return 'Betelt'
    if (match.status === 'confirmed') return 'Összejött!'
    if (need > 0) return `Még ${need} ember kell`
    return 'Nyitott'
  }

  function getStatusColor(match: Match) {
    if (match.status === 'full') return 'text-orange-600'
    if (match.status === 'confirmed') return 'text-green-600 font-semibold'
    return 'text-gray-500'
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-white">Meccsek</h1>
        {session && (
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            {showForm ? 'Mégse' : '+ Meccs szervezése'}
          </button>
        )}
      </div>

      {!session && (
        <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-lg mb-6">
          <Link href="/bejelentkezes" className="underline">
            Jelentkezz be
          </Link>{' '}
          meccs szervezéséhez vagy csatlakozáshoz.
        </div>
      )}

      {/* Szűrők */}
      <div className="flex gap-3 mb-6">
        <select
          value={filterCity}
          onChange={(e) => setFilterCity(e.target.value)}
          className="px-3 py-2 border border-gray-200 rounded-lg bg-white text-gray-900 text-sm"
        >
          <option value="">Minden város</option>
          {CITIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <select
          value={filterSport}
          onChange={(e) => setFilterSport(e.target.value)}
          className="px-3 py-2 border border-gray-200 rounded-lg bg-white text-gray-900 text-sm"
        >
          <option value="">Minden sport</option>
          {TEAM_SPORTS.map((s) => (
            <option key={s} value={s}>{SPORT_ICONS[s] || ''} {s}</option>
          ))}
        </select>
      </div>

      {/* Meccs létrehozás form */}
      {showForm && (
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Meccs szervezése</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <select
                required
                value={sport}
                onChange={(e) => setSport(e.target.value)}
                className="px-4 py-2.5 border border-gray-200 rounded-lg outline-none bg-white text-gray-900"
              >
                <option value="">Válassz sportot</option>
                {TEAM_SPORTS.map((s) => (
                  <option key={s} value={s}>{SPORT_ICONS[s] || ''} {s}</option>
                ))}
              </select>
              <select
                required
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="px-4 py-2.5 border border-gray-200 rounded-lg outline-none bg-white text-gray-900"
              >
                <option value="">Szint</option>
                {LEVELS.map((l) => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Időpont</label>
              <input
                type="datetime-local"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg outline-none bg-white text-gray-900"
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Min. létszám</label>
                <input
                  type="number"
                  required
                  min="2"
                  max="30"
                  value={minPlayers}
                  onChange={(e) => setMinPlayers(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg outline-none bg-white text-gray-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Max. létszám</label>
                <input
                  type="number"
                  required
                  min="2"
                  max="30"
                  value={maxPlayers}
                  onChange={(e) => setMaxPlayers(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg outline-none bg-white text-gray-900"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Helyszín neve</label>
              <input
                type="text"
                required
                placeholder="pl. Bikás park nagy pálya"
                value={locationName}
                onChange={(e) => setLocationName(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg outline-none bg-white text-gray-900 placeholder:text-gray-400"
              />
            </div>
            <CitySelect
              city={city}
              districts={formDistricts}
              onCityChange={setCity}
              onDistrictsChange={setFormDistricts}
              required
            />
            <textarea
              placeholder="Megjegyzés (opcionális, pl. Hozzatok vizet!)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg outline-none bg-white text-gray-900 placeholder:text-gray-400 resize-none"
            />
            <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded-lg text-sm">
              ⚠️ Nyilvános pálya esetén érdemes B-tervet is tartani!
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-2.5 rounded-lg font-medium transition-colors disabled:opacity-50"
            >
              {submitting ? 'Létrehozás...' : 'Meccs létrehozása'}
            </button>
          </form>
        </div>
      )}

      {/* Meccsek lista */}
      {loading ? (
        <div className="text-center py-12 text-gray-400">Betöltés...</div>
      ) : matches.length > 0 ? (
        <div className="space-y-4">
          {matches.map((match) => (
            <Link
              key={match.id}
              href={`/meccsek/${match.id}`}
              className="block bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="inline-flex items-center gap-1 bg-primary-100 text-primary-700 text-sm px-3 py-1 rounded-full font-medium border border-primary-300">
                  {SPORT_ICONS[match.sport] || '🏅'} {match.sport}
                </span>
                <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                  {match.level}
                </span>
              </div>
              <p className="text-gray-900 font-medium">{formatDate(match.date)}</p>
              <p className="text-gray-500 text-sm mt-1">
                {match.locationName} · {match.city}
                {match.districts.length > 0 ? ` (${match.districts.join(', ')})` : ''}
              </p>
              <div className="flex items-center justify-between mt-3">
                <span className="text-sm text-gray-600">
                  👥 {getPlayerCount(match)}/{match.minPlayers}-{match.maxPlayers}
                </span>
                <span className={`text-sm ${getStatusColor(match)}`}>
                  {getStatusText(match)}
                </span>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-400">
          Jelenleg nincsenek nyitott meccsek. Szervezz egyet!
        </div>
      )}
    </div>
  )
}
