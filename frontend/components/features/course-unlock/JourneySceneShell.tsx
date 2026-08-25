'use client';

import { AnimatePresence, motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';
import styles from './unlock.module.css';

/**
 * Host for the unlock journey's stepped scenes.
 *
 * Slides scenes horizontally with the exact onboarding template physics
 * (spring stiffness 320 / damping 32 / mass 0.9): forward enters from the
 * right, backward from the left. Reduced-motion collapses to a plain swap.
 */
interface JourneySceneShellProps {
  /** Stable key for the active scene — changing it triggers the slide. */
  sceneKey: string;
  /** 1 = forward navigation, -1 = backward navigation. */
  direction: number;
  children: ReactNode;
}

const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (dir: number) => ({
    x: dir > 0 ? '-100%' : '100%',
    opacity: 0,
  }),
};

export default function JourneySceneShell({
  sceneKey,
  direction,
  children,
}: JourneySceneShellProps) {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <div className={styles.sceneViewport}>
      {reducedMotion ? (
        // No slide choreography — swap instantly, keep layout identical.
        <div key={sceneKey} className={styles.slidePane}>
          {children}
        </div>
      ) : (
        <AnimatePresence mode="popLayout" custom={direction}>
          <motion.div
            key={sceneKey}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 320, damping: 32, mass: 0.9 },
              opacity: { duration: 0.15, ease: 'easeOut' },
            }}
            className={styles.slidePane}
            style={{ willChange: 'transform' }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}
