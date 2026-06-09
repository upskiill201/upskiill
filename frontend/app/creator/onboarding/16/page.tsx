'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Rocket, ArrowLeft, PartyPopper } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clearOnboardingData } from '@/lib/onboarding';
import posthog from 'posthog-js';
import confetti from 'canvas-confetti';

export default function StepSixteenPage() {
  const router = useRouter();
  const [creatorName, setCreatorName] = useState('Creator');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // 1. Analytics & Clean Up
    posthog.capture('creator_email_verified');
    posthog.capture('creator_studio_entered');
    clearOnboardingData();

    // Fire confetti rain
    const duration = 2000;
    const end = Date.now() + duration;

    import('canvas-confetti').then(({ default: confetti }) => {
      const duration = 2000;
      const end = Date.now() + duration;
      const frame = () => {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#7C3AED', '#3B82F6', '#10B981']
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#7C3AED', '#3B82F6', '#10B981']
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    });

    // 2. Attempt to fetch the user's profile to display their first name
    const fetchProfile = async () => {
      try {
        const res = await fetch('/api/profile');
        if (res.ok) {
          const data = await res.json();
          if (data.fullName) {
            const firstName = data.fullName.split(' ')[0];
            setCreatorName(firstName);
          }
        }
      } catch (err) {
        console.error('Failed to fetch user profile:', err);
      }
    };
    
    fetchProfile();
  }, []);

  const handleEnterStudio = async () => {
    setIsLoading(true);
    // Simulate loading for the grand entrance before redirecting to the actual dashboard
    setTimeout(() => {
      window.location.href = '/creator/dashboard';
    }, 800);
  };

  return (
    <motion.div className="flex flex-col w-full max-w-[1761px] mx-auto min-h-[calc(100vh-88px)] bg-[#F1EDFC] overflow-visible">
      {/* ═══ MAIN CONTENT AREA ═══ */}
      <div className="flex flex-col flex-1 overflow-visible min-h-0 pt-4 lg:pt-8 px-[10px] lg:px-[32px] w-full relative">
        
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-4 lg:gap-24 flex-1">
          
          {/* ──── LEFT CONTENT ──── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="w-full lg:w-[30%] flex flex-col justify-center items-center lg:items-start text-center lg:text-left shrink-0 z-10 pt-12 lg:pt-0 pb-24 lg:pb-0"
          >
            {/* Status Pill */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-3 px-6 py-3 bg-violet-50 border border-violet-100 rounded-full w-fit mb-6 shadow-sm"
            >
              <PartyPopper size={22} className="text-violet-700" />
              <span className="text-[18px] lg:text-[20px] font-bold text-violet-700">
                All set, {creatorName}!
              </span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, scale: 0.5, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.3 }}
              className="w-full text-[48px] lg:text-[80px] font-extrabold text-[#1a1a2e] leading-[1.05] tracking-tight mb-6"
            >
              Your Creator<br />
              Studio is<br />
              <span className="text-violet-700">Ready.</span>
            </motion.h1>

            <p className="text-[18px] lg:text-[24px] text-slate-500 font-medium leading-[1.6] mb-10 max-w-[500px]">
              Let's build learning experiences people actually finish.
            </p>

            {/* CTA Button */}
            <motion.button
              initial={{ scale: 1, boxShadow: '0 6px 20px rgba(124,58,237,0.3)' }}
              animate={{ 
                scale: [1, 1.05, 1],
                boxShadow: [
                  '0 6px 20px rgba(124,58,237,0.3)',
                  '0 0 40px 10px rgba(124,58,237,0.5)',
                  '0 6px 20px rgba(124,58,237,0.3)'
                ]
              }}
              transition={{ delay: 1.5, duration: 0.8, ease: "easeInOut" }}
              whileHover={{ y: -2, boxShadow: '0 8px 24px rgba(124, 58, 237, 0.4)' }}
              whileTap={{ y: 0, scale: 0.98 }}
              onClick={handleEnterStudio}
              disabled={isLoading}
              className={`flex items-center justify-center gap-4 w-full sm:w-[340px] lg:w-[400px] h-[72px] lg:h-[88px] rounded-[20px] text-white text-[20px] lg:text-[24px] font-bold border-none transition-all duration-300 relative overflow-hidden group ${
                isLoading
                  ? 'bg-violet-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-violet-600 to-indigo-600 cursor-pointer'
              }`}
            >
              {/* Shine effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
              
              <Rocket size={28} strokeWidth={2.5} className="text-white shrink-0 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform duration-300" />
              {isLoading ? 'Entering Studio...' : 'Enter Creator Studio'}
              <span className="ml-1 opacity-80 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 text-[24px]">→</span>
            </motion.button>

            {/* Security Note */}
            <div className="mt-6 flex items-center gap-2 text-slate-400 text-[13px] font-medium">
              <ShieldCheck size={16} />
              Your information is secure and will never be shared.
            </div>
          </motion.div>

          {/* ──── RIGHT GRAPHIC ──── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
            className="relative w-full lg:w-[70%] h-[300px] lg:h-[700px] shrink-0 z-0 flex items-center justify-center lg:justify-end overflow-hidden lg:overflow-visible mt-4 lg:mt-0"
          >
            {/* The absolute container set to natively fit the mobile box without bleeding into the text */}
            <div className="absolute right-0 lg:right-[-60px] top-1/2 -translate-y-1/2 w-full lg:w-[1300px] h-full lg:h-[100vh] pointer-events-none z-0">
              <Image
                src="/Teyro Creator Onbarding flow/CF_ST15_side_img_entrance.png"
                alt="Creator Studio Entrance"
                fill
                className="object-contain object-center lg:object-right origin-center"
                style={{
                  maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 90%)',
                  WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 90%)',
                }}
                priority
              />
            </div>
          </motion.div>
        </div>

      </div>

      {/* ═══ BOTTOM BAR ═══ */}
      <div className="flex flex-col-reverse sm:flex-row items-center justify-start p-6 lg:p-[24px_32px] border-none shrink-0 bg-transparent mt-auto relative z-50">
        <button
          onClick={() => router.push('/creator/onboarding/15')}
          className="flex items-center justify-center sm:justify-start gap-2 px-6 py-3 bg-white border border-slate-200 shadow-sm rounded-[14px] text-[15px] font-bold text-violet-700 cursor-pointer hover:bg-slate-50 transition-colors"
        >
          <ArrowLeft size={18} strokeWidth={2.5} />
          Back
        </button>
      </div>

    </motion.div>
  );
}
