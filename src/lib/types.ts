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
  'Kondizás',
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

export const CITY_COORDS: Record<string, { lat: number; lng: number }> = {
  'Budapest': { lat: 47.4979, lng: 19.0402 },
  'Debrecen': { lat: 47.5316, lng: 21.6273 },
  'Szeged': { lat: 46.2530, lng: 20.1414 },
  'Miskolc': { lat: 48.1035, lng: 20.7784 },
  'Pécs': { lat: 46.0727, lng: 18.2323 },
  'Győr': { lat: 47.6875, lng: 17.6504 },
  'Nyíregyháza': { lat: 47.9553, lng: 21.7167 },
  'Kecskemét': { lat: 46.8964, lng: 19.6897 },
  'Székesfehérvár': { lat: 47.1860, lng: 18.4221 },
  'Szombathely': { lat: 47.2307, lng: 16.6218 },
  'Szolnok': { lat: 47.1750, lng: 20.1784 },
  'Érd': { lat: 47.3919, lng: 18.9139 },
  'Tatabánya': { lat: 47.5694, lng: 18.3949 },
  'Kaposvár': { lat: 46.3594, lng: 17.7968 },
  'Sopron': { lat: 47.6817, lng: 16.5845 },
  'Veszprém': { lat: 47.0933, lng: 17.9115 },
  'Békéscsaba': { lat: 46.6735, lng: 21.0877 },
  'Zalaegerszeg': { lat: 46.8417, lng: 16.8416 },
  'Eger': { lat: 47.9025, lng: 20.3772 },
  'Nagykanizsa': { lat: 46.4534, lng: 16.9905 },
  'Dunakeszi': { lat: 47.6306, lng: 19.1408 },
  'Gödöllő': { lat: 47.5981, lng: 19.3540 },
  'Budaörs': { lat: 47.4621, lng: 18.9609 },
  'Szentendre': { lat: 47.6693, lng: 19.0760 },
}

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

export const SPORT_ICONS: Record<string, string> = {
  'Tenisz': '🎾',
  'Tollaslabda': '🏸',
  'Squash': '🎾',
  'Padel': '🏓',
  'Asztalitenisz': '🏓',
  'Futás': '🏃',
  'Kerékpározás': '🚴',
  'Kosárlabda': '🏀',
  'Röplabda': '🏐',
  'Kispályás foci': '⚽',
  'Nagypályás foci': '⚽',
  'Futsal': '⚽',
  'Kézilabda': '🤾',
  'Úszás': '🏊',
  'Kondizás': '🏋️',
}

export const TEAM_SPORTS = [
  'Kosárlabda',
  'Röplabda',
  'Kispályás foci',
  'Nagypályás foci',
  'Futsal',
  'Kézilabda',
] as const

export type Sport = (typeof SPORTS)[number]
export type Level = (typeof LEVELS)[number]
export type AgeGroup = (typeof AGE_GROUPS)[number]
export type City = (typeof CITIES)[number]
export type BudapestDistrict = (typeof BUDAPEST_DISTRICTS)[number]
