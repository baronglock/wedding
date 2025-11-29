'use client'

import { MapPin, Clock, Navigation, Image as ImageIcon, Map } from 'lucide-react'
import { WEDDING_INFO } from '@/lib/utils'
import Image from 'next/image'
import { useState } from 'react'

export default function Location() {
  const [showMap, setShowMap] = useState<{ church: boolean; party: boolean }>({
    church: false,
    party: false
  })

  const weddingDate = new Date(WEDDING_INFO.date)
  const rawDate = new Intl.DateTimeFormat('pt-BR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(weddingDate)
  const formattedDate = rawDate.charAt(0).toUpperCase() + rawDate.slice(1)

  return (
    <section className="section-padding">
      <div className="container-wedding max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="heading-primary text-5xl md:text-6xl mb-4">
            Locais
          </h2>
          <p className="text-wedding-cream/90 text-lg">
            {formattedDate}
          </p>
        </div>

        {/* Locations Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Church */}
          <div className="bg-wedding-burgundy/90 backdrop-blur-sm shadow-elegant overflow-hidden hover-glow border border-wedding-gold/30">
            {/* Imagem/Mapa da Igreja */}
            <div className="relative h-80 w-full bg-black/30 p-4">
              {showMap.church ? (
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3602.8!2d-49.2717!3d-25.4297!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94dce46d6b8c0a0d%3A0x0!2zSWdyZWphIE9ydG9kb3hhIEFudGlvcXVpbmEgU8OjbyBKb3JnZQ!5e0!3m2!1spt-BR!2sbr"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title="Localização da Igreja"
                  className="absolute inset-0"
                />
              ) : (
                <div className="relative w-full h-full border-4 border-wedding-gold/30 shadow-lg">
                <Image
                  src={WEDDING_INFO.church.photo}
                  alt={WEDDING_INFO.church.name}
                  fill
                  className="object-cover"
                />
              </div>
              )}

              {/* Botão para alternar */}
              <button
                onClick={() => setShowMap(prev => ({ ...prev, church: !prev.church }))}
                className="absolute bottom-4 right-4 bg-wedding-burgundy/90 hover:bg-wedding-burgundy px-4 py-2 shadow-lg flex items-center gap-2 text-wedding-gold text-sm font-medium transition-all border border-wedding-gold/30"
              >
                {showMap.church ? (
                  <>
                    <ImageIcon size={16} />
                    Ver Foto
                  </>
                ) : (
                  <>
                    <Map size={16} />
                    Ver Mapa
                  </>
                )}
              </button>
            </div>

            <div className="p-8">
              <h3 className="text-wedding-gold uppercase tracking-wider text-sm mb-4 font-medium">
                Cerimônia Religiosa
              </h3>
              <h4 className="text-wedding-cream text-2xl mb-6" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{WEDDING_INFO.church.name}</h4>

              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <MapPin size={20} className="text-wedding-gold flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-wedding-cream">{WEDDING_INFO.church.address}</p>
                    <p className="text-wedding-cream/70 text-sm">
                      {WEDDING_INFO.church.neighborhood} - {WEDDING_INFO.church.city}/{WEDDING_INFO.church.state}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock size={20} className="text-wedding-gold flex-shrink-0" />
                  <p className="text-wedding-gold font-medium text-lg">{WEDDING_INFO.church.time}</p>
                </div>
              </div>

              <a
                href={WEDDING_INFO.church.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-transparent text-wedding-gold border-2 border-wedding-gold font-medium tracking-wide uppercase text-sm transition-all duration-300 hover:bg-wedding-gold hover:text-wedding-burgundy"
              >
                <Navigation size={18} />
                Abrir no Google Maps
              </a>
            </div>
          </div>

          {/* Party */}
          <div className="bg-wedding-burgundy/90 backdrop-blur-sm shadow-elegant overflow-hidden hover-glow border border-wedding-gold/30">
            {/* Imagem/Mapa da Festa */}
            <div className="relative h-80 w-full bg-black/30 p-4">
              {showMap.party ? (
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3602.5!2d-49.3354!3d-25.3935!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94dce39f26f847f1%3A0x0!2zU3BhemlvIEdpYXJkaW5v!5e0!3m2!1spt-BR!2sbr"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title="Localização da Festa"
                  className="absolute inset-0"
                />
              ) : (
                <div className="relative w-full h-full border-4 border-wedding-gold/30 shadow-lg">
                  <Image
                    src={WEDDING_INFO.party.photo}
                    alt={WEDDING_INFO.party.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              {/* Botão para alternar */}
              <button
                onClick={() => setShowMap(prev => ({ ...prev, party: !prev.party }))}
                className="absolute bottom-4 right-4 bg-wedding-burgundy/90 hover:bg-wedding-burgundy px-4 py-2 shadow-lg flex items-center gap-2 text-wedding-gold text-sm font-medium transition-all border border-wedding-gold/30"
              >
                {showMap.party ? (
                  <>
                    <ImageIcon size={16} />
                    Ver Foto
                  </>
                ) : (
                  <>
                    <Map size={16} />
                    Ver Mapa
                  </>
                )}
              </button>
            </div>

            <div className="p-8">
              <h3 className="text-wedding-gold uppercase tracking-wider text-sm mb-4 font-medium">
                Recepção
              </h3>
              <h4 className="text-wedding-cream text-2xl mb-6" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{WEDDING_INFO.party.name}</h4>

              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <MapPin size={20} className="text-wedding-gold flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-wedding-cream">{WEDDING_INFO.party.address}</p>
                    <p className="text-wedding-cream/70 text-sm">
                      {WEDDING_INFO.party.neighborhood} - {WEDDING_INFO.party.city}/{WEDDING_INFO.party.state}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock size={20} className="text-wedding-gold flex-shrink-0" />
                  <p className="text-wedding-gold font-medium text-lg">{WEDDING_INFO.party.time}</p>
                </div>
              </div>

              <a
                href={WEDDING_INFO.party.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-transparent text-wedding-gold border-2 border-wedding-gold font-medium tracking-wide uppercase text-sm transition-all duration-300 hover:bg-wedding-gold hover:text-wedding-burgundy"
              >
                <Navigation size={18} />
                Abrir no Google Maps
              </a>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-black/40 backdrop-blur-sm border border-wedding-gold/30 hover-scale hover-glow cursor-default transition-all duration-300">
            <h5 className="font-medium text-wedding-gold mb-2">Estacionamento</h5>
            <p className="text-wedding-cream/80 text-sm">Disponível nos dois locais</p>
          </div>

          <div className="text-center p-6 bg-black/40 backdrop-blur-sm border border-wedding-gold/30 hover-scale hover-glow cursor-default transition-all duration-300">
            <h5 className="font-medium text-wedding-gold mb-2">Traje</h5>
            <p className="text-wedding-cream/80 text-sm">Social</p>
          </div>

          <div className="text-center p-6 bg-black/40 backdrop-blur-sm border border-wedding-gold/30 hover-scale hover-glow cursor-default transition-all duration-300">
            <h5 className="font-medium text-wedding-gold mb-2">Confirmação</h5>
            <p className="text-wedding-cream/80 text-sm">Apenas convidados listados</p>
          </div>
        </div>
      </div>
    </section>
  )
}