import React from 'react';
import SectionHeading from '../components/common/SectionHeading';
import ProductCategoryCard from '../components/cards/ProductCategoryCard';
import { productCategories } from '../data/products';
import { StaggerContainer, StaggerItem } from '../components/animations/StaggerContainer';

export default function ChooseStyleSection() {
  return (
    <section id="choose-style" className="w-full bg-[#F6EDE3] py-14 sm:py-20 md:py-28 lg:py-32 border-b border-[#DED6C8]/60">
      <div className="max-w-[1440px] mx-auto px-3.5 sm:px-8 md:px-12 lg:px-16">
        
        {/* Section Heading */}
        <SectionHeading
          eyebrow="TAILORED FOR EVERY OCCASION"
          title="Choose your style"
          align="center"
          showAccent={true}
        />

        {/* 4 Category Cards Grid (2-column on mobile, 4-column on desktop) */}
        <StaggerContainer
          staggerChildren={0.08}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 xl:gap-8"
        >
          {productCategories.map((category, index) => (
            <StaggerItem key={category.id} y={24} className="h-full">
              <ProductCategoryCard category={category} index={index} />
            </StaggerItem>
          ))}
        </StaggerContainer>

      </div>
    </section>
  );
}
