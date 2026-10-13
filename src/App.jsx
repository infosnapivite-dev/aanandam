import React from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import SmoothScrollProvider from './components/common/SmoothScrollProvider';
import ScrollToTop from './components/common/ScrollToTop';
import CustomCursor from './components/common/CustomCursor';
import OpeningAnimation from './components/animations/OpeningAnimation';
import Header from './components/navigation/Header';
import Footer from './sections/Footer';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Gallery from './pages/Gallery';
import Reviews from './pages/Reviews';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Quote from './pages/Quote';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';
import Sitemap from './pages/Sitemap';
import NotFound from './pages/NotFound';

export default function App() {
  const location = useLocation();

  return (
    <SmoothScrollProvider>
      <OpeningAnimation />
      <ScrollToTop />
      <CustomCursor />

      <div className="flex flex-col min-h-screen bg-[#F6EDE3] text-[#24221E] font-sans antialiased selection:bg-[#173D2C] selection:text-[#F6EDE3]">
        {/* Navigation Header */}
        <Header />

        {/* Main Content Area with Page Transitions */}
        <main className="flex-grow flex flex-col w-full">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/customization" element={<Navigate to="/get-quote" replace />} />
              <Route path="/about" element={<About />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/reviews" element={<Reviews />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/get-quote" element={<Quote />} />
              <Route path="/quote" element={<Quote />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/sitemap" element={<Sitemap />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </SmoothScrollProvider>
  );
}
