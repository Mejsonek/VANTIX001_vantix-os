# logic_links.md — CRM Powiązania z Innymi Modułami

> Jak CRM łączy się z resztą systemu. Używane przez RAG-matkę przy routingu zapytań między modułami.

---

## CRM → Dev Tool

**Trigger:** Lead przechodzi do etapu "Wygrany"
**Akcja:** Konwersja lead → projekt (jeden przycisk "Utwórz projekt z leada")
**Status:** ❌ Planowane (Phase 2)

Dane przepływające:
- `leads.name` → `projects.client_name`
- `leads.email` → `projects.client_email`
- `leads.value` → `projects.budget`
- `leads.company` → `projects.name` (jako punkt wyjścia)

---

## CRM → Finanse

**Trigger:** Zaliczkowanie 30% po podpisaniu
**Akcja:** Tworzenie wpisu `finance_entries` z `type = 'income'` i powiązaniem `lead_id`
**Status:** ❌ Planowane (Phase 2)

---

## CRM → Cockpit

**Trigger:** Lead wymaga follow-upu
**Akcja:** Tworzenie taska w module Cockpit z terminem i powiązaniem do leada
**Status:** ❌ Planowane (Phase 2)

---

## CRM → Brain / VANTIXRAG

**Kierunek:** Brain może czytać dane CRM (tylko do odczytu)
**Zakres:** Statystyki pipeline, wartość aktywnych leadów, zaległe follow-upy
**Instrukcja:** CRM mini-RAG pyta RAG-matkę o kontekst właściciela gdy potrzebuje dopasować komunikację do sytuacji (np. brak klientów → wyższy priorytet alertów)

---

## CRM → Zewnętrzne

| Integracja | Akcja | Status |
|-----------|-------|--------|
| Formularz na stronie vantix.pl | POST `/api/crm/leads` (CORS + klucz API) | ❌ Planowane |
| Zoho Mail | Wysłanie emaila ze strony leada `/crm/[id]` | ❌ Planowane |
| Telegram | Alert przy nowym leadzie z formularza | ❌ Planowane (Phase 3) |
