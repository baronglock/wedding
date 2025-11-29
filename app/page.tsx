'use client'

import { useState, useEffect } from 'react'
import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import RSVP from '@/components/RSVP'
import GiftRegistry from '@/components/GiftRegistry'
import Location from '@/components/Location'
import Messages from '@/components/Messages'

export default function Home() {
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    // Observer para detectar qual seção está visível durante o scroll
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }, observerOptions)

    // Observar todas as seções
    const sections = document.querySelectorAll('section[id]')
    sections.forEach((section) => observer.observe(section))

    return () => {
      sections.forEach((section) => observer.unobserve(section))
    }
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const offset = 80 // altura do menu
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      const offsetPosition = elementPosition - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  return (
    <main className="relative">
      <Navigation
        activeTab={activeSection}
        setActiveTab={scrollToSection}
      />

      {/* Hero Section */}
      <section id="home">
        <Hero />
      </section>

      {/* Seções com fundo de velas religiosas */}
      <div className="relative">
        {/* Imagem de fundo com velas - fixa em todas as seções abaixo */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(/candles-background.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            backgroundRepeat: 'no-repeat'
          }}
        />
        {/* Overlay escuro para ambiente mais intimista */}
        <div className="absolute inset-0 z-0 bg-black/60" />

        {/* RSVP Section */}
        <section id="rsvp" className="relative z-10">
          <RSVP />
        </section>

        {/* Gifts Section */}
        <section id="gifts" className="relative z-10">
          <GiftRegistry />
        </section>

        {/* Location Section */}
        <section id="location" className="relative z-10">
          <Location />
        </section>

        {/* Messages Section */}
        <section id="messages" className="relative z-10">
          <Messages />
        </section>

        {/* Footer profissional */}
        <footer className="relative z-10 bg-wedding-moss text-wedding-cream py-12">
          <div className="container-wedding text-center">
            <p className="text-script text-4xl mb-4 hover-pulse cursor-default">Gabriel & Milleny</p>
            <div className="divider-elegant mx-auto max-w-xs" />
            <p className="text-wedding-cream/90 text-sm uppercase tracking-wider hover-underline inline-block cursor-default">
              22 de Agosto de 2026
            </p>
          </div>
        </footer>
      </div>
    </main>
  )
}