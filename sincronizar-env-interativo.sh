#!/bin/bash

# Script interativo para sincronizar secrets da Cloudflare para arquivos .env locais
# Este script ajuda você a copiar os valores dos secrets da Cloudflare para os arquivos .env

echo "🔐 Sincronização de Secrets da Cloudflare para .env local"
echo "=========================================================="
echo ""
echo "⚠️  IMPORTANTE: A Cloudflare não permite ler os valores dos secrets por segurança."
echo "   Este script vai ajudá-lo a copiar manualmente os valores."
echo ""
echo "📋 Secrets encontrados na Cloudflare:"
echo ""

# Backend
echo "📦 Backend (financezap-backend):"
cd financezap-backend
echo "   Listando secrets..."
SECRETS_BACKEND=$(npx wrangler secret list --json 2>/dev/null | grep -o '"name":"[^"]*"' | sed 's/"name":"//;s/"//g' || echo "")

if [ -z "$SECRETS_BACKEND" ]; then
  echo "   ⚠️  Não foi possível listar secrets. Verifique se está autenticado."
else
  echo "$SECRETS_BACKEND" | while read -r secret; do
    echo "   - $secret"
  done
fi

cd ..

echo ""
echo "📦 Frontend (financezap-frontend):"
cd financezap-frontend
echo "   Listando secrets..."
SECRETS_FRONTEND=$(npx wrangler pages secret list --json 2>/dev/null | grep -o '"name":"[^"]*"' | sed 's/"name":"//;s/"//g' || echo "VITE_API_URL")

if [ -z "$SECRETS_FRONTEND" ]; then
  echo "   - VITE_API_URL (conhecido)"
else
  echo "$SECRETS_FRONTEND" | while read -r secret; do
    echo "   - $secret"
  done
fi

cd ..

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📝 Para copiar os valores:"
echo ""
echo "   1. Acesse: https://dash.cloudflare.com"
echo "   2. Vá em: Workers & Pages → Seu projeto → Settings → Variables"
echo "   3. Clique em cada secret para ver o valor (ou use o botão 'Reveal')"
echo "   4. Copie o valor e cole no arquivo .env correspondente"
echo ""
echo "💡 Dica: Os arquivos .env já foram criados com a estrutura completa."
echo "   Basta substituir os valores 'COLE_AQUI_O_VALOR_DA_CLOUDFLARE' pelos valores reais."
echo ""
echo "📁 Arquivos .env criados:"
echo "   - financezap-backend/.env"
echo "   - financezap-frontend/.env"
echo ""
read -p "Pressione ENTER para abrir o dashboard da Cloudflare no navegador..."

# Tentar abrir o dashboard
if command -v open &> /dev/null; then
  open "https://dash.cloudflare.com"
elif command -v xdg-open &> /dev/null; then
  xdg-open "https://dash.cloudflare.com"
fi

echo ""
echo "✅ Pronto! Copie os valores do dashboard e cole nos arquivos .env"

