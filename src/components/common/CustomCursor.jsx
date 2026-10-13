import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on desktop without touch
    if (window.innerWidth < 1024 || 'ontouchstart' in window) {
      return;
    }

    const onMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target;
      const isClickable = target.closest('a, button, input, select, textarea, [role="button"], .clickable');
      setIsHovering(!!isClickable);
    };

    const onMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed pointer-events-none z-[9999] rounded-full mix-blend-difference bg-[#F6EDE3]"
      animate={{
        x: mousePosition.x - (isHovering ? 18 : 6),
        y: mousePosition.y - (isHovering ? 18 : 6),
        width: isHovering ? 36 : 12,
        height: isHovering ? 36 : 12,
        opacity: 0.85
      }}
      transition={{
        type: 'spring',
        damping: 30,
        stiffness: 350,
        mass: 0.2
      }}
    />
  );
}
