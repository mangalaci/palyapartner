'use client'

import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

interface Stats {
  totalUsers: number
  verifiedUsers: number
  totalMatches: number
  totalGameRequests: number
  totalMessages: number
}

interface UserByCity {
  city: string
  count: number
}

interface UserBySport {
  sport: string
  count: number
}

interface RecentUser {
  id: string
  nickname: string
  email: string
  city: string
  districts: string[]
  ageGroup: string
  emailVerified: boolean
  createdAt: string
  photoUrl: string | null
  sports: { sport: string; level: string }[]
  _count: {
    sentMessages: number
    receivedMessages: number
    organizedMatches: number
    gameRequests: number
  }
}

interface AdminData {
  stats: Stats
  usersByCity: UserByCity[]
  usersBySport: UserBySport[]
  recentUsers: RecentUser[]
}

const ADMIN_EMAILS = [
  'laszlo.virtualtryon@gmail.com',
]

export default function AdminPage() {
  const { data: session, status } = useSession()
  const [data, setData] = useState<AdminData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [deleting, setDeleting] = useState<string | null>(null)

  useEffect(() => {
    if (status === 'loading') return
    if (!session?.user?.email || !ADMIN_EMAILS.includes(session.user.email)) {
      setLoading(false)
      setError('Nincs jogosultságod.')
      return
    }

    fetch('/api/admin/stats')
      .then((res) => {
        if (!res.ok) throw new Error('Unauthorized')
        return res.json()
      })
      .then(setData)
      .catch(() => setError('Hiba történt.'))
      .finally(() => setLoading(false))
  }, [session, status])

  if (loading) return <div className="p-8 text-center text-gray-300">Betöltés...</div>
  if (error) return <div className="p-8 text-center text-red-400 text-2xl font-bold">{error}</div>
  if (!data) return null

  const { stats, usersByCity, usersBySport, recentUsers } = data

  async function handleDelete(userId: string, nickname: string) {
    if (!confirm(`Biztosan törölni akarod "${nickname}" felhasználót?`)) return
    setDeleting(userId)
    try {
      const res = await fetch(`/api/admin/users/${userId}`, { method: 'DELETE' })
      if (!res.ok) {
        const body = await res.json()
        alert(body.error || 'Hiba történt')
        return
      }
      setData({
        stats: { ...stats, totalUsers: stats.totalUsers - 1 },
        usersByCity: data.usersByCity,
        usersBySport: data.usersBySport,
        recentUsers: recentUsers.filter((u) => u.id !== userId),
      })
    } catch {
      alert('Hiba történt')
    } finally {
      setDeleting(null)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-white mb-8">Admin</h1>

      {/* Összesítő kártyák */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10">
        {[
          { label: 'Felhasználók', value: stats.totalUsers },
          { label: 'Verifikált', value: stats.verifiedUsers },
          { label: 'Meccsek', value: stats.totalMatches },
          { label: 'Játékkérések', value: stats.totalGameRequests },
          { label: 'Üzenetek', value: stats.totalMessages },
        ].map((item) => (
          <div key={item.label} className="bg-black/30 border border-white/10 rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-white">{item.value}</div>
            <div className="text-sm text-gray-400 mt-1">{item.label}</div>
          </div>
        ))}
      </div>

      {/* Város és sportág statisztikák */}
      <div className="grid md:grid-cols-2 gap-8 mb-10">
        <div className="bg-black/30 border border-white/10 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Felhasználók városonként</h2>
          {usersByCity.length === 0 ? (
            <p className="text-gray-400">Nincs adat.</p>
          ) : (
            <div className="space-y-2">
              {usersByCity.map((item) => (
                <div key={item.city} className="flex justify-between items-center">
                  <span className="text-gray-300">{item.city}</span>
                  <span className="text-white font-medium bg-primary-500/20 px-3 py-0.5 rounded-full text-sm">
                    {item.count}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-black/30 border border-white/10 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Népszerű sportágak</h2>
          {usersBySport.length === 0 ? (
            <p className="text-gray-400">Nincs adat.</p>
          ) : (
            <div className="space-y-2">
              {usersBySport.map((item) => (
                <div key={item.sport} className="flex justify-between items-center">
                  <span className="text-gray-300">{item.sport}</span>
                  <span className="text-white font-medium bg-primary-500/20 px-3 py-0.5 rounded-full text-sm">
                    {item.count}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Felhasználók lista */}
      <div className="bg-black/30 border border-white/10 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-white mb-4">
          Felhasználók ({recentUsers.length})
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-left">
                <th className="pb-3 text-gray-400 font-medium">Név</th>
                <th className="pb-3 text-gray-400 font-medium">Email</th>
                <th className="pb-3 text-gray-400 font-medium">Város</th>
                <th className="pb-3 text-gray-400 font-medium">Sportok</th>
                <th className="pb-3 text-gray-400 font-medium">Kor</th>
                <th className="pb-3 text-gray-400 font-medium text-center">Verifikált</th>
                <th className="pb-3 text-gray-400 font-medium text-center">Üzenetek</th>
                <th className="pb-3 text-gray-400 font-medium">Regisztrált</th>
                <th className="pb-3 text-gray-400 font-medium text-center">Művelet</th>
              </tr>
            </thead>
            <tbody>
              {recentUsers.map((user) => (
                <tr key={user.id} className="border-b border-white/5 hover:bg-white/5">
                  <td className="py-3 text-white font-medium">{user.nickname}</td>
                  <td className="py-3 text-gray-300">{user.email}</td>
                  <td className="py-3 text-gray-300">
                    {user.city}
                    {user.districts.length > 0 && (
                      <span className="text-gray-500 text-xs ml-1">
                        ({user.districts.join(', ')})
                      </span>
                    )}
                  </td>
                  <td className="py-3 text-gray-300">
                    {user.sports.map((s) => `${s.sport} (${s.level})`).join(', ') || '-'}
                  </td>
                  <td className="py-3 text-gray-300">{user.ageGroup}</td>
                  <td className="py-3 text-center">
                    {user.emailVerified ? (
                      <span className="text-green-400">&#10003;</span>
                    ) : (
                      <span className="text-red-400">&#10007;</span>
                    )}
                  </td>
                  <td className="py-3 text-center text-gray-300">
                    {user._count.sentMessages + user._count.receivedMessages}
                  </td>
                  <td className="py-3 text-gray-400 text-xs">
                    {new Date(user.createdAt).toLocaleDateString('hu-HU')}
                  </td>
                  <td className="py-3 text-center">
                    {ADMIN_EMAILS.includes(user.email) ? (
                      <span className="text-gray-500 text-xs">admin</span>
                    ) : (
                      <button
                        onClick={() => handleDelete(user.id, user.nickname)}
                        disabled={deleting === user.id}
                        className="text-red-400 hover:text-red-300 text-xs font-medium disabled:opacity-50"
                      >
                        {deleting === user.id ? 'Törlés...' : 'Törlés'}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
