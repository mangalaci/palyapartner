import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import AuthProvider from '@/components/AuthProvider'

export const metadata: Metadata = {
  title: 'PályaPartner - Találd meg a tökéletes sportpartnered',
  description: 'Találj sportpartnert a közeledben. Tenisz, futás, foci, padel és más sportokhoz.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="hu">
      <body className="bg-gray-50 min-h-screen">
        <AuthProvider>
          <Navbar />
          <main>{children}</main>
        </AuthProvider>
      </body>
    </html>
  )
}
