# roadmap.md — Roadmapa Vantix OS v3.0

> Plan rozwoju systemu. Aktualizowany po każdej fazie.
> Ostatnia aktualizacja: 2026-05-17 (blueprint v3.0)

---

## Fazy Systemu

| Faza | Zakres | Status |
|------|--------|--------|
| **Phase 0** | Blueprint, pamięć VANTIXRAG, struktura repo | ✅ Done |
| **Phase 1** | Landing page, Cyborg Shell, mockupy modułów | 🔄 W toku |
| **Phase 2** | MVP: Prisma, Auth, Cognitive Mesh, n8n flows, Dashboard | ⬜ Następna |
| **Phase 3** | Beta: pełny Cognitive Mesh, Telegram, rate limiting, observability | ⬜ Planowana |
| **Phase 4** | AI Evolution: pgvector, embeddingi, client portal, multi-user | ⬜ Przyszłość |

---

## Phase 1 — Aktualny Sprint (W TOKU)

### Cel fazy
Landing page vantix.pl + Cyborg Shell + mockupy modułów. Zero backendu — sam UI.

### Status

**Landing page (vantix.pl)**
- [x] Migracja z projektu Vite — 11 sekcji (CosmosBackground, Navbar, Hero, LossCalculator, Ekosystem, PodMaska, DlaczegoMy, Bezpieczenstwo, WhiteLabel, OMnie, Kontakt)
- [x] Mobile-first responsive — wszystkie 11 komponentów
- [x] n8n webhook podpięty (test URL — do zamiany na produkcyjny po deploymencie n8n)

**Infrastruktura n8n**
- [x] Dockerfile dla HF Spaces (`n8n/Dockerfile`)
- [x] Deploy na `https://SolutionKacper-VantixN8N.hf.space/`
- [ ] Podmienić test URL w `lib/n8nService.ts` na produkcyjny webhook

**Cyborg Shell (zastępuje obecny shell)**
- [ ] `LeftThreeDimensionalDock` — 3D dock z CSS perspective, ikony modułów, tooltip
- [ ] `CentralBrainFocus` — hero dashboard: powitanie + lista tasków z API + logo pulse
- [ ] `IsometricMetricLedger` — metryki z DB (placeholder na Phase 1, dane na Phase 2)
- [ ] `SystemStatusBar` — dolny pasek statusu
- [ ] Layout: `grid-cols-[auto_1fr_auto]` — Dock | Brain Focus | Metrics
- [ ] Przepisanie `/` i `/cockpit` — jeden shell, nie dwa

**Mockupy modułów**
- [x] Personal Cockpit — TodayTasks, WeekCalendar, PriorityList, AIRecommendations
- [ ] CRM (`/crm`) — lejek, leady, follow-up
- [ ] Vantix DEV (`/dev`) — projekty, roadmapa, TODO, logi
- [ ] Settings (`/settings`) — API keys, integracje
- [ ] Workflows (`/workflows`) — lista flows, status

### Done gdy:
- Cyborg Shell renderuje na `/` i `/cockpit`
- Wszystkie mockupy modułów gotowe
- n8n webhook URL produkcyjny

---

## Phase 2 — MVP Backend (Następna)

### Cel fazy
Działający system z realną bazą danych, autentykacją i Cognitive Mesh v1.

### Podział sesji (każda = jedna sesja z DeepSeekiem)

**Sesja A — Prisma Schema (15 min)**
- `prisma db pull` z istniejącego `schema.sql` na Neon
- Dodanie nowych modeli: `WorkflowLog`, `AiOrchestrationJob`, `AiWorkerTask`, `Task`, `AuditLog`, `SystemConfig`
- Rozszerzenie istniejących: `Lead` (+valueCurrency, totalValue, source, metadata), `Project` (+currentPhase, phases), `BrainSection` (+embedding, githubSha, syncSource, lastSyncedAt)
- Nowe enumy: `ProcessStatus`, `LeadStage`, `ModelRole`, `SyncSource`
- `prisma generate` → typy TypeScript

