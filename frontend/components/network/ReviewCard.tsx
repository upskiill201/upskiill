'use client';

/**
 * A review card in the Friends feed: one of your own past questions, from a
 * lesson you finished a while ago. Recalling beats re-reading, so scrolling
 * the feed is practice too. No XP, no hearts — it's just for you.
 */

import React from 'react';
import Link from 'next/link';
import { Glyph } from '@/components/art/Glyph';
import { playSound } from '@/lib/audio/lessonSounds';
import { playHaptic } from '@/lib/haptics';
import { courseHomeHref } from '@/lib/homeCourse';
import type { ReviewCardData } from '@/lib/network';
import styles from './Network.module.css';

function ago(days: number) {
  if (days <= 1) return 'yesterday';
  if (days < 7) return `${days} days ago`;
  const w = Math.round(days / 7);
  return w === 1 ? 'a week ago' : `${w} weeks ago`;
}

export default function ReviewCard({ card }: { card: ReviewCardData }) {
  const [picked, setPicked] = React.useState<string | null>(null);
  const right = picked === card.correctOptionId;

  const pick = (id: string) => {
    if (picked) return;
    setPicked(id);
    if (id === card.correctOptionId) {
      playSound('correct');
      playHaptic('success', false);
    } else {
      playSound('wrong');
      playHaptic('error', false);
    }
  };

  const chosen = card.options.find((o) => o.id === picked);
  const correct = card.options.find((o) => o.id === card.correctOptionId);

  return (
    <article className={`${styles.card} ${styles.reviewCard}`}>
      <header className={styles.reviewHead}>
        <span className={styles.reviewIcon}>
          <Glyph name="brain" size={18} strokeWidth={2.5} />
        </span>
        <span className={styles.reviewLabel}>Quick review</span>
        <span className={styles.time}>
          {card.lessonTitle} · {ago(card.daysAgo)}
        </span>
      </header>

      {card.message && <p className={styles.reviewMessage}>“{card.message}”</p>}
      {card.code && <pre className={styles.codeBlock}>{card.code}</pre>}
      <p className={styles.reviewPrompt}>{card.prompt}</p>

      <div className={styles.reviewOptions} role="group" aria-label="Answers">
        {card.options.map((o) => {
          const state = !picked ? '' : o.id === card.correctOptionId ? styles.optRight : o.id === picked ? styles.optWrong : styles.optDim;
          return (
            <button key={o.id} type="button" className={`${styles.reviewOpt} ${state}`} disabled={!!picked} onClick={() => pick(o.id)}>
              {o.text}
            </button>
          );
        })}
      </div>

      {picked && (
        <div className={right ? styles.reviewRight : styles.reviewWrong} role="status">
          <strong>{right ? 'You remembered it.' : `It was: ${correct?.text ?? ''}`}</strong>
          {(!right && chosen?.why) || card.explanation ? <span> {!right && chosen?.why ? chosen.why : card.explanation}</span> : null}
          {!right && (
            <Link href={courseHomeHref(card.courseId)} className={styles.reviewLink} onClick={() => playSound('navTap', 1)}>
              Revisit the course <Glyph name="chevron" size={14} strokeWidth={2.8} />
            </Link>
          )}
        </div>
      )}
    </article>
  );
}
