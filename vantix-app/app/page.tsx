'use client';

import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { CosmosBackground } from '@/components/landing/CosmosBackground';
import { Navbar } from '@/components/landing/Navbar';
import { Hero } from '@/components/landing/Hero';
import { Ekosystem } from '@/components/landing/Features';
import { PodMaska } from '@/components/landing/PodMaska';
import { DlaczegoMy } from '@/components/landing/DlaczegoMy';
import { Bezpieczenstwo } from '@/components/landing/Bezpieczenstwo';
import { WhiteLabel } from '@/components/landing/WhiteLabel';
import { OMnie } from '@/components/landing/OMnie';
import { VantixRoiTerminal } from '@/components/landing/VantixRoiTerminal';
import { FAQ } from '@/components/landing/FAQ';
import { Footer } from '@/components/landing/Footer';

export default function LandingPage() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [ringPos, setRingPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.35,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.85,
      touchMultiplier: 1.4,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const handleMouseMove = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    let animationFrameId: number;
    const tick = () => {
      setRingPos((prev) => ({
        x: prev.x + (mousePos.x - prev.x) * 0.1,
        y: prev.y + (mousePos.y - prev.y) * 0.1,
      }));
      animationFrameId = requestAnimationFrame(tick);
    };
    tick();
    return () => cancelAnimationFrame(animationFrameId);
  }, [mousePos]);

  return (
    <div
      className="relative min-h-screen md:cursor-none"
      style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, background: '#020202', color: '#f5f4f0' }}
    >
      <div className="grain" aria-hidden="true" />

      {/* Custom cursor — desktop only */}
      <div
        className="hidden md:block fixed top-0 left-0 z-[9999] w-[5px] h-[5px] bg-gold rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 will-change-transform"
        style={{ transform: `translate(calc(${mousePos.x}px - 50%), calc(${mousePos.y}px - 50%))` }}
        aria-hidden="true"
      />
      <div
        className="hidden md:block fixed top-0 left-0 z-[9998] w-[34px] h-[34px] border border-[rgba(212,175,55,0.4)] rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 will-change-transform transition-[width,height,border-color] duration-300"
        style={{ transform: `translate(calc(${ringPos.x}px - 50%), calc(${ringPos.y}px - 50%))` }}
        aria-hidden="true"
      />

      <CosmosBackground />
      <Navbar />

      <main>
        {/* 1. Hero */}
        <Hero />

        {/* 2. VANTIX ROI TERMINAL — unified kalkulator + formularz */}
        <VantixRoiTerminal />

        {/* 3. 02 — THE VANTIX ENGINE */}
        <Ekosystem />

        {/* 4. TECH-STACK */}
        <PodMaska />

        {/* 5. 03 — DLACZEGO VANTIX */}
        <DlaczegoMy />

        {/* 6. 05 — PROTOKÓŁ BEZPIECZEŃSTWA */}
        <Bezpieczenstwo />

        {/* 7. 04 — WHITE-LABEL PARTNER */}
        <WhiteLabel />

        {/* 8. O MNIE */}
        <OMnie />

        {/* 9. FAQ */}
        <FAQ />
      </main>

      <Footer />
    </div>
  );
}
