'use client';

/**
 * The network half of a learner's profile: the study-buddy button (with your
 * shared streak once you're buddies) and their recent learning timeline.
 * Both read one cached request — /api/network/users/:id/timeline.
 */

import React from 'react';
import Image from 'next/image';
import useSWR from 'swr';
import { Glyph } from '@/components/art/Glyph';
import { useHydrated } from '@/components/studio/useHydrated';
import { fetcher } from '@/lib/swr';
import { playSound } from '@/lib/audio/lessonSounds';
import { playHaptic } from '@/lib/haptics';
import { NETWORK_KEYS, removeBuddy, requestBuddy, useRefreshNetwork, type ActivityCardData, type Relation } from '@/lib/network';
import ActivityCard, { ActivityCardSkeleton } from './ActivityCard';
import styles from './Network.module.css';
import own from './ProfileNetwork.module.css';

type Timeline = { items: ActivityCardData[]; relation: Relation; helped?: number };

/** Cached data is read only after hydration, so server and client agree. */
const useTimeline = (userId: string) => {
  const swr = useSWR<Timeline>(NETWORK_KEYS.timeline(userId), fetcher, { revalidateOnFocus: false });
  const hydrated = useHydrated();
  return { ...swr, data: hydrated ? swr.data : undefined, error: hydrated ? swr.error : undefined };
};

export function BuddyButton({ userId, firstName }: { userId: string; firstName: string }) {
  const { data, mutate } = useTimeline(userId);
  const refresh = useRefreshNetwork();
  const [error, setError] = React.useState<string | null>(null);
  if (!data || data.relation.status === 'SELF') return null;
  const { status, streakTogether } = data.relation;

  const act = async (fn: () => Promise<Relation>, optimistic: Relation['status']) => {
    setError(null);
    void mutate({ ...data, relation: { status: optimistic, streakTogether } }, { revalidate: false });
    try {
      const relation = await fn();
      void mutate({ ...data, relation }, { revalidate: false });
      void refresh();
    } catch (e) {
      void mutate(data, { revalidate: false });
      setError(e instanceof Error ? e.message : "Couldn't update right now.");
      playSound('nodeLocked');
    }
  };

  const ask = () => {
    playSound('toggleOn');
    playHaptic('success', false);
    void act(() => requestBuddy(userId), status === 'INCOMING' ? 'BUDDIES' : 'OUTGOING');
  };

  return (
    <div className={own.wrap}>
      {status === 'BUDDIES' ? (
        <div className={own.buddies}>
          <span className={own.buddiesLabel}>
            <Glyph name="users" size={18} strokeWidth={2.75} /> Study buddies
          </span>
          <span className={own.streak} title="Days you both learned in a row">
            <Image src="/Icons/burn.png" alt="" width={20} height={20} /> {streakTogether} day{streakTogether === 1 ? '' : 's'} together
          </span>
        </div>
      ) : status === 'OUTGOING' ? (
        <button type="button" className={own.pending} onClick={() => void act(() => removeBuddy(userId), 'NONE')}>
          <Glyph name="clock" size={18} strokeWidth={2.75} /> Buddy request sent · Cancel
        </button>
      ) : (
        <button type="button" className={own.ask} onClick={ask}>
          <Glyph name="users" size={20} strokeWidth={2.75} />
          {status === 'INCOMING' ? `Accept ${firstName}'s buddy request` : 'Add study buddy'}
        </button>
      )}
      {error && <p className={own.error}>{error}</p>}
      {(data.helped ?? 0) > 0 && (
        <p className={own.helped}>
          <Glyph name="lifebuoy" size={16} strokeWidth={2.6} />
          Helped {data.helped} {data.helped === 1 ? 'learner' : 'learners'} through a lesson
        </p>
      )}
    </div>
  );
}

export function LearningTimeline({ userId, firstName }: { userId: string; firstName: string }) {
  const { data, error } = useTimeline(userId);

  return (
    <section aria-label={`${firstName}'s recent learning`} className={own.section}>
      <h2 className={own.title}>Recent learning</h2>
      {error && !data ? (
        <p className={styles.mutedLine}>Couldn&apos;t load {firstName}&apos;s learning right now.</p>
      ) : !data ? (
        <div className={styles.timeline}>
          <ActivityCardSkeleton />
        </div>
      ) : data.items.length === 0 ? (
        <p className={styles.mutedLine}>Nothing yet. When {firstName} finishes a lesson, it shows up here.</p>
      ) : (
        <div className={styles.timeline}>
          {data.items.slice(0, 8).map((c) => (
            <ActivityCard key={c.id} card={c} showAuthor={false} />
          ))}
        </div>
      )}
    </section>
  );
}
