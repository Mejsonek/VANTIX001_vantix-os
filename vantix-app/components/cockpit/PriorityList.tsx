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

export default function PriorityList() {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <Zap size={11} className="text-gold/60" />
        <span className="font-mono text-[9px] text-ivory/50 uppercase tracking-widest">Top Priorytety</span>
      </div>

      <div className="space-y-2">
        {mockPriorities.map((priority, idx) => (
          <div
            key={priority.id}
            className={`px-3 py-2.5 border transition-all ${
              idx === 0
                ? 'border-gold/30 bg-gold/[0.04]'
                : 'border-gold/[0.06] hover:border-gold/15'
            }`}
          >
            <div className="flex items-start gap-2.5 mb-2">
              <div className="flex-shrink-0 w-5 h-5 border border-gold/15 flex items-center justify-center">
                <span className="font-mono text-[8px] text-gold/50">{idx + 1}</span>
              </div>
              <div className="flex-1">
                <p className="font-mono text-[11px] text-ivory/60 font-semibold">{priority.title}</p>
                <p className="font-mono text-[9px] text-ivory/25 mt-0.5">{priority.description}</p>
              </div>
            </div>

            <div className="ml-7">
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-mono text-[8px] text-ivory/20 uppercase tracking-wider">{priority.deadline}</span>
                <span className="font-mono text-[8px] text-gold/50">{priority.progress}%</span>
              </div>
              <div className="w-full h-[3px] bg-gold/10 overflow-hidden">
                <div
                  className="h-full bg-gold transition-all duration-500"
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
