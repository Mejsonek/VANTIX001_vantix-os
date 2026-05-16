# architektura.md — Decyzje Techniczne Vantix App

> Rejestr kluczowych decyzji architektonicznych z uzasadnieniami. Źródło: stary RAAG + logi sesji.

---

## Next.js jako główny framework

**Decyzja:** Next.js 14 z App Router jako jedyny framework (frontend + backend).

**Uzasadnienie:**
- Jeden język (TypeScript) dla całego stacku — zero context switching
- App Router = server components + streaming + layouts out of the box
- API Routes = serverless backend bez oddzielnego serwera
- Doskonała integracja z Vercel (zero-config deploy)
- Duży ekosystem, szybkie iteracje

**Alternatywy odrzucone:** Remix (mniejszy ekosystem), SvelteKit (bariera wejścia), Express + React oddzielnie (niepotrzebna złożoność)

---

## Neon jako baza danych

**Decyzja:** Neon (serverless PostgreSQL) zamiast innych opcji.

**Uzasadnienie:**
- Serverless = zero zarządzania instancją, skaluje do zera
- Pełny Postgres — żadnych kompromisów na SQL
- Doskonała integracja z Vercel (env vars, edge functions)
- `@neondatabase/serverless` — template literal API, bezpieczne zapytania
- Bezpłatny tier wystarczający na early stage

**Ograniczenie do zapamiętania:** Brak `sql.unsafe()` — wszystkie zapytania przez template literals. Dynamiczne filtry wymagają explicite if/else (patrz: `/api/crm/leads`).

**Alternatywy odrzucone:** Supabase (nadmiarowe funkcje), PlanetScale (MySQL, nie Postgres), lokalny Postgres (wymaga VPS)

---

## Vercel jako hosting

**Decyzja:** Vercel jako jedyna platforma hostingowa.

**Uzasadnienie:**
- Zero-config deploy dla Next.js (ten sam producent)
- Automatyczny deploy z GitHub push
- Serverless functions out of the box (API Routes)
- CDN globalny bez konfiguracji
- Preview deployments dla każdego PR

**Ograniczenie do zapamiętania:** Vercel jest stateless — brak dostępu do lokalnego dysku na produkcji. Dlatego `/api/projects/[id]/file` działa tylko lokalnie. `/api/logs` wymaga przepisania na Neon (ENOENT na Vercel).

---

## Separacja modułów

**Decyzja:** Każdy moduł ma osobny folder w `components/`, własne API routes i własne typy.

**Uzasadnienie:**
- Izolacja zmian — zmiana w CRM nie dotyka Dev Tool
- Czytelna struktura dla agenta AI (kontekst modułu = folder modułu)
- Łatwe dodawanie nowych modułów bez refaktoru

**Struktura:**
```
components/crm/     → komponenty CRM
components/brain/   → komponenty Brain
components/devtool/ → komponenty Dev Tool
app/api/crm/        → API CRM
app/api/brain/       → API Brain
```

---

## Architektura ustawień — tabele DB

Dwie tabele kluczy:
```
ai_settings                    integration_settings
├── anthropic_api_key          ├── vercel_token
├── anthropic_active_model     ├── vercel_team_id
├── groq_api_key               ├── github_token
├── groq_active_model          ├── github_username
├── gemini_api_key             ├── google_client_id
└── gemini_active_model        ├── google_client_secret
                               ├── google_refresh_token
                               ├── zoho_email
                               ├── zoho_password
                               └── zoho_smtp_host
```

Format kluczy: `{provider_id}_{field}`, np. `vercel_token`, `github_username`

---

## AI jako warstwa deweloperska

**Decyzja:** Wysoka autonomia agenta AI (Claude Code) w implementacji przy zachowaniu ścisłej kontroli architektonicznej przez Kacpra.

**Reguła:** Agent nie podejmuje decyzji architektonicznych samodzielnie. Wszystkie decyzje dotyczące struktury, stacku i modelu danych — Kacper, zapisane w tym pliku.

---

## Otwarte pytania techniczne

- **Autentykacja** — brak (aplikacja prywatna). Rozważyć Vercel password protection lub NextAuth przy skalowaniu do multi-user
- **Real-time** — brak WebSockets; przy potrzebie rozważyć Pusher lub SSE
- **Caching** — brak warstwy cache; przy większym ruchu rozważyć Redis / Vercel KV
- **`/api/logs`** — wymaga przepisania na Neon (aktualnie ENOENT na Vercel)
