# Especificação Speckit – Zela/FinanceZap

Documento de referência rápida para todo o monorepo. Resume escopo, arquitetura, integrações e pontos críticos para quem precisa evoluir o produto.

## 1. Visão Geral
- Solução de gestão financeira via WhatsApp com assistente de IA.
- Componentes: `financezap-backend` (API/worker/IA), `financezap-frontend` (dashboard administrativo/PWA), `financezap-landing` (landing de marketing).
- Canais de mensagem: Twilio WhatsApp Webhook e Z-API (envio/recebimento, botões, listas, transcrição de áudio).
- Processamento de IA: Groq ou Gemini para extração de transações e intenção; transcrição de áudio; chat financeiro contextual.
- Persistência: Prisma (SQLite local por padrão), suporte a D1/Cloudflare Worker (worker.ts).

## 2. Escopo e Objetivos
- Ingestão de mensagens de usuários, extração de transações/agenda financeira e registro em banco.
- Dashboard web para acompanhar transações, agendamentos, categorias, carteiras, relatórios e chat IA.
- Notificações e interações no WhatsApp: criação/exclusão de transações, confirmação de agendamentos, envio de relatórios e templates.
- Autenticação OTP por telefone com JWT; restrição de dados por telefone no backend.
- Fora de escopo atual: billing real (há ativação de assinatura mockada), multi-tenant avançado além do isolamento por telefone.

## 3. Arquitetura (alto nível)
- **Backend (`financezap-backend`)**
  - Express API (`src/index.ts`) com rotas REST e webhooks Twilio/Z-API.
  - Serviços de IA e intenção (`processadorIA.ts`, `deteccaoIntencao.ts`, `chatIA.ts`) e transcrição (`transcricaoAudio.ts`).
  - Agendamento financeiro (`agendamentos.ts`, `processadorAgendamento.ts`), carteiras (`carteiras.ts`), categorias (`categorias.ts`), templates (`templatesResposta.ts`), relatórios (`relatorios.ts`).
  - Autenticação/autorizações: OTP (`codigoVerificacao.ts`), JWT (`auth.ts`), sanitização/rate limit (`security.ts`, `rateLimiter.ts`), contexto de conversa (`contextoConversacao.ts`).
  - Worker Cloudflare (`worker.ts`, `wrangler.toml`) para deployment serverless.
- **Frontend (`financezap-frontend`)**
  - React + Vite + Tailwind. Páginas em `src/components`: Dashboard, Agendamentos, Categorias, Carteiras, Relatorios, Chat IA (`ChatIAPopup`).
  - Consumo de API em `src/services/api.ts` (todas rotas listadas abaixo); configuração em `src/config.ts`.
  - Autenticação via contexto (`contexts/AuthContext.tsx`) usando JWT + armazenamento local.
- **Landing (`financezap-landing`)**: site institucional com seções Hero, Features, Pricing etc. Servido via Vite/Cloudflare Pages.

## 4. Modelo de Dados (principal)
- **Usuario/Perfil**: telefone, nome, email, status assinatura; contexto de chat; tokens JWT.
- **CodigoVerificacao**: OTP temporal para login/cadastro.
- **Transacao**: descricao, valor, categoria, tipo (entrada/saida), metodo (credito/debito), data/dataHora, carteiraId, mensagemOriginal, telefone.
- **Carteira**: id, nome, tipo (debito/credito), limiteCredito/diaPagamento, padrao/ativo.
- **Categoria**: nome, cor, tipo (entrada/saida/ambos), padrao.
- **Agendamento**: descricao, valor, dataAgendamento, tipo (pagamento/recebimento), status, recorrencia (paiId, totalParcelas, parcelaAtual), notificado.
- **Template**: nome e paleta de cores para mensagens enviadas.
- **Métricas/Filas**: rate limit em memória, SSE para mensagens recentes, cache IA em `cacheIA.ts`.

## 5. Fluxos Principais
- **Mensagem WhatsApp (Twilio ou Z-API)**: webhook recebe texto/áudio → sanitização e rate limit → transcrição de áudio se existir → detecção de intenção → criar transações (com carteira/categoria), criar agendamentos ou responder ajuda/comandos → resposta via Twilio/Z-API (botões/listas quando disponível) → contexto salvo.
- **Dashboard Web**: usuário solicita OTP (`/api/auth/solicitar-codigo`) → verifica código (`/api/auth/verificar-codigo`) e recebe JWT → UI consome transações, estatísticas, gastos-dia, carteiras, categorias, agendamentos, relatórios → pode acionar chat IA (`/api/chat`) e exclusão LGPD (`/api/auth/excluir-dados`).
- **Agendamentos**: criação manual via API ou IA; rotina marca pago/cancelado, registra transação correspondente e envia confirmações/interações.
- **Relatórios**: geração e envio via WhatsApp (`/api/relatorios/gerar`, `/api/relatorios/enviar-whatsapp`), com filtros similares aos da lista de transações.

