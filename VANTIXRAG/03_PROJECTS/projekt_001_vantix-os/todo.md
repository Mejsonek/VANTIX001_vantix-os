# todo.md — Lista Zadań VANTIX001

> Aktualizuj po każdej sesji. To jest żywy dokument — nie archiwum.
> Ostatnia aktualizacja: 2026-05-17 (sesja 6)

---

## 🔴 KRYTYCZNE (blokery — zrobić pierwsze)

- [x] Uruchomić tabelę `leads` na Neon SQL Editor ✅ 2026-05-16
- [x] Uruchomić tabelę `brain_sections` na Neon SQL Editor ✅ 2026-05-16

> Skrypty są w `schema.sql` — skopiuj sekcje CRM i Brain do Neon SQL Editor.

---

## 🟡 PHASE 0 — Dokończenie pamięci VANTIXRAG

- [x] `01_MASTER/master_rules.md` — zasady nienaruszalne
- [x] `01_MASTER/master_goals.md` — cele właściciela i systemu
- [x] `01_MASTER/master_memory.md` — pamięć sesji RAG-matki
- [x] `01_MASTER/master_context.md` — aktualny kontekst systemu
- [x] `01_MASTER/evolution_policy.md` — zasady propozycji zmian
- [x] `02_PROFILE/osoba.md` — profil właściciela
- [x] `02_PROFILE/workflow.md` — styl pracy i workflow
- [x] `02_PROFILE/rola.md` — szczegółowy opis roli Kacpra i agenta
- [x] `02_PROFILE/framework.md` — framework decyzyjny
- [x] `03_PROJECTS/projekt_001_vantix-os/project.md` — karta projektu
- [x] `03_PROJECTS/projekt_001_vantix-os/roadmap.md` — roadmapa
- [x] `03_PROJECTS/projekt_001_vantix-os/todo.md` — ten plik
- [x] `03_PROJECTS/projekt_001_vantix-os/logs.md` — log sesji
- [x] `03_PROJECTS/projekt_001_vantix-os/decisions.md` — log decyzji technicznych
- [x] `memory/architektura.md` — decyzje techniczne i diagram systemu
- [x] `memory/uruchomienie_lokalne.md` — instrukcja uruchomienia lokalnego
- [x] `05_SHELL_MODULES/crm/` — scope, mini_rag, logic_links wypełnione

---

## 🟡 PHASE 1 — Mockupy modułów

- [x] Nowe repo `vantix-app` — Next.js 16 + Tailwind + lucide-react ✅ 2026-05-16
- [x] Mockup Shell / Launcher (`app.vantix.pl` — punkt wejścia) ✅ 2026-05-16
- [x] Landing page `vantix.pl` — publiczna strona marki (formularz kontaktowy, prezentacja) ✅ 2026-05-17
- [x] Mockup Personal Cockpit (taski, kalendarz, priorytety, rekomendacje AI) ✅ 2026-05-17
- [ ] Mockup CRM (lejek, leady, follow-up, routing)
- [ ] Mockup Vantix DEV (projekty, roadmapa, TODO, logi, pamięć projektu)
- [ ] Mockup Brain / VANTIXRAG GUI
- [ ] Mockup Settings / Integrations
- [ ] Mockup Workflows / Automation Studio

---

## 🟠 PHASE 2 — MVP (Backend i integracje)

**CRM**
- [ ] `/crm/[id]` — activity timeline (tabela `lead_activity` + komponent)
- [ ] Konwersja lead → projekt (przycisk "Utwórz projekt z leada")
- [ ] Formularz ze strony zewnętrznej → POST `/api/crm/leads` (CORS + klucz API)

**Moduły**
- [ ] Backend Taski — tabela `tasks` + `/api/taski/*` + podpięcie UI
- [ ] Backend Finanse — tabela `finance_entries` + `/api/finanse/*` + podpięcie UI
- [ ] Dashboard z prawdziwymi danymi (po uruchomieniu Taski + Finanse)

**Autentykacja**
- [ ] Logowanie (Supabase Auth lub NextAuth)
- [ ] Ochrona ścieżek prywatnych

**Mini-RAGi**
- [ ] CRM mini-RAG — scope: leady, lejek, follow-up
- [ ] DEV mini-RAG — scope: projekty, logi, decyzje
- [ ] Cockpit mini-RAG — scope: taski, kalendarz, priorytety
- [ ] Routing RAG-matka ↔ mini-RAGi

---

## 🔵 PHASE 3 — Beta i stabilizacja

- [ ] System logów i retrieverów VANTIXRAG
- [ ] n8n flows — automatyzacje (follow-up, alerty Telegram)
- [ ] Telegram bot — alerty przy nowym leadzie / zmianie etapu
- [ ] Rate limiting, walidacja, edge cases
- [ ] Monitoring i alerty systemowe

---

## ⚪ PHASE 4 — Przyszłość

- [ ] AI evolution proposals — warstwa `08_EVOLUTION/`
- [ ] Globalne wyszukiwanie ⌘K
- [ ] Vector DB + embeddingi (Brain Phase 4)
- [ ] `/brain/sources` — zarządzanie źródłami ingestion
- [ ] Export CRM do CSV
- [ ] Client portal `/client/[token]`
- [ ] Multi-user / autentykacja wielopoziomowa
- [ ] Workflow automation studio

---

## ✅ UKOŃCZONE

- [x] CLAUDE.md — główny plik kontekstu systemu
- [x] Struktura repo VANTIXRAG (foldery 00–10)
- [x] Vantix App shell (AppSidebar, AppTopbar, layout)
- [x] Dashboard `/dashboard`
- [x] Dev Tool `/devtool` z filtrami
- [x] CRM `/crm` — Lista + Pipeline + AddLeadModal + API CRUD
- [x] CRM `/crm/[id]` — detail page z inline edit, stage progress, usuwanie
- [x] Brain `/brain` — GUI zarządzania VANTIXRAG
- [x] Schema SQL: tabela `leads` + `brain_sections`
- [x] Vercel deploy: https://vantix-dev-tool.vercel.app
- [x] Refactor `components/devtool/` (ProjectCard, LaunchModal, 10 tabs)
- [x] Shell redesign wg Vantix Design System (Cosmic Minimalism) ✅ 2026-05-16
- [x] Personal Cockpit mockup — TodayTasks, WeekCalendar, PriorityList, AIRecommendations ✅ 2026-05-17
- [x] Landing page vantix.pl — Navbar, Hero, Features, Contact, ContactForm, Footer ✅ 2026-05-17
- [x] Vercel config — routing domen (vantix.pl + app.vantix.pl) ✅ 2026-05-17
