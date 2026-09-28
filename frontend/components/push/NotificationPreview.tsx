'use client';

/**
 * A lock-screen notification from Teyro, drawn — what a reminder will look
 * like, so the learner knows exactly what they're turning on (Duolingo shows
 * one on its permission screen too). It drops in and settles; decorative, the
 * copy around it says the same thing in words.
 */

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import styles from './NotificationPreview.module.css';

export function NotificationPreview({
  title,
  body,
  delay = 0.3,
}: {
  title: string;
  body: string;
  delay?: number;
}) {
  const reduce = useReducedMotion() ?? false;
  return (
    <motion.div
      className={styles.card}
      aria-hidden="true"
      initial={reduce ? false : { y: -36, opacity: 0, scale: 0.94 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 380, damping: 20, delay }}
    >
      <Image src="/Icons/icon-192.png" alt="" width={40} height={40} className={styles.icon} />
      <span className={styles.text}>
        <span className={styles.head}>
          <span className={styles.app}>Teyro</span>
          <span className={styles.time}>now</span>
        </span>
        <span className={styles.title}>{title}</span>
        <span className={styles.body}>{body}</span>
      </span>
    </motion.div>
  );
}

export default NotificationPreview;
