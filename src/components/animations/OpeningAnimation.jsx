import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function OpeningAnimation({ onComplete }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Lock scroll during opening animation
    if (window.lenis) {
      window.lenis.stop();
    }
    document.body.style.overflow = 'hidden';

    // Timer to trigger exit animation
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 1300);

    return () => {
      clearTimeout(timer);
      if (window.lenis) {
        window.lenis.start();
      }
      document.body.style.overflow = '';
    };
  }, []);

  const handleExitComplete = () => {
    if (window.lenis) {
      window.lenis.start();
    }
    document.body.style.overflow = '';
    if (onComplete) {
      onComplete();
    }
  };

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {isVisible && (
        <motion.div
          key="opening-curtain"
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{
            duration: 0.85,
            ease: [0.77, 0, 0.175, 1], // Editorial luxury shutter lift curve
          }}
          onClick={() => setIsVisible(false)}
          className="fixed inset-0 z-[99999] bg-[#F6EDE3] flex flex-col items-center justify-center cursor-pointer select-none overflow-hidden"
          style={{ willChange: 'transform' }}
        >
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute inset-0 bg-radial-gradient from-[#FAF5EF]/80 via-transparent to-transparent pointer-events-none" />

          {/* Central Luxury Monogram & Brand Container */}
          <div className="relative flex flex-col items-center text-center px-6">
            
            {/* Serif Monogram "APS" */}
            <motion.div
              initial={{ opacity: 0, y: 18, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="font-serif text-5xl sm:text-6xl text-[#173D2C] font-normal tracking-tight mb-3"
            >
              APS
            </motion.div>

            {/* Fine Metallic Gold Divider */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="w-12 sm:w-16 h-[1.5px] bg-[#B48A4A] my-2 origin-center"
            />

            {/* Brand Title with Elegant Tracking Expansion */}
            <motion.p
              initial={{ opacity: 0, y: 8, letterSpacing: '0.15em' }}
              animate={{ opacity: 1, y: 0, letterSpacing: '0.28em' }}
              transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="text-[10px] sm:text-[11px] font-medium uppercase text-[#173D2C] mt-1 pl-[0.28em]"
            >
              Aanandam
            </motion.p>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.75 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-[8px] sm:text-[9px] font-normal tracking-[0.35em] uppercase text-[#777268] mt-1 pl-[0.35em]"
            >
              Pack Studio
            </motion.p>

            {/* Minimal Progress Indicator */}
            <div className="w-28 sm:w-36 h-[1px] bg-[#DED6C8]/60 mt-8 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1] }}
                className="h-full bg-[#173D2C]"
              />
            </div>
          </div>

          {/* Clean Bottom Edge Accent as curtain raises */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#B48A4A]/40 to-transparent" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
