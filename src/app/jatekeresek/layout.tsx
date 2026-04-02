import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Játékkérések — ki keres sportpartnert?',
  description: 'Nézd meg, ki keres éppen sportpartnert a közeledben! Játékkérések teniszhez, focihoz, padelhez és más sportokhoz.',
  openGraph: {
    title: 'Játékkérések | PályaPartner',
    description: 'Nézd meg, ki keres éppen sportpartnert a közeledben!',
  },
}

export default function JatekeresekLayout({ children }: { children: React.ReactNode }) {
  return children
}
