'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft, ArrowRight, ShieldCheck,
  Palette, Code2, Brain, Megaphone,
  Briefcase, DollarSign, Film, CheckSquare,
  MessageCircle, Music, MoreHorizontal,
} from 'lucide-react';
import { motion } from 'framer-motion';

// ── Category definitions ────────────────────────────────────────────────────
const CATEGORIES = [
  {
    id: 'design',
    icon: <Palette size={38} strokeWidth={2} />,
    iconBg: '#F3EFFE',
    iconColor: '#7C3AED',
    label: 'Design',
    description: 'UI/UX, Graphic Design, Illustration & more',
  },
  {
    id: 'programming',
    icon: <Code2 size={38} strokeWidth={2} />,
    iconBg: '#ECFDF5',
    iconColor: '#059669',
    label: 'Programming',
    description: 'Web, Mobile, Software Development & more',
  },
  {
    id: 'ai',
    icon: <Brain size={38} strokeWidth={2} />,
    iconBg: '#F5F3FF',
    iconColor: '#6D28D9',
    label: 'AI',
    description: 'Artificial Intelligence, ML, ChatGPT & more',
  },
  {
    id: 'marketing',
    icon: <Megaphone size={38} strokeWidth={2} />,
    iconBg: '#FFF1F2',
    iconColor: '#E11D48',
    label: 'Marketing',
    description: 'Digital Marketing, Growth, SEO & more',
  },
  {
    id: 'business',
    icon: <Briefcase size={38} strokeWidth={2} />,
    iconBg: '#FFF7ED',
    iconColor: '#EA580C',
    label: 'Business',
    description: 'Entrepreneurship, Startups, Strategy & more',
  },
  {
    id: 'finance',
    icon: <DollarSign size={38} strokeWidth={2} />,
    iconBg: '#ECFDF5',
    iconColor: '#16A34A',
    label: 'Finance',
    description: 'Investing, Trading, Accounting & more',
  },
  {
    id: 'video_editing',
    icon: <Film size={38} strokeWidth={2} />,
    iconBg: '#FFF1F2',
    iconColor: '#E11D48',
    label: 'Video Editing',
    description: 'Editing, Motion Graphics, YouTube & more',
  },
  {
    id: 'productivity',
    icon: <CheckSquare size={38} strokeWidth={2} />,
    iconBg: '#EFF6FF',
    iconColor: '#2563EB',
    label: 'Productivity',
    description: 'Time Management, Tools, Habits & more',
  },
  {
    id: 'language',
    icon: <MessageCircle size={38} strokeWidth={2} />,
    iconBg: '#F5F3FF',
    iconColor: '#7C3AED',
    label: 'Language',
    description: 'Learn & Teach Languages',
  },
  {
    id: 'music',
    icon: <Music size={38} strokeWidth={2} />,
    iconBg: '#FEFCE8',
    iconColor: '#D97706',
    label: 'Music',
    description: 'Instruments, Production, Theory & more',
  },
  {
    id: 'other',
    icon: <MoreHorizontal size={38} strokeWidth={2} />,
    iconBg: '#F8FAFC',
    iconColor: '#64748B',
    label: 'Other',
    description: 'Something not listed above',
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

// ── Page Component ──────────────────────────────────────────────────────────
export default function StepThreePage() {
  const router = useRouter();
  const [selected, setSelected] = useState<string[]>([]);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const toggleCategory = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const handleContinue = async () => {
    setIsLoading(true);
    try {
      const draftId = localStorage.getItem('teyro_onboarding_draft_id');
      if (draftId && !draftId.startsWith('local_')) {
        await fetch(`https://upskiill-backend.onrender.com/creator-onboarding/${draftId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ teachingCategories: selected }),
        });
      } else {
        const existing = JSON.parse(localStorage.getItem('teyro_onboarding_data') || '{}');
        localStorage.setItem('teyro_onboarding_data', JSON.stringify({ ...existing, teachingCategories: selected }));
      }
    } catch {
      const existing = JSON.parse(localStorage.getItem('teyro_onboarding_data') || '{}');
      localStorage.setItem('teyro_onboarding_data', JSON.stringify({ ...existing, teachingCategories: selected }));
    } finally {
      setIsLoading(false);
      router.push('/creator/onboarding/4');
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
              Let&apos;s tailor Teyro
              <br className="hidden sm:block" />
              <span className="text-blue-600"> to your expertise.</span>
            </h1>

            {/* Decorative Horizontal Blue Line */}
            <div className="w-[50px] h-[2px] bg-blue-600 rounded-full mt-6 mb-6 lg:mt-8 lg:mb-8" />

            {/* Description */}
            <p className="text-base sm:text-lg xl:text-[20px] text-gray-600 mb-8 lg:mb-10 leading-relaxed max-w-[480px]">
              This helps us personalize your{' '}
              <br className="hidden sm:block" />
              experience and recommendations{' '}
              <br className="hidden sm:block" />
              for your teaching journey.
            </p>
          </div>

          {/* 3D Illustration */}
          <div className="w-full flex justify-center lg:justify-start items-end shrink-0 mt-2 lg:mt-5 hidden sm:flex">
            <Image
              src="/onboarding-step3-cube.png"
              alt="Creator Expertise"
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
          className="w-full lg:w-[70%] flex flex-col pb-8 lg:pb-12"
        >
          {/* Section heading */}
          <h1 className="text-[24px] lg:text-[28px] font-bold text-slate-900 mb-2">
            What do you teach?
          </h1>
          <p className="text-[15px] lg:text-[16px] text-slate-500 mb-6 lg:mb-8">
            Select all categories that match your expertise.
          </p>

          {/* ── Card Grid (multi-select) ── */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-2 xl:grid-cols-4 gap-y-3 gap-x-3 sm:gap-y-5 sm:gap-x-5 xl:gap-y-7 xl:gap-x-6 w-full xl:max-w-[95%] 2xl:max-w-[80%] flex-1 min-h-0 pb-4"
          >
            {CATEGORIES.map((cat) => {
              const isSel = selected.includes(cat.id);
              const isHov = hoveredCard === cat.id;

              return (
                <motion.button
                  variants={itemVariants}
                  key={cat.id}
                  onClick={() => toggleCategory(cat.id)}
                  onMouseEnter={() => setHoveredCard(cat.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className="relative flex flex-col items-center p-3 sm:p-5 lg:p-[32px_24px_28px_24px] rounded-[12px] sm:rounded-[16px] bg-white cursor-pointer text-center transition-all duration-200 outline-none w-full h-[160px] sm:h-[220px] lg:h-[230px]"
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
                  {/* Checkmark badge (multi-select: shown when selected) */}
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

                  {/* Colored icon container */}
                  <div
                    className="w-[36px] h-[36px] sm:w-[52px] sm:h-[52px] lg:w-[60px] lg:h-[60px] rounded-[8px] sm:rounded-[12px] lg:rounded-[14px] flex items-center justify-center shrink-0 mb-2 sm:mb-3 [&>svg]:w-[18px] [&>svg]:h-[18px] sm:[&>svg]:w-[26px] sm:[&>svg]:h-[26px] lg:[&>svg]:w-[32px] lg:[&>svg]:h-[32px]"
                    style={{ backgroundColor: cat.iconBg, color: cat.iconColor }}
                  >
                    {cat.icon}
                  </div>

                  {/* Label */}
                  <p className="text-[12px] sm:text-[15px] lg:text-[16px] font-bold text-slate-900 mb-0.5 lg:mb-1.5 leading-[1.3] w-full">
                    {cat.label}
                  </p>

                  {/* Description */}
                  <p className="text-[10px] sm:text-[12px] lg:text-[13px] text-slate-500 m-0 leading-[1.3] font-normal w-full line-clamp-2">
                    {cat.description}
                  </p>
                </motion.button>
              );
            })}
          </motion.div>
        </motion.div>
      </div>

      {/* ═══ BOTTOM BAR ═══ */}
      <div className="flex flex-col-reverse sm:flex-row items-center justify-between p-6 lg:p-[24px_32px] border-t border-slate-200 shrink-0 bg-white gap-4 sm:gap-0 mt-auto sticky bottom-0 z-50">
        {/* Back */}
        <button
          onClick={() => router.push('/creator/onboarding/2')}
          className="flex items-center justify-center sm:justify-start gap-2 text-[16px] font-medium text-blue-600 bg-transparent border-none cursor-pointer py-2 px-4 sm:-ml-4 w-full sm:w-auto"
        >
          <ArrowLeft size={18} strokeWidth={2.5} />
          Back
        </button>

        {/* Info badge */}
        <div className="hidden md:flex items-center gap-2 text-slate-500 text-[13.5px] font-medium text-center">
          <ShieldCheck size={18} />
          You can update this later from your creator settings.
        </div>

        {/* Continue button — always enabled (categories are optional) */}
        <button
          onClick={handleContinue}
          disabled={isLoading}
          className={`flex items-center justify-center gap-[10px] w-full sm:w-[180px] h-[56px] rounded-[14px] text-white text-[16.5px] font-semibold border-none transition-all duration-200 ${
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
