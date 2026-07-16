'use client';
import { playHaptic } from '@/lib/haptics';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, Variants } from 'framer-motion';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { MascotBackground } from '@/components/onboarding/MascotBackground';
import { useOnboardingSession } from '@/hooks/useOnboardingSession';
import { StepSkeleton } from '@/components/onboarding/StepSkeleton';

// ─── Headline word stagger ───────────────────────────────────────────────────
const headlineContainer: any = {
  hidden: { opacity: 0 },
  show: { 
    opacity: 1,
    transition: { staggerChildren: 0.055, delayChildren: 0.1 } 
  }
};
const wordVariant: any = {
  hidden: { y: 20, opacity: 0 },
  show:  { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 400, damping: 28 } }
};
const accentVariant: any = {
  hidden: { y: 20, opacity: 0, scale: 0.75 },
  show:  { y: 0, opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 500, damping: 20 } }
};
// ────────────────────────────────────────────────────────────────────────────

export default function OnboardingStep1() {
  const router = useRouter();
  const { isLoading, advance } = useOnboardingSession(1);
  const [idle, setIdle] = useState(false);

  // Idle whisper nudge: pulse CTA once after 1.5 s if user hasn't tapped
  // Must be declared BEFORE the early return to satisfy Rules of Hooks
  useEffect(() => {
    const t = setTimeout(() => setIdle(true), 1500);
    return () => clearTimeout(t);
  }, []);

  const headlineShadow = '0px 2px 3px rgba(255,255,255,0.9), 0px -1px 2px rgba(0,0,0,0.15), 0 0 15px rgba(255,255,255,1), 0 0 30px rgba(255,255,255,0.9), 0 0 45px rgba(255,255,255,0.8), 0 0 60px rgba(255,255,255,0.5)';
  const accentShadow   = '0px 2px 3px rgba(255,255,255,0.9), 0px -1px 2px rgba(1,114,253,0.4), 0 0 15px rgba(255,255,255,1), 0 0 30px rgba(255,255,255,0.9), 0 0 45px rgba(255,255,255,0.8), 0 0 60px rgba(255,255,255,0.5)';

  // Early return AFTER all hooks
  if (isLoading) return <StepSkeleton />;

  return (
    <div className="h-screen h-[100dvh] md:h-auto md:min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#F5F8FF] to-[#E5EDFF] overflow-hidden relative">
      
      {/* Mobile bottom white soft fade */}
      <div className="absolute bottom-0 left-0 right-0 h-[50dvh] bg-gradient-to-b from-transparent via-[#F7F8FC] to-[#F7F8FC] via-[20%] md:hidden z-0" />

      {/* Decorative background */}
      <div className="absolute top-10 left-10 w-6 h-6 text-white opacity-60 z-0">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5Z" /></svg>
      </div>
      <div className="absolute top-40 right-20 w-8 h-8 text-white opacity-40">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5Z" /></svg>
      </div>
      <div className="absolute bottom-20 left-1/4 w-8 h-8 opacity-20">
        <svg viewBox="0 0 24 24" fill="currentColor" className="text-blue-300"><path d="M12 2.5L21.5 8v11L12 24.5 2.5 19V8L12 2.5z" /></svg>
      </div>
      <div className="absolute top-24 right-1/3 w-12 h-12 opacity-10">
        <svg viewBox="0 0 24 24" fill="currentColor" className="text-blue-400"><path d="M12 2.5L21.5 8v11L12 24.5 2.5 19V8L12 2.5z" /></svg>
      </div>

      {/* MOBILE-ONLY LAYOUT: Strict 50/50 Split */}
      <div className="flex flex-col h-screen h-[100dvh] w-full relative z-10 md:hidden overflow-hidden pb-6 pt-4 justify-between">
        
        {/* Top 60% Image Container - 100% of device width */}
        <div className="w-full h-[60dvh] flex flex-col justify-start items-center relative pt-4 overflow-visible">
          {/* Mobile Progress Bar - padded horizontally */}
          <div className="w-full px-6 flex items-center gap-3.5 mb-4 shrink-0 relative z-20">
            <button 
              onClick={() => router.push('/onboarding/0')} 
              className="w-10 h-10 bg-white/95 border border-slate-200 text-slate-700 rounded-full flex items-center justify-center shrink-0 shadow-sm hover:bg-slate-50 transition-all cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
            </button>
            <div className="flex-1 h-2.5 bg-[#E5EAEF] rounded-full overflow-hidden shadow-inner">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(1 / 15) * 100}%` }}
                transition={{ type: 'spring', stiffness: 280, damping: 24, mass: 0.8, delay: 0.6 }}
                className="h-full rounded-full"
                style={{ background: 'linear-gradient(90deg, #0172FD 0%, #3A96FF 100%)', boxShadow: 'inset 0px -2px 0px rgba(0,0,0,0.1), inset 0px 2px 0px rgba(255,255,255,0.3)' }}
              />
            </div>
            <span className="text-sm font-[800] text-[#0172FD] shrink-0" style={{ textShadow: '0 0 10px rgba(255,255,255,1)' }}>1/15</span>
          </div>

          {/* Mascot Section inside top container - stretches to 100% width of device */}
          <motion.div
            initial={{ scale: 0.6, y: -20 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            className="w-full flex-1 flex items-stretch justify-center relative select-none mt-2 px-0"
          >
            {/* Bubble background spans 100% of container width */}
            <div className="relative w-full h-full flex items-center justify-center">
              <div className="absolute inset-0 w-full h-full">
                <MascotBackground />
              </div>
              {/* Mascot image is exactly 90% of its container width and height, upscaled to look massive */}
              <motion.div layoutId="tey-mascot" className="absolute w-[90%] h-[90%] z-10 scale-[1.3] origin-center">
                <Image src="/User%20onbarding%20Assets/Tey_welcome.PNG" alt="Tey Welcome Mascot" fill className="object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.12)]" priority />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Bottom 40% Text & CTA Container - padded horizontally with white background and soft top fade */}
        <div className="w-full h-[40dvh] flex flex-col justify-between items-center relative z-20 pb-4 px-6 bg-white">
          
          {/* Soft white shadow fade overlay at the top boundary */}
          <div className="absolute -top-14 left-0 right-0 h-14 bg-gradient-to-b from-transparent to-white pointer-events-none z-10" />

          {/* Centered Typography container */}
          <div className="w-full flex-1 flex flex-col justify-center items-center text-center mt-2 mb-4 px-2 z-20">
            {/* Relative scaled heading - constrained to 80% width */}
            <motion.h1
              variants={headlineContainer}
              initial="hidden"
              animate="show"
              className="text-[16vw] xs:text-[17vw] sm:text-6xl font-[900] leading-[0.98] mb-3 tracking-tighter text-[#071233] w-[80%] mx-auto"
              style={{ fontFamily: 'var(--font-jakarta)', textShadow: headlineShadow }}
            >
              <motion.span variants={wordVariant} style={{ display: 'inline-block' }}>
                Welcome
              </motion.span>
              <br />
              <motion.span variants={wordVariant} style={{ display: 'inline-block', marginRight: '0.15em' }}>
                to
              </motion.span>
              <motion.span variants={accentVariant} style={{ display: 'inline-block', color: '#0172FD', textShadow: accentShadow }}>
                Teyro!
              </motion.span>
            </motion.h1>

            {/* Relative scaled subtitle */}
            <motion.p
              initial={{ y: 14, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 28, delay: 0.5 }}
              className="text-[4.5vw] xs:text-[4.8vw] sm:text-lg font-medium text-slate-600 leading-snug max-w-[90%]"
              style={{ fontFamily: 'var(--font-jakarta)', textShadow: '0 0 15px rgba(255,255,255,1), 0 0 25px rgba(255,255,255,0.9)' }}
            >
              Your journey to mastering<br /> new skills starts here.
            </motion.p>
          </div>

          {/* CTA: Continue Button with explicit margin bottom */}
          <motion.div
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28, delay: 0.65 }}
            className="w-full max-w-[340px] px-2 mb-6 z-20"
          >
            <motion.button
              animate={idle ? { scale: [1, 1.05, 1] } : { scale: 1 }}
              transition={idle ? { duration: 0.45, ease: 'easeInOut', times: [0, 0.5, 1] } : { type: 'spring', stiffness: 300, damping: 20 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.94, transition: { type: 'spring', stiffness: 500, damping: 15 } }}
              onClick={() => {
                setIdle(false);
                playHaptic('medium');
                void advance();
              }}
              className="relative z-10 w-full flex items-center justify-center py-4 rounded-[1.5rem] text-white font-bold text-lg"
              style={{ backgroundColor: '#0172FD', boxShadow: '0 12px 24px -8px rgba(1,114,253,0.4), inset 0px -6px 0px rgba(0,0,0,0.15), inset 0px 2px 0px rgba(255,255,255,0.2)' }}
            >
              <span>Get Started</span>
              <ArrowRight className="absolute right-6 w-5.5 h-5.5 stroke-[3]" />
            </motion.button>
          </motion.div>

        </div>
      </div>

      {/* DESKTOP-ONLY LAYOUT (hidden md:grid) */}
      <div className="hidden md:grid max-w-[1400px] w-full mx-auto relative z-10 grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-40 items-center px-8 lg:px-12">

        {/* LEFT COLUMN — Mascot drops in and bounces */}
        <motion.div
          initial={{ scale: 0.6, y: -40 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          className="w-full flex justify-start order-1"
        >
          {/* Desktop mascot container size reduced to 90% width of its column container, removing scale overrides */}
          <div className="relative w-[90%] aspect-square transition-transform z-10">
            <MascotBackground />
            <motion.div layoutId="tey-mascot" className="absolute inset-0 z-10">
              <Image src="/User%20onbarding%20Assets/Tey_welcome.PNG" alt="Tey Welcome Mascot" fill className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.15)]" priority />
            </motion.div>
          </div>
        </motion.div>

        {/* RIGHT COLUMN */}
        <div className="w-full flex flex-col justify-center order-2 relative">

          {/* DESKTOP PROGRESS BAR */}
          <div className="flex items-center gap-4 mb-10 relative z-10">
            <button 
              onClick={() => router.push('/onboarding/0')} 
              className="w-12 h-12 bg-white border border-slate-200 text-slate-700 rounded-full flex items-center justify-center hover:bg-slate-50 transition-all shadow-sm shrink-0 cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
            </button>
            <div className="flex-1 h-4 bg-[#E5EAEF] rounded-full overflow-hidden shadow-inner">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(1 / 15) * 100}%` }}
                transition={{ type: 'spring', stiffness: 280, damping: 24, mass: 0.8, delay: 0.5 }}
                className="h-full rounded-full relative"
                style={{ background: 'linear-gradient(90deg, #0172FD 0%, #3A96FF 100%)', boxShadow: 'inset 0px -3px 0px rgba(0,0,0,0.1), inset 0px 3px 0px rgba(255,255,255,0.3)' }}
              />
            </div>
            <span className="text-lg font-bold" style={{ color: '#0172FD' }}>1/15</span>
          </div>

          {/* ── HEADLINE ── */}
          <motion.h1
            variants={headlineContainer}
            initial="hidden"
            animate="show"
            className="text-[4.5rem] leading-[0.95] md:text-[7.5rem] lg:text-[8.5rem] font-[800] mb-6 tracking-tighter text-[#071233] text-left relative z-10"
            style={{ fontFamily: 'var(--font-jakarta)', textShadow: headlineShadow }}
          >
            <motion.span variants={wordVariant} style={{ display: 'inline-block' }}>
              Welcome
            </motion.span>
            <br />
            <motion.span variants={wordVariant} style={{ display: 'inline-block', marginRight: '0.2em' }}>
              to
            </motion.span>
            <motion.span variants={accentVariant} style={{ display: 'inline-block', color: '#0172FD', textShadow: accentShadow }}>
              Teyro!
            </motion.span>
          </motion.h1>

          {/* ── SUBTITLE ── */}
          <motion.p
            initial={{ y: 14, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28, delay: 0.5 }}
            className="text-[1.25rem] md:text-3xl lg:text-[2.25rem] mb-12 font-medium text-left text-slate-600 leading-snug md:max-w-[95%] relative z-10"
            style={{ fontFamily: 'var(--font-jakarta)', textShadow: '0 0 15px rgba(255,255,255,1), 0 0 25px rgba(255,255,255,0.9), 0 0 35px rgba(255,255,255,0.7)' }}
          >
            Your journey to mastering<br /> new skills starts here.
          </motion.p>

          {/* ── CTA ── */}
          <motion.div
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28, delay: 0.65 }}
          >
            <motion.button
              animate={idle ? { scale: [1, 1.05, 1] } : { scale: 1 }}
              transition={idle ? { duration: 0.45, ease: 'easeInOut', times: [0, 0.5, 1] } : { type: 'spring', stiffness: 300, damping: 20 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.94, transition: { type: 'spring', stiffness: 500, damping: 15 } }}
              onClick={() => {
                setIdle(false);
                playHaptic('medium');
                void advance();
              }}
              className="relative z-10 w-full md:w-[340px] lg:w-[400px] flex items-center justify-center py-5 md:py-6 rounded-[1.5rem] md:rounded-[2rem] text-white font-bold text-xl md:text-2xl"
              style={{ backgroundColor: '#0172FD', boxShadow: '0 16px 32px -8px rgba(1,114,253,0.5), inset 0px -6px 0px rgba(0,0,0,0.15), inset 0px 2px 0px rgba(255,255,255,0.2)' }}
            >
              <span>Get Started</span>
              <ArrowRight className="absolute right-8 md:right-10 w-6 h-6 md:w-7 md:h-7 stroke-[3]" />
            </motion.button>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
