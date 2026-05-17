"use client";

import { LayoutDashboard, Users, Code2, Brain, Zap, BarChart3 } from "lucide-react";

const features = [
  {
    icon: LayoutDashboard,
    title: "Personal Cockpit",
    description: "Taski, kalendarz, priorytety, rekomendacje AI — wszystko w jednym miejscu",
  },
  {
    icon: Users,
    title: "CRM",
    description: "Zarządzanie leadami, lejek sprzedażowy, follow-up — routing bazowany na AI",
  },
  {
    icon: Code2,
    title: "Vantix DEV",
    description: "Projekty, roadmapa, TODO, logi — pamięć projektów w jednym systemie",
  },
  {
    icon: Brain,
    title: "VANTIXRAG",
    description: "Pamięć AI, baza wiedzy, decyzje, propozycje zmian — evolution w czasie rzeczywistym",
  },
  {
    icon: Zap,
    title: "Workflows",
    description: "Automatyzacje, webhooks, flow — n8n integration dla procesów biznesowych",
  },
  {
    icon: BarChart3,
    title: "Analytics",
    description: "Finansowe, operacyjne, produktywność — real-time insights i forecasting",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20 px-4 bg-black">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">
            Moduły systemu
          </h2>
          <p className="text-neutral-400 text-lg">
            Jeden OS, wiele funkcjonalności. Wszystko zintegrowane w harmonię.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-lg border border-neutral-800 bg-neutral-950/50 hover:border-yellow-600/50 hover:bg-neutral-900 transition group"
              >
                <Icon className="w-8 h-8 text-yellow-600 mb-4 group-hover:scale-110 transition" />
                <h3 className="text-lg font-semibold font-display mb-2">
                  {feature.title}
                </h3>
                <p className="text-neutral-400 text-sm">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
