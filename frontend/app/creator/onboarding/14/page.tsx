'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, ShieldCheck, Check, Target, DollarSign, BookOpen, Users, CloudUpload, User, Map, TrendingUp, ChevronRight } from 'lucide-react';
import { useOnboardingGuard } from '@/hooks/useOnboardingGuard';
import { getOnboardingData, saveOnboardingStep } from '@/lib/onboarding';
import posthog from 'posthog-js';
import { motion } from 'framer-motion';

export default function StepFourteenPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // 🛡️ Step-skip protection — redirect to Step 1 if prior steps not done
  useOnboardingGuard(14);

  // 📖 Restore previous answer on mount
  useEffect(() => {
    const data = getOnboardingData();
    // Track page view
    posthog.capture('onboarding_step_viewed', { step: 14, stepName: 'review_progress' });
  }, []);


  // 💾 Auto-save on selection
  useEffect(() => {
    saveOnboardingStep(14, { reviewed: true });
  }, []);

  const handleContinue = async () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // Adjust to wherever final step is
      saveOnboardingStep(14, { reviewed: true });
      posthog.capture('onboarding_step_completed', { step: 14 });
      router.push('/creator/onboarding/15');
    }, 600);
  };

  return (
    <div className="flex flex-col w-full max-w-[1761px] mx-auto min-h-[calc(100vh-88px)]">
      {/* ═══ MAIN CONTENT AREA ═══ */}
      <div className="flex flex-col flex-1 overflow-x-hidden min-h-0 pt-1 lg:pt-3 px-6 lg:px-[32px] max-w-[1200px] mx-auto w-full">
        
        {/* ──── TOP ROW ──── */}
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-8 lg:gap-12 mb-8 lg:mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="w-full lg:w-[35%] flex flex-col justify-center shrink-0 z-10"
          >
            <h1 className="text-[32px] lg:text-[46px] font-extrabold text-slate-900 leading-[1.15] tracking-tight whitespace-nowrap">
              Your Creator Studio is<br />
              <span className="text-violet-700">78% Ready 🚀</span>
            </h1>
            <p className="mt-4 lg:mt-6 text-[15px] lg:text-[17px] text-slate-600 font-medium leading-relaxed max-w-[400px]">
              You&apos;ve completed the essential setup steps.<br className="hidden lg:block" />
              You&apos;re almost ready to launch and start creating impact.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
            className="w-full lg:w-[65%] h-[250px] lg:h-[300px] relative shrink-0 z-0 flex items-center justify-end"
          >
            <div className="absolute right-[-40px] lg:right-[-80px] top-1/2 -translate-y-1/2 mt-[45px] w-[500px] lg:w-[800px] h-[500px] lg:h-[800px] pointer-events-none">
              <Image
                src="/Teyro Creator Onbarding flow/CF_ST14_side_img_rocket_78.png"
                alt="78% Ready"
                fill
                className="object-contain object-center lg:object-right origin-center"
                style={{
                  maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
                  WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
                }}
                priority
              />
            </div>
          </motion.div>
        </div>

        {/* ──── MIDDLE ROW ──── */}
        <div className="flex flex-col lg:flex-row gap-6 mb-8 lg:mb-10">
          
          {/* Left Block: You already have */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex-1 bg-white border border-slate-200 shadow-[0_12px_40px_rgba(0,0,0,0.08)] rounded-[24px] p-6 lg:p-8"
          >
            <h2 className="text-[17px] lg:text-[19px] font-bold text-slate-900 mb-6">
              You already have 🎉
            </h2>
            <div className="grid grid-cols-2 gap-4 lg:gap-5">
              {/* Card 1 */}
              <div className="relative flex flex-col items-center justify-center p-5 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors">
                <div className="absolute top-3 right-3 w-[18px] h-[18px] bg-emerald-500 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                  <Check size={10} strokeWidth={4} className="text-white" />
                </div>
                <div className="w-[52px] h-[52px] rounded-full bg-violet-100 text-violet-600 flex items-center justify-center mb-3">
                  <Target size={24} strokeWidth={2.5} />
                </div>
                <h3 className="font-bold text-[14px] text-slate-900 mb-0.5 text-center">Teaching niche</h3>
                <p className="text-[12px] font-bold text-emerald-600">Defined</p>
              </div>

              {/* Card 2 */}
              <div className="relative flex flex-col items-center justify-center p-5 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors">
                <div className="absolute top-3 right-3 w-[18px] h-[18px] bg-emerald-500 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                  <Check size={10} strokeWidth={4} className="text-white" />
                </div>
                <div className="w-[52px] h-[52px] rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-3">
                  <DollarSign size={24} strokeWidth={2.5} />
                </div>
                <h3 className="font-bold text-[14px] text-slate-900 mb-0.5 text-center">Revenue goals</h3>
                <p className="text-[12px] font-bold text-emerald-600">Set</p>
              </div>

              {/* Card 3 */}
              <div className="relative flex flex-col items-center justify-center p-5 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors">
                <div className="absolute top-3 right-3 w-[18px] h-[18px] bg-emerald-500 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                  <Check size={10} strokeWidth={4} className="text-white" />
                </div>
                <div className="w-[52px] h-[52px] rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-3">
                  <BookOpen size={24} strokeWidth={2.5} />
                </div>
                <h3 className="font-bold text-[14px] text-slate-900 mb-0.5 text-center">Learning strategy</h3>
                <p className="text-[12px] font-bold text-emerald-600">Planned</p>
              </div>

              {/* Card 4 */}
              <div className="relative flex flex-col items-center justify-center p-5 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors">
                <div className="absolute top-3 right-3 w-[18px] h-[18px] bg-emerald-500 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                  <Check size={10} strokeWidth={4} className="text-white" />
                </div>
                <div className="w-[52px] h-[52px] rounded-full bg-orange-100 text-orange-500 flex items-center justify-center mb-3">
                  <Users size={24} strokeWidth={2.5} />
                </div>
                <h3 className="font-bold text-[14px] text-slate-900 mb-0.5 text-center">Audience direction</h3>
                <p className="text-[12px] font-bold text-emerald-600">Identified</p>
              </div>
            </div>
          </motion.div>

          {/* Right Block: Next recommended steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative z-10 flex-[1.2] bg-white border border-slate-200 shadow-[0_12px_40px_rgba(0,0,0,0.08)] rounded-[24px] p-6 lg:p-8 flex flex-col"
          >
            <h2 className="text-[17px] lg:text-[19px] font-bold text-slate-900 mb-1">
              Next recommended steps ✨
            </h2>
            <p className="text-[14px] text-slate-500 font-medium mb-6">
              Complete these steps to launch faster and grow sooner.
            </p>

            <div className="flex flex-col gap-3 flex-1 justify-center">
              {/* Step 1 */}
              <div className="flex items-center p-4 rounded-2xl border border-slate-100 bg-slate-50/30 hover:bg-slate-50 transition-all cursor-pointer group">
                <div className="relative w-[52px] h-[52px] rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center shrink-0">
                  <CloudUpload size={24} strokeWidth={2.5} />
                  <div className="absolute -top-2 -right-2 w-[22px] h-[22px] bg-violet-600 text-white text-[11px] font-bold rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                    1
                  </div>
                </div>
                <div className="flex flex-col flex-1 px-5">
                  <h3 className="font-bold text-[15px] text-slate-900 mb-0.5">Upload your first lesson</h3>
                  <p className="text-[13px] text-slate-500 font-medium leading-snug">
                    Add your content and start creating value for your learners.
                  </p>
                </div>
                <ChevronRight size={20} className="text-violet-600 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mr-1" />
              </div>

              {/* Step 2 */}
              <div className="flex items-center p-4 rounded-2xl border border-slate-100 bg-slate-50/30 hover:bg-slate-50 transition-all cursor-pointer group">
                <div className="relative w-[52px] h-[52px] rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                  <User size={24} strokeWidth={2.5} />
                  <div className="absolute -top-2 -right-2 w-[22px] h-[22px] bg-indigo-600 text-white text-[11px] font-bold rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                    2
                  </div>
                </div>
                <div className="flex flex-col flex-1 px-5">
                  <h3 className="font-bold text-[15px] text-slate-900 mb-0.5">Complete your creator profile</h3>
                  <p className="text-[13px] text-slate-500 font-medium leading-snug">
                    Tell your story and build trust with your future learners.
                  </p>
                </div>
                <ChevronRight size={20} className="text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mr-1" />
              </div>

              {/* Step 3 */}
              <div className="flex items-center p-4 rounded-2xl border border-slate-100 bg-slate-50/30 hover:bg-slate-50 transition-all cursor-pointer group">
                <div className="relative w-[52px] h-[52px] rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                  <Map size={24} strokeWidth={2.5} />
                  <div className="absolute -top-2 -right-2 w-[22px] h-[22px] bg-purple-600 text-white text-[11px] font-bold rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                    3
                  </div>
                </div>
                <div className="flex flex-col flex-1 px-5">
                  <h3 className="font-bold text-[15px] text-slate-900 mb-0.5">Create your first learning path</h3>
                  <p className="text-[13px] text-slate-500 font-medium leading-snug">
                    Organize your content into a clear learning journey.
                  </p>
                </div>
                <ChevronRight size={20} className="text-purple-600 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mr-1" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* ──── BOTTOM BANNER ──── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="relative w-full rounded-2xl overflow-hidden shrink-0 bg-[#F5F3FF] border border-violet-100 flex flex-col sm:flex-row sm:items-center py-6 px-6 lg:px-8 mb-8"
        >
          {/* Left Icon */}
          <div className="w-[52px] h-[52px] rounded-full bg-violet-600 text-white flex items-center justify-center shrink-0 mb-4 sm:mb-0 mr-5 z-10 shadow-sm border-[3px] border-white">
            <TrendingUp size={24} strokeWidth={2.5} />
          </div>

          <div className="flex-1 flex flex-col justify-center z-10 pr-4">
            <h3 className="font-bold text-[15px] lg:text-[17px] text-violet-900 mb-1">
              You&apos;re on the right track!
            </h3>
            <p className="text-[13px] lg:text-[14px] text-slate-600 font-medium leading-snug">
              Creators who complete their setup launch faster<br className="hidden lg:block" />
              and build stronger communities.
            </p>
          </div>

          {/* Right Image */}
          <div className="relative w-full sm:w-[280px] lg:w-[500px] h-[60px] sm:h-[100px] shrink-0 z-0 mt-4 sm:mt-0 opacity-90">
            <Image
              src="/Teyro Creator Onbarding flow/CF_ST14_bottom_img_people.png"
              alt="Creators already launched"
              fill
              className="object-cover object-left sm:object-right scale-[1.3] lg:scale-[1.35] origin-right"
              style={{
                maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 95%)',
                WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 95%)',
              }}
            />
          </div>
        </motion.div>

      </div>

      {/* ═══ BOTTOM BAR ═══ */}
      <div className="flex flex-col-reverse sm:flex-row items-center justify-between p-3 sm:p-4 lg:p-[16px_32px] border-t border-slate-200 shrink-0 bg-[#FEFEFE] gap-4 sm:gap-0 mt-auto sticky bottom-0 z-50">
        {/* Back */}
        <button
          onClick={() => router.push('/creator/onboarding/13')}
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
          disabled={isLoading}
          className={`flex items-center justify-center gap-[10px] w-full sm:w-[240px] h-[56px] rounded-[14px] text-white text-[16.5px] font-semibold border-none transition-all duration-200 ${
            isLoading
              ? 'bg-violet-300 cursor-not-allowed'
              : 'bg-violet-600 cursor-pointer shadow-[0_4px_14px_rgba(124,58,237,0.3)] hover:bg-violet-700 hover:shadow-[0_6px_20px_rgba(124,58,237,0.4)] hover:-translate-y-[1px]'
          }`}
        >
          {isLoading ? 'Loading...' : 'Continue to Final Step'}
          {!isLoading && <ArrowRight size={18} strokeWidth={2.5} />}
        </button>
      </div>
    </div>
  );
}
