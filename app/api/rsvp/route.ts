import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'

const resend = new Resend(process.env.RESEND_API_KEY)

// Schema de validação
const rsvpSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  attending: z.enum(['yes', 'no']),
  guests: z.number().optional(),
  message: z.string().optional(),
  website_url: z.string().optional() // Honeypot field
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validação com Zod
    const validation = rsvpSchema.safeParse(body)
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Dados inválidos' },
        { status: 400 }
      )
    }

    const data = validation.data

    // Honeypot check - rejeita spam silenciosamente
    if (data.website_url) {
      return NextResponse.json({ success: true }, { status: 200 })
    }

    const attending = data.attending === 'yes'
    const guestsText = data.guests && data.guests > 0 ? `\nAcompanhantes: ${data.guests}` : ''

    // Envia email de notificação
    await resend.emails.send({
      from: 'Casamento G&M <onboarding@resend.dev>',
      to: 'gabriglock2@outlook.com',
      subject: `${attending ? '✅' : '❌'} RSVP: ${data.name} ${attending ? 'confirmou presença!' : 'não poderá ir'}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 500px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #4A0E1A; border-bottom: 2px solid #C9A961; padding-bottom: 10px;">
            ${attending ? '🎉 Nova Confirmação de Presença!' : '😢 Ausência Confirmada'}
          </h2>

          <div style="background: #FBF7F0; padding: 20px; border-left: 4px solid #C9A961; margin: 20px 0;">
            <p><strong>Nome:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Vai comparecer:</strong> ${attending ? '✅ Sim' : '❌ Não'}</p>
            ${guestsText ? `<p><strong>Acompanhantes:</strong> ${data.guests}</p>` : ''}
            ${data.message ? `<p><strong>Mensagem:</strong> "${data.message}"</p>` : ''}
          </div>

          <p style="color: #7A8B7F; font-size: 12px;">
            Enviado em ${new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })}
          </p>
        </div>
      `
    })

    console.log('RSVP recebido e email enviado:', data.name)

    return NextResponse.json({
      success: true,
      message: 'Confirmação recebida com sucesso!'
    })

  } catch (error) {
    console.error('Erro no RSVP:', error)
    return NextResponse.json(
      { error: 'Erro ao processar confirmação' },
      { status: 500 }
    )
  }
}
