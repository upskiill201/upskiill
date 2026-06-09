'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, ShieldCheck } from 'lucide-react';
import { useOnboardingGuard } from '@/hooks/useOnboardingGuard';
import { getOnboardingData, saveOnboardingStep } from '@/lib/onboarding';
import posthog from 'posthog-js';
import { leftPanelVariants, rightPanelVariants, cardHover, cardTap, checkmarkBounce } from '@/lib/animations';

import { motion, AnimatePresence } from 'framer-motion';

export default function StepElevenPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // 🛡️ Step-skip protection — redirect to Step 1 if prior steps not done
  useOnboardingGuard(11);

  // 📖 Restore previous answer on mount
  useEffect(() => {
    const data = getOnboardingData();
    // Track page view
    posthog.capture('onboarding_step_viewed', { step: 11, stepName: 'course_formats_intro' });
  }, []);


  // 💾 Auto-save on selection
  useEffect(() => {
    saveOnboardingStep(11, { viewed: true });
  }, []);

  const handleContinue = async () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      saveOnboardingStep(11, { viewed: true });
      posthog.capture('onboarding_step_completed', { step: 11 });
      router.push('/creator/onboarding/12');
    }, 600);
  };

  return (
    <motion.div initial="hidden" animate="show" className="flex flex-col w-full max-w-[1761px] mx-auto min-h-[calc(100vh-88px)]">
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
            <div className="lg:ml-[32px] pt-8 lg:pt-12">
              <h1 className="font-extrabold tracking-tight text-slate-900 text-[28px] lg:text-[38px] leading-[1.15] mb-4">
                Meet your
                <br className="hidden sm:block" />
                <span className="text-violet-700">AI creator copilot.</span>
              </h1>

              {/* Decorative Line */}
              <div className="w-[50px] h-[2px] bg-violet-700 rounded-full mb-5" />

              {/* Description */}
              <p className="text-[15px] lg:text-[16px] text-slate-600 mb-6 leading-relaxed max-w-[420px]">
                Teyro&apos;s AI assistant helps you create better courses, engage learners and grow your impact—faster than ever.
              </p>
            </div>

            {/* Illustration */}
            <div className="relative w-full flex-1 min-h-[400px] lg:min-h-[500px] flex items-center justify-center lg:ml-[32px] z-0">
              <Image
                src="/Teyro Creator Onbarding flow/CF_ST11_side_img.png"
                alt="AI Creator Copilot"
                fill
                className="object-contain object-center scale-[1.05]"
                style={{
                  maskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, black 30%, transparent 90%)',
                  WebkitMaskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, black 30%, transparent 90%)',
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
            className="hidden lg:flex w-full lg:w-[65%] flex-col mt-4 lg:mt-0 relative h-full min-h-[400px] lg:min-h-[600px]"
          >
            <div className="absolute inset-0 w-full h-full translate-y-[20px]">
              <Image
                src="/Teyro Creator Onbarding flow/CF_ST11_side_img_right.png"
                alt="AI Assistant Features"
                fill
                className="object-cover object-center"
                style={{
                  maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 50%, transparent 95%)',
                  WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 50%, transparent 95%)',
                }}
                priority
              />
            </div>
          </motion.div>
        </div>

        {/* ──── BOTTOM BANNER ──── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="relative w-full max-w-[1600px] mx-auto rounded-2xl overflow-hidden mt-auto shrink-0 bg-[#F3EFFE] border border-slate-100 flex items-center h-[90px] lg:h-[110px] mb-6"
          style={{
            boxShadow: '0 4px 20px -4px rgba(124, 58, 237, 0.08)',
          }}
        >
          {/* Left AI Indicator Icon */}
          <div className="relative w-[60px] h-[60px] lg:w-[80px] lg:h-[80px] shrink-0 ml-4 lg:ml-8">
            <Image
              src="/Teyro Creator Onbarding flow/CF_ST11_ai_indicator_botom_img.png"
              alt="AI Indicator"
              fill
              className="object-contain"
              style={{
                maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 90%)',
                WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 90%)',
              }}
            />
          </div>

          <div className="flex-1 flex flex-col z-10 px-4 lg:px-6">
            <h3 className="font-bold text-[16px] lg:text-[18px] text-violet-800 mb-0.5">
              AI that understands teaching. Built for creators like you.
            </h3>
            <p className="text-[13px] lg:text-[14px] text-slate-600 font-medium">
              More time to create. More impact for your learners.
            </p>
          </div>

          {/* Right Decor Image */}
          <div className="relative w-[220px] sm:w-[350px] lg:w-[500px] h-full shrink-0 z-0">
            <Image
              src="/Teyro Creator Onbarding flow/CF_ST11_bottom_img.png"
              alt="AI Banner Decor"
              fill
              className="object-cover object-left"
              style={{
                maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 95%)',
                WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 95%)',
              }}
            />
          </div>
        </motion.div>
      </div>

      {/* ═══ BOTTOM BAR ═══ */}
      <div className="flex flex-row items-center justify-between p-3 sm:p-4 lg:p-[16px_32px] border-t border-slate-200 shrink-0 bg-transparent gap-4 sm:gap-0 mt-auto sticky bottom-0 z-50">
        {/* Back */}
        <button
          onClick={() => router.push('/creator/onboarding/10')}
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
          className={`flex items-center justify-center gap-[10px] flex-1 sm:flex-none sm:w-[180px] h-[56px] rounded-[14px] text-white text-[16.5px] font-semibold border-none transition-all duration-200 ${
            isLoading
              ? 'bg-violet-300 cursor-not-allowed'
              : 'bg-violet-600 cursor-pointer shadow-[0_4px_14px_rgba(124,58,237,0.3)] hover:bg-violet-700 hover:shadow-[0_6px_20px_rgba(124,58,237,0.4)] hover:-translate-y-[1px]'
          }`}
        >
          {isLoading ? 'Loading...' : 'Continue'}
          {!isLoading && <ArrowRight size={18} strokeWidth={2.5} />}
        </button>
      </div>
    </motion.div>
  );
}
