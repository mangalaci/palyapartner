'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { SPORTS, LEVELS, AGE_GROUPS, SPORT_ICONS } from '@/lib/types'
import CitySelect from '@/components/CitySelect'

export default function ProfilePage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [nickname, setNickname] = useState('')
  const [city, setCity] = useState('')
  const [districts, setDistricts] = useState<string[]>([])
  const [ageGroup, setAgeGroup] = useState('')
  const [bio, setBio] = useState('')
  const [sports, setSports] = useState<{ sport: string; level: string }[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [stats, setStats] = useState<{ totalMatches: number; organizedCount: number; sportCounts: Record<string, number> } | null>(null)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/bejelentkezes')
      return
    }

    if (session?.user?.id) {
      fetch(`/api/users/${session.user.id}`)
        .then((res) => res.json())
        .then((data) => {
          setNickname(data.nickname || '')
          setCity(data.city || '')
          setDistricts(data.districts || [])
          setAgeGroup(data.ageGroup || '')
          setBio(data.bio || '')
          setSports(data.sports || [])
          setStats(data.stats || null)
          setLoading(false)
        })
        .catch(() => setLoading(false))
    }
  }, [session, status, router])

  function addSport() {
    setSports([...sports, { sport: '', level: '' }])
  }

  function removeSport(index: number) {
    setSports(sports.filter((_, i) => i !== index))
  }

  function updateSport(index: number, field: 'sport' | 'level', value: string) {
    const updated = [...sports]
    updated[index][field] = value
    setSports(updated)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setMessage('')

    const validSports = sports.filter((s) => s.sport && s.level)

    try {
      const res = await fetch(`/api/users/${session!.user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nickname,
          city,
          districts,
          ageGroup,
          bio,
          sports: validSports,
        }),
      })

      if (res.ok) {
        setMessage('Profil sikeresen mentve!')
      } else {
        const data = await res.json()
        setMessage(data.error || 'Hiba történt.')
      }
    } catch {
      setMessage('Hiba történt a mentés során.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 text-center text-gray-400">
        Betöltés...
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-white mb-8">Profilom</h1>

      {/* Statisztikák */}
      {stats && (
        <div className="bg-white/10 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Statisztikáim</h2>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-white/10 rounded-lg p-4 text-center">
              <p className="text-3xl font-bold text-primary-400">{stats.totalMatches}</p>
              <p className="text-sm text-gray-300">meccs</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4 text-center">
              <p className="text-3xl font-bold text-primary-400">{stats.organizedCount}</p>
              <p className="text-sm text-gray-300">szervezett</p>
            </div>
          </div>
          {Object.keys(stats.sportCounts).length > 0 && (
            <div>
              <p className="text-sm text-gray-400 mb-2">Sportágak:</p>
              <div className="flex flex-wrap gap-2">
                {Object.entries(stats.sportCounts)
                  .sort(([, a], [, b]) => b - a)
                  .map(([sport, count]) => (
                    <span key={sport} className="bg-white/10 text-gray-200 px-3 py-1.5 rounded-full text-sm">
                      {SPORT_ICONS[sport] || ''} {sport}: {count}
                    </span>
                  ))}
              </div>
            </div>
          )}
          {stats.totalMatches === 0 && (
            <p className="text-gray-400 text-sm">Még nem voltál meccsen. Csatlakozz eghez!</p>
          )}
        </div>
      )}

      <h2 className="text-xl font-semibold text-white mb-4">Profil szerkesztése</h2>

      {message && (
        <div
          className={`px-4 py-3 rounded-lg mb-6 ${
            message.includes('sikeresen')
              ? 'bg-green-500/20 border border-green-500/30 text-green-300'
              : 'bg-red-500/20 border border-red-500/30 text-red-300'
          }`}
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Becenév
          </label>
          <input
            type="text"
            required
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className="w-full px-4 py-2.5 border border-white/20 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none bg-white/10 text-white placeholder:text-gray-500"
          />
        </div>

        <CitySelect
          city={city}
          districts={districts}
          onCityChange={setCity}
          onDistrictsChange={setDistricts}
          required
        />

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Korosztály
          </label>
          <select
            required
            value={ageGroup}
            onChange={(e) => setAgeGroup(e.target.value)}
            className="w-full px-4 py-2.5 border border-white/20 rounded-lg outline-none bg-white/10 text-white"
          >
            <option value="" className="bg-field-dark text-white">Válassz korosztályt</option>
            {AGE_GROUPS.map((ag) => (
              <option key={ag} value={ag} className="bg-field-dark text-white">{ag} éves</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Sportok és szintek
          </label>
          {sports.map((s, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <select
                value={s.sport}
                onChange={(e) => updateSport(i, 'sport', e.target.value)}
                className="flex-1 px-4 py-2.5 border border-white/20 rounded-lg outline-none bg-white/10 text-white"
              >
                <option value="" className="bg-field-dark text-white">Válassz sportot</option>
                {SPORTS.map((sp) => (
                  <option key={sp} value={sp} className="bg-field-dark text-white">{sp}</option>
                ))}
              </select>
              <select
                value={s.level}
                onChange={(e) => updateSport(i, 'level', e.target.value)}
                className="flex-1 px-4 py-2.5 border border-white/20 rounded-lg outline-none bg-white/10 text-white"
              >
                <option value="" className="bg-field-dark text-white">Szint</option>
                {LEVELS.map((l) => (
                  <option key={l} value={l} className="bg-field-dark text-white">{l}</option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => removeSport(i)}
                className="px-3 py-2 text-red-400 hover:bg-red-500/20 rounded-lg"
              >
                X
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addSport}
            className="text-primary-400 hover:text-primary-300 text-sm font-medium mt-1"
          >
            + Sport hozzáadása
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Bemutatkozás
          </label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={3}
            placeholder="Néhány szó magadról..."
            className="w-full px-4 py-2.5 border border-white/20 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none bg-white/10 text-white placeholder:text-gray-500 resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={saving}
          className="w-full bg-primary-500 hover:bg-primary-600 text-white py-3 rounded-lg font-medium transition-colors disabled:opacity-50"
        >
          {saving ? 'Mentés...' : 'Mentés'}
        </button>
      </form>
    </div>
  )
}
