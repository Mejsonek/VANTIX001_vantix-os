'use client';

import { useState } from 'react';
import { CheckCircle2, Clock, Circle, ChevronDown, ChevronUp } from 'lucide-react';

interface PhaseTask {
  text: string;
  done: boolean;
}

interface Phase {
  id: string;
  num: number;
  label: string;
  description: string;
  status: 'done' | 'active' | 'pending';
  date: string;
  progress: number;
  color: string;
  dimColor: string;
  tasks: PhaseTask[];
}

const phases: Phase[] = [
  {
    id: 'p0', num: 0, label: 'Blueprint',
    description: 'Inicjalizacja, pamięć VANTIXRAG, schema DB, GitHub',
    status: 'done', date: '16 maja 2026', progress: 100,
    color: '#4ade80', dimColor: 'rgba(74,222,128,0.18)',
    tasks: [
      { text: 'Struktura VANTIXRAG', done: true },
      { text: 'Pamięć systemu', done: true },
      { text: 'Schema SQL — 16 tabel', done: true },
      { text: 'GitHub repo + SSH', done: true },
    ],
  },
  {
    id: 'p1', num: 1, label: 'Mockupy',
    description: 'Shell, Cockpit, CRM, DEV, Landing — mockupy z danymi',
    status: 'active', date: 'Maj 2026 — teraz', progress: 60,
    color: '#d4af37', dimColor: 'rgba(212,175,55,0.18)',
    tasks: [
      { text: 'Dual-Shell Architecture', done: true },
      { text: 'Landing page (11 sekcji)', done: true },
      { text: 'Dashboard + Cockpit', done: true },
      { text: 'CRM + DEV mockupy', done: true },
      { text: '3D UI/UX redesign', done: false },
    ],
  },
  {
    id: 'p2', num: 2, label: 'Backend MVP',
    description: 'Auth, API, Prisma, Cognitive Mesh, n8n flows',
    status: 'pending', date: 'Czerwiec 2026', progress: 0,
    color: '#6B8FD4', dimColor: 'rgba(107,143,212,0.15)',
    tasks: [
      { text: 'Supabase Auth', done: false },
      { text: 'API routes + Prisma', done: false },
      { text: 'Cognitive Mesh v1', done: false },
      { text: 'n8n flows', done: false },
    ],
  },
  {
    id: 'p3', num: 3, label: 'Beta',
    description: 'Poprawki, logi, retrievery, testy użytkownika',
    status: 'pending', date: 'Lipiec 2026', progress: 0,
    color: '#FF6D3F', dimColor: 'rgba(255,109,63,0.12)',
    tasks: [
      { text: 'Error tracking + logi', done: false },
      { text: 'AI quality evaluation', done: false },
      { text: 'User feedback loop', done: false },
    ],
  },
  {
    id: 'p4', num: 4, label: 'AI Evolution',
    description: 'Learning Lab, finanse, analityka, autonomiczne ulepszanie',
    status: 'pending', date: 'Sierpień 2026+', progress: 0,
    color: '#c084fc', dimColor: 'rgba(192,132,252,0.12)',
    tasks: [
      { text: 'AI evolution engine', done: false },
      { text: 'Learning Lab', done: false },
      { text: 'Finance + Analytics', done: false },
    ],
  },
];

