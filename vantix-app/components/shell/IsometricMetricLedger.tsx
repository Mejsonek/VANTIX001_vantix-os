'use client';

import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

const metrics = [
  { label: 'Leady (aktywne)', value: '3', trend: 'up', change: '+1 dziś', color: 'gold' as const },
  { label: 'Projekty', value: '1', trend: 'stable', change: 'Phase 0 ✓', color: 'ivory' as const },
  { label: 'Taski (todo)', value: '4', trend: 'down', change: '-2 wczoraj', color: 'green' as const },
  { label: 'Cashflow est.', value: '€2.7k', trend: 'up', change: '+1 lead', color: 'gold' as const },
  { label: 'n8n flows', value: '3', trend: 'stable', change: 'aktywne', color: 'ivory' as const },
  { label: 'AI koszt/mc', value: '~80zł', trend: 'stable', change: 'Claude', color: 'ivory' as const },
];

const trendIcon = {
  up: TrendingUp,
  down: TrendingDown,
  stable: Minus,
};

const trendColor = {
  up: 'text-green',
  down: 'text-red',
  stable: 'text-ivory/20',
};

const valueColor = {
  gold: 'text-gold',
  ivory: 'text-ivory',
  green: 'text-green',
};

export default function IsometricMetricLedger() {
  return (
    <div className="flex flex-col h-screen w-[160px] bg-void/80 border-l border-gold/[0.06] relative z-20 overflow-y-auto">
      {/* Header */}
      <div className="px-3 py-2.5 border-b border-gold/[0.06]">
        <div className="flex items-center gap-1.5 mb-0.5">
          <div className="h-px flex-1 bg-gold/[0.06]" />
          <span className="font-mono text-[6px] text-gold/30 uppercase" style={{ letterSpacing: '0.25em' }}>METRICS</span>
          <div className="h-px flex-1 bg-gold/[0.06]" />
        </div>
        <div className="text-center">
          <span className="font-mono text-[7px] text-ivory/15">
            {new Date().toLocaleDateString('pl-PL', { day: 'numeric', month: 'short' })}
          </span>
        </div>
      </div>

      {/* Metrics List */}
      <div className="flex-1 px-2 py-2.5 space-y-[1px]">
        {metrics.map((metric) => {
          const Trend = trendIcon[metric.trend];
          return (
            <div
              key={metric.label}
              className="group px-2 py-2 border border-transparent hover:border-gold/[0.06] hover:bg-gold/[0.02] transition-all cursor-default"
            >
              <div className="flex items-center justify-between mb-[1px]">
                <span className="font-mono text-[7px] text-ivory/25 uppercase" style={{ letterSpacing: '0.12em' }}>
                  {metric.label}
                </span>
                <Trend size={8} className={trendColor[metric.trend]} />
              </div>
              <div className="flex items-center justify-between">
                <span className={`font-display text-base font-bold ${valueColor[metric.color]}`}>
                  {metric.value}
                </span>
                <span className="font-mono text-[7px] text-ivory/15">{metric.change}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Status Mini */}
      <div className="px-2 py-2 border-t border-gold/[0.06]">
        <div className="flex items-center gap-1.5 mb-1.5">
          <div className="h-px flex-1 bg-gold/[0.04]" />
          <span className="font-mono text-[6px] text-gold/20 uppercase" style={{ letterSpacing: '0.2em' }}>STATUS</span>
          <div className="h-px flex-1 bg-gold/[0.04]" />
        </div>
        <div className="space-y-1">
          {[
            { name: 'Neon', status: 'ok' as const },
            { name: 'Claude', status: 'ok' as const },
            { name: 'n8n', status: 'warn' as const },
            { name: 'Vercel', status: 'ok' as const },
          ].map((s) => (
            <div key={s.name} className="flex items-center gap-1.5 px-1.5">
              <span className={`w-1 h-1 rounded-full ${
                s.status === 'ok' ? 'bg-green shadow-[0_0_4px_rgba(74,222,128,0.3)]' :
                s.status === 'warn' ? 'bg-orange shadow-[0_0_4px_rgba(255,109,63,0.3)]' :
                'bg-red'
              }`} />
              <span className="font-mono text-[7px] text-ivory/20 uppercase" style={{ letterSpacing: '0.12em' }}>{s.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
