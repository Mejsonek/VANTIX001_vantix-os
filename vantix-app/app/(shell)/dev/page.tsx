'use client';

import { useState } from 'react';
import { Code2 } from 'lucide-react';
import ProjectCard, { type Project } from '@/components/dev/ProjectCard';
import RoadmapTimeline from '@/components/dev/RoadmapTimeline';

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
    description: 'Landing page vantix.pl (11 sekcji, mobile-first)',
    phase: 'phase1',
    progress: 95,
    lastCommit: 'b5f6229',
    commits: 8,
    updatedAt: '2026-05-17',
    repo: 'https://github.com/SolutionKacper/VANTIX001_vantix-os',
  },
];

export default function DevPage() {
  const [dateStr] = useState(() =>
    new Date().toLocaleDateString('pl-PL', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  );

  return (
    <div className="flex flex-col min-h-screen">
      <div className="grid-bg" />

      {/* Top Bar */}
      <div className="relative z-10 flex items-center justify-between px-8 py-4 border-b border-gold/10">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Code2 size={12} className="text-gold/60" />
            <span className="font-mono text-xs text-ivory/40 uppercase tracking-widest">Vantix DEV</span>
          </div>
          <div className="w-px h-4 bg-gold/10" />
          <p className="font-mono text-[10px] text-ivory/20">{dateStr}</p>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 px-8 py-6 overflow-y-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-6">
          {/* Left — Projekty */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Code2 size={11} className="text-gold/60" />
              <span className="font-mono text-[9px] text-ivory/50 uppercase tracking-widest">Projekty</span>
              <span className="font-mono text-[8px] text-ivory/15 ml-1">({mockProjects.length})</span>
            </div>
            <div className="space-y-3">
              {mockProjects.map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>
          </div>

          {/* Right — Roadmapa */}
          <div>
            <RoadmapTimeline />
          </div>
        </div>
      </div>
    </div>
  );
}
