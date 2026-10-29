'use client';

/**
 * Earn Pro with friends — the rail widget, for ambassadors only.
 *
 * The friend slots, where their Pro stands, and the one thing worth doing
 * right now: nudge a friend who's slipping, or share the link if Pro still
 * needs more friends. Everyone else sees nothing here (the offer lives at the
 * paywall's last door, not in the rail).
 */

import Link from 'next/link';
import useSWR from 'swr';
import { useHydrated } from '@/components/studio/useHydrated';
import { fetcher } from '@/lib/swr';
import { playSound } from '@/lib/audio/lessonSounds';
import { AMBASSADOR_ME_KEY, type AmbassadorMe } from '@/lib/ambassador';
import { FriendList, FriendSlots, InviteShare, ProStatus } from './AmbassadorParts';
import styles from './Ambassador.module.css';

export default function AmbassadorWidget() {
  const hydrated = useHydrated();
  const { data: raw, error, mutate } = useSWR<AmbassadorMe>(AMBASSADOR_ME_KEY, fetcher, { revalidateOnFocus: true });
  const data = hydrated ? raw : undefined;

  if (error && !data) {
    // Only ambassadors see this widget; a failed load says so quietly.
    if ((error as { status?: number }).status === 401) return null;
    return (
      <section className={styles.card} aria-label="Pro with friends">
        <p className={styles.error}>
          Couldn&apos;t load your friends.{' '}
          <button type="button" className={styles.linkBtn} onClick={() => void mutate()}>
            Try again
          </button>
        </p>
      </section>
    );
  }

  if (!data) {
    // The skeleton only shows for a known ambassador (cached), never a flash for everyone.
    if (!raw?.isAmbassador) return null;
    return (
      <section className={styles.card} aria-busy="true" aria-label="Loading Pro with friends">
        <span className={styles.skel} style={{ width: '50%' }} />
        <div className={styles.slots}>
          {[0, 1, 2, 3, 4].map((i) => (
            <span key={i} className={styles.skelSlot} />
          ))}
        </div>
      </section>
    );
  }

  if (!data.isAmbassador) return null;

  const slipping = data.friends.filter((f) => (f.state === 'AT_RISK' || f.state === 'INACTIVE') && f.canNudge);

  return (
    <section className={styles.card} aria-label="Pro with friends">
      <header className={styles.head}>
        <h3 className={styles.title}>Pro with friends</h3>
        <Link href="/dashboard/ambassador" className={styles.seeAll} onClick={() => playSound('navTap', 2)}>
          See all
        </Link>
      </header>
      <FriendSlots me={data} />
      <ProStatus me={data} />
      {slipping.length > 0 ? (
        <FriendList me={{ ...data, friends: slipping }} onChanged={() => void mutate()} limit={2} />
      ) : data.counts.needed > 0 ? (
        <InviteShare me={data} compact />
      ) : null}
    </section>
  );
}
