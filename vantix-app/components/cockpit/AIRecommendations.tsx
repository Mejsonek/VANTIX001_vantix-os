'use client';

import { Sparkles, X } from 'lucide-react';
import { useState } from 'react';

export default function AIRecommendations() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="vx-card !border-l-[2px] !border-l-gold/40 !bg-gold/[0.02]">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border border-gold/20 flex items-center justify-center">
            <Sparkles size={8} className="text-gold/60" />
          </div>
          <span className="font-mono text-[9px] text-ivory/50 uppercase tracking-widest">AI Rekomendacje</span>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="text-ivory/10 hover:text-gold/60 transition-colors"
        >
          <X size={10} />
        </button>
      </div>

      <p className="font-mono text-[10px] text-ivory/30 mb-3 leading-relaxed">
        Na podstawie Twoich aktualnych tasków i projektów, oto co powinieneś zrobić teraz:
      </p>

      <ul className="space-y-1.5 mb-4">
        <li className="flex gap-2">
          <span className="text-gold/60 font-mono text-[9px]">→</span>
          <span className="font-mono text-[10px] text-ivory/35">Skoncentruj się na dokończeniu Personal Cockpit — to blokuje Phase 2</span>
        </li>
        <li className="flex gap-2">
          <span className="text-gold/60 font-mono text-[9px]">→</span>
          <span className="font-mono text-[10px] text-ivory/35">Odpowiedz na dwa czekające e-maile od klientów (3 dni timeout)</span>
        </li>
        <li className="flex gap-2">
          <span className="text-gold/60 font-mono text-[9px]">→</span>
          <span className="font-mono text-[10px] text-ivory/35">Zaplanuj evolution session na koniec tygodnia z agentem RAG</span>
        </li>
      </ul>

      <div className="flex gap-2">
        <button className="btn btn-primary !text-[7px] !px-3 !py-1.5 flex-1">Zaakceptuj</button>
        <button
          onClick={() => setDismissed(true)}
          className="btn btn-ghost !text-[7px] !px-3 !py-1.5 flex-1"
        >
          Odrzuć
        </button>
      </div>
    </div>
  );
}
