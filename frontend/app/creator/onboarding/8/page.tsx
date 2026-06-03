'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft, ArrowRight, ShieldCheck, Target,
} from 'lucide-react';
import { motion } from 'framer-motion';

// ── Revenue target definitions ────────────────────────────────────────────────
const REVENUE_TARGETS = [
  {
    id: 'under_500',
    emoji: '🌱',
    emojiLabel: 'seedling',
    iconBg: '#F0FDF4',
    label: 'Under $500',
    description: "I'm just getting started",
    tag: 'Build foundation',
    tagColor: '#7C3AED',
    tagBg: '#F3EFFE',
  },
  {
    id: '500_2k',
    emoji: '🌿',
    emojiLabel: 'growing plant',
    iconBg: '#F0FDF4',
    label: '$500 – $2k',
    description: 'I want to earn some income',
    tag: 'Grow steadily',
    tagColor: '#059669',
    tagBg: '#EDFDF5',
  },
  {
    id: '2k_10k',
    emoji: '🌳',
    emojiLabel: 'tree',
    iconBg: '#FFFBEB',
    label: '$2k – $10k',
    description: 'I want a meaningful full-time income',
    tag: 'Scale smart',
    tagColor: '#D97706',
    tagBg: '#FFFBEB',
  },
  {
    id: '10k_50k',
    emoji: '🌲',
    emojiLabel: 'tall tree',
    iconBg: '#FFF0F5',
    label: '$10k – $50k',
    description: 'I want to build a thriving business',
    tag: 'Expand impact',
    tagColor: '#E11D48',
    tagBg: '#FFF0F2',
  },
  {
    id: '50k_plus',
    emoji: '🏝️',
    emojiLabel: 'island',
    iconBg: '#EEF3FF',
    label: '$50k+',
    description: 'I want financial freedom',
    tag: 'Create legacy',
    tagColor: '#7C3AED',
    tagBg: '#F3EFFE',
  },
];

// ── Animation Variants ────────────────────────────────────────────────────────
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.07 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 300, damping: 24 },
  },
};

