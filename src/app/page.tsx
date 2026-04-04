import Image from 'next/image'
import SearchSection from '@/components/SearchSection'
import HeroButtons from '@/components/HeroButtons'
import BottomCTA from '@/components/BottomCTA'
import JoinButton from '@/components/JoinButton'

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-field-dark via-field to-field-light opacity-90" />

        {/* Dekorációs sport elemek */}
        <div className="absolute top-4 left-4 text-5xl opacity-80 rotate-[-15deg] select-none md:hidden">&#9917;</div>
        <div className="hidden md:block absolute top-8 left-12 opacity-80 rotate-[-15deg] select-none">
          <Image src="/images/soccer-ball.svg" alt="" width={90} height={90} />
        </div>
        <div className="absolute top-6 right-4 md:top-10 md:right-12 text-5xl md:text-7xl opacity-80 rotate-[20deg] select-none">&#127934;</div>
        <div className="absolute bottom-4 left-8 md:bottom-8 md:left-20 text-5xl md:text-7xl opacity-80 rotate-[10deg] select-none">&#127936;</div>
        <div className="absolute bottom-6 right-6 md:bottom-10 md:right-16 text-5xl md:text-7xl opacity-80 rotate-[-10deg] select-none">&#127954;</div>
        <div className="hidden md:block absolute top-1/2 left-4 text-6xl opacity-60 rotate-[-25deg] select-none">&#127947;</div>
        <div className="hidden md:block absolute top-1/2 right-4 opacity-60 rotate-[15deg] select-none">
          <Image src="/images/soccer-ball.svg" alt="" width={70} height={70} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 text-center">
          <h1 className="text-4xl md:text-7xl text-white mb-6">
            Találd meg a tökéletes{' '}
            <span style={{ color: '#003d1a' }}>sportpartnered</span>
          </h1>
          <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto font-heading">
            Legyen szó teniszről, fociról vagy futásról, találd meg a társad, a csapatod!
          </p>
          <HeroButtons />
        </div>
      </section>

      {/* Search Section */}
      <SearchSection />

      {/* Miért PályaPartner? */}
      <section className="bg-field-dark/50 border-t border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold text-center text-white mb-4">
            Miért PályaPartner?
          </h2>
          <p className="text-center text-gray-300 mb-12 max-w-2xl mx-auto">
            Ismered az érzést, amikor sportolnál, de nincs kivel? Nekünk is ez volt a problémánk.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-black/20 border border-white/10 rounded-xl p-6 text-center">
              <div className="text-4xl mb-4">&#127934;</div>
              <h3 className="text-xl font-semibold text-white mb-2">15 sportág</h3>
              <p className="text-gray-300">
                Tenisz, padel, squash, foci, futás, kerékpározás, úszás és még sok más — egy helyen.
              </p>
            </div>
            <div className="bg-black/20 border border-white/10 rounded-xl p-6 text-center">
              <div className="text-4xl mb-4">&#128205;</div>
              <h3 className="text-xl font-semibold text-white mb-2">A közeledben</h3>
              <p className="text-gray-300">
                Válaszd ki a városod és a kerületed — csak olyan partnereket látsz, akikkel tényleg tudsz játszani.
              </p>
            </div>
            <div className="bg-black/20 border border-white/10 rounded-xl p-6 text-center">
              <div className="text-4xl mb-4">&#128176;</div>
              <h3 className="text-xl font-semibold text-white mb-2">Teljesen ingyenes</h3>
              <p className="text-gray-300">
                Nincs előfizetés, nincs rejtett költség. Regisztrálj, keress partnert és sportolj!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center text-white mb-12">
          Hogyan működik?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-500/20 border border-primary-500/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl text-white font-heading font-bold">1</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Regisztrálj</h3>
            <p className="text-gray-200">
              Hozd létre a profilod, add meg a sportjaidat és a szinted.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-500/20 border border-primary-500/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl text-white font-heading font-bold">2</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Keress partnert</h3>
            <p className="text-gray-200">
              Böngészd a közeli játékosokat, szűrj sportágra, szintre, helyszínre.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-500/20 border border-primary-500/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl text-white font-heading font-bold">3</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Sportolj!</h3>
            <p className="text-gray-200">
              Küldj üzenetet, egyeztessétek az időpontot és pályára!
            </p>
          </div>
        </div>

        <JoinButton />
      </section>

      {/* Sportágak */}
      <section className="bg-field-dark/50 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold text-center text-white mb-8">
            Elérhető sportágak
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { name: 'Tenisz', emoji: '🎾' },
              { name: 'Padel', emoji: '🏓' },
              { name: 'Squash', emoji: '🏸' },
              { name: 'Tollaslabda', emoji: '🏸' },
              { name: 'Asztalitenisz', emoji: '🏓' },
              { name: 'Kispályás foci', emoji: '⚽' },
              { name: 'Nagypályás foci', emoji: '⚽' },
              { name: 'Futsal', emoji: '⚽' },
              { name: 'Kosárlabda', emoji: '🏀' },
              { name: 'Röplabda', emoji: '🏐' },
              { name: 'Kézilabda', emoji: '🤾' },
              { name: 'Futás', emoji: '🏃' },
              { name: 'Kerékpározás', emoji: '🚴' },
              { name: 'Úszás', emoji: '🏊' },
              { name: 'Kondizás', emoji: '🏋️' },
            ].map((sport) => (
              <span
                key={sport.name}
                className="bg-black/30 border border-white/20 rounded-full px-5 py-2 text-white font-heading text-sm"
              >
                {sport.emoji} {sport.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA + Share */}
      <BottomCTA />
    </>
  )
}
