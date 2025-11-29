'use client'

import { Heart, Check, Gift, MapPin, MessageSquare, Menu, X } from 'lucide-react'
import { useState, useEffect } from 'react'

interface NavigationProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export default function Navigation({ activeTab, setActiveTab }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { id: 'home', label: 'Início', icon: Heart },
    { id: 'rsvp', label: 'Confirmação', icon: Check },
    { id: 'gifts', label: 'Presentes', icon: Gift },
    { id: 'location', label: 'Local', icon: MapPin },
    { id: 'messages', label: 'Mensagens', icon: MessageSquare },
  ]

  const handleNavClick = (id: string) => {
    setActiveTab(id)
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      {/* Desktop Navigation - Elegante Escuro */}
      <nav className={`fixed top-0 left-0 right-0 z-50 hidden md:block transition-all duration-300 border-b ${
        isScrolled
          ? 'bg-wedding-burgundy shadow-lg py-4 border-wedding-gold/30'
          : 'bg-wedding-burgundy/95 backdrop-blur-sm py-6 border-wedding-gold/20'
      }`}>
        <div className="container-wedding">
          <div className="flex items-center justify-between">
            {/* Logo/Nomes com símbolo */}
            <div className="text-script text-2xl text-wedding-gold flex items-center gap-2">
              G <span className="text-wedding-cream text-lg">♦</span> M
            </div>

            {/* Menu Central */}
            <div className="flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative py-2 text-sm font-medium tracking-wide uppercase transition-all duration-300 ${
                    activeTab === item.id
                      ? 'text-wedding-gold'
                      : 'text-wedding-cream/80 hover:text-wedding-gold'
                  }`}
                >
                  {item.label}

                  {/* Indicador ativo */}
                  {activeTab === item.id && (
                    <span className="absolute -bottom-2 left-0 right-0 h-0.5 bg-wedding-gold" />
                  )}
                </button>
              ))}
            </div>

            {/* Data */}
            <div className="text-wedding-cream/90 text-sm">
              22.08.2026
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="md:hidden">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={`fixed top-4 right-4 z-50 p-3 transition-all duration-300 ${
            isMobileMenuOpen
              ? 'bg-wedding-gold text-wedding-burgundy'
              : 'bg-wedding-burgundy shadow-lg text-wedding-gold border border-wedding-gold/30'
          }`}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu Overlay */}
        <div className={`fixed inset-0 z-40 bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`} onClick={() => setIsMobileMenuOpen(false)} />

        {/* Mobile Menu Panel */}
        <div className={`fixed right-0 top-0 bottom-0 z-40 w-80 bg-wedding-burgundy shadow-2xl transform transition-transform duration-300 border-l border-wedding-gold/30 ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          <div className="pt-20 px-6">
            <div className="text-center mb-8">
              <p className="text-script text-3xl text-wedding-gold">Gabriel & Milleny</p>
              <p className="text-wedding-cream/80 text-sm mt-2">22 de Agosto de 2026</p>
            </div>

            <div className="space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center gap-4 px-4 py-3 transition-all duration-300 ${
                    activeTab === item.id
                      ? 'bg-wedding-gold/20 text-wedding-gold border-l-4 border-wedding-gold'
                      : 'text-wedding-cream/80 hover:bg-wedding-gold/10 hover:text-wedding-gold'
                  }`}
                >
                  <item.icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}