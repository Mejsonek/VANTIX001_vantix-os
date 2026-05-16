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

## Format kolejnych wpisów

```
## YYYY-MM-DD — [Temat]

### DEC-[Numer]: [Tytuł decyzji]
**Decyzja:** [Co postanowiono]
**Uzasadnienie:** [Dlaczego]
**Alternatywy odrzucone:** [Co rozważano i dlaczego odrzucono]
```
