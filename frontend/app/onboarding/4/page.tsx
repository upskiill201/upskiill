'use client';
import { playHaptic } from '@/lib/haptics';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
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
// Data for the Slider
const LEVELS = [
  { id: 'beginner',     label: 'Beginner',     desc: 'Just getting started' },
  { id: 'intermediate', label: 'Intermediate', desc: 'Some experience' },
  { id: 'proficient',   label: 'Proficient',   desc: 'Pretty comfortable' },
  { id: 'advanced',     label: 'Advanced',     desc: 'Very skilled' },
  { id: 'expert',       label: 'Expert',       desc: 'Teaching others' }
];

export default function OnboardingStep4() {
  const router = useRouter();
  const { isLoading, currentAnswer, saveAnswer, advance } = useOnboardingSession(4);

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [idle, setIdle] = useState(false);
  
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (currentAnswer?.experienceLevel) {
      const idx = LEVELS.findIndex(l => l.id === currentAnswer.experienceLevel);
      if (idx !== -1) setSelectedIndex(idx);
    }
  }, [currentAnswer]);

  useEffect(() => {
    const t = setTimeout(() => setIdle(true), 1500);
    return () => clearTimeout(t);
  }, []);

  if (isLoading) return <StepSkeleton />;

  const handleSelect = (idx: number) => {
    playHaptic('teyroBounce');
    setSelectedIndex(idx);
    saveAnswer({ experienceLevel: LEVELS[idx].id });
    setIdle(false);
  };

  const handleNext = () => {
    if (selectedIndex === null) return;
    playHaptic('medium');
    void advance();
  };

  const handleBack = () => {
    playHaptic('light');
    router.push('/onboarding/3');
  };

  const headlineShadow = '0px 2px 3px rgba(255,255,255,0.9), 0px -1px 2px rgba(0,0,0,0.15), 0 0 15px rgba(255,255,255,1), 0 0 30px rgba(255,255,255,0.9), 0 0 45px rgba(255,255,255,0.8), 0 0 60px rgba(255,255,255,0.5)';
  const accentShadow   = '0px 2px 3px rgba(255,255,255,0.9), 0px -1px 2px rgba(1,114,253,0.4), 0 0 15px rgba(255,255,255,1), 0 0 30px rgba(255,255,255,0.9), 0 0 45px rgba(255,255,255,0.8), 0 0 60px rgba(255,255,255,0.5)';

  return (
    <div className="h-[100dvh] md:h-auto md:min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#EBF3FE] via-[#F4F8FF] to-[#FFFFFF] overflow-hidden relative">
      
      {/* MOBILE-ONLY LAYOUT */}
      <div className="flex flex-col h-full w-full relative z-10 md:hidden overflow-hidden pb-0 pt-0 justify-between">
        
        {/* Top Image Container */}
        <div className="w-full h-[40vh] shrink-0 flex flex-col justify-start items-center relative pt-0 overflow-visible">
          {/* Mobile Progress Bar - padded horizontally */}
          <div className="w-full px-6 flex items-center gap-4 mb-1 shrink-0 relative z-20 pt-3">
            <div className="flex-1 h-2.5 bg-[#E5EAEF] rounded-full overflow-hidden shadow-inner">
              <motion.div
                initial={{ width: `${(3 / 15) * 100}%` }}
                animate={{ width: `${(4 / 15) * 100}%` }}
                transition={{ type: 'spring', stiffness: 280, damping: 24, mass: 0.8, delay: 0.25 }}
                className="h-full rounded-full"
                style={{ background: 'linear-gradient(90deg, #0172FD 0%, #3A96FF 100%)', boxShadow: 'inset 0px -2px 0px rgba(0,0,0,0.1), inset 0px 2px 0px rgba(255,255,255,0.3)' }}
              />
            </div>
            <span className="text-sm font-[800] text-[#0172FD] shrink-0" style={{ textShadow: '0 0 10px rgba(255,255,255,1)' }}>4/15</span>
          </div>

          {/* Mascot Section inside top container */}
          <motion.div
            initial={{ scale: 0.6, y: -20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            className="w-full flex-1 flex items-center justify-center relative select-none mt-1 px-0"
          >
            {/* Bubble background spans 100% of container width */}
            <div className="absolute inset-0 w-full h-full pointer-events-none">
              <MascotBackground />
            </div>
            {/* Mascot image */}
            <motion.div className="absolute w-[80vw] h-[80vw] z-10 origin-center flex items-center justify-center">
              <Image src="/User onbarding Assets/Tey_step4_mobile.webp" alt="Tey Mascot" fill className="object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.12)] scale-[1.1]" priority />
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Text & CTA Container */}
        <div className="w-full flex-1 min-h-0 flex flex-col justify-start items-center relative z-20 pb-6 px-6 bg-white pt-2">
          
          <div className="absolute -top-10 left-0 right-0 h-10 bg-gradient-to-b from-transparent to-white pointer-events-none z-10" />

          {/* Typography container - aligned top */}
          <div className="w-full flex flex-col items-center text-center mt-1 mb-2 px-2 z-20 shrink-0">
            {/* Relative scaled heading */}
            <motion.h1
              variants={headlineContainer}
              initial="hidden"
              animate="show"
              className="text-[clamp(1.75rem,8vw,2rem)] sm:text-3xl font-[900] leading-[1.1] mb-1 tracking-tight text-[#071233] w-[90%] mx-auto text-center"
              style={{ fontFamily: 'var(--font-jakarta)', textShadow: headlineShadow }}
            >
              <div className="whitespace-nowrap">
                <motion.span variants={wordVariant} style={{ display: 'inline-block', marginRight: '0.22em' }}>How</motion.span>
                <motion.span variants={wordVariant} style={{ display: 'inline-block', marginRight: '0.22em' }}>much</motion.span>
                <motion.span variants={wordVariant} style={{ display: 'inline-block' }}>do</motion.span>
              </div>
              <div className="whitespace-nowrap -mt-1">
                <motion.span variants={wordVariant} style={{ display: 'inline-block', marginRight: '0.22em' }}>you</motion.span>
                <motion.span variants={wordVariant} style={{ display: 'inline-block', marginRight: '0.22em' }}>already</motion.span>
                <motion.span variants={accentVariant} className="text-[#0172FD]" style={{ display: 'inline-block', textShadow: accentShadow }}>know?</motion.span>
              </div>
            </motion.h1>

            {/* Relative scaled subtitle */}
            <motion.p
              initial={{ y: 14, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 28, delay: 0.3 }}
              className="text-[clamp(1rem,4vw,1.1rem)] sm:text-xl font-medium text-slate-500 leading-tight max-w-[95%] mb-2 mt-1"
              style={{ fontFamily: 'var(--font-jakarta)' }}
            >
              This helps us personalize your learning experience.
            </motion.p>
          </div>

          {/* Slider Container: Center aligned in remaining space */}
          <div className="w-full flex-1 flex flex-col justify-center items-center z-20 max-w-[400px] mx-auto min-h-0 py-2">
            
            {/* Mobile Slider Container */}
            <div className="w-full bg-white/95 rounded-[1.75rem] p-6 border-2 border-slate-100 shadow-[0_12px_24px_-5px_rgba(0,0,0,0.04)]">
               <div className="flex justify-between items-center w-full mb-3 px-1">
                 <span className="text-[#0172FD] font-extrabold text-[0.88rem] tracking-tight">Beginner</span>
                 {selectedIndex !== null && (
                   <span className="text-slate-600 font-extrabold text-[0.85rem] bg-slate-100 px-2 py-0.5 rounded-md">
                     {LEVELS[selectedIndex].label}
                   </span>
                 )}
                 <span className="text-[#6452F8] font-extrabold text-[0.88rem] tracking-tight">Expert</span>
               </div>
               
               {/* Mobile Track */}
               <div className="relative w-full h-3 bg-slate-200 rounded-full flex items-center" ref={trackRef}>
                  <div className="absolute inset-0 rounded-full shadow-inner opacity-50 pointer-events-none" />
                  
                  {/* Active Fill */}
                  {selectedIndex !== null && (
                     <motion.div 
                       className="absolute left-0 top-0 bottom-0 rounded-full"
                       initial={{ width: 0 }}
                       animate={{ width: `${(selectedIndex / 4) * 100}%` }}
                       transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                       style={{ background: 'linear-gradient(90deg, #0172FD 0%, #6452F8 100%)' }}
                     />
                  )}

                  {/* Tick Marks */}
                  <div className="absolute inset-0 flex justify-between items-center px-1 pointer-events-none">
                     {[0, 1, 2, 3, 4].map((i) => (
                       <div key={i} className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${selectedIndex !== null && selectedIndex >= i ? 'bg-white/80' : 'bg-slate-400/30'}`} />
                     ))}
                  </div>

                  {/* Clickable Hitboxes */}
                  <div className="absolute inset-0 flex justify-between">
                     {[0, 1, 2, 3, 4].map((i) => (
                       <div 
                         key={i} 
                         className="flex-1 h-12 -mt-4 cursor-pointer z-10"
                         onClick={() => handleSelect(i)}
                       />
                     ))}
                  </div>

                  {/* Thumb */}
                  {selectedIndex !== null && (
                    <motion.div
                      className="absolute top-1/2 -mt-3.5 w-7 h-7 rounded-full bg-white z-20 flex items-center justify-center cursor-pointer"
                      initial={false}
                      animate={{ left: `calc(${(selectedIndex / 4) * 100}% - 14px)` }}
                      transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                      style={{
                        boxShadow: '0 0 0 5px rgba(1,114,253,0.15), 0 3px 8px rgba(0,0,0,0.15)'
                      }}
                    >
                      <div className="w-4 h-4 rounded-full bg-gradient-to-b from-[#0172FD] to-[#3A96FF]" />
                    </motion.div>
                  )}
               </div>
            </div>

            {selectedIndex !== null && (
              <motion.span 
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs font-semibold text-slate-400 mt-2 text-center"
              >
                {LEVELS[selectedIndex].desc}
              </motion.span>
            )}

          </div>

          <motion.div
            initial={{ y: 22, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28, delay: 0.58 }}
            className="w-full flex items-center gap-3 justify-center relative z-30 mb-1 shrink-0"
          >
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.94, transition: { type: 'spring', stiffness: 500, damping: 15 } }}
              onClick={handleBack}
              className="w-14 h-12 flex items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-700 transition-colors"
              style={{ boxShadow: 'inset 0px -4px 0px rgba(0,0,0,0.06), inset 0px 2px 0px rgba(255,255,255,0.8)' }}
            >
              <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
            </motion.button>

            <motion.button
              animate={selectedIndex !== null && idle ? { scale: [1, 1.05, 1] } : { scale: 1 }}
              transition={selectedIndex !== null && idle
                ? { duration: 0.45, ease: 'easeInOut', times: [0, 0.5, 1] }
                : { type: 'spring', stiffness: 300, damping: 20 }
              }
              whileHover={selectedIndex !== null ? { scale: 1.02 } : {}}
              whileTap={selectedIndex !== null ? { scale: 0.94, transition: { type: 'spring', stiffness: 500, damping: 15 } } : {}}
              onClick={handleNext}
              disabled={selectedIndex === null}
              className={`flex-1 relative flex items-center justify-center h-12 rounded-xl font-bold text-base transition-all ${
                selectedIndex !== null ? 'bg-[#0172FD] text-white cursor-pointer' : 'bg-slate-200 text-slate-400 cursor-not-allowed opacity-70'
              }`}
              style={selectedIndex !== null ? { boxShadow: '0 8px 16px -4px rgba(1,114,253,0.4), inset 0px -4px 0px rgba(0,0,0,0.15), inset 0px 2px 0px rgba(255,255,255,0.2)' } : { boxShadow: '0 0 10px rgba(255,255,255,0.8)' }}
            >
              <span>Continue</span>
              <ArrowRight className={`absolute right-4 w-5 h-5 stroke-[3] ${selectedIndex === null && 'opacity-50'}`} />
            </motion.button>
          </motion.div>

        </div>
      </div>

      {/* DESKTOP-ONLY LAYOUT (hidden md:flex) */}
      <div className="hidden md:flex flex-1 w-full max-w-[1200px] mx-auto flex-col px-10 pb-[2vh] pt-24 min-h-0">
        
        {/* Desktop Progress Bar */}
        <div className="flex items-center gap-5 w-full max-w-[900px] mb-12">
          <div className="flex-1 h-4 bg-[#E5EAEF] rounded-full overflow-hidden shadow-inner relative">
            <motion.div
              initial={{ width: `${(3 / 15) * 100}%` }}
              animate={{ width: `${(4 / 15) * 100}%` }}
              transition={{ type: 'spring', stiffness: 280, damping: 24, mass: 0.8, delay: 0.25 }}
              className="h-full rounded-full relative"
              style={{ background: 'linear-gradient(90deg, #0172FD 0%, #3A96FF 100%)', boxShadow: 'inset 0px -4px 0px rgba(0,0,0,0.1), inset 0px 4px 0px rgba(255,255,255,0.3)' }}
            />
          </div>
          <span className="text-base font-bold" style={{ color: '#0172FD', textShadow: '0 0 10px rgba(255,255,255,1)' }}>4/15</span>
        </div>

        {/* TOP SECTION */}
        <div className="flex flex-row w-full mb-12 flex-1 min-h-0">
          {/* Text Content */}
          <div className="w-1/2 flex flex-col justify-center items-start text-left z-20">
            <motion.h1
              variants={headlineContainer}
              initial="hidden"
              animate="show"
              className="text-[4.5vw] lg:text-[4vw] leading-[1.05] font-[800] mb-4 tracking-tight text-[#071233]"
              style={{ fontFamily: 'var(--font-jakarta)', textShadow: headlineShadow }}
            >
              <div className="whitespace-nowrap">
                <motion.span variants={wordVariant} style={{ display: 'inline-block', marginRight: '0.22em' }}>How</motion.span>
                <motion.span variants={wordVariant} style={{ display: 'inline-block', marginRight: '0.22em' }}>much</motion.span>
                <motion.span variants={wordVariant} style={{ display: 'inline-block', marginRight: '0.22em' }}>do</motion.span>
              </div>
              <div className="whitespace-nowrap -mt-1 lg:-mt-2">
                <motion.span variants={wordVariant} style={{ display: 'inline-block', marginRight: '0.22em' }}>you</motion.span>
                <motion.span variants={wordVariant} style={{ display: 'inline-block', marginRight: '0.22em' }}>already</motion.span>
                <motion.span variants={accentVariant} className="text-[#0172FD]" style={{ display: 'inline-block' }}>Know?</motion.span>
              </div>
            </motion.h1>

            <motion.p
              initial={{ y: 14, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 28, delay: 0.3 }}
              className="text-[1.1rem] lg:text-[1.25rem] font-medium text-slate-500 leading-relaxed max-w-[450px]"
              style={{ fontFamily: 'var(--font-jakarta)', textShadow: '0 0 15px rgba(255,255,255,1), 0 0 25px rgba(255,255,255,0.9), 0 0 35px rgba(255,255,255,0.7)' }}
            >
              This helps me personalize your learning experience just for you.
            </motion.p>
          </div>
        </div>

        {/* Desktop Mascot */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[55%] justify-center z-10 pointer-events-none">
           <div className="relative w-[40vw] h-[40vw] translate-x-12 lg:translate-x-16">
              <MascotBackground />
              <div className="absolute inset-0 z-10 scale-[1.2] origin-bottom">
                <Image 
                  src="/User onbarding Assets/Tey_step4_desktop.webp" 
                  alt="Tey Looking with Magnifying Glass" 
                  fill 
                  className="object-contain" 
                  priority 
                />
              </div>
           </div>
        </div>

        {/* Slider Section */}
        <div className="w-full flex flex-col mt-auto relative z-20 mb-[4vh] shrink-0">
          <div className="w-full flex flex-col relative z-20 pb-4">
             {/* Outer thick pill card */}
             <div className="w-full bg-white/80 backdrop-blur-md shadow-[0_15px_35px_-5px_rgba(0,0,0,0.05),_0_0_0_1.5px_rgba(255,255,255,0.9)] rounded-[4rem] h-[5.5rem] lg:h-[6.5rem] flex items-center px-8 lg:px-12 mb-8 relative z-10">
                 <div className="relative w-full h-3 lg:h-3.5 bg-slate-200 rounded-full flex items-center shadow-inner">
                    {/* Active Fill */}
                    {selectedIndex !== null && (
                       <motion.div 
                         className="absolute left-0 top-0 bottom-0 rounded-full"
                         initial={{ width: 0 }}
                         animate={{ width: `calc(${(selectedIndex / 4) * 100}% + 8px)` }}
                         transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                         style={{ background: '#0172FD' }}
                       />
                    )}

                    {/* Tick Marks */}
                    <div className="absolute inset-0 flex justify-between items-center pointer-events-none z-10 px-0.5">
                       {[0, 1, 2, 3, 4].map((i) => (
                         <div key={i} className={`w-2 h-2 lg:w-2.5 lg:h-2.5 rounded-full transition-colors duration-300 ${selectedIndex !== null && selectedIndex >= i ? 'bg-white' : 'bg-[#C3D0E5]'}`} />
                       ))}
                    </div>

                    {/* Thumb */}
                    {selectedIndex !== null && (
                      <motion.div
                        className="absolute top-1/2 -mt-[22px] lg:-mt-[26px] w-[44px] h-[44px] lg:w-[52px] lg:h-[52px] rounded-full bg-gradient-to-b from-[#2E8DFF] to-[#0172FD] z-30 flex items-center justify-center cursor-grab active:cursor-grabbing hover:scale-110"
                        initial={false}
                        animate={{ left: `calc(${(selectedIndex / 4) * 100}% - ${typeof window !== 'undefined' && window.innerWidth >= 1024 ? 26 : 22}px)` }}
                        transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                        style={{
                          boxShadow: '0 0 0 10px rgba(1,114,253,0.12), inset 0 2px 4px rgba(255,255,255,0.5), 0 8px 16px rgba(0,114,253,0.25)'
                        }}
                      />
                    )}

                    {/* Clickable Hitboxes */}
                    <div className="absolute inset-0 flex justify-between z-20">
                       {[0, 1, 2, 3, 4].map((i) => (
                         <motion.div 
                           key={i} 
                           className="flex-1 h-20 -mt-8 cursor-pointer relative"
                           onClick={() => handleSelect(i)}
                         />
                       ))}
                    </div>
                 </div>
             </div>

             {/* Desktop Labels */}
             <div className="flex justify-between w-full relative px-2">
                {LEVELS.map((level, i) => (
                  <motion.div 
                    key={level.id} 
                    className="flex flex-col items-center w-[120px] text-center cursor-pointer"
                    onClick={() => handleSelect(i)}
                    whileHover={{ y: -2 }}
                    animate={{ opacity: selectedIndex === null || selectedIndex === i ? 1 : 0.5 }}
                  >
                    <span className={`font-extrabold text-[1.1rem] lg:text-[1.2rem] mb-1 transition-colors ${selectedIndex === i ? 'text-[#0172FD]' : 'text-[#071233]'}`} style={{ textShadow: '0 0 10px rgba(255,255,255,0.8)' }}>
                      {level.label}
                    </span>
                    <span className="text-[0.9rem] font-medium text-slate-500 whitespace-nowrap">{level.desc}</span>
                  </motion.div>
                ))}
             </div>
          </div>
        </div>

        {/* Action Buttons */}
        <motion.div
           initial={{ y: 22, opacity: 0 }}
           animate={{ y: 0, opacity: 1 }}
           transition={{ type: 'spring', stiffness: 320, damping: 28, delay: 0.58 }}
           className="flex items-center justify-between w-full relative z-50 shrink-0"
         >
           <motion.button
             whileHover={{ scale: 1.05 }}
             whileTap={{ scale: 0.91, transition: { type: 'spring', stiffness: 600, damping: 18 } }}
             onClick={handleBack}
             className="px-10 h-16 flex items-center justify-center rounded-[2rem] bg-white text-[#071233] transition-colors hover:bg-slate-50 border-[1.5px] border-slate-200"
             style={{ boxShadow: '0 4px 0 0 #E5EAEF, 0 10px 20px -5px rgba(0,0,0,0.08)' }}
           >
             <ArrowLeft className="w-6 h-6 stroke-[3] mr-2" />
             <span className="font-bold text-lg">Back</span>
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
             className={`w-[280px] flex items-center justify-center h-16 rounded-[2rem] font-bold text-xl transition-all ${
               selectedIndex !== null ? 'bg-[#0172FD] text-white cursor-pointer' : 'bg-slate-200 text-slate-400 cursor-not-allowed opacity-70 border-[1.5px] border-slate-200'
             }`}
             style={
               selectedIndex !== null 
               ? { boxShadow: '0 4px 0 0 #0056D2, 0 10px 20px -5px rgba(1,114,253,0.4), inset 0px 2px 0px rgba(255,255,255,0.2)' } 
               : { boxShadow: 'none' }
             }
           >
             <span>Continue</span>
             <ArrowRight className={`absolute right-8 w-6 h-6 stroke-[3] ${selectedIndex === null && 'opacity-50'}`} />
           </motion.button>
        </motion.div>

      </div>
    </div>
  );
}
