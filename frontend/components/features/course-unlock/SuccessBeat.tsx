'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import confetti from 'canvas-confetti';
import { playWinSound } from '@/utils/audio';
import { playHaptic } from '@/lib/haptics';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';
import styles from './unlock.module.css';

interface SuccessBeatProps {
  /** Sanitized destination after the beat (always same-origin /learn/…). */
  returnTo: string;
  /** Beat length in ms before redirecting. */
  durationMs?: number;
}

const CONFETTI_COLORS = ['#22C55E', '#3D5AFE', '#FFC800', '#F59E0B'];

/**
 * The ONLY place the unlock flow celebrates: win sound + brand confetti +
 * verified-state mascot, then redirect back to where the learner started.
 * Single-shot guarded (StrictMode double-effect safe); reduced-motion gets
 * a shorter static beat with no confetti and no sound spike.
 */
export default function SuccessBeat({ returnTo, durationMs }: SuccessBeatProps) {
  const router = useRouter();
  const reducedMotion = usePrefersReducedMotion();
  const firedRef = useRef(false);

  useEffect(() => {
    if (!firedRef.current) {
      firedRef.current = true;
      playWinSound();
      playHaptic('success');
      if (!reducedMotion) {
        confetti({
          particleCount: 120,
          spread: 85,
          origin: { y: 0.5 },
          colors: CONFETTI_COLORS,
        });
      }
    }
    // Always (re)schedule the redirect so StrictMode's cleanup+rerun can't
    // cancel the only pending timer.
    const timer = setTimeout(
      () => router.replace(returnTo),
      durationMs ?? (reducedMotion ? 600 : 1800),
    );
    return () => clearTimeout(timer);
  }, [reducedMotion, router, returnTo, durationMs]);

  return (
    <div className={styles.successOverlay} role="status">
      <Image
        src="/User onbarding Assets/Step_7_tey_verified_state.webp"
        alt=""
        /* Asset is 670x1176 — attrs must keep that ratio or the robot squashes. */
        width={140}
        height={246}
        className={styles.successMascot}
        priority
      />
      <h1 className={styles.successHeadline}>Course unlocked!</h1>
      <p className={styles.successSub}>Taking you back…</p>
    </div>
  );
}
