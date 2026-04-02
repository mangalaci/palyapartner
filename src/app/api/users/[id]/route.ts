import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: params.id },
      select: {
        id: true,
        nickname: true,
        city: true,
        districts: true,
        ageGroup: true,
        bio: true,
        photoUrl: true,
        sports: {
          select: { sport: true, level: true },
        },
        createdAt: true,
      },
    })

    if (!user) {
      return NextResponse.json({ error: 'Felhasználó nem található.' }, { status: 404 })
    }

    // Statisztikák
    const participations = await prisma.matchParticipant.findMany({
      where: { userId: params.id, type: 'player' },
      include: {
        match: { select: { sport: true, date: true, organizerId: true } },
      },
    })

    const now = new Date()
    const pastMatches = participations.filter(p => new Date(p.match.date) < now)
    const organizedCount = pastMatches.filter(p => p.match.organizerId === params.id).length

    // Sportágankénti bontás
    const sportCounts: Record<string, number> = {}
    for (const p of pastMatches) {
      sportCounts[p.match.sport] = (sportCounts[p.match.sport] || 0) + 1
    }

    return NextResponse.json({
      ...user,
      stats: {
        totalMatches: pastMatches.length,
        organizedCount,
        sportCounts,
      },
    })
  } catch (error) {
    console.error('User fetch error:', error)
    return NextResponse.json({ error: 'Hiba történt.' }, { status: 500 })
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions)
  if (!session || session.user.id !== params.id) {
    return NextResponse.json({ error: 'Nincs jogosultságod.' }, { status: 403 })
  }

  try {
    const body = await req.json()
    const { nickname, city, districts, ageGroup, bio, sports } = body

    await prisma.userSport.deleteMany({ where: { userId: params.id } })

    const user = await prisma.user.update({
      where: { id: params.id },
      data: {
        nickname,
        city,
        districts: districts || [],
        ageGroup,
        bio: bio || null,
        sports: {
          create: sports.map((s: { sport: string; level: string }) => ({
            sport: s.sport,
            level: s.level,
          })),
        },
      },
      include: { sports: true },
    })

    return NextResponse.json(user)
  } catch (error) {
    console.error('User update error:', error)
    return NextResponse.json({ error: 'Hiba történt a mentés során.' }, { status: 500 })
  }
}
