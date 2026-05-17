'use client';

import { useState, useMemo } from 'react';
import {
  Search, Users, TrendingUp, DollarSign, Trophy,
  Mail, Phone, Building2, Calendar, ChevronDown, ChevronUp,
  ExternalLink, MessageSquare,
} from 'lucide-react';

export interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  status: 'nowy' | 'w_trakcie' | 'wygra' | 'przegrana';
  value: number;
  source: string;
  createdAt: string;
  notes: string;
}

const mockLeads: Lead[] = [
  { id: 'L-001', name: 'Anna Kowalska',         company: 'TechFlow Sp. z o.o.', email: 'anna@techflow.pl',            phone: '+48 601 234 567', status: 'nowy',      value: 15000, source: 'Landing Page', createdAt: '2026-05-17', notes: 'Zainteresowana pełną automatyzacją procesów sprzedażowych. Prosi o wycenę.' },
  { id: 'L-002', name: 'Marcin Nowak',           company: 'DevHouse SA',          email: 'm.nowak@devhouse.pl',          phone: '+48 602 345 678', status: 'w_trakcie', value: 28000, source: 'Polecenie',    createdAt: '2026-05-15', notes: 'Wstępna rozmowa odbyta. Czeka na demo systemu Vantix OS.' },
  { id: 'L-003', name: 'Katarzyna Wiśniewska',   company: 'EcoMarket',            email: 'k.wisniewska@ecomarket.pl',    phone: '+48 603 456 789', status: 'wygra',     value: 12000, source: 'LinkedIn',     createdAt: '2026-05-10', notes: 'Podpisana umowa. Start projektu: czerwiec 2026.' },
  { id: 'L-004', name: 'Piotr Zieliński',        company: 'BuildCorp',            email: 'p.zielinski@buildcorp.pl',    phone: '+48 604 567 890', status: 'w_trakcie', value: 35000, source: 'Konferencja',  createdAt: '2026-05-14', notes: 'Duży projekt — CRM + automatyzacje. Negocjacje cenowe.' },
  { id: 'L-005', name: 'Magdalena Lewandowska',  company: 'MediaGroup',           email: 'm.lewandowska@mediagroup.pl', phone: '+48 605 678 901', status: 'nowy',      value: 8000,  source: 'Landing Page', createdAt: '2026-05-18', notes: 'Formularz z kalkulatora ROI. Mała firma, budżet ograniczony.' },
  { id: 'L-006', name: 'Tomasz Dąbrowski',       company: 'FinServe',             email: 't.dabrowski@finserve.pl',     phone: '+48 606 789 012', status: 'przegrana', value: 22000, source: 'Cold Email',   createdAt: '2026-04-28', notes: 'Wybrał konkurencję — niższa cena. Follow-up za 3 miesiące.' },
  { id: 'L-007', name: 'Aleksandra Kamińska',    company: 'HealthPlus',           email: 'a.kaminska@healthplus.pl',    phone: '+48 607 890 123', status: 'w_trakcie', value: 18000, source: 'Polecenie',    createdAt: '2026-05-12', notes: 'System do dokumentacji medycznej. Czeka na blueprint.' },
  { id: 'L-008', name: 'Rafał Mazur',            company: 'LogiTrans',            email: 'r.mazur@logitrans.pl',        phone: '+48 608 901 234', status: 'nowy',      value: 9500,  source: 'Google Ads',  createdAt: '2026-05-17', notes: 'Automatyzacja logistyki. Prosi o kontakt telefoniczny.' },
  { id: 'L-009', name: 'Joanna Krawczyk',        company: 'StyleBox',             email: 'j.krawczyk@stylebox.pl',      phone: '+48 609 012 345', status: 'wygra',     value: 31000, source: 'Instagram',    createdAt: '2026-05-05', notes: 'E-commerce automation. Projekt w trakcie — faza blueprint.' },
  { id: 'L-010', name: 'Michał Wójcik',          company: 'DataLab',              email: 'm.wojcik@datalab.pl',         phone: '+48 610 123 456', status: 'nowy',      value: 42000, source: 'Konferencja',  createdAt: '2026-05-16', notes: 'Enterprise — pełny Vantix OS. Prosi o spotkanie z zarządem.' },
];

const statusCfg: Record<string, { label: string; dot: string; text: string; bg: string; border: string }> = {
  nowy:       { label: 'Nowy',      dot: 'bg-gold',   text: 'text-gold',   bg: 'bg-gold/5',   border: 'border-gold/30' },
  w_trakcie:  { label: 'W trakcie', dot: 'bg-vblue',  text: 'text-vblue',  bg: 'bg-vblue/5',  border: 'border-vblue/30' },
  wygra:      { label: 'Wygrana',   dot: 'bg-vgreen', text: 'text-vgreen', bg: 'bg-vgreen/5', border: 'border-vgreen/30' },
  przegrana:  { label: 'Przegrana', dot: 'bg-vred',   text: 'text-vred',   bg: 'bg-vred/5',   border: 'border-vred/30' },
};

