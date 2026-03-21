import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const city = searchParams.get('city')
  const sport = searchParams.get('sport')
  const level = searchParams.get('level')

  try {
    const users = await prisma.user.findMany({
      where: {
        ...(city && {
          city: { contains: city, mode: 'insensitive' as const },
        }),
        ...(sport && {
          sports: { some: { sport } },
        }),
        ...(level && {
          sports: { some: { level } },
        }),
      },
      select: {
        id: true,
        nickname: true,
        city: true,
        ageGroup: true,
        sports: {
          select: { sport: true, level: true },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: 50,
    })

    return NextResponse.json(users)
  } catch (error) {
    console.error('Users fetch error:', error)
    return NextResponse.json([], { status: 500 })
  }
}
