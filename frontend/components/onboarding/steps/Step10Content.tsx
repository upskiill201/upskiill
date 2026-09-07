'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Flame } from 'lucide-react';
import { useOnboardingSession } from '@/hooks/useOnboardingSession';
import { MascotBackground } from '@/components/onboarding/MascotBackground';
import { playHaptic } from '@/lib/haptics';

interface ConfettiParticle {
  id: number;
  type: 'star' | 'circle' | 'ribbon';
  color: string;
  x: number;
  y: number;
  size: number;
  delay: number;
  rotation: number;
}

const CONFETTI_LIST: ConfettiParticle[] = [
  { id: 1, type: 'star', color: '#0172FD', x: -80, y: -140, size: 20, delay: 0.1, rotation: 12 },
  { id: 2, type: 'ribbon', color: '#3A96FF', x: -140, y: -100, size: 26, delay: 0.15, rotation: -45 },
  { id: 3, type: 'circle', color: '#0050B3', x: -60, y: -80, size: 14, delay: 0.2, rotation: 15 },
  { id: 4, type: 'star', color: '#E0F2FE', x: -110, y: -160, size: 18, delay: 0.08, rotation: -20 },
  { id: 5, type: 'ribbon', color: '#0172FD', x: -160, y: -60, size: 22, delay: 0.25, rotation: 35 },
  { id: 6, type: 'circle', color: '#3A96FF', x: -100, y: -110, size: 12, delay: 0.18, rotation: -10 },
  { id: 7, type: 'star', color: '#3A96FF', x: 80, y: -140, size: 22, delay: 0.12, rotation: 45 },
  { id: 8, type: 'ribbon', color: '#0172FD', x: 140, y: -100, size: 28, delay: 0.22, rotation: -30 },
  { id: 9, type: 'circle', color: '#E0F2FE', x: 60, y: -80, size: 12, delay: 0.05, rotation: 10 },
  { id: 10, type: 'star', color: '#0050B3', x: 110, y: -160, size: 16, delay: 0.3, rotation: 25 },
  { id: 11, type: 'ribbon', color: '#3A96FF', x: 160, y: -60, size: 24, delay: 0.28, rotation: -15 },
  { id: 12, type: 'circle', color: '#0172FD', x: 100, y: -110, size: 14, delay: 0.14, rotation: 40 },
  { id: 13, type: 'star', color: '#E0F2FE', x: -120, y: -20, size: 20, delay: 0.32, rotation: -5 },
  { id: 14, type: 'ribbon', color: '#0050B3', x: -150, y: 30, size: 24, delay: 0.16, rotation: 55 },
  { id: 15, type: 'circle', color: '#0172FD', x: -80, y: 50, size: 16, delay: 0.24, rotation: -25 },
  { id: 16, type: 'star', color: '#3A96FF', x: -130, y: 90, size: 18, delay: 0.35, rotation: 18 },
  { id: 17, type: 'star', color: '#0172FD', x: 120, y: -20, size: 18, delay: 0.27, rotation: 15 },
  { id: 18, type: 'ribbon', color: '#3A96FF', x: 150, y: 30, size: 26, delay: 0.19, rotation: -40 },
  { id: 19, type: 'circle', color: '#E0F2FE', x: 80, y: 50, size: 14, delay: 0.31, rotation: 5 },
  { id: 20, type: 'star', color: '#0050B3', x: 130, y: 90, size: 20, delay: 0.21, rotation: -22 },
];

interface Step10ContentProps {
  onNext: () => void;
}

