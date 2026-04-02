import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Meccsek — csatlakozz sportmeccsekhez',
  description: 'Csatlakozz ingyenesen szervezett sportmeccsekhez a közeledben! Foci, tenisz, kosárlabda, röplabda és más sportok. Térképes helyszínkereső.',
  openGraph: {
    title: 'Sportmeccsek | PályaPartner',
    description: 'Csatlakozz ingyenesen szervezett sportmeccsekhez a közeledben!',
  },
}

export default function MeccsekLayout({ children }: { children: React.ReactNode }) {
  return children
}
