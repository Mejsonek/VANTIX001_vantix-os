'use client';

import { useMemo } from 'react';

interface DailyCost {
  date: string;
  tokens: number;
  cost: number;
}

interface ModelBreakdown {
  model: string;
  role: string;
  tokens: number;
  cost: number;
  pct: number;
}

const dailyCosts: DailyCost[] = [
  { date: '05-12', tokens: 12400, cost: 0.14 },
  { date: '05-13', tokens: 8200,  cost: 0.09 },
  { date: '05-14', tokens: 21800, cost: 0.24 },
  { date: '05-15', tokens: 5600,  cost: 0.06 },
  { date: '05-16', tokens: 18900, cost: 0.21 },
  { date: '05-17', tokens: 34200, cost: 0.38 },
  { date: '05-18', tokens: 11200, cost: 0.12 },
];

const modelBreakdown: ModelBreakdown[] = [
  { model: 'Claude Sonnet 4.6', role: 'Orchestrator', tokens: 68400, cost: 0.75, pct: 62 },
  { model: 'DeepSeek R1',       role: 'Worker',       tokens: 38200, cost: 0.31, pct: 28 },
  { model: 'Claude Haiku 4.5',  role: 'Fast tasks',   tokens: 5700,  cost: 0.06, pct: 10 },
];

export default function AnalyticsPage() {
  const stats = useMemo(() => {
    const totalTokens = dailyCosts.reduce((sum, d) => sum + d.tokens, 0);
    const totalCost = dailyCosts.reduce((sum, d) => sum + d.cost, 0);
    const avgDailyCost = totalCost / dailyCosts.length;
    const jobsRan = dailyCosts.length;

    return {
      totalTokens: totalTokens.toLocaleString(),
      totalCost: `$${totalCost.toFixed(2)}`,
      avgDailyCost: `$${avgDailyCost.toFixed(2)}`,
      jobsRan,
    };
  }, []);

  const maxCost = useMemo(() => Math.max(...dailyCosts.map(d => d.cost)), []);

  return (
    <div className="relative min-h-screen bg-void">
      <div className="grid-bg" />

      <div className="relative z-10 p-6 space-y-6">
        {/* ── TOP BAR ── */}
        <div className="flex items-center justify-between">
          <div>
            <span className="vx-label">Analytics</span>
            <h1 className="font-display text-[26px] font-bold text-ivory tracking-tight mt-1">
              AI Telemetry
            </h1>
          </div>
          <span className="vx-badge vx-badge-gold text-[10px] px-3 py-1.5">
            May 12–18
          </span>
        </div>

        {/* ── SUMMARY STATS ── */}
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: 'Total Tokens MTD', value: stats.totalTokens, sub: 'all models' },
            { label: 'Total Cost MTD',   value: stats.totalCost,   sub: 'inference only' },
            { label: 'Avg Daily Cost',   value: stats.avgDailyCost, sub: '7-day avg' },
            { label: 'Jobs Ran',         value: stats.jobsRan,      sub: 'this period' },
          ].map((stat, i) => (
            <div key={stat.label} className={`vx-card vx-3d fade-up delay-${i + 1}`}>
              <span className="label-xs">{stat.label}</span>
              <p className="value-lg mt-2">{stat.value}</p>
              <span className="label-xs mt-1">{stat.sub}</span>
              <div className="stat-accent-line" />
            </div>
          ))}
        </div>

        {/* ── BAR CHART ── */}
        <div className="vx-card">
          <span className="vx-label">Daily Cost · Last 7 Days</span>
          <div className="flex items-end justify-between gap-3 mt-6 px-2" style={{ height: 120 }}>
            {dailyCosts.map((d, i) => {
              const barHeight = (d.cost / maxCost) * 80;
              return (
                <div
                  key={d.date}
                  className="flex flex-col items-center gap-2 flex-1 row-enter"
                  style={{ animationDelay: `${0.1 + i * 0.06}s` }}
                >
                  {/* Cost label above bar */}
                  <span className="font-mono text-[9px] text-gold tabular-nums">
                    ${d.cost.toFixed(2)}
                  </span>
                  {/* Bar */}
                  <div
                    className="w-full max-w-[36px] bg-gold/60 transition-all duration-500"
                    style={{ height: `${barHeight}px`, minHeight: barHeight > 0 ? 4 : 0 }}
                  />
                  {/* Date label below */}
                  <span className="font-mono text-[9px] text-ivory/30">
                    {d.date}
                  </span>
                </div>
              );
            })}
          </div>
          {/* Baseline */}
          <div className="h-px bg-gold/10 mt-2" />
        </div>

        {/* ── MODEL BREAKDOWN TABLE ── */}
        <div className="vx-card overflow-hidden">
          <span className="vx-label mb-4 block">Model Breakdown</span>
          {/* Table header */}
          <div className="grid grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr_1fr] gap-3 px-4 py-3 border-b border-[rgba(212,175,55,0.1)]">
            {['Model', 'Role', 'Tokens', 'Cost', '% Share'].map(h => (
              <span key={h} className="label-xs">{h}</span>
            ))}
          </div>
          {/* Table rows */}
          <div className="divide-y divide-[rgba(212,175,55,0.05)]">
            {modelBreakdown.map((m, i) => (
              <div
                key={m.model}
                className="grid grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr_1fr] gap-3 px-4 py-3.5 vx-row row-enter items-center"
                style={{ animationDelay: `${0.15 + i * 0.06}s` }}
              >
                {/* Model name */}
                <span className="body-sm text-ivory/75">{m.model}</span>

                {/* Role */}
                <span className="font-mono text-[10px] text-ivory/40">{m.role}</span>

                {/* Tokens */}
                <span className="font-mono text-[11px] text-ivory/55 tabular-nums">
                  {m.tokens.toLocaleString()}
                </span>

                {/* Cost */}
                <span className="font-mono text-[11px] text-gold tabular-nums">
                  ${m.cost.toFixed(2)}
                </span>

                {/* % Share with mini progress bar */}
                <div className="flex items-center gap-2">
                  <div className="mini-progress flex-1">
                    <div
                      className="mini-progress-fill bg-gold/40"
                      style={{ width: `${m.pct}%` }}
                    />
                  </div>
                  <span className="font-mono text-[10px] text-ivory/40 tabular-nums w-8 text-right">
                    {m.pct}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
