'use client';

import { useEffect, useState } from 'react';
import {
  Check, ArrowRight, Clock, Zap, TrendingUp, Target,
  Users, Code2, BrainCircuit, Workflow, Settings,
  AlertTriangle, Lightbulb, X,
} from 'lucide-react';
import Link from 'next/link';

/* ── Navigation ── */
const navLeft = [
  { href: '/crm', icon: Users,  label: 'CRM', badge: '2' },
  { href: '/dev', icon: Code2,  label: 'DEV' },
];
const navRight = [
  { href: '/system/brain',     icon: BrainCircuit, label: 'Brain' },
  { href: '/system/workflows', icon: Workflow,     label: 'Flows' },
  { href: '/system/settings',  icon: Settings,     label: 'Config' },
];

/* ── Stats ── */
const statsData = [
  { label: 'Leady aktywne', value: '2',    sub: '+1 dziś',      icon: Target,     color: '#d4af37', bg: 'rgba(212,175,55,0.07)',  border: 'rgba(212,175,55,0.22)' },
  { label: 'Projekty',      value: '1',    sub: 'Phase 1 live', icon: TrendingUp, color: '#6B8FD4', bg: 'rgba(107,143,212,0.07)', border: 'rgba(107,143,212,0.20)' },
  { label: 'Taski dziś',    value: '4',    sub: '1 ukończone',  icon: Check,      color: '#4ade80', bg: 'rgba(74,222,128,0.05)',  border: 'rgba(74,222,128,0.18)' },
  { label: 'Czas pracy',    value: '4.2h', sub: 'dzisiaj',      icon: Clock,      color: '#FF6D3F', bg: 'rgba(255,109,63,0.06)',  border: 'rgba(255,109,63,0.18)' },
];

/* ── Priorities ── */
const priorities = [
  { rank: 1, title: 'Finish Vantix OS MVP',   desc: 'Cockpit + CRM + DEV mockupy', deadline: 'Dziś',   progress: 65, color: '#d4af37' },
  { rank: 2, title: 'Review lead proposals',  desc: 'Follow-up 3 nowych klientów', deadline: 'Jutro',  progress: 30, color: '#6B8FD4' },
  { rank: 3, title: 'AI evolution session',   desc: 'Aktualizuj VANTIXRAG master',  deadline: 'Piątek', progress: 10, color: 'rgba(245,244,240,0.30)' },
];

/* ── Tasks ── */
const initialTasks = [
  { id: 1, title: 'Nagraj Loom dla Sajida (StepUp Analytics)', priority: 'high',   done: false, time: '10:00' },
  { id: 2, title: 'Follow-up Darek — brak odpowiedzi 48h',     priority: 'high',   done: false, time: '11:30' },
  { id: 3, title: 'Przygotuj ofertę dla klienta z Reddita',    priority: 'medium', done: false, time: '14:00' },
  { id: 4, title: 'Sprawdź status deployu n8n',                 priority: 'low',    done: true,  time: '09:00' },
  { id: 5, title: 'Aktualizuj roadmapę Vantix OS',              priority: 'medium', done: false, time: '16:00' },
];

/* ── AI Recs ── */
const initialRecs = [
  { id: '1', urgency: 'critical' as const, text: 'Sajid bez odpowiedzi 2 dni — follow-up lub archiwum leada.', action: 'Wyślij teraz' },
  { id: '2', urgency: 'warning'  as const, text: 'Phase 2 blokuje integrację DB — zaplanuj sesję DeepSeek.', action: 'Zaplanuj' },
  { id: '3', urgency: 'info'     as const, text: 'Evolution session RAG zaplanowana na piątek.', action: 'Otwórz notes' },
];

const urgencyCfg = {
  critical: { icon: AlertTriangle, color: '#ff5252', border: 'rgba(255,82,82,0.30)',  bg: 'rgba(255,82,82,0.06)',  label: 'PILNE' },
  warning:  { icon: Clock,         color: '#d4af37', border: 'rgba(212,175,55,0.28)', bg: 'rgba(212,175,55,0.06)', label: 'WAŻNE' },
  info:     { icon: Lightbulb,     color: 'rgba(245,244,240,0.35)', border: 'rgba(245,244,240,0.08)', bg: 'rgba(245,244,240,0.02)', label: 'INFO' },
};

