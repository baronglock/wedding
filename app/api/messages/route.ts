import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'

// Schema de validação
const messageSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  message: z.string().min(10).max(500),
  website_url: z.string().optional() // Honeypot field
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validação com Zod
    const validation = messageSchema.safeParse(body)
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Dados inválidos' },
        { status: 400 }
      )
    }

    const data = validation.data

    // Honeypot check
    if (data.website_url) {
      return NextResponse.json({ success: true }, { status: 200 })
    }

    // Inicializa Resend apenas quando necessário
    const resend = new Resend(process.env.RESEND_API_KEY)

    // Envia email de notificação
    await resend.emails.send({
      from: 'Casamento G&M <onboarding@resend.dev>',
      to: 'gabriglock2@outlook.com',
      subject: `💌 Nova mensagem de ${data.name}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 500px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #4A0E1A; border-bottom: 2px solid #C9A961; padding-bottom: 10px;">
            💌 Nova Mensagem do Site!
          </h2>

          <div style="background: #FBF7F0; padding: 20px; border-left: 4px solid #C9A961; margin: 20px 0;">
            <p><strong>Nome:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p style="margin-top: 15px;"><strong>Mensagem:</strong></p>
            <p style="font-style: italic; color: #4A3D36; background: white; padding: 15px; border-radius: 5px;">
              "${data.message}"
            </p>
          </div>

          <p style="color: #7A8B7F; font-size: 12px;">
            Enviado em ${new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })}
          </p>
        </div>
      `
    })

    console.log('Mensagem recebida e email enviado:', data.name)

    return NextResponse.json({
      success: true,
      message: 'Mensagem enviada com sucesso!'
    })

  } catch (error) {
    console.error('Erro ao enviar mensagem:', error)
    return NextResponse.json(
      { error: 'Erro ao processar mensagem' },
      { status: 500 }
    )
  }
}
