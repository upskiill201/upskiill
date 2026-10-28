'use client';

/** People you may know — cohort first — each one tap from a buddy request. */

import React from 'react';
import Link from 'next/link';
import useSWR, { useSWRConfig } from 'swr';
import { Glyph } from '@/components/art/Glyph';
import Avatar from '@/components/ui/Avatar';
import { useHydrated } from '@/components/studio/useHydrated';
import { fetcher } from '@/lib/swr';
import { playSound } from '@/lib/audio/lessonSounds';
import { playHaptic } from '@/lib/haptics';
import { NETWORK_KEYS, requestBuddy, type Suggestion } from '@/lib/network';
import styles from './Network.module.css';

export default function SuggestionList({ limit = 8, compact = false }: { limit?: number; compact?: boolean }) {
  const res = useSWR<{ people: Suggestion[] }>(NETWORK_KEYS.suggestions, fetcher, { revalidateOnFocus: false });
  const [sent, setSent] = React.useState<Record<string, 'sending' | 'sent' | 'error'>>({});
  const hydrated = useHydrated();
  const data = hydrated ? res.data : undefined;
  const { mutate } = useSWRConfig();
  const refresh = () => mutate(NETWORK_KEYS.buddies);

  if (res.error && !data && hydrated) return <p className={styles.mutedLine}>Couldn&apos;t load suggestions right now.</p>;
  if (!data) {
    return (
      <div className={styles.personList}>
        {[0, 1, 2].map((i) => (
          <div key={i} className={`${styles.personRow} ${styles.skeleton}`}>
            <span className={styles.skelCircle} />
            <span className={styles.skelLine} style={{ width: '50%' }} />
          </div>
        ))}
      </div>
    );
  }

  const people = data.people.slice(0, limit);
  if (people.length === 0) {
    return (
      <p className={styles.mutedLine}>
        No classmates to suggest yet. <Link href="/dashboard/explore">Start a course</Link> or share your invite link.
      </p>
    );
  }

  const ask = async (p: Suggestion) => {
    setSent((s) => ({ ...s, [p.id]: 'sending' }));
    playSound('toggleOn');
    playHaptic('light', false);
    try {
      await requestBuddy(p.id, p.courseId);
      setSent((s) => ({ ...s, [p.id]: 'sent' }));
      // Not the suggestions list itself: the person stays, marked "Asked".
      void refresh();
    } catch {
      setSent((s) => ({ ...s, [p.id]: 'error' }));
      playSound('nodeLocked');
    }
  };

  return (
    <div className={`${styles.personList} ${compact ? styles.personListCompact : ''}`}>
      {people.map((p) => {
        const state = sent[p.id];
        return (
          <div key={p.id} className={styles.personRow}>
            <Link href={`/dashboard/u/${encodeURIComponent(p.id)}`} className={styles.personMain}>
              <Avatar size="sm" src={p.avatar ?? undefined} name={p.name} />
              <span className={styles.personText}>
                <span className={styles.personName}>{p.name}</span>
                <span className={styles.personSub}>{p.reason}</span>
              </span>
            </Link>
            <button
              type="button"
              className={state === 'sent' ? styles.pillDone : styles.pillPrimary}
              disabled={state === 'sending' || state === 'sent'}
              onClick={() => void ask(p)}
            >
              {state === 'sent' ? (
                <>
                  <Glyph name="check" size={14} strokeWidth={3} /> Asked
                </>
              ) : state === 'error' ? (
                'Try again'
              ) : (
                <>
                  <Glyph name="userPlus" size={14} strokeWidth={2.8} /> Add buddy
                </>
              )}
            </button>
          </div>
        );
      })}
    </div>
  );
}
