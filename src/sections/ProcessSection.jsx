import React from 'react';
import { motion } from 'framer-motion';
import { Package, Layers, Pencil, FileText } from 'lucide-react';
import SectionHeading from '../components/common/SectionHeading';
import { processSteps } from '../data/process';

export default function ProcessSection() {
  const getIcon = (iconName) => {
    const props = { className: 'w-7 h-7 sm:w-8 sm:h-8 text-[#B48A4A] stroke-[1.4]' };
    switch (iconName) {
      case 'Package': return <Package {...props} />;
      case 'Layers': return <Layers {...props} />;
      case 'Pencil': return <Pencil {...props} />;
      case 'FileText': return <FileText {...props} />;
      default: return <Package {...props} />;
    }
  };

  return (
    <section className="w-full bg-[#F6EDE3] py-20 sm:py-24 md:py-28 lg:py-32 border-b border-[#DED6C8]/60">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
        
        {/* Section Heading */}
        <SectionHeading
          eyebrow="FROM CONCEPT TO CREATION"
          title="How it works"
          align="center"
          showAccent={true}
        />

        {/* Desktop Horizontal Process Layout (>= 1024px) */}
        <div className="hidden lg:block relative mt-8">
          {/* Connector Line behind icons */}
          <div className="absolute top-[48px] left-[12%] right-[12%] h-[1.5px] border-t-2 border-dashed border-[#DFD3C1] -z-0" />

          <div className="grid grid-cols-4 gap-6 relative z-10">
            {processSteps.map((step, idx) => (
              <motion.div
                key={step.stepNumber}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: idx * 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center text-center group"
              >
                {/* Circular Icon Container */}
                <div className="w-24 h-24 rounded-full bg-[#F6EDE3] border border-[#DFD3C1] flex items-center justify-center shadow-sm mb-6 transition-all duration-300 group-hover:border-[#B48A4A] group-hover:scale-105 group-hover:shadow-[0_8px_20px_-4px_rgba(180,138,74,0.18)]">
                  {getIcon(step.icon)}
                </div>

                {/* Step Title */}
                <h3 className="font-serif text-2xl text-[#24221E] font-medium mb-3">
                  {step.title}
                </h3>

                {/* Step Description */}
                <p className="text-sm text-[#777268] font-light leading-relaxed max-w-[220px]">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile / Tablet Vertical Timeline (< 1024px) */}
        <div className="lg:hidden relative mt-4 max-w-lg mx-auto">
          <div className="space-y-6 sm:space-y-8">
            {processSteps.map((step, idx) => (
              <motion.div
                key={step.stepNumber}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="flex items-start space-x-5 sm:space-x-6 group"
              >
                {/* Icon Column with Connecting Line */}
                <div className="flex flex-col items-center shrink-0 self-stretch">
                  {/* Circular Icon Container */}
                  <div className="w-[72px] h-[72px] shrink-0 rounded-full bg-[#F6EDE3] border border-[#DFD3C1] flex items-center justify-center shadow-sm">
                    {getIcon(step.icon)}
                  </div>
                  {/* Dashed connector line ONLY between steps (never below the last step) */}
                  {idx < processSteps.length - 1 && (
                    <div className="w-[1.5px] flex-grow min-h-[28px] my-1 border-l-2 border-dashed border-[#DFD3C1]" />
                  )}
                </div>

                {/* Content */}
                <div className="pt-2 text-left pb-2">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-[10px] font-medium tracking-wider text-[#B48A4A] uppercase">
                      Step {step.stepNumber}
                    </span>
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl text-[#24221E] font-medium mb-1.5">
                    {step.title}
                  </h3>
                  <p className="text-sm text-[#777268] font-light leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
