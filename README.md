# PályaPartner

Találd meg a tökéletes sportpartnered! Reszponzív webalkalmazás, amely összeköti azokat, akik sportolni szeretnének, de nincs partnerük hozzá.

## Funkciók

- **Játékos böngészés** — Keress közeli sportpartnereket sport, szint és korosztály szerint
- **Játékkérések** — Adj fel játékkérést konkrét sportra, időpontra és helyszínre, vagy jelentkezz másokéra
- **In-app üzenetküldés** — Chatelj közvetlenül az alkalmazáson belül
- **Profil kezelés** — Becenév, sportok, szintek, korosztály, bemutatkozás
- **"Browse first" modell** — Regisztráció nélkül is böngészhetsz, de üzenetküldéshez be kell jelentkezned

## Tech stack

- **Frontend:** Next.js 14 (App Router), React 18, Tailwind CSS
- **Backend:** Next.js API Routes
- **Adatbázis:** PostgreSQL + Prisma ORM
- **Autentikáció:** NextAuth.js (email/jelszó)
- **Nyelv:** TypeScript
- **Deploy:** Railway (Docker)

## Telepítés (lokális fejlesztés)

### Előfeltételek

- Node.js 18+
- PostgreSQL adatbázis

### Lépések

```bash
# 1. Függőségek telepítése
npm install

# 2. Környezeti változók beállítása
cp .env.example .env
# Szerkeszd a .env fájlt a saját adatbázis URL-eddel

# 3. Adatbázis migráció
npx prisma migrate dev --name init

# 4. (Opcionális) Minta adatok betöltése
npx tsx prisma/seed.ts

# 5. Fejlesztői szerver indítása
npm run dev
```

Az app elérhető lesz: http://localhost:3000

### Minta felhasználók (seed után)

| Becenév | Email | Jelszó | Város |
|---------|-------|--------|-------|
| KisDániel | kis.daniel@example.com | jelszo123 | Győr |
| TóthMária | toth.maria@example.com | jelszo123 | Budapest |
| SzabóGábor | szabo.gabor@example.com | jelszo123 | Pécs |
| NagyAnna | nagy.anna@example.com | jelszo123 | Debrecen |
| KovácsPéter | kovacs.peter@example.com | jelszo123 | Budapest |

## Deploy (Railway)

1. Hozz létre egy új projektet a [Railway](https://railway.com)-en
2. Add hozzá a PostgreSQL addon-t
3. Állítsd be a környezeti változókat:
   - `DATABASE_URL` — automatikusan beállítódik a PostgreSQL addon-nal
   - `NEXTAUTH_SECRET` — generálj egyet: `openssl rand -base64 32`
   - `NEXTAUTH_URL` — a Railway által adott URL (pl. `https://palyapartner.up.railway.app`)
4. Kösd össze a GitHub repóval — a deploy automatikus

## Képernyők

| Képernyő | URL | Leírás |
|----------|-----|--------|
| Főoldal | `/` | Hero szekció + keresés + játékos kártyák |
| Játékosok | `/jatekosok` | Szűrhető játékos lista |
| Játékos profil | `/jatekosok/[id]` | Egyéni profil részletek |
| Játékkérések | `/jatekeresek` | Nyitott játékkérések + új feladása |
| Regisztráció | `/regisztracio` | Fiók létrehozása |
| Bejelentkezés | `/bejelentkezes` | Bejelentkezés |
| Profilom | `/profil` | Saját profil szerkesztése |
| Üzenetek | `/uzenetek` | Beszélgetések listája |
| Chat | `/uzenetek/[id]` | Csevegés egy játékossal |

## Projektstruktúra

```
src/
├── app/
│   ├── api/                  # Backend API végpontok
│   │   ├── auth/             # NextAuth konfiguráció
│   │   ├── game-requests/    # Játékkérések CRUD
│   │   ├── messages/         # Üzenetek CRUD
│   │   ├── register/         # Regisztráció
│   │   └── users/            # Felhasználók keresése, profil
│   ├── bejelentkezes/        # Bejelentkezés oldal
│   ├── jatekeresek/          # Játékkérések oldal
│   ├── jatekosok/            # Játékosok böngészése
│   ├── profil/               # Profil szerkesztés
│   ├── regisztracio/         # Regisztráció oldal
│   ├── uzenetek/             # Üzenetek
│   ├── layout.tsx            # Globális layout
│   └── page.tsx              # Főoldal
├── components/               # Újrahasználható komponensek
│   ├── AuthProvider.tsx
│   ├── Navbar.tsx
│   ├── PlayerCard.tsx
│   └── SearchSection.tsx
└── lib/                      # Segédkód
    ├── auth.ts               # NextAuth konfiguráció
    ├── prisma.ts             # Prisma kliens
    └── types.ts              # Típusdefiníciók, konstansok
```
