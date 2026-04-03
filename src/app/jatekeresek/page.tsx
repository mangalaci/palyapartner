'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { SPORTS, LEVELS, SPORT_ICONS } from '@/lib/types'
import CitySelect from '@/components/CitySelect'

interface GameRequest {
  id: string
  sport: string
  level: string
  date: string
  city: string
  districts: string[]
  description: string | null
  user: { id: string; nickname: string; city: string; districts: string[] }
  responseCount: number
  hasApplied: boolean
}

export default function GameRequestsPage() {
  const { data: session } = useSession()
  const [requests, setRequests] = useState<GameRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [applyingId, setApplyingId] = useState<string | null>(null)

  // Form fields
  const [sport, setSport] = useState('')
  const [level, setLevel] = useState('')
  const [date, setDate] = useState('')
  const [city, setCity] = useState('')
  const [formDistricts, setFormDistricts] = useState<string[]>([])
  const [description, setDescription] = useState('')
  const [submitting, setSubmitting] = useState(false)

  // Filter state
  const [filterCity, setFilterCity] = useState('')
  const [filterSport, setFilterSport] = useState('')
  const [profileLoaded, setProfileLoaded] = useState(false)

  async function fetchRequests(cityFilter?: string, sportFilter?: string) {
    const params = new URLSearchParams()
    const c = cityFilter ?? filterCity
    const s = sportFilter ?? filterSport
    if (c) params.set('city', c)
    if (s) params.set('sport', s)

    try {
      const res = await fetch(`/api/game-requests?${params}`)
      const data = await res.json()
      setRequests(data)
    } catch {
      setRequests([])
    } finally {
      setLoading(false)
    }
  }

  // Load user's city as default filter
  useEffect(() => {
    if (!session) {
      fetchRequests()
      return
    }
    fetch(`/api/users/${session.user.id}`)
      .then((res) => res.json())
      .then((user) => {
        if (user.city) {
          setFilterCity(user.city)
          fetchRequests(user.city)
        } else {
          fetchRequests()
        }
      })
      .catch(() => fetchRequests())
      .finally(() => setProfileLoaded(true))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session])

  async function handleApply(requestId: string) {
    setApplyingId(requestId)
    try {
      const res = await fetch(`/api/game-requests/${requestId}/apply`, { method: 'POST' })
      if (res.ok) {
        setRequests((prev) =>
          prev.map((r) =>
            r.id === requestId
              ? { ...r, hasApplied: true, responseCount: r.responseCount + 1 }
              : r
          )
        )
      }
    } catch {
      // ignore
    } finally {
      setApplyingId(null)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)

    try {
      const res = await fetch('/api/game-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sport, level, date, city, districts: formDistricts, description }),
      })

      if (res.ok) {
        setSport('')
        setLevel('')
        setDate('')
        setCity('')
        setFormDistricts([])
        setDescription('')
        setShowForm(false)
        fetchRequests()
      }
    } catch {
      // ignore
    } finally {
      setSubmitting(false)
    }
  }

  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString('hu-HU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold" style={{ color: '#003d1a' }}>Játékkérések</h1>
        {session && (
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            {showForm ? 'Mégse' : '+ Új játékkérés'}
          </button>
        )}
      </div>

      <p className="text-gray-300 text-sm mb-6">
        Írd ki, milyen sporthoz keresel társat — mikor, hol és milyen szinten. Más játékosok jelentkezhetnek nálad üzenetben.
      </p>

      {!session && (
        <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-lg mb-6">
          <Link href="/bejelentkezes" className="underline">
            Jelentkezz be
          </Link>{' '}
          játékkérés feladásához.
        </div>
      )}

      {/* New game request form */}
      {showForm && (
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Új játékkérés</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <select
                required
                value={sport}
                onChange={(e) => setSport(e.target.value)}
                className="px-4 py-2.5 border border-gray-200 rounded-lg outline-none bg-white text-gray-900"
              >
                <option value="" className="bg-white text-gray-900">Válassz sportot</option>
                {SPORTS.map((s) => (
                  <option key={s} value={s} className="bg-white text-gray-900">{s}</option>
                ))}
              </select>
              <select
                required
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="px-4 py-2.5 border border-gray-200 rounded-lg outline-none bg-white text-gray-900"
              >
                <option value="" className="bg-white text-gray-900">Szint</option>
                {LEVELS.map((l) => (
                  <option key={l} value={l} className="bg-white text-gray-900">{l}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Időpont
              </label>
              <input
                type="datetime-local"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg outline-none bg-white text-gray-900"
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
              placeholder="Rövid leírás (opcionális)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg outline-none bg-white text-gray-900 placeholder:text-gray-400 resize-none"
            />
            <button
              type="submit"
              disabled={submitting}
              className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-2.5 rounded-lg font-medium transition-colors disabled:opacity-50"
            >
              {submitting ? 'Feladás...' : 'Játékkérés feladása'}
            </button>
          </form>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="text"
          placeholder="Város (pl. Budapest)"
          value={filterCity}
          onChange={(e) => setFilterCity(e.target.value)}
          className="flex-1 px-4 py-3 border border-white/40 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none bg-black/40 text-white font-heading placeholder:text-gray-500"
        />
        <select
          value={filterSport}
          onChange={(e) => setFilterSport(e.target.value)}
          className="flex-1 px-4 py-3 border border-white/40 rounded-lg outline-none bg-black/40 text-white font-heading"
        >
          <option value="" className="bg-field-dark text-white">Minden sport</option>
          {SPORTS.map((s) => (
            <option key={s} value={s} className="bg-field-dark text-white">{s}</option>
          ))}
        </select>
        <button
          onClick={() => fetchRequests()}
          className="bg-yellow-400 hover:bg-yellow-300 px-8 py-3 rounded-lg font-heading text-xl transition-colors flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
          style={{ color: '#003d1a' }}
        >
          Mehet!
        </button>
      </div>

      {/* Game requests list */}
      {loading ? (
        <div className="text-center py-12 text-gray-300">Betöltés...</div>
      ) : requests.length > 0 ? (
        <div className="space-y-4">
          {requests.map((req) => (
            <div
              key={req.id}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="inline-flex items-center gap-1 bg-primary-100 text-primary-700 text-sm px-3 py-1 rounded-full font-medium border border-primary-300">
                      {SPORT_ICONS[req.sport] || '🏅'} {req.sport}
                    </span>
                    <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                      {req.level}
                    </span>
                  </div>
                  <p className="text-gray-900 font-medium">
                    {formatDate(req.date)}
                  </p>
                  <p className="text-gray-500 text-sm mt-1">
                    {req.city}{req.districts.length > 0 ? ` (${req.districts.join(', ')})` : ''} &middot;{' '}
                    {session ? (
                      <Link href={`/jatekosok/${req.user.id}`} className="text-primary-600 hover:underline" onClick={(e) => e.stopPropagation()}>
                        {req.user.nickname}
                      </Link>
                    ) : '***'}
                  </p>
                  {req.description && (
                    <p className="text-gray-600 text-sm mt-2">{req.description}</p>
                  )}
                  {req.responseCount > 0 && (
                    <p className="text-primary-600 text-sm mt-2 font-medium">
                      {req.responseCount} jelentkező
                    </p>
                  )}
                </div>
                {session && session.user.id !== req.user.id && (
                  req.hasApplied ? (
                    <span className="px-4 py-2 rounded-lg font-medium text-center whitespace-nowrap bg-gray-200 text-gray-500">
                      Jelentkeztél
                    </span>
                  ) : (
                    <button
                      onClick={() => handleApply(req.id)}
                      disabled={applyingId === req.id}
                      className="px-4 py-2 rounded-lg font-medium transition-colors text-center whitespace-nowrap bg-primary-500 hover:bg-primary-600 text-white disabled:opacity-50"
                    >
                      {applyingId === req.id ? 'Küldés...' : 'Jelentkezem!'}
                    </button>
                  )
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-300">
          Jelenleg nincsenek nyitott játékkérések.
        </div>
      )}
    </div>
  )
}
