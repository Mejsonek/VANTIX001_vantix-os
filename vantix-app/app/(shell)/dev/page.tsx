'use client';

import { useState } from 'react';
import { Code2, GitBranch, Layers, Clock, TrendingUp, ExternalLink } from 'lucide-react';
import ProjectCard, { type Project } from '@/components/dev/ProjectCard';
import PhasePlatforms from '@/components/dev/PhasePlatforms';

const mockProjects: Project[] = [
  {
    id: 'P-001',
    name: 'VANTIX001_vantix-os',
    description: 'Vantix OS — centralny system operacyjny',
    phase: 'phase1',
    progress: 60,
    lastCommit: '01cab56',
    commits: 25,
    updatedAt: '2026-05-18',
    repo: 'https://github.com/SolutionKacper/VANTIX001_vantix-os',
  },
  {
    id: 'P-002',
    name: 'Vantix N8N',
    description: 'Automatyzacje n8n na Hugging Face Spaces',
    phase: 'phase1',
    progress: 90,
    lastCommit: 'ac9d899',
    commits: 3,
    updatedAt: '2026-05-17',
    repo: 'https://huggingface.co/spaces/SolutionKacper/VantixN8N',
  },
  {
    id: 'P-003',
    name: 'Vantix Landing',
    description: 'Landing page vantix.pl — 11 sekcji, mobile-first',
    phase: 'phase1',
    progress: 95,
    lastCommit: 'b5f6229',
    commits: 8,
    updatedAt: '2026-05-17',
    repo: 'https://github.com/SolutionKacper/VANTIX001_vantix-os',
  },
];

const devStats = [
  { label: 'Projekty aktywne', value: '3',    icon: Layers,     color: 'text-gold',    border: 'border-l-gold/50' },
  { label: 'Commity łącznie',  value: '36',   icon: GitBranch,  color: 'text-vblue',   border: 'border-l-vblue/40' },
  { label: 'Avg progress',     value: '82%',  icon: TrendingUp, color: 'text-vgreen',  border: 'border-l-vgreen/40' },
  { label: 'Ostatnia zmiana',  value: 'dziś', icon: Clock,      color: 'text-ivory/60', border: 'border-l-ivory/15' },
];

export default function DevPage() {
  const [dateStr] = useState(() =>
    new Date().toLocaleDateString('pl-PL', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
  );

  const totalCommits = mockProjects.reduce((s, p) => s + p.commits, 0);
  void totalCommits;

  return (
    <div className="flex flex-col min-h-screen">
      <div className="grid-bg" />

      {/* ── TOP BAR ── */}
      <div className="relative z-10 flex items-center justify-between px-6 py-3 border-b border-gold/[0.07] bg-void/80 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <Code2 size={13} className="text-gold/50" />
          <div>
            <span className="font-mono text-[10px] text-ivory/50 uppercase tracking-widest">Vantix DEV</span>
            <p className="font-mono text-[8px] text-ivory/20 mt-0.5">{dateStr}</p>
          </div>
        </div>
        <button className="btn btn-dim text-[8px]! px-3! py-1.5! flex items-center gap-1.5">
          <ExternalLink size={9} /> GitHub →
        </button>
      </div>

      <div className="relative z-10 flex-1 overflow-y-auto px-6 py-5">

        {/* ── STATS ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
          {devStats.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={s.label}
                className={`vx-card vx-3d p-4! border-l-2 ${s.border} fade-up delay-${i + 1}`}
                style={{ position: 'relative' }}
              >
                <div className="stat-accent-line" />
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[8px] text-ivory/25 uppercase tracking-wider">{s.label}</span>
                  <Icon size={10} className={`${s.color} opacity-60`} />
                </div>
                <div className={`font-display text-2xl font-black ${s.color} num-animate delay-${i + 2}`}>{s.value}</div>
              </div>
            );
          })}
        </div>

        {/* ── MAIN LAYOUT ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-5">

          {/* Left — Projects */}
          <div className="fade-up delay-3">
            {/* Section header */}
            <div className="flex items-center gap-2 mb-3 px-1">
              <div className="h-px w-5 bg-gold/40" />
              <span className="font-mono text-[8px] text-gold/50 uppercase tracking-widest">Projekty</span>
              <span className="font-mono text-[8px] text-ivory/15">({mockProjects.length})</span>
            </div>

            {/* Projects table */}
            <div className="vx-card p-0! overflow-hidden">
              {/* Table header */}
              <div className="grid grid-cols-[1fr_0.5fr_0.4fr] px-4 py-2.5 border-b border-gold/10 bg-s2">
                {['Projekt', 'Faza', 'Progress'].map(h => (
                  <span key={h} className="font-mono text-[7px] text-ivory/20 uppercase tracking-widest">{h}</span>
                ))}
              </div>

              {/* Table rows */}
              <div className="divide-y divide-gold/4">
                {mockProjects.map((p, i) => (
                  <a
                    key={p.id}
                    href={p.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`vx-row grid grid-cols-[1fr_0.5fr_0.4fr] px-4 py-4 no-underline row-enter delay-${i + 4}`}
                  >
                    <div className="min-w-0">
                      <p className="font-mono text-[11px] text-ivory/70 font-semibold truncate">{p.name}</p>
                      <p className="font-mono text-[8px] text-ivory/25 mt-0.5 truncate">{p.description}</p>
                      <div className="flex items-center gap-3 mt-1.5">
                        <span className="font-mono text-[8px] text-ivory/20">
                          <GitBranch size={7} className="inline mr-1 opacity-60" />
                          {p.commits} commits
                        </span>
                        <span className="font-mono text-[8px] text-ivory/15">{p.updatedAt}</span>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <span className={`font-mono text-[7px] px-2 py-0.5 border uppercase tracking-wider ${
                        p.phase === 'phase1' ? 'border-gold/30 text-gold/80 bg-gold/5' :
                        p.phase === 'phase2' ? 'border-vblue/30 text-vblue bg-vblue/5' :
                        'border-ivory/15 text-ivory/30'
                      }`}>
                        Phase {p.phase.replace('phase', '')}
                      </span>
                    </div>

                    <div className="flex flex-col justify-center gap-1">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[8px] text-gold/60 font-semibold">{p.progress}%</span>
                      </div>
                      <div className="w-full h-1 bg-gold/10 overflow-hidden">
                        <div
                          className="h-full bg-gold bar-animate"
                          style={{ width: `${p.progress}%` }}
                        />
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Project cards (detailed) */}
            <div className="mt-4 space-y-3">
              {mockProjects.map((p, i) => (
                <div key={`card-${p.id}`} className={`fade-up delay-${i + 5}`}>
                  <ProjectCard project={p} />
                </div>
              ))}
            </div>
          </div>

          {/* Right — Roadmap */}
          <div className="fade-up delay-4">
            <div className="flex items-center gap-2 mb-3 px-1">
              <div className="h-px w-5 bg-gold/40" />
              <span className="font-mono text-[8px] text-gold/50 uppercase tracking-widest">Roadmapa</span>
            </div>
            <div className="vx-card">
              <PhasePlatforms />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
