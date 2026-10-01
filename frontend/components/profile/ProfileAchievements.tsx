'use client';

/**
 * Achievements, Duolingo's way: one row per badge family, the badge at its
 * current level, what the next level asks, and a bar toward it. Three show;
 * "View all" opens the rest. Tapping a row shows every level of that badge.
 */

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';
import AchievementBadge from '@/components/achievements/AchievementBadge';
import { Modal } from '@/components/ui/Modal';
import { markAchievementSeen } from '@/lib/achievements';
import { playSound } from '@/lib/audio/lessonSounds';
import type { AchievementFamily } from './types';
import styles from './Profile.module.css';

const UNITS: Record<string, string> = {
  novice: '',
  wildfire: 'days',
  sage: 'XP',
  champion: 'lessons',
  sharpshooter: 'first-try answers',
  explorer: 'courses',
  marathon: 'days',
};

interface Props {
  families: AchievementFamily[] | undefined;
  loading: boolean;
  error: boolean;
  onRetry: () => void;
  onSeen: () => void;
}

export default function ProfileAchievements({ families, loading, error, onRetry, onSeen }: Props) {
  const [expanded, setExpanded] = useState(false);
  const [open, setOpen] = useState<AchievementFamily | null>(null);

  // Most-earned first, so the list leads with what you're proud of.
  const sorted = [...(families ?? [])].sort((a, b) => b.currentTier - a.currentTier || a.title.localeCompare(b.title));
  const shown = expanded ? sorted : sorted.slice(0, 3);

  const openFamily = (f: AchievementFamily) => {
    playSound('badge');
    setOpen(f);
    const fresh = f.tiers.filter((t) => t.isUnlocked && t.isNew);
    if (fresh.length > 0) {
      void Promise.all(fresh.map((t) => markAchievementSeen(f.id, t.level))).then(() => {
        window.dispatchEvent(new CustomEvent('achievement:refresh'));
        onSeen();
      });
    }
  };

  return (
    <section id="achievements" aria-label="Achievements">
      <div className={styles.sectionHead}>
        <h2 className={styles.sectionTitle}>Achievements</h2>
        {sorted.length > 3 && (
          <button
            type="button"
            className={styles.linkBtn}
            onClick={() => {
              playSound(expanded ? 'menuClose' : 'menuOpen');
              setExpanded((v) => !v);
            }}
          >
            {expanded ? 'Show less' : 'View all'}
          </button>
        )}
      </div>

      {loading ? (
        <div className={styles.achvList} aria-busy="true">
          {[0, 1, 2].map((i) => (
            <div key={i} className={styles.achvRow} style={{ cursor: 'default' }}>
              <span className={styles.skeleton} style={{ width: 64, height: 70 }} />
              <span className={styles.achvBody}>
                <span className={styles.skeleton} style={{ width: '40%', height: 18 }} />
                <span className={styles.skeleton} style={{ width: '80%', height: 14 }} />
              </span>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className={styles.errorBox} role="alert">
          Couldn&apos;t load your achievements.
          <button type="button" className={styles.linkBtn} onClick={onRetry}>
            <RefreshCw size={14} strokeWidth={2.75} /> Try again
          </button>
        </div>
      ) : sorted.length === 0 ? (
        <div className={styles.errorBox}>Finish your first lesson to start earning badges.</div>
      ) : (
        <div className={styles.achvList}>
          {shown.map((f) => {
            const locked = f.currentTier === 0;
            const next = f.tiers.find((t) => !t.isUnlocked);
            const hasNew = f.tiers.some((t) => t.isUnlocked && t.isNew);
            const unit = UNITS[f.id] ?? '';
            const pct = next ? Math.min(100, Math.round((f.currentMetricVal / next.target) * 100)) : 100;
            return (
              <button key={f.id} type="button" className={styles.achvRow} onClick={() => openFamily(f)}>
                <AchievementBadge badgeId={f.id} level={f.currentTier || undefined} locked={locked} size={64} />
                <span className={styles.achvBody}>
                  <span className={styles.achvTitleRow}>
                    <span className={styles.achvTitle}>{f.title}</span>
                    {hasNew && <span className={styles.newPill}>NEW</span>}
                  </span>
                  {next ? (
                    <>
                      <span className={styles.achvDesc}>{next.description}</span>
                      <span className={styles.achvTrack}>
                        <span className={styles.achvFill} style={{ width: `${Math.max(4, pct)}%`, display: 'block' }} />
                        <span className={styles.achvCount}>
                          {Math.min(f.currentMetricVal, next.target).toLocaleString()} / {next.target.toLocaleString()}
                          {unit ? ` ${unit}` : ''}
                        </span>
                      </span>
                    </>
                  ) : (
                    <span className={styles.achvDone}>Every level earned</span>
                  )}
                </span>
              </button>
            );
          })}
        </div>
      )}

      <Modal isOpen={!!open} onClose={() => setOpen(null)} title={open?.title} size="md">
        {open && (
          <div>
            <div className={styles.modalLead}>
              <AchievementBadge badgeId={open.id} level={open.currentTier || undefined} locked={open.currentTier === 0} size={88} />
              <p className={styles.modalText}>
                {open.currentTier === 0
                  ? `Not earned yet. ${open.tiers[0]?.description ?? ''}`
                  : open.currentTier >= open.maxTier
                    ? `You've earned every level of ${open.title}.`
                    : `Level ${open.currentTier} of ${open.maxTier}. Next: ${open.tiers.find((t) => !t.isUnlocked)?.description ?? ''}`}
              </p>
            </div>
            <div className={styles.tierGrid}>
              {open.tiers.map((t) => (
                <div key={t.level} className={styles.tier}>
                  <AchievementBadge badgeId={open.id} level={t.level} locked={!t.isUnlocked} size={72} />
                  <span className={styles.tierName}>{t.name}</span>
                  <span className={styles.tierSub}>
                    {t.isUnlocked && t.unlockedAt
                      ? new Date(t.unlockedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
                      : `${t.target.toLocaleString()} ${UNITS[open.id] ?? ''}`}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}
