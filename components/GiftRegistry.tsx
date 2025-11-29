'use client'

import { useState, useEffect } from 'react'
import { Copy, Check, X, Loader2, Search, ChevronLeft, ChevronRight } from 'lucide-react'
import QRCode from 'qrcode'
import { generatePixPayload } from '@/lib/pix'
import { DEFAULT_GIFTS, WEDDING_INFO, formatCurrency } from '@/lib/utils'

interface GiftItem {
  id: number
  title: string
  price: number
  icon: string
  description: string
}

interface SelectedGift extends GiftItem {
  payload: string
  qrCode: string
}

type PriceRange = 'all' | 'medium' | 'high' | 'premium'

export default function GiftRegistry() {
  const [selectedGift, setSelectedGift] = useState<SelectedGift | null>(null)
  const [copied, setCopied] = useState(false)
  const [loadingQR, setLoadingQR] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [priceFilter, setPriceFilter] = useState<PriceRange>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 15

  // Filtros de preço
  const priceRanges = [
    { value: 'all', label: 'Todos' },
    { value: 'medium', label: 'Até R$ 1.000' },
    { value: 'high', label: 'R$ 1.000 - R$ 3.000' },
    { value: 'premium', label: 'Acima de R$ 3.000' }
  ]

  // Filter gifts
  const filteredGifts = DEFAULT_GIFTS.filter(gift => {
    const matchesSearch = gift.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         gift.description.toLowerCase().includes(searchTerm.toLowerCase())

    let matchesPrice = true
    switch(priceFilter) {
      case 'medium':
        matchesPrice = gift.price <= 1000
        break
      case 'high':
        matchesPrice = gift.price > 1000 && gift.price <= 3000
        break
      case 'premium':
        matchesPrice = gift.price > 3000
        break
    }

    return matchesSearch && matchesPrice
  })

  // Pagination
  const totalPages = Math.ceil(filteredGifts.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedGifts = filteredGifts.slice(startIndex, startIndex + itemsPerPage)

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, priceFilter])

  // Clicar no presente gera QR Code diretamente
  const handleGiftClick = async (gift: GiftItem) => {
    setLoadingQR(true)
    setCopied(false)

    const payload = generatePixPayload({
      key: WEDDING_INFO.pixKey,
      name: WEDDING_INFO.coupleNames,
      city: WEDDING_INFO.party.city,
      amount: gift.price,
      txid: `GIFT${gift.id}`,
      message: gift.title
    })

    try {
      const qrCode = await QRCode.toDataURL(payload, {
        width: 300,
        margin: 2,
        color: {
          dark: '#1f2937',
          light: '#FFFFFF'
        }
      })

      setSelectedGift({ ...gift, payload, qrCode })
    } catch (error) {
      console.error('Erro ao gerar QR Code:', error)
    } finally {
      setLoadingQR(false)
    }
  }

  const copyToClipboard = async () => {
    if (!selectedGift) return

    try {
      await navigator.clipboard.writeText(selectedGift.payload)
      setCopied(true)
      setTimeout(() => setCopied(false), 3000)
    } catch (err) {
      // Fallback para browsers antigos
      const textArea = document.createElement('textarea')
      textArea.value = selectedGift.payload
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      setCopied(true)
      setTimeout(() => setCopied(false), 3000)
    }
  }

  return (
    <section className="py-20">
      <div className="container-wedding">
        {/* Header */}
        <div className="text-center mb-12">
          <h2
            className="text-4xl md:text-5xl mb-4 text-white"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, textShadow: '1px 1px 3px rgba(0,0,0,0.5)' }}
          >
            Lista de Presentes
          </h2>

          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-16 h-px bg-white/40"></div>
            <div className="w-2 h-2 rotate-45 bg-white/50"></div>
            <div className="w-16 h-px bg-white/40"></div>
          </div>

          <p
            className="text-white/85 max-w-xl mx-auto text-base leading-relaxed"
            style={{ fontFamily: "'Cormorant Garamond', serif", textShadow: '1px 1px 2px rgba(0,0,0,0.4)' }}
          >
            Sua presença é o maior presente. Mas se desejar nos abençoar,
            escolha um item e contribua via PIX.
          </p>
        </div>

        {/* Filtros */}
        <div className="bg-black/40 backdrop-blur-sm p-5 mb-10 max-w-3xl mx-auto rounded-lg">
          {/* Busca */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" size={18} />
            <input
              type="text"
              placeholder="Buscar presente..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white/90 border-0 text-wedding-brown placeholder-wedding-brown/50 focus:outline-none focus:ring-2 focus:ring-white/50 rounded"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '16px' }}
            />
          </div>

          {/* Filtros de preço */}
          <div className="flex flex-wrap justify-center gap-2">
            {priceRanges.map((range) => (
              <button
                key={range.value}
                onClick={() => setPriceFilter(range.value as PriceRange)}
                className={`px-4 py-2 text-sm rounded transition-all duration-200 ${
                  priceFilter === range.value
                    ? 'bg-white text-wedding-burgundy font-semibold'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                {range.label}
              </button>
            ))}
          </div>

          {/* Contagem */}
          <p
            className="text-center text-white/70 text-sm mt-4"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            {filteredGifts.length} {filteredGifts.length === 1 ? 'presente' : 'presentes'}
          </p>
        </div>

        {/* Grid de presentes */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-10">
          {paginatedGifts.map((gift, index) => (
            <div
              key={gift.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.02}s` }}
            >
              <button
                onClick={() => handleGiftClick(gift)}
                className="group w-full relative active:scale-[0.97] transition-all duration-200"
              >
                {/* Camada de sombra com profundidade */}
                <div
                  className="absolute inset-0 translate-x-1.5 translate-y-1.5 group-hover:translate-x-2.5 group-hover:translate-y-2.5 transition-transform duration-300 rounded-sm"
                  style={{ background: 'rgba(74, 14, 26, 0.2)' }}
                />

                {/* Moldura externa dourada com brilho */}
                <div
                  className="relative p-[3px] rounded-sm overflow-hidden"
                  style={{
                    background: 'linear-gradient(145deg, #d4af37 0%, #f5e6b3 15%, #d4af37 30%, #aa8c2c 50%, #d4af37 70%, #f5e6b3 85%, #d4af37 100%)',
                    boxShadow: 'inset 0 0 2px rgba(255,255,255,0.5)',
                  }}
                >
                  {/* Borda interna burgundy */}
                  <div className="p-[2px] bg-wedding-burgundy/80">
                    {/* Interior do card */}
                    <div
                      className="relative p-4 text-center overflow-hidden"
                      style={{
                        background: 'linear-gradient(170deg, #fffdf8 0%, #f9f5eb 40%, #f4eed8 100%)',
                      }}
                    >
                      {/* Textura sutil de linho/papel */}
                      <div
                        className="absolute inset-0 opacity-[0.4]"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E")`,
                        }}
                      />

                      {/* Ornamento superior */}
                      <div className="flex items-center justify-center gap-1 mb-3">
                        <div className="w-4 h-px bg-gradient-to-r from-transparent to-wedding-gold"></div>
                        <svg className="w-3 h-3 text-wedding-gold" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2L14 8L20 8L15 12L17 19L12 15L7 19L9 12L4 8L10 8Z"/>
                        </svg>
                        <div className="w-4 h-px bg-gradient-to-l from-transparent to-wedding-gold"></div>
                      </div>

                      {/* Ícone com fundo sutil */}
                      <div
                        className="inline-flex items-center justify-center w-12 h-12 mb-2 rounded-full"
                        style={{
                          background: 'radial-gradient(circle, rgba(201,169,97,0.15) 0%, transparent 70%)',
                        }}
                      >
                        <span className="text-2xl">{gift.icon}</span>
                      </div>

                      {/* Título */}
                      <h3
                        className="text-sm text-wedding-brown leading-snug mb-1 line-clamp-2 min-h-[2.5rem]"
                        style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600 }}
                      >
                        {gift.title}
                      </h3>

                      {/* Ornamento de preço */}
                      <div className="relative inline-block mb-3">
                        <div className="absolute -left-3 top-1/2 w-2 h-px bg-wedding-gold/60"></div>
                        <div className="absolute -right-3 top-1/2 w-2 h-px bg-wedding-gold/60"></div>
                        <p
                          className="text-xl text-wedding-burgundy px-1"
                          style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700 }}
                        >
                          {formatCurrency(gift.price)}
                        </p>
                      </div>

                      {/* Botão com estilo lacre/selo */}
                      <div
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-wedding-burgundy text-white text-[10px] tracking-[0.15em] uppercase group-hover:bg-wedding-burgundy/90 transition-colors duration-200"
                        style={{
                          fontFamily: "'Cormorant Garamond', serif",
                          fontWeight: 500,
                          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.15), 0 1px 2px rgba(0,0,0,0.1)',
                        }}
                      >
                        <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M20 12V22H4V12M12 2L20 8V12H4V8L12 2Z"/>
                        </svg>
                        Presentear
                      </div>

                      {/* Ornamento inferior */}
                      <div className="flex items-center justify-center gap-1 mt-3">
                        <div className="w-3 h-px bg-wedding-gold/40"></div>
                        <div className="w-1 h-1 rounded-full bg-wedding-gold/50"></div>
                        <div className="w-3 h-px bg-wedding-gold/40"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            </div>
          ))}
        </div>

        {/* Paginação */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="p-2 bg-white border border-wedding-brown/20 hover:border-wedding-burgundy/40 disabled:opacity-30 disabled:cursor-not-allowed transition-all text-wedding-brown"
            >
              <ChevronLeft size={18} />
            </button>

            <div className="flex gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-9 h-9 text-sm transition-all ${
                    currentPage === page
                      ? 'bg-wedding-burgundy text-white'
                      : 'bg-white border border-wedding-brown/20 text-wedding-brown hover:border-wedding-burgundy/40'
                  }`}
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="p-2 bg-white border border-wedding-brown/20 hover:border-wedding-burgundy/40 disabled:opacity-30 disabled:cursor-not-allowed transition-all text-wedding-brown"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>

      {/* Modal PIX */}
      {selectedGift && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
          onClick={() => setSelectedGift(null)}
        >
          <div
            className="w-full max-w-sm bg-white relative max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Fechar */}
            <button
              onClick={() => setSelectedGift(null)}
              className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center text-wedding-brown/50 hover:text-wedding-burgundy transition-colors"
            >
              <X size={20} />
            </button>

            <div className="p-6">
              {/* Cabeçalho */}
              <div className="text-center mb-5">
                <span className="text-4xl block mb-3">{selectedGift.icon}</span>

                <h3
                  className="text-xl text-wedding-brown mb-1"
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600 }}
                >
                  {selectedGift.title}
                </h3>

                <p
                  className="text-2xl text-wedding-burgundy"
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600 }}
                >
                  {formatCurrency(selectedGift.price)}
                </p>
              </div>

              {/* QR Code */}
              <div className="bg-wedding-cream/50 p-4 mb-5">
                {loadingQR ? (
                  <div className="w-full aspect-square flex items-center justify-center">
                    <Loader2 className="animate-spin text-wedding-brown/40" size={40} />
                  </div>
                ) : (
                  <>
                    {selectedGift.qrCode && (
                      <div className="bg-white p-2 mb-3">
                        <img
                          src={selectedGift.qrCode}
                          alt="QR Code PIX"
                          className="w-full max-w-[180px] mx-auto"
                        />
                      </div>
                    )}

                    <p
                      className="text-xs text-wedding-brown/50 text-center mb-2"
                      style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    >
                      Escaneie o QR Code ou copie o código abaixo
                    </p>

                    <div className="bg-white p-2 border border-wedding-brown/10">
                      <div className="text-[10px] text-wedding-brown/60 font-mono break-all max-h-12 overflow-y-auto">
                        {selectedGift.payload}
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Botão Copiar */}
              <button
                onClick={copyToClipboard}
                className={`w-full py-3 flex items-center justify-center gap-2 transition-all duration-200 ${
                  copied
                    ? 'bg-green-700 text-white'
                    : 'bg-wedding-burgundy text-white hover:bg-wedding-burgundy/90'
                }`}
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                {copied ? (
                  <>
                    <Check size={18} />
                    Copiado!
                  </>
                ) : (
                  <>
                    <Copy size={18} />
                    Copiar Código PIX
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}