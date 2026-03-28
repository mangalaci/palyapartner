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
  'Kispályás foci',
  'Nagypályás foci',
  'Futsal',
  'Kézilabda',
  'Úszás',
] as const

export const LEVELS = ['Kezdő', 'Középhaladó', 'Haladó'] as const

export const AGE_GROUPS = ['20-30', '30-40', '40-50', '50+'] as const

export const CITIES = [
  'Budapest',
  'Debrecen',
  'Szeged',
  'Miskolc',
  'Pécs',
  'Győr',
  'Nyíregyháza',
  'Kecskemét',
  'Székesfehérvár',
  'Szombathely',
  'Szolnok',
  'Érd',
  'Tatabánya',
  'Kaposvár',
  'Sopron',
  'Veszprém',
  'Békéscsaba',
  'Zalaegerszeg',
  'Eger',
  'Nagykanizsa',
  'Dunakeszi',
  'Gödöllő',
  'Budaörs',
  'Szentendre',
] as const

export const BUDAPEST_DISTRICTS = [
  'I. kerület',
  'II. kerület',
  'III. kerület',
  'IV. kerület',
  'V. kerület',
  'VI. kerület',
  'VII. kerület',
  'VIII. kerület',
  'IX. kerület',
  'X. kerület',
  'XI. kerület',
  'XII. kerület',
  'XIII. kerület',
  'XIV. kerület',
  'XV. kerület',
  'XVI. kerület',
  'XVII. kerület',
  'XVIII. kerület',
  'XIX. kerület',
  'XX. kerület',
  'XXI. kerület',
  'XXII. kerület',
  'XXIII. kerület',
] as const

export type Sport = (typeof SPORTS)[number]
export type Level = (typeof LEVELS)[number]
export type AgeGroup = (typeof AGE_GROUPS)[number]
export type City = (typeof CITIES)[number]
export type BudapestDistrict = (typeof BUDAPEST_DISTRICTS)[number]
