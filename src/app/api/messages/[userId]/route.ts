import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// Get messages with a specific user
export async function GET(
  req: Request,
  { params }: { params: { userId: string } }
) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Be kell jelentkezned.' }, { status: 401 })
  }

  try {
    const myId = session.user.id
    const partnerId = params.userId

    // Mark messages as read
    await prisma.message.updateMany({
      where: {
        senderId: partnerId,
        receiverId: myId,
        read: false,
      },
      data: { read: true },
    })

    const messages = await prisma.message.findMany({
      where: {
        OR: [
          { senderId: myId, receiverId: partnerId },
          { senderId: partnerId, receiverId: myId },
        ],
      },
      orderBy: { createdAt: 'asc' },
      include: {
        sender: { select: { id: true, nickname: true } },
      },
    })

    return NextResponse.json(messages)
  } catch (error) {
    console.error('Messages fetch error:', error)
    return NextResponse.json([], { status: 500 })
  }
}

// Send a message
export async function POST(
  req: Request,
  { params }: { params: { userId: string } }
) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Be kell jelentkezned.' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const { content } = body

    if (!content?.trim()) {
      return NextResponse.json({ error: 'Az üzenet nem lehet üres.' }, { status: 400 })
    }

    const message = await prisma.message.create({
      data: {
        senderId: session.user.id,
        receiverId: params.userId,
        content: content.trim(),
      },
      include: {
        sender: { select: { id: true, nickname: true } },
      },
    })

    return NextResponse.json(message)
  } catch (error) {
    console.error('Message send error:', error)
    return NextResponse.json(
      { error: 'Hiba történt az üzenet küldése során.' },
      { status: 500 }
    )
  }
}
