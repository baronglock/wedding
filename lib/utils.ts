import { clsx, type ClassValue } from 'clsx'

/**
 * Combina classes condicionalmente
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

/**
 * Formata valor em Real Brasileiro
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value)
}

/**
 * Valida email
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Honeypot field name para proteção anti-spam
 */
export const HONEYPOT_FIELD_NAME = 'website_url'

/**
 * Lista de presentes expandida
 */
export const DEFAULT_GIFTS = [
  // Ordenado do mais barato ao mais caro
  { id: 106, title: "Kit Utensílios de Madeira", price: 250.00, icon: "🥄", description: "Conjunto premium de utensílios de madeira para cozinha" },
  { id: 24, title: "Mixer", price: 280.00, icon: "🧋", description: "Mixer de mão para preparos rápidos" },
  { id: 44, title: "Vale Jantar", price: 300.00, icon: "🍽️", description: "Jantar romântico a dois" },
  { id: 27, title: "Churrasqueira", price: 300.00, icon: "🍖", description: "Churrasqueira elétrica de bancada" },
  { id: 43, title: "Cota Lua de Mel", price: 350.00, icon: "💝", description: "Contribuição para nossa viagem" },
  { id: 36, title: "Jantar Especial", price: 400.00, icon: "🍾", description: "Jantar em restaurante estrelado" },
  { id: 23, title: "Processador de Alimentos", price: 420.00, icon: "🥘", description: "Processador multifunções" },
  { id: 103, title: "Kit Cortina Provençal", price: 450.00, icon: "🪟", description: "Conjunto de cortinas estilo provençal" },
  { id: 35, title: "Day Spa Casal", price: 500.00, icon: "💆", description: "Dia completo de relaxamento" },
  { id: 39, title: "Kit Jardinagem", price: 500.00, icon: "🌱", description: "Ferramentas para nosso jardim" },
  { id: 42, title: "Kit Churrasco", price: 600.00, icon: "🔥", description: "Utensílios profissionais para churrasco" },
  { id: 22, title: "Cafeteira Espresso", price: 630.00, icon: "☕", description: "Máquina de café expresso automática" },
  { id: 104, title: "Kit Tênis para Casal", price: 700.00, icon: "🎾", description: "Raquetes e acessórios para o casal começar a jogar" },
  { id: 17, title: "Home Theater", price: 800.00, icon: "🎬", description: "Sistema de som surround" },
  { id: 107, title: "TV de Tubo + PlayStation 2", price: 800.00, icon: "🎮", description: "Setup retrô para o noivo jogar com o filho" },
  { id: 33, title: "Diária Hotel 5★", price: 800.00, icon: "🏨", description: "Uma noite em hotel de luxo" },
  { id: 40, title: "Piscina Inflável", price: 800.00, icon: "🏊", description: "Piscina para os dias de verão" },
  { id: 26, title: "Adega Climatizada", price: 800.00, icon: "🍷", description: "Adega para 29 garrafas" },
  { id: 102, title: "Cristaleira", price: 1000.00, icon: "🪞", description: "Cristaleira clássica para expor louças e cristais" },
  { id: 101, title: "Máquina de Costura", price: 1200.00, icon: "🧵", description: "Máquina de costura para criações e reparos" },
  { id: 105, title: "Estante de Livros Antiga", price: 1200.00, icon: "📚", description: "Estante vintage para nossa biblioteca" },
  { id: 13, title: "Estante para Sala", price: 1200.00, icon: "🗄️", description: "Estante moderna para sala" },
  { id: 25, title: "Jogo de Panelas de Cerâmica", price: 1200.00, icon: "🍳", description: "Conjunto premium antiaderente sem teflon" },
  { id: 41, title: "Conjunto de Malas", price: 1200.00, icon: "🧳", description: "Malas de viagem premium" },
  { id: 108, title: "Fogão Novo", price: 1300.00, icon: "🔥", description: "Fogão 5 bocas para nossas receitas" },
  { id: 10, title: "Mesa de Jantar", price: 1500.00, icon: "🪑", description: "Mesa com 6 cadeiras para receber amigos" },
  { id: 14, title: "Poltrona de Leitura", price: 1500.00, icon: "🪑", description: "Poltrona confortável para relaxar" },
  { id: 4, title: "Ar Condicionado", price: 2200.00, icon: "❄️", description: "Split inverter para nosso conforto" },
  { id: 7, title: "Lava-louças", price: 2500.00, icon: "🍽️", description: "Lava-louças 14 serviços" },
  { id: 11, title: "Cama Queen Size", price: 2500.00, icon: "🛏️", description: "Cama box queen com colchão ortopédico" },
  { id: 1, title: "Geladeira Inverse", price: 4500.00, icon: "🧊", description: "Geladeira frost free moderna para nosso lar" },
  { id: 28, title: "Pacote de Viagem", price: 5000.00, icon: "🏝️", description: "Contribuição especial para uma viagem dos noivos" },
]

/**
 * Informações do casamento
 */
export const WEDDING_INFO = {
  bride: "Milleny",
  groom: "Gabriel",
  date: new Date('2026-08-22T14:30:00-03:00'),

  // Cerimônia religiosa
  church: {
    name: "Igreja Ortodoxa Antioquina São Jorge",
    address: "Rua Brigadeiro Franco, 375",
    neighborhood: "Mercês",
    city: "Curitiba",
    state: "PR",
    time: "14:30",
    mapsUrl: "https://maps.google.com/?q=Igreja+Ortodoxa+Antioquina+São+Jorge+Rua+Brigadeiro+Franco+375+Mercês+Curitiba+PR",
    photo: "/church-photo.jpg"
  },

  // Festa/Recepção
  party: {
    name: "Spazio Giardino",
    address: "R. Soledade Regina Sanzovo Mourão, 600",
    neighborhood: "Lamenha Pequena",
    city: "Curitiba",
    state: "PR",
    time: "16:30",
    mapsUrl: "https://maps.google.com/?q=R.+Soledade+Regina+Sanzovo+Mourão+600+Lamenha+Pequena+Curitiba+PR+82415-040",
    photo: "/party-photo.jpg"
  },

  pixKey: process.env.NEXT_PUBLIC_PIX_KEY || 'noivos@email.com',
  coupleNames: "Gabriel e Milleny"
}

/**
 * Calcula tempo restante até o casamento
 */
export function getTimeUntilWedding() {
  const now = new Date()
  const difference = WEDDING_INFO.date.getTime() - now.getTime()

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isOver: true }
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
    isOver: false
  }
}