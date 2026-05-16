"use client";

import { LayoutDashboard, Users, Code2, Brain, Settings, Zap, Search, Bell } from "lucide-react";
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
      { label: "Follow-up", value: "0" },
    ],
  },
  {
    icon: Code2,
    name: "Vantix DEV",
    description: "Projekty, roadmapa, TODO, logi, pamięć",
    status: "active" as const,
    href: "/dev",
    shortcut: "⌘3",
    stats: [
      { label: "Projekty", value: "1" },
      { label: "Phase", value: "1" },
    ],
  },
  {
    icon: Brain,
    name: "Brain / VANTIXRAG",
    description: "Pamięć AI, wiedza, decyzje, evolution",
    status: "active" as const,
    href: "/brain",
    shortcut: "⌘4",
    stats: [
      { label: "Sekcje", value: "0" },
      { label: "EVO", value: "0" },
    ],
  },
  {
    icon: Settings,
    name: "Settings",
    description: "API keys, AI providerzy, integracje",
    status: "soon" as const,
    href: "/settings",
    shortcut: "⌘5",
  },
  {
    icon: Zap,
    name: "Workflows",
    description: "Automatyzacje, webhooki, flow, retry",
    status: "planned" as const,
    shortcut: "⌘6",
  },
];

const kpis = [
  { label: "Leady aktywne", value: "0" },
  { label: "Projekty",      value: "1" },
  { label: "Cashflow EST",  value: "—" },
  { label: "Phase",         value: "1" },
];

const navItems = [
  { icon: "⌂", label: "Shell",      href: "/",       active: true,  badge: "" },
  { icon: "◈", label: "CRM",        href: "/crm",    active: false, badge: "0" },
  { icon: "⟐", label: "DEV Tool",   href: "/dev",    active: false, badge: "1" },
  { icon: "◉", label: "Brain",      href: "/brain",  active: false, badge: "" },
  { icon: "⚡", label: "Workflows",  href: "/flows",  active: false, badge: "" },
  { icon: "⚙", label: "Settings",   href: "/settings",active: false, badge: "" },
];

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Dzień dobry";
  if (h < 18) return "Cześć";
  return "Dobry wieczór";
}

