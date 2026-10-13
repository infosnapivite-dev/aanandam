import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ImageLightboxModal({ item, onClose }) {
  if (!item) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-[#173D2C]/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.3 }}
          className="relative bg-[#F6EDE3] border border-[#DED6C8] rounded-xl overflow-hidden shadow-2xl max-w-4xl w-full z-10 flex flex-col md:flex-row max-h-[90vh]"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-[#F6EDE3]/80 backdrop-blur-sm text-[#173D2C] hover:bg-[#173D2C] hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Image Side */}
          <div className="w-full md:w-3/5 bg-[#EEE8DD] flex items-center justify-center overflow-hidden">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover max-h-[60vh] md:max-h-[80vh]"
            />
          </div>

          {/* Details Side */}
          <div className="w-full md:w-2/5 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
            <div>
              <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-[#B48A4A] block mb-2">
                {item.category}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#24221E] font-medium leading-tight mb-4">
                {item.title}
              </h3>
              <p className="text-sm text-[#777268] leading-relaxed mb-6 font-light">
                {item.description}
              </p>

              {item.tags && item.tags.length > 0 && (
                <div className="mb-8">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#24221E] mb-2.5">
                    Crafting Specifications
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-[#EFE4DA] text-[#173D2C] px-3 py-1 rounded-sm border border-[#DED6C8]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="pt-6 border-t border-[#DED6C8]">
              <Link
                to={`/get-quote?preset=${encodeURIComponent(item.title)}`}
                onClick={onClose}
                className="w-full inline-flex items-center justify-center bg-[#173D2C] text-white py-3.5 px-6 rounded-[6px] text-sm font-medium hover:bg-[#112F22] transition-colors group"
              >
                <span>Request Sample or Quote</span>
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
