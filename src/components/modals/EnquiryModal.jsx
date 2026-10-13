import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, Send, Sparkles } from 'lucide-react';
import { submitLead } from '../../services/api';
import PrimaryButton from '../buttons/PrimaryButton';

export default function EnquiryModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    category: 'rigid-box',
    quantity: '500',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await submitLead({
        ...formData,
        source: 'navbar_enquiry_modal',
      });
      setIsSuccess(true);
    } catch (err) {
      console.error('Failed to submit enquiry lead:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="enquiry-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={handleClose}
            className="fixed inset-0 bg-[#173D2C]/70 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            data-lenis-prevent
            className="relative bg-[#F6EDE3] border border-[#DED6C8] rounded-2xl shadow-2xl max-w-lg w-full z-10 p-6 sm:p-8 overflow-y-auto max-h-[90vh] my-auto"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={handleClose}
              aria-label="Close enquiry modal"
              className="absolute top-4 right-4 p-2 text-[#777268] hover:text-[#173D2C] transition-colors rounded-full hover:bg-[#EEE8DD]"
            >
              <X className="w-5 h-5" />
            </button>

            {isSuccess ? (
              <div className="text-center py-6 sm:py-8">
                <div className="w-16 h-16 rounded-full bg-[#EAF1EC] text-[#173D2C] flex items-center justify-center mx-auto mb-4 ring-8 ring-[#EAF1EC]/50">
                  <CheckCircle className="w-8 h-8 text-[#173D2C]" />
                </div>
                <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-[#B48A4A] mb-1">
                  Enquiry Received
                </p>
                <h3 className="font-serif text-3xl text-[#24221E] mb-3 font-normal">
                  Thank You, {formData.name || 'there'}!
                </h3>
                <p className="text-sm text-[#777268] mb-6 max-w-sm mx-auto font-light leading-relaxed">
                  Our bespoke packaging specialist has received your requirements and will reach out via WhatsApp / Email within 24 business hours.
                </p>
                <PrimaryButton onClick={handleClose} className="mx-auto" size="md">
                  Back to Site
                </PrimaryButton>
              </div>
            ) : (
              <div>
                {/* Header */}
                <div className="mb-6">
                  <div className="flex items-center space-x-1.5 text-[#B48A4A] mb-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span className="text-[11px] font-medium tracking-[0.2em] uppercase">
                      Direct Studio Enquiry
                    </span>
                  </div>
                  <h3
                    id="enquiry-modal-title"
                    className="font-serif text-2xl sm:text-3xl text-[#24221E] font-normal leading-tight"
                  >
                    Start Your Custom Order
                  </h3>
                  <p className="text-xs sm:text-sm text-[#777268] font-light mt-1">
                    Share your requirements with our design atelier. We’ll get back to you with guidance and quotations.
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4 text-left">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-medium text-[#24221E] uppercase tracking-wider mb-1.5">
                      Your Name <span className="text-[#B48A4A]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Priyanshu Sharma"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#DED6C8] bg-white text-sm text-[#24221E] placeholder:text-[#A49E92] focus:outline-none focus:border-[#173D2C] focus:ring-1 focus:ring-[#173D2C] transition-all"
                    />
                  </div>

                  {/* Email & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="block text-xs font-medium text-[#24221E] uppercase tracking-wider mb-1.5">
                        Email Address <span className="text-[#B48A4A]">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="you@company.com"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-[#DED6C8] bg-white text-sm text-[#24221E] placeholder:text-[#A49E92] focus:outline-none focus:border-[#173D2C] focus:ring-1 focus:ring-[#173D2C] transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#24221E] uppercase tracking-wider mb-1.5">
                        WhatsApp / Phone <span className="text-[#B48A4A]">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-[#DED6C8] bg-white text-sm text-[#24221E] placeholder:text-[#A49E92] focus:outline-none focus:border-[#173D2C] focus:ring-1 focus:ring-[#173D2C] transition-all"
                      />
                    </div>
                  </div>

                  {/* Packaging Type & Quantity */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="block text-xs font-medium text-[#24221E] uppercase tracking-wider mb-1.5">
                        Packaging Type
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-[#DED6C8] bg-white text-sm text-[#24221E] focus:outline-none focus:border-[#173D2C] focus:ring-1 focus:ring-[#173D2C] transition-all"
                      >
                        <option value="rigid-box">Rigid Boxes (Luxury)</option>
                        <option value="collapsible-box">Collapsible Boxes</option>
                        <option value="paper-bags">Custom Paper Bags</option>
                        <option value="gifting-hampers">Gifting & Hamper Sets</option>
                        <option value="other">Other Bespoke Needs</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#24221E] uppercase tracking-wider mb-1.5">
                        Approx. Quantity
                      </label>
                      <select
                        value={formData.quantity}
                        onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-[#DED6C8] bg-white text-sm text-[#24221E] focus:outline-none focus:border-[#173D2C] focus:ring-1 focus:ring-[#173D2C] transition-all"
                      >
                        <option value="250">250 units (Trial)</option>
                        <option value="500">500 units</option>
                        <option value="1000">1,000 units</option>
                        <option value="2500">2,500 units</option>
                        <option value="5000+">5,000+ units</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-medium text-[#24221E] uppercase tracking-wider mb-1.5">
                      Requirements & Details <span className="text-[#777268] font-normal lowercase">(optional)</span>
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Approximate dimensions (L × W × H), foil/finish preferences, or timeline..."
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#DED6C8] bg-white text-sm text-[#24221E] placeholder:text-[#A49E92] focus:outline-none focus:border-[#173D2C] focus:ring-1 focus:ring-[#173D2C] transition-all resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <PrimaryButton
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full justify-center"
                      size="md"
                    >
                      {isSubmitting ? (
                        'Sending Enquiry...'
                      ) : (
                        <span className="flex items-center justify-center">
                          Send Enquiry
                        </span>
                      )}
                    </PrimaryButton>
                  </div>

                  <p className="text-[11px] text-center text-[#777268] pt-1">
                    🔒 No obligation. Our team respects your confidentiality.
                  </p>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
