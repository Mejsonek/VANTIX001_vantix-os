'use client';

import { useEffect, useState } from 'react';
import { Check, Target, Clock, Zap, Brain, GitBranch, Settings, Users, Code2, Zap as ZapIcon, X } from 'lucide-react';
import Link from 'next/link';

function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 6)  return 'Dobranoc';
  if (h < 12) return 'Dzień dobry';
  if (h < 18) return 'Cześć';
  return 'Dobry wieczór';
}

const todayTasks = [
  { id: 1, title: 'Nagraj Loom dla Sajida', priority: 'high',   time: '10:00' },
  { id: 2, title: 'Follow-up Darek — 48h brak odpowiedzi', priority: 'high',   time: '11:30' },
  { id: 3, title: 'Przygotuj ofertę dla klienta',    priority: 'medium', time: '14:00' },
  { id: 4, title: 'Sprawdź status deployu n8n',                 priority: 'low',    time: '09:00' },
  { id: 5, title: 'Aktualizuj roadmapę Vantix OS',              priority: 'medium', time: '16:00' },
];

const stats = [
  { label: 'Leady',      value: 2,     sub: '+1 dziś' },
  { label: 'Taski',      value: 4,     sub: 'do zrobienia' },
  { label: 'Projekty',   value: 1,     sub: 'aktywne' },
  { label: 'Czas',       value: '4.2h', sub: 'dzisiaj' },
];

const initialRecommendations = [
  { id: 1, type: 'critical', title: 'Sajid bez odpowiedzi 2 dni', action: 'Wyślij teraz', color: 'bg-vred/5 border-vred/30' },
  { id: 2, type: 'warning', title: 'Phase 2 blokuje DB', action: 'Zaplanuj', color: 'bg-gold/5 border-gold/30' },
  { id: 3, type: 'info', title: 'Evolution RAG — piątek', action: 'Otwórz notes', color: 'bg-ivory/5 border-ivory/20' },
];

const topPriorities = [
  { id: 1, title: 'Szybki fix bugów w API', deadline: 'DZIŚ', progress: 75, color: '#d4af37' },
  { id: 2, title: 'Review kod Fase 2', deadline: 'JUTRO', progress: 45, color: '#6B8FD4' },
  { id: 3, title: 'Docs — migration guide', deadline: 'WTOREK', progress: 20, color: '#f5f4f0' },
];

const priorityStyle: Record<string, { label: string; color: string }> = {
  high:   { label: 'HIGH', color: 'text-vred' },
  medium: { label: 'MED',  color: 'text-gold' },
  low:    { label: 'LOW',  color: 'text-ivory/40' },
};

