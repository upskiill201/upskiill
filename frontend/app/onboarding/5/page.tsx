'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { ArrowLeft, ArrowRight, Clock, CheckCircle2 } from 'lucide-react';
import { useOnboardingSession } from '@/hooks/useOnboardingSession';
import { MascotBackground } from '@/components/onboarding/MascotBackground';
import { StepSkeleton } from '@/components/onboarding/StepSkeleton';

// ────────────────────────────────────────────────────────────────────────────
// Animations
const headlineContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } }
};
const wordVariant: Variants = {
  hidden: { y: 20, opacity: 0, scale: 0.9 },
  show:   { y: 0,  opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 400, damping: 25 } }
};
const accentVariant: Variants = {
  hidden: { y: 20, opacity: 0, scale: 0.75 },
  show:   { y: 0,  opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 500, damping: 20 } }
};

// ────────────────────────────────────────────────────────────────────────────
// Data for the Cards
const GOALS = [
  { id: '5_min',  time: '5',  label: 'Light & easy', desc: 'A quick daily boost to keep you moving.' },
  { id: '10_min', time: '10', label: 'Balanced',     desc: 'The perfect time to make real progress.' },
  { id: '15_min', time: '15', label: 'Deep focus',   desc: 'Go deeper and build strong expertise.' }
];

