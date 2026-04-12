'use client';

import { motion, useInView, useSpring } from 'framer-motion';
import { useEffect, useRef } from 'react';
import styles from './WaitlistCounter.module.css';

interface WaitlistCounterProps {
  initialCount?: number;
  label?: string;
}

export default function WaitlistCounter({ 
  initialCount = 23543, 
  label = "others on the waitlist" 
}: WaitlistCounterProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const spring = useSpring(0, { mass: 1, stiffness: 50, damping: 20 });

  useEffect(() => {
    if (isInView) {
      spring.set(initialCount);
    }
  }, [isInView, initialCount, spring]);

  return (
    <div className={styles.container} ref={ref}>
      <span className={styles.count}>
        Join <motion.span className={styles.number}>23,543</motion.span> {label}
      </span>
    </div>
  );
}