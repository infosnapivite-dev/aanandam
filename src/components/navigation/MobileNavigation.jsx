import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import Logo from './Logo';
import { navItems, socialLinks } from '../../data/navigation';
import PrimaryButton from '../buttons/PrimaryButton';
import { InstagramIcon, LinkedInIcon } from '../common/SocialIcons';

export default function MobileNavigation({ isOpen, onClose, onOpenEnquiry }) {
  const getSocialIcon = (name) => {
    switch (name) {
      case 'Instagram': return <InstagramIcon className="w-5 h-5" />;
      case 'LinkedIn': return <LinkedInIcon className="w-5 h-5" />;
      default: return <InstagramIcon className="w-5 h-5" />;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 bg-[#F6EDE3] flex flex-col justify-between p-6 sm:p-10 lg:hidden overflow-y-auto"
        >
          {/* Top Row: Logo & Close */}
          <div className="flex items-center justify-between pb-6 border-b border-[#DED6C8]">
            <Logo />
            <button
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="p-2.5 rounded-full text-[#173D2C] hover:bg-[#EEE8DD] transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Nav Links */}
          <div className="py-10 flex flex-col items-center space-y-6">
            {navItems.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * index, duration: 0.4 }}
              >
                <NavLink
                  to={item.href}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `font-serif text-2xl sm:text-3xl tracking-wide transition-colors ${
                      isActive ? 'text-[#173D2C] font-semibold italic' : 'text-[#24221E] hover:text-[#173D2C]'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="pt-4 w-full max-w-xs"
            >
              <PrimaryButton
                onClick={() => {
                  onClose();
                  onOpenEnquiry?.();
                }}
                className="w-full justify-center text-center"
              >
                Enquiry
              </PrimaryButton>
            </motion.div>
          </div>

          {/* Bottom Row: Socials */}
          <div className="pt-6 border-t border-[#DED6C8] flex flex-col items-center">
            <p className="text-xs uppercase tracking-widest text-[#777268] mb-4">Connect with APS</p>
            <div className="flex items-center space-x-6 text-[#173D2C]">
              {socialLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.name}
                  className="p-2 hover:text-[#B48A4A] transition-colors"
                >
                  {getSocialIcon(item.name)}
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
