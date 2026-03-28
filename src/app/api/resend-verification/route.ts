import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendVerificationEmail } from '@/lib/email'

export async function POST(req: Request) {
  try {
    const { email } = await req.json()

    if (!email) {
      return NextResponse.json({ error: 'Email cím szükséges.' }, { status: 400 })
    }

    const user = await prisma.user.findUnique({ where: { email } })

    if (!user) {
      return NextResponse.json({ message: 'Ha létezik a fiók, elküldtük az emailt.' })
    }

    if (user.emailVerified) {
      return NextResponse.json({ message: 'Ez az email cím már meg van erősítve.' })
    }

    const verificationToken = crypto.randomUUID()

    await prisma.user.update({
      where: { id: user.id },
      data: { verificationToken },
    })

    await sendVerificationEmail(email, verificationToken)

    return NextResponse.json({ message: 'Megerősítő email elküldve!' })
  } catch (error) {
    console.error('Resend verification error:', error)
    return NextResponse.json(
      { error: 'Hiba történt az email küldés során.' },
      { status: 500 }
    )
  }
}
