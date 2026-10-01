'use client';

/**
 * "Your studio is ready!" — the finish. Confetti, the studio fanfare and a
 * big haptic, then three ticks summing up what's set: account, profile, plan.
 * The CTAs live in the shell's footer (create the first course, or go to the
 * studio).
 */

import { useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Check } from 'lucide-react';
import { ConfettiBurst } from '@/components/onboarding/ConfettiBurst';
import { celebrationHaptic } from '@/lib/haptics';
import { playSound } from '@/lib/audio/lessonSounds';
import styles from '../CreatorOnboarding.module.css';

export function CreatorReadyScreen({ items }: { items: string[] }) {
  const reduce = useReducedMotion() ?? false;

  useEffect(() => {
    playSound('studioReady');
    celebrationHaptic('big');
    if (reduce) return;
    const timers = items.map((_, i) => window.setTimeout(() => playSound('statTick', i), 1100 + i * 180));
    return () => timers.forEach(window.clearTimeout);
    // The fanfare plays once, on arrival.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <ConfettiBurst active />
      <ul className={styles.readyList}>
        {items.map((item, i) => (
          <motion.li
            key={item}
            initial={reduce ? false : { opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 460, damping: 18, delay: 1.1 + i * 0.18 }}
          >
            <span aria-hidden="true">
              <Check size={14} strokeWidth={4} />
            </span>
            {item}
          </motion.li>
        ))}
      </ul>
    </>
  );
}

export default CreatorReadyScreen;
