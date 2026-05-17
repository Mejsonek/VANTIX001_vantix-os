'use client';

export const Footer: React.FC = () => (
  <footer className="relative z-10 border-t-[0.5px] border-[rgba(212,175,55,0.09)] px-10 py-8 bg-[rgba(2,2,2,0.7)] backdrop-blur-[10px]" role="contentinfo">
    <div className="max-w-[1280px] mx-auto flex flex-wrap items-center justify-between gap-4">
      <p className="font-serif text-[1.1rem] font-normal tracking-[0.45em] text-[rgba(245,244,240,0.22)]">
        VANTI<span className="text-[rgba(212,175,55,0.38)]">X</span>
      </p>
      <p className="text-[0.52rem] tracking-[0.2em] uppercase text-[rgba(245,244,240,0.15)]">
        © 2025 Vantix Agency · Wszelkie prawa zastrzeżone
      </p>
      <nav className="flex gap-8" aria-label="Stopka">
        <a href="#" className="text-[0.52rem] tracking-[0.18em] uppercase text-[rgba(245,244,240,0.18)] transition-colors duration-300 hover:text-gold">Polityka Prywatności</a>
        <a href="#" className="text-[0.52rem] tracking-[0.18em] uppercase text-[rgba(245,244,240,0.18)] transition-colors duration-300 hover:text-gold">Regulamin</a>
      </nav>
    </div>
  </footer>
);

export default Footer;
