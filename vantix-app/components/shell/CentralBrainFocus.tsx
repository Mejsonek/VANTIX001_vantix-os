'use client';

import { useEffect, useState } from 'react';
import { Check, Target, ArrowRight, Clock, Zap } from 'lucide-react';

const greetings = [
  { hour: 5,  text: 'Dzień dobry' },
  { hour: 12, text: 'Cześć' },
  { hour: 17, text: 'Dobry wieczór' },
  { hour: 22, text: 'Dobranoc' },
];

function getGreeting(): string {
  const h = new Date().getHours();
  for (const g of greetings) {
    if (h < g.hour) return g.text;
  }
  return 'Dzień dobry';
}

const todayTasks = [
  { id: 1, title: 'Nagraj Loom dla Sajida (StepUp Analytics)', priority: 'high', done: false },
  { id: 2, title: 'Follow-up Darek — brak odpowiedzi 48h', priority: 'high', done: false },
  { id: 3, title: 'Przygotuj ofertę dla klienta z Reddita', priority: 'medium', done: false },
  { id: 4, title: 'Sprawdź status deployu n8n', priority: 'low', done: true },
  { id: 5, title: 'Aktualizuj roadmapę Vantix OS', priority: 'medium', done: false },
];

const quickStats = [
  { label: 'Leady dziś', value: '2', icon: Target, gold: true },
  { label: 'Aktywne projekty', value: '1', icon: Zap, gold: false },
  { label: 'Taski do zrobienia', value: '4', icon: Check, gold: false },
  { label: 'Czas pracy', value: '4.2h', icon: Clock, gold: true },
];

export default function CentralBrainFocus() {
  const [greeting, setGreeting] = useState('');
  const [tasks, setTasks] = useState(todayTasks);
  const [time, setTime] = useState('');

  useEffect(() => {
    setGreeting(getGreeting());
    const t = setInterval(() => {
      setTime(new Date().toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' }));
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const toggleTask = (id: number) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const doneCount = tasks.filter(t => t.done).length;
  const progress = tasks.length > 0 ? Math.round((doneCount / tasks.length) * 100) : 0;

  return (
    <div className="flex flex-col flex-1">
      <div className="grid-bg" />

      {/* Top Bar */}
      <div className="relative z-10 flex items-center justify-between px-5 py-2.5 border-b border-gold/[0.06]">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-8 h-8 border border-gold/15 bg-gold/5 flex items-center justify-center">
              <span className="font-display text-[11px] font-extrabold text-gold" style={{ letterSpacing: '0.08em' }}>VX</span>
            </div>
            <div className="absolute -inset-[3px] border border-gold/[0.06] animate-pulse pointer-events-none" style={{ animationDuration: '3s' }} />
          </div>
          <div>
            <div className="font-display text-[10px] font-bold text-gold/80" style={{ letterSpacing: '0.12em' }}>VANTIX OS</div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="font-mono text-[9px] text-ivory/15">
            {time && new Date().toLocaleDateString('pl-PL', { weekday: 'short', day: 'numeric', month: 'short' })}
          </span>
          <div className="flex items-center gap-1.5 px-2 py-1 border border-gold/[0.06]">
            <span className="w-1 h-1 rounded-full bg-green shadow-[0_0_4px_rgba(74,222,128,0.4)]" />
            <span className="text-[7px] text-ivory/30 font-mono uppercase" style={{ letterSpacing: '0.1em' }}>ON</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <div className="relative z-10 flex-1 px-5 lg:px-10 py-6 max-w-4xl mx-auto w-full overflow-y-auto">
        {/* Greeting + Actions row */}
        <div className="flex items-end justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="h-px w-6 bg-gold/30" />
              <span className="text-[8px] text-gold/50 font-mono uppercase" style={{ letterSpacing: '0.25em' }}>CENTRAL BRAIN</span>
            </div>
            <h1 className="font-display text-2xl lg:text-3xl font-extrabold text-ivory leading-tight">
              {greeting}, <span className="text-gold">Kacper</span>
            </h1>
          </div>
          <div className="flex gap-2">
            <button className="btn btn-dim !text-[7px] !px-2.5 !py-1.5">Nowy lead</button>
            <button className="btn btn-primary !text-[7px] !px-2.5 !py-1.5">Nowy task</button>
          </div>
        </div>

        {/* Stats + Tasks side by side */}
        <div className="flex gap-4 mb-4">
          {/* Quick Stats grid */}
          <div className="grid grid-cols-2 gap-2 w-[240px] shrink-0">
            {quickStats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="vx-card !p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[7px] text-ivory/35 font-mono uppercase" style={{ letterSpacing: '0.15em' }}>{stat.label}</span>
                    <Icon size={10} className={stat.gold ? 'text-gold/60' : 'text-ivory/15'} />
                  </div>
                  <div className={`font-display text-lg font-bold ${stat.gold ? 'text-gold' : 'text-ivory/80'}`}>{stat.value}</div>
                </div>
              );
            })}
          </div>

          {/* Today's Tasks */}
          <div className="vx-card !p-4 flex-1">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Check size={12} className="text-gold/60" />
                <span className="font-mono text-[9px] text-ivory/50 uppercase" style={{ letterSpacing: '0.12em' }}>Zadania</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-16 h-[3px] bg-gold/10 overflow-hidden">
                  <div className="h-full bg-gold transition-all duration-500" style={{ width: `${progress}%` }} />
                </div>
                <span className="font-mono text-[8px] text-gold/60">{doneCount}/{tasks.length}</span>
              </div>
            </div>
            <div className="space-y-[1px]">
              {tasks.map((task) => (
                <button
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  className="w-full flex items-center gap-2 px-2 py-1.5 border border-transparent hover:border-gold/10 hover:bg-gold/[0.02] transition-all text-left group"
                >
                  <div className={`w-3 h-3 flex items-center justify-center border transition-colors ${task.done ? 'border-gold bg-gold/10' : 'border-ivory/15 group-hover:border-gold/30'}`}>
                    {task.done && <Check size={7} className="text-gold" />}
                  </div>
                  <span className={`font-mono text-[11px] flex-1 transition-all ${task.done ? 'text-ivory/15 line-through' : 'text-ivory/50'}`}>
                    {task.title}
                  </span>
                  {task.priority === 'high' && !task.done && (
                    <span className="vx-badge vx-badge-red !text-[6px] !px-1 !py-[1px]">H</span>
                  )}
                  {task.priority === 'medium' && !task.done && (
                    <span className="vx-badge vx-badge-gold !text-[6px] !px-1 !py-[1px]">M</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* AI Recommendation */}
        <div className="flex items-center gap-2 px-3 py-2 border-l-[2px] border-gold/40 bg-gold/[0.02]">
          <div className="w-4 h-4 border border-gold/20 flex items-center justify-center shrink-0">
            <span className="font-display text-[6px] font-bold text-gold">VX</span>
          </div>
          <span className="font-mono text-[10px] text-ivory/35 flex-1">
            Sajid nie odpowiedział na wiadomość — wyślij przypomnienie dziś wieczorem.
          </span>
          <button className="btn btn-dim !text-[7px] !px-2 !py-1">Akceptuj</button>
          <button className="btn btn-ghost !text-[7px] !px-2 !py-1">✕</button>
        </div>
      </div>
    </div>
  );
}
