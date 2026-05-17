# Plan Master — Vantix OS
> Nadrzędny plan kolejności prac. Aktualizuj gdy zmienią się priorytety.
> Ostatnia aktualizacja: 2026-05-17

---

## Kolejność faz (aktualny priorytet)

```
FAZA A — Landing Page (finish + convert)
    ↓
FAZA B — System (n8n flows + Obsidian)
    ↓
FAZA C — Shell mockupy (CRM, Cockpit, DEV)
    ↓
FAZA D — Phase 2 Backend (Prisma, Auth, API)
```

---

## FAZA A — Landing Page ✦ priorytet #1

> Cel: landing który konwertuje. Visitor → lead z AI-opisem w CRM.

### A1 — UI/UX redesign

**Problemy do naprawienia:**
- Sekcje za długie, za dużo tekstu — skrócić
- Hero — copy zbyt generyczne ("Skalowalność bez chaosu") — bardziej konkretne
- Brak jasnego CTA powyżej fold
- Brak social proof / liczb / przykładów

**Zmiany UI:**
- Hero: nowy headline + subheadline skupione na bólu klienta
- Dodać sekcję "Dla kogo" — bullet list 3 person (freelancer, agencja, solopreneur)
- FAQ sekcja (eliminuje obiekcje przed kontaktem)
- Footer — uzupełnić linki social media (LinkedIn, Twitter)
- Mobile: przejść przez każdą sekcję na 375px

**Nowe copy:**
- Headline: TBD — wymaga decyzji Kacpra
- CTA primary: "Umów bezpłatną konsultację"
- CTA secondary: "Pobierz lead magnet" ← nowe

---

### A2 — Lead Magnet

**Koncept:** Bezpłatny mini-audit lub checklist — coś co daje wartość przed kontaktem.

**Propozycje (Kacper wybiera):**
1. **"10-punktowy audyt procesów"** — PDF z pytaniami które klient wypełnia sam, identyfikuje co można zautomatyzować
2. **"Kalkulator czasu straconego na ręcznych taskach"** — interaktywny na stronie (suwakami jak w ContactForm)
3. **"Case study: jak zautomatyzowałem X w Y dni"** — konkretna historia z liczby

**Implementacja:**
- Dodać nowy CTA button w Hero i w sekcji Features
- Osobny formularz lead magnet: tylko email + imię (niższy próg niż główny form)
- Po submit: redirect do strony z linkiem do PDF / pokazanie interaktywnego narzędzia

---

### A3 — JSON Enrichment formularza

**Co zbierać przy submicie (hidden fields + JS):**
```js
// Dodać do ContactForm przed wysyłką do n8n
const enrichment = {
  utm_source:   new URLSearchParams(window.location.search).get('utm_source') || 'direct',
  utm_medium:   new URLSearchParams(window.location.search).get('utm_medium') || '',
  utm_campaign: new URLSearchParams(window.location.search).get('utm_campaign') || '',
  referrer:     document.referrer || '',
  page_url:     window.location.href,
  device:       /Mobile/.test(navigator.userAgent) ? 'mobile' : 'desktop',
  timestamp:    new Date().toISOString(),
  time_on_page: Math.round((Date.now() - window.performance.timing.navigationStart) / 1000) + 's'
};
```

**Cel:** Wiedzieć skąd przyszedł lead, ile czasu spędził na stronie, z jakiego urządzenia.

**Schemat leads — dodać kolumny:**
```sql
ALTER TABLE leads ADD COLUMN IF NOT EXISTS enrichment JSONB;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS ai_description TEXT;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS ai_score VARCHAR(10); -- 'high'|'medium'|'low'
```

---

### A4 — AI opis leada w CRM

**Flow:**
```
Form submit → n8n Webhook → INSERT leads → Claude API → UPDATE leads.ai_description → Telegram
```

**Prompt dla Claude (w n8n Function node):**
```
Jesteś asystentem CRM. Przeanalizuj dane potencjalnego klienta i wygeneruj profil.

Dane klienta:
- Imię: {{name}}
- Email: {{email}}
- Telefon: {{phone}}
- Opis problemu: {{message}}
- Typ usługi: {{service_type}}
- Źródło: {{source}} / {{utm_source}}
- Czas na stronie: {{time_on_page}}
- Urządzenie: {{device}}

Odpowiedz TYLKO w JSON (bez markdown):
{
  "profil": "2 zdania o kliencie i jego sytuacji",
  "bol": "główny ból w 1 zdaniu",
  "dopasowanie_icp": "wysokie|srednie|niskie",
  "uzasadnienie": "dlaczego takie dopasowanie (1 zdanie)",
  "pierwsze_kroki": ["krok 1", "krok 2"],
  "szacowany_budzet": "do 1k|1-3k|3-10k|10k+ PLN"
}
```

