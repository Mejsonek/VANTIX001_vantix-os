'use client';

import { motion } from 'motion/react';
import { Shield, CheckCircle, Eye, Lock } from 'lucide-react';

const securityCards = [
  { icon: <Shield className="text-gold" size={24} />, tag: 'DATA SANDBOXING / IZOLACJA', title: 'Izolacja Danych', desc: 'Twoje dane są Twoje. Korzystamy z izolowanych instancji API, co oznacza, że Twoje bazy klientów i know-how nigdy nie są wykorzystywane do trenowania publicznych modeli AI. Pełna prywatność Twojej przewagi rynkowej.' },
  { icon: <CheckCircle className="text-gold" size={24} />, tag: 'ANTI-HALLUCINATION / WERYFIKACJA', title: 'Bezpiecznik Prawdy', desc: 'Algorytmy weryfikacji krzyżowej. Każdy lead jest sprawdzany przez dwa niezależne procesy AI, zanim trafi do Twojej akceptacji. To eliminuje halucynacje modeli i gwarantuje, że dane które widzisz na Telegramie, są faktami, a nie domysłami.' },
  { icon: <Eye className="text-gold" size={24} />, tag: 'AUDIT TRAIL / TRANSPARENTNOŚĆ', title: 'Pełna Historia Logiki', desc: 'n8n rejestruje każdą operację. W dowolnym momencie możesz sprawdzić, dlaczego system ocenił dany kontakt jako wysoki priorytet. Zero czarnych skrzynek — pełna transparentność procesów.' },
  { icon: <Lock className="text-gold" size={24} />, tag: 'BRAND SHIELD / HUMAN-IN-LOOP', title: 'Ochrona Wizerunku', desc: 'System nigdy nie wyśle wiadomości samodzielnie. Ty jesteś ostatnim filtrem. Dzięki temu masz pewność, że każda interakcja z klientem zachowuje Twój unikalny ton głosu i standardy jakości.' },
];

export const Bezpieczenstwo: React.FC = () => (
  <section id="bezpieczenstwo" className="relative z-10 py-32 bg-void border-t-[0.5px] border-[rgba(212,175,55,0.07)]">
    <div className="max-w-[1280px] mx-auto px-10">
      <div className="text-center mb-20">
        <p className="flex items-center justify-center gap-3.5 text-[0.58rem] tracking-[0.42em] uppercase font-light text-gold mb-5 before:content-[''] before:w-[26px] before:h-[0.5px] before:bg-gold after:content-[''] after:w-[26px] after:h-[0.5px] after:bg-gold">
          05 — PROTOKÓŁ BEZPIECZEŃSTWA
        </p>
        <h2 className="font-serif font-normal text-[clamp(2.2rem,4vw,4.5rem)] leading-[1.08] text-ivory tracking-[0.005em]">
          Twoje dane.<br /><em className="italic text-gold">Twoje zasady.</em>
        </h2>
        <p className="text-[0.95rem] leading-[1.8] text-[rgba(245,244,240,0.45)] font-light tracking-wide mt-6 max-w-[600px] mx-auto">
          Budujemy systemy, którym możesz zaufać. Bezpieczeństwo nie jest dodatkiem — to fundament architektury.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {securityCards.map((card, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="group p-8 md:p-10 bg-black/40 border border-yellow-900/30 rounded-3xl hover:border-gold/40 transition-all duration-500">
            <div className="flex items-start justify-between mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gold/5 border border-gold/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                {card.icon}
              </div>
              <span className="text-[0.5rem] tracking-[0.2em] uppercase text-gold/40 border border-gold/10 px-3 py-1 rounded-full">{card.tag}</span>
            </div>
            <h3 className="font-serif text-2xl text-ivory mb-4">{card.title}</h3>
            <p className="text-[0.88rem] leading-relaxed text-[rgba(245,244,240,0.4)] font-light">{card.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Bezpieczenstwo;
