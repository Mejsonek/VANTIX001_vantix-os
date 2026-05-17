'use client';

import { motion } from 'motion/react';
import { Terminal, Code2, Database, Workflow } from 'lucide-react';

const techStack = [
  { icon: <Workflow className="text-gold" size={22} />, name: 'n8n', role: 'ORKIESTRACJA PROCESÓW', desc: 'Przemysłowy silnik automatyzacji. Łączy wszystkie systemy w jeden nieprzerwany krwioobieg danych. Zero opóźnień, pełna skalowalność.' },
  { icon: <Terminal className="text-gold" size={22} />, name: 'Claude Sonnet', role: 'LOGIKA DECYZYJNA', desc: 'Najbardziej zaawansowany model LLM do zadań inżynieryjnych. Odpowiada za analizę intencji, filtrowanie leadów i generowanie odpowiedzi.' },
  { icon: <Database className="text-gold" size={22} />, name: 'PostgreSQL + pgvector', role: 'PAMIĘĆ DŁUGOTRWAŁA', desc: 'Relacyjna baza danych rozszerzona o wyszukiwanie wektorowe. System pamięta każdego klienta, każdą interakcję i cały kontekst biznesowy.' },
  { icon: <Code2 className="text-gold" size={22} />, name: 'API-First', role: 'ARCHITEKTURA INTEGRACJI', desc: 'Natywne połączenia z CRM, kalendarzami i komunikatorami (WhatsApp, Messenger, IG). Bez pośredników — maksymalna przepustowość.' },
];

export const PodMaska: React.FC = () => (
  <section id="podmaska" className="section bg-[rgba(2,2,2,0.55)] backdrop-blur-[4px] border-t-[0.5px] border-[rgba(212,175,55,0.07)]">
    <div className="section-container">
      <div className="text-center mb-10 md:mb-20">
        <p className="section-pre justify-center before:content-[''] after:content-[''] after:w-5 after:h-[0.5px] after:bg-gold">
          Tech-Stack
        </p>
        <h2 className="h2-section">
          Pod maską.<br /><em className="italic text-gold">Przemysłowa infrastruktura.</em>
        </h2>
        <p className="section-desc mx-auto mt-5 md:mt-6">
          Nie używamy zabawek no-code dla początkujących. Budujemy na sprawdzonym, skalowalnym stosie technologicznym, który wytrzyma obciążenie klasy enterprise.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {techStack.map((tech, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="group p-6 md:p-10 bg-[rgba(255,255,255,0.02)] border border-[rgba(212,175,55,0.1)] rounded-2xl md:rounded-3xl hover:bg-[rgba(212,175,55,0.02)] transition-colors duration-500">
            <div className="flex items-start justify-between mb-5 md:mb-6 gap-3">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gold/5 border border-gold/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-500">
                {tech.icon}
              </div>
              <span className="text-[0.48rem] md:text-[0.55rem] tracking-[0.18em] uppercase text-gold/50 border border-gold/10 px-2.5 py-1 rounded-full text-right leading-tight">{tech.role}</span>
            </div>
            <h3 className="h3-section mb-2 md:mb-3">{tech.name}</h3>
            <p className="body-paragraph">{tech.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default PodMaska;
