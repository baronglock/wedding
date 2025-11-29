'use client'

import { useState } from 'react'
import { Send, Loader2 } from 'lucide-react'
import { isValidEmail, HONEYPOT_FIELD_NAME } from '@/lib/utils'

interface MessageData {
  name: string
  email: string
  message: string
  [HONEYPOT_FIELD_NAME]: string
}

export default function Messages() {
  const [formData, setFormData] = useState<MessageData>({
    name: '',
    email: '',
    message: '',
    [HONEYPOT_FIELD_NAME]: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Honeypot check
    if (formData[HONEYPOT_FIELD_NAME]) {
      setSubmitted(true)
      return
    }

    // Validação
    if (!formData.name.trim()) {
      setError('Por favor, insira seu nome')
      return
    }

    if (!isValidEmail(formData.email)) {
      setError('Por favor, insira um email válido')
      return
    }

    if (!formData.message.trim()) {
      setError('Por favor, escreva uma mensagem')
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          website_url: formData[HONEYPOT_FIELD_NAME]
        }),
      })

      if (!response.ok) {
        throw new Error('Erro na requisição')
      }

      setSubmitted(true)
    } catch (err) {
      setError('Erro ao enviar mensagem. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="bg-wedding-burgundy/90 backdrop-blur-sm p-12 max-w-lg shadow-elegant border border-wedding-gold/30">
          <h2 className="text-wedding-gold text-3xl mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Mensagem Enviada
          </h2>

          <p className="text-wedding-cream/90 mb-8">
            Agradecemos suas palavras carinhosas.
            Guardaremos sua mensagem com muito carinho.
          </p>

          <button
            onClick={() => {
              setSubmitted(false)
              setFormData({
                name: '',
                email: '',
                message: '',
                [HONEYPOT_FIELD_NAME]: ''
              })
            }}
            className="px-8 py-4 bg-transparent text-wedding-gold border-2 border-wedding-gold font-medium tracking-wide uppercase text-sm transition-all duration-300 hover:bg-wedding-gold hover:text-wedding-burgundy"
          >
            Enviar Nova Mensagem
          </button>
        </div>
      </div>
    )
  }

  return (
    <section className="section-padding">
      <div className="container-wedding max-w-4xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="heading-primary text-5xl md:text-6xl mb-4">
            Deixe sua Mensagem
          </h2>
          <p className="text-wedding-cream/90 text-lg">
            Envie suas bênçãos e votos de felicidade aos noivos
          </p>
        </div>

        {/* Formulário */}
        <div className="bg-wedding-burgundy/90 backdrop-blur-sm p-8 md:p-12 border border-wedding-gold/30">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Honeypot */}
            <input
              type="text"
              name={HONEYPOT_FIELD_NAME}
              value={formData[HONEYPOT_FIELD_NAME]}
              onChange={e => setFormData({...formData, [HONEYPOT_FIELD_NAME]: e.target.value})}
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
            />

            <div className="grid md:grid-cols-2 gap-6">
              {/* Name Field */}
              <div>
                <label className="block text-wedding-gold text-sm font-medium uppercase tracking-wider mb-2">
                  Nome
                </label>
                <input
                  required
                  type="text"
                  className="w-full px-4 py-3 bg-black/30 border border-wedding-gold/30 focus:outline-none focus:border-wedding-gold focus:ring-2 focus:ring-wedding-gold/20 transition-all duration-200 text-wedding-cream placeholder-wedding-cream/50"
                  placeholder="Seu nome completo"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-wedding-gold text-sm font-medium uppercase tracking-wider mb-2">
                  Email
                </label>
                <input
                  required
                  type="email"
                  className="w-full px-4 py-3 bg-black/30 border border-wedding-gold/30 focus:outline-none focus:border-wedding-gold focus:ring-2 focus:ring-wedding-gold/20 transition-all duration-200 text-wedding-cream placeholder-wedding-cream/50"
                  placeholder="seu@email.com"
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            {/* Message Field */}
            <div>
              <label className="block text-wedding-gold text-sm font-medium uppercase tracking-wider mb-2">
                Mensagem
              </label>
              <textarea
                required
                className="w-full px-4 py-3 bg-black/30 border border-wedding-gold/30 focus:outline-none focus:border-wedding-gold focus:ring-2 focus:ring-wedding-gold/20 transition-all duration-200 text-wedding-cream placeholder-wedding-cream/50 resize-none"
                rows={6}
                placeholder="Escreva sua mensagem para os noivos..."
                value={formData.message}
                onChange={e => setFormData({...formData, message: e.target.value})}
                maxLength={500}
              />
              <p className="text-xs text-wedding-cream/60 mt-2 text-right">
                {formData.message.length}/500 caracteres
              </p>
            </div>

            {error && (
              <div className="p-4 bg-black/30 border border-wedding-cream/30 text-wedding-cream">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-center pt-4">
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-4 bg-wedding-gold text-wedding-burgundy font-medium tracking-wide uppercase text-sm transition-all duration-300 hover:bg-wedding-cream disabled:opacity-50 disabled:cursor-not-allowed min-w-[200px] flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin mr-2" size={18} />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send className="mr-2" size={18} />
                    Enviar Mensagem
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Nota elegante */}
          <div className="text-center mt-12 pt-8 border-t border-wedding-gold/20">
            <p className="text-wedding-moss/80 italic">
              "O amor é paciente, o amor é bondoso"
            </p>
            <p className="text-wedding-moss/60 text-sm mt-1">
              1 Coríntios 13:4
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}