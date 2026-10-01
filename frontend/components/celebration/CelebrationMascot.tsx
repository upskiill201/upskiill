'use client';

/**
 * CelebrationMascot — Tey, the celebration scene host.
 *
 * v1 animates the existing `/dashboard tey.webp` art programmatically
 * (hop, tilt, squash & stretch). The MASCOT_POSES map is the drop-in slot
 * for future designer/Rive pose art: add `{ src: '/path.png' }` per pose
 * and the scenes pick it up with zero code changes.
 */

import React, { useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { playSound } from '@/lib/audio/lessonSounds';
import styles from './Scene.module.css';

export type MascotPose = 'idle' | 'cheer' | 'grab' | 'hold' | 'toss' | 'hug' | 'sad';

const MASCOT_POSES: Partial<Record<MascotPose, { src: string }>> = {
  // A lost streak must not show Tey cheering — reuse the sad Tey from
  // onboarding (the same art WelcomeBackScene uses).
  sad: { src: '/User onbarding Assets/Step_7_tey_skiped_state.webp' },
  // Future pose art slots, e.g. grab: { src: '/Tey Poses/Tey_grab.png' }
};

const DEFAULT_SRC = '/dashboard tey.webp';

const POSE_ANIMATIONS: Record<
  MascotPose,
  { animate: Record<string, number | number[]>; transition: Record<string, unknown> }
> = {
  idle: {
    animate: { y: [0, -7, 0], scale: [1, 1.015, 1] },
    transition: { repeat: Infinity, duration: 2.6, ease: 'easeInOut' },
  },
  cheer: {
    animate: { y: [0, -16, 0, -9, 0], rotate: [0, -4, 3, -2, 0], scale: [1, 1.06, 1, 1.03, 1] },
    transition: { duration: 0.9, ease: 'easeOut' },
  },
  grab: {
    animate: { y: [0, -34, -26], scale: [1, 1.14, 1.1], rotate: [0, -6, 0] },
    transition: { duration: 0.42, ease: 'backOut' },
  },
  hold: {
    animate: { y: [-26, -30, -26], scale: 1.08, rotate: [-2, 2, -2] },
    transition: { repeat: Infinity, duration: 1.6, ease: 'easeInOut' },
  },
  toss: {
    animate: { y: [-26, -8, -18], rotate: [0, 10, 4], scale: [1.08, 0.98, 1.02] },
    transition: { duration: 0.38, ease: 'easeIn' },
  },
  hug: {
    animate: { x: [0, 8, 0], rotate: [0, -8, -6], scale: [1, 1.04, 1.02] },
    transition: { duration: 0.55, ease: 'easeOut' },
  },
  sad: {
    animate: { y: [0, 8, 6], rotate: [0, 4, 3], scale: [1, 0.96, 0.97] },
    transition: { duration: 0.9, ease: 'easeInOut' },
  },
};

interface CelebrationMascotProps {
  pose?: MascotPose;
  size?: number;
  className?: string;
  /** Entrance animation on mount */
  entrance?: 'none' | 'puff' | 'drop';
}

export default function CelebrationMascot({
  pose = 'idle',
  size,
  className,
  entrance = 'puff',
}: CelebrationMascotProps) {
  const reducedMotion = useReducedMotion();
  const poseArt = MASCOT_POSES[pose];
  const src = poseArt?.src ?? DEFAULT_SRC;
  const poseAnim = POSE_ANIMATIONS[pose] ?? POSE_ANIMATIONS.idle;

  useEffect(() => {
    if (pose === 'grab' || pose === 'toss' || pose === 'cheer') {
      if (!reducedMotion) playSound('teyPop');
    }
  }, [pose, reducedMotion]);

  const entranceProps =
    entrance === 'none' || reducedMotion
      ? false
      : { scale: 0.4, opacity: 0, y: entrance === 'drop' ? -140 : 0 };

  return (
    <motion.div
      className={className ? `${styles.mascotWrap} ${className}` : styles.mascotWrap}
      style={size ? { width: size, height: size } : undefined}
      initial={entranceProps}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 320, damping: 22 }}
    >
      {/* Puff cloud behind the mascot entrance (Duolingo smoke-puff) */}
      {entrance === 'puff' && !reducedMotion && (
        <motion.div
          aria-hidden
          initial={{ scale: 0.2, opacity: 0.9 }}
          animate={{ scale: 1.9, opacity: 0 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          style={{
            position: 'absolute',
            inset: '12%',
            borderRadius: '50%',
            // A soft brand-tinted puff: on the white stage a white one vanished.
            background: 'radial-gradient(circle, color-mix(in srgb, var(--color-brand) 16%, transparent) 0%, transparent 68%)',
            pointerEvents: 'none',
          }}
        />
      )}
      <motion.img
        src={src}
        alt="Tey"
        className={styles.mascotImg}
        animate={poseAnim.animate}
        transition={poseAnim.transition as never}
        draggable={false}
      />
    </motion.div>
  );
}
