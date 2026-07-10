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

export default function OnboardingStep11() {
  const router = useRouter();
  const { isLoading, advance } = useOnboardingSession(11);
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
    router.push('/onboarding/10');
  };

  const headlineShadow = '0px 2px 3px rgba(255,255,255,0.9), 0px -1px 2px rgba(0,0,0,0.15), 0 0 15px rgba(255,255,255,1), 0 0 30px rgba(255,255,255,0.9), 0 0 45px rgba(255,255,255,0.8), 0 0 60px rgba(255,255,255,0.5)';
  const accentShadow   = '0px 2px 3px rgba(255,255,255,0.9), 0px -1px 2px rgba(1,114,253,0.4), 0 0 15px rgba(255,255,255,1), 0 0 30px rgba(255,255,255,0.9), 0 0 45px rgba(255,255,255,0.8), 0 0 60px rgba(255,255,255,0.5)';

  return (
    <div className="h-screen h-[100dvh] md:h-auto md:min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#EBF3FE] via-[#F4F8FF] to-[#FFFFFF] overflow-hidden relative select-none">
      
      {/* 📱 MOBILE-ONLY LAYOUT: Strict 60/40 Split */}
      <div className="flex flex-col h-screen h-[100dvh] w-full relative z-10 md:hidden overflow-hidden pb-6 pt-4 justify-between">
        
        {/* Top 60% Image Container - 100% of device width */}
        <div className="w-full h-[60dvh] flex flex-col justify-start items-center relative pt-4 overflow-visible shrink-0">
          
          {/* Mobile Progress Bar - padded horizontally */}
          <div className="w-full px-6 flex items-center gap-4 mb-4 shrink-0 relative z-20">
            <div className="flex-1 h-2.5 bg-[#E5EAEF] rounded-full overflow-hidden shadow-inner">
              <motion.div
                initial={{ width: `${(10 / 15) * 100}%` }}
                animate={{ width: `${(11 / 15) * 100}%` }}
                transition={{ type: 'spring', stiffness: 280, damping: 24, mass: 0.8, delay: 0.25 }}
                className="h-full rounded-full"
                style={{
                  background: 'linear-gradient(90deg, #0172FD 0%, #3A96FF 100%)',
                  boxShadow: 'inset 0px -2px 0px rgba(0,0,0,0.1), inset 0px 2px 0px rgba(255,255,255,0.3)',
                }}
              />
            </div>
            <span className="text-sm font-[800] text-[#0172FD] shrink-0" style={{ textShadow: '0 0 10px rgba(255,255,255,1)' }}>
              11/15
            </span>
          </div>

          {/* Mascot Section inside top container - stretches to 100% width of device */}
          <motion.div
            initial={{ scale: 0.6, y: -20 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            className="w-full flex-1 flex items-center justify-center relative select-none mt-2 px-0"
          >
            {/* Bubble background spans 100% of container width */}
            <div className="absolute inset-0 w-full h-full pointer-events-none">
              <MascotBackground />
            </div>
            
            {/* Mascot image is exactly 80% of device width and container height, centered vertically and horizontally */}
            <motion.div layoutId="tey-mascot" className="absolute w-[80vw] h-[80%] z-10 scale-[1.2] origin-center">
              <Image 
                src="/User onboarding Assets/Step_11_image_mobile.PNG" 
                alt="Tey Mascot Mobile" 
                fill 
                className="object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.12)] scale-[1.2] origin-center" 
                priority 
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom 40% Text & CTA Container - padded horizontally with white background and soft top fade */}
        <div className="w-full h-[40dvh] flex flex-col justify-start items-center relative z-20 pb-4 px-6 bg-white pt-2">
          
          {/* Soft white shadow fade overlay at the top boundary */}
          <div className="absolute -top-14 left-0 right-0 h-14 bg-gradient-to-b from-transparent to-white pointer-events-none z-10" />

          {/* Typography container - aligned top */}
          <div className="w-full flex flex-col items-center text-center mt-1 mb-3 px-2 z-20 shrink-0">
            {/* Relative scaled heading - constrained to 80% of device width */}
            <motion.h1
              variants={headlineContainer}
              initial="hidden"
              animate="show"
              className="text-[9.5vw] xs:text-[10vw] sm:text-4xl font-[900] leading-[1.08] mb-1.5 tracking-tight text-[#071233] w-[80vw] mx-auto text-center"
              style={{ fontFamily: 'var(--font-jakarta)', textShadow: headlineShadow }}
            >
              <div className="whitespace-nowrap">
                <motion.span variants={wordVariant} style={{ display: 'inline-block', marginRight: '0.22em' }}>Start</motion.span>
                <motion.span variants={wordVariant} style={{ display: 'inline-block' }}>your</motion.span>
              </div>
              <div className="whitespace-nowrap">
                <motion.span variants={accentVariant} className="text-[#0172FD]" style={{ display: 'inline-block', textShadow: accentShadow }}>streak!</motion.span>
              </div>
            </motion.h1>

            {/* Relative scaled subtitle */}
            <motion.p
              initial={{ y: 14, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 28, delay: 0.3 }}
              className="text-[3.6vw] xs:text-[3.9vw] sm:text-base font-medium text-slate-500 leading-tight max-w-[90%]"
              style={{ fontFamily: 'var(--font-jakarta)' }}
            >
              Your daily practice builds momentum. Keep it going and unlock your potential!
            </motion.p>
          </div>

          {/* CTA Buttons: Side by side row, constrained to 80vw, and anchored above the page bottom */}
          <motion.div
            initial={{ y: 22, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28, delay: 0.4 }}
            className="w-[80vw] mx-auto flex items-center gap-3 justify-center relative z-30 mb-[4vh] mt-auto shrink-0"
          >
            {/* Back Button */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.94, transition: { type: 'spring', stiffness: 500, damping: 15 } }}
              onClick={handleBack}
              className="w-14 h-12 flex items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-700 transition-colors shrink-0"
              style={{ boxShadow: 'inset 0px -4px 0px rgba(0,0,0,0.06), inset 0px 2px 0px rgba(255,255,255,0.8)' }}
            >
              <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
            </motion.button>

            {/* Continue Button */}
            <motion.button
              animate={idle ? { scale: [1, 1.025, 1] } : { scale: 1 }}
              transition={idle ? { duration: 0.45, ease: 'easeInOut', times: [0, 0.5, 1] } : { type: 'spring', stiffness: 300, damping: 20 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.96, transition: { type: 'spring', stiffness: 500, damping: 15 } }}
              onClick={handleNext}
              className="flex-1 h-12 bg-[#0172FD] border-b-4 border-[#0050B3] text-white rounded-[1.2rem] font-[900] text-base tracking-wider hover:bg-[#0060D9] active:border-b-0 active:translate-y-[2px] active:h-[10px] transition-all cursor-pointer flex items-center justify-center shadow-[0_4px_15px_rgba(1,114,253,0.25)] gap-2"
            >
              <span>Let&apos;s Go!</span>
              <ArrowRight className="w-5 h-5 stroke-[2.8]" />
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* 🖥️ DESKTOP-ONLY LAYOUT */}
      <div className="hidden md:flex flex-row w-full h-screen relative z-10 overflow-hidden items-stretch justify-center">
        
        {/* Left Column (50%): Mascot Container with bubble background */}
        <div className="w-1/2 h-full flex items-center justify-center relative bg-gradient-to-br from-[#EBF3FE] via-[#F4F8FF] to-[#FFFFFF] overflow-hidden select-none">
          <div className="absolute inset-0 w-full h-full pointer-events-none">
            <MascotBackground />
          </div>
          <motion.div
            layoutId="tey-mascot-desktop"
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 220, damping: 24 }}
            className="relative w-[100%] h-[100%] z-10 flex items-center justify-center p-12"
          >
            <Image 
              src="/User onboarding Assets/Step_11_image_desktop.PNG" 
              alt="Tey Mascot Desktop" 
              fill 
              className="object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.15)] scale-[1.05]" 
              priority 
            />
          </motion.div>
        </div>

        {/* Right Column (50%): Content Container */}
        <div className="w-1/2 h-full bg-white flex flex-col justify-between p-12 lg:p-20 relative select-none">
          
          {/* Progress row */}
          <div className="w-full flex items-center gap-5 relative z-10 pt-4 shrink-0">
            <div className="flex-1 h-3.5 bg-[#E5EAEF] rounded-full overflow-hidden shadow-inner">
              <motion.div
                initial={{ width: `${(10 / 15) * 100}%` }}
                animate={{ width: `${(11 / 15) * 100}%` }}
                transition={{ type: 'spring', stiffness: 280, damping: 24, delay: 0.25 }}
                className="h-full rounded-full"
                style={{
                  background: 'linear-gradient(90deg, #0172FD 0%, #3A96FF 100%)',
                  boxShadow: 'inset 0px -3px 0px rgba(0,0,0,0.1), inset 0px 3px 0px rgba(255,255,255,0.3)',
                }}
              />
            </div>
            <span className="text-base font-extrabold text-[#0172FD] shrink-0" style={{ textShadow: '0 0 10px rgba(255,255,255,1)' }}>
              11/15
            </span>
          </div>

          {/* Typography Content Column */}
          <div className="w-full flex-1 flex flex-col justify-center items-start relative z-10 max-w-[500px]">
            
            {/* Desktop Headline with character-hugging shadow glow effect */}
            <motion.h1
              variants={headlineContainer}
              initial="hidden"
              animate="show"
              className="text-[4rem] lg:text-[5.5rem] font-[800] leading-[1.05] mb-6 tracking-tighter text-[#071233] text-left relative z-10"
              style={{
                fontFamily: 'var(--font-jakarta)',
                textShadow: headlineShadow,
              }}
            >
              <div className="whitespace-nowrap">
                <motion.span variants={wordVariant} style={{ display: 'inline-block', marginRight: '0.22em' }}>Start</motion.span>
                <motion.span variants={wordVariant} style={{ display: 'inline-block' }}>your</motion.span>
              </div>
              <div className="whitespace-nowrap">
                <motion.span 
                  variants={accentVariant} 
                  className="text-[#0172FD]" 
                  style={{ display: 'inline-block', textShadow: accentShadow }}
                >
                  streak!
                </motion.span>
              </div>
            </motion.h1>

            {/* Desktop Subtext with soft white character-hugging shadow glow wrapper */}
            <motion.p
              initial={{ y: 14, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 28, delay: 0.4 }}
              className="text-[1.25rem] lg:text-3xl font-medium text-left text-slate-500 leading-snug"
              style={{
                fontFamily: 'var(--font-jakarta)',
                display: 'inline',
                boxShadow: '0 0 15px 10px rgba(255,255,255,0.95)',
                WebkitBoxDecorationBreak: 'clone',
                boxDecorationBreak: 'clone',
                borderRadius: '4px',
                padding: '2px 4px',
              }}
            >
              Build momentum and unlock your potential. Consistency today, mastery tomorrow.
            </motion.p>
          </div>

          {/* Desktop CTA Row */}
          <div className="w-full flex items-center gap-4 relative z-10 shrink-0 pb-4 max-w-[500px]">
            {/* Back Button */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.94, transition: { type: 'spring', stiffness: 500, damping: 15 } }}
              onClick={handleBack}
              className="w-[70px] h-[55px] md:h-[60px] flex items-center justify-center rounded-[1.2rem] bg-white border border-slate-200 text-slate-700 transition-colors shrink-0"
              style={{ boxShadow: 'inset 0px -4px 0px rgba(0,0,0,0.06), inset 0px 2px 0px rgba(255,255,255,0.8)' }}
            >
              <ArrowLeft className="w-6 h-6 stroke-[2.5]" />
            </motion.button>

            {/* Continue Button */}
            <motion.button
              animate={idle ? { scale: [1, 1.025, 1] } : { scale: 1 }}
              transition={idle ? { duration: 0.45, ease: 'easeInOut', times: [0, 0.5, 1] } : { type: 'spring', stiffness: 300, damping: 20 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.96, transition: { type: 'spring', stiffness: 500, damping: 15 } }}
              onClick={handleNext}
              className="flex-grow h-[55px] md:h-[60px] bg-[#0172FD] border-b-4 border-[#0050B3] text-white rounded-[1.2rem] font-[900] text-lg tracking-wider hover:bg-[#0060D9] active:border-b-0 active:translate-y-[2px] active:h-[53px] transition-all cursor-pointer flex items-center justify-center shadow-[0_4px_15px_rgba(1,114,253,0.25)] gap-3"
            >
              <span>Let&apos;s Go!</span>
              <ArrowRight className="w-6 h-6 stroke-[2.8]" />
            </motion.button>
          </div>
        </div>

      </div>

    </div>
  );
}
