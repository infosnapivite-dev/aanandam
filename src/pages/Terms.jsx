import React from 'react';
import PageTransition from '../components/animations/PageTransition';
import SectionHeading from '../components/common/SectionHeading';

export default function Terms() {
  return (
    <PageTransition>
      <div className="w-full bg-[#F6EDE3] pt-32 pb-24 border-b border-[#DED6C8]">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 text-left">
          <SectionHeading
            eyebrow="COMMERCIAL TERMS"
            title="Terms & Manufacturing Specifications"
            align="left"
          />

          <div className="prose prose-stone text-sm text-[#777268] font-light leading-relaxed space-y-6">
            <p>
              Last Updated: October 2026. These Terms govern all quotation requests, physical proofing, and custom packaging manufacturing undertaken by Aanandam Pack Studio (APS).
            </p>
            <h3 className="font-serif text-xl text-[#24221E] font-medium pt-4">1. Structural Sampling & Proofing</h3>
            <p>
              Before mass manufacturing, APS produces unprinted white structural prototypes or high-precision 3D digital die-lines for sizing verification. Mass manufacturing proceeds only upon written client sign-off.
            </p>
            <h3 className="font-serif text-xl text-[#24221E] font-medium pt-4">2. Production Tolerances</h3>
            <p>
              Due to natural moisture expansion in paper boards and hand-wrapping craftsmanship, standard manufacturing dimensional tolerances of ±1.5mm and metallic foil register tolerances of ±0.5mm are universally observed.
            </p>
            <h3 className="font-serif text-xl text-[#24221E] font-medium pt-4">3. Lead Times & Dispatch</h3>
            <p>
              Standard lead times range between 10 to 14 business days from approved sample and deposit receipt. Expedited manufacturing windows are available upon request subject to atelier capacity.
            </p>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
