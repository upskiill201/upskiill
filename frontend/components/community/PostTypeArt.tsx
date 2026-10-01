'use client';

/**
 * A post type's illustrated badge (public/art/posts, from scripts/gen-art.mjs)
 * — the chunky tile on every post, the filter chips and the post page. Types
 * without art (GENERAL, PROGRESS…) fall back to their lucide glyph.
 */

import React from 'react';
import Image from 'next/image';
import { Hash } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export const POST_TYPE_ART = new Set([
  'QUESTION',
  'TIP',
  'WIN',
  'RESOURCE',
  'DISCUSSION',
  'POLL',
  'ANNOUNCEMENT',
  'CHALLENGE',
]);

interface Props {
  postType: string;
  size?: number;
  /** Glyph for types without art. */
  fallback?: LucideIcon;
  className?: string;
}

export default function PostTypeArt({ postType, size = 20, fallback: Fallback = Hash, className }: Props) {
  if (!POST_TYPE_ART.has(postType)) {
    return <Fallback size={Math.round(size * 0.8)} strokeWidth={2.75} aria-hidden="true" className={className} />;
  }
  return <Image src={`/art/posts/${postType}.svg`} alt="" width={size} height={size} className={className} />;
}
