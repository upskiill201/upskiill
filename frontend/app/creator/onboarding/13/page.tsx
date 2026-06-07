'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, ShieldCheck, Check, Sparkles, UserX, Clock, Star, BarChart3 } from 'lucide-react';
import { useOnboardingGuard } from '@/hooks/useOnboardingGuard';
import { getOnboardingData, saveOnboardingStep } from '@/lib/onboarding';
import posthog from 'posthog-js';
import { motion, Variants } from 'framer-motion';

const OPTIONS = [
  {
    id: 'yes',
    title: 'Yes',
    description: 'Build a community where learners can connect, ask questions, share wins and support each other.',
    isRecommended: true,
  },
  {
    id: 'no',
    title: 'No',
    description: 'I prefer to keep my courses without a community for now.',
    isRecommended: false,
  },
  {
    id: 'maybe',
    title: 'Maybe later',
    description: "I'm not sure right now. I'll decide later.",
    isRecommended: false,
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

export default function StepThirteenPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // 🛡️ Step-skip protection — redirect to Step 1 if prior steps not done
  useOnboardingGuard(13);

  // 📖 Restore previous answer on mount
  useEffect(() => {
    const data = getOnboardingData();
    if (data.step13?.communityOption) {
      setSelectedId(data.step13.communityOption);
    }
    // Track page view
    posthog.capture('onboarding_step_viewed', { step: 13, stepName: 'community_option' });
  }, []);
  const [selectedId, setSelectedId] = useState<string | null>(null);


  // 💾 Auto-save on selection
  useEffect(() => {
    if (selectedId && (Array.isArray(selectedId) ? selectedId.length > 0 : true)) {
      saveOnboardingStep(13, { communityOption: selectedId });
    }
  }, [selectedId]);

  const handleContinue = async () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      saveOnboardingStep(13, { communityOption: selectedId });
      posthog.capture('onboarding_step_completed', { step: 13 });
      router.push('/creator/onboarding/14');
    }, 600);
  };

  return (
    <div className="flex flex-col w-full max-w-[1761px] mx-auto min-h-[calc(100vh-88px)]">
      {/* ═══ MAIN CONTENT AREA ═══ */}
      <div className="flex flex-col flex-1 overflow-y-auto lg:overflow-hidden min-h-0 overflow-x-hidden pt-0 px-6 lg:pt-0 lg:px-[32px]">
        
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 w-full max-w-[1600px] mx-auto h-full flex-1">
          {/* ──── LEFT PANEL ──── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="w-full lg:w-[35%] shrink-0 flex flex-col lg:-ml-[32px] h-full"
          >
            <div className="lg:ml-[32px] pt-4 lg:pt-6">
              <h1 className="font-extrabold tracking-tight text-slate-900 text-[28px] lg:text-[38px] leading-[1.15] mb-4">
                Stronger learning happens
                <br className="hidden sm:block" />
                <span className="text-violet-700">together.</span>
              </h1>

              {/* Decorative Line */}
              <div className="w-[50px] h-[2px] bg-violet-700 rounded-full mb-5" />

              {/* Description */}
              <p className="text-[15px] lg:text-[16px] text-slate-600 mb-6 leading-relaxed max-w-[420px]">
                A community helps your learners connect, ask questions, stay motivated and achieve more — together.
              </p>
            </div>

            {/* Illustration */}
            <div className="relative w-full flex-1 min-h-[300px] lg:min-h-[400px] flex flex-col items-center justify-center lg:ml-[32px] mt-[30px] z-0">
              <div className="relative w-full h-[280px] lg:h-[370px]">
                <Image
                  src="/Teyro Creator Onbarding flow/CF_ST13_side_img.png"
                  alt="Community Chat"
                  fill
                  className="object-contain object-bottom scale-[1.05] origin-bottom"
                  style={{
                    maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 90%)',
                    WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 90%)',
                  }}
                  priority
                />
              </div>

              {/* Small Tip Box */}
              <div className="mt-0 lg:mt-2 p-4 rounded-xl border border-slate-100 bg-white/50 backdrop-blur-sm shadow-sm flex items-start gap-4 w-full max-w-[420px]">
                <div className="w-12 h-12 rounded-full bg-violet-600 shrink-0 relative flex items-center justify-center text-white">
                  <BarChart3 size={24} strokeWidth={2.5} />
                </div>
                <div className="flex flex-col pt-0.5">
                  <p className="text-[13px] text-slate-600 font-medium leading-snug">
                    Courses with active communities see
                  </p>
                  <p className="text-[14px] font-bold text-slate-900 mt-0.5">
                    3.2x higher completion rates
                  </p>
                  <p className="text-[13px] text-slate-600 font-medium leading-snug">
                    and more engaged learners.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ──── RIGHT PANEL ──── */}
          <div className="w-full lg:w-[65%] flex flex-col mt-4 lg:mt-0 relative h-full min-h-[400px] lg:min-h-[600px] pt-4 lg:pt-6 lg:pr-[30px]">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-8 lg:mb-10"
            >
              <h2 className="text-[22px] lg:text-[26px] font-bold text-slate-900 mb-2 leading-tight max-w-[600px]">
                Do you want a <span className="text-violet-700">learner community</span> attached to your courses?
              </h2>
              <p className="text-[14px] lg:text-[15px] text-slate-500 font-medium">
                You can change this anytime in your settings.
              </p>
            </motion.div>

            {/* List */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="flex flex-col gap-4 lg:gap-5 w-full lg:w-[85%]"
            >
              {OPTIONS.map((option) => {
                const isSelected = selectedId === option.id;
                return (
                  <motion.div
                    key={option.id}
                    variants={itemVariants}
                    onClick={() => setSelectedId(option.id)}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedId(option.id); } }}
                  role="checkbox"
                  aria-checked={isSelected}
                    className={`relative flex flex-col sm:flex-row items-start sm:items-center p-5 w-full rounded-2xl cursor-pointer transition-all duration-300 border-[1.5px] bg-white hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:-translate-y-[2px] ${
                      isSelected ? 'border-violet-600 shadow-[0_0_0_2px_rgba(124,58,237,0.1)]' : 'border-slate-200 hover:border-violet-300'
                    }`}
                  >
                    {/* Image / Icon */}
                    <div className="flex items-center justify-center mr-5 mb-4 sm:mb-0 shrink-0">
                      {option.id === 'yes' && (
                        <div className="relative w-[80px] h-[80px] lg:w-[100px] lg:h-[100px] bg-violet-50 rounded-full flex items-center justify-center shrink-0">
                          <Image
                            src="/Teyro Creator Onbarding flow/CF_ST13_yes_option_img.png"
                            alt="Yes"
                            fill
                            className="object-contain scale-[2.2] origin-center"
                          />
                        </div>
                      )}
                      {option.id === 'no' && (
                        <div className="w-[60px] h-[60px] lg:w-[80px] lg:h-[80px] bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 ml-2">
                          <UserX size={32} strokeWidth={2.5} />
                        </div>
                      )}
                      {option.id === 'maybe' && (
                        <div className="w-[60px] h-[60px] lg:w-[80px] lg:h-[80px] bg-orange-50 rounded-full flex items-center justify-center text-orange-400 ml-2">
                          <Clock size={32} strokeWidth={2.5} />
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex flex-col flex-1 pr-12">
                      <h3 className="font-bold text-[16px] lg:text-[18px] text-slate-900 mb-1.5">
                        {option.title}
                      </h3>
                      <p className="text-[13.5px] lg:text-[14px] text-slate-500 font-medium leading-relaxed">
                        {option.description}
                      </p>
                      
                      {option.isRecommended && (
                        <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 bg-violet-50 text-violet-700 rounded-md border border-violet-100 self-start">
                          <Star size={14} className="fill-violet-700" />
                          <span className="text-[12px] font-bold">Recommended</span>
                        </div>
                      )}
                    </div>

                    {/* Radio Button */}
                    <div className="absolute top-5 right-5 sm:top-auto sm:right-6 z-10 w-[24px] h-[24px] rounded-full border flex items-center justify-center transition-colors">
                      <div
                        className={`w-full h-full rounded-full border-[2.5px] flex items-center justify-center transition-colors ${
                          isSelected
                            ? 'border-violet-600 bg-violet-600'
                            : 'border-slate-200 bg-white'
                        }`}
                      >
                        {isSelected && <Check size={14} strokeWidth={3} className="text-white" />}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* ──── BOTTOM BANNER ──── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="relative w-full lg:w-[85%] rounded-2xl overflow-hidden mt-[20px] shrink-0 bg-[#F5F3FF] border border-violet-100 flex flex-row items-center min-h-[70px] h-auto lg:h-[80px] py-4 lg:py-0 mb-6"
            >
              {/* Left Sparkles Icon */}
              <div className="flex items-center justify-center w-[36px] h-[36px] lg:w-[40px] lg:h-[40px] rounded-xl bg-violet-100 text-violet-700 ml-4 lg:ml-6 shrink-0 z-10">
                <Sparkles size={18} strokeWidth={2.5} className="lg:w-[20px] lg:h-[20px] w-[16px] h-[16px]" />
              </div>

              <div className="flex-1 flex flex-col justify-center px-4 lg:px-5 z-10">
                <p className="text-[12.5px] sm:text-[13px] lg:text-[14px] text-slate-700 font-medium leading-snug pr-4">
                  You can enable or customize your community anytime.
                  <br className="hidden sm:block" />
                  No commitment, total flexibility.
                </p>
              </div>

              {/* Right Graphic */}
              <div className="hidden sm:block absolute right-0 top-0 bottom-0 w-[200px] lg:w-[300px] shrink-0 z-0 pointer-events-none">
                <Image
                  src="/Teyro Creator Onbarding flow/CF_ST13_yes_option_img.png"
                  alt="Flow"
                  fill
                  className="object-cover object-center scale-[1.5]"
                  style={{
                    maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
                    WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
                  }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ═══ BOTTOM BAR ═══ */}
      <div className="flex flex-row items-center justify-between p-3 sm:p-4 lg:p-[16px_32px] border-t border-slate-200 shrink-0 bg-[#F1EDFC] gap-4 sm:gap-0 mt-auto sticky bottom-0 z-50">
        {/* Back */}
        <button
          onClick={() => router.push('/creator/onboarding/12')}
          className="flex items-center justify-center sm:justify-start gap-2 text-[16px] font-medium text-violet-600 bg-transparent border-none cursor-pointer py-2 px-4 sm:-ml-4 w-auto shrink-0 hover:text-violet-700 transition-colors"
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
          disabled={isLoading || !selectedId}
          className={`flex items-center justify-center gap-[10px] flex-1 sm:flex-none sm:w-[180px] h-[56px] rounded-[14px] text-white text-[16.5px] font-semibold border-none transition-all duration-200 ${
            isLoading || !selectedId
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
