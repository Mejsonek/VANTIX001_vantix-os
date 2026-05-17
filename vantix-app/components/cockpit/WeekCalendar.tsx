'use client';

import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, CalendarDays } from 'lucide-react';

interface CalEvent {
  id: string;
  title: string;
  startHour: number;
  duration: number;
  color: string;
  bgColor: string;
}

interface CalendarDay {
  date: number;
  dayName: string;
  isToday: boolean;
  isPast: boolean;
  events: CalEvent[];
}

const mockEventsByDay: CalEvent[][] = [
  // Pn
  [
    { id: 'e1', title: 'Code Review', startHour: 9,  duration: 1, color: '#6B8FD4', bgColor: 'rgba(107,143,212,0.15)' },
    { id: 'e2', title: 'Sync n8n',   startHour: 14, duration: 1, color: '#6B8FD4', bgColor: 'rgba(107,143,212,0.12)' },
  ],
  // Wt
  [
    { id: 'e3', title: 'Demo Klient', startHour: 11, duration: 1.5, color: '#d4af37', bgColor: 'rgba(212,175,55,0.12)' },
  ],
  // Śr
  [
    { id: 'e4', title: 'Standup',    startHour: 9,  duration: 0.5, color: '#4ade80', bgColor: 'rgba(74,222,128,0.10)' },
    { id: 'e5', title: 'Projekt',    startHour: 13, duration: 2,   color: '#6B8FD4', bgColor: 'rgba(107,143,212,0.12)' },
    { id: 'e6', title: 'Call BD',    startHour: 16, duration: 1,   color: '#FF6D3F', bgColor: 'rgba(255,109,63,0.10)' },
  ],
  // Cz (today)
  [
    { id: 'e7', title: 'Loom Sajid', startHour: 10, duration: 1.5, color: '#ff5252', bgColor: 'rgba(255,82,82,0.12)' },
    { id: 'e8', title: 'Follow-up',  startHour: 15, duration: 1,   color: '#d4af37', bgColor: 'rgba(212,175,55,0.12)' },
  ],
  // Pt
  [
    { id: 'e9', title: 'Review',     startHour: 9,  duration: 1, color: '#4ade80', bgColor: 'rgba(74,222,128,0.10)' },
  ],
  // Sb
  [],
  // Nd
  [],
];

const HOURS = [9, 10, 11, 12, 13, 14, 15, 16, 17];
const HOUR_H = 36;
const GRID_START = 9;

function getWeekDays(): CalendarDay[] {
  const today = new Date();
  const days: CalendarDay[] = [];
  const firstDay = new Date(today);
  firstDay.setDate(today.getDate() - ((today.getDay() + 6) % 7));

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
      isToday,
      isPast,
      events: mockEventsByDay[i] ?? [],
    });
  }
  return days;
}

