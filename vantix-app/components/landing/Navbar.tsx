'use client';

import { useEffect, useState } from 'react';
import { Zap, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
  { name: 'Silnik', href: '#ekosystem' },
  { name: 'Tech-Stack', href: '#podmaska' },
  { name: 'Bezpieczeństwo', href: '#bezpieczenstwo' },
  { name: 'White-Label', href: '#white-label' },
  { name: 'O mnie', href: '#omnie' },
];

export const Navbar: React.FC = () => {
  const [isDense, setIsDense] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsDense(window.scrollY > 60);
      if (isOpen) setIsOpen(false);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isOpen]);

  const handleLinkClick = () => setIsOpen(false);

  return (
    <nav
      id="nav"
      className={cn(
        'fixed top-3 md:top-5 left-1/2 -translate-x-1/2 z-[500] w-[calc(100%-1.5rem)] md:w-[calc(100%-3rem)] max-w-[1280px]',
        'bg-[rgba(2,2,2,0.50)] backdrop-blur-[20px] border-[0.5px] border-[rgba(212,175,55,0.12)] rounded-2xl',
        'transition-all duration-300',
        isDense && 'bg-[rgba(2,2,2,0.92)] border-[rgba(212,175,55,0.08)]'
      )}
      role="navigation"
      aria-label="Główna nawigacja"
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 md:px-7 py-3.5 md:py-4">
        <a href="#" className="flex items-center gap-3" aria-label="VANTIX — powrót do góry">
          <div className="w-8 h-8 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center text-gold shadow-[0_0_15px_rgba(212,175,55,0.2)]">
            <Zap size={16} fill="currentColor" />
          </div>
          <span className="font-serif text-[1.15rem] md:text-[1.3rem] font-normal tracking-[0.45em] text-ivory">
            VANTI<span className="text-gold">X</span>
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="relative text-[0.63rem] tracking-[0.24em] uppercase font-light text-[rgba(245,244,240,0.35)] transition-colors duration-300 hover:text-gold after:content-[''] after:absolute after:-bottom-[2px] after:left-0 after:right-0 after:h-[0.5px] after:bg-gold after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100"
            >
              {item.name}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {/* CTA — hidden on very small, shown on sm+ */}
          <a
            href="#kontakt"
            className="hidden sm:block relative overflow-hidden px-4 md:px-5 py-[0.5rem] border-[0.5px] border-[rgba(212,175,55,0.4)] rounded-md text-[0.58rem] md:text-[0.6rem] tracking-[0.18em] uppercase font-normal text-gold transition-colors hover:text-void group"
          >
            <span className="relative z-10">Audyt Efektywności</span>
            <div className="absolute inset-0 bg-gold scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
          </a>

          {/* Hamburger — mobile only */}
          <button
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg border-[0.5px] border-[rgba(212,175,55,0.2)] text-gold/60 hover:text-gold hover:border-gold/40 transition-colors"
            onClick={() => setIsOpen((v) => !v)}
            aria-label={isOpen ? 'Zamknij menu' : 'Otwórz menu'}
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {isOpen && (
        <div className="md:hidden border-t-[0.5px] border-[rgba(212,175,55,0.1)] px-5 py-4 flex flex-col gap-5">
          {navLinks.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={handleLinkClick}
              className="text-[0.68rem] tracking-[0.22em] uppercase font-light text-[rgba(245,244,240,0.45)] hover:text-gold transition-colors duration-200"
            >
              {item.name}
            </a>
          ))}
          <a
            href="#kontakt"
            onClick={handleLinkClick}
            className="mt-1 self-start px-5 py-2.5 border-[0.5px] border-[rgba(212,175,55,0.4)] rounded-md text-[0.6rem] tracking-[0.2em] uppercase font-normal text-gold"
          >
            Audyt Efektywności
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
