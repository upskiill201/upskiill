'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { MascotBackground } from '@/components/onboarding/MascotBackground';
import { useOnboardingSession } from '@/hooks/useOnboardingSession';
import { StepSkeleton } from '@/components/onboarding/StepSkeleton';

// ─── Animation variants ──────────────────────────────────────────────────────
const headlineContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.055, delayChildren: 0.15 } }
};
const wordVariant: any = {
  hidden: { y: 20, opacity: 0 },
  show:   { y: 0,  opacity: 1, transition: { type: 'spring', stiffness: 400, damping: 28 } }
};
const accentVariant: any = {
  hidden: { y: 20, opacity: 0, scale: 0.75 },
  show:   { y: 0,  opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 500, damping: 20 } }
};

export default function OnboardingStep13() {
  const router = useRouter();
  const { isLoading, advance } = useOnboardingSession(13);
  const [idle, setIdle] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setIdle(true), 1500);
    return () => clearTimeout(t);
  }, []);

  if (isLoading) return <StepSkeleton />;

  const handleNext = () => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(12);
    void advance();
  };

  const handleBack = () => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(10);
    router.push('/onboarding/12');
  };

  const headlineShadow = '0px 2px 3px rgba(255,255,255,0.9), 0px -1px 2px rgba(0,0,0,0.15), 0 0 15px rgba(255,255,255,1), 0 0 30px rgba(255,255,255,0.9), 0 0 45px rgba(255,255,255,0.8), 0 0 60px rgba(255,255,255,0.5)';
  const accentShadow   = '0px 2px 3px rgba(255,255,255,0.9), 0px -1px 2px rgba(1,114,253,0.4), 0 0 15px rgba(255,255,255,1), 0 0 30px rgba(255,255,255,0.9), 0 0 45px rgba(255,255,255,0.8), 0 0 60px rgba(255,255,255,0.5)';

  return (
    <div className="w-full relative select-none bg-gradient-to-br from-[#EBF3FE] via-[#F4F8FF] to-[#FFFFFF] overflow-hidden">
      
      {/* 📱 MOBILE-ONLY LAYOUT: Strict 50/50 Flex Split - 100dvh hard lock, no scroll */}
      <div className="flex flex-col w-full relative z-10 md:hidden" style={{ height: '100dvh', overflow: 'hidden' }}>
        
        {/* Top 50% Image Container */}
        <div className="flex-1 w-full flex flex-col justify-start items-center relative overflow-hidden">
          
          {/* Mobile Progress Bar */}
          <div className="w-full px-6 flex items-center gap-4 shrink-0 relative z-20 pt-[max(env(safe-area-inset-top),12px)] pb-3">
            <div className="flex-1 h-2.5 bg-[#E5EAEF] rounded-full overflow-hidden shadow-inner">
              <motion.div
                initial={{ width: `${(12 / 15) * 100}%` }}
                animate={{ width: `${(13 / 15) * 100}%` }}
                transition={{ type: 'spring', stiffness: 280, damping: 24, mass: 0.8, delay: 0.25 }}
                className="h-full rounded-full"
                style={{
                  background: 'linear-gradient(90deg, #0172FD 0%, #3A96FF 100%)',
                  boxShadow: 'inset 0px -2px 0px rgba(0,0,0,0.1), inset 0px 2px 0px rgba(255,255,255,0.3)',
                }}
              />
            </div>
            <span className="text-sm font-[800] text-[#0172FD] shrink-0" style={{ textShadow: '0 0 10px rgba(255,255,255,1)' }}>
              13/15
            </span>
          </div>

          {/* Mascot area - fills remaining top flex space */}
          <div className="w-full flex-1 flex items-center justify-center relative min-h-0">
            <div className="absolute inset-0 w-full h-full pointer-events-none">
              <MascotBackground />
            </div>
            <motion.div
              layoutId="tey-mascot"
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              className="relative w-[80vw] h-[80%] z-10"
            >
              <Image 
                src="/User onbarding Assets/Step-13_img.PNG" 
                alt="Tey Mascot Mobile" 
                fill 
                className="object-contain drop-shadow-[0_16px_32px_rgba(0,0,0,0.1)]" 
                priority 
              />
            </motion.div>
          </div>
        </div>

        {/* Bottom 50% Text & CTA Container */}
        <div 
          className="flex-1 w-full flex flex-col items-center relative z-20 overflow-hidden" 
          style={{ 
            paddingBottom: 'max(env(safe-area-inset-bottom), 16px)',
            background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 40px, rgba(255, 255, 255, 1) 100%)'
          }}
        >
          {/* Content Wrapper */}
          <div className="w-full h-full flex flex-col justify-between pt-8 px-6 relative z-20">
            {/* Typography container */}
            <div className="w-full flex flex-col items-center text-center pt-2 px-2 shrink-0">
              <motion.h1
                variants={headlineContainer}
                initial="hidden"
                animate="show"
                className="font-[900] leading-[1.05] mb-2 tracking-tight text-[#071233] w-[70vw] mx-auto text-center"
                style={{ 
                  fontFamily: 'var(--font-jakarta)', 
                  textShadow: headlineShadow,
                  fontSize: 'clamp(2.1rem, calc(5.5vw + 3.2vh), 3.2rem)'
                }}
              >
                <div className="whitespace-nowrap">
                  <motion.span variants={wordVariant} style={{ display: 'inline-block', marginRight: '0.22em' }}>First</motion.span>
                  <motion.span variants={wordVariant} style={{ display: 'inline-block', marginRight: '0.22em' }}>Badge</motion.span>
                </div>
                <div className="whitespace-nowrap">
                  <motion.span variants={accentVariant} className="text-[#0172FD]" style={{ display: 'inline-block', textShadow: accentShadow }}>Unlocked!</motion.span>
                </div>
              </motion.h1>

              <motion.p
                initial={{ y: 14, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 28, delay: 0.3 }}
                className="text-[3.4vw] xs:text-[3.6vw] sm:text-sm font-medium text-slate-500 leading-tight max-w-[85%]"
                style={{ fontFamily: 'var(--font-jakarta)' }}
              >
                You’re making great progress. Keep going, you’re doing amazing!
              </motion.p>
            </div>

            {/* Buttons container */}
            <div className="w-full flex flex-col items-center gap-3 shrink-0 mt-auto mb-[2vh]">
              {/* Continue Button */}
              <motion.button
                animate={idle ? { scale: [1, 1.02, 1] } : { scale: 1 }}
                transition={idle ? { duration: 0.45, ease: 'easeInOut', times: [0, 0.5, 1] } : { type: 'spring', stiffness: 300, damping: 20 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
                onClick={handleNext}
                className="w-[80vw] h-12 bg-[#0172FD] border-b-4 border-[#0050B3] text-white rounded-[1.2rem] font-[900] text-sm flex items-center justify-center gap-2 hover:bg-[#0060D9] active:border-b-0 active:translate-y-[2px] transition-all shadow-[0_4px_15px_rgba(1,114,253,0.25)] cursor-pointer"
              >
                <span>Continue Your Journey</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </motion.button>

              {/* Back Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
                onClick={handleBack}
                className="w-[80vw] h-12 bg-white border-2 border-slate-200 text-slate-700 rounded-[1.2rem] font-[800] text-sm flex items-center justify-center gap-2 hover:bg-slate-50 transition-all shadow-sm cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
                <span>Back</span>
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* 🖥️ DESKTOP-ONLY LAYOUT */}
      <div className="hidden md:flex flex-row-reverse w-full h-screen relative z-10 overflow-hidden items-stretch justify-center bg-gradient-to-br from-[#EBF3FE] via-[#F4F8FF] to-[#FFFFFF]">
        
        {/* Teyro! Logo at top left */}
        <div className="absolute top-8 left-12 z-20 flex items-center">
          <span className="text-[#0172FD] font-[900] text-3xl tracking-tight" style={{ fontFamily: 'var(--font-jakarta)' }}>
            Teyro!
          </span>
        </div>

        {/* Right Column (50%): Mascot Container with bubble background */}
        <div className="w-1/2 h-full flex items-center justify-center relative bg-transparent overflow-hidden select-none">
          <div className="absolute inset-0 w-full h-full pointer-events-none">
            <MascotBackground />
          </div>
          <motion.div
            layoutId="tey-mascot-desktop"
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 220, damping: 24 }}
            className="relative w-[80%] h-[80%] z-10 flex items-center justify-center"
          >
            <Image 
              src="/User onbarding Assets/Step-13_img.PNG" 
              alt="Tey Mascot Desktop" 
              fill 
              className="object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.15)]" 
              priority 
            />
          </motion.div>
        </div>

        {/* Left Column (50%): Content Container */}
        <div className="w-1/2 h-full bg-transparent flex flex-col justify-between p-12 lg:p-20 relative select-none">
          
          {/* Progress row - top right */}
          <div className="w-full flex items-center gap-5 relative z-10 pt-4 shrink-0">
            <div className="flex-grow"></div>
            <div className="w-1/2 h-3.5 bg-[#E5EAEF] rounded-full overflow-hidden shadow-inner">
              <motion.div
                initial={{ width: `${(12 / 15) * 100}%` }}
                animate={{ width: `${(13 / 15) * 100}%` }}
                transition={{ type: 'spring', stiffness: 280, damping: 24, delay: 0.25 }}
                className="h-full rounded-full"
                style={{
                  background: 'linear-gradient(90deg, #0172FD 0%, #3A96FF 100%)',
                  boxShadow: 'inset 0px -3px 0px rgba(0,0,0,0.1), inset 0px 3px 0px rgba(255,255,255,0.3)',
                }}
              />
            </div>
            <span className="text-base font-extrabold text-[#0172FD] shrink-0" style={{ textShadow: '0 0 10px rgba(255,255,255,1)' }}>
              13/15
            </span>
          </div>

          {/* Core Content Box */}
          <div className="w-full flex-1 flex flex-col justify-center items-start relative z-10">
            <motion.h1
              variants={headlineContainer}
              initial="hidden"
              animate="show"
              className="text-[3.8rem] lg:text-[4.8rem] font-[800] leading-[1.05] mb-6 tracking-tighter text-[#071233] text-left w-[70%]"
              style={{
                fontFamily: 'var(--font-jakarta)',
                textShadow: headlineShadow,
              }}
            >
              <div className="whitespace-nowrap">
                <motion.span variants={wordVariant} style={{ display: 'inline-block', marginRight: '0.22em' }}>First</motion.span>
                <motion.span variants={wordVariant} style={{ display: 'inline-block', marginRight: '0.22em' }}>Badge</motion.span>
              </div>
              <div className="whitespace-nowrap">
                <motion.span 
                  variants={accentVariant} 
                  className="text-[#0172FD]" 
                  style={{ display: 'inline-block', textShadow: accentShadow }}
                >
                  Unlocked!
                </motion.span>
              </div>
            </motion.h1>

            <motion.p
              initial={{ y: 14, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 28, delay: 0.4 }}
              className="text-[1.15rem] lg:text-2xl font-medium text-left text-slate-600 leading-snug mb-8 w-[70%]"
              style={{
                fontFamily: 'var(--font-jakarta)',
                textShadow: '0 0 15px rgba(255,255,255,1), 0 0 25px rgba(255,255,255,0.9)',
              }}
            >
              You’re making great progress. Keep going and achieve more!
            </motion.p>

            <div className="w-full flex flex-col gap-4">
              {/* Continue Button */}
              <motion.button
                animate={idle ? { scale: [1, 1.02, 1] } : { scale: 1 }}
                transition={idle ? { duration: 0.45, ease: 'easeInOut', times: [0, 0.5, 1] } : { type: 'spring', stiffness: 300, damping: 20 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleNext}
                className="w-full md:w-[70%] h-14 bg-[#0172FD] border-b-4 border-[#0050B3] text-white rounded-[1.2rem] font-[900] text-base tracking-wider hover:bg-[#0060D9] active:border-b-0 active:translate-y-[2px] transition-all flex items-center justify-center gap-3 shadow-[0_4px_15px_rgba(1,114,253,0.25)] cursor-pointer"
              >
                <span>Continue Your Journey</span>
                <ArrowRight className="w-5 h-5 stroke-[3]" />
              </motion.button>

              {/* Back Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleBack}
                className="w-full md:w-[70%] h-14 bg-white border-2 border-slate-200 text-slate-700 rounded-[1.2rem] font-[800] text-base flex items-center justify-center gap-2 hover:bg-slate-50 transition-all shadow-sm cursor-pointer"
              >
                <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
                <span>Back</span>
              </motion.button>
            </div>
          </div>

          {/* Bottom space for visual alignment */}
          <div className="h-4"></div>

        </div>

      </div>

    </div>
  );
}
