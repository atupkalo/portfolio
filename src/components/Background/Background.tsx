"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import "./Background.css";

type VantaEffect = { destroy: () => void };
type VantaWindow = Window & {
  THREE?: unknown;
  VANTA?: { NET: (options: Record<string, unknown>) => VantaEffect };
};

export default function Background() {
  const container = useRef<HTMLDivElement>(null);
  const [threeReady, setThreeReady] = useState(false);
  const [vantaReady, setVantaReady] = useState(false);

  useEffect(() => {
    if (!vantaReady || !container.current) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const libraries = window as VantaWindow;
    let effect: VantaEffect | undefined;

    function updateMotion() {
      effect?.destroy();
      effect = undefined;
      if (motion.matches || !container.current || !libraries.THREE || !libraries.VANTA) return;

      try {
        effect = libraries.VANTA.NET({
          el: container.current,
          THREE: libraries.THREE,
          mouseControls: false,
          touchControls: false,
          gyroControls: false,
          color: 0x2A666F,
          backgroundColor: 0x292A30,
          backgroundAlpha: 0,
          points: 10,
          maxDistance: 22,
          spacing: 18,
          showDots: true,
        });
      } catch (error) {
        console.error("Unable to initialize Vanta.NET background.", error);
      }
    }

    updateMotion();
    motion.addEventListener("change", updateMotion);
    return () => {
      motion.removeEventListener("change", updateMotion);
      effect?.destroy();
    };
  }, [vantaReady]);

  return (
    <>
      <div id="ambient-background" aria-hidden="true">
        {[1, 2, 3, 4].map(number => <div key={number} className={`ambient-light light-${number}`} />)}
      </div>
      <div id="vanta-background" ref={container} aria-hidden="true" />
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js"
        strategy="afterInteractive"
        onReady={() => setThreeReady(true)}
        onError={() => console.error("Three.js failed to load.")}
      />
      {threeReady && (
        <Script
          src="https://cdn.jsdelivr.net/npm/vanta@0.5.24/dist/vanta.net.min.js"
          strategy="afterInteractive"
          onReady={() => setVantaReady(true)}
          onError={() => console.error("Vanta.NET failed to load.")}
        />
      )}
    </>
  );
}
