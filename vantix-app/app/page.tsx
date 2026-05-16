"use client";

import {
  LayoutDashboard,
  Users,
  Code2,
  Brain,
  Settings,
  Zap,
  Plus,
  Search,
  Bell,
} from "lucide-react";
import ModuleCard from "@/components/shell/ModuleCard";
import SystemStatus from "@/components/shell/SystemStatus";

const modules = [
  {
    icon: LayoutDashboard,
    name: "Personal Cockpit",
    description: "Taski, kalendarz, priorytety, rekomendacje AI",
    status: "soon" as const,
    href: "/cockpit",
    shortcut: "⌘1",
  },
  {
    icon: Users,
    name: "CRM",
    description: "Leady, lejek, follow-up, routing",
    status: "active" as const,
    href: "/crm",
    shortcut: "⌘2",
    stats: [
      { label: "Aktywne leady", value: "0" },
      { label: "Follow-up dziś", value: "0" },
    ],
  },
  {
    icon: Code2,
    name: "Vantix DEV",
    description: "Projekty, roadmapa, TODO, logi, pamięć projektu",
    status: "active" as const,
    href: "/dev",
    shortcut: "⌘3",
    stats: [
      { label: "Projekty aktywne", value: "1" },
      { label: "Otwarte taski", value: "—" },
    ],
  },
  {
    icon: Brain,
    name: "Brain / VANTIXRAG",
    description: "Pamięć AI, wiedza, decyzje, evolution proposals",
    status: "active" as const,
    href: "/brain",
    shortcut: "⌘4",
    stats: [
      { label: "Sekcje pamięci", value: "0" },
      { label: "Propozycje EVO", value: "0" },
    ],
  },
  {
    icon: Settings,
    name: "Settings / Integrations",
    description: "API keys, AI providerzy, integracje systemowe",
    status: "soon" as const,
    href: "/settings",
    shortcut: "⌘5",
  },
  {
    icon: Zap,
    name: "Workflows",
    description: "Automatyzacje, webhooki, flow, retry blocks",
    status: "planned" as const,
    shortcut: "⌘6",
  },
];

const quickActions = [
  { icon: Plus, label: "Nowy lead", href: "/crm?action=new" },
  { icon: Plus, label: "Nowy task", href: "/cockpit?action=new" },
  { icon: Plus, label: "Nowa notatka", href: "/brain?action=new" },
];

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Dzień dobry";
  if (hour < 18) return "Cześć";
  return "Dobry wieczór";
}

export default function ShellPage() {
  const now = new Date();
  const dateStr = now.toLocaleDateString("pl-PL", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Topbar */}
      <header className="sticky top-0 z-10 flex items-center justify-between border-b border-zinc-800/60 bg-zinc-950/90 px-6 py-3 backdrop-blur">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold tracking-widest text-violet-400 uppercase">Vantix OS</span>
          <span className="rounded bg-zinc-800 px-1.5 py-0.5 text-[10px] text-zinc-500 font-mono">v0.1-mockup</span>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-xs text-zinc-500 hover:border-zinc-700 hover:text-zinc-400 transition-colors">
            <Search size={12} />
            <span>Szukaj</span>
            <kbd className="ml-2 rounded border border-zinc-700 bg-zinc-800 px-1 text-[10px]">⌘K</kbd>
          </button>
          <button className="relative rounded-lg border border-zinc-800 bg-zinc-900 p-1.5 text-zinc-500 hover:border-zinc-700 hover:text-zinc-400 transition-colors">
            <Bell size={14} />
          </button>
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-violet-600 text-[11px] font-semibold text-white">
            KZ
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-10">
        {/* Hero header */}
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="text-xs text-zinc-600 mb-1 capitalize">{dateStr}</p>
            <h1 className="text-2xl font-bold text-zinc-100">
              {getGreeting()}, Kacper
            </h1>
            <p className="mt-1 text-sm text-zinc-500">
              Co jest dziś najważniejsze?
            </p>
          </div>
          <div className="flex gap-2">
            {quickActions.map((action) => (
              <a
                key={action.label}
                href={action.href}
                className="flex items-center gap-1.5 rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-xs text-zinc-400 hover:border-zinc-700 hover:text-zinc-300 transition-colors"
              >
                <action.icon size={12} />
                {action.label}
              </a>
            ))}
          </div>
        </div>

        {/* Focus panel — placeholder */}
        <div className="mb-8 rounded-xl border border-violet-500/20 bg-violet-500/5 p-5">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 h-2 w-2 rounded-full bg-violet-400 shrink-0" />
            <div>
              <p className="text-sm font-medium text-violet-300">AI Focus — dziś</p>
              <p className="mt-1 text-xs text-zinc-500 leading-relaxed">
                System inicjalizuje kontekst. Po podłączeniu Brain / VANTIXRAG, tutaj pojawią się rekomendacje AI na podstawie Twoich leadów, tasków i priorytetów.
              </p>
            </div>
          </div>
        </div>

        {/* Modules grid */}
        <div className="mb-8">
          <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-zinc-600">
            Moduły systemu
          </h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {modules.map((mod) => (
              <ModuleCard key={mod.name} {...mod} />
            ))}
          </div>
        </div>

        {/* System status */}
        <div className="flex items-center justify-between border-t border-zinc-800/60 pt-5">
          <p className="text-[11px] text-zinc-700">Status systemu</p>
          <SystemStatus />
        </div>
      </main>
    </div>
  );
}
