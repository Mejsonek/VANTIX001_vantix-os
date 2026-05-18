'use client';

interface ApiKey {
  name: string;
  key: string;
  status: 'active' | 'warn' | 'inactive';
  provider: string;
}

interface Model {
  id: string;
  name: string;
  role: string;
  provider: string;
  cost: string;
}

const apiKeys: ApiKey[] = [
  { name: 'Claude API',    key: 'sk-ant-***...***-1a2b',  status: 'active',   provider: 'Anthropic' },
  { name: 'Neon Postgres', key: 'postgresql://neon***',    status: 'active',   provider: 'Neon' },
  { name: 'n8n Webhook',   key: 'https://SolutionK***',    status: 'warn',     provider: 'HF Spaces' },
  { name: 'Supabase',      key: 'eyJhbGci***',             status: 'active',   provider: 'Supabase' },
  { name: 'DeepSeek API',  key: 'sk-***...***-deepseek',   status: 'inactive', provider: 'DeepSeek' },
];

const models: Model[] = [
  { id: 'claude-sonnet-4-6', name: 'Claude Sonnet 4.6', role: 'Orchestrator', provider: 'Anthropic', cost: '$3/$15 per 1M' },
  { id: 'deepseek-r1',       name: 'DeepSeek R1',       role: 'Worker',       provider: 'DeepSeek',  cost: '$0.55/$2.19 per 1M' },
  { id: 'claude-haiku-4-5',  name: 'Claude Haiku 4.5',  role: 'Fast tasks',   provider: 'Anthropic', cost: '$0.80/$4 per 1M' },
];

function Badge({ status }: { status: ApiKey['status'] }) {
  const map: Record<ApiKey['status'], { cls: string; label: string }> = {
    active:   { cls: 'vx-badge-green',  label: 'ACTIVE' },
    warn:     { cls: 'vx-badge-gold',   label: 'WARN' },
    inactive: { cls: 'vx-badge-dim',    label: 'INACTIVE' },
  };
  const { cls, label } = map[status];
  return <span className={`vx-badge ${cls}`}>{label}</span>;
}

export default function SettingsPage() {
  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gold/10 shrink-0">
        <div className="flex items-center gap-3">
          <span className="font-display text-[14px] font-extrabold text-gold tracking-[0.06em]">SETTINGS</span>
          <span className="font-mono text-[9px] text-ivory/20">/</span>
          <span className="font-mono text-[10px] text-ivory/50 uppercase tracking-[0.1em]">Configuration</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-[6px] h-[6px] rounded-full bg-vgreen dot-live" />
          <span className="font-mono text-[9px] text-ivory/30 uppercase tracking-[0.12em]">System Online</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-8">

        {/* ── API KEYS ── */}
        <section className="fade-up delay-1">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-1 h-4 bg-gold" />
            <h2 className="font-mono text-[11px] text-ivory/85 uppercase tracking-[0.18em]">API Keys</h2>
            <span className="font-mono text-[9px] text-ivory/25 ml-auto">{apiKeys.length} keys</span>
          </div>

          <div className="vx-card p-0! overflow-hidden">
            {/* Table header */}
            <div className="flex items-center px-4 py-2.5 border-b border-gold/10 bg-gold/[0.02]">
              <span className="flex-[2] label-xs">Name</span>
              <span className="flex-[1.5] label-xs">Provider</span>
              <span className="flex-[3] label-xs">Key</span>
              <span className="flex-[1] label-xs text-right">Status</span>
            </div>

            {/* Table rows */}
            {apiKeys.map((item, i) => (
              <div
                key={item.name}
                className={`vx-row flex items-center px-4 py-3 border-b border-gold/5 last:border-b-0 ${i > 0 ? '' : ''}`}
                style={{ animationDelay: `${0.1 + i * 0.06}s` }}
              >
                <span className="flex-[2] body-sm text-ivory/75">{item.name}</span>
                <span className="flex-[1.5] font-mono text-[10px] text-ivory/40">{item.provider}</span>
                <span className="flex-[3] font-mono text-[10px] text-ivory/25 select-none">
                  {item.key}
                </span>
                <span className="flex-[1] flex justify-end">
                  <Badge status={item.status} />
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ── MODEL REGISTRY ── */}
        <section className="fade-up delay-3">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-1 h-4 bg-vblue" />
            <h2 className="font-mono text-[11px] text-ivory/85 uppercase tracking-[0.18em]">Model Registry</h2>
            <span className="font-mono text-[9px] text-ivory/25 ml-auto">{models.length} models</span>
          </div>

          <div className="vx-card p-0! overflow-hidden">
            {/* Table header */}
            <div className="flex items-center px-4 py-2.5 border-b border-gold/10 bg-gold/[0.02]">
              <span className="flex-[2] label-xs">Model ID</span>
              <span className="flex-[2] label-xs">Name</span>
              <span className="flex-[1.5] label-xs">Role</span>
              <span className="flex-[1.5] label-xs">Provider</span>
              <span className="flex-[2] label-xs text-right">Cost (Input / Output)</span>
            </div>

            {/* Table rows */}
            {models.map((m, i) => (
              <div
                key={m.id}
                className="vx-row flex items-center px-4 py-3 border-b border-gold/5 last:border-b-0"
                style={{ animationDelay: `${0.1 + i * 0.06}s` }}
              >
                <span className="flex-[2] font-mono text-[10px] text-ivory/55">{m.id}</span>
                <span className="flex-[2] body-sm text-ivory/75">{m.name}</span>
                <span className="flex-[1.5] font-mono text-[10px]">
                  {m.role === 'Orchestrator' ? (
                    <span className="text-gold/80">{m.role}</span>
                  ) : m.role === 'Worker' ? (
                    <span className="text-vblue/80">{m.role}</span>
                  ) : (
                    <span className="text-ivory/40">{m.role}</span>
                  )}
                </span>
                <span className="flex-[1.5] font-mono text-[10px] text-ivory/40">{m.provider}</span>
                <span className="flex-[2] font-mono text-[10px] text-ivory/35 text-right">{m.cost}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── SYSTEM INFO ── */}
        <section className="fade-up delay-5">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-1 h-4 bg-ivory/15" />
            <h2 className="font-mono text-[11px] text-ivory/85 uppercase tracking-[0.18em]">System Info</h2>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="vx-card flex flex-col gap-1.5">
              <span className="label-xs">Version</span>
              <span className="font-mono text-[14px] text-ivory/85">v0.2.1<span className="text-ivory/20">-alpha</span></span>
              <span className="font-mono text-[9px] text-ivory/20 mt-1">Build 2026-05-17</span>
            </div>
            <div className="vx-card flex flex-col gap-1.5">
              <span className="label-xs">Environment</span>
              <span className="font-mono text-[14px] text-vgreen/80">DEVELOPMENT</span>
              <span className="font-mono text-[9px] text-ivory/20 mt-1">localhost:3000</span>
            </div>
            <div className="vx-card flex flex-col gap-1.5">
              <span className="label-xs">Last Deploy</span>
              <span className="font-mono text-[14px] text-ivory/55">—</span>
              <span className="font-mono text-[9px] text-ivory/20 mt-1">Vercel (pending)</span>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
