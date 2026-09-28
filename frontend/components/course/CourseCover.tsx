/**
 * A course's cover: its image, or — when the creator hasn't uploaded one — a
 * tinted tile with a category glyph on a chunky lipped badge.
 *
 * The tint is derived from the course id, so a course keeps the same colour
 * everywhere (Explore card, course page, enrolment scene).
 */

import React from 'react';
import Image from 'next/image';
import {
  BookOpen,
  BrainCircuit,
  Briefcase,
  Camera,
  CodeXml,
  HeartPulse,
  Languages,
  Megaphone,
  Music,
  Palette,
  PenLine,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react';
import styles from './CourseCover.module.css';

export const COURSE_TINTS = ['tintBlue', 'tintGreen', 'tintOrange', 'tintPurple'] as const;
export type CourseTint = (typeof COURSE_TINTS)[number];

/** A stable tint per course id. */
export function tintFor(id: string | undefined | null): CourseTint {
  let h = 0;
  for (const ch of id ?? '') h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return COURSE_TINTS[h % COURSE_TINTS.length];
}

/** A recognisable icon per category, matched loosely against creator text. */
const CATEGORY_ICONS: [RegExp, LucideIcon][] = [
  [/\b(ai|artificial|machine|data)\b/, BrainCircuit],
  [/develop|software|code|coding|programming|web|\bit\b/, CodeXml],
  [/business|entrepreneur|finance|money|career/, Briefcase],
  [/market|sales|social media|brand/, Megaphone],
  [/design|art|creative|ui|ux/, Palette],
  [/photo|video|film/, Camera],
  [/music|audio/, Music],
  [/writ|content|copy/, PenLine],
  [/language|english|french|spanish/, Languages],
  [/health|fitness|wellness|mind/, HeartPulse],
  [/growth|productiv|personal|leader/, TrendingUp],
];

export function categoryGlyph(category: string | null | undefined, size: number, strokeWidth = 2.5) {
  const c = (category ?? '').toLowerCase();
  const icon = CATEGORY_ICONS.find(([re]) => re.test(c))?.[1] ?? BookOpen;
  return React.createElement(icon, { size, strokeWidth, 'aria-hidden': true });
}

export function CourseCover({
  id,
  category,
  thumbnailUrl,
  sizes,
  glyphSize = 44,
  className = '',
  priority = false,
}: {
  id?: string | null;
  category?: string | null;
  thumbnailUrl?: string | null;
  sizes: string;
  glyphSize?: number;
  className?: string;
  priority?: boolean;
}) {
  return (
    <span className={`${styles.cover} ${styles[tintFor(id)]} ${className}`}>
      {thumbnailUrl ? (
        <Image src={thumbnailUrl} alt="" fill sizes={sizes} priority={priority} className={styles.img} />
      ) : (
        <span className={styles.art} aria-hidden="true">
          <span className={styles.badge}>{categoryGlyph(category, glyphSize, 2.25)}</span>
        </span>
      )}
    </span>
  );
}

export default CourseCover;
