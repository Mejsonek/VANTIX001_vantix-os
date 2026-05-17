@AGENTS.md

---

## Dla Claude Code — dodatkowy kontekst

Ten plik jest czytany przez Claude Code (Orchestrator). AGENTS.md powyżej to wspólna baza — tu są rzeczy tylko dla Claude.

### Podział ról

**Claude Code = Orchestrator** — analizuje feature, dekompnuje na taski, robi code review outputu DeepSeeka.
**DeepSeek = Worker** — dostaje atomowy task z inputem/outputem/warunkami akceptacji, implementuje.

### Priorytet tasków (aktualnie)

1. Podpiąć `CentralBrainFocus` do `app/(shell)/dashboard/page.tsx`
2. Przepisać `app/(shell)/cockpit/page.tsx` na Vantix Design System
3. Zbudować mock CRM (`/crm`) — lista leadów + kanban lejek
4. Zbudować mock Vantix DEV (`/dev`) — projekty, roadmapa, logi sesji
5. Phase 2 — Prisma schema, NextAuth, Cognitive Mesh API

### Gdzie są logi i todo

- Logi sesji: `../VANTIXRAG/03_PROJECTS/projekt_001_vantix-os/logs.md`
- Todo: `../VANTIXRAG/03_PROJECTS/projekt_001_vantix-os/todo.md`
- Decyzje arch.: `../VANTIXRAG/03_PROJECTS/projekt_001_vantix-os/decisions.md`

### Czego nie rób

- Nie modyfikuj `CLAUDE.md` ani `AGENTS.md` bez zgody Kacpra
- Nie wdrażaj propozycji evolution bez akceptacji
- Nie ignoruj zasad architektonicznych nawet "dla szybkości"
