import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Be kell jelentkezned.' }, { status: 401 })
  }

  try {
    const match = await prisma.match.findUnique({
      where: { id: params.id },
    })

    if (!match) {
      return NextResponse.json({ error: 'Meccs nem található.' }, { status: 404 })
    }

    // Szervező nem léphet ki (csak lemondhatja)
    if (match.organizerId === session.user.id) {
      return NextResponse.json({ error: 'Szervezőként nem léphetsz ki. Mondd le a meccset.' }, { status: 400 })
    }

    const participant = await prisma.matchParticipant.findUnique({
      where: { matchId_userId: { matchId: params.id, userId: session.user.id } },
    })

    if (!participant) {
      return NextResponse.json({ error: 'Nem vagy résztvevője ennek a meccsnek.' }, { status: 400 })
    }

    await prisma.matchParticipant.delete({
      where: { id: participant.id },
    })

    // Ha játékos lépett ki, várólistáról előléptetés
    if (participant.type === 'player') {
      const nextWaiting = await prisma.matchParticipant.findFirst({
        where: { matchId: params.id, type: 'waitlist' },
        orderBy: { joinedAt: 'asc' },
      })

      if (nextWaiting) {
        await prisma.matchParticipant.update({
          where: { id: nextWaiting.id },
          data: { type: 'player' },
        })
      }

      // Státusz újraszámolás
      const playerCount = await prisma.matchParticipant.count({
        where: { matchId: params.id, type: 'player' },
      })

      let newStatus = 'open'
      if (playerCount >= match.maxPlayers) {
        newStatus = 'full'
      } else if (playerCount >= match.minPlayers) {
        newStatus = 'confirmed'
      }

      await prisma.match.update({
        where: { id: params.id },
        data: { status: newStatus },
      })
    }

    return NextResponse.json({ message: 'Kiléptél a meccsből.' })
  } catch (error) {
    console.error('Match leave error:', error)
    return NextResponse.json({ error: 'Hiba történt.' }, { status: 500 })
  }
}
