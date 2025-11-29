@echo off
echo ======================================
echo    Site de Casamento - Gabriel ^& Milleny
echo    Instalacao e Configuracao
echo ======================================
echo.

REM Verificar se Node.js esta instalado
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo X Node.js nao encontrado. Por favor, instale Node.js 18+
    echo   Download: https://nodejs.org/
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo OK Node.js encontrado: %NODE_VERSION%

REM Instalar dependencias
echo.
echo Instalando dependencias...
call npm install

REM Criar arquivo .env.local se nao existir
if not exist .env.local (
    echo.
    echo Criando arquivo .env.local...
    (
        echo # PIX Configuration
        echo NEXT_PUBLIC_PIX_KEY=noivos@email.com
        echo.
        echo # Google Maps API ^(opcional^)
        echo NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=
        echo.
        echo # Supabase Configuration ^(opcional^)
        echo NEXT_PUBLIC_SUPABASE_URL=
        echo NEXT_PUBLIC_SUPABASE_ANON_KEY=
        echo.
        echo # Resend API ^(opcional^)
        echo RESEND_API_KEY=
    ) > .env.local
    echo OK Arquivo .env.local criado
    echo.
    echo IMPORTANTE: Edite o arquivo .env.local com suas configuracoes:
    echo    - Chave PIX
    echo    - API do Google Maps ^(opcional^)
    echo    - Configuracoes do Supabase ^(opcional^)
    echo    - API do Resend ^(opcional^)
) else (
    echo OK Arquivo .env.local ja existe
)

echo.
echo ======================================
echo OK Instalacao concluida!
echo.
echo Para iniciar o projeto em desenvolvimento:
echo   npm run dev
echo.
echo Para fazer build de producao:
echo   npm run build
echo   npm start
echo.
echo Acesse: http://localhost:3000
echo ======================================
pause