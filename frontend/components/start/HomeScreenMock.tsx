'use client';

/**
 * A phone's Home Screen with Teyro landing on it — the picture that explains
 * "install" without the word. A grid of blank app tiles; the Teyro icon drops
 * into its slot with a bounce, a sparkle ring and its name underneath.
 *
 * `landed` skips the drop (the icon is already there, e.g. after install).
 * Decorative: the copy around it always says the same thing in words.
 */

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import styles from './Start.module.css';

const SLOTS = 12;
const TEYRO_SLOT = 5;

export function HomeScreenMock({ landed = false, compact = false }: { landed?: boolean; compact?: boolean }) {
  const reduce = useReducedMotion() ?? false;
  const still = reduce || landed;

  return (
    <div className={`${styles.phone} ${compact ? styles.phoneCompact : ''}`} aria-hidden="true">
      <span className={styles.phoneNotch} />
      <div className={styles.appGrid}>
        {Array.from({ length: SLOTS }).map((_, i) =>
          i === TEYRO_SLOT ? (
            <span key={i} className={styles.appSlot}>
              <motion.span
                className={styles.teyroApp}
                initial={still ? false : { y: -140, scale: 0.6, opacity: 0 }}
                animate={{ y: 0, scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 13, delay: 0.5 }}
              >
                <Image src="/Icons/icon-192.png" alt="" width={96} height={96} priority />
                {!reduce && (
                  <motion.span
                    className={styles.ring}
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: [0.6, 1.6], opacity: [0.9, 0] }}
                    transition={{ duration: 0.9, delay: still ? 0.2 : 1.05, repeat: Infinity, repeatDelay: 1.6 }}
                  />
                )}
              </motion.span>
              <motion.span
                className={styles.appName}
                initial={still ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                Teyro
              </motion.span>
            </span>
          ) : (
            <span key={i} className={styles.appSlot}>
              <span className={styles.blankApp} style={{ opacity: 0.55 + ((i * 7) % 5) * 0.09 }} />
              <span className={styles.blankName} />
            </span>
          ),
        )}
      </div>
      <span className={styles.dock}>
        <span className={styles.blankApp} />
        <span className={styles.blankApp} />
        <span className={styles.blankApp} />
        <span className={styles.blankApp} />
      </span>
    </div>
  );
}

export default HomeScreenMock;
