'use client';

import { Calendar, GitBranch, GitCommit, Clock, ArrowRight } from 'lucide-react';

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
}

const phaseCfg: Record<string, { label: string; cls: string }> = {
  phase0: { label: 'Phase 0', cls: 'vx-badge vx-badge-dim' },
  phase1: { label: 'Phase 1', cls: 'vx-badge vx-badge-gold' },
  phase2: { label: 'Phase 2', cls: 'vx-badge vx-badge-blue' },
  phase3: { label: 'Phase 3', cls: 'vx-badge vx-badge-orange' },
  phase4: { label: 'Phase 4', cls: 'vx-badge vx-badge-green' },
};

export default function ProjectCard({ project }: { project: Project }) {
  const cfg = phaseCfg[project.phase];

  return (
    <a
      href={project.repo}
      target="_blank"
      rel="noopener noreferrer"
      className="vx-card group block !p-5 hover:border-gold/30 transition-colors"
      style={{ textDecoration: 'none' }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="font-display text-sm font-semibold text-ivory/80 mb-0.5">{project.name}</p>
          <p className="font-mono text-[10px] text-ivory/30">{project.description}</p>
        </div>
        <span className={cfg.cls}>{cfg.label}</span>
      </div>

      {/* Progress Bar */}
      <div className="mb-3">
        <div className="flex items-center justify-between mb-1">
          <span className="font-mono text-[8px] text-ivory/20 uppercase tracking-wider">Progress</span>
          <span className="font-mono text-[8px] text-gold/50">{project.progress}%</span>
        </div>
        <div className="w-full h-[3px] bg-gold/10 overflow-hidden">
          <div
            className="h-full bg-gold transition-all duration-500"
            style={{ width: `${project.progress}%` }}
          />
        </div>
      </div>

      {/* Meta */}
      <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gold/10">
        <div className="flex items-center gap-1.5">
          <GitCommit size={9} className="text-ivory/15" />
          <span className="font-mono text-[9px] text-ivory/25">{project.lastCommit}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <GitBranch size={9} className="text-ivory/15" />
          <span className="font-mono text-[9px] text-ivory/25">{project.commits} commits</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock size={9} className="text-ivory/15" />
          <span className="font-mono text-[9px] text-ivory/25">{project.updatedAt}</span>
        </div>
        <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
          <ArrowRight size={9} className="text-gold/60" />
          <span className="font-mono text-[9px] text-gold/60">Repo →</span>
        </div>
      </div>
    </a>
  );
}