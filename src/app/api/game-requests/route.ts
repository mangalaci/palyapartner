import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const city = searchParams.get('city')
  const sport = searchParams.get('sport')

  try {
    const requests = await prisma.gameRequest.findMany({
      where: {
        date: { gte: new Date() },
        ...(city && {
          city: { contains: city, mode: 'insensitive' as const },
        }),
        ...(sport && { sport }),
      },
      include: {
        user: {
          select: { id: true, nickname: true, city: true },
        },
      },
      orderBy: { date: 'asc' },
      take: 50,
    })

    return NextResponse.json(requests)
  } catch (error) {
    console.error('Game requests fetch error:', error)
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
    const { sport, level, date, city, districts, description } = body

    if (!sport || !level || !date || !city) {
      return NextResponse.json(
        { error: 'Minden kötelező mezőt ki kell tölteni.' },
        { status: 400 }
      )
    }

    const gameRequest = await prisma.gameRequest.create({
      data: {
        userId: session.user.id,
        sport,
        level,
        date: new Date(date),
        city,
        districts: districts || [],
        description: description || null,
      },
    })

    return NextResponse.json(gameRequest)
  } catch (error) {
    console.error('Game request create error:', error)
    return NextResponse.json(
      { error: 'Hiba történt a játékkérés létrehozása során.' },
      { status: 500 }
    )
  }
}
