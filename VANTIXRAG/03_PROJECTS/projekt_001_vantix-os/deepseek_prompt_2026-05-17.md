# Prompt dla DeepSeek — 2026-05-17
> Rola: Worker. Implementujesz zgodnie ze specyfikacją. Nie podejmujesz decyzji architektonicznych.

---

## Kontekst projektu

Budujesz **Vantix OS** — centralny system operacyjny dla foundera agencji AI.

Stack:
- Frontend: Next.js (App Router) + Tailwind CSS
- Automatyzacje: n8n (self-hosted na Hugging Face Space)
- Baza danych: Neon (Postgres serverless)
- Repo: `VANTIX001_vantix-os` na GitHub

Folder aplikacji: `vantix-app/`
n8n URL: `https://SolutionKacper-VantixN8N.hf.space`

---

## Zadania do wykonania — krok po kroku

Wykonaj każdy task w kolejności. Przejdź do następnego dopiero gdy poprzedni jest kompletny.

---

### TASK 1 — Weryfikacja schematu tabeli `brain_sections` w Neon

**Opis:** Sprawdź aktualny schemat tabeli `brain_sections` w Neon, żeby potwierdzić kolumny przed budową flow n8n.

**Input:** Połączenie z Neon (DATABASE_URL z `.env.local`)

**Output:** Lista kolumn tabeli `brain_sections` (column_name + data_type). Jeśli tabela nie istnieje — napisz SQL który ją tworzy.

**SQL do uruchomienia:**
```sql
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'brain_sections'
ORDER BY ordinal_position;
```

**Warunek akceptacji:** Lista kolumn potwierdzona lub gotowy CREATE TABLE SQL.

---

### TASK 2 — Weryfikacja schematu tabeli `leads` w Neon

**Opis:** Sprawdź schemat tabeli `leads` — czy istnieje i czy ma wymagane kolumny.

**Input:** Połączenie z Neon

**Output:** Lista kolumn tabeli `leads`. Jeśli brakuje kolumn — napisz ALTER TABLE SQL.

**Wymagane kolumny:**
```
id, name, email, phone, message, service_type, source, created_at, stage, status
```

**SQL do uruchomienia:**
```sql
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'leads'
ORDER BY ordinal_position;
```

**Warunek akceptacji:** Schemat zgodny z wymaganymi kolumnami lub gotowy migration SQL.

---

### TASK 3 — Kod n8n Flow: New Lead Alert

**Opis:** Napisz kompletny kod JavaScript dla węzłów Function w n8n flow obsługującym formularz kontaktowy.

**Input:** Payload z formularza:
```json
{
  "source": "landing",
  "lead": {
    "name": "Jan Kowalski",
    "email": "jan@firma.pl",
    "phone": "+48 600 000 000",
    "message": "Chcę wdrożyć automatyzację",
    "service_type": "automation"
  }
}
```

**Output:** Gotowy kod dla Node 2 (Function: parse + validate) + gotowe SQL dla Node 3 (Postgres INSERT).

**Format:**

*Node 2 — Function (parse + validate):*
```js
// [TWÓJ KOD TUTAJ]
```

*Node 3 — Postgres INSERT (execute query):*
```sql
-- [TWÓJ SQL TUTAJ]
```

**Warunki akceptacji:**
- Brak błędów przy pustych polach (graceful defaults)
- `created_at` = aktualny timestamp ISO
- `stage` = `'new'`, `status` = `'active'` jako domyślne
- SQL zgodny ze schematem z TASK 2

---

### TASK 4 — Kod n8n Flow: VANTIXRAG GitHub Sync

**Opis:** Napisz kompletny kod JavaScript i SQL dla flow synchronizującego pliki VANTIXRAG z GitHub do Neon.

**Input:** GitHub push webhook payload (standardowy format GitHub).

**Output:** Gotowy kod dla 4 węzłów flow.

**Format:**

*Node 2 — Function (extract .md files):*
```js
// [TWÓJ KOD TUTAJ]
// Musi: wyciągnąć tylko pliki z VANTIXRAG/ z rozszerzeniem .md
// Źródło: commits[].added + commits[].modified
// Return: array { path, repo, ref } per plik
```

*Node 3 — HTTP Request config:*
```
Method: GET
URL: [URL do raw contentu pliku na GitHub — z dynamicznymi wartościami]
```

*Node 4 — Postgres UPSERT (execute query):*
```sql
-- [TWÓJ SQL TUTAJ]
-- Musi: UPSERT do brain_sections zgodny ze schematem z TASK 1
-- section_id = ścieżka pliku (unique key)
```

**Warunki akceptacji:**
- Ignoruje pliki spoza `VANTIXRAG/`
- Ignoruje pliki usunięte (tylko added + modified)
- SQL nie failuje gdy wiersz już istnieje (ON CONFLICT)
- Kolumny SQL zgodne ze schematem z TASK 1

---

### TASK 5 — Aktualizacja `.env.local`

**Opis:** Przygotuj listę zmiennych środowiskowych do dodania/zaktualizowania w `vantix-app/.env.local`.

**Input:** Dane z poprzednich tasków (webhook URL, GitHub secret).

**Output:** Gotowy blok do wklejenia w `.env.local`:

```env
# n8n webhooks
NEXT_PUBLIC_N8N_WEBHOOK_URL=https://SolutionKacper-VantixN8N.hf.space/webhook/lead-alert

# GitHub webhook
GITHUB_WEBHOOK_SECRET=[wygeneruj 32-znakowy losowy hex i wstaw tutaj]
```

**Warunek akceptacji:** Wszystkie zmienne wymagane przez flow są opisane z przykładową wartością lub instrukcją generowania.

---

### TASK 6 — Test checklist

**Opis:** Napisz gotową checklistę testów do przeklejenia do terminala/przeglądarki po uruchomieniu obu flow.

**Output:** Numerowana lista kroków testowych z oczekiwanym rezultatem dla każdego:

```
[ ] 1. ...
[ ] 2. ...
```

**Zakres:**
- Test flow "New Lead Alert" (formularz → n8n → Neon)
- Test flow "VANTIXRAG GitHub Sync" (push .md → n8n → Neon)
- Weryfikacja danych w Neon (gotowe SELECT queries)

**Warunek akceptacji:** Każdy krok ma jasny "oczekiwany wynik" — ktoś może wykonać test bez znajomości systemu.

---

## Zasady pracy

- Każdy task kończ słowem `DONE` i jednozdaniowym podsumowaniem co zrobiłeś.
- Jeśli napotkasz niejasność — napisz pytanie i zatrzymaj się. Nie zgaduj.
- Nie modyfikuj architektury — tylko implementuj zgodnie ze specyfikacją.
- Kod musi być gotowy do wklejenia — zero placeholderów bez wyjaśnienia.
