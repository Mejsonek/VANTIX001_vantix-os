'use client';

import { Calendar, CheckCircle2, Circle, Clock, ArrowRight } from 'lucide-react';

export interface Milestone {
  id: string;
  phase: string;
  title: string;
  description: string;
  status: 'done' | 'active' | 'pending';
  date: string;
  tasks: { text: string; done: boolean }[];
}

const mockMilestones: Milestone[] = [
  {
    id: 'M-001',
    phase: 'Phase 0',
    title: 'Blueprint & Inicjalizacja',
    description: 'Definicja architektury, struktura repo, konfiguracja Neon + Vercel',
    status: 'done',
    date: '2026-05-16',
    tasks: [
      { text: 'Stworzenie VANTIXRAG struktury', done: true },
      { text: 'Wypełnienie pamięci systemu', done: true },
      { text: 'Schema.sql — 16 tabel', done: true },
      { text: 'GitHub repo + SSH', done: true },
      { text: 'Neon DB: leads + brain_sections', done: true },
    ],
  },
  {
    id: 'M-002',
    phase: 'Phase 1',
    title: 'Mockupy Modułów',
    description: 'Shell, Cockpit, CRM, DEV, Landing page — mockupy z mock data',
    status: 'active',
    date: '2026-05-16 — obecnie',
    tasks: [
      { text: 'Shell / Launcher mockup', done: true },
      { text: 'Shell redesign (Vantix DS)', done: true },
      { text: 'Personal Cockpit', done: true },
      { text: 'Landing page (11 sekcji)', done: true },
      { text: 'Dual-Shell Architecture', done: true },
      { text: 'CRM — lista leadów', done: true },
      { text: 'DEV — projekty + roadmapa', done: false },
      { text: 'System Panel placeholdery', done: true },
    ],
  },
  {
    id: 'M-003',
    phase: 'Phase 2',
    title: 'Backend MVP',
    description: 'Auth, API routes, Prisma schema, Cognitive Mesh, n8n flows',
    status: 'pending',
    date: 'Plan: maj/czerwiec 2026',
    tasks: [
      { text: 'Supabase Auth', done: false },
      { text: 'API endpoints (/api/crm/*)', done: false },
      { text: 'Prisma schema + migracje', done: false },
      { text: 'Middleware auth check', done: false },
      { text: 'n8n New Lead Alert flow', done: false },
      { text: 'VANTIXRAG Brain integration', done: false },
    ],
  },
  {
    id: 'M-004',
    phase: 'Phase 3',
    title: 'Beta',
    description: 'Poprawki, logi, retrievery, flows, testy użytkownika',
    status: 'pending',
    date: 'Plan: lipiec 2026',
    tasks: [
      { text: 'System status monitoring', done: false },
      { text: 'Error tracking + logi', done: false },
      { text: 'AI quality evaluation', done: false },
      { text: 'User feedback loop', done: false },
    ],
  },
  {
    id: 'M-005',
    phase: 'Phase 4',
    title: 'AI Evolution',
    description: 'Autonomiczne ulepszanie, learning lab, finanse, analityka',
    status: 'pending',
    date: 'Plan: sierpień 2026+',
    tasks: [
      { text: 'AI evolution engine', done: false },
      { text: 'Learning Lab', done: false },
      { text: 'Finance module', done: false },
      { text: 'Advanced Analytics', done: false },
    ],
  },
];

const statusIcon = (status: string) => {
  switch (status) {
    case 'done':
      return <CheckCircle2 size={13} className="text-vgreen" />;
    case 'active':
      return <Clock size={13} className="text-gold animate-pulse" />;
    default:
      return <Circle size={13} className="text-ivory/10" />;
  }
};

export default function RoadmapTimeline() {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <Calendar size={11} className="text-gold/60" />
        <span className="font-mono text-[9px] text-ivory/50 uppercase tracking-widest">Roadmapa</span>
      </div>

      <div className="relative space-y-0">
        {/* Vertical line */}
        <div className="absolute left-[19px] top-2 bottom-2 w-px bg-gold/10" />

        {mockMilestones.map((m) => {
          const isActive = m.status === 'active';
          const isDone = m.status === 'done';

          return (
            <div key={m.id} className="relative pl-12 pb-6">
              {/* Node */}
              <div className={`absolute left-[14px] top-1.5 z-10 p-1 rounded-full ${isActive ? 'bg-gold/10 ring-1 ring-gold/30' : isDone ? 'bg-vgreen/10' : 'bg-s2'}`}>
                {statusIcon(m.status)}
              </div>

              {/* Content */}
              <div className={`p-4 border transition-colors ${isActive ? 'border-gold/30 bg-gold/[0.03]' : isDone ? 'border-gold/[0.06] opacity-60' : 'border-gold/[0.04] opacity-40'}`}>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`font-mono text-[8px] uppercase tracking-[0.2em] ${isActive ? 'text-gold' : 'text-ivory/25'}`}>
                    {m.phase}
                  </span>
                </div>
                <h3 className={`font-display text-sm font-semibold mb-1 ${isActive ? 'text-ivory/80' : 'text-ivory/40'}`}>
                  {m.title}
                </h3>
                <p className="font-mono text-[10px] text-ivory/25 mb-2 leading-relaxed">
                  {m.description}
                </p>
                <p className="font-mono text-[9px] text-ivory/15 mb-2">{m.date}</p>

                {/* Tasks */}
                <div className="space-y-0.5">
                  {m.tasks.map((t, i) => (
                    <div key={i} className="flex items-center gap-2">
                      {t.done ? (
                        <CheckCircle2 size={9} className="text-vgreen/60 flex-shrink-0" />
                      ) : (
                        <Circle size={9} className="text-ivory/10 flex-shrink-0" />
                      )}
                      <span className={`font-mono text-[9px] ${t.done ? 'text-ivory/20 line-through' : 'text-ivory/25'}`}>
                        {t.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}