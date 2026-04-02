import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Regisztráció — csatlakozz a PályaPartnerhez',
  description: 'Regisztrálj a PályaPartnerre és találj sportpartnereket a közeledben! Ingyenes, gyors, egyszerű.',
  openGraph: {
    title: 'Regisztráció | PályaPartner',
    description: 'Regisztrálj és találj sportpartnereket a közeledben! Ingyenes, gyors, egyszerű.',
  },
}

export default function RegisztracioLayout({ children }: { children: React.ReactNode }) {
  return children
}