export default function WeekCalendar() {
  const [days] = useState(getWeekDays);
  const [hoveredDay, setHoveredDay] = useState<number | null>(null);

  const todayIdx = useMemo(() => days.findIndex(d => d.isToday), [days]);

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CalendarDays size={11} className="text-gold/60" />
          <span className="font-mono text-[9px] text-ivory/50 uppercase tracking-widest">Tydzień</span>
        </div>
        <div className="flex gap-1">
          <button className="btn btn-ghost px-1.5! py-1!">
            <ChevronLeft size={10} className="text-ivory/30" />
          </button>
          <button className="btn btn-ghost px-1.5! py-1!">
            <ChevronRight size={10} className="text-ivory/30" />
          </button>
        </div>
      </div>

      {/* 3D Grid container */}
      <div
        style={{
          perspective: '900px',
          perspectiveOrigin: '50% 0%',
        }}
      >
        <div
          style={{
            transformStyle: 'preserve-3d',
            transition: 'transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94)',
            transform: hoveredDay !== null
              ? 'rotateX(0deg)'
              : 'rotateX(8deg) translateY(-6px)',
          }}
          onMouseEnter={() => setHoveredDay(-1)}
          onMouseLeave={() => setHoveredDay(null)}
        >
          {/* Day headers */}
          <div className="grid grid-cols-[32px_repeat(7,1fr)] gap-px mb-1">
            <div />
            {days.map((day, i) => (
              <div
                key={i}
                onMouseEnter={() => setHoveredDay(i)}
                className={`col-rise delay-${i + 1} text-center py-2 transition-colors`}
                style={{
                  animationDelay: `${i * 0.05}s`,
                  background: day.isToday
                    ? 'rgba(212,175,55,0.08)'
                    : hoveredDay === i
                    ? 'rgba(245,244,240,0.03)'
                    : 'transparent',
                  borderBottom: day.isToday
                    ? '2px solid rgba(212,175,55,0.50)'
                    : '1px solid rgba(212,175,55,0.06)',
                  transform: day.isToday ? 'translateZ(8px)' : 'translateZ(0)',
                  transition: 'all 0.25s ease',
                }}
              >
                <div
                  className="font-mono uppercase"
                  style={{
                    fontSize: '7px',
                    letterSpacing: '0.15em',
                    color: day.isToday ? '#d4af37' : 'rgba(245,244,240,0.25)',
                  }}
                >
                  {day.dayName}
                </div>
                <div
                  className="font-display font-bold"
                  style={{
                    fontSize: '14px',
                    lineHeight: '1.2',
                    color: day.isToday
                      ? '#d4af37'
                      : day.isPast
                      ? 'rgba(245,244,240,0.20)'
                      : 'rgba(245,244,240,0.65)',
                    textShadow: day.isToday ? '0 0 12px rgba(212,175,55,0.5)' : 'none',
                    marginTop: '2px',
                  }}
                >
                  {day.date}
                </div>
              </div>
            ))}
          </div>

          {/* Time grid */}
          <div className="relative">
            {/* Hour rows */}
            {HOURS.map((hour, hi) => (
              <div
                key={hour}
                className="grid grid-cols-[32px_repeat(7,1fr)] gap-px"
                style={{ height: `${HOUR_H}px` }}
              >
                {/* Time label */}
                <div
                  className="font-mono flex items-start pt-0.5"
                  style={{ fontSize: '7px', color: 'rgba(245,244,240,0.18)', letterSpacing: '0.05em' }}
                >
                  {hour}:00
                </div>
                {/* Day columns */}
                {days.map((day, di) => (
                  <div
                    key={di}
                    style={{
                      borderTop: hi === 0 ? 'none' : '1px solid rgba(212,175,55,0.04)',
                      background: day.isToday
                        ? 'rgba(212,175,55,0.015)'
                        : hoveredDay === di
                        ? 'rgba(245,244,240,0.01)'
                        : 'transparent',
                      position: 'relative',
                      transition: 'background 0.2s',
                    }}
                  />
                ))}
              </div>
            ))}

            {/* Events overlay */}
            <div
              className="absolute inset-0 grid grid-cols-[32px_repeat(7,1fr)] gap-px pointer-events-none"
            >
              <div />
              {days.map((day, di) => (
                <div key={di} className="relative" style={{ pointerEvents: 'auto' }}>
                  {day.events.map(ev => {
                    const top = (ev.startHour - GRID_START) * HOUR_H;
                    const height = ev.duration * HOUR_H - 2;
                    return (
                      <div
                        key={ev.id}
                        title={ev.title}
                        style={{
                          position: 'absolute',
                          top: `${top + 2}px`,
                          left: '1px',
                          right: '1px',
                          height: `${height}px`,
                          background: ev.bgColor,
                          borderLeft: `2px solid ${ev.color}`,
                          padding: '2px 4px',
                          overflow: 'hidden',
                          cursor: 'default',
                          transition: 'filter 0.2s',
                          filter: hoveredDay === di ? `drop-shadow(0 0 4px ${ev.color}60)` : 'none',
                        }}
                      >
                        <span
                          className="font-mono"
                          style={{
                            fontSize: '7px',
                            color: ev.color,
                            letterSpacing: '0.05em',
                            display: 'block',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          {ev.title}
                        </span>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>

            {/* Current time indicator (only today) */}
            {todayIdx >= 0 && (() => {
              const now = new Date();
              const frac = (now.getHours() - GRID_START + now.getMinutes() / 60);
              if (frac < 0 || frac > HOURS.length) return null;
              const topPx = frac * HOUR_H;
              const colW = 100 / 7;
              return (
                <div
                  style={{
                    position: 'absolute',
                    top: `${topPx}px`,
                    left: `calc(32px + ${todayIdx * colW}%)`,
                    width: `${colW}%`,
                    height: '1px',
                    background: 'rgba(212,175,55,0.70)',
                    boxShadow: '0 0 6px rgba(212,175,55,0.5)',
                    pointerEvents: 'none',
                  }}
                >
                  <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#d4af37', marginTop: '-2px', boxShadow: '0 0 8px rgba(212,175,55,0.8)' }} />
                </div>
              );
            })()}
          </div>

          {/* Legend */}
          <div className="flex items-center gap-4 mt-3 pt-2" style={{ borderTop: '1px solid rgba(212,175,55,0.06)' }}>
            <span className="font-mono" style={{ fontSize: '7px', color: 'rgba(245,244,240,0.18)', letterSpacing: '0.1em' }}>
              {days.reduce((s, d) => s + d.events.length, 0)} eventów w tygodniu
            </span>
            <div className="flex items-center gap-1.5">
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#d4af37' }} />
              <span className="font-mono" style={{ fontSize: '7px', color: 'rgba(245,244,240,0.20)' }}>Dziś</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
