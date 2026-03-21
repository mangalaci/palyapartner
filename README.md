# PályaPartner

Find your perfect sports partner! A responsive web app that connects people who want to play sports but don't have a partner.

## Features

- **Player browsing** — Search nearby sports partners by sport, skill level, and age group
- **Game requests** — Post a game request for a specific sport, time, and location, or join others'
- **In-app messaging** — Chat directly within the app
- **Profile management** — Nickname, sports, skill levels, age group, bio
- **"Browse first" model** — Browse without registration, sign up to message or post

## Tech Stack

- **Frontend:** Next.js 14 (App Router), React 18, Tailwind CSS
- **Backend:** Next.js API Routes
- **Database:** PostgreSQL + Prisma ORM
- **Authentication:** NextAuth.js (email/password)
- **Language:** TypeScript
- **Deployment:** Railway (Docker)

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database

### Installation

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
cp .env.example .env
# Edit .env with your database URL

# 3. Run database migrations
npx prisma migrate dev --name init

# 4. (Optional) Seed sample data
npx tsx prisma/seed.ts

# 5. Start the development server
npm run dev
```

The app will be available at: http://localhost:3000

### Sample Users (after seeding)

| Nickname | Email | Password | City |
|----------|-------|----------|------|
| KisDániel | kis.daniel@example.com | jelszo123 | Győr |
| TóthMária | toth.maria@example.com | jelszo123 | Budapest |
| SzabóGábor | szabo.gabor@example.com | jelszo123 | Pécs |
| NagyAnna | nagy.anna@example.com | jelszo123 | Debrecen |
| KovácsPéter | kovacs.peter@example.com | jelszo123 | Budapest |

## Deployment (Railway)

1. Create a new project on [Railway](https://railway.com)
2. Add the PostgreSQL addon
3. Set environment variables:
   - `DATABASE_URL` — automatically set by the PostgreSQL addon
   - `NEXTAUTH_SECRET` — generate one: `openssl rand -base64 32`
   - `NEXTAUTH_URL` — the URL provided by Railway (e.g. `https://palyapartner.up.railway.app`)
4. Connect your GitHub repo — deployment is automatic

## Screens

| Screen | URL | Description |
|--------|-----|-------------|
| Home | `/` | Hero section + search + player cards |
| Players | `/jatekosok` | Filterable player list |
| Player Profile | `/jatekosok/[id]` | Individual profile details |
| Game Requests | `/jatekeresek` | Open game requests + create new |
| Register | `/regisztracio` | Account creation |
| Login | `/bejelentkezes` | Sign in |
| My Profile | `/profil` | Edit own profile |
| Messages | `/uzenetek` | Conversations list |
| Chat | `/uzenetek/[id]` | Chat with a player |

## Project Structure

```
src/
├── app/
│   ├── api/                  # Backend API routes
│   │   ├── auth/             # NextAuth config
│   │   ├── game-requests/    # Game requests CRUD
│   │   ├── messages/         # Messages CRUD
│   │   ├── register/         # Registration
│   │   └── users/            # User search, profile
│   ├── bejelentkezes/        # Login page
│   ├── jatekeresek/          # Game requests page
│   ├── jatekosok/            # Player browsing
│   ├── profil/               # Profile editing
│   ├── regisztracio/         # Registration page
│   ├── uzenetek/             # Messages
│   ├── layout.tsx            # Global layout
│   └── page.tsx              # Home page
├── components/               # Reusable components
│   ├── AuthProvider.tsx
│   ├── Navbar.tsx
│   ├── PlayerCard.tsx
│   └── SearchSection.tsx
└── lib/                      # Utilities
    ├── auth.ts               # NextAuth config
    ├── prisma.ts             # Prisma client
    └── types.ts              # Type definitions, constants
```
