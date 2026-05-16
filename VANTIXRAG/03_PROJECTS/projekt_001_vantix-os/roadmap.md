# roadmap.md — Roadmapa Vantix OS

> Plan rozwoju systemu. Aktualizowany po każdej fazie.

---

## Fazy Systemu

| Faza | Zakres | Status |
|------|--------|--------|
| **Phase 0** | Blueprint, karta projektu, struktura repo, definicje warstw, wypełnienie pamięci VANTIXRAG | 🔄 W toku |
| **Phase 1** | Mockup shell, modułów i VANTIXRAG | ⬜ Następna |
| **Phase 2** | MVP: logowanie, DB, mini-RAGi, memory layer, routing | ⬜ Planowana |
| **Phase 3** | Beta: poprawki, logi, retrievery, flows | ⬜ Planowana |
| **Phase 4** | AI evolution, workflow automation, learning lab, finance, analytics | ⬜ Przyszłość |

---

## Phase 0 — Aktualny Sprint

### Cel fazy
Wypełnienie pamięci systemu — kompletny kontekst dla RAG-matki i mini-RAGów.

### Status zadań Phase 0

**VANTIXRAG — rdzeń pamięci**
- [x] `01_MASTER/master_rules.md` — zasady nienaruszalne
- [x] `01_MASTER/master_goals.md` — cele właściciela i systemu
- [x] `02_PROFILE/osoba.md` — profil właściciela
- [x] `02_PROFILE/workflow.md` — styl pracy i workflow
- [x] `03_PROJECTS/projekt_001_vantix-os/project.md` — karta projektu
- [x] `03_PROJECTS/projekt_001_vantix-os/roadmap.md` — ten plik

**Struktury do wypełnienia**
- [ ] `01_MASTER/master_memory.md` — pamięć sesji RAG-matki
- [ ] `01_MASTER/master_context.md` — aktualny kontekst systemu
- [ ] `02_PROFILE/rola.md` — szczegółowy opis roli
- [ ] `02_PROFILE/framework.md` — framework decyzyjny
- [ ] `03_PROJECTS/projekt_001_vantix-os/todo.md` — lista zadań projektu
- [ ] `03_PROJECTS/projekt_001_vantix-os/decisions.md` — log decyzji
- [ ] `vantix-app/01_architektura/` — diagram systemu
- [ ] `vantix-app/02_realizacja/` — instrukcja uruchomienia lokalnego
- [ ] `crm/03_decisions/` — decyzje techniczne CRM

**Infrastruktura DB (krytyczne blokery)**
- [ ] Uruchomić tabelę `leads` na Neon SQL Editor
- [ ] Uruchomić tabelę `brain_sections` na Neon SQL Editor

---

## Phase 1 — Mockup (Następna)

### Cel fazy
Stworzenie interaktywnych mockupów wszystkich modułów — zdefiniowanie UX i przepływów przed budową MVP.

### Zakres
- [ ] Mockup Shell / Launcher (`app.vantix.pl`)
- [ ] Mockup Personal Cockpit (taski, kalendarz, priorytety, rekomendacje AI)
- [ ] Mockup CRM (lejek, leady, follow-up)
- [ ] Mockup Vantix DEV (projekty, roadmapa, TODO, logi)
- [ ] Mockup Brain / VANTIXRAG GUI
- [ ] Mockup Settings / Integrations
- [ ] Mockup Workflows / Automation Studio

---

## Phase 2 — MVP (Planowana)

### Cel fazy
Działający system z realną bazą danych, autentykacją i podstawowymi mini-RAGami.

### Zakres
- [ ] Autentykacja (Supabase Auth lub NextAuth)
- [ ] Neon DB — pełna schema produkcyjna
- [ ] Mini-RAGi wszystkich modułów (CRM, DEV, Cockpit, Settings, Workflows)
- [ ] Memory layer — persistowanie kontekstu sesji
- [ ] Routing RAG-matka ↔ mini-RAGi
- [ ] Personal Cockpit — backend Taski + Finanse
- [ ] Dashboard z prawdziwymi danymi
- [ ] CRM `/crm/[id]` — activity timeline, konwersja lead → projekt

---

## Phase 3 — Beta (Planowana)

### Cel fazy
Stabilizacja, logi, retrievery, flows, poprawki z Beta.

### Zakres
- [ ] System logów i retrieverów VANTIXRAG
- [ ] n8n flows — automatyzacje (follow-up, alerty, powiadomienia)
- [ ] Telegram bot — alerty przy nowym leadzie / zmianie etapu
- [ ] Poprawki UX po pierwszym miesiącu użytkowania
- [ ] Rate limiting, walidacja, edge cases
- [ ] Monitoring i alerty systemowe

---

## Phase 4 — AI Evolution (Przyszłość)

### Zakres
- [ ] AI evolution proposals — warstwa `08_EVOLUTION/`
- [ ] Workflow automation studio
- [ ] Learning lab
- [ ] Finance analytics z AI rekomendacjami
- [ ] Globalne wyszukiwanie ⌘K
- [ ] Vector DB + embeddingi (Brain Phase 4)
- [ ] `/brain/sources` — zarządzanie źródłami ingestion
- [ ] Export CRM do CSV
- [ ] Client portal `/client/[token]`
- [ ] Multi-user / autentykacja wielopoziomowa

---

## Definicja sukcesu każdej fazy

### Phase 0 done gdy:
- Wszystkie pliki VANTIXRAG rdzenia są wypełnione kompletnym kontekstem
- RAG-matka może odpowiadać na pytania o system, właściciela i projekty
- Blokery DB są usunięte

### Phase 1 done gdy:
- Interaktywny mockup HTML dla każdego modułu
- Kacper zaakceptował UX i przepływy

### Phase 2 done gdy:
- Kacper loguje się i używa systemu codziennie
- CRM, Taski i Finanse działają z realną bazą
- Mini-RAGi odpowiadają w swoich zakresach

### System done (long-term) gdy:
- Kacper używa go codziennie
- Trzyma porządek operacyjny
- Daje szybki dostęp do projektów i leadów
- Pomaga podejmować decyzje
- Pamięta kontekst między sesjami
- AI proponuje sensowne ulepszenia — nie tylko generuje tekst

---

## Oś czasu (szacunkowa)

| Faza | Szacowany czas |
|------|---------------|
| Phase 0 | 1–2 sesje |
| Phase 1 | 2–3 sesje |
| Phase 2 | 4–6 sesji (MVP) |
| Phase 3 | 2–4 sesje (Beta stabilizacja) |
| Phase 4 | Ciągły rozwój |
