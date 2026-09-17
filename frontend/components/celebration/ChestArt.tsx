'use client';

/**
 * ChestArt — the treasure chest visual for ChestScene.
 *
 * Thin adapter only: all Rive logic lives in the universal
 * `components/gamification/TreasureChest.tsx`, which every chest-worthy
 * reward across Teyro renders (not just this scene). Keeping this file as a
 * pass-through preserves ChestScene's existing import and prop naming.
 */

import React, { forwardRef } from 'react';
import TreasureChest, {
  TreasureChestHandle,
  TreasureChestProps,
} from '../gamification/TreasureChest';
import styles from './Scene.module.css';

export type { TreasureChestHandle as ChestArtHandle };

interface ChestArtProps extends Omit<TreasureChestProps, 'className' | 'style'> {
  className?: string;
  style?: React.CSSProperties;
}

const ChestArt = forwardRef<TreasureChestHandle, ChestArtProps>(function ChestArt(
  { className, style, ...treasureChestProps },
  ref
) {
  return (
    <TreasureChest
      ref={ref}
      {...treasureChestProps}
      className={[styles.chestArtWrap, className].filter(Boolean).join(' ') || undefined}
      style={style}
    />
  );
});

export default ChestArt;
