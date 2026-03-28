import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const token = searchParams.get('token')

  if (!token) {
    return NextResponse.json({ error: 'Hiányzó token.' }, { status: 400 })
  }

  try {
    const user = await prisma.user.findFirst({
      where: { verificationToken: token },
    })

    if (!user) {
      return NextResponse.json({ error: 'Érvénytelen token.' }, { status: 400 })
    }

    if (user.emailVerified) {
      return NextResponse.json({ message: 'Az email cím már meg van erősítve.' })
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerified: true,
        verificationToken: null,
      },
    })

    return NextResponse.json({ message: 'Email sikeresen megerősítve!' })
  } catch (error) {
    console.error('Verification error:', error)
    return NextResponse.json(
      { error: 'Hiba történt a megerősítés során.' },
      { status: 500 }
    )
  }
}