const taskBorderColor: Record<string, string> = {
  high: '#ff5252', medium: '#d4af37', low: 'rgba(245,244,240,0.12)',
};

function getGreeting() {
  const h = new Date().getHours();
  if (h < 6)  return 'Dobranoc';
  if (h < 12) return 'Dzień dobry';
  if (h < 18) return 'Cześć';
  return 'Dobry wieczór';
}

export default function CentralBrainFocus() {
  const [mounted,  setMounted]  = useState(false);
  const [clock,    setClock]    = useState({ time: '', sec: '', date: '' });
  const [tasks,    setTasks]    = useState(initialTasks);
  const [recs,     setRecs]     = useState(initialRecs);
  const [greeting] = useState(getGreeting);

  useEffect(() => {
    setMounted(true);
    const tick = () => {
      const n = new Date();
      setClock({
        time: n.toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' }),
        sec:  n.toLocaleTimeString('pl-PL', { second: '2-digit' }),
        date: n.toLocaleDateString('pl-PL',  { weekday: 'long', day: 'numeric', month: 'long' }),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const toggleTask  = (id: number) => setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
  const dismissRec  = (id: string) => setRecs(prev => prev.filter(r => r.id !== id));

  const doneCount = tasks.filter(t => t.done).length;
  const progress  = Math.round((doneCount / tasks.length) * 100);

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <div className="grid-bg" />

      {/* ══════════════════ TOP BAR ══════════════════ */}
      <div
        className="relative z-10 flex items-center border-b border-gold/[0.07] bg-void/90 backdrop-blur-md"
        style={{ height: '48px', padding: '0 16px' }}
      >
        {/* Left: CRM + DEV */}
        <div className="flex items-center gap-px flex-1">
          {navLeft.map(({ href, icon: Icon, label, badge }) => (
            <Link
              key={href}
              href={href}
              className="group relative flex items-center gap-1.5 px-3 py-1.5 border border-transparent hover:border-gold/15 hover:bg-gold/5 transition-all duration-150"
            >
              <Icon size={11} className="text-ivory/30 group-hover:text-gold/60 transition-colors" />
              <span className="font-mono text-[9px] text-ivory/30 group-hover:text-ivory/65 uppercase tracking-wider transition-colors">
                {label}
              </span>
              {'badge' in { badge } && badge && (
                <span className="w-3.5 h-3.5 flex items-center justify-center bg-gold text-void text-[7px] font-bold font-mono">
                  {badge}
                </span>
              )}
            </Link>
          ))}
        </div>

        {/* Center: identity + clock */}
        <div className="flex items-center gap-4 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="relative w-8 h-8 border border-gold/25 bg-gold/8 flex items-center justify-center">
              <Zap size={13} className="text-gold/80" />
              <div className="absolute inset-[-3px] border border-gold/[0.07] pointer-events-none" style={{ animation: 'pulse 4s ease infinite' }} />
            </div>
            <div>
              <div className="font-display text-[11px] font-extrabold text-gold/90" style={{ letterSpacing: '0.14em' }}>VANTIX OS</div>
              {mounted && (
                <div className="font-mono text-[8px] text-ivory/25 leading-none">{clock.date}</div>
              )}
            </div>
          </div>
          {mounted && (
            <div className="font-mono text-[15px] text-ivory/60 tabular-nums leading-none">
              {clock.time}
              <span className="text-[11px] text-ivory/25 ml-0.5">:{clock.sec}</span>
            </div>
          )}
        </div>

        {/* Right: Brain + Flows + Settings + ONLINE */}
        <div className="flex items-center gap-px flex-1 justify-end">
          {navRight.map(({ href, icon: Icon, label }) => (
            <Link
              key={href}
              href={href}
              className="group flex items-center gap-1.5 px-3 py-1.5 border border-transparent hover:border-gold/10 hover:bg-gold/3 transition-all duration-150"
            >
              <Icon size={11} className="text-ivory/20 group-hover:text-gold/50 transition-colors" />
              <span className="font-mono text-[9px] text-ivory/20 group-hover:text-ivory/45 uppercase tracking-wider transition-colors">
                {label}
              </span>
            </Link>
          ))}
          <div className="ml-2 flex items-center gap-1.5 px-2.5 py-1 border border-vgreen/20 bg-vgreen/5">
            <span className="w-1.5 h-1.5 rounded-full bg-vgreen dot-live" />
            <span className="font-mono text-[7px] text-vgreen/70 uppercase tracking-[0.12em]">ONLINE</span>
          </div>
        </div>
      </div>

      {/* ══════════════════ MAIN ══════════════════ */}
      <div className="relative z-10 flex-1 overflow-y-auto">
        <div className="px-6 py-5">

          {/* Greeting row */}
          <div className="flex items-end justify-between mb-6 fade-up">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="h-px w-6 bg-gold/40" />
                <span className="font-mono text-[8px] text-gold/40 uppercase tracking-[0.3em]">CENTRAL BRAIN</span>
              </div>
              <h1 className="font-display text-3xl lg:text-4xl font-extrabold text-ivory leading-tight">
                {greeting},&nbsp;<span className="text-gold">Kacper</span>
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <button className="btn btn-dim text-[9px]! px-3! py-1.5! flex items-center gap-1.5">
                <TrendingUp size={9} /> Nowy lead
              </button>
              <button className="btn btn-primary text-[9px]! px-3! py-1.5! flex items-center gap-1.5">
                <Check size={9} /> Nowy task
              </button>
            </div>
          </div>

          {/* ── TWO-COLUMN LAYOUT ── */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-5">

            {/* ════ LEFT: Stats + Tasks ════ */}
            <div className="space-y-5">

              {/* Mini 3D Stat Tablets */}
              <div className="grid grid-cols-2 gap-3" style={{ perspective: '800px' }}>
                {statsData.map((s, i) => {
                  const Icon = s.icon;
                  return (
                    <div
                      key={s.label}
                      className={`fade-up delay-${i + 1}`}
                      style={{
                        transform: `perspective(800px) rotateX(5deg) rotateY(${i % 2 === 0 ? -1.5 : 1.5}deg)`,
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                        transformStyle: 'preserve-3d',
                      }}
                      onMouseEnter={e => {
                        const el = e.currentTarget as HTMLDivElement;
                        el.style.transform = `perspective(800px) rotateX(-1deg) rotateY(0deg) translateZ(16px)`;
                        el.style.boxShadow = `0 20px 60px rgba(0,0,0,0.6), 0 0 40px ${s.color}18`;
                      }}
                      onMouseLeave={e => {
                        const el = e.currentTarget as HTMLDivElement;
                        el.style.transform = `perspective(800px) rotateX(5deg) rotateY(${i % 2 === 0 ? -1.5 : 1.5}deg)`;
                        el.style.boxShadow = 'none';
                      }}
                    >
                      <div
                        className="relative p-5 overflow-hidden cursor-default"
                        style={{
                          background: s.bg,
                          border: `1px solid ${s.border}`,
                          borderTop: `2px solid ${s.color}`,
                        }}
                      >
                        {/* Corner glow */}
                        <div style={{
                          position: 'absolute', top: 0, right: 0,
                          width: '64px', height: '64px',
                          background: `radial-gradient(circle at top right, ${s.color}18, transparent 70%)`,
                          pointerEvents: 'none',
                        }} />

                        <div className="flex items-center justify-between mb-3">
                          <span className="font-mono text-[9px] text-ivory/35 uppercase tracking-[0.18em]">{s.label}</span>
                          <Icon size={12} style={{ color: s.color, opacity: 0.65 }} />
                        </div>

                        <div
                          className="font-display font-black num-animate"
                          style={{ fontSize: '34px', lineHeight: 1, color: s.color }}
                        >
                          {s.value}
                        </div>
                        <div className="font-mono text-[9px] text-ivory/30 mt-1.5">{s.sub}</div>

                        {/* Bottom scan line */}
                        <div style={{
                          position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px',
                          background: `linear-gradient(to right, ${s.color}50, transparent)`,
                        }} />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Compact Task List */}
              <div className="vx-card p-0! overflow-hidden fade-up delay-5">
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-3 border-b border-gold/[0.07] bg-s2">
                  <div className="flex items-center gap-2">
                    <Check size={10} className="text-gold/50" />
                    <span className="font-mono text-[9px] text-ivory/45 uppercase tracking-[0.16em]">
                      DZISIAJ — {doneCount}/{tasks.length} ZADAŃ
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-[4px] bg-gold/10 overflow-hidden">
                      <div className="h-full bg-gold bar-animate" style={{ width: `${progress}%` }} />
                    </div>
                    <span className="font-mono text-[9px] text-gold/60 font-bold tabular-nums">{progress}%</span>
                  </div>
                </div>

                {/* Rows */}
                <div className="divide-y divide-gold/4">
                  {tasks.map((task, i) => {
                    const bc = taskBorderColor[task.priority];
                    return (
                      <button
                        key={task.id}
                        onClick={() => toggleTask(task.id)}
                        className={`vx-row w-full flex items-center gap-3 px-4 py-3.5 text-left group row-enter delay-${i + 1}`}
                        style={{ borderLeft: `2px solid ${task.done ? 'transparent' : bc}` }}
                      >
                        <div className={`w-5 h-5 flex items-center justify-center border shrink-0 transition-all ${task.done ? 'border-gold/40 bg-gold/10' : 'border-ivory/15 group-hover:border-gold/30'}`}>
                          {task.done && <Check size={10} className="text-gold" />}
                        </div>
                        <span className={`font-mono text-[13px] flex-1 leading-snug transition-all ${task.done ? 'text-ivory/20 line-through' : 'text-ivory/75'}`}>
                          {task.title}
                        </span>
                        <span className="font-mono text-[10px] text-ivory/25 shrink-0 tabular-nums">{task.time}</span>
                        {!task.done && (
                          <span
                            className="font-mono text-[8px] px-2 py-0.5 border uppercase tracking-wider shrink-0"
                            style={{ borderColor: `${bc}50`, color: bc, background: `${bc}10` }}
                          >
                            {task.priority === 'high' ? 'HIGH' : task.priority === 'medium' ? 'MED' : 'LOW'}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* ════ RIGHT: Priorities + AI Recs ════ */}
            <div className="space-y-5">

              {/* 3D Priority Stack */}
              <div>
                <div className="flex items-center gap-2 mb-3 fade-up delay-2">
                  <div className="h-px w-5 bg-gold/40" />
                  <span className="font-mono text-[8px] text-gold/50 uppercase tracking-widest">Top Priorytety</span>
                </div>

                <div className="space-y-2" style={{ perspective: '900px' }}>
                  {priorities.map((p, i) => {
                    const deadlineColor = p.deadline === 'Dziś' ? '#ff5252' : p.deadline === 'Jutro' ? '#d4af37' : 'rgba(245,244,240,0.25)';
                    const deadlineBg    = p.deadline === 'Dziś' ? 'rgba(255,82,82,0.07)' : p.deadline === 'Jutro' ? 'rgba(212,175,55,0.07)' : 'transparent';
                    const deadlineBdr   = p.deadline === 'Dziś' ? 'rgba(255,82,82,0.30)' : p.deadline === 'Jutro' ? 'rgba(212,175,55,0.30)' : 'rgba(245,244,240,0.08)';

                    return (
                      <div
                        key={p.rank}
                        className={`fade-up delay-${i + 3}`}
                        style={{
                          transform: `perspective(900px) rotateX(${4 - i * 1.5}deg) translateZ(${10 - i * 3}px)`,
                          transition: 'transform 0.35s ease, box-shadow 0.35s ease',
                          opacity: 1 - i * 0.07,
                        }}
                        onMouseEnter={e => {
                          const el = e.currentTarget as HTMLDivElement;
                          el.style.transform = `perspective(900px) rotateX(-1deg) translateZ(22px)`;
                          el.style.opacity = '1';
                          el.style.boxShadow = `0 18px 50px rgba(0,0,0,0.55), 0 0 30px ${p.color}22`;
                        }}
                        onMouseLeave={e => {
                          const el = e.currentTarget as HTMLDivElement;
                          el.style.transform = `perspective(900px) rotateX(${4 - i * 1.5}deg) translateZ(${10 - i * 3}px)`;
                          el.style.opacity = String(1 - i * 0.07);
                          el.style.boxShadow = 'none';
                        }}
                      >
                        <div
                          className="vx-card p-4!"
                          style={{
                            borderLeft: `2px solid ${p.color}55`,
                            background: i === 0 ? 'linear-gradient(135deg, rgba(212,175,55,0.05), rgba(0,0,0,0.35))' : undefined,
                          }}
                        >
                          <div className="flex items-center gap-3 mb-2.5">
                            {/* Rank circle */}
                            <div
                              className="w-8 h-8 rounded-full border flex items-center justify-center font-display font-black text-[13px] shrink-0"
                              style={{ background: `${p.color}15`, borderColor: `${p.color}40`, color: p.color }}
                            >
                              {p.rank}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-mono text-[12px] text-ivory/80 font-semibold leading-tight truncate">{p.title}</p>
                              <p className="font-mono text-[10px] text-ivory/35 truncate mt-0.5">{p.desc}</p>
                            </div>
                            {/* Deadline badge */}
                            <span
                              className="font-mono text-[8px] px-1.5 py-0.5 border uppercase shrink-0"
                              style={{ borderColor: deadlineBdr, color: deadlineColor, background: deadlineBg }}
                            >
                              {p.deadline}
                            </span>
                          </div>

                          {/* Progress */}
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-[4px] bg-gold/8 overflow-hidden">
                              <div
                                className="h-full bar-animate"
                                style={{ width: `${p.progress}%`, background: `linear-gradient(to right, ${p.color}80, ${p.color})` }}
                              />
                            </div>
                            <span className="font-mono text-[10px] font-bold shrink-0" style={{ color: p.color }}>
                              {p.progress}%
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* AI Recommendations */}
              <div className="fade-up delay-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="h-px w-5 bg-gold/40" />
                    <span className="font-mono text-[8px] text-gold/50 uppercase tracking-widest">AI Rekomendacje</span>
                  </div>
                  {recs.length > 0 && (
                    <span className="font-mono text-[8px] text-gold border border-gold/20 bg-gold/8 px-1.5 py-px">{recs.length}</span>
                  )}
                </div>

                {recs.length === 0 ? (
                  <div className="vx-card text-center py-6!">
                    <p className="font-mono text-[10px] text-ivory/20">Brak nowych rekomendacji</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {recs.map(rec => {
                      const cfg  = urgencyCfg[rec.urgency];
                      const Icon = cfg.icon;
                      return (
                        <div
                          key={rec.id}
                          className="vx-card p-3!"
                          style={{ borderLeft: `2px solid ${cfg.color}`, borderColor: cfg.border, background: cfg.bg }}
                        >
                          <div className="flex items-start gap-2.5">
                            <Icon size={13} style={{ color: cfg.color, marginTop: '1px' }} className="shrink-0" />
                            <div className="flex-1 min-w-0">
                              <span className="font-mono text-[8px] font-bold uppercase tracking-wider" style={{ color: cfg.color }}>
                                {cfg.label}
                              </span>
                              <p className="font-mono text-[11px] text-ivory/60 leading-relaxed mt-0.5">{rec.text}</p>
                              <button className="btn btn-dim text-[8px]! px-2! py-0.5! mt-1.5 flex items-center gap-1">
                                <ArrowRight size={7} /> {rec.action}
                              </button>
                            </div>
                            <button
                              onClick={() => dismissRec(rec.id)}
                              className="text-ivory/15 hover:text-ivory/45 transition-colors shrink-0 mt-0.5"
                            >
                              <X size={10} />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
