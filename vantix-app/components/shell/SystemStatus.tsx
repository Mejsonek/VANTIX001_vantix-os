"use client";

interface StatusItem {
  label: string;
  status: "ok" | "warn" | "error";
}

const items: StatusItem[] = [
  { label: "Neon DB",    status: "ok" },
  { label: "Claude API", status: "ok" },
  { label: "Vercel",     status: "ok" },
  { label: "n8n",        status: "warn" },
];

const dotClass: Record<StatusItem["status"], string> = {
  ok:    "bg-emerald-400",
  warn:  "bg-amber-400",
  error: "bg-red-400",
};

export default function SystemStatus() {
  return (
    <div className="flex items-center gap-1 flex-wrap">
      {items.map((item) => (
        <span
          key={item.label}
          className="inline-flex items-center gap-1.5 rounded-full border border-zinc-800 bg-zinc-900 px-2.5 py-1 text-[11px] text-zinc-400"
        >
          <span className={`h-1.5 w-1.5 rounded-full ${dotClass[item.status]}`} />
          {item.label}
        </span>
      ))}
    </div>
  );
}
