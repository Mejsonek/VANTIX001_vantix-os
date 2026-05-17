'use client';

import { LayoutTemplate, Zap, Cpu } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BentoCardProps {
  id: string;
  tag: string;
  icon: React.ReactNode;
  title: React.ReactNode;
  description: string;
  num: string;
  className?: string;
  children?: React.ReactNode;
  badge?: string;
}

const BentoCard: React.FC<BentoCardProps> = ({ id, tag, icon, title, description, num, className, children, badge }) => (
  <article id={id} className={cn('bc group', className)} role="listitem">
    {badge && (
      <span className="absolute top-5 right-5 md:top-8 md:right-8 text-[0.48rem] md:text-[0.52rem] tracking-[0.2em] uppercase text-gold border-[0.5px] border-[rgba(212,175,55,0.2)] px-2.5 py-1 rounded-full font-normal">
        {badge}
      </span>
    )}
    <span className="inline-block mb-4 text-[0.54rem] tracking-[0.22em] uppercase text-gold border-[0.5px] border-[rgba(212,175,55,0.1)] px-2.5 py-1 rounded-full font-normal">
      {tag}
    </span>
    <div className="w-[38px] h-[38px] md:w-[42px] md:h-[42px] rounded-xl border-[0.5px] border-[rgba(212,175,55,0.22)] flex items-center justify-center text-gold mb-5 md:mb-7 transition-all duration-300 group-hover:bg-[rgba(212,175,55,0.08)] group-hover:border-gold">
      {icon}
    </div>
    <h3 className="font-serif font-normal text-[clamp(1.2rem,2vw,2.1rem)] text-ivory leading-[1.15] mb-3">
      {title}
    </h3>
    <p className="body-paragraph">
      {description}
    </p>
    {children}
    <div className="absolute bottom-4 right-5 md:bottom-5 md:right-7 font-serif text-[3.5rem] md:text-[4.5rem] font-bold text-[rgba(212,175,55,0.04)] leading-none pointer-events-none select-none transition-colors duration-400 group-hover:text-[rgba(212,175,55,0.08)]">
      {num}
    </div>
  </article>
);

export const Ekosystem: React.FC = () => (
  <section id="ekosystem" className="section bg-[rgba(2,2,2,0.55)] backdrop-blur-[4px]" aria-labelledby="eko-heading">
    <div className="section-container">
      <p className="section-pre">
        02 — THE VANTIX ENGINE
      </p>
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 md:gap-4">
        <h2 id="eko-heading" className="h2-section">
          Trzy moduły.<br /><em className="italic text-gold">Jeden silnik operacyjny.</em>
        </h2>
        <p className="hidden md:block meta-label pb-1.5">
          INDUSTRIAL-GRADE AI INFRASTRUCTURE
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mt-8 md:mt-14" id="bentoGrid" role="list">
        <BentoCard
          id="bc1"
          tag="V-INTELLIGENCE"
          icon={<Cpu size={18} />}
          title={<>Logika<br /><em className="italic text-gold">Decyzyjna</em></>}
          description="Mózg operacyjny oparty na Claude. Analizuje kontekst, filtruje intencje i podejmuje autonomiczne decyzje w oparciu o Twoją bazę wiedzy PostgreSQL. To nie jest skrypt — to architektura myślenia."
          num="01"
          className="md:col-span-7"
          badge="CLAUDE AI"
        >
          <ul className="list-none mt-5 md:mt-6">
            {['Przetwarzanie języka naturalnego (LLM)', 'Autonomiczne rozwiązywanie problemów', 'Logika warunkowa API-first'].map((item, i) => (
              <li key={i} className="flex items-center gap-2.5 py-2 body-paragraph border-b-[0.5px] border-[rgba(212,175,55,0.07)] last:border-none before:content-[''] before:w-3.5 before:h-[0.5px] before:bg-[rgba(212,175,55,0.45)] before:shrink-0">
                {item}
              </li>
            ))}
          </ul>
        </BentoCard>

        <BentoCard
          id="bc2"
          tag="V-RESPONSE"
          icon={<Zap size={18} />}
          title={<>Orkiestracja<br /><em className="italic text-gold">Procesów</em></>}
          description="Silnik wykonawczy n8n. Skraca czas reakcji do <1s. Łączy CRM, kalendarze i komunikatory w jeden, nieprzerwany przepływ danych. Skalowalność bez zwiększania headcount'u."
          num="02"
          className="md:col-span-5"
          badge="N8N ENGINE"
        />

        <BentoCard
          id="bc3"
          tag="V-CONTENT"
          icon={<LayoutTemplate size={18} />}
          title={<>Generowanie<br /><em className="italic text-gold">Wartości</em></>}
          description="Dynamiczne tworzenie ofert, raportów i treści w czasie rzeczywistym. Każdy punkt styku z klientem jest spersonalizowany i zoptymalizowany pod kątem konwersji i marży."
          num="03"
          className="md:col-span-12"
          badge="API-FIRST"
        />
      </div>
    </div>
  </section>
);

export default Ekosystem;
