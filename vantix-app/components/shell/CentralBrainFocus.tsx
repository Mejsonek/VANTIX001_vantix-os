'use client';

import { useEffect, useState } from 'react';
import { Check, Target, ArrowRight, Clock, Zap, TrendingUp, Brain } from 'lucide-react';

function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 6)  return 'Dobranoc';
  if (h < 12) return 'Dzień dobry';
  if (h < 18) return 'Cześć';
  return 'Dobry wieczór';
}

const todayTasks = [
  { id: 1, title: 'Nagraj Loom dla Sajida (StepUp Analytics)', priority: 'high',   done: false, time: '10:00' },
  { id: 2, title: 'Follow-up Darek — brak odpowiedzi 48h',     priority: 'high',   done: false, time: '11:30' },
  { id: 3, title: 'Przygotuj ofertę dla klienta z Reddita',    priority: 'medium', done: false, time: '14:00' },
  { id: 4, title: 'Sprawdź status deployu n8n',                 priority: 'low',    done: true,  time: '09:00' },
  { id: 5, title: 'Aktualizuj roadmapę Vantix OS',              priority: 'medium', done: false, time: '16:00' },
];

const stats = [
  { label: 'Leady',          value: '2',    sub: '+1 dziś',  icon: Target,      color: 'text-gold',   border: 'border-gold/40' },
  { label: 'Projekty',       value: '1',    sub: 'aktywne',  icon: Zap,         color: 'text-vblue',  border: 'border-vblue/30' },
  { label: 'Taski',          value: '4',    sub: 'do zrobienia', icon: Check,   color: 'text-ivory/70', border: 'border-gold/10' },
  { label: 'Czas pracy',     value: '4.2h', sub: 'dzisiaj',  icon: Clock,       color: 'text-vgreen', border: 'border-vgreen/30' },
];

const priorityStyle: Record<string, { dot: string; badge: string; label: string }> = {
  high:   { dot: 'bg-vred',    badge: 'border-vred/40 text-vred/90 bg-vred/5',     label: 'HIGH' },
  medium: { dot: 'bg-gold',    badge: 'border-gold/40 text-gold/90 bg-gold/5',     label: 'MED'  },
  low:    { dot: 'bg-ivory/20', badge: 'border-ivory/20 text-ivory/30 bg-ivory/5', label: 'LOW'  },
};

