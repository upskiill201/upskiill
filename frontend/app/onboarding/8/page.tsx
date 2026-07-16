'use client';
import { playHaptic } from '@/lib/haptics';

import React, { useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useOnboardingSession } from '@/hooks/useOnboardingSession';
import { MascotBackground } from '@/components/onboarding/MascotBackground';
import { StepSkeleton } from '@/components/onboarding/StepSkeleton';

export default function OnboardingStep8() {
  const router = useRouter();
  const { isLoading, advance } = useOnboardingSession(8);
  const mascotRef = useRef<HTMLDivElement>(null);

  const handleBack = () => {
    playHaptic(10);
    router.push('/onboarding/7');
  };

  const handleStart = () => {
    playHaptic(12);
    void advance();
  };

  if (isLoading) return <StepSkeleton />;

  // 3D text shadow effects matching Step 1
  const headlineShadow = '0px 2px 3px rgba(255,255,255,0.9), 0px -1px 2px rgba(0,0,0,0.15), 0 0 15px rgba(255,255,255,1), 0 0 30px rgba(255,255,255,0.9), 0 0 45px rgba(255,255,255,0.8), 0 0 60px rgba(255,255,255,0.5)';
  const accentShadow   = '0px 2px 3px rgba(255,255,255,0.9), 0px -1px 2px rgba(1,114,253,0.4), 0 0 15px rgba(255,255,255,1), 0 0 30px rgba(255,255,255,0.9), 0 0 45px rgba(255,255,255,0.8), 0 0 60px rgba(255,255,255,0.5)';
  const subheadShadow  = '0 0 15px rgba(255,255,255,1), 0 0 25px rgba(255,255,255,0.9), 0 0 35px rgba(255,255,255,0.7)';

  return (
    <div className="h-[100dvh] min-h-[100dvh] max-h-[100dvh] overflow-hidden bg-gradient-to-br from-[#EBF3FE] via-[#F4F8FF] to-[#FFFFFF] flex flex-col relative select-none">
      
      <div className="flex-1 w-full flex flex-col relative z-10 max-w-[1200px] mx-auto h-full px-6 md:px-10 pt-6 md:pt-[5vh] pb-4 justify-between">
        
        {/* Header Progress Bar - Centered progress bar with absolute right-0 label to match mockup width constraint */}
        <div className="relative flex items-center justify-center w-full mb-2 md:mb-6 md:mt-[2vh]">
          <div className="w-[60%] max-w-[280px] md:max-w-[400px] h-3 bg-[#E5EAEF] rounded-full overflow-hidden shadow-inner relative">
            <motion.div
              initial={{ width: `${(7 / 15) * 100}%` }}
              animate={{ width: `${(8 / 15) * 100}%` }}
              transition={{ type: 'spring', stiffness: 280, damping: 24, mass: 0.8, delay: 0.25 }}
              className="h-full rounded-full relative"
              style={{ background: 'linear-gradient(90deg, #0172FD 0%, #3A96FF 100%)', boxShadow: 'inset 0px -4px 0px rgba(0,0,0,0.1), inset 0px 4px 0px rgba(255,255,255,0.3)' }}
            />
          </div>
          <span className="absolute right-0 text-sm font-[800] text-[#0172FD]" style={{ textShadow: '0 0 10px rgba(255,255,255,1)' }}>8/15</span>
        </div>

        {/* Main Split Section */}
        {/* On mobile: Mascot (top 60% height) + Text/Buttons (bottom 40% height) */}
        {/* On desktop: Text (left 50% width) + Mascot (right 50% width) */}
        <div className="flex-1 flex flex-col-reverse md:flex-row items-center justify-between w-full min-h-0 relative gap-4 md:gap-8">
          
          {/* Text Container */}
          <div className="w-full md:w-[50%] h-[40%] md:h-auto flex flex-col justify-start md:justify-center items-center md:items-start text-center md:text-left z-20 relative pt-2 md:pt-0">
            
            {/* Mobile-only background fade to overlay Tey mascot background */}
            <div className="md:hidden absolute top-[-3.5rem] left-[-2rem] right-[-2rem] bottom-[-2rem] bg-gradient-to-b from-transparent via-white to-white via-[12%] -z-10 pointer-events-none" />

            {/* Heading with 3D text shadow, whitespace-nowrap wrapper blocks to force two exact lines on all resolutions */}
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 350, damping: 28 }}
              className="text-[12vw] sm:text-[10vw] md:text-[4.8vw] lg:text-[4.5vw] xl:text-[4.2vw] leading-[1.05] font-[900] tracking-tight text-[#071233] w-full"
              style={{ fontFamily: 'var(--font-jakarta)', textShadow: headlineShadow }}
            >
              <span className="whitespace-nowrap">Let's try a</span>
              <br />
              <span className="whitespace-nowrap">
                quick{' '}
                <span className="text-[#0172FD]" style={{ textShadow: accentShadow }}>
                  challenge!
                </span>
              </span>
            </motion.h1>

            {/* Dynamic Subheading, larger size, width restricted to 80% on desktop */}
            <motion.p
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 28, delay: 0.2 }}
              className="text-[4.2vw] sm:text-[3.6vw] md:text-[1.6vw] lg:text-[1.5vw] xl:text-[1.4vw] font-semibold text-slate-500 mt-2 md:mt-4 mb-4 md:mb-8 w-full md:w-[80%] max-w-[340px] md:max-w-[450px]"
              style={{ fontFamily: 'var(--font-jakarta)', textShadow: subheadShadow }}
            >
              {/* Mobile subhead */}
              <span className="md:hidden">A short challenge is the best way to learn by doing.</span>
              {/* Desktop subhead */}
              <span className="hidden md:inline">Experience the Teyro way of learning.</span>
            </motion.p>

            {/* Desktop Start & Back Buttons, width taking 80% on desktop */}
            <div className="hidden md:flex flex-col gap-4 w-[80%] max-w-[450px]">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.94, transition: { type: 'spring', stiffness: 500, damping: 15 } }}
                onClick={handleStart}
                className="w-full h-[60px] bg-[#0172FD] border-b-4 border-[#0050B3] text-white rounded-[1.2rem] font-[900] text-lg tracking-wider hover:bg-[#0060D9] active:border-b-0 active:translate-y-1 transition-all cursor-pointer flex items-center justify-center gap-2 shadow-[0_4px_15px_rgba(1,114,253,0.25)]"
                style={{ fontFamily: 'var(--font-jakarta)' }}
              >
                <span>Start</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.94, transition: { type: 'spring', stiffness: 500, damping: 15 } }}
                onClick={handleBack}
                className="w-full h-[50px] bg-white border-[1.5px] border-slate-200 text-slate-500 rounded-[1.2rem] font-bold text-sm hover:border-slate-300 hover:bg-slate-50 active:translate-y-0.5 transition-all cursor-pointer flex items-center justify-center gap-2 shadow-sm"
                style={{ fontFamily: 'var(--font-jakarta)' }}
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Go Back</span>
              </motion.button>
            </div>
          </div>

          {/* Mascot Container */}
          <div className="w-full md:w-[50%] h-[60%] md:h-full flex items-center justify-center md:self-center relative z-10 pointer-events-none md:ml-auto">
            
            {/* Desktop bubble and shape effects spread across 100% of container */}
            <div className="hidden md:block absolute inset-0 w-full h-full">
              <MascotBackground />
            </div>

            <div 
              ref={mascotRef}
              className="relative w-full max-w-[380px] md:max-w-[650px] aspect-square scale-[1.1] md:scale-[1.35] origin-center"
            >
              {/* Mobile bubbles and shapes kept inside the local square container */}
              <div className="md:hidden">
                <MascotBackground />
              </div>

              {/* Tey Mascot Image */}
              <motion.div 
                layoutId="tey-mascot"
                initial={{ opacity: 0, scale: 0.9, y: 15 }}
                animate={{ opacity: 1, scale: 1.0, y: 0 }}
                transition={{ type: 'spring', stiffness: 260, damping: 24, delay: 0.1 }}
                className="absolute inset-0 z-10"
              >
                {/* Mobile version has Tey pointing at a round "Start" button */}
                <div className="md:hidden absolute inset-0">
                  <Image 
                    src="/User onbarding Assets/Step_8_mascot_Mobile.webp" 
                    alt="Tey Mascot pointing to Start" 
                    fill 
                    className="object-contain drop-shadow-[0_15px_40px_rgba(0,0,0,0.12)]" 
                    priority 
                  />
                </div>
                {/* Desktop version has Tey pointing to the left toward text options */}
                <div className="hidden md:block absolute inset-0">
                  <Image 
                    src="/User onbarding Assets/Step_8_mascot_desktop.webp" 
                    alt="Tey Mascot challenge preview" 
                    fill 
                    className="object-contain drop-shadow-[0_15px_40px_rgba(0,0,0,0.12)]" 
                    priority 
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Mobile Action Buttons (Start Challenge on top, Go Back below, locked at the bottom with 2vh margin) */}
        <div className="md:hidden w-full z-30 pt-2 pb-2 mb-[2vh] flex flex-col gap-3">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.94, transition: { type: 'spring', stiffness: 500, damping: 15 } }}
            onClick={handleStart}
            className="w-full max-w-[480px] h-[55px] bg-[#0172FD] border-b-4 border-[#0050B3] text-white rounded-[1.2rem] font-[900] text-lg tracking-wider hover:bg-[#0060D9] active:border-b-0 active:translate-y-1 transition-all cursor-pointer flex items-center justify-center gap-2 mx-auto shadow-[0_4px_15px_rgba(1,114,253,0.25)]"
            style={{ fontFamily: 'var(--font-jakarta)' }}
          >
            <span>Start Challenge</span>
            <ArrowRight className="w-5 h-5" />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.94, transition: { type: 'spring', stiffness: 500, damping: 15 } }}
            onClick={handleBack}
            className="w-full max-w-[480px] h-[48px] bg-white border-[1.5px] border-slate-200 text-slate-500 rounded-[1.2rem] font-bold text-sm hover:border-slate-300 hover:bg-slate-50 active:translate-y-0.5 transition-all cursor-pointer flex items-center justify-center gap-2 mx-auto shadow-sm"
            style={{ fontFamily: 'var(--font-jakarta)' }}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Go Back</span>
          </motion.button>
        </div>

      </div>
    </div>
  );
}
