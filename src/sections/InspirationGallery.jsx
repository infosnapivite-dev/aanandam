import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import SectionHeading from '../components/common/SectionHeading';
import OptimizedImage from '../components/common/OptimizedImage';
import ImageLightboxModal from '../components/modals/ImageLightboxModal';
import PrimaryButton from '../components/buttons/PrimaryButton';
import { galleryItems } from '../data/gallery';

export default function InspirationGallery() {
  const [activeItem, setActiveItem] = useState(null);

  // Duplicate items to ensure a seamless, gap-free infinite horizontal loop
  const carouselItems = [...galleryItems, ...galleryItems];

  return (
    <section className="w-full bg-[#F6EDE3] py-16 sm:py-20 md:py-28 lg:py-32 border-b border-[#DED6C8]/60 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 mb-8 sm:mb-12">
        {/* Section Heading */}
        <SectionHeading
          eyebrow="REAL IDEAS. BEAUTIFUL POSSIBILITIES."
          title="Get inspired"
          align="center"
          showAccent={true}
        />
      </div>

      {/* Horizontal Carousel with Left & Right Gradient Blends */}
      <div className="relative w-full overflow-hidden select-none">
        {/* Left Blend Overlay */}
        <div
          aria-hidden="true"
          className="absolute top-0 bottom-0 left-0 w-16 sm:w-28 md:w-44 lg:w-60 z-20 pointer-events-none"
          style={{
            background:
              'linear-gradient(to right, #F6EDE3 0%, rgba(246, 237, 227, 0.95) 30%, rgba(246, 237, 227, 0.4) 70%, transparent 100%)',
          }}
        />

        {/* Right Blend Overlay */}
        <div
          aria-hidden="true"
          className="absolute top-0 bottom-0 right-0 w-16 sm:w-28 md:w-44 lg:w-60 z-20 pointer-events-none"
          style={{
            background:
              'linear-gradient(to left, #F6EDE3 0%, rgba(246, 237, 227, 0.95) 30%, rgba(246, 237, 227, 0.4) 70%, transparent 100%)',
          }}
        />

        {/* Animated Marquee Infinite Track */}
        <div
          className="animate-marquee-infinite flex gap-4 sm:gap-6 py-4 px-2"
          style={{
            maskImage:
              'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
            WebkitMaskImage:
              'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
          }}
        >
          {carouselItems.map((item, idx) => (
            <motion.div
              key={`${item.id}-${idx}`}
              onClick={() => setActiveItem(item)}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="group/card relative shrink-0 w-[260px] xs:w-[290px] sm:w-[340px] md:w-[380px] lg:w-[420px] aspect-[4/3] rounded-[10px] sm:rounded-[12px] overflow-hidden bg-[#EEE8DD] border border-[#DED6C8]/70 cursor-pointer shadow-sm hover:shadow-[0_16px_36px_-8px_rgba(23,61,44,0.18)]"
            >
              {/* Packaging Photography */}
              <OptimizedImage
                src={item.image}
                alt={item.title}
                className="w-full h-full"
                imgClassName="transition-transform duration-700 ease-out group-hover/card:scale-105"
              />

              {/* Dynamic Vignette Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent opacity-65 group-hover/card:opacity-85 transition-opacity duration-300" />

              {/* Card Bottom Meta Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6 text-white z-10 text-left">
                <span className="text-[10px] sm:text-[11px] font-medium tracking-[0.22em] uppercase text-[#B48A4A] mb-1 drop-shadow-sm">
                  {item.category}
                </span>

                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-serif text-lg sm:text-2xl font-medium text-white leading-tight drop-shadow-sm">
                    {item.title}
                  </h3>

                  <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center shrink-0 group-hover/card:bg-[#B48A4A] group-hover/card:scale-110 transition-all duration-200 shadow-md">
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer CTA & Interactive Hint */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 mt-10 sm:mt-14 flex flex-col items-center text-center">
        <p className="text-xs text-[#777268] tracking-wider uppercase mb-5 font-light">
          Hover to pause · Click any edition to inspect specifications
        </p>
        <PrimaryButton to="/gallery" size="md">
          <span>Explore Complete Archive</span>
        </PrimaryButton>
      </div>

      {/* Lightbox inspection modal */}
      <ImageLightboxModal
        item={activeItem}
        onClose={() => setActiveItem(null)}
      />
    </section>
  );
}
