# FinanceZap Constitution

**Version**: 1.0.0 | **Ratified**: 2026-01-24 | **Last Amended**: 2026-01-24

## Core Principles

### I. Monorepo, Monólitos Delimitados
Backend, frontend administrativo e landing vivem no mesmo repositório. Backend é um monólito Node/Express com worker Hono paralelo para Cloudflare; não introduzir microserviços ou fragmentar em múltiplos repositórios.

### II. TypeScript-First (Node + React)
Todo código de app é TypeScript (Node 18+/Express no backend; React 19/Vite/Tailwind no frontend/landing). Novos componentes devem seguir o mesmo stack; evitar adicionar outra linguagem de runtime.

### III. WhatsApp-Driven, API REST
Canal primário é WhatsApp via Twilio ou Z-API. Fluxo passa por sanitização, rate limit, IA de intenção e respostas formatadas. APIs expostas são REST JSON; manter compatibilidade com rotas existentes listadas no backend.

### IV. Segurança por Telefone e JWT
Autenticação via OTP + JWT; autorização sempre restringe dados ao telefone do token. Sanitização de entrada e validação de telefone/valor/data são obrigatórias em novos endpoints.

### V. Persistência Simples com Prisma/SQLite (D1 opcional)
Prisma com SQLite é padrão; D1 é opcional no worker. Não exigir Postgres/Redis sem necessidade clara. Contexto, rate limit e cache IA são em memória; multi-instância requer plano de store compartilhado explícito.

## Padrões Arquiteturais e Técnicos

- **Estilo**: Monolito backend Express com módulos por domínio (transações, agendamentos, categorias, carteiras, IA) e worker Hono espelhando APIs para Cloudflare. Frontend PWA React/Tailwind; landing React/Tailwind.
- **Comunicação**: Webhooks Twilio/Z-API + REST JSON; SSE para eventos recentes. Sem GraphQL ou gRPC.
- **IA**: Groq ou Gemini para detecção de intenção/chat; transcrição de áudio com serviços externos. Sempre prever fallback amigável se IA indisponível.
- **Autenticação**: OTP (código de 6 dígitos) + JWT; middleware `autenticarMiddleware` e `validarPermissaoDados` obrigatórios em endpoints de dados.
- **Validação/Sanitização**: Sanitização de body/query/params (`sanitizarEntrada`), validações de telefone/valor/data; logging sem dados sensíveis.
- **Templates e Respostas**: Formatação de mensagens via formatadores e templates ativáveis; uso de botões/listas apenas quando suportado pela Z-API.
- **Infra**: CORS configurável via `ALLOWED_ORIGINS`; envs para Twilio, Z-API, IA keys, JWT, DB. Deploy opcional via Cloudflare Worker/Pages; scripts de deploy existentes devem ser seguidos.
- **Tests**: Jest/Supertest configurados no backend; manter compatibilidade ao adicionar código. Frontend/landing têm lint/build, sem suite de testes estabelecida.

## Restrições e Proibições

- Não dividir backend em microserviços nem adicionar novas linguagens de runtime.
- Não expor dados sem checar telefone do token; não reabilitar endpoints amplos removidos por segurança.
- Não pular sanitização/validação em novos endpoints ou webhooks.
- Não depender exclusivamente de um provedor de IA/envio: manter suporte a Groq ou Gemini e Twilio ou Z-API, com mensagens claras quando ausentes.
- Não introduzir bancos/filas externos obrigatórios (Redis, Kafka, Postgres) sem justificar e documentar migração a partir de SQLite/D1.
- Não remover compatibilidade com deploy Cloudflare Worker/Pages nem quebrar scripts de deploy existentes.
- Não armazenar segredos em código; usar variáveis de ambiente.

## Desenvolvimento e Qualidade

- Manter documentação de configuração (`README_*`, `SEGURANCA.md`) alinhada ao comportamento do código.
- Códigos novos devem preservar padrão de módulos por domínio e REST JSON. Preferir reutilizar Prisma, middlewares de segurança e formatadores existentes.
- Testes backend devem manter Jest/Supertest; novas rotas devem ter coberturas mínimas alinhadas aos padrões existentes.
- Em múltiplas instâncias, declarar dependências de store compartilhado para rate limit/contexto (atual solução é em memória).

## Governação

- Esta constituição é obrigatória para especificações e planos. Alterações exigem atualização de versão e datas.
- Revisões devem verificar: uso de TypeScript, aderência à autorização por telefone/JWT, sanitização, compatibilidade com Twilio/Z-API/IA dual e manutenção do estilo monólito + worker.
