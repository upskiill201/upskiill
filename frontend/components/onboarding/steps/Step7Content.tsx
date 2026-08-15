'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useOnboardingSession } from '@/hooks/useOnboardingSession';
import { MascotBackground } from '@/components/onboarding/MascotBackground';
import { SpeechBubble } from '@/components/onboarding/SpeechBubble';
import { playHaptic } from '@/lib/haptics';

const VERIFIED_LINES = [
  `<strong style="font-size:1.25rem;color:#071233;font-weight:900;display:block">You're all set! ✅</strong>`,
  `Thanks for trusting me with your <span style="color:#0172FD;font-weight:800">WhatsApp</span>.`,
  `I promise not to spam you… unless you keep skipping your lessons. 😅`,
  `Now let me prove learning can actually be fun.`,
  `<span style="color:#0172FD;font-weight:900;display:block;border-top:1px solid #E5EAEF;padding-top:10px;margin-top:6px">Ready for a 2-minute challenge?</span>`,
];

const SKIPPED_LINES = [
  `<strong style="font-size:1.25rem;color:#071233;font-weight:900;display:block">You <span style="color:#0172FD">skipped WhatsApp.</span> 😅</strong>`,
  `There goes my plan to become your favorite notification.`,
  `That's okay though… I'll earn that title first. 😉`,
  `<span style="color:#0172FD;font-weight:900;display:block;border-top:1px solid #E5EAEF;padding-top:10px;margin-top:6px">Ready for a 2-minute challenge?</span>`,
];

interface Step7ContentProps {
  onNext: () => void;
}

export default function Step7Content({ onNext }: Step7ContentProps) {
  const { answers } = useOnboardingSession({ currentStep: 7, disableGuard: true });
  const mascotRef = useRef<HTMLDivElement>(null);

  const isVerified = !!answers['6']?.whatsappNumber;

  const handleContinue = () => {
    playHaptic('medium');
    onNext();
  };

  return (
    <div className="w-full h-full flex flex-col justify-between px-4 md:px-0 pb-2 md:pb-0 pt-1">
      {/* ── MAIN BODY SECTION ── */}
      <div className="flex-1 flex flex-col md:flex-row items-center justify-between w-full min-h-0 relative gap-3 md:gap-8">
        {/* SpeechBubble */}
        <div className="w-full md:w-[48%] flex flex-col justify-center items-center md:items-start z-20 shrink-0">
          <SpeechBubble lines={isVerified ? VERIFIED_LINES : SKIPPED_LINES} tailAlign={0.18} mascotRef={mascotRef} />
        </div>

        {/* Mascot */}
        <div className="w-full md:w-[50%] flex-1 md:h-full flex items-center justify-center relative z-10 pointer-events-none md:ml-auto min-h-[220px]">
          <div ref={mascotRef} className="relative w-full max-w-[340px] md:max-w-[480px] aspect-square scale-[1.05] md:scale-[1.15]">
            <MascotBackground />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1.0, y: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 24, delay: 0.1 }}
              className="absolute inset-0 z-10"
            >
              <Image
                src={
                  isVerified
                    ? '/User onbarding Assets/Step_7_tey_verified_state.webp'
                    : '/User onbarding Assets/Step_7_tey_skiped_state.webp'
                }
                alt="Tey Mascot Reaction"
                fill
                className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.12)]"
                priority
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="w-full z-30 pt-2 shrink-0">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.94, transition: { type: 'spring', stiffness: 500, damping: 15 } }}
          onClick={handleContinue}
          className="w-full md:max-w-[420px] h-[52px] md:h-[60px] bg-[#0172FD] border-b-4 border-[#0050B3] text-white rounded-[1.2rem] font-[900] text-base md:text-lg tracking-wider hover:bg-[#0060D9] active:border-b-0 active:translate-y-1 transition-all cursor-pointer flex items-center justify-center mx-auto shadow-[0_4px_15px_rgba(1,114,253,0.25)]"
        >
          I&apos;M READY! 🚀
        </motion.button>
      </div>
    </div>
  );
}
