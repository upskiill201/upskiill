'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft, ArrowRight, ShieldCheck,
  PlaySquare, Video, FileText, Users, Headphones, PlusSquare, TrendingUp, Sparkles,
} from 'lucide-react';
import { useOnboardingGuard } from '@/hooks/useOnboardingGuard';
import { getOnboardingData, saveOnboardingStep } from '@/lib/onboarding';
import posthog from 'posthog-js';
import { motion } from 'framer-motion';

// ── Content type definitions ──────────────────────────────────────────────────
const CONTENT_TYPES = [
  {
    id: 'full_courses',
    icon: <PlaySquare strokeWidth={2} />,
    iconBg: '#EEF3FF',
    iconColor: '#2563EB',
    label: 'Full courses',
    description: 'I have complete courses ready to upload or import.',
  },
  {
    id: 'recorded_videos',
    icon: <Video strokeWidth={2} />,
    iconBg: '#EDFDF5',
    iconColor: '#059669',
    label: 'Recorded videos',
    description: 'I have video content that I can use.',
  },
  {
    id: 'pdfs_resources',
    icon: <FileText strokeWidth={2} />,
    iconBg: '#F3EFFE',
    iconColor: '#7C3AED',
    label: 'PDFs / resources',
    description: 'I have written materials, slide decks or guides.',
  },
  {
    id: 'community_group',
    icon: <Users strokeWidth={2} />,
    iconBg: '#FFF7ED',
    iconColor: '#EA580C',
    label: 'Community / group',
    description: 'I already have a community or group of learners.',
  },
  {
    id: 'coaching_calls',
    icon: <Headphones strokeWidth={2} />,
    iconBg: '#FFF0F5',
    iconColor: '#E11D48',
    label: 'Coaching calls',
    description: 'I do live calls or 1:1/ group coaching.',
  },
  {
    id: 'nothing_yet',
    icon: (
      <div
        style={{
          width: '38px',
          height: '38px',
          border: '2px dashed #94A3B8',
          borderRadius: '10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#94A3B8',
        }}
      >
        <PlusSquare size={22} strokeWidth={1.8} />
      </div>
    ),
    iconBg: '#F8FAFC',
    iconColor: '#94A3B8',
    label: 'Nothing yet',
    description: "I'm starting from scratch with no content.",
  },
];

