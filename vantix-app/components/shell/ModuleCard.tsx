"use client";

import { LucideIcon } from "lucide-react";

type ModuleStatus = "active" | "planned" | "soon" | "blocked";

interface ModuleCardProps {
  icon: LucideIcon;
  name: string;
  description: string;
  status: ModuleStatus;
  href?: string;
  shortcut?: string;
  stats?: { label: string; value: string }[];
}

const statusConfig: Record<ModuleStatus, { label: string; classes: string; dot: string }> = {
  active:   { label: "Aktywny",    classes: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20", dot: "bg-emerald-400" },
  planned:  { label: "Planowane",  classes: "bg-zinc-700/50 text-zinc-500 border-zinc-700",             dot: "bg-zinc-500" },
  soon:     { label: "Wkrótce",    classes: "bg-violet-500/10 text-violet-400 border-violet-500/20",    dot: "bg-violet-400" },
  blocked:  { label: "Blokada",    classes: "bg-red-500/10 text-red-400 border-red-500/20",             dot: "bg-red-400" },
};

export default function ModuleCard({ icon: Icon, name, description, status, href, shortcut, stats }: ModuleCardProps) {
  const cfg = statusConfig[status];
  const isClickable = status === "active" && href;

  const card = (
    <div
      className={`
        group relative flex flex-col gap-4 rounded-xl border p-5
        transition-all duration-200
        ${isClickable
          ? "border-zinc-800 bg-zinc-900 hover:border-zinc-700 hover:bg-zinc-900/80 cursor-pointer"
          : "border-zinc-800/50 bg-zinc-900/40 opacity-60 cursor-default"
        }
      `}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className={`rounded-lg p-2 ${isClickable ? "bg-zinc-800 group-hover:bg-zinc-700" : "bg-zinc-800/50"} transition-colors`}>
            <Icon size={18} className={isClickable ? "text-zinc-300" : "text-zinc-600"} />
          </div>
          <div>
            <p className={`text-sm font-semibold ${isClickable ? "text-zinc-100" : "text-zinc-500"}`}>{name}</p>
            <p className="text-xs text-zinc-600 mt-0.5">{description}</p>
          </div>
        </div>
        <span className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[11px] font-medium ${cfg.classes}`}>
          <span className={`h-1.5 w-1.5 rounded-full ${cfg.dot}`} />
          {cfg.label}
        </span>
      </div>

      {stats && stats.length > 0 && (
        <div className="flex gap-4 border-t border-zinc-800 pt-3">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="text-xs text-zinc-600">{s.label}</p>
              <p className="text-sm font-semibold text-zinc-300">{s.value}</p>
            </div>
          ))}
        </div>
      )}

      {shortcut && isClickable && (
        <div className="absolute bottom-3 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <kbd className="rounded border border-zinc-700 bg-zinc-800 px-1.5 py-0.5 text-[10px] text-zinc-500">{shortcut}</kbd>
        </div>
      )}
    </div>
  );

  if (isClickable) {
    return <a href={href} className="block no-underline">{card}</a>;
  }
  return card;
}
