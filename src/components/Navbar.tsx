'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { useState, useEffect } from 'react'

export default function Navbar() {
  const { data: session } = useSession()
  const [menuOpen, setMenuOpen] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)

  useEffect(() => {
    if (!session) return

    function fetchUnread() {
      fetch('/api/messages/unread')
        .then((res) => res.json())
        .then((data) => setUnreadCount(data.count))
        .catch(() => {})
    }

    fetchUnread()
    const interval = setInterval(fetchUnread, 15000)
    return () => clearInterval(interval)
  }, [session])

  return (
    <nav className="bg-field-dark border-b border-black/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-10 items-center">
          <Link href="/" className="flex items-center">
            <span className="text-white text-xl font-heading">PÁLYA</span>
            <span className="text-xl font-heading" style={{ color: '#003d1a' }}>PARTNER</span>
          </Link>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center gap-5 font-heading">
            <Link
              href="/jatekosok"
              className="font-medium text-base transition-colors hover:text-white"
              style={{ color: '#003d1a' }}
            >
              Játékosok
            </Link>
            <Link
              href="/meccsek"
              className="font-medium text-base transition-colors hover:text-white"
              style={{ color: '#003d1a' }}
            >
              Meccsek
            </Link>
            <Link
              href="/jatekeresek"
              className="font-medium text-base transition-colors hover:text-white"
              style={{ color: '#003d1a' }}
            >
              Játékkérések
            </Link>
            {session ? (
              <>
                <Link
                  href="/meccseim"
                  className="font-medium text-base transition-colors hover:text-white"
                  style={{ color: '#003d1a' }}
                >
                  Meccseim
                </Link>
                <Link
                  href="/uzenetek"
                  className="font-medium text-base transition-colors hover:text-white relative"
                  style={{ color: '#003d1a' }}
                >
                  Üzenetek
                  {unreadCount > 0 && (
                    <span className="absolute -top-2 -right-5 bg-red-500 text-white text-xs font-bold rounded-full h-5 min-w-5 flex items-center justify-center px-1">
                      {unreadCount}
                    </span>
                  )}
                </Link>
                <Link
                  href="/profil"
                  className="font-medium text-base transition-colors hover:text-white"
                  style={{ color: '#003d1a' }}
                >
                  Profilom
                </Link>
                <button
                  onClick={() => signOut()}
                  className="font-medium text-base transition-colors hover:text-white"
                  style={{ color: '#003d1a' }}
                >
                  Kijelentkezés
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/bejelentkezes"
                  className="font-medium text-base transition-colors hover:text-white"
                  style={{ color: '#003d1a' }}
                >
                  Bejelentkezés
                </Link>
                <Link
                  href="/regisztracio"
                  className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-1.5 rounded-lg font-medium text-base transition-colors"
                >
                  Regisztráció
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2.5"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg
              className="h-6 w-6 text-gray-200"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden pb-3 space-y-1 font-heading">
            <Link href="/jatekosok" className="block py-2 font-medium text-base hover:text-white" style={{ color: '#003d1a' }} onClick={() => setMenuOpen(false)}>
              Játékosok
            </Link>
            <Link href="/meccsek" className="block py-2 font-medium text-base hover:text-white" style={{ color: '#003d1a' }} onClick={() => setMenuOpen(false)}>
              Meccsek
            </Link>
            <Link href="/jatekeresek" className="block py-2 font-medium text-base hover:text-white" style={{ color: '#003d1a' }} onClick={() => setMenuOpen(false)}>
              Játékkérések
            </Link>
            {session ? (
              <>
                <Link href="/meccseim" className="block py-2 font-medium text-base hover:text-white" style={{ color: '#003d1a' }} onClick={() => setMenuOpen(false)}>
                  Meccseim
                </Link>
                <Link href="/uzenetek" className="block py-2 font-medium text-base hover:text-white" style={{ color: '#003d1a' }} onClick={() => setMenuOpen(false)}>
                  Üzenetek
                  {unreadCount > 0 && (
                    <span className="ml-2 inline-flex items-center justify-center bg-red-500 text-white text-xs font-bold rounded-full h-5 min-w-5 px-1">
                      {unreadCount}
                    </span>
                  )}
                </Link>
                <Link href="/profil" className="block py-2 font-medium text-base hover:text-white" style={{ color: '#003d1a' }} onClick={() => setMenuOpen(false)}>
                  Profilom
                </Link>
                <button onClick={() => { signOut(); setMenuOpen(false) }} className="block py-2 font-medium text-base hover:text-white" style={{ color: '#003d1a' }}>
                  Kijelentkezés
                </button>
              </>
            ) : (
              <>
                <Link href="/bejelentkezes" className="block py-2 font-medium text-base hover:text-white" style={{ color: '#003d1a' }} onClick={() => setMenuOpen(false)}>
                  Bejelentkezés
                </Link>
                <Link href="/regisztracio" className="block py-2 bg-primary-500 text-white text-center rounded-lg font-medium text-base" onClick={() => setMenuOpen(false)}>
                  Regisztráció
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
