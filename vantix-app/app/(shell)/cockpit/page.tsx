'use client';

import { useState } from 'react';
import TodayTasks from '@/components/cockpit/TodayTasks';
import WeekCalendar from '@/components/cockpit/WeekCalendar';
import PriorityList from '@/components/cockpit/PriorityList';
import AIRecommendations from '@/components/cockpit/AIRecommendations';
import { Crosshair, ListChecks, CalendarDays, Zap } from 'lucide-react';

export default function CockpitPage() {
  const [dateStr] = useState(() =>
    new Date().toLocaleDateString('pl-PL', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  );

  const quickStats = [
    { label: 'Produktywność', value: '72%', icon: Zap, gold: false },
    { label: 'Taski dzisiaj', value: '6', icon: ListChecks, gold: false },
    { label: 'Eventy', value: '3', icon: CalendarDays, gold: false },
    { label: 'Do zrobienia', value: '12', icon: Crosshair, gold: true },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <div className="grid-bg" />

      {/* Top Bar */}
      <div className="relative z-10 flex items-center justify-between px-8 py-4 border-b border-gold/10">
        <div className="flex items-center gap-4">
          <div>
            <span className="font-mono text-xs text-ivory/40 uppercase tracking-widest">Personal Cockpit</span>
            <p className="font-mono text-[10px] text-ivory/20 mt-0.5">{dateStr}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 px-8 py-6 overflow-y-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
          {/* Left Column — Today's Tasks */}
          <div className="lg:col-span-2">
            <div className="vx-card">
              <TodayTasks />
            </div>
          </div>

          {/* Right Column — Calendar, Priorities, AI */}
          <div className="lg:col-span-2 space-y-5">
            <div className="vx-card">
              <WeekCalendar />
            </div>
            <div className="vx-card">
              <PriorityList />
            </div>
            <AIRecommendations />
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {quickStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="vx-card !p-4 text-center">
                <div className="flex items-center justify-center gap-1.5 mb-1.5">
                  <Icon size={10} className={stat.gold ? 'text-gold/60' : 'text-ivory/20'} />
                  <span className="font-mono text-[9px] text-ivory/30 uppercase tracking-wider">{stat.label}</span>
                </div>
                <p className={`font-display text-xl font-bold ${stat.gold ? 'text-gold' : 'text-ivory/70'}`}>
                  {stat.value}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
