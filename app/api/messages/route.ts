import { NextRequest, NextResponse } from 'next/server'
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

    // Registra a mensagem
    console.log('Mensagem recebida:', {
      name: data.name,
      email: data.email,
      message: data.message,
      timestamp: new Date().toISOString()
    })

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