'use client';

import { useState } from 'react';
import { Send, Mail, Phone, Clock, User, CheckCircle, ShieldCheck, Loader2, AlertCircle, Terminal } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { sanitizeInput, validateForm, sendToN8N, type FormErrors, type N8NPayload } from '@/lib/n8nService';

export const Kontakt: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ client_name: '', email: '', phone: '', pain_desc: '', source: 'Landing Page' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    const fieldMap: Record<string, string> = { fn: 'client_name', fe: 'email', ft: 'phone', fm: 'pain_desc' };
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
    if (Object.keys(validationErrors).length > 0) { setErrors(validationErrors); return; }
    setIsSubmitting(true);
    try {
      const payload: N8NPayload = {
        source: 'Vantix_Website',
        timestamp: new Date().toISOString(),
        lead: { name: sanitized.client_name, email: sanitized.email, phone: sanitized.phone, message: sanitized.pain_desc, service_type: formData.source },
      };
      await sendToN8N(payload);
      setIsSubmitted(true);
    } catch {
      setSubmitError('Wystąpił błąd podczas wysyłki. Spróbuj ponownie lub skontaktuj się bezpośrednio.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = "peer w-full bg-transparent border-none border-b-[0.5px] border-gold/20 outline-none text-ivory font-mono text-[0.87rem] py-3 pt-5 transition-all duration-300 focus:border-gold group-hover:border-gold/40 placeholder-transparent";
  const labelClass = "absolute left-0 top-5 text-[0.55rem] tracking-[0.2em] uppercase text-gold/30 font-mono pointer-events-none transition-all duration-200 peer-placeholder-shown:top-5 peer-placeholder-shown:text-[0.55rem] peer-placeholder-shown:text-gold/30 peer-focus:top-0 peer-focus:text-[0.45rem] peer-focus:text-gold peer-[&:not(:placeholder-shown)]:top-0 peer-[&:not(:placeholder-shown)]:text-[0.45rem] peer-[&:not(:placeholder-shown)]:text-gold/60";

  return (
    <section id="kontakt" className="section bg-[rgba(2,2,2,0.55)] backdrop-blur-[4px] border-t-[0.5px] border-[rgba(212,175,55,0.07)]" aria-labelledby="kontakt-heading">
      <div className="section-container">
        <p className="section-pre tracking-[0.42em] text-[0.58rem]">
          TERMINAL OPERACYJNY
        </p>
        <h2 id="kontakt-heading" className="h2-section">
          Uruchom procedurę<br /><em className="italic text-gold">odzyskiwania zysków.</em>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24 items-start mt-10 md:mt-16">
          <div className="relative">
            <div className="absolute -inset-4 bg-gold/5 blur-2xl rounded-full pointer-events-none" />
            <div className="relative bg-[#050505] border border-gold/10 rounded-2xl overflow-hidden shadow-2xl">
              <div className="bg-[#0a0a0a] border-b border-gold/10 px-6 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Terminal size={14} className="text-gold/50" />
                  <span className="text-[0.55rem] tracking-[0.2em] uppercase text-gold/40 font-mono">VANTIX_CORE_V1.0</span>
                </div>
                <div className="flex gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-gold/20" />
                  <div className="w-1.5 h-1.5 rounded-full bg-gold/20" />
                  <div className="w-1.5 h-1.5 rounded-full bg-gold/40" />
                </div>
              </div>

              <div className="p-8 md:p-10">
                <AnimatePresence mode="wait">
                  {!isSubmitted ? (
                    <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onSubmit={handleSubmit} className="space-y-8" noValidate>
                      {[
                        { id: 'fn', type: 'text', label: 'IDENTYFIKATOR_KLIENTA (IMIĘ I NAZWISKO)', errorKey: 'client_name' as const },
                        { id: 'fe', type: 'email', label: 'ADRES_EMAIL (KONTAKT_ZWROTNY)', errorKey: 'email' as const },
                        { id: 'ft', type: 'tel', label: 'PROTOKÓŁ_ŁĄCZNOŚCI (NUMER TELEFONU)', errorKey: 'phone' as const },
                      ].map(({ id, type, label, errorKey }) => (
                        <div key={id} className="relative group">
                          <input type={type} id={id} required value={formData[errorKey === 'client_name' ? 'client_name' : errorKey === 'email' ? 'email' : 'phone']} onChange={handleChange} placeholder=" " className={inputClass} />
                          <label htmlFor={id} className={labelClass}>{label}</label>
                          {errors[errorKey] && <p className="mt-1 text-[0.5rem] tracking-[0.15em] uppercase text-red-400/80 font-mono flex items-center gap-1"><AlertCircle size={9} />{errors[errorKey]}</p>}
                        </div>
                      ))}

                      <div className="relative group">
                        <textarea id="fm" required value={formData.pain_desc} onChange={handleChange} placeholder=" " className={`${inputClass} min-h-[100px] resize-none`} />
                        <label htmlFor="fm" className={labelClass}>RAPORT_STRAT (OPISZ SWÓJ PROBLEM)</label>
                        {errors.pain_desc && <p className="mt-1 text-[0.5rem] tracking-[0.15em] uppercase text-red-400/80 font-mono flex items-center gap-1"><AlertCircle size={9} />{errors.pain_desc}</p>}
                      </div>

                      {submitError && (
                        <div className="flex items-start gap-3 p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                          <AlertCircle size={13} className="text-red-400 shrink-0 mt-0.5" />
                          <p className="text-[0.55rem] tracking-[0.15em] uppercase text-red-400/80 font-mono leading-[1.8]">{submitError}</p>
                        </div>
                      )}

                      <button type="submit" disabled={isSubmitting} className="btn-primary w-full relative overflow-hidden py-4 bg-gold text-void font-mono hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] group">
                        <span className="relative z-10 flex items-center justify-center gap-3">
                          {isSubmitting ? (<><Loader2 className="w-3.5 h-3.5 animate-spin" />ANALYZING_DATA...</>) : 'URUCHOM PROCEDURĘ ⚙'}
                        </span>
                        <div className="absolute inset-0 bg-white/20 -translate-x-full transition-transform duration-700 group-hover:translate-x-0" />
                      </button>
                    </motion.form>
                  ) : (
                    <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="py-12 text-center">
                      <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center mx-auto mb-8">
                        <CheckCircle className="w-8 h-8 text-gold animate-pulse" />
                      </div>
                      <h3 className="text-gold font-mono text-[0.7rem] tracking-[0.4em] uppercase mb-4">TRANSMISJA_UDANA</h3>
                      <p className="text-ivory font-mono text-[0.6rem] leading-[2] tracking-[0.2em] uppercase max-w-[280px] mx-auto opacity-60">
                        ZASZYFROWANO I PRZEKAZANO DO CORE. OCZEKUJ NA KONTAKT AGENTA.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          <div className="lg:pt-10 space-y-8 md:space-y-12">
            <div>
              <p className="body-paragraph mb-6 md:mb-8 max-w-full md:max-w-[360px]">
                Każda sekunda zwłoki to realna strata. System analizuje zgłoszenie w czasie rzeczywistym — przygotowuje plan odzyskiwania leadów.
              </p>
              <div className="space-y-6">
                {[
                  { icon: <Mail size={13} />, label: 'SECURE_MAIL', val: 'kacper@vantix.pl' },
                  { icon: <Phone size={13} />, label: 'DIRECT_LINE', val: '+48 690 366 510' },
                  { icon: <Clock size={13} />, label: 'UPTIME', val: '24/7/365' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-5 group">
                    <div className="w-10 h-10 rounded-lg border border-gold/10 flex items-center justify-center text-gold/40 transition-all duration-300 group-hover:border-gold group-hover:text-gold">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-[0.45rem] tracking-[0.3em] uppercase text-gold/20 font-mono">{item.label}</p>
                      <p className="text-[0.75rem] font-light text-ivory/60 group-hover:text-ivory transition-colors">{item.val}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-8 border border-gold/5 rounded-2xl bg-white/[0.02] backdrop-blur-md relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5">
                <ShieldCheck size={60} className="text-gold" />
              </div>
              <p className="font-serif text-[0.95rem] italic text-ivory/50 leading-[1.7] mb-6 relative z-10">
                „System VANTIX przejął 100% naszych zapytań z Instagrama. Koszt wdrożenia zwrócił się w 14 dni."
              </p>
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-10 h-10 rounded-full border border-gold/20 flex items-center justify-center text-gold/40">
                  <User size={16} />
                </div>
                <div>
                  <p className="text-[0.7rem] font-normal text-ivory tracking-wide">Dr. Anna Kowalska</p>
                  <p className="text-[0.55rem] tracking-[0.2em] uppercase text-gold/40">KLINIKA HARMONIA</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Kontakt;
