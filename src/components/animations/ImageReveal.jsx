import { motion } from 'framer-motion';

export default function ImageReveal({
  children,
  className = '',
  delay = 0.1,
  duration = 0.8
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.04 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1]
      }}
      className={`overflow-hidden ${className}`}
    >
      {children}
    </motion.div>
  );
}
