'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { MascotBackground } from '@/components/onboarding/MascotBackground';
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

interface Step8ContentProps {
  onNext: () => void;
}

export default function Step8Content({ onNext }: Step8ContentProps) {
  const mascotRef = useRef<HTMLDivElement>(null);

  const handleStart = () => {
    playHaptic('medium');
    onNext();
  };

  const headlineShadow =
    '0px 2px 3px rgba(255,255,255,0.9), 0px -1px 2px rgba(0,0,0,0.15), 0 0 15px rgba(255,255,255,1), 0 0 30px rgba(255,255,255,0.9), 0 0 45px rgba(255,255,255,0.8), 0 0 60px rgba(255,255,255,0.5)';
  const accentShadow =
    '0px 2px 3px rgba(255,255,255,0.9), 0px -1px 2px rgba(1,114,253,0.4), 0 0 15px rgba(255,255,255,1), 0 0 30px rgba(255,255,255,0.9), 0 0 45px rgba(255,255,255,0.8), 0 0 60px rgba(255,255,255,0.5)';
  const subheadShadow = '0 0 15px rgba(255,255,255,1), 0 0 25px rgba(255,255,255,0.9)';

  return (
    <div className="w-full h-full flex flex-col justify-between px-4 md:px-0 pb-2 md:pb-0 pt-1">
      <div className="flex-1 flex flex-col md:flex-row items-center justify-between w-full min-h-0 relative gap-2 md:gap-8">
        {/* ── MASCOT (top on mobile — flexes to absorb leftover space, like the concept) ── */}
        <div className="w-full flex-1 min-h-0 md:w-[50%] md:h-full md:flex-1 flex items-center justify-center relative z-10 pointer-events-none md:ml-auto order-1 md:order-2">
          <div ref={mascotRef} className="relative w-full max-w-[340px] md:max-w-[500px] aspect-square scale-[1.05] md:scale-[1.25]">
            <MascotBackground />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1.0, y: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 24, delay: 0.1 }}
              className="absolute inset-0 z-10"
            >
              <div className="md:hidden absolute inset-0">
                <Image
                  src="/User onbarding Assets/Step_8_mascot_Mobile.webp"
                  alt="Tey Mascot pointing to Start"
                  fill
                  className="object-contain drop-shadow-[0_15px_40px_rgba(0,0,0,0.12)]"
                  priority
                />
              </div>
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

        {/* ── TEXT (anchored under the mascot on mobile, left pane on desktop) ── */}
        <div className="w-full shrink-0 md:w-[50%] md:flex-1 flex flex-col justify-center items-center md:items-start text-center md:text-left z-20 order-2 md:order-1">
          <motion.h1
            variants={headlineContainer}
            initial="hidden"
            animate="show"
            className="text-[clamp(2.1rem,11vw,3.25rem)] md:text-[3.5rem] lg:text-[4rem] leading-[1.05] md:leading-[1.1] font-[900] tracking-tight text-[#071233] w-full mb-2 md:mb-4"
            style={{ fontFamily: 'var(--font-jakarta)', textShadow: headlineShadow }}
          >
            <div className="whitespace-nowrap inline-block md:block">
              <motion.span variants={wordVariant} style={{ display: 'inline-block', marginRight: '0.22em' }}>Let&apos;s</motion.span>
              <motion.span variants={wordVariant} style={{ display: 'inline-block', marginRight: '0.22em' }}>try</motion.span>
              <motion.span variants={wordVariant} style={{ display: 'inline-block' }}>a</motion.span>
            </div>{' '}
            <div className="whitespace-nowrap inline-block md:block md:-mt-1">
              <motion.span variants={wordVariant} style={{ display: 'inline-block', marginRight: '0.22em' }}>quick</motion.span>
              <motion.span variants={accentVariant} className="text-[#0172FD]" style={{ display: 'inline-block', textShadow: accentShadow }}>
                challenge!
              </motion.span>
            </div>
          </motion.h1>

          <motion.p
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28, delay: 0.3 }}
            className="text-[clamp(1rem,4.8vw,1.2rem)] md:text-xl font-medium text-slate-500 leading-snug max-w-[340px] md:max-w-[450px]"
            style={{ fontFamily: 'var(--font-jakarta)', textShadow: subheadShadow }}
          >
            <span className="md:hidden">
              A short challenge is the best
              <br />
              way to learn by doing.
            </span>
            <span className="hidden md:inline">Experience the Teyro way of learning.</span>
          </motion.p>
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="w-full z-30 pt-3 shrink-0">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.94, transition: { type: 'spring', stiffness: 500, damping: 15 } }}
          onClick={handleStart}
          className="w-full md:max-w-[420px] h-14 md:h-[60px] bg-[#0172FD] text-white rounded-[1.75rem] md:rounded-[2rem] font-bold text-lg tracking-wide cursor-pointer flex items-center justify-center gap-2 mx-auto"
          style={{
            fontFamily: 'var(--font-jakarta)',
            boxShadow: '0 8px 16px -4px rgba(1,114,253,0.4), inset 0px -4px 0px rgba(0,0,0,0.15), inset 0px 2px 0px rgba(255,255,255,0.2)',
          }}
        >
          <span>Start Challenge</span>
          <ArrowRight className="w-5 h-5 stroke-[3]" />
        </motion.button>
      </div>
    </div>
  );
}
