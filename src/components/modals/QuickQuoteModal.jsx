import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, ArrowRight } from 'lucide-react';
import { submitLead } from '../../services/api';
import PrimaryButton from '../buttons/PrimaryButton';

export default function QuickQuoteModal({ isOpen, onClose, initialCategory = 'rigid-box' }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    category: initialCategory,
    quantity: '500',
    notes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await submitLead(formData);
      setIsSuccess(true);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-[#173D2C]/80 backdrop-blur-sm"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative bg-[#F6EDE3] border border-[#DED6C8] rounded-xl shadow-2xl max-w-lg w-full z-10 p-6 sm:p-8 overflow-y-auto max-h-[92vh]"
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-[#777268] hover:text-[#173D2C] transition-colors rounded-full hover:bg-[#EEE8DD]"
          >
            <X className="w-5 h-5" />
          </button>

          {isSuccess ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-[#EAF1EC] text-[#173D2C] flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-[#173D2C]" />
              </div>
              <h3 className="font-serif text-3xl text-[#24221E] mb-2">Request Received</h3>
              <p className="text-sm text-[#777268] mb-6 max-w-sm mx-auto font-light leading-relaxed">
                Thank you for your interest in Aanandam Pack Studio. Our packaging development specialist will contact you within 24 business hours with specifications and quotation.
              </p>
              <PrimaryButton onClick={handleReset} className="mx-auto">
                Close
              </PrimaryButton>
            </div>
          ) : (
            <div>
              <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-[#B48A4A] mb-1">
                Aanandam Pack Studio
              </p>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#24221E] mb-2 font-normal">
                Quick Quotation Request
              </h3>
              <p className="text-xs sm:text-sm text-[#777268] mb-6 font-light">
                Provide basic details and our studio team will prepare an itemized quote.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4 text-left">
                <div>
                  <label className="block text-xs font-medium text-[#24221E] uppercase tracking-wider mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Maya Sharma"
                    className="w-full px-3.5 py-2.5 rounded-md border border-[#DED6C8] bg-white text-sm text-[#24221E] focus:outline-none focus:border-[#173D2C] focus:ring-1 focus:ring-[#173D2C]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#24221E] uppercase tracking-wider mb-1">
                      Business Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="maya@brand.com"
                      className="w-full px-3.5 py-2.5 rounded-md border border-[#DED6C8] bg-white text-sm text-[#24221E] focus:outline-none focus:border-[#173D2C] focus:ring-1 focus:ring-[#173D2C]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#24221E] uppercase tracking-wider mb-1">
                      WhatsApp / Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full px-3.5 py-2.5 rounded-md border border-[#DED6C8] bg-white text-sm text-[#24221E] focus:outline-none focus:border-[#173D2C] focus:ring-1 focus:ring-[#173D2C]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#24221E] uppercase tracking-wider mb-1">
                      Packaging Style
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-md border border-[#DED6C8] bg-white text-sm text-[#24221E] focus:outline-none focus:border-[#173D2C] focus:ring-1 focus:ring-[#173D2C]"
                    >
                      <option value="rigid-box">Rigid Box</option>
                      <option value="collapsible-box">Collapsible Box</option>
                      <option value="paper-bags">Paper Bags</option>
                      <option value="addons">Add-ons & Extras</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#24221E] uppercase tracking-wider mb-1">
                      Approx. Quantity
                    </label>
                    <select
                      value={formData.quantity}
                      onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-md border border-[#DED6C8] bg-white text-sm text-[#24221E] focus:outline-none focus:border-[#173D2C] focus:ring-1 focus:ring-[#173D2C]"
                    >
                      <option value="250">250 units</option>
                      <option value="500">500 units</option>
                      <option value="1000">1,000 units</option>
                      <option value="2500">2,500 units</option>
                      <option value="5000">5,000+ units</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#24221E] uppercase tracking-wider mb-1">
                    Requirements & Dimensions (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Provide dimensions (L x W x H), desired finishes (gold foil, matte, velvet insert)..."
                    className="w-full px-3.5 py-2.5 rounded-md border border-[#DED6C8] bg-white text-sm text-[#24221E] focus:outline-none focus:border-[#173D2C] focus:ring-1 focus:ring-[#173D2C]"
                  />
                </div>

                <div className="pt-2">
                  <PrimaryButton
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full justify-center"
                  >
                    {isSubmitting ? 'Submitting Details...' : 'Submit Quotation Request'}
                  </PrimaryButton>
                </div>
              </form>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
