import React from 'react';
import { motion } from 'framer-motion';
import BenefitItem from '../components/cards/BenefitItem';
import { benefits } from '../data/benefits';

export default function BenefitsSection() {
  return (
    <section className="w-full bg-[#F6EDE3] py-14 sm:py-16 md:py-20 border-b border-[#DED6C8]/60">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#DED6C8]/80">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              <BenefitItem
                benefit={benefit}
                isLast={index === benefits.length - 1}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
