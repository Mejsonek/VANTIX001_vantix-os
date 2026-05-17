'use client';

import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';

/* ── Mock data ── */
const sections = [
  { key: '00_CORE',     label: 'Core Engine',       type: 'system',    files: 4,  updated: '2026-05-18', status: 'active' },
  { key: '01_MASTER',   label: 'Master Memory',     type: 'master',    files: 5,  updated: '2026-05-18', status: 'active' },
  { key: '02_PROFILE',  label: 'Owner Profile',     type: 'profile',   files: 4,  updated: '2026-05-17', status: 'active' },
  { key: '03_PROJECTS', label: 'Projects',          type: 'project',   files: 8,  updated: '2026-05-18', status: 'active' },
  { key: '04_KNOWLEDGE',label: 'Knowledge Base',    type: 'knowledge', files: 12, updated: '2026-05-17', status: 'active' },
  { key: '05_MODULES',  label: 'Shell Mini-RAGs',   type: 'module',    files: 18, updated: '2026-05-16', status: 'active' },
  { key: '06_PROMPTS',  label: 'Prompt Library',    type: 'prompts',   files: 6,  updated: '2026-05-15', status: 'active' },
  { key: '07_MEMORY',   label: 'AI Memory Layer',   type: 'memory',    files: 9,  updated: '2026-05-18', status: 'active' },
  { key: '08_EVOLUTION',label: 'Evolution Queue',   type: 'evo',       files: 2,  updated: '2026-05-17', status: 'pending' },
  { key: '09_EVAL',     label: 'Evaluation',        type: 'eval',      files: 3,  updated: '2026-05-14', status: 'active' },
];

export default function BrainPage() {
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return sections;
    return sections.filter(
      s => s.label.toLowerCase().includes(q) || s.key.toLowerCase().includes(q),
    );
  }, [search]);

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <div className="grid-bg" />

      {/* ══════════════════ TOP BAR ══════════════════ */}
      <div
        className="relative z-10 flex items-center border-b border-gold/[0.07] bg-void/90 backdrop-blur-md"
        style={{ height: '48px', padding: '0 16px' }}
      >
        {/* Label */}
        <div className="flex items-center gap-2 flex-1">
          <div className="h-px w-6 bg-gold/40" />
          <span className="font-mono text-[9px] text-gold/40 uppercase tracking-[0.3em]">
            BRAIN / VANTIXRAG
          </span>
        </div>

        {/* Search */}
        <div className="relative w-[220px]">
          <Search size={11} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-ivory/20 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Szukaj sekcji…"
            className="w-full h-7 pl-7 pr-2.5 bg-surface border border-gold/15 font-mono text-[10px] text-ivory/60 placeholder:text-ivory/20 outline-none focus:border-gold/35 transition-colors"
          />
        </div>
      </div>

      {/* ══════════════════ CONTENT ══════════════════ */}
      <div className="relative z-10 flex-1 overflow-y-auto px-5 py-5">
        <div className="grid grid-cols-2 gap-3">
          {filtered.map((s, i) => (
            <div
              key={s.key}
              className={`vx-card p-4! flex flex-col gap-3 fade-up delay-${i + 1}`}
            >
              {/* Top row: key + status badge */}
              <div className="flex items-center justify-between">
                <span className="font-mono text-[9px] text-gold/50 uppercase tracking-[0.16em]">
                  {s.key}
                </span>
                <span className={s.status === 'active' ? 'vx-badge vx-badge-green' : 'vx-badge vx-badge-gold'}>
                  {s.status}
                </span>
              </div>

              {/* Label */}
              <span className="font-mono text-[13px] text-ivory/80 leading-snug">
                {s.label}
              </span>

              {/* Bottom row: files + updated */}
              <div className="flex items-center gap-3 mt-auto">
                <span className="font-mono text-[10px] text-ivory/35">
                  {s.files} plików
                </span>
                <span className="w-px h-3 bg-gold/10" />
                <span className="font-mono text-[10px] text-ivory/25">
                  {s.updated}
                </span>
              </div>
            </div>
          ))}

          {/* Empty state */}
          {filtered.length === 0 && (
            <div className="col-span-2 flex items-center justify-center py-16">
              <span className="font-mono text-[11px] text-ivory/20 uppercase tracking-[0.14em]">
                Brak wyników dla &quot;{search}&quot;
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
