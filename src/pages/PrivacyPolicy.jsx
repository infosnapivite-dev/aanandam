import React from 'react';
import PageTransition from '../components/animations/PageTransition';
import SectionHeading from '../components/common/SectionHeading';

export default function PrivacyPolicy() {
  return (
    <PageTransition>
      <div className="w-full bg-[#F6EDE3] pt-32 pb-24 border-b border-[#DED6C8]">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 text-left">
          <SectionHeading
            eyebrow="LEGAL & DATA GOVERNANCE"
            title="Privacy Policy"
            align="left"
          />

          <div className="prose prose-stone text-sm text-[#777268] font-light leading-relaxed space-y-6">
            <p>
              Last Updated: October 2026. Aanandam Pack Studio ("APS", "we", "our") respects your privacy and is committed to protecting your personal and proprietary business information.
            </p>
            <h3 className="font-serif text-xl text-[#24221E] font-medium pt-4">1. Collection of Client & Project Information</h3>
            <p>
              We collect information you provide directly during quotation requests, sample orders, and custom artwork submissions, including names, contact numbers, email addresses, shipping destinations, and vector artwork assets.
            </p>
            <h3 className="font-serif text-xl text-[#24221E] font-medium pt-4">2. Non-Disclosure of Proprietary Artwork & Dies</h3>
            <p>
              Client artwork files, custom foil stamping dies, structural engineering die-lines, and brand marks are treated as strictly confidential and never shared or repurposed for third-party production without explicit written authorization.
            </p>
            <h3 className="font-serif text-xl text-[#24221E] font-medium pt-4">3. Data Security</h3>
            <p>
              We apply standard technical safeguards to protect your personal and business communication from unauthorized access, loss, or disclosure.
            </p>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
