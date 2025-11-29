'use client'

import { useState, useEffect } from 'react'
import { Calendar, MapPin, Clock } from 'lucide-react'
import { WEDDING_INFO } from '@/lib/utils'

export default function Hero() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isOver: false
  })

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    const calculateTimeLeft = () => {
      const now = new Date()
      const weddingDate = new Date('2026-08-22T14:30:00-03:00')
      const difference = weddingDate.getTime() - now.getTime()

      if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0, isOver: true }
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((difference % (1000 * 60)) / 1000)

      return {
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds,
        isOver: false
      }
    }

    setTimeLeft(calculateTimeLeft())

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Imagem de fundo - Interior de igreja clássica vintage */}
      {/* Adicione sua imagem em public/hero-background.jpg para usar imagem personalizada */}
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/hero-background.jpg')",
            filter: 'grayscale(50%) sepia(15%) contrast(1.1)',
          }}
        />
        {/* Gradiente sutil nas bordas para moldura elegante */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40" />
      </div>

      <div className="container-wedding relative z-10 text-center py-20">

        {/* Cabeçalho minimalista */}
        <div className="mb-12 pt-8">
          <p className="inline-block text-white/90 text-sm font-medium uppercase tracking-[0.3em] mb-8 bg-black/40 backdrop-blur-sm px-6 py-2 rounded-full">
            Solicitamos a honra de sua presença no casamento de
          </p>

          {/* Nomes em fonte clássica elegante */}
          <h1 className="text-6xl md:text-7xl lg:text-8xl mb-8 leading-tight text-white" style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontWeight: 400, letterSpacing: '0.03em', textShadow: '2px 2px 8px rgba(0,0,0,0.7), 0 0 30px rgba(0,0,0,0.5)' }}>
            {WEDDING_INFO.groom} & {WEDDING_INFO.bride}
          </h1>

          {/* Data principal */}
          <div className="inline-flex items-center justify-center gap-6 mb-4 bg-black/40 backdrop-blur-sm px-8 py-3 rounded-full">
            <span className="text-2xl font-light text-white/95">22</span>
            <span className="w-px h-6 bg-white/40"></span>
            <span className="text-2xl font-light text-white/95">08</span>
            <span className="w-px h-6 bg-white/40"></span>
            <span className="text-2xl font-light text-white/95">2026</span>
          </div>

          <p className="text-white/80 font-light text-lg mt-3">
            Sábado • 14h30
          </p>
        </div>

        {/* Countdown elegante e minimalista */}
        {mounted && !timeLeft.isOver && (
          <div className="mb-16">
            <div className="inline-flex items-baseline justify-center gap-2 md:gap-4 bg-black/40 backdrop-blur-sm px-8 py-4 rounded-full">
              {[
                { value: timeLeft.days, label: 'd' },
                { value: timeLeft.hours, label: 'h' },
                { value: timeLeft.minutes, label: 'm' },
                { value: timeLeft.seconds, label: 's' }
              ].map((item, index) => (
                <div key={index} className="flex items-baseline">
                  <span className="text-3xl md:text-4xl lg:text-5xl font-light text-white" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    {String(item.value).padStart(2, '0')}
                  </span>
                  <span className="text-sm text-white/60 ml-0.5">
                    {item.label}
                  </span>
                  {index < 3 && (
                    <span className="text-white/30 mx-2 md:mx-3 text-xl">·</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Divisor elegante */}
        <div className="relative h-px bg-white/30 my-12 max-w-md mx-auto">
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white/60 rotate-45"></div>
        </div>

        {/* Frase do convite - visível */}
        <div className="inline-block bg-black/40 backdrop-blur-sm px-8 py-4 rounded-2xl">
          <p className="text-white/90 text-lg md:text-xl font-light italic max-w-2xl mx-auto">
            "Não te propagarás apenas avante, mas para o alto! Que o jardim do casamento nos sirva a esse propósito."
          </p>
        </div>
      </div>
    </section>
  )
}