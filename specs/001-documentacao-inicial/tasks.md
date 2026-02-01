---

description: "Task list for documentação inicial do FinanceZap"

---

# Tasks: Documentação inicial FinanceZap

**Input**: Design documents from `/specs/001-documentacao-inicial/`  
**Prerequisites**: plan.md (required), spec.md (user stories), research.md/data-model.md/contracts/ a produzir

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Estruturar a documentação base no formato Spec Kit

- [x] T001 [P] [Setup] Criar diretório `specs/001-documentacao-inicial` e preencher `spec.md` com user stories do produto existente
- [x] T002 [P] [Setup] Gerar `plan.md` com contexto técnico e estrutura de projeto do monorepo

---

## Phase 2: Foundational (Documentação de base)

**Purpose**: Consolidar requisitos obrigatórios antes dos fluxos por história

- [ ] T010 [P] [Found] Consolidar variáveis de ambiente obrigatórias do backend (`financezap-backend/SEGURANCA.md`, `README_CONFIGURACAO.md`) em `specs/001-documentacao-inicial/quickstart.md`
- [ ] T011 [Found] Resumir modelo de dados de `financezap-backend/prisma/schema.prisma` em `specs/001-documentacao-inicial/data-model.md` com entidades/relacionamentos
- [ ] T012 [P] [Found] Catalogar endpoints reais do backend de `financezap-backend/src/index.ts` e `financezap-backend/README_SERVICOS.md` em `specs/001-documentacao-inicial/contracts/` (Assumido formato OpenAPI/Markdown)

---

## Phase 3: User Story 1 - Registrar e consultar finanças via WhatsApp (Priority: P1) 🎯 MVP

**Goal**: Documentar o fluxo WhatsApp+IA que registra transações/agendamentos e responde ao usuário

- [ ] T020 [US1] Descrever fluxo de webhook Twilio/Z-API e IA (`processadorIA.ts`, `roteadorServicos.ts`, `processadorMensagens.ts`) incluindo rate limit/sanitização no quickstart
- [ ] T021 [US1] Registrar edge cases de áudio/transcrição/fallback IA a partir de `transcricaoAudio.ts` e `validacaoQualidade.ts` em `spec.md` Edge Cases
- [ ] T022 [P] [US1] Mapear respostas formatadas e templates de WhatsApp (`formatadorMensagens.ts`, `templatesResposta.ts`) com exemplos em `specs/001-documentacao-inicial/contracts/`

---

## Phase 4: User Story 2 - Administrar dados financeiros no dashboard web (Priority: P1)

**Goal**: Documentar autenticação OTP+JWT e o CRUD do dashboard

- [ ] T030 [US2] Descrever fluxo OTP + JWT (`financezap-backend/src/auth.ts`, `financezap-backend/src/codigoVerificacao.ts`) e validação por telefone (`security.ts`) em `quickstart.md`
- [ ] T031 [P] [US2] Mapear chamadas do frontend em `financezap-frontend/src/services/api.ts` para tabelar endpoints, filtros e paginação
- [ ] T032 [US2] Documentar CRUD de categorias/carteiras/agendamentos e paginação nas Acceptance Scenarios de `spec.md`

---

## Phase 5: User Story 3 - Relatórios, chat IA e templates (Priority: P2)

**Goal**: Documentar recursos de comunicação ativa e inteligência no dashboard

- [ ] T040 [US3] Documentar geração e envio de relatórios (`financezap-backend/src/relatorios.ts`, `financezap-frontend/src/components/Relatorios.tsx`) incluindo parâmetros de filtro
- [ ] T041 [P] [US3] Descrever contrato do Chat IA (`financezap-backend/src/chatIA.ts`, `/api/chat`) e limites de contexto
- [ ] T042 [US3] Mapear gestão de templates (`financezap-backend/src/templatesResposta.ts`, `/api/templates`) e ativação no dashboard

---

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Cobrir governança e segurança transversal

- [ ] T050 [P] Revisar constituição em `.specify/memory/constitution.md` e propor princípios alinhados ao produto (Assumido)
- [ ] T051 [P] Validar alinhamento de CORS/segurança com `financezap-backend/SEGURANCA.md` e checklist de produção em `quickstart.md`
