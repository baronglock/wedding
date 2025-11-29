import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

// Schema de validação simplificado
const rsvpSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  attending: z.enum(['yes', 'no']),
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

    // Aqui você pode salvar em um arquivo JSON local ou enviar email
    // Por enquanto, apenas registra no console
    console.log('RSVP recebido:', {
      name: data.name,
      email: data.email,
      attending: data.attending === 'yes',
      message: data.message,
      timestamp: new Date().toISOString()
    })

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