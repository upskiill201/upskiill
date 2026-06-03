'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft, ArrowRight, ShieldCheck,
  Sprout, Users, BarChart2, TrendingUp, Star,
} from 'lucide-react';
import { motion } from 'framer-motion';

// ── Audience size options ─────────────────────────────────────────────────────
const AUDIENCE_SIZES = [
  {
    id: 'just_starting',
    icon: <Sprout size={38} strokeWidth={2} />,
    iconBg: '#ECFDF5',
    iconColor: '#16A34A',
    label: 'Just starting',
    description: "I'm just getting started and building my audience.",
  },
  {
    id: 'under_1k',
    icon: <Users size={38} strokeWidth={2} />,
    iconBg: '#F3EFFE',
    iconColor: '#7C3AED',
    label: 'Under 1k',
    description: 'I have a small but growing audience (less than 1,000).',
  },
  {
    id: '1k_10k',
    icon: <BarChart2 size={38} strokeWidth={2} />,
    iconBg: '#EFF6FF',
    iconColor: '#2563EB',
    label: '1k – 10k',
    description: 'I have an audience between 1,000 and 10,000 people.',
  },
  {
    id: '10k_100k',
    icon: <TrendingUp size={38} strokeWidth={2} />,
    iconBg: '#ECFDF5',
    iconColor: '#059669',
    label: '10k – 100k',
    description: 'I have an audience between 10,000 and 100,000 people.',
  },
  {
    id: '100k_plus',
    icon: <Star size={38} strokeWidth={2} />,
    iconBg: '#FFF7ED',
    iconColor: '#D97706',
    label: '100k+',
    description: 'I have more than 100,000 amazing followers!',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
};

// ── Page Component ────────────────────────────────────────────────────────────
export default function StepFourPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleContinue = async () => {
    if (!selected) return;
    setIsLoading(true);
    try {
      const draftId = localStorage.getItem('teyro_onboarding_draft_id');
      if (draftId && !draftId.startsWith('local_')) {
        await fetch(`https://upskiill-backend.onrender.com/creator-onboarding/${draftId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ audienceSize: selected }),
        });
      } else {
        const existing = JSON.parse(localStorage.getItem('teyro_onboarding_data') || '{}');
        localStorage.setItem('teyro_onboarding_data', JSON.stringify({ ...existing, audienceSize: selected }));
      }
    } catch {
      const existing = JSON.parse(localStorage.getItem('teyro_onboarding_data') || '{}');
      localStorage.setItem('teyro_onboarding_data', JSON.stringify({ ...existing, audienceSize: selected }));
    } finally {
      setIsLoading(false);
      router.push('/creator/onboarding/5');
    }
  };

  return (
    <div className="flex flex-col w-full max-w-[1761px] mx-auto min-h-[calc(100vh-88px)]">

      {/* ═══ MAIN CONTENT AREA ═══ */}
      <div className="flex flex-col lg:flex-row flex-1 overflow-visible min-h-0 pt-8 px-6 lg:pt-[48px] lg:px-[32px] gap-8 lg:gap-0">

        {/* ──── LEFT PANEL ──── */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full lg:w-[30%] shrink-0 flex flex-col overflow-visible lg:-ml-[32px]"
        >
          <div className="lg:ml-[32px]">
            <h1 className="font-extrabold tracking-tight text-gray-900 text-[32px] lg:text-[40px] leading-[1.2]">
              Let&apos;s understand
              <br className="hidden sm:block" />
              <span className="text-blue-600"> your reach</span>
            </h1>

            {/* Decorative Blue Line */}
            <div className="w-[50px] h-[2px] bg-blue-600 rounded-full mt-6 mb-6 lg:mt-8 lg:mb-8" />

            {/* Description */}
            <p className="text-base sm:text-lg xl:text-[20px] text-gray-600 mb-4 lg:mb-4 leading-relaxed max-w-[480px]">
              This helps us personalize your{' '}
              <br className="hidden sm:block" />
              experience and recommend the{' '}
              <br className="hidden sm:block" />
              best tools and strategies for you.
            </p>

          </div>

          {/* 3D Illustration & overlapping badge */}
          <div className="w-full flex flex-col items-center lg:items-start shrink-0 mt-0 lg:-mt-4 hidden sm:flex overflow-visible relative">
            <div className="w-full flex justify-center lg:justify-start">
              <Image
                src="/onboarding-step4-graph.png"
                alt="Audience Growth"
                width={550}
                height={440}
                className="w-full max-w-[380px] lg:max-w-[520px] h-auto object-contain block"
                style={{
                  maskImage: 'radial-gradient(ellipse at center, black 45%, transparent 100%)',
                  WebkitMaskImage: 'radial-gradient(ellipse at center, black 45%, transparent 100%)',
                }}
                priority
              />
            </div>
            
            {/* Mini stat badge (overlapping the image bottom by ~10% / negative margin) */}
            <div className="relative z-10 -mt-[32px] lg:-mt-[44px] ml-0 lg:ml-[48px] flex items-start gap-3 bg-white rounded-[16px] px-4 py-3 border border-slate-100 max-w-[320px]"
              style={{ boxShadow: '0 12px 36px -6px rgba(15, 23, 42, 0.12)' }}
            >
              <div className="w-[38px] h-[38px] rounded-[10px] bg-blue-50 flex items-center justify-center shrink-0 text-blue-600 mt-0.5">
                <BarChart2 size={20} strokeWidth={2.2} />
              </div>
              <p className="text-[13px] text-slate-600 leading-[1.5]">
                Creators on Teyro grow{' '}
                <span className="font-bold text-blue-600">3x faster</span>
                <br />
                with engaged audiences and higher course completion.
              </p>
            </div>
          </div>
        </motion.div>

        {/* ──── RIGHT PANEL ──── */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
          className="w-full lg:w-[70%] flex flex-col pb-8 lg:pb-12"
        >

          {/* Section heading */}
          <h2 className="text-[24px] lg:text-[28px] font-bold text-slate-900 mb-2">
            How big is your audience today?
          </h2>
          <p className="text-[15px] lg:text-[16px] text-slate-500 mb-6 lg:mb-8">
            Choose the option that best represents your current audience size.
          </p>

          {/* ── Card Grid (single-select, 5 cards) ── */}
          {/* Mobile: 2-col, tablet: 3-col, desktop: 5-col */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-4 xl:gap-5 w-full xl:max-w-[95%] 2xl:max-w-[90%] mb-[40px]"
          >
            {AUDIENCE_SIZES.map((size) => {
              const isSel = selected === size.id;
              const isHov = hoveredCard === size.id;

              return (
                <motion.button
                  variants={itemVariants}
                  key={size.id}
                  onClick={() => setSelected(size.id)}
                  onMouseEnter={() => setHoveredCard(size.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className="relative flex flex-col items-center rounded-[12px] sm:rounded-[16px] bg-white cursor-pointer text-center transition-all duration-200 outline-none w-full h-[220px] sm:h-[300px] lg:h-[407px]"
                  style={{
                    border: isSel
                      ? '2px solid #2563EB'
                      : isHov
                        ? '1px solid #93C5FD'
                        : '1px solid #E2E8F0',
                    boxShadow: isSel
                      ? '0 24px 48px -8px rgba(37, 99, 235, 0.35)'
                      : isHov
                        ? '0 24px 48px -8px rgba(15, 23, 42, 0.16)'
                        : '0 12px 36px -6px rgba(15, 23, 42, 0.12)',
                  }}
                >
                  {/* Checkmark badge */}
                  <div
                    className="absolute top-2 right-2 sm:top-3 sm:right-3 w-[16px] h-[16px] sm:w-[20px] sm:h-[20px] rounded-full flex items-center justify-center z-10 transition-all duration-200"
                    style={{
                      backgroundColor: isSel ? '#2563EB' : 'transparent',
                      border: isSel ? '2px solid #2563EB' : '1.5px solid #CBD5E1',
                    }}
                  >
                    {isSel && (
                      <svg width="6" height="5" viewBox="0 0 8 6" fill="none" className="sm:w-[8px] sm:h-[6px]">
                        <path
                          d="M1 3L3 5L7 1"
                          stroke="white"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </div>

                  {/* Top half: Centered icon container */}
                  <div className="w-full h-1/2 flex items-center justify-center pt-4 lg:pt-6">
                    <div
                      className="w-[50px] h-[50px] sm:w-[65px] sm:h-[65px] lg:w-[80px] lg:h-[80px] rounded-[10px] sm:rounded-[14px] lg:rounded-[18px] flex items-center justify-center shrink-0 [&>svg]:w-[24px] [&>svg]:h-[24px] sm:[&>svg]:w-[32px] sm:[&>svg]:h-[32px] lg:[&>svg]:w-[40px] lg:[&>svg]:w-[40px]"
                      style={{ backgroundColor: size.iconBg, color: size.iconColor }}
                    >
                      {size.icon}
                    </div>
                  </div>

                  {/* Bottom half: Text starting at the middle */}
                  <div className="w-full h-1/2 flex flex-col items-center px-3 sm:px-4 lg:px-5 pt-3 lg:pt-6 pb-4 lg:pb-8">
                    {/* Label */}
                    <p className="text-[16px] sm:text-[19px] lg:text-[20px] font-bold text-slate-900 mb-2 lg:mb-3 leading-[1.4] w-full">
                      {size.label}
                    </p>

                    {/* Description */}
                    <p className="text-[14px] sm:text-[15px] lg:text-[16px] text-slate-500 m-0 leading-[1.6] font-normal w-full line-clamp-3 lg:line-clamp-4">
                      {size.description}
                    </p>
                  </div>
                </motion.button>
              );
            })}
          </motion.div>

          {/* ── Bottom Banner Card ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 rounded-[16px] sm:rounded-[20px] p-5 sm:p-[0_0_0_24px] w-full xl:max-w-[95%] 2xl:max-w-[90%] overflow-hidden"
            style={{
              backgroundColor: '#F2F6FE',
              boxShadow: '0 8px 28px -6px rgba(15, 23, 42, 0.08)',
            }}
          >
            {/* Left: icon + text */}
            <div className="flex items-start sm:items-center gap-3 sm:gap-4 flex-1 py-4 sm:py-0">
              <div className="w-[40px] h-[40px] sm:w-[46px] sm:h-[46px] rounded-[12px] bg-white/80 backdrop-blur-sm flex items-center justify-center shrink-0 text-blue-600">
                <TrendingUp size={22} strokeWidth={2} />
              </div>
              <p className="text-[13px] sm:text-[14px] text-slate-700 leading-[1.55]">
                No matter your size,{' '}
                <span className="font-semibold text-slate-900">Teyro is built to help you grow,</span>
                <br />
                engage and monetize your audience.
              </p>
            </div>

            {/* Right: bottom graph image with fadeout mask */}
            <div className="hidden sm:block shrink-0 w-[180px] lg:w-[380px] xl:w-[480px] h-[100px]">
              <Image
                src="/onboarding-step4-bottom.png"
                alt="Audience growth chart"
                width={480}
                height={100}
                className="w-full h-[100px] object-cover block"
                style={{
                  maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 98%)',
                  WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 98%)',
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* ═══ BOTTOM BAR ═══ */}
      <div className="flex flex-col-reverse sm:flex-row items-center justify-between p-6 lg:p-[24px_32px] border-t border-slate-200 shrink-0 bg-white gap-4 sm:gap-0 mt-auto sticky bottom-0 z-50">
        {/* Back */}
        <button
          onClick={() => router.push('/creator/onboarding/3')}
          className="flex items-center justify-center sm:justify-start gap-2 text-[16px] font-medium text-blue-600 bg-transparent border-none cursor-pointer py-2 px-4 sm:-ml-4 w-full sm:w-auto"
        >
          <ArrowLeft size={18} strokeWidth={2.5} />
          Back
        </button>

        {/* Trust badge */}
        <div className="hidden md:flex items-center gap-2 text-slate-500 text-[13.5px] font-medium text-center">
          <ShieldCheck size={18} />
          Your information is secure and will never be shared.
        </div>

        {/* Continue button */}
        <button
          onClick={handleContinue}
          disabled={!selected || isLoading}
          className={`flex items-center justify-center gap-[10px] w-full sm:w-[180px] h-[56px] rounded-[14px] text-white text-[16.5px] font-semibold border-none transition-all duration-200 ${
            !selected || isLoading
              ? 'bg-blue-300 cursor-not-allowed'
              : 'bg-blue-600 cursor-pointer shadow-[0_4px_14px_rgba(37,99,235,0.3)] hover:bg-blue-700'
          }`}
        >
          {isLoading ? 'Saving...' : 'Continue'}
          {!isLoading && <ArrowRight size={18} strokeWidth={2.5} />}
        </button>
      </div>
    </div>
  );
}
