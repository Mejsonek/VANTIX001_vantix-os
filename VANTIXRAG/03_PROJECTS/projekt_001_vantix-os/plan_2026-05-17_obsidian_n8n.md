# Plan sesji — 2026-05-17 — Obsidian + n8n Workflows
> Cel dnia: działający Obsidian Git Sync + 2 produkcyjne n8n flow

---

## Cel końcowy

Po tej sesji:
1. Obsidian automatycznie pushuje `VANTIXRAG/*.md` do GitHub co 10 min
2. n8n odbiera push z GitHub → UPSERTuje `brain_sections` w Neon
3. Formularz kontaktowy na landing page → n8n → Neon `leads` + powiadomienie
4. Webhook URL w `.env.local` wskazuje na produkcyjne n8n na HF Space

---

## BLOK 1 — Obsidian Git Plugin ⏱ ~20 min (Kacper ręcznie)

> Żaden agent tego nie zrobi — wymaga GUI Obsidiana.

**Kroki:**
1. Obsidian → Settings → Community Plugins → Browse → szukaj "Obsidian Git" → Install → Enable
2. Settings → Obsidian Git:
   - `Vault backup interval (minutes)`: `10`
   - `Auto pull interval (minutes)`: `10`
   - `Commit message`: `chore: VANTIXRAG auto-sync {{date}}`
   - `Push on backup`: ✅ zaznacz
3. Sprawdź czy Obsidian widzi repozytorium (powinien — vault jest w folderze git repo)
4. Ręczny test: `Ctrl+P` → "Obsidian Git: Create backup" → sprawdź GitHub czy commit dotarł

**Wynik:** VANTIXRAG zmiany automatycznie trafiają do GitHub bez ręcznego push.

---

## BLOK 2 — n8n: New Lead Alert ⏱ ~45 min

> Formularz kontaktowy (landing page `vantix.pl`) → n8n → Neon `leads` → powiadomienie

### Krok 1: Stwórz flow w n8n

Otwórz `https://SolutionKacper-VantixN8N.hf.space/` → New Workflow → dodaj nodes:

```
[Webhook] → [Function: Parse payload] → [Postgres: INSERT leads] → [HTTP/Telegram: Notify]
```

**Node 1 — Webhook**
- Method: `POST`
- Path: `lead-alert`
- Response mode: `Immediately` / Respond with: `{ "status": "ok" }`
- Skopiuj production URL: `https://SolutionKacper-VantixN8N.hf.space/webhook/lead-alert`

**Node 2 — Function (parse + validate)**
```js
const body = $json;
return [{
  json: {
    name: body.lead?.name || '',
    email: body.lead?.email || '',
    phone: body.lead?.phone || '',
    message: body.lead?.message || '',
    service_type: body.lead?.service_type || 'unknown',
    source: body.source || 'landing',
    created_at: new Date().toISOString(),
    stage: 'new',
    status: 'active'
  }
}];
```

**Node 3 — Postgres (INSERT leads)**
- Credentials: Neon connection (DATABASE_URL z .env.local)
- Operation: `Insert`
- Table: `leads`
- Columns: wszystkie z Function node

**Node 4 — powiadomienie (opcjonalnie Telegram)**
- Jeśli masz Bot Token: Telegram node → wyślij wiadomość
- Jeśli nie: pomiń, dodaj później

### Krok 2: Aktywuj flow i skopiuj URL

Po aktywacji webhook URL produkcyjny wygląda tak:
`https://SolutionKacper-VantixN8N.hf.space/webhook/lead-alert`

### Krok 3: Zaktualizuj aplikację

W `vantix-app/.env.local` dodaj lub zmień:
```
NEXT_PUBLIC_N8N_WEBHOOK_URL=https://SolutionKacper-VantixN8N.hf.space/webhook/lead-alert
```

`lib/n8nService.ts` już czyta z `NEXT_PUBLIC_N8N_WEBHOOK_URL` — żadne zmiany w kodzie.

### Krok 4: Test

