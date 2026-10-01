'use client';

/**
 * "You earned the September badge!" — the month's biggest moment, full
 * screen and bright: the badge drops in and spins to a stop, confetti in the
 * month's colour, the fanfare, the reward. One tap to carry on.
 */

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { playSound } from '@/lib/audio/lessonSounds';
import { holdAttention } from '@/lib/lesson/lessonFocus';
import { fireConfetti } from '@/lib/confetti';
import { monthBadge, monthName } from '@/lib/quests/monthBadges';
import { MonthBadge } from './MonthBadge';
import tokens from './MonthTokens.module.css';

export function BadgeEarned({
  open,
  monthKey,
  goalDays,
  reward,
  onClose,
}: {
  open: boolean;
  monthKey: string;
  goalDays: number;
  reward: { type: 'COINS' | 'FREEZE'; amount: number } | null;
  onClose: () => void;
}) {
  const reducedMotion = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const b = monthBadge(monthKey);

  // Owns the screen while open: notices and queued celebrations wait.
  useEffect(() => {
    if (!open) return;
    return holdAttention();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    playSound('monthBadge');
    if (reducedMotion) return;
    const t = setTimeout(() => {
      fireConfetti({ particleCount: 160, spread: 120, startVelocity: 48, origin: { y: 0.35 } });
      fireConfetti({ particleCount: 60, angle: 60, spread: 60, origin: { x: 0, y: 0.7 } });
      fireConfetti({ particleCount: 60, angle: 120, spread: 60, origin: { x: 1, y: 0.7 } });
    }, 350);
    return () => clearTimeout(t);
  }, [open, reducedMotion]);

  if (typeof document === 'undefined') return null;
  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          ref={rootRef}
          role="dialog"
          aria-modal="true"
          aria-label={`${monthName(monthKey)} badge earned`}
          className={`${tokens.monthTokens} fixed inset-0 z-[95000] flex flex-col bg-white`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
            <motion.div
              initial={reducedMotion ? false : { scale: 0.2, y: -160, rotate: -200, opacity: 0 }}
              animate={{ scale: 1, y: 0, rotate: 0, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 170, damping: 14 }}
            >
              <MonthBadge monthKey={monthKey} state="earned" size={180} />
            </motion.div>
            <motion.p
              className="mt-6 text-[14px] font-extrabold uppercase tracking-[0.12em]"
              style={{ color: b.color }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {monthName(monthKey)} Challenge
            </motion.p>
            <motion.h1
              className="mt-1 text-[30px] md:text-[38px] font-extrabold text-ink leading-tight"
              style={{ fontFamily: 'var(--font-jakarta)' }}
              initial={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.55, type: 'spring', stiffness: 480, damping: 18 }}
            >
              You earned the {b.name} badge!
            </motion.h1>
            <p className="mt-2 text-[16px] font-bold text-[var(--text-secondary)]">
              {`${goalDays} goal days this month. It's yours to keep.`}
            </p>
            {reward && (
              <motion.span
                className="mt-5 inline-flex items-center gap-2 rounded-full px-4 py-2 text-[16px] font-extrabold"
                style={{ backgroundColor: 'color-mix(in srgb, var(--warning) 16%, white)', color: 'var(--warning)' }}
                initial={reducedMotion ? false : { scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.9, type: 'spring', stiffness: 520, damping: 14 }}
              >
                <Image src={reward.type === 'FREEZE' ? '/Icons/snowflake.svg' : '/Icons/Coin.png'} alt="" width={20} height={20} unoptimized />
                +{reward.amount} {reward.type === 'FREEZE' ? 'Streak Freeze' : 'Coins'}
              </motion.span>
            )}
          </div>
          <div className="shrink-0 border-t-2 border-[var(--border)] px-4 md:px-8 pt-4 pb-[calc(env(safe-area-inset-bottom)+16px)] md:py-8">
            <button
              type="button"
              autoFocus
              onClick={() => {
                playSound('next');
                onClose();
              }}
              className="mx-auto block w-full md:w-auto md:min-w-[200px] h-[52px] rounded-[16px] text-white text-[16px] font-extrabold uppercase tracking-[0.06em] cursor-pointer"
              style={{ backgroundColor: 'var(--success-green)', boxShadow: '0 4px 0 color-mix(in srgb, var(--success-green) 72%, black)', fontFamily: 'var(--font-jakarta)' }}
            >
              Continue
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

export default BadgeEarned;
