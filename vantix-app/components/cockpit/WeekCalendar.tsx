"'use client';

import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, CalendarDays } from 'lucide-react';

interface CalEvent {
  id: string;
  title: string;
  color: string;
}

interface CalendarDay {
  date: number;
  month: number;
  year: number;
  isToday: boolean;
  isPast: boolean;
  isCurrentMonth: boolean;
  events: CalEvent[];
}

const mockEventsByDate: Record<string, CalEvent[]> = {
  '2025-07-15': [
    { id: 'e1', title: 'Code Review', color: '#6B8FD4' },
    { id: 'e2', title: 'Sync n8n', color: '#6B8FD4' },
  ],
  '2025-07-16': [
    { id: 'e3', title: 'Demo Klient', color: '#d4af37' },
  ],
  '2025-07-17': [
    { id: 'e4', title: 'Standup', color: '#4ade80' },
    { id: 'e5', title: 'Projekt', color: '#6B8FD4' },
    { id: 'e6', title: 'Call BD', color: '#FF6D3F' },
  ],
  '2025-07-18': [
    { id: 'e7', title: 'Loom Sajid', color: '#ff5252' },
    { id: 'e8', title: 'Follow-up', color: '#d4af37' },
  ],
  '2025-07-19': [
    { id: 'e9', title: 'Review', color: '#4ade80' },
  ],
  '2025-07-22': [
    { id: 'e10', title: 'Planowanie Sprint', color: '#6B8FD4' },
  ],
  '2025-07-24': [
    { id: 'e11', title: '1:1 z Teamem', color: '#d4af37' },
  ],
  '2025-07-25': [
    { id: 'e12', title: 'Deploy', color: '#ff5252' },
    { id: 'e13', title: 'Retro', color: '#4ade80' },
  ],
  '2025-07-29': [
    { id: 'e14', title: 'Client Pitch', color: '#d4af37' },
  ],
  '2025-07-30': [
    { id: 'e15', title: 'Code Freeze', color: '#ff5252' },
  ],
};

