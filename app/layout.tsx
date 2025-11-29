import type { Metadata } from 'next'
import { Playfair_Display, Lato } from 'next/font/google'
import './globals.css'
import GrainyOverlay from '@/components/GrainyOverlay'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const lato = Lato({
  weight: ['300', '400', '700'],
  subsets: ['latin'],
  variable: '--font-lato',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Gabriel & Milleny - Nosso Casamento',
  description: 'Convidamos você para celebrar o início de nossa jornada juntos. 22 de Agosto de 2026',
  keywords: 'casamento, Gabriel, Milleny, 2026, Curitiba',
  icons: {
    icon: '/icon.svg',
  },
  openGraph: {
    title: 'Gabriel & Milleny - Nosso Casamento',
    description: 'Save the Date - 22 de Agosto de 2026',
    type: 'website',
    locale: 'pt_BR',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={`${playfair.variable} ${lato.variable}`}>
      <body className="font-sans bg-wedding-bg selection:bg-wedding-accent selection:text-white">
        <GrainyOverlay />
        {children}
      </body>
    </html>
  )
}