# todo.md — Lista Zadań VANTIX001

> Aktualizuj po każdej sesji. To jest żywy dokument — nie archiwum.
> Ostatnia aktualizacja: 2026-05-18 (sesja 11 — nowe teksty Hero + FAQ)
> Pełny plan: `plan_master.md`

---

## Kolejność faz

```
FAZA A — Landing (finish + convert)  ← AKTUALNIE
FAZA B — System (n8n + Obsidian)
FAZA C — Shell mockupy
FAZA D — Phase 2 Backend
```

---

## 🔴 FAZA A — Landing Page (priorytet #1)

**Decyzje potrzebne od Kacpra:**
- [x] Nowy headline Hero (co zastąpi "Skalowalność bez chaosu"?)
- [ ] Wybór konceptu lead magnetu (audit PDF / kalkulator ROI / case study)
- [ ] Linki social media do footera (LinkedIn, Twitter/X, inne?)

**Do zrobienia:**
- [x] JSON enrichment w `ContactForm.tsx` — zbierać: utm_source, referrer, device, time_on_page
- [ ] Neon: `ALTER TABLE leads ADD COLUMN enrichment JSONB, ai_description TEXT, ai_score VARCHAR(10)`
- [ ] n8n: New Lead Alert flow — Webhook → INSERT leads → Claude Haiku (AI opis) → UPDATE → Telegram
- [ ] Formularz lead magnet (osobny, tylko email + imię)
- [x] FAQ sekcja na landing
- [x] Mobile pass przez wszystkie sekcje
- [ ] Podmiana `NEXT_PUBLIC_N8N_WEBHOOK_URL` w `.env.local` na HF Space

---

## 🟡 FAZA B — System (priorytet #2)

- [ ] **Obsidian Git Plugin** — auto-push VANTIXRAG co 10 min *(Kacper ręcznie)*
- [ ] **n8n: VANTIXRAG GitHub Sync** — push → filter `VANTIXRAG/*.md` → UPSERT `brain_sections`
- [ ] **n8n: Daily Briefing** — cron 08:00 → taski + leady → Telegram

---

## 🟠 FAZA C — Shell Mockupy (priorytet #3)

- [ ] Dashboard — podpiąć `CentralBrainFocus` do `app/(shell)/dashboard/page.tsx` *(5 min)*
- [ ] CRM `/crm` — lista leadów + kanban lejek + modal z AI opisem leada
- [ ] Cockpit `/cockpit` — przepisać na Vantix Design System (aktualnie stary white design)
- [ ] DEV `/dev` — projekty, roadmapa, TODO, logi sesji

---

## 🟡 PHASE 1 — Dokończenie (mockupy + shell)

**Struktura plików (refactor przed UI)**
- [x] Stworzyć `app/(shell)/layout.tsx` — Cyborg Shell layout
- [x] Stworzyć `app/(system)/layout.tsx` — System Panel layout
- [x] Przenieść obecne strony do grup: `dashboard/`, `crm/`, `cockpit/`, `dev/`
- [x] Stworzyć strukturę `app/(system)/system/` z podfolderami

**Cyborg Shell — `(shell)/`**
- [x] `components/shell/LeftThreeDimensionalDock.tsx` — 3D CSS dock, ikony modułów, tooltip on hover
- [x] `components/shell/CentralBrainFocus.tsx` — powitanie + lista tasków (mock) + pulsujące logo
- [x] `components/shell/IsometricMetricLedger.tsx` — metryki placeholder (leady, projekty, taski, flows)
- [ ] `components/shell/SystemStatusBar.tsx` — pasek statusu na dole *(opcjonalne — status jest w IsometricMetricLedger)*
- [x] `app/(shell)/layout.tsx` — grid `[auto_1fr_auto]`, Dock + Focus + Metrics
- [x] `app/(shell)/dashboard/page.tsx` — stworzony (placeholder; CentralBrainFocus do podpięcia)

**Mockupy modułów — `(shell)/`**
- [ ] `app/(shell)/crm/` — lista leadów, lejek kanban, AddLeadModal *(placeholder gotowy)*
- [x] `app/(shell)/cockpit/` — przeniesiony z `/cockpit` *(design mismatch — do przepisania na Vantix DS)*
- [ ] `app/(shell)/dev/` — projekty, roadmapa, TODO, logi sesji *(placeholder gotowy)*

**System Panel — `(system)/`**
- [x] `app/(system)/layout.tsx` — ciemny layout (`bg-[#020202]`)
- [x] `app/(system)/system/brain/` — placeholder gotowy
- [x] `app/(system)/system/orchestration/` — placeholder gotowy
- [x] `app/(system)/system/workflows/` — placeholder gotowy
- [x] `app/(system)/system/analytics/` — placeholder gotowy
- [x] `app/(system)/system/settings/` — placeholder gotowy

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
- [x] Dual-Shell Architecture — `(shell)/` + `(system)/` route groups z osobnymi layoutami
- [x] `LeftThreeDimensionalDock` — Cyborg 3D dock z Shell + System modułami
- [x] `CentralBrainFocus` — komponent główny dashboardu (mock data)
- [x] `IsometricMetricLedger` — panel metryk + system status
- [x] **Nowe teksty Hero** — headline: "Twój biznes działa. Ty decydujesz.", subheadline: zwięzły opis automatyzacji, CTA: "Sprawdź jak to działa →"
- [x] **FAQ sekcja na landing** — 4 pytania w accordion, bg-neutral-950, amber-500/30 hover
