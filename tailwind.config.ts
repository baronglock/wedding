import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Paleta Retrô Anos 40 - Baseada no Convite
        wedding: {
          cream: '#FBF7F0',       // Creme principal (fundo)
          'cream-dark': '#F5EFE6', // Creme escuro para cards
          moss: '#7A8B7F',        // Verde musgo claro
          'moss-light': '#94A89A', // Verde musgo mais claro
          'moss-dark': '#5A6B5F',  // Verde musgo escuro
          burgundy: '#4A0E1A',    // Bordô sangue escuro
          'burgundy-light': '#6B1E2B', // Bordô médio
          brown: '#4A3D36',       // Marrom para textos
          gold: '#C9A961',        // Dourado vintage
          paper: '#FAF6ED',       // Tom de papel antigo
          // Cores antigas para compatibilidade
          bg: '#FBF7F0',
          card: '#F5EFE6',
          primary: '#4A3D36',
          accent: '#722F37',
          muted: '#7A8B7F',
        }
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Playfair Display', 'Crimson Text', 'Bodoni Moda', 'serif'],
        script: ['Playfair Display', 'serif'],
        sans: ['var(--font-lato)', 'Montserrat', 'Lato', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
export default config