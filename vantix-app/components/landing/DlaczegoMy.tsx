'use client';

import { Target, Gauge, ShieldCheck, Clock, RefreshCw, Infinity as InfinityIcon } from 'lucide-react';

const items = [
  { icon: <Target size={15} />, title: 'Architektura Skalowalności', desc: 'Nie budujemy chatbotów. Budujemy infrastrukturę, która pozwala Twojej agencji rosnąć bez liniowego wzrostu kosztów operacyjnych.' },
  { icon: <Gauge size={15} />, title: 'Optymalizacja Marży', desc: 'Eliminujemy błąd ludzki i opóźnienia w procesach. Każda sekunda odebrana od czasu reakcji to bezpośredni wzrost Twojej marży netto.' },
  { icon: <ShieldCheck size={15} />, title: 'Logika Decyzyjna', desc: 'Nasze systemy nie tylko odpowiadają — rozumieją intencje i podejmują decyzje w oparciu o złożone zestawy danych i API.' },
  { icon: <Clock size={15} />, title: 'Wdrożenie Przemysłowe', desc: 'Używamy n8n i Claude do tworzenia stabilnych, produkcyjnych przepływów danych. Zero eksperymentów, czysta inżynieria.' },
  { icon: <RefreshCw size={15} />, title: 'Model White-Label', desc: 'Dostarczamy silnik, Ty dostarczasz relację. Idealne rozwiązanie dla agencji High-Ticket, które szukają technologicznej przewagi bez własnego R&D.' },
  { icon: <InfinityIcon size={15} />, title: 'API-First Approach', desc: 'Pełna integracja z Twoim obecnym tech-stackiem. PostgreSQL, n8n i dowolne API – łączymy kropki tam, gdzie inni widzą chaos.' },
];

export const DlaczegoMy: React.FC = () => (
  <section id="dlaczego" className="relative z-10 py-16 md:py-32 bg-[rgba(2,2,2,0.55)] backdrop-blur-[4px] border-t-[0.5px] border-[rgba(212,175,55,0.07)]" aria-labelledby="why-heading">
    <div className="max-w-[1280px] mx-auto px-5 md:px-10">
      <p className="flex items-center gap-3 text-[0.55rem] tracking-[0.38em] uppercase font-light text-gold mb-4 before:content-[''] before:w-5 before:h-[0.5px] before:bg-gold">
        03 — Dlaczego VANTIX
      </p>
      <h2 id="why-heading" className="font-serif font-normal text-[clamp(2rem,6vw,4.5rem)] leading-[1.08] text-ivory tracking-[0.005em] mb-8 md:mb-0">
        Jedyny logiczny wybór<br /><em className="italic text-gold">dla agencji High-Ticket.</em>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-[rgba(212,175,55,0.1)] border-[0.5px] border-[rgba(212,175,55,0.1)] rounded-2xl md:rounded-3xl overflow-hidden mt-8 md:mt-14" role="list">
        {items.map((item, i) => (
          <div key={i} className="group p-6 md:p-10 bg-[rgba(255,255,255,0.03)] backdrop-blur-[16px] transition-colors duration-300 hover:bg-[rgba(212,175,55,0.025)] relative after:content-[''] after:absolute after:top-0 after:left-0 after:right-0 after:h-[0.5px] after:bg-gradient-to-r after:from-transparent after:via-[rgba(212,175,55,0.35)] after:to-transparent after:scale-x-0 after:origin-center after:transition-transform after:duration-500 hover:after:scale-x-100" role="listitem">
            <div className="w-9 h-9 rounded-lg border-[0.5px] border-[rgba(212,175,55,0.2)] flex items-center justify-center text-gold mb-5 transition-all duration-300 group-hover:bg-[rgba(212,175,55,0.07)] group-hover:border-gold">
              {item.icon}
            </div>
            <h3 className="font-serif font-normal text-[1.05rem] md:text-[1.15rem] text-ivory leading-[1.25] mb-2 md:mb-3">{item.title}</h3>
            <p className="text-[0.73rem] md:text-[0.75rem] leading-[1.8] text-[rgba(245,244,240,0.35)] font-light">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default DlaczegoMy;