// ── Animation Variants ────────────────────────────────────────────────────────
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
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
export default function StepSixPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<string[]>([]);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // 🛡️ Step-skip protection — redirect to Step 1 if prior steps not done
  useOnboardingGuard(6);

  // 📖 Restore previous answer on mount
  useEffect(() => {
    const data = getOnboardingData();
    if (data.step6?.existingContent) {
      setSelected(data.step6.existingContent);
    }
    // Track page view
    posthog.capture('onboarding_step_viewed', { step: 6, stepName: 'existing_content' });
  }, []);

  const toggle = (id: string) => {
    // "Nothing yet" is mutually exclusive with everything else
    if (id === 'nothing_yet') {
      setSelected((prev) => (prev.includes('nothing_yet') ? [] : ['nothing_yet']));
    } else {
      setSelected((prev) => {
        const without = prev.filter((s) => s !== 'nothing_yet');
        return without.includes(id) ? without.filter((s) => s !== id) : [...without, id];
      });
    }
  };


  // 💾 Auto-save on selection
  useEffect(() => {
    if (selected && (Array.isArray(selected) ? selected.length > 0 : true)) {
      saveOnboardingStep(6, { existingContent: selected });
    }
  }, [selected]);

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
            body: JSON.stringify({ existingContent: selected }),
          }
        );
      } else {
        const existing = JSON.parse(localStorage.getItem('teyro_onboarding_data') || '{}');
        localStorage.setItem(
          'teyro_onboarding_data',
          JSON.stringify({ ...existing, existingContent: selected })
        );
      }
    } catch {
      const existing = JSON.parse(localStorage.getItem('teyro_onboarding_data') || '{}');
      localStorage.setItem(
        'teyro_onboarding_data',
        JSON.stringify({ ...existing, existingContent: selected })
      );
    } finally {
      setIsLoading(false);
      saveOnboardingStep(6, { existingContent: selected });
      posthog.capture('onboarding_step_completed', { step: 6 });
      router.push('/creator/onboarding/7');
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
              Let&apos;s discover
              <br className="hidden sm:block" />
              <span className="text-blue-600"> what you already</span>
              <br className="hidden sm:block" />
              <span className="text-blue-600"> have</span>
            </h1>

            {/* Decorative Blue Line */}
            <div className="w-[50px] h-[2px] bg-blue-600 rounded-full mt-6 mb-6 lg:mt-8 lg:mb-8" />

            {/* Description */}
            <p className="text-base sm:text-lg xl:text-[20px] text-gray-600 mb-4 leading-relaxed max-w-[480px]">
              This helps us understand your
              <br className="hidden sm:block" />
              starting point so we can
              <br className="hidden sm:block" />
              recommend the best next steps.
            </p>
          </div>

          {/* 3D Illustration + overlapping stat badge */}
          <div className="w-full flex flex-col items-center lg:items-start shrink-0 mt-4 lg:mt-2 hidden sm:flex overflow-visible relative">
            <div className="w-full flex justify-center lg:justify-start">
              <Image
                src="/Teyro Creator Onbarding flow/CF_ST6_side_img.png"
                alt="Content types illustration"
                width={550}
                height={480}
                className="w-full max-w-[380px] lg:max-w-[500px] h-auto object-contain block"
                style={{
                  maskImage: 'radial-gradient(ellipse at center, black 45%, transparent 100%)',
                  WebkitMaskImage: 'radial-gradient(ellipse at center, black 45%, transparent 100%)',
                }}
                priority
              />
            </div>

            {/* Mini stat badge — overlaps the image bottom by ~10% */}
            <div
              className="relative z-10 -mt-[36px] lg:-mt-[48px] mx-[32px] flex items-start gap-3 bg-white rounded-[16px] px-4 py-3 border border-slate-100 max-w-[300px]"
              style={{ boxShadow: '0 12px 36px -6px rgba(15, 23, 42, 0.12)' }}
            >
              <div className="w-[38px] h-[38px] rounded-[10px] bg-blue-50 flex items-center justify-center shrink-0 text-blue-600 mt-0.5">
                <TrendingUp size={20} strokeWidth={2.2} />
              </div>
              <p className="text-[13px] text-slate-600 leading-[1.55]">
                Creators who import existing content
                <br />
                launch{' '}
                <span className="font-bold text-blue-600">2x faster</span> on Teyro.
              </p>
            </div>
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
            Do you already have teaching content?
          </h2>
          <p className="text-[15px] lg:text-[16px] text-slate-500 mb-6 lg:mb-8">
            Select all that apply.
          </p>

          {/* ── Card Grid (multi-select) — 2-col mobile, 3-col desktop ── */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 xl:gap-5 w-full xl:max-w-[95%] 2xl:max-w-[90%] mb-[40px]"
          >
            {CONTENT_TYPES.map((content) => {
              const isSel = selected.includes(content.id);
              const isHov = hoveredCard === content.id;
              const isNothingYet = content.id === 'nothing_yet';

              return (
                <motion.button
                  variants={itemVariants}
                  key={content.id}
                  onClick={() => toggle(content.id)}
                  onMouseEnter={() => setHoveredCard(content.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className="relative flex flex-col items-start p-4 sm:p-5 lg:p-[28px_24px_24px_24px] rounded-[12px] sm:rounded-[16px] bg-white cursor-pointer text-left transition-all duration-200 outline-none w-full h-[180px] sm:h-[220px] lg:h-[240px]"
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
                    backgroundColor: isNothingYet && isSel ? '#F0F4FF' : 'white',
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

                  {/* Icon container — top aligned, left aligned */}
                  <div className="mb-3 sm:mb-4">
                    {isNothingYet ? (
                      // "Nothing yet" has a dashed border box icon
                      <div
                        style={{
                          width: '56px',
                          height: '56px',
                          border: '2.5px dashed #CBD5E1',
                          borderRadius: '14px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#94A3B8',
                          backgroundColor: '#F8FAFC',
                        }}
                        className="sm:w-[64px] sm:h-[64px]"
                      >
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="sm:w-[28px] sm:h-[28px]"
                        >
                          <line x1="12" y1="5" x2="12" y2="19" />
                          <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                      </div>
                    ) : (
                      <div
                        className="w-[52px] h-[52px] sm:w-[60px] sm:h-[60px] lg:w-[64px] lg:h-[64px] rounded-[12px] sm:rounded-[14px] lg:rounded-[16px] flex items-center justify-center shrink-0 [&>svg]:w-[26px] [&>svg]:h-[26px] sm:[&>svg]:w-[30px] sm:[&>svg]:h-[30px] lg:[&>svg]:w-[34px] lg:[&>svg]:h-[34px]"
                        style={{
                          backgroundColor: content.iconBg,
                          color: content.iconColor,
                        }}
                      >
                        {content.icon}
                      </div>
                    )}
                  </div>

                  {/* Label */}
                  <p className="text-[14px] sm:text-[16px] lg:text-[17px] font-bold text-slate-900 mb-1 lg:mb-2 leading-[1.3] w-full">
                    {content.label}
                  </p>

                  {/* Description */}
                  <p className="text-[11px] sm:text-[13px] lg:text-[14px] text-slate-500 m-0 leading-[1.45] font-normal w-full line-clamp-2">
                    {content.description}
                  </p>
                </motion.button>
              );
            })}
          </motion.div>

          {/* ── Bottom Banner Card ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 rounded-[16px] sm:rounded-[20px] p-5 sm:p-[0_0_0_24px] w-full xl:max-w-[95%] 2xl:max-w-[90%] overflow-hidden"
            style={{
              backgroundColor: '#F2F6FE',
              boxShadow: '0 8px 28px -6px rgba(15, 23, 42, 0.08)',
            }}
          >
            {/* Left: icon + text */}
            <div className="flex items-start sm:items-center gap-3 sm:gap-4 flex-1 py-4 sm:py-5">
              <div className="w-[40px] h-[40px] sm:w-[46px] sm:h-[46px] rounded-[12px] bg-white/80 backdrop-blur-sm flex items-center justify-center shrink-0 text-blue-600">
                <Sparkles size={22} strokeWidth={2} />
              </div>
              <div>
                <p className="text-[14px] sm:text-[15px] font-bold text-blue-600 mb-[2px]">
                  No worries if you&apos;re just getting started!
                </p>
                <p className="text-[13px] sm:text-[14px] text-slate-700 leading-[1.55]">
                  Teyro has AI tools to help you create amazing content from scratch.
                </p>
              </div>
            </div>

            {/* Right: robot image */}
            <div className="hidden sm:block shrink-0 w-[140px] lg:w-[200px] xl:w-[240px] h-[100px] relative">
              <Image
                src="/Teyro Creator Onbarding flow/CF_ST6_bottom_img_2.png"
                alt="Teyro AI robot"
                fill
                className="object-contain object-right"
                style={{
                  maskImage: 'radial-gradient(ellipse at 60% 50%, black 35%, transparent 90%)',
                  WebkitMaskImage: 'radial-gradient(ellipse at 60% 50%, black 35%, transparent 90%)',
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* ═══ BOTTOM BAR ═══ */}
      <div className="flex flex-row items-center justify-between p-3 sm:p-4 lg:p-[16px_32px] border-t border-slate-200 shrink-0 bg-[#F1EDFC] gap-4 sm:gap-0 mt-auto sticky bottom-0 z-50">
        {/* Back */}
        <button
          onClick={() => router.push('/creator/onboarding/5')}
          className="flex items-center justify-center sm:justify-start gap-2 text-[16px] font-medium text-blue-600 bg-transparent border-none cursor-pointer py-2 px-4 sm:-ml-4 w-auto shrink-0"
        >
          <ArrowLeft size={18} strokeWidth={2.5} />
          Back
        </button>

        {/* Trust badge */}
        <div className="hidden md:flex items-center gap-2 text-slate-500 text-[13.5px] font-medium text-center">
          <ShieldCheck size={18} />
          Your information is secure and will never be shared.
        </div>

        {/* Continue button — always enabled */}
        <button
          onClick={handleContinue}
          disabled={isLoading}
          className={`flex items-center justify-center gap-[10px] flex-1 sm:flex-none sm:w-[180px] h-[56px] rounded-[14px] text-white text-[16.5px] font-semibold border-none transition-all duration-200 ${
            isLoading
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
