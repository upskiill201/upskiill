'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, Variants } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useOnboardingSession } from '@/hooks/useOnboardingSession';
import { playHaptic } from '@/lib/haptics';

const headlineContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const wordVariant: Variants = {
  hidden: { y: 20, opacity: 0, scale: 0.9 },
  show: { y: 0, opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 400, damping: 25 } },
};
const accentVariant: Variants = {
  hidden: { y: 20, opacity: 0, scale: 0.75 },
  show: { y: 0, opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 500, damping: 20 } },
};

const LEVELS = [
  { id: 'beginner', label: 'Beginner', desc: 'Just getting started' },
  { id: 'intermediate', label: 'Intermediate', desc: 'Some experience' },
  { id: 'proficient', label: 'Proficient', desc: 'Pretty comfortable' },
  { id: 'advanced', label: 'Advanced', desc: 'Very skilled' },
  { id: 'expert', label: 'Expert', desc: 'Teaching others' },
];

interface Step4ContentProps {
  onNext: () => void;
}

export default function Step4Content({ onNext }: Step4ContentProps) {
  const { currentAnswer, saveAnswer } = useOnboardingSession({ currentStep: 4, disableGuard: true });

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [idle, setIdle] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (currentAnswer?.experienceLevel) {
      const idx = LEVELS.findIndex((l) => l.id === currentAnswer.experienceLevel);
      if (idx !== -1) setSelectedIndex(idx);
    }
  }, [currentAnswer]);

  useEffect(() => {
    const t = setTimeout(() => setIdle(true), 1500);
    return () => clearTimeout(t);
  }, []);

  const handleSelect = (idx: number) => {
    playHaptic('teyroBounce');
    setSelectedIndex(idx);
    saveAnswer({ experienceLevel: LEVELS[idx].id });
    setIdle(false);
  };

  const handleNext = () => {
    if (selectedIndex === null) return;
    playHaptic('medium');
    onNext();
  };

  const headlineShadow =
    '0px 2px 3px rgba(255,255,255,0.9), 0px -1px 2px rgba(0,0,0,0.15), 0 0 15px rgba(255,255,255,1), 0 0 30px rgba(255,255,255,0.9), 0 0 45px rgba(255,255,255,0.8), 0 0 60px rgba(255,255,255,0.5)';
  const accentShadow =
    '0px 2px 3px rgba(255,255,255,0.9), 0px -1px 2px rgba(1,114,253,0.4), 0 0 15px rgba(255,255,255,1), 0 0 30px rgba(255,255,255,0.9), 0 0 45px rgba(255,255,255,0.8), 0 0 60px rgba(255,255,255,0.5)';

  return (
    <div className="w-full h-full flex flex-col pt-3 px-5 md:px-0 pb-0">
      {/* ── HEADLINE ── */}
      <div className="w-full shrink-0 mb-2 md:mb-8 text-center md:text-left">
        <motion.h1
          variants={headlineContainer}
          initial="hidden"
          animate="show"
          className="text-[clamp(1.6rem,7vw,1.85rem)] md:text-[3.5rem] lg:text-[4rem] font-[900] leading-[1.05] mb-1 tracking-tight text-[#071233]"
          style={{ fontFamily: 'var(--font-jakarta)', textShadow: headlineShadow }}
        >
          <div className="whitespace-nowrap inline-block md:block">
            <motion.span variants={wordVariant} style={{ display: 'inline-block', marginRight: '0.22em' }}>How</motion.span>
            <motion.span variants={wordVariant} style={{ display: 'inline-block', marginRight: '0.22em' }}>much</motion.span>
            <motion.span variants={wordVariant} style={{ display: 'inline-block', marginRight: '0.22em' }}>do</motion.span>
          </div>
          <div className="whitespace-nowrap inline-block md:block md:-mt-1">
            <motion.span variants={wordVariant} style={{ display: 'inline-block', marginRight: '0.22em' }}>you</motion.span>
            <motion.span variants={wordVariant} style={{ display: 'inline-block', marginRight: '0.22em' }}>already</motion.span>
            <motion.span variants={accentVariant} className="text-[#0172FD]" style={{ display: 'inline-block', textShadow: accentShadow }}>know?</motion.span>
          </div>
        </motion.h1>

        <motion.p
          initial={{ y: 14, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 28, delay: 0.3 }}
          className="text-[clamp(0.9rem,3.5vw,1rem)] md:text-xl font-medium text-slate-500 leading-tight"
          style={{ fontFamily: 'var(--font-jakarta)' }}
        >
          <span className="md:hidden">This helps us personalize your learning experience.</span>
          <span className="hidden md:inline">This helps me personalize your learning experience just for you.</span>
        </motion.p>
      </div>

      {/* ── SLIDER CONTAINER ── */}
      <div className="w-full flex-1 flex flex-col justify-center items-center z-20 max-w-[400px] md:max-w-[700px] mx-auto md:mx-0 min-h-0 py-2">
        {/* Mobile / Desktop Slider Pill */}
        <div className="w-full bg-white/95 rounded-[1.75rem] md:rounded-[3rem] p-6 md:p-8 border-2 border-slate-100 shadow-[0_12px_24px_-5px_rgba(0,0,0,0.04)]">
          <div className="flex justify-between items-center w-full mb-3 px-1">
            <span className="text-[#0172FD] font-extrabold text-[0.88rem] md:text-base tracking-tight">Beginner</span>
            {selectedIndex !== null && (
              <span className="text-slate-600 font-extrabold text-[0.85rem] md:text-sm bg-slate-100 px-2 py-0.5 rounded-md">
                {LEVELS[selectedIndex].label}
              </span>
            )}
            <span className="text-[#6452F8] font-extrabold text-[0.88rem] md:text-base tracking-tight">Expert</span>
          </div>

          {/* Track */}
          <div className="relative w-full h-3 md:h-3.5 bg-slate-200 rounded-full flex items-center" ref={trackRef}>
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
                <div
                  key={i}
                  className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full transition-colors duration-300 ${
                    selectedIndex !== null && selectedIndex >= i ? 'bg-white/80' : 'bg-slate-400/30'
                  }`}
                />
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
                className="absolute top-1/2 -mt-3.5 md:-mt-4 w-7 h-7 md:w-8 md:h-8 rounded-full bg-white z-20 flex items-center justify-center cursor-pointer"
                initial={false}
                animate={{ left: `calc(${(selectedIndex / 4) * 100}% - 14px)` }}
                transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                style={{
                  boxShadow: '0 0 0 5px rgba(1,114,253,0.15), 0 3px 8px rgba(0,0,0,0.15)',
                }}
              >
                <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-gradient-to-b from-[#0172FD] to-[#3A96FF]" />
              </motion.div>
            )}
          </div>
        </div>

        {/* Level description */}
        {selectedIndex !== null && (
          <motion.span
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs md:text-sm font-semibold text-slate-400 mt-2 text-center"
          >
            {LEVELS[selectedIndex].desc}
          </motion.span>
        )}
      </div>

      {/* ── CTA ── */}
      <motion.div
        initial={{ y: 22, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 320, damping: 28, delay: 0.58 }}
        className="w-full shrink-0 pb-2 md:pb-0"
      >
        <motion.button
          animate={selectedIndex !== null && idle ? { scale: [1, 1.05, 1] } : { scale: 1 }}
          transition={
            selectedIndex !== null && idle
              ? { duration: 0.45, ease: 'easeInOut', times: [0, 0.5, 1] }
              : { type: 'spring', stiffness: 300, damping: 20 }
          }
          whileHover={selectedIndex !== null ? { scale: 1.02 } : {}}
          whileTap={selectedIndex !== null ? { scale: 0.94, transition: { type: 'spring', stiffness: 500, damping: 15 } } : {}}
          onClick={handleNext}
          disabled={selectedIndex === null}
          className={`relative w-full md:w-[240px] flex items-center justify-center h-12 md:h-16 rounded-xl md:rounded-[2rem] font-bold text-base md:text-xl transition-all ${
            selectedIndex !== null ? 'bg-[#0172FD] text-white cursor-pointer' : 'bg-slate-200 text-slate-400 cursor-not-allowed opacity-70'
          }`}
          style={
            selectedIndex !== null
              ? { boxShadow: '0 8px 16px -4px rgba(1,114,253,0.4), inset 0px -4px 0px rgba(0,0,0,0.15), inset 0px 2px 0px rgba(255,255,255,0.2)' }
              : { boxShadow: '0 0 10px rgba(255,255,255,0.8)' }
          }
        >
          <span>Continue</span>
          <ArrowRight className={`absolute right-4 md:right-8 w-5 h-5 md:w-6 md:h-6 stroke-[3] ${selectedIndex === null && 'opacity-50'}`} />
        </motion.button>
      </motion.div>
    </div>
  );
}
