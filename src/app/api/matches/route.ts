import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const city = searchParams.get('city')
  const sport = searchParams.get('sport')

  try {
    const matches = await prisma.match.findMany({
      where: {
        date: { gte: new Date() },
        status: { in: ['open', 'confirmed', 'full'] },
        ...(city && { city }),
        ...(sport && { sport }),
      },
      include: {
        organizer: {
          select: { id: true, nickname: true },
        },
        participants: {
          include: {
            user: { select: { id: true, nickname: true } },
          },
          orderBy: { joinedAt: 'asc' },
        },
      },
      orderBy: { date: 'asc' },
      take: 50,
    })

    return NextResponse.json(matches)
  } catch (error) {
    console.error('Matches fetch error:', error)
    return NextResponse.json([], { status: 500 })
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Be kell jelentkezned.' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const { sport, level, date, locationName, lat, lng, city, districts, minPlayers, maxPlayers, description } = body

    if (!sport || !level || !date || !locationName || !city || !minPlayers || !maxPlayers) {
      return NextResponse.json(
        { error: 'Minden kötelező mezőt ki kell tölteni.' },
        { status: 400 }
      )
    }

    const match = await prisma.match.create({
      data: {
        organizerId: session.user.id,
        sport,
        level,
        date: new Date(date),
        locationName,
        lat: lat || null,
        lng: lng || null,
        city,
        districts: districts || [],
        minPlayers: parseInt(minPlayers),
        maxPlayers: parseInt(maxPlayers),
        description: description || null,
      },
    })

    // A szervező automatikusan résztvevő lesz
    await prisma.matchParticipant.create({
      data: {
        matchId: match.id,
        userId: session.user.id,
        type: 'player',
      },
    })

    return NextResponse.json(match)
  } catch (error) {
    console.error('Match create error:', error)
    return NextResponse.json(
      { error: 'Hiba történt a meccs létrehozása során.' },
      { status: 500 }
    )
  }
}