export default function Step10Content({ onNext }: Step10ContentProps) {
  const { saveAnswer } = useOnboardingSession({ currentStep: 10, disableGuard: true });
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(true);
      playHaptic('teyroCelebration');
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleContinue = () => {
    playHaptic('medium');
    saveAnswer({ completed: true });
    onNext();
  };

  return (
    <div className="w-full h-full flex flex-col justify-between px-4 md:px-0 pb-2 md:pb-0 pt-1">
      {/* ── MAIN CONTENT ── */}
      <div className="flex-1 flex flex-col md:flex-row items-center justify-between w-full min-h-0 relative gap-3 md:gap-8">
        {/* Left / Top: Title & XP Card */}
        <div className="w-full md:w-[48%] flex flex-col items-center md:items-start text-center md:text-left z-20">
          <h1
            className="text-[clamp(2rem,9vw,3rem)] md:text-[3.5rem] lg:text-[4rem] font-[900] tracking-tight text-[#071233] leading-none mb-2"
            style={{ fontFamily: 'var(--font-jakarta)' }}
          >
            Great <span className="text-[#0172FD]">job!</span>
          </h1>

          <p className="text-slate-500 font-medium text-sm md:text-lg leading-relaxed mb-4 max-w-[320px] md:max-w-none">
            You just crushed the demo — keep that momentum going!
          </p>

          {/* XP Badge — mirrors the real one-time reward the server granted
              for the Step 9 shape challenge (25 XP + 25 coins) */}
          <div className="flex items-center gap-3 bg-white/80 backdrop-blur-md border border-white/80 border-b-[4px] border-slate-200/60 rounded-[1.5rem] px-5 py-3 shadow-md w-full max-w-[280px]">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#3A96FF] to-[#0172FD] flex items-center justify-center shadow-sm shrink-0">
              <Star className="w-5 h-5 text-white fill-white" />
            </div>

            <div className="flex flex-col items-start leading-tight">
              <span className="text-slate-400 font-extrabold text-[10px] tracking-wider uppercase mb-0.5">Shape challenge bonus</span>
              <div className="flex items-baseline gap-1.5" style={{ fontFamily: 'var(--font-jakarta)' }}>
                <span className="text-[#0172FD] font-[900] text-2xl">+25</span>
                <span className="text-[#071233] font-[900] text-lg">XP</span>
                <span className="text-slate-300 font-black text-lg">·</span>
                <span className="text-yellow-600 font-[900] text-lg">+25</span>
                <span className="text-[#071233] font-[900] text-sm uppercase">coins</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right / Mascot & Confetti */}
        <div className="w-full md:w-[50%] flex-1 md:h-full flex items-center justify-center relative z-10 pointer-events-none md:ml-auto min-h-[220px]">
          {/* Confetti particles */}
          <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
            {CONFETTI_LIST.map((p) => (
              <motion.div
                key={p.id}
                initial={{ scale: 0.1, opacity: 0, x: 0, y: 0 }}
                animate={
                  showConfetti
                    ? { scale: 1, opacity: 1, x: `${p.x}px`, y: `${p.y}px`, rotate: p.rotation }
                    : { scale: 0.1, opacity: 0, x: 0, y: 0 }
                }
                transition={{ type: 'spring', stiffness: 180, damping: 15, delay: p.delay, mass: 0.6 }}
                className="absolute flex items-center justify-center"
              >
                {p.type === 'star' && <Star className="w-4 h-4" style={{ color: p.color, fill: p.color }} />}
                {p.type === 'circle' && (
                  <div className="rounded-full" style={{ width: p.size * 0.8, height: p.size * 0.8, backgroundColor: p.color }} />
                )}
                {p.type === 'ribbon' && (
                  <svg width={p.size} height={p.size} viewBox="0 0 24 24" fill="none" stroke={p.color} strokeWidth="3">
                    <path d="M4 12c4-6 8-6 12 0s8 6 12 0" />
                  </svg>
                )}
              </motion.div>
            ))}
          </div>

          <div className="relative w-full max-w-[320px] md:max-w-[440px] aspect-square">
            <MascotBackground />
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
              className="w-full h-full relative z-10"
            >
              <Image
                src="/User onbarding Assets/Step_10_image.webp"
                alt="Tey Victorious Robot"
                fill
                className="object-contain drop-shadow-[0_20px_45px_rgba(1,114,253,0.15)]"
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
          className="w-full md:max-w-[420px] h-[52px] md:h-[60px] bg-[#0172FD] border-b-4 border-[#0050B3] text-white rounded-[1.2rem] font-[900] text-base md:text-lg tracking-wider hover:bg-[#0060D9] active:border-b-0 active:translate-y-1 transition-all cursor-pointer flex items-center justify-center gap-2 mx-auto shadow-[0_4px_15px_rgba(1,114,253,0.25)]"
          style={{ fontFamily: 'var(--font-jakarta)' }}
        >
          <span>Continue Your Journey</span>
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </div>
    </div>
  );
}
