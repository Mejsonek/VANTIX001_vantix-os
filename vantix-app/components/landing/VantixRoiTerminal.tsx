'use client';

import { useState, useMemo, useEffect } from 'react';
import {
  Calculator,
  Users,
  Clock,
  Coins,
  TrendingUp,
  CheckCircle,
  Terminal,
  Send,
  AlertCircle,
  Loader2,
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

const formatPLN = (val: number) =>
  new Intl.NumberFormat('pl-PL', {
    style: 'currency',
    currency: 'PLN',
    maximumFractionDigits: 0,
  }).format(val);

export interface RoiSummary {
  employees: number;
  hours: number;
  rate: number;
  weeklyCost: number;
  yearlyCost: number;
  savings: number;
  roiMonths: number;
}

export const VantixRoiTerminal: React.FC = () => {
  // ── Calculator state ──────────────────────────────────────────────────────
  const [employees, setEmployees] = useState<number>(5);
  const [hours, setHours] = useState<number>(10);
  const [rate, setRate] = useState<number>(80);
  const [hasInteracted, setHasInteracted] = useState(false);

  // ── Form state ────────────────────────────────────────────────────────────
  const [formData, setFormData] = useState({
    client_name: '',
    email: '',
    phone: '',
    pain_desc: '',
    source: 'Landing Page',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Set<string>>(new Set());
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // ── Live validation — clear errors as user corrects fields ────────────────
  useEffect(() => {
    if (touched.size === 0) return;
    const sanitized = {
      client_name: sanitizeInput(formData.client_name),
      email: sanitizeInput(formData.email),
      phone: sanitizeInput(formData.phone),
      pain_desc: sanitizeInput(formData.pain_desc),
    };
    const newErrors = validateForm(sanitized);
    const relevantErrors: FormErrors = {};
    touched.forEach((field) => {
      const key = field as keyof FormErrors;
      if (newErrors[key]) relevantErrors[key] = newErrors[key];
    });
    setErrors(relevantErrors);
  }, [formData, touched]);

  // ── ROI calculations ──────────────────────────────────────────────────────
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

  // ── Handlers ──────────────────────────────────────────────────────────────
  const handleSliderChange =
    (setter: (v: number) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setter(Number(e.target.value));
      setHasInteracted(true);
      if (submitError) setSubmitError(null);
    };

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
  };

  const handleBlur = (fieldKey: string) => {
    setTouched((prev) => new Set([...prev, fieldKey]));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    const allFields = new Set(['client_name', 'email', 'phone', 'pain_desc']);
    setTouched(allFields);

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

  // ── Input styles ──────────────────────────────────────────────────────────
  const getInputClass = (fieldKey: string) => {
    const hasError = touched.has(fieldKey) && errors[fieldKey as keyof FormErrors];
    return [
      'peer w-full bg-transparent border-none outline-none text-ivory font-mono text-[0.87rem] py-3 pt-5 transition-all duration-300 placeholder-transparent',
      'border-b-[0.5px]',
      hasError
        ? 'border-vred/60 focus:border-vred'
        : 'border-gold/20 focus:border-gold group-hover:border-gold/40',
      'focus:shadow-[0_2px_0_-1px_rgba(212,175,55,0.3)]',
    ].join(' ');
  };

  const labelClass =
    'absolute left-0 top-5 text-[0.55rem] tracking-[0.2em] uppercase text-gold/30 font-mono pointer-events-none transition-all duration-200 peer-placeholder-shown:top-5 peer-placeholder-shown:text-[0.55rem] peer-placeholder-shown:text-gold/30 peer-focus:top-0 peer-focus:text-[0.45rem] peer-focus:text-gold peer-[&:not(:placeholder-shown)]:top-0 peer-[&:not(:placeholder-shown)]:text-[0.45rem] peer-[&:not(:placeholder-shown)]:text-gold/60';

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
            <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center text-gold">
              <Terminal size={18} />
            </div>
            <span className="meta-label text-gold">VANTIX ROI TERMINAL</span>
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
            <em className="italic text-gold">odzyskiwania zysków</em>
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
        <div className="relative border border-gold/10 bg-surface shadow-[0_0_60px_rgba(212,175,55,0.06)] p-6 md:p-10 overflow-hidden">
          {/* Scanlines overlay */}
          <div className="terminal-scan absolute inset-0 z-0 pointer-events-none" aria-hidden="true" />

          {/* Decorative glow */}
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-gold/[0.03] blur-[120px] pointer-events-none" aria-hidden="true" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-gold/[0.02] blur-[100px] pointer-events-none" aria-hidden="true" />

          {/* Terminal top-bar */}
          <div className="relative z-10 flex items-center justify-between mb-8 pb-4 border-b border-gold/10">
            <div className="flex items-center gap-3">
              <Terminal size={14} className="text-gold/50" />
              <span className="text-[0.55rem] tracking-[0.3em] uppercase text-gold/60 font-mono font-semibold">
                VANTIX_ROI_TERMINAL v1.0
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-vgreen animate-pulse" />
                <span className="text-[0.4rem] tracking-[0.25em] uppercase text-vgreen/50 font-mono">UPTIME</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-gold/60" />
                <span className="text-[0.4rem] tracking-[0.25em] uppercase text-gold/40 font-mono">SECURE_LINK</span>
              </span>
              <div className="flex gap-1.5 ml-2">
                <div className="w-1.5 h-1.5 rounded-full bg-ivory/10" />
                <div className="w-1.5 h-1.5 rounded-full bg-ivory/10" />
                <div className="w-1.5 h-1.5 rounded-full bg-gold/60" />
              </div>
            </div>
          </div>

          {/* ═══ GRID: LEFT (form) + RIGHT (calculator) ═══ */}
          <div className="relative z-10 grid gap-8 md:gap-12 lg:grid-cols-2 items-start">

            {/* ─── LEFT: Formularz zgłoszeniowy ─── */}
            <div>
              <p className="meta-label flex items-center gap-2 mb-6">
                <Send size={13} className="text-gold/60" />
                PARAMETRY_ZGŁOSZENIA
              </p>

              <div className="bg-[#050505] border border-gold/10 overflow-hidden shadow-2xl">
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
                  {hasInteracted && !isSubmitted && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mb-5 p-3 bg-gold/5 border border-gold/10 text-[0.5rem] font-mono text-gold/50 tracking-[0.15em] leading-relaxed"
                    >
                      <span className="text-gold/80 font-semibold">ROI_SYNC ✓</span>{' '}
                      — dane kalkulatora przekazane do zgłoszenia
                      <br />
                      <span className="text-gold/40">
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
                        <input type="hidden" name="source" value={formData.source} />

                        {([
                          { id: 'roi-fn', type: 'text', label: 'IMIĘ I NAZWISKO', fieldKey: 'client_name' as const },
                          { id: 'roi-fe', type: 'email', label: 'ADRES EMAIL', fieldKey: 'email' as const },
                          { id: 'roi-ft', type: 'tel', label: 'NUMER TELEFONU', fieldKey: 'phone' as const },
                        ] as const).map(({ id, type, label, fieldKey }) => {
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
                                value={valueMap[fieldKey] ?? ''}
                                onChange={handleFormChange}
                                onBlur={() => handleBlur(fieldKey)}
                                placeholder=" "
                                className={getInputClass(fieldKey)}
                                disabled={isSubmitting}
                                aria-describedby={errors[fieldKey] ? `${id}-err` : undefined}
                              />
                              <label htmlFor={id} className={labelClass}>
                                {label}
                              </label>
                              <AnimatePresence>
                                {touched.has(fieldKey) && errors[fieldKey] && (
                                  <motion.p
                                    id={`${id}-err`}
                                    initial={{ opacity: 0, y: -4 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -4 }}
                                    className="mt-1 text-[0.5rem] tracking-[0.15em] uppercase text-vred/80 font-mono flex items-center gap-1"
                                    role="alert"
                                  >
                                    <AlertCircle size={9} />
                                    {errors[fieldKey]}
                                  </motion.p>
                                )}
                              </AnimatePresence>
                            </div>
                          );
                        })}

                        <div className="relative group">
                          <textarea
                            id="roi-fm"
                            required
                            value={formData.pain_desc}
                            onChange={handleFormChange}
                            onBlur={() => handleBlur('pain_desc')}
                            placeholder=" "
                            className={`${getInputClass('pain_desc')} min-h-[100px] resize-none`}
                            disabled={isSubmitting}
                            aria-describedby={errors.pain_desc ? 'roi-fm-err' : undefined}
                          />
                          <label htmlFor="roi-fm" className={labelClass}>
                            OPISZ SWÓJ PROBLEM
                          </label>
                          <AnimatePresence>
                            {touched.has('pain_desc') && errors.pain_desc && (
                              <motion.p
                                id="roi-fm-err"
                                initial={{ opacity: 0, y: -4 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -4 }}
                                className="mt-1 text-[0.5rem] tracking-[0.15em] uppercase text-vred/80 font-mono flex items-center gap-1"
                                role="alert"
                              >
                                <AlertCircle size={9} />
                                {errors.pain_desc}
                              </motion.p>
                            )}
                          </AnimatePresence>
                        </div>

                        {submitError && (
                          <div className="flex items-start gap-3 p-4 bg-vred/10 border border-vred/20">
                            <AlertCircle size={13} className="text-vred shrink-0 mt-0.5" />
                            <p className="text-[0.55rem] tracking-[0.15em] uppercase text-vred/80 font-mono leading-[1.8]">
                              {submitError}
                            </p>
                          </div>
                        )}

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="btn-primary w-full relative overflow-hidden min-h-[48px] group"
                          aria-busy={isSubmitting}
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

                        {/* Contact below form */}
                        <div className="pt-2 border-t border-gold/10 space-y-3">
                          {[
                            { icon: <Mail size={11} />, label: 'EMAIL', val: 'kacper@vantix.pl' },
                            { icon: <Phone size={11} />, label: 'TEL', val: '+48 690 366 510' },
                          ].map((item, i) => (
                            <div key={i} className="flex items-center gap-3 group">
                              <div className="w-7 h-7 border border-gold/10 flex items-center justify-center text-gold/40 transition-all duration-300 group-hover:border-gold/40 group-hover:text-gold/70 shrink-0">
                                {item.icon}
                              </div>
                              <div>
                                <p className="text-[0.4rem] tracking-[0.3em] uppercase text-gold/20 font-mono">{item.label}</p>
                                <p className="text-[0.65rem] font-light text-ivory/50 group-hover:text-ivory/80 transition-colors">{item.val}</p>
                              </div>
                            </div>
                          ))}
                        </div>
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
                        <div className="mt-6 p-4 bg-gold/5 border border-gold/10">
                          <p className="text-[0.5rem] font-mono text-gold/40 tracking-[0.15em]">
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

            {/* ─── RIGHT: Kalkulator ROI ─── */}
            <div className="space-y-6 md:space-y-7">
              <p className="meta-label flex items-center gap-2 text-xs">
                <Calculator size={13} className="text-gold/60" />
                PARAMETRY_SYMULACJI
              </p>

              {/* Slider 1 — Pracownicy */}
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-4">
                  <label htmlFor="s-employees" className="meta-label flex items-center gap-2">
                    <Users size={14} className="text-gold/60 shrink-0" />
                    Ile osób wykonuje powtarzalne zadania?
                  </label>
                  <span className="text-lg md:text-xl font-serif text-gold font-semibold tabular-nums shrink-0">
                    {employees}
                  </span>
                </div>
                <input
                  id="s-employees"
                  type="range"
                  min={1}
                  max={50}
                  step={1}
                  value={employees}
                  onChange={handleSliderChange(setEmployees)}
                  className="roi-slider"
                  aria-label="Liczba pracowników"
                />
                <div className="flex justify-between meta-xs text-ivory/20">
                  <span>1</span><span>10</span><span>20</span><span>30</span><span>40</span><span>50</span>
                </div>
              </div>

              {/* Slider 2 — Godziny */}
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-4">
                  <label htmlFor="s-hours" className="meta-label flex items-center gap-2">
                    <Clock size={14} className="text-gold/60 shrink-0" />
                    Godzin tygodniowo per osoba?
                  </label>
                  <span className="text-lg md:text-xl font-serif text-gold font-semibold tabular-nums shrink-0">
                    {hours}h
                  </span>
                </div>
                <input
                  id="s-hours"
                  type="range"
                  min={1}
                  max={40}
                  step={1}
                  value={hours}
                  onChange={handleSliderChange(setHours)}
                  className="roi-slider"
                  aria-label="Godziny tygodniowo"
                />
                <div className="flex justify-between meta-xs text-ivory/20">
                  <span>1h</span><span>10h</span><span>20h</span><span>30h</span><span>40h</span>
                </div>
              </div>

              {/* Stawka */}
              <div className="space-y-3">
                <label htmlFor="s-rate" className="meta-label flex items-center gap-2">
                  <Coins size={14} className="text-gold/60 shrink-0" />
                  Średnia stawka godzinowa (zł)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-ivory/30 font-light select-none">
                    zł
                  </span>
                  <input
                    id="s-rate"
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
                    className="w-full bg-surface border border-gold/20 pl-10 pr-4 py-3.5 text-ivory text-lg font-light tracking-wide outline-none focus:border-gold/50 transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none min-h-[48px]"
                    aria-label="Stawka godzinowa"
                  />
                </div>
              </div>

              {/* Results */}
              <div className="pt-2">
                <div className="flex items-center gap-3 mb-4">
                  <TrendingUp className="w-4 h-4 text-gold/60" />
                  <span className="meta-xs text-gold/60 font-bold">PROGNOZA ROCZNA</span>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`yearly-${yearlyCost}`}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="result-card"
                    >
                      <p className="meta-xs text-ivory/30 mb-1">Koszt ręcznej pracy / rok</p>
                      <p className="text-2xl sm:text-3xl font-black text-gold tabular-nums">
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
                      <p className="meta-xs text-ivory/30 mb-1">Oszczędność z automatyzacją (~70%)</p>
                      <p className="text-2xl sm:text-3xl font-black text-vgreen tabular-nums">
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
                      <p className="meta-xs text-ivory/30 mb-1">Zwrot z inwestycji</p>
                      <p className="text-2xl sm:text-3xl font-black text-gold tabular-nums">
                        ~{roiMonths} mies.
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* CTA nudge below results */}
                <p className="mt-5 text-[0.55rem] tracking-[0.2em] uppercase text-ivory/25 font-mono text-center leading-relaxed">
                  Wypełnij formularz ← żeby poznać plan działania
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default VantixRoiTerminal;
