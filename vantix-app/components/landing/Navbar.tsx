'use client';

import { useEffect, useState } from 'react';
import { Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

export const Navbar: React.FC = () => {
  const [isDense, setIsDense] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsDense(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      id="nav"
      className={cn(
        'fixed top-5 left-1/2 -translate-x-1/2 z-[500] w-[calc(100%-3rem)] max-w-[1280px]',
        'flex items-center justify-between px-7 py-4',
        'bg-[rgba(2,2,2,0.50)] backdrop-blur-[20px] border-[0.5px] border-[rgba(212,175,55,0.12)] rounded-2xl',
        'transition-all duration-400',
        isDense && 'bg-[rgba(2,2,2,0.85)] border-[rgba(212,175,55,0.08)] py-[0.7rem]'
      )}
      role="navigation"
      aria-label="Główna nawigacja"
    >
      <a href="#" className="flex items-center gap-3" aria-label="VANTIX — powrót do góry">
        <div className="w-8 h-8 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center text-gold shadow-[0_0_15px_rgba(212,175,55,0.2)]">
          <Zap size={16} fill="currentColor" />
        </div>
        <span className="font-serif text-[1.3rem] font-normal tracking-[0.45em] text-ivory">
          VANTI<span className="text-gold">X</span>
        </span>
      </a>

      <div className="hidden md:flex items-center gap-8">
        {[
          { name: 'Silnik', href: '#ekosystem' },
          { name: 'Tech-Stack', href: '#podmaska' },
          { name: 'Bezpieczeństwo', href: '#bezpieczenstwo' },
          { name: 'White-Label', href: '#white-label' },
          { name: 'O mnie', href: '#omnie' },
        ].map((item) => (
          <a
            key={item.name}
            href={item.href}
            className="relative text-[0.63rem] tracking-[0.24em] uppercase font-light text-[rgba(245,244,240,0.35)] transition-colors duration-300 hover:text-gold after:content-[''] after:absolute after:-bottom-[2px] after:left-0 after:right-0 after:h-[0.5px] after:bg-gold after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100"
          >
            {item.name}
          </a>
        ))}
      </div>

      <a
        href="#kontakt"
        className="relative overflow-hidden px-5 py-[0.55rem] border-[0.5px] border-[rgba(212,175,55,0.4)] rounded-md text-[0.6rem] tracking-[0.2em] uppercase font-normal text-gold transition-colors hover:text-void group"
      >
        <span className="relative z-10">Audyt Efektywności</span>
        <div className="absolute inset-0 bg-gold scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
      </a>
    </nav>
  );
};

export default Navbar;
