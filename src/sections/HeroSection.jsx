import React from 'react';
import { motion } from 'framer-motion';
import PrimaryButton from '../components/buttons/PrimaryButton';
import heroBgImage from '../assets/hero-bg.png';
import heroBgMobileImage from '../assets/hero-bg-mobile.png';

export default function HeroSection() {
  return (
    <section className="relative w-full bg-[#F6EDE3] min-h-[640px] sm:min-h-[740px] lg:min-h-[820px] xl:min-h-[880px] pt-24 sm:pt-36 md:pt-40 lg:pt-28 pb-12 sm:pb-20 lg:pb-24 flex items-start sm:items-center overflow-hidden">
      {/* Full Hero Section Background Image */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <picture className="w-full h-full block">
          {/* Mobile Screen (< 768px) */}
          <source
            media="(max-width: 767px)"
            srcSet={heroBgMobileImage}
          />
          {/* Desktop & Tablet Fallback */}
          <img
            src={heroBgImage}
            onError={(e) => {
              if (e.currentTarget.src !== '/images/hero-bg.png') {
                e.currentTarget.src = '/images/hero-bg.png';
              }
            }}
            alt="Aanandam Pack Studio luxury custom packaging still life"
            className="w-full h-full object-cover object-center sm:object-[75%_center] lg:object-center select-none"
            loading="eager"
            decoding="sync"
          />
        </picture>

        {/* Soft editorial gradient overlay: subtle top-down wash on mobile, left-to-right on desktop */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#F6EDE3]/70 via-[#F6EDE3]/30 to-transparent sm:bg-gradient-to-r sm:from-[#F6EDE3]/80 sm:via-[#F6EDE3]/40 lg:from-[#F6EDE3]/70 lg:via-[#F6EDE3]/20 lg:to-transparent pointer-events-none" />

        {/* Subtle, clean bottom fade right at the edge into #F6EDE3 */}
        <div
          className="absolute bottom-0 left-0 right-0 h-16 sm:h-20 md:h-24 pointer-events-none"
          style={{
            background:
              'linear-gradient(to top, #F6EDE3 0%, rgba(246, 237, 227, 0.85) 30%, rgba(246, 237, 227, 0.35) 65%, transparent 100%)',
          }}
        />
      </div>

      {/* Hero Content Container - Positioned to the top on mobile, centered on desktop */}
      <div className="w-full px-5 sm:px-8 md:px-12 lg:pl-12 lg:pr-8 xl:pl-16 2xl:pl-20 relative z-10">
        <div className="max-w-md sm:max-w-lg lg:max-w-[450px] xl:max-w-[480px] flex flex-col justify-start sm:justify-center text-left py-2 sm:py-8 lg:py-16">
          
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-[10px] sm:text-[12px] font-semibold sm:font-medium tracking-[0.2em] sm:tracking-[0.22em] uppercase text-[#777268] mb-2 sm:mb-6"
          >
            PREMIUM PACKAGING FOR MEANINGFUL BRANDS
          </motion.p>

          {/* Main Headline H1 */}
          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-[32px] xs:text-[36px] sm:text-[48px] md:text-[66px] lg:text-[74px] xl:text-[80px] leading-[1.08] sm:leading-[1.03] text-[#24221E] font-normal tracking-[-0.02em] mb-2.5 sm:mb-8"
          >
            Packaging<br />
            that elevates<br />
            <span className="italic font-normal">your story</span>
          </motion.h1>

          {/* Description Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-[13px] sm:text-base lg:text-lg text-[#524D43] font-light leading-snug sm:leading-relaxed max-w-[280px] xs:max-w-[320px] sm:max-w-[420px] mb-0 sm:mb-10 drop-shadow-[0_1px_1px_rgba(255,255,255,0.7)]"
          >
            Custom, thoughtfully crafted packaging designed for brands that value detail, quality and presentation.
          </motion.p>

          {/* Desktop / Tablet CTA */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="hidden sm:flex items-center gap-4"
          >
            <PrimaryButton to="/gallery" size="md">
              Explore Packaging
            </PrimaryButton>
          </motion.div>

        </div>
      </div>

      {/* Mobile Screen Bottom-Center CTA */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="sm:hidden absolute bottom-6 xs:bottom-8 left-0 right-0 z-20 flex justify-center px-5 pointer-events-auto"
      >
        <PrimaryButton
          to="/gallery"
          size="md"
          className="w-full max-w-[280px] justify-center shadow-lg active:scale-[0.98]"
        >
          Explore Packaging
        </PrimaryButton>
      </motion.div>
    </section>
  );
}
