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
    <nav className="bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-primary-500 text-2xl font-bold">Pálya</span>
            <span className="text-navy-800 text-2xl font-bold">Partner</span>
          </Link>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/jatekosok"
              className="text-gray-600 hover:text-gray-900 font-medium"
            >
              Játékosok
            </Link>
            <Link
              href="/jatekeresek"
              className="text-gray-600 hover:text-gray-900 font-medium"
            >
              Játékkérések
            </Link>
            {session ? (
              <>
                <Link
                  href="/uzenetek"
                  className="text-gray-600 hover:text-gray-900 font-medium relative"
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
                  className="text-gray-600 hover:text-gray-900 font-medium"
                >
                  Profilom
                </Link>
                <button
                  onClick={() => signOut()}
                  className="text-gray-600 hover:text-gray-900 font-medium"
                >
                  Kijelentkezés
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/bejelentkezes"
                  className="text-gray-600 hover:text-gray-900 font-medium"
                >
                  Bejelentkezés
                </Link>
                <Link
                  href="/regisztracio"
                  className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Regisztráció
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg
              className="h-6 w-6 text-gray-600"
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
          <div className="md:hidden pb-4 space-y-2">
            <Link href="/jatekosok" className="block py-2 text-gray-600 hover:text-gray-900 font-medium" onClick={() => setMenuOpen(false)}>
              Játékosok
            </Link>
            <Link href="/jatekeresek" className="block py-2 text-gray-600 hover:text-gray-900 font-medium" onClick={() => setMenuOpen(false)}>
              Játékkérések
            </Link>
            {session ? (
              <>
                <Link href="/uzenetek" className="block py-2 text-gray-600 hover:text-gray-900 font-medium" onClick={() => setMenuOpen(false)}>
                  Üzenetek
                  {unreadCount > 0 && (
                    <span className="ml-2 inline-flex items-center justify-center bg-red-500 text-white text-xs font-bold rounded-full h-5 min-w-5 px-1">
                      {unreadCount}
                    </span>
                  )}
                </Link>
                <Link href="/profil" className="block py-2 text-gray-600 hover:text-gray-900 font-medium" onClick={() => setMenuOpen(false)}>
                  Profilom
                </Link>
                <button onClick={() => { signOut(); setMenuOpen(false) }} className="block py-2 text-gray-600 hover:text-gray-900 font-medium">
                  Kijelentkezés
                </button>
              </>
            ) : (
              <>
                <Link href="/bejelentkezes" className="block py-2 text-gray-600 hover:text-gray-900 font-medium" onClick={() => setMenuOpen(false)}>
                  Bejelentkezés
                </Link>
                <Link href="/regisztracio" className="block py-2 bg-primary-500 text-white text-center rounded-lg font-medium" onClick={() => setMenuOpen(false)}>
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
