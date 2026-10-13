import React from 'react';
import { motion } from 'framer-motion';
import { Check, Shield, Leaf, Factory, Sparkles, Award } from 'lucide-react';
import PageTransition from '../components/animations/PageTransition';
import SectionHeading from '../components/common/SectionHeading';
import OptimizedImage from '../components/common/OptimizedImage';
import PrimaryButton from '../components/buttons/PrimaryButton';
import SecondaryButton from '../components/buttons/SecondaryButton';

export default function About() {
  const pillars = [
    {
      icon: Factory,
      title: 'Artisanal Engineering',
      desc: 'Precision European die-cut tooling combined with meticulous hand-wrapping and corner-reinforcement for permanent keepsake durability.'
    },
    {
      icon: Leaf,
      title: 'Conscious Luxury',
      desc: '100% FSC-certified papers, recyclable greyboards, non-toxic water-based adhesives, and soy vegetable inks for zero-compromise environmental stewardship.'
    },
    {
      icon: Award,
      title: 'Uncompromising Quality',
      desc: 'Multi-stage inspection protocols ensuring zero foil bleed, razor-sharp edge miters, seamless lid tolerances, and velvet-smooth tactile closures.'
    }
  ];

  return (
    <PageTransition>
      <div className="w-full bg-[#F6EDE3] pt-32 pb-24 border-b border-[#DED6C8]">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
          
          {/* Main Story Hero */}
          <SectionHeading
            eyebrow="OUR PHILOSOPHY & HERITAGE"
            title="Crafting the Architecture of Anticipation"
            align="center"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-24">
            <div className="lg:col-span-6 text-left space-y-6 text-[#777268] font-light leading-relaxed text-base sm:text-lg">
              <p className="font-serif text-2xl sm:text-3xl text-[#24221E] leading-snug font-normal">
                "We believe luxury packaging is not a wrapper—it is the tactile threshold where your customer first meets your craft."
              </p>
              <p>
                Founded on the belief that meaningful brands deserve packaging that reflects their dedication to excellence, Aanandam Pack Studio (APS) bridges the gap between boutique design studios and high-volume industrial box factories.
              </p>
              <p>
                Whether crafting velvet-cushioned jewellery chests for heirloom diamond houses, gold-foiled sliding sweet boxes for festive confectioners, or architectural retail carrier bags for high-fashion boutiques, our obsession remains singular: perfection in every fold, joint, and metallic stamp.
              </p>

              <div className="pt-4 flex flex-wrap gap-4">
                <PrimaryButton to="/gallery">
                  Explore Gallery
                </PrimaryButton>
                <SecondaryButton to="/get-quote">
                  Request a Quotation
                </SecondaryButton>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-xl overflow-hidden border border-[#DED6C8] shadow-lg bg-[#EEE8DD]">
                <OptimizedImage
                  src="/images/hero-composition.jpg"
                  alt="Aanandam Pack Studio craftsmanship and materials"
                  className="w-full aspect-[4/3] object-cover"
                />
              </div>
            </div>
          </div>

          {/* Core Pillars */}
          <div className="py-16 border-y border-[#DED6C8]">
            <div className="text-center mb-12">
              <span className="text-xs uppercase tracking-[0.25em] text-[#B48A4A] font-semibold">
                The APS Standard
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#24221E] mt-2">
                Why Discerning Brands Choose Aanandam
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {pillars.map((pillar, idx) => {
                const IconComponent = pillar.icon;
                return (
                  <div
                    key={idx}
                    className="bg-[#F6EDE3] border border-[#E9E2D6] rounded-xl p-8 text-left hover:border-[#173D2C] transition-colors"
                  >
                    <div className="w-12 h-12 rounded-full bg-[#EAF1EC] flex items-center justify-center text-[#173D2C] mb-6">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <h3 className="font-serif text-2xl text-[#24221E] font-medium mb-3">
                      {pillar.title}
                    </h3>
                    <p className="text-sm text-[#777268] font-light leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 py-16 text-center">
            <div className="p-4">
              <p className="font-serif text-4xl sm:text-5xl text-[#173D2C] font-semibold">250</p>
              <p className="text-xs uppercase tracking-widest text-[#777268] mt-2">Low Minimum Order Quantity</p>
            </div>
            <div className="p-4">
              <p className="font-serif text-4xl sm:text-5xl text-[#173D2C] font-semibold">10–14</p>
              <p className="text-xs uppercase tracking-widest text-[#777268] mt-2">Days Average Production</p>
            </div>
            <div className="p-4">
              <p className="font-serif text-4xl sm:text-5xl text-[#173D2C] font-semibold">100%</p>
              <p className="text-xs uppercase tracking-widest text-[#777268] mt-2">Bespoke Dimension Customization</p>
            </div>
            <div className="p-4">
              <p className="font-serif text-4xl sm:text-5xl text-[#173D2C] font-semibold">FSC</p>
              <p className="text-xs uppercase tracking-widest text-[#777268] mt-2">Certified Responsibly Sourced</p>
            </div>
          </div>

        </div>
      </div>
    </PageTransition>
  );
}
