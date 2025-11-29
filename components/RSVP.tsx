'use client'

import { useState } from 'react'
import { Check, Loader2, X } from 'lucide-react'
import { isValidEmail, HONEYPOT_FIELD_NAME } from '@/lib/utils'

interface FormData {
  name: string
  email: string
  attending: 'yes' | 'no'
  message?: string
  [HONEYPOT_FIELD_NAME]: string
}

export default function RSVP() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    attending: 'yes',
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

    setLoading(true)

    try {
      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          attending: formData.attending,
          message: formData.message,
          website_url: formData[HONEYPOT_FIELD_NAME]
        }),
      })

      if (!response.ok) {
        throw new Error('Erro na requisição')
      }

      console.log('RSVP Confirmado:', {
        name: formData.name,
        email: formData.email,
        attending: formData.attending,
        message: formData.message
      })
      setSubmitted(true)
    } catch (err) {
      setError('Erro ao enviar confirmação. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="bg-wedding-burgundy/90 backdrop-blur-sm p-12 max-w-lg shadow-elegant border border-wedding-gold/30">
          <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 mx-auto ${
            formData.attending === 'yes'
              ? 'bg-wedding-gold/20 text-wedding-gold'
              : 'bg-wedding-cream/20 text-wedding-cream'
          }`}>
            {formData.attending === 'yes' ? (
              <Check size={40} />
            ) : (
              <X size={40} />
            )}
          </div>

          <h2 className="text-wedding-gold text-3xl mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            {formData.attending === 'yes' ? 'Presença Confirmada' : 'Confirmação Recebida'}
          </h2>

          <p className="text-wedding-cream/90 mb-8">
            {formData.attending === 'yes'
              ? 'Ficamos felizes com sua confirmação. Será um prazer tê-lo conosco.'
              : 'Agradecemos por nos informar. Você estará em nossos pensamentos.'}
          </p>

          <button
            onClick={() => {
              setSubmitted(false)
              setFormData({
                name: '',
                email: '',
                attending: 'yes',
                message: '',
                [HONEYPOT_FIELD_NAME]: ''
              })
            }}
            className="px-8 py-4 bg-transparent text-wedding-gold border-2 border-wedding-gold font-medium tracking-wide uppercase text-sm transition-all duration-300 hover:bg-wedding-gold hover:text-wedding-burgundy"
          >
            Nova Confirmação
          </button>
        </div>
      </div>
    )
  }

  return (
    <section className="section-padding">
      <div className="container-wedding max-w-3xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="heading-primary text-5xl md:text-6xl mb-4">
            Confirme sua Presença
          </h2>
          <p className="text-wedding-cream/90 text-lg">
            Por favor, confirme a presença dos convidados listados no convite
          </p>
        </div>

        {/* Formulário */}
        <div className="bg-wedding-burgundy/90 backdrop-blur-sm p-8 md:p-12 shadow-elegant border border-wedding-gold/30">
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

            {/* Name Field */}
            <div>
              <label className="block text-wedding-gold text-sm font-medium uppercase tracking-wider mb-2">
                Nome do Responsável
              </label>
              <input
                required
                type="text"
                className="w-full px-4 py-3 bg-black/30 border border-wedding-gold/30 focus:outline-none focus:border-wedding-gold focus:ring-2 focus:ring-wedding-gold/20 transition-all duration-200 text-wedding-cream placeholder-wedding-cream/50"
                placeholder="Nome completo"
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

            {/* Attendance Selection */}
            <div>
              <label className="block text-wedding-gold text-sm font-medium uppercase tracking-wider mb-4">
                Confirmação
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setFormData({...formData, attending: 'yes'})}
                  className={`p-6 border-2 transition-all duration-300 ${
                    formData.attending === 'yes'
                      ? 'bg-wedding-gold text-wedding-burgundy border-wedding-gold'
                      : 'bg-black/30 border-wedding-gold/30 text-wedding-cream hover:border-wedding-gold'
                  }`}
                >
                  <Check size={28} className="mx-auto mb-2" />
                  <span className="block font-medium">Confirmo Presença</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({...formData, attending: 'no'})}
                  className={`p-6 border-2 transition-all duration-300 ${
                    formData.attending === 'no'
                      ? 'bg-wedding-cream text-wedding-burgundy border-wedding-cream'
                      : 'bg-black/30 border-wedding-gold/30 text-wedding-cream hover:border-wedding-cream'
                  }`}
                >
                  <X size={28} className="mx-auto mb-2" />
                  <span className="block font-medium">Não Poderei</span>
                </button>
              </div>
            </div>

            {/* Important Note */}
            <div className="p-4 bg-black/30 border-l-4 border-wedding-gold">
              <p className="text-wedding-cream text-sm">
                <strong className="text-wedding-gold">Importante:</strong> Apenas as pessoas listadas no convite estão autorizadas.
              </p>
            </div>

            {/* Message Field (Optional) */}
            <div>
              <label className="block text-wedding-gold text-sm font-medium uppercase tracking-wider mb-2">
                Mensagem <span className="text-xs normal-case text-wedding-cream/70">(opcional)</span>
              </label>
              <textarea
                className="w-full px-4 py-3 bg-black/30 border border-wedding-gold/30 focus:outline-none focus:border-wedding-gold focus:ring-2 focus:ring-wedding-gold/20 transition-all duration-200 text-wedding-cream placeholder-wedding-cream/50 resize-none"
                rows={3}
                placeholder="Deixe uma mensagem..."
                value={formData.message}
                onChange={e => setFormData({...formData, message: e.target.value})}
                maxLength={200}
              />
            </div>

            {error && (
              <div className="p-4 bg-wedding-burgundy/10 border border-wedding-burgundy/30 text-wedding-burgundy">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-center pt-4">
              <button
                type="submit"
                disabled={loading}
                className="btn-primary min-w-[200px] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin mr-2" size={18} />
                    Enviando...
                  </>
                ) : (
                  'Enviar Confirmação'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}