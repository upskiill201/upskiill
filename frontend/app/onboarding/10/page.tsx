'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Star, Gem, Flame } from 'lucide-react';
import { useOnboardingSession } from '@/hooks/useOnboardingSession';
import { MascotBackground } from '@/components/onboarding/MascotBackground';
import { StepSkeleton } from '@/components/onboarding/StepSkeleton';

// Decorative floating confetti/decor particles that pop on page load
interface ConfettiParticle {
  id: number;
  type: 'star' | 'circle' | 'ribbon';
  color: string;
  x: number; // target percentage offset x from center
  y: number; // target percentage offset y from center
  size: number;
  delay: number;
  rotation: number;
}

const CONFETTI_LIST: ConfettiParticle[] = [
  // Top Left Quadrant
  { id: 1, type: 'star', color: '#0172FD', x: -80, y: -140, size: 20, delay: 0.1, rotation: 12 },
  { id: 2, type: 'ribbon', color: '#3A96FF', x: -140, y: -100, size: 26, delay: 0.15, rotation: -45 },
  { id: 3, type: 'circle', color: '#0050B3', x: -60, y: -80, size: 14, delay: 0.2, rotation: 15 },
  { id: 4, type: 'star', color: '#E0F2FE', x: -110, y: -160, size: 18, delay: 0.08, rotation: -20 },
  { id: 5, type: 'ribbon', color: '#0172FD', x: -160, y: -60, size: 22, delay: 0.25, rotation: 35 },
  { id: 6, type: 'circle', color: '#3A96FF', x: -100, y: -110, size: 12, delay: 0.18, rotation: -10 },
  
  // Top Right Quadrant
  { id: 7, type: 'star', color: '#3A96FF', x: 80, y: -140, size: 22, delay: 0.12, rotation: 45 },
  { id: 8, type: 'ribbon', color: '#0172FD', x: 140, y: -100, size: 28, delay: 0.22, rotation: -30 },
  { id: 9, type: 'circle', color: '#E0F2FE', x: 60, y: -80, size: 12, delay: 0.05, rotation: 10 },
  { id: 10, type: 'star', color: '#0050B3', x: 110, y: -160, size: 16, delay: 0.3, rotation: 25 },
  { id: 11, type: 'ribbon', color: '#3A96FF', x: 160, y: -60, size: 24, delay: 0.28, rotation: -15 },
  { id: 12, type: 'circle', color: '#0172FD', x: 100, y: -110, size: 14, delay: 0.14, rotation: 40 },

  // Mid/Lower Left Area
  { id: 13, type: 'star', color: '#E0F2FE', x: -120, y: -20, size: 20, delay: 0.32, rotation: -5 },
  { id: 14, type: 'ribbon', color: '#0050B3', x: -150, y: 30, size: 24, delay: 0.16, rotation: 55 },
  { id: 15, type: 'circle', color: '#0172FD', x: -80, y: 50, size: 16, delay: 0.24, rotation: -25 },
  { id: 16, type: 'star', color: '#3A96FF', x: -130, y: 90, size: 18, delay: 0.35, rotation: 18 },

  // Mid/Lower Right Area
  { id: 17, type: 'star', color: '#0172FD', x: 120, y: -20, size: 18, delay: 0.27, rotation: 15 },
  { id: 18, type: 'ribbon', color: '#3A96FF', x: 150, y: 30, size: 26, delay: 0.19, rotation: -40 },
  { id: 19, type: 'circle', color: '#E0F2FE', x: 80, y: 50, size: 14, delay: 0.31, rotation: 5 },
  { id: 20, type: 'star', color: '#0050B3', x: 130, y: 90, size: 20, delay: 0.21, rotation: -22 },

  // Extra High Outer Boundary Pop Particles
  { id: 21, type: 'circle', color: '#3A96FF', x: -50, y: -200, size: 10, delay: 0.4, rotation: 0 },
  { id: 22, type: 'star', color: '#E0F2FE', x: 50, y: -200, size: 14, delay: 0.42, rotation: -12 },
  { id: 23, type: 'ribbon', color: '#0172FD', x: -180, y: -120, size: 22, delay: 0.45, rotation: 60 },
  { id: 24, type: 'star', color: '#3A96FF', x: 180, y: -120, size: 16, delay: 0.48, rotation: -50 },
  { id: 25, type: 'star', color: '#0172FD', x: -200, y: -40, size: 22, delay: 0.5, rotation: 22 },
  { id: 26, type: 'circle', color: '#3A96FF', x: 200, y: -40, size: 12, delay: 0.52, rotation: -18 },
  { id: 27, type: 'ribbon', color: '#0050B3', x: -90, y: -220, size: 24, delay: 0.55, rotation: -40 },
  { id: 28, type: 'star', color: '#E0F2FE', x: 90, y: -220, size: 20, delay: 0.58, rotation: 40 },
  { id: 29, type: 'circle', color: '#0172FD', x: -150, y: -190, size: 14, delay: 0.6, rotation: 10 },
  { id: 30, type: 'star', color: '#3A96FF', x: 150, y: -190, size: 18, delay: 0.62, rotation: -20 },
  { id: 31, type: 'ribbon', color: '#E0F2FE', x: -50, y: 120, size: 22, delay: 0.65, rotation: 15 },
  { id: 32, type: 'star', color: '#0172FD', x: 50, y: 120, size: 18, delay: 0.68, rotation: -15 }
];

