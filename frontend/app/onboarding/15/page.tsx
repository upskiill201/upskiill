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

// Celebration Confetti Particles Configuration
const confettiColors = ['#0172FD', '#FBBF24', '#F97316', '#A855F7', '#22D3EE', '#EC4899', '#10B981'];
const particles = Array.from({ length: 45 }).map((_, i) => {
  const angle = (i / 45) * 360;
  const distance = 35 + Math.random() * 45; // percentage radius from explosion center
  const rad = (angle * Math.PI) / 180;
  return {
    id: i,
    x: 50 + Math.cos(rad) * distance,
    y: 35 + Math.sin(rad) * distance,
    color: confettiColors[i % confettiColors.length],
    delay: Math.random() * 0.8,
    scale: 0.4 + Math.random() * 0.7,
    rotate: Math.random() * 720,
    duration: 1.6 + Math.random() * 1.2
  };
});

export default function OnboardingStep15() {
  const router = useRouter();
  const { isLoading, advance } = useOnboardingSession(15);
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
    router.push('/onboarding/14');
  };

  const headlineShadow = '0px 2px 3px rgba(255,255,255,0.9), 0px -1px 2px rgba(0,0,0,0.15), 0 0 15px rgba(255,255,255,1), 0 0 30px rgba(255,255,255,0.9), 0 0 45px rgba(255,255,255,0.8), 0 0 60px rgba(255,255,255,0.5)';
  const accentShadow   = '0px 2px 3px rgba(255,255,255,0.9), 0px -1px 2px rgba(1,114,253,0.4), 0 0 15px rgba(255,255,255,1), 0 0 30px rgba(255,255,255,0.9), 0 0 45px rgba(255,255,255,0.8), 0 0 60px rgba(255,255,255,0.5)';

  return (
    <div className="w-full relative select-none bg-gradient-to-br from-[#EBF3FE] via-[#F4F8FF] to-[#FFFFFF] overflow-hidden">
      
      {/* 📱 MOBILE-ONLY LAYOUT: Strict 60/40 Split - 100dvh hard lock, no scroll */}
      <div className="flex flex-col w-full relative z-10 md:hidden" style={{ height: '100dvh', overflow: 'hidden' }}>
        
        {/* Top 60% Image Container */}
        <div className="w-full h-[60dvh] flex flex-col justify-start items-center relative overflow-hidden shrink-0">
          
          {/* Mobile Progress Bar */}
          <div className="w-full px-6 flex items-center gap-4 shrink-0 relative z-30 pt-[max(env(safe-area-inset-top),12px)] pb-3">
            <div className="flex-1 h-2.5 bg-[#E5EAEF] rounded-full overflow-hidden shadow-inner">
              <motion.div
                initial={{ width: `${(14 / 15) * 100}%` }}
                animate={{ width: `${(15 / 15) * 100}%` }}
                transition={{ type: 'spring', stiffness: 280, damping: 24, mass: 0.8, delay: 0.25 }}
                className="h-full rounded-full"
                style={{
                  background: 'linear-gradient(90deg, #0172FD 0%, #3A96FF 100%)',
                  boxShadow: 'inset 0px -2px 0px rgba(0,0,0,0.1), inset 0px 2px 0px rgba(255,255,255,0.3)',
                }}
              />
            </div>
            <span className="text-sm font-[800] text-[#0172FD] shrink-0" style={{ textShadow: '0 0 10px rgba(255,255,255,1)' }}>
              15/15
            </span>
          </div>

          {/* Bubbles and Confetti Layer */}
          <div className="absolute inset-0 w-full h-full pointer-events-none z-10">
            <MascotBackground />
            
            {/* Fireworks / Celebration Confetti */}
            {particles.map((p) => (
              <motion.div
                key={p.id}
                initial={{ x: '50vw', y: '28vh', scale: 0, opacity: 1, rotate: 0 }}
                animate={{ 
                  x: `${p.x}vw`, 
                  y: `${p.y}vh`, 
                  scale: p.scale, 
                  rotate: p.rotate,
                  opacity: [1, 1, 0.7, 0] 
                }}
                transition={{ 
                  duration: p.duration, 
                  ease: [0.1, 0.8, 0.3, 1],
                  delay: p.delay,
                  repeat: Infinity,
                  repeatDelay: 1.8
                }}
                className="absolute w-2.5 h-2.5 rounded-sm"
                style={{ backgroundColor: p.color, transform: 'translate(-50%, -50%)' }}
              />
            ))}
          </div>

          {/* Mascot Image (80% size of container) */}
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 220, damping: 24, delay: 0.1 }}
            className="relative w-[80%] h-[80%] mt-auto z-20 flex items-center justify-center"
          >
            <Image 
              src="/User onbarding Assets/step_15_image_mobile.webp" 
              alt="You're All Set Mascot Mobile" 
              fill 
              className="object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.12)]" 
              priority 
            />
          </motion.div>
        </div>

        {/* Bottom 40% Text & CTA Container */}
        <div className="w-full h-[40dvh] flex flex-col justify-between items-center relative z-20 pb-[max(env(safe-area-inset-bottom),24px)] px-6 bg-white shrink-0">
          
          {/* Soft top gradient overlay */}
          <div className="absolute -top-10 left-0 right-0 h-10 bg-gradient-to-b from-transparent to-white pointer-events-none z-10" />

          {/* Centered Typography */}
          <div className="w-full flex-grow flex flex-col justify-center items-center text-center mt-2 px-2 z-20">
            <motion.h1
              variants={headlineContainer}
              initial="hidden"
              animate="show"
              className="text-[9.5vw] xs:text-[10vw] sm:text-5xl font-[900] leading-[1.05] mb-2 tracking-tighter text-[#071233] w-[70%] mx-auto"
              style={{
                fontFamily: 'var(--font-jakarta)',
                textShadow: headlineShadow,
              }}
            >
              <div className="block">
                <motion.span variants={wordVariant} style={{ display: 'inline-block' }}>You{"'"}re</motion.span>
              </div>
              <div className="block">
                <motion.span 
                  variants={accentVariant} 
                  className="text-[#0172FD]" 
                  style={{ display: 'inline-block', textShadow: accentShadow }}
                >
                  all set!
                </motion.span>
              </div>
            </motion.h1>

            <motion.p
              initial={{ y: 14, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 28, delay: 0.4 }}
              className="text-[4vw] xs:text-[4.2vw] sm:text-base font-semibold text-slate-500 leading-snug max-w-[90%] mx-auto"
              style={{
                fontFamily: 'var(--font-jakarta)',
                textShadow: '0 0 15px rgba(255,255,255,1), 0 0 25px rgba(255,255,255,0.9)',
              }}
            >
              Your dashboard is ready.<br />
              Let{"'"}s achieve great things together.
            </motion.p>
          </div>

          {/* 3D Action Buttons */}
          <div className="w-full flex flex-col gap-3 shrink-0 items-center">
            <motion.button
              animate={idle ? { scale: [1, 1.02, 1] } : { scale: 1 }}
              transition={idle ? { duration: 0.45, ease: 'easeInOut', times: [0, 0.5, 1] } : { type: 'spring', stiffness: 300, damping: 20 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              onClick={handleNext}
              className="w-[70%] h-12 bg-[#0172FD] border-b-4 border-[#0050B3] text-white rounded-[1.2rem] font-[900] text-base tracking-wider hover:bg-[#0060D9] active:border-b-0 active:translate-y-[2px] transition-all flex items-center justify-center gap-2 shadow-[0_4px_15px_rgba(1,114,253,0.25)] cursor-pointer"
            >
              <span>Enter Teyro</span>
              <ArrowRight className="w-4.5 h-4.5 stroke-[3]" />
            </motion.button>

            {/* Back Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              onClick={handleBack}
              className="w-[70%] h-12 bg-white border-2 border-slate-200 text-slate-700 rounded-[1.2rem] font-[800] text-sm flex items-center justify-center gap-2 hover:bg-slate-50 transition-all shadow-sm cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
              <span>Back</span>
            </motion.button>
          </div>

        </div>

      </div>

      {/* 🖥️ DESKTOP-ONLY LAYOUT */}
      <div className="hidden md:flex w-full h-screen items-center justify-center bg-gradient-to-br from-[#EBF3FE] via-[#F4F8FF] to-[#FFFFFF] p-8 lg:p-12 relative z-10">
        
        {/* Main 70vw transparent layout container */}
        <div className="w-[70vw] h-full flex flex-row-reverse relative overflow-hidden items-center justify-center gap-12 lg:gap-20">
          
          {/* Right Column (70%): Mascot Container with bubble background & confetti */}
          <div className="w-[70%] h-full flex items-center justify-start relative select-none">
            
            {/* Background floating animations */}
            <div className="absolute inset-0 w-full h-full pointer-events-none">
              <MascotBackground />
              
              {/* Confetti Explosion behind the podium */}
              {particles.map((p) => (
                <motion.div
                  key={p.id}
                  initial={{ x: '35vw', y: '35vh', scale: 0, opacity: 1, rotate: 0 }}
                  animate={{ 
                    x: `${p.x - 15}vw`, 
                    y: `${p.y}vh`, 
                    scale: p.scale, 
                    rotate: p.rotate,
                    opacity: [1, 1, 0.7, 0] 
                  }}
                  transition={{ 
                    duration: p.duration, 
                    ease: [0.1, 0.8, 0.3, 1],
                    delay: p.delay,
                    repeat: Infinity,
                    repeatDelay: 1.5
                  }}
                  className="absolute w-3 h-3 rounded-sm"
                  style={{ backgroundColor: p.color, transform: 'translate(-50%, -50%)' }}
                />
              ))}
            </div>

            {/* Mascot Image (80% size of column container) */}
            <motion.div
              layoutId="tey-mascot-desktop"
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 220, damping: 24 }}
              className="relative w-[80%] h-[80%] z-10 flex items-center justify-center"
            >
              <Image 
                src="/User onbarding Assets/step_15_image_desktop.webp" 
                alt="You're All Set Mascot Desktop" 
                fill 
                className="object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.15)]" 
                priority 
              />
            </motion.div>
          </div>

          {/* Left Column (30%): Content Container without background */}
          <div className="w-[30%] h-full flex flex-col justify-center items-start py-12 relative select-none pl-4">
            
            {/* Progress row - top left aligned with text content */}
            <div className="w-[85%] max-w-[360px] flex flex-row items-center gap-5 relative z-10 mb-8 shrink-0">
              <div className="flex-1 h-5 bg-[#E5EAEF] rounded-full overflow-hidden shadow-inner">
                <motion.div
                  initial={{ width: `${(14 / 15) * 100}%` }}
                  animate={{ width: `${(15 / 15) * 100}%` }}
                  transition={{ type: 'spring', stiffness: 280, damping: 24, delay: 0.25 }}
                  className="h-full rounded-full"
                  style={{
                    background: 'linear-gradient(90deg, #0172FD 0%, #3A96FF 100%)',
                    boxShadow: 'inset 0px -2.5px 0px rgba(0,0,0,0.1), inset 0px 2.5px 0px rgba(255,255,255,0.3)',
                  }}
                />
              </div>
              <span className="text-lg font-extrabold text-[#0172FD] shrink-0">
                15/15
              </span>
            </div>

            {/* Core Content Box */}
            <div className="w-full flex-grow flex flex-col justify-center items-start relative z-10">
              
              {/* Heading */}
              <motion.h1
                variants={headlineContainer}
                initial="hidden"
                animate="show"
                className="text-[3.2rem] lg:text-[4rem] font-[900] leading-[1.05] mb-4 tracking-tighter text-[#071233] text-left w-full"
                style={{
                  fontFamily: 'var(--font-jakarta)',
                  textShadow: headlineShadow,
                }}
              >
                <div className="whitespace-nowrap">
                  <motion.span variants={wordVariant} style={{ display: 'inline-block', marginRight: '0.22em' }}>You{"'"}re</motion.span>
                </div>
                <div className="whitespace-nowrap">
                  <motion.span 
                    variants={accentVariant} 
                    className="text-[#0172FD]" 
                    style={{ display: 'inline-block', textShadow: accentShadow }}
                  >
                    all set!
                  </motion.span>
                </div>
              </motion.h1>

              {/* Subtext */}
              <motion.p
                initial={{ y: 14, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 28, delay: 0.4 }}
                className="text-[1.05rem] lg:text-lg font-semibold text-left text-slate-500 leading-snug mb-8 w-full"
                style={{
                  fontFamily: 'var(--font-jakarta)',
                  textShadow: '0 0 15px rgba(255,255,255,1), 0 0 25px rgba(255,255,255,0.9)',
                }}
              >
                Your dashboard is ready. Start exploring and keep leveling up!
              </motion.p>

              {/* Action Buttons Row */}
              <div className="w-full max-w-[360px] flex flex-row items-center gap-4">
                {/* Back Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleBack}
                  className="w-14 h-14 bg-white border-2 border-slate-200 text-slate-700 rounded-full flex items-center justify-center hover:bg-slate-50 transition-all shadow-sm shrink-0 cursor-pointer"
                >
                  <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
                </motion.button>

                {/* Continue Button */}
                <motion.button
                  animate={idle ? { scale: [1, 1.02, 1] } : { scale: 1 }}
                  transition={idle ? { duration: 0.45, ease: 'easeInOut', times: [0, 0.5, 1] } : { type: 'spring', stiffness: 300, damping: 20 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleNext}
                  className="flex-grow h-14 bg-[#0172FD] border-b-4 border-[#0050B3] text-white rounded-[1.2rem] font-[900] text-base tracking-wider hover:bg-[#0060D9] active:border-b-0 active:translate-y-[2px] transition-all flex items-center justify-center gap-3 shadow-[0_4px_15px_rgba(1,114,253,0.25)] cursor-pointer"
                >
                  <span>Enter Teyro</span>
                  <ArrowRight className="w-5 h-5 stroke-[3]" />
                </motion.button>
              </div>
            </div>

            {/* Bottom space for visual alignment */}
            <div className="h-4"></div>

          </div>

        </div>

      </div>

    </div>
  );
}
