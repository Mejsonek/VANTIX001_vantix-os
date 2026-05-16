-- ============================================================
-- schema.sql — Vantix OS (VANTIX001)
-- Baza: Neon Postgres (eu-central-1)
-- Kolejność: zgodna z kluczami obcymi
-- ============================================================

-- Rozszerzenia
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================
-- 1. AUTH
-- ============================================================

CREATE TABLE IF NOT EXISTS users (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email         VARCHAR(255) UNIQUE NOT NULL,
  name          VARCHAR(255),
  avatar_url    TEXT,
  role          VARCHAR(50) NOT NULL DEFAULT 'owner', -- owner | admin | viewer
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_login_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS sessions (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token      VARCHAR(500) UNIQUE NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- 2. CRM
-- ============================================================

CREATE TABLE IF NOT EXISTS leads (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        VARCHAR(255) NOT NULL,
  company     VARCHAR(255),
  email       VARCHAR(255),
  phone       VARCHAR(50),
  source      VARCHAR(100),
  -- Etapy: new | qualification | discovery | offer | negotiation | won | lost
  stage       VARCHAR(100) NOT NULL DEFAULT 'new',
  value       NUMERIC(10,2),
  notes       TEXT,
  tags        TEXT[],
  assigned_to UUID REFERENCES users(id),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS lead_activity (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id     UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  -- Typy: call | email | meeting | note | stage_change | follow_up
  type        VARCHAR(100) NOT NULL,
  description TEXT,
  old_value   VARCHAR(255),
  new_value   VARCHAR(255),
  created_by  UUID REFERENCES users(id),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS lead_notes (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id    UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  content    TEXT NOT NULL,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- 3. DEV TOOL
-- ============================================================

CREATE TABLE IF NOT EXISTS projects (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code         VARCHAR(50) UNIQUE NOT NULL, -- np. VANTIX001
  name         VARCHAR(255) NOT NULL,
  description  TEXT,
  -- Statusy: active | paused | completed | archived
  status       VARCHAR(100) NOT NULL DEFAULT 'active',
  -- Fazy: phase_0 | phase_1 | phase_2 | phase_3 | phase_4
  phase        VARCHAR(50),
  client_name  VARCHAR(255),
  client_email VARCHAR(255),
  budget       NUMERIC(10,2),
  paid         NUMERIC(10,2) NOT NULL DEFAULT 0,
  repo_url     TEXT,
  deploy_url   TEXT,
  stack        TEXT[],
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS project_todos (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id   UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  title        TEXT NOT NULL,
  description  TEXT,
  -- Statusy: todo | in_progress | done | blocked
  status       VARCHAR(50) NOT NULL DEFAULT 'todo',
  -- Priorytety: critical | high | medium | low
  priority     VARCHAR(50) NOT NULL DEFAULT 'medium',
  phase        VARCHAR(50),
  completed_at TIMESTAMPTZ,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS project_logs (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id    UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  session_date  DATE NOT NULL,
  title         VARCHAR(255),
  what_was_done TEXT,
  where_stopped TEXT,
  next_step     TEXT,
  blockers      TEXT,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS project_decisions (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id  UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  code        VARCHAR(20),  -- np. DEC-001
  title       VARCHAR(255) NOT NULL,
  decision    TEXT NOT NULL,
  rationale   TEXT,
  alternatives TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- 4. COCKPIT
-- ============================================================

CREATE TABLE IF NOT EXISTS tasks (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title        TEXT NOT NULL,
  description  TEXT,
  -- Statusy: todo | in_progress | done | cancelled
  status       VARCHAR(50) NOT NULL DEFAULT 'todo',
  -- Priorytety: critical | high | medium | low
  priority     VARCHAR(50) NOT NULL DEFAULT 'medium',
  project_id   UUID REFERENCES projects(id) ON DELETE SET NULL,
  due_date     DATE,
  completed_at TIMESTAMPTZ,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS notes (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title      VARCHAR(255),
  content    TEXT NOT NULL,
  tags       TEXT[],
  project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
  pinned     BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- 5. FINANSE
-- ============================================================

CREATE TABLE IF NOT EXISTS finance_entries (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  -- Typy: income | expense
  type           VARCHAR(20) NOT NULL,
  amount         NUMERIC(10,2) NOT NULL,
  currency       VARCHAR(10) NOT NULL DEFAULT 'PLN',
  -- Kategorie: projekt | narzędzie | infrastruktura | inne
  category       VARCHAR(100),
  description    TEXT,
  project_id     UUID REFERENCES projects(id) ON DELETE SET NULL,
  lead_id        UUID REFERENCES leads(id) ON DELETE SET NULL,
  invoice_number VARCHAR(100),
  date           DATE NOT NULL,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- 6. BRAIN / VANTIXRAG
-- ============================================================

CREATE TABLE IF NOT EXISTS brain_sections (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_key    VARCHAR(255) UNIQUE NOT NULL,
  title          VARCHAR(255) NOT NULL,
  content        TEXT,
  -- Kategorie: master | profile | project | knowledge | module
  category       VARCHAR(100),
  -- Statusy: draft | active | archived
  status         VARCHAR(50) NOT NULL DEFAULT 'draft',
  last_synced_at TIMESTAMPTZ,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS brain_memory (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  -- Scope: master | crm | dev | cockpit | settings | workflows
  scope        VARCHAR(100) NOT NULL,
  key          VARCHAR(255) NOT NULL,
  value        TEXT,
  session_date DATE,
  expires_at   TIMESTAMPTZ, -- NULL = pamięć trwała
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (scope, key)
);

-- ============================================================
-- 7. SETTINGS / INTEGRATIONS
-- ============================================================

CREATE TABLE IF NOT EXISTS integrations (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        VARCHAR(100) UNIQUE NOT NULL, -- telegram | n8n | anthropic | neon
  -- Statusy: active | inactive | error
  status      VARCHAR(50) NOT NULL DEFAULT 'inactive',
  config      JSONB,
  last_ping_at TIMESTAMPTZ,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- 8. WORKFLOWS
-- ============================================================

CREATE TABLE IF NOT EXISTS workflow_logs (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workflow_name  VARCHAR(255) NOT NULL,
  -- Trigger: webhook | schedule | manual
  trigger_type   VARCHAR(100),
  -- Statusy: success | failed | retrying
  status         VARCHAR(50) NOT NULL,
  payload        JSONB,
  result         JSONB,
  error          TEXT,
  duration_ms    INTEGER,
  correlation_id UUID NOT NULL DEFAULT gen_random_uuid(),
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- INDEKSY
-- ============================================================

-- Auth
CREATE INDEX IF NOT EXISTS idx_sessions_user_id    ON sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_token       ON sessions(token);

-- CRM
CREATE INDEX IF NOT EXISTS idx_leads_stage          ON leads(stage);
CREATE INDEX IF NOT EXISTS idx_leads_created_at     ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_lead_activity_lead   ON lead_activity(lead_id);
CREATE INDEX IF NOT EXISTS idx_lead_notes_lead      ON lead_notes(lead_id);

-- DEV
CREATE INDEX IF NOT EXISTS idx_projects_status      ON projects(status);
CREATE INDEX IF NOT EXISTS idx_project_todos_proj   ON project_todos(project_id);
CREATE INDEX IF NOT EXISTS idx_project_todos_status ON project_todos(status);
CREATE INDEX IF NOT EXISTS idx_project_logs_proj    ON project_logs(project_id);
CREATE INDEX IF NOT EXISTS idx_project_decisions_proj ON project_decisions(project_id);

-- Cockpit
CREATE INDEX IF NOT EXISTS idx_tasks_status         ON tasks(status);
CREATE INDEX IF NOT EXISTS idx_tasks_due_date        ON tasks(due_date);
CREATE INDEX IF NOT EXISTS idx_tasks_project        ON tasks(project_id);

-- Finanse
CREATE INDEX IF NOT EXISTS idx_finance_date         ON finance_entries(date DESC);
CREATE INDEX IF NOT EXISTS idx_finance_type         ON finance_entries(type);
CREATE INDEX IF NOT EXISTS idx_finance_project      ON finance_entries(project_id);

-- Brain
CREATE INDEX IF NOT EXISTS idx_brain_sections_cat  ON brain_sections(category);
CREATE INDEX IF NOT EXISTS idx_brain_sections_status ON brain_sections(status);
CREATE INDEX IF NOT EXISTS idx_brain_memory_scope  ON brain_memory(scope);

-- Workflows
CREATE INDEX IF NOT EXISTS idx_workflow_status      ON workflow_logs(status);
CREATE INDEX IF NOT EXISTS idx_workflow_created_at  ON workflow_logs(created_at DESC);

-- ============================================================
-- SEED — dane startowe
-- ============================================================

-- Domyślny użytkownik (właściciel)
INSERT INTO users (email, name, role)
VALUES ('zdzalkak@gmail.com', 'Kacper Zdżałka', 'owner')
ON CONFLICT (email) DO NOTHING;

-- Projekt Vantix OS
INSERT INTO projects (code, name, description, status, phase, repo_url, deploy_url, stack)
VALUES (
  'VANTIX001',
  'vantix-os',
  'Centralny system operacyjny dla pracy Kacpra — centrum sterowania firmy Vantix.',
  'active',
  'phase_0',
  'https://github.com/Mejsonek/Brainofvantix',
  'https://vantix-dev-tool.vercel.app',
  ARRAY['Next.js', 'Tailwind', 'Neon', 'Vercel', 'Claude API', 'n8n']
)
ON CONFLICT (code) DO NOTHING;

-- Integracje
INSERT INTO integrations (name, status) VALUES
  ('anthropic', 'active'),
  ('neon',      'active'),
  ('vercel',    'active'),
  ('telegram',  'inactive'),
  ('n8n',       'inactive')
ON CONFLICT (name) DO NOTHING;
