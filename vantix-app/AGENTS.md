# AGENTS.md — Vantix OS / Worker Brief
> Ten plik czyta DeepSeek (i każdy inny agent implementujący). Aktualizuj po każdej sesji.
> Ostatnia aktualizacja: 2026-05-18 (sesja 17 — Dashboard + Cockpit Vantix DS)

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
| `app/(system)/system/*/page.tsx` | ⚠️ wszystkie placeholdery |
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
