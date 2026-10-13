import React from 'react';
import { Link } from 'react-router-dom';

export default function Logo({ className = '', variant = 'dark' }) {
  const isLight = variant === 'light';

  return (
    <Link
      to="/"
      aria-label="Aanandam Pack Studio Home"
      className={`group inline-flex items-center gap-3 py-1 select-none ${className}`}
    >
      {/* Serif Monogram Icon (APS) - shifts left on hover */}
      <div
        className={`flex flex-col items-center justify-center font-serif text-2xl font-bold tracking-tight transition-transform duration-300 ease-out group-hover:-translate-x-1.5 ${
          isLight ? 'text-white' : 'text-[#173D2C]'
        }`}
      >
        <span className="leading-none tracking-tighter">APS</span>
      </div>

      {/* Elegant Vertical Divider */}
      <div
        className={`h-7 w-[1px] transition-all duration-300 ease-out ${
          isLight
            ? 'bg-white/40 group-hover:bg-white/80 group-hover:scale-y-110'
            : 'bg-[#DED6C8] group-hover:bg-[#B48A4A] group-hover:scale-y-110'
        }`}
      />

      {/* Brand Name Text Block - shifts right on hover */}
      <div className="flex flex-col text-left justify-center transition-transform duration-300 ease-out group-hover:translate-x-1.5">
        <span
          className={`text-[12px] sm:text-[13px] font-semibold tracking-[0.14em] uppercase transition-colors duration-300 ${
            isLight ? 'text-white' : 'text-[#173D2C]'
          }`}
        >
          Aanandam
        </span>
        <span
          className={`text-[9px] sm:text-[9.5px] font-medium tracking-[0.22em] uppercase transition-colors duration-300 ${
            isLight ? 'text-white/75' : 'text-[#777268]'
          }`}
        >
          Pack Studio
        </span>
      </div>
    </Link>
  );
}
