'use client';

import { GitBranch, GitCommit, Clock, ExternalLink, ArrowUpRight } from 'lucide-react';

export interface Project {
  id: string;
  name: string;
  description: string;
  phase: 'phase0' | 'phase1' | 'phase2' | 'phase3' | 'phase4';
  progress: number;
  lastCommit: string;
  commits: number;
  updatedAt: string;
  repo: string;
  activityLast7Days?: number[];
}

const phaseCfg: Record<string, { label: string; border: string; text: string; bg: string }> = {
  phase0: { label: 'Phase 0', border: 'border-ivory/15',  text: 'text-ivory/40',  bg: 'bg-ivory/5' },
  phase1: { label: 'Phase 1', border: 'border-gold/35',   text: 'text-gold/90',   bg: 'bg-gold/6' },
  phase2: { label: 'Phase 2', border: 'border-vblue/35',  text: 'text-vblue',     bg: 'bg-vblue/6' },
  phase3: { label: 'Phase 3', border: 'border-vorange/35',text: 'text-vorange',   bg: 'bg-vorange/6' },
  phase4: { label: 'Phase 4', border: 'border-vgreen/35', text: 'text-vgreen',    bg: 'bg-vgreen/6' },
};

const progressColor: Record<string, string> = {
  phase0: 'bg-ivory/30',
  phase1: 'bg-gold',
  phase2: 'bg-vblue',
  phase3: 'bg-vorange',
  phase4: 'bg-vgreen',
};

function ActivityHeatmap({ data }: { data?: number[] }) {
  const bars = data ?? [0, 0, 0, 0, 0, 0, 0];
  const max = Math.max(...bars, 1);
  const haData = data && data.some(v => v > 0);

  return (
    <div className="flex items-end gap-px h-6 mb-4">
      {bars.map((v, i) => {
        const heightPct = haData ? Math.max(3, Math.round((v / max) * 100)) : 4;
        const opacity = haData ? (v / max) * 0.85 + 0.10 : 0.15;
        return (
          <div
            key={i}
            className="flex-1"
            style={{
              height: `${heightPct}%`,
              minHeight: '3px',
              maxWidth: '12px',
              background: `rgba(212,175,55,${opacity.toFixed(2)})`,
            }}
            title={`Dzień ${i + 1}: ${v} commitów`}
          />
        );
      })}
    </div>
  );
}

export default function ProjectCard({ project }: { project: Project }) {
  const cfg = phaseCfg[project.phase];
  const barColor = progressColor[project.phase];

  return (
    <a
      href={project.repo}
      target="_blank"
      rel="noopener noreferrer"
      className="vx-card vx-3d group block p-5! no-underline"
      style={{ position: 'relative' }}
    >
      <div className="stat-accent-line" />

      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className={`font-mono text-[7px] px-1.5 py-0.5 border uppercase tracking-widest ${cfg.border} ${cfg.text} ${cfg.bg}`}>
              {cfg.label}
            </span>
            <span className="font-mono text-[8px] text-ivory/15">{project.id}</span>
          </div>
          <p className="font-display text-[15px] font-bold text-ivory/85 truncate">{project.name}</p>
          <p className="font-mono text-[9px] text-ivory/35 mt-0.5 leading-relaxed">{project.description}</p>
        </div>
        <div className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <ArrowUpRight size={14} className="text-gold/60" />
        </div>
      </div>

      {/* Progress */}
      <div className="mb-3">
        <div className="flex items-center justify-between mb-1.5">
          <span className="font-mono text-[9px] text-ivory/30 uppercase tracking-wider">Progress</span>
          <span className={`font-display text-[16px] font-black ${cfg.text}`}>{project.progress}%</span>
        </div>
        <div className="w-full h-[4px] bg-gold/8 overflow-hidden">
          <div className={`h-full ${barColor} bar-animate`} style={{ width: `${project.progress}%` }} />
        </div>
        <div className="flex justify-between mt-1">
          {[0, 25, 50, 75, 100].map(n => (
            <span key={n} className={`font-mono text-[6px] ${project.progress >= n ? cfg.text + ' opacity-60' : 'text-ivory/10'}`}>
              {n}%
            </span>
          ))}
        </div>
      </div>

      {/* Activity heatmap */}
      <ActivityHeatmap data={project.activityLast7Days} />

      {/* Meta grid */}
      <div className="grid grid-cols-3 gap-2 pt-3 border-t border-gold/6">
        <div className="flex items-center gap-1.5">
          <GitCommit size={9} className="text-ivory/25 shrink-0" />
          <div>
            <p className="font-mono text-[11px] text-ivory/55 leading-none">{project.lastCommit}</p>
            <p className="font-mono text-[9px] text-ivory/30 mt-0.5">last commit</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <GitBranch size={9} className="text-ivory/25 shrink-0" />
          <div>
            <p className="font-display text-[14px] font-bold text-ivory/55 leading-none">{project.commits}</p>
            <p className="font-mono text-[9px] text-ivory/30 mt-0.5">commits</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock size={9} className="text-ivory/25 shrink-0" />
          <div>
            <p className="font-mono text-[11px] text-ivory/55 leading-none">{project.updatedAt}</p>
            <p className="font-mono text-[9px] text-ivory/30 mt-0.5">updated</p>
          </div>
        </div>
      </div>

      {/* Hover footer */}
      <div className="flex items-center gap-1.5 mt-3 pt-2.5 border-t border-gold/4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <ExternalLink size={8} className="text-gold/50" />
        <span className="font-mono text-[8px] text-gold/50">Otwórz repozytorium →</span>
      </div>
    </a>
  );
}
