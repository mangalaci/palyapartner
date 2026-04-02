import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sportpartner keresés — játékosok böngészése',
  description: 'Keress ingyenesen sportpartnert a közeledben! Szűrj sportág, szint és város szerint. Tenisz, foci, padel, squash és más sportokhoz.',
  openGraph: {
    title: 'Sportpartner keresés | PályaPartner',
    description: 'Keress ingyenesen sportpartnert a közeledben! Szűrj sportág, szint és város szerint.',
  },
}

export default function JatekosokLayout({ children }: { children: React.ReactNode }) {
  return children
}
