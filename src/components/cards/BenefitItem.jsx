import React from 'react';
import { Package, FileText, Truck } from 'lucide-react';

export default function BenefitItem({ benefit, isLast = false }) {
  const getIcon = (iconName) => {
    const props = { className: 'w-6 h-6 text-[#B48A4A] stroke-[1.5]' };
    switch (iconName) {
      case 'Package': return <Package {...props} />;
      case 'FileText': return <FileText {...props} />;
      case 'Truck': return <Truck {...props} />;
      default: return <Package {...props} />;
    }
  };

  return (
    <div className="flex flex-col items-center text-center px-4 sm:px-8 py-6 relative group">
      {/* Icon */}
      <div className="w-12 h-12 rounded-full bg-[#EFE4DA] flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110">
        {getIcon(benefit.icon)}
      </div>

      {/* Title */}
      <h3 className="font-serif text-2xl text-[#24221E] font-medium mb-2">
        {benefit.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-[#777268] font-light leading-relaxed max-w-xs">
        {benefit.description}
      </p>

      {/* Desktop Vertical Separator */}
      {!isLast && (
        <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-20 bg-[#DED6C8]" />
      )}
    </div>
  );
}
