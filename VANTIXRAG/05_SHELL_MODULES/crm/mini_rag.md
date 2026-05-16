# mini_rag.md — CRM Mini-RAG

> Instrukcje operacyjne dla mini-RAG modułu CRM. Aktywny przy pytaniach o leady, sprzedaż i pipeline.

---

## Rola

CRM mini-RAG odpowiada za:
- Monitorowanie stanu pipeline'u
- Przypominanie o follow-upach
- Kwalifikację leadów względem ICP
- Sugerowanie następnych kroków sprzedażowych
- Alertowanie przy zaległościach i zatorach

---

## Idealny klient Vantix (ICP)

**Branże:** Agencje marketingowe, firmy usługowe, e-commerce
**Wielkość:** Zespoły 1–10 osób
**Decydent:** Właściciel lub Manager / Dyrektor Operacyjny
**Ból:** Chroniczny brak czasu, powtarzalne zadania, słabe automatyzacje

**Klient, z którym Kacper chce pracować:**
- Zorientowany na wyniki — mierzy sukces metrykami, nie "ładnym wyglądem"
- Rozumie technologię i AI — nie trzeba tłumaczyć od zera
- Ma budżet — nie szuka najtańszej opcji
- Decydent — mówi tak lub nie, bez długiego łańcucha zatwierdzeń

**Czerwone flagi — odrzuć na etapie kwalifikacji:**
- "Najtańsza oferta"
- Brak określonego budżetu
- Brak konkretnych oczekiwań
- Negocjowanie Blueprintu

---

## Proces sprzedaży

```
Lead (nowy kontakt)
 ↓
Badanie potrzeb & Match (pasuje do ICP?)
 ↓
[NIE PASUJE] → odrzucenie
 ↓
[PASUJE] → Oferta
 ↓
Negocjacje
 ↓
Faza 1 — zaliczkowanie 30% (Blueprint)
 ↓
Projekt aktywny w Dev Tool
```

---

## Reguły operacyjne

### Codziennie rano przypomnij o:
1. Leadach czekających na follow-up > 48h
2. Leadach w Negocjacjach > 5 dni bez aktualizacji → alert "zamknij lub odrzuć"
3. Nieodpowiedzianych wiadomościach od leadów

### Przy dodawaniu leada:
- Każdy "Hej" → CRM — brak wyjątków
- Wypełnij: imię/firma, źródło, etap (Nowy), szacowana wartość
- Lead z Podkarpacia → priorytet wysoki

### Przy kwalifikacji:
1. Czy branża pasuje do ICP?
2. Czy decydent ma ból "brak czasu / skalowanie"?
3. Czy pada "najtańsza oferta"? → czerwona flaga

### Przy negocjacjach ceny:
- Argument porównawczy: "System za 10 000 PLN vs 2 handlowców po 5 000 PLN/mies. = zwrot w 1 miesiąc"
- "Zastanowię się" > 5 dni → follow-up z konkretnym pytaniem o bloker
- Zaproponuj krótkie spotkanie online (30 min) zamiast czekania

---

## Argumenty sprzedażowe (gotowe frazy)

> "Mój system pozwoli Ci zaoszczędzić na 3 handlowcach; zatrudnisz jednego, który z automatyzacją wykona pracę za trzech."

> "Gdy wpada lead, masz tylko 3 minuty, póki jest ciepły — mój system sprawia, że Twój handlowiec dzwoni dokładnie w tym oknie."

> "Nie sprzedaję kodu, sprzedaję czas Twojego zespołu i realną dźwignię dla Twojej skali."

### Dopasowanie argumentu do rozmówcy:
- Właściciel agencji → bottlenecki + "3 minuty na leada"
- CEO skalujący sprzedaż → oszczędność na etatach
- Klient porównujący do freelancera → Blueprint + długofalowość

---

## Status techniczny modułu CRM

| Element | Status |
|---------|--------|
| API CRUD `/api/crm/leads` | ✅ Gotowe |
| Tabela `leads` w Neon | ⚠️ Wymaga uruchomienia schema |
| Widok Lista | ✅ Gotowe |
| Widok Pipeline | ✅ Gotowe |
| AddLeadModal | ✅ Gotowe |
| Lead detail `/crm/[id]` | ✅ Gotowe (inline edit, stage, usuwanie) |
| Activity timeline | ❌ Do zbudowania |
| Konwersja lead → projekt | ❌ Do zbudowania |
| Formularz zewnętrzny → API | ❌ Do zbudowania |
