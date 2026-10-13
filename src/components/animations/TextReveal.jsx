import { motion } from 'framer-motion';

export default function TextReveal({
  text,
  className = '',
  delay = 0,
  tag = 'h2'
}) {
  const Tag = motion[tag] || motion.div;

  return (
    <Tag
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.22, 1, 0.36, 1]
      }}
      className={className}
    >
      {text}
    </Tag>
  );
}
