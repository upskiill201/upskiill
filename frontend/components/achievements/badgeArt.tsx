'use client';

/**
 * Shared achievement artwork — the single source of truth for how each badge
 * renders across the app (celebration scene, profile collection grid, detail
 * modal). Every badge gets a lucide glyph that reads as a medal/trophy mark;
 * no emojis, no per-component one-off icon switches.
 */

import { Brain, Compass, Flame, Medal, Star, Target, Trophy } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type BadgeId =
  | 'novice'
  | 'wildfire'
  | 'sage'
  | 'champion'
  | 'sharpshooter'
  | 'explorer'
  | 'marathon';

/** Glyph that best represents what each badge celebrates. */
const BADGE_GLYPHS: Record<BadgeId, LucideIcon> = {
  novice: Star, // the first badge — onboarding milestone
  wildfire: Flame, // streak
  sage: Brain, // XP / wisdom
  champion: Trophy, // lessons conquered
  sharpshooter: Target, // accuracy
  explorer: Compass, // courses discovered
  marathon: Medal, // consistency over time
};

/** Unit used in progress captions like "5 / 7 days". */
export const BADGE_UNITS: Record<BadgeId, string> = {
  novice: 'milestone',
  wildfire: 'days',
  sage: 'XP',
  champion: 'lessons',
  sharpshooter: 'first-try answers',
  explorer: 'courses',
  marathon: 'days',
};

interface BadgeGlyphProps {
  badgeId: string;
  /** Rendered glyph size in px. */
  size?: number;
  color?: string;
  strokeWidth?: number;
}

export function BadgeGlyph({ badgeId, size = 24, color = '#FFFFFF', strokeWidth = 2.4 }: BadgeGlyphProps) {
  const Glyph = BADGE_GLYPHS[badgeId as BadgeId] ?? Medal;
  return <Glyph size={size} color={color} strokeWidth={strokeWidth} />;
}