1. Otwórz `localhost:3000` (lub `vantix-dev-tool.vercel.app`)
2. Wypełnij i wyślij formularz kontaktowy
3. Sprawdź n8n → powinien być 1 execution ✅
4. Sprawdź Neon → `SELECT * FROM leads ORDER BY created_at DESC LIMIT 1;`

---

## BLOK 3 — n8n: VANTIXRAG GitHub Sync ⏱ ~60 min

> Obsidian push → GitHub webhook → n8n → UPSERT `brain_sections` w Neon

### Krok 1: Utwórz GitHub Webhook

GitHub → repo `VANTIX001_vantix-os` → Settings → Webhooks → Add webhook:
- Payload URL: `https://SolutionKacper-VantixN8N.hf.space/webhook/github-push`
- Content type: `application/json`
- Secret: `[wygeneruj losowy string, zapisz w .env.local jako GITHUB_WEBHOOK_SECRET]`
- Events: `Just the push event`
- Active: ✅

### Krok 2: Stwórz flow w n8n

```
[Webhook: github-push] → [Function: extract .md files] → [Loop: per file] → [HTTP: fetch raw] → [Postgres: UPSERT brain_sections]
```

**Node 1 — Webhook**
- Path: `github-push`
- Method: POST

**Node 2 — Function (extract changed .md files)**
```js
const commits = $json.body?.commits || [];
const files = [];

commits.forEach(commit => {
  [...(commit.added || []), ...(commit.modified || [])].forEach(path => {
    if (path.startsWith('VANTIXRAG/') && path.endsWith('.md')) {
      files.push({
        path,
        repo: $json.body.repository.full_name,
        ref: $json.body.ref.replace('refs/heads/', '')
      });
    }
  });
});

return files.map(f => ({ json: f }));
```

**Node 3 — HTTP Request (fetch raw content)**
- Method: GET
- URL: `https://raw.githubusercontent.com/{{$json.repo}}/{{$json.ref}}/{{$json.path}}`

**Node 4 — Postgres (UPSERT brain_sections)**
- Operation: `Execute Query`
```sql
INSERT INTO brain_sections (section_id, title, content, source, updated_at)
VALUES (
  '{{$json.path}}',
  '{{$json.path.split("/").pop().replace(".md","")}}',
  '{{$json.data}}',
  'github',
  NOW()
)
ON CONFLICT (section_id)
DO UPDATE SET
  content = EXCLUDED.content,
  updated_at = NOW();
```

> Uwaga: sprawdź schemat tabeli `brain_sections` w Neon — dostosuj kolumny jeśli różne.

### Krok 3: Test

1. Edytuj dowolny plik VANTIXRAG w Obsidianie
2. Poczekaj 10 min (auto-push) lub zrób ręczny commit+push
3. Sprawdź n8n → execution ✅
4. Sprawdź Neon → `SELECT section_id, updated_at FROM brain_sections ORDER BY updated_at DESC LIMIT 5;`

---

## BLOK 4 — (bonus, jeśli zostanie czas) ⏱ ~30 min

**Podpięcie CentralBrainFocus do dashboard:**

W `vantix-app/app/(shell)/dashboard/page.tsx` zastąp placeholder:
```tsx
import CentralBrainFocus from '@/components/shell/CentralBrainFocus';

export default function DashboardPage() {
  return <CentralBrainFocus />;
}
```

---

## Neon — schemat brain_sections (weryfikacja)

Przed uruchomieniem flow sprawdź kolumny:
```sql
SELECT column_name, data_type FROM information_schema.columns
WHERE table_name = 'brain_sections';
```

Jeśli tabela jest pusta lub ma inne kolumny — dostosuj INSERT w Node 4.

---

## Definicja sukcesu sesji

| Cel | Test |
|-----|------|
| Obsidian auto-push | Edytuj .md → 10 min → commit w GitHub ✅ |
| n8n New Lead Alert | Formularz → execution w n8n → wiersz w `leads` ✅ |
| VANTIXRAG Sync | Push .md → execution w n8n → wiersz w `brain_sections` ✅ |
| Webhook URL | `.env.local` wskazuje na HF Space ✅ |
