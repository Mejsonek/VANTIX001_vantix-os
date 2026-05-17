# todo.md — Lista Zadań VANTIX001

> Aktualizuj po każdej sesji. To jest żywy dokument — nie archiwum.
> Ostatnia aktualizacja: 2026-05-17 (blueprint v3.0)

---

## 🔴 KRYTYCZNE (zrobić pierwsze)

- [ ] Podmienić test webhook URL w `lib/n8nService.ts` na produkcyjny (po stworzeniu flow w n8n)
- [ ] Cyborg Shell — `LeftThreeDimensionalDock` + `CentralBrainFocus` + layout grid

---

## 🟡 PHASE 1 — Dokończenie (mockupy + shell)

**Cyborg Shell (zastępuje obecny /)**
- [ ] `components/shell/LeftThreeDimensionalDock.tsx` — 3D CSS dock, ikony modułów, tooltip on hover
- [ ] `components/shell/CentralBrainFocus.tsx` — powitanie + lista tasków (mock) + pulsujące logo
- [ ] `components/shell/IsometricMetricLedger.tsx` — metryki placeholder (leady, projekty, taski, flows)
- [ ] `components/shell/SystemStatusBar.tsx` — pasek statusu systemu na dole
- [ ] Przepisanie `app/page.tsx` — nowy layout `grid-cols-[auto_1fr_auto]`
- [ ] Przepisanie `app/cockpit/page.tsx` — scalenie z nowym shellem

**Mockupy modułów**
- [ ] `/crm` — lista leadów, lejek kanban, AddLeadModal
- [ ] `/dev` — projekty, roadmapa, TODO, logi sesji
- [ ] `/settings` — API keys, integracje, AI providers
- [ ] `/workflows` — lista flows n8n, status, trigger button

---

## 🟠 PHASE 2 — MVP Backend (sesje DeepSeek)

**Sesja A — Prisma Schema**
- [ ] `prisma init` + `prisma db pull` z Neon
- [ ] Dodanie modeli: `WorkflowLog`, `AiOrchestrationJob`, `AiWorkerTask`, `Task`, `AuditLog`, `SystemConfig`
- [ ] Rozszerzenie `Lead` o: `valueCurrency`, `totalValue`, `source`, `metadata` (JSON)
- [ ] Rozszerzenie `Project` o: `currentPhase`, `phases` (JSON array)
- [ ] Rozszerzenie `BrainSection` o: `embedding` (pgvector), `githubSha`, `syncSource`, `lastSyncedAt`
- [ ] Enumy: `ProcessStatus`, `LeadStage`, `ModelRole`, `SyncSource`
- [ ] `prisma generate` → commit

**Sesja B — Auth**
- [ ] NextAuth.js — konfiguracja z Neon adapter
- [ ] Middleware ochrony ścieżek (`/cockpit`, `/crm`, `/dev`, `/settings`, `/workflows`)
- [ ] Strona `/login`
- [ ] Session provider w layout

**Sesja C — Cognitive Mesh v1**
- [ ] `lib/ai/cognitive-mesh.ts` — klasa `CognitiveMeshEngine`
- [ ] Orchestrator: Claude Sonnet (dekompozycja → JSON plan z Zod)
- [ ] Worker: DeepSeek R1 via `https://api.deepseek.com/v1` (OpenAI-compatible)
- [ ] Zapis do `AiOrchestrationJob` + `AiWorkerTask` w DB
- [ ] Hard cap kosztów per job ($0.50)
- [ ] `app/api/v1/ai/orchestrate/route.ts`

**Sesja D — API Routes**
- [ ] `GET /api/tasks?limit=N`
- [ ] `POST /api/brain/reindex`
- [ ] `GET /api/v1/workflows/[correlationId]`
- [ ] `POST /api/v1/workflows/trigger`
- [ ] CorrelationId (UUID v7) na każdym request

**Sesja E — n8n Flows**
- [ ] Flow: `VANTIXRAG GitHub Sync` — push → filter .md → GitHub Raw → UPSERT brain_sections → /api/brain/reindex
- [ ] Flow: `New Lead Alert` — webhook landing → Neon INSERT + Telegram notify
- [ ] Flow: `Lead Follow-up Reminder` — cron 9:00 → leady >3 dni bez follow-up → Telegram
- [ ] Flow: `Daily Briefing` — cron 8:00 → taski + leady → Telegram
- [ ] Webhook URL produkcyjny → `lib/n8nService.ts`

**Sesja F — Dashboard z danymi**
- [ ] `CentralBrainFocus` — rzeczywiste taski z `/api/tasks`
- [ ] `IsometricMetricLedger` — dane z DB (leady, projekty, taski, flows)
- [ ] `SystemStatusBar` — healthchecki Neon + Claude API + n8n

---

## 🔵 PHASE 3 — Beta

- [ ] Cognitive Mesh — retries, circuit breaker, status KWARANTANNA
- [ ] `AuditLog` — zapis wszystkich krytycznych akcji
- [ ] Rate limiting na API routes
- [ ] Telegram bot (alerty nowy lead, zmiana etapu, daily briefing)
- [ ] Obsidian Git Plugin — auto-push VANTIXRAG co 10 min
- [ ] n8n flow: `Evolution Proposals`
- [ ] Monitoring i alerty systemowe

---

## ⚪ PHASE 4 — Przyszłość

- [ ] pgvector na Neon — embeddingi dla BrainSection
- [ ] Vector search w Brain GUI
- [ ] AI evolution proposals — warstwa `08_EVOLUTION/`
- [ ] Globalne wyszukiwanie ⌘K
- [ ] Client portal `/client/[token]`
- [ ] Multi-user auth
- [ ] Workflow automation studio UI
- [ ] Export CRM do CSV

---

## ✅ UKOŃCZONE

- [x] CLAUDE.md — główny plik kontekstu systemu
- [x] Struktura repo VANTIXRAG (foldery 00–10)
- [x] Phase 0 — pełna pamięć VANTIXRAG (master, profile, decisions, memory)
- [x] Schema SQL: 16 tabel (leads, brain_sections i inne)
- [x] Shell redesign wg Vantix Design System (Cosmic Minimalism)
- [x] Personal Cockpit mockup — TodayTasks, WeekCalendar, PriorityList, AIRecommendations
- [x] Landing page vantix.pl — migracja z Vite, 11 sekcji, mobile-first
- [x] Vercel config — routing domen (vantix.pl + app.vantix.pl)
- [x] n8n na HF Spaces — `https://SolutionKacper-VantixN8N.hf.space/` (v2.20.9 live)
- [x] Dockerfile n8n — UID 1000, /data permissions, bez CMD override
