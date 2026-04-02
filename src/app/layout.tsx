import type { Metadata, Viewport } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import AuthProvider from '@/components/AuthProvider'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#00A651',
}

export const metadata: Metadata = {
  title: {
    default: 'PályaPartner — Találd meg a sportpartnered',
    template: '%s | PályaPartner',
  },
  description: 'Ingyenes sportpartner kereső alkalmazás. Találj tenisz-, foci-, padel-, squash- és más sportpartnereket a közeledben. Szervezz meccseket és csatlakozz közösségekhez!',
  manifest: '/manifest.json',
  icons: {
    icon: '/icons/icon-192.png',
    shortcut: '/icons/icon-192.png',
    apple: '/icons/icon-192.png',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'PályaPartner',
  },
  openGraph: {
    type: 'website',
    locale: 'hu_HU',
    url: 'https://palyapartner.hu',
    siteName: 'PályaPartner',
    title: 'PályaPartner — Találd meg a sportpartnered',
    description: 'Ingyenes sportpartner kereső. Tenisz, foci, padel, squash és más sportokhoz. Keress partnert, szervezz meccseket!',
    images: [{ url: '/opengraph-image', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PályaPartner — Találd meg a sportpartnered',
    description: 'Ingyenes sportpartner kereső. Tenisz, foci, padel, squash és más sportokhoz.',
  },
  keywords: [
    'sportpartner', 'sportpartner kereső', 'teniszpartner', 'focipartner',
    'padel partner', 'squash partner', 'tollaslabda partner',
    'sportpartner Budapest', 'meccs szervező', 'sportközösség',
    'ingyenes sportpartner kereső', 'sport társkereső',
  ],
  alternates: {
    canonical: 'https://palyapartner.hu',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="hu">
      <head>
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
      </head>
      <body className="bg-field min-h-screen text-white">
        <AuthProvider>
          <Navbar />
          <main>{children}</main>
        </AuthProvider>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', () => {
                  navigator.serviceWorker.register('/sw.js')
                })
              }
            `,
          }}
        />
      </body>
    </html>
  )
}
