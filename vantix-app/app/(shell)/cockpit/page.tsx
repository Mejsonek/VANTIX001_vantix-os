'use client';

import { useState } from 'react';
import TodayTasks from '@/components/cockpit/TodayTasks';

import MonthCalendar from '@/components/cockpit/WeekCalendar';
import PriorityList from '@/components/cockpit/PriorityList';
import AIRecommendations from '@/components/cockpit/AIRecommendations';
import { Crosshair, ListChecks, CalendarDays, Zap, TrendingUp, Clock } from 'lucide-react';

const quickStats = [
  { label: 'Produktywność', value: '72%',  delta: '+5% vs wtorek', icon: TrendingUp, color: 'text-vgreen', border: 'border-l-vgreen/40' },
  { label: 'Taski dziś',    value: '6',    delta: '2 ukończone',   icon: ListChecks, color: 'text-gold',   border: 'border-l-gold/50' },
  { label: 'Eventy',        value: '3',    delta: '1 za 2h',       icon: CalendarDays, color: 'text-vblue', border: 'border-l-vblue/40' },
  { label: 'Backlog',       value: '12',   delta: 'do zrobienia',  icon: Crosshair,  color: 'text-vorange', border: 'border-l-vorange/40' },
];

export default function CockpitPage() {
  const [dateStr] = useState(() =>
    new Date().toLocaleDateString('pl-PL', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
  );

  return (
    <div className="flex flex-col min-h-screen">
      <div className="grid-bg" />

      {/* ── TOP BAR ── */}
      <div className="relative z-10 flex items-center justify-between px-6 py-3 border-b border-gold/[0.07] bg-void/80 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <Crosshair size={13} className="text-gold/50" />
          <div>
            <span className="font-mono text-[10px] text-ivory/50 uppercase tracking-widest">Personal Cockpit</span>
            <p className="font-mono text-[8px] text-ivory/20 mt-0.5">{dateStr}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2 py-1 border border-gold/10">
            <Clock size={9} className="text-ivory/20" />
            <span className="font-mono text-[8px] text-ivory/25">Focus Mode</span>
          </div>
          <button className="btn btn-dim !text-[8px] !px-3 !py-1.5 flex items-center gap-1.5">
            <Zap size={9} /> Quick Add
          </button>
        </div>
      </div>

      <div className="relative z-10 flex-1 overflow-y-auto px-6 py-5">

        {/* ── STATS ROW ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
          {quickStats.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={s.label}
                className={`vx-card vx-3d !p-4 border-l-2 ${s.border} fade-up delay-${i + 1}`}
                style={{ position: 'relative' }}
              >
                <div className="stat-accent-line" />
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[8px] text-ivory/25 uppercase tracking-wider">{s.label}</span>
                  <Icon size={10} className={`${s.color} opacity-60`} />
                </div>
                <div className={`font-display text-2xl font-black ${s.color} num-animate delay-${i + 2}`}>{s.value}</div>
                <div className="font-mono text-[8px] text-ivory/20 mt-1">{s.delta}</div>
              </div>
            );
          })}
        </div>

        {/* ── MAIN GRID ── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">

          {/* Left — Tasks (wider) */}
          <div className="lg:col-span-3 fade-up delay-3">
            <div className="vx-card">
              <TodayTasks />
            </div>
          </div>

          {/* Right — Calendar + Priorities + AI */}
          <div className="lg:col-span-2 space-y-4 fade-up delay-4">
            <div className="vx-card">
              <MonthCalendar />
            </div>
            <div className="vx-card">
              <PriorityList />
            </div>
            <div className="fade-up delay-5">
              <AIRecommendations />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
