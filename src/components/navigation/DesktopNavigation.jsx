import React from 'react';
import { NavLink } from 'react-router-dom';
import { navItems } from '../../data/navigation';

export default function DesktopNavigation({ className = '' }) {
  return (
    <nav className={`hidden lg:flex items-center space-x-7 xl:space-x-9 ${className}`}>
      {navItems.map((item) => (
        <NavLink
          key={item.href}
          to={item.href}
          className={({ isActive }) =>
            `relative text-sm tracking-normal transition-colors duration-200 py-1 font-normal ${
              isActive
                ? 'text-[#173D2C] font-medium'
                : 'text-[#24221E] hover:text-[#173D2C]'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <span>{item.label}</span>
              {isActive && (
                <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#173D2C] rounded-full" />
              )}
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
}
