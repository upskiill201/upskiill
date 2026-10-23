'use client';

/** The first two screens: the splash, and Duolingo's "Get started / I have an account". */

import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { useEffect } from 'react';
import { playOnboardingCue } from '@/lib/audio/onboardingAudio';
import { playHaptic } from '@/lib/haptics';
import { Art, type ArtName } from '@/components/art/Art';
import { Btn, kitCss as css } from './ui/Kit';

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

/** The skills floating around Tey: where each sits, its size and its bob. */
const ORBIT: { art: ArtName; x: number; y: number; size: number; delay: number }[] = [
  { art: 'code', x: -128, y: -96, size: 58, delay: 0.1 },
  { art: 'chip', x: 122, y: -104, size: 54, delay: 0.2 },
  { art: 'bubbles', x: -146, y: 18, size: 52, delay: 0.3 },
  { art: 'chart', x: 140, y: 6, size: 54, delay: 0.4 },
  { art: 'mountain', x: -106, y: 112, size: 52, delay: 0.5 },
  { art: 'rocket', x: 112, y: 110, size: 54, delay: 0.6 },
];

export function WelcomeStep({ onStart, onLogin }: { onStart: () => void; onLogin: () => void }) {
  const reduce = useReducedMotion();
  return (
    <div className={css.screen} style={{ background: 'linear-gradient(180deg, var(--color-band) 0%, var(--bg-page) 62%)' }}>
      <div className="flex-1 flex flex-col items-center justify-center gap-8 px-6 pt-10 text-center">
        <div className="relative w-[300px] h-[280px] flex items-center justify-center" aria-hidden="true">
          {ORBIT.map((o, i) => (
            <motion.div
              key={o.art}
              className="absolute"
              style={{ left: '50%', top: '50%', marginLeft: o.x - o.size / 2, marginTop: o.y - o.size / 2 }}
              initial={reduce ? false : { scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 + o.delay, type: 'spring', stiffness: 300, damping: 14 }}
            >
              <motion.div
                animate={reduce ? undefined : { y: [0, i % 2 ? 7 : -7, 0], rotate: [0, i % 2 ? 4 : -4, 0] }}
                transition={{ duration: 3 + (i % 3) * 0.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Art name={o.art} size={o.size} />
              </motion.div>
            </motion.div>
          ))}
          <motion.div
            initial={reduce ? false : { scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 220, damping: 14 }}
          >
            <motion.div animate={reduce ? undefined : { y: [0, -8, 0] }} transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}>
              <Image src="/User onbarding Assets/tey/welcome.webp" alt="" width={170} height={170} priority />
            </motion.div>
          </motion.div>
        </div>
        <div>
          <h1
            className="text-[clamp(28px,8vw,38px)] font-extrabold leading-[1.1] text-[var(--color-ink)]"
            style={{ fontFamily: 'var(--font-celebration), var(--font-jakarta), sans-serif' }}
          >
            Learn real skills, <span className="text-[var(--color-brand)]">one fun lesson at a time.</span>
          </h1>
          <p className="mt-3 text-[16px] font-semibold text-[var(--text-secondary)]">
            Coding, AI, communication, leadership and more. A few minutes a day.
          </p>
        </div>
      </div>
      <div className="w-full max-w-[460px] mx-auto flex flex-col gap-3 px-6 pb-[calc(env(safe-area-inset-bottom)+24px)] pt-4">
        <Btn
          onClick={() => {
            playHaptic('medium');
            playOnboardingCue('welcome');
            onStart();
          }}
        >
          Get started
        </Btn>
        <Btn variant="outline" onClick={onLogin}>
          I already have an account
        </Btn>
      </div>
    </div>
  );
}
