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

    // Timer for serene, minimal display before gentle dissolve
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 1800);

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
          key="opening-editorial-screen"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.015,
            transition: {
              duration: 0.75,
              ease: [0.22, 1, 0.36, 1], // Smooth luxury ease-out
            },
          }}
          onClick={() => setIsVisible(false)}
          className="fixed inset-0 z-[99999] bg-[#F6EDE3] flex flex-col items-center justify-center cursor-pointer select-none overflow-hidden"
          style={{ willChange: 'opacity, transform' }}
        >
          {/* Central Minimal Brand Lockup */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.9,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="relative flex flex-col items-center text-center px-6"
          >
            {/* Serif Monogram "APS" with subtle blur reveal */}
            <motion.h1
              initial={{ opacity: 0, y: 8, filter: 'blur(3px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{
                duration: 0.85,
                delay: 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="font-serif text-5xl sm:text-6xl md:text-7xl text-[#173D2C] font-normal tracking-tight mb-2.5"
            >
              APS
            </motion.h1>

            {/* Fine Hairline Metallic Gold Divider - draws outward */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 0.85 }}
              transition={{
                duration: 0.7,
                delay: 0.3,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="w-10 sm:w-14 h-[1px] bg-[#B48A4A] my-2.5 origin-center"
            />

            {/* Brand Title with Refined Tracking Expansion */}
            <motion.p
              initial={{ opacity: 0, letterSpacing: '0.2em' }}
              animate={{ opacity: 1, letterSpacing: '0.32em' }}
              transition={{
                duration: 0.8,
                delay: 0.45,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="text-[11px] sm:text-[12px] font-medium uppercase text-[#173D2C] mt-1 pl-[0.32em]"
            >
              Aanandam
            </motion.p>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 3 }}
              animate={{ opacity: 0.7, y: 0 }}
              transition={{
                duration: 0.75,
                delay: 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="text-[8.5px] sm:text-[9.5px] font-normal tracking-[0.38em] uppercase text-[#777268] mt-1.5 pl-[0.38em]"
            >
              Pack Studio
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
