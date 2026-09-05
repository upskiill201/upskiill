'use client';

/**
 * LeaderboardSceneShell — the light, flat, Duolingo-card counterpart to
 * SceneShell. Same non-trapping guarantees (full-bleed, pinned bottom CTA,
 * safe-area aware, a skip hatch while the CTA is hidden), but a deliberately
 * different visual language: white background, brand-token colors, no
 * ambient glow. Used only by the leaderboard scene family (LeaderboardScene,
 * and the re-skinned LEAGUE promotion/demotion scene) — the other 10 scenes
 * keep the dark theme in SceneShell/Scene.module.css untouched.
 */

import React, { type ReactNode } from 'react';
import { X } from 'lucide-react';
import styles from './Leaderboard.module.css';

interface LeaderboardSceneShellProps {
  children: ReactNode;
  cta?: {
    text: string;
    onClick: () => void;
    disabled?: boolean;
  } | null;
  /** Skip hatch rendered while the bottom CTA is hidden — no scene may ever
   * trap the learner (mobile has no Escape key). */
  onSkip?: () => void;
}

export default function LeaderboardSceneShell({ children, cta, onSkip }: LeaderboardSceneShellProps) {
  return (
    <div className={styles.backdrop} role="dialog" aria-modal="true" aria-label="Leaderboard">
      {onSkip && (
        <button type="button" className={styles.skipButton} onClick={onSkip} aria-label="Skip">
          <X size={16} strokeWidth={2.6} />
        </button>
      )}

      <div className={styles.contentColumn}>
        <div className={styles.contentInner}>{children}</div>
      </div>

      {cta && (
        <div className={styles.bottomAction}>
          <button
            type="button"
            className={styles.ctaButton}
            onClick={cta.onClick}
            disabled={cta.disabled}
          >
            {cta.text}
          </button>
        </div>
      )}
    </div>
  );
}
