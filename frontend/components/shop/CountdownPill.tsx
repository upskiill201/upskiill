'use client';

/**
 * Countdown to the next rotation. The urgency is the product: "back tomorrow"
 * is a note, "5h 12m" is a reason to decide now.
 *
 * Counts down from a server-supplied duration rather than an absolute
 * timestamp, so a device with a wrong clock still shows the right remaining
 * time.
 */

import React, { useEffect, useRef, useState } from 'react';
import { Clock } from 'lucide-react';
import styles from './CountdownPill.module.css';

function format(ms: number): string {
  if (ms <= 0) return 'Refreshing…';
  const totalMinutes = Math.floor(ms / 60_000);
  const days = Math.floor(totalMinutes / 1440);
  const hours = Math.floor((totalMinutes % 1440) / 60);
  const minutes = totalMinutes % 60;
  if (days > 0) return `${days}d ${hours}h`;
  if (hours > 0) return `${hours}h ${minutes}m`;
  const seconds = Math.floor((ms % 60_000) / 1000);
  return `${minutes}m ${seconds}s`;
}

export default function CountdownPill({
  ms,
  label = 'Resets in',
}: {
  ms: number;
  label?: string;
}) {
  const [remaining, setRemaining] = useState(ms);
  const deadlineRef = useRef(Date.now() + ms);

  useEffect(() => {
    deadlineRef.current = Date.now() + ms;
    setRemaining(ms);
  }, [ms]);

  useEffect(() => {
    const tick = () => setRemaining(Math.max(0, deadlineRef.current - Date.now()));
    // One second is only needed in the final hour; a slower tick the rest of
    // the time keeps this off the render path.
    const interval = setInterval(tick, remaining < 3_600_000 ? 1000 : 30_000);
    return () => clearInterval(interval);
  }, [remaining]);

  return (
    <span className={styles.pill}>
      <Clock size={13} strokeWidth={2.6} />
      {label} <strong>{format(remaining)}</strong>
    </span>
  );
}
