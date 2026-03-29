import { NextResponse } from 'next/server'
import { hash } from 'bcryptjs'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const { token, password } = await req.json()

    if (!token || !password) {
      return NextResponse.json({ error: 'Hiányzó adatok.' }, { status: 400 })
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'A jelszónak legalább 6 karakter hosszúnak kell lennie.' },
        { status: 400 }
      )
    }

    const user = await prisma.user.findFirst({
      where: { resetToken: token },
    })

    if (!user || !user.resetTokenExpiry || user.resetTokenExpiry < new Date()) {
      return NextResponse.json(
        { error: 'Érvénytelen vagy lejárt link. Kérj új jelszó-visszaállítást.' },
        { status: 400 }
      )
    }

    const passwordHash = await hash(password, 12)

    await prisma.user.update({
      where: { id: user.id },
      data: {
        passwordHash,
        resetToken: null,
        resetTokenExpiry: null,
      },
    })

    return NextResponse.json({ message: 'Jelszó sikeresen módosítva!' })
  } catch (error) {
    console.error('Reset password error:', error)
    return NextResponse.json(
      { error: 'Hiba történt a jelszó módosítása során.' },
      { status: 500 }
    )
  }
}
