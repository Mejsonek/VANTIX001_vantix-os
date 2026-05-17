# AGENTS.md — Vantix OS / Worker Brief
> Ten plik czyta DeepSeek (i każdy inny agent implementujący). Aktualizuj po każdej sesji.
> Ostatnia aktualizacja: 2026-05-18 (sesja 18 — bugfix shell pages + plan System Panel UI)

---

## BRAIN — Kontekst projektu (auto-load)

Poniższe pliki wczytują się automatycznie. Jeśli twoje środowisko nie obsługuje `@import`, przeczytaj je ręcznie przed startem.

@../VANTIXRAG/03_PROJECTS/projekt_001_vantix-os/todo.md

@../VANTIXRAG/03_PROJECTS/projekt_001_vantix-os/decisions.md

> Logi sesji (historia pracy): `../VANTIXRAG/03_PROJECTS/projekt_001_vantix-os/logs.md` — przeczytaj ostatni wpis jeśli potrzebujesz kontekstu poprzedniej sesji.

---

## Kim jesteś i co robisz

Jesteś **Worker/Implementor**. Dostajesz atomowe taski od Claude Code (Orchestrator).
Nie podejmujesz decyzji architektonicznych. Tylko implementujesz wg spec.
Output niezgodny ze spec → wraca do ciebie z korektą.

**Właściciel:** Kacper Zdżałka — Founder Vantix. Architekt, nie koduje ręcznie.

---

## System w jednym zdaniu

Vantix OS = centrum sterowania dla Kacpra. Dwa oddzielne shelle w jednej Next.js app:
- **Production Shell** (`/dashboard`, `/crm`, `/cockpit`, `/dev`) — Cyborg design, 3D Dock
- **System Panel** (`/system/*`) — terminal/dark design, narzędzia techniczne

---

## Aktualny stan (Phase 1 — w trakcie)

| Plik | Status |
|------|--------|
| `app/(shell)/layout.tsx` | ✅ gotowy — Dock + Content + Metrics grid |
| `app/(shell)/dashboard/page.tsx` | ✅ CentralBrainFocus podpięty (mock data) |
| `app/(shell)/cockpit/page.tsx` | ✅ przepisany na Vantix DS (Cyborg design) |
| `app/(shell)/crm/page.tsx` | ⚠️ placeholder "coming soon" |
| `app/(shell)/dev/page.tsx` | ⚠️ placeholder "coming soon" |
| `app/(system)/layout.tsx` | ✅ gotowy |
| `app/(system)/system/*/page.tsx` | ❌ wszystkie "coming soon" — cel sesji 19 |
| `components/shell/LeftThreeDimensionalDock.tsx` | ✅ gotowy |
| `components/shell/CentralBrainFocus.tsx` | ✅ gotowy (mock data) |
| `components/shell/IsometricMetricLedger.tsx` | ✅ gotowy (mock data) |

---

## Design System — OBOWIĄZKOWE

**Paleta** (zdefiniowana w `globals.css` i `tailwind.config`):
```
bg-void        = #020202   ← główne tło
bg-surface     = #0c0c0c   ← karty, panele
text-gold      = #D4AF37   ← akcent, aktywne, ważne
text-ivory     = #F5F4F0   ← główny tekst
border-gold/10             ← subtelne obramowania (domyślne)
border-gold/40             ← hover / active borders
```

**Gotowe klasy CSS** (użyj zamiast pisać od zera):
```
.vx-card          ← karta z border + hover glow
.vx-badge         ← odznaka statusu (bazowa)
.vx-badge-red     ← badge czerwony (HIGH priority, błąd)
.vx-badge-gold    ← badge złoty (MED priority, warning)
.btn              ← przycisk bazowy
.btn-ghost        ← przycisk bez tła
.btn-dim          ← przycisk ściemniony
.grid-bg          ← subtelna złota siatka w tle
.grain            ← nakładka grain (szum)
```

**Typografia:**
```
font-display  = Syne       ← nagłówki, logo, h1-h3 (font-weight 700-800)
font-mono     = DM Mono    ← body, labele, kod, metryki
```

**NIGDY nie używaj:**
- `bg-white`, `bg-neutral-*`, `bg-gray-*`
- `text-gray-*`, `text-neutral-*`
- `rounded-lg`, `rounded-xl` (jeśli nie ma w designie — używamy ostrych kątów)
- `shadow-*` (poza `shadow-[0_0_Xpx_rgba(...)]` dla glow efektów)