## 6. Endpoints Observados (backend)
- Webhooks: `POST /webhook/whatsapp`, `POST /webhook/zapi`, `POST /webhook/status`.
- Autenticação: `POST /api/auth/solicitar-codigo`, `POST /api/auth/verificar-codigo`, `POST /api/auth/cadastro`, `POST /api/auth/login`, `GET /api/auth/verify`, `PUT /api/auth/perfil`, `POST /api/auth/enviar-contato`, `DELETE /api/auth/excluir-dados`, `POST /api/auth/ativar-assinatura`.
- Transações: `GET /api/transacoes`, `POST /api/transacoes`, `PUT /api/transacoes/:id`, `DELETE /api/transacoes/:id`.
- Estatísticas/relatórios: `GET /api/estatisticas`, `GET /api/estatisticas-credito`, `GET /api/gastos-por-dia`, `GET /api/gastos-por-dia-credito`, `POST /api/relatorios/gerar`, `POST /api/relatorios/enviar-whatsapp`.
- Agendamentos: `GET/POST /api/agendamentos`, `PUT /api/agendamentos/:id`, `DELETE /api/agendamentos/:id`, `DELETE /api/agendamentos/grupo/:paiId`, `POST /api/agendamentos/:id/adicionar-parcela`.
- Carteiras: `GET /api/carteiras`, `GET /api/carteiras/padrao`, `POST /api/carteiras`, `PUT /api/carteiras/:id`, `POST /api/carteiras/:id/padrao`, `DELETE /api/carteiras/:id`.
- Categorias: `GET /api/categorias`, `POST /api/categorias`, `PUT /api/categorias/:id`, `DELETE /api/categorias/:id`, `POST /api/categorias/inicializar`.
- Chat IA e mensagens: `POST /api/chat`, `GET /api/mensagens/stream`, `POST /send-message`, `POST /send-template`.
- Templates de resposta: `GET/POST/PUT/DELETE /api/templates`, `PUT /api/templates/:id/ativar`.
- Saúde e estáticos: `GET /health`, `GET /app`, `GET /financeiro`, `GET /`.

## 7. Integrações e Dependências Externas
- Twilio WhatsApp (account SID, auth token, `TWILIO_WHATSAPP_NUMBER`).
- Z-API (`ZAPI_INSTANCE_ID`, `ZAPI_TOKEN`, `ZAPI_BASE_URL`).
- IA: Groq (`GROQ_API_KEY`), Google Gemini (`GEMINI_API_KEY`).
- Infra: Cloudflare Workers (`wrangler.toml`), opcional D1; SSE para streaming no dashboard.
- Outras libs chave: Prisma, Express, Hono (worker), Framer Motion/Tailwind/React Table, html2canvas + jspdf (PDF no frontend).

## 8. Configuração e Ambientes
- Backend: `.env` com credenciais acima, `ALLOWED_ORIGINS` para CORS, chave JWT, parâmetros de banco. Scripts: `npm run dev`, `npm run build`, `npm run deploy:worker`.
- Frontend: `.env` com `VITE_API_URL` para dev; prod usa `https://financezap.rafael-damaral.workers.dev`.
- Landing: deploy via Cloudflare Pages (`npm run deploy`).
- Bases locais: `financezap-backend/dev.db` e `database.sqlite` para desenvolvimento; migracoes em `prisma/`.

## 9. Papeis/Personas
- **Usuário final (WhatsApp)**: registra transações e agendamentos via texto ou áudio, recebe resumos e relatórios.
- **Administrador/Cliente Web**: autentica com OTP, acompanha dashboard, gerencia categorias/carteiras/agendamentos, aciona chat IA e envia relatórios.
- **Operações**: mantém credenciais Twilio/Z-API/IA, monitora webhooks e worker, gerencia templates e cores.

## 10. Riscos e Pontos de Atenção
- Rate limit e sanitização vivem em memória; múltiplas instâncias precisam de estratégia distribuída.
- Persistência SQLite local pode ser gargalo em produção; considerar migração consistente para D1/Postgres.
- Webhooks dependem de conectividade Twilio/Z-API; monitorar `/health` e logs.
- IA e transcrição são serviços externos: tratar limites de quota e falhas degradando para mensagens amigáveis.
- Contexto de conversa e cache em memória se perdem em restart; persistir se necessário.

## 11. Próximos Passos Sugeridos
- Consolidar variáveis de ambiente em um `.env.example` único no backend com valores comentados.
- Formalizar contrato de payloads (OpenAPI/JSON Schema) para endpoints críticos de transações/agendamentos.
- Definir estratégia de storage compartilhado para rate limit/contexto em múltiplas réplicas (Redis ou KV).
- Automatizar geração de relatórios e lembretes via worker cron em Cloudflare.
