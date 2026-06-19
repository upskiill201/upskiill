'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft, ArrowRight, ShieldCheck,
  BarChart2, MessageSquare, DollarSign, Users,
  AlertCircle, UserPlus, Trophy, ListChecks, Lightbulb,
} from 'lucide-react';
import { useOnboardingGuard } from '@/hooks/useOnboardingGuard';
import { getOnboardingData, saveOnboardingStep } from '@/lib/onboarding';
import posthog from 'posthog-js';
import { leftPanelVariants, rightPanelVariants, cardHover, cardTap, checkmarkBounce } from '@/lib/animations';

import { motion, AnimatePresence } from 'framer-motion';

// ── Challenge definitions ─────────────────────────────────────────────────────
const CHALLENGES = [
  {
    id: 'learners_dont_finish',
    icon: <BarChart2 strokeWidth={2} style={{ transform: 'scaleX(-1)' }} />,
    iconBg: '#FFF0F2',
    iconColor: '#E11D48',
    label: "Learners don't finish",
    description: "Many start but don't complete my courses.",
  },
  {
    id: 'low_engagement',
    icon: <MessageSquare strokeWidth={2} />,
    iconBg: '#EFF9FF',
    iconColor: '#0EA5E9',
    label: 'Low engagement',
    description: "Learners don't interact or participate enough.",
  },
  {
    id: 'low_revenue',
    icon: <DollarSign strokeWidth={2} />,
    iconBg: '#EDFDF5',
    iconColor: '#059669',
    label: 'Low revenue',
    description: "I'm not earning enough from my courses.",
  },
  {
    id: 'hard_to_build_community',
    icon: <Users strokeWidth={2} />,
    iconBg: '#FFF7ED',
    iconColor: '#EA580C',
    label: 'Hard to build community',
    description: 'I struggle to create and grow an active community.',
  },
  {
    id: 'no_accountability',
    icon: <AlertCircle strokeWidth={2} />,
    iconBg: '#FFF0F2',
    iconColor: '#E11D48',
    label: 'No accountability',
    description: 'Learners lack motivation and follow-through.',
  },
  {
    id: 'difficult_onboarding',
    icon: <UserPlus strokeWidth={2} />,
    iconBg: '#F3EFFE',
    iconColor: '#7C3AED',
    label: 'Difficult onboarding',
    description: 'Getting new learners started is hard.',
  },
  {
    id: 'too_much_competition',
    icon: <Trophy strokeWidth={2} />,
    iconBg: '#EFF9FF',
    iconColor: '#2563EB',
    label: 'Too much competition',
    description: "It's hard to stand out in a crowded market.",
  },
  {
    id: 'hard_to_stay_organized',
    icon: <ListChecks strokeWidth={2} />,
    iconBg: '#EDFDF5',
    iconColor: '#059669',
    label: 'Hard to stay organized',
    description: 'Managing content, learners and tasks is overwhelming.',
  },
];

