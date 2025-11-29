#!/bin/bash

echo "======================================"
echo "   Site de Casamento - Gabriel & Milleny"
echo "   Instalação e Configuração"
echo "======================================"
echo ""

# Verificar se Node.js está instalado
if ! command -v node &> /dev/null
then
    echo "❌ Node.js não encontrado. Por favor, instale Node.js 18+"
    echo "   Download: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js encontrado: $(node --version)"

# Instalar dependências
echo ""
echo "📦 Instalando dependências..."
npm install

# Criar arquivo .env.local se não existir
if [ ! -f .env.local ]; then
    echo ""
    echo "📝 Criando arquivo .env.local..."
    cp .env.local.example .env.local 2>/dev/null || cat > .env.local << EOL
# PIX Configuration
NEXT_PUBLIC_PIX_KEY=noivos@email.com

# Google Maps API (opcional)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=

# Supabase Configuration (opcional)
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

# Resend API (opcional)
RESEND_API_KEY=
EOL
    echo "✅ Arquivo .env.local criado"
    echo ""
    echo "⚠️  IMPORTANTE: Edite o arquivo .env.local com suas configurações:"
    echo "   - Chave PIX"
    echo "   - API do Google Maps (opcional)"
    echo "   - Configurações do Supabase (opcional)"
    echo "   - API do Resend (opcional)"
else
    echo "✅ Arquivo .env.local já existe"
fi

echo ""
echo "======================================"
echo "✅ Instalação concluída!"
echo ""
echo "Para iniciar o projeto em desenvolvimento:"
echo "  npm run dev"
echo ""
echo "Para fazer build de produção:"
echo "  npm run build"
echo "  npm start"
echo ""
echo "Acesse: http://localhost:3000"
echo "======================================"