export default function CentralBrainFocus() {
  const [greeting, setGreeting] = useState('');
  const [clock, setClock] = useState({ time: '', seconds: '' });
  const [mounted, setMounted] = useState(false);
  const [recommendations, setRecommendations] = useState(initialRecommendations);

  useEffect(() => {
    setMounted(true);
    setGreeting(getGreeting());

    const tick = () => {
      const now = new Date();
      setClock({
        time:    now.toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' }),
        seconds: now.toLocaleTimeString('pl-PL', { second: '2-digit' }),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const dismissRecommendation = (id: number) => {
    setRecommendations(prev => prev.filter(r => r.id !== id));
  };

  return (
    <div className="flex flex-col flex-1 overflow-hidden bg-void">
      <div className="grid-bg" />

      {/* ── TOPBAR (h-12) ── */}
      <div className="relative z-20 h-12 flex items-center justify-between px-6 border-b border-gold/10 bg-void/95 backdrop-blur-sm">
        {/* LEFT: Logo + Version + Clock + Online */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-gold font-display font-black text-sm">⚡ VANTIX OS</span>
            <div className="w-px h-6 bg-gold/20" />
            <span className="font-mono text-[10px] text-ivory/40">v0.1.0</span>
          </div>
          {mounted && (
            <>
              <span className="font-mono text-[11px] text-ivory/50 tabular-nums">
                {clock.time}:{clock.seconds}
              </span>
              <div className="flex items-center gap-1 px-2 py-1 bg-vgreen/10 border border-vgreen/30 rounded">
                <span className="w-1.5 h-1.5 bg-vgreen rounded-full dot-live" />
                <span className="font-mono text-[8px] text-vgreen/70 uppercase tracking-wider">ONLINE</span>
              </div>
            </>
          )}
        </div>

        {/* CENTER: Status Badges */}
        <div className="flex items-center gap-3">
          <span className="font-mono text-[9px] text-ivory/40 bg-s2/50 px-2 py-1 border border-gold/10">NEON ✓</span>
          <span className="font-mono text-[9px] text-ivory/40 bg-s2/50 px-2 py-1 border border-gold/10">Claude ✓</span>
          <span className="font-mono text-[9px] text-vorange bg-vorange/10 px-2 py-1 border border-vorange/30">n8n !</span>
        </div>

        {/* RIGHT: Avatar + Name */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full border border-gold/40 bg-gold/10 flex items-center justify-center">
            <span className="font-display text-[10px] font-bold text-gold">KZ</span>
          </div>
          <span className="font-mono text-[10px] text-ivory/60">Kacper Zdżałka</span>
        </div>
      </div>

      {/* ── NAVIGATION (h-10) ── */}
      <div className="relative z-19 h-10 flex items-center justify-between px-6 border-b border-ivory/5 bg-void/90">
        {/* LEFT: CRM + Dev */}
        <div className="flex items-center gap-6">
          <Link href="/crm" className="flex items-center gap-2 font-mono text-[10px] text-ivory/40 hover:text-ivory/70 transition">
            <Users size={14} /> CRM
          </Link>
          <Link href="/dev" className="flex items-center gap-2 font-mono text-[10px] text-ivory/40 hover:text-ivory/70 transition">
            <Code2 size={14} /> DEV
          </Link>
        </div>

        {/* CENTER: Dashboard (Active) */}
        <div className="flex items-center gap-2 font-display font-black text-gold text-sm" style={{ textShadow: '0 0 20px rgba(212,175,55,0.3)' }}>
          <ZapIcon size={14} className="animate-pulse" /> DASHBOARD
        </div>

        {/* RIGHT: Brain + Workflows + Settings */}
        <div className="flex items-center gap-6">
          <Link href="/brain" className="flex items-center gap-2 font-mono text-[10px] text-ivory/40 hover:text-ivory/70 transition">
            <Brain size={14} /> Brain
          </Link>
          <Link href="/workflows" className="flex items-center gap-2 font-mono text-[10px] text-ivory/40 hover:text-ivory/70 transition">
            <GitBranch size={14} /> Workflows
          </Link>
          <Link href="/settings" className="flex items-center gap-2 font-mono text-[10px] text-ivory/40 hover:text-ivory/70 transition">
            <Settings size={14} /> Settings
          </Link>
        </div>
      </div>

      {/* ── MAIN CONTENT (3 columns) ── */}
      <div className="relative z-10 flex-1 overflow-auto pt-6 px-6 pb-6">
        <div className="grid grid-cols-12 gap-6 max-w-7xl mx-auto h-full">

          {/* LEFT COLUMN (25%) — Stats */}
          <div className="col-span-3 flex flex-col gap-4 fade-up" style={{ animationDelay: '0ms' }}>
            {stats.map((s, i) => (
              <div
                key={s.label}
                className="vx-card vx-3d p-4 border-l-2 border-gold/40 flex flex-col gap-2 fade-up"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[8px] text-ivory/35 uppercase tracking-wider">{s.label}</span>
                </div>
                <div className="font-display text-[28px] font-black text-gold num-animate">
                  {typeof s.value === 'number' ? s.value : s.value}
                </div>
                <div className="font-mono text-[9px] text-ivory/30">{s.sub}</div>
              </div>
            ))}
          </div>

          {/* CENTER COLUMN (50%) — Recommendations + Tasks */}
          <div className="col-span-6 flex flex-col gap-6 fade-up" style={{ animationDelay: '150ms' }}>
            {/* AI Recommendations */}
            <div className="space-y-3">
              <div className="font-mono text-[9px] text-ivory/35 uppercase tracking-wider">AI Rekomendacje</div>
              {recommendations.map((rec) => {
                const colorMap: Record<string, { bg: string; border: string; line: string }> = {
                  critical: { bg: 'bg-vred/5', border: 'border-vred/30', line: 'border-l-vred' },
                  warning: { bg: 'bg-gold/5', border: 'border-gold/30', line: 'border-l-gold' },
                  info: { bg: 'bg-ivory/5', border: 'border-ivory/20', line: 'border-l-ivory/40' },
                };
                const colors = colorMap[rec.type] || colorMap.info;
                return (
                  <div
                    key={rec.id}
                    className={`vx-card p-3 border-l-2 flex items-center justify-between fade-up ${colors.bg} ${colors.border} ${colors.line}`}
                    style={{ animationDelay: `${150 + rec.id * 50}ms` }}
                  >
                    <div className="flex-1">
                      <p className="font-mono text-[12px] text-ivory/70">{rec.title}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button className="font-mono text-[8px] px-2 py-1 bg-gold/10 text-gold border border-gold/30 hover:bg-gold/20 transition">
                        {rec.action}
                      </button>
                      <button
                        onClick={() => dismissRecommendation(rec.id)}
                        className="text-ivory/30 hover:text-ivory/60 transition"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Task List */}
            <div className="vx-card p-0 overflow-hidden fade-up" style={{ animationDelay: '300ms' }}>
              <div className="px-4 py-3 border-b border-gold/10 bg-s2/50">
                <span className="font-mono text-[9px] text-ivory/45 uppercase tracking-wider">Dzisiejsze Taski</span>
              </div>
              <div className="divide-y divide-gold/5">
                {todayTasks.slice(0, 5).map((task, i) => {
                  const ps = priorityStyle[task.priority];
                  return (
                    <div
                      key={task.id}
                      className="px-4 py-3 flex items-center gap-3 hover:bg-gold/3 transition fade-up"
                      style={{ animationDelay: `${300 + i * 50}ms` }}
                    >
                      <div className={`w-2 h-2 rounded-full flex-shrink-0 ${ps.color === 'text-vred' ? 'bg-vred' : ps.color === 'text-gold' ? 'bg-gold' : 'bg-ivory/30'}`} />
                      <div className="flex-1 min-w-0">
                        <p className="font-mono text-[11px] text-ivory/70 truncate">{task.title}</p>
                      </div>
                      <span className="font-mono text-[9px] text-ivory/30 tabular-nums shrink-0">{task.time}</span>
                      <span className={`font-mono text-[7px] uppercase tracking-widest shrink-0 ${ps.color}`}>{ps.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN (25%) — Top Priorities */}
          <div className="col-span-3 flex flex-col gap-4 fade-up" style={{ animationDelay: '300ms' }}>
            <div className="font-mono text-[9px] text-ivory/35 uppercase tracking-wider">Top Priorytety</div>
            {topPriorities.map((p, i) => (
              <div
                key={p.id}
                className="vx-card vx-3d p-4 border-l-2 border-gold/40 flex flex-col gap-3 fade-up"
                style={{ animationDelay: `${300 + i * 50}ms` }}
              >
                {/* Number circle + Title */}
                <div className="flex items-start gap-2">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 font-display font-black text-[12px] text-void"
                    style={{ backgroundColor: p.color }}
                  >
                    #{i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-mono text-[11px] text-ivory/75">{p.title}</p>
                  </div>
                </div>

                {/* Deadline Badge */}
                <div className={`inline-flex items-center px-2 py-1 font-mono text-[8px] uppercase tracking-wider border rounded ${
                  p.deadline === 'DZIŚ' ? 'bg-vred/10 border-vred/40 text-vred' :
                  p.deadline === 'JUTRO' ? 'bg-gold/10 border-gold/40 text-gold' :
                  'bg-ivory/10 border-ivory/20 text-ivory/60'
                }`}>
                  {p.deadline}
                </div>

                {/* Progress bar */}
                <div className="w-full h-1 bg-ivory/10 overflow-hidden">
                  <div
                    className="h-full bar-animate"
                    style={{
                      background: `linear-gradient(to right, ${p.color}, ${p.color}dd)`,
                      width: `${p.progress}%`
                    }}
                  />
                </div>
                <div className="font-mono text-[8px] text-ivory/40">{p.progress}% done</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
