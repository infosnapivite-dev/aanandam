import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function PrimaryButton({
  children,
  to,
  href,
  onClick,
  type = 'button',
  icon = true,
  className = '',
  disabled = false,
  size = 'md'
}) {
  const sizeClasses = {
    sm: 'h-10 px-5 text-xs',
    md: 'h-12 sm:h-[50px] md:h-[52px] px-6 sm:px-7 text-sm',
    lg: 'h-14 px-8 text-base'
  }[size];

  const baseClasses = `group inline-flex items-center justify-center font-medium tracking-wide bg-[#173D2C] text-white rounded-[6px] transition-all duration-200 ease-out hover:bg-[#112F22] hover:-translate-y-[2px] active:scale-[0.98] shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#B48A4A] focus:ring-offset-2 ${sizeClasses} ${className} ${disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}`;

  const content = (
    <>
      <span>{children}</span>
      {icon && (
        <ArrowRight className="ml-2.5 w-4 h-4 transition-transform duration-200 ease-out group-hover:translate-x-1" />
      )}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={baseClasses}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={baseClasses}>
        {content}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={baseClasses}>
      {content}
    </button>
  );
}