**Model:** `claude-haiku-4-5` (tani, szybki, wystarczający do profilowania)
**Koszt:** ~0.002 PLN per lead — pomijalny

**Wynik:** Kacper otwiera CRM → widzi od razu AI-opis każdego leada bez czytania surowej wiadomości.

---

### A5 — Checklist wykonania (Faza A)

- [ ] Nowe copy w Hero (Kacper decyduje o headline)
- [ ] Lead magnet — wybór konceptu (Kacper decyduje)
- [ ] Formularz lead magnet (tylko email + imię)
- [ ] JSON enrichment w ContactForm.tsx
- [ ] Kolumny `enrichment`, `ai_description`, `ai_score` w Neon
- [ ] n8n: New Lead Alert flow z AI enrichment (Claude API node)
- [ ] Test end-to-end: form → n8n → Neon z ai_description
- [ ] FAQ sekcja na landing
- [ ] Mobile pass wszystkich sekcji
- [ ] Footer: prawdziwe linki social media

---

## FAZA B — System ✦ priorytet #2

> Cel: Obsidian auto-sync + n8n flows działają w tle produkcyjnie.

### B1 — Obsidian Git Plugin *(Kacper ręcznie, ~20 min)*

1. Community Plugins → "Obsidian Git" → Install → Enable
2. Ustawienia: auto-backup co `10` min, push on backup ✅
3. Test: edytuj .md → `Ctrl+P` → "Create backup" → sprawdź GitHub

### B2 — n8n: VANTIXRAG GitHub Sync

```
GitHub Webhook (push) → n8n → filter VANTIXRAG/*.md → fetch raw → UPSERT brain_sections
```

Szczegółowy plan w: `plan_2026-05-17_obsidian_n8n.md` → BLOK 3

**Prereq:** GitHub webhook na repo → `https://SolutionKacper-VantixN8N.hf.space/webhook/github-push`

### B3 — n8n: Daily Briefing *(cron 08:00)*

```
Cron 08:00 → SELECT tasks WHERE done=false → SELECT leads WHERE stage='new' → format → Telegram
```

Wysyła każdego ranka: lista tasków na dziś + nowe leady.

### B4 — Podmiana webhook URL

```
.env.local:
NEXT_PUBLIC_N8N_WEBHOOK_URL=https://SolutionKacper-VantixN8N.hf.space/webhook/lead-alert
CLAUDE_API_KEY=...
```

---

## FAZA C — Shell Mockupy ✦ priorytet #3

> Cel: wszystkie moduły mają działające UI na mock danych. Gotowe do Phase 2 backend.

### C1 — Dashboard *(5 min)*
Podpiąć `CentralBrainFocus` do `app/(shell)/dashboard/page.tsx`:
```tsx
import CentralBrainFocus from '@/components/shell/CentralBrainFocus';
export default function DashboardPage() { return <CentralBrainFocus />; }
```

### C2 — CRM `/crm` *(priorytet — AI opis leada)*

**Widok główny:**
- Lista leadów — tabela z kolumnami: Imię, Email, Stage, Score, Data, AI-profil snippet
- Kanban lejek (4 kolumny): `new → contacted → qualified → closed`)
- Kliknięcie leada → modal z pełnym AI opisem + enrichment data

**Mock data zgodny ze schematem Neon `leads`**

### C3 — Cockpit `/cockpit`

Przepisać `app/(shell)/cockpit/page.tsx` z white/neutral na Vantix Design System:
- TodayTasks → bg-void, vx-card, font-mono
- WeekCalendar → Vantix paleta
- PriorityList, AIRecommendations → ten sam styl

### C4 — DEV `/dev`

Nowa strona mockup:
- Lista projektów (1 aktywny: VANTIX001)
- Roadmapa (Phase 0✅ → Phase 1🔄 → Phase 2⬜ → Phase 3⬜ → Phase 4⬜)
- TODO lista (mock)
- Logi sesji (ostatnie 3 wpisy z logs.md)

---

## FAZA D — Phase 2 Backend

*Po zakończeniu Faz A-C. Osobny plan do napisania.*

Zakres: Prisma schema, NextAuth, API routes, Cognitive Mesh, real data w CRM/Cockpit/DEV.

---

## Definicja sukcesu każdej fazy

| Faza | Test sukcesu |
|------|-------------|
| A — Landing | Form → Neon leads z `ai_description` wypełnionym ✅ |
| B — System | Edytuj .md w Obsidianie → 10 min → `brain_sections` zaktualizowane ✅ |
| C — Shell | Wszystkie moduły renderują się bez "coming soon" ✅ |
| D — Backend | Login działa, CRM pokazuje prawdziwe leady z DB ✅ |
