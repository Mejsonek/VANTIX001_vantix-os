'use client';

import { motion } from 'motion/react';
import { Handshake, Shield, Rocket, ArrowRight } from 'lucide-react';

const features = [
  { icon: <Handshake className="text-gold" size={20} />, title: 'Model Partnerski', desc: 'Ty zarządzasz relacją z klientem i strategią. My dostarczamy, wdrażamy i utrzymujemy całą infrastrukturę AI pod Twoją marką.' },
  { icon: <Shield className="text-gold" size={20} />, title: 'Gwarancja Stabilności', desc: 'Dostarczamy systemy klasy przemysłowej. Twoi klienci otrzymują niezawodne rozwiązania, a Ty budujesz autorytet technologiczny.' },
  { icon: <Rocket className="text-gold" size={20} />, title: 'Skalowanie Marży', desc: 'Zwiększ wartość swoich kontraktów bez zatrudniania armii deweloperów. Nasz silnik to Twój nowy atut w ofercie.' },
];

export const WhiteLabel: React.FC = () => (
  <section id="white-label" className="relative z-10 py-32 bg-void overflow-hidden">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1400px] h-full pointer-events-none">
      <div className="absolute top-1/4 -left-20 w-[400px] h-[400px] bg-gold/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 -right-20 w-[400px] h-[400px] bg-gold/5 rounded-full blur-[120px]" />
    </div>

    <div className="max-w-[1280px] mx-auto px-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <p className="flex items-center gap-3.5 text-[0.58rem] tracking-[0.42em] uppercase font-light text-gold mb-5 before:content-[''] before:w-[26px] before:h-[0.5px] before:bg-gold">
            04 — White-Label Partner
          </p>
          <h2 className="font-serif font-normal text-[clamp(2.2rem,4vw,4.5rem)] leading-[1.08] text-ivory tracking-[0.005em] mb-8">
            Ty sprzedajesz.<br /><em className="italic text-gold">My dostarczamy silnik.</em>
          </h2>
          <p className="text-[0.95rem] leading-[1.8] text-[rgba(245,244,240,0.45)] font-light tracking-wide mb-10 max-w-[500px]">
            Jesteśmy technologicznym zapleczem dla agencji, które chcą oferować automatyzację AI najwyższej klasy — bez budowania własnego działu R&D.
          </p>
          <div className="space-y-8">
            {features.map((f, i) => (
              <div key={i} className="flex gap-6">
                <div className="mt-1 w-10 h-10 shrink-0 rounded-xl bg-gold/5 border border-gold/10 flex items-center justify-center">{f.icon}</div>
                <div>
                  <h3 className="text-ivory font-serif text-lg mb-2">{f.title}</h3>
                  <p className="text-[0.8rem] leading-relaxed text-[rgba(245,244,240,0.35)] font-light">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="relative">
          <div className="aspect-square rounded-3xl bg-gradient-to-br from-[rgba(212,175,55,0.05)] to-transparent border border-[rgba(212,175,55,0.1)] p-1 flex items-center justify-center overflow-hidden">
            <div className="relative z-10 text-center p-12">
              <div className="inline-block mb-6 p-4 rounded-2xl bg-gold/10 border border-gold/20 text-gold">
                <Handshake size={48} strokeWidth={1} />
              </div>
              <h3 className="font-serif text-3xl text-ivory mb-4 tracking-tight">Gotowy na partnerstwo?</h3>
              <p className="text-sm text-ivory/40 font-light mb-8 max-w-[300px] mx-auto">
                Dołącz do grona agencji, które budują przewagę rynkową na fundamencie Vantix. Twoja marka, nasza technologia.
              </p>
              <button
                onClick={() => document.getElementById('kontakt')?.scrollIntoView({ behavior: 'smooth' })}
                className="flex items-center gap-3 mx-auto text-[0.6rem] tracking-[0.3em] uppercase font-normal text-gold border border-gold/30 px-8 py-4 rounded-xl transition-all duration-300 hover:bg-gold hover:text-void hover:border-gold group"
              >
                <span>ZOSTAŃ PARTNEREM →</span>
                <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </div>
          <div className="absolute -top-6 -right-6 w-24 h-24 border-t border-r border-gold/20 rounded-tr-3xl" />
          <div className="absolute -bottom-6 -left-6 w-24 h-24 border-b border-l border-gold/20 rounded-bl-3xl" />
        </motion.div>
      </div>
    </div>
  </section>
);

export default WhiteLabel;
