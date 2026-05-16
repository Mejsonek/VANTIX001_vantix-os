# CLAUDE.md — Vantix OS + VANTIXRAG
> Główny plik kontekstu dla Claude Code. Czytaj przed każdą sesją. Nie modyfikuj bez zgody właściciela.

---

## Kim jest właściciel systemu

**Kacper Zdżałka** — Founder Vantix, AI Systems Architecture & Automation.
- Rola: **Architekt** — definiuje strukturę, cele, zasady. Nie pisze kodu ręcznie.
- Agent (ty): **Developer** — implementuje zgodnie z architekturą. Pełna autonomia w decyzjach implementacyjnych.
- Stack: Next.js, Tailwind, Neon (Postgres), Vercel, n8n (automatyzacje), Claude API

---

## Czym jest Vantix OS

Centralny system operacyjny dla pracy Kacpra. Nie aplikacja — **centrum sterowania**.

Wchodząc do systemu Kacper widzi natychmiast:
- co jest najważniejsze dziś
- status projektów i leadów
- rekomendacje AI
- co zrobić dalej

**Cel systemu:** zmniejszyć chaos operacyjny, skrócić przełączanie między narzędziami, przyspieszyć delivery.

---

## Architektura systemu

### Trzy warstwy platformy

| Warstwa | URL | Opis |
|---------|-----|------|
| Publiczna | `vantix.pl` | Landing, formularz kontaktowy, prezentacja marki |
| Prywatna | `app.vantix.pl` | Shell, logowanie, launcher modułów |
| Modułowa | — | Moduły robocze (CRM, DEV, Cockpit, itd.) |

### Moduły systemu

| Moduł | Opis |
|-------|------|
| **Shell / Launcher** | Punkt wejścia, nawigacja, szybkie akcje |
| **Personal Cockpit** | Taski, kalendarz, notatki, priorytety, rekomendacje AI |
| **CRM** | Leady, lejek, follow-up, routing, notatki, taski |
| **Vantix DEV** | Projekty, roadmapa, TODO, logi, pamięć projektu, kontekst agentów |
| **Settings / Integrations** | API keys, AI providerzy, integracje, automatyzacje |
| **Workflows / Automation Studio** | Webhooki, flow, retry, reusable blocks |
| **VANTIXRAG / Brain** | RAG-matka — wiedza, pamięć, prompty, decyzje, evolution proposals |

---

## Architektura VANTIXRAG

### Zasada hierarchii

```
RAG-MATKA (pełny dostęp do wszystkiego)
│
├── CRM mini-RAG       (scope: leady, lejek, follow-up)
├── DEV mini-RAG       (scope: projekty, logi, decyzje)
├── Cockpit mini-RAG   (scope: taski, kalendarz, priorytety)
├── Settings mini-RAG  (scope: konfiguracja, integracje)
└── Workflows mini-RAG (scope: automatyzacje, flow)
```

### Zasady komunikacji
- Mini-RAG widzi **tylko swój scope** — nigdy cały system
- Mini-RAG może **zapytać** RAG-matkę o szerszy kontekst
- RAG-matka może **odesłać odpowiedź, instrukcję lub propozycję zmiany**
- Propozycje zmian trafiają do **warstwy evolution** — nie są wdrażane automatycznie

### Zasada nadrzędna
> **AI explores, Owner decides.**

AI proponuje. Kacper zatwierdza lub odrzuca. Rdzeń systemu nigdy nie zmienia się bez akceptacji właściciela.

---

## Struktura katalogów VANTIXRAG

```
VANTIXRAG/
├── 00_CORE/                    ← silnik systemu
│   ├── system.md
│   ├── config.yaml
│   ├── retriever.yaml
│   └── engine/
│       ├── ingest.py
│       ├── index_builder.py
│       ├── query.py
│       └── router.py
│
├── 01_MASTER/                  ← rdzeń RAG-matki
│   ├── master_memory.md
│   ├── master_rules.md
│   ├── master_goals.md
│   ├── evolution_policy.md
│   └── master_context.md
│
├── 02_PROFILE/                 ← profil właściciela
│   ├── osoba.md
│   ├── rola.md
│   ├── workflow.md
│   └── framework.md
│
├── 03_PROJECTS/                ← pamięć projektów
│   └── projekt_001_vantix-os/
│       ├── project.md
│       ├── roadmap.md
│       ├── todo.md
│       ├── decisions.md
│       ├── logs.md
│       ├── memory/
│       └── evo/
│
├── 04_KNOWLEDGE/               ← baza wiedzy
│   ├── architecture/
│   ├── patterns/
│   ├── cheatsheets/
│   └── best_practices/
│
├── 05_SHELL_MODULES/           ← mini-RAGi modułów
│   ├── crm/
│   │   ├── mini_rag.md
│   │   ├── scope.md
│   │   └── logic_links.md
│   ├── dev/
│   ├── cockpit/
│   ├── settings/
│   ├── workflows/
│   └── learning/
│
├── 06_PROMPTS/                 ← biblioteka promptów
│   ├── system/
│   ├── master/
│   └── mini_rag/
│
├── 07_MEMORY/                  ← warstwa pamięci AI
│   ├── master/
│   ├── projects/
│   └── modules/
│
├── 08_EVOLUTION/               ← propozycje zmian AI
│   ├── proposals/
│   ├── approved/
│   └── rejected/
│
├── 09_EVALUATION/              ← ocena jakości RAGów
│   ├── master_eval.md
│   └── [modul]_eval.md
│
└── 10_ARCHIVE/                 ← historia i snapshoty
    ├── snapshots/
    └── old_versions/
```

