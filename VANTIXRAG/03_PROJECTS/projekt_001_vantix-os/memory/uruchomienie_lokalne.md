# uruchomienie_lokalne.md — Instrukcja Uruchomienia Lokalnego

> Jak uruchomić Vantix OS lokalnie od zera. Dla nowego agenta lub Kacpra po przerwie.

---

## Wymagania

- Node.js 18+
- Git
- Dostęp do Neon (connection string)
- Klucz API Anthropic

---

## Kroki

### 1. Sklonuj repo
```bash
git clone git@github.com:Mejsonek/Brainofvantix.git
cd Brainofvantix
```

### 2. Zainstaluj zależności
```bash
npm install
```

### 3. Utwórz `.env.local`
```bash
cp .env.example .env.local
```

Uzupełnij w `.env.local`:
```
DATABASE_URL=postgresql://neondb_owner:[HASŁO]@ep-tiny-night-aljcg3ye-pooler.c-3.eu-central-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
ANTHROPIC_API_KEY=[KLUCZ]
```

### 4. Uruchom schema DB (tylko pierwsze uruchomienie)
Wejdź na Neon SQL Editor → wklej zawartość `schema.sql` → Run.

Lub jeśli masz psql:
```bash
psql $DATABASE_URL -f schema.sql
```

### 5. Uruchom lokalnie
```bash
npm run dev
```

Aplikacja dostępna na: `http://localhost:3000`

---

## Struktura projektu (kluczowe ścieżki)

```
app/
├── dashboard/          → Dashboard główny
├── devtool/            → Dev Tool (projekty)
├── crm/                → CRM (leady)
│   └── [id]/           → Detail page leada
├── brain/              → Brain / VANTIXRAG GUI
├── finanse/            → Finanse (shell)
├── taski/              → Taski (shell)
├── kalendarz/          → Kalendarz (skeleton)
├── settings/           → Ustawienia AI + Integracje
└── api/
    ├── crm/leads/      → CRUD leads
    ├── brain/          → Brain API
    ├── settings/       → AI + Integrations settings
    └── devtool/        → Projects API

components/
├── crm/                → Komponenty CRM
├── brain/              → Komponenty Brain
├── devtool/            → Komponenty Dev Tool
└── layout/             → AppSidebar, AppTopbar

lib/
└── integrations.ts     → Definicje integracji zewnętrznych
```

---

## Deploy na Vercel

```bash
git push origin main
```

Vercel automatycznie deployuje z `main`. Zmienne środowiskowe ustawione w panelu Vercel → Settings → Environment Variables.

**Produkcja:** https://vantix-dev-tool.vercel.app

---

## Znane problemy

| Problem | Przyczyna | Rozwiązanie |
|---------|-----------|-------------|
| ENOENT na `/api/logs` | Vercel stateless — brak dostępu do dysku | Przepisać logi na tabelę Neon |
| CRM nie działa | Brak tabel Neon | Uruchom `schema.sql` w SQL Editor |
| Brain statusy nie persistują | Brak tabeli `brain_sections` | Uruchom `schema.sql` w SQL Editor |

---

## Commity pomocowe (historia)

```
4e7e64c  feat: Brain – integracja DevTool ↔ Brain (brain_path, link/unlink UI)
36d9a2c  feat: Ustawienia AI – /settings, model switcher, ai_settings DB
7964d06  feat: Integracje zewnętrzne – Vercel, GitHub, Google, Zoho Mail
36242c2  fix: przenieś INTEGRATIONS do lib/integrations.ts
```
