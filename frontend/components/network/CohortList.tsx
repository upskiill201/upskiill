'use client';

/**
 * Your cohort: everyone who started your course within a week of you, by
 * progress. The people one or two places ahead are marked — the near-peer
 * pull ("Grace is just ahead") works; a wall of experts doesn't.
 */

import React from 'react';
import Link from 'next/link';
import useSWR from 'swr';
import Avatar from '@/components/ui/Avatar';
import { useHydrated } from '@/components/studio/useHydrated';
import { fetcher } from '@/lib/swr';
import { NETWORK_KEYS, type CohortPayload } from '@/lib/network';
import styles from './Network.module.css';

const SHOW = 8;

export default function CohortList() {
  const res = useSWR<CohortPayload>(NETWORK_KEYS.cohort, fetcher, { revalidateOnFocus: false });
  const hydrated = useHydrated();
  const data = hydrated ? res.data : undefined;

  if (res.error && !data && hydrated) return <p className={styles.mutedLine}>Couldn&apos;t load your cohort right now.</p>;
  if (!data) {
    return (
      <div className={styles.personList}>
        {[0, 1, 2].map((i) => (
          <div key={i} className={`${styles.personRow} ${styles.skeleton}`}>
            <span className={styles.skelCircle} />
            <span className={styles.skelLine} style={{ width: '55%' }} />
          </div>
        ))}
      </div>
    );
  }
  if (!data.course || data.members.length <= 1) {
    return <p className={styles.mutedLine}>Nobody else started your course the same week yet. Invite a friend to start with you.</p>;
  }

  const meIndex = data.members.findIndex((m) => m.isMe);
  // Around you, not just the top: the two ahead, you, and the rest from the top.
  const start = meIndex > SHOW - 3 ? Math.max(0, meIndex - 3) : 0;
  const shown = data.members.slice(start, start + SHOW);

  return (
    <>
      <p className={styles.mutedLine}>
        {data.members.length} people started <strong>{data.course.title}</strong> the same week as you.
      </p>
      <ol className={styles.cohortList}>
        {shown.map((m) => {
          const justAhead = meIndex >= 0 && m.rank < data.members[meIndex].rank && m.rank >= data.members[meIndex].rank - 2;
          return (
            <li key={m.id} className={`${styles.cohortRow} ${m.isMe ? styles.cohortMe : ''}`}>
              <span className={styles.cohortRank}>{m.rank}</span>
              {m.isMe ? (
                <span className={styles.personMain}>
                  <Avatar size="sm" src={m.avatar ?? undefined} name={m.name} />
                  <span className={styles.personName}>You</span>
                </span>
              ) : (
                <Link href={`/dashboard/u/${encodeURIComponent(m.id)}`} className={styles.personMain}>
                  <Avatar size="sm" src={m.avatar ?? undefined} name={m.name} />
                  <span className={styles.personText}>
                    <span className={styles.personName}>{m.name}</span>
                    {justAhead && <span className={styles.aheadTag}>Just ahead of you</span>}
                  </span>
                </Link>
              )}
              <span className={styles.cohortProgress} aria-label={`${m.progress}% through`}>
                <span className={styles.cohortTrack}>
                  <span className={styles.cohortFill} style={{ width: `${Math.min(100, Math.max(0, m.progress))}%` }} />
                </span>
                <span className={styles.cohortPct}>{m.progress}%</span>
              </span>
            </li>
          );
        })}
      </ol>
    </>
  );
}