**Sesja B — Auth (30 min)**
- NextAuth.js lub Supabase Auth
- Ochrona `/cockpit`, `/crm`, `/dev`, `/settings`, `/workflows`
- Publiczna tylko `/` (landing)

**Sesja C — Cognitive Mesh v1 (45 min)**
- `lib/ai/cognitive-mesh.ts` — klasa `CognitiveMeshEngine`
- Claude Sonnet = Orchestrator (dekompozycja → JSON plan)
- DeepSeek R1 via `https://api.deepseek.com/v1` = Worker (wykonanie atomowych tasków)
- Zod validation na outputach
- Zapis telemetrii do `AiOrchestrationJob` i `AiWorkerTask`
- `POST /api/v1/ai/orchestrate`

**Sesja D — API Routes (45 min)**
- `GET /api/tasks?limit=N` — taski dla dashboardu
- `POST /api/brain/reindex` — callback po syncu n8n
- `GET /api/v1/workflows/[correlationId]` — status workflow
- `POST /api/v1/workflows/trigger`

**Sesja E — n8n Flows (1h)**
- `VANTIXRAG GitHub Sync` — GitHub push webhook → filter *.md → GitHub Raw API → UPSERT brain_sections → callback /api/brain/reindex
- `New Lead Alert` — webhook z formularza landing → Neon INSERT + Telegram
- `Lead Follow-up Reminder` — cron 9:00 → leady bez follow-up >3 dni → Telegram
- `Daily Briefing` — cron 8:00 → taski + leady → Telegram

**Sesja F — Dashboard z danymi (30 min)**
- `CentralBrainFocus` — rzeczywiste taski z `/api/tasks`
- `IsometricMetricLedger` — leady, projekty, taski z DB
- `SystemStatusBar` — statusy Neon, Claude API, n8n z healthcheckami

### Done gdy:
- Kacper loguje się i widzi swoje dane
- CRM, Taski, n8n flow New Lead Alert działają end-to-end
- Cognitive Mesh zwraca poprawny wynik na test prompt

---

## Phase 3 — Beta (Planowana)

### Cel fazy
Pełna implementacja Cognitive Mesh, observability, Telegram bot, stabilizacja.

### Zakres
- [ ] Cognitive Mesh — pełny pipeline z retries, circuit breaker, hard cap kosztów
- [ ] Status KWARANTANNA dla failujących jobów
- [ ] AuditLog dla wszystkich krytycznych akcji
- [ ] Rate limiting na API routes (upstash/redis lub middleware)
- [ ] Telegram bot — alerty w czasie rzeczywistym
- [ ] Obsidian Git Plugin — auto-push VANTIXRAG co 10 min
- [ ] n8n flow `Evolution Proposals` — webhook → zapis do `08_EVOLUTION/`
- [ ] Monitoring i alerty systemowe

### Done gdy:
- Kacper używa systemu codziennie przez 2 tygodnie bez krytycznych bugów
- Wszystkie n8n flows działają 24/7

---

## Phase 4 — AI Evolution (Przyszłość)

### Zakres
- [ ] pgvector na Neon — embeddingi dla `BrainSection`
- [ ] Vector search w Brain GUI
- [ ] AI evolution proposals — warstwa `08_EVOLUTION/`
- [ ] Workflow automation studio UI
- [ ] Globalne wyszukiwanie ⌘K
- [ ] `/brain/sources` — zarządzanie źródłami ingestion
- [ ] Export CRM do CSV
- [ ] Client portal `/client/[token]`
- [ ] Multi-user / autentykacja wielopoziomowa

---

## Oś czasu (szacunkowa)

| Faza | Szacowany czas |
|------|---------------|
| Phase 1 | 2–3 sesje (pozostałe mockupy + Cyborg Shell) |
| Phase 2 | 6 sesji DeepSeek (A→F) + review Claude Code |
| Phase 3 | 3–4 sesje |
| Phase 4 | Ciągły rozwój |