**Wzorzec dla nowych stron shell:**
```tsx
'use client';

export default function ModulePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="grid-bg" />

      {/* Top Bar */}
      <div className="relative z-10 flex items-center justify-between px-8 py-4 border-b border-gold/10">
        <span className="font-mono text-xs text-ivory/40 uppercase tracking-widest">MODUL NAME</span>
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 px-8 py-6">
        {/* ... */}
      </div>
    </div>
  );
}
```

---

## Struktura plików (mapa)

```
vantix-app/
├── app/
│   ├── (shell)/                  ← Production Shell
│   │   ├── layout.tsx            ← [Dock | Content | Metrics]
│   │   ├── dashboard/page.tsx
│   │   ├── cockpit/page.tsx + layout.tsx
│   │   ├── crm/page.tsx
│   │   └── dev/page.tsx
│   ├── (system)/                 ← System Panel
│   │   ├── layout.tsx
│   │   └── system/
│   │       ├── brain/page.tsx
│   │       ├── orchestration/page.tsx
│   │       ├── workflows/page.tsx
│   │       ├── analytics/page.tsx
│   │       └── settings/page.tsx
│   ├── globals.css               ← Design System CSS + Tailwind
│   ├── layout.tsx                ← Root layout (fonty)
│   └── page.tsx                  ← Landing page (vantix.pl)
│
├── components/
│   ├── shell/
│   │   ├── LeftThreeDimensionalDock.tsx   ← 68px lewy dock
│   │   ├── CentralBrainFocus.tsx          ← główny widget dashboard
│   │   ├── IsometricMetricLedger.tsx      ← 220px prawy panel
│   │   ├── ModuleCard.tsx
│   │   └── SystemStatus.tsx
│   ├── cockpit/
│   │   ├── TodayTasks.tsx
│   │   ├── WeekCalendar.tsx
│   │   ├── PriorityList.tsx
│   │   └── AIRecommendations.tsx
│   └── landing/
│       └── [11 komponentów landing page]
│
├── lib/
│   ├── n8nService.ts             ← webhook do n8n (test URL — wymaga produkcyjnego)
│   └── utils.ts                  ← cn() helper
│
└── AGENTS.md                     ← ten plik
```

---

## Zasady kodowania

- `'use client'` — dodaj gdy używasz `useState`, `useEffect`, `usePathname` itd.
- TypeScript — typuj interfejsy (szczególnie props i dane z API)
- Jeden komponent = jedna odpowiedzialność
- Dane mock w pliku — gotowe do zastąpienia wywołaniem API w Phase 2
- Brak komentarzy opisujących CO robi kod. Komentarz tylko jeśli DLACZEGO jest nieoczywiste.
- Brak `console.log` w produkcyjnym kodzie

---

## Stack techniczny

```
Next.js 15 (App Router)   Tailwind CSS     TypeScript
Neon (Postgres serverless) Prisma (ORM)    Vercel (deploy)
n8n (automatyzacje)        Claude API       lucide-react (ikony)
```

---

## Konwencje

- Pliki Next.js/React: `PascalCase.tsx`
- Foldery: `kebab-case`
- Commity: `[feat/fix/refactor/docs/chore]: opis po polsku`
- Zmienne env: tylko w `.env.local` — nigdy w repo

---

## TASKI SESJA 19 — System Panel UI (dla DeepSeeka)

> Każdy task to JEDEN plik. Rób jeden na raz. Czekaj na code review Claude Code przed kolejnym.
> Wszystkie taski: **tylko mock data** — bez API calls, bez fetch. Dane hardcoded w pliku.
> Design system: patrz sekcja "Design System — OBOWIĄZKOWE" wyżej.

---

### TASK-S01 — System Panel: Sidebar Navigation Layout

**Opis:** Przepisz `app/(system)/layout.tsx` — dodaj lewy sidebar z nawigacją między stronami systemu.

**Input:** Przeczytaj przed implementacją:
- `app/(system)/layout.tsx` (plik do zmiany)
- `components/shell/LeftThreeDimensionalDock.tsx` (wzorzec sidebar — INSPIRACJA, nie kopia)
- `app/globals.css` (design tokens — bg-void, text-gold, font-mono)

**Output:** Zmodyfikuj `app/(system)/layout.tsx`:

```tsx
// Struktura layoutu po zmianie:
<div className="flex h-screen bg-void overflow-hidden">
  {/* Sidebar 200px */}
  <aside className="w-[200px] flex flex-col h-screen bg-void border-r border-gold/10 shrink-0">
    {/* Logo + back link */}
    {/* Sekcja: SYSTEM links (Brain, Orchestration, Workflows, Analytics, Settings) */}
    {/* Sekcja: powrót do Shell */}
  </aside>
  {/* Content */}
  <main className="flex-1 flex flex-col overflow-hidden">
    {children}
  </main>
</div>
```

**Ikony z lucide-react:** BrainCircuit (Brain), Network (Orchestration), Workflow (Workflows), BarChart3 (Analytics), Settings (Settings), LayoutDashboard (← Dashboard).

**Aktywny link:** użyj `usePathname()` — aktywna strona ma `text-gold border-l-2 border-gold bg-gold/5`.

**Warunki akceptacji:**
- [ ] Sidebar 200px, tło `bg-void`, border-r `border-gold/10`
- [ ] 5 linków do system/* + 1 link do /dashboard
- [ ] Aktywny link wyróżniony złotem
- [ ] Brak `rounded-*` na linkach (ostre krawędzie)
- [ ] Fonty: `font-mono text-[10px]` dla labels, `text-ivory/50` domyślnie, `text-gold` aktywny
- [ ] `'use client'` na początku (usePathname wymaga Client Component)

---

### TASK-S02 — Brain Page: VANTIXRAG Section Browser

**Opis:** Przepisz `app/(system)/system/brain/page.tsx` — stwórz przeglądarkę sekcji VANTIXRAG z search i kategoriami.

**Input:** Przeczytaj przed implementacją:
- `app/(system)/system/brain/page.tsx` (plik do zmiany)
- `app/globals.css` (klasy: vx-card, vx-label, vx-badge, grid-bg)
- `components/shell/CentralBrainFocus.tsx` (wzorzec top bar + content area)

**Mock data do użycia w pliku:**
```ts
const sections = [
  { key: '00_CORE',     label: 'Core Engine',     type: 'system',  files: 4,  updated: '2026-05-18', status: 'active' },
  { key: '01_MASTER',   label: 'Master Memory',   type: 'master',  files: 5,  updated: '2026-05-18', status: 'active' },
  { key: '02_PROFILE',  label: 'Owner Profile',   type: 'profile', files: 4,  updated: '2026-05-17', status: 'active' },
  { key: '03_PROJECTS', label: 'Projects',        type: 'project', files: 8,  updated: '2026-05-18', status: 'active' },
  { key: '04_KNOWLEDGE',label: 'Knowledge Base',  type: 'knowledge', files: 12, updated: '2026-05-17', status: 'active' },
  { key: '05_MODULES',  label: 'Shell Mini-RAGs', type: 'module',  files: 18, updated: '2026-05-16', status: 'active' },
  { key: '06_PROMPTS',  label: 'Prompt Library',  type: 'prompts', files: 6,  updated: '2026-05-15', status: 'active' },
  { key: '07_MEMORY',   label: 'AI Memory Layer', type: 'memory',  files: 9,  updated: '2026-05-18', status: 'active' },
  { key: '08_EVOLUTION',label: 'Evolution Queue', type: 'evo',     files: 2,  updated: '2026-05-17', status: 'pending' },
  { key: '09_EVAL',     label: 'Evaluation',      type: 'eval',    files: 3,  updated: '2026-05-14', status: 'active' },
];
```

**Output:** Zmodyfikuj `app/(system)/system/brain/page.tsx`:
- Top bar: label "BRAIN / VANTIXRAG", search input (stan lokalny `useState`)
- Grid `grid-cols-2` sekcji jako `vx-card`
- Każda karta: key (font-mono text-[9px] text-gold/50), label (font-mono text-[13px] text-ivory/80), badge status (vx-badge-green dla 'active', vx-badge-gold dla 'pending'), liczba plików i data updated

**Warunki akceptacji:**
- [ ] Search filtruje po label i key w czasie rzeczywistym
- [ ] 10 kart sekcji w grid-cols-2
- [ ] Status badge poprawnie kolorowany
- [ ] Top bar z labelką "BRAIN / VANTIXRAG" i search inputem
- [ ] `'use client'` (useState)

---

### TASK-S03 — Orchestration Page: AI Job Monitor

**Opis:** Przepisz `app/(system)/system/orchestration/page.tsx` — tabela AI jobów z statusami i metrykami.

**Input:** Przeczytaj `app/globals.css` (klasy: vx-card, vx-badge-*, vx-row).

**Mock data:**
```ts
const jobs = [
  { id: 'JOB-001', type: 'decompose',  orchestrator: 'Claude Sonnet', worker: 'DeepSeek R1', status: 'completed', tokens: 2840, cost: '$0.031', duration: '4.2s',  created: '2026-05-18 14:22' },
  { id: 'JOB-002', type: 'implement',  orchestrator: 'Claude Sonnet', worker: 'DeepSeek R1', status: 'completed', tokens: 8120, cost: '$0.089', duration: '12.7s', created: '2026-05-18 13:45' },
  { id: 'JOB-003', type: 'review',     orchestrator: 'Claude Sonnet', worker: null,           status: 'processing',tokens: 1240, cost: '$0.014', duration: '...',   created: '2026-05-18 15:01' },
  { id: 'JOB-004', type: 'decompose',  orchestrator: 'Claude Sonnet', worker: 'DeepSeek R1', status: 'failed',    tokens: 320,  cost: '$0.004', duration: '1.1s',  created: '2026-05-17 22:18' },
  { id: 'JOB-005', type: 'implement',  orchestrator: 'Claude Sonnet', worker: 'DeepSeek R1', status: 'pending',   tokens: 0,    cost: '$0.000', duration: '—',     created: '2026-05-18 15:03' },
];
```

**Output:** `app/(system)/system/orchestration/page.tsx`:
- Top bar: "COGNITIVE MESH / ORCHESTRATION" + summary badge ("3 completed today")
- Stats row (4 karty): Jobs today, Success rate, Total tokens, Total cost
- Tabela: Job ID | Type | Orchestrator → Worker | Status | Tokens | Cost | Czas | Data
- Status badges: `vx-badge-green` completed, `vx-badge-gold` processing/pending, `vx-badge-red` failed
- Type badges: `vx-badge-dim` dla decompose/implement/review

**Warunki akceptacji:**
- [ ] Tabela z 5 wierszami mock data
- [ ] Status kolorowany poprawnie (green/gold/red)
- [ ] Stats row 4 karty z wartościami z mock data
- [ ] Brak API calls

---

### TASK-S04 — Workflows Page: n8n Flow Monitor

**Opis:** Przepisz `app/(system)/system/workflows/page.tsx` — lista flows n8n z statusami.

**Mock data:**
```ts
const flows = [
  { id: 'WF-001', name: 'VANTIXRAG GitHub Sync',    trigger: 'webhook',  status: 'active',   lastRun: '2026-05-18 12:30', runs: 47,  errors: 0 },
  { id: 'WF-002', name: 'New Lead Alert',            trigger: 'webhook',  status: 'active',   lastRun: '2026-05-18 09:14', runs: 12,  errors: 1 },
  { id: 'WF-003', name: 'Lead Follow-up Reminder',  trigger: 'cron',     status: 'active',   lastRun: '2026-05-18 09:00', runs: 31,  errors: 0 },
  { id: 'WF-004', name: 'Daily Briefing',            trigger: 'cron',     status: 'active',   lastRun: '2026-05-18 08:00', runs: 28,  errors: 0 },
  { id: 'WF-005', name: 'Evolution Proposals',       trigger: 'manual',   status: 'inactive', lastRun: '—',                runs: 0,   errors: 0 },
];
```

**Output:** `app/(system)/system/workflows/page.tsx`:
- Top bar: "WORKFLOWS / n8n" + status badge systemu n8n (żółty "WARN — sleeping")
- Stats: Aktywne flows, Uruchomienia dziś, Błędy dziś
- Tabela: Flow | Trigger | Status | Ostatnie uruchomienie | Runs | Błędy | [Trigger btn]
- Status: `vx-badge-green` active, `vx-badge-dim` inactive
- Trigger type: `vx-badge-gold` webhook, `vx-badge-blue` cron, `vx-badge-dim` manual
- Przycisk "Trigger" (disabled, `opacity-40 cursor-not-allowed`)

**Warunki akceptacji:**
- [ ] 5 flows w tabeli
- [ ] Prawidłowe kolorowanie statusów
- [ ] Przycisk Trigger jest disabled (mock)
- [ ] n8n status badge "WARN" widoczny

---

### TASK-S05 — Analytics Page: Token & Cost Dashboard

**Opis:** Przepisz `app/(system)/system/analytics/page.tsx` — metryki tokenów i kosztów AI.

**Mock data:**
```ts
const dailyCosts = [
  { date: '05-12', tokens: 12400, cost: 0.14 },
  { date: '05-13', tokens: 8200,  cost: 0.09 },
  { date: '05-14', tokens: 21800, cost: 0.24 },
  { date: '05-15', tokens: 5600,  cost: 0.06 },
  { date: '05-16', tokens: 18900, cost: 0.21 },
  { date: '05-17', tokens: 34200, cost: 0.38 },
  { date: '05-18', tokens: 11200, cost: 0.12 },
];
const modelBreakdown = [
  { model: 'Claude Sonnet 4.6', role: 'Orchestrator', tokens: 68400, cost: 0.75, pct: 62 },
  { model: 'DeepSeek R1',       role: 'Worker',       tokens: 38200, cost: 0.31, pct: 28 },
  { model: 'Claude Haiku 4.5',  role: 'Fast tasks',   tokens: 5700,  cost: 0.06, pct: 10 },
];
```

**Output:** `app/(system)/system/analytics/page.tsx`:
- Top bar: "ANALYTICS / AI TELEMETRY"
- Summary stats (4 karty): Total tokens mtd, Total cost mtd ($1.12), Avg daily cost, Jobs ran
- Bar chart z CSS: 7 słupków (CSS `div` z `height` proporcjonalnym do max wartości) — każdy słupek to `bg-gold/60` z datą pod spodem
- Tabela model breakdown: Model | Role | Tokens | Cost | % share (mini progress bar)

**Warunki akceptacji:**
- [ ] Bar chart z 7 słupkami (only CSS/HTML, żadnych chart libraries)
- [ ] Wysokość słupka proporcjonalna: `(cost/maxCost)*100%` max height 80px
- [ ] Tabela model breakdown z 3 wierszami
- [ ] 4 summary karty z danymi

---

### TASK-S06 — Settings Page: Config Panel

**Opis:** Przepisz `app/(system)/system/settings/page.tsx` — panel konfiguracji: klucze API + model registry.

**Mock data:**
```ts
const apiKeys = [
  { name: 'Claude API',    key: 'sk-ant-***...***-1a2b',  status: 'active', provider: 'Anthropic' },
  { name: 'Neon Postgres', key: 'postgresql://neon***',    status: 'active', provider: 'Neon' },
  { name: 'n8n Webhook',   key: 'https://SolutionK***',    status: 'warn',   provider: 'HF Spaces' },
  { name: 'Supabase',      key: 'eyJhbGci***',             status: 'active', provider: 'Supabase' },
  { name: 'DeepSeek API',  key: 'sk-***...***-deepseek',   status: 'inactive', provider: 'DeepSeek' },
];
const models = [
  { id: 'claude-sonnet-4-6', name: 'Claude Sonnet 4.6', role: 'Orchestrator', provider: 'Anthropic', cost: '$3/$15 per 1M' },
  { id: 'deepseek-r1',       name: 'DeepSeek R1',       role: 'Worker',       provider: 'DeepSeek',  cost: '$0.55/$2.19 per 1M' },
  { id: 'claude-haiku-4-5',  name: 'Claude Haiku 4.5',  role: 'Fast tasks',   provider: 'Anthropic', cost: '$0.80/$4 per 1M' },
];
```

**Output:** `app/(system)/system/settings/page.tsx`:
- Top bar: "SETTINGS / CONFIGURATION"
- Sekcja "API Keys": tabela — Name | Provider | Key (maskowana, `font-mono text-[10px] text-ivory/25`) | Status
- Status: `vx-badge-green` active, `vx-badge-gold` warn, `vx-badge-dim` inactive
- Sekcja "Model Registry": tabela — Model ID | Name | Role | Provider | Input/Output cost
- Sekcja "System Info": 2-3 statyczne wartości (version, env, last deploy)

**Warunki akceptacji:**
- [ ] 5 wpisów API keys z zamaskowanymi kluczami
- [ ] 3 modele w registrze
- [ ] Status badges poprawnie kolorowane
- [ ] Klucze NIGDY nie pokazują pełnej wartości (zawsze "***" w środku)
- [ ] Brak edytowalnych inputów — tylko display (Phase 2 feature)
