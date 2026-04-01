'use client'

import Link from 'next/link'
import { SPORT_ICONS } from '@/lib/types'

interface PlayerCardProps {
  id: string
  nickname: string
  city: string
  districts?: string[]
  sports: { sport: string; level: string }[]
  ageGroup: string
  isLoggedIn: boolean
}

function getInitial(name: string) {
  return name.charAt(0).toUpperCase()
}

function getLevelDots(level: string) {
  switch (level) {
    case 'Kezdő':
      return { filled: 1, color: 'bg-green-500' }
    case 'Középhaladó':
      return { filled: 2, color: 'bg-blue-500' }
    case 'Haladó':
      return { filled: 3, color: 'bg-red-500' }
    default:
      return { filled: 0, color: 'bg-gray-400' }
  }
}

export default function PlayerCard({
  id,
  nickname,
  city,
  districts,
  sports,
  ageGroup,
  isLoggedIn,
}: PlayerCardProps) {
  const mainLevel = sports.length > 0 ? sports[0].level : ''
  const dots = getLevelDots(mainLevel)

  return (
    <div className="bg-white rounded-xl shadow-lg p-5 hover:shadow-xl transition-shadow">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-12 h-12 rounded-full bg-primary-500 flex items-center justify-center text-white text-lg font-semibold flex-shrink-0">
          {getInitial(nickname)}
        </div>
        <div className="min-w-0">
          <h3 className="font-semibold text-gray-900 truncate">
            {isLoggedIn ? nickname : '***'}
          </h3>
          <p className="text-gray-500 text-xs truncate">
            {city}{districts && districts.length > 0 ? ` (${districts.join(', ')})` : ''}
          </p>
        </div>
        <div className="ml-auto flex items-center gap-2 flex-shrink-0">
          {/* Szint pöttyök */}
          <div className="flex gap-1" title={mainLevel}>
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className={`w-2.5 h-2.5 rounded-full ${n <= dots.filled ? dots.color : 'bg-gray-200'}`}
              />
            ))}
          </div>
          {/* Kor */}
          <span className="text-xs text-gray-400">{ageGroup}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-3">
        {sports.map((s) => (
          <span
            key={s.sport}
            className="inline-flex items-center gap-1 bg-primary-50 text-primary-800 text-xs px-2 py-1 rounded-full border border-primary-200"
          >
            {SPORT_ICONS[s.sport] || ''} {s.sport}
          </span>
        ))}
      </div>

      <div className="flex gap-2">
        <Link
          href={`/jatekosok/${id}`}
          className="flex-1 text-center py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition-colors"
        >
          Profil
        </Link>
        {isLoggedIn ? (
          <Link
            href={`/uzenetek/${id}`}
            className="flex-1 text-center py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            Üzenet
          </Link>
        ) : (
          <Link
            href="/bejelentkezes"
            className="flex-1 text-center py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            Üzenet
          </Link>
        )}
      </div>
    </div>
  )
}
