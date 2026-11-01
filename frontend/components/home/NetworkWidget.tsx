'use client';

/**
 * Your study circle, in the home rail (docs/TEYRO_NETWORK_PLAN.md).
 *
 *   - your buddies' faces: green ring = learned today, pulsing = learning now
 *   - the ONE thing worth doing right now, in priority order: answer a buddy
 *     request, play your duel turn, join a buddy who's learning, nudge one
 *     who hasn't — or a "everyone learned today" when there's nothing to do
 *   - your squad's week, if you have one
 *
 * No buddies yet: a short why, and the way to find one. Flat, like the level
 * card above it; reads only cached network endpoints.
 */

import React from 'react';
import Link from 'next/link';
import useSWR from 'swr';
import { Art } from '@/components/art/Art';
import { Glyph } from '@/components/art/Glyph';
import Avatar from '@/components/ui/Avatar';
import { useHydrated } from '@/components/studio/useHydrated';
import { fetcher } from '@/lib/swr';
import { playSound } from '@/lib/audio/lessonSounds';
import { playHaptic } from '@/lib/haptics';
import {
  NETWORK_KEYS,
  nudgeBuddy,
  requestBuddy,
  useRefreshNetwork,
  type BuddiesPayload,
  type DuelSummary,
  type SquadData,
} from '@/lib/network';
import styles from './NetworkWidget.module.css';

const first = (name: string) => name.split(' ')[0];

export default function NetworkWidget() {
  const hydrated = useHydrated();
  const buddiesRes = useSWR<BuddiesPayload>(NETWORK_KEYS.buddies, fetcher, { revalidateOnFocus: true });
  const squadRes = useSWR<{ squad: SquadData | null }>(NETWORK_KEYS.squad, fetcher, { revalidateOnFocus: false });
  const duelsRes = useSWR<{ duels: DuelSummary[] }>(NETWORK_KEYS.duels, fetcher, { revalidateOnFocus: false });
  const data = hydrated ? buddiesRes.data : undefined;

  if (buddiesRes.error && !data && hydrated) {
    return (
      <section className={styles.card} aria-label="Study buddies">
        <p className={styles.error}>
          Couldn&apos;t load your buddies.{' '}
          <button type="button" className={styles.linkBtn} onClick={() => void buddiesRes.mutate()}>
            Try again
          </button>
        </p>
      </section>
    );
  }

  if (!data) {
    return (
      <section className={styles.card} aria-busy="true" aria-label="Loading your study buddies">
        <span className={styles.skel} style={{ width: '45%' }} />
        <div className={styles.faces}>
          {[0, 1, 2].map((i) => (
            <span key={i} className={styles.skelFace} />
          ))}
        </div>
        <span className={styles.skel} style={{ height: 40 }} />
      </section>
    );
  }

  const buddies = data.buddies;
  const squad = hydrated ? squadRes.data?.squad ?? null : null;
  const myTurn = (hydrated ? duelsRes.data?.duels ?? [] : []).find((d) => d.myTurn) ?? null;

  if (buddies.length === 0 && data.incoming.length === 0) {
    return (
      <section className={`${styles.card} ${styles.empty}`} aria-label="Study buddies">
        <Art name="friends" size={64} />
        <div className={styles.emptyText}>
          <h3 className={styles.title}>Learn with a buddy</h3>
          <p className={styles.sub}>See each other&apos;s lessons, cheer each other on, and keep a streak together.</p>
        </div>
        <Link href="/dashboard/network" className={styles.cta} onClick={() => playSound('navTap', 2)}>
          Find a study buddy
        </Link>
      </section>
    );
  }

  return (
    <section className={styles.card} aria-label="Study buddies">
      <header className={styles.head}>
        <h3 className={styles.title}>Study buddies</h3>
        <Link href="/dashboard/network" className={styles.seeAll} onClick={() => playSound('navTap', 2)}>
          See all
        </Link>
      </header>

      <ul className={styles.faces}>
        {buddies.slice(0, 5).map((b) => (
          <li key={b.id}>
            <Link
              href={`/dashboard/u/${encodeURIComponent(b.id)}`}
              className={styles.face}
              title={b.live ? `${b.name} is learning now` : b.learnedToday ? `${b.name} learned today` : `${b.name} hasn't learned yet today`}
              onClick={() => playSound('navTap', 1)}
            >
              <span className={`${styles.ring} ${b.live ? styles.ringLive : b.learnedToday ? styles.ringDone : ''}`}>
                <Avatar size="md" src={b.avatar ?? undefined} name={b.name} />
                {b.streakTogether > 0 && (
                  <span className={styles.streak} aria-label={`${b.streakTogether} days together`}>
                    <Glyph name="flame" size={10} strokeWidth={3} />
                    {b.streakTogether}
                  </span>
                )}
              </span>
              <span className={styles.faceName}>{first(b.name)}</span>
            </Link>
          </li>
        ))}
        {buddies.length < data.max && (
          <li>
            <Link href="/dashboard/network" className={styles.face} onClick={() => playSound('navTap', 2)}>
              <span className={styles.addRing} aria-hidden>
                <Glyph name="plus" size={18} strokeWidth={2.6} />
              </span>
              <span className={styles.faceName}>Add</span>
            </Link>
          </li>
        )}
      </ul>

      <NextAction data={data} myTurn={myTurn} />

      {squad && (
        <Link href="/dashboard/network" className={styles.squad} onClick={() => playSound('navTap', 3)}>
          <span className={styles.squadTop}>
            <span className={styles.squadName}>
              <Glyph name="users" size={14} strokeWidth={2.6} /> {squad.name}
            </span>
            <span className={styles.squadNum}>
              {squad.goalMet ? 'Chest ready' : `${squad.lessonsThisWeek}/${squad.weeklyGoal}`}
            </span>
          </span>
          <span className={styles.squadTrack}>
            <span
              className={`${styles.squadFill} ${squad.goalMet ? styles.squadDone : ''}`}
              style={{ width: `${Math.min(100, Math.round((squad.lessonsThisWeek / squad.weeklyGoal) * 100))}%` }}
            />
          </span>
        </Link>
      )}
    </section>
  );
}

