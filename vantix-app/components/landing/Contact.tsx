"use client";

export default function About() {
  // About/Why section — Problem, Solution, Why Vantix
  return (
  return (
    <section id="about" className="py-20 px-4 bg-neutral-950">
      <div className="max-w-4xl mx-auto">
        <div className="space-y-12">
          {/* Problem */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-6">
              Problem: Chaos operacyjny
            </h2>
            <div className="space-y-4 text-neutral-300">
              <p>
                Jak soloprzedsiębiorca, zarządzasz kilkoma narzędziami naraz:
              </p>
              <ul className="space-y-2 pl-4 border-l border-yellow-600/30">
                <li>• CRM dla leadów (Notion? Airtable? Spreadsheet?)</li>
                <li>• Calendar dla spotkań (Google Calendar?)</li>
                <li>• Taski (Todoist? Asana? Pen & paper?)</li>
                <li>• Projekty developerskie (GitHub? Confluence?)</li>
                <li>• Wiedza i decyzje (rozmieszczone po kilku miejscach)</li>
              </ul>
              <p className="pt-4">
                <strong>Rezultat:</strong> Pół dnia tracisz na przełączanie się między systemami. 
                Kontekst ginie. Decyzje są powolne. Nie wiesz gdzie masz co.
              </p>
            </div>
          </div>

          {/* Solution */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-6">
              Rozwiązanie: Jedno centrum sterowania
            </h2>
            <div className="space-y-4 text-neutral-300">
              <p>
                <strong>Vantix OS</strong> to system operacyjny dla twojej firmy.
              </p>
              <p>
                Wchodzisz do systemu, widzisz natychmiast:
              </p>
              <ul className="space-y-2 pl-4 border-l border-yellow-600/30">
                <li>✓ Co jest najważniejsze dzisiaj (Personal Cockpit)</li>
                <li>✓ Stan leadów i pipeline (CRM)</li>
                <li>✓ Postęp projektów (Vantix DEV)</li>
                <li>✓ Co proponuje AI (VANTIXRAG Intelligence)</li>
                <li>✓ Co powinno się automatyzować (Workflows)</li>
              </ul>
              <p className="pt-4">
                Wszystko jest powiązane. Baza danych jest source of truth. 
                AI pamięta kontekst między sesjami. Decyzje są szybsze.
              </p>
            </div>
          </div>

          {/* Why Vantix */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-6">
              Dlaczego Vantix?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 border border-yellow-600/20 rounded-lg bg-yellow-600/5">
                <h3 className="font-semibold text-yellow-600 mb-2">Dla soloprzedsiębiorcy</h3>
                <p className="text-sm text-neutral-300">
                  Jeden system zamiast dziesięciu. Mniej switch-kontekstu. 
                  Wiecej czasu na to co ważne.
                </p>
              </div>
              <div className="p-4 border border-yellow-600/20 rounded-lg bg-yellow-600/5">
                <h3 className="font-semibold text-yellow-600 mb-2">Dla agencji / zespołu</h3>
                <p className="text-sm text-neutral-300">
                  Zaproszenie innych do systemu, prawa dostępu, 
                  wspólna pamięć projektu.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
