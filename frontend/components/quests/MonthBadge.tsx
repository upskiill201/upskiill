'use client';

/**
 * A month's challenge badge (lib/quests/monthBadges.ts): a hexagonal medal in
 * the month's colour with its symbol, and a ribbon naming the month.
 *
 *   earned   full colour with a shine
 *   progress greyed, with a ring filling in the month's colour
 *   missed   greyed, no ring (a past month that wasn't completed)
 */

import {
  BookOpen,
  CloudSun,
  Flame,
  Flower2,
  Heart,
  Leaf,
  Mountain,
  Sparkles,
  Sprout,
  Sun,
  Trophy,
  Waves,
  type LucideIcon,
} from 'lucide-react';
import { monthBadge, type MonthGlyph } from '@/lib/quests/monthBadges';
import styles from './MonthBadge.module.css';
import tokens from './MonthTokens.module.css';

const GLYPH: Record<MonthGlyph, LucideIcon> = {
  sparkles: Sparkles,
  heart: Heart,
  sprout: Sprout,
  cloudSun: CloudSun,
  flower: Flower2,
  sun: Sun,
  flame: Flame,
  waves: Waves,
  book: BookOpen,
  leaf: Leaf,
  mountain: Mountain,
  trophy: Trophy,
};

const HEX = 'M50 4 L90 27 L90 73 L50 96 L10 73 L10 27 Z';

export function MonthBadge({
  monthKey,
  state,
  progress = 0,
  size = 96,
}: {
  monthKey: string;
  state: 'earned' | 'progress' | 'missed';
  /** 0–1, drawn as a ring while in progress. */
  progress?: number;
  size?: number;
}) {
  const b = monthBadge(monthKey);
  const Icon = GLYPH[b.glyph];
  const earned = state === 'earned';
  const face = earned ? b.color : 'var(--badge-locked)';
  const rim = earned ? `color-mix(in srgb, ${b.color} 72%, black)` : 'var(--badge-locked-dark)';
  const light = earned ? `color-mix(in srgb, ${b.color} 55%, white)` : 'color-mix(in srgb, var(--badge-locked) 60%, white)';
  const ringLen = 2 * Math.PI * 47;

  return (
    <span className={`${styles.badge} ${tokens.monthTokens}`} style={{ width: size, height: size * 1.08 }} aria-hidden="true">
      <svg viewBox="0 0 100 108" width={size} height={size * 1.08}>
        {state === 'progress' && (
          <>
            <circle cx="50" cy="50" r="47" fill="none" stroke="var(--border)" strokeWidth="4" />
            <circle
              cx="50"
              cy="50"
              r="47"
              fill="none"
              stroke={b.color}
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={`${ringLen * Math.max(0, Math.min(1, progress))} ${ringLen}`}
              transform="rotate(-90 50 50)"
            />
          </>
        )}
        <g transform="translate(0 3)">
          <path d={HEX} fill={rim} transform="translate(0 3)" />
          <path d={HEX} fill={face} />
          <path d="M50 12 L83 31 L83 69 L50 88 L17 69 L17 31 Z" fill={light} opacity="0.55" />
          <path d="M50 16 L79 33 L79 67 L50 84 L21 67 L21 33 Z" fill={face} />
          {earned && <path d="M22 34 L50 17 L60 23 L28 44 Z" fill="white" opacity="0.28" />}
        </g>
        {/* Ribbon */}
        <path d="M18 84 H82 L77 92 L82 100 H18 L23 92 Z" fill={rim} />
        <text
          x="50"
          y="95.5"
          textAnchor="middle"
          fontSize="10"
          fontWeight="800"
          letterSpacing="1.5"
          fill="var(--badge-ribbon-ink)"
          style={{ fontFamily: 'var(--font-jakarta), sans-serif' }}
        >
          {b.short}
        </text>
      </svg>
      <span
        className="absolute flex items-center justify-center"
        style={{ left: 0, right: 0, top: size * 0.26, height: size * 0.42 }}
      >
        <Icon style={{ width: size * 0.36, height: size * 0.36, color: 'white', strokeWidth: 2.4 }} />
      </span>
    </span>
  );
}

export default MonthBadge;
