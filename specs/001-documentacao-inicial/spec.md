# Feature Specification: Documentação inicial FinanceZap

**Feature Branch**: `001-documentacao-inicial`  
**Created**: 2026-01-24  
**Status**: Draft  
**Input**: User description: "Criar a documentação inicial do projeto existente usando GitHub Spec Kit"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Registrar e consultar finanças via WhatsApp (Priority: P1)

Usuário final interage pelo WhatsApp (texto ou áudio) para registrar despesas/receitas, criar agendamentos e pedir resumos. Mensagens passam por sanitização, rate limit, IA de intenção (Groq ou Gemini) e formatação de resposta; transações/agendamentos são persistidos por telefone.

**Why this priority**: É o canal primário do produto e depende de webhooks, IA e banco estarem operacionais.

**Independent Test**: Com apenas backend + webhooks configurados (Twilio ou Z-API) e IA habilitada, enviar mensagens de texto/áudio deve criar transações e permitir consultas de saldo/resumo para o telefone autenticado via token interno.

**Acceptance Scenarios**:

1. **Given** Twilio ou Z-API configurados e IA ativa, **When** o usuário envia "Gastei 50 no almoço", **Then** o backend cria transação de saída associada ao telefone e retorna confirmação formatada.
2. **Given** áudio recebido com valor e descrição, **When** a transcrição é processada e a intenção detectada, **Then** o sistema registra transação ou agenda conforme IA e responde no WhatsApp.
3. **Given** o usuário pede "quanto gastei este mês", **When** a IA roteia para consulta, **Then** o backend responde com resumo filtrado pelo telefone.

---

### User Story 2 - Administrar dados financeiros no dashboard web (Priority: P1)

Administrador/cliente autentica via OTP por telefone, recebe JWT e acessa dashboard React para listar/filtrar transações, estatísticas, gráficos, agendamentos, carteiras e categorias, com operações de CRUD.

**Why this priority**: Permite gestão manual e auditoria das informações recebidas via WhatsApp; bloqueia operação se autenticacão falhar.

**Independent Test**: Com backend e frontend apontando para a mesma API, solicitar código em `/api/auth/solicitar-codigo`, verificar em `/api/auth/verificar-codigo`, obter JWT e executar CRUD de transações/agendamentos/categorias/carteiras usando UI.

**Acceptance Scenarios**:

1. **Given** telefone cadastrado e JWT válido, **When** o usuário abre o dashboard, **Then** transações são carregadas paginadas com filtros por data, valor, descrição, categoria e carteiras.
2. **Given** JWT válido, **When** cria ou edita transação/categoria/carteira/agendamento no dashboard, **Then** a operação persiste para o telefone do token e a listagem reflete a alteração.
3. **Given** JWT inválido/ausente, **When** o usuário tenta chamar endpoints protegidos, **Then** o backend retorna 401 e o frontend remove token local.

---

### User Story 3 - Relatórios, chat IA e comunicação ativa (Priority: P2)

Usuário autenticado aciona geração de relatórios PDF/WhatsApp, consulta chat IA no dashboard e gerencia templates de resposta para mensagens enviadas ao WhatsApp.

**Why this priority**: Complementa experiência com inteligência e comunicação ativa; depende de dados já persistidos e canais configurados.

**Independent Test**: Com dados existentes e JWT válido, gerar relatório via dashboard, abrir chat IA (`/api/chat`) e enviar template ativo via `/send-template` ou `/api/relatorios/enviar-whatsapp`.

**Acceptance Scenarios**:

1. **Given** transações registradas, **When** o usuário gera relatório com filtros, **Then** o backend retorna PDF/dados e, se solicitado, envia pelo WhatsApp.
2. **Given** JWT válido e IA configurada, **When** o usuário envia mensagem no Chat IA do dashboard, **Then** recebe resposta contextual com histórico financeiro limitado ao telefone.
3. **Given** templates cadastrados, **When** o usuário ativa um template, **Then** envios subsequentes usam o template ativo do telefone.

### Edge Cases

