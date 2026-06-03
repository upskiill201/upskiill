'use client';

import { motion, useInView, useSpring, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import styles from './WaitlistCounter.module.css';

interface WaitlistCounterProps {
  label?: string;
}

export default function WaitlistCounter({ 
  label = "others on the waitlist" 
}: WaitlistCounterProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState<number>(3400);

  useEffect(() => {
    fetch('/webhook/count')
      .then((r) => r.json())
      .then((d) => setCount(d.count ?? 3400))
      .catch(() => setCount(3400));
  }, []);

  const spring = useSpring(0, { mass: 1, stiffness: 50, damping: 20 });
  const display = useTransform(spring, (current) => Math.round(current).toLocaleString());

  useEffect(() => {
    if (isInView && count > 0) {
      spring.set(count);
    }
  }, [isInView, count, spring]);

  return (
    <div className={styles.container} ref={ref}>
      <span className={styles.count}>
        Join <motion.span className={styles.number}>{display}</motion.span> {label}
      </span>
    </div>
  );
}
