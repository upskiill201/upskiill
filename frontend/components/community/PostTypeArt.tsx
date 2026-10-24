'use client';

/**
 * A post type's illustrated badge (public/art/posts, from scripts/gen-art.mjs)
 * — the chunky tile on every post, the filter chips and the post page. Types
 * without art (GENERAL, PROGRESS…) fall back to their glyph.
 */

import React from 'react';
import Image from 'next/image';
import { Glyph, type GlyphName } from '@/components/art/Glyph';

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
  fallback?: GlyphName;
  className?: string;
}

export default function PostTypeArt({ postType, size = 20, fallback = 'hash', className }: Props) {
  if (!POST_TYPE_ART.has(postType)) {
    return <Glyph name={fallback} size={Math.round(size * 0.8)} strokeWidth={2.75} className={className} />;
  }
  return <Image src={`/art/posts/${postType}.svg`} alt="" width={size} height={size} className={className} />;
}