export default function OnboardingStep5() {
  const router = useRouter();
  const { isLoading, currentAnswer, saveAnswer, advance } = useOnboardingSession(5);

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [idle, setIdle] = useState(false);
  
  useEffect(() => {
    if (currentAnswer?.dailyGoal) {
      const idx = GOALS.findIndex(g => g.id === currentAnswer.dailyGoal);
      if (idx !== -1) setSelectedIndex(idx);
    }
  }, [currentAnswer]);

  useEffect(() => {
    const t = setTimeout(() => setIdle(true), 1500);
    return () => clearTimeout(t);
  }, []);

  if (isLoading) return <StepSkeleton />;

  const handleSelect = (idx: number) => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(10);
    setSelectedIndex(idx);
    saveAnswer({ dailyGoal: GOALS[idx].id });
    setIdle(false);
  };

  const handleNext = () => {
    if (selectedIndex === null) return;
    if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(12);
    void advance();
  };

  const handleBack = () => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(10);
    router.push('/onboarding/4');
  };

  const headlineShadow = '0px 2px 3px rgba(255,255,255,0.9), 0px -1px 2px rgba(0,0,0,0.15), 0 0 15px rgba(255,255,255,1), 0 0 30px rgba(255,255,255,0.9), 0 0 45px rgba(255,255,255,0.8), 0 0 60px rgba(255,255,255,0.5)';
  const accentShadow   = '0px 2px 3px rgba(255,255,255,0.9), 0px -1px 2px rgba(1,114,253,0.4), 0 0 15px rgba(255,255,255,1), 0 0 30px rgba(255,255,255,0.9), 0 0 45px rgba(255,255,255,0.8), 0 0 60px rgba(255,255,255,0.5)';

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-[#EBF3FE] via-[#F4F8FF] to-[#FFFFFF] flex flex-col relative select-none">
      
      <div className="flex-1 w-full flex flex-col relative z-10 max-w-[1200px] mx-auto h-[100dvh] px-6 md:px-10 pb-[2vh] pt-12 md:pt-24">
        
        {/* Mobile Progress Bar */}
        <div className="md:hidden absolute top-4 left-0 right-0 px-6 z-30">
          <div className="flex items-center gap-4 w-full">
            <div className="flex-1 h-3 bg-[#E5EAEF] rounded-full overflow-hidden shadow-inner relative">
              <motion.div
                initial={{ width: `${(4 / 15) * 100}%` }}
                animate={{ width: `${(5 / 15) * 100}%` }}
                transition={{ type: 'spring', stiffness: 280, damping: 24, mass: 0.8, delay: 0.25 }}
                className="h-full rounded-full relative"
                style={{ background: 'linear-gradient(90deg, #0172FD 0%, #3A96FF 100%)', boxShadow: 'inset 0px -4px 0px rgba(0,0,0,0.1), inset 0px 4px 0px rgba(255,255,255,0.3)' }}
              />
            </div>
            <span className="text-sm font-bold" style={{ color: '#0172FD', textShadow: '0 0 10px rgba(255,255,255,1)' }}>5/15</span>
          </div>
        </div>

        {/* Desktop Progress Bar */}
        <div className="hidden md:flex items-center gap-5 w-full max-w-[900px] mb-12">
          <div className="flex-1 h-4 bg-[#E5EAEF] rounded-full overflow-hidden shadow-inner relative">
            <motion.div
              initial={{ width: `${(4 / 15) * 100}%` }}
              animate={{ width: `${(5 / 15) * 100}%` }}
              transition={{ type: 'spring', stiffness: 280, damping: 24, mass: 0.8, delay: 0.25 }}
              className="h-full rounded-full relative"
              style={{ background: 'linear-gradient(90deg, #0172FD 0%, #3A96FF 100%)', boxShadow: 'inset 0px -4px 0px rgba(0,0,0,0.1), inset 0px 4px 0px rgba(255,255,255,0.3)' }}
            />
          </div>
          <span className="text-base font-bold" style={{ color: '#0172FD', textShadow: '0 0 10px rgba(255,255,255,1)' }}>5/15</span>
        </div>

        {/* TOP SECTION: Text (Right) + Mascot (Left) */}
        <div className="flex flex-1 flex-col justify-start md:justify-end md:flex-row w-full relative z-10 md:mt-16 lg:mt-20 md:mb-12">
          
          {/* Mobile Mascot (Top 50% of Screen) */}
          <div className="md:hidden relative w-full h-[50vh] flex items-center justify-center shrink-0 z-30 pointer-events-none mb-[2vh]">
             <div className="relative w-full max-w-[400px] aspect-square scale-[1.4] sm:scale-[1.5] origin-center -translate-y-[2vh]">
                <MascotBackground />
                <motion.div layoutId="tey-mascot" className="absolute inset-0 z-10 scale-[1.15]">
                  <Image 
                    src="/User onbarding Assets/Step_5_mobile_mascot.webp" 
                    alt="Tey Mascot Time" 
                    fill 
                    className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.15)]" 
                    priority 
                  />
                </motion.div>
             </div>
          </div>

          {/* Text Content */}
          <div className="w-full md:w-1/2 flex flex-col justify-center items-center md:items-start text-center md:text-left z-20 pb-[2vh] md:pb-0">
            <motion.h1
              variants={headlineContainer}
              initial="hidden"
              animate="show"
              className="text-[14vw] sm:text-[12vw] md:text-[4.5vw] lg:text-[4vw] leading-[1.05] font-[800] mb-4 tracking-tight text-[#071233]"
              style={{ fontFamily: 'var(--font-jakarta)', textShadow: headlineShadow }}
            >
              {/* Mobile text split */}
              <span className="md:hidden block">
                <motion.span variants={wordVariant} style={{ display: 'inline-block', marginRight: '0.22em' }}>Set</motion.span>
                <motion.span variants={wordVariant} style={{ display: 'inline-block', marginRight: '0.22em' }}>your</motion.span>
                <br />
                <motion.span variants={accentVariant} className="text-[#0172FD]" style={{ display: 'inline-block', marginRight: '0.22em' }}>daily</motion.span>
                <motion.span variants={accentVariant} className="text-[#0172FD]" style={{ display: 'inline-block' }}>goal</motion.span>
              </span>
              
              {/* Desktop text split */}
              <span className="hidden md:block">
                <div className="whitespace-nowrap">
                  <motion.span variants={wordVariant} style={{ display: 'inline-block', marginRight: '0.22em' }}>Set</motion.span>
                  <motion.span variants={wordVariant} style={{ display: 'inline-block', marginRight: '0.22em' }}>your</motion.span>
                  <motion.span variants={accentVariant} className="text-[#0172FD]" style={{ display: 'inline-block', marginRight: '0.22em' }}>daily</motion.span>
                  <motion.span variants={wordVariant} style={{ display: 'inline-block' }}>goal</motion.span>
                </div>
              </span>
            </motion.h1>

            <motion.p
              initial={{ y: 14, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 28, delay: 0.3 }}
              className="text-[4.5vw] sm:text-[3.5vw] md:text-[1.8vw] lg:text-[1.3vw] font-medium text-slate-500 leading-relaxed max-w-[400px] md:max-w-none"
              style={{ fontFamily: 'var(--font-jakarta)', textShadow: '0 0 15px rgba(255,255,255,1), 0 0 25px rgba(255,255,255,0.9), 0 0 35px rgba(255,255,255,0.7)' }}
            >
              <span className="md:hidden">Choose how much time you want<br/>to invest in yourself each day.</span>
              <span className="hidden md:block">
                <span className="block whitespace-nowrap">Choose a time commitment that fits your schedule.</span>
                <span className="block whitespace-nowrap">Consistency builds mastery.</span>
              </span>
            </motion.p>
          </div>
        </div>

        {/* Desktop Mascot (Vertically Centered) */}
        <div className="hidden md:flex absolute left-[-7vw] lg:left-[-2vw] top-1/2 -translate-y-1/2 w-[55%] justify-center z-10 pointer-events-none">
           <div className="relative w-full md:max-w-[900px] aspect-square scale-[1.4] lg:scale-[1.65] -translate-x-16 lg:-translate-x-[10.5rem] origin-left">
              <MascotBackground />
              <motion.div layoutId="tey-mascot" className="absolute inset-0 z-10 md:scale-[0.85] lg:scale-[0.85]">
                <Image 
                  src="/User onbarding Assets/step_5_desktop_mascot.webp" 
                  alt="Tey Mascot Time" 
                  fill 
                  className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.15)]" 
                  priority 
                />
              </motion.div>
           </div>
        </div>

        {/* Cards Section */}
        <div className="w-full flex flex-col md:items-end mt-auto relative z-20 mb-20 md:mb-[15vh] md:-translate-y-[2vh]">
          
          {/* Mobile Cards */}
          <div className="md:hidden flex justify-between gap-3 w-full px-1">
            {GOALS.map((goal, i) => {
              const isSelected = selectedIndex === i;
              return (
                <motion.button
                  key={goal.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isSelected ? { opacity: 1, y: 4 } : { opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1, type: 'spring', stiffness: 300, damping: 24 }}
                  whileTap={{ scale: 0.96, y: 4, transition: { type: 'spring', stiffness: 500, damping: 15 } }}
                  onClick={() => handleSelect(i)}
                  className={`relative flex-1 flex flex-col items-center justify-center py-4 rounded-[1.5rem] bg-white cursor-pointer transition-colors border-[1.5px] ${
                    isSelected ? 'border-[#0172FD]' : 'border-slate-200'
                  }`}
                  style={{
                    boxShadow: isSelected
                      ? '0 0px 0 0 #0172FD, 0 4px 12px rgba(1,114,253,0.15)' 
                      : '0 5px 0 0 #E5EAEF, 0 10px 20px -5px rgba(0,0,0,0.08)'
                  }}
                >
                  <div className="flex items-center gap-1 mb-1">
                    <span className={`text-xl font-[800] ${isSelected ? 'text-[#0172FD]' : 'text-[#071233]'}`}>{goal.time}</span>
                    <span className={`text-sm font-bold ${isSelected ? 'text-[#0172FD]' : 'text-[#071233]'}`}>min</span>
                  </div>
                  <Clock className="w-7 h-7 drop-shadow-sm" fill="#0172FD" stroke="white" strokeWidth={2} />
                </motion.button>
              );
            })}
          </div>

          {/* Desktop Cards */}
          <div className="hidden md:flex gap-6 w-full max-w-[700px]">
            {GOALS.map((goal, i) => {
              const isSelected = selectedIndex === i;
              const anySelected = selectedIndex !== null;
              return (
                <motion.div
                  key={`desktop-${goal.id}`}
                  animate={{ opacity: anySelected && !isSelected ? 0.55 : 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                  className="flex-1 h-[320px] lg:h-[360px]"
                >
                  <motion.button
                    initial={{ y: 0 }}
                    animate={isSelected ? { y: 6 } : { y: 0 }}
                    whileHover={!anySelected || isSelected ? { scale: 1.02, y: -2 } : {}}
                    whileTap={{ scale: 0.98, y: 6, transition: { type: 'spring', stiffness: 500, damping: 15 } }}
                    onClick={() => handleSelect(i)}
                    className={`relative flex flex-col items-center justify-center p-6 lg:p-8 rounded-[2rem] border-2 transition-colors duration-200 w-full h-full bg-white ${
                      isSelected 
                        ? 'border-[#0172FD]' 
                        : 'border-slate-200'
                    }`}
                    style={{
                      // Premium 3D pushable shadow (thick bottom lip when idle)
                      boxShadow: isSelected
                        ? '0 0px 0 0 #0172FD, 0 4px 12px rgba(1,114,253,0.15)' 
                        : '0 6px 0 0 #E5EAEF, 0 15px 25px -5px rgba(0,0,0,0.08)'
                    }}
                  >
                    {/* Checkmark */}
                    <AnimatePresence>
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          transition={{ type: 'spring', stiffness: 500, damping: 20 }}
                          className="absolute top-5 right-5 w-7 h-7 bg-[#0172FD] rounded-full flex items-center justify-center z-20"
                        >
                          <CheckCircle2 className="w-5 h-5 text-white" fill="#0172FD" stroke="white" strokeWidth={1.5} />
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="w-16 h-16 rounded-full bg-[#F4F8FF] flex items-center justify-center mb-4 border border-[#EBF3FE] shadow-inner">
                      <Clock className="w-9 h-9 drop-shadow-sm" fill="#0172FD" stroke="white" strokeWidth={2} />
                    </div>
                    
                    <div className="flex items-baseline gap-1 mb-2">
                      <span className={`text-4xl font-[900] tracking-tight ${isSelected ? 'text-[#0172FD]' : 'text-[#071233]'}`}>{goal.time}</span>
                      <span className={`text-lg font-bold ${isSelected ? 'text-[#071233]' : 'text-slate-500'}`}>min</span>
                    </div>
                    
                    <h3 className={`text-sm font-bold mb-2 ${isSelected ? 'text-[#0172FD]' : 'text-[#071233]'}`}>{goal.label}</h3>
                    
                    <p className="text-xs text-center font-medium text-slate-500 leading-relaxed px-2">
                      {goal.desc}
                    </p>
                  </motion.button>
                </motion.div>
              );
            })}
          </div>

        </div>

        {/* Action Buttons */}
        <motion.div
          initial={{ y: 22, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 320, damping: 28, delay: 0.58 }}
          className="absolute bottom-[2vh] left-4 right-4 md:left-8 md:right-8 lg:left-12 lg:right-12 flex items-center justify-between z-50"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.91, transition: { type: 'spring', stiffness: 600, damping: 18 } }}
            onClick={handleBack}
            className="w-[120px] h-14 md:w-auto md:px-10 md:h-16 flex items-center justify-center rounded-2xl md:rounded-[2rem] bg-white text-[#071233] transition-colors hover:bg-slate-50 border-[1.5px] border-slate-200"
            style={{ boxShadow: '0 4px 0 0 #E5EAEF, 0 10px 20px -5px rgba(0,0,0,0.08)' }}
          >
            <ArrowLeft className="w-5 h-5 md:w-6 md:h-6 stroke-[3] md:mr-2" />
            <span className="hidden md:block font-bold text-lg">Back</span>
            <span className="md:hidden ml-2 font-bold text-lg">Back</span>
          </motion.button>
          
          <motion.button
            animate={selectedIndex !== null && idle ? { scale: [1, 1.05, 1] } : { scale: 1 }}
            transition={selectedIndex !== null && idle
              ? { duration: 0.45, ease: 'easeInOut', times: [0, 0.5, 1] }
              : { type: 'spring', stiffness: 300, damping: 20 }
            }
            whileHover={selectedIndex !== null ? { scale: 1.02 } : {}}
            whileTap={selectedIndex !== null ? { scale: 0.96, transition: { type: 'spring', stiffness: 500, damping: 15 } } : {}}
            onClick={handleNext}
            disabled={selectedIndex === null}
            className={`flex-1 md:flex-none md:w-[280px] flex items-center justify-center h-14 md:h-16 rounded-2xl md:rounded-[2rem] font-bold text-lg md:text-xl transition-all ml-4 md:ml-0 ${
              selectedIndex !== null ? 'bg-[#0172FD] text-white cursor-pointer' : 'bg-slate-200 text-slate-400 cursor-not-allowed opacity-70 border-[1.5px] border-slate-200'
            }`}
            style={
              selectedIndex !== null 
              ? { boxShadow: '0 4px 0 0 #0056D2, 0 10px 20px -5px rgba(1,114,253,0.4), inset 0px 2px 0px rgba(255,255,255,0.2)' } 
              : { boxShadow: 'none' }
            }
          >
            <span>Continue</span>
            <ArrowRight className={`absolute right-5 md:right-8 w-5 h-5 md:w-6 md:h-6 stroke-[3] ${selectedIndex === null && 'opacity-50'}`} />
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
