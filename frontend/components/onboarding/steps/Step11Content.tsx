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

interface Step11ContentProps {
  onNext: () => void;
}

export default function Step11Content({ onNext }: Step11ContentProps) {
  const { saveAnswer } = useOnboardingSession({ currentStep: 11, disableGuard: true });
  const [idle, setIdle] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setIdle(true), 1500);
    return () => clearTimeout(t);
  }, []);

  const handleNext = () => {
    playHaptic('medium');
    saveAnswer({ streakReady: true });
    onNext();
  };

  const headlineShadow =
    '0px 2px 3px rgba(255,255,255,0.9), 0px -1px 2px rgba(0,0,0,0.15), 0 0 15px rgba(255,255,255,1), 0 0 30px rgba(255,255,255,0.9), 0 0 45px rgba(255,255,255,0.8), 0 0 60px rgba(255,255,255,0.5)';
  const accentShadow =
    '0px 2px 3px rgba(255,255,255,0.9), 0px -1px 2px rgba(1,114,253,0.4), 0 0 15px rgba(255,255,255,1), 0 0 30px rgba(255,255,255,0.9), 0 0 45px rgba(255,255,255,0.8), 0 0 60px rgba(255,255,255,0.5)';

  return (
    <div className="w-full h-full flex flex-col pt-3 px-5 md:px-0 pb-0">
      {/* ── HEADLINE ── */}
      <div className="w-full shrink-0 mb-2 md:mb-6 text-center md:text-left">
        <motion.h1
          variants={headlineContainer}
          initial="hidden"
          animate="show"
          className="text-[clamp(2.5rem,14vw,3.5rem)] md:text-[3.5rem] lg:text-[4.5rem] font-[900] leading-[1.05] md:leading-[1.1] mb-2 md:mb-4 tracking-tight text-[#071233]"
          style={{ fontFamily: 'var(--font-jakarta)', textShadow: headlineShadow }}
        >
          <div className="whitespace-nowrap inline-block md:block">
            <motion.span variants={wordVariant} style={{ display: 'inline-block', marginRight: '0.22em' }}>Start</motion.span>
            <motion.span variants={wordVariant} style={{ display: 'inline-block' }}>your</motion.span>
          </div>
          <br className="md:hidden" />
          <div className="whitespace-nowrap inline-block md:block md:-mt-1">
            <motion.span variants={accentVariant} className="text-[#0172FD]" style={{ display: 'inline-block', textShadow: accentShadow }}>
              streak!
            </motion.span>
          </div>
        </motion.h1>

        <motion.p
          initial={{ y: 14, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 28, delay: 0.3 }}
          className="text-[clamp(1rem,4.8vw,1.2rem)] md:text-xl font-medium text-slate-500 leading-snug max-w-[340px] md:max-w-none mx-auto md:mx-0"
          style={{ fontFamily: 'var(--font-jakarta)', textShadow: '0 0 10px rgba(255,255,255,1)' }}
        >
          <span className="md:hidden">
            Show up daily and I&apos;ll help you
            <br />
            build real momentum.
          </span>
          <span className="hidden md:inline">Show up daily and I&apos;ll help you build real momentum.</span>
        </motion.p>
      </div>

      {/* ── CTA ── */}
      <motion.div
        initial={{ y: 22, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 320, damping: 28, delay: 0.4 }}
        className="w-full shrink-0 mt-5 md:mt-0 pb-2 md:pb-0"
      >
        <motion.button
          animate={idle ? { scale: [1, 1.025, 1] } : { scale: 1 }}
          transition={idle ? { duration: 0.45, ease: 'easeInOut', times: [0, 0.5, 1] } : { type: 'spring', stiffness: 300, damping: 20 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.94, transition: { type: 'spring', stiffness: 500, damping: 15 } }}
          onClick={handleNext}
          className="w-full md:w-[260px] h-14 md:h-16 bg-[#0172FD] text-white rounded-2xl font-bold text-lg md:text-xl tracking-wide cursor-pointer flex items-center justify-center gap-2"
          style={{ boxShadow: '0 8px 16px -4px rgba(1,114,253,0.4), inset 0px -5px 0px rgba(0,0,0,0.24), inset 0px 2px 0px rgba(255,255,255,0.2)' }}
        >
          <span>Let&apos;s Go!</span>
          <ArrowRight className="w-6 h-6 md:w-6 md:h-6 stroke-[3]" />
        </motion.button>
      </motion.div>
    </div>
  );
}
