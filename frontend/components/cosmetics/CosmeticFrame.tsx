'use client';

/**
 * The equipped profile frame, drawn around whatever it wraps.
 *
 * A cosmetic nobody can see is not a cosmetic. This is the component that
 * makes a purchased frame show up on the learner's own avatar — and it takes
 * an optional `userId`, so the same ring can be rendered on other people's
 * avatars (community rows, leaderboards) without any of those surfaces
 * needing to know the shop exists.
 *
 * Renders children untouched when nothing is equipped, so it is safe to wrap
 * any avatar unconditionally.
 */

import React, { type ReactNode } from 'react';
import { cosmeticArt } from '@/lib/shop/cosmetics';
import { useLoadout } from '@/lib/shop/useLoadout';
import styles from './CosmeticFrame.module.css';

interface CosmeticFrameProps {
  children: ReactNode;
  /** Whose loadout to render. Defaults to the signed-in learner. */
  userId?: string;
  /** Ring thickness in pixels. */
  thickness?: number;
  className?: string;
}

export default function CosmeticFrame({
  children,
  userId,
  thickness = 4,
  className = '',
}: CosmeticFrameProps) {
  const { art, loading } = useLoadout(userId);
  const frameToken = art?.FRAME ?? null;

  // No frame equipped (or still loading) — render the avatar exactly as it
  // would have been, with no layout shift when the loadout lands.
  if (loading || !frameToken) {
    return <>{children}</>;
  }

  const visual = cosmeticArt(frameToken);

  return (
    <span
      className={[
        styles.frame,
        visual.motion && visual.motion !== 'none' ? styles[`motion_${visual.motion}`] : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={
        {
          background: visual.gradient,
          padding: `${thickness}px`,
        } as React.CSSProperties
      }
    >
      <span className={styles.inner}>{children}</span>
    </span>
  );
}
