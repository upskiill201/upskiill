'use client';

/** The first two screens: the splash, and Duolingo's "Get started / I have an account". */

import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { useEffect } from 'react';
import { playOnboardingCue } from '@/lib/audio/onboardingAudio';
import { playHaptic } from '@/lib/haptics';

export function SplashStep({ onDone }: { onDone: () => void }) {
  const reduce = useReducedMotion();
  useEffect(() => {
    const t = window.setTimeout(onDone, reduce ? 300 : 1500);
    return () => window.clearTimeout(t);
  }, [onDone, reduce]);
  return (
    <button
      type="button"
      onClick={onDone}
      aria-label="Start"
      className="fixed inset-0 flex flex-col items-center justify-center bg-[var(--color-brand)]"
    >
      <motion.div
        initial={reduce ? false : { scale: 0.4, y: 40, opacity: 0 }}
        animate={{ scale: [0.4, 1.12, 1], y: 0, opacity: 1 }}
        transition={{ duration: 0.8, times: [0, 0.6, 1], ease: 'easeOut' }}
      >
        <Image src="/Teyro Logo.png" alt="Teyro" width={132} height={132} priority className="rounded-[28px]" />
      </motion.div>
    </button>
  );
}

export function WelcomeStep({ onStart, onLogin }: { onStart: () => void; onLogin: () => void }) {
  const reduce = useReducedMotion();
  return (
    <div className="min-h-[100dvh] w-full flex flex-col items-center justify-between px-6 pt-10 pb-8 text-center bg-gradient-to-b from-band via-white to-white">
      <div className="flex-1 flex flex-col items-center justify-center gap-6">
        <motion.div
          initial={reduce ? false : { scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 220, damping: 14 }}
        >
          <motion.div
            animate={reduce ? undefined : { y: [0, -8, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Image src="/User onbarding Assets/tey/waving.webp" alt="Tey, your guide" width={200} height={200} priority />
          </motion.div>
        </motion.div>
        <div>
          <h1
            className="text-[clamp(28px,8vw,40px)] font-extrabold leading-[1.1] text-[var(--color-ink)]"
            style={{ fontFamily: 'var(--font-celebration), var(--font-jakarta), sans-serif' }}
          >
            Learn real skills, <span className="text-[var(--color-brand)]">one fun lesson at a time.</span>
          </h1>
          <p className="mt-3 text-[16px] font-semibold text-[var(--text-secondary)]">
            Coding, AI, money, leadership and more. A few minutes a day.
          </p>
        </div>
      </div>
      <div className="w-full max-w-[420px] flex flex-col gap-3">
        <button
          type="button"
          onClick={() => {
            playHaptic('medium');
            playOnboardingCue('welcome');
            onStart();
          }}
          className="w-full min-h-[56px] rounded-[16px] font-extrabold uppercase tracking-wider text-[16px] text-white bg-[var(--color-brand)]"
          style={{ boxShadow: '0 6px 0 var(--color-brand-deep)' }}
        >
          Get started
        </button>
        <button
          type="button"
          onClick={onLogin}
          className="w-full min-h-[56px] rounded-[16px] border-2 font-extrabold uppercase tracking-wider text-[15px] text-[var(--color-brand)] bg-white"
          style={{ borderColor: 'var(--border)', boxShadow: '0 4px 0 var(--border)' }}
        >
          I already have an account
        </button>
      </div>
    </div>
  );
}
