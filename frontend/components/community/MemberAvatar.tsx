'use client';

/**
 * A community member's avatar: their photo in their equipped frame, with the
 * Skool-style level number pinned to the corner. One component, so a member
 * looks the same on a post, in a comment, the members list and leaderboards.
 */

import React from 'react';
import Avatar from '@/components/ui/Avatar';
import CosmeticFrame from '@/components/cosmetics/CosmeticFrame';
import styles from './MemberAvatar.module.css';

interface Props {
  userId?: string;
  name: string;
  src?: string | null;
  level?: number;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  /** Skip the cosmetic frame (dense lists). */
  plain?: boolean;
}

export default function MemberAvatar({ userId, name, src, level, size = 'md', plain = false }: Props) {
  const avatar = <Avatar src={src ?? undefined} name={name} size={size} />;
  return (
    <span className={`${styles.wrap} ${styles[size]}`}>
      {plain || !userId ? avatar : <CosmeticFrame userId={userId} thickness={3}>{avatar}</CosmeticFrame>}
      {level ? (
        <span className={styles.level} aria-label={`Level ${level}`}>
          {level}
        </span>
      ) : null}
    </span>
  );
}
