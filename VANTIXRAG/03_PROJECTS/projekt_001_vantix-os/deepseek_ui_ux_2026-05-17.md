# DeepSeek Task Brief — UI/UX Readability Overhaul
> Data: 2026-05-17 | Orchestrator: Claude Code | Worker: DeepSeek
> Projekt: `VANTIX001_vantix-os` — `vantix-app/`
> Stack: Next.js 15, Tailwind CSS v4, TypeScript, `'use client'`

---

## KONTEKST SYSTEMU (przeczytaj zanim zaczniesz)

**Design System (obowiązkowe — nie łam tych zasad):**
- Tło: `bg-void` (#020202), karty: `bg-surface` / `bg-s2` (#0c0c0c)
- Akcent: `text-gold` / `border-gold` (#D4AF37)
- Tekst: `text-ivory` (#F5F4F0) — używaj opacity variants: `/85`, `/70`, `/50`, `/30`
- Fonty: `font-display` (Syne, nagłówki) | `font-mono` (DM Mono, body/labele)
- NIGDY: `bg-white`, `bg-gray-*`, `text-gray-*`, `rounded-xl`, `shadow-*`
- Gotowe klasy: `.vx-card`, `.vx-3d`, `.vx-row`, `.btn`, `.btn-ghost`, `.btn-dim`, `.fade-up`, `.bar-animate`, `.row-enter`, `.num-animate`, `.delay-1` … `.delay-10`
- Tailwind v4: używaj `p-4!` nie `!p-4`, `text-[8px]!` nie `!text-[8px]`

**Czytelność — problemy do naprawienia:**
- Teksty 7–9px są za małe → minimum 10px dla etykiet, 12px dla body, 13–14px dla ważnych danych
- Opacity tekstu `/15`, `/20`, `/25` jest za słabe → minimum `/35` dla etykiet, `/55` dla body, `/80` dla głównych danych
- Za mało paddingu w wierszach → minimum `py-3.5` dla list, `py-4` dla kart
- Za dużo kolumn w tabelach → max 5 kolumn, priorytety: imię+email, firma, status, wartość, data

---

## TASK 1 — TodayTasks.tsx (Cockpit)

**Opis:** Przepisz komponent listy zadań żeby był czytelny, przejrzysty i miał wizualne priorytety przez kolory.

**Plik wejściowy:** `vantix-app/components/cockpit/TodayTasks.tsx`

**Obecne problemy:**
- Tekst 11px, opacity 50 — za mały i za blady
- Badge priorytetów małe i nieczytelne (`text-[6px]`)
- Checkbox 4x4 (w-4 h-4) — za mały, trudny do kliknięcia
- Czas pozostały ("30 min") nie ma koloru — nie widać pilności
- Brak wizualnego rozróżnienia wierszy (wszystko wygląda tak samo)
- Brak left-border accent pokazującego priorytet

**Wymagany output — `TodayTasks.tsx`:**

```
Interfejs Task bez zmian.

Zmiany wizualne:
1. Każdy wiersz ma border-l-2 po lewej stronie:
   - high priority → border-l-vred (kolor: #ff5252)
   - medium priority → border-l-gold
   - low priority → border-l-ivory/15

2. Checkbox: 20px × 20px (w-5 h-5), border grubości 1px

3. Tekst tytułu zadania: font-mono text-[13px] text-ivory/75
   Zadanie ukończone: line-through text-ivory/20

4. Czas pozostały — kolorowany:
   - ≤ 30 min → text-vred (pilne)
   - ≤ 2 godz → text-gold (uwaga)
   - > 2 godz → text-ivory/30 (ok)
   Rozmiar: text-[10px]

5. Badge priorytetu: text-[8px] font-bold uppercase, z dot przed tekstem:
   - HIGH → kolor vred, dot bg-vred
   - MED → kolor gold, dot bg-gold
   - LOW → text-ivory/25, dot bg-ivory/15

6. Padding wiersza: px-4 py-3.5

7. Progress bar: wyższy (h-[4px]), animowany fill (.bar-animate class)

8. Header: "DZISIAJ — X/Y ZADAŃ" + progress bar 80px

9. Hover wiersza: subtelne bg-gold/[0.02], border border-gold/[0.08]

10. Przycisk Trash2 → widoczny tylko na hover grupy (opacity-0 group-hover:opacity-60)
```

**Warunki akceptacji:**
- [ ] Funkcjonalność toggle/delete bez zmian
- [ ] Priorytet HIGH wizualnie wyróżniony (czerwona linia lewa)
- [ ] Czasy kolorowane zgodnie z pilnością
- [ ] Teksty minimum 13px dla tytułu, 10px dla meta
- [ ] Opacity minimum: /75 dla tytułu, /35 dla meta, /20 dla ukończonych
- [ ] `'use client'` na górze, bez nowych importów bibliotek

---

## TASK 2 — PriorityList.tsx (Cockpit)

**Opis:** Przepisz listę priorytetów żeby była czytelna z wizualnymi wskaźnikami deadlinu i postępu.

**Plik wejściowy:** `vantix-app/components/cockpit/PriorityList.tsx`

**Obecne problemy:**
- Numer rankingu jako szary kwadracik — nieczytelny
- Progress bar 3px — za cienki, nie widać postępu
- Deadline "Dziś"/"Jutro" nie ma koloru alarmowego
- Tekst 11px opacity /60 — za mały
- Brak efektu hover/3D

**Wymagany output — `PriorityList.tsx`:**

```
Interfejs Priority bez zmian.

Zmiany wizualne:
1. Numer rankingu: kolorowe kółko (36px), z gradientem:
   - idx=0: bg-gold/15, border-gold/40, text-gold, font-display font-black text-[14px]
   - idx=1: bg-vblue/10, border-vblue/30, text-vblue
   - idx=2+: bg-ivory/5, border-ivory/10, text-ivory/30

2. Tytuł: font-mono text-[13px] text-ivory/80 font-semibold

3. Opis: font-mono text-[11px] text-ivory/40 leading-relaxed

4. Deadline badge (obok tytułu, po prawej):
   - "Dziś" → bg-vred/10 border-vred/30 text-vred text-[8px] uppercase px-2 py-0.5
   - "Jutro" → bg-gold/10 border-gold/30 text-gold text-[8px] uppercase px-2 py-0.5
   - inne → border-ivory/10 text-ivory/25 text-[8px] uppercase px-2 py-0.5

5. Progress bar:
   - Wysokość: h-[5px] (nie 3px)
   - Track: bg-gold/8
   - Fill: gradient left-to-right, kolor wg idx:
     * idx=0: from-gold/60 to-gold
     * idx=1: from-vblue/60 to-vblue
     * idx=2+: from-ivory/20 to-ivory/30
   - Animacja: class .bar-animate
   - Wartość % jako font-mono text-[11px] font-bold, kolor jak fill

6. Karta: .vx-card .vx-3d, padding p-4
   - idx=0 ma border-l-2 border-l-gold/60 i subtelne bg-gold/[0.02]

7. Gap między kartami: space-y-2.5
```

**Warunki akceptacji:**
- [ ] Dane bez zmian (tylko wygląd)
- [ ] Deadline "Dziś" widocznie czerwony
- [ ] Progress bar minimum 5px wysokości z animacją
- [ ] Tytuł minimum 13px, /80 opacity
- [ ] Pierwsza karta wizualnie wyróżniona (gold accent)
- [ ] Hover 3D lift przez .vx-3d class

---

## TASK 3 — AIRecommendations.tsx (Cockpit)

**Opis:** Przepisz panel rekomendacji AI żeby każda rekomendacja była osobną kartą z poziomem pilności i akcją.

**Plik wejściowy:** `vantix-app/components/cockpit/AIRecommendations.tsx`

**Obecne problemy:**
- Jedna karta z listą → nie widać priorytetów
- Tekst 10px opacity /30 — za mały i za blady
- Przyciski "Zaakceptuj/Odrzuć" dla całej listy naraz — nieintuicyjne
- Brak wizualnego wyróżnienia pilności

**Wymagany output — `AIRecommendations.tsx`:**

```tsx
'use client';

import { Brain, X, ArrowRight, AlertTriangle, Clock, Lightbulb } from 'lucide-react';
import { useState } from 'react';

interface Recommendation {
  id: string;
  text: string;
  urgency: 'critical' | 'warning' | 'info';
  action: string;
}

const mockRecs: Recommendation[] = [
  { id: '1', urgency: 'critical', text: 'Sajid nie odpowiedział od 3 dni — wyślij follow-up lub zarchiwizuj lead.', action: 'Wyślij teraz' },
  { id: '2', urgency: 'warning',  text: 'Cockpit Phase 2 blokuje integrację z DB — zaplanuj sesję DeepSeek.', action: 'Zaplanuj' },
  { id: '3', urgency: 'info',     text: 'Evolution session RAG zaplanowana na ten piątek — przygotuj propozycje.', action: 'Otwórz notes' },
];

const urgencyCfg = {
  critical: { icon: AlertTriangle, color: '#ff5252', border: 'border-vred/30', bg: 'bg-vred/5', text: 'text-vred', label: 'PILNE' },
  warning:  { icon: Clock,         color: '#d4af37', border: 'border-gold/30', bg: 'bg-gold/5', text: 'text-gold', label: 'WAŻNE' },
  info:     { icon: Lightbulb,     color: 'rgba(245,244,240,0.4)', border: 'border-ivory/10', bg: 'bg-ivory/[0.02]', text: 'text-ivory/40', label: 'INFO' },
};

Każda rekomendacja = osobna karta (vx-card) z:
- Lewą border-l-2 w kolorze urgency
- Ikona urgency (16px) po lewej
- Badge "PILNE/WAŻNE/INFO" (text-[8px] uppercase, kolor)
- Tekst rekomendacji: font-mono text-[12px] text-ivory/65 leading-relaxed
- Przycisk akcji (btn btn-dim, text-[9px]) + przycisk dismiss (X, 10px, text-ivory/20 hover:text-ivory/50)
- Dismiss: usuwa tylko tę rekomendację ze stanu (useState na tablicy ids)

Header sekcji:
- Ikona Brain (12px, text-gold/60)
- "AI REKOMENDACJE" (font-mono text-[9px] text-ivory/40 uppercase tracking-widest)
- Liczba aktywnych rekomendacji jako badge (np. "3")

Gdy wszystkie dismissed:
- Placeholder: "Brak nowych rekomendacji" + ikona Brain text-ivory/10
```

**Warunki akceptacji:**
- [ ] Każda rekomendacja dismissowalna osobno
- [ ] PILNE wizualnie czerwone i widoczne
- [ ] Tekst minimum 12px, opacity minimum /65
- [ ] Gdy 0 rekomendacji → pokazuje placeholder
- [ ] Importy tylko z 'react' i 'lucide-react'

---

## TASK 4 — globals.css (animacje i typografia)

**Opis:** Dodaj do globals.css nowe klasy CSS poprawiające czytelność i animacje wyświetlania danych.

**Plik wejściowy:** `vantix-app/app/globals.css`

**Instrukcja:** Dopisz TYLKO poniższe bloki na końcu pliku — nie modyfikuj nic istniejącego.

**Wymagany output — bloki do dodania:**

```css
/* ── TYPOGRAPHY HELPERS ── */
.label-xs  { font-family: var(--font-mono); font-size: 9px;  color: rgba(245,244,240,0.35); letter-spacing: 0.14em; text-transform: uppercase; }
.label-sm  { font-family: var(--font-mono); font-size: 10px; color: rgba(245,244,240,0.45); letter-spacing: 0.10em; }
.body-sm   { font-family: var(--font-mono); font-size: 12px; color: rgba(245,244,240,0.60); line-height: 1.5; }
.body-md   { font-family: var(--font-mono); font-size: 13px; color: rgba(245,244,240,0.75); line-height: 1.5; }
.value-lg  { font-family: var(--font-display); font-size: 22px; font-weight: 900; color: #D4AF37; }
.value-xl  { font-family: var(--font-display); font-size: 28px; font-weight: 900; color: #D4AF37; }

/* ── URGENCY DOTS ── */
.dot-critical { width: 8px; height: 8px; border-radius: 50%; background: #ff5252; box-shadow: 0 0 8px rgba(255,82,82,0.7); animation: pulse 2s ease infinite; }
.dot-warning  { width: 8px; height: 8px; border-radius: 50%; background: #d4af37; box-shadow: 0 0 6px rgba(212,175,55,0.5); }
.dot-info     { width: 8px; height: 8px; border-radius: 50%; background: rgba(245,244,240,0.2); }

/* ── HEAT BAR (czas od ostatniego kontaktu) ── */
.heat-fresh  { background: linear-gradient(to right, rgba(74,222,128,0.6), rgba(74,222,128,0.9)); }
.heat-warm   { background: linear-gradient(to right, rgba(212,175,55,0.6), rgba(212,175,55,0.9)); }
.heat-cold   { background: linear-gradient(to right, rgba(255,82,82,0.6), rgba(255,82,82,0.9)); }

/* ── SKELETON SHIMMER ── */
@keyframes skeleton-sweep {
  0%   { background-position: -200% center; }
  100% { background-position: 200% center; }
}
.skeleton {
  background: linear-gradient(90deg, rgba(245,244,240,0.04) 25%, rgba(245,244,240,0.08) 50%, rgba(245,244,240,0.04) 75%);
  background-size: 200% 100%;
  animation: skeleton-sweep 1.8s ease infinite;
}

/* ── COUNT-UP PULSE ── */
@keyframes count-pop {
  0%   { transform: scale(1); }
  40%  { transform: scale(1.12); }
  100% { transform: scale(1); }
}
.count-pop { animation: count-pop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) both; }

/* ── ROW HIGHLIGHT (flash on new data) ── */
@keyframes row-flash {
  0%   { background: rgba(212,175,55,0.12); }
  100% { background: transparent; }
}
.row-flash { animation: row-flash 1.2s ease both; }

/* ── PRIORITY LEFT BORDER ACCENTS ── */
.priority-high   { border-left: 2px solid #ff5252; }
.priority-medium { border-left: 2px solid #d4af37; }
.priority-low    { border-left: 2px solid rgba(245,244,240,0.10); }

/* ── DEADLINE BADGE ── */
.deadline-critical { border: 1px solid rgba(255,82,82,0.35); background: rgba(255,82,82,0.08); color: #ff5252; }
.deadline-warning  { border: 1px solid rgba(212,175,55,0.35); background: rgba(212,175,55,0.08); color: #d4af37; }
.deadline-normal   { border: 1px solid rgba(245,244,240,0.10); background: transparent; color: rgba(245,244,240,0.30); }

/* ── MINI PROGRESS BAR ── */
.mini-progress { height: 5px; background: rgba(245,244,240,0.06); overflow: hidden; }
.mini-progress-fill { height: 100%; transition: width 0.8s cubic-bezier(0.25,0.46,0.45,0.94); }
```

**Warunki akceptacji:**
- [ ] Dopisane tylko na końcu pliku
- [ ] Żadna istniejąca klasa nie zmodyfikowana
- [ ] Brak błędów składni CSS
- [ ] Klasy `.label-xs`, `.body-md`, `.dot-critical`, `.skeleton`, `.priority-high` istnieją

---

## TASK 5 — ProjectCard.tsx (DEV)

**Opis:** Ulepsz kartę projektu o mini wykres aktywności commitów (7 dni) i bardziej czytelne meta dane.

**Plik wejściowy:** `vantix-app/components/dev/ProjectCard.tsx`

**Interfejs Project (rozszerzony — dopisz do istniejącego):**
```typescript
// Dodaj opcjonalne pole do interfejsu Project:
activityLast7Days?: number[]; // np. [2, 0, 5, 1, 3, 0, 8] — commity per dzień
```

**Wymagany output — zmiany w ProjectCard.tsx:**

```
1. Mini Activity Heatmap (7 dni commitów):
   - 7 pionowych słupków (bars), każdy reprezentuje 1 dzień
   - Szerokość każdego: flex-1, max 12px
   - Wysokość: proporcjonalna do wartości (max = najwyższa wartość w tablicy)
   - Min wysokość: 3px (żeby dzień z 0 był widoczny jako flat)
   - Kolor: rgba(212,175,55, opacity) gdzie opacity = value/max * 0.85 + 0.10
   - Brak danych: 7 słupków o jednakowej wysokości 4px, opacity 0.15
   - Tooltip (title atrybut): "Dzień X: Y commitów"
   - Umieść pod progress barem, przed meta grid

2. Zwiększ czytelność meta grid:
   - lastCommit: font-mono text-[11px] text-ivory/55 (było /20)
   - commits: font-display text-[14px] font-bold (było text-[8px])
   - updatedAt: font-mono text-[11px] text-ivory/55 (było /20)
   - Etykiety (last commit / commits / updated): text-[9px] text-ivory/30 (było /12)

3. Progress %:
   - Wartość: font-display text-[16px] font-black (było text-[10px])
   - Kolor wg fazy (zachować phaseCfg.text)

4. Nazwa projektu:
   - font-display text-[15px] font-bold text-ivory/85 (było text-sm /80)
```

**Mock data do dodania w dev/page.tsx (do mockProjects):**
```typescript
// Dodaj pole activityLast7Days do każdego projektu:
{ ..., activityLast7Days: [3, 1, 7, 2, 5, 0, 4] },  // P-001
{ ..., activityLast7Days: [1, 0, 2, 0, 1, 0, 3] },  // P-002
{ ..., activityLast7Days: [0, 0, 1, 4, 2, 1, 0] },  // P-003
```

**Warunki akceptacji:**
- [ ] Activity heatmap widoczny (7 słupków)
- [ ] Wysokości słupków proporcjonalne do danych
- [ ] Meta dane minimum 11px, /55 opacity
- [ ] Progress % minimum 16px
- [ ] Nie łamie TypeScript — `activityLast7Days?: number[]` (optional)
- [ ] Zachowana nawigacja `href={project.repo}`

---

## ZASADY OGÓLNE (dla wszystkich tasków)

1. `'use client'` na górze każdego pliku — zawsze
2. Żadnych nowych zależności (npm install) — tylko react + lucide-react + next
3. Tailwind v4 — używaj `class!` (postfix) nie `!class` (prefix)
4. Inline styles tylko do dynamicznych wartości (kolory z JS) — statyczne przez Tailwind
5. TypeScript strict — żadnych `any`, żadnych `@ts-ignore`
6. Zachowaj całą istniejącą logikę (toggle, sort, dismiss, etc.)
7. Jeden plik per task — nie twórz nowych plików (wyjątek: task 4 tylko dopisuje do istniejącego)
8. Nie dotykaj żadnych innych plików niż wskazane w tasku

---

## KOLEJNOŚĆ WYKONANIA

```
Task 4 (globals.css) → Task 1 (TodayTasks) → Task 2 (PriorityList) → Task 3 (AIRecommendations) → Task 5 (ProjectCard + page.tsx)
```

Task 4 pierwszy — bo Tasks 1-3 mogą używać nowych klas CSS.

---

## OUTPUT FORMAT

Dla każdego taska dostarcz:
```
### TASK [N] — [NazwaPliku]
[Pełna zawartość pliku — od pierwszej do ostatniej linii]
```

Nie obcinaj. Pełne pliki. Jeśli plik jest długi — i tak całość.
