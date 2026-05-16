# evolution_policy.md — Polityka Ewolucji Systemu

> Zasady według których AI może proponować zmiany w systemie. Nienaruszalne — AI proponuje, Kacper decyduje.

---

## Zasada Fundamentalna

> **AI explores, Owner decides.**

RAG-matka i mini-RAGi mogą analizować, oceniać i proponować. Żadna zmiana rdzenia systemu nie wdrażana jest automatycznie. Każda propozycja wymaga świadomej akceptacji Kacpra.

---

## Co może być ewoluowane

| Obszar | Może proponować AI | Wymaga akceptacji |
|--------|-------------------|-------------------|
| Zasady architektoniczne | ❌ Nie | — |
| Zasady kodowania | ❌ Nie | — |
| Stack techniczny | ✅ Tak | Kacper |
| Struktura modułów | ✅ Tak | Kacper |
| Nowe integracje | ✅ Tak | Kacper |
| Prompty systemowe | ✅ Tak | Kacper |
| Pliki VANTIXRAG (treść) | ✅ Tak | Kacper |
| Pricing / model płatności | ✅ Tak | Kacper |
| Reguły CRM / workflow | ✅ Tak | Kacper |
| `CLAUDE.md` | ❌ Nie — tylko Kacper | — |
| `master_rules.md` | ❌ Nie — tylko Kacper | — |

---

## Proces składania propozycji

### Kiedy AI składa propozycję
- Gdy wykryje powtarzający się problem operacyjny
- Gdy zauważy niespójność między zasadami a praktyką
- Gdy trafi na lepsze rozwiązanie architektoniczne
- Gdy obecne podejście blokuje skalowanie

### Format propozycji (EVO)

Każda propozycja zapisywana jest w:
```
08_EVOLUTION/proposals/YYYY-MM-DD_[opis].md
```

Struktura pliku propozycji:
```markdown
# EVO: [Krótki tytuł]

**Data:** YYYY-MM-DD
**Zgłoszone przez:** [Agent / moduł]
**Priorytet:** Niski / Średni / Wysoki / Krytyczny

## Problem
[Co nie działa lub co można ulepszyć]

## Propozycja
[Konkretne rozwiązanie]

## Uzasadnienie
[Dlaczego to lepsze od obecnego stanu]

## Ryzyko
[Co może pójść nie tak]

## Wymagane zasoby
[Czas, kod, decyzje]

## Status
[ ] Oczekuje na decyzję
[ ] Zaakceptowana → przeniesiona do `08_EVOLUTION/approved/`
[ ] Odrzucona → przeniesiona do `08_EVOLUTION/rejected/` z komentarzem
```

---

## Ścieżka decyzyjna

```
AI wykrywa problem / okazję
        ↓
Tworzy plik EVO w 08_EVOLUTION/proposals/
        ↓
Informuje Kacpra (w ramach sesji lub jako alert)
        ↓
Kacper: AKCEPTUJE → plik → approved/ → wdrożenie
        lub
Kacper: ODRZUCA  → plik → rejected/ + komentarz dlaczego
```

---

## Zasady składania propozycji

1. **Jedna propozycja = jeden plik** — nie łącz kilku zmian w jedną EVO
2. **Propozycja musi zawierać ryzyko** — jeśli nie potrafisz określić ryzyka, nie składaj propozycji
3. **Nie nalegaj** — jeśli Kacper odrzucił propozycję, nie wracaj do niej bez nowego kontekstu
4. **Priorytet = wpływ na cel** — propozycje które zbliżają do 80k PLN/rok mają wyższy priorytet
5. **Nie modyfikuj zatwierdzonej propozycji** — po akceptacji zmiany idą przez normalny flow

---

## Czego AI nie robi nigdy

- Nie wdraża zmian bez akceptacji
- Nie modyfikuje `CLAUDE.md`, `master_rules.md` bez zgody
- Nie zmienia zasad architektonicznych nawet jeśli "byłoby szybciej"
- Nie ignoruje odrzuconych propozycji i nie próbuje ich przepchnąć inną drogą
- Nie tworzy EVO dla rzeczy które są w toku realizacji — tylko dla zmian systemowych