const DAY_NAMES = ['Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'Sb', 'Nd'];

function getMonthGrid(year: number, month: number): CalendarDay[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const firstDayOfMonth = new Date(year, month, 1);
  const startDayOfWeek = (firstDayOfMonth.getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const cells: CalendarDay[] = [];

  // Previous month padding days
  for (let i = startDayOfWeek - 1; i >= 0; i--) {
    const d = daysInPrevMonth - i;
    const date = new Date(year, month - 1, d);
    cells.push({
      date: d,
      month: month - 1,
      year: month === 0 ? year - 1 : year,
      isToday: date.getTime() === today.getTime(),
      isPast: date < today,
      isCurrentMonth: false,
      events: [],
    });
  }

  // Current month
  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(year, month, d);
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    cells.push({
      date: d,
      month,
      year,
      isToday: date.getTime() === today.getTime(),
      isPast: date < today,
      isCurrentMonth: true,
      events: mockEventsByDate[dateStr] ?? [],
    });
  }

  // Next month padding days (fill to complete last row)
  const remaining = 7 - (cells.length % 7);
  if (remaining < 7) {
    for (let d = 1; d <= remaining; d++) {
      const date = new Date(year, month + 1, d);
      cells.push({
        date: d,
        month: month + 1,
        year: month === 11 ? year + 1 : year,
        isToday: date.getTime() === today.getTime(),
        isPast: date < today,
        isCurrentMonth: false,
        events: [],
      });
    }
  }

  return cells;
}

const MONTH_NAMES = [
  'Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec',
  'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień',
];

export default function MonthCalendar() {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  const days = useMemo(() => getMonthGrid(viewYear, viewMonth), [viewYear, viewMonth]);

  const goPrev = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(viewYear - 1);
    } else {
      setViewMonth(viewMonth - 1);
    }
  };

  const goNext = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(viewYear + 1);
    } else {
      setViewMonth(viewMonth + 1);
    }
  };

  const totalEvents = days.reduce((s, d) => s + d.events.length, 0);

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CalendarDays size={11} className="text-gold/60" />
          <span className="font-mono text-[9px] text-ivory/50 uppercase tracking-widest">
            {MONTH_NAMES[viewMonth]} {viewYear}
          </span>
        </div>
        <div className="flex gap-1">
          <button onClick={goPrev} className="btn btn-ghost px-1.5! py-1!">
            <ChevronLeft size={10} className="text-ivory/30 hover:text-gold/60 transition-colors" />
          </button>
          <button onClick={goNext} className="btn btn-ghost px-1.5! py-1!">
            <ChevronRight size={10} className="text-ivory/30 hover:text-gold/60 transition-colors" />
          </button>
        </div>
      </div>

      {/* Day name headers */}
      <div className="grid grid-cols-7 gap-px mb-px">
        {DAY_NAMES.map((name, i) => (
          <div
            key={name}
            className="text-center py-1.5 font-mono uppercase"
            style={{
              fontSize: '7px',
              letterSpacing: '0.15em',
              color: i >= 5 ? 'rgba(245,244,240,0.12)' : 'rgba(245,244,240,0.20)',
            }}
          >
            {name}
          </div>
        ))}
      </div>

      {/* Month grid */}
      <div className="grid grid-cols-7 gap-px">
        {days.map((day, i) => {
          const isWeekend = i % 7 >= 5;
          const maxVisibleEvents = 2;
          const visibleEvents = day.events.slice(0, maxVisibleEvents);
          const hiddenCount = day.events.length - maxVisibleEvents;

          return (
            <div
              key={`${day.year}-${day.month}-${day.date}-${i}`}
              className="relative flex flex-col p-1.5 transition-all hover:z-10 hover:scale-[1.04] cursor-default"
              style={{
                minHeight: '52px',
                background: day.isToday
                  ? 'rgba(212,175,55,0.08)'
                  : day.isCurrentMonth
                  ? 'rgba(12,12,12,0.6)'
                  : 'rgba(12,12,12,0.2)',
                border: day.isToday
                  ? '1px solid rgba(212,175,55,0.40)'
                  : '1px solid rgba(212,175,55,0.04)',
                opacity: day.isPast && !day.isToday ? 0.45 : 1,
                transformStyle: 'preserve-3d',
                transition: 'transform 0.25s ease, filter 0.25s ease',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = 'translateZ(12px) scale(1.05)';
                (e.currentTarget as HTMLDivElement).style.filter = 'drop-shadow(0 0 8px rgba(212,175,55,0.3))';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = 'translateZ(0) scale(1)';
                (e.currentTarget as HTMLDivElement).style.filter = 'none';
              }}
            >
              {/* Day number */}
              <span
                className="font-display font-bold tabular-nums leading-none mb-0.5"
                style={{
                  fontSize: '11px',
                  color: day.isToday
                    ? '#d4af37'
                    : day.isCurrentMonth
                    ? isWeekend
                      ? 'rgba(245,244,240,0.30)'
                      : 'rgba(245,244,240,0.65)'
                    : 'rgba(245,244,240,0.15)',
                  textShadow: day.isToday ? '0 0 8px rgba(212,175,55,0.6)' : 'none',
                }}
              >
                {day.date}
              </span>

              {/* Event dots / labels */}
              <div className="flex flex-col gap-px mt-auto">
                {visibleEvents.map(ev => (
                  <div
                    key={ev.id}
                    className="flex items-center gap-1 px-1 py-px overflow-hidden"
                    title={ev.title}
                    style={{
                      background: `${ev.color}14`,
                      borderLeft: `2px solid ${ev.color}`,
                    }}
                  >
                    <span
                      className="font-mono truncate"
                      style={{
                        fontSize: '6px',
                        color: ev.color,
                        letterSpacing: '0.03em',
                      }}
                    >
                      {ev.title}
                    </span>
                  </div>
                ))}
                {hiddenCount > 0 && (
                  <span
                    className="font-mono px-1"
                    style={{ fontSize: '6px', color: 'rgba(245,244,240,0.25)' }}
                  >
                    +{hiddenCount} więcej
                  </span>
                )}
              </div>

              {/* Today glow dot */}
              {day.isToday && (
                <div
                  className="absolute top-1 right-1 rounded-full"
                  style={{
                    width: '4px',
                    height: '4px',
                    background: '#d4af37',
                    boxShadow: '0 0 6px rgba(212,175,55,0.8)',
                  }}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-between pt-2" style={{ borderTop: '1px solid rgba(212,175,55,0.06)' }}>
        <span
          className="font-mono"
          style={{ fontSize: '7px', color: 'rgba(245,244,240,0.18)', letterSpacing: '0.1em' }}
        >
          {totalEvents} eventów w miesiącu
        </span>
        <div className="flex items-center gap-1.5">
          <div
            className="rounded-full"
            style={{ width: '5px', height: '5px', background: '#d4af37', boxShadow: '0 0 4px rgba(212,175,55,0.6)' }}
          />
          <span className="font-mono" style={{ fontSize: '7px', color: 'rgba(245,244,240,0.18)' }}>
            Dziś
          </span>
        </div>
      </div>
    </div>
  );
}
"