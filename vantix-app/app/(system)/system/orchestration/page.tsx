'use client';

import { useMemo } from 'react';

interface Job {
  id: string;
  type: 'decompose' | 'implement' | 'review';
  orchestrator: string;
  worker: string | null;
  status: 'completed' | 'processing' | 'pending' | 'failed';
  tokens: number;
  cost: string;
  duration: string;
  created: string;
}

const jobs: Job[] = [
  { id: 'JOB-001', type: 'decompose', orchestrator: 'Claude Sonnet', worker: 'DeepSeek R1', status: 'completed',  tokens: 2840, cost: '$0.031', duration: '4.2s',  created: '2026-05-18 14:22' },
  { id: 'JOB-002', type: 'implement', orchestrator: 'Claude Sonnet', worker: 'DeepSeek R1', status: 'completed',  tokens: 8120, cost: '$0.089', duration: '12.7s', created: '2026-05-18 13:45' },
  { id: 'JOB-003', type: 'review',    orchestrator: 'Claude Sonnet', worker: null,           status: 'processing', tokens: 1240, cost: '$0.014', duration: '...',   created: '2026-05-18 15:01' },
  { id: 'JOB-004', type: 'decompose', orchestrator: 'Claude Sonnet', worker: 'DeepSeek R1', status: 'failed',     tokens: 320,  cost: '$0.004', duration: '1.1s',  created: '2026-05-17 22:18' },
  { id: 'JOB-005', type: 'implement', orchestrator: 'Claude Sonnet', worker: 'DeepSeek R1', status: 'pending',    tokens: 0,    cost: '$0.000', duration: '—',     created: '2026-05-18 15:03' },
];

const statusBadge: Record<Job['status'], string> = {
  completed:  'vx-badge vx-badge-green',
  processing: 'vx-badge vx-badge-gold',
  pending:    'vx-badge vx-badge-gold',
  failed:     'vx-badge vx-badge-red',
};

const statusLabel: Record<Job['status'], string> = {
  completed:  'COMPLETED',
  processing: 'PROCESSING',
  pending:    'PENDING',
  failed:     'FAILED',
};

const typeLabel: Record<Job['type'], string> = {
  decompose: 'DECOMPOSE',
  implement: 'IMPLEMENT',
  review:    'REVIEW',
};

export default function OrchestrationPage() {
  const stats = useMemo(() => {
    const today = '2026-05-18';
    const todayJobs = jobs.filter(j => j.created.startsWith(today));
    const resolved = jobs.filter(j => j.status === 'completed' || j.status === 'failed');
    const completed = jobs.filter(j => j.status === 'completed');
    const totalTokens = jobs.reduce((sum, j) => sum + j.tokens, 0);
    const totalCost = jobs.reduce((sum, j) => {
      const val = parseFloat(j.cost.replace('$', ''));
      return sum + val;
    }, 0);
    const successRate = resolved.length > 0
      ? ((completed.length / resolved.length) * 100).toFixed(1)
      : '0.0';

    return {
      jobsToday: todayJobs.length,
      successRate: `${successRate}%`,
      totalTokens: totalTokens.toLocaleString(),
      totalCost: `$${totalCost.toFixed(3)}`,
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-void">
      <div className="grid-bg" />

      <div className="relative z-10 p-6 space-y-6">
        {/* ── TOP BAR ── */}
        <div className="flex items-center justify-between">
          <div>
            <span className="vx-label">Cognitive Mesh</span>
            <h1 className="font-display text-[26px] font-bold text-ivory tracking-tight mt-1">
              Orchestration
            </h1>
          </div>
          <span className="vx-badge vx-badge-gold text-[10px] px-3 py-1.5">
            3 completed today
          </span>
        </div>

        {/* ── STATS ROW ── */}
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: 'Jobs Today', value: stats.jobsToday, sub: 'May 18' },
            { label: 'Success Rate', value: stats.successRate, sub: `${jobs.filter(j => j.status === 'completed').length}/${jobs.filter(j => j.status === 'completed' || j.status === 'failed').length} resolved` },
            { label: 'Total Tokens', value: stats.totalTokens, sub: 'all jobs' },
            { label: 'Total Cost', value: stats.totalCost, sub: 'inference only' },
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
          <div className="grid grid-cols-[1fr_0.8fr_1.2fr_0.8fr_0.6fr_0.6fr_0.6fr_0.8fr] gap-3 px-4 py-3 border-b border-[rgba(212,175,55,0.1)]">
            {['Job ID', 'Type', 'Orch → Worker', 'Status', 'Tokens', 'Cost', 'Time', 'Created'].map(h => (
              <span key={h} className="label-xs">{h}</span>
            ))}
          </div>

          {/* Table rows */}
          <div className="divide-y divide-[rgba(212,175,55,0.05)]">
            {jobs.map((job, i) => (
              <div
                key={job.id}
                className="grid grid-cols-[1fr_0.8fr_1.2fr_0.8fr_0.6fr_0.6fr_0.6fr_0.8fr] gap-3 px-4 py-3.5 vx-row row-enter"
                style={{ animationDelay: `${0.1 + i * 0.06}s` }}
              >
                {/* Job ID */}
                <span className="font-mono text-[11px] text-gold">{job.id}</span>

                {/* Type badge */}
                <span className="vx-badge vx-badge-dim text-[7px]">
                  {typeLabel[job.type]}
                </span>

                {/* Orch → Worker */}
                <span className="body-sm">
                  {job.orchestrator}
                  {job.worker && (
                    <>
                      <span className="text-ivory/20 mx-1.5">→</span>
                      <span className="text-ivory/55">{job.worker}</span>
                    </>
                  )}
                </span>

                {/* Status badge */}
                <span className={statusBadge[job.status]}>
                  {statusLabel[job.status]}
                </span>

                {/* Tokens */}
                <span className="font-mono text-[11px] text-ivory/55 tabular-nums">
                  {job.tokens.toLocaleString()}
                </span>

                {/* Cost */}
                <span className="font-mono text-[11px] text-ivory/55">
                  {job.cost}
                </span>

                {/* Duration */}
                <span className="font-mono text-[11px] text-ivory/40">
                  {job.duration}
                </span>

                {/* Created */}
                <span className="font-mono text-[10px] text-ivory/35">
                  {job.created}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
