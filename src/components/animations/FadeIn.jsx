import { motion } from 'framer-motion';

export default function FadeIn({
  children,
  delay = 0,
  duration = 0.6,
  className = '',
  viewportOnce = true
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: viewportOnce, amount: 0.2 }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1]
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
