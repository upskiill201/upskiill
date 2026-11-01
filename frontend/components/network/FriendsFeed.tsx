'use client';

/**
 * The Friends feed: what your buddies, the people you follow and your
 * classmates are learning, ranked server-side for how likely each card is to
 * get you learning. It ends — after ~15 cards it says you're caught up and
 * hands you your next lesson.
 *
 * SWR-cached and persisted, so coming back paints instantly.
 */

import React from 'react';
import Link from 'next/link';
import useSWR from 'swr';
import { Glyph } from '@/components/art/Glyph';
import Avatar from '@/components/ui/Avatar';
import Button from '@/components/ui/Button';
import TeyMascot from '@/components/community/TeyMascot';
import { useHydrated } from '@/components/studio/useHydrated';
import { fetcher } from '@/lib/swr';
import { playSound } from '@/lib/audio/lessonSounds';
import { NETWORK_KEYS, type NetworkFeed } from '@/lib/network';
import ActivityCard, { ActivityCardSkeleton } from './ActivityCard';
import ReviewCard from './ReviewCard';
import SuggestionList from './SuggestionList';
import styles from './Network.module.css';

export default function FriendsFeed() {
  const feed = useSWR<NetworkFeed>(NETWORK_KEYS.feed, fetcher, { revalidateOnFocus: false, keepPreviousData: true });
  // The persisted SWR cache exists on the client's first render, not the
  // server's — wait one render so hydration matches, then paint from cache.
  const hydrated = useHydrated();
  const data = hydrated ? feed.data : undefined;

  if (feed.error && !data && hydrated) {
    return (
      <div className={styles.errorBox}>
        <Glyph name="alert" size={26} />
        <span>Couldn&apos;t load your friends feed.</span>
        <Button variant="outline" onClick={() => void feed.mutate()}>
          Try again
        </Button>
      </div>
    );
  }

  if (!data) {
    return (
      <div className={styles.feedList}>
        <ActivityCardSkeleton />
        <ActivityCardSkeleton />
        <ActivityCardSkeleton />
      </div>
    );
  }

  const { items } = data;
  const reviews = data.reviews ?? [];
  // Review cards sit among the people cards (slots 2 and 7), not at the end,
  // so scrolling the feed is practice too.
  const slotOf = (i: number) => (i === 0 ? 2 : 7);

  return (
    <div className={styles.feedList}>
      <BuddyStrip />

      {items.length === 0 ? (
        <>
          <div className={styles.emptyBox}>
            <TeyMascot size={88} />
            <h3 className={styles.emptyTitle}>Learning is better with people</h3>
            <p className={styles.emptySub}>
              Add a study buddy and you&apos;ll see each other&apos;s lessons here, cheer each other on, and keep a streak together.
            </p>
            <SuggestionList limit={4} compact />
          </div>
          {reviews.map((r) => (
            <ReviewCard key={r.id} card={r} />
          ))}
        </>
      ) : (
        <>
          {items.map((card, i) => (
            <React.Fragment key={card.id}>
              {reviews.map((r, ri) => (slotOf(ri) === i ? <ReviewCard key={r.id} card={r} /> : null))}
              <ActivityCard card={card} position={i} />
            </React.Fragment>
          ))}
          {reviews.map((r, ri) => (slotOf(ri) >= items.length ? <ReviewCard key={r.id} card={r} /> : null))}
          <div className={styles.caughtUp}>
            <span className={styles.caughtUpIcon}>
              <Glyph name="checkDouble" size={26} strokeWidth={2.6} />
            </span>
            <div>
              <h3 className={styles.caughtUpTitle}>You&apos;re caught up</h3>
              <p className={styles.caughtUpSub}>That&apos;s everything from your people this week. Your next lesson is ready.</p>
            </div>
            <Link href="/dashboard" className={styles.learnBtn} onClick={() => playSound('start')}>
              Keep learning <Glyph name="chevron" size={16} strokeWidth={2.8} />
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

/** The buddies row on top of the feed: their faces and whether they learned today. */
function BuddyStrip() {
  const buddies = useSWR<{ buddies: { id: string; name: string; avatar: string | null; learnedToday: boolean; streakTogether: number; live?: boolean }[]; incoming: unknown[] }>(
    NETWORK_KEYS.buddies,
    fetcher,
    { revalidateOnFocus: false },
  );
  const list = buddies.data?.buddies ?? [];
  const incoming = buddies.data?.incoming.length ?? 0;

  return (
    <Link href="/dashboard/network" className={styles.buddyStrip} onClick={() => playSound('navTap', 2)}>
      <span className={styles.stripLabel}>
        <Glyph name="users" size={16} strokeWidth={2.7} />
        {list.length ? 'Your study buddies' : 'Find a study buddy'}
      </span>
      <span className={styles.stripFaces}>
        {list.slice(0, 5).map((b) => (
          <span key={b.id} className={`${styles.stripFace} ${b.live ? styles.faceRingLive : b.learnedToday ? styles.stripFaceDone : ''}`} title={b.live ? `${b.name} is learning now` : b.name}>
            <Avatar size="xs" src={b.avatar ?? undefined} name={b.name} />
          </span>
        ))}
        {incoming > 0 && <span className={styles.stripRequests}>{incoming} new</span>}
      </span>
      <Glyph name="chevron" size={16} />
    </Link>
  );
}
