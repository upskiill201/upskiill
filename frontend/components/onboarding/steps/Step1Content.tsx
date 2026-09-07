'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { playHaptic } from '@/lib/haptics';

const headlineContainer: any = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.055, delayChildren: 0.1 } },
};
const wordVariant: any = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 400, damping: 28 } },
};
const accentVariant: any = {
  hidden: { y: 20, opacity: 0, scale: 0.75 },
  show: { y: 0, opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 500, damping: 20 } },
};

interface Step1ContentProps {
  onNext: () => void;
}

export default function Step1Content({ onNext }: Step1ContentProps) {
  const [idle, setIdle] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setIdle(true), 1500);
    return () => clearTimeout(t);
  }, []);

  const headlineShadow =
    '0px 2px 3px rgba(255,255,255,0.9), 0px -1px 2px rgba(0,0,0,0.15), 0 0 15px rgba(255,255,255,1), 0 0 30px rgba(255,255,255,0.9), 0 0 45px rgba(255,255,255,0.8), 0 0 60px rgba(255,255,255,0.5)';
  const accentShadow =
    '0px 2px 3px rgba(255,255,255,0.9), 0px -1px 2px rgba(1,114,253,0.4), 0 0 15px rgba(255,255,255,1), 0 0 30px rgba(255,255,255,0.9), 0 0 45px rgba(255,255,255,0.8), 0 0 60px rgba(255,255,255,0.5)';

  return (
    <div className="w-full h-full flex flex-col items-center md:items-start justify-end md:justify-center text-center md:text-left px-5 md:px-0 pb-6 md:pb-0 pt-2">
      {/* ── HEADLINE ── */}
      <motion.h1
        variants={headlineContainer}
        initial="hidden"
        animate="show"
        className="text-[clamp(2.5rem,14vw,3.5rem)] md:text-[4.5rem] lg:text-[6rem] xl:text-[7.5rem] font-[900] leading-[1.05] md:leading-[1.1] mb-2 md:mb-4 tracking-tight text-[#071233]"
        style={{ fontFamily: 'var(--font-jakarta)', textShadow: headlineShadow }}
      >
        <motion.span variants={wordVariant} style={{ display: 'inline-block' }}>
          Welcome
        </motion.span>
        <br />
        <motion.span variants={wordVariant} style={{ display: 'inline-block', marginRight: '0.15em' }}>
          to
        </motion.span>{' '}
        <motion.span variants={accentVariant} style={{ display: 'inline-block', color: '#0172FD', textShadow: accentShadow }}>
          Teyro!
        </motion.span>
      </motion.h1>

      {/* ── SUBTITLE ── */}
      <motion.p
        initial={{ y: 14, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 28, delay: 0.5 }}
        className="text-[clamp(1.05rem,5vw,1.25rem)] md:text-xl lg:text-[1.35rem] mb-8 md:mb-10 font-medium text-slate-500 md:text-slate-600 leading-snug max-w-[92%] md:max-w-none"
        style={{ fontFamily: 'var(--font-jakarta)', textShadow: '0 0 10px rgba(255,255,255,1)' }}
      >
        I&apos;m Tey — I&apos;ll be with you
        <br />
        every step of the way.
      </motion.p>

      {/* ── CTA ── */}
      <motion.div
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 320, damping: 28, delay: 0.65 }}
        className="w-full md:w-auto"
      >
        <motion.button
          animate={idle ? { scale: [1, 1.05, 1] } : { scale: 1 }}
          transition={
            idle
              ? { duration: 0.45, ease: 'easeInOut', times: [0, 0.5, 1] }
              : { type: 'spring', stiffness: 300, damping: 20 }
          }
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.94, transition: { type: 'spring', stiffness: 500, damping: 15 } }}
          onClick={() => {
            setIdle(false);
            playHaptic('medium');
            onNext();
          }}
          className="relative w-full md:w-[340px] lg:w-[400px] flex items-center justify-center py-4 md:py-6 rounded-2xl text-white font-bold text-[1.3rem] md:text-2xl cursor-pointer"
          style={{
            backgroundColor: '#0172FD',
            boxShadow:
              '0 12px 24px -8px rgba(1,114,253,0.4), inset 0px -6px 0px rgba(0,0,0,0.24), inset 0px 2px 0px rgba(255,255,255,0.2)',
          }}
        >
          <span>Get Started</span>
          <ArrowRight className="absolute right-5 md:right-10 w-6 h-6 md:w-7 md:h-7 stroke-[3]" />
        </motion.button>
      </motion.div>
    </div>
  );
}
