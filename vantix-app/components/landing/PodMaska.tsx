'use client';

import { motion } from 'motion/react';
import { Terminal, Code2, Database, Workflow } from 'lucide-react';

const techStack = [
  { icon: <Workflow className="text-gold" size={24} />, name: 'n8n', role: 'ORKIESTRACJA PROCESÓW', desc: 'Przemysłowy silnik automatyzacji. Łączy wszystkie systemy w jeden nieprzerwany krwioobieg danych. Zero opóźnień, pełna skalowalność.' },
  { icon: <Terminal className="text-gold" size={24} />, name: 'Claude Sonnet', role: 'LOGIKA DECYZYJNA', desc: 'Najbardziej zaawansowany model LLM do zadań inżynieryjnych. Odpowiada za analizę intencji, filtrowanie leadów i generowanie odpowiedzi.' },
  { icon: <Database className="text-gold" size={24} />, name: 'PostgreSQL + pgvector', role: 'PAMIĘĆ DŁUGOTRWAŁA', desc: 'Relacyjna baza danych rozszerzona o wyszukiwanie wektorowe. System pamięta każdego klienta, każdą interakcję i cały kontekst biznesowy.' },
  { icon: <Code2 className="text-gold" size={24} />, name: 'API-First', role: 'ARCHITEKTURA INTEGRACJI', desc: 'Natywne połączenia z CRM, kalendarzami i komunikatorami (WhatsApp, Messenger, IG). Bez pośredników — maksymalna przepustowość.' },
];

export const PodMaska: React.FC = () => (
  <section id="podmaska" className="relative z-10 py-32 bg-[rgba(2,2,2,0.55)] backdrop-blur-[4px] border-t-[0.5px] border-[rgba(212,175,55,0.07)]">
    <div className="max-w-[1280px] mx-auto px-10">
      <div className="text-center mb-20">
        <p className="flex items-center justify-center gap-3.5 text-[0.58rem] tracking-[0.42em] uppercase font-light text-gold mb-5 before:content-[''] before:w-[26px] before:h-[0.5px] before:bg-gold after:content-[''] after:w-[26px] after:h-[0.5px] after:bg-gold">
          Tech-Stack
        </p>
        <h2 className="font-serif font-normal text-[clamp(2.2rem,4vw,4.5rem)] leading-[1.08] text-ivory tracking-[0.005em]">
          Pod maską.<br /><em className="italic text-gold">Przemysłowa infrastruktura.</em>
        </h2>
        <p className="text-[0.9rem] leading-[1.8] text-[rgba(245,244,240,0.45)] font-light tracking-wide mt-6 max-w-[600px] mx-auto">
          Nie używamy zabawek no-code dla początkujących. Budujemy na sprawdzonym, skalowalnym stosie technologicznym, który wytrzyma obciążenie klasy enterprise.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {techStack.map((tech, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="group p-8 md:p-10 bg-[rgba(255,255,255,0.02)] border border-[rgba(212,175,55,0.1)] rounded-3xl hover:bg-[rgba(212,175,55,0.02)] transition-colors duration-500">
            <div className="flex items-start justify-between mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gold/5 border border-gold/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                {tech.icon}
              </div>
              <span className="text-[0.55rem] tracking-[0.2em] uppercase text-gold/50 border border-gold/10 px-3 py-1 rounded-full">{tech.role}</span>
            </div>
            <h3 className="font-serif text-2xl text-ivory mb-3">{tech.name}</h3>
            <p className="text-[0.85rem] leading-relaxed text-[rgba(245,244,240,0.4)] font-light">{tech.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default PodMaska;
