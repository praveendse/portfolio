'use client';

import { useEffect, useRef } from 'react';

type VantaEffect = { destroy: () => void };

export default function VantaBackground() {
  const vantaRef = useRef<HTMLDivElement>(null);
  const effectRef = useRef<VantaEffect | null>(null);

  useEffect(() => {
    let cancelled = false;

    Promise.all([import('three'), import('vanta/dist/vanta.waves.min')])
      .then(([THREE, WAVES]) => {
        if (cancelled || !vantaRef.current) return;
        (window as unknown as { THREE: typeof THREE }).THREE = THREE;
        effectRef.current = WAVES.default({
          el: vantaRef.current,
          THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          color: 0x212529,
          // backgroundColor: 0x03045e,
          shininess: 35.0,
          waveHeight: 18.0,
          waveSpeed: 0.75,
          zoom: 0.85,
        });
      })
      .catch((err) => console.error('Vanta init failed', err));

    return () => {
      cancelled = true;
      effectRef.current?.destroy();
      effectRef.current = null;
    };
  }, []);

  return (
    <>
      <div
        ref={vantaRef}
        className="fixed inset-0 -z-10"
        aria-hidden="true"
      />
      <div
        className="fixed inset-0 -z-10 pointer-events-none mix-blend-overlay"
        style={{ background: 'linear-gradient(160deg, #415a77 0%, #000000 100%)' }}
        aria-hidden="true"
      />
    </>
  );
}
