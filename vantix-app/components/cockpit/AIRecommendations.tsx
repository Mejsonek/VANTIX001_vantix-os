"use client";

import { Sparkles, X } from "lucide-react";
import { useState } from "react";

export default function AIRecommendations() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) {
    return null;
  }

  return (
    <div className="p-4 rounded-lg border-2 border-purple-400/30 bg-gradient-to-br from-purple-50/50 to-pink-50/50 dark:from-purple-950/20 dark:to-pink-950/20">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-purple-500" />
          <h3 className="font-semibold text-sm">AI Rekomendacje</h3>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-4 leading-relaxed">
        Na podstawie Twoich aktualnych taków i projektów, oto co powinieneś zrobić teraz:
      </p>

      <ul className="space-y-2 mb-4">
        <li className="text-xs flex gap-2">
          <span className="text-purple-500">→</span>
          <span>Skoncentruj się na dokończeniu Personal Cockpit — to blokuje Phase 2</span>
        </li>
        <li className="text-xs flex gap-2">
          <span className="text-purple-500">→</span>
          <span>Odpowiedz na dwa czekające e-maile od klientów (3 dni timeout)</span>
        </li>
        <li className="text-xs flex gap-2">
          <span className="text-purple-500">→</span>
          <span>Zaplanuj evolution session na koniec tygodnia z agentem RAG</span>
        </li>
      </ul>

      <div className="flex gap-2">
        <button className="flex-1 px-3 py-2 bg-purple-500 hover:bg-purple-600 text-white text-xs font-semibold rounded transition-colors">
          Zaakceptuj
        </button>
        <button
          onClick={() => setDismissed(true)}
          className="flex-1 px-3 py-2 bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 text-xs font-semibold rounded transition-colors"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
}
