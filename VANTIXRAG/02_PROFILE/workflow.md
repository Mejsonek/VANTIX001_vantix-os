# workflow.md — Styl Pracy i Workflow Kacpra

> Taktyczne ramy operacyjne — jak Kacper pracuje, planuje i realizuje projekty. Używane przez agenta do priorytetyzacji i monitorowania dyscypliny operacyjnej.

---

## Rytm Dnia — Model 1-2-1

| Blok | Czas | Zawartość |
|------|------|-----------|
| **Poranny** | ~1h | Obsługa klientów (odpowiedzi, follow-upy, bieżące zapytania) |
| **Wieczorny (Deep Work)** | ~2h | Główna praca: budowanie, kodowanie, architektura — Vantix projekty |
| **Edukacyjny** | ~1h | Angielski / nowe technologie AI |

**Łączny czas głębokiej pracy: ~4h dziennie.**

### Harmonogram dnia
- **Pobudka:** Idealnie między 5:00 a 6:00 rano
- **Rytuał wejścia:** Prysznic, kawa i budowanie flow przez muzykę
- **Przed sesją wieczorną:** Brain prezentuje listę zadań (Kacper przemyśla je w ciągu dnia przy pracy fizycznej)
- **Zamknięcie dnia:** Dopisanie logów sesji + zapis zmian w Vantix App

---

## Planowanie zadań

- **Brak rozbudowanego systemu** — prostota ponad zarządzanie narzędziami
- Luźne notatki w plikach Markdown (cyfrowe)
- Tradycyjny **zeszyt fizyczny** — do szybkich zapisków, myślenia na papierze, brainstormingu
- Vantix App jako docelowe centrum
- Podejście: **"co muszę dziś dowieźć"** — lista rzeczy do zrobienia, nie timeboxowane bloki

### Zasada krytyczna
**"Zapisuję teraz albo tracę."** Jeśli zadanie pojawi się w złym momencie i nie zostanie zapisane — nie wróci. Agent musi przypominać o logowaniu natychmiast po każdej sesji.

---

## Deep Work

Kacper pracuje w trybie **Deep Work** — rygorystyczne podejście. Kiedy wchodzi w sesję, cel jest jasny i nie zmienia się w połowie.

- Maksymalny czas skupienia: 1h do 2–3h bez przerwy przy dobrym flow
- W środowiskach rozpraszających (hałas, chaos) używa muzyki jako "bańki skupienia"
- Po nagłym rozproszeniu potrzebuje chwili na powrót do kontekstu — nie przeskakuje natychmiast

### Zasady ochronne
- **Zakaz:** absolutne unikanie scrollowania mediów społecznościowych (TikTok, IG, FB) w blokach porannych i pracy
- **Alert Braina:** gdy brak realizacji zadań must-have (Angielski / Outreach) przez kilka dni → surowy alert systemowy, nie gentle reminder

---

## Workflow Projektowy — Standardowy Przebieg

### Etap 0 — Wizja i szkic analogowy
Każdy projekt zaczyna się od **papieru i zeszytu**, nie od klawiatury.

Kacper szkicuje:
- Logikę biznesową systemu
- Architekturę komponentów i ich zależności
- Kluczowe przepływy danych

Dopiero po skonkretyzowaniu koncepcji analogowo przechodzi do etapu cyfrowego.

### Etap 1 — Formulacja instrukcji dla Agenta AI
Szkic przekształcany w precyzyjną instrukcję do Agenta AI.

Instrukcja zawiera:
- Cel systemu i kontekst biznesowy
- Architekturę (stack, moduły, zależności)
- Zakres MVP (co wchodzi, co nie)
- Ograniczenia techniczne i reguły

**Kacper = Architekt. Agent = Developer.**

### Etap 2 — Budowa MVP
Agent buduje rdzeń systemu. Priorytet: **działające > ładne**.

Zasada MVP: minimalne funkcjonalności wystarczające do walidacji koncepcji. Każda iteracja kończy się checkpointem i aktualizacją logów.

### Etap 3 — Rozbudowa i dopracowanie
Na bazie działającego MVP: UI, edge cases, zabezpieczenia, integracje, testy. Każda zmiana jest logowana.

### Etap 4 — Delivery
Deploy, dokumentacja, onboarding klienta, rozliczenie końcowe.

---

## Pamięć Projektu

**Logi są jedynym ciągłym nośnikiem pamięci projektu.**

Zasada bezwzględna: **po każdej sesji pracy — aktualizacja logów**. Brak logu = brak pamięci = ryzyko cofnięcia się i powtarzania pracy.

Co wchodzi do logu:
- Co zostało zrobione
- Gdzie skończono (plik, linia, endpoint)
- Następny krok
- Blokery i otwarte pytania

---

## Preferencje typów zadań

- Preferuje **zadania projektowe** (define → execute → done) zamiast ciągłego timeboxowania
- Optymalna wielkość zadania: **średnia** — nie fragmenty mikro, nie projekty bez checkpointów
- Podejście: **"co trzeba zrobić"**, nie "ile czasu mam na to"

---

## Praca solo vs z innymi

- **Domyślnie solo** — najwyższa efektywność, brak koordynacji, pełna kontrola
- **Otwartość na partnerstwo** — jeśli partner jest kompetentny i wnosi realną wartość
- Nie szuka zespołu dla samego zespołu — szuka leverage

---

## Jak uczy się najlepiej

**Przez budowanie i praktykę.** Nie uczy się z kursów "dla samego ukończenia kursu". Najlepiej przyswaja wiedzę gdy:
1. Jest konkretny problem do rozwiązania
2. Musi wdrożyć rozwiązanie natychmiast
3. Widzi bezpośredni efekt nauki w działającym produkcie

Czytanie i kursy działają jako **uzupełnienie** — nie jako główna ścieżka. Główna ścieżka: **problem → budowanie → efekt → nowa wiedza**.

### Zasada nauki w Vantix
Każdy nowy moduł, każda integracja — to nie tylko deliverable, ale celowe poszerzenie kompetencji. Kacper dobiera projekty tak, żeby przy okazji budowania dowozić wiedzę której potrzebuje.

---

## Instrukcja dla Agenta — ranna lista zadań

Przed każdą sesją wieczorną przypomnij o:
1. Nieodpowiedzianych wiadomościach od klientów
2. Follow-upach leadów czekających >48h
3. Zadaniu edukacyjnym (Angielski)

**Alert krytyczny:** jeśli przez 3+ dni z rzędu brak wpisu logu sesji lub brak aktywności w CRM → generuj alert: *"Brak aktywności operacyjnej od X dni. Outreach i Angielski zaległe."*

Nie łagodź tonu alertów — Kacper preferuje bezpośrednią komunikację.
