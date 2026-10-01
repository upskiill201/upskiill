'use client';

/**
 * Shop item artwork — one renderer used by the shop grid, the Shop Engine
 * scenes and the inventory, so an item looks the same everywhere it appears.
 *
 * Cosmetics render as what they actually are: a frame draws its ring around a
 * real avatar silhouette, a backdrop paints its gradient, an effect shows its
 * key colours. A learner should be able to tell what they are buying from the
 * card alone, without a preview screen.
 */

import React from 'react';
import {
  Coins,
  Gift,
  Heart,
  Package,
  RotateCcw,
  Shield,
  Snowflake,
  Sparkles,
  User,
  Vault,
  Wrench,
  Zap,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { cosmeticArt, rarityStyle } from '@/lib/shop/cosmetics';
import styles from './ShopItemArt.module.css';

/** Power-ups and chests are glyph-based; cosmetics paint their own art. */
const POWER_UP_GLYPHS: Record<string, LucideIcon> = {
  heart: Heart,
  freeze: Snowflake,
  retry: RotateCcw,
  'boost-xp': Zap,
  'boost-xp2': Zap,
  'boost-coin': Coins,
  repair: Wrench,
  shield: Shield,
  vault: Vault,
  'chest-bronze': Package,
  'chest-silver': Package,
  'chest-gold': Gift,
};

/** Items drawn in the Duolingo-style set (public/art/items/<art>.svg). */
const ILLUSTRATED = new Set([
  'heart',
  'freeze',
  'retry',
  'boost-xp',
  'boost-xp2',
  'boost-coin',
  'repair',
  'shield',
  'vault',
  'chest-bronze',
  'chest-silver',
  'chest-gold',
]);

export type ArtSize = 'sm' | 'md' | 'lg' | 'hero';

interface ShopItemArtProps {
  art: string;
  category: string;
  rarity: string;
  size?: ArtSize;
  /** Locked items render desaturated with a lock pin over them. */
  locked?: boolean;
  className?: string;
}

export default function ShopItemArt({
  art,
  category,
  rarity,
  size = 'md',
  locked = false,
  className = '',
}: ShopItemArtProps) {
  const visual = cosmeticArt(art);
  const rarityTone = rarityStyle(rarity);
  const Glyph = POWER_UP_GLYPHS[art];

  const wrapperClass = [
    styles.wrap,
    styles[size],
    locked ? styles.locked : '',
    visual.motion && visual.motion !== 'none' ? styles[`motion_${visual.motion}`] : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // ── Frames: draw the actual ring around an avatar silhouette ──────────────
  if (category === 'FRAME') {
    return (
      <div className={wrapperClass} aria-hidden>
        <div className={styles.frameRing} style={{ background: visual.gradient }}>
          {visual.innerGradient && (
            <span className={styles.frameSheen} style={{ background: visual.innerGradient }} />
          )}
          <div className={styles.frameInner}>
            <User className={styles.frameAvatar} strokeWidth={1.6} />
          </div>
        </div>
      </div>
    );
  }

  // ── Backdrops: paint the gradient, with a card silhouette for scale ───────
  if (category === 'BACKGROUND') {
    return (
      <div className={wrapperClass} aria-hidden>
        <div className={styles.backdrop} style={{ background: visual.gradient }}>
          <div className={styles.backdropCard}>
            <span className={styles.backdropAvatar} />
            <span className={styles.backdropLine} />
            <span className={`${styles.backdropLine} ${styles.backdropLineShort}`} />
          </div>
        </div>
      </div>
    );
  }

  // ── Effects: an orb in the effect's colours, with drifting sparks ─────────
  if (category === 'CELEBRATION_FX' || category === 'XP_FX') {
    return (
      <div className={wrapperClass} aria-hidden>
        <div className={styles.fxOrb} style={{ background: visual.gradient }}>
          <Sparkles className={styles.fxGlyph} strokeWidth={2} />
          <span className={styles.fxSpark} style={{ background: rarityTone.color }} />
          <span
            className={`${styles.fxSpark} ${styles.fxSparkTwo}`}
            style={{ background: rarityTone.color }}
          />
        </div>
      </div>
    );
  }

  // ── Power-ups and chests: the illustrated art (public/art/items, made by
  // scripts/gen-art.mjs), standing free like Duolingo's shop icons ─────────
  if (ILLUSTRATED.has(art)) {
    return (
      <div className={wrapperClass} aria-hidden>
        {/* eslint-disable-next-line @next/next/no-img-element -- static SVG art, no optimisation needed */}
        <img src={`/art/items/${art}.svg`} alt="" className={styles.illustration} draggable={false} />
      </div>
    );
  }

  // ── Anything without art yet: a gradient tile behind a lucide glyph ──────
  return (
    <div className={wrapperClass} aria-hidden>
      <div className={styles.tile} style={{ background: visual.gradient }}>
        {Glyph ? <Glyph className={styles.tileGlyph} strokeWidth={2.2} /> : null}
      </div>
    </div>
  );
}
