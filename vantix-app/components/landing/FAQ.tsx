'use client';

import { useState } from 'react';
import { ChevronDown, HelpCircle, Terminal } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const faqs = [
  {
    q: 'Dla kogo jest Vantix?',
    a: 'Dla firm i freelancerów którzy tracą czas na ręczne zadania — raporty, follow-upy, przepisywanie danych między narzędziami.',
  },
  {
    q: 'Ile to kosztuje?',
    a: 'Wycena indywidualna. Typowy projekt startuje od 3 000 PLN. Wypełnij formularz — odezwę się w ciągu 24h.',
  },
  {
    q: 'Jak długo trwa wdrożenie?',
    a: 'Najprostsze automatyzacje: 3-5 dni. Pełny system operacyjny: 2-4 tygodnie.',
  },
  {
    q: 'Czy muszę mieć wiedzę techniczną?',
    a: 'Zero. Dostajesz działający system z dokumentacją i wsparciem.',
  },
];

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section
      id="faq"
      className="section bg-neutral-950 border-t-[0.5px] border-neutral-800"
      aria-labelledby="faq-heading"
    >
      <div className="section-container">
        <p className="section-pre tracking-[0.42em] text-[0.58rem]">
          BAZA WIEDZY
        </p>
        <h2
          id="faq-heading"
          className="h2-section mb-10 md:mb-16"
        >
          Najczęstsze pytania
        </h2>

        <div className="max-w-[800px] mx-auto">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className={`group border-b border-neutral-800 transition-all duration-300 ${
                  isOpen ? 'border-amber-500/30' : 'hover:border-amber-500/30'
                }`}
              >
                <button
                  onClick={() => toggle(index)}
                  className="w-full flex items-center justify-between gap-4 py-5 md:py-6 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="flex items-center gap-3 md:gap-4">
                    <span className="hidden md:flex w-8 h-8 rounded-lg border border-neutral-800 items-center justify-center text-gold/30 group-hover:text-gold group-hover:border-gold/30 transition-all duration-300 shrink-0">
                      <HelpCircle size={14} />
                    </span>
                    <span className="text-sm md:text-base font-light text-ivory/80 group-hover:text-ivory transition-colors leading-snug">
                      {faq.q}
                    </span>
                  </span>
                  <ChevronDown
                    size={16}
                    className={`shrink-0 text-gold/40 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="pb-5 md:pb-6 pl-0 md:pl-12">
                        <div className="flex items-start gap-3">
                          <div className="hidden md:block w-0.5 h-full min-h-[20px] bg-gradient-to-b from-gold/20 to-transparent shrink-0 mt-1" />
                          <p className="body-paragraph">
                            {faq.a}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        <div className="mt-12 md:mt-16 text-center">
          <p className="text-[0.55rem] tracking-[0.3em] uppercase text-gold/30 font-mono mb-3 flex items-center justify-center gap-2">
            <Terminal size={12} /> MASZ INNE PYTANIE?
          </p>
          <a
            href="#roi-terminal"
            className="inline-flex items-center gap-2 text-[0.65rem] md:text-[0.68rem] tracking-[0.2em] uppercase font-light text-gold border-b border-gold/20 pb-0.5 transition-all duration-300 hover:border-gold hover:text-gold"
          >
            SKONTAKTUJ SIĘ →
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
