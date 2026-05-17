'use client';

import { useState } from 'react';
import { Check, AlertTriangle, Calendar, Archive, Zap } from 'lucide-react';

interface MatrixTask {
  id: number;
  text: string;
  done: boolean;
  time?: string;
}

interface Quadrant {
  id: string;
  label: string;
  sub: string;
  icon: typeof AlertTriangle;
  color: string;
  border: string;
  bg: string;
  glow: string;
  textColor: string;
  tasks: MatrixTask[];
}

const initialQuadrants: Quadrant[] = [
  {
    id: 'q1',
    label: 'DO TERAZ',
    sub: 'Pilne + Ważne',
    icon: Zap,
    color: '#ff5252',
    border: 'rgba(255,82,82,0.30)',
    bg: 'rgba(255,82,82,0.04)',
    glow: '0 0 40px rgba(255,82,82,0.14), 0 12px 40px rgba(0,0,0,0.5)',
    textColor: '#ff5252',
    tasks: [
      { id: 1, text: 'Nagraj Loom dla Sajida (StepUp)', done: false, time: '10:00' },
      { id: 2, text: 'Follow-up Darek — 48h bez odpowiedzi', done: false, time: '11:30' },
    ],
  },
  {
    id: 'q2',
    label: 'ZAPLANUJ',
    sub: 'Ważne, Nie Pilne',
    icon: Calendar,
    color: '#d4af37',
    border: 'rgba(212,175,55,0.28)',
    bg: 'rgba(212,175,55,0.03)',
    glow: '0 0 40px rgba(212,175,55,0.12), 0 12px 40px rgba(0,0,0,0.5)',
    textColor: '#d4af37',
    tasks: [
      { id: 3, text: 'Oferta dla klienta z Reddita', done: false, time: '14:00' },
      { id: 5, text: 'Aktualizuj roadmapę Vantix OS', done: false, time: '16:00' },
      { id: 6, text: 'Przejrzyj VANTIXRAG brain sections', done: false },
    ],
  },
  {
    id: 'q3',
    label: 'DELEGUJ',
    sub: 'Pilne, Nieważne',
    icon: AlertTriangle,
    color: '#FF6D3F',
    border: 'rgba(255,109,63,0.22)',
    bg: 'rgba(255,109,63,0.03)',
    glow: '0 0 30px rgba(255,109,63,0.10), 0 12px 40px rgba(0,0,0,0.5)',
    textColor: '#FF6D3F',
    tasks: [
      { id: 4, text: 'Sprawdź status deploy n8n', done: true, time: '09:00' },
    ],
  },
  {
    id: 'q4',
    label: 'ELIMINUJ',
    sub: 'Nie Pilne, Nieważne',
    icon: Archive,
    color: 'rgba(245,244,240,0.22)',
    border: 'rgba(245,244,240,0.07)',
    bg: 'rgba(245,244,240,0.01)',
    glow: '0 12px 40px rgba(0,0,0,0.4)',
    textColor: 'rgba(245,244,240,0.22)',
    tasks: [],
  },
];

