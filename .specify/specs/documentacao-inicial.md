# Documentação Inicial – Monorepo FinanceZap/Zela

## Visão Geral do Sistema
- Plataforma de gestão financeira via WhatsApp com suporte de IA, composta por backend (API/worker), frontend administrativo (React) e landing de marketing.
- Entrada principal de dados ocorre por mensagens de texto/áudio (Twilio ou Z-API), processadas com IA para criar transações e agendamentos.
- Dashboard web consome a API para exibir transações, estatísticas, carteiras, categorias, agendamentos e chat IA.
- Deploys previstos para Cloudflare (Workers para backend/serverless e Pages para frontend/landing); ambiente local usa Express + Prisma com SQLite.

## Propósito do Projeto
- Registrar transações e compromissos financeiros de forma conversacional pelo WhatsApp e disponibilizar visualização/gestão no dashboard.
- Automatizar entendimento de mensagens (intenção, extração de valores/datas/categorias), geração de relatórios e notificações de agendamentos.
- Manter isolamento por telefone do usuário, com autenticação por OTP/JWT para acesso web.

## Principais Fluxos
- **Recebimento de mensagem (Twilio/Z-API)**: webhook Express ou Worker recebe texto/áudio → sanitização + rate limit → transcrição de áudio (Twilio media ou URL pública) → detecção de intenção (IA) → roteamento para criar transação, criar/atualizar agendamento, listar/resumir dados ou responder ajuda → resposta enviada via Twilio/Z-API (botões/listas quando suportado) → contexto de conversa salvo em memória ou D1.
- **Dashboard web**: usuário solicita OTP (`/api/auth/solicitar-codigo`) → verifica código e recebe JWT → navega em transações, estatísticas, gastos por dia, carteiras, categorias, agendamentos e relatórios → pode acionar chat IA (`/api/chat`) e excluir dados (`/api/auth/excluir-dados`). SSE notifica novas mensagens/transações.
- **Agendamentos**: criados por IA ou manualmente → rotina marca pago/cancelado, registra transação correspondente e envia confirmações → suporta recorrência (paiId, parcelaAtual/totalParcelas).
- **Relatórios**: geração e download via dashboard ou envio WhatsApp (`/api/relatorios/gerar`, `/api/relatorios/enviar-whatsapp`), com filtros similares aos de transações.

## Módulos/Pastas Importantes
- **financezap-backend/**
  - `src/index.ts`: servidor Express, webhooks Twilio/Z-API, rotas REST e SSE.
  - `src/worker.ts`: variante Hono/Cloudflare Worker com suporte a D1 e notificações SSE.
  - `src/processadorIA.ts`, `deteccaoIntencao.ts`, `chatIA.ts`: extração de transações, intenção e chat financeiro.
  - `src/transcricaoAudio.ts`: transcrição de mídias de áudio (Twilio ou URL pública).
  - `src/agendamentos.ts`, `processadorAgendamento.ts`: CRUD e rotina de agendamentos/recorrências.
  - `src/carteiras.ts`, `categorias.ts`, `relatorios.ts`, `saldos.ts`: domínios financeiros e formatação de mensagens.
  - `src/security.ts`, `rateLimiter.ts`, `auth.ts`, `codigoVerificacao.ts`: sanitização, rate limit, OTP e JWT.
  - `src/contextoConversacao.ts`, `cacheIA.ts`, `queueProcessamento.ts`: memória de conversa, cache de prompts e fila interna.
  - `prisma/schema.prisma`, `migrations/`, `prisma.config.ts`: persistência SQLite local; `d1.ts` adapta consultas para D1.
  - `wrangler.toml`, `scripts/`, `README_*`: deploy/configuração Cloudflare, Twilio e Z-API.
- **financezap-frontend/**
  - React + Vite + Tailwind; entrada em `src/main.tsx` e `src/App.tsx`.
  - `src/components/`: páginas e modais (Dashboard, Transações, Agendamentos, Carteiras, Categorias, Relatorios, ChatIA/ChatIAPopup, login/OTP, configuracões, modal de pagamento/recorrência).
  - `src/contexts/AuthContext.tsx`: autenticação via JWT armazenada no navegador.
  - `src/services/api.ts`: cliente das rotas REST citadas; `src/config.ts` aponta para a API.
  - `src/hooks/`, `src/utils/`: helpers de UI, formatação e estado.
  - `env.example`/`env.local.example`: variáveis de ambiente (VITE_API_URL).
- **financezap-landing/**
  - Site institucional em React + Vite + Tailwind com seções Hero, Features, HowItWorks, Testimonials, Pricing e FAQ (componentes em `src/components/`).
  - `wrangler.toml` para deploy via Cloudflare Pages.

## Integrações Externas
- Twilio WhatsApp (webhooks, envio de mensagens e mídia).
- Z-API para envio/recebimento de mensagens, botões e listas.
- IA: Groq (preferido) e Google Gemini para interpretação de mensagens e chat.
- Cloudflare Workers/D1 (deploy serverless e banco opcional), SSE para streaming ao dashboard.
- Prisma como ORM para SQLite local; html2canvas + jspdf para PDF no frontend; Framer Motion/Tailwind/React Table no dashboard.

## Pontos Críticos ou Complexos
- Rate limit, contexto de conversa e cache IA mantidos em memória na versão Express; perdem estado em restart e não escalam horizontalmente sem armazenamento externo.
- SQLite local limita concorrência; migração para D1/Postgres necessária para produção com tráfego maior.
- Dependência forte de integrações externas (Twilio/Z-API/IA/transcrição); quedas ou quotas geram degradação — monitoramento e mensagens de fallback são essenciais.
- Webhooks exigem URLs públicas e credenciais corretas; validações em `security.ts` e `rateLimiter.ts` protegem entrada, mas múltiplas instâncias requerem solução compartilhada.
- SSE e fila interna (`queueProcessamento.ts`) são processadas em memória; em ambientes distribuídos é necessário ajustar para não perder eventos.
