import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ShieldCheck, CheckCircle2, X, MessageSquarePlus, Sparkles, Building2, MapPin, Package } from 'lucide-react';
import PageTransition from '../components/animations/PageTransition';
import SectionHeading from '../components/common/SectionHeading';
import PrimaryButton from '../components/buttons/PrimaryButton';
import SecondaryButton from '../components/buttons/SecondaryButton';
import { reviewsData, reviewStats } from '../data/reviews';

export default function Reviews() {
  const [reviewsList, setReviewsList] = useState(reviewsData);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // New review form state
  const [newReview, setNewReview] = useState({
    author: '',
    role: '',
    brand: '',
    location: '',
    category: 'Jewellery & Watches',
    rating: 5,
    project: '',
    title: '',
    content: ''
  });

  const categories = [
    'All',
    'Jewellery & Watches',
    'Fine Sweets & Mithai',
    'Boutique Retail',
    'Corporate & Hampers',
    'Beauty & Fragrance'
  ];

  const filteredReviews = selectedCategory === 'All'
    ? reviewsList
    : reviewsList.filter((r) => r.category === selectedCategory);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newReview.author || !newReview.brand || !newReview.content) return;

    const createdReview = {
      id: `rev-${Date.now()}`,
      author: newReview.author,
      role: newReview.role || 'Brand Representative',
      brand: newReview.brand,
      location: newReview.location || 'India',
      category: newReview.category,
      rating: newReview.rating,
      date: 'Just now',
      verified: true,
      project: newReview.project || 'Bespoke Custom Packaging Suite',
      title: newReview.title || 'Exceptional craftsmanship and precision',
      content: newReview.content
    };

    setReviewsList([createdReview, ...reviewsList]);
    setIsSubmitted(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsSubmitted(false);
    setNewReview({
      author: '',
      role: '',
      brand: '',
      location: '',
      category: 'Jewellery & Watches',
      rating: 5,
      project: '',
      title: '',
      content: ''
    });
  };

  return (
    <PageTransition>
      <div className="w-full bg-[#F6EDE3] pt-32 pb-24 border-b border-[#DED6C8]">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16">

          {/* Section Heading */}
          <SectionHeading
            eyebrow="CLIENT TESTIMONIALS & TRUST"
            title="Client Reviews & Stories"
            description="Read how discerning jewellery houses, artisanal confectioners, boutique retailers, and corporate leaders elevate their unboxing experience with Aanandam Pack Studio."
            align="center"
          />

          {/* Trust Scoreboard Summary Banner */}
          <div className="bg-[#F6EDE3] border border-[#DED6C8] rounded-2xl p-6 sm:p-10 mb-14 sm:mb-16 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
              
              {/* Overall Score Callout */}
              <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left border-b lg:border-b-0 lg:border-r border-[#DED6C8] pb-6 lg:pb-0 lg:pr-8">
                <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#B48A4A] mb-1">
                  Verified Client Score
                </span>
                <div className="flex items-baseline space-x-2 my-1">
                  <span className="font-serif text-5xl sm:text-6xl font-normal text-[#173D2C]">
                    {reviewStats.averageRating}
                  </span>
                  <span className="text-sm font-light text-[#777268]">/ 5.0</span>
                </div>

                {/* 5 Gold Stars */}
                <div className="flex items-center space-x-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#B48A4A] text-[#B48A4A]" />
                  ))}
                </div>

                <p className="text-xs text-[#777268] font-light">
                  Based on {reviewStats.totalReviews} custom luxury packaging commissions
                </p>

                <div className="mt-5">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(true)}
                    className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-[#173D2C] hover:text-[#B48A4A] transition-colors py-1 border-b border-[#173D2C] hover:border-[#B48A4A]"
                  >
                    <MessageSquarePlus className="w-3.5 h-3.5 mr-1.5" />
                    Share Your Studio Experience
                  </button>
                </div>
              </div>

              {/* Rating Breakdown & Atelier Standards */}
              <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
                <div className="p-4 sm:p-5 rounded-xl bg-[#EFE4DA]/60 border border-[#DED6C8]/60">
                  <span className="text-xs uppercase tracking-wider text-[#777268] font-medium block mb-1">
                    Client Satisfaction
                  </span>
                  <h4 className="font-serif text-3xl font-medium text-[#173D2C] mb-1">
                    {reviewStats.satisfactionRate}
                  </h4>
                  <p className="text-xs text-[#777268] font-light leading-relaxed">
                    Evaluated across paper tactility, foil registration, and structural fit.
                  </p>
                </div>

                <div className="p-4 sm:p-5 rounded-xl bg-[#EFE4DA]/60 border border-[#DED6C8]/60">
                  <span className="text-xs uppercase tracking-wider text-[#777268] font-medium block mb-1">
                    Repeat Commission Rate
                  </span>
                  <h4 className="font-serif text-3xl font-medium text-[#173D2C] mb-1">
                    {reviewStats.repeatOrderRate}
                  </h4>
                  <p className="text-xs text-[#777268] font-light leading-relaxed">
                    Long-term packaging production partnerships for seasonal collections.
                  </p>
                </div>

                <div className="p-4 sm:p-5 rounded-xl bg-[#EFE4DA]/60 border border-[#DED6C8]/60">
                  <span className="text-xs uppercase tracking-wider text-[#777268] font-medium block mb-1">
                    Pre-Production Proofing
                  </span>
                  <h4 className="font-serif text-3xl font-medium text-[#173D2C] mb-1">
                    100%
                  </h4>
                  <p className="text-xs text-[#777268] font-light leading-relaxed">
                    Full unprinted white mockups or physical swatch sets before mass run.
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Filter Bar */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12 sm:mb-16">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium tracking-wide transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#173D2C] text-[#F6EDE3] shadow-sm'
                    : 'bg-[#EFE4DA] text-[#777268] hover:text-[#173D2C] border border-[#DED6C8]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Reviews Grid - Uniform card dimensions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-20">
            {filteredReviews.map((rev, idx) => (
              <motion.div
                key={rev.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.06 }}
                className="h-full flex flex-col"
              >
                <div className="group flex flex-col justify-between w-full h-full min-h-[430px] sm:min-h-[450px] bg-[#F6EDE3] border border-[#DED6C8] rounded-2xl p-6 sm:p-8 text-left shadow-sm hover:border-[#173D2C] hover:shadow-lg transition-all duration-300">
                  
                  {/* Upper Content Slot */}
                  <div className="flex flex-col flex-grow">
                    {/* Top Row: Stars, Verified Badge, Date */}
                    <div className="flex flex-wrap items-center justify-between gap-2.5 mb-4 pb-3 border-b border-[#DED6C8]/70">
                      <div className="flex items-center space-x-1 shrink-0">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-[#B48A4A] text-[#B48A4A]" />
                        ))}
                      </div>

                      <div className="flex items-center space-x-2.5 text-xs text-[#777268] shrink-0">
                        {rev.verified && (
                          <span className="inline-flex items-center text-[11px] font-medium text-[#173D2C] bg-[#EAF1EC] px-2.5 py-0.5 rounded-full border border-[#173D2C]/10">
                            <ShieldCheck className="w-3.5 h-3.5 mr-1 text-[#173D2C]" />
                            Verified Client
                          </span>
                        )}
                        <span>{rev.date}</span>
                      </div>
                    </div>

                    {/* Project Badge - Fixed height slot */}
                    <div className="h-7 mb-3.5 flex items-center">
                      {rev.project && (
                        <span className="inline-flex items-center text-[11px] text-[#173D2C] bg-[#EFE4DA] px-2.5 py-1 rounded border border-[#DED6C8]/80 font-mono truncate max-w-full">
                          <Package className="w-3 h-3 mr-1.5 text-[#B48A4A] shrink-0" />
                          <span className="truncate">{rev.project}</span>
                        </span>
                      )}
                    </div>

                    {/* Review Headline - Fixed 2-line height container */}
                    <div className="min-h-[3.25rem] sm:min-h-[3.75rem] flex items-start mb-3">
                      <h3 className="font-serif text-xl sm:text-2xl font-medium text-[#173D2C] leading-snug line-clamp-2">
                        "{rev.title}"
                      </h3>
                    </div>

                    {/* Review Narrative Content - Clamped uniformly to 5 lines */}
                    <p className="text-sm text-[#24221E] font-light leading-relaxed line-clamp-5 flex-grow mb-6">
                      {rev.content}
                    </p>
                  </div>

                  {/* Author Credentials - Anchored to bottom across all cards */}
                  <div className="pt-4 border-t border-[#DED6C8]/70 mt-auto flex items-center space-x-3.5 shrink-0">
                    <div className="w-10 h-10 rounded-full bg-[#EFE4DA] border border-[#DED6C8] flex items-center justify-center font-serif text-sm font-semibold text-[#173D2C] shrink-0">
                      {rev.author.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="text-sm font-semibold text-[#24221E] truncate">
                        {rev.author}
                      </h4>
                      <p className="text-xs text-[#777268] font-light truncate">
                        {rev.role} · <span className="font-medium text-[#173D2C]">{rev.brand}</span> ({rev.location})
                      </p>
                    </div>
                  </div>

                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom Atelier Guarantee Banner */}
          <div className="p-8 sm:p-12 rounded-2xl bg-[#EFE4DA] border border-[#DED6C8] text-center max-w-4xl mx-auto shadow-sm">
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#B48A4A] block mb-2">
              Bespoke Manufacturing Standard
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#173D2C] font-normal mb-4">
              Ready to create packaging that leaves a lasting impression?
            </h2>
            <p className="text-sm text-[#777268] font-light max-w-xl mx-auto mb-8 leading-relaxed">
              Explore proven die-lines, request complimentary physical material swatches, or configure an instant quotation with our packaging specialists.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <PrimaryButton to="/get-quote" size="md">
                <span>Start Instant Quotation</span>
              </PrimaryButton>
              <SecondaryButton to="/gallery" size="md">
                <span>Browse Gallery Archive</span>
              </SecondaryButton>
            </div>
          </div>

        </div>
      </div>

      {/* Interactive Write A Review Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="absolute inset-0 bg-[#173D2C]/80 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.3 }}
              className="relative bg-[#F6EDE3] border border-[#DED6C8] rounded-2xl shadow-2xl max-w-lg w-full z-10 p-6 sm:p-8 overflow-y-auto max-h-[90vh] my-auto"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={handleCloseModal}
                className="absolute top-4 right-4 p-2 text-[#777268] hover:text-[#173D2C] transition-colors rounded-full hover:bg-[#EEE8DD]"
              >
                <X className="w-5 h-5" />
              </button>

              {isSubmitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-[#EAF1EC] text-[#173D2C] flex items-center justify-center mx-auto mb-4 ring-8 ring-[#EAF1EC]/50">
                    <CheckCircle2 className="w-8 h-8 text-[#173D2C]" />
                  </div>
                  <h3 className="font-serif text-3xl text-[#24221E] mb-2">Review Submitted</h3>
                  <p className="text-sm text-[#777268] max-w-sm mx-auto font-light leading-relaxed mb-6">
                    Thank you for sharing your experience with Aanandam Pack Studio. Your review has been added to our live atelier board!
                  </p>
                  <PrimaryButton onClick={handleCloseModal} className="mx-auto" size="md">
                    <span>Close Window</span>
                  </PrimaryButton>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-left">
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#B48A4A] block mb-1">
                      Atelier Feedback
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl text-[#24221E] font-medium">
                      Share Your Experience
                    </h3>
                    <p className="text-xs text-[#777268] mt-1 font-light">
                      Help other luxury brands learn about our precision, paper tactility, and service.
                    </p>
                  </div>

                  {/* Rating Selector */}
                  <div>
                    <label className="block text-xs font-medium text-[#24221E] mb-1.5">
                      Rating Star Selection
                    </label>
                    <div className="flex items-center space-x-1.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewReview({ ...newReview, rating: star })}
                          className="p-1 hover:scale-110 transition-transform"
                        >
                          <Star
                            className={`w-6 h-6 ${
                              star <= newReview.rating
                                ? 'fill-[#B48A4A] text-[#B48A4A]'
                                : 'text-[#DED6C8]'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-[#24221E] mb-1">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={newReview.author}
                        onChange={(e) => setNewReview({ ...newReview, author: e.target.value })}
                        placeholder="e.g. Radhika Kapoor"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-[#DED6C8] bg-white text-sm text-[#24221E] focus:outline-none focus:border-[#173D2C] focus:ring-1 focus:ring-[#173D2C]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#24221E] mb-1">
                        Your Role / Designation
                      </label>
                      <input
                        type="text"
                        value={newReview.role}
                        onChange={(e) => setNewReview({ ...newReview, role: e.target.value })}
                        placeholder="e.g. Creative Director"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-[#DED6C8] bg-white text-sm text-[#24221E] focus:outline-none focus:border-[#173D2C] focus:ring-1 focus:ring-[#173D2C]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-[#24221E] mb-1">
                        Brand / Company Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={newReview.brand}
                        onChange={(e) => setNewReview({ ...newReview, brand: e.target.value })}
                        placeholder="e.g. Kapoor Jewels"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-[#DED6C8] bg-white text-sm text-[#24221E] focus:outline-none focus:border-[#173D2C] focus:ring-1 focus:ring-[#173D2C]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#24221E] mb-1">
                        City / Location
                      </label>
                      <input
                        type="text"
                        value={newReview.location}
                        onChange={(e) => setNewReview({ ...newReview, location: e.target.value })}
                        placeholder="e.g. Mumbai"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-[#DED6C8] bg-white text-sm text-[#24221E] focus:outline-none focus:border-[#173D2C] focus:ring-1 focus:ring-[#173D2C]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#24221E] mb-1">
                      Packaging Industry Sector
                    </label>
                    <select
                      value={newReview.category}
                      onChange={(e) => setNewReview({ ...newReview, category: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#DED6C8] bg-white text-sm text-[#24221E] focus:outline-none focus:border-[#173D2C] focus:ring-1 focus:ring-[#173D2C]"
                    >
                      {categories.filter(c => c !== 'All').map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#24221E] mb-1">
                      Packaging Specification / Project Detail
                    </label>
                    <input
                      type="text"
                      value={newReview.project}
                      onChange={(e) => setNewReview({ ...newReview, project: e.target.value })}
                      placeholder="e.g. 1,000 pcs Velvet Sliding Matchbox Drawers with Gold Foil"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#DED6C8] bg-white text-sm text-[#24221E] focus:outline-none focus:border-[#173D2C] focus:ring-1 focus:ring-[#173D2C]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#24221E] mb-1">
                      Review Headline
                    </label>
                    <input
                      type="text"
                      value={newReview.title}
                      onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
                      placeholder="e.g. Exceptional precision and seamless unboxing"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#DED6C8] bg-white text-sm text-[#24221E] focus:outline-none focus:border-[#173D2C] focus:ring-1 focus:ring-[#173D2C]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#24221E] mb-1">
                      Detailed Testimonial *
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={newReview.content}
                      onChange={(e) => setNewReview({ ...newReview, content: e.target.value })}
                      placeholder="Share your experience regarding paper stock, foil clarity, durability, and on-time dispatch..."
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#DED6C8] bg-white text-sm text-[#24221E] focus:outline-none focus:border-[#173D2C] focus:ring-1 focus:ring-[#173D2C] resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <PrimaryButton type="submit" size="md" className="w-full justify-center">
                      <span>Post Verified Review</span>
                    </PrimaryButton>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </PageTransition>
  );
}
