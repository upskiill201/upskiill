'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { MascotBackground } from '@/components/onboarding/MascotBackground';
import { playHaptic } from '@/lib/haptics';

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
      <div className="flex-1 flex flex-col md:flex-row items-center justify-between w-full min-h-0 relative gap-3 md:gap-8">
        {/* Text Container */}
        <div className="w-full flex-1 md:w-[50%] flex flex-col justify-center items-center md:items-start text-center md:text-left z-20">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 350, damping: 28 }}
            className="text-[clamp(1.75rem,8vw,2.2rem)] md:text-[3.5rem] lg:text-[4rem] leading-[1.05] font-[900] tracking-tight text-[#071233] w-full"
            style={{ fontFamily: 'var(--font-jakarta)', textShadow: headlineShadow }}
          >
            <span>Let&apos;s try a</span>
            <br />
            <span>
              quick{' '}
              <span className="text-[#0172FD]" style={{ textShadow: accentShadow }}>
                challenge!
              </span>
            </span>
          </motion.h1>

          <motion.p
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28, delay: 0.2 }}
            className="text-[clamp(0.95rem,3.5vw,1.1rem)] md:text-xl font-semibold text-slate-500 mt-2 md:mt-4 mb-4 md:mb-6 max-w-[340px] md:max-w-[450px]"
            style={{ fontFamily: 'var(--font-jakarta)', textShadow: subheadShadow }}
          >
            <span className="md:hidden">A short challenge is the best way to learn by doing.</span>
            <span className="hidden md:inline">Experience the Teyro way of learning.</span>
          </motion.p>
        </div>

        {/* Mascot */}
        <div className="w-full md:w-[50%] flex-1 md:h-full flex items-center justify-center relative z-10 pointer-events-none md:ml-auto min-h-[220px]">
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
      </div>

      {/* ── CTA ── */}
      <div className="w-full z-30 pt-2 shrink-0">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.94, transition: { type: 'spring', stiffness: 500, damping: 15 } }}
          onClick={handleStart}
          className="w-full md:max-w-[420px] h-[52px] md:h-[60px] bg-[#0172FD] border-b-4 border-[#0050B3] text-white rounded-[1.2rem] font-[900] text-base md:text-lg tracking-wider hover:bg-[#0060D9] active:border-b-0 active:translate-y-1 transition-all cursor-pointer flex items-center justify-center gap-2 mx-auto shadow-[0_4px_15px_rgba(1,114,253,0.25)]"
          style={{ fontFamily: 'var(--font-jakarta)' }}
        >
          <span>Start Challenge</span>
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </div>
    </div>
  );
}
