'use client';

import { Brain, X, ArrowRight, AlertTriangle, Clock, Lightbulb } from 'lucide-react';
import { useState } from 'react';

interface Recommendation {
  id: string;
  text: string;
  urgency: 'critical' | 'warning' | 'info';
  action: string;
}

const mockRecs: Recommendation[] = [
  { id: '1', urgency: 'critical', text: 'Sajid nie odpowiedział od 3 dni — wyślij follow-up lub zarchiwizuj lead.', action: 'Wyślij teraz' },
  { id: '2', urgency: 'warning',  text: 'Cockpit Phase 2 blokuje integrację z DB — zaplanuj sesję DeepSeek.', action: 'Zaplanuj' },
  { id: '3', urgency: 'info',     text: 'Evolution session RAG zaplanowana na ten piątek — przygotuj propozycje.', action: 'Otwórz notes' },
];

const urgencyCfg = {
  critical: { icon: AlertTriangle, color: '#ff5252', borderL: 'border-l-vred/50', border: 'border-vred/20', bg: 'bg-vred/5',    text: 'text-vred',    label: 'PILNE' },
  warning:  { icon: Clock,         color: '#d4af37', borderL: 'border-l-gold/50', border: 'border-gold/20', bg: 'bg-gold/5',    text: 'text-gold',    label: 'WAŻNE' },
  info:     { icon: Lightbulb,     color: 'rgba(245,244,240,0.4)', borderL: 'border-l-ivory/15', border: 'border-ivory/8', bg: 'bg-ivory/[0.02]', text: 'text-ivory/40', label: 'INFO' },
};

export default function AIRecommendations() {
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());

  const dismiss = (id: string) => setDismissed(prev => new Set([...prev, id]));
  const active = mockRecs.filter(r => !dismissed.has(r.id));

  return (
    <div className="space-y-2">
      {/* Header */}
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <Brain size={12} className="text-gold/60" />
          <span className="font-mono text-[9px] text-ivory/40 uppercase tracking-widest">AI Rekomendacje</span>
        </div>
        {active.length > 0 && (
          <span className="font-mono text-[8px] text-gold border border-gold/20 bg-gold/8 px-1.5 py-px">
            {active.length}
          </span>
        )}
      </div>

      {active.length === 0 ? (
        <div className="flex flex-col items-center gap-2 py-6">
          <Brain size={20} className="text-ivory/10" />
          <span className="font-mono text-[10px] text-ivory/25">Brak nowych rekomendacji</span>
        </div>
      ) : (
        active.map(rec => {
          const cfg = urgencyCfg[rec.urgency];
          const Icon = cfg.icon;
          return (
            <div
              key={rec.id}
              className={`vx-card border-l-2 ${cfg.borderL} ${cfg.border} ${cfg.bg} p-3!`}
            >
              <div className="flex items-start gap-2.5">
                <Icon size={14} style={{ color: cfg.color, flexShrink: 0, marginTop: '1px' }} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className={`font-mono text-[8px] font-bold uppercase tracking-wider ${cfg.text}`}>
                      {cfg.label}
                    </span>
                  </div>
                  <p className="font-mono text-[12px] text-ivory/65 leading-relaxed">{rec.text}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button className="btn btn-dim text-[9px]! px-2.5! py-1! flex items-center gap-1">
                      <ArrowRight size={8} /> {rec.action}
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => dismiss(rec.id)}
                  className="text-ivory/20 hover:text-ivory/50 transition-colors shrink-0 mt-0.5"
                >
                  <X size={10} />
                </button>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
