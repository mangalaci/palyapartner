import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Be kell jelentkezned.' }, { status: 401 })
  }

  const userId = session.user.id
  const gameRequestId = params.id

  try {
    // Fetch the game request with user info
    const gameRequest = await prisma.gameRequest.findUnique({
      where: { id: gameRequestId },
      include: { user: { select: { id: true, nickname: true } } },
    })

    if (!gameRequest) {
      return NextResponse.json({ error: 'Játékkérés nem található.' }, { status: 404 })
    }

    if (gameRequest.userId === userId) {
      return NextResponse.json({ error: 'Saját játékkérésedre nem jelentkezhetsz.' }, { status: 400 })
    }

    // Check if already applied
    const existing = await prisma.gameRequestResponse.findUnique({
      where: { gameRequestId_userId: { gameRequestId, userId } },
    })

    if (existing) {
      return NextResponse.json({ error: 'Már jelentkeztél erre a játékkérésre.' }, { status: 409 })
    }

    // Create response record
    const response = await prisma.gameRequestResponse.create({
      data: { gameRequestId, userId },
    })

    // Send message to the game request creator
    const dateStr = new Date(gameRequest.date).toLocaleDateString('hu-HU', {
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
    const districtStr = gameRequest.districts.length > 0
      ? ` (${gameRequest.districts.join(', ')})`
      : ''
    const msg = `Szia! Jelentkezem a játékkérésedre: ${gameRequest.sport} (${gameRequest.level}), ${dateStr}, ${gameRequest.city}${districtStr}.`

    await prisma.message.create({
      data: {
        senderId: userId,
        receiverId: gameRequest.userId,
        content: msg,
      },
    })

    return NextResponse.json(response)
  } catch (error) {
    console.error('Game request apply error:', error)
    return NextResponse.json(
      { error: 'Hiba történt a jelentkezés során.' },
      { status: 500 }
    )
  }
}
