'use client';

/**
 * PRO WITH FRIENDS — the ambassador programme's home (founder, 2026-10-29).
 *
 *   Ambassadors: friend slots, where Pro stands (on / grace / not yet),
 *   their invite link, every friend with the one action that keeps them
 *   learning (nudge or cheer), their crew, and lifetime medals.
 *   Not yet an ambassador: what it is, and one white tactile button to join.
 */

import React, { useState } from 'react';
import Link from 'next/link';
import useSWR from 'swr';
import { Art } from '@/components/art/Art';
import { Glyph } from '@/components/art/Glyph';
import { FriendList, FriendSlots, InviteShare, ProStatus } from '@/components/ambassador/AmbassadorParts';
import styles from '@/components/ambassador/Ambassador.module.css';
import { fetcher } from '@/lib/swr';
import { celebrationHaptic } from '@/lib/haptics';
import { AMBASSADOR_ME_KEY, ambassadorApi, type AmbassadorMe } from '@/lib/ambassador';

export default function AmbassadorPage() {
  const { data, error, isLoading, mutate } = useSWR<AmbassadorMe>(AMBASSADOR_ME_KEY, fetcher, { revalidateOnFocus: true });

  return (
    <div className={styles.page}>
      <Link href="/dashboard" className="inline-flex items-center gap-2 text-[14px] font-extrabold text-[var(--text-secondary)]">
        <Glyph name="back" size={15} strokeWidth={2.8} /> Back to Home
      </Link>

      {isLoading && !data ? (
        <Loading />
      ) : error && !data ? (
        <section className={styles.card} role="alert">
          <h2 className={styles.title}>This page didn&apos;t load</h2>
          <p className={styles.sub}>Check your connection and try again.</p>
          <button type="button" className={styles.tactile} onClick={() => void mutate()}>
            Try again
          </button>
        </section>
      ) : data && !data.isAmbassador ? (
        <JoinView me={data} onJoined={(me) => void mutate(me, { revalidate: false })} />
      ) : data ? (
        <AmbassadorView me={data} refresh={() => void mutate()} />
      ) : null}
    </div>
  );
}

function Loading() {
  return (
    <div className="flex flex-col gap-4" aria-busy="true" aria-label="Loading">
      <span className={styles.skel} style={{ height: 32, width: '60%' }} />
      <span className={styles.skel} style={{ width: '80%' }} />
      <div className={styles.slots}>
        {[0, 1, 2, 3, 4].map((i) => (
          <span key={i} className={styles.skelSlot} style={{ width: 56, height: 56 }} />
        ))}
      </div>
      <span className={styles.skel} style={{ height: 120 }} />
    </div>
  );
}

function HowItWorks({ me }: { me: AmbassadorMe }) {
  const r = me.rules;
  return (
    <ol className={styles.steps}>
      <li>
        <span className={styles.stepNum}>1</span>
        <span>Share your invite link with friends who want to learn.</span>
      </li>
      <li>
        <span className={styles.stepNum}>2</span>
        <span>
          A friend counts once they finish {r.qualifyLessons} lessons and reach a {r.qualifyStreak}-day streak.
        </span>
      </li>
      <li>
        <span className={styles.stepNum}>3</span>
        <span>
          With {r.friendsForPro} friends learning, you get Teyro Pro. It stays on while they keep learning (a lesson at least
          every {r.activeDays} days).
        </span>
      </li>
      <li>
        <span className={styles.stepNum}>4</span>
        <span>
          If a friend stops, you get {r.graceDays} days to bring someone back before Pro pauses. It comes back on its own.
        </span>
      </li>
    </ol>
  );
}

function JoinView({ me, onJoined }: { me: AmbassadorMe; onJoined: (me: AmbassadorMe) => void }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const join = async () => {
    setBusy(true);
    setError(null);
    try {
      const next = await ambassadorApi.join('APP');
      celebrationHaptic('soft');
      onJoined(next);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'That did not work. Try again.');
      setBusy(false);
    }
  };

  return (
    <>
      <header className={styles.hero}>
        <Art name="friends" size={88} />
        <div className={styles.heroText}>
          <h1 className={styles.h1}>Get Pro free, with friends</h1>
          <p className={styles.lead}>Invite friends to learn with you. While they keep learning, you keep Teyro Pro.</p>
        </div>
      </header>

      <section className={styles.card}>
        <h2 className={styles.title}>How it works</h2>
        <HowItWorks me={me} />
        {me.enabled ? (
          <button type="button" className={`${styles.tactile} ${styles.tactileWide}`} disabled={busy} onClick={() => void join()}>
            {busy ? 'One moment…' : 'Become an ambassador'}
          </button>
        ) : (
          <p className={styles.sub}>The programme is paused right now. Check back soon.</p>
        )}
        {error && (
          <p className={styles.toast} role="alert">
            {error}
          </p>
        )}
      </section>
    </>
  );
}

function AmbassadorView({ me, refresh }: { me: AmbassadorMe; refresh: () => void }) {
  return (
    <>
      <header className="flex flex-col gap-2">
        <p className={styles.eyebrow}>Ambassador</p>
        <h1 className={styles.h1}>Pro with friends</h1>
        <p className={styles.lead}>
          {me.rules.friendsForPro} friends learning keeps your Pro on. Help them keep going.
        </p>
      </header>

      <section className={styles.card} aria-label="Your progress">
        <FriendSlots me={me} large />
        <ProStatus me={me} />
        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statNum}>{me.counts.invited}</span>
            <span className={styles.statLabel}>Joined</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNum}>{me.counts.qualified}</span>
            <span className={styles.statLabel}>Counted</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNum}>{me.counts.active}</span>
            <span className={styles.statLabel}>Learning now</span>
          </div>
        </div>
      </section>

      <section className={styles.card} aria-label="Invite friends">
        <h2 className={styles.title}>Your invite link</h2>
        <p className={styles.sub}>
          Friends who join with it land in {me.squad ? me.squad.name : 'your crew'} and become your study buddies, so you can
          learn side by side.
        </p>
        <InviteShare me={me} />
      </section>

      <section className={styles.card} aria-label="Your friends">
        <h2 className={styles.title}>Your friends</h2>
        {me.friends.length === 0 ? (
          <div className={styles.empty}>
            <Art name="people" size={64} />
            <p className={styles.sub}>No one has joined with your link yet. Share it with one friend today.</p>
          </div>
        ) : (
          <FriendList me={me} onChanged={refresh} />
        )}
      </section>

      {me.squad && (
        <section className={styles.card} aria-label="Your crew">
          <div className={styles.head}>
            <h2 className={styles.title}>{me.squad.name}</h2>
            <Link href="/dashboard/network" className={styles.seeAll}>
              Open
            </Link>
          </div>
          <p className={styles.sub}>
            {me.squad.members} of {me.squad.max} seats taken. Friends who join with your link fill it first.
          </p>
        </section>
      )}

      <section className={styles.card} aria-label="Medals">
        <h2 className={styles.title}>Lifetime medals</h2>
        <div className={styles.badges}>
          {me.badges.map((b) => (
            <div key={b.key} className={`${styles.badge} ${b.earned ? '' : styles.badgeLocked}`}>
              <Art name={b.key === 'LEGEND' ? 'trophy' : b.key === 'CHAMPION' ? 'seal' : 'badge'} size={48} />
              <span className={styles.badgeName}>{b.name}</span>
              <span className={styles.badgeSub}>{b.earned ? 'Earned' : `${b.left} more friends`}</span>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.card} aria-label="How it works">
        <h2 className={styles.title}>How it works</h2>
        <HowItWorks me={me} />
      </section>
    </>
  );
}