export default function CentralBrainFocus() {
  const [greeting, setGreeting] = useState('');
  const [tasks, setTasks] = useState(todayTasks);
  const [clock, setClock] = useState({ time: '', date: '', seconds: '' });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setGreeting(getGreeting());

    const tick = () => {
      const now = new Date();
      setClock({
        time:    now.toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' }),
        seconds: now.toLocaleTimeString('pl-PL', { second: '2-digit' }),
        date:    now.toLocaleDateString('pl-PL', { weekday: 'long', day: 'numeric', month: 'long' }),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const toggleTask = (id: number) =>
    setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));

  const doneCount = tasks.filter(t => t.done).length;
  const progress  = tasks.length > 0 ? Math.round((doneCount / tasks.length) * 100) : 0;

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <div className="grid-bg" />

      {/* ── TOP BAR ── */}
      <div className="relative z-10 flex items-center justify-between px-6 py-3 border-b border-gold/[0.07] bg-void/80 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-8 h-8 border border-gold/25 bg-gold/8 flex items-center justify-center">
              <span className="font-display text-[11px] font-extrabold text-gold" style={{ letterSpacing: '0.08em' }}>VX</span>
            </div>
            <div className="absolute -inset-[3px] border border-gold/[0.08] pointer-events-none" style={{ animation: 'pulse 4s ease infinite' }} />
          </div>
          <div>
            <div className="font-display text-[10px] font-bold text-gold/80" style={{ letterSpacing: '0.14em' }}>VANTIX OS</div>
            <div className="font-mono text-[8px] text-ivory/20" style={{ letterSpacing: '0.08em' }}>v0.1.0 — Phase 1</div>
          </div>
        </div>

        {/* Live clock */}
        <div className="flex items-center gap-6">
          {mounted && (
            <div className="text-right hidden sm:block">
              <div className="font-mono text-[11px] text-ivory/40 leading-none">
                {clock.time}
                <span className="text-ivory/20 ml-0.5">:{clock.seconds}</span>
              </div>
              <div className="font-mono text-[8px] text-ivory/15 mt-0.5">{clock.date}</div>
            </div>
          )}
          <div className="flex items-center gap-1.5 px-2.5 py-1 border border-vgreen/20 bg-vgreen/5">
            <span className="w-1.5 h-1.5 rounded-full bg-vgreen dot-live" />
            <span className="font-mono text-[7px] text-vgreen/70 uppercase" style={{ letterSpacing: '0.12em' }}>ONLINE</span>
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="relative z-10 flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-6 py-7">

          {/* ── GREETING ── */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-px w-8 bg-gold/40" />
              <span className="font-mono text-[8px] text-gold/50 uppercase" style={{ letterSpacing: '0.3em' }}>CENTRAL BRAIN</span>
            </div>
            <div className="flex items-end justify-between gap-4">
              <h1 className="font-display text-3xl lg:text-4xl font-extrabold text-ivory leading-tight fade-up">
                {greeting},&nbsp;<span className="text-gold">Kacper</span>
              </h1>
              <div className="flex items-center gap-2 shrink-0">
                <button className="btn btn-dim !text-[8px] !px-3 !py-1.5 flex items-center gap-1.5">
                  <TrendingUp size={9} /> Nowy lead
                </button>
                <button className="btn btn-primary !text-[8px] !px-3 !py-1.5 flex items-center gap-1.5">
                  <Check size={9} /> Nowy task
                </button>
              </div>
            </div>
          </div>

          {/* ── STAT CARDS ── */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
            {stats.map((s, i) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.label}
                  className={`vx-card vx-3d !p-4 border-l-2 ${s.border} fade-up delay-${i + 1}`}
                  style={{ position: 'relative' }}
                >
                  <div className="stat-accent-line" />
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[8px] text-ivory/30 uppercase" style={{ letterSpacing: '0.18em' }}>{s.label}</span>
                    <Icon size={11} className={`${s.color} opacity-60`} />
                  </div>
                  <div className={`font-display text-2xl font-black ${s.color} num-animate delay-${i + 2}`}>{s.value}</div>
                  <div className="font-mono text-[8px] text-ivory/20 mt-1">{s.sub}</div>
                </div>
              );
            })}
          </div>

          {/* ── TASK LIST ── */}
          <div className="vx-card !p-0 overflow-hidden mb-5 fade-up delay-3">
            {/* Task header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-gold/[0.07] bg-s2">
              <div className="flex items-center gap-2">
                <Check size={11} className="text-gold/50" />
                <span className="font-mono text-[9px] text-ivory/40 uppercase" style={{ letterSpacing: '0.16em' }}>Zadania na dziś</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <div className="w-20 h-[2px] bg-gold/10 overflow-hidden">
                    <div
                      className="h-full bg-gold bar-animate"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <span className="font-mono text-[8px] text-gold/50">{doneCount}/{tasks.length}</span>
                </div>
                <span className="font-mono text-[8px] text-ivory/15">{progress}%</span>
              </div>
            </div>

            {/* Tasks */}
            <div className="divide-y divide-gold/[0.04]">
              {tasks.map((task, i) => {
                const ps = priorityStyle[task.priority];
                return (
                  <button
                    key={task.id}
                    onClick={() => toggleTask(task.id)}
                    className={`vx-row w-full flex items-center gap-4 px-5 py-3.5 text-left row-enter delay-${i + 4}`}
                  >
                    {/* Checkbox */}
                    <div className={`w-4 h-4 flex items-center justify-center border flex-shrink-0 transition-all duration-200 ${task.done ? 'border-gold/50 bg-gold/15' : 'border-ivory/15 hover:border-gold/30'}`}>
                      {task.done && <Check size={8} className="text-gold" />}
                    </div>

                    {/* Priority dot */}
                    <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${ps.dot}`} />

                    {/* Title */}
                    <span className={`font-mono text-[11px] flex-1 transition-all ${task.done ? 'text-ivory/20 line-through decoration-ivory/20' : 'text-ivory/55'}`}>
                      {task.title}
                    </span>

                    {/* Time */}
                    <span className="font-mono text-[9px] text-ivory/15 shrink-0">{task.time}</span>

                    {/* Priority badge */}
                    {!task.done && (
                      <span className={`font-mono text-[7px] px-1.5 py-0.5 border uppercase tracking-widest shrink-0 ${ps.badge}`}>
                        {ps.label}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── AI RECOMMENDATION ── */}
          <div className="flex items-start gap-3 px-4 py-3 border border-gold/15 bg-gold/[0.03] fade-up delay-5" style={{ borderLeft: '2px solid rgba(212,175,55,0.5)' }}>
            <div className="w-6 h-6 border border-gold/25 bg-gold/8 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Brain size={11} className="text-gold/70" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-mono text-[8px] text-gold/50 uppercase mb-1" style={{ letterSpacing: '0.18em' }}>AI Rekomendacja</div>
              <span className="font-mono text-[11px] text-ivory/45 leading-relaxed">
                Sajid nie odpowiedział na wiadomość od 2 dni — wyślij przypomnienie dziś wieczorem lub zarchiwizuj lead.
              </span>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <button className="btn btn-dim !text-[8px] !px-2.5 !py-1.5 flex items-center gap-1">
                <ArrowRight size={8} /> Akceptuj
              </button>
              <button className="btn btn-ghost !text-[8px] !px-2 !py-1.5 text-ivory/20 hover:text-ivory/40">✕</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
