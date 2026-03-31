import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const match = await prisma.match.findUnique({
      where: { id: params.id },
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
    })

    if (!match) {
      return NextResponse.json({ error: 'Meccs nem található.' }, { status: 404 })
    }

    return NextResponse.json(match)
  } catch (error) {
    console.error('Match fetch error:', error)
    return NextResponse.json({ error: 'Hiba történt.' }, { status: 500 })
  }
}
