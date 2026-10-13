import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import PageTransition from '../components/animations/PageTransition';
import SectionHeading from '../components/common/SectionHeading';
import OptimizedImage from '../components/common/OptimizedImage';
import ImageLightboxModal from '../components/modals/ImageLightboxModal';
import { galleryItems } from '../data/gallery';

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedItem, setSelectedItem] = useState(null);

  const categories = ['All', 'Jewellery', 'Sweets & Mithai', 'Retail & Fashion', 'Corporate Gifting', 'Wedding Gifting'];

  const filteredItems = activeCategory === 'All'
    ? galleryItems
    : galleryItems.filter((item) =>
        item.category.toLowerCase().includes(activeCategory.toLowerCase()) ||
        item.tags.some(t => t.toLowerCase().includes(activeCategory.toLowerCase()))
      );

  return (
    <PageTransition>
      <div className="w-full bg-[#F6EDE3] pt-32 pb-24 border-b border-[#DED6C8]">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
          
          {/* Header */}
          <SectionHeading
            eyebrow="INSPIRATION & ARCHIVE"
            title="Curated Packaging Gallery"
            description="A showcase of structural prototypes, bespoke hot-foil editions, and artisan presentation suites created for our brand partners."
            align="center"
          />

          {/* Filter Bar */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12 sm:mb-16">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium tracking-wide transition-all ${
                  activeCategory === cat
                    ? 'bg-[#173D2C] text-[#F6EDE3] shadow-sm'
                    : 'bg-[#EFE4DA] text-[#777268] hover:text-[#173D2C] border border-[#DED6C8]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                onClick={() => setSelectedItem(item)}
                className="group relative cursor-pointer overflow-hidden rounded-lg bg-[#EEE8DD] border border-[#DED6C8] shadow-sm flex flex-col"
              >
                <div className="aspect-[4/3.2] overflow-hidden relative">
                  <OptimizedImage
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full"
                    imgClassName="transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[#173D2C]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="bg-[#F6EDE3] text-[#173D2C] text-xs font-medium px-4 py-2 rounded-full inline-flex items-center shadow-md">
                      Inspect Details <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
                    </span>
                  </div>
                </div>

                <div className="p-4 sm:p-5 bg-[#F6EDE3] flex-grow text-left">
                  <span className="text-[10px] font-semibold tracking-widest uppercase text-[#B48A4A]">
                    {item.category}
                  </span>
                  <h3 className="font-serif text-xl text-[#24221E] font-medium mt-1 mb-1.5 group-hover:text-[#173D2C] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#777268] font-light line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>

      {/* Lightbox Modal */}
      <ImageLightboxModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
      />
    </PageTransition>
  );
}
