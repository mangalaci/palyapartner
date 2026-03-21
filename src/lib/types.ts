import 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
    }
  }
}

export const SPORTS = [
  'Tenisz',
  'Tollaslabda',
  'Squash',
  'Padel',
  'Asztalitenisz',
  'Futás',
  'Kerékpározás',
  'Kosárlabda',
  'Röplabda',
  'Foci',
  'Kézilabda',
  'Úszás',
] as const

export const LEVELS = ['Kezdő', 'Középhaladó', 'Haladó'] as const

export const AGE_GROUPS = ['20-30', '30-40', '40-50', '50+'] as const

export type Sport = (typeof SPORTS)[number]
export type Level = (typeof LEVELS)[number]
export type AgeGroup = (typeof AGE_GROUPS)[number]
