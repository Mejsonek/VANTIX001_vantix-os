# decisions.md — Log Decyzji Technicznych VANTIX001

> Chronologiczny zapis kluczowych decyzji architektonicznych i technicznych. Nigdy nie usuwać — to historia projektu.
> Format: data, decyzja, uzasadnienie, alternatywy odrzucone.

---

## 2026-05-16 — Inicjalizacja projektu

### DEC-001: Stack techniczny
**Decyzja:** Next.js (App Router) + Tailwind + Neon (Postgres) + Vercel + Claude API
**Uzasadnienie:**
- Next.js — jeden framework dla frontend i API routes (serverless), App Router daje Server Components
- Tailwind — szybki prototyping, spójny design system
- Neon — serverless Postgres, Free Tier, zero kosztu na starcie, łatwy scale
- Vercel — automatyczny deploy z GitHub main, zero konfiguracji
- Claude API — najlepsza jakość dla systemu RAG i generowania kontekstu

**Alternatywy odrzucone:**
- Remix — mniejszy ekosystem, mniej zasobów
- PlanetScale — MySQL, nie Postgres; gorszy ekosystem dla RAG
- Railway zamiast Vercel — więcej konfiguracji, mniejsza integracja z Next.js

---

### DEC-002: Architektura VANTIXRAG — hierarchia RAG
**Decyzja:** RAG-matka + mini-RAGi per moduł (nie jeden globalny RAG)
**Uzasadnienie:**
- Separacja scope — mini-RAG CRM nie widzi danych DEV i odwrotnie
- Lepsza kontrola nad kontekstem każdego modułu
- Możliwość niezależnego rozwijania każdego mini-RAG
- RAG-matka jako router i arbiter między modułami

**Alternatywy odrzucone:**
- Jeden globalny RAG — za duży kontekst, za dużo szumu, trudny w utrzymaniu
- Brak RAG (czysty prompting) — za mała pamięć między sesjami

---

### DEC-003: Zasada "AI explores, Owner decides"
**Decyzja:** AI nie wdraża żadnych zmian systemowych bez akceptacji Kacpra
**Uzasadnienie:**
- Ochrona rdzenia systemu przed nieautoryzowanymi zmianami
- Kacper zachowuje pełną kontrolę przy jednoczesnym wykorzystaniu AI jako executora
- Propozycje ewolucji trafiają do `08_EVOLUTION/` — nie są wdrażane automatycznie

---

### DEC-004: Model płatności projektów 30/30/40
**Decyzja:** Blueprint 30% → MVP 30% → Delivery 40%
**Uzasadnienie:**
- Eliminuje ryzyko pracy bez wynagrodzenia
- Blueprint jako filtr — klient który negocjuje Blueprint, będzie negocjował każdy etap
- Płatność przed przejściem do kolejnej fazy (nie po)

---

### DEC-005: Minimum projektu 1 000 PLN
**Decyzja:** Odrzucać projekty poniżej 1 000 PLN
**Uzasadnienie:**
- Koszty operacyjne (czas, narzędzia, overhead) nie uzasadniają niższej kwoty
- Filtruje klientów "price buyers" — nie wpisujących się w ICP
- Pozwala skupić czas na projektach zbliżających do celu 80k PLN/rok

---

### DEC-006: Struktura repo i konwencje nazewnictwa
**Decyzja:**
- Projekt: `VANTIX[Numer]_[nazwa-projektu]`
- Foldery: `kebab-case`
- Pliki MD: `snake_case.md`
- Pliki Next.js: `PascalCase.tsx`
- Pliki Python: `snake_case.py`
- Commit messages: `[typ]: opis po polsku`

**Uzasadnienie:** Spójność przez cały ekosystem Vantix, łatwa orientacja w repo.

---

### DEC-007: Neon Free Tier jako baza danych (bootstrap)
**Decyzja:** Neon Free Tier do momentu osiągnięcia stabilnych przychodów 15k PLN/mies.
**Uzasadnienie:**
- Zero kosztu infrastruktury przy obecnym ruchu
- Upgrade dopiero gdy przychód uzasadnia wyższy plan
- Strategia bootstrap: minimalne koszty stałe (~200–300 PLN/mies. łącznie)