export default function OnboardingStep10() {
  const router = useRouter();
  const { isLoading, saveAnswer, advance } = useOnboardingSession(10);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    
    // Trigger confetti explosion after exactly 2.0 seconds delay
    const timer = setTimeout(() => {
      setShowConfetti(true);
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate([30, 80, 40]);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <StepSkeleton />;

  const handleBack = () => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(10);
    router.push('/onboarding/9');
  };

  const handleContinue = () => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(12);
    saveAnswer({ completed: true });
    void advance();
  };

  const textShadowGlow = '0 0 15px rgba(255,255,255,1), 0 0 25px rgba(255,255,255,0.9), 0 0 35px rgba(255,255,255,0.7)';

  return (
    <div className="h-[100dvh] min-h-[100dvh] max-h-[100dvh] overflow-hidden bg-gradient-to-br from-[#EBF3FE] via-[#F4F8FF] to-[#FFFFFF] flex flex-col relative select-none">
      
      {/* Mobile bottom white soft gradient fade overlay (Matches Step 1) */}
      <div className="absolute bottom-0 left-0 right-0 h-[55%] bg-gradient-to-b from-transparent via-white/90 to-white via-[25%] md:hidden z-0 pointer-events-none" />

      {/* Absolute Header Shimmer Progress Bar (Consistent header style matching step 9) */}
      <div className="w-full max-w-[1200px] mx-auto px-5 md:px-10 pt-4 md:pt-8 z-30">
        <div className="relative flex items-center justify-center w-full mt-2 md:mt-[2vh]">
          
          {/* Centered progress indicator */}
          <div className="w-[60%] max-w-[280px] md:max-w-[400px] h-3 bg-[#E5EAEF] rounded-full overflow-hidden shadow-inner relative">
            <motion.div
              initial={{ width: `${(9 / 15) * 100}%` }}
              animate={{ width: `${(10 / 15) * 100}%` }}
              transition={{ type: 'spring', stiffness: 280, damping: 24, mass: 0.8, delay: 0.25 }}
              className="h-full rounded-full relative overflow-hidden"
              style={{ background: 'linear-gradient(90deg, #0172FD 0%, #3A96FF 100%)', boxShadow: 'inset 0px -4px 0px rgba(0,0,0,0.1), inset 0px 4px 0px rgba(255,255,255,0.3)' }}
            >
              {/* Shimmer sweep */}
              <div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                style={{
                  width: '50%',
                  animation: 'shimmer-sweep 2.2s infinite ease-in-out'
                }}
              />
            </motion.div>
          </div>

          {/* Right accomplishments / stats list */}
          <div className="absolute right-0 flex items-center gap-3 z-20">
            {/* Step indicator */}
            <span className="text-sm font-[800] text-[#0172FD]" style={{ textShadow: '0 0 10px rgba(255,255,255,1)' }}>10/15</span>
          </div>
        </div>
      </div>

      {/* Main Responsive Wrappers */}

      {/* MOBILE-ONLY LAYOUT (md:hidden) */}
      <div className="flex-1 w-full flex flex-col md:hidden relative z-10 h-full px-0 pt-2 pb-0 justify-between min-h-0">
        
        {/* Top half carrying Mascot + Confetti burst */}
        <div className="flex items-center justify-center w-full h-[52%] relative select-none">
          <MascotBackground />

          {/* Confetti burst wrapper */}
          <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
            {CONFETTI_LIST.map((p) => (
              <motion.div
                key={p.id}
                initial={{ scale: 0.1, opacity: 0, x: 0, y: 0 }}
                animate={showConfetti ? { 
                  scale: 1, 
                  opacity: 1, 
                  x: `${p.x}px`, 
                  y: `${p.y}px`,
                  rotate: p.rotation
                } : { scale: 0.1, opacity: 0, x: 0, y: 0 }}
                transition={{ 
                  type: 'spring', 
                  stiffness: 180, 
                  damping: 15, 
                  delay: p.delay,
                  mass: 0.6
                }}
                className="absolute flex items-center justify-center"
              >
                {p.type === 'star' && (
                  <Star 
                    className="w-5 h-5" 
                    style={{ color: p.color, fill: p.color }} 
                  />
                )}
                {p.type === 'circle' && (
                  <div 
                    className="rounded-full shadow-sm"
                    style={{ width: p.size, height: p.size, backgroundColor: p.color }}
                  />
                )}
                {p.type === 'ribbon' && (
                  <svg 
                    width={p.size} 
                    height={p.size} 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke={p.color} 
                    strokeWidth="3" 
                    strokeLinecap="round"
                  >
                    <path d="M4 12c4-6 8-6 12 0s8 6 12 0" />
                  </svg>
                )}
              </motion.div>
            ))}
          </div>

          {/* Glowing mascot image */}
          <div className="relative w-[90vw] h-[90vw] max-w-[380px] max-h-[380px] z-10">
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 3,
                ease: 'easeInOut',
              }}
              className="w-full h-full relative"
            >
              <Image 
                src="/User onbarding Assets/Step_10_image.PNG" 
                alt="Tey Victorious Robot" 
                fill 
                className="object-contain drop-shadow-[0_20px_45px_rgba(1,114,253,0.15)]"
                priority 
              />
            </motion.div>
          </div>
        </div>

        {/* Bottom half containing text and buttons */}
        <div className="w-full h-[48%] flex flex-col justify-center items-center text-center p-5 pb-8 z-20 gap-5">
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ type: 'spring', stiffness: 350, damping: 26, delay: 0.1 }}
            className="flex flex-col items-center text-center gap-5 w-full max-w-[340px] relative z-10"
          >
            {/* Titles & Copy */}
            <div className="w-full flex flex-col items-center gap-2.5">
              <h1
                className="text-[14vw] sm:text-6xl font-[900] tracking-tight text-[#071233] leading-[0.9] w-[90%] max-w-[340px] mx-auto"
                style={{ fontFamily: 'var(--font-jakarta)', textShadow: '0px 2px 3px rgba(255,255,255,0.9), 0px -1px 2px rgba(0,0,0,0.1), 0 0 15px rgba(255,255,255,1), 0 0 35px rgba(255,255,255,0.95), 0 0 50px rgba(255,255,255,0.85)' }}
              >
                Great <span className="text-[#0172FD]">job!</span>
              </h1>
              
              <p
                className="text-slate-500 font-medium text-[4.8vw] sm:text-base leading-relaxed max-w-[280px]"
                style={{ fontFamily: 'var(--font-jakarta)', textShadow: '0 0 15px rgba(255,255,255,1), 0 0 25px rgba(255,255,255,0.9)' }}
              >
                You completed the demo. Keep up the momentum!
              </p>
            </div>

            {/* Premium 3D Popping XP Point Badge (Glassmorphism) */}
            <div
              className="flex items-center gap-3 bg-white/60 backdrop-blur-md border border-white/80 border-b-[5px] border-slate-200/50 rounded-[1.5rem] px-4 py-2.5 shadow-[0_15px_30px_-5px_rgba(7,18,51,0.05),_0_6px_12px_-4px_rgba(1,114,253,0.03),_inset_0_1px_2px_rgba(255,255,255,0.7)] w-[70%] transition-transform hover:-translate-y-0.5 active:translate-y-0.5 active:border-b-[2px]"
            >
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#3A96FF] to-[#0172FD] flex items-center justify-center shadow-[0_5px_12px_rgba(1,114,253,0.25)] shrink-0 animate-[pulse_2s_infinite]">
                <Star className="w-5.5 h-5.5 text-white fill-white" />
              </div>

              <div className="flex flex-col items-start leading-tight">
                <span className="text-slate-400 font-extrabold text-[10px] tracking-wider uppercase mb-0.5">You earned</span>
                <div className="flex items-baseline gap-2" style={{ fontFamily: 'var(--font-jakarta)' }}>
                  <span className="text-[#0172FD] font-[900] text-3xl">+10</span>
                  <span className="text-[#071233] font-[900] text-xl">XP</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Action Row */}
          <div className="w-full flex items-center gap-3 max-w-[340px] mt-1">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.94, transition: { type: 'spring', stiffness: 500, damping: 15 } }}
              onClick={handleBack}
              className="w-14 h-14 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 shadow-sm hover:bg-slate-50 shrink-0 cursor-pointer"
            >
              <ArrowLeft className="w-6 h-6" />
            </motion.button>

            <motion.button 
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.94, transition: { type: 'spring', stiffness: 500, damping: 15 } }}
              onClick={handleContinue}
              className="flex-1 h-14 bg-[#0172FD] text-white rounded-2xl font-[900] text-base flex items-center justify-center gap-2 cursor-pointer"
              style={{ 
                fontFamily: 'var(--font-jakarta)',
                boxShadow: '0 12px 24px -8px rgba(1,114,253,0.4), inset 0px -6px 0px rgba(0,0,0,0.15), inset 0px 2px 0px rgba(255,255,255,0.2)'
              }}
            >
              <span>Continue Your Journey</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </div>

        </div>
      </div>

      {/* DESKTOP-ONLY LAYOUT (hidden md:flex) */}
      <div className="hidden md:flex flex-col flex-1 w-full relative z-10 max-w-[1200px] mx-auto px-10 pt-4 pb-8 justify-between select-none min-h-0">
        
        {/* Top Header Section (Centered Heading + Subtext above the Mascot) */}
        <div className="w-full flex flex-col items-center text-center gap-1 mt-[2vh]">
          <h1
            className="md:text-[4vw] lg:text-[4.5vw] xl:text-[5vw] font-[900] tracking-[0.03em] text-[#071233] leading-none"
            style={{ fontFamily: 'var(--font-jakarta)', textShadow: '0px 2px 3px rgba(255,255,255,0.9), 0px -1px 2px rgba(0,0,0,0.1), 0 0 15px rgba(255,255,255,1), 0 0 35px rgba(255,255,255,0.95), 0 0 50px rgba(255,255,255,0.85)' }}
          >
            Great <span className="text-[#0172FD]">job!</span>
          </h1>
          
          <p
            className="text-slate-500 font-medium text-lg lg:text-xl leading-relaxed mt-1"
            style={{ fontFamily: 'var(--font-jakarta)', textShadow: '0 0 15px rgba(255,255,255,1), 0 0 25px rgba(255,255,255,0.9)' }}
          >
            You’ve completed this step!
          </p>
        </div>

        {/* Middle Section (Grid containing centered Mascot and right-floating XP card) */}
        <div className="grid grid-cols-3 w-full items-center justify-center flex-1 min-h-0 relative mt-4">
          
          {/* Left Column Spacer */}
          <div className="col-span-1" />

          {/* Center Mascot Image Column (With massive Confetti Pop) */}
          <div className="col-span-1 flex items-center justify-center relative select-none">
            <MascotBackground />

            {/* Massive Desktop Confetti decoration burst */}
            <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none scale-125">
              {CONFETTI_LIST.map((p) => (
                <motion.div
                  key={p.id}
                  initial={{ scale: 0.1, opacity: 0, x: 0, y: 0 }}
                  animate={showConfetti ? { 
                    scale: 1.2, 
                    opacity: 1, 
                    x: `${p.x * 2.2}px`, 
                    y: `${p.y * 1.8}px`,
                    rotate: p.rotation
                  } : { scale: 0.1, opacity: 0, x: 0, y: 0 }}
                  transition={{ 
                    type: 'spring', 
                    stiffness: 150, 
                    damping: 14, 
                    delay: p.delay * 0.7, 
                    mass: 0.6
                  }}
                  className="absolute flex items-center justify-center"
                >
                  {p.type === 'star' && (
                    <Star 
                      className="w-6 h-6" 
                      style={{ color: p.color, fill: p.color }} 
                    />
                  )}
                  {p.type === 'circle' && (
                    <div 
                      className="rounded-full shadow-sm"
                      style={{ width: p.size + 4, height: p.size + 4, backgroundColor: p.color }}
                    />
                  )}
                  {p.type === 'ribbon' && (
                    <svg 
                      width={p.size + 6} 
                      height={p.size + 6} 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke={p.color} 
                      strokeWidth="3.5" 
                      strokeLinecap="round"
                    >
                      <path d="M4 12c4-6 8-6 12 0s8 6 12 0" />
                    </svg>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Mascot Image */}
            <div className="relative w-[340px] h-[340px] lg:w-[380px] lg:h-[380px] z-10">
              <motion.div
                animate={{
                  y: [0, -12, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 3,
                  ease: 'easeInOut',
                }}
                className="w-full h-full relative"
              >
                <Image 
                  src="/User onbarding Assets/Step_10_image.PNG" 
                  alt="Tey Victorious Robot" 
                  width={500}
                  height={500}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] max-w-none h-auto object-contain drop-shadow-[0_24px_50px_rgba(1,114,253,0.18)]"
                  priority 
                />
              </motion.div>
            </div>

          </div>

          {/* Right Column: Premium Double-Layer XP Card */}
          <div className="col-span-1 flex justify-end pr-10 relative z-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: 50 }}
              animate={isLoaded ? { opacity: 1, scale: 1, x: 0 } : {}}
              transition={{ type: 'spring', stiffness: 260, damping: 22, delay: 0.15 }}
              className="flex flex-col bg-white border border-slate-100 border-b-[10px] border-slate-200/80 rounded-[2.2rem] overflow-visible shadow-[0_30px_70px_rgba(7,18,51,0.12),_inset_0_1px_2px_rgba(255,255,255,1)] hover:-translate-y-1 active:translate-y-0.5 active:border-b-[4px] transition-all duration-300 w-[280px] lg:w-[310px] aspect-[1/1.2] cursor-pointer relative"
            >
              {/* Top Layer (Vivid Blue Background with Glowing Star hexagon coin badge) */}
              <div className="bg-gradient-to-b from-[#00A2FF] to-[#006CFF] h-[48%] flex items-center justify-center relative p-6 overflow-hidden rounded-t-[2.1rem]">
                {/* 3D hexagon badge */}
                <div className="relative w-20 h-20 flex items-center justify-center animate-[pulse_2.5s_infinite] filter drop-shadow-[0_8px_18px_rgba(0,60,180,0.45)]">
                  {/* Outer hexagon contour */}
                  <div className="absolute inset-0 bg-[#E0F2FE] rounded-[1.6rem] rotate-45 border-4 border-white shadow-inner" />
                  <div className="absolute inset-1.5 bg-gradient-to-tr from-[#0172FD] to-[#3A96FF] rounded-[1.4rem] rotate-45 border-2 border-white/60 shadow-[inset_0_2px_4px_rgba(255,255,255,0.4)]" />
                  <div className="absolute inset-3.5 bg-gradient-to-tr from-[#3A96FF] to-[#E0F2FE] rounded-[1.2rem] rotate-45" />
                  <Star className="w-8.5 h-8.5 text-white fill-white z-10 drop-shadow-[0_2px_6px_rgba(1,114,253,0.3)]" />
                </div>

                {/* White sparkling stars from the screenshot */}
                {/* Sparkle 1 (Left) */}
                <svg className="absolute left-[18%] top-[28%] w-6 h-6 text-white fill-white drop-shadow-[0_2px_6px_rgba(255,255,255,0.8)] animate-pulse" viewBox="0 0 24 24">
                  <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5Z" />
                </svg>
                {/* Sparkle 2 (Right) */}
                <svg className="absolute right-[18%] top-[48%] w-5 h-5 text-white fill-white drop-shadow-[0_2px_5px_rgba(255,255,255,0.6)] animate-pulse delay-300" viewBox="0 0 24 24">
                  <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5Z" />
                </svg>
                {/* Sparkle 3 (Top Right Tiny) */}
                <svg className="absolute right-[10%] top-[12%] w-3 h-3 text-white/70 fill-white/70" viewBox="0 0 24 24">
                  <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5Z" />
                </svg>
                {/* Tiny Bokeh Dot */}
                <div className="absolute left-[12%] bottom-[15%] w-1.5 h-1.5 rounded-full bg-white/40" />
              </div>

              {/* Bottom Layer (White Background with XP stats and Streak badge - Absolute positioned to lock to bottom) */}
              <div className="absolute bottom-0 left-0 right-0 h-[56%] bg-white flex flex-col items-center justify-between p-6 rounded-[2.2rem] z-10 shadow-[0_-5px_15px_rgba(7,18,51,0.01)]">
                <div className="flex flex-col items-center mt-1 w-full">
                  {/* Bold +10 XP Heading with 3D text shadow glow */}
                  <h2 
                    className="text-[#0172FD] font-[900] text-5xl lg:text-6xl tracking-tight leading-none w-[80%] mx-auto flex justify-center items-baseline gap-2"
                    style={{
                      fontFamily: 'var(--font-jakarta)',
                      textShadow: '0px 2px 3px rgba(255,255,255,0.9), 0px -1px 2px rgba(0,0,0,0.1), 0 0 10px rgba(255,255,255,1)'
                    }}
                  >
                    <span>+10</span>
                    <span className="text-[#0172FD] text-3xl lg:text-4xl font-[900]">XP</span>
                  </h2>
                  <p className="text-slate-500 font-medium text-xs lg:text-sm mt-3.5 text-center leading-relaxed">
                    Keep up the momentum!
                  </p>
                </div>

                {/* 10 steps streak Badge with Flame - Placed 50% out of the card (width is exactly 50% of card) */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[50%] bg-white/70 border border-white/80 backdrop-blur-md rounded-full py-1.5 text-xs text-[#0172FD] font-extrabold flex items-center justify-center gap-1.5 shadow-[0_8px_20px_rgba(7,18,51,0.06)] z-30">
                  <Flame className="w-3.5 h-3.5 fill-[#0172FD] text-[#0172FD]" />
                  <span className="whitespace-nowrap">10 steps streak</span>
                </div>
              </div>

            </motion.div>
          </div>

        </div>

        {/* Bottom Horizontal Actions Row (Back on left, Continue on right) */}
        <div className="w-full flex items-center justify-between max-w-[1200px] mx-auto mt-auto pt-6 border-t border-slate-100/50">
          
          {/* Back button */}
          <motion.button 
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.94, transition: { type: 'spring', stiffness: 500, damping: 15 } }}
            onClick={handleBack}
            className="group bg-white border border-slate-200 text-slate-500 font-[800] rounded-2xl px-8 py-3 flex items-center gap-2 hover:bg-slate-50 hover:border-slate-300 cursor-pointer shadow-sm text-sm"
            style={{ 
              fontFamily: 'var(--font-jakarta)',
              boxShadow: 'inset 0px -4px 0px rgba(0,0,0,0.06), inset 0px 2px 0px rgba(255,255,255,0.8)'
            }}
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1.5 transition-transform duration-200 ease-out" />
            <span>Back</span>
          </motion.button>

          {/* Continue button */}
          <motion.button 
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.94, transition: { type: 'spring', stiffness: 500, damping: 15 } }}
            onClick={handleContinue}
            className="group bg-[#0172FD] text-white rounded-2xl font-[900] text-base px-10 py-3 flex items-center justify-center gap-2 shadow-md hover:shadow-lg shadow-[#0172FD]/10 cursor-pointer"
            style={{ 
              fontFamily: 'var(--font-jakarta)',
              boxShadow: '0 12px 24px -8px rgba(1,114,253,0.4), inset 0px -6px 0px rgba(0,0,0,0.15), inset 0px 2px 0px rgba(255,255,255,0.2)'
            }}
          >
            <span>Continue</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-200 ease-out" />
          </motion.button>

        </div>

      </div>

      {/* Shimmer keyframe key rules */}
      <style>{`
        @keyframes shimmer-sweep {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>
    </div>
  );
}