export default function PriorityMatrix() {
  const [quadrants, setQuadrants] = useState(initialQuadrants);
  const [hovered, setHovered] = useState<string | null>(null);

  const toggle = (qId: string, taskId: number) => {
    setQuadrants(prev =>
      prev.map(q =>
        q.id !== qId ? q : {
          ...q,
          tasks: q.tasks.map(t => t.id === taskId ? { ...t, done: !t.done } : t),
        }
      )
    );
  };

  const totalTasks = quadrants.reduce((s, q) => s + q.tasks.length, 0);
  const doneTasks  = quadrants.reduce((s, q) => s + q.tasks.filter(t => t.done).length, 0);

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <div className="h-px w-5 bg-gold/40" />
          <span className="font-mono text-[8px] text-gold/50 uppercase tracking-widest">Priority Matrix</span>
        </div>
        <span className="font-mono text-[8px] text-ivory/20">
          {doneTasks}/{totalTasks} ukończone
        </span>
      </div>

      {/* Axis labels */}
      <div className="relative grid grid-cols-2 gap-2">
        {/* Horizontal axis: PILNOŚĆ */}
        <div
          className="absolute top-0 left-0 right-0 flex justify-around pointer-events-none"
          style={{ transform: 'translateY(-14px)' }}
        >
          <span className="font-mono text-[7px] text-ivory/20 uppercase tracking-widest">← Mniej pilne</span>
          <span className="font-mono text-[7px] text-ivory/20 uppercase tracking-widest">Bardziej pilne →</span>
        </div>

        {/* Vertical axis label (simulated) */}
        <div className="absolute -left-2 top-0 bottom-0 flex flex-col justify-center pointer-events-none">
          <span
            className="font-mono text-[7px] text-ivory/20 uppercase tracking-widest whitespace-nowrap"
            style={{ transform: 'rotate(-90deg) translateX(-50%)', transformOrigin: 'center', writingMode: 'vertical-lr' }}
          >
            Ważność ↕
          </span>
        </div>

        {quadrants.map((q, i) => {
          const Icon = q.icon;
          const isHovered = hovered === q.id;
          const doneCnt = q.tasks.filter(t => t.done).length;

          return (
            <div
              key={q.id}
              onMouseEnter={() => setHovered(q.id)}
              onMouseLeave={() => setHovered(null)}
              className={`matrix-card-enter delay-${i + 1}`}
              style={{
                animationDelay: `${i * 0.08}s`,
                transition: 'transform 0.35s cubic-bezier(0.25,0.46,0.45,0.94), box-shadow 0.35s ease',
                transform: isHovered
                  ? 'perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(22px) scale(1.02)'
                  : 'perspective(900px) rotateX(5deg) rotateY(-1deg)',
                boxShadow: isHovered ? q.glow : '0 8px 32px rgba(0,0,0,0.4)',
                background: q.bg,
                border: `1px solid ${isHovered ? q.color : q.border}`,
                padding: '14px',
                position: 'relative',
                overflow: 'hidden',
                minHeight: '130px',
                cursor: 'default',
              }}
            >
              {/* Top accent line */}
              <div
                style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                  background: `linear-gradient(to right, ${q.color}, transparent)`,
                  opacity: isHovered ? 1 : 0.4,
                  transition: 'opacity 0.3s',
                }}
              />

              {/* Corner glow orb */}
              <div
                style={{
                  position: 'absolute', top: '-20px', right: '-20px',
                  width: '80px', height: '80px',
                  borderRadius: '50%',
                  background: `radial-gradient(circle, ${q.color}18 0%, transparent 70%)`,
                  opacity: isHovered ? 1 : 0.5,
                  transition: 'opacity 0.3s',
                  pointerEvents: 'none',
                }}
              />

              {/* Header */}
              <div className="flex items-start justify-between mb-2.5">
                <div>
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <Icon size={9} style={{ color: q.textColor }} />
                    <span
                      className="font-mono text-[7px] font-bold uppercase tracking-widest"
                      style={{ color: q.textColor }}
                    >
                      {q.label}
                    </span>
                  </div>
                  <span className="font-mono text-[7px]" style={{ color: 'rgba(245,244,240,0.20)' }}>
                    {q.sub}
                  </span>
                </div>
                {q.tasks.length > 0 && (
                  <div
                    className="font-mono text-[8px] font-bold px-1.5 py-0.5"
                    style={{
                      color: q.textColor,
                      background: `${q.color}12`,
                      border: `1px solid ${q.border}`,
                      minWidth: '18px',
                      textAlign: 'center',
                    }}
                  >
                    {q.tasks.length}
                  </div>
                )}
              </div>

              {/* Tasks */}
              <div className="space-y-1.5">
                {q.tasks.length === 0 ? (
                  <p className="font-mono text-[8px]" style={{ color: 'rgba(245,244,240,0.12)' }}>
                    Brak zadań
                  </p>
                ) : (
                  q.tasks.map(task => (
                    <button
                      key={task.id}
                      onClick={() => toggle(q.id, task.id)}
                      className="w-full flex items-center gap-2 text-left group/task"
                      style={{ cursor: 'pointer' }}
                    >
                      <div
                        style={{
                          width: '12px', height: '12px', flexShrink: 0,
                          border: task.done ? `1px solid ${q.color}` : '1px solid rgba(245,244,240,0.12)',
                          background: task.done ? `${q.color}18` : 'transparent',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          transition: 'all 0.2s',
                        }}
                      >
                        {task.done && <Check size={7} style={{ color: q.color }} />}
                      </div>
                      <span
                        className="font-mono text-[9px] leading-tight flex-1"
                        style={{
                          color: task.done ? 'rgba(245,244,240,0.18)' : 'rgba(245,244,240,0.50)',
                          textDecoration: task.done ? 'line-through' : 'none',
                        }}
                      >
                        {task.text}
                      </span>
                      {task.time && !task.done && (
                        <span className="font-mono text-[7px]" style={{ color: 'rgba(245,244,240,0.15)', flexShrink: 0 }}>
                          {task.time}
                        </span>
                      )}
                    </button>
                  ))
                )}
              </div>

              {/* Progress mini-bar */}
              {q.tasks.length > 0 && (
                <div
                  style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0, height: '2px',
                    background: 'rgba(245,244,240,0.05)',
                  }}
                >
                  <div
                    className="bar-animate"
                    style={{
                      height: '100%',
                      width: `${q.tasks.length > 0 ? (doneCnt / q.tasks.length) * 100 : 0}%`,
                      background: q.color,
                      opacity: 0.6,
                    }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
