# 🚀 Deploy da Landing Page no Cloudflare Pages

Guia completo para publicar a landing page do Zela no Cloudflare Pages.

## 📋 Pré-requisitos

1. **Conta no Cloudflare** (gratuita) - https://dash.cloudflare.com/sign-up
2. **Autenticação no Cloudflare** (será solicitado no primeiro deploy):
   ```bash
   npx wrangler login
   ```

## 🔧 Configuração

O projeto já está configurado com:
- ✅ `wrangler.toml` - Configuração do Cloudflare Pages
- ✅ Scripts de build e deploy no `package.json`

## 🚀 Deploy

### Opção 1: Deploy via CLI (Recomendado)

```bash
cd financezap-landing
npm install
npm run deploy
```

Isso irá:
1. Compilar o TypeScript
2. Fazer build do projeto (gera a pasta `dist`)
3. Fazer deploy no Cloudflare Pages

### Opção 2: Deploy Manual

```bash
# 1. Build do projeto
npm run build

# 2. Deploy manual
npx wrangler pages deploy dist
```

### Opção 3: Deploy via Dashboard do Cloudflare

1. Acesse: https://dash.cloudflare.com
2. Vá em **Workers & Pages** > **Create application** > **Pages**
3. Conecte seu repositório Git (GitHub/GitLab)
4. Configure:
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Root directory**: `/financezap-landing`

## 🌐 URLs Após Deploy

Após o deploy, sua landing page estará disponível em:
- **Preview**: `https://zela-landing.pages.dev` (ou similar)
- **Production**: `https://zela-landing.SEU_SUBDOMINIO.pages.dev`

## 🔗 Domínio Customizado (Opcional)

Para usar um domínio customizado (ex: `landing.usezela.com`):

1. No dashboard do Cloudflare Pages, vá em **Custom domains**
2. Adicione seu domínio
3. Configure o DNS conforme instruções

## 📊 Verificar Deploy

```bash
# Ver deployments
npx wrangler pages deployment list

# Ver informações do projeto
npx wrangler pages project list
```

## 🔄 Atualizações

Para atualizar a landing page:

```bash
# 1. Fazer alterações no código
# 2. Build e deploy
npm run deploy
```

## 🛠️ Comandos Úteis

```bash
# Build local
npm run build

# Preview local
npm run preview

# Ver logs
npx wrangler pages deployment tail

# Listar projetos
npx wrangler pages project list
```

## ⚙️ Variáveis de Ambiente

Se precisar de variáveis de ambiente:

1. No dashboard do Cloudflare Pages
2. Vá em **Settings** > **Environment variables**
3. Adicione as variáveis necessárias

## 🆘 Troubleshooting

### Erro: "Authentication required"
```bash
npx wrangler login
```

### Erro: "Build failed"
```bash
# Verificar se o build funciona localmente
npm run build

# Verificar erros de TypeScript
npm run lint
```

### Erro: "Project not found"
```bash
# Criar projeto manualmente
npx wrangler pages project create zela-landing
```

## 📝 Notas

- O Cloudflare Pages é **gratuito** para projetos pessoais
- Builds automáticos ao fazer push no Git (se configurado)
- SSL automático e CDN global
- Deploy instantâneo

## ✅ Checklist

- [ ] Conta no Cloudflare criada
- [ ] Build funcionando localmente (`npm run build`)
- [ ] Deploy executado com sucesso (`npm run deploy`)
- [ ] Landing page acessível na URL do Cloudflare
- [ ] Domínio customizado configurado (opcional)

## 🚀 Deploy Rápido

```bash
cd financezap-landing
npm install
npm run deploy
```

Na primeira vez, você será solicitado a fazer login no Cloudflare. Siga as instruções na tela!

