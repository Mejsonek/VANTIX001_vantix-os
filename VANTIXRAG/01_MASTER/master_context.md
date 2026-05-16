# master_context.md — Aktualny Kontekst Systemu

> Snapshot bieżącego stanu operacyjnego. Aktualizowany co sesję — to "gdzie jesteśmy teraz".

---

## Kontekst — 2026-05-16

### Gdzie jesteśmy

**Faza projektu:** Phase 0 — Blueprint i budowa pamięci
**Sprint:** Inicjalizacja VANTIXRAG — wypełnienie rdzenia pamięci systemu
**Następna faza:** Phase 1 — Mockupy modułów

### Co się właśnie wydarzyło
- Stworzono strukturę repo `VANTIX001_vantix-os`
- Wypełniono rdzeń pamięci VANTIXRAG z dokumentów starego RAAG (Google Drive)
- System ma teraz pełną wiedzę o właścicielu, celach, workflow, projekcie i zasadach

### Co jest następne (kolejna sesja)
1. Odblokować blokery Neon SQL (`leads`, `brain_sections`)
2. Wypełnić pozostałe pliki Phase 0 (rola, framework, decisions, architektura)
3. Przejść do Phase 1 — mockupy modułów

---

## Kontekst operacyjny Vantixa

### Sytuacja biznesowa (2026-05-16)
- **Cashflow:** napięty — brak poduszki finansowej, aktywny dług 7 500 PLN
- **Klienci:** brak aktywnych klientów projektowych, przed fazą outreachu
- **Rynek:** Mielec / Podkarpacie, skupienie na agencjach marketingowych i e-commerce
- **Pricing:** od 1 000 PLN (minimum), Blueprint 2 000 PLN, MVP od 9 500 PLN

### Priorytety operacyjne (dziś)
1. Stabilizacja cashflow — pozyskanie pierwszych klientów
2. Wypełnienie Brain/VANTIXRAG (w toku)
3. Nauka angielskiego — codziennie

### Stan modułów aplikacji
| Moduł | Stan | Bloker |
|-------|------|--------|
| Dev Tool | ✅ Produkcja | — |
| CRM | ⚠️ Produkcja (zablokowany) | Brak tabel Neon |
| Brain GUI | ⚠️ GUI gotowe | Treść VANTIXRAG w toku |
| Dashboard | 🔄 Częściowy | Brak backendu Taski/Finanse |
| Taski | 🔲 Shell | Brak API |
| Finanse | 🔲 Shell | Brak API |
| Kalendarz | 🔲 Skeleton | — |

---

## Kontekst dla RAG-matki

### Jak odpowiadać na pytania Kacpra

**Pytania o projekty** → zajrzyj do `03_PROJECTS/`
**Pytania o priorytety** → sprawdź `master_goals.md` + `todo.md`
**Pytania o zasady** → `master_rules.md`
**Pytania o workflow** → `02_PROFILE/workflow.md`
**Pytania o klientów / sprzedaż** → `05_SHELL_MODULES/crm/`

### Filtr decyzyjny
Przed każdą rekomendacją zadaj sobie pytanie:
> **Czy to zbliża Kacpra do 80k PLN/rok i do 75k PLN poduszki finansowej?**

Jeśli nie — rekomenduj odłożenie lub odrzucenie.

### Kontekst finansowy przy rekomendacjach
- Koszty stałe: ~200–300 PLN/mies.
- Próg "zero stresu": >3 500 PLN/mies.
- Próg "spokój": 15 000–20 000 PLN/mies.
- Nie rekomenduj projektów <1 000 PLN — nie warte kosztów operacyjnych

---

## Aktualne pytania otwarte

1. Czy stary RAAG zawierał jeszcze dokumenty których nie wyciągnięto?
2. Jaki jest dokładny schemat DB (schema.sql) — wymaga przeglądu przed Phase 2
3. Kiedy Kacper planuje rozpocząć aktywny outreach na rynek lokalny?
