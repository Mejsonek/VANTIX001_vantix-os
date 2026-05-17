'use client';

import { ChevronLeft, ChevronRight, CalendarDays } from 'lucide-react';
import { useState } from 'react';

interface CalendarDay {
  date: number;
  dayName: string;
  events: number;
  isToday: boolean;
  isPast: boolean;
}

function getWeekDays(): CalendarDay[] {
  const today = new Date();
  const days: CalendarDay[] = [];

  const firstDay = new Date(today);
  firstDay.setDate(today.getDate() - today.getDay() + 1);

  for (let i = 0; i < 7; i++) {
    const date = new Date(firstDay);
    date.setDate(firstDay.getDate() + i);

    const isToday =
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();

    const isPast = date < today && !isToday;

    days.push({
      date: date.getDate(),
      dayName: date.toLocaleDateString('pl-PL', { weekday: 'short' }),
      events: Math.floor(Math.random() * 4),
      isToday,
      isPast,
    });
  }

  return days;
}

const dayNames = ['Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'Sb', 'Nd'];

export default function WeekCalendar() {
  const [days] = useState(getWeekDays);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <CalendarDays size={11} className="text-gold/60" />
          <span className="font-mono text-[9px] text-ivory/50 uppercase tracking-widest">Tydzień</span>
        </div>
        <div className="flex gap-1">
          <button className="btn btn-ghost !px-1.5 !py-1">
            <ChevronLeft size={10} className="text-ivory/30" />
          </button>
          <button className="btn btn-ghost !px-1.5 !py-1">
            <ChevronRight size={10} className="text-ivory/30" />
          </button>
        </div>
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1.5">
        {days.map((day, idx) => (
          <div
            key={idx}
            className={`
              p-2.5 text-center transition-all cursor-default border
              ${day.isToday
                ? 'border-gold/40 bg-gold/10'
                : day.isPast
                  ? 'border-gold/[0.04] opacity-30'
                  : 'border-gold/[0.06] hover:border-gold/15'
              }
            `}
          >
            <div className="font-mono text-[8px] text-ivory/30 uppercase tracking-wider mb-1">
              {dayNames[idx]}
            </div>
            <div className={`font-display text-lg font-bold mb-0.5 ${day.isToday ? 'text-gold' : 'text-ivory/60'}`}>
              {day.date}
            </div>
            <div className="font-mono text-[7px] text-ivory/20">
              {day.events} event{day.events !== 1 ? 'ów' : ''}
            </div>
            {day.events > 0 && (
              <div className="flex gap-1 justify-center mt-1.5">
                {Array.from({ length: Math.min(day.events, 3) }).map((_, i) => (
                  <div key={i} className="w-1 h-1 bg-gold/40" />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
