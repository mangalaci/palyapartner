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
        sports: {
          select: { sport: true, level: true },
        },
        createdAt: true,
      },
    })

    if (!user) {
      return NextResponse.json({ error: 'Felhasználó nem található.' }, { status: 404 })
    }

    return NextResponse.json(user)
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
