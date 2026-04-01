import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { sendMatchNotification } from '@/lib/notifications'

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Be kell jelentkezned.' }, { status: 401 })
  }

  try {
    const match = await prisma.match.findUnique({
      where: { id: params.id },
      include: {
        participants: { where: { type: 'player' } },
      },
    })

    if (!match) {
      return NextResponse.json({ error: 'Meccs nem található.' }, { status: 404 })
    }

    if (match.status === 'cancelled') {
      return NextResponse.json({ error: 'Ez a meccs lemondva.' }, { status: 400 })
    }

    // Már csatlakozott?
    const existing = await prisma.matchParticipant.findUnique({
      where: { matchId_userId: { matchId: params.id, userId: session.user.id } },
    })

    if (existing) {
      return NextResponse.json({ error: 'Már csatlakoztál ehhez a meccshez.' }, { status: 400 })
    }

    const playerCount = match.participants.length
    const isFull = playerCount >= match.maxPlayers
    const type = isFull ? 'waitlist' : 'player'

    await prisma.matchParticipant.create({
      data: {
        matchId: params.id,
        userId: session.user.id,
        type,
      },
    })

    // Státusz frissítés
    const newPlayerCount = type === 'player' ? playerCount + 1 : playerCount
    let newStatus = match.status
    if (newPlayerCount >= match.maxPlayers) {
      newStatus = 'full'
    } else if (newPlayerCount >= match.minPlayers) {
      newStatus = 'confirmed'
    }

    if (newStatus !== match.status) {
      await prisma.match.update({
        where: { id: params.id },
        data: { status: newStatus },
      })
    }

    // Értesítés a szervezőnek
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { nickname: true },
    })
    const nickname = user?.nickname || 'Valaki'

    if (type === 'player') {
      await sendMatchNotification(
        session.user.id,
        match.organizerId,
        `${nickname} csatlakozott a meccsedhez: ${match.sport}, ${match.locationName}`
      )
    } else {
      await sendMatchNotification(
        session.user.id,
        match.organizerId,
        `${nickname} feliratkozott a várólistára: ${match.sport}, ${match.locationName}`
      )
    }

    // Ha összejött a minimum létszám, értesítés mindenkinek
    if (newStatus === 'confirmed' && match.status === 'open') {
      const allParticipants = await prisma.matchParticipant.findMany({
        where: { matchId: params.id, type: 'player' },
      })
      for (const p of allParticipants) {
        await sendMatchNotification(
          match.organizerId,
          p.userId,
          `Összejött a meccs! ${match.sport}, ${match.locationName}`
        )
      }
    }

    return NextResponse.json({ type, message: type === 'waitlist' ? 'Várólistára kerültél.' : 'Csatlakoztál!' })
  } catch (error) {
    console.error('Match join error:', error)
    return NextResponse.json({ error: 'Hiba történt.' }, { status: 500 })
  }
}