// ── Animation Variants ────────────────────────────────────────────────────────
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
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
export default function StepSevenPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // 🛡️ Step-skip protection — redirect to Step 1 if prior steps not done
  useOnboardingGuard(7);

  // 📖 Restore previous answer on mount
  useEffect(() => {
    const data = getOnboardingData();
    if (data.step7?.biggestChallenge) {
      setSelected(data.step7.biggestChallenge);
    }
    // Track page view
    posthog.capture('onboarding_step_viewed', { step: 7, stepName: 'biggest_challenge' });
  }, []);


  // 💾 Auto-save on selection
  useEffect(() => {
    if (selected && (Array.isArray(selected) ? selected.length > 0 : true)) {
      saveOnboardingStep(7, { biggestChallenge: selected });
    }
  }, [selected]);

  const handleContinue = async () => {
    setIsLoading(true);
    try {
      const draftId = localStorage.getItem('teyro_onboarding_draft_id');
      if (draftId && !draftId.startsWith('local_')) {
        await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/creator-onboarding/${draftId}`,
          {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ biggestChallenge: selected }),
          }
        );
      } else {
        const existing = JSON.parse(localStorage.getItem('teyro_onboarding_data') || '{}');
        localStorage.setItem(
          'teyro_onboarding_data',
          JSON.stringify({ ...existing, biggestChallenge: selected })
        );
      }
    } catch {
      const existing = JSON.parse(localStorage.getItem('teyro_onboarding_data') || '{}');
      localStorage.setItem(
        'teyro_onboarding_data',
        JSON.stringify({ ...existing, biggestChallenge: selected })
      );
    } finally {
      setIsLoading(false);
      saveOnboardingStep(7, { biggestChallenge: selected });
      posthog.capture('onboarding_step_completed', { step: 7 });
      router.push('/creator/onboarding/8');
    }
  };

  return (
    <motion.div initial="hidden" animate="show" className="flex flex-col w-full max-w-[1761px] mx-auto min-h-[calc(100vh-88px)]">
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
              Let&apos;s tackle what&apos;s
              <br className="hidden sm:block" />
              <span className="text-blue-600"> holding you back</span>
            </h1>

            {/* Decorative Blue Line */}
            <div className="w-[50px] h-[2px] bg-blue-600 rounded-full mt-6 mb-6 lg:mt-8 lg:mb-8" />

            {/* Description */}
            <p className="text-base sm:text-lg xl:text-[20px] text-gray-600 mb-4 leading-relaxed max-w-[480px]">
              Understanding your biggest
              <br className="hidden sm:block" />
              challenge helps Teyro give you
              <br className="hidden sm:block" />
              the right tools and support.
            </p>
          </div>

          {/* 3D Illustration + overlapping stat badge */}
          <div className="w-full flex flex-col items-center lg:items-start shrink-0 mt-4 lg:mt-2 hidden sm:flex overflow-visible relative">
            <div className="w-full flex justify-center lg:justify-start">
              <Image
                src="/Teyro Creator Onbarding flow/CF_ST7_side_img.png"
                alt="Creator thinking about challenges"
                width={550}
                height={480}
                className="w-full max-w-[380px] lg:max-w-[500px] h-auto object-contain block"
                style={{
                  maskImage: 'radial-gradient(ellipse at center, black 50%, transparent 100%)',
                  WebkitMaskImage: 'radial-gradient(ellipse at center, black 50%, transparent 100%)',
                }}
                priority
              />
            </div>

            {/* Mini stat badge — overlaps image bottom by ~10% */}
            <div
              className="relative z-10 -mt-[36px] lg:-mt-[48px] mx-[32px] flex items-start gap-3 bg-white rounded-[16px] px-4 py-3 border border-slate-100 max-w-[310px]"
              style={{ boxShadow: '0 12px 36px -6px rgba(15, 23, 42, 0.12)' }}
            >
              <div className="w-[38px] h-[38px] rounded-[10px] bg-violet-50 flex items-center justify-center shrink-0 text-violet-600 mt-0.5">
                <Lightbulb size={20} strokeWidth={2.2} />
              </div>
              <p className="text-[13px] text-slate-600 leading-[1.55]">
                You&apos;re not alone. 76% of creators
                <br />
                face at least one of these challenges.
                <br />
                <span className="font-bold text-blue-600">Teyro is built to help you overcome them.</span>
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
            What&apos;s your biggest challenge right now?
          </h2>
          <p className="text-[15px] lg:text-[16px] text-slate-500 mb-6 lg:mb-8">
            Select the one that impacts you the most.
          </p>

          {/* ── Card Grid (single-select) — 2-col mobile, 4-col desktop ── */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4 xl:gap-5 w-full xl:max-w-[95%] 2xl:max-w-[90%] mb-[40px]"
          >
            {CHALLENGES.map((challenge) => {
              const isSel = selected === challenge.id;
              const isHov = hoveredCard === challenge.id;

              return (
                <motion.button
                  variants={itemVariants}
                  whileHover={cardHover}
                  whileTap={cardTap}
                  key={challenge.id}
                  onClick={() => setSelected(challenge.id)}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelected(challenge.id); } }}
                  role="checkbox"
                  aria-checked={isSel}
                  onMouseEnter={() => setHoveredCard(challenge.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className="relative flex flex-col items-start p-4 sm:p-5 lg:p-[28px_20px_24px_20px] rounded-[12px] sm:rounded-[16px] bg-white cursor-pointer text-left transition-all duration-200 outline-none w-full h-[180px] sm:h-[210px] lg:h-[230px]"
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

                  {/* Icon container */}
                  <div
                    className="w-[52px] h-[52px] sm:w-[58px] sm:h-[58px] lg:w-[64px] lg:h-[64px] rounded-[12px] sm:rounded-[14px] lg:rounded-[16px] flex items-center justify-center shrink-0 mb-3 sm:mb-4 [&>svg]:w-[26px] [&>svg]:h-[26px] sm:[&>svg]:w-[30px] sm:[&>svg]:h-[30px] lg:[&>svg]:w-[32px] lg:[&>svg]:h-[32px]"
                    style={{
                      backgroundColor: challenge.iconBg,
                      color: challenge.iconColor,
                    }}
                  >
                    {challenge.icon}
                  </div>

                  {/* Label */}
                  <p className="text-[13px] sm:text-[15px] lg:text-[16px] font-bold text-slate-900 mb-1 lg:mb-2 leading-[1.3] w-full">
                    {challenge.label}
                  </p>

                  {/* Description */}
                  <p className="text-[11px] sm:text-[12px] lg:text-[13px] text-slate-500 m-0 leading-[1.45] font-normal w-full line-clamp-2">
                    {challenge.description}
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
              backgroundColor: '#F3EFFE',
              boxShadow: '0 8px 28px -6px rgba(124, 58, 237, 0.08)',
            }}
          >
            {/* Left: icon + text */}
            <div className="flex items-start sm:items-center gap-3 sm:gap-4 flex-1 py-4 sm:py-5">
              <div className="w-[40px] h-[40px] sm:w-[46px] sm:h-[46px] rounded-[12px] bg-white/80 backdrop-blur-sm flex items-center justify-center shrink-0 text-violet-600">
                {/* Sparkle / 4-point star matching design */}
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2 L13.5 10.5 L22 12 L13.5 13.5 L12 22 L10.5 13.5 L2 12 L10.5 10.5 Z" />
                </svg>
              </div>
              <div>
                <p className="text-[14px] sm:text-[15px] font-bold text-violet-600 mb-[2px]">
                  Great creators don&apos;t do it alone.
                </p>
                <p className="text-[13px] sm:text-[14px] text-slate-700 leading-[1.55]">
                  Teyro helps you solve these challenges with AI, strategy and the right tools.
                </p>
              </div>
            </div>

            {/* Right: target/dartboard image */}
            <div className="hidden sm:block shrink-0 w-[140px] lg:w-[200px] xl:w-[240px] h-[100px] relative">
              <Image
                src="/Teyro Creator Onbarding flow/CF_ST7_bottom_img.png"
                alt="Target your challenges"
                fill
                className="object-contain object-right"
                style={{
                  maskImage: 'radial-gradient(ellipse at 60% 50%, black 40%, transparent 92%)',
                  WebkitMaskImage: 'radial-gradient(ellipse at 60% 50%, black 40%, transparent 92%)',
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* ═══ BOTTOM BAR ═══ */}
      <div className="flex flex-row items-center justify-between p-3 sm:p-4 lg:p-[16px_32px] border-t border-slate-200 shrink-0 bg-transparent gap-4 sm:gap-0 mt-auto sticky bottom-0 z-50">
        {/* Back */}
        <button
          onClick={() => router.push('/creator/onboarding/6')}
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

        {/* Continue button */}
        <button
          onClick={handleContinue}
          disabled={!selected || isLoading}
          className={`flex items-center justify-center gap-[10px] flex-1 sm:flex-none sm:w-[180px] h-[56px] rounded-[14px] text-white text-[16.5px] font-semibold border-none transition-all duration-200 ${
            !selected || isLoading
              ? 'bg-blue-300 cursor-not-allowed'
              : 'bg-blue-600 cursor-pointer shadow-[0_4px_14px_rgba(37,99,235,0.3)] hover:bg-blue-700'
          }`}
        >
          {isLoading ? 'Saving...' : 'Continue'}
          {!isLoading && <ArrowRight size={18} strokeWidth={2.5} />}
        </button>
      </div>
    </motion.div>
  );
}
