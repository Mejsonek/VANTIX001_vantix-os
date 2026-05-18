'use client';

import { useMemo } from 'react';
import { Play } from 'lucide-react';

interface Flow {
  id: string;
  name: string;
  trigger: 'webhook' | 'cron' | 'manual';
  status: 'active' | 'inactive';
  lastRun: string;
  runs: number;
  errors: number;
}

const flows: Flow[] = [
  { id: 'WF-001', name: 'VANTIXRAG GitHub Sync',    trigger: 'webhook', status: 'active',   lastRun: '2026-05-18 12:30', runs: 47, errors: 0 },
  { id: 'WF-002', name: 'New Lead Alert',            trigger: 'webhook', status: 'active',   lastRun: '2026-05-18 09:14', runs: 12, errors: 1 },
  { id: 'WF-003', name: 'Lead Follow-up Reminder',   trigger: 'cron',    status: 'active',   lastRun: '2026-05-18 09:00', runs: 31, errors: 0 },
  { id: 'WF-004', name: 'Daily Briefing',            trigger: 'cron',    status: 'active',   lastRun: '2026-05-18 08:00', runs: 28, errors: 0 },
  { id: 'WF-005', name: 'Evolution Proposals',       trigger: 'manual',  status: 'inactive', lastRun: '—',              runs: 0,  errors: 0 },
];

const statusBadgeClass: Record<Flow['status'], string> = {
  active:   'vx-badge vx-badge-green',
  inactive: 'vx-badge vx-badge-dim',
};

const triggerBadgeClass: Record<Flow['trigger'], string> = {
  webhook: 'vx-badge vx-badge-gold',
  cron:    'vx-badge vx-badge-blue',
  manual:  'vx-badge vx-badge-dim',
};

const triggerLabel: Record<Flow['trigger'], string> = {
  webhook: 'WEBHOOK',
  cron:    'CRON',
  manual:  'MANUAL',
};

export default function WorkflowsPage() {
  const stats = useMemo(() => {
    const active = flows.filter(f => f.status === 'active').length;
    const today = '2026-05-18';
    const runsToday = flows.filter(f => f.lastRun.startsWith(today)).length;
    const errorsToday = flows
      .filter(f => f.lastRun.startsWith(today))
      .reduce((sum, f) => sum + f.errors, 0);

    return { active, runsToday: runsToday, errorsToday };
  }, []);

  return (
    <div className="relative min-h-screen bg-void">
      <div className="grid-bg" />

      <div className="relative z-10 p-6 space-y-6">
        {/* ── TOP BAR ── */}
        <div className="flex items-center justify-between">
          <div>
            <span className="vx-label">Workflows</span>
            <h1 className="font-display text-[26px] font-bold text-ivory tracking-tight mt-1">
              n8n
            </h1>
          </div>
          <span className="vx-badge vx-badge-gold text-[10px] px-3 py-1.5">
            WARN — sleeping
          </span>
        </div>

        {/* ── STATS ROW ── */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Active Flows', value: stats.active, sub: 'of 5 total' },
            { label: 'Runs Today', value: stats.runsToday, sub: 'May 18' },
            { label: 'Errors Today', value: stats.errorsToday, sub: stats.errorsToday > 0 ? 'needs attention' : 'clean' },
          ].map((stat, i) => (
            <div key={stat.label} className={`vx-card vx-3d fade-up delay-${i + 1}`}>
              <span className="label-xs">{stat.label}</span>
              <p className="value-lg mt-2">{stat.value}</p>
              <span className="label-xs mt-1">{stat.sub}</span>
              <div className="stat-accent-line" />
            </div>
          ))}
        </div>

        {/* ── TABLE ── */}
        <div className="vx-card overflow-hidden">
          {/* Table header */}
          <div className="grid grid-cols-[1.4fr_0.7fr_0.7fr_0.9fr_0.5fr_0.5fr_0.8fr] gap-3 px-4 py-3 border-b border-[rgba(212,175,55,0.1)]">
            {['Flow', 'Trigger', 'Status', 'Last Run', 'Runs', 'Errors', ''].map(h => (
              <span key={h} className="label-xs">{h}</span>
            ))}
          </div>

          {/* Table rows */}
          <div className="divide-y divide-[rgba(212,175,55,0.05)]">
            {flows.map((flow, i) => (
              <div
                key={flow.id}
                className="grid grid-cols-[1.4fr_0.7fr_0.7fr_0.9fr_0.5fr_0.5fr_0.8fr] gap-3 px-4 py-3.5 vx-row row-enter items-center"
                style={{ animationDelay: `${0.1 + i * 0.06}s` }}
              >
                {/* Flow name + ID */}
                <div className="flex flex-col">
                  <span className="body-sm text-ivory/75">{flow.name}</span>
                  <span className="font-mono text-[10px] text-ivory/30 mt-0.5">{flow.id}</span>
                </div>

                {/* Trigger badge */}
                <span className={triggerBadgeClass[flow.trigger]}>
                  {triggerLabel[flow.trigger]}
                </span>

                {/* Status badge */}
                <span className={statusBadgeClass[flow.status]}>
                  {flow.status === 'active' ? 'ACTIVE' : 'INACTIVE'}
                </span>

                {/* Last run */}
                <span className="font-mono text-[11px] text-ivory/55 tabular-nums">
                  {flow.lastRun}
                </span>

                {/* Runs count */}
                <span className="font-mono text-[11px] text-ivory/55 tabular-nums">
                  {flow.runs}
                </span>

                {/* Errors count */}
                <span className={`font-mono text-[11px] tabular-nums ${flow.errors > 0 ? 'text-vred' : 'text-ivory/35'}`}>
                  {flow.errors}
                </span>

                {/* Trigger button — disabled, mock */}
                <button
                  disabled
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.08em] text-ivory/25 bg-gold/5 border border-gold/10 opacity-40 cursor-not-allowed"
                >
                  <Play size={11} />
                  Trigger
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
