'use client';

import { useState, useMemo } from 'react';
import { Search, Filter, ChevronDown, Users, TrendingUp, DollarSign, Clock, Mail, Phone, Building2, Calendar, Hash } from 'lucide-react';

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
  {
    id: 'L-001',
    name: 'Anna Kowalska',
    company: 'TechFlow Sp. z o.o.',
    email: 'anna@techflow.pl',
    phone: '+48 601 234 567',
    status: 'nowy',
    value: 15000,
    source: 'Landing Page',
    createdAt: '2026-05-17',
    notes: 'Zainteresowana pełną automatyzacją procesów sprzedażowych. Prosi o wycenę.',
  },
  {
    id: 'L-002',
    name: 'Marcin Nowak',
    company: 'DevHouse SA',
    email: 'm.nowak@devhouse.pl',
    phone: '+48 602 345 678',
    status: 'w_trakcie',
    value: 28000,
    source: 'Polecenie',
    createdAt: '2026-05-15',
    notes: 'Wstępna rozmowa odbyta. Czeka na demo systemu Vantix OS.',
  },
  {
    id: 'L-003',
    name: 'Katarzyna Wiśniewska',
    company: 'EcoMarket',
    email: 'k.wisniewska@ecomarket.pl',
    phone: '+48 603 456 789',
    status: 'wygra',
    value: 12000,
    source: 'LinkedIn',
    createdAt: '2026-05-10',
    notes: 'Podpisana umowa. Start projektu: czerwiec 2026.',
  },
  {
    id: 'L-004',
    name: 'Piotr Zieliński',
    company: 'BuildCorp',
    email: 'p.zielinski@buildcorp.pl',
    phone: '+48 604 567 890',
    status: 'w_trakcie',
    value: 35000,
    source: 'Konferencja',
    createdAt: '2026-05-14',
    notes: 'Duży projekt — system CRM + automatyzacje. Negocjacje cenowe.',
  },
  {
    id: 'L-005',
    name: 'Magdalena Lewandowska',
    company: 'MediaGroup',
    email: 'm.lewandowska@mediagroup.pl',
    phone: '+48 605 678 901',
    status: 'nowy',
    value: 8000,
    source: 'Landing Page',
    createdAt: '2026-05-18',
    notes: 'Formularz z kalkulatora ROI. Mała firma, budżet ograniczony.',
  },
  {
    id: 'L-006',
    name: 'Tomasz Dąbrowski',
    company: 'FinServe',
    email: 't.dabrowski@finserve.pl',
    phone: '+48 606 789 012',
    status: 'przegrana',
    value: 22000,
    source: 'Cold Email',
    createdAt: '2026-04-28',
    notes: 'Wybrał konkurencję — niższa cena. Do follow-up za 3 miesiące.',
  },
  {
    id: 'L-007',
    name: 'Aleksandra Kamińska',
    company: 'HealthPlus',
    email: 'a.kaminska@healthplus.pl',
    phone: '+48 607 890 123',
    status: 'w_trakcie',
    value: 18000,
    source: 'Polecenie',
    createdAt: '2026-05-12',
    notes: 'System do zarządzania dokumentacją medyczną. Czeka na blueprint.',
  },
  {
    id: 'L-008',
    name: 'Rafał Mazur',
    company: 'LogiTrans',
    email: 'r.mazur@logitrans.pl',
    phone: '+48 608 901 234',
    status: 'nowy',
    value: 9500,
    source: 'Google Ads',
    createdAt: '2026-05-17',
    notes: 'Zainteresowany automatyzacją logistyki. Prosi o kontakt telefoniczny.',
  },
  {
    id: 'L-009',
    name: 'Joanna Krawczyk',
    company: 'StyleBox',
    email: 'j.krawczyk@stylebox.pl',
    phone: '+48 609 012 345',
    status: 'wygra',
    value: 31000,
    source: 'Instagram',
    createdAt: '2026-05-05',
    notes: 'E-commerce automation. Projekt w trakcie — faza blueprint.',
  },
  {
    id: 'L-010',
    name: 'Michał Wójcik',
    company: 'DataLab',
    email: 'm.wojcik@datalab.pl',
    phone: '+48 610 123 456',
    status: 'nowy',
    value: 42000,
    source: 'Konferencja',
    createdAt: '2026-05-16',
    notes: 'Enterprise — pełny Vantix OS. Prosi o spotkanie z zarządem.',
  },
];

