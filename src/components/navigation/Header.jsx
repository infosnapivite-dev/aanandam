import React, { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import Logo from './Logo';
import DesktopNavigation from './DesktopNavigation';
import MobileNavigation from './MobileNavigation';
import PrimaryButton from '../buttons/PrimaryButton';
import EnquiryModal from '../modals/EnquiryModal';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-out ${
          isScrolled
            ? 'bg-[#F6EDE3]/95 backdrop-blur-md shadow-sm border-b border-[#DED6C8] py-3.5 sm:py-4'
            : 'bg-transparent py-5 sm:py-6 md:py-7'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16 flex items-center justify-between">
          {/* Brand Logo */}
          <Logo />

          {/* Center Navigation */}
          <DesktopNavigation />

          {/* Right CTA & Mobile Toggle */}
          <div className="flex items-center space-x-4">
            <PrimaryButton
              onClick={() => setIsEnquiryModalOpen(true)}
              size="sm"
              className="hidden sm:inline-flex"
            >
              Enquiry
            </PrimaryButton>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              className="lg:hidden p-2 rounded-md text-[#173D2C] hover:bg-[#EEE8DD] transition-colors focus:outline-none focus:ring-2 focus:ring-[#173D2C]"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <MobileNavigation
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onOpenEnquiry={() => setIsEnquiryModalOpen(true)}
      />

      {/* Simple Enquiry Popup Form */}
      <EnquiryModal
        isOpen={isEnquiryModalOpen}
        onClose={() => setIsEnquiryModalOpen(false)}
      />
    </>
  );
}
