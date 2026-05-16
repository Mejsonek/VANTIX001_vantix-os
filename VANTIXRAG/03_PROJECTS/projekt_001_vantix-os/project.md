# project.md — Vantix OS (VANTIX001)

> Karta projektu. Centralny system operacyjny dla pracy Kacpra.

---

## Czym jest

**Vantix OS** — prywatny cockpit Kacpra, nie aplikacja dla klientów. Centrum dowodzenia firmy Vantix: jedno miejsce łączące zarządzanie projektami, CRM, pamięć AI i monitorowanie ekosystemu.

Vantix OS zastępuje: Notion, arkusze kalkulacyjne, luźne notatki i ręczne śledzenie projektów.

### Problem, który rozwiązuje
Solo-founder bez systemu operacyjnego traci czas na:
- Szukanie informacji rozproszonych po narzędziach
- Ręczne aktualizowanie statusów projektów
- Brak historii decyzji i kontekstu po dłuższej przerwie
- Brak widoku pipeline leadów vs aktywnych projektów vs finansów

Wchodząc do systemu Kacper widzi natychmiast:
- co jest najważniejsze dziś
- status projektów i leadów
- rekomendacje AI
- co zrobić dalej

---

## Identyfikacja projektu

| Pole | Wartość |
|------|---------|
| ID | VANTIX001 |
| Nazwa | vantix-os |
| Repo | https://github.com/Mejsonek/Brainofvantix |
| Produkcja | https://vantix-dev-tool.vercel.app |
| Status | Phase 0 — budowanie pamięci systemu |

---

## Stack techniczny

| Warstwa | Technologia |
|---------|------------|
| Frontend | Next.js 14 (App Router), React 18, Tailwind CSS |
| Backend | Next.js API Routes (serverless) |
| Baza danych | Neon (serverless PostgreSQL) |
| ORM | Prisma |
| AI | Anthropic SDK (Claude — claude-sonnet-4-20250514) |
| Hosting | Vercel |
| Automatyzacje | n8n |
| Auth | Supabase Auth lub NextAuth |
| Bot | Telegram (webhook) |

---

## Architektura URL

| Warstwa | URL | Opis |
|---------|-----|------|
| Publiczna | `vantix.pl` | Landing, formularz kontaktowy, prezentacja marki |
| Prywatna | `app.vantix.pl` | Shell, logowanie, launcher modułów |
| Modułowa | — | Moduły robocze (CRM, DEV, Cockpit, itd.) |

---

## Moduły i status

| Moduł | Ścieżka | Status |
|-------|---------|--------|
| **Shell / Launcher** | `/` | Punkt wejścia, nawigacja, szybkie akcje |
| **Dashboard** | `/dashboard` | Częściowy — projekty live, reszta mock |
| **Dev Tool** | `/devtool` | ✅ Produkcja — pełna funkcjonalność |
| **CRM** | `/crm` | ✅ Produkcja — real API, wymaga schema na Neon |
| **Brain / VANTIXRAG** | `/brain` | ✅ GUI gotowe, treść w trakcie wypełniania |
| **Personal Cockpit** | `/cockpit` | Planowany |
| **Finanse** | `/finanse` | Shell — mock data, brak API |
| **Taski** | `/taski` | Shell — mock data, brak API |
| **Kalendarz** | `/kalendarz` | Skeleton |
| **Settings / Integrations** | `/settings` | Planowany |
| **Workflows / Automation Studio** | `/workflows` | Planowany |

---

## VANTIXRAG — Architektura Pamięci AI

```
RAG-MATKA (pełny dostęp do wszystkiego)
│
├── CRM mini-RAG       (scope: leady, lejek, follow-up)
├── DEV mini-RAG       (scope: projekty, logi, decyzje)
├── Cockpit mini-RAG   (scope: taski, kalendarz, priorytety)
├── Settings mini-RAG  (scope: konfiguracja, integracje)
└── Workflows mini-RAG (scope: automatyzacje, flow)
```

Zasada: Mini-RAG widzi tylko swój scope. RAG-matka widzi wszystko i może odesłać odpowiedź lub propozycję zmiany do warstwy evolution.

---

## Automatyzacja rejestracji projektów

Dodanie projektu przez UI automatycznie:
1. Tworzy rekord w tabeli `projects` (Neon)
2. Pojawia się na Dashboardzie
3. Jest dostępny w Dev Tool (karty projektu z 10 zakładkami)

Brak ręcznego konfigurowania — jeden formularz, pełna synchronizacja.

---

## Co jest zrobione (ukończone)

- ✅ Vantix App shell (AppSidebar, AppTopbar, layout)
- ✅ Dashboard `/dashboard`
- ✅ Dev Tool `/devtool` z filtrami
- ✅ CRM `/crm` — Lista + Pipeline + AddLeadModal + API CRUD
- ✅ Brain `/brain` — GUI zarządzania VANTIXRAG (board + tree + project map)
- ✅ CRM `/crm/[id]` — detail page leada z inline edit, stage progress, usuwanie
- ✅ Schema SQL: tabela `leads` + `brain_sections`
- ✅ Vercel deploy
- ✅ VANTIXRAG `00_PROFIL/` — 10 dokumentów profilu foundera
- ✅ VANTIXRAG `02_PROJEKTY/` — standardy, architektura, projekty
- ✅ Logi przeniesione do `VANTIXRAG/02_PROJEKTY/vantix-app/05_logs/`
- ✅ Refactor struktury: izolacja `components/devtool/`

---

## Aktualne blokery (krytyczne)

- ❌ Uruchomić tabelę `leads` na Neon SQL Editor (CRM nie działa bez tego)
- ❌ Uruchomić tabelę `brain_sections` na Neon SQL Editor (statusy Brain nie są persistowane)

Oba skrypty są w `schema.sql` — skopiuj sekcje CRM i Brain do Neon SQL Editor.

---

## Priorytety rozwoju

1. **Wypełnienie Brain/VANTIXRAG** — kluczowe dla działania pamięci AI (aktualnie w toku)
2. **Backend Taski** — tabela `tasks` + API
3. **Backend Finanse** — tabela `finance_entries` + API
4. **Dashboard z prawdziwymi danymi** — po uruchomieniu Taski i Finanse
5. **Lead detail page** `/crm/[id]` — historia kontaktów, timeline
6. **Konwersja lead → projekt** — jeden przycisk, pełna integracja CRM ↔ Dev Tool

---

## Koszty operacyjne projektu

| Pozycja | Koszt/mies. |
|---------|------------|
| Claude Code | ~80 PLN |
| Google Pro | ~90 PLN |
| Vercel | FREE (Personal) |
| Neon | FREE (Free Tier) |
| Domeny | ~200 PLN/rok |
| **Łącznie** | **~200–300 PLN/mies.** |

Break-even point Vantix (narzędzia): **~170 PLN/mies.**
