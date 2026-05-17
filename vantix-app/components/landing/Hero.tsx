'use client';

import { ArrowRight, ChevronDown } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section
      id="hero"
      className="relative min-h-[100svh] flex items-center justify-center text-center section-hero section-container overflow-hidden after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[35%] after:z-0 after:bg-gradient-to-b after:from-transparent after:to-void after:pointer-events-none"
      aria-label="Sekcja główna VANTIX"
    >
      <div className="relative z-10 w-full max-w-[850px]">
        <p className="flex items-center justify-center gap-3 md:gap-4 text-[0.52rem] md:text-[0.58rem] tracking-[0.35em] md:tracking-[0.5em] uppercase font-light text-gold mb-6 md:mb-8 before:content-[''] before:w-4 md:before:w-6 before:h-[0.5px] before:bg-[rgba(212,175,55,0.35)] after:content-[''] after:w-4 md:after:w-6 after:h-[0.5px] after:bg-[rgba(212,175,55,0.35)]">
          VENDOR INFRASTRUKTURY AI · AUTOMATYZACJA
        </p>

        <h1 className="h1-hero mb-6 md:mb-8">
          Twój biznes działa.{' '}
          <span className="block italic bg-gradient-to-br from-[#C09020] via-[#E8CC5A] to-[#A07820] bg-clip-text text-transparent mt-2">
            Ty decydujesz.
          </span>
        </h1>

        <p className="section-desc mx-auto mb-8 md:mb-8">
          Automatyzujemy powtarzalne procesy, podpinamy AI tam gdzie ma sens. Mniej narzędzi, więcej wyników.
        </p>

        <ul className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 md:gap-8 mb-10 md:mb-12 meta-label">
          <li className="flex items-center gap-2"><div className="w-1 h-1 bg-gold rounded-full" />API-FIRST APPROACH</li>
          <li className="flex items-center gap-2"><div className="w-1 h-1 bg-gold rounded-full" />CLAUDE INTELLIGENCE®</li>
          <li className="flex items-center gap-2"><div className="w-1 h-1 bg-gold rounded-full" />N8N ORCHESTRATION</li>
        </ul>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#roi-terminal"
            className="btn-primary btn-pulse w-full sm:w-auto relative overflow-hidden group"
          >
            <span className="relative z-10">SPRAWDŹ JAK TO DZIAŁA →</span>
            <ArrowRight className="relative z-10 w-3.5 h-3.5 shrink-0" />
            <div className="absolute inset-0 bg-[rgba(255,255,255,0.16)] -translate-x-full transition-transform duration-400 group-hover:translate-x-0" />
          </a>
          <a
            href="#ekosystem"
            className="text-link"
          >
            <span>ZOBACZ SYSTEM ↓</span>
            <ChevronDown className="w-3 h-3" />
          </a>
        </div>
      </div>

      <div className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex-col items-center gap-[0.6rem]" aria-hidden="true">
        <div className="scroll-line w-[0.5px] h-[50px] bg-gradient-to-b from-[rgba(212,175,55,0.35)] to-transparent" />
        <p className="meta-xs [writing-mode:vertical-rl] rotate-180">Scroll</p>
      </div>
    </section>
  );
};

export default Hero;