- Ausência de chaves de IA (`GROQ_API_KEY` e `GEMINI_API_KEY`): backend aborta inicialização se nenhuma estiver presente.  
- Sem credenciais Twilio e sem Z-API: processo encerra com erro; com apenas Z-API, usa fallback e avisa.  
- Token JWT ausente ou expirado: endpoints protegidos retornam 401 e o frontend limpa token local.  
- Rate limit: excesso de mensagens bloqueado pelo `rateLimiter`; respostas de erro não devem expor dados sensíveis.  
- Transcrição falha ou áudio vazio: fluxo deve responder com orientação sem persistir dados.  
- Formatação de telefone inconsistente: validação e normalização em `security.ts` para evitar acesso cruzado.  
- Contexto em memória (rate limit, contexto de conversa, cache IA) é perdido em restart; em múltiplas réplicas requer store compartilhado (Assumido).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Backend MUST receber mensagens WhatsApp via `POST /webhook/whatsapp` (Twilio) e `POST /webhook/zapi`, sanitizar entrada e aplicar rate limit antes do processamento.
- **FR-002**: Sistema MUST detectar intenção com IA (Groq ou Gemini) e extrair dados para registrar transações ou agendamentos, respondendo com mensagens formatadas (texto/botões/listas via Z-API quando disponível).
- **FR-003**: Sistema MUST persistir transações, agendamentos, categorias, carteiras, templates e usuários vinculados ao telefone no banco SQLite (Prisma) ou D1 (worker).
- **FR-004**: Sistema MUST oferecer autenticação OTP por telefone (`/api/auth/solicitar-codigo`, `/api/auth/verificar-codigo`) e emitir JWT para proteger endpoints de dados; acesso restrito ao telefone do token.
- **FR-005**: Dashboard React MUST listar e filtrar transações com paginação, gráficos de gastos por dia, estatísticas e CRUD de transações.
- **FR-006**: Dashboard MUST permitir CRUD de categorias e carteiras, incluindo definição de carteiras padrão e tipos (débito/crédito) e atualização de limites/dias de pagamento.
- **FR-007**: Dashboard MUST permitir CRUD e status de agendamentos (pendente/pago/cancelado), incluindo recorrência (pai, totalParcelas, parcelaAtual) e notificações.
- **FR-008**: Sistema MUST disponibilizar chat IA via `/api/chat` com contexto financeiro por telefone para consultas no dashboard.
- **FR-009**: Sistema MUST gerar relatórios (`/api/relatorios/gerar`) e enviar via WhatsApp (`/api/relatorios/enviar-whatsapp`) usando filtros de transações/agendamentos.
- **FR-010**: Sistema MUST gerenciar templates de resposta (`/api/templates` CRUD, ativar) para personalizar mensagens enviadas ao WhatsApp.
- **FR-011**: Sistema MUST suportar envio de mensagens via Twilio ou Z-API (`/send-message`, `/send-template`), escolhendo serviço configurado disponível.
- **FR-012**: Cloudflare Worker MUST expor endpoints de API (Hono) para deploy serverless, compartilhando lógica de autenticação/IA/transações onde aplicável.

### Non-Functional Requirements

- **NFR-001**: Segurança: JWT obrigatório em endpoints de dados, validação de permissão por telefone, sanitização de entrada e logging sem dados sensíveis (conforme `SEGURANCA.md` e `security.ts`).
- **NFR-002**: CORS restrito a origens permitidas via `ALLOWED_ORIGINS`; respostas consistentes em JSON e logs sanitizados (implementado em backend).
- **NFR-003**: Resiliência: fallback para memória se D1 indisponível para OTP; IA e Z-API tratam falhas com mensagens de aviso; retries via `retryResiliencia.ts`.
- **NFR-004**: Observabilidade básica: logs no console para fluxo de IA, OTP, webhooks e erros (Assumido que não há stack centralizada).
- **NFR-005**: Disponibilidade/performance alvo: Não especificado no código (Desconhecido).

### Key Entities

- **Usuario**: telefone, nome, email opcional, status de assinatura (trial/ativo/expirado), plano, template ativo, carteira padrão.
- **Transacao**: descricao, valor, categoria, tipo (entrada/saida), metodo (debito/credito), data/dataHora, mensagemOriginal, telefone, carteiraId opcional.
- **Agendamento**: telefone, descricao, valor, dataAgendamento, tipo (pagamento/recebimento), status, recorrente (paiId, totalParcelas, parcelaAtual), notificado.
- **Categoria**: nome, descricao opcional, cor, tipo (entrada/saida/ambos), padrao (global ou por telefone).
- **Carteira**: nome, tipo (debito/credito), limiteCredito, diaPagamento, padrao, ativo, telefone.
- **Template**: nome, tipo (dark/light/custom), paleta de cores, ativo, telefone.
- **CodigoVerificacao**: telefone, código de 6 dígitos, expiracao (memória ou D1).
- **NumeroRegistrado**: telefone, métricas de mensagens enviadas.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Usuário WhatsApp consegue registrar ao menos uma transação por telefone com resposta de confirmação em até 1 interação (Assumido).
- **SC-002**: Dashboard exibe transações com filtros aplicáveis e paginação funcional para um telefone autenticado.
- **SC-003**: Relatório é gerado e enviado via WhatsApp quando solicitado por usuário autenticado com dados existentes.
- **SC-004**: Tokens JWT são rejeitados corretamente após expiração ou quando não correspondem ao telefone solicitado.