const statusCfg: Record<string, { label: string; cls: string }> = {
  nowy:       { label: 'Nowy',       cls: 'vx-badge vx-badge-gold' },
  w_trakcie:  { label: 'W trakcie',  cls: 'vx-badge vx-badge-blue' },
  wygra:      { label: 'Wygra',      cls: 'vx-badge vx-badge-green' },
  przegrana:  { label: 'Przegrana',  cls: 'vx-badge vx-badge-red' },
};

const sourceIcons: Record<string, string> = {
  'Landing Page': '🌐',
  'Polecenie': '🤝',
  'LinkedIn': '💼',
  'Konferencja': '🎤',
  'Cold Email': '📧',
  'Google Ads': '🔍',
  'Instagram': '📱',
};

function formatValue(val: number): string {
  return new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(val);
}

export default function LeadList() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return mockLeads.filter((l) => {
      const matchesSearch = l.name.toLowerCase().includes(search.toLowerCase())
        || l.company.toLowerCase().includes(search.toLowerCase())
        || l.email.toLowerCase().includes(search.toLowerCase())
        || l.id.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === 'all' || l.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  const stats = useMemo(() => {
    const total = mockLeads.length;
    const totalValue = mockLeads.reduce((s, l) => s + l.value, 0);
    const won = mockLeads.filter((l) => l.status === 'wygra').length;
    const active = mockLeads.filter((l) => l.status === 'nowy' || l.status === 'w_trakcie').length;
    return { total, totalValue, won, active };
  }, []);

  return (
    <div className="space-y-5">
      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { icon: Users, label: 'Wszystkie leady', value: stats.total, gold: false },
          { icon: TrendingUp, label: 'Aktywne', value: stats.active, gold: true },
          { icon: DollarSign, label: 'Wartość pipeline', value: formatValue(stats.totalValue), gold: false },
          { icon: Clock, label: 'Wygrane', value: stats.won, gold: false },
        ].map((s) => (
          <div key={s.label} className="vx-card !p-4">
            <div className="flex items-center gap-2 mb-2">
              <s.icon size={11} className={s.gold ? 'text-gold/60' : 'text-ivory/20'} />
              <span className="font-mono text-[9px] text-ivory/30 uppercase tracking-wider">{s.label}</span>
            </div>
            <p className={`font-display text-xl font-bold ${s.gold ? 'text-gold' : 'text-ivory/70'}`}>
              {s.value}
            </p>
          </div>
        ))}
      </div>

      {/* Filters + Search */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Search size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-ivory/20" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Szukaj leada..."
            className="w-full bg-surface border border-gold/10 pl-9 pr-4 py-2.5 font-mono text-[11px] text-ivory/60 placeholder:text-ivory/15 focus:border-gold/30 focus:outline-none transition-colors"
          />
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {['all', 'nowy', 'w_trakcie', 'wygra', 'przegrana'].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-2 font-mono text-[9px] uppercase tracking-wider border transition-colors ${
                statusFilter === s
                  ? 'border-gold/40 bg-gold/10 text-gold'
                  : 'border-gold/10 text-ivory/30 hover:border-gold/20'
              }`}
            >
              {s === 'all' ? 'Wszystkie' : statusCfg[s]?.label ?? s}
            </button>
          ))}
        </div>
      </div>

      {/* Lead Table */}
      <div className="vx-card !p-0 overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-[1fr_1.5fr_1fr_0.6fr_1fr] px-5 py-3 border-b border-gold/10 bg-s2">
          {['Lead', 'Firma', 'Status', 'Wartość', 'Źródło'].map((h) => (
            <span key={h} className="font-mono text-[8px] text-ivory/25 uppercase tracking-[0.2em]">{h}</span>
          ))}
        </div>

        {/* Table Rows */}
        <div className="divide-y divide-gold/[0.04]">
          {filtered.map((lead) => {
            const cfg = statusCfg[lead.status];
            const isExpanded = expandedId === lead.id;

            return (
              <div key={lead.id}>
                <div
                  onClick={() => setExpandedId(isExpanded ? null : lead.id)}
                  className={`grid grid-cols-[1fr_1.5fr_1fr_0.6fr_1fr] px-5 py-3 cursor-pointer transition-colors hover:bg-gold/[0.02] ${isExpanded ? 'bg-gold/[0.03]' : ''}`}
                >
                  <div>
                    <p className="font-mono text-[11px] text-ivory/60 font-semibold">{lead.name}</p>
                    <p className="font-mono text-[9px] text-ivory/20 mt-0.5">#{lead.id}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building2 size={10} className="text-ivory/15 flex-shrink-0" />
                    <span className="font-mono text-[10px] text-ivory/35">{lead.company}</span>
                  </div>
                  <div className="flex items-center">
                    <span className={cfg.cls}>{cfg.label}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-mono text-[11px] text-gold/70 font-semibold">{formatValue(lead.value)}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px]">{sourceIcons[lead.source] ?? '📌'}</span>
                    <span className="font-mono text-[9px] text-ivory/25">{lead.source}</span>
                  </div>
                </div>

                {/* Expanded details */}
                {isExpanded && (
                  <div className="px-5 py-4 bg-s2 border-t border-gold/10">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                      <div>
                        <span className="font-mono text-[8px] text-ivory/20 uppercase tracking-wider">Email</span>
                        <div className="flex items-center gap-1.5 mt-1">
                          <Mail size={10} className="text-ivory/15" />
                          <a href={`mailto:${lead.email}`} className="font-mono text-[10px] text-gold/60 hover:text-gold transition-colors">
                            {lead.email}
                          </a>
                        </div>
                      </div>
                      <div>
                        <span className="font-mono text-[8px] text-ivory/20 uppercase tracking-wider">Telefon</span>
                        <div className="flex items-center gap-1.5 mt-1">
                          <Phone size={10} className="text-ivory/15" />
                          <a href={`tel:${lead.phone}`} className="font-mono text-[10px] text-ivory/40 hover:text-gold/60 transition-colors">
                            {lead.phone}
                          </a>
                        </div>
                      </div>
                      <div>
                        <span className="font-mono text-[8px] text-ivory/20 uppercase tracking-wider">Data</span>
                        <div className="flex items-center gap-1.5 mt-1">
                          <Calendar size={10} className="text-ivory/15" />
                          <span className="font-mono text-[10px] text-ivory/40">{lead.createdAt}</span>
                        </div>
                      </div>
                      <div>
                        <span className="font-mono text-[8px] text-ivory/20 uppercase tracking-wider">ID</span>
                        <div className="flex items-center gap-1.5 mt-1">
                          <Hash size={10} className="text-ivory/15" />
                          <span className="font-mono text-[10px] text-ivory/30">{lead.id}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <span className="font-mono text-[8px] text-ivory/20 uppercase tracking-wider">Notatki</span>
                      <p className="font-mono text-[10px] text-ivory/35 mt-1 leading-relaxed">{lead.notes}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="px-5 py-12 text-center">
            <p className="font-mono text-[11px] text-ivory/20">Brak leadów spełniających kryteria</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between font-mono text-[9px] text-ivory/15">
        <span>Pokazuje {filtered.length} z {mockLeads.length} leadów</span>
        <span>Dane mock — Phase 2 podepnie Neon DB</span>
      </div>
    </div>
  );
}