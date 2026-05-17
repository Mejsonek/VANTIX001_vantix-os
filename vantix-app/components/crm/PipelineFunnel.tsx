'use client';

import { useState } from 'react';

interface FunnelStage {
  key: string;
  label: string;
  count: number;
  value: number;
  color: string;
  borderColor: string;
  bgColor: string;
  widthPct: number;
}

const stages: FunnelStage[] = [
  { key: 'nowy',      label: 'NOWE',       count: 4, value: 74500, color: '#d4af37', borderColor: 'rgba(212,175,55,0.35)', bgColor: 'rgba(212,175,55,0.05)', widthPct: 100 },
  { key: 'w_trakcie', label: 'W TRAKCIE',  count: 3, value: 81000, color: '#6B8FD4', borderColor: 'rgba(107,143,212,0.35)', bgColor: 'rgba(107,143,212,0.05)', widthPct: 80  },
  { key: 'wygra',     label: 'WYGRANE',    count: 2, value: 43000, color: '#4ade80', borderColor: 'rgba(74,222,128,0.35)', bgColor: 'rgba(74,222,128,0.05)',   widthPct: 55  },
  { key: 'przegrana', label: 'PRZEGRANA',  count: 1, value: 22000, color: '#ff5252', borderColor: 'rgba(255,82,82,0.30)',  bgColor: 'rgba(255,82,82,0.04)',    widthPct: 30  },
];

const totalValue = stages[0].value + stages[1].value;

function fmt(v: number) {
  return new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN', minimumFractionDigits: 0 }).format(v);
}

interface PipelineFunnelProps {
  selectedStage?: string | null;
  onStageClick?: (key: string) => void;
}

export default function PipelineFunnel({ selectedStage, onStageClick }: PipelineFunnelProps) {
  const [hovered, setHovered] = useState<string | null>(null);

  const winRate = Math.round((stages.find(s => s.key === 'wygra')!.count / stages[0].count) * 100);

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <div className="h-px w-5 bg-gold/40" />
          <span className="font-mono text-[8px] text-gold/50 uppercase tracking-widest">Pipeline Funnel</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-mono text-[8px] text-ivory/20">Win rate:</span>
          <span className="font-mono text-[9px] font-bold text-vgreen">{winRate}%</span>
        </div>
      </div>

      {/* Funnel stages */}
      <div className="relative space-y-1.5 py-2">
        {/* Vertical flow line */}
        <div
          className="absolute left-0 top-0 bottom-0 flex flex-col items-center justify-around pointer-events-none"
          style={{ width: '20px' }}
        >
          {stages.map((s, i) => (
            i < stages.length - 1 && (
              <div
                key={`flow-${i}`}
                className="flow-particle"
                style={{
                  width: '4px', height: '4px', borderRadius: '50%',
                  background: s.color,
                  opacity: 0.7,
                  animationDelay: `${i * 0.6}s`,
                  position: 'absolute',
                  top: `${(i * 25) + 12}%`,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  boxShadow: `0 0 6px ${s.color}`,
                }}
              />
            )
          ))}
        </div>

        {stages.map((stage, i) => {
          const isHov = hovered === stage.key;
          const isSel = selectedStage === stage.key;
          const valuePct = Math.round((stage.value / totalValue) * 100);

          return (
            <div
              key={stage.key}
              className={`funnel-enter delay-${i + 1}`}
              onMouseEnter={() => setHovered(stage.key)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => onStageClick?.(stage.key)}
              style={{
                marginLeft: 'auto',
                marginRight: 'auto',
                width: `${stage.widthPct}%`,
                cursor: 'pointer',
                transition: 'transform 0.3s cubic-bezier(0.25,0.46,0.45,0.94), box-shadow 0.3s ease, width 0.3s ease',
                transform: isSel
                  ? 'perspective(600px) rotateX(0deg) translateZ(18px) translateY(-2px)'
                  : isHov
                  ? 'perspective(600px) rotateX(0deg) translateZ(12px) translateY(-1px)'
                  : 'perspective(600px) rotateX(3deg)',
                boxShadow: isSel
                  ? `0 10px 40px rgba(0,0,0,0.6), 0 0 32px ${stage.color}35, inset 0 0 0 1px ${stage.color}`
                  : isHov
                  ? `0 8px 32px rgba(0,0,0,0.5), 0 0 24px ${stage.color}20, inset 0 0 0 1px ${stage.color}`
                  : `0 4px 16px rgba(0,0,0,0.3), inset 0 0 0 1px ${stage.borderColor}`,
                background: isSel
                  ? stage.bgColor.replace(/[\d.]+\)$/, '0.12)')
                  : isHov
                  ? stage.bgColor.replace(/[\d.]+\)$/, '0.08)')
                  : stage.bgColor,
                animationDelay: `${i * 0.09}s`,
              }}
            >
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '80px 1fr auto auto',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '10px 14px',
                  borderLeft: `2px solid ${isHov ? stage.color : stage.borderColor}`,
                  transition: 'border-color 0.3s',
                }}
              >
                {/* Stage label */}
                <div className="flex items-center gap-2">
                  <div
                    style={{
                      width: '6px', height: '6px', borderRadius: '50%',
                      background: stage.color,
                      boxShadow: isHov ? `0 0 8px ${stage.color}` : 'none',
                      transition: 'box-shadow 0.3s',
                      flexShrink: 0,
                    }}
                  />
                  <span
                    className="font-mono text-[7px] font-bold uppercase tracking-widest"
                    style={{ color: isHov ? stage.color : 'rgba(245,244,240,0.35)' }}
                  >
                    {stage.label}
                  </span>
                </div>

                {/* Progress bar */}
                <div style={{ height: '3px', background: 'rgba(245,244,240,0.06)', overflow: 'hidden' }}>
                  <div
                    className="bar-animate"
                    style={{
                      height: '100%',
                      width: `${valuePct}%`,
                      background: `linear-gradient(to right, ${stage.color}aa, ${stage.color})`,
                      animationDelay: `${i * 0.12}s`,
                    }}
                  />
                </div>

                {/* Count */}
                <div style={{ textAlign: 'center', minWidth: '32px' }}>
                  <span
                    className="font-display font-black num-animate"
                    style={{
                      fontSize: '16px',
                      lineHeight: 1,
                      color: isHov ? stage.color : 'rgba(245,244,240,0.60)',
                      animationDelay: `${i * 0.1}s`,
                    }}
                  >
                    {stage.count}
                  </span>
                  <p className="font-mono" style={{ fontSize: '7px', color: 'rgba(245,244,240,0.20)', marginTop: '2px' }}>
                    leadów
                  </p>
                </div>

                {/* Value */}
                <div style={{ textAlign: 'right', minWidth: '80px' }}>
                  <span
                    className="font-mono font-bold num-animate"
                    style={{
                      fontSize: '11px',
                      color: isHov ? stage.color : 'rgba(245,244,240,0.40)',
                      animationDelay: `${i * 0.1 + 0.05}s`,
                    }}
                  >
                    {fmt(stage.value)}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary row */}
      <div
        className="flex items-center justify-between px-3 py-2 fade-up delay-6"
        style={{
          borderTop: '1px solid rgba(212,175,55,0.08)',
          marginTop: '4px',
        }}
      >
        <span className="font-mono text-[8px]" style={{ color: 'rgba(245,244,240,0.20)' }}>
          Pipeline łącznie
        </span>
        <span className="font-mono text-[11px] font-bold" style={{ color: '#d4af37' }}>
          {fmt(stages.reduce((s, st) => s + st.value, 0))}
        </span>
      </div>
    </div>
  );
}
