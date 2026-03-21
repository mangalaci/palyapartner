'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { SPORTS, LEVELS, AGE_GROUPS } from '@/lib/types'

export default function ProfilePage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [nickname, setNickname] = useState('')
  const [city, setCity] = useState('')
  const [ageGroup, setAgeGroup] = useState('')
  const [bio, setBio] = useState('')
  const [sports, setSports] = useState<{ sport: string; level: string }[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

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
          setAgeGroup(data.ageGroup || '')
          setBio(data.bio || '')
          setSports(data.sports || [])
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
      <div className="max-w-2xl mx-auto px-4 py-12 text-center text-gray-500">
        Betöltés...
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Profilom szerkesztése</h1>

      {message && (
        <div
          className={`px-4 py-3 rounded-lg mb-6 ${
            message.includes('sikeresen')
              ? 'bg-green-50 border border-green-200 text-green-700'
              : 'bg-red-50 border border-red-200 text-red-700'
          }`}
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Becenév
            </label>
            <input
              type="text"
              required
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Város
            </label>
            <input
              type="text"
              required
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Korosztály
          </label>
          <select
            required
            value={ageGroup}
            onChange={(e) => setAgeGroup(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none bg-white"
          >
            <option value="">Válassz korosztályt</option>
            {AGE_GROUPS.map((ag) => (
              <option key={ag} value={ag}>{ag} éves</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sportok és szintek
          </label>
          {sports.map((s, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <select
                value={s.sport}
                onChange={(e) => updateSport(i, 'sport', e.target.value)}
                className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg outline-none bg-white"
              >
                <option value="">Válassz sportot</option>
                {SPORTS.map((sp) => (
                  <option key={sp} value={sp}>{sp}</option>
                ))}
              </select>
              <select
                value={s.level}
                onChange={(e) => updateSport(i, 'level', e.target.value)}
                className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg outline-none bg-white"
              >
                <option value="">Szint</option>
                {LEVELS.map((l) => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => removeSport(i)}
                className="px-3 py-2 text-red-500 hover:bg-red-50 rounded-lg"
              >
                X
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addSport}
            className="text-primary-500 hover:text-primary-600 text-sm font-medium mt-1"
          >
            + Sport hozzáadása
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Bemutatkozás
          </label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={3}
            placeholder="Néhány szó magadról..."
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none resize-none"
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
