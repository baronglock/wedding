# 💍 Site de Casamento - Gabriel & Milleny

Um site de casamento elegante e moderno com design minimalista em tons de bege e marrom, desenvolvido com Next.js, TypeScript e Tailwind CSS.

![Next.js](https://img.shields.io/badge/Next.js-14.0-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC)

## ✨ Funcionalidades

### 🎯 Principais
- **Hero Section** com contagem regressiva animada em tempo real
- **Sistema RSVP** com formulário de confirmação de presença
- **Lista de Presentes Virtual** com integração PIX
- **Gerador de QR Code PIX** automático com CRC16-CCITT
- **Localização** com Google Maps estilizado
- **Área de Recados** para mensagens dos convidados
- **Design Responsivo** mobile-first
- **Proteção Anti-Spam** com honeypot

### 🔐 Segurança
- Validação de formulários no cliente e servidor
- Honeypot fields para proteção contra bots
- Sanitização de inputs
- Headers de segurança configurados

### 💎 Design
- Estética minimalista com paleta bege/marrom
- Textura grainy overlay sutil
- Tipografia elegante (Playfair Display + Lato)
- Animações suaves e transições fluidas
- Modo escuro do mapa para harmonia visual

## 🚀 Instalação

### Pré-requisitos
- Node.js 18+
- NPM ou Yarn
- Git

### Passo a Passo

1. **Clone o repositório**
```bash
git clone https://github.com/seu-usuario/wedding-site.git
cd wedding-site
```

2. **Instale as dependências**
```bash
npm install
# ou
yarn install
```

3. **Configure as variáveis de ambiente**

Copie o arquivo `.env.local.example` para `.env.local`:
```bash
cp .env.local.example .env.local
```

Edite o arquivo `.env.local` com suas configurações:
```env
# Chave PIX (email, CPF ou telefone)
NEXT_PUBLIC_PIX_KEY=seuemail@exemplo.com

# Google Maps API (opcional)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=sua_chave_aqui

# Supabase (opcional - para persistência de dados)
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima

# Resend (opcional - para envio de emails)
RESEND_API_KEY=re_sua_chave_aqui
```

4. **Execute o projeto em desenvolvimento**
```bash
npm run dev
# ou
yarn dev
```

Acesse [http://localhost:3000](http://localhost:3000)

## 📦 Build para Produção

```bash
npm run build
npm start
```

## 🚢 Deploy

### Vercel (Recomendado)

1. Instale a Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

3. Configure as variáveis de ambiente no dashboard da Vercel

### Outras Plataformas
- **Netlify**: Suporta Next.js com o plugin `@netlify/plugin-nextjs`
- **Railway**: Deploy automático com detecção de Next.js
- **Render**: Configure com Docker ou Node.js

## 🎨 Personalização

### Cores
Edite o arquivo `tailwind.config.ts`:
```javascript
colors: {
  wedding: {
    bg: '#F5F1E6',      // Fundo principal
    card: '#EBE5CE',    // Cards e superfícies
    primary: '#5D4037', // Texto principal
    accent: '#A67B5B',  // Destaques
    muted: '#8C7C71',   // Texto secundário
  }
}
```

### Informações do Casamento
Edite o arquivo `lib/utils.ts`:
```javascript
export const WEDDING_INFO = {
  bride: "Nome da Noiva",
  groom: "Nome do Noivo",
  date: new Date('2026-08-22T14:30:00-03:00'),
  venue: "Nome do Local",
  address: "Endereço",
  city: "Cidade",
  state: "UF",
  pixKey: 'chave@pix.com'
}
```

### Lista de Presentes
Customize os presentes em `lib/utils.ts`:
```javascript
export const DEFAULT_GIFTS = [
  {
    id: 1,
    title: "Jantar Romântico",
    price: 150.00,
    icon: "🍷",
    description: "Uma noite especial"
  },
  // Adicione mais presentes...
]
```

## 🏗️ Estrutura do Projeto

```
wedding-site/
├── app/                  # App Router do Next.js
│   ├── layout.tsx       # Layout principal
│   ├── page.tsx         # Página home
│   └── globals.css      # Estilos globais
├── components/          # Componentes React
│   ├── Hero.tsx        # Seção principal
│   ├── RSVP.tsx        # Formulário RSVP
│   ├── GiftRegistry.tsx # Lista de presentes
│   ├── Location.tsx    # Mapa e local
│   └── Messages.tsx    # Área de recados
├── lib/                # Utilitários
│   ├── pix.ts         # Gerador PIX BR Code
│   └── utils.ts       # Funções auxiliares
└── public/            # Arquivos estáticos
```

## 🔧 Tecnologias Utilizadas

- **[Next.js 14](https://nextjs.org/)** - Framework React
- **[TypeScript](https://www.typescriptlang.org/)** - Type Safety
- **[Tailwind CSS](https://tailwindcss.com/)** - Estilização
- **[Lucide React](https://lucide.dev/)** - Ícones
- **[QRCode](https://www.npmjs.com/package/qrcode)** - Geração de QR Code
- **[date-fns](https://date-fns.org/)** - Manipulação de datas
- **[Zod](https://zod.dev/)** - Validação de schemas

## 📱 Compatibilidade

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile Safari iOS 14+
- ✅ Chrome Android 90+

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 💌 Contato

Para dúvidas ou sugestões sobre o projeto, entre em contato:
- Email: gabriel@exemplo.com
- Website: [gabrielmilleny.com.br](https://gabrielmilleny.com.br)

## 🙏 Agradecimentos

- Inspiração de design minimalista e elegante
- Comunidade Next.js e Tailwind CSS
- Todos que contribuíram com feedback e sugestões

---

**Feito com ❤️ para Gabriel & Milleny**

*22 de Agosto de 2026 - Save the Date!*