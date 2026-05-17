'use client';

import { useState, useMemo, useCallback } from 'react';
import {
  Calculator,
  Users,
  Clock,
  Coins,
  TrendingUp,
  ArrowRight,
  CheckCircle,
  Terminal,
  Send,
  AlertCircle,
  Loader2,
  ShieldCheck,
  User,
  Mail,
  Phone,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import {
  sanitizeInput,
  validateForm,
  sendToN8N,
  type FormErrors,
  type N8NPayload,
} from '@/lib/n8nService';

// ---------------------------------------------------------------------------
// Format helpers
// ---------------------------------------------------------------------------
const formatPLN = (val: number) =>
  new Intl.NumberFormat('pl-PL', {
    style: 'currency',
    currency: 'PLN',
    maximumFractionDigits: 0,
  }).format(val);

// ---------------------------------------------------------------------------
// ROI summary type – passed from calculator to form
// ---------------------------------------------------------------------------
export interface RoiSummary {
  employees: number;
  hours: number;
  rate: number;
  weeklyCost: number;
  yearlyCost: number;
  savings: number;
  roiMonths: number;
}

// ---------------------------------------------------------------------------
// VantixRoiTerminal – unified ROI calculator + contact form in one terminal panel
// ---------------------------------------------------------------------------
export const VantixRoiTerminal: React.FC = () => {
  // ---- calculator state ---------------------------------------------------
  const [employees, setEmployees] = useState<number>(5);
  const [hours, setHours] = useState<number>(10);
  const [rate, setRate] = useState<number>(80);
  const [hasInteracted, setHasInteracted] = useState(false);

  // ---- form state ---------------------------------------------------------
  const [formData, setFormData] = useState({
    client_name: '',
    email: '',
    phone: '',
    pain_desc: '',
    source: 'Landing Page',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // ---- computed ROI values ------------------------------------------------
  const weeklyCost = useMemo(() => employees * hours * rate, [employees, hours, rate]);
  const yearlyCost = useMemo(() => weeklyCost * 52, [weeklyCost]);
  const savings = useMemo(() => Math.round(yearlyCost * 0.7), [yearlyCost]);
  const roiMonths = useMemo(() => {
    const m = Math.round(savings / (weeklyCost * 2));
    return m < 1 ? 1 : m;
  }, [savings, weeklyCost]);

  const roiSummary: RoiSummary = useMemo(
    () => ({ employees, hours, rate, weeklyCost, yearlyCost, savings, roiMonths }),
    [employees, hours, rate, weeklyCost, yearlyCost, savings, roiMonths],
  );

  // ---- slider handler -----------------------------------------------------
  const handleSliderChange =
    (setter: (v: number) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setter(Number(e.target.value));
      setHasInteracted(true);
      if (submitError) setSubmitError(null);
    };

  // ---- form handlers ------------------------------------------------------
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    const fieldMap: Record<string, string> = {
      'roi-fn': 'client_name',
      'roi-fe': 'email',
      'roi-ft': 'phone',
      'roi-fm': 'pain_desc',
    };
    const key = fieldMap[id] || id;
    setFormData((prev) => ({ ...prev, [key]: value }));
    if (errors[key as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    const sanitized = {
      client_name: sanitizeInput(formData.client_name),
      email: sanitizeInput(formData.email),
      phone: sanitizeInput(formData.phone),
      pain_desc: sanitizeInput(formData.pain_desc),
    };

    const validationErrors = validateForm(sanitized);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        source: 'Vantix_Website',
        timestamp: new Date().toISOString(),
        lead: {
          name: sanitized.client_name,
          email: sanitized.email,
          phone: sanitized.phone,
          message: sanitized.pain_desc,
          service_type: formData.source,
        },
        // --- ROI calculator data attached to payload ---
        roiCalculator: roiSummary,
      };

      await sendToN8N(payload as unknown as N8NPayload);
      setIsSubmitted(true);
    } catch {
      setSubmitError(
        'Wystąpił błąd podczas wysyłki. Spróbuj ponownie lub skontaktuj się bezpośrednio.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // ---- styles for terminal form fields ------------------------------------
  const inputClass =
    'peer w-full bg-transparent border-none border-b-[0.5px] border-gold/20 outline-none text-ivory font-mono text-[0.87rem] py-3 pt-5 transition-all duration-300 focus:border-gold group-hover:border-gold/40 placeholder-transparent';
  const labelClass =
    'absolute left-0 top-5 text-[0.55rem] tracking-[0.2em] uppercase text-gold/30 font-mono pointer-events-none transition-all duration-200 peer-placeholder-shown:top-5 peer-placeholder-shown:text-[0.55rem] peer-placeholder-shown:text-gold/30 peer-focus:top-0 peer-focus:text-[0.45rem] peer-focus:text-gold peer-[&:not(:placeholder-shown)]:top-0 peer-[&:not(:placeholder-shown)]:text-[0.45rem] peer-[&:not(:placeholder-shown)]:text-gold/60';

  // ---- render -------------------------------------------------------------
  return (
    <section
      id="roi-terminal"
      className="section"
      aria-labelledby="roi-terminal-heading"
    >
      <div className="section-container max-w-[1200px]">
        {/* Section header */}
        <div className="text-center mb-10 md:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500">
              <Terminal size={18} />
            </div>
            <span className="meta-label text-amber-500">VANTIX ROI TERMINAL</span>
          </motion.div>

          <motion.h2
            id="roi-terminal-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="h2-section"
          >
            Policz straty i uruchom procedurę{' '}
            <em className="italic text-amber-500">odzyskiwania zysków</em>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="section-desc mx-auto"
          >
            Sprawdź ile kosztuje Cię ręczna robota, a my przygotujemy plan odzyskiwania
            zysków — w czasie rzeczywistym.
          </motion.p>
        </div>

        {/* ═══ TERMINAL PANEL ═══ */}
        <div className="relative rounded-3xl border border-zinc-800 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 shadow-[0_0_80px_rgba(251,191,36,0.15)] p-6 md:p-10 overflow-hidden">
          {/* Decorative 3D glow */}
          <div
            className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-amber-500/5 blur-[120px] pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-amber-500/3 blur-[100px] pointer-events-none"
            aria-hidden="true"
          />

          {/* Terminal top-bar */}
          <div className="relative z-10 flex items-center justify-between mb-8 pb-4 border-b border-zinc-800">
            <div className="flex items-center gap-3">
              <Terminal size={14} className="text-amber-500/50" />
              <span className="text-[0.55rem] tracking-[0.3em] uppercase text-amber-500/60 font-mono font-semibold">
                VANTIX_ROI_TERMINAL v1.0
              </span>
            </div>
            <div className="flex items-center gap-4">
              {/* Status diodes */}
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[0.4rem] tracking-[0.25em] uppercase text-emerald-500/50 font-mono">
                  UPTIME
                </span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500/60" />
                <span className="text-[0.4rem] tracking-[0.25em] uppercase text-amber-500/40 font-mono">
                  SECURE_LINK
                </span>
              </span>
              <div className="flex gap-1.5 ml-2">
                <div className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
                <div className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500/60" />
              </div>
            </div>
          </div>

          {/* ═══ GRID: LEFT (calculator) + RIGHT (form) ═══ */}
          <div className="relative z-10 grid gap-8 md:gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] items-start">
            {/* ─── LEFT: Kalkulator ROI ─── */}
            <div className="space-y-6 md:space-y-7">
              <p className="meta-label flex items-center gap-2 text-xs">
                <Calculator size={13} className="text-amber-500/60" />
                PARAMETRY_SYMULACJI
              </p>

              {/* Slider 1 */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="meta-label flex items-center gap-2">
                    <Users size={14} className="text-amber-500/60 shrink-0" />
                    Ile osób wykonuje powtarzalne zadania?
                  </label>
                  <span className="text-lg md:text-xl font-serif text-amber-500 font-semibold tabular-nums">
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
                <div className="flex justify-between meta-xs text-neutral-600">
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
                  <label className="meta-label flex items-center gap-2">
                    <Clock size={14} className="text-amber-500/60 shrink-0" />
                    Godzin tygodniowo per osoba?
                  </label>
                  <span className="text-lg md:text-xl font-serif text-amber-500 font-semibold tabular-nums">
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
                <div className="flex justify-between meta-xs text-neutral-600">
                  <span>1h</span>
                  <span>10h</span>
                  <span>20h</span>
                  <span>30h</span>
                  <span>40h</span>
                </div>
              </div>

              {/* Stawka input */}
              <div className="space-y-3">
                <div className="meta-label flex items-center gap-2">
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
                      if (submitError) setSubmitError(null);
                    }}
                    className="w-full bg-neutral-900 border border-neutral-700 rounded-xl pl-10 pr-4 py-3.5 text-ivory text-lg font-light tracking-wide outline-none focus:border-amber-500/50 transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>
              </div>

              {/* Results */}
              <div className="pt-4">
                <div className="flex items-center gap-3 mb-4">
                  <TrendingUp className="w-4 h-4 text-amber-500/60" />
                  <span className="meta-xs text-amber-500/60 font-bold">
                    PROGNOZA ROCZNA
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`yearly-${yearlyCost}`}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="result-card"
                    >
                      <p className="meta-xs text-neutral-500 mb-1">
                        Koszt ręcznej pracy / rok
                      </p>
                      <p className="text-2xl sm:text-3xl font-black text-amber-500 tabular-nums">
                        {formatPLN(yearlyCost)}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`savings-${savings}`}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="result-card"
                    >
                      <p className="meta-xs text-neutral-500 mb-1">
                        Oszczędność z automatyzacją (~70%)
                      </p>
                      <p className="text-2xl sm:text-3xl font-black text-emerald-400 tabular-nums">
                        {formatPLN(savings)}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`roi-${roiMonths}`}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="result-card"
                    >
                      <p className="meta-xs text-neutral-500 mb-1">
                        Zwrot z inwestycji
                      </p>
                      <p className="text-2xl sm:text-3xl font-black text-amber-500 tabular-nums">
                        ~{roiMonths} mies.
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* ─── RIGHT: Formularz zgłoszeniowy ─── */}
            <div>
              <p className="meta-label flex items-center gap-2 mb-6">
                <Send size={13} className="text-amber-500/60" />
                PARAMETRY_ZGŁOSZENIA
              </p>

              <div className="relative">
                <div className="absolute -inset-4 bg-gold/5 blur-2xl rounded-full pointer-events-none" />
                <div className="relative bg-[#050505] border border-gold/10 rounded-2xl overflow-hidden shadow-2xl">
                  {/* Terminal chrome */}
                  <div className="bg-[#0a0a0a] border-b border-gold/10 px-6 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Terminal size={14} className="text-gold/50" />
                      <span className="text-[0.55rem] tracking-[0.2em] uppercase text-gold/40 font-mono">
                        VANTIX_CORE_V1.0
                      </span>
                    </div>
                    <div className="flex gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-gold/20" />
                      <div className="w-1.5 h-1.5 rounded-full bg-gold/20" />
                      <div className="w-1.5 h-1.5 rounded-full bg-gold/40" />
                    </div>
                  </div>

                  <div className="p-6 md:p-8">
                    {/* ROI summary badge – pokazuje że dane z kalkulatora są powiązane */}
                    {hasInteracted && !isSubmitted && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mb-5 p-3 rounded-xl bg-amber-500/5 border border-amber-500/10 text-[0.5rem] font-mono text-amber-500/50 tracking-[0.15em] leading-relaxed"
                      >
                        <span className="text-amber-500/80 font-semibold">
                          ROI_SYNC ✓
                        </span>{' '}
                        — dane kalkulatora przekazane do zgłoszenia
                        <br />
                        <span className="text-amber-500/40">
                          Koszt roczny: {formatPLN(yearlyCost)} · Oszczędność:{' '}
                          {formatPLN(savings)} · ROI: ~{roiMonths} mies.
                        </span>
                      </motion.div>
                    )}

                    <AnimatePresence mode="wait">
                      {!isSubmitted ? (
                        <motion.form
                          key="form"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          onSubmit={handleSubmit}
                          className="space-y-6"
                          noValidate
                        >
                          {/* Hidden source field */}
                          <input type="hidden" name="source" value={formData.source} />

                          {([
                            { id: 'roi-fn', type: 'text', label: 'IDENTYFIKATOR_KLIENTA (IMIĘ I NAZWISKO)', errorKey: 'client_name' as const },
                            { id: 'roi-fe', type: 'email', label: 'ADRES_EMAIL (KONTAKT_ZWROTNY)', errorKey: 'email' as const },
                            { id: 'roi-ft', type: 'tel', label: 'PROTOKÓŁ_ŁĄCZNOŚCI (NUMER TELEFONU)', errorKey: 'phone' as const },
                          ] as const).map(({ id, type, label, errorKey }) => {
                            const valueMap: Record<string, string> = {
                              client_name: formData.client_name,
                              email: formData.email,
                              phone: formData.phone,
                            };
                            return (
                              <div key={id} className="relative group">
                                <input
                                  type={type}
                                  id={id}
                                  required
                                  value={valueMap[errorKey] ?? ''}
                                  onChange={handleFormChange}
                                  placeholder=" "
                                  className={inputClass}
                                  disabled={isSubmitting}
                                />
                                <label htmlFor={id} className={labelClass}>
                                  {label}
                                </label>
                                {errors[errorKey] && (
                                  <p className="mt-1 text-[0.5rem] tracking-[0.15em] uppercase text-red-400/80 font-mono flex items-center gap-1">
                                    <AlertCircle size={9} />
                                    {errors[errorKey]}
                                  </p>
                                )}
                              </div>
                            );
                          })}

                          <div className="relative group">
                            <textarea
                              id="roi-fm"
                              required
                              value={formData.pain_desc}
                              onChange={handleFormChange}
                              placeholder=" "
                              className={`${inputClass} min-h-[100px] resize-none`}
                              disabled={isSubmitting}
                            />
                            <label htmlFor="roi-fm" className={labelClass}>
                              RAPORT_STRAT (OPISZ SWÓJ PROBLEM)
                            </label>
                            {errors.pain_desc && (
                              <p className="mt-1 text-[0.5rem] tracking-[0.15em] uppercase text-red-400/80 font-mono flex items-center gap-1">
                                <AlertCircle size={9} />
                                {errors.pain_desc}
                              </p>
                            )}
                          </div>

                          {submitError && (
                            <div className="flex items-start gap-3 p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                              <AlertCircle size={13} className="text-red-400 shrink-0 mt-0.5" />
                              <p className="text-[0.55rem] tracking-[0.15em] uppercase text-red-400/80 font-mono leading-[1.8]">
                                {submitError}
                              </p>
                            </div>
                          )}

                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="btn-primary w-full relative overflow-hidden py-4 bg-gold text-void font-mono hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] group"
                          >
                            <span className="relative z-10 flex items-center justify-center gap-3">
                              {isSubmitting ? (
                                <>
                                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                  ANALYZING_DATA...
                                </>
                              ) : (
                                'URUCHOM PROCEDURĘ ⚙'
                              )}
                            </span>
                            <div className="absolute inset-0 bg-white/20 -translate-x-full transition-transform duration-700 group-hover:translate-x-0" />
                          </button>
                        </motion.form>
                      ) : (
                        <motion.div
                          key="success"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="py-12 text-center"
                        >
                          <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center mx-auto mb-8">
                            <CheckCircle className="w-8 h-8 text-gold animate-pulse" />
                          </div>
                          <h3 className="text-gold font-mono text-[0.7rem] tracking-[0.4em] uppercase mb-4">
                            TRANSMISJA_UDANA
                          </h3>
                          <p className="text-ivory font-mono text-[0.6rem] leading-[2] tracking-[0.2em] uppercase max-w-[280px] mx-auto opacity-60">
                            ZASZYFROWANO I PRZEKAZANO DO CORE. OCZEKUJ NA KONTAKT AGENTA.
                          </p>
                          <div className="mt-6 p-4 rounded-xl bg-amber-500/5 border border-amber-500/10">
                            <p className="text-[0.5rem] font-mono text-amber-500/40 tracking-[0.15em]">
                              ROI_SYNC: {formatPLN(yearlyCost)} rocznie ·{' '}
                              {formatPLN(savings)} oszczędności · ~{roiMonths} mies. zwrotu
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              {/* Quick contact info below form */}
              <div className="mt-6 p-4 border border-gold/5 rounded-xl bg-white/[0.02] backdrop-blur-md">
                <div className="space-y-3">
                  {[
                    { icon: <Mail size={11} />, label: 'SECURE_MAIL', val: 'kacper@vantix.pl' },
                    { icon: <Phone size={11} />, label: 'DIRECT_LINE', val: '+48 690 366 510' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 group">
                      <div className="w-8 h-8 rounded-lg border border-gold/10 flex items-center justify-center text-gold/40 transition-all duration-300 group-hover:border-gold group-hover:text-gold">
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-[0.4rem] tracking-[0.3em] uppercase text-gold/20 font-mono">
                          {item.label}
                        </p>
                        <p className="text-[0.65rem] font-light text-ivory/60 group-hover:text-ivory transition-colors">
                          {item.val}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VantixRoiTerminal;
