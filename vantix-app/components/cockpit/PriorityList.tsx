'use client';

import { Zap } from 'lucide-react';

interface Priority {
  id: string;
  title: string;
  description: string;
  deadline: string;
  progress: number;
}

const mockPriorities: Priority[] = [
  {
    id: '1',
    title: 'Finish Vantix OS MVP',
    description: 'Build Personal Cockpit module and integrate with backend',
    deadline: 'Dziś',
    progress: 65,
  },
  {
    id: '2',
    title: 'Review lead proposals',
    description: 'Follow up with 3 new clients from this week',
    deadline: 'Jutro',
    progress: 30,
  },
  {
    id: '3',
    title: 'AI evolution session',
    description: 'Document proposals and update VANTIXRAG master',
    deadline: 'W piątek',
    progress: 10,
  },
];

function getRankStyle(idx: number) {
  switch (idx) {
    case 0: return 'bg-gold/15 border-gold/40 text-gold';
    case 1: return 'bg-vblue/10 border-vblue/30 text-vblue';
    default: return 'bg-ivory/5 border-ivory/10 text-ivory/30';
  }
}

function getDeadlineBadge(deadline: string) {
  const lower = deadline.toLowerCase();
  if (lower === 'dziś') return 'bg-vred/10 border-vred/30 text-vred';
  if (lower === 'jutro') return 'bg-gold/10 border-gold/30 text-gold';
  return 'border-ivory/10 text-ivory/25';
}

function getProgressFill(idx: number) {
  switch (idx) {
    case 0: return 'from-gold/60 to-gold';
    case 1: return 'from-vblue/60 to-vblue';
    default: return 'from-ivory/20 to-ivory/30';
  }
}

function getProgressTextColor(idx: number) {
  switch (idx) {
    case 0: return 'text-gold';
    case 1: return 'text-vblue';
    default: return 'text-ivory/30';
  }
}

export default function PriorityList() {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <Zap size={11} className="text-gold/60" />
        <span className="font-mono text-[9px] text-ivory/50 uppercase tracking-widest">Top Priorytety</span>
      </div>

      <div className="space-y-2.5">
        {mockPriorities.map((priority, idx) => (
          <div
            key={priority.id}
            className={`vx-card vx-3d p-4! ${
              idx === 0
                ? 'border-l-2! border-l-gold/60 bg-gold/[0.02]'
                : 'border-l-2! border-l-transparent'
            }`}
            style={{ position: 'relative' }}
          >
            <div className="flex items-start gap-3 mb-2.5">
              {/* Rank circle */}
              <div
                className={`flex-shrink-0 w-9 h-9 rounded-full border flex items-center justify-center font-display font-bold text-[14px] ${getRankStyle(idx)}`}
              >
                {idx + 1}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-mono text-[13px] text-ivory/80 font-semibold leading-tight">{priority.title}</p>
                <p className="font-mono text-[11px] text-ivory/40 leading-relaxed ml-[48px] mt-0.5">{priority.description}</p>
              </div>
            </div>

            <div className="ml-[48px]">
              <div className="flex items-center justify-between mb-1.5">
                {/* Deadline badge */}
                <span className={`inline-block px-2 py-0.5 border font-mono text-[8px]! uppercase tracking-wider ${getDeadlineBadge(priority.deadline)}`}>
                  {priority.deadline}
                </span>
                <span className={`font-mono text-[11px] font-bold ${getProgressTextColor(idx)}`}>
                  {priority.progress}%
                </span>
              </div>
              {/* Progress bar with gradient */}
              <div className="w-full h-[4px] bg-gold/8 overflow-hidden">
                <div
                  className={`h-full bar-animate bg-gradient-to-r ${getProgressFill(idx)}`}
                  style={{ width: `${priority.progress}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
