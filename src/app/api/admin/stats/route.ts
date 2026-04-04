import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

const ADMIN_EMAIL = 'laszlo.virtualtryon@gmail.com'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email || session.user.email !== ADMIN_EMAIL) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const [
    totalUsers,
    verifiedUsers,
    totalMatches,
    totalGameRequests,
    totalMessages,
    usersByCity,
    usersBySport,
    recentUsers,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.user.count({ where: { emailVerified: true } }),
    prisma.match.count(),
    prisma.gameRequest.count(),
    prisma.message.count(),
    prisma.$queryRaw`SELECT city, COUNT(*)::int as count FROM "User" GROUP BY city ORDER BY count DESC`,
    prisma.$queryRaw`SELECT sport, COUNT(*)::int as count FROM "UserSport" GROUP BY sport ORDER BY count DESC`,
    prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50,
      select: {
        id: true,
        nickname: true,
        email: true,
        city: true,
        districts: true,
        ageGroup: true,
        emailVerified: true,
        createdAt: true,
        photoUrl: true,
        sports: { select: { sport: true, level: true } },
        _count: {
          select: {
            sentMessages: true,
            receivedMessages: true,
            organizedMatches: true,
            gameRequests: true,
          },
        },
      },
    }),
  ])

  return NextResponse.json({
    stats: {
      totalUsers,
      verifiedUsers,
      totalMatches,
      totalGameRequests,
      totalMessages,
    },
    usersByCity,
    usersBySport,
    recentUsers,
  })
}
