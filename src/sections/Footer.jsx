import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../components/navigation/Logo';
import { footerNavItems, legalLinks, socialLinks } from '../data/navigation';
import { InstagramIcon, LinkedInIcon } from '../components/common/SocialIcons';

export default function Footer() {
  const getSocialIcon = (name) => {
    switch (name) {
      case 'Instagram': return <InstagramIcon className="w-4 h-4" />;
      case 'LinkedIn': return <LinkedInIcon className="w-4 h-4" />;
      default: return <InstagramIcon className="w-4 h-4" />;
    }
  };

  return (
    <footer className="w-full bg-[#F6EDE3] pt-16 md:pt-20 lg:pt-24 pb-12 md:pb-16 border-t border-[#DED6C8]">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
        
        {/* Top Footer Row */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 pb-12 sm:pb-14">
          {/* Left: Brand Logo */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <Logo />
            <p className="text-xs text-[#777268] mt-2 font-light max-w-xs">
              Thoughtfully crafted luxury packaging for brands that value detail and presentation.
            </p>
          </div>

          {/* Middle: Navigation Links */}
          <nav className="flex flex-wrap items-center justify-center gap-x-6 sm:gap-x-8 gap-y-3">
            {footerNavItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="text-sm text-[#24221E] hover:text-[#173D2C] transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right: Social Icons */}
          <div className="flex items-center space-x-3 text-[#173D2C]">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="w-9 h-9 rounded-full bg-[#EFE4DA] border border-[#DED6C8] flex items-center justify-center text-[#173D2C] hover:bg-[#173D2C] hover:text-[#F6EDE3] transition-all duration-200"
              >
                {getSocialIcon(social.name)}
              </a>
            ))}
          </div>
        </div>

        {/* Thin Divider */}
        <div className="w-full h-[1px] bg-[#DED6C8]" />

        {/* Bottom Footer Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#777268] gap-4">
          <p className="text-center sm:text-left">
            © 2026 Aanandam Pack Studio. All rights reserved.
          </p>

          <div className="flex items-center space-x-6">
            {legalLinks.map((legal) => (
              <Link
                key={legal.href}
                to={legal.href}
                className="hover:text-[#173D2C] transition-colors"
              >
                {legal.label}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