// ── Page Component ─────────────────────────────────────────────────────────────
export default function StepEightPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleContinue = async () => {
    setIsLoading(true);
    try {
      const draftId = localStorage.getItem('teyro_onboarding_draft_id');
      if (draftId && !draftId.startsWith('local_')) {
        await fetch(
          `https://upskiill-backend.onrender.com/creator-onboarding/${draftId}`,
          {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ revenueTarget: selected }),
          }
        );
      } else {
        const existing = JSON.parse(localStorage.getItem('teyro_onboarding_data') || '{}');
        localStorage.setItem(
          'teyro_onboarding_data',
          JSON.stringify({ ...existing, revenueTarget: selected })
        );
      }
    } catch {
      const existing = JSON.parse(localStorage.getItem('teyro_onboarding_data') || '{}');
      localStorage.setItem(
        'teyro_onboarding_data',
        JSON.stringify({ ...existing, revenueTarget: selected })
      );
    } finally {
      setIsLoading(false);
      router.push('/creator/onboarding/9');
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
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="w-full lg:w-[30%] shrink-0 flex flex-col overflow-visible lg:-ml-[32px]"
        >
          <div className="lg:ml-[32px]">
            <h1 className="font-extrabold tracking-tight text-gray-900 text-[32px] lg:text-[40px] leading-[1.2]">
              Let&apos;s build a business
              <br className="hidden sm:block" />
              that{' '}
              <span className="text-blue-600">rewards you</span>
            </h1>

            {/* Decorative Blue Line */}
            <div className="w-[50px] h-[2px] bg-blue-600 rounded-full mt-6 mb-6 lg:mt-8 lg:mb-8" />

            {/* Description */}
            <p className="text-base sm:text-lg xl:text-[20px] text-gray-600 mb-4 leading-relaxed max-w-[480px]">
              Your goals drive your growth.
              <br className="hidden sm:block" />
              Tell us your revenue target so we
              <br className="hidden sm:block" />
              can personalize your creator journey.
            </p>
          </div>

          {/* 3D Illustration — the stat text is embedded in the image itself */}
          <div className="w-full flex justify-center lg:justify-start items-end shrink-0 mt-4 lg:mt-2 hidden sm:flex">
            <Image
              src="/Teyro Creator Onbarding flow/CF_ST8_side_img.png"
              alt="Creators earning more on Teyro"
              width={550}
              height={480}
              className="w-full max-w-[400px] lg:max-w-[520px] h-auto object-contain block"
              style={{
                maskImage: 'radial-gradient(ellipse at center, black 50%, transparent 100%)',
                WebkitMaskImage: 'radial-gradient(ellipse at center, black 50%, transparent 100%)',
              }}
              priority
            />
          </div>
        </motion.div>

        {/* ──── RIGHT PANEL ──── */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
          className="w-full lg:w-[70%] flex flex-col pb-8 lg:pb-12"
        >
          {/* Section heading */}
          <h2 className="text-[24px] lg:text-[28px] font-bold text-slate-900 mb-2">
            How much would you{' '}
            <span className="text-violet-700">LIKE</span> to make
            <br className="hidden sm:block" />
            monthly teaching online?
          </h2>
          <p className="text-[15px] lg:text-[16px] text-slate-500 mb-6 lg:mb-8">
            This helps us create a roadmap to get you there.
          </p>

          {/* ── Card Grid (single-select) — 2-col mobile, 5-col desktop ── */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-4 xl:gap-5 w-full xl:max-w-[95%] 2xl:max-w-[90%] mb-[40px]"
          >
            {REVENUE_TARGETS.map((target) => {
              const isSel = selected === target.id;
              const isHov = hoveredCard === target.id;

              return (
                <motion.button
                  variants={itemVariants}
                  key={target.id}
                  onClick={() => setSelected(target.id)}
                  onMouseEnter={() => setHoveredCard(target.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className="relative flex flex-col items-center rounded-[12px] sm:rounded-[16px] bg-white cursor-pointer text-center transition-all duration-200 outline-none w-full h-[220px] sm:h-[280px] lg:h-[330px]"
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
                  {/* Radio indicator */}
                  <div
                    className="absolute top-2 right-2 sm:top-3 sm:right-3 w-[16px] h-[16px] sm:w-[20px] sm:h-[20px] rounded-full flex items-center justify-center z-10 transition-all duration-200"
                    style={{
                      backgroundColor: isSel ? '#2563EB' : 'transparent',
                      border: isSel ? '2px solid #2563EB' : '1.5px solid #CBD5E1',
                    }}
                  >
                    {isSel && (
                      <svg
                        width="6"
                        height="5"
                        viewBox="0 0 8 6"
                        fill="none"
                        className="sm:w-[8px] sm:h-[6px]"
                      >
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

                  {/* Top half: Emoji icon in coloured bg box */}
                  <div className="w-full h-1/2 flex items-center justify-center pt-4 lg:pt-6">
                    <div
                      className="w-[56px] h-[56px] sm:w-[68px] sm:h-[68px] lg:w-[80px] lg:h-[80px] rounded-[14px] sm:rounded-[18px] lg:rounded-[20px] flex items-center justify-center shrink-0"
                      style={{ backgroundColor: target.iconBg }}
                    >
                      <span
                        className="leading-none select-none"
                        style={{ fontSize: 'clamp(28px, 4vw, 40px)' }}
                        aria-label={target.emojiLabel}
                      >
                        {target.emoji}
                      </span>
                    </div>
                  </div>

                  {/* Bottom half: text + tag */}
                  <div className="w-full h-1/2 flex flex-col items-center px-3 sm:px-4 lg:px-5 pt-2 lg:pt-3 pb-4 lg:pb-6">
                    {/* Label */}
                    <p className="text-[14px] sm:text-[17px] lg:text-[18px] font-bold text-slate-900 mb-1 lg:mb-2 leading-[1.3] w-full">
                      {target.label}
                    </p>

                    {/* Description */}
                    <p className="text-[11px] sm:text-[13px] lg:text-[13px] text-slate-500 mb-2 lg:mb-3 leading-[1.4] font-normal w-full line-clamp-2">
                      {target.description}
                    </p>

                    {/* Coloured tag badge */}
                    <div
                      className="mt-auto inline-flex items-center px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] lg:text-[12px] font-semibold whitespace-nowrap"
                      style={{ backgroundColor: target.tagBg, color: target.tagColor }}
                    >
                      {target.tag}
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </motion.div>

          {/* ── Bottom Banner Card ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-stretch gap-4 sm:gap-6 rounded-[16px] sm:rounded-[20px] p-5 sm:p-[0_0_0_24px] w-full xl:max-w-[95%] 2xl:max-w-[90%] overflow-hidden"
            style={{
              backgroundColor: '#F3EFFE',
              boxShadow: '0 8px 28px -6px rgba(124, 58, 237, 0.08)',
            }}
          >
            {/* Left: icon + text */}
            <div className="flex items-start sm:items-center gap-3 sm:gap-4 flex-1 py-4 sm:py-5">
              <div className="w-[40px] h-[40px] sm:w-[46px] sm:h-[46px] rounded-[12px] bg-white/80 backdrop-blur-sm flex items-center justify-center shrink-0 text-violet-600">
                <Target size={22} strokeWidth={2} />
              </div>
              <div>
                <p className="text-[14px] sm:text-[15px] font-bold text-violet-700 mb-[2px]">
                  Big goals. Bigger impact.
                </p>
                <p className="text-[13px] sm:text-[14px] text-slate-700 leading-[1.55]">
                  High-earning creators on Teyro don&apos;t just make more money —
                  <br className="hidden lg:block" />
                  they create more impact and help more learners succeed.
                </p>
              </div>
            </div>

            {/* Right: chart illustration — full image, bars anchored to card bottom */}
            <div className="hidden sm:block shrink-0 self-stretch relative w-[360px] lg:w-[500px] xl:w-[620px]">
              <Image
                src="/Teyro Creator Onbarding flow/CF_ST8_bottom_img.png"
                alt="Top creators earn $50k+ per month"
                width={900}
                height={460}
                className="absolute right-0"
                style={{
                  height: '130%',
                  width: '90%',
                  bottom: '-35px',
                  right:'-50px',
                  maxWidth: 'none',
                  maskImage: 'linear-gradient(to right, transparent 0%, black 8%)',
                  WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%)',
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
          onClick={() => router.push('/creator/onboarding/7')}
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

        {/* Continue — requires selection */}
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