export default function ShellPage() {
  const date = new Date().toLocaleDateString("pl-PL", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });

  return (
    <div style={{ minHeight: "100vh", background: "var(--void)", position: "relative" }}>
      <div className="grid-bg" />

      <div style={{ display: "flex", position: "relative", zIndex: 1 }}>

        {/* ── SIDEBAR ── */}
        <aside style={{
          width: 220,
          minHeight: "100vh",
          background: "var(--surface)",
          borderRight: "var(--border-dim)",
          display: "flex",
          flexDirection: "column",
          flexShrink: 0,
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
        }}>
          {/* Logo */}
          <div style={{
            padding: "20px 16px 16px",
            borderBottom: "var(--border-dim)",
          }}>
            <div style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: 16,
              letterSpacing: ".15em",
              color: "var(--gold)",
            }}>
              VANTIX
            </div>
            <div style={{ fontSize: 8, letterSpacing: ".2em", color: "var(--ivory-40)", marginTop: 2 }}>
              OS v0.1-mockup
            </div>
          </div>

          {/* Nav */}
          <nav style={{ flex: 1, padding: "8px 0" }}>
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`sidebar-item${item.active ? " active" : ""}`}
              >
                <span className="sidebar-item-icon">{item.icon}</span>
                <span className="sidebar-item-label">{item.label}</span>
                {item.badge && (
                  <span className="sidebar-item-badge">{item.badge}</span>
                )}
              </a>
            ))}
          </nav>

          {/* User */}
          <div style={{
            padding: "12px 16px",
            borderTop: "var(--border-dim)",
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}>
            <div style={{
              width: 28, height: 28,
              border: "var(--border)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: 9,
              color: "var(--gold)",
              background: "var(--gold-10)",
              letterSpacing: ".1em",
              flexShrink: 0,
            }}>
              KZ
            </div>
            <div>
              <div style={{ fontSize: 10, color: "var(--ivory)", letterSpacing: ".05em" }}>Kacper Zdżałka</div>
              <div style={{ fontSize: 8, color: "var(--ivory-40)", letterSpacing: ".1em" }}>Founder · Vantix</div>
            </div>
          </div>
        </aside>

        {/* ── MAIN ── */}
        <div style={{ flex: 1, minWidth: 0 }}>

          {/* Topbar */}
          <header style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 32px",
            height: 52,
            borderBottom: "var(--border-dim)",
            background: "rgba(2,2,2,.9)",
            backdropFilter: "blur(12px)",
            position: "sticky",
            top: 0,
            zIndex: 10,
          }}>
            <div className="vx-label" style={{ color: "var(--ivory-40)" }}>
              Shell — Launcher
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <button style={{
                display: "flex", alignItems: "center", gap: 8,
                border: "var(--border-dim)",
                background: "var(--s2)",
                padding: "6px 12px",
                cursor: "pointer",
              }}>
                <Search size={11} style={{ color: "var(--ivory-40)" }} />
                <span style={{ fontSize: 9, color: "var(--ivory-40)", letterSpacing: ".15em" }}>SZUKAJ</span>
                <kbd style={{
                  border: "var(--border-dim)",
                  background: "var(--s3)",
                  padding: "1px 5px",
                  fontSize: 9,
                  color: "var(--ivory-20)",
                  marginLeft: 8,
                }}>⌘K</kbd>
              </button>
              <button style={{
                border: "var(--border-dim)",
                background: "var(--s2)",
                padding: "6px 8px",
                cursor: "pointer",
                display: "flex", alignItems: "center",
              }}>
                <Bell size={12} style={{ color: "var(--ivory-40)" }} />
              </button>
            </div>
          </header>

          <main style={{ padding: "40px 32px 80px", maxWidth: 900 }}>

            {/* Greeting */}
            <div style={{ marginBottom: 40 }}>
              <div style={{ fontSize: 9, letterSpacing: ".4em", color: "var(--gold-60)", textTransform: "uppercase", marginBottom: 8 }}>
                {date}
              </div>
              <h1 style={{
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: 36,
                letterSpacing: "-.02em",
                lineHeight: 1,
                color: "var(--ivory)",
                marginBottom: 6,
              }}>
                {getGreeting()}, <span style={{ color: "var(--gold)" }}>Kacper</span>
              </h1>
              <p style={{ fontSize: 12, color: "var(--ivory-40)", letterSpacing: ".05em" }}>
                Co jest dziś najważniejsze?
              </p>
            </div>

            {/* KPI row */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 0, border: "var(--border-dim)", marginBottom: 32, overflow: "hidden" }}>
              {kpis.map((kpi, i) => (
                <div key={kpi.label} style={{
                  padding: "16px",
                  borderRight: i < kpis.length - 1 ? "var(--border-dim)" : "none",
                  background: "var(--surface)",
                  textAlign: "center",
                  transition: "border-color .2s",
                }}>
                  <div style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: 28,
                    color: "var(--gold)",
                    lineHeight: 1,
                    marginBottom: 4,
                  }}>
                    {kpi.value}
                  </div>
                  <div className="vx-label">{kpi.label}</div>
                </div>
              ))}
            </div>

            {/* AI Focus */}
            <div style={{
              border: "var(--border-dim)",
              borderLeft: "2px solid var(--gold)",
              background: "var(--surface)",
              padding: "16px 20px",
              marginBottom: 32,
              display: "flex",
              gap: 12,
            }}>
              <div style={{
                width: 32, height: 32,
                border: "var(--border)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: 8,
                color: "var(--gold)",
                background: "var(--gold-10)",
                letterSpacing: ".1em",
                flexShrink: 0,
              }}>
                VX
              </div>
              <div>
                <div className="vx-label" style={{ marginBottom: 6 }}>AI Focus — dziś</div>
                <div style={{ fontSize: 12, color: "var(--ivory-60)", lineHeight: 1.75 }}>
                  System inicjalizuje kontekst. Po podłączeniu <strong style={{ color: "var(--ivory)" }}>Brain / VANTIXRAG</strong> tutaj pojawią się rekomendacje AI na podstawie Twoich leadów, tasków i priorytetów.
                </div>
                <div style={{ fontSize: 8, color: "var(--ivory-20)", letterSpacing: ".15em", marginTop: 8 }}>
                  VANTIXRAG · master_context · Phase 1
                </div>
              </div>
            </div>

            {/* Modules */}
            <div style={{ marginBottom: 32 }}>
              <div className="vx-label" style={{ marginBottom: 16 }}>Moduły systemu</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 1, background: "var(--gold-10)" }}>
                {modules.map((mod) => (
                  <div key={mod.name} style={{ background: "var(--void)" }}>
                    <ModuleCard {...mod} />
                  </div>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="vx-divider" />

            {/* System status */}
            <div style={{ marginBottom: 8 }}>
              <div className="vx-label" style={{ marginBottom: 12 }}>Status systemu</div>
              <SystemStatus />
            </div>

          </main>
        </div>
      </div>
    </div>
  );
}
