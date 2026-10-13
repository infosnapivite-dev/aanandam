import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import OptimizedImage from '../common/OptimizedImage';

export default function ProductCategoryCard({ category, index = 0 }) {
  return (
    <div className="group flex flex-col h-full bg-[#F6EDE3] border border-[#E9E2D6] rounded-[10px] sm:rounded-[12px] p-2.5 sm:p-3.5 transition-all duration-300 ease-out hover:-translate-y-[5px] hover:shadow-[0_12px_30px_-8px_rgba(23,61,44,0.08)] hover:border-[#DED6C8]">
      {/* Product Image Area */}
      <div className="overflow-hidden rounded-[6px] sm:rounded-[8px] bg-[#EEE8DD] aspect-square sm:aspect-[4/4.5] relative">
        <OptimizedImage
          src={category.image}
          alt={category.name}
          className="w-full h-full transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
      </div>

      {/* Card Content Area */}
      <div className="flex flex-col flex-grow p-2.5 sm:p-5 pt-3 sm:pt-5 text-left">
        <h3 className="font-serif text-base sm:text-2xl sm:text-[26px] text-[#24221E] font-medium leading-tight mb-1 sm:mb-2 group-hover:text-[#173D2C] transition-colors">
          {category.name}
        </h3>

        <p className="text-xs sm:text-sm text-[#777268] leading-normal sm:leading-relaxed mb-3 sm:mb-6 font-light flex-grow line-clamp-2 sm:line-clamp-none">
          {category.description}
        </p>

        {/* CTA Link */}
        <div className="pt-2 border-t border-[#E9E2D6]/70">
          <Link
            to={category.href}
            className="inline-flex items-center text-xs sm:text-sm font-medium tracking-wide text-[#173D2C] group/btn transition-colors hover:text-[#B48A4A]"
          >
            <span>{category.cta || `Explore ${category.name}`}</span>
            <ArrowRight className="ml-1 sm:ml-2 w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
