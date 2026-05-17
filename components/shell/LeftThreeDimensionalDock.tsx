'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard, Crosshair, Users, Code2,
  BrainCircuit, Workflow, Settings, ChevronRight,
} from 'lucide-react';

interface DockItem {
  id: string;
  label: string;
  icon: typeof LayoutDashboard;
  href: string;
  shortcut?: string;
  module: 'shell' | 'system';
  badge?: string;
}

const dockItems: DockItem[] = [
  { id: 'dashboard', label: 'Dashboard',  icon: LayoutDashboard, href: '/dashboard',          shortcut: '⌘1', module: 'shell' },
  { id: 'cockpit',   label: 'Cockpit',    icon: Crosshair,       href: '/cockpit',            shortcut: '⌘2', module: 'shell', badge: '3' },
  { id: 'crm',       label: 'CRM',        icon: Users,           href: '/crm',                shortcut: '⌘3', module: 'shell', badge: '2' },
  { id: 'dev',       label: 'Vantix DEV', icon: Code2,           href: '/dev',                shortcut: '⌘4', module: 'shell' },
  { id: 'brain',     label: 'Brain',      icon: BrainCircuit,    href: '/system/brain',       shortcut: '⌘5', module: 'system' },
  { id: 'workflows', label: 'Workflows',  icon: Workflow,        href: '/system/workflows',   shortcut: '⌘6', module: 'system' },
  { id: 'settings',  label: 'Settings',   icon: Settings,        href: '/system/settings',    shortcut: '⌘7', module: 'system' },
];

export default function LeftThreeDimensionalDock() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/dashboard') return pathname === '/dashboard' || pathname === '/';
    return pathname.startsWith(href);
  };

  const shellItems  = dockItems.filter(i => i.module === 'shell');
  const systemItems = dockItems.filter(i => i.module === 'system');

  return (
    <div className="flex flex-col h-screen w-[60px] bg-void border-r border-gold/6 relative z-20">
      {/* Logo */}
      <div className="flex items-center justify-center h-12 border-b border-gold/6">
        <div className="w-7 h-7 border border-gold/20 bg-gold/5 flex items-center justify-center">
          <span className="font-display text-[10px] font-extrabold text-gold" style={{ letterSpacing: '0.06em' }}>VX</span>
        </div>
      </div>

      {/* Shell Modules */}
      <div className="flex-1 flex flex-col items-center py-3 gap-px">
        {shellItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.id}
              href={item.href}
              className="group relative flex items-center justify-center w-full py-1.5"
            >
              {active && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-4 bg-gold shadow-[0_0_6px_rgba(212,175,55,0.3)]" />
              )}
              <div className={`
                relative flex items-center justify-center w-8 h-8
                border transition-all duration-150
                ${active
                  ? 'border-gold/30 bg-gold/10'
                  : 'border-transparent hover:border-gold/15 hover:bg-gold/5'
                }
              `}>
                <Icon
                  size={14}
                  className={`transition-colors duration-150 ${active ? 'text-gold' : 'text-ivory/30 group-hover:text-ivory/60'}`}
                />
                {item.badge && (
                  <span className="absolute -top-[3px] -right-[3px] w-3.5 h-3.5 flex items-center justify-center bg-gold text-void text-[7px] font-bold font-mono">
                    {item.badge}
                  </span>
                )}
              </div>
              {/* Tooltip */}
              <div className="absolute left-full ml-2 px-2 py-1 bg-void border border-gold/15 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 whitespace-nowrap pointer-events-none z-50">
                <span className="font-mono text-[10px] text-ivory/80">{item.label}</span>
                {item.shortcut && (
                  <span className="ml-1.5 font-mono text-[7px] text-ivory/30 border border-ivory/10 px-1 py-px">{item.shortcut}</span>
                )}
              </div>
            </Link>
          );
        })}
      </div>

      <div className="mx-3 h-px bg-gradient-to-r from-transparent via-gold/10 to-transparent" />

      {/* System Modules */}
      <div className="flex flex-col items-center py-2 gap-px">
        {systemItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.id}
              href={item.href}
              className="group relative flex items-center justify-center w-full py-[5px]"
            >
              {active && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-3 bg-gold/50" />
              )}
              <div className={`
                relative flex items-center justify-center w-7 h-7
                border transition-all duration-150
                ${active
                  ? 'border-gold/20 bg-gold/8'
                  : 'border-transparent hover:border-gold/10 hover:bg-gold/3'
                }
              `}>
                <Icon
                  size={12}
                  className={`transition-colors duration-150 ${active ? 'text-gold/70' : 'text-ivory/25 group-hover:text-ivory/50'}`}
                />
              </div>
              {/* Tooltip */}
              <div className="absolute left-full ml-2 px-2 py-1 bg-void border border-gold/15 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 whitespace-nowrap pointer-events-none z-50">
                <ChevronRight size={8} className="inline text-gold/30 mr-1" />
                <span className="font-mono text-[9px] text-ivory/65">{item.label}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
