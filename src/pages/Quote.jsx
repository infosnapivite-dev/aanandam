import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Package,
  Layers,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Calculator,
  ShieldCheck,
  Download,
  Share2
} from 'lucide-react';
import PageTransition from '../components/animations/PageTransition';
import SectionHeading from '../components/common/SectionHeading';
import PrimaryButton from '../components/buttons/PrimaryButton';
import SecondaryButton from '../components/buttons/SecondaryButton';
import { calculateQuote, submitLead } from '../services/api';

export default function Quote() {
  const [searchParams] = useSearchParams();

  // Multi-step journey: 1 to 8
  const [currentStep, setCurrentStep] = useState(1);

  // Configuration state
  const [config, setConfig] = useState({
    productType: searchParams.get('category') || 'rigid-box',
    sizePreset: 'standard-jewellery',
    customDimensions: { length: '120', width: '120', height: '45' },
    quantity: '500',
    boardCaliper: '1200gsm',
    paperType: 'wibalin-forest',
    foiling: true,
    foilColor: searchParams.get('foil') || 'gold',
    spotUv: false,
    embossing: true,
    customInserts: true,
    insertType: 'velvet-cushion',
    ribbon: false,
    leadDetails: {
      fullName: '',
      email: '',
      phone: '',
      companyName: '',
      deliveryCity: '',
      notes: ''
    }
  });

  const [quoteEstimate, setQuoteEstimate] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [leadReference, setLeadReference] = useState('');

  // Auto-calculate estimate when step >= 7
  useEffect(() => {
    async function fetchEstimate() {
      const result = await calculateQuote(config);
      setQuoteEstimate(result);
    }
    fetchEstimate();
  }, [config.productType, config.quantity, config.foiling, config.spotUv, config.embossing, config.customInserts, config.ribbon]);

  const stepTitles = [
    'Choose Product',
    'Select Size',
    'Order Quantity',
    'Board & Paper',
    'Treatment & Finish',
    'Branding & Foiling',
    'Add-ons & Inserts',
    'Estimate & Details'
  ];

  const handleNext = () => {
    if (currentStep < 8) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 180, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 180, behavior: 'smooth' });
    }
  };

  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await submitLead({
        ...config.leadDetails,
        configuration: {
          productType: config.productType,
          sizePreset: config.sizePreset,
          dimensions: config.customDimensions,
          quantity: config.quantity,
          paper: config.paperType,
          finishes: {
            foiling: config.foiling ? config.foilColor : 'none',
            spotUv: config.spotUv,
            embossing: config.embossing,
            inserts: config.customInserts ? config.insertType : 'none',
            ribbon: config.ribbon
          }
        },
        estimate: quoteEstimate
      });

      setLeadReference(response.leadId);
      setIsCompleted(true);
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#173D2C', '#B48A4A', '#F6EDE3']
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageTransition>
      <div className="w-full bg-[#F6EDE3] pt-32 pb-24 border-b border-[#DED6C8]">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 md:px-12">
          
          {/* Header */}
          <SectionHeading
            eyebrow="TAILORED QUOTATION JOURNEY"
            title="Instant Packaging Estimator"
            description="Configure your specifications across board caliper, dimensions, hot-foil treatments, and custom foam inserts for an instant pricing breakdown."
            align="center"
          />

          {!isCompleted ? (
            <div className="bg-[#F6EDE3] border border-[#DED6C8] rounded-2xl shadow-xl overflow-hidden p-6 sm:p-10 md:p-12">
              
              {/* Stepper Progress Bar */}
              <div className="mb-10 pb-8 border-b border-[#DED6C8]">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold uppercase tracking-widest text-[#B48A4A]">
                    Step {currentStep} of 8: {stepTitles[currentStep - 1]}
                  </span>
                  <span className="text-xs text-[#777268] font-medium">
                    {Math.round((currentStep / 8) * 100)}% Configured
                  </span>
                </div>
                {/* Visual Step Bar */}
                <div className="w-full h-1.5 bg-[#EEE8DD] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#173D2C] transition-all duration-300 ease-out"
                    style={{ width: `${(currentStep / 8) * 100}%` }}
                  />
                </div>

                {/* Desktop Step Pills */}
                <div className="hidden lg:grid grid-cols-8 gap-2 mt-4">
                  {stepTitles.map((title, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentStep(i + 1)}
                      className={`text-left text-[11px] font-medium truncate py-1 border-b-2 transition-colors ${
                        currentStep === i + 1
                          ? 'border-[#173D2C] text-[#173D2C]'
                          : currentStep > i + 1
                          ? 'border-[#B48A4A] text-[#777268]'
                          : 'border-transparent text-[#9C968B]'
                      }`}
                    >
                      {i + 1}. {title}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step Content Area */}
              <div className="min-h-[340px] text-left">
                
                {/* STEP 1: Choose Product */}
                {currentStep === 1 && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                    <h3 className="font-serif text-2xl sm:text-3xl text-[#24221E] mb-2 font-normal">
                      1. Select Your Packaging Format
                    </h3>
                    <p className="text-sm text-[#777268] font-light mb-8">
                      Choose the foundational packaging structure that best suits your product.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {[
                        { id: 'rigid-box', name: 'Rigid Box', desc: 'Jewellery, Fragrance, Watches, Sweets' },
                        { id: 'collapsible-box', name: 'Collapsible Box', desc: 'Apparel, Hampers, Flat-ship saving' },
                        { id: 'paper-bags', name: 'Paper Bags', desc: 'Boutique retail, Rope handles' },
                        { id: 'addons', name: 'Add-ons & Extras', desc: 'Custom printed ribbon, Wax seals, Cards' }
                      ].map((item) => (
                        <button
                          key={item.id}
                          onClick={() => setConfig({ ...config, productType: item.id })}
                          className={`p-5 rounded-xl border text-left transition-all ${
                            config.productType === item.id
                              ? 'border-[#173D2C] bg-[#173D2C] text-white shadow-md'
                              : 'border-[#DED6C8] bg-[#F6EDE3] text-[#24221E] hover:border-[#173D2C]'
                          }`}
                        >
                          <p className="font-serif text-xl font-medium mb-1">{item.name}</p>
                          <p className={`text-xs font-light ${config.productType === item.id ? 'text-white/80' : 'text-[#777268]'}`}>
                            {item.desc}
                          </p>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* STEP 2: Select Size */}
                {currentStep === 2 && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                    <h3 className="font-serif text-2xl sm:text-3xl text-[#24221E] mb-2 font-normal">
                      2. Select Dimensions or Custom Sizing
                    </h3>
                    <p className="text-sm text-[#777268] font-light mb-8">
                      Choose a proven industry size or define exact millimetre specifications.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                      {[
                        { id: 'jewellery-mini', label: 'Ring / Earring Petite', dim: '65 x 65 x 45 mm' },
                        { id: 'standard-jewellery', label: 'Watch / Bangle / Necklace', dim: '120 x 120 x 50 mm' },
                        { id: 'mithai-large', label: 'Mithai / Hamper Master', dim: '240 x 160 x 60 mm' }
                      ].map((preset) => (
                        <button
                          key={preset.id}
                          onClick={() => setConfig({ ...config, sizePreset: preset.id })}
                          className={`p-4 rounded-xl border text-left transition-all ${
                            config.sizePreset === preset.id
                              ? 'border-[#173D2C] bg-[#EAF1EC] text-[#173D2C]'
                              : 'border-[#DED6C8] bg-[#F6EDE3] hover:border-[#173D2C]'
                          }`}
                        >
                          <p className="font-medium text-sm text-[#24221E]">{preset.label}</p>
                          <p className="text-xs text-[#777268] mt-1">{preset.dim}</p>
                        </button>
                      ))}
                    </div>

                    <div className="bg-[#F6EDE3] border border-[#DED6C8] p-5 rounded-xl">
                      <p className="text-xs font-semibold uppercase tracking-wider text-[#173D2C] mb-3">
                        Or Specify Custom Dimensions (mm)
                      </p>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <label className="block text-[11px] text-[#777268] uppercase mb-1">Length (L)</label>
                          <input
                            type="number"
                            value={config.customDimensions.length}
                            onChange={(e) => setConfig({ ...config, customDimensions: { ...config.customDimensions, length: e.target.value } })}
                            className="w-full p-2.5 border border-[#DED6C8] rounded text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] text-[#777268] uppercase mb-1">Width (W)</label>
                          <input
                            type="number"
                            value={config.customDimensions.width}
                            onChange={(e) => setConfig({ ...config, customDimensions: { ...config.customDimensions, width: e.target.value } })}
                            className="w-full p-2.5 border border-[#DED6C8] rounded text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] text-[#777268] uppercase mb-1">Height (H)</label>
                          <input
                            type="number"
                            value={config.customDimensions.height}
                            onChange={(e) => setConfig({ ...config, customDimensions: { ...config.customDimensions, height: e.target.value } })}
                            className="w-full p-2.5 border border-[#DED6C8] rounded text-sm"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* STEP 3: Order Quantity */}
                {currentStep === 3 && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                    <h3 className="font-serif text-2xl sm:text-3xl text-[#24221E] mb-2 font-normal">
                      3. Production Order Quantity
                    </h3>
                    <p className="text-sm text-[#777268] font-light mb-8">
                      Starting from accessible low MOQs for growing brands up to high-volume commercial production.
                    </p>

                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                      {['250', '500', '1000', '2500', '5000'].map((qty) => (
                        <button
                          key={qty}
                          onClick={() => setConfig({ ...config, quantity: qty })}
                          className={`p-5 rounded-xl border text-center transition-all ${
                            config.quantity === qty
                              ? 'border-[#173D2C] bg-[#173D2C] text-white shadow-md'
                              : 'border-[#DED6C8] bg-[#F6EDE3] text-[#24221E] hover:border-[#173D2C]'
                          }`}
                        >
                          <p className="font-serif text-3xl font-medium">{qty}</p>
                          <p className={`text-[11px] uppercase tracking-wider mt-1 ${config.quantity === qty ? 'text-white/80' : 'text-[#777268]'}`}>
                            Units
                          </p>
                          {Number(qty) >= 2500 && (
                            <span className="inline-block mt-2 text-[10px] bg-[#B48A4A] text-white px-2 py-0.5 rounded-full">
                              Volume Tier
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* STEP 4: Board & Paper Substrate */}
                {currentStep === 4 && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                    <h3 className="font-serif text-2xl sm:text-3xl text-[#24221E] mb-2 font-normal">
                      4. Paper Substrates & Board Caliper
                    </h3>
                    <p className="text-sm text-[#777268] font-light mb-8">
                      Select core rigid board caliper thickness and surface wrap paper.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                      {[
                        { id: 'wibalin-forest', name: 'Wibalin Forest Green (150gsm)', desc: 'Natural tactile paper stock with intense deep green saturation' },
                        { id: 'laid-ivory', name: 'Artisanal Laid Ivory (160gsm)', desc: 'Warm cream fine horizontal ribbed luxury texture' },
                        { id: 'ribbed-kraft', name: 'Unbleached Ribbed Kraft (180gsm)', desc: 'Earthy architectural organic craft aesthetics' }
                      ].map((paper) => (
                        <button
                          key={paper.id}
                          onClick={() => setConfig({ ...config, paperType: paper.id })}
                          className={`p-5 rounded-xl border text-left transition-all ${
                            config.paperType === paper.id
                              ? 'border-[#173D2C] bg-[#EAF1EC] text-[#173D2C]'
                              : 'border-[#DED6C8] bg-[#F6EDE3] hover:border-[#173D2C]'
                          }`}
                        >
                          <p className="font-medium text-sm text-[#24221E]">{paper.name}</p>
                          <p className="text-xs text-[#777268] font-light mt-1.5">{paper.desc}</p>
                        </button>
                      ))}
                    </div>

                    <div className="bg-[#F6EDE3] border border-[#DED6C8] p-5 rounded-xl">
                      <p className="text-xs font-semibold uppercase tracking-wider text-[#173D2C] mb-3">
                        Internal Structural Greyboard Caliper
                      </p>
                      <div className="grid grid-cols-3 gap-3">
                        {['1000gsm (Lightweight)', '1200gsm (Standard Luxury)', '1500gsm (Heirloom Heavy)'].map((cal) => (
                          <button
                            key={cal}
                            onClick={() => setConfig({ ...config, boardCaliper: cal.split(' ')[0] })}
                            className={`p-3 rounded text-xs font-medium border text-center transition-all ${
                              config.boardCaliper === cal.split(' ')[0]
                                ? 'border-[#173D2C] bg-[#173D2C] text-white'
                                : 'border-[#DED6C8] text-[#24221E] hover:border-[#173D2C]'
                            }`}
                          >
                            {cal}
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* STEP 5: Treatment & Finish */}
                {currentStep === 5 && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                    <h3 className="font-serif text-2xl sm:text-3xl text-[#24221E] mb-2 font-normal">
                      5. Surface Treatment & Protective Coating
                    </h3>
                    <p className="text-sm text-[#777268] font-light mb-8">
                      Protective lamination that enhances color vibrancy and resists fingerprint smudges.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {[
                        { title: 'Velvet Matte Lamination', desc: 'Silky smooth anti-reflective protective coat with zero glare.' },
                        { title: 'Soft Touch Velvet', desc: 'Ultra-luxurious tactile peach-skin finish with deep velvet touch.' },
                        { title: 'Uncoated Natural Touch', desc: 'Direct raw tactile paper grain without plastic coating.' }
                      ].map((t, idx) => (
                        <div key={idx} className="p-5 rounded-xl border border-[#DED6C8] bg-[#F6EDE3] text-left">
                          <CheckCircle2 className="w-5 h-5 text-[#B48A4A] mb-3" />
                          <h4 className="font-medium text-sm text-[#24221E] mb-1">{t.title}</h4>
                          <p className="text-xs text-[#777268] font-light">{t.desc}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* STEP 6: Branding & Foiling */}
                {currentStep === 6 && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                    <h3 className="font-serif text-2xl sm:text-3xl text-[#24221E] mb-2 font-normal">
                      6. Branding & Hot Foil Stamping
                    </h3>
                    <p className="text-sm text-[#777268] font-light mb-8">
                      Choose precision metallic embellishments to elevate your logo.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                      {[
                        { id: 'gold', name: 'Metallic Gold Foil', color: '#B48A4A' },
                        { id: 'silver', name: 'Bright Silver Foil', color: '#9CA3AF' },
                        { id: 'rosegold', name: 'Rose Gold Foil', color: '#C08081' }
                      ].map((foil) => (
                        <button
                          key={foil.id}
                          onClick={() => setConfig({ ...config, foiling: true, foilColor: foil.id })}
                          className={`p-4 rounded-xl border flex items-center space-x-3 transition-all ${
                            config.foiling && config.foilColor === foil.id
                              ? 'border-[#B48A4A] bg-[#EFE4DA] ring-1 ring-[#B48A4A]'
                              : 'border-[#DED6C8] bg-[#F6EDE3]'
                          }`}
                        >
                          <span className="w-6 h-6 rounded-full border border-black/10 shrink-0" style={{ backgroundColor: foil.color }} />
                          <div className="text-left">
                            <p className="text-sm font-medium text-[#24221E]">{foil.name}</p>
                            <p className="text-[11px] text-[#777268]">Hot Foil Stamp</p>
                          </div>
                        </button>
                      ))}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <label className="p-4 rounded-xl border border-[#DED6C8] bg-[#F6EDE3] flex items-center space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={config.spotUv}
                          onChange={(e) => setConfig({ ...config, spotUv: e.target.checked })}
                          className="w-4 h-4 text-[#173D2C] rounded"
                        />
                        <div className="text-left">
                          <p className="text-sm font-medium text-[#24221E]">Add Raised Spot UV</p>
                          <p className="text-xs text-[#777268]">Glossy contrast for tonal brand patterns</p>
                        </div>
                      </label>

                      <label className="p-4 rounded-xl border border-[#DED6C8] bg-[#F6EDE3] flex items-center space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={config.embossing}
                          onChange={(e) => setConfig({ ...config, embossing: e.target.checked })}
                          className="w-4 h-4 text-[#173D2C] rounded"
                        />
                        <div className="text-left">
                          <p className="text-sm font-medium text-[#24221E]">Multi-Level 3D Emboss</p>
                          <p className="text-xs text-[#777268]">Sculpted tactile height for monogram marks</p>
                        </div>
                      </label>
                    </div>
                  </motion.div>
                )}

                {/* STEP 7: Add-ons & Inserts */}
                {currentStep === 7 && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                    <h3 className="font-serif text-2xl sm:text-3xl text-[#24221E] mb-2 font-normal">
                      7. Interior Cavities & Finishing Accessories
                    </h3>
                    <p className="text-sm text-[#777268] font-light mb-8">
                      Cushion and secure your items with precision die-cut cavities.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                      {[
                        { id: 'velvet-cushion', name: 'Micro-Suede Velvet Cushion', desc: 'Slotted rings, watches, earrings' },
                        { id: 'eva-foam', name: 'High-Density Cut EVA Foam', desc: 'Cosmetic bottles, heavy goods' },
                        { id: 'food-cavity', name: 'Food-Grade Partition Tray', desc: 'Mithai, macaron confectionery' }
                      ].map((insert) => (
                        <button
                          key={insert.id}
                          onClick={() => setConfig({ ...config, customInserts: true, insertType: insert.id })}
                          className={`p-4 rounded-xl border text-left transition-all ${
                            config.customInserts && config.insertType === insert.id
                              ? 'border-[#173D2C] bg-[#EAF1EC] text-[#173D2C]'
                              : 'border-[#DED6C8] bg-[#F6EDE3]'
                          }`}
                        >
                          <p className="font-medium text-sm text-[#24221E]">{insert.name}</p>
                          <p className="text-xs text-[#777268] font-light mt-1">{insert.desc}</p>
                        </button>
                      ))}
                    </div>

                    <label className="p-4 rounded-xl border border-[#DED6C8] bg-[#F6EDE3] flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={config.ribbon}
                        onChange={(e) => setConfig({ ...config, ribbon: e.target.checked })}
                        className="w-4 h-4 text-[#173D2C] rounded"
                      />
                      <div className="text-left">
                        <p className="text-sm font-medium text-[#24221E]">Include Branded Grosgrain / Satin Ribbon Closure</p>
                        <p className="text-xs text-[#777268]">Woven bow or slide puller dyed to match pantone palette</p>
                      </div>
                    </label>
                  </motion.div>
                )}

                {/* STEP 8: Estimate & Lead Contact Form */}
                {currentStep === 8 && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                      
                      {/* Left: Summary & Estimate */}
                      <div className="lg:col-span-5 bg-[#EFE4DA] border border-[#DED6C8] rounded-xl p-6">
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-[#B48A4A] block mb-1">
                          Calculated Studio Estimate
                        </span>
                        <h4 className="font-serif text-3xl text-[#173D2C] font-semibold mb-1">
                          {quoteEstimate ? `₹${quoteEstimate.unitPrice.toLocaleString('en-IN')}` : 'Calculating...'}
                          <span className="text-xs font-normal text-[#777268] ml-1">/ unit</span>
                        </h4>
                        <p className="text-xs text-[#777268] mb-4">
                          Total Estimate: ₹{quoteEstimate ? quoteEstimate.totalEstimate.toLocaleString('en-IN') : '—'} for {config.quantity} units
                        </p>

                        <div className="pt-4 border-t border-[#DED6C8] space-y-2 text-xs text-[#24221E]">
                          <div className="flex justify-between">
                            <span className="text-[#777268]">Packaging Style:</span>
                            <span className="font-medium capitalize">{config.productType.replace('-', ' ')}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#777268]">Production Volume:</span>
                            <span className="font-medium">{config.quantity} pcs</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#777268]">Lead Time:</span>
                            <span className="font-medium">{quoteEstimate?.estimatedProductionDays}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#777268]">Branding:</span>
                            <span className="font-medium">{config.foiling ? `${config.foilColor} Hot Foil` : 'Standard'}</span>
                          </div>
                        </div>
                      </div>

                      {/* Right: Contact Form */}
                      <div className="lg:col-span-7">
                        <h3 className="font-serif text-2xl text-[#24221E] mb-2">
                          Finalize Quotation & Request Physical Prototype
                        </h3>
                        <p className="text-xs text-[#777268] mb-6 font-light">
                          Our technical packaging engineer will verify your specs and provide a firm commercial invoice.
                        </p>

                        <form onSubmit={handleFinalSubmit} className="space-y-4">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-xs font-medium uppercase text-[#24221E] mb-1">Full Name *</label>
                              <input
                                type="text"
                                required
                                value={config.leadDetails.fullName}
                                onChange={(e) => setConfig({ ...config, leadDetails: { ...config.leadDetails, fullName: e.target.value } })}
                                placeholder="Maya Sharma"
                                className="w-full p-2.5 rounded border border-[#DED6C8] bg-white text-sm"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-medium uppercase text-[#24221E] mb-1">Brand / Company *</label>
                              <input
                                type="text"
                                required
                                value={config.leadDetails.companyName}
                                onChange={(e) => setConfig({ ...config, leadDetails: { ...config.leadDetails, companyName: e.target.value } })}
                                placeholder="Aura Fine Jewels"
                                className="w-full p-2.5 rounded border border-[#DED6C8] bg-white text-sm"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-xs font-medium uppercase text-[#24221E] mb-1">Work Email *</label>
                              <input
                                type="email"
                                required
                                value={config.leadDetails.email}
                                onChange={(e) => setConfig({ ...config, leadDetails: { ...config.leadDetails, email: e.target.value } })}
                                placeholder="maya@aurajewels.com"
                                className="w-full p-2.5 rounded border border-[#DED6C8] bg-white text-sm"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-medium uppercase text-[#24221E] mb-1">WhatsApp / Phone *</label>
                              <input
                                type="tel"
                                required
                                value={config.leadDetails.phone}
                                onChange={(e) => setConfig({ ...config, leadDetails: { ...config.leadDetails, phone: e.target.value } })}
                                placeholder="+91 98765 43210"
                                className="w-full p-2.5 rounded border border-[#DED6C8] bg-white text-sm"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-xs font-medium uppercase text-[#24221E] mb-1">Destination City & Special Instructions</label>
                            <input
                              type="text"
                              value={config.leadDetails.deliveryCity}
                              onChange={(e) => setConfig({ ...config, leadDetails: { ...config.leadDetails, deliveryCity: e.target.value } })}
                              placeholder="e.g. Mumbai / Need sampling within 5 days"
                              className="w-full p-2.5 rounded border border-[#DED6C8] bg-white text-sm"
                            />
                          </div>

                          <div className="pt-2">
                            <PrimaryButton
                              type="submit"
                              disabled={isSubmitting}
                              className="w-full justify-center text-center"
                            >
                              {isSubmitting ? 'Generating Official Quote...' : 'Submit Configuration & Request Sample'}
                            </PrimaryButton>
                          </div>
                        </form>
                      </div>

                    </div>
                  </motion.div>
                )}

              </div>

              {/* Navigation Bottom Row */}
              <div className="flex items-center justify-between pt-8 mt-10 border-t border-[#DED6C8]">
                {currentStep > 1 ? (
                  <button
                    onClick={handleBack}
                    className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-[#777268] hover:text-[#173D2C] transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Previous Step
                  </button>
                ) : <div />}

                {currentStep < 8 && (
                  <PrimaryButton onClick={handleNext} size="md">
                    <span>Next: {stepTitles[currentStep]}</span>
                  </PrimaryButton>
                )}
              </div>

            </div>
          ) : (
            /* Celebration Completion View */
            <div className="bg-[#F6EDE3] border border-[#DED6C8] rounded-2xl p-8 sm:p-14 text-center max-w-2xl mx-auto shadow-xl">
              <div className="w-20 h-20 rounded-full bg-[#EAF1EC] text-[#173D2C] flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-[#173D2C]" />
              </div>
              <span className="text-xs uppercase tracking-[0.25em] text-[#B48A4A] font-semibold block mb-2">
                Quotation Request Confirmed
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#24221E] mb-3">
                Your Bespoke Specification is Registered
              </h2>
              <div className="bg-[#EFE4DA] py-3 px-6 rounded-lg inline-block text-xs font-mono text-[#173D2C] mb-6 border border-[#DED6C8]">
                Reference: {leadReference || 'APS-EST-94182'}
              </div>
              <p className="text-sm text-[#777268] font-light leading-relaxed mb-8 max-w-md mx-auto">
                Thank you for choosing Aanandam Pack Studio. An engineering specialist will review your die-lines and deliver a sample proof packet to your brand.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <PrimaryButton to="/" size="md">
                  Return to Homepage
                </PrimaryButton>
                <SecondaryButton to="/gallery" size="md">
                  Browse Gallery
                </SecondaryButton>
              </div>
            </div>
          )}

        </div>
      </div>
    </PageTransition>
  );
}
