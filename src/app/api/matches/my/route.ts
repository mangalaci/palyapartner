import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Be kell jelentkezned.' }, { status: 401 })
  }

  try {
    const now = new Date()

    const matches = await prisma.match.findMany({
      where: {
        participants: {
          some: { userId: session.user.id },
        },
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
    })

    const upcoming = matches.filter(
      (m) => new Date(m.date) >= now && m.participants.find((p) => p.userId === session.user.id)?.type === 'player'
    )
    const waitlisted = matches.filter(
      (m) => new Date(m.date) >= now && m.participants.find((p) => p.userId === session.user.id)?.type === 'waitlist'
    )
    const past = matches.filter((m) => new Date(m.date) < now)

    return NextResponse.json({ upcoming, waitlisted, past })
  } catch (error) {
    console.error('My matches fetch error:', error)
    return NextResponse.json({ error: 'Hiba történt.' }, { status: 500 })
  }
}
