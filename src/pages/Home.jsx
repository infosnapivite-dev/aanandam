import React from 'react';
import PageTransition from '../components/animations/PageTransition';
import HeroSection from '../sections/HeroSection';
import ChooseStyleSection from '../sections/ChooseStyleSection';
import ProcessSection from '../sections/ProcessSection';
import BenefitsSection from '../sections/BenefitsSection';
import InspirationGallery from '../sections/InspirationGallery';

export default function Home() {
  return (
    <PageTransition>
      {/* 01. Hero Section */}
      <HeroSection />

      {/* 02. Choose Your Style (Flows directly from Hero - NO "Trusted by Brands" section) */}
      <ChooseStyleSection />

      {/* 03. How It Works */}
      <ProcessSection />

      {/* 04. Key Benefits */}
      <BenefitsSection />

      {/* 05. Get Inspired Gallery */}
      <InspirationGallery />
    </PageTransition>
  );
}