---

## Zasady architektoniczne (nienaruszalne)

1. **Separacja odpowiedzialności** — Frontend / API / AI / DB nigdy nie mieszają odpowiedzialności
2. **DB jako Source of Truth** — stan systemu definiuje wyłącznie baza danych
3. **System oparty o stany** — każdy proces ma jasny stan: `pending → processing → completed / failed / retrying`
4. **Projektowanie pod awarie** — timeout, retry, fallback, walidacja odpowiedzi AI są częścią architektury
5. **Idempotentność operacji krytycznych** — ponowne wywołanie nie tworzy duplikatów
6. **Output LLM jest nieufny domyślnie** — każdy output AI wymaga walidacji przed użyciem w systemie
7. **Logi wszystkich ważnych akcji** — kto, co, kiedy, rezultat, błąd, correlation ID

---

## Zasady kodowania (nienaruszalne)

- Zero ukrytej magii — kod jest przewidywalny
- Jedna funkcja = jedna odpowiedzialność
- Nigdy nie ufaj zewnętrznym systemom — każde API ma timeout + retry + fallback
- Preferuj prostą logikę zamiast AI — AI tylko do interpretacji, generowania, klasyfikacji
- Każdy request ma correlation ID śledzalny przez cały stack

---

## Stack techniczny

| Warstwa | Technologia |
|---------|------------|
| Frontend | Next.js (App Router), Tailwind CSS |
| Backend | Next.js API Routes / FastAPI (Python) |
| Baza danych | Neon (Postgres serverless) |
| ORM | Prisma |
| Automatyzacje | n8n |
| Deploy | Vercel |
| AI | Claude API (claude-sonnet-4-20250514) |
| Auth | Supabase Auth lub NextAuth |

---

## Konwencje projektu

### Nazewnictwo
- Projekt: `VANTIX001_vantix-os`
- Foldery: `kebab-case`
- Pliki MD: `snake_case.md`
- Pliki Next.js: `PascalCase.tsx`
- Pliki Python: `snake_case.py`

### Commit messages
Format: `[typ]: opis po polsku`
Typy: `feat`, `fix`, `refactor`, `docs`, `chore`

### Zmienne środowiskowe
Zawsze w `.env.local` — nigdy w repo.

---

## Model płatności projektów klientów: 30/30/40

| Faza | % | Trigger |
|------|---|---------|
| Blueprint | 30% | Akceptacja blueprintu przez klienta |
| MVP | 30% | Potwierdzenie działania MVP |
| Delivery | 40% | Finalny odbiór |

---

## Roadmapa Vantix OS

| Faza | Zakres |
|------|--------|
| **Phase 0** | Blueprint, karta projektu, struktura repo, definicje warstw |
| **Phase 1** | Mockup shell, modułów i VANTIXRAG |
| **Phase 2** | MVP: logowanie, DB, mini-RAGi, memory layer, routing |
| **Phase 3** | Beta: poprawki, logi, retrievery, flows |
| **Phase 4** | AI evolution, workflow automation, learning lab, finance, analytics |

---

## Definicja sukcesu systemu

System jest sukcesem gdy:
- Kacper używa go codziennie
- Trzyma porządek operacyjny
- Daje szybki dostęp do projektów i leadów
- Pomaga podejmować decyzje
- Pamięta kontekst między sesjami
- AI proponuje sensowne ulepszenia — nie tylko generuje tekst

---

## Instrukcja dla agenta

### Przed każdą sesją
1. Przeczytaj ten plik
2. Przeczytaj `logs/` z ostatniej sesji
3. Sprawdź `todo.md` — co jest następne
4. Potwierdź z Kacprem co robimy w tej sesji

### Po każdej sesji
1. Zaktualizuj `logs/YYYY-MM-DD_opis.md`
2. Zaktualizuj `todo.md`
3. Zapisz otwarte pytania i blokery
4. Zaproponuj następny krok

### Czego nie rób
- Nie modyfikuj `CLAUDE.md` bez zgody Kacpra
- Nie wdrażaj propozycji evolution bez akceptacji
- Nie nadpisuj krytycznych plików automatycznie
- Nie ignoruj zasad architektonicznych nawet "dla szybkości"