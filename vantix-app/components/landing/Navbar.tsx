"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-neutral-800 bg-black/40 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="text-2xl font-bold font-display text-yellow-600">VANTIX</div>
            <div className="text-xs text-neutral-500 hidden sm:block">OS</div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-neutral-400 hover:text-neutral-200 transition">
              Moduły
            </a>
            <a href="#about" className="text-sm text-neutral-400 hover:text-neutral-200 transition">
              O systemie
            </a>
            <a href="#contact" className="text-sm text-neutral-400 hover:text-neutral-200 transition">
              Kontakt
            </a>
            <Link
              href="/cockpit"
              className="px-4 py-2 bg-yellow-600 text-black text-sm font-semibold rounded hover:bg-yellow-500 transition"
            >
              Dashboard
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 space-y-4 pb-4">
            <a href="#features" className="block text-sm text-neutral-400 hover:text-neutral-200">
              Moduły
            </a>
            <a href="#about" className="block text-sm text-neutral-400 hover:text-neutral-200">
              O systemie
            </a>
            <a href="#contact" className="block text-sm text-neutral-400 hover:text-neutral-200">
              Kontakt
            </a>
            <Link
              href="/cockpit"
              className="block px-4 py-2 bg-yellow-600 text-black text-sm font-semibold rounded text-center"
            >
              Dashboard
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
