'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft, ArrowRight, ShieldCheck, TrendingUp, Users, MessageSquare, CircleDollarSign, Star, Gift
} from 'lucide-react';
import { motion } from 'framer-motion';

const BENEFITS = [
  {
    id: 'completion',
    icon: TrendingUp,
    iconColor: 'text-[#7C3AED]',
    iconBg: 'bg-[#F3EFFE]',
    title: 'Increase learner completion',
    description: 'AI-guided learning paths keep learners on track and help them finish what they start.',
  },
  {
    id: 'engagement',
    icon: Users,
    iconColor: 'text-[#2563EB]',
    iconBg: 'bg-[#EFF6FF]',
    title: 'Improve engagement',
    description: 'Interactive content, smart nudges and AI insights keep learners actively involved.',
  },
  {
    id: 'community',
    icon: MessageSquare,
    iconColor: 'text-[#059669]',
    iconBg: 'bg-[#EDFDF5]',
    title: 'Grow community',
    description: 'Built-in communities and discussions turn learners into loyal advocates.',
  },
  {
    id: 'revenue',
    icon: CircleDollarSign,
    iconColor: 'text-[#D97706]',
    iconBg: 'bg-[#FFFBEB]',
    title: 'Build recurring revenue',
    description: 'Subscriptions, cohorts and digital products help you earn consistently.',
  },
  {
    id: 'loyalty',
    icon: Star,
    iconColor: 'text-[#E11D48]',
    iconBg: 'bg-[#FFF0F2]',
    title: 'Create long-term learner loyalty',
    description: 'Better outcomes build trust, reputation and lasting relationships.',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  show: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring' as const, stiffness: 300, damping: 24 },
  },
};

