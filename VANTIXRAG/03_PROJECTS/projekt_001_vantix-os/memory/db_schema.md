# db_schema.md — Plan Tabel Bazy Danych

> Kompletna lista tabel potrzebnych dla systemu Vantix OS.
> Status: plan — tabele do stworzenia w Neon SQL Editor.

---

## Status tabel

| Tabela | Moduł | Status |
|--------|-------|--------|
| `users` | Auth | ⬜ Do stworzenia |
| `sessions` | Auth | ⬜ Do stworzenia |
| `leads` | CRM | 🔴 Bloker — pilne |
| `lead_activity` | CRM | ⬜ Do stworzenia |
| `lead_notes` | CRM | ⬜ Do stworzenia |
| `projects` | DEV | ⬜ Do stworzenia |
| `project_todos` | DEV | ⬜ Do stworzenia |
| `project_logs` | DEV | ⬜ Do stworzenia |
| `project_decisions` | DEV | ⬜ Do stworzenia |
| `tasks` | Cockpit | ⬜ Do stworzenia |
| `notes` | Cockpit | ⬜ Do stworzenia |
| `finance_entries` | Finanse | ⬜ Do stworzenia |
| `brain_sections` | Brain | 🔴 Bloker — pilne |
| `brain_memory` | Brain | ⬜ Do stworzenia |
| `integrations` | Settings | ⬜ Do stworzenia |
| `workflow_logs` | Workflows | ⬜ Do stworzenia |

---

## 🔴 Pilne — blokery (uruchomić pierwsze)

### `leads`
```sql
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  company VARCHAR(255),
  email VARCHAR(255),
  phone VARCHAR(50),
  source VARCHAR(100),         -- reddit, facebook, referral, cold, inne
  stage VARCHAR(100) NOT NULL DEFAULT 'new',
                               -- new | qualification | discovery | offer | negotiation | won | lost
  value NUMERIC(10,2),         -- wartość szacowana w PLN
  notes TEXT,
  tags TEXT[],
  assigned_to UUID,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### `brain_sections`
```sql
CREATE TABLE brain_sections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_key VARCHAR(255) UNIQUE NOT NULL,  -- np. "master_rules", "osoba", "workflow"
  title VARCHAR(255) NOT NULL,
  content TEXT,
  category VARCHAR(100),       -- master | profile | project | knowledge | module
  status VARCHAR(50) DEFAULT 'draft',        -- draft | active | archived
  last_synced_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## Auth

### `users`
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  avatar_url TEXT,
  role VARCHAR(50) DEFAULT 'owner',          -- owner | admin | viewer
  created_at TIMESTAMPTZ DEFAULT NOW(),
  last_login_at TIMESTAMPTZ
);
```

### `sessions`
```sql
CREATE TABLE sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token VARCHAR(500) UNIQUE NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## CRM

### `lead_activity`
```sql
CREATE TABLE lead_activity (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  type VARCHAR(100) NOT NULL,  -- call | email | meeting | note | stage_change | follow_up
  description TEXT,
  old_value VARCHAR(255),      -- np. stary stage
  new_value VARCHAR(255),      -- np. nowy stage
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### `lead_notes`
```sql
CREATE TABLE lead_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## DEV Tool

### `projects`
```sql
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code VARCHAR(50) UNIQUE NOT NULL,          -- np. VANTIX001
  name VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(100) DEFAULT 'active',      -- active | paused | completed | archived
  phase VARCHAR(50),                          -- phase_0 | phase_1 | phase_2 | phase_3 | phase_4
  client_name VARCHAR(255),
  client_email VARCHAR(255),
  budget NUMERIC(10,2),
  paid NUMERIC(10,2) DEFAULT 0,
  repo_url TEXT,
  deploy_url TEXT,
  stack TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### `project_todos`
```sql
CREATE TABLE project_todos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  status VARCHAR(50) DEFAULT 'todo',         -- todo | in_progress | done | blocked
  priority VARCHAR(50) DEFAULT 'medium',     -- critical | high | medium | low
  phase VARCHAR(50),
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### `project_logs`
```sql
CREATE TABLE project_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  session_date DATE NOT NULL,
  title VARCHAR(255),
  what_was_done TEXT,
  where_stopped TEXT,
  next_step TEXT,
  blockers TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### `project_decisions`
```sql
CREATE TABLE project_decisions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  code VARCHAR(20),                           -- np. DEC-001
  title VARCHAR(255) NOT NULL,
  decision TEXT NOT NULL,
  rationale TEXT,
  alternatives TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## Cockpit

