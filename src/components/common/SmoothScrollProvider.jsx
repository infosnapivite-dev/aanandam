import React, { useEffect, useRef } from 'react';
import { ReactLenis } from 'lenis/react';

export default function SmoothScrollProvider({ children }) {
  const lenisRef = useRef(null);

  useEffect(() => {
    // Expose lenis instance globally for external controls and smooth link jumps
    const instance = lenisRef.current?.lenis;
    if (instance) {
      window.lenis = instance;
    }
    return () => {
      window.lenis = null;
    };
  }, []);

  return (
    <ReactLenis
      ref={lenisRef}
      root
      options={{
        lerp: 0.08, // Golden ratio for buttery smooth inertia and fluid gliding
        duration: 1.2, // Deceleration curve length
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential decay curve
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1.0,
        touchMultiplier: 1.6,
        infinite: false,
        autoResize: true,
        autoRaf: true,
        anchors: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
