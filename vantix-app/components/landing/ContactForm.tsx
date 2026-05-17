'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TrendingDown, AlertTriangle, ArrowRight, Calculator } from 'lucide-react';

export const LossCalculator: React.FC = () => {
  const [monthlyInquiries, setMonthlyInquiries] = useState<number>(100);
  const [leadValue, setLeadValue] = useState<number>(500);
  const [responseSpeed, setResponseSpeed] = useState<number>(1);

  const conversionAI = 0.15;
  const conversionHuman = [0.12, 0.08, 0.04, 0.01][responseSpeed];
  const speedLabels = ['< 5 MIN', '< 1H', '< 4H', '> 24H'];

  const monthlyLoss = useMemo(() => monthlyInquiries * leadValue * (conversionAI - conversionHuman), [monthlyInquiries, leadValue, conversionHuman]);
  const yearlyLoss = useMemo(() => monthlyLoss * 12, [monthlyLoss]);

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN', maximumFractionDigits: 0 }).format(val);

  const scrollToContact = () => document.getElementById('kontakt')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className="relative z-10 py-12 md:py-24 px-5 md:px-6 overflow-hidden">
      <div className="max-w-[1000px] mx-auto">
        <div className="text-center mb-10 md:mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex items-center justify-center gap-3 mb-4">
            <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center text-gold">
              <Calculator size={18} />
            </div>
            <span className="text-[0.58rem] tracking-[0.35em] uppercase text-gold font-light">Vantix ROI Predictor</span>
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="font-serif text-[clamp(1.8rem,5vw,4rem)] text-ivory leading-tight mb-4">
            Koszt <em className="italic text-gold">Stygnących Leadów</em>
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-[0.85rem] md:text-[0.9rem] font-light text-[rgba(245,244,240,0.45)] tracking-wide">
            Nie licz zaoszczędzonych godzin. Licz utracone przychody.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-8 items-stretch">
          {/* INPUTS */}
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-[rgba(255,255,255,0.02)] backdrop-blur-xl border border-[rgba(212,175,55,0.1)] rounded-2xl md:rounded-3xl p-6 md:p-10 flex flex-col justify-between">
            <div className="space-y-8 md:space-y-10">
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <label className="block text-[0.6rem] md:text-[0.65rem] tracking-[0.18em] uppercase text-gold/60 font-light">Zapytania miesięcznie</label>
                  <span className="text-xl font-serif text-gold">{monthlyInquiries}</span>
                </div>
                <input type="range" min="10" max="1000" step="10" value={monthlyInquiries} onChange={(e) => setMonthlyInquiries(Number(e.target.value))} className="w-full h-1 bg-gold/10 rounded-lg appearance-none cursor-pointer accent-gold" />
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <label className="block text-[0.6rem] md:text-[0.65rem] tracking-[0.18em] uppercase text-gold/60 font-light">Wartość leada (LTV)</label>
                  <span className="text-xl font-serif text-gold">{formatCurrency(leadValue)}</span>
                </div>
                <input type="range" min="100" max="10000" step="100" value={leadValue} onChange={(e) => setLeadValue(Number(e.target.value))} className="w-full h-1 bg-gold/10 rounded-lg appearance-none cursor-pointer accent-gold" />
              </div>
              <div className="space-y-4 md:space-y-6">
                <div className="flex justify-between items-end gap-2">
                  <label className="block text-[0.6rem] md:text-[0.65rem] tracking-[0.18em] uppercase text-gold/60 font-light">Czas odpowiedzi</label>
                  <span className="text-base md:text-lg font-serif text-gold shrink-0">{speedLabels[responseSpeed]}</span>
                </div>
                <input type="range" min="0" max="3" step="1" value={responseSpeed} onChange={(e) => setResponseSpeed(Number(e.target.value))} className="w-full h-1 bg-gold/10 rounded-lg appearance-none cursor-pointer accent-gold" />
                <div className="flex justify-between text-[0.42rem] tracking-widest text-[rgba(245,244,240,0.2)] uppercase">
                  <span>IDEALNIE</span><span>DOBRZE</span><span>RYZYKOWNIE</span><span>KRYTYCZNIE</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RESULTS */}
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative overflow-hidden rounded-2xl md:rounded-3xl p-6 md:p-10 flex flex-col justify-between bg-gradient-to-br from-[rgba(180,20,20,0.12)] to-[rgba(2,2,2,0.8)] border border-red-500/20">
            <div>
              <div className="flex items-center gap-3 mb-6 md:mb-8">
                <TrendingDown className="w-5 h-5 text-red-500" />
                <span className="text-[0.58rem] tracking-[0.25em] uppercase text-red-500/60 font-bold">UTRACONA MARŻA</span>
              </div>
              <div className="space-y-2 mb-8 md:mb-12">
                <AnimatePresence mode="wait">
                  <motion.div key={monthlyLoss} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold tracking-tight text-red-500">
                    {formatCurrency(monthlyLoss)}
                  </motion.div>
                </AnimatePresence>
                <div className="text-[0.65rem] tracking-[0.18em] uppercase text-ivory/30 font-light">MIESIĘCZNIE PRZEZ OPÓŹNIENIA</div>
              </div>
              <div className="flex items-start gap-3 p-3 md:p-4 rounded-xl bg-red-500/10 border border-red-500/20 mb-5 md:mb-6">
                <AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <p className="text-[0.68rem] md:text-[0.7rem] leading-relaxed text-red-200/80 font-light tracking-wide">
                  Vantix eliminuje tę stratę od 1. dnia wdrożenia — skracając czas reakcji do &lt;1s.
                </p>
              </div>
            </div>
            <div className="space-y-4 md:space-y-6">
              <p className="text-[0.62rem] tracking-[0.1em] text-ivory/30 font-light italic">Roczna strata: {formatCurrency(yearlyLoss)}</p>
              <button onClick={scrollToContact} className="w-full btn-pulse flex items-center justify-center gap-3 text-[0.62rem] tracking-[0.22em] uppercase font-normal text-void bg-gold px-6 py-4 rounded-xl transition-all duration-300 hover:shadow-[0_0_40px_rgba(212,175,55,0.4)] group">
                <span>ODZYSKAJ MARŻĘ →</span>
                <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1 shrink-0" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LossCalculator;
