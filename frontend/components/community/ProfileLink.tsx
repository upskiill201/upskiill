'use client';

/**
 * Wraps a member's avatar or name so a tap opens their profile
 * (/dashboard/u/:id) — from a post, a comment, the members list or a
 * leaderboard. Stops the tap reaching a clickable card underneath.
 */

import React from 'react';
import Link from 'next/link';
import { playSound } from '@/lib/audio/lessonSounds';
import styles from './ProfileLink.module.css';

interface Props {
  userId?: string | null;
  children: React.ReactNode;
  className?: string;
  label?: string;
}

export default function ProfileLink({ userId, children, className, label }: Props) {
  if (!userId) return <>{children}</>;
  return (
    <Link
      href={`/dashboard/u/${encodeURIComponent(userId)}`}
      className={`${styles.link} ${className ?? ''}`}
      aria-label={label}
      onClick={(e) => {
        e.stopPropagation();
        playSound('navTap', 4);
      }}
      onKeyDown={(e) => e.stopPropagation()}
    >
      {children}
    </Link>
  );
}
