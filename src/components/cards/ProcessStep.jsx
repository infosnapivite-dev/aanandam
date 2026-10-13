import React from 'react';
import { Package, Layers, Pencil, FileText } from 'lucide-react';

export default function ProcessStep({ step, isLast = false }) {
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
    <div className="flex flex-col items-center text-center relative group w-full">
      {/* Circular Icon Container */}
      <div className="relative mb-6">
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#F6EDE3] border border-[#DFD3C1] flex items-center justify-center shadow-sm transition-all duration-300 group-hover:border-[#B48A4A] group-hover:scale-105 group-hover:shadow-[0_8px_20px_-4px_rgba(180,138,74,0.15)]">
          {getIcon(step.icon)}
        </div>

        {/* Subtle Step Number Pill */}
        <span className="absolute -bottom-2 bg-[#173D2C] text-[#F6EDE3] text-[10px] font-medium tracking-wider px-2 py-0.5 rounded-full border border-[#F6EDE3]">
          {step.stepNumber}
        </span>
      </div>

      {/* Step Title */}
      <h3 className="font-serif text-xl sm:text-2xl text-[#24221E] font-medium mb-2.5">
        {step.title}
      </h3>

      {/* Step Description */}
      <p className="text-sm text-[#777268] font-light leading-relaxed max-w-[240px]">
        {step.description}
      </p>
    </div>
  );
}
