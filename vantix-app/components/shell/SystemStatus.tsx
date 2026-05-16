"use client";

const items = [
  { label: "Neon DB",    status: "ok"   as const },
  { label: "Claude API", status: "ok"   as const },
  { label: "Vercel",     status: "ok"   as const },
  { label: "n8n",        status: "warn" as const },
];

const dotColor = { ok: "var(--green)", warn: "var(--orange)", error: "var(--red)" };

export default function SystemStatus() {
  return (
    <div style={{ display: "flex", gap: 0, border: "var(--border-dim)", overflow: "hidden" }}>
      {items.map((item, i) => (
        <div
          key={item.label}
          style={{
            flex: 1,
            padding: "10px 14px",
            borderRight: i < items.length - 1 ? "var(--border-dim)" : "none",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span style={{
            width: 5, height: 5,
            borderRadius: "50%",
            background: dotColor[item.status],
            display: "inline-block",
            flexShrink: 0,
          }} />
          <span style={{ fontSize: 9, letterSpacing: ".2em", color: "var(--ivory-40)", textTransform: "uppercase" }}>
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}
