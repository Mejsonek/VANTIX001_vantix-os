'use client';

import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calculator, Users, Clock, Coins, TrendingUp, ArrowRight, CheckCircle } from 'lucide-react';

// ---------------------------------------------------------------------------
// Format helpers
// ---------------------------------------------------------------------------
const formatPLN = (val: number) =>
  new Intl.NumberFormat('pl-PL', {
    style: 'currency',
    currency: 'PLN',
    maximumFractionDigits: 0,
  }).format(val);

const formatNumber = (val: number) =>
  new Intl.NumberFormat('pl-PL').format(val);

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export const RoiCalculator: React.FC = () => {
  // ---- state -----------------------------------------------------------
  const [employees, setEmployees] = useState<number>(5);
  const [hours, setHours] = useState<number>(10);
  const [rate, setRate] = useState<number>(80);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  // ---- computed values ------------------------------------------------
  const weeklyCost = useMemo(() => employees * hours * rate, [employees, hours, rate]);
  const yearlyCost = useMemo(() => weeklyCost * 52, [weeklyCost]);
  const savings = useMemo(() => Math.round(yearlyCost * 0.7), [yearlyCost]);
  const roiMonths = useMemo(() => {
    const months = Math.round(savings / (weeklyCost * 2));
    return months < 1 ? 1 : months;
  }, [savings, weeklyCost]);

  // whether user has interacted with any slider
  const [hasInteracted, setHasInteracted] = useState(false);

  const handleSliderChange = useCallback(
    (setter: (v: number) => void) =>
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setter(Number(e.target.value));
        setHasInteracted(true);
        if (status === 'error') setStatus('idle');
      },
    [status],
  );

  // ---- submit handler -------------------------------------------------
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!name.trim() || !email.trim()) return;
      setStatus('submitting');

      const payload = {
        type: 'roi_calculator',
        name: name.trim(),
        email: email.trim(),
        data: {
          employees,
          hours,
          rate,
          weeklyCost,
          yearlyCost,
          savings,
        },
      };

      const webhookUrl =
        process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL ||
        'https://mejsonek.app.n8n.cloud/webhook-test/715085bc-3b38-4080-aee7-814c923c92e2';

      try {
        const res = await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        setStatus('success');
      } catch {
        setStatus('error');
      }
    },
    [name, email, employees, hours, rate, weeklyCost, yearlyCost, savings],
  );

  // ---- render ---------------------------------------------------------
  return (
    <section
      id="roi-calculator"
      className="relative z-10 py-16 md:py-28 px-5 md:px-6"
      aria-labelledby="roi-heading"
    >
      <div className="max-w-[1000px] mx-auto">
        {/* Section header */}
        <div className="text-center mb-10 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500">
              <Calculator size={18} />
            </div>
            <span className="text-[0.58rem] tracking-[0.35em] uppercase text-amber-500 font-light">
              Vantix ROI Predictor
            </span>
          </motion.div>

          <motion.h2
            id="roi-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-[clamp(1.8rem,5vw,4rem)] text-ivory leading-tight mb-4"
          >
            Kalkulator{' '}
            <em className="italic text-amber-500">Rzeczywistego ROI</em>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm md:text-base font-light text-zinc-400 max-w-2xl mx-auto"
          >
            Sprawdź, ile kosztuje Cię ręczna robota — i jak szybko automatyzacja zwraca inwestycję.
          </motion.p>
        </div>

        {/* Card */}
        <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6 md:p-8 lg:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
            {/* ---- LEFT: Inputs ---- */}
            <div className="space-y-7 md:space-y-8">
              {/* Slider 1 */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-[0.6rem] md:text-[0.65rem] tracking-[0.18em] uppercase text-neutral-400 font-light">
                    <Users size={14} className="text-amber-500/60 shrink-0" />
                    Ile osób w Twojej firmie wykonuje powtarzalne zadania?
                  </label>
                  <span className="text-xl font-serif text-amber-500 font-semibold tabular-nums">
                    {employees}
                  </span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={50}
                  step={1}
                  value={employees}
                  onChange={handleSliderChange(setEmployees)}
                  className="roi-slider"
                />
                <div className="flex justify-between text-[0.4rem] tracking-widest text-neutral-600 uppercase">
                  <span>1</span>
                  <span>10</span>
                  <span>20</span>
                  <span>30</span>
                  <span>40</span>
                  <span>50</span>
                </div>
              </div>

              {/* Slider 2 */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-[0.6rem] md:text-[0.65rem] tracking-[0.18em] uppercase text-neutral-400 font-light">
                    <Clock size={14} className="text-amber-500/60 shrink-0" />
                    Ile godzin tygodniowo poświęca na nie każda z nich?
                  </label>
                  <span className="text-xl font-serif text-amber-500 font-semibold tabular-nums">
                    {hours}h
                  </span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={40}
                  step={1}
                  value={hours}
                  onChange={handleSliderChange(setHours)}
                  className="roi-slider"
                />
                <div className="flex justify-between text-[0.4rem] tracking-widest text-neutral-600 uppercase">
                  <span>1h</span>
                  <span>10h</span>
                  <span>20h</span>
                  <span>30h</span>
                  <span>40h</span>
                </div>
              </div>

              {/* Input */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-[0.6rem] md:text-[0.65rem] tracking-[0.18em] uppercase text-neutral-400 font-light">
                  <Coins size={14} className="text-amber-500/60 shrink-0" />
                  Średnia stawka godzinowa (zł)
                </div>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-neutral-500 font-light">
                    zł
                  </span>
                  <input
                    type="number"
                    min={1}
                    step={1}
                    value={rate}
                    onChange={(e) => {
                      const v = Number(e.target.value);
                      if (v >= 1) setRate(v);
                      setHasInteracted(true);
                      if (status === 'error') setStatus('idle');
                    }}
                    className="w-full bg-neutral-900 border border-neutral-700 rounded-xl pl-10 pr-4 py-3.5 text-ivory text-lg font-light tracking-wide outline-none focus:border-amber-500/50 transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>
              </div>
            </div>

            {/* ---- RIGHT: Results ---- */}
            <div className="space-y-6 md:space-y-8">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-5 h-5 text-amber-500" />
                <span className="text-[0.58rem] tracking-[0.25em] uppercase text-amber-500/60 font-bold">
                  PROGNOZA ROCZNA
                </span>
              </div>

              {/* 3 result cards in a grid — md:grid-cols-3 on desktop, stacked on mobile */}
              <div className="grid grid-cols-1 gap-4">
                {/* Koszt roczny */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`yearly-${yearlyCost}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-4 md:p-5"
                  >
                    <p className="text-[0.55rem] tracking-[0.2em] uppercase text-neutral-500 font-light mb-1">
                      Koszt ręcznej pracy / rok
                    </p>
                    <p className="text-3xl sm:text-4xl font-black text-amber-500 tabular-nums">
                      {formatPLN(yearlyCost)}
                    </p>
                  </motion.div>
                </AnimatePresence>

                {/* Oszczędność roczna */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`savings-${savings}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-4 md:p-5"
                  >
                    <p className="text-[0.55rem] tracking-[0.2em] uppercase text-neutral-500 font-light mb-1">
                      Oszczędność z automatyzacją (~70%)
                    </p>
                    <p className="text-3xl sm:text-4xl font-black text-emerald-400 tabular-nums">
                      {formatPLN(savings)}
                    </p>
                  </motion.div>
                </AnimatePresence>

                {/* Zwrot */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`roi-${roiMonths}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-4 md:p-5"
                  >
                    <p className="text-[0.55rem] tracking-[0.2em] uppercase text-neutral-500 font-light mb-1">
                      Zwrot z inwestycji
                    </p>
                    <p className="text-3xl sm:text-4xl font-black text-amber-500 tabular-nums">
                      ~{roiMonths} mies.
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* ---- Lead-magnet form (wizualnie kontynuacja kalkulatora) ---- */}
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-3 bg-emerald-900/20 border border-emerald-500/20 rounded-xl p-4 md:p-5"
                  >
                    <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                    <p className="text-sm md:text-base font-light text-emerald-300">
                      Raport leci na maila! Odezwę się też osobiście.
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {hasInteracted && (
                      <form
                        onSubmit={handleSubmit}
                        className="space-y-3.5 bg-neutral-900/30 border border-neutral-800 rounded-xl p-4 md:p-5"
                      >
                        <p className="text-[0.6rem] tracking-[0.18em] uppercase text-amber-500/50 font-light mb-1">
                          Chcesz pełną wycenę swojej firmy?
                        </p>
                        <p className="text-xs text-neutral-500 font-light mb-3">
                          Zostaw kontakt — przygotuję Ci raport z konkretną kwotą do odzyskania. Bez zobowiązań.
                        </p>

                        <input
                          type="text"
                          placeholder="Twoje imię"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          disabled={status === 'submitting'}
                          className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-4 py-3 text-ivory text-sm font-light tracking-wide outline-none placeholder:text-neutral-500 focus:border-amber-500/50 transition-colors disabled:opacity-50"
                        />

                        <input
                          type="email"
                          placeholder="Twój e-mail"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          disabled={status === 'submitting'}
                          className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-4 py-3 text-ivory text-sm font-light tracking-wide outline-none placeholder:text-neutral-500 focus:border-amber-500/50 transition-colors disabled:opacity-50"
                        />

                        <button
                          type="submit"
                          disabled={status === 'submitting'}
                          className="w-full flex items-center justify-center gap-2.5 text-[0.6rem] tracking-[0.22em] uppercase font-normal text-neutral-950 bg-amber-500 px-6 py-3.5 rounded-xl transition-all duration-300 hover:shadow-[0_0_40px_rgba(245,158,11,0.35)] hover:bg-amber-400 disabled:opacity-50 disabled:cursor-not-allowed group"
                        >
                          {status === 'submitting' ? (
                            <span className="flex items-center gap-2">
                              <svg
                                className="animate-spin h-4 w-4"
                                viewBox="0 0 24 24"
                                fill="none"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                />
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                />
                              </svg>
                              WYSYŁAM…
                            </span>
                          ) : (
                            <>
                              <span>Wyślij mi raport →</span>
                              <ArrowRight
                                size={14}
                                className="transition-transform duration-300 group-hover:translate-x-1 shrink-0"
                              />
                            </>
                          )}
                        </button>

                        {status === 'error' && (
                          <p className="text-xs text-red-400 text-center pt-1">
                            Coś poszło nie tak — napisz na{' '}
                            <a
                              href="mailto:kacper@vantix.pl"
                              className="underline underline-offset-2 hover:text-red-300 transition-colors"
                            >
                              kacper@vantix.pl
                            </a>
                          </p>
                        )}
                      </form>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoiCalculator;
