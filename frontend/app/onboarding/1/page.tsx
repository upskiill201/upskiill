'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, Variants } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
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
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#F5F8FF] to-[#E5EDFF] overflow-hidden relative p-6 pt-20 md:p-12 md:pt-[100px]">
      
      {/* Mobile bottom white soft fade */}
      <div className="absolute bottom-0 left-0 right-0 h-[65%] bg-gradient-to-b from-transparent via-[#F7F8FC] to-[#F7F8FC] via-[25%] md:hidden z-0" />

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

      <div className="max-w-[1400px] w-full mx-auto relative z-10 flex flex-col md:grid md:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-40 items-center px-4 md:px-8 lg:px-12">

        {/* MOBILE PROGRESS BAR */}
        <div className="w-full flex items-center gap-4 md:hidden mb-6">
          <div className="flex-1 h-3 bg-[#E5EAEF] rounded-full overflow-hidden shadow-inner">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(1 / 15) * 100}%` }}
              transition={{ type: 'spring', stiffness: 280, damping: 24, mass: 0.8, delay: 0.6 }}
              className="h-full rounded-full"
              style={{ background: 'linear-gradient(90deg, #0172FD 0%, #3A96FF 100%)', boxShadow: 'inset 0px -2px 0px rgba(0,0,0,0.1), inset 0px 2px 0px rgba(255,255,255,0.3)' }}
            />
          </div>
          <span className="text-base font-bold" style={{ color: '#0172FD' }}>1/15</span>
        </div>

        {/* LEFT COLUMN — Mascot drops in and bounces */}
        <motion.div
          initial={{ scale: 0.6, y: -40 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          className="w-full flex justify-center md:justify-start order-1 md:order-1"
        >
          <div className="relative w-full max-w-[550px] md:w-full md:max-w-[900px] aspect-square scale-[1.75] sm:scale-[1.8] md:scale-[1.4] lg:scale-[1.65] -translate-y-[10px] md:translate-y-0 md:-translate-x-16 lg:-translate-x-[10.5rem] md:origin-left transition-transform">
            <MascotBackground />
            <motion.div layoutId="tey-mascot" className="absolute inset-0 z-10 md:scale-[1.15] lg:scale-[1.25]">
              <Image src="/User%20onbarding%20Assets/Tey_welcome.PNG" alt="Tey Welcome Mascot" fill className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.15)]" priority />
            </motion.div>
          </div>
        </motion.div>

        {/* RIGHT COLUMN */}
        <div className="w-full flex flex-col justify-center order-2 md:order-2 relative">

          {/* DESKTOP PROGRESS BAR */}
          <div className="hidden md:flex items-center gap-5 mb-10 relative z-10">
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

          {/* ── HEADLINE: word-by-word stagger ── */}
          <motion.h1
            variants={headlineContainer}
            initial="hidden"
            animate="show"
            className="text-[4.5rem] leading-[0.95] md:text-[7.5rem] lg:text-[8.5rem] font-[800] mb-6 tracking-tighter text-[#071233] text-center md:text-left relative z-10"
            style={{ fontFamily: 'var(--font-jakarta)', textShadow: headlineShadow }}
          >
            <motion.span variants={wordVariant} style={{ display: 'inline-block' }}>
              Welcome
            </motion.span>
            <br />
            <motion.span variants={wordVariant} style={{ display: 'inline-block', marginRight: '0.2em' }}>
              to
            </motion.span>
            {/* Accent word — scale-pops in last */}
            <motion.span variants={accentVariant} style={{ display: 'inline-block', color: '#0172FD', textShadow: accentShadow }}>
              Teyro!
            </motion.span>
          </motion.h1>

          {/* ── SUBTITLE ── */}
          <motion.p
            initial={{ y: 14, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28, delay: 0.5 }}
            className="text-[1.25rem] md:text-3xl lg:text-[2.25rem] mb-12 font-medium text-center md:text-left text-slate-600 leading-snug md:max-w-[95%] relative z-10"
            style={{ fontFamily: 'var(--font-jakarta)', textShadow: '0 0 15px rgba(255,255,255,1), 0 0 25px rgba(255,255,255,0.9), 0 0 35px rgba(255,255,255,0.7)' }}
          >
            Your journey to mastering<br /> new skills starts here.
          </motion.p>

          {/* ── CTA: arrives last + idle nudge ── */}
          <motion.div
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28, delay: 0.65 }}
          >
            <motion.button
              /* idle whisper nudge — tween so keyframes work */
              animate={idle ? { scale: [1, 1.05, 1] } : { scale: 1 }}
              transition={idle ? { duration: 0.45, ease: 'easeInOut', times: [0, 0.5, 1] } : { type: 'spring', stiffness: 300, damping: 20 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.94, transition: { type: 'spring', stiffness: 500, damping: 15 } }}
              onClick={() => {
                setIdle(false);
                if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(12);
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
