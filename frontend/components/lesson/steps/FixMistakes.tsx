'use client';

/**
 * Between the first pass and the retries: "Let's fix your mistakes."
 * One beat of Tey so the questions coming back read as a second chance,
 * not as the quiz going wrong.
 */

import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { TEY_POSE_SRC } from '../TeySays';

export function FixMistakes({ count }: { count: number }) {
  const reducedMotion = useReducedMotion();
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center py-6">
      <motion.div
        className="relative w-full"
        style={{ height: 'clamp(180px, 34dvh, 320px)' }}
        initial={reducedMotion ? false : { scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 420, damping: 18 }}
      >
        <Image src={TEY_POSE_SRC.thinking} alt="" aria-hidden="true" fill priority sizes="320px" className="object-contain object-bottom" />
      </motion.div>
      <h1
        className="mt-5 text-[28px] md:text-[34px] font-extrabold text-ink leading-tight"
        style={{ fontFamily: 'var(--font-jakarta)' }}
      >
        Let&apos;s fix your mistakes
      </h1>
      <p className="mt-2 max-w-[420px] text-[16px] md:text-[17px] font-bold text-[var(--text-secondary)] leading-snug">
        {count === 1
          ? "One question to go back to. You've seen the answer now — this one's yours."
          : `${count} questions to go back to. You've seen the answers now — these are yours.`}
      </p>
    </div>
  );
}

export default FixMistakes;
