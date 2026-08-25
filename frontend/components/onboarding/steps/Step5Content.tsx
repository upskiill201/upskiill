'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { ArrowRight, Clock, CheckCircle2, Sparkles } from 'lucide-react';
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

interface TimeGoal {
  id: string;
  time: string;
  label: string;
  desc: string;
  recommended?: boolean;
}

// Realistic lesson lengths — the 30-min sweet spot came straight out of waitlist interviews
const GOALS: TimeGoal[] = [
  { id: '15_min', time: '15', label: 'Light & easy', desc: 'A quick daily boost to keep you moving.' },
  { id: '30_min', time: '30', label: 'Balanced', desc: 'The sweet spot for real, steady progress.', recommended: true },
  { id: '45_min', time: '45', label: 'Deep focus', desc: 'Go deeper and build strong expertise.' },
];

const RECOMMENDED_INDEX = 1;

interface Step5ContentProps {
  onNext: () => void;
}

export default function Step5Content({ onNext }: Step5ContentProps) {
  const { currentAnswer, saveAnswer } = useOnboardingSession({ currentStep: 5, disableGuard: true });

  // 30 min is pre-selected (the waitlist favourite) so Continue is always valid
  const [selectedIndex, setSelectedIndex] = useState<number>(RECOMMENDED_INDEX);
  const [idle, setIdle] = useState(false);

  useEffect(() => {
    if (currentAnswer?.dailyGoal) {
      const idx = GOALS.findIndex((g) => g.id === currentAnswer.dailyGoal);
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
    saveAnswer({ dailyGoal: GOALS[idx].id });
    setIdle(false);
  };

  const handleNext = () => {
    // Persist even if the user never tapped — the pre-selected recommendation counts
    saveAnswer({ dailyGoal: GOALS[selectedIndex].id });
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
      <div className="w-full shrink-0 mb-3 md:mb-8 text-center md:text-left">
        <motion.h1
          variants={headlineContainer}
          initial="hidden"
          animate="show"
          className="text-[clamp(2.5rem,14vw,3.5rem)] md:text-[3.5rem] lg:text-[4rem] font-[900] leading-[1.05] md:leading-[1.1] mb-2 md:mb-4 tracking-tight text-[#071233]"
          style={{ fontFamily: 'var(--font-jakarta)', textShadow: headlineShadow }}
        >
          <motion.span variants={wordVariant} style={{ display: 'inline-block', marginRight: '0.22em' }}>Set</motion.span>
          <motion.span variants={wordVariant} style={{ display: 'inline-block', marginRight: '0.22em' }}>your</motion.span>
          <br className="md:hidden" />
          <motion.span variants={accentVariant} className="text-[#0172FD]" style={{ display: 'inline-block', marginRight: '0.22em', textShadow: accentShadow }}>daily</motion.span>
          <motion.span variants={accentVariant} className="text-[#0172FD]" style={{ display: 'inline-block', textShadow: accentShadow }}>goal</motion.span>
        </motion.h1>

        <motion.p
          initial={{ y: 14, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 28, delay: 0.3 }}
          className="text-[clamp(1rem,4.8vw,1.2rem)] md:text-xl font-medium text-slate-500 leading-snug"
          style={{ fontFamily: 'var(--font-jakarta)' }}
        >
          <span className="md:hidden">
            Choose how much time you want
            <br />
            to invest in yourself each day.
          </span>
          <span className="hidden md:inline">Choose a time commitment that fits your schedule. Consistency builds mastery.</span>
        </motion.p>
      </div>

      {/* ── TIME CARDS (compact — no flex filler, matches concept spacing) ── */}
      <div className="w-full shrink-0 z-20 max-w-[400px] md:max-w-[700px] mx-auto md:mx-0 mt-3 md:mt-0 md:mb-8">
        {/* Mobile: compact row like the concept */}
        <div className="md:hidden flex justify-between gap-2.5">
          {GOALS.map((goal, i) => {
            const isSelected = selectedIndex === i;
            return (
              <motion.button
                key={goal.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isSelected ? { opacity: 1, y: 4 } : { opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.08, type: 'spring', stiffness: 300, damping: 24 }}
                whileTap={{ scale: 0.96, y: 4, transition: { type: 'spring', stiffness: 500, damping: 15 } }}
                onClick={() => handleSelect(i)}
                className={`relative flex-1 flex flex-col items-center justify-center py-4 rounded-[1.4rem] bg-white cursor-pointer transition-colors duration-200 border-2 ${
                  isSelected ? 'border-[#0172FD]' : 'border-transparent'
                }`}
                style={{
                  boxShadow: isSelected
                    ? '0 4px 15px rgba(1,114,253,0.15)'
                    : '0 2px 10px rgba(0,0,0,0.04)',
                }}
              >
                {goal.recommended && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#0172FD] to-[#3A96FF] text-white text-[0.6rem] font-extrabold uppercase tracking-[0.08em] px-2.5 py-[3px] rounded-full whitespace-nowrap shadow-[0_2px_8px_rgba(1,114,253,0.35)]">
                    Recommended
                  </span>
                )}
                <span
                  className={`text-[1.1rem] font-extrabold tracking-tight ${isSelected ? 'text-[#0172FD]' : 'text-[#071233]'}`}
                  style={{ fontFamily: 'var(--font-jakarta)' }}
                >
                  {goal.time} min
                </span>
                <Clock
                  className={`w-6 h-6 mt-1.5 transition-colors duration-200 ${isSelected ? 'text-[#0172FD]' : 'text-slate-300'}`}
                  strokeWidth={2.5}
                />
              </motion.button>
            );
          })}
        </div>

        {/* Desktop: tall cards (layout unchanged) */}
        <div className="hidden md:flex gap-6">
          {GOALS.map((goal, i) => {
            const isSelected = selectedIndex === i;
            const anySelected = selectedIndex !== null;
            return (
              <motion.div
                key={`desktop-${goal.id}`}
                animate={{ opacity: anySelected && !isSelected ? 0.55 : 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                className="flex-1 h-[280px] lg:h-[320px]"
              >
                <motion.button
                  initial={{ y: 0 }}
                  animate={isSelected ? { y: 6 } : { y: 0 }}
                  whileHover={!anySelected || isSelected ? { scale: 1.02, y: -2 } : {}}
                  whileTap={{ scale: 0.98, y: 6, transition: { type: 'spring', stiffness: 500, damping: 15 } }}
                  onClick={() => handleSelect(i)}
                  className={`relative flex flex-col items-center justify-center p-6 rounded-[2rem] border-2 transition-colors duration-200 w-full h-full bg-white ${
                    isSelected ? 'border-[#0172FD]' : 'border-slate-200'
                  }`}
                  style={{
                    boxShadow: isSelected
                      ? '0 0px 0 0 #0172FD, 0 4px 12px rgba(1,114,253,0.15)'
                      : '0 6px 0 0 #E5EAEF, 0 15px 25px -5px rgba(0,0,0,0.08)',
                  }}
                >
                  {goal.recommended && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#0172FD] to-[#3A96FF] text-white text-[0.65rem] font-extrabold uppercase tracking-[0.08em] px-3 py-1 rounded-full whitespace-nowrap shadow-[0_2px_8px_rgba(1,114,253,0.35)] z-20">
                      Recommended
                    </span>
                  )}

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

                  <div className="w-14 h-14 rounded-full bg-[#F4F8FF] flex items-center justify-center mb-3 border border-[#EBF3FE] shadow-inner">
                    <Clock className="w-8 h-8 drop-shadow-sm" fill="#0172FD" stroke="white" strokeWidth={2} />
                  </div>

                  <div className="flex items-baseline gap-1 mb-1">
                    <span className={`text-3xl font-[900] tracking-tight ${isSelected ? 'text-[#0172FD]' : 'text-[#071233]'}`}>
                      {goal.time}
                    </span>
                    <span className={`text-base font-bold ${isSelected ? 'text-[#071233]' : 'text-slate-500'}`}>min</span>
                  </div>

                  <h3 className={`text-sm font-bold mb-1 ${isSelected ? 'text-[#0172FD]' : 'text-[#071233]'}`}>{goal.label}</h3>

                  <p className="text-xs text-center font-medium text-slate-500 leading-relaxed px-2">{goal.desc}</p>
                </motion.button>
              </motion.div>
            );
          })}
        </div>

        {/* Waitlist social proof — justifies the recommendation */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, type: 'spring', stiffness: 300, damping: 28 }}
          className="flex items-center justify-center gap-1.5 text-[0.78rem] md:text-sm font-medium text-slate-400 mt-3.5 text-center leading-snug"
          style={{ fontFamily: 'var(--font-jakarta)' }}
        >
          <Sparkles className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#0172FD] shrink-0" />
          <span className="text-center">Most waitlist learners chose 30 min — their sweet spot</span>
        </motion.p>
      </div>

      {/* ── CTA (always active — 30 min is pre-selected) ── */}
      <motion.div
        initial={{ y: 22, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 320, damping: 28, delay: 0.58 }}
        className="w-full shrink-0 mt-6 md:mt-0 pb-2 md:pb-0"
      >
        <motion.button
          animate={idle ? { scale: [1, 1.05, 1] } : { scale: 1 }}
          transition={
            idle
              ? { duration: 0.45, ease: 'easeInOut', times: [0, 0.5, 1] }
              : { type: 'spring', stiffness: 300, damping: 20 }
          }
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.94, transition: { type: 'spring', stiffness: 500, damping: 15 } }}
          onClick={handleNext}
          className="relative w-full md:w-[240px] flex items-center justify-center h-14 md:h-16 rounded-[1.75rem] md:rounded-[2rem] font-bold text-lg md:text-xl bg-[#0172FD] text-white cursor-pointer"
          style={{ boxShadow: '0 8px 16px -4px rgba(1,114,253,0.4), inset 0px -4px 0px rgba(0,0,0,0.15), inset 0px 2px 0px rgba(255,255,255,0.2)' }}
        >
          <span>Continue</span>
          <ArrowRight className="absolute right-4 md:right-8 w-6 h-6 stroke-[3]" />
        </motion.button>
      </motion.div>
    </div>
  );
}
