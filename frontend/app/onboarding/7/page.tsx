'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useOnboardingSession } from '@/hooks/useOnboardingSession';
import { MascotBackground } from '@/components/onboarding/MascotBackground';
import { StepSkeleton } from '@/components/onboarding/StepSkeleton';
import { SpeechBubble } from '@/components/onboarding/SpeechBubble';

// Plain text types naturally char by char.
// HTML-tagged strings appear as a single animated reveal.
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

export default function OnboardingStep7() {
  const router = useRouter();
  const { isLoading, answers, advance } = useOnboardingSession(7);

  const mascotRef = useRef<HTMLDivElement>(null);

  // Detect if the user verified their number in step 6
  const isVerified = !!answers['6']?.whatsappNumber;

  const handleBack = () => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(10);
    router.push('/onboarding/6');
  };

  const handleContinue = () => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(12);
    void advance();
  };

  if (isLoading) return <StepSkeleton />;

  return (
    <div className="h-[95vh] min-h-[95vh] max-h-[95vh] overflow-hidden bg-gradient-to-br from-[#EBF3FE] via-[#F4F8FF] to-[#FFFFFF] flex flex-col relative select-none">

      <div className="flex-1 w-full flex flex-col relative z-10 max-w-[1200px] mx-auto h-full px-6 md:px-10 pt-8 md:pt-16 pb-6 justify-between">

        {/* Header Row */}
        <div className="flex items-center gap-4 w-full mb-4 md:mb-8">
          <button
            onClick={handleBack}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-white border border-slate-200 text-slate-600 hover:text-[#0172FD] hover:border-[#0172FD]/40 active:scale-95 transition-all shadow-sm cursor-pointer shrink-0"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="flex-1 h-3 bg-[#E5EAEF] rounded-full overflow-hidden shadow-inner relative">
            <motion.div
              initial={{ width: `${(6 / 15) * 100}%` }}
              animate={{ width: `${(7 / 15) * 100}%` }}
              transition={{ type: 'spring', stiffness: 280, damping: 24, mass: 0.8, delay: 0.25 }}
              className="h-full rounded-full relative"
              style={{
                background: 'linear-gradient(90deg, #0172FD 0%, #3A96FF 100%)',
                boxShadow: 'inset 0px -4px 0px rgba(0,0,0,0.1), inset 0px 4px 0px rgba(255,255,255,0.3)',
              }}
            />
          </div>
          <span className="text-sm font-[800] text-[#0172FD] shrink-0" style={{ textShadow: '0 0 10px rgba(255,255,255,1)' }}>
            7/15
          </span>
        </div>

        {/* Main Body Section */}
        <div className="flex-1 flex flex-col md:flex-row items-center justify-between w-full min-h-0 relative gap-4 md:gap-8">

          {/* Left / Top: SpeechBubble */}
          <div className="w-full md:w-[48%] h-[42%] md:h-auto flex flex-col justify-center items-center md:items-start z-20">
            <SpeechBubble
              lines={isVerified ? VERIFIED_LINES : SKIPPED_LINES}
              tailAlign={0.18}
              mascotRef={mascotRef}
            />
          </div>

          {/* Right / Bottom: Mascot + background effects */}
          <div className="w-full md:w-[50%] h-[58%] md:h-full flex items-center justify-center relative z-10 pointer-events-none md:ml-auto">
            <div
              ref={mascotRef}
              className="relative w-full max-w-[420px] md:max-w-[550px] aspect-square scale-[1.12] md:scale-[1.25] origin-center md:origin-right"
            >
              <MascotBackground />
              <motion.div
                layoutId="tey-mascot"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1.0, y: 0 }}
                transition={{ type: 'spring', stiffness: 260, damping: 24, delay: 0.1 }}
                className="absolute inset-0 z-10 scale-[0.95] md:scale-[1.0]"
              >
                <Image
                  src={
                    isVerified
                      ? '/User onbarding Assets/Step_7_tey_verified_state.PNG'
                      : '/User onbarding Assets/Step_7_tey_skiped_state.PNG'
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

        {/* Continue Button */}
        <div className="w-full z-30 pt-4 border-t border-slate-100/50">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.94, transition: { type: 'spring', stiffness: 500, damping: 15 } }}
            onClick={handleContinue}
            className="w-full md:max-w-[480px] h-[55px] md:h-[60px] bg-[#0172FD] border-b-4 border-[#0050B3] text-white rounded-[1.2rem] font-[900] text-lg tracking-wider hover:bg-[#0060D9] active:border-b-0 active:translate-y-1 transition-all cursor-pointer flex items-center justify-center mx-auto shadow-[0_4px_15px_rgba(1,114,253,0.25)]"
          >
            I'M READY! 🚀
          </motion.button>
        </div>

      </div>
    </div>
  );
}