export default function PhasePlatforms() {
  const [expanded, setExpanded] = useState<string | null>('p1');
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center gap-2 px-1">
        <div className="h-px w-5 bg-gold/40" />
        <span className="font-mono text-[8px] text-gold/50 uppercase tracking-widest">Roadmapa — Fazy</span>
      </div>

      {/* 3D Platform Stack */}
      <div
        style={{
          perspective: '1100px',
          perspectiveOrigin: '50% 20%',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
          {phases.map((phase, i) => {
            const isActive  = phase.status === 'active';
            const isDone    = phase.status === 'done';
            const isPending = phase.status === 'pending';
            const isHov     = hovered === phase.id;
            const isExp     = expanded === phase.id;

            const zDepth = isActive ? 30 : isDone ? 10 : -5 - (i - 1) * 4;
            const rotX   = isActive ? -1 : isDone ? 2 : 4 + (i - 2) * 1.5;
            const opac   = isActive ? 1 : isDone ? 0.75 : 0.45 - (i - 2) * 0.04;
            const scale  = isActive ? 1.01 : isDone ? 0.99 : 0.97 - (i - 2) * 0.01;

            return (
              <div
                key={phase.id}
                className={`platform-enter delay-${i + 1}`}
                style={{ animationDelay: `${i * 0.08}s` }}
                onMouseEnter={() => setHovered(phase.id)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* Platform card */}
                <div
                  style={{
                    transition: 'transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94), box-shadow 0.4s ease, opacity 0.4s ease',
                    transform: isHov
                      ? `perspective(1100px) rotateX(-1deg) translateZ(${isActive ? 38 : 20}px) scale(1.015)`
                      : `perspective(1100px) rotateX(${rotX}deg) translateZ(${zDepth}px) scale(${scale})`,
                    opacity: isHov ? 1 : opac,
                    boxShadow: isActive
                      ? `0 0 50px ${phase.color}22, 0 16px 50px rgba(0,0,0,0.6), inset 0 1px 0 ${phase.color}30`
                      : isHov
                      ? `0 0 30px ${phase.color}18, 0 12px 40px rgba(0,0,0,0.5), inset 0 1px 0 ${phase.color}20`
                      : '0 4px 20px rgba(0,0,0,0.35)',
                    background: isActive
                      ? `linear-gradient(135deg, ${phase.dimColor}, rgba(0,0,0,0.4))`
                      : 'rgba(12,12,12,0.95)',
                    border: `1px solid ${isActive || isHov ? phase.color + '45' : 'rgba(212,175,55,0.08)'}`,
                    borderTop: `2px solid ${isActive || isHov ? phase.color : 'rgba(212,175,55,0.10)'}`,
                    overflow: 'hidden',
                    cursor: 'pointer',
                  }}
                  onClick={() => setExpanded(isExp ? null : phase.id)}
                >
                  {/* Active glow streak */}
                  {isActive && (
                    <div
                      className="shimmer-line"
                      style={{
                        position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
                        background: `linear-gradient(90deg, transparent, ${phase.color}80, transparent)`,
                      }}
                    />
                  )}

                  {/* Row content */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '28px 80px 1fr 100px 28px',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '10px 14px',
                    }}
                  >
                    {/* Status icon */}
                    <div>
                      {isDone    && <CheckCircle2 size={14} style={{ color: phase.color }} />}
                      {isActive  && <Clock size={14} style={{ color: phase.color, filter: `drop-shadow(0 0 4px ${phase.color})` }} className="animate-pulse" />}
                      {isPending && <Circle size={14} style={{ color: 'rgba(245,244,240,0.15)' }} />}
                    </div>

                    {/* Phase label */}
                    <div>
                      <span
                        className="font-mono text-[7px] font-bold uppercase tracking-widest block"
                        style={{ color: isActive || isHov ? phase.color : 'rgba(245,244,240,0.25)', letterSpacing: '0.2em' }}
                      >
                        Phase {phase.num}
                      </span>
                      <span
                        className="font-display font-bold"
                        style={{ fontSize: '12px', color: isActive ? phase.color : 'rgba(245,244,240,0.55)' }}
                      >
                        {phase.label}
                      </span>
                    </div>

                    {/* Description */}
                    <span
                      className="font-mono"
                      style={{ fontSize: '9px', color: 'rgba(245,244,240,0.30)', lineHeight: 1.4 }}
                    >
                      {phase.description}
                    </span>

                    {/* Progress */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-mono" style={{ fontSize: '7px', color: 'rgba(245,244,240,0.20)', letterSpacing: '0.1em' }}>
                          {phase.date}
                        </span>
                      </div>
                      <div style={{ height: '3px', background: 'rgba(245,244,240,0.06)', overflow: 'hidden' }}>
                        {phase.progress > 0 && (
                          <div
                            className="bar-animate"
                            style={{
                              height: '100%',
                              width: `${phase.progress}%`,
                              background: `linear-gradient(to right, ${phase.color}80, ${phase.color})`,
                            }}
                          />
                        )}
                      </div>
                      <span
                        className="font-mono font-bold"
                        style={{ fontSize: '9px', color: isActive ? phase.color : 'rgba(245,244,240,0.25)', marginTop: '2px', display: 'block' }}
                      >
                        {phase.progress}%
                      </span>
                    </div>

                    {/* Expand icon */}
                    <div style={{ color: 'rgba(245,244,240,0.20)', display: 'flex', justifyContent: 'center' }}>
                      {isExp
                        ? <ChevronUp size={12} style={{ color: phase.color }} />
                        : <ChevronDown size={12} />}
                    </div>
                  </div>

                  {/* Expanded task list */}
                  {isExp && (
                    <div
                      className="fade-up"
                      style={{
                        borderTop: `1px solid ${phase.color}20`,
                        padding: '10px 14px 10px calc(28px + 80px + 14px + 12px)',
                        background: 'rgba(0,0,0,0.20)',
                      }}
                    >
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px 16px' }}>
                        {phase.tasks.map((t, ti) => (
                          <div key={ti} className={`flex items-center gap-2 row-enter delay-${ti + 1}`}>
                            {t.done
                              ? <CheckCircle2 size={9} style={{ color: phase.color, flexShrink: 0, opacity: 0.8 }} />
                              : <Circle size={9} style={{ color: 'rgba(245,244,240,0.15)', flexShrink: 0 }} />
                            }
                            <span
                              className="font-mono"
                              style={{
                                fontSize: '9px',
                                color: t.done ? 'rgba(245,244,240,0.25)' : 'rgba(245,244,240,0.45)',
                                textDecoration: t.done ? 'line-through' : 'none',
                              }}
                            >
                              {t.text}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
