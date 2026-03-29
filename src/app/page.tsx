import Link from 'next/link'
import SearchSection from '@/components/SearchSection'

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-field-darker via-field-dark to-field opacity-90" />
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-400/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 text-center">
          <h1 className="text-4xl md:text-7xl text-white mb-6 text-sport-white">
            Találd meg a tökéletes{' '}
            <span className="text-sport-green">sportpartnered</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Legyen szó teniszről, fociról vagy futásról, csatlakozz a közösséghez és
            soha többé ne játssz egyedül!
          </p>
        </div>
      </section>

      {/* Search Section */}
      <SearchSection />

      {/* How it works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center text-white mb-12">
          Hogyan működik?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-500/20 border border-primary-500/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl text-primary-400 font-heading font-bold">1</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Regisztrálj</h3>
            <p className="text-gray-400">
              Hozd létre a profilod, add meg a sportjaidat és a szinted.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-500/20 border border-primary-500/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl text-primary-400 font-heading font-bold">2</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Keress partnert</h3>
            <p className="text-gray-400">
              Böngészd a közeli játékosokat vagy nézd a játékkéréseket.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-500/20 border border-primary-500/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl text-primary-400 font-heading font-bold">3</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Sportolj!</h3>
            <p className="text-gray-400">
              Küldj üzenetet és egyeztessétek a részleteket.
            </p>
          </div>
        </div>

        <div className="text-center mt-12">
          <Link
            href="/regisztracio"
            className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-3 rounded-lg text-lg font-medium transition-colors inline-block"
          >
            Csatlakozz most!
          </Link>
        </div>
      </section>
    </>
  )
}
