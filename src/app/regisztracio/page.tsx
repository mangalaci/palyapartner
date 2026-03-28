'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { SPORTS, LEVELS, AGE_GROUPS } from '@/lib/types'
import CitySelect from '@/components/CitySelect'

export default function RegisterPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [nickname, setNickname] = useState('')
  const [city, setCity] = useState('')
  const [districts, setDistricts] = useState<string[]>([])
  const [ageGroup, setAgeGroup] = useState('')
  const [bio, setBio] = useState('')
  const [sports, setSports] = useState<{ sport: string; level: string }[]>([
    { sport: '', level: '' },
  ])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

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
    setError('')
    setLoading(true)

    const validSports = sports.filter((s) => s.sport && s.level)
    if (validSports.length === 0) {
      setError('Legalább egy sportot és szintet meg kell adnod.')
      setLoading(false)
      return
    }

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          nickname,
          city,
          districts,
          ageGroup,
          bio,
          sports: validSports,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error)
        setLoading(false)
        return
      }

      router.push('/megerosites')
    } catch {
      setError('Hiba történt. Próbáld újra.')
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Regisztráció</h1>
      <p className="text-gray-600 mb-8">
        Hozd létre a profilod és találj sportpartnert!
      </p>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email *
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Jelszó *
            </label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Becenév *
          </label>
          <input
            type="text"
            required
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
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
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Korosztály *
          </label>
          <select
            required
            value={ageGroup}
            onChange={(e) => setAgeGroup(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none bg-white"
          >
            <option value="">Válassz korosztályt</option>
            {AGE_GROUPS.map((ag) => (
              <option key={ag} value={ag}>
                {ag} éves
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sportok és szintek *
          </label>
          {sports.map((s, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <select
                value={s.sport}
                onChange={(e) => updateSport(i, 'sport', e.target.value)}
                className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none bg-white"
              >
                <option value="">Válassz sportot</option>
                {SPORTS.map((sp) => (
                  <option key={sp} value={sp}>
                    {sp}
                  </option>
                ))}
              </select>
              <select
                value={s.level}
                onChange={(e) => updateSport(i, 'level', e.target.value)}
                className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none bg-white"
              >
                <option value="">Szint</option>
                {LEVELS.map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
              {sports.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeSport(i)}
                  className="px-3 py-2 text-red-500 hover:bg-red-50 rounded-lg"
                >
                  X
                </button>
              )}
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
            Bemutatkozás (opcionális)
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
          disabled={loading}
          className="w-full bg-primary-500 hover:bg-primary-600 text-white py-3 rounded-lg font-medium transition-colors disabled:opacity-50"
        >
          {loading ? 'Regisztráció...' : 'Regisztráció'}
        </button>
      </form>

      <p className="text-center text-gray-600 mt-6">
        Már van fiókod?{' '}
        <Link href="/bejelentkezes" className="text-primary-500 hover:underline">
          Bejelentkezés
        </Link>
      </p>
    </div>
  )
}
