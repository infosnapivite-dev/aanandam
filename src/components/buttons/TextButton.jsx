import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function TextButton({
  children,
  to,
  href,
  onClick,
  className = '',
  icon = true
}) {
  const baseClasses = `group inline-flex items-center text-sm font-medium tracking-wide text-[#173D2C] hover:text-[#B48A4A] transition-colors duration-200 cursor-pointer ${className}`;

  const content = (
    <>
      <span className="relative pb-0.5 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#B48A4A] after:transition-all after:duration-200 group-hover:after:w-full">
        {children}
      </span>
      {icon && (
        <ArrowRight className="ml-1.5 w-3.5 h-3.5 transition-transform duration-200 ease-out group-hover:translate-x-1" />
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
    <button type="button" onClick={onClick} className={baseClasses}>
      {content}
    </button>
  );
}
