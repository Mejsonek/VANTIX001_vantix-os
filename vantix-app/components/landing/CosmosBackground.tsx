'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const CosmosBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 1;

    function makeStars(count: number, spread: number, size: number, opacity: number, color: number = 0xd4af37) {
      const geo = new THREE.BufferGeometry();
      const pos = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        pos[i * 3]     = (Math.random() - 0.5) * spread;
        pos[i * 3 + 1] = (Math.random() - 0.5) * spread;
        pos[i * 3 + 2] = (Math.random() - 0.5) * spread * 0.3;
      }
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      const mat = new THREE.PointsMaterial({ color, size, transparent: true, opacity, sizeAttenuation: true });
      return new THREE.Points(geo, mat);
    }

    const starsA = makeStars(1800, 12, 0.012, 0.55);
    const starsB = makeStars(600, 8, 0.025, 0.75);
    const starsC = makeStars(3000, 14, 0.006, 0.3, 0xffffff);
    scene.add(starsA, starsB, starsC);

    const nebulaMat = new THREE.MeshBasicMaterial({
      color: 0x1a1000, transparent: true, opacity: 0.0,
      blending: THREE.AdditiveBlending, depthWrite: false,
    });
    const nebula = new THREE.Mesh(new THREE.PlaneGeometry(8, 5), nebulaMat);
    nebula.position.z = -2;
    scene.add(nebula);

    let scrollY = 0;
    let parallaxY = 0;
    const handleScroll = () => { scrollY = window.scrollY; };
    window.addEventListener('scroll', handleScroll, { passive: true });

    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', handleResize);

    let animationFrameId: number;
    let then = 0;
    const FPS = 1000 / 40;

    const animate = (now: number) => {
      animationFrameId = requestAnimationFrame(animate);
      if (now - then < FPS) return;
      then = now;
      const t = now * 0.001;
      parallaxY += (scrollY * 0.0006 - parallaxY) * 0.05;

      starsA.rotation.y = t * 0.008;
      starsA.position.y = -parallaxY * 0.4;
      starsB.rotation.y = t * 0.014;
      starsB.rotation.x = t * 0.005;
      starsB.position.y = -parallaxY * 0.9;
      (starsC.material as THREE.PointsMaterial).opacity = 0.25 + Math.sin(t * 0.7) * 0.08;
      starsC.position.y = -parallaxY * 0.2;
      nebula.rotation.z = t * 0.02;

      renderer.render(scene, camera);
    };
    requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      id="cosmos"
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-screen -z-10 pointer-events-none"
      aria-hidden="true"
    />
  );
};
