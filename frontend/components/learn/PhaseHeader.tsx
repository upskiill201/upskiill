'use client';

/**
 * PhaseHeader — one header shape for all four phases.
 *
 * Before this, each phase invented its own from scratch: Learn was a
 * decorative eyebrow over a 28px/800 title, Reflect a badge over a
 * clamp(17-28px)/900 title with a 180px mascot floated right, Deepen a
 * center-aligned 26px/800 title with a 220px mascot underneath. Three type
 * scales, two weights, two alignments, three mascot sizes plus one absence —
 * which is a large part of why moving between phases felt like being handed
 * off to a different product rather than advancing one lesson.
 *
 * One badge pill + one 28px/800 left-aligned title + optional subtitle,
 * everywhere. The badge text and colour still come from the active phase's
 * accent (`--phase-accent`, set by `LessonShell`), so each phase keeps an
 * identity without needing its own layout.
 */

import React from 'react';
import styles from './Learn.module.css';

interface PhaseHeaderProps {
  eyebrow: string;
  title: string;
  subtitle?: React.ReactNode;
  className?: string;
}

export default function PhaseHeader({ eyebrow, title, subtitle, className }: PhaseHeaderProps) {
  return (
    <div className={`${styles.phaseHeader} ${className ?? ''}`}>
      <span className={styles.phaseHeaderBadge}>{eyebrow}</span>
      <h2 className={styles.phaseHeaderTitle}>{title}</h2>
      {subtitle && <div className={styles.phaseHeaderSubtitle}>{subtitle}</div>}
    </div>
  );
}
