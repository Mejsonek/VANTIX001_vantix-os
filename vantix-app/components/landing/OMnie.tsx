'use client';

import { motion } from 'motion/react';

export const OMnie: React.FC = () => (
  <section id="omnie" className="relative z-10 py-32 bg-void overflow-hidden border-t-[0.5px] border-[rgba(212,175,55,0.07)]">
    <div className="max-w-[1280px] mx-auto px-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* Visual */}
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative aspect-[4/5] max-w-[500px] mx-auto lg:mx-0 w-full rounded-3xl overflow-hidden border border-[rgba(212,175,55,0.15)] bg-[rgba(2,2,2,1)] group">
          <div className="absolute inset-0 bg-gradient-to-t from-void via-void/40 to-transparent z-10" />
          <div className="absolute inset-0 flex items-center justify-center bg-[rgba(212,175,55,0.03)]">
            <div className="text-center">
              <div className="w-24 h-24 rounded-full border border-[rgba(212,175,55,0.2)] flex items-center justify-center mx-auto mb-4 bg-gold/5">
                <span className="font-serif text-3xl text-gold/60">KZ</span>
              </div>
              <p className="text-[0.55rem] tracking-[0.35em] uppercase text-[rgba(212,175,55,0.3)]">Architekt Systemu</p>
            </div>
          </div>
          <div className="absolute bottom-8 left-8 z-20">
            <p className="text-gold text-[0.6rem] tracking-[0.3em] uppercase mb-2">Główny Architekt</p>
            <p className="font-serif text-2xl text-ivory">Kacper Zdżałka</p>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <p className="flex items-center gap-3.5 text-[0.58rem] tracking-[0.42em] uppercase font-light text-gold mb-5 before:content-[''] before:w-[26px] before:h-[0.5px] before:bg-gold">
            O Mnie
          </p>
          <h2 className="font-serif font-normal text-[clamp(2rem,3.5vw,3.5rem)] leading-[1.1] text-ivory tracking-[0.005em] mb-8">
            Nie jestem marketerem.<br /><em className="italic text-gold">Jestem inżynierem procesów.</em>
          </h2>
          <div className="space-y-6 text-[0.9rem] leading-[1.8] text-[rgba(245,244,240,0.5)] font-light tracking-wide">
            <p>
              Przez lata obserwowałem, jak firmy przepalają potężne budżety na marketing, tylko po to, by tracić wygenerowane leady przez chaos operacyjny, brak czasu i opóźnione odpowiedzi.
            </p>
            <p>
              Większość agencji próbuje rozwiązać ten problem, dokładając kolejne narzędzia, panele i obowiązki do Twojego zespołu. To droga donikąd.
            </p>
            <p className="text-ivory font-bold">
              Zbudowałem VANTIX z jednym założeniem: technologia ma pracować za Ciebie, a nie wymagać Twojej uwagi.
            </p>
            <p>
              Projektuję architekturę, która przejmuje komunikację, kwalifikację i sprzedaż. Wdrażam systemy operacyjne oparte na n8n i sztucznej inteligencji, które działają w tle, 24/7, z precyzją, której nie osiągnie żaden człowiek.
            </p>
            <p className="italic text-gold pt-4">
              Moim celem nie jest ułatwienie Ci pracy. Moim celem jest całkowite usunięcie Cię z procesów, które nie wymagają Twojej specjalistycznej wiedzy — abyś mógł skupić się na skalowaniu biznesu.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default OMnie;
