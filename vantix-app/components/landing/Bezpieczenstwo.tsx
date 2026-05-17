'use client';

import { motion } from 'motion/react';
import { Shield, CheckCircle, Eye, Lock } from 'lucide-react';

const securityCards = [
  { icon: <Shield className="text-gold" size={22} />, tag: 'DATA SANDBOXING', title: 'Izolacja Danych', desc: 'Twoje dane są Twoje. Korzystamy z izolowanych instancji API, co oznacza, że Twoje bazy klientów i know-how nigdy nie są wykorzystywane do trenowania publicznych modeli AI. Pełna prywatność Twojej przewagi rynkowej.' },
  { icon: <CheckCircle className="text-gold" size={22} />, tag: 'ANTI-HALLUCINATION', title: 'Bezpiecznik Prawdy', desc: 'Algorytmy weryfikacji krzyżowej. Każdy lead jest sprawdzany przez dwa niezależne procesy AI, zanim trafi do Twojej akceptacji. To eliminuje halucynacje modeli i gwarantuje fakty, a nie domysły.' },
  { icon: <Eye className="text-gold" size={22} />, tag: 'AUDIT TRAIL', title: 'Pełna Historia Logiki', desc: 'n8n rejestruje każdą operację. W dowolnym momencie możesz sprawdzić, dlaczego system ocenił dany kontakt jako wysoki priorytet. Zero czarnych skrzynek — pełna transparentność procesów.' },
  { icon: <Lock className="text-gold" size={22} />, tag: 'HUMAN-IN-LOOP', title: 'Ochrona Wizerunku', desc: 'System nigdy nie wyśle wiadomości samodzielnie. Ty jesteś ostatnim filtrem. Dzięki temu masz pewność, że każda interakcja z klientem zachowuje Twój unikalny ton głosu i standardy jakości.' },
];

export const Bezpieczenstwo: React.FC = () => (
  <section id="bezpieczenstwo" className="section bg-void border-t-[0.5px] border-[rgba(212,175,55,0.07)]">
    <div className="section-container">
      <div className="text-center mb-10 md:mb-20">
        <p className="section-pre justify-center before:content-[''] after:content-[''] after:w-5 after:h-[0.5px] after:bg-gold">
          05 — PROTOKÓŁ BEZPIECZEŃSTWA
        </p>
        <h2 className="h2-section">
          Twoje dane.<br /><em className="italic text-gold">Twoje zasady.</em>
        </h2>
        <p className="section-desc mx-auto mt-5 md:mt-6">
          Budujemy systemy, którym możesz zaufać. Bezpieczeństwo nie jest dodatkiem — to fundament architektury.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {securityCards.map((card, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="group p-6 md:p-10 bg-black/40 border border-yellow-900/30 rounded-2xl md:rounded-3xl hover:border-gold/40 transition-all duration-500">
            <div className="flex items-start justify-between mb-5 md:mb-6 gap-3">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gold/5 border border-gold/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-500">
                {card.icon}
              </div>
              <span className="text-[0.45rem] md:text-[0.5rem] tracking-[0.15em] uppercase text-gold/40 border border-gold/10 px-2.5 py-1 rounded-full text-right leading-tight">{card.tag}</span>
            </div>
            <h3 className="h3-section mb-3 md:mb-4">{card.title}</h3>
            <p className="body-paragraph">{card.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Bezpieczenstwo;