const sourceIcon: Record<string, string> = {
  'Landing Page': '🌐', 'Polecenie': '🤝', 'LinkedIn': '💼',
  'Konferencja': '🎤',  'Cold Email': '📧', 'Google Ads': '🔍', 'Instagram': '📱',
};

function fmt(val: number) {
  return new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN', minimumFractionDigits: 0 }).format(val);
}

const FILTERS = ['all', 'nowy', 'w_trakcie', 'wygra', 'przegrana'] as const;
const FILTER_LABELS: Record<string, string> = {
  all: 'Wszystkie', nowy: 'Nowe', w_trakcie: 'W trakcie', wygra: 'Wygrane', przegrana: 'Przegrane',
};

type SortKey = 'name' | 'value' | 'createdAt' | 'status';

export default function LeadList() {
  const [search,      setSearch]      = useState('');
  const [filter,      setFilter]      = useState<string>('all');
  const [expandedId,  setExpandedId]  = useState<string | null>(null);
  const [sortKey,     setSortKey]     = useState<SortKey>('createdAt');
  const [sortDesc,    setSortDesc]    = useState(true);

  const stats = useMemo(() => {
    const totalValue = mockLeads.reduce((s, l) => s + l.value, 0);
    const won        = mockLeads.filter(l => l.status === 'wygra');
    const active     = mockLeads.filter(l => l.status === 'nowy' || l.status === 'w_trakcie');
    const wonValue   = won.reduce((s, l) => s + l.value, 0);
    return { total: mockLeads.length, totalValue, wonCount: won.length, wonValue, active: active.length };
  }, []);

  const filtered = useMemo(() => {
    const arr = mockLeads
      .filter(l => {
        const s = search.toLowerCase();
        const matchSearch = l.name.toLowerCase().includes(s)
          || l.company.toLowerCase().includes(s)
          || l.email.toLowerCase().includes(s)
          || l.id.toLowerCase().includes(s);
        const matchFilter = filter === 'all' || l.status === filter;
        return matchSearch && matchFilter;
      });

    arr.sort((a, b) => {
      let av: string | number, bv: string | number;
      if (sortKey === 'value')     { av = a.value;     bv = b.value; }
      else if (sortKey === 'createdAt') { av = a.createdAt; bv = b.createdAt; }
      else if (sortKey === 'status')    { av = a.status;    bv = b.status; }
      else                         { av = a.name;      bv = b.name; }
      return sortDesc
        ? (av < bv ? 1 : av > bv ? -1 : 0)
        : (av < bv ? -1 : av > bv ? 1 : 0);
    });
    return arr;
  }, [search, filter, sortKey, sortDesc]);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortDesc(d => !d);
    else { setSortKey(key); setSortDesc(true); }
  };

  const SortIcon = ({ col }: { col: SortKey }) =>
    sortKey === col
      ? (sortDesc ? <ChevronDown size={9} className="text-gold" /> : <ChevronUp size={9} className="text-gold" />)
      : <ChevronDown size={9} className="text-ivory/15" />;

  return (
    <div className="space-y-4">

      {/* ── STATS ROW ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { icon: Users,      label: 'Leady łącznie',   value: stats.total,              sub: `${stats.active} aktywnych`,          border: 'border-l-ivory/20', vcolor: 'text-ivory/70' },
          { icon: TrendingUp, label: 'Aktywny pipeline', value: stats.active,             sub: 'nowe + w trakcie',                   border: 'border-l-gold/50',  vcolor: 'text-gold' },
          { icon: DollarSign, label: 'Wartość pipeline', value: fmt(stats.totalValue),    sub: fmt(stats.wonValue) + ' wygrane',     border: 'border-l-vblue/40', vcolor: 'text-vblue' },
          { icon: Trophy,     label: 'Wygrane',          value: stats.wonCount,           sub: `${Math.round(stats.wonCount/stats.total*100)}% win rate`, border: 'border-l-vgreen/40', vcolor: 'text-vgreen' },
        ].map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className={`vx-card vx-3d !p-4 border-l-2 ${s.border} fade-up delay-${i+1}`} style={{ position: 'relative' }}>
              <div className="stat-accent-line" />
              <div className="flex items-center gap-2 mb-2.5">
                <Icon size={10} className={`${s.vcolor} opacity-70`} />
                <span className="font-mono text-[8px] text-ivory/25 uppercase tracking-wider">{s.label}</span>
              </div>
              <div className={`font-display text-xl font-black ${s.vcolor} num-animate delay-${i+2}`}>{s.value}</div>
              <div className="font-mono text-[8px] text-ivory/20 mt-1">{s.sub}</div>
            </div>
          );
        })}
      </div>

      {/* ── PIPELINE VALUE BAR ── */}
      <div className="vx-card !p-3 fade-up delay-3">
        <div className="flex items-center justify-between mb-2">
          <span className="font-mono text-[8px] text-ivory/25 uppercase tracking-wider">Pipeline — podział wartości</span>
          <span className="font-mono text-[8px] text-ivory/20">{fmt(stats.totalValue)} łącznie</span>
        </div>
        <div className="flex h-2 gap-px overflow-hidden rounded-sm">
          {Object.entries(statusCfg).map(([key, cfg]) => {
            const groupLeads = mockLeads.filter(l => l.status === key);
            const groupValue = groupLeads.reduce((s, l) => s + l.value, 0);
            const pct = stats.totalValue > 0 ? (groupValue / stats.totalValue) * 100 : 0;
            if (pct === 0) return null;
            const colors: Record<string, string> = { nowy: '#d4af37', w_trakcie: '#6B8FD4', wygra: '#4ade80', przegrana: '#ff5252' };
            return (
              <div
                key={key}
                title={`${cfg.label}: ${fmt(groupValue)} (${Math.round(pct)}%)`}
                style={{ width: `${pct}%`, background: colors[key], opacity: 0.7 }}
                className="bar-animate"
              />
            );
          })}
        </div>
        <div className="flex items-center gap-4 mt-2">
          {Object.entries(statusCfg).map(([key, cfg]) => (
            <div key={key} className="flex items-center gap-1.5">
              <div className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
              <span className="font-mono text-[8px] text-ivory/25">{cfg.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── SEARCH + FILTERS ── */}
      <div className="flex flex-col sm:flex-row gap-2.5 fade-up delay-4">
        <div className="relative flex-1">
          <Search size={11} className="absolute left-3 top-1/2 -translate-y-1/2 text-ivory/20" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Szukaj po nazwie, firmie, emailu..."
            className="w-full bg-surface border border-gold/10 pl-9 pr-4 py-2.5 font-mono text-[11px] text-ivory/60 placeholder:text-ivory/15 focus:border-gold/30 focus:outline-none transition-colors"
          />
        </div>
        <div className="flex gap-1 flex-wrap">
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-2 font-mono text-[8px] uppercase tracking-wider border transition-colors ${
                filter === f
                  ? 'border-gold/40 bg-gold/10 text-gold'
                  : 'border-gold/10 text-ivory/25 hover:border-gold/20 hover:text-ivory/40'
              }`}
            >
              {FILTER_LABELS[f]}
            </button>
          ))}
        </div>
      </div>

      {/* ── TABLE ── */}
      <div className="vx-card !p-0 overflow-hidden fade-up delay-5">
        {/* Header */}
        <div className="grid grid-cols-[2rem_1fr_1.4fr_0.9fr_0.9fr_1fr] px-4 py-2.5 border-b border-gold/10 bg-s2 select-none">
          <span className="font-mono text-[7px] text-ivory/15 uppercase tracking-widest">#</span>
          <button
            onClick={() => toggleSort('name')}
            className="flex items-center gap-1 font-mono text-[7px] text-ivory/25 uppercase tracking-widest hover:text-ivory/50 text-left"
          >
            Lead <SortIcon col="name" />
          </button>
          <span className="font-mono text-[7px] text-ivory/25 uppercase tracking-widest">Firma</span>
          <button
            onClick={() => toggleSort('status')}
            className="flex items-center gap-1 font-mono text-[7px] text-ivory/25 uppercase tracking-widest hover:text-ivory/50"
          >
            Status <SortIcon col="status" />
          </button>
          <button
            onClick={() => toggleSort('value')}
            className="flex items-center gap-1 font-mono text-[7px] text-ivory/25 uppercase tracking-widest hover:text-ivory/50"
          >
            Wartość <SortIcon col="value" />
          </button>
          <button
            onClick={() => toggleSort('createdAt')}
            className="flex items-center gap-1 font-mono text-[7px] text-ivory/25 uppercase tracking-widest hover:text-ivory/50"
          >
            Data <SortIcon col="createdAt" />
          </button>
        </div>

        {/* Rows */}
        <div className="divide-y divide-gold/[0.04]">
          {filtered.map((lead, idx) => {
            const cfg = statusCfg[lead.status];
            const isExp = expandedId === lead.id;

            return (
              <div key={lead.id}>
                <div
                  onClick={() => setExpandedId(isExp ? null : lead.id)}
                  className={`vx-row grid grid-cols-[2rem_1fr_1.4fr_0.9fr_0.9fr_1fr] px-4 py-3 row-enter delay-${Math.min(idx + 1, 10)} ${isExp ? 'bg-gold/[0.04]' : ''}`}
                >
                  {/* # */}
                  <span className="font-mono text-[9px] text-ivory/15 flex items-center">{idx + 1}</span>

                  {/* Lead */}
                  <div className="flex flex-col justify-center min-w-0">
                    <p className="font-mono text-[11px] text-ivory/70 font-semibold truncate">{lead.name}</p>
                    <p className="font-mono text-[8px] text-ivory/20 mt-0.5">{lead.id}</p>
                  </div>

                  {/* Firma */}
                  <div className="flex items-center gap-2 min-w-0">
                    <Building2 size={9} className="text-ivory/15 flex-shrink-0" />
                    <span className="font-mono text-[10px] text-ivory/35 truncate">{lead.company}</span>
                  </div>

                  {/* Status */}
                  <div className="flex items-center">
                    <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 border ${cfg.border} ${cfg.bg}`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${cfg.dot} flex-shrink-0`} />
                      <span className={`font-mono text-[7px] uppercase tracking-wider ${cfg.text}`}>{cfg.label}</span>
                    </div>
                  </div>

                  {/* Wartość */}
                  <div className="flex items-center">
                    <span className="font-mono text-[11px] text-gold/80 font-bold">{fmt(lead.value)}</span>
                  </div>

                  {/* Data */}
                  <div className="flex items-center gap-1.5">
                    <Calendar size={9} className="text-ivory/15 flex-shrink-0" />
                    <span className="font-mono text-[9px] text-ivory/25">{lead.createdAt}</span>
                  </div>
                </div>

                {/* Expanded */}
                {isExp && (
                  <div className="px-5 py-4 bg-s2 border-t border-gold/10 animate-[fade-up_0.2s_ease_both]">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                      <div>
                        <span className="font-mono text-[7px] text-ivory/20 uppercase tracking-widest block mb-1.5">Email</span>
                        <a href={`mailto:${lead.email}`} className="inline-flex items-center gap-1.5 font-mono text-[10px] text-gold/60 hover:text-gold transition-colors">
                          <Mail size={9} /> {lead.email}
                        </a>
                      </div>
                      <div>
                        <span className="font-mono text-[7px] text-ivory/20 uppercase tracking-widest block mb-1.5">Telefon</span>
                        <a href={`tel:${lead.phone}`} className="inline-flex items-center gap-1.5 font-mono text-[10px] text-ivory/40 hover:text-gold/60 transition-colors">
                          <Phone size={9} /> {lead.phone}
                        </a>
                      </div>
                      <div>
                        <span className="font-mono text-[7px] text-ivory/20 uppercase tracking-widest block mb-1.5">Źródło</span>
                        <span className="font-mono text-[10px] text-ivory/40">
                          {sourceIcon[lead.source] ?? '📌'} {lead.source}
                        </span>
                      </div>
                      <div>
                        <span className="font-mono text-[7px] text-ivory/20 uppercase tracking-widest block mb-1.5">Wartość</span>
                        <span className="font-mono text-[14px] font-black text-gold">{fmt(lead.value)}</span>
                      </div>
                    </div>
                    <div className="pt-3 border-t border-gold/[0.06]">
                      <span className="font-mono text-[7px] text-ivory/20 uppercase tracking-widest block mb-1.5">
                        <MessageSquare size={8} className="inline mr-1 opacity-60" />Notatki
                      </span>
                      <p className="font-mono text-[10px] text-ivory/40 leading-relaxed">{lead.notes}</p>
                    </div>
                    <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gold/[0.06]">
                      <button className="btn btn-dim !text-[8px] !px-3 !py-1.5 flex items-center gap-1.5">
                        <Mail size={8} /> Wyślij email
                      </button>
                      <button className="btn btn-ghost !text-[8px] !px-3 !py-1.5 flex items-center gap-1.5">
                        <ExternalLink size={8} /> Otwórz profil
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="py-16 text-center">
            <Users size={24} className="text-ivory/10 mx-auto mb-3" />
            <p className="font-mono text-[11px] text-ivory/20">Brak leadów spełniających kryteria</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between font-mono text-[8px] text-ivory/15 fade-up delay-6">
        <span>Pokazuje {filtered.length} z {mockLeads.length} leadów</span>
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-gold/30" />
          Mock data — Phase 2 podepnie Neon DB
        </span>
      </div>
    </div>
  );
}
