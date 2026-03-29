'use client'

import Link from 'next/link'

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

function getLevelColor(level: string) {
  switch (level) {
    case 'Kezdő':
      return 'text-green-300 bg-green-500/20 border-green-500/30'
    case 'Középhaladó':
      return 'text-blue-300 bg-blue-500/20 border-blue-500/30'
    case 'Haladó':
      return 'text-red-300 bg-red-500/20 border-red-500/30'
    default:
      return 'text-gray-300 bg-white/10 border-white/20'
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

  return (
    <div className="bg-white/5 rounded-xl border border-white/10 p-6 hover:bg-white/10 transition-colors">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-14 h-14 rounded-full bg-primary-500/20 flex items-center justify-center text-primary-300 text-xl font-semibold border-2 border-primary-500/30">
          {getInitial(nickname)}
        </div>
        <div>
          <h3 className="font-semibold text-lg text-white">
            {isLoggedIn ? nickname : '***'}
          </h3>
          <p className="text-gray-400 text-sm flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {city}{districts && districts.length > 0 ? ` (${districts.join(', ')})` : ''}
          </p>
        </div>
      </div>

      <div className="mb-3">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
          Sportok
        </p>
        <div className="flex flex-wrap gap-2">
          {sports.map((s) => (
            <span
              key={s.sport}
              className="inline-flex items-center gap-1 bg-primary-500/20 text-primary-300 text-sm px-2.5 py-1 rounded-full border border-primary-500/30"
            >
              {s.sport}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <span className={`text-sm px-2.5 py-1 rounded-full border ${getLevelColor(mainLevel)}`}>
          Szint: {mainLevel}
        </span>
        <span className="text-sm px-2.5 py-1 rounded-full border border-white/20 text-gray-300 bg-white/10">
          Kor: {ageGroup}
        </span>
      </div>

      <div className="flex gap-2">
        <Link
          href={`/jatekosok/${id}`}
          className="flex-1 text-center py-2 border border-white/20 rounded-lg text-gray-300 hover:bg-white/10 font-medium transition-colors"
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
