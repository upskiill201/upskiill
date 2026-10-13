'use client';

/**
 * The lesson finished a whole level of a Teyro Original — the last payoff
 * screen (docs/ORIGINALS_PLAYBOOK.md §3).
 *
 * Every fact comes from the server's `levelComplete`: which level was
 * finished and which one the learner was just enrolled in. Home already
 * opens on that next level when the lesson closes, so this screen only has
 * to say so. A Track's last level gets the "whole track" version instead.
 */

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Mountain, Trophy } from 'lucide-react';
import Image from 'next/image';
import { useEffect } from 'react';
import { playSound } from '@/lib/audio/lessonSounds';
import { fireConfetti } from '@/lib/confetti';
import type { LevelCompletion } from '@/lib/originals';
import { TEY_POSE_SRC } from '../TeySays';

export function LevelComplete({ level, line }: { level: LevelCompletion; line: string }) {
  const reducedMotion = useReducedMotion();
  const next = level.next;

  useEffect(() => {
    playSound('courseComplete');
    if (!reducedMotion) {
      fireConfetti({ particleCount: 180, spread: 120, startVelocity: 48, origin: { y: 0.35 } });
    }
  }, [reducedMotion]);

  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center py-6">
      <motion.div
        className="relative w-[180px] h-[200px] md:w-[220px] md:h-[244px]"
        initial={reducedMotion ? false : { scale: 0.3, y: 50, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 360, damping: 15 }}
      >
        <Image
          src={TEY_POSE_SRC.cheering}
          alt=""
          aria-hidden="true"
          fill
          priority
          sizes="220px"
          className="object-contain object-bottom"
        />
      </motion.div>

      <motion.p
        className="mt-5 text-[14px] font-extrabold uppercase tracking-[0.1em]"
        style={{ color: 'var(--brand-purple)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {level.trackTitle}
      </motion.p>
      <motion.h1
        className="mt-1 text-[30px] md:text-[36px] font-extrabold leading-tight"
        style={{ color: 'var(--lesson-gold-dark)', fontFamily: 'var(--font-jakarta)' }}
        initial={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.25, type: 'spring', stiffness: 520, damping: 18 }}
      >
        {next ? `${level.levelLabel} complete!` : 'Track complete!'}
      </motion.h1>
      <p className="mt-2 max-w-[420px] text-[16px] md:text-[17px] font-bold text-[var(--text-secondary)] leading-snug">
        {line}
      </p>

      <motion.div
        className="mt-7 w-full max-w-[440px] rounded-[20px] p-4 flex items-center gap-3 text-left text-white"
        style={{
          backgroundColor: next ? 'var(--brand-purple)' : 'var(--lesson-gold)',
          boxShadow: `0 4px 0 color-mix(in srgb, ${next ? 'var(--brand-purple)' : 'var(--lesson-gold)'} 78%, black)`,
        }}
        initial={reducedMotion ? false : { y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.9, type: 'spring', stiffness: 300, damping: 22 }}
      >
        <span className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center shrink-0">
          {next ? (
            <Mountain className="w-6 h-6 stroke-[2.5]" aria-hidden="true" />
          ) : (
            <Trophy className="w-6 h-6 stroke-[2.5]" aria-hidden="true" />
          )}
        </span>
        <span className="flex-1 min-w-0">
          {next ? (
            <>
              <span className="block text-[12px] font-extrabold uppercase tracking-wider opacity-90">
                Unlocked · Level {next.level} · {next.levelLabel}
              </span>
              <span className="block text-[17px] font-extrabold leading-tight truncate">{next.title}</span>
              <span className="block text-[13.5px] font-semibold opacity-90">It&apos;s waiting on your map.</span>
            </>
          ) : (
            <>
              <span className="block text-[12px] font-extrabold uppercase tracking-wider opacity-90">
                Every level finished
              </span>
              <span className="block text-[17px] font-extrabold leading-tight truncate">{level.trackTitle}</span>
            </>
          )}
        </span>
        {next && <ArrowRight className="w-5 h-5 stroke-[2.8] shrink-0" aria-hidden="true" />}
      </motion.div>
    </div>
  );
}

export default LevelComplete;
