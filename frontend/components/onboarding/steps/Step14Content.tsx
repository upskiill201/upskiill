'use client';

import React, { useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useOnboardingSession } from '@/hooks/useOnboardingSession';
import { playHaptic } from '@/lib/haptics';

const headlineContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.055, delayChildren: 0.15 } },
};
const wordVariant: Variants = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 400, damping: 28 } },
};
const accentVariant: Variants = {
  hidden: { y: 20, opacity: 0, scale: 0.75 },
  show: { y: 0, opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 500, damping: 20 } },
};

interface Step14ContentProps {
  onNext: () => void;
}

export default function Step14Content({ onNext }: Step14ContentProps) {
  useOnboardingSession({ currentStep: 14, disableGuard: true });
  const [idle, setIdle] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setIdle(true), 1500);
    return () => clearTimeout(t);
  }, []);

  const handleNext = () => {
    playHaptic('medium');
    onNext();
  };

  const headlineShadow =
    '0px 2px 3px rgba(255,255,255,0.9), 0px -1px 2px rgba(0,0,0,0.15), 0 0 15px rgba(255,255,255,1), 0 0 30px rgba(255,255,255,0.9)';
  const accentShadow =
    '0px 2px 3px rgba(255,255,255,0.9), 0px -1px 2px rgba(1,114,253,0.4), 0 0 15px rgba(255,255,255,1)';

  return (
    <div className="w-full h-full flex flex-col justify-between pt-3 px-5 md:px-0 pb-2 md:pb-0">
      {/* ── HEADLINE ── */}
      <div className="w-full shrink-0 mb-2 md:mb-6 text-center md:text-left">
        <motion.h1
          variants={headlineContainer}
          initial="hidden"
          animate="show"
          className="text-[clamp(2rem,9vw,3rem)] md:text-[3.5rem] lg:text-[4.5rem] font-[900] leading-[1.05] mb-2 tracking-tight text-[#071233]"
          style={{ fontFamily: 'var(--font-jakarta)', textShadow: headlineShadow }}
        >
          <div className="whitespace-nowrap inline-block md:block">
            <motion.span variants={wordVariant} style={{ display: 'inline-block', marginRight: '0.22em' }}>Learn</motion.span>
            <motion.span variants={accentVariant} className="text-[#0172FD]" style={{ display: 'inline-block', textShadow: accentShadow }}>
              with friends
            </motion.span>
          </div>
        </motion.h1>

        <motion.p
          initial={{ y: 14, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 28, delay: 0.3 }}
          className="text-[clamp(0.9rem,3.5vw,1rem)] md:text-xl font-medium text-slate-500 leading-tight max-w-[340px] md:max-w-none mx-auto md:mx-0"
          style={{ fontFamily: 'var(--font-jakarta)' }}
        >
          Share progress, celebrate wins, and reach new heights together.
        </motion.p>
      </div>

      {/* ── CTA ── */}
      <motion.div
        initial={{ y: 22, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 320, damping: 28, delay: 0.4 }}
        className="w-full shrink-0 pb-2 md:pb-0"
      >
        <motion.button
          animate={idle ? { scale: [1, 1.025, 1] } : { scale: 1 }}
          transition={idle ? { duration: 0.45, ease: 'easeInOut', times: [0, 0.5, 1] } : { type: 'spring', stiffness: 300, damping: 20 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.96, transition: { type: 'spring', stiffness: 500, damping: 15 } }}
          onClick={handleNext}
          className="w-full md:w-[260px] h-12 md:h-16 bg-[#0172FD] border-b-4 border-[#0050B3] text-white rounded-[1.2rem] md:rounded-[2rem] font-[900] text-base md:text-xl tracking-wider hover:bg-[#0060D9] active:border-b-0 active:translate-y-[2px] transition-all cursor-pointer flex items-center justify-center shadow-[0_4px_15px_rgba(1,114,253,0.25)] gap-2"
        >
          <span>Next</span>
          <ArrowRight className="w-5 h-5 md:w-6 md:h-6 stroke-[2.8]" />
        </motion.button>
      </motion.div>
    </div>
  );
}
