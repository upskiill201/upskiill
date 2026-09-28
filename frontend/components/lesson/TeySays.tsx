'use client';

/**
 * Tey beside a speech bubble, inside the lesson — the way a Duolingo
 * character poses the question. The pose changes with what just happened
 * (cheering after a right answer, thinking after a wrong one), and the line
 * pops in fresh each time it changes, so Tey reacts rather than decorates.
 */

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import type { ReactNode } from 'react';
import { TeyBubble } from '@/components/onboarding/TeyBubble';

export type TeyPose =
  | 'pointing'
  | 'thinking'
  | 'cheering'
  | 'waving'
  | 'welcome'
  | 'searching'
  | 'tablet'
  | 'badge'
  | 'podium'
  | 'flame';

export const TEY_POSE_SRC: Record<TeyPose, string> = {
  pointing: '/User onbarding Assets/tey/pointing.webp',
  thinking: '/User onbarding Assets/tey/thinking.webp',
  cheering: '/User onbarding Assets/tey/cheering.webp',
  waving: '/User onbarding Assets/tey/waving.webp',
  welcome: '/User onbarding Assets/tey/welcome.webp',
  searching: '/User onbarding Assets/tey/searching.webp',
  tablet: '/User onbarding Assets/tey/tablet.webp',
  badge: '/User onbarding Assets/tey/badge.webp',
  podium: '/User onbarding Assets/tey/podium.webp',
  flame: '/User onbarding Assets/tey/flame.webp',
};

export function TeySays({
  pose,
  children,
  lineKey,
  size = 'md',
}: {
  pose: TeyPose;
  children: ReactNode;
  /** Changes whenever the line changes, so the bubble pops in again. */
  lineKey: string | number;
  size?: 'sm' | 'md';
}) {
  const reducedMotion = useReducedMotion();
  const box =
    size === 'sm'
      ? 'w-[68px] h-[82px] md:w-[84px] md:h-[100px]'
      : 'w-[88px] h-[106px] md:w-[112px] md:h-[134px]';

  return (
    <div className="flex items-end gap-3">
      <motion.div
        key={pose}
        className={`relative shrink-0 ${box}`}
        initial={reducedMotion ? false : { scale: 0.85, y: 6 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 520, damping: 18 }}
      >
        <Image
          src={TEY_POSE_SRC[pose]}
          alt=""
          aria-hidden="true"
          fill
          priority
          sizes="112px"
          className="object-contain object-bottom"
        />
      </motion.div>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={lineKey}
          className="flex-1 min-w-0 mb-3 ml-1.5"
          initial={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.9, x: -6 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          exit={{ opacity: 0, transition: { duration: 0.08 } }}
          transition={{ type: 'spring', stiffness: 600, damping: 26 }}
          style={{ transformOrigin: 'left center' }}
          aria-live="polite"
        >
          <TeyBubble tail="left">
            <div className="text-[15.5px] md:text-[17px] leading-snug font-bold text-ink">{children}</div>
          </TeyBubble>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default TeySays;
