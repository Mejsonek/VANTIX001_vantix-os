'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  BrainCircuit, Network, Workflow, BarChart3, Settings, LayoutDashboard,
} from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  href: string;
}

const systemLinks: NavItem[] = [
  { id: 'brain',          label: 'Brain',          icon: BrainCircuit,    href: '/system/brain' },
  { id: 'orchestration',  label: 'Orchestration',  icon: Network,         href: '/system/orchestration' },
  { id: 'workflows',      label: 'Workflows',      icon: Workflow,        href: '/system/workflows' },
  { id: 'analytics',      label: 'Analytics',      icon: BarChart3,       href: '/system/analytics' },
  { id: 'settings',       label: 'Settings',       icon: Settings,        href: '/system/settings' },
];

export default function SystemLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isActive = (href: string) => pathname.startsWith(href);

  return (
    <div className="flex h-screen bg-void overflow-hidden">
      {/* Sidebar 200px */}
      <aside className="w-[200px] flex flex-col h-screen bg-void border-r border-gold/10 shrink-0">
        {/* Logo + back to shell */}
        <Link
          href="/dashboard"
          className="flex items-center gap-2 px-4 h-14 border-b border-gold/10 hover:bg-gold/5 transition-colors"
        >
          <span className="font-display text-[14px] font-extrabold text-gold tracking-[0.06em]">VX</span>
          <span className="font-mono text-[9px] text-ivory/30 uppercase tracking-[0.1em]">System</span>
        </Link>

        {/* SECTION: SYSTEM */}
        <div className="px-4 pt-6 pb-2">
          <span className="font-mono text-[10px] text-ivory/35 uppercase tracking-[0.14em]">SYSTEM</span>
        </div>

        {/* System navigation links */}
        <nav className="flex-1 flex flex-col">
          {systemLinks.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`
                  flex items-center gap-3 px-4 py-2.5
                  font-mono text-[10px] uppercase tracking-[0.1em]
                  border-l-2 transition-colors duration-150
                  ${active
                    ? 'text-gold border-gold bg-gold/5'
                    : 'text-ivory/50 border-transparent hover:bg-gold/5 hover:border-gold/20'
                  }
                `}
              >
                <Icon size={14} className={active ? 'text-gold' : 'text-ivory/40'} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* SECTION: powrót do Shell */}
        <div className="px-4 py-4 border-t border-gold/10">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 px-4 py-2.5
              font-mono text-[10px] uppercase tracking-[0.1em]
              text-ivory/50 border-l-2 border-transparent
              hover:text-ivory/70 hover:bg-gold/5 hover:border-gold/20
              transition-colors duration-150"
          >
            <LayoutDashboard size={14} className="text-ivory/40" />
            <span>Dashboard</span>
          </Link>
        </div>
      </aside>

      {/* Content area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {children}
      </main>
    </div>
  );
}
