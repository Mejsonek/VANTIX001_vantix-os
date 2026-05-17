"use client";

import { Zap, Target } from "lucide-react";

interface Priority {
  id: string;
  title: string;
  description: string;
  deadline: string;
  progress: number;
}

const mockPriorities: Priority[] = [
  {
    id: "1",
    title: "Finish Vantix OS MVP",
    description: "Build Personal Cockpit module and integrate with backend",
    deadline: "Dziś",
    progress: 65,
  },
  {
    id: "2",
    title: "Review lead proposals",
    description: "Follow up with 3 new clients from this week",
    deadline: "Jutro",
    progress: 30,
  },
  {
    id: "3",
    title: "AI evolution session",
    description: "Document proposals and update VANTIXRAG master",
    deadline: "W piątek",
    progress: 10,
  },
];

export default function PriorityList() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Zap className="w-5 h-5 text-yellow-500" />
        <h2 className="text-lg font-semibold font-display">Top Priorytety</h2>
      </div>

      <div className="space-y-3">
        {mockPriorities.map((priority, idx) => (
          <div
            key={priority.id}
            className={`p-4 rounded-lg border-2 transition-all ${
              idx === 0
                ? "border-yellow-400/50 bg-yellow-50/50 dark:bg-yellow-950/20"
                : "border-neutral-300 dark:border-neutral-600"
            }`}
          >
            <div className="flex items-start gap-3 mb-2">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center text-xs font-bold">
                {idx + 1}
              </div>
              <div className="flex-grow">
                <p className="font-semibold text-sm">{priority.title}</p>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-0.5">
                  {priority.description}
                </p>
              </div>
            </div>

            <div className="ml-9">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-neutral-500 dark:text-neutral-400">
                  {priority.deadline}
                </span>
                <span className="text-xs font-semibold">{priority.progress}%</span>
              </div>
              <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-1.5">
                <div
                  className="bg-blue-500 h-1.5 rounded-full transition-all duration-300"
                  style={{ width: `${priority.progress}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
