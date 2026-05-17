'use client';

import { ArrowRight, ChevronDown } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section
      id="hero"
      className="relative min-h-[100svh] flex items-center justify-center text-center px-5 md:px-8 pt-28 md:pt-36 pb-16 md:pb-20 overflow-hidden after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[35%] after:z-0 after:bg-gradient-to-b after:from-transparent after:to-void after:pointer-events-none"
      aria-label="Sekcja główna VANTIX"
    >
      <div className="relative z-10 w-full max-w-[850px]">
        <p className="flex items-center justify-center gap-3 md:gap-4 text-[0.52rem] md:text-[0.58rem] tracking-[0.35em] md:tracking-[0.5em] uppercase font-light text-gold mb-6 md:mb-8 before:content-[''] before:w-4 md:before:w-6 before:h-[0.5px] before:bg-[rgba(212,175,55,0.35)] after:content-[''] after:w-4 md:after:w-6 after:h-[0.5px] after:bg-[rgba(212,175,55,0.35)]">
          VENDOR INFRASTRUKTURY AI · AUTOMATYZACJA
        </p>

        <h1 className="font-serif text-[clamp(2rem,8vw,5.5rem)] font-bold leading-[1.1] tracking-[-0.015em] text-ivory mb-6 md:mb-8">
          Skalowalność bez chaosu.{' '}
          <span className="block italic bg-gradient-to-br from-[#C09020] via-[#E8CC5A] to-[#A07820] bg-clip-text text-transparent mt-2">
            Budujemy systemy operacyjne dla nowoczesnego biznesu.
          </span>
        </h1>

        <p className="text-[0.88rem] md:text-[clamp(0.85rem,1.4vw,1.05rem)] font-light text-[rgba(245,244,240,0.55)] leading-[1.8] tracking-[0.02em] max-w-[600px] mx-auto mb-8 md:mb-8">
          Eliminujemy wąskie gardła w przepływie danych. Projektujemy architekturę, która przejmuje logikę decyzyjną i optymalizuje marżę w czasie rzeczywistym.
        </p>

        <ul className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 md:gap-8 mb-10 md:mb-12 text-[0.6rem] md:text-[0.65rem] tracking-[0.15em] uppercase text-ivory font-light">
          <li className="flex items-center gap-2"><div className="w-1 h-1 bg-gold rounded-full" />API-FIRST APPROACH</li>
          <li className="flex items-center gap-2"><div className="w-1 h-1 bg-gold rounded-full" />CLAUDE INTELLIGENCE®</li>
          <li className="flex items-center gap-2"><div className="w-1 h-1 bg-gold rounded-full" />N8N ORCHESTRATION</li>
        </ul>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#kontakt"
            className="btn-pulse w-full sm:w-auto inline-flex items-center justify-center gap-[0.65rem] text-[0.65rem] md:text-[0.68rem] tracking-[0.2em] md:tracking-[0.22em] uppercase font-normal text-void bg-gold px-7 md:px-10 py-4 md:py-[1.1rem] rounded-lg relative overflow-hidden transition-all duration-300 hover:shadow-[0_0_50px_rgba(212,175,55,0.55)] group"
          >
            <span className="relative z-10">SPRAWDŹ, ILE TRACISZ →</span>
            <ArrowRight className="relative z-10 w-3.5 h-3.5 shrink-0" />
            <div className="absolute inset-0 bg-[rgba(255,255,255,0.16)] -translate-x-full transition-transform duration-400 group-hover:translate-x-0" />
          </a>
          <a
            href="#ekosystem"
            className="inline-flex items-center gap-2 text-[0.6rem] md:text-[0.63rem] tracking-[0.2em] uppercase font-light text-[rgba(245,244,240,0.35)] border-b-[0.5px] border-[rgba(245,244,240,0.18)] pb-0.5 transition-all duration-300 hover:text-gold hover:border-[rgba(212,175,55,0.2)]"
          >
            <span>ZOBACZ SYSTEM ↓</span>
            <ChevronDown className="w-3 h-3" />
          </a>
        </div>
      </div>

      <div className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex-col items-center gap-[0.6rem]" aria-hidden="true">
        <div className="scroll-line w-[0.5px] h-[50px] bg-gradient-to-b from-[rgba(212,175,55,0.35)] to-transparent" />
        <p className="text-[0.5rem] tracking-[0.38em] uppercase text-[rgba(245,244,240,0.18)] [writing-mode:vertical-rl] rotate-180">Scroll</p>
      </div>
    </section>
  );
};

export default Hero;
