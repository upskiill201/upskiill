'use client';

/**
 * TeyCharacter — Tey's on-screen presence during onboarding.
 *
 * ── On Rive ──────────────────────────────────────────────────────────────────
 * There is NO Tey Rive asset in this repo. The only .riv file is
 * `public/Rive/treasure_chest.riv`. Tey's onboarding poses are therefore
 * static art, one image per pose.
 *
 * The `pose` prop is the seam for when a Tey .riv does land: swap POSE_ART for
 * a state-machine input map and this component's callers need no changes,
 * exactly as `CelebrationMascot.tsx` reserves a slot for designer pose art.
 *
 * An unmapped pose falls back to `idle` rather than rendering nothing —
 * adding a pose to the dialogue engine must never be able to blank the
 * mascot mid-onboarding.
 *
 * ── Why the art is cropped ────────────────────────────────────────────────────
 * Everything here points at `tey/`, the tight-cropped copies. The originals
 * carry up to 70% empty canvas, so `object-contain` shrank Tey to a fraction
 * of whatever box he was given. Cropped, the box size is Tey's size.
 */

import { motion, useAnimationControls, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import type { TeyPose } from '@/lib/onboarding/types';

const TEY = '/User onbarding Assets/tey';

/**
 * Pose → art. Several poses deliberately share a source image: we have more
 * emotional states than we have drawings, and reusing a close match reads
 * better than showing a neutral Tey for everything.
 */
const POSE_ART: Record<TeyPose, string> = {
  idle: `${TEY}/welcome.webp`,
  greeting: `${TEY}/welcome.webp`,
  curious: `${TEY}/pointing.webp`,
  thinking: `${TEY}/thinking.webp`,
  excited: `${TEY}/cheering.webp`,
  encouraging: `${TEY}/flame.webp`,
  celebrating: `${TEY}/cheering.webp`,
  supportive: `${TEY}/tablet.webp`,
  mischievous: `${TEY}/searching.webp`,
};

export interface TeyCharacterProps {
  pose: TeyPose;
  /** Explicit art wins over the pose map — for steps with bespoke framing. */
  src?: string;
  /**
   * Changes whenever Tey reacts to a tap. Each change plays a small hop, so a
   * reaction lands physically as well as in words.
   */
  reactKey?: string | number | null;
  className?: string;
  sizes?: string;
  priority?: boolean;
}

export function TeyCharacter({
  pose,
  src,
  reactKey = null,
  className = '',
  sizes = '(max-width: 768px) 40vw, 320px',
  priority = false,
}: TeyCharacterProps) {
  const reducedMotion = useReducedMotion();
  const art = src ?? POSE_ART[pose] ?? POSE_ART.idle;
  const hop = useAnimationControls();
  const firstRender = useRef(true);

  useEffect(() => {
    // Not on mount — only when a reaction actually arrives.
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (reactKey == null || reducedMotion) return;
    void hop.start({
      y: [0, -14, 0, -4, 0],
      rotate: [0, -4, 3, -1, 0],
      transition: { duration: 0.55, ease: 'easeOut' },
    });
  }, [reactKey, reducedMotion, hop]);

  return (
    <motion.div
      // Re-keying on the source (not the pose) means poses that share art
      // don't trigger a pointless re-animation.
      key={art}
      initial={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.9, y: 10 }}
      animate={reducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
      transition={
        reducedMotion
          ? { duration: 0.15 }
          : { type: 'spring', stiffness: 340, damping: 22, mass: 0.8 }
      }
      className={`relative ${className}`}
    >
      <motion.div animate={hop} className="absolute inset-0" style={{ transformOrigin: '50% 100%' }}>
        <Image
          src={art}
          // Tey is decorative: the dialogue beside him carries the meaning and
          // is already announced via aria-live. Naming him here would make a
          // screen reader read a mascot before the actual question.
          alt=""
          aria-hidden="true"
          fill
          sizes={sizes}
          className="object-contain object-bottom drop-shadow-[0_14px_22px_rgba(7,18,51,0.14)]"
          priority={priority}
        />
      </motion.div>
    </motion.div>
  );
}

export default TeyCharacter;