---

### DEC-008: Phase 0 — budowanie pamięci przed kodem
**Decyzja:** Przed budową jakiegokolwiek UI lub API — wypełnić kompletną pamięć VANTIXRAG
**Uzasadnienie:**
- Agent bez kontekstu właściciela będzie podejmował złe decyzje implementacyjne
- VANTIXRAG to fundament systemu — bez niego każda sesja zaczyna od zera
- Czas inwestycji w Phase 0 zwraca się wielokrotnie w każdej kolejnej sesji

---

### DEC-009: Baza danych Neon — instancja produkcyjna
**Decyzja:** Neon Postgres, region `eu-central-1` (AWS Frankfurt), pooler connection
**Konfiguracja (bez credentiali):**
- Host: `ep-tiny-night-aljcg3ye-pooler.c-3.eu-central-1.aws.neon.tech`
- Database: `neondb`
- User: `neondb_owner`
- SSL: wymagany (`sslmode=require&channel_binding=require`)
- Zmienna środowiskowa: `DATABASE_URL` w `.env.local`

**Uzasadnienie:** EU region — RODO, niskie opóźnienia dla rynku polskiego. Pooler connection dla serverless Next.js (Vercel).

**Credentiale:** NIE w repo — wyłącznie w `.env.local` i Vercel Environment Variables.

---

## 2026-05-17 — Blueprint v3.0

### DEC-010: Podział pracy Claude Code ↔ DeepSeek (NIENARUSZALNE)
**Decyzja:** Claude Code = Orchestrator (architektura, dekompozycja, review). DeepSeek R1 = Worker (implementacja atomowych tasków wg specyfikacji).
**Uzasadnienie:**
- Claude Code zachowuje pełną kontrolę nad architekturą i jakością kodu
- DeepSeek R1 jest tańszy i szybszy do generowania boilerplate/implementacji
- Separacja odpowiedzialności eliminuje ryzyko "dryfu architektonicznego"
- Każdy task dla DeepSeeka musi mieć: opis 1 zdanie, input, output format, warunki akceptacji
- Jeśli output niezgodny ze spec → wraca do DeepSeeka, NIE do Claude

**Alternatywy odrzucone:**
- Jeden model do wszystkiego — droższe, wolniejsze, mniej kontroli
- DeepSeek do architektury — za duże ryzyko błędnych decyzji projektowych

---

### DEC-011: Cognitive Mesh — Dual-Engine AI
**Decyzja:** `lib/ai/cognitive-mesh.ts` — Claude Sonnet jako Orchestrator, DeepSeek R1 jako Worker, oba przez OpenAI-compatible API.
**Uzasadnienie:**
- Claude Sonnet najlepszy do dekompozycji złożonych zadań na JSON plan
- DeepSeek R1 (OpenAI-compatible endpoint `https://api.deepseek.com/v1`) — tani, szybki do atomowych tasków
- Zod validation na każdym etapie — AI output jest nieufny domyślnie (DEC-006)
- Telemetria w DB (tokeny, koszt, czas) — pełna observability
- Hard cap $0.50 per job — ochrona przed niekontrolowanymi kosztami

**Wdrożenie:** Phase 2, Sesja C

---

### DEC-012: Prisma zamiast raw SQL
**Decyzja:** `prisma db pull` z istniejącego Neon schema → nowe modele na wierzch. Nie pisać od zera.
**Uzasadnienie:**
- Istniejące 16 tabel w Neon są sprawdzone — `prisma db pull` je bezpiecznie importuje
- Prisma daje TypeScript typy dla całej DB — zero ręcznego typowania
- Migracje przez `prisma migrate dev` — historia zmian w repo
- ORM eliminuje raw SQL w application code

**Alternatywy odrzucone:**
- Schema od zera w Prisma — ryzyko różnic z istniejącą DB
- Zostanie przy raw SQL — brak typów, trudna maintainability

---

