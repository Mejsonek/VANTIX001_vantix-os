"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-neutral-800 bg-black py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="text-2xl font-bold font-display text-yellow-600 mb-2">
              VANTIX
            </div>
            <p className="text-neutral-500 text-sm">
              System operacyjny dla nowoczesnego biznesu.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold mb-4">Produkt</h3>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li>
                <Link href="#features" className="hover:text-neutral-200">
                  Moduły
                </Link>
              </li>
              <li>
                <Link href="/cockpit" className="hover:text-neutral-200">
                  Demo
                </Link>
              </li>
              <li>
                <Link href="#about" className="hover:text-neutral-200">
                  O systemie
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">Firma</h3>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li>
                <a href="#" className="hover:text-neutral-200">
                  O nas
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-neutral-200">
                  Blog
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-neutral-200">
                  Kontakt
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li>
                <a href="#" className="hover:text-neutral-200">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-neutral-200">
                  Terms
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-neutral-800 pt-8 flex flex-col sm:flex-row items-center justify-between text-sm text-neutral-500">
          <div>© 2026 VANTIX. Wszystkie prawa zastrzeżone.</div>
          <div className="flex gap-6 mt-4 sm:mt-0">
            <a href="#" className="hover:text-neutral-300">
              Twitter
            </a>
            <a href="#" className="hover:text-neutral-300">
              GitHub
            </a>
            <a href="#" className="hover:text-neutral-300">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
