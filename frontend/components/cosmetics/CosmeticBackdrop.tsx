'use client';

/**
 * The equipped profile backdrop, painted behind whatever it wraps.
 *
 * Renders children on a plain background when nothing is equipped, so it is
 * safe to wrap a section unconditionally — no layout shift when the loadout
 * lands, and no empty band for learners who own no backdrop.
 *
 * Content sits on a scrim above the gradient rather than directly on it:
 * several backdrops are dark (Deep Space, Cosmic Tey) and the profile text
 * underneath is dark too, so painting the raw gradient behind live text would
 * make it unreadable the moment someone equipped one.
 */

import React, { type ReactNode } from 'react';
import { cosmeticArt } from '@/lib/shop/cosmetics';
import { useLoadout } from '@/lib/shop/useLoadout';
import styles from './CosmeticBackdrop.module.css';

interface CosmeticBackdropProps {
  children: ReactNode;
  userId?: string;
  className?: string;
}

export default function CosmeticBackdrop({
  children,
  userId,
  className = '',
}: CosmeticBackdropProps) {
  const { art, loading } = useLoadout(userId);
  const token = art?.BACKGROUND ?? null;

  if (loading || !token) {
    return <>{children}</>;
  }

  const visual = cosmeticArt(token);

  return (
    <div
      className={[
        styles.backdrop,
        visual.motion && visual.motion !== 'none' ? styles[`motion_${visual.motion}`] : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <span className={styles.paint} style={{ background: visual.gradient }} aria-hidden />
      <span className={styles.scrim} aria-hidden />
      <div className={styles.content}>{children}</div>
    </div>
  );
}
