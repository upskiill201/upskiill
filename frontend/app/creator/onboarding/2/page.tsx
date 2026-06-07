'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, ArrowRight, ShieldCheck, 
  PlaySquare, MonitorPlay, UserPlus, GraduationCap, 
  BookOpen, Users, Briefcase, Building2 
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useOnboardingGuard } from '@/hooks/useOnboardingGuard';
import { getOnboardingData, saveOnboardingStep } from '@/lib/onboarding';
import posthog from 'posthog-js';

const CREATOR_TYPES = [
  {
    id: 'course_creator',
    icon: <PlaySquare size={38} strokeWidth={2.2} />,
    label: 'Course creator',
    description: 'I create and sell online courses.',
  },
  {
    id: 'youtube_educator',
    icon: <MonitorPlay size={38} strokeWidth={2.2} />,
    label: 'YouTube educator',
    description: 'I teach and grow my audience on YouTube.',
  },
  {
    id: 'coach',
    icon: <UserPlus size={38} strokeWidth={2.2} />,
    label: 'Coach',
    description: 'I offer coaching and help people achieve their goals.',
  },
  {
    id: 'teacher',
    icon: <GraduationCap size={38} strokeWidth={2.2} />,
    label: 'Teacher',
    description: 'I teach students (online or offline).',
  },
  {
    id: 'mentor',
    icon: <BookOpen size={38} strokeWidth={2.2} />,
    label: 'Mentor',
    description: 'I guide and mentor individuals.',
  },
  {
    id: 'community_educator',
    icon: <Users size={38} strokeWidth={2.2} />,
    label: 'Community educator',
    description: 'I build and educate communities.',
  },
  {
    id: 'freelancer',
    icon: <Briefcase size={38} strokeWidth={2.2} />,
    label: 'Freelancer teaching skills',
    description: 'I teach skills as a freelancer.',
  },
  {
    id: 'agency_educator',
    icon: <Building2 size={38} strokeWidth={2.2} />,
    label: 'Agency educator',
    description: 'I represent an agency or teach on behalf of a brand.',
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

export default function StepTwoPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // 🛡️ Step-skip protection — redirect to Step 1 if prior steps not done
  useOnboardingGuard(2);

  // 📖 Restore previous answer on mount
  useEffect(() => {
    const data = getOnboardingData();
    if (data.step2?.creatorType) {
      setSelected(data.step2.creatorType);
    }
    // Track page view
    posthog.capture('onboarding_step_viewed', { step: 2, stepName: 'creator_type' });
  }, []);

  // ✅ Validation — Continue button disabled until a selection is made
  const isValid = selected !== null;

  const handleSelect = (id: string) => {
    setSelected(id);
    saveOnboardingStep(2, { creatorType: id });
  };


  // 💾 Auto-save on selection
  useEffect(() => {
    if (selected && (Array.isArray(selected) ? selected.length > 0 : true)) {
      saveOnboardingStep(2, { creatorType: selected });
    }
  }, [selected]);

  const handleContinue = async () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      posthog.capture('onboarding_step_completed', { step: 2 });
      router.push('/creator/onboarding/3');
    }, 600);
  };

  return (
    <div className="flex flex-col w-full max-w-[1761px] mx-auto min-h-[calc(100vh-88px)] lg:h-[calc(100vh-88px)]">
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
              Let&apos;s personalize
              <br className="hidden sm:block" />
              <span className="text-blue-600"> your creator journey.</span>
            </h1>

            {/* Decorative Horizontal Blue Line */}
            <div className="w-[50px] h-[2px] bg-blue-600 rounded-full mt-6 mb-6 lg:mt-8 lg:mb-8" />

            {/* Description */}
            <p className="text-base sm:text-lg xl:text-[20px] text-gray-600 mb-8 lg:mb-10 leading-relaxed max-w-[480px]">
              This helps us customize Teyro{' '}
              <br className="hidden sm:block" />
              around <span className="font-semibold text-blue-600">your goals</span> and how{' '}
              <br className="hidden sm:block" />
              you teach.
            </p>
          </div>

          {/* 3D Illustration */}
          <div className="w-full flex justify-center lg:justify-start items-end shrink-0 mt-2 lg:mt-5 hidden sm:flex">
            <Image
              src="/onboarding-step2-dashboard.png"
              alt="Creator Dashboard"
              width={550}
              height={440}
              className="w-full max-w-[400px] lg:max-w-[550px] h-auto object-contain block"
              style={{
                maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 100%)',
                WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 100%)',
              }}
              priority
            />
          </div>
        </motion.div>

        {/* ──── RIGHT PANEL ──── */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
          className="w-full lg:w-[70%] flex flex-col overflow-y-auto lg:overflow-visible pb-8 lg:pb-0"
        >
          {/* Section heading */}
          <h1 className="text-[24px] lg:text-[28px] font-bold text-slate-900 mb-2">
            What best describes you?
          </h1>
          <p className="text-[15px] lg:text-[16px] text-slate-500 mb-6 lg:mb-8">
            Choose the option that fits you the most.
          </p>

          {/* ── Card Grid ── */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-2 xl:grid-cols-4 gap-y-3 gap-x-3 sm:gap-y-5 sm:gap-x-5 xl:gap-y-7 xl:gap-x-6 w-full xl:max-w-[95%] 2xl:max-w-[80%] flex-1 min-h-0 pb-4"
          >
            {CREATOR_TYPES.map((type) => {
              const isSelected = selected === type.id;
              const isHovered = hoveredCard === type.id;
              return (
                <motion.button
                  key={type.id}
                  variants={itemVariants}
                  onClick={() => handleSelect(type.id)}
                  onMouseEnter={() => setHoveredCard(type.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleSelect(type.id); }}
                  role="radio"
                  aria-checked={isSelected}
                  className="relative flex flex-col items-start gap-3 p-4 sm:p-5 rounded-[16px] border-[2px] text-left cursor-pointer transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 min-h-[44px]"
                  style={{
                    borderColor: isSelected ? '#2563EB' : isHovered ? '#93C5FD' : '#E5E7EB',
                    background: isSelected ? '#EFF6FF' : isHovered ? '#F8FBFF' : 'white',
                    boxShadow: isSelected
                      ? '0 4px 20px rgba(37, 99, 235, 0.15)'
                      : isHovered
                      ? '0 4px 12px rgba(37, 99, 235, 0.08)'
                      : '0 1px 3px rgba(0,0,0,0.05)',
                  }}
                >
                  <div
                    className="w-[48px] h-[48px] rounded-[12px] flex items-center justify-center shrink-0 transition-colors duration-200"
                    style={{
                      background: isSelected ? '#2563EB' : '#F0F4FF',
                      color: isSelected ? 'white' : '#2563EB',
                    }}
                  >
                    {React.cloneElement(type.icon as React.ReactElement<any>, { size: 22 })}
                  </div>
                  <div>
                    <p className="font-bold text-[14px] sm:text-[15px] text-gray-900 leading-snug mb-1">
                      {type.label}
                    </p>
                    <p className="text-[12px] sm:text-[13px] text-gray-500 leading-snug">
                      {type.description}
                    </p>
                  </div>
                  {isSelected && (
                    <div className="absolute top-3 right-3 w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                        <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  )}
                </motion.button>
              );
            })}
          </motion.div>
        </motion.div>
      </div>

      {/* ═══ BOTTOM BAR ═══ */}
      <div className="flex flex-row items-center justify-between p-3 sm:p-4 lg:p-[16px_32px] border-t border-slate-200 shrink-0 bg-[#F1EDFC] gap-4 sm:gap-0 mt-auto sticky bottom-0 z-50">
        <button
          onClick={() => router.push('/creator/onboarding/1')}
          className="flex items-center justify-center sm:justify-start gap-2 px-6 py-3 bg-white border border-gray-200 shadow-sm rounded-[14px] text-[15px] font-bold text-blue-700 cursor-pointer hover:bg-gray-50 transition-colors"
        >
          <ArrowLeft size={18} strokeWidth={2.5} />
          Back
        </button>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-[13px] text-gray-400 font-medium">
            <ShieldCheck size={15} />
            Your progress is auto-saved
          </div>
          <button
            onClick={handleContinue}
            disabled={!isValid || isLoading}
            className="flex items-center gap-2 px-8 py-3 rounded-[14px] text-[15px] font-bold transition-all duration-200 border-none"
            style={{
              background: isValid ? '#2563EB' : '#E5E7EB',
              color: isValid ? 'white' : '#9CA3AF',
              cursor: isValid ? 'pointer' : 'not-allowed',
              boxShadow: isValid ? '0 4px 14px rgba(37, 99, 235, 0.3)' : 'none',
            }}
          >
            {isLoading ? 'Saving...' : 'Continue'}
            <ArrowRight size={18} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
  );
}
