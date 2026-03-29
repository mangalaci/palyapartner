import { Resend } from 'resend'

function getResend() {
  return new Resend(process.env.RESEND_API_KEY)
}

export async function sendVerificationEmail(email: string, token: string) {
  const baseUrl = process.env.NEXTAUTH_URL || 'https://palyapartner.vercel.app'
  const verifyUrl = `${baseUrl}/verify?token=${token}`

  await getResend().emails.send({
    from: 'PályaPartner <onboarding@resend.dev>',
    to: email,
    subject: 'Email cím megerősítése – PályaPartner',
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 24px;">
        <h2 style="color: #2563eb;">PályaPartner</h2>
        <p>Szia!</p>
        <p>Köszönjük a regisztrációt! Kattints az alábbi gombra az email címed megerősítéséhez:</p>
        <a
          href="${verifyUrl}"
          style="display: inline-block; background: #2563eb; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; margin: 16px 0;"
        >
          Email megerősítése
        </a>
        <p style="color: #6b7280; font-size: 14px;">
          Ha nem te regisztráltál, nyugodtan hagyd figyelmen kívül ezt az emailt.
        </p>
        <p style="color: #9ca3af; font-size: 12px; margin-top: 24px;">
          Ha a gomb nem működik, másold be ezt a linket a böngésződbe:<br/>
          ${verifyUrl}
        </p>
      </div>
    `,
  })
}

export async function sendPasswordResetEmail(email: string, token: string) {
  const baseUrl = process.env.NEXTAUTH_URL || 'https://palyapartner.vercel.app'
  const resetUrl = `${baseUrl}/uj-jelszo?token=${token}`

  await getResend().emails.send({
    from: 'PályaPartner <onboarding@resend.dev>',
    to: email,
    subject: 'Jelszó visszaállítás – PályaPartner',
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 24px;">
        <h2 style="color: #2563eb;">PályaPartner</h2>
        <p>Szia!</p>
        <p>Jelszó visszaállítást kértél. Kattints az alábbi gombra az új jelszó beállításához:</p>
        <a
          href="${resetUrl}"
          style="display: inline-block; background: #2563eb; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; margin: 16px 0;"
        >
          Új jelszó beállítása
        </a>
        <p style="color: #6b7280; font-size: 14px;">
          Ez a link 1 óráig érvényes. Ha nem te kérted, hagyd figyelmen kívül.
        </p>
        <p style="color: #9ca3af; font-size: 12px; margin-top: 24px;">
          Ha a gomb nem működik, másold be ezt a linket a böngésződbe:<br/>
          ${resetUrl}
        </p>
      </div>
    `,
  })
}