### `tasks`
```sql
CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  status VARCHAR(50) DEFAULT 'todo',         -- todo | in_progress | done | cancelled
  priority VARCHAR(50) DEFAULT 'medium',     -- critical | high | medium | low
  project_id UUID REFERENCES projects(id),   -- opcjonalne powiązanie z projektem
  due_date DATE,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### `notes`
```sql
CREATE TABLE notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255),
  content TEXT NOT NULL,
  tags TEXT[],
  project_id UUID REFERENCES projects(id),   -- opcjonalne
  pinned BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## Finanse

### `finance_entries`
```sql
CREATE TABLE finance_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type VARCHAR(20) NOT NULL,                 -- income | expense
  amount NUMERIC(10,2) NOT NULL,
  currency VARCHAR(10) DEFAULT 'PLN',
  category VARCHAR(100),                     -- projekt | narzędzie | inne
  description TEXT,
  project_id UUID REFERENCES projects(id),   -- opcjonalne — z jakiego projektu
  lead_id UUID REFERENCES leads(id),         -- opcjonalne — z jakiego leada
  invoice_number VARCHAR(100),
  date DATE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## Brain / VANTIXRAG

### `brain_memory`
```sql
CREATE TABLE brain_memory (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  scope VARCHAR(100) NOT NULL,               -- master | crm | dev | cockpit | settings | workflows
  key VARCHAR(255) NOT NULL,
  value TEXT,
  session_date DATE,
  expires_at TIMESTAMPTZ,                    -- null = pamięć trwała
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (scope, key)
);
```

---

## Settings / Integrations

### `integrations`
```sql
CREATE TABLE integrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) UNIQUE NOT NULL,         -- telegram | n8n | anthropic | neon
  status VARCHAR(50) DEFAULT 'inactive',     -- active | inactive | error
  config JSONB,                              -- konfiguracja bez sekretów
  last_ping_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## Workflows

### `workflow_logs`
```sql
CREATE TABLE workflow_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workflow_name VARCHAR(255) NOT NULL,
  trigger_type VARCHAR(100),                 -- webhook | schedule | manual
  status VARCHAR(50) NOT NULL,               -- success | failed | retrying
  payload JSONB,
  result JSONB,
  error TEXT,
  duration_ms INTEGER,
  correlation_id UUID DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## Kolejność tworzenia tabel

Ze względu na klucze obce — twórz w tej kolejności:

```
1. users
2. sessions
3. leads
4. projects
5. lead_activity
6. lead_notes
7. project_todos
8. project_logs
9. project_decisions
10. tasks
11. notes
12. finance_entries
13. brain_sections
14. brain_memory
15. integrations
16. workflow_logs
```

---

## Indeksy (wydajność)

```sql
-- CRM
CREATE INDEX idx_leads_stage ON leads(stage);
CREATE INDEX idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX idx_lead_activity_lead_id ON lead_activity(lead_id);

-- DEV
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_project_todos_project_id ON project_todos(project_id);
CREATE INDEX idx_project_logs_project_id ON project_logs(project_id);

-- Cockpit
CREATE INDEX idx_tasks_status ON tasks(status);
CREATE INDEX idx_tasks_due_date ON tasks(due_date);

-- Finanse
CREATE INDEX idx_finance_entries_date ON finance_entries(date DESC);
CREATE INDEX idx_finance_entries_type ON finance_entries(type);

-- Brain
CREATE INDEX idx_brain_sections_category ON brain_sections(category);
CREATE INDEX idx_brain_memory_scope ON brain_memory(scope);

-- Workflows
CREATE INDEX idx_workflow_logs_status ON workflow_logs(status);
CREATE INDEX idx_workflow_logs_created_at ON workflow_logs(created_at DESC);
```
