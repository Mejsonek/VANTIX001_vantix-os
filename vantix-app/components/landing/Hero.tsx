"use client";

import { ArrowRight, Code2, Users, Brain, Zap, BarChart3 } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 pb-12 px-4 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-black to-neutral-950 -z-10" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-600/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-4xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 bg-yellow-600/10 border border-yellow-600/30 rounded-full">
          <div className="w-2 h-2 bg-yellow-600 rounded-full animate-pulse" />
          <span className="text-xs font-semibold text-yellow-600 uppercase tracking-widest">
            OS dla nowoczesnego biznesu
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-5xl md:text-7xl font-bold font-display mb-6 leading-tight">
          Skalowalność
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-700">
            bez chaosu
          </span>
        </h1>

        {/* Subheading */}
        <p className="text-lg md:text-xl text-neutral-400 mb-8 max-w-2xl mx-auto leading-relaxed">
          Eliminujemy wąskie gardła w przepływie danych. Projektujemy architekturę, która przejmuje logikę decyzyjną 
          i optymalizuje marżę w czasie rzeczywistym.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 md:gap-8 mb-12">
          <div>
            <div className="text-2xl md:text-3xl font-bold text-yellow-600">1</div>
            <div className="text-xs md:text-sm text-neutral-500">System</div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-bold text-yellow-600">∞</div>
            <div className="text-xs md:text-sm text-neutral-500">Możliwości</div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-bold text-yellow-600">0</div>
            <div className="text-xs md:text-sm text-neutral-500">Chaosu</div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-3 bg-yellow-600 text-black font-semibold rounded-lg hover:bg-yellow-500 transition group"
          >
            Zaproszenie beta
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
          </Link>
          <Link
            href="/cockpit"
            className="inline-flex items-center gap-2 px-8 py-3 border border-yellow-600/50 text-neutral-200 font-semibold rounded-lg hover:bg-yellow-600/10 transition"
          >
            Demo systemu →
          </Link>
        </div>

        {/* Feature highlights */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex flex-col items-center gap-2 p-4">
            <Code2 className="w-6 h-6 text-yellow-600" />
            <div className="text-sm font-semibold">API-First</div>
            <div className="text-xs text-neutral-500">Architektura</div>
          </div>
          <div className="flex flex-col items-center gap-2 p-4">
            <Brain className="w-6 h-6 text-yellow-600" />
            <div className="text-sm font-semibold">Claude AI</div>
            <div className="text-xs text-neutral-500">Intelligence</div>
          </div>
          <div className="flex flex-col items-center gap-2 p-4">
            <Zap className="w-6 h-6 text-yellow-600" />
            <div className="text-sm font-semibold">n8n</div>
            <div className="text-xs text-neutral-500">Automation</div>
          </div>
        </div>
      </div>
    </section>
  );
}
