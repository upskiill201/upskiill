'use client';

/**
 * The chest at the end of a daily quest, drawn in code so the lid can really
 * open:
 *
 *   locked   grey and still — the quest isn't done yet
 *   ready    full colour, a glow, and a little hop every couple of seconds —
 *            "tap me"
 *   opening  the lid swings up, light bursts out
 *   open     lid up, glow gone — already claimed
 */

import { motion, useReducedMotion } from 'framer-motion';
import styles from './QuestChest.module.css';

export type ChestState = 'locked' | 'ready' | 'opening' | 'open';

export function QuestChest({ state, size = 44 }: { state: ChestState; size?: number }) {
  const reducedMotion = useReducedMotion();
  const lidOpen = state === 'opening' || state === 'open';

  return (
    <motion.span
      className={`${styles.chest} ${state === 'locked' ? styles.locked : ''}`}
      style={{ width: size, height: size }}
      animate={
        state === 'ready' && !reducedMotion
          ? { y: [0, -4, 0, -2, 0], rotate: [0, -4, 4, -2, 0] }
          : state === 'opening' && !reducedMotion
            ? { scale: [1, 1.18, 1] }
            : undefined
      }
      transition={
        state === 'ready'
          ? { duration: 0.8, repeat: Infinity, repeatDelay: 1.6 }
          : { duration: 0.45 }
      }
      aria-hidden="true"
    >
      {(state === 'ready' || state === 'opening') && (
        <motion.span
          className={styles.glow}
          initial={{ opacity: 0 }}
          animate={{ opacity: state === 'opening' ? [0, 1, 0] : [0.35, 0.7, 0.35], scale: state === 'opening' ? [0.6, 1.6, 2] : 1 }}
          transition={state === 'opening' ? { duration: 0.8 } : { duration: 2, repeat: Infinity }}
        />
      )}
      <svg viewBox="0 0 64 56" width={size} height={size * (56 / 64)} style={{ position: 'relative', overflow: 'visible' }}>
        {/* Body */}
        <rect x="6" y="26" width="52" height="28" rx="5" fill="var(--chest-wood)" />
        <rect x="6" y="46" width="52" height="8" rx="4" fill="var(--chest-wood-dark)" />
        <rect x="14" y="26" width="6" height="28" fill="var(--chest-gold)" />
        <rect x="44" y="26" width="6" height="28" fill="var(--chest-gold)" />
        {lidOpen && <rect x="9" y="24" width="46" height="6" rx="2" fill="var(--chest-inside)" />}
        {/* Lid — hinged at the back edge */}
        <motion.g
          style={{ originX: '50%', originY: '100%', transformBox: 'fill-box' }}
          initial={false}
          animate={{ rotateX: 0, y: lidOpen ? -14 : 0, rotate: lidOpen ? -12 : 0 }}
          transition={reducedMotion ? { duration: 0 } : { type: 'spring', stiffness: 380, damping: 14 }}
        >
          <path d="M6 28 C6 12 58 12 58 28 Z" fill="var(--chest-wood)" />
          <path d="M6 28 C6 20 58 20 58 28 Z" fill="var(--chest-wood-dark)" opacity="0.35" />
          <rect x="14" y="13" width="6" height="15" fill="var(--chest-gold)" />
          <rect x="44" y="13" width="6" height="15" fill="var(--chest-gold)" />
          <rect x="4" y="25" width="56" height="5" rx="2.5" fill="var(--chest-gold-dark)" />
        </motion.g>
        {/* Lock */}
        {!lidOpen && (
          <g>
            <rect x="27" y="26" width="10" height="12" rx="3" fill="var(--chest-lock)" />
            <circle cx="32" cy="31" r="1.8" fill="var(--chest-wood-dark)" />
          </g>
        )}
        {/* Light pouring out */}
        {state === 'opening' && !reducedMotion && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0] }} transition={{ duration: 0.9 }}>
            {[-40, -20, 0, 20, 40].map((a) => (
              <rect key={a} x="31" y="-6" width="2.5" height="26" rx="1.25" fill="var(--chest-glow)" transform={`rotate(${a} 32 24)`} />
            ))}
          </motion.g>
        )}
      </svg>
    </motion.span>
  );
}

export default QuestChest;
