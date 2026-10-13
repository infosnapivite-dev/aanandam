import React, { useState } from 'react';
import { Mail, Phone, MapPin, MessageSquare, Clock, Send, CheckCircle2 } from 'lucide-react';
import PageTransition from '../components/animations/PageTransition';
import SectionHeading from '../components/common/SectionHeading';
import PrimaryButton from '../components/buttons/PrimaryButton';
import { submitLead } from '../services/api';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    sampleKitRequested: true
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await submitLead({
        ...formData,
        type: 'contact-inquiry'
      });
      setIsSent(true);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageTransition>
      <div className="w-full bg-[#F6EDE3] pt-32 pb-24 border-b border-[#DED6C8]">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
          
          <SectionHeading
            eyebrow="STUDIO CONNECT & SAMPLES"
            title="Start a Conversation with APS"
            description="Whether you require an unprinted physical sample kit, custom die-line consultation, or a commercial manufacturing quote, our specialists are at your disposal."
            align="center"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            
            {/* Contact Details (5 Cols) */}
            <div className="lg:col-span-5 bg-[#F6EDE3] border border-[#DED6C8] rounded-xl p-8 sm:p-10 text-left space-y-8 shadow-sm">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-widest text-[#B48A4A]">
                  Packaging Atelier & Works
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#24221E] mt-1 mb-3">
                  Aanandam Pack Studio
                </h3>
                <p className="text-sm text-[#777268] font-light leading-relaxed">
                  Crafting bespoke rigid packaging, luxury paper carrier bags, and sensory unboxing presentations.
                </p>
              </div>

              <div className="space-y-6 text-sm text-[#24221E]">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-full bg-[#EAF1EC] text-[#173D2C] flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="block font-medium">Manufacturing & Design Studio</strong>
                    <p className="text-xs text-[#777268] mt-0.5">Aanandam Industrial Complex, Sector 4, Packaging Hub, New Delhi / NCR, India</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-full bg-[#EAF1EC] text-[#173D2C] flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="block font-medium">Telephone & WhatsApp Direct</strong>
                    <p className="text-xs text-[#777268] mt-0.5">+91 98112 00000 / +91 98113 00000</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-full bg-[#EAF1EC] text-[#173D2C] flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="block font-medium">Official Inquiry</strong>
                    <p className="text-xs text-[#777268] mt-0.5">studio@aanandampack.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-full bg-[#EAF1EC] text-[#173D2C] flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="block font-medium">Studio Production Hours</strong>
                    <p className="text-xs text-[#777268] mt-0.5">Monday to Saturday: 9:30 AM – 6:30 PM IST</p>
                  </div>
                </div>
              </div>

              {/* Physical Sample Kit Banner */}
              <div className="p-4 bg-[#EFE4DA] rounded-lg border border-[#DED6C8] text-xs text-[#777268] leading-relaxed">
                <strong className="text-[#173D2C] block font-medium mb-1">Request a Physical Material Swatch Box</strong>
                Receive samples of our rigid boards, textured Wibalin papers, foil stamp swatches, and velvet inserts delivered to your studio.
              </div>
            </div>

            {/* Form (7 Cols) */}
            <div className="lg:col-span-7 bg-[#F6EDE3] border border-[#DED6C8] rounded-xl p-8 sm:p-10 text-left shadow-sm">
              {isSent ? (
                <div className="py-12 text-center">
                  <CheckCircle2 className="w-16 h-16 text-[#173D2C] mx-auto mb-4" />
                  <h3 className="font-serif text-3xl text-[#24221E] mb-2">Message Received</h3>
                  <p className="text-sm text-[#777268] max-w-sm mx-auto font-light leading-relaxed mb-6">
                    Thank you for reaching out to Aanandam Pack Studio. Our studio team will respond with material swatches and specs within 24 hours.
                  </p>
                  <PrimaryButton onClick={() => setIsSent(false)} className="mx-auto">
                    Send Another Inquiry
                  </PrimaryButton>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <span className="text-[11px] font-semibold uppercase tracking-widest text-[#B48A4A] block">
                    Direct Studio Dispatch
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#24221E] mb-6 font-normal">
                    Send Your Project Inquiries
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-medium uppercase text-[#24221E] mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Vikram Singhania"
                        className="w-full px-4 py-3 rounded-md border border-[#DED6C8] bg-white text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium uppercase text-[#24221E] mb-1.5">
                        Brand / Company Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="e.g. Heritage Jewels"
                        className="w-full px-4 py-3 rounded-md border border-[#DED6C8] bg-white text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-medium uppercase text-[#24221E] mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="vikram@heritagejewels.com"
                        className="w-full px-4 py-3 rounded-md border border-[#DED6C8] bg-white text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium uppercase text-[#24221E] mb-1.5">
                        WhatsApp / Contact Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full px-4 py-3 rounded-md border border-[#DED6C8] bg-white text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium uppercase text-[#24221E] mb-1.5">
                      Tell Us About Your Packaging Needs *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Product category, desired dimensions, quantity, finishes (gold foil, magnetic closure, velvet cushion)..."
                      className="w-full px-4 py-3 rounded-md border border-[#DED6C8] bg-white text-sm"
                    />
                  </div>

                  <label className="flex items-center space-x-3 cursor-pointer p-3 bg-[#EFE4DA] rounded-md">
                    <input
                      type="checkbox"
                      checked={formData.sampleKitRequested}
                      onChange={(e) => setFormData({ ...formData, sampleKitRequested: e.target.checked })}
                      className="w-4 h-4 text-[#173D2C] rounded"
                    />
                    <span className="text-xs text-[#24221E] font-medium">
                      Yes, dispatch a complimentary APS Material & Swatch Kit to our address
                    </span>
                  </label>

                  <div className="pt-2">
                    <PrimaryButton
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full justify-center text-center"
                    >
                      {isSubmitting ? 'Transmitting Details...' : 'Send Studio Message'}
                    </PrimaryButton>
                  </div>
                </form>
              )}
            </div>

          </div>

        </div>
      </div>
    </PageTransition>
  );
}
