import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

const ADMIN_EMAILS = [
  'laszlo.virtualtryon@gmail.com',
]

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email || !ADMIN_EMAILS.includes(session.user.email)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = params

  const user = await prisma.user.findUnique({ where: { id }, select: { email: true } })
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  if (ADMIN_EMAILS.includes(user.email)) {
    return NextResponse.json({ error: 'Admin nem törölhető' }, { status: 403 })
  }

  await prisma.user.delete({ where: { id } })

  return NextResponse.json({ success: true })
}
