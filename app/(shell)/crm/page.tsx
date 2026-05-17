'use client';

import { useState, useEffect } from 'react';
import LeadList from '@/components/crm/LeadList';
import { Users } from 'lucide-react';

export default function CrmPage() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dateStr] = useState(() =>
    new Date().toLocaleDateString('pl-PL', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  );

  useEffect(() => {
    fetch('/api/leads')
      .then((res) => res.json())
      .then((data) => {
        setLeads(data.data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
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
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <span className="font-mono text-xs text-ivory/20">Ładowanie leadów...</span>
          </div>
        ) : (
          <LeadList initialLeads={leads} />
        )}
      </div>
    </div>
  );
}
