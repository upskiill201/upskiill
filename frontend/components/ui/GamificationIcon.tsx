'use client';

import React from 'react';
import Image, { ImageProps } from 'next/image';

export type GamificationIconType = 'streak' | 'xp' | 'lives' | 'burn' | 'gem' | 'heart';

export const GAMIFICATION_ICONS: Record<GamificationIconType, string> = {
  streak: '/Icons/burn.png',
  burn: '/Icons/burn.png',
  xp: '/Icons/gem.png',
  gem: '/Icons/gem.png',
  lives: '/Icons/heart.png',
  heart: '/Icons/heart.png',
};

export const GAMIFICATION_ALT_TEXTS: Record<GamificationIconType, string> = {
  streak: 'Streak',
  burn: 'Streak',
  xp: 'XP',
  gem: 'XP',
  lives: 'Lives',
  heart: 'Lives',
};

/**
 * Returns the canonical public path for a gamification icon asset.
 */
export function getGamificationIconPath(type: GamificationIconType): string {
  return GAMIFICATION_ICONS[type] || GAMIFICATION_ICONS.xp;
}

export interface GamificationIconProps extends Omit<Partial<ImageProps>, 'src' | 'alt'> {
  type: GamificationIconType;
  size?: number;
  alt?: string;
  className?: string;
}

/**
 * Standardized Teyro Gamification Icon Component.
 * Enforces canonical gamification asset paths:
 *  - Streak / Burn: /Icons/burn.png
 *  - XP / Gem:      /Icons/gem.png
 *  - Lives / Heart: /Icons/heart.png
 */
export const GamificationIcon: React.FC<GamificationIconProps> = ({
  type,
  size = 24,
  alt,
  className,
  width,
  height,
  style,
  ...props
}) => {
  const iconPath = getGamificationIconPath(type);
  const iconAlt = alt || GAMIFICATION_ALT_TEXTS[type] || 'Gamification Icon';
  const imgWidth = width || size;
  const imgHeight = height || size;

  return (
    <Image
      src={iconPath}
      alt={iconAlt}
      width={imgWidth}
      height={imgHeight}
      className={className}
      style={{ objectFit: 'contain', ...style }}
      {...props}
    />
  );
};

export default GamificationIcon;
