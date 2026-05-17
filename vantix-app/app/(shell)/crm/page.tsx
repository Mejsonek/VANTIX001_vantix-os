'use client';

import LeadList from '@/components/crm/LeadList';
import { Users } from 'lucide-react';

export default function CrmPage() {
  const dateStr = new Date().toLocaleDateString('pl-PL', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <div className="grid-bg" />

      {/* Top Bar */}
      <div className="relative z-10 flex items-center justify-between px-6 py-3 border-b border-gold/[0.07] bg-void/80 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <Users size={13} className="text-gold/50" />
          <div>
            <span className="font-mono text-[10px] text-ivory/50 uppercase tracking-widest">CRM — Leady</span>
            <p className="font-mono text-[8px] text-ivory/20 mt-0.5">{dateStr}</p>
          </div>
        </div>
        <button className="btn btn-primary text-[8px]! px-3! py-1.5! flex items-center gap-1.5">
          <Users size={9} /> Nowy lead
        </button>
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 px-6 py-5 overflow-y-auto">
        <LeadList />
      </div>
    </div>
  );
}