### DEC-013: VANTIXRAG GitHub Sync — to samo repo
**Decyzja:** VANTIXRAG zostaje w tym samym repo (`VANTIX001_vantix-os`). Sync przez GitHub Raw API (`raw.githubusercontent.com/...`), trigger przez n8n webhook na GitHub push.
**Uzasadnienie:**
- Osobne repo = niepotrzebna komplikacja (2 repo do zarządzania, 2 zestawy credentiali)
- GitHub Raw API jest publiczne dla publicznych repo — zero dodatkowej auth
- n8n workflow prosty: push event → filter `VANTIXRAG/*.md` → fetch raw → UPSERT Neon

**Alternatywy odrzucone:**
- Osobne repo dla VANTIXRAG — overhead bez korzyści
- Obsidian Sync zamiast GitHub — płatny, nie daje API

---

### DEC-014: Cyborg Shell zastępuje obecny, nie jest osobny
**Decyzja:** Nowy Cyborg Shell (LeftDock + CentralBrainFocus + Metrics) przepisuje `/` i `/cockpit`. Jeden shell, nie dwa layouty.
**Uzasadnienie:**
- Jeden punkt wejścia eliminuje konfuzję "gdzie jestem"
- Obecny shell (sesja 3-4) był mockupem — można zastąpić bez regresji
- Layout `grid-cols-[auto_1fr_auto]` daje elastyczność bez złożoności

**Zakres Phase 1:** tylko LeftDock + CentralBrainFocus. IsometricMetrics z placeholderami — dane dopiero w Phase 2.

---

### DEC-015: n8n na Hugging Face Spaces (free tier)
**Decyzja:** n8n hostowany na HF Spaces CPU Basic (darmowy). SQLite w zamontowanym buckecie `vantix-n8n-data`.
**Uzasadnienie:**
- Zero kosztu na etapie bootstrapu
- SQLite + bucket = dane przeżywają restarty kontenera
- HF Spaces daje publiczny HTTPS URL dla webhooków
- Ograniczenie: może zasnąć po ~48h braku ruchu — akceptowalne na Phase 1-2

**Upgrade plan:** n8n Cloud ($20/mies.) gdy przychód >5k PLN/mies.

---

### DEC-016: Dual-Shell Architecture — Production Shell + System Panel
**Decyzja:** Dwa osobne layouty w Next.js App Router:
- `(shell)/` — Production Shell: CRM, Cockpit, DEV, Tasks. Cyborg design. URL: `app.vantix.pl/dashboard`, `/crm`, `/cockpit`, `/dev`
- `(system)/` — System Panel: Brain, Orchestration, Workflows, Analytics, Settings. Terminal/dashboard design. URL: `app.vantix.pl/system/*`

```
app/
├── (shell)/
│   ├── layout.tsx        ← Cyborg Shell layout (3D Dock, CentralBrainFocus)
│   ├── dashboard/
│   ├── crm/
│   ├── cockpit/
│   └── dev/
└── (system)/
    ├── layout.tsx        ← System Panel layout (terminal sidebar, dark grid)
    └── system/
        ├── brain/
        ├── orchestration/
        ├── workflows/
        ├── analytics/
        └── settings/
```

**Uzasadnienie:**
- Codzienna praca (CRM, taski) nie powinna być zanieczyszczona panelem technicznym (logi AI, koszty, telemetria)
- Dwa różne persony użytkownika: "operator" vs "architekt systemu"
- Route groups (`()`) — URL bez prefixu grupy, czyste ścieżki
- Osobne `layout.tsx` = niezależna nawigacja, styl i kontekst bez kolizji

**Alternatywy odrzucone:**
- Jeden layout z zakładkami — miesza konteksty, za dużo elementów w sidebarze
- Osobna subdomena `system.vantix.pl` — niepotrzebna komplikacja na tym etapie

---

## Format kolejnych wpisów

```
## YYYY-MM-DD — [Temat]

### DEC-[Numer]: [Tytuł decyzji]
**Decyzja:** [Co postanowiono]
**Uzasadnienie:** [Dlaczego]
**Alternatywy odrzucone:** [Co rozważano i dlaczego odrzucono]
```
