import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'

const trackSchema = z.object({
  guestName: z.string().min(2),
  guestEmail: z.string().email(),
  giftName: z.string().min(1),
  giftPrice: z.string().optional()
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const validation = trackSchema.safeParse(body)
    if (!validation.success) {
      return NextResponse.json({ success: false }, { status: 400 })
    }

    const data = validation.data

    const resend = new Resend(process.env.RESEND_API_KEY)

    await resend.emails.send({
      from: 'Casamento G&M <onboarding@resend.dev>',
      to: 'gabriglock2@outlook.com',
      subject: `🎁 ${data.guestName} abriu um presente!`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 500px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #4A0E1A; border-bottom: 2px solid #C9A961; padding-bottom: 10px;">
            🎁 Alguém está vendo um presente!
          </h2>

          <div style="background: #FBF7F0; padding: 20px; border-left: 4px solid #C9A961; margin: 20px 0;">
            <p><strong>Convidado:</strong> ${data.guestName}</p>
            <p><strong>Email:</strong> ${data.guestEmail}</p>
            <p style="margin-top: 15px;"><strong>Presente visualizado:</strong></p>
            <p style="font-size: 18px; color: #4A0E1A; background: white; padding: 15px; border-radius: 5px;">
              ${data.giftName}
              ${data.giftPrice ? `<br><span style="color: #7A8B7F; font-size: 14px;">${data.giftPrice}</span>` : ''}
            </p>
          </div>

          <p style="color: #7A8B7F; font-size: 12px;">
            ${new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })}
          </p>
        </div>
      `
    })

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('Erro no rastreio:', error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
