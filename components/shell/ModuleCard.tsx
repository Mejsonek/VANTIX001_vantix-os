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

const statusCfg: Record<ModuleStatus, { label: string; cls: string }> = {
  active:  { label: "Active",   cls: "vx-badge vx-badge-green" },
  planned: { label: "Planned",  cls: "vx-badge vx-badge-dim" },
  soon:    { label: "Wkrótce",  cls: "vx-badge vx-badge-gold" },
  blocked: { label: "Blocker",  cls: "vx-badge vx-badge-red" },
};

export default function ModuleCard({ icon: Icon, name, description, status, href, shortcut, stats }: ModuleCardProps) {
  const cfg = statusCfg[status];
  const isClickable = status === "active" && !!href;

  const inner = (
    <div
      className="vx-card group h-full"
      style={{ cursor: isClickable ? "pointer" : "default", opacity: isClickable ? 1 : 0.5 }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 32, height: 32,
            display: "flex", alignItems: "center", justifyContent: "center",
            border: "var(--border-dim)",
            background: "var(--s2)",
          }}>
            <Icon size={14} style={{ color: isClickable ? "var(--gold)" : "var(--ivory-20)" }} />
          </div>
          <div>
            <div style={{
              fontFamily: "var(--font-display)",
              fontWeight: 600, fontSize: 14,
              color: isClickable ? "var(--ivory)" : "var(--ivory-40)",
              letterSpacing: ".01em",
              marginBottom: 2,
            }}>
              {name}
            </div>
            <div style={{ fontSize: 10, color: "var(--ivory-40)", letterSpacing: ".03em" }}>
              {description}
            </div>
          </div>
        </div>
        <span className={cfg.cls}>{cfg.label}</span>
      </div>

      {stats && stats.length > 0 && (
        <div style={{
          display: "flex", gap: 24,
          borderTop: "var(--border-dim)",
          paddingTop: 12, marginTop: 4,
        }}>
          {stats.map((s) => (
            <div key={s.label}>
              <div className="vx-label" style={{ marginBottom: 2 }}>{s.label}</div>
              <div style={{
                fontFamily: "var(--font-display)",
                fontSize: 20, color: "var(--gold)",
              }}>
                {s.value}
              </div>
            </div>
          ))}
        </div>
      )}

      {shortcut && isClickable && (
        <div style={{
          position: "absolute", bottom: 12, right: 14,
          opacity: 0, transition: "opacity .2s",
        }}
          className="group-hover:opacity-100"
        >
          <kbd style={{
            border: "var(--border-dim)",
            background: "var(--s2)",
            padding: "2px 6px",
            fontSize: 9,
            color: "var(--ivory-40)",
            letterSpacing: ".1em",
          }}>{shortcut}</kbd>
        </div>
      )}
    </div>
  );

  if (isClickable) {
    return (
      <a href={href} style={{ display: "block", textDecoration: "none", height: "100%" }}>
        {inner}
      </a>
    );
  }
  return inner;
}
