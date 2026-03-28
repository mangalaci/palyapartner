import { NextResponse } from 'next/server'
import { hash } from 'bcryptjs'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { email, password, nickname, city, districts, ageGroup, sports, bio } = body

    if (!email || !password || !nickname || !city || !ageGroup || !sports?.length) {
      return NextResponse.json(
        { error: 'Minden kötelező mezőt ki kell tölteni.' },
        { status: 400 }
      )
    }

    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
      return NextResponse.json(
        { error: 'Ez az email cím már foglalt.' },
        { status: 400 }
      )
    }

    const passwordHash = await hash(password, 12)

    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
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
    })

    return NextResponse.json({ id: user.id, message: 'Sikeres regisztráció!' })
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Hiba történt a regisztráció során.' },
      { status: 500 }
    )
  }
}
