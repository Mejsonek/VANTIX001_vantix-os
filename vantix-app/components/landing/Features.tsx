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
      <span className="absolute top-8 right-8 text-[0.52rem] tracking-[0.2em] uppercase text-gold border-[0.5px] border-[rgba(212,175,55,0.2)] px-3 py-1 rounded-full font-normal">
        {badge}
      </span>
    )}
    <span className="inline-block mb-4 text-[0.54rem] tracking-[0.22em] uppercase text-gold border-[0.5px] border-[rgba(212,175,55,0.1)] px-2.5 py-1 rounded-full font-normal">
      {tag}
    </span>
    <div className="w-[42px] h-[42px] rounded-xl border-[0.5px] border-[rgba(212,175,55,0.22)] flex items-center justify-center text-gold mb-7 transition-all duration-300 group-hover:bg-[rgba(212,175,55,0.08)] group-hover:border-gold">
      {icon}
    </div>
    <h3 className="font-serif font-normal text-[clamp(1.3rem,2vw,2.1rem)] text-ivory leading-[1.15] mb-3.5">
      {title}
    </h3>
    <p className="text-[0.78rem] leading-[1.85] text-[rgba(245,244,240,0.35)] font-light tracking-[0.025em]">
      {description}
    </p>
    {children}
    <div className="absolute bottom-5 right-7 font-serif text-[4.5rem] font-bold text-[rgba(212,175,55,0.04)] leading-none pointer-events-none select-none transition-colors duration-400 group-hover:text-[rgba(212,175,55,0.08)]">
      {num}
    </div>
  </article>
);

export const Ekosystem: React.FC = () => (
  <section id="ekosystem" className="relative z-10 py-32 bg-[rgba(2,2,2,0.55)] backdrop-blur-[4px]" aria-labelledby="eko-heading">
    <div className="max-w-[1280px] mx-auto px-10">
      <p className="flex items-center gap-3.5 text-[0.58rem] tracking-[0.42em] uppercase font-light text-gold mb-5 before:content-[''] before:w-[26px] before:h-[0.5px] before:bg-gold">
        02 — THE VANTIX ENGINE
      </p>
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <h2 id="eko-heading" className="font-serif font-normal text-[clamp(2.2rem,4vw,4.5rem)] leading-[1.08] text-ivory tracking-[0.005em]">
          Trzy moduły.<br /><em className="italic text-gold">Jeden silnik operacyjny.</em>
        </h2>
        <p className="text-[0.65rem] tracking-[0.22em] uppercase text-[rgba(245,244,240,0.18)] font-light pb-1.5">
          INDUSTRIAL-GRADE AI INFRASTRUCTURE
        </p>
      </div>

      <div className="grid grid-cols-12 gap-4 mt-14" id="bentoGrid" role="list">
        <BentoCard
          id="bc1"
          tag="V-INTELLIGENCE"
          icon={<Cpu size={18} />}
          title={<>Logika<br /><em className="italic text-gold">Decyzyjna</em></>}
          description="Mózg operacyjny oparty na Claude. Analizuje kontekst, filtruje intencje i podejmuje autonomiczne decyzje w oparciu o Twoją bazę wiedzy PostgreSQL. To nie jest skrypt — to architektura myślenia."
          num="01"
          className="col-span-12 lg:col-span-7"
          badge="CLAUDE AI"
        >
          <ul className="list-none mt-6">
            {['Przetwarzanie języka naturalnego (LLM)', 'Autonomiczne rozwiązywanie problemów', 'Logika warunkowa API-first'].map((item, i) => (
              <li key={i} className="flex items-center gap-2.5 py-2 text-[0.72rem] font-light tracking-[0.06em] text-[rgba(245,244,240,0.35)] border-b-[0.5px] border-[rgba(212,175,55,0.07)] last:border-none before:content-[''] before:w-3.5 before:h-[0.5px] before:bg-[rgba(212,175,55,0.45)]">
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
          className="col-span-12 lg:col-span-5"
          badge="N8N ENGINE"
        />

        <BentoCard
          id="bc3"
          tag="V-CONTENT"
          icon={<LayoutTemplate size={18} />}
          title={<>Generowanie<br /><em className="italic text-gold">Wartości</em></>}
          description="Dynamiczne tworzenie ofert, raportów i treści w czasie rzeczywistym. Każdy punkt styku z klientem jest spersonalizowany i zoptymalizowany pod kątem konwersji i marży."
          num="03"
          className="col-span-12"
          badge="API-FIRST"
        />
      </div>
    </div>
  </section>
);

export default Ekosystem;
