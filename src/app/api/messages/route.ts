import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// Get conversations list
export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Be kell jelentkezned.' }, { status: 401 })
  }

  try {
    const userId = session.user.id

    // Get all users this user has conversations with
    const messages = await prisma.message.findMany({
      where: {
        OR: [{ senderId: userId }, { receiverId: userId }],
      },
      orderBy: { createdAt: 'desc' },
      include: {
        sender: { select: { id: true, nickname: true } },
        receiver: { select: { id: true, nickname: true } },
      },
    })

    // Group by conversation partner
    const conversationMap = new Map<
      string,
      { partnerId: string; partnerName: string; lastMessage: string; lastSenderId: string; lastDate: Date; unread: number }
    >()

    for (const msg of messages) {
      const partnerId = msg.senderId === userId ? msg.receiverId : msg.senderId
      const partnerName =
        msg.senderId === userId ? msg.receiver.nickname : msg.sender.nickname

      if (!conversationMap.has(partnerId)) {
        const unreadCount = messages.filter(
          (m) => m.senderId === partnerId && m.receiverId === userId && !m.read
        ).length

        conversationMap.set(partnerId, {
          partnerId,
          partnerName,
          lastMessage: msg.content,
          lastSenderId: msg.senderId,
          lastDate: msg.createdAt,
          unread: unreadCount,
        })
      }
    }

    const conversations = Array.from(conversationMap.values()).sort(
      (a, b) => b.lastDate.getTime() - a.lastDate.getTime()
    )

    return NextResponse.json(conversations)
  } catch (error) {
    console.error('Conversations fetch error:', error)
    return NextResponse.json([], { status: 500 })
  }
}