export default function StepNinePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleContinue = async () => {
    setIsLoading(true);
    // Usually we save step data here, but this is an informational step
    // so we can just proceed to the next step (step 10)
    setTimeout(() => {
      setIsLoading(false);
      router.push('/creator/onboarding/10');
    }, 600);
  };

  return (
    <div className="flex flex-col w-full max-w-[1761px] mx-auto min-h-[calc(100vh-88px)]">
      {/* ═══ MAIN CONTENT AREA ═══ */}
      <div className="flex flex-col flex-1 overflow-hidden min-h-0 pt-8 px-6 lg:pt-[48px] lg:px-[32px]">
        
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 w-full max-w-[1500px] mx-auto h-full max-h-[calc(100vh-180px)]">
          {/* ──── LEFT PANEL ──── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="w-full lg:w-[30%] shrink-0 flex flex-col lg:-ml-[32px]"
          >
            <div className="lg:ml-[32px]">
              <h1 className="font-extrabold tracking-tight text-gray-900 text-[28px] lg:text-[36px] leading-[1.15] mb-4">
                Your expertise
                <br className="hidden sm:block" />
                deserves more than
                <br className="hidden sm:block" />
                <span className="text-violet-700">unfinished courses.</span>
              </h1>

              {/* Decorative Blue Line */}
              <div className="w-[50px] h-[2px] bg-violet-700 rounded-full mb-4" />

              {/* Description */}
              <p className="text-[15px] lg:text-[16px] text-slate-600 mb-6 leading-relaxed max-w-[500px]">
                Teyro gives you everything you need to create learning experiences that transform learners and grow your creator business.
              </p>
            </div>

            {/* Benefits List */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="flex flex-col gap-4 lg:gap-5 lg:ml-[32px]"
            >
              {BENEFITS.map((benefit) => (
                <motion.div variants={itemVariants} key={benefit.id} className="flex items-start gap-3 lg:gap-4">
                  <div className={`w-[42px] h-[42px] lg:w-[48px] lg:h-[48px] shrink-0 rounded-[12px] flex items-center justify-center ${benefit.iconBg} ${benefit.iconColor}`}>
                    <benefit.icon size={20} className="lg:w-[24px] lg:h-[24px]" strokeWidth={2} />
                  </div>
                  <div className="flex flex-col pt-0.5">
                    <h3 className="text-[15px] lg:text-[16px] font-bold text-slate-900 mb-0.5">
                      {benefit.title}
                    </h3>
                    <p className="text-[13px] lg:text-[14px] text-slate-500 leading-relaxed max-w-[420px]">
                      {benefit.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* ──── RIGHT PANEL (Illustration & Bottom Card) ──── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
            className="w-full lg:w-[70%] flex flex-col mt-8 lg:mt-0 relative h-full min-h-[600px] max-h-full"
          >
            <div className="relative w-full flex-1 min-h-[450px] flex items-center justify-center scale-[1.35] z-0">
              <Image
                src="/Teyro Creator Onbarding flow/CF_ST9_side_img.png"
                alt="Teyro Creator Journey"
                fill
                className="object-contain lg:object-center"
                style={{
                  maskImage: 'radial-gradient(ellipse 65% 65% at 50% 50%, black 15%, transparent 90%)',
                  WebkitMaskImage: 'radial-gradient(ellipse 65% 65% at 50% 50%, black 15%, transparent 90%)',
                }}
                priority
              />
            </div>

            {/* ── Bottom Banner Card (Inside Right Panel) ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="absolute bottom-[-150px] left-1/2 -translate-x-1/2 w-full h-auto max-w-[95%] lg:max-w-[85%] flex flex-col sm:flex-row items-center gap-4 sm:gap-6 rounded-[16px] sm:rounded-[20px] p-3 sm:p-[0_0_0_24px] overflow-hidden shrink-0 z-10"
              style={{
                backgroundColor: '#F3EFFE',
                boxShadow: '0 8px 28px -6px rgba(124, 58, 237, 0.08)',
              }}
            >
              {/* Left: icon + text */}
              <div className="flex items-center gap-4 lg:gap-5 flex-1 py-4 sm:py-6 z-10">
                <div className="w-[46px] h-[46px] lg:w-[52px] lg:h-[52px] rounded-[14px] bg-white shadow-sm flex items-center justify-center shrink-0 text-violet-600">
                  <Gift size={24} strokeWidth={2} />
                </div>
                <div className="flex flex-col">
                  <p className="text-[15px] lg:text-[17px] font-bold text-violet-700 leading-snug">
                    You&apos;re building more than courses.
                  </p>
                  <p className="text-[14px] lg:text-[16px] text-violet-600/80 font-medium mt-1">
                    You&apos;re building a legacy.
                  </p>
                </div>
              </div>

              {/* Right: celebration illustration */}
              <div className="hidden sm:block shrink-0 relative w-[180px] lg:w-[220px] self-stretch mr-4 lg:mr-8 z-0">
                <Image
                  src="/Teyro Creator Onbarding flow/CF_ST9_bottom_img.png"
                  alt="Celebration"
                  fill
                  className="object-contain object-right scale-[1.3] translate-y-[-10%]"
                  style={{
                    maskImage: 'radial-gradient(ellipse at center, black 25%, transparent 85%)',
                    WebkitMaskImage: 'radial-gradient(ellipse at center, black 25%, transparent 85%)',
                  }}
                />
              </div>
            </motion.div>
          </motion.div>
        </div>

      </div>

      {/* ═══ BOTTOM BAR ═══ */}
      <div className="flex flex-col-reverse sm:flex-row items-center justify-between p-6 lg:p-[24px_32px] border-t border-slate-200 shrink-0 bg-white gap-4 sm:gap-0 mt-auto sticky bottom-0 z-50">
        {/* Back */}
        <button
          onClick={() => router.push('/creator/onboarding/8')}
          className="flex items-center justify-center sm:justify-start gap-2 text-[16px] font-medium text-violet-600 bg-transparent border-none cursor-pointer py-2 px-4 sm:-ml-4 w-full sm:w-auto hover:text-violet-700 transition-colors"
        >
          <ArrowLeft size={18} strokeWidth={2.5} />
          Back
        </button>

        {/* Trust badge */}
        <div className="hidden md:flex items-center gap-2 text-slate-500 text-[13.5px] font-medium text-center">
          <ShieldCheck size={18} />
          Your information is secure and will never be shared.
        </div>

        {/* Continue */}
        <button
          onClick={handleContinue}
          disabled={isLoading}
          className={`flex items-center justify-center gap-[10px] w-full sm:w-[180px] h-[56px] rounded-[14px] text-white text-[16.5px] font-semibold border-none transition-all duration-200 ${
            isLoading
              ? 'bg-violet-300 cursor-not-allowed'
              : 'bg-violet-600 cursor-pointer shadow-[0_4px_14px_rgba(124,58,237,0.3)] hover:bg-violet-700 hover:shadow-[0_6px_20px_rgba(124,58,237,0.4)] hover:-translate-y-[1px]'
          }`}
        >
          {isLoading ? 'Loading...' : 'Continue'}
          {!isLoading && <ArrowRight size={18} strokeWidth={2.5} />}
        </button>
      </div>
    </div>
  );
}
