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
      <div className="relative z-10 flex items-center justify-between px-8 py-4 border-b border-gold/10">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Users size={12} className="text-gold/60" />
            <span className="font-mono text-xs text-ivory/40 uppercase tracking-widest">CRM</span>
          </div>
          <div className="w-px h-4 bg-gold/10" />
          <p className="font-mono text-[10px] text-ivory/20">{dateStr}</p>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 px-8 py-6 overflow-y-auto">
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
