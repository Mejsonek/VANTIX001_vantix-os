# scope.md — CRM Mini-RAG Scope

> Zakres wiedzy i odpowiedzialności mini-RAG CRM. Nie widzi nic poza tym zakresem.

---

## Co należy do CRM mini-RAG

- Leady i ich dane (kontakt, firma, etap, wartość, źródło)
- Pipeline sprzedażowy i etapy
- Historia kontaktów i aktywności leadów
- Follow-upy i przypomnienia
- Idealny profil klienta (ICP) i czerwone flagi
- Objection handling i argumenty sprzedażowe
- Lokalny rynek i kanały pozyskania

## Czego CRM mini-RAG NIE widzi

- Szczegółów projektów (Dev Tool)
- Finansów i rozliczeń (Finanse)
- Tasków osobistych (Cockpit)
- Konfiguracji systemu (Settings)
- Automatyzacji flow (Workflows)

## Kiedy pyta RAG-matkę

- Gdy potrzebuje kontekstu właściciela (styl komunikacji, limity decyzyjne)
- Gdy lead ma zostać przekonwertowany do projektu (Dev Tool scope)
- Gdy wartość kontraktu wymaga walidacji z celami finansowymi

---

## Dane dostępne dla CRM mini-RAG

### Tabele DB
- `leads` — główna tabela leadów
- `lead_activity` — historia aktywności
- `lead_notes` — notatki do leada

### Etapy pipeline
| Etap | Znaczenie | Następna akcja |
|------|-----------|----------------|
| Nowy | Świeży kontakt, niezbadany | Pierwsze badanie potrzeb |
| Kwalifikacja | Ocena czy pasuje do ICP | Zebrać info o budżecie i projekcie |
| Kontakt | Aktywna rozmowa | Follow-up w ciągu 48h |
| Discovery | Zbieranie wymagań | Przygotowanie Blueprint |
| Oferta | Oferta wysłana | Czekać max 5 dni, potem follow-up |
| Negocjacje | Trwają ustalenia | Zamknąć zakres i cenę |
| Wygrany | Umowa / zaliczka | Przekuć w projekt w Dev Tool |
| Przegrany | Lead rezygnuje | Zanotować powód |
| Wstrzymany | Czeka na decyzję | Przypomnienie za X dni |

### Kanały pozyskania
- Obecne: Reddit, Facebook, Instagram
- Planowane: Cold Mailing, Cold Calling
- Preferowane: spotkania bezpośrednie (najwyższa skuteczność)

### Rynek lokalny
- Priorytet: Mielec / Rzeszów / Podkarpacie
- Lead z regionu Podkarpacie → oznacz jako priorytet wysoki (krótszy cykl sprzedaży)

---

## Zasady alertów CRM

1. Lead w etapie **Negocjacje > 5 dni** bez aktualizacji → alert "zamknij lub odrzuć"
2. Lead czekający na odpowiedź **> 48h** → przypomnienie o follow-up
3. Każdy nowy "Hej" → musi trafić do CRM (brak wyjątków)
4. **Zasada 3 minut** — krytyczny czas reakcji gdy lead jest ciepły
