# master_rules.md — Zasady Nienaruszalne Systemu Vantix

> Plik rdzenia RAG-matki. Obowiązuje wszystkich agentów i wszystkie moduły. Nie modyfikować bez akceptacji Kacpra.

---

## Zasada Nadrzędna

> **AI explores, Owner decides.**

AI proponuje, analizuje, generuje. Kacper zatwierdza lub odrzuca. Rdzeń systemu nigdy nie zmienia się bez jego akceptacji.

---

## Zasady Architektoniczne

### 1. Separacja odpowiedzialności
Każda warstwa systemu jest izolowana i niezależna:

| Warstwa | Odpowiedzialność |
|---------|-----------------|
| Frontend | Prezentacja i interakcja z użytkownikiem |
| API | Logika biznesowa i walidacja |
| AI | Przetwarzanie języka, generowanie, klasyfikacja |
| DB | Source of Truth — stan i historia |

Żadna warstwa nie przejmuje odpowiedzialności innej.

### 2. DB jako Source of Truth
Stan systemu jest definiowany **wyłącznie przez bazę danych**. UI i cache są pochodnymi DB, nie odwrotnie. Każda krytyczna zmiana stanu trafia do DB — nigdy tylko do pamięci aplikacji.

### 3. System oparty o stany
Każdy proces ma jasny stan: `pending → processing → completed / failed / retrying`. Brak stanu = brak procesu.

### 4. Projektowanie pod awarie
System zakłada, że coś pójdzie nie tak: timeouty AI, zduplikowane requesty, błędne dane, awarie zewnętrznych API. Obsługa błędów nie jest dodatkiem — jest częścią architektury od początku.

### 5. Idempotentność operacji krytycznych
Każda krytyczna akcja (płatność, wysłanie emaila, tworzenie rekordu, webhook) musi być bezpieczna przy wielokrotnym wywołaniu. Implementacja: unikalne klucze, sprawdzanie istnienia przed insertem, idempotency keys w API.

### 6. Output LLM jest nieufny domyślnie
Każdy output AI wymaga walidacji przed użyciem w systemie. AI do interpretacji, generowania, klasyfikacji — nie do zarządzania stanem.

### 7. Logi wszystkich ważnych akcji
Kto, co, kiedy, rezultat, błąd, correlation ID. Brak logu = brak pamięci = ryzyko powtarzania pracy.

---

## Zasady Kodowania

- Zero ukrytej magii — kod jest przewidywalny
- Jedna funkcja = jedna odpowiedzialność
- Nigdy nie ufaj zewnętrznym systemom — każde API ma timeout + retry + fallback
- Preferuj prostą logikę zamiast AI — AI tylko do interpretacji, generowania, klasyfikacji
- Każdy request ma correlation ID śledzalny przez cały stack

---

## Zasady RAG-matki

### Hierarchia dostępu
```
RAG-MATKA (pełny dostęp do wszystkiego)
│
├── CRM mini-RAG       (scope: leady, lejek, follow-up)
├── DEV mini-RAG       (scope: projekty, logi, decyzje)
├── Cockpit mini-RAG   (scope: taski, kalendarz, priorytety)
├── Settings mini-RAG  (scope: konfiguracja, integracje)
└── Workflows mini-RAG (scope: automatyzacje, flow)
```

### Komunikacja między warstwami
- Mini-RAG widzi **tylko swój scope** — nigdy cały system
- Mini-RAG może **zapytać** RAG-matkę o szerszy kontekst
- RAG-matka może **odesłać odpowiedź, instrukcję lub propozycję zmiany**
- Propozycje zmian trafiają do **warstwy evolution** — nie są wdrażane automatycznie

---

## Zasady Projektowe (każdy projekt)

- Każdy projekt ma strukturę: `CLAUDE.md`, `assumptions.md`, `todo.md`, `modules.md`, `ONBOARDING.md`, `logs/`, `prompts/`
- Przejście między fazami wymaga **pisemnego potwierdzenia klienta**
- Płatność wchodzi **przed** przejściem do kolejnej fazy
- Scope creep → odkładany na następną fazę lub wyceniany oddzielnie
- Blueprint nie jest do negocjacji — klient który negocjuje Blueprint, będzie negocjował każdy etap

---

## Zasady Agenta

### Przed każdą sesją
1. Przeczytaj `CLAUDE.md`
2. Przeczytaj logi z ostatniej sesji
3. Sprawdź `todo.md`
4. Potwierdź z Kacprem zakres sesji

### Po każdej sesji
1. Zaktualizuj `logs/YYYY-MM-DD_opis.md`
2. Zaktualizuj `todo.md`
3. Zapisz otwarte pytania i blokery
4. Zaproponuj następny krok

### Czego agent nie robi
- Nie modyfikuje `CLAUDE.md` bez zgody Kacpra
- Nie wdraża propozycji evolution bez akceptacji
- Nie nadpisuje krytycznych plików automatycznie
- Nie ignoruje zasad architektonicznych nawet "dla szybkości"
- Nie łagodzi tonu alertów — Kacper preferuje bezpośrednią komunikację

---

## Model Płatności Projektów: 30/30/40

| Faza | % | Trigger |
|------|---|---------|
| Blueprint | 30% | Akceptacja blueprintu przez klienta |
| MVP | 30% | Potwierdzenie działania MVP |
| Delivery | 40% | Finalny odbiór |

---

## Finansowe progi decyzyjne

- Odrzucaj projekty poniżej **1 000 PLN** — nie warte kosztów operacyjnych
- Przed decyzją o upgrade infrastruktury: czy przychód uzasadnia nowy koszt stały?
- Break-even point Vantix (narzędzia): **~170 PLN/mies.**
