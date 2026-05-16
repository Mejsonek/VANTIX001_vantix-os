# master_memory.md — Pamięć Operacyjna RAG-matki

> Bieżący stan pamięci systemu. Aktualizowany po każdej sesji przez agenta. Nie modyfikować ręcznie — aktualizuje agent.

---

## Stan systemu — 2026-05-16

### Faza projektu
**Phase 0** — w toku. Budowanie pamięci i kontekstu systemu.

### Co RAG-matka już wie

**O właścicielu:**
- Kacper Zdżałka, Mielec / Podkarpacie
- Founder Vantix, rola: Architekt (nie pisze kodu)
- 2–4h dziennie głębokiej pracy, model 1-2-1 (klient 1h, dev 2h, nauka 1h)
- Brak poduszki finansowej, dług 7 500 PLN, presja cashflow
- Cel 2026: 80k–250k PLN przychodu, 75k PLN poduszka, prawo jazdy, auto
- Motywacja: niezależność finansowa i zawodowa przez własne umiejętności

**O systemie:**
- Vantix OS = centrum sterowania firmy, nie aplikacja dla klientów
- Stack: Next.js / Tailwind / Neon / Vercel / n8n / Claude API
- Produkcja live: https://vantix-dev-tool.vercel.app
- Repo: https://github.com/Mejsonek/Brainofvantix

**O aktualnym stanie aplikacji:**
- Dev Tool ✅ produkcja
- CRM ✅ produkcja (blokowany przez brak tabel Neon)
- Brain GUI ✅ gotowe, treść w trakcie wypełniania
- Dashboard, Taski, Finanse, Kalendarz — shell / mock

### Otwarte blokery (wymagają działania Kacpra)
1. **Neon SQL:** uruchomić tabelę `leads` (CRM nie działa)
2. **Neon SQL:** uruchomić tabelę `brain_sections` (Brain statusy nie persistowane)

### Ostatnia sesja
**2026-05-16** — inicjalizacja systemu, wypełnienie rdzenia pamięci VANTIXRAG z dokumentów starego RAAG (Google Drive).

---

## Indeks wypełnionych plików VANTIXRAG

| Plik | Status | Data |
|------|--------|------|
| `01_MASTER/master_rules.md` | ✅ | 2026-05-16 |
| `01_MASTER/master_goals.md` | ✅ | 2026-05-16 |
| `01_MASTER/master_memory.md` | ✅ | 2026-05-16 |
| `01_MASTER/master_context.md` | ✅ | 2026-05-16 |
| `01_MASTER/evolution_policy.md` | ✅ | 2026-05-16 |
| `02_PROFILE/osoba.md` | ✅ | 2026-05-16 |
| `02_PROFILE/workflow.md` | ✅ | 2026-05-16 |
| `02_PROFILE/rola.md` | ✅ | 2026-05-16 |
| `02_PROFILE/framework.md` | ✅ | 2026-05-16 |
| `03_PROJECTS/projekt_001_vantix-os/project.md` | ✅ | 2026-05-16 |
| `03_PROJECTS/projekt_001_vantix-os/roadmap.md` | ✅ | 2026-05-16 |
| `03_PROJECTS/projekt_001_vantix-os/todo.md` | ✅ | 2026-05-16 |
| `03_PROJECTS/projekt_001_vantix-os/logs.md` | ✅ | 2026-05-16 |
| `03_PROJECTS/projekt_001_vantix-os/decisions.md` | ✅ | 2026-05-16 |
| `05_SHELL_MODULES/crm/` (scope, mini_rag, logic_links) | 🔄 Struktura istnieje, treść do weryfikacji | — |
| `05_SHELL_MODULES/dev/` | 🔄 j.w. | — |
| `05_SHELL_MODULES/cockpit/` | 🔄 j.w. | — |

---

## Instrukcja aktualizacji

Po każdej sesji agent aktualizuje:
1. Sekcję "Stan systemu" — co nowego, jaka faza
2. "Otwarte blokery" — co blokuje, co zostało odblokowane
3. "Ostatnia sesja" — data i krótki opis
4. Indeks plików — nowe pliki lub zmiany statusu
