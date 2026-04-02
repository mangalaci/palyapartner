import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Bejelentkezés',
  description: 'Jelentkezz be a PályaPartner fiókodba és találj sportpartnereket.',
}

export default function BejelentkezesLayout({ children }: { children: React.ReactNode }) {
  return children
}
