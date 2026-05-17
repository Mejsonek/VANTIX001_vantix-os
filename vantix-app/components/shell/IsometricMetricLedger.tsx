'use client';

import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

type TrendKey = 'up' | 'down' | 'stable';
type ColorKey = 'gold' | 'ivory' | 'green';

const metrics: { label: string; value: string; trend: TrendKey; change: string; color: ColorKey }[] = [
  { label: 'Leady',      value: '3',    trend: 'up',     change: '+1 dziś',    color: 'gold' },
  { label: 'Projekty',   value: '1',    trend: 'stable', change: 'Phase 0 ✓',  color: 'ivory' },
  { label: 'Taski',      value: '4',    trend: 'down',   change: '-2 wczoraj', color: 'green' },
  { label: 'Cashflow',   value: '€2.7k',trend: 'up',     change: '+1 lead',    color: 'gold' },
  { label: 'n8n flows',  value: '3',    trend: 'stable', change: 'aktywne',    color: 'ivory' },
  { label: 'AI koszt',   value: '~80zł',trend: 'stable', change: 'Claude',     color: 'ivory' },
];

const trendIcon: Record<TrendKey, React.ElementType> = {
  up: TrendingUp,
  down: TrendingDown,
  stable: Minus,
};

const trendColor: Record<TrendKey, string> = {
  up:     'text-vgreen',
  down:   'text-vred',
  stable: 'text-ivory/25',
};

const valueColor: Record<ColorKey, string> = {
  gold:  'text-gold',
  ivory: 'text-ivory/80',
  green: 'text-vgreen',
};

const statusItems = [
  { name: 'Neon',   status: 'ok'   as const },
  { name: 'Claude', status: 'ok'   as const },
  { name: 'n8n',    status: 'warn' as const },
  { name: 'Vercel', status: 'ok'   as const },
];

export default function IsometricMetricLedger() {
  return (
    <div className="flex flex-col h-screen w-[160px] bg-void/80 border-l border-gold/6 relative z-20 overflow-y-auto">
      {/* Header */}
      <div className="px-3 py-2.5 border-b border-gold/6">
        <div className="flex items-center gap-1.5 mb-0.5">
          <div className="h-px flex-1 bg-gold/8" />
          <span className="font-mono text-[7px] text-gold/40 uppercase tracking-[0.25em]">METRICS</span>
          <div className="h-px flex-1 bg-gold/8" />
        </div>
        <div className="text-center">
          <span className="font-mono text-[9px] text-ivory/30">
            {new Date().toLocaleDateString('pl-PL', { day: 'numeric', month: 'short' })}
          </span>
        </div>
      </div>

      {/* Metrics List */}
      <div className="flex-1 px-2 py-2 space-y-px">
        {metrics.map((metric) => {
          const Trend = trendIcon[metric.trend];
          return (
            <div
              key={metric.label}
              className="group px-2 py-2 border border-transparent hover:border-gold/8 hover:bg-gold/3 transition-all cursor-default"
            >
              <div className="flex items-center justify-between mb-0.5">
                <span className="font-mono text-[9px] text-ivory/40 uppercase tracking-[0.12em]">
                  {metric.label}
                </span>
                <Trend size={9} className={trendColor[metric.trend]} />
              </div>
              <div className="flex items-end justify-between gap-1">
                <span className={`font-display text-base font-bold leading-none ${valueColor[metric.color]}`}>
                  {metric.value}
                </span>
                <span className="font-mono text-[8px] text-ivory/30 leading-none mb-px">{metric.change}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Status */}
      <div className="px-2 py-2.5 border-t border-gold/6">
        <div className="flex items-center gap-1.5 mb-2">
          <div className="h-px flex-1 bg-gold/6" />
          <span className="font-mono text-[7px] text-gold/30 uppercase tracking-[0.2em]">STATUS</span>
          <div className="h-px flex-1 bg-gold/6" />
        </div>
        <div className="space-y-1.5">
          {statusItems.map((s) => (
            <div key={s.name} className="flex items-center justify-between px-1.5">
              <div className="flex items-center gap-1.5">
                <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                  s.status === 'ok'   ? 'bg-vgreen shadow-[0_0_4px_rgba(74,222,128,0.4)]' :
                  s.status === 'warn' ? 'bg-vorange shadow-[0_0_4px_rgba(255,109,63,0.4)]' :
                  'bg-vred'
                }`} />
                <span className="font-mono text-[8px] text-ivory/35 uppercase tracking-[0.12em]">{s.name}</span>
              </div>
              <span className={`font-mono text-[7px] ${
                s.status === 'ok' ? 'text-vgreen/50' :
                s.status === 'warn' ? 'text-vorange/70' : 'text-vred/70'
              }`}>
                {s.status === 'ok' ? 'ok' : s.status === 'warn' ? '!' : 'err'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