/** The single most useful thing to do with your people right now. */
function NextAction({ data, myTurn }: { data: BuddiesPayload; myTurn: DuelSummary | null }) {
  const refresh = useRefreshNetwork();
  const [done, setDone] = React.useState<string | null>(null);
  const [busy, setBusy] = React.useState(false);

  const act = async (key: string, fn: () => Promise<unknown>) => {
    setBusy(true);
    playSound('toggleOn');
    playHaptic('light', false);
    try {
      await fn();
      setDone(key);
      void refresh();
    } catch {
      playSound('nodeLocked');
    } finally {
      setBusy(false);
    }
  };

  const request = data.incoming[0];
  if (request && done !== `accept:${request.id}`) {
    return (
      <div className={styles.action}>
        <Avatar size="sm" src={request.avatar ?? undefined} name={request.name} />
        <span className={styles.actionText}>
          <strong>{first(request.name)}</strong> wants to be your study buddy
        </span>
        <button type="button" className={styles.actionBtn} disabled={busy} onClick={() => void act(`accept:${request.id}`, () => requestBuddy(request.id))}>
          Accept
        </button>
      </div>
    );
  }

  if (myTurn) {
    return (
      <Link href={`/dashboard/network/duel/${myTurn.id}`} className={styles.action} onClick={() => playSound('select')}>
        <span className={`${styles.actionIcon} ${styles.iconDuel}`}>
          <Glyph name="bolt" size={16} strokeWidth={2.6} />
        </span>
        <span className={styles.actionText}>
          Your turn in a duel with <strong>{first(myTurn.other.name)}</strong>
        </span>
        <span className={styles.actionBtn}>Play</span>
      </Link>
    );
  }

  const live = data.buddies.find((b) => b.live);
  if (live) {
    return (
      <Link href="/dashboard" className={styles.action} onClick={() => playSound('start')}>
        <span className={`${styles.actionIcon} ${styles.iconLive}`}>
          <span className={styles.liveDot} />
        </span>
        <span className={styles.actionText}>
          <strong>{first(live.name)}</strong> is learning now{live.liveLesson ? ` · ${live.liveLesson}` : ''}
        </span>
        <span className={styles.actionBtn}>Join</span>
      </Link>
    );
  }

  const nudgeable = data.buddies.find((b) => b.canNudge);
  if (nudgeable) {
    const nudged = done === `nudge:${nudgeable.id}`;
    return (
      <div className={styles.action}>
        <span className={`${styles.actionIcon} ${styles.iconNudge}`}>
          <Glyph name="bellRing" size={16} strokeWidth={2.6} />
        </span>
        <span className={styles.actionText}>
          {nudged ? (
            <>
              Nudged <strong>{first(nudgeable.name)}</strong>. You&apos;ll hear if it works.
            </>
          ) : (
            <>
              <strong>{first(nudgeable.name)}</strong> hasn&apos;t learned today
            </>
          )}
        </span>
        {!nudged && (
          <button type="button" className={styles.actionBtn} disabled={busy} onClick={() => void act(`nudge:${nudgeable.id}`, () => nudgeBuddy(nudgeable.id))}>
            Nudge
          </button>
        )}
      </div>
    );
  }

  const allDone = data.buddies.length > 0 && data.buddies.every((b) => b.learnedToday);
  if (allDone) {
    return (
      <div className={`${styles.action} ${styles.actionCalm}`}>
        <span className={`${styles.actionIcon} ${styles.iconDone}`}>
          <Glyph name="checkCircle" size={16} strokeWidth={2.6} />
        </span>
        <span className={styles.actionText}>
          {data.meLearnedToday ? 'Everyone learned today. Nice.' : 'All your buddies learned today. Your turn.'}
        </span>
      </div>
    );
  }
  return null;
}
