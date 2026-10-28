'use client';

/**
 * This week's league, in the home rail — Duolingo's sidebar card, Teyro's way.
 *
 *   - the league's trophy, its name, and how long the week has left
 *   - the five rows around you (or the top five), with the promotion and
 *     demotion lines where they fall
 *   - one line that says what it takes: "12 XP to pass Grace", "You're in
 *     the promotion zone", "Earn 20 XP to get out of the demotion zone"
 *
 * Not in a league yet this week: one lesson puts you in. Reads the same
 * cached /api/leagues/me as the rest of the app.
 */

import React from 'react';
import Link from 'next/link';
import LeagueBadge from '@/components/leaderboard/LeagueBadge';
import useSWR from 'swr';
import { Glyph } from '@/components/art/Glyph';
import Avatar from '@/components/ui/Avatar';
import { useHydrated } from '@/components/studio/useHydrated';
import { fetcher } from '@/lib/swr';
import { playSound } from '@/lib/audio/lessonSounds';
import { formatWeekCountdown, getLeagueMeta, getNextLeague, type LeagueTier } from '@/lib/leagues';
import styles from './LeagueWidget.module.css';

interface Row {
  rank: number;
  userId: string;
  name: string | null;
  avatarUrl: string | null;
  weeklyXp: number;
  isMe: boolean;
}

interface MyLeague {
  league: LeagueTier;
  weekEndsAt: string;
  joined: boolean;
  myRank?: number | null;
  promotionCutoff?: number | null;
  demotionStartRank?: number | null;
  standings?: Row[];
}

const WINDOW = 5;
const first = (name: string | null) => (name ?? '').trim().split(/\s+/)[0] || 'Someone';

/** Five rows: around you, or the top five if you're near the top. */
export function windowAround(rows: Row[], myRank: number | null): Row[] {
  if (!myRank || myRank <= 3) return rows.slice(0, WINDOW);
  const start = Math.max(0, Math.min(myRank - 3, rows.length - WINDOW));
  return rows.slice(start, start + WINDOW);
}

export default function LeagueWidget() {
  const hydrated = useHydrated();
  const res = useSWR<MyLeague>('/api/leagues/me', fetcher, { revalidateOnFocus: true, dedupingInterval: 30_000 });
  const data = hydrated ? res.data : undefined;

  if (res.error && !data && hydrated) {
    return (
      <section className={styles.card} aria-label="Your league">
        <p className={styles.muted}>
          Couldn&apos;t load your league.{' '}
          <button type="button" className={styles.linkBtn} onClick={() => void res.mutate()}>
            Try again
          </button>
        </p>
      </section>
    );
  }

  if (!data) {
    return (
      <section className={styles.card} aria-busy="true" aria-label="Loading your league">
        <div className={styles.head}>
          <span className={`${styles.skel} ${styles.skelTrophy}`} />
          <span className={styles.skel} style={{ width: '50%' }} />
        </div>
        {[0, 1, 2].map((i) => (
          <span key={i} className={styles.skel} style={{ height: 32 }} />
        ))}
      </section>
    );
  }

  const meta = getLeagueMeta(data.league);
  const next = getNextLeague(meta.tier);
  const ends = formatWeekCountdown(data.weekEndsAt);

  const header = (
    <header className={styles.head}>
      <LeagueBadge tier={meta.tier} size="sm" priority />
      <span className={styles.headText}>
        <span className={styles.title}>{meta.name}</span>
        <span className={styles.ends}>
          <Glyph name="clock" size={12} strokeWidth={2.6} /> {ends} left
        </span>
      </span>
      <Link href="/dashboard/leaderboards" className={styles.view} onClick={() => playSound('navTap', 3)}>
        View
      </Link>
    </header>
  );

  if (!data.joined || !data.standings?.length) {
    return (
      <section className={styles.card} aria-label="Your league">
        {header}
        <p className={styles.muted}>
          Finish a lesson to join this week&apos;s league. {meta.zone}.
        </p>
        <Link href="/dashboard" className={styles.cta} onClick={() => playSound('start')}>
          Start a lesson
        </Link>
      </section>
    );
  }

  const rows = data.standings;
  const myRank = data.myRank ?? null;
  const me = rows.find((r) => r.isMe) ?? null;
  const cut = data.promotionCutoff ?? null;
  const demo = data.demotionStartRank ?? null;
  const shown = windowAround(rows, myRank);

  // The one line that says what to do.
  let status: { tone: 'up' | 'down' | 'even'; text: React.ReactNode };
  if (!me) status = { tone: 'even', text: 'Finish a lesson to climb.' };
  else if (cut !== null && me.rank <= cut) {
    status = {
      tone: 'up',
      text: next ? (
        <>
          You&apos;re in the promotion zone for <strong>{next.shortName}</strong>. Hold it.
        </>
      ) : (
        <>You&apos;re in the top spots. Hold them.</>
      ),
    };
  } else if (demo !== null && me.rank >= demo) {
    const safe = rows[demo - 2];
    const need = safe ? Math.max(1, safe.weeklyXp - me.weeklyXp + 1) : 1;
    status = {
      tone: 'down',
      text: (
        <>
          Earn <strong>{need} XP</strong> to leave the demotion zone.
        </>
      ),
    };
  } else {
    const above = rows[me.rank - 2];
    const need = above ? Math.max(1, above.weeklyXp - me.weeklyXp + 1) : 0;
    status = {
      tone: 'even',
      text: above ? (
        <>
          <strong>{need} XP</strong> to pass {first(above.name)}
          {cut !== null && me.rank === cut + 1 ? ' and reach the promotion zone' : ''}.
        </>
      ) : (
        <>Keep going.</>
      ),
    };
  }

  return (
    <section className={styles.card} aria-label="Your league">
      {header}

      <ol className={styles.rows}>
        {shown.map((r, i) => {
          const prev = shown[i - 1];
          const promoLine = cut !== null && prev && prev.rank === cut && r.rank === cut + 1;
          const demoLine = demo !== null && prev && prev.rank === demo - 1 && r.rank === demo;
          return (
            <React.Fragment key={r.userId}>
              {promoLine && <li className={`${styles.zone} ${styles.zoneUp}`}>Promotion zone</li>}
              {demoLine && <li className={`${styles.zone} ${styles.zoneDown}`}>Demotion zone</li>}
              <li className={`${styles.row} ${r.isMe ? styles.rowMe : ''}`}>
                <span className={`${styles.rank} ${r.rank <= 3 ? styles[`rank${r.rank}` as 'rank1'] : ''}`}>{r.rank}</span>
                <Avatar size="xs" src={r.avatarUrl ?? undefined} name={r.name ?? 'Learner'} />
                <span className={styles.name}>{r.isMe ? 'You' : first(r.name)}</span>
                <span className={styles.xp}>{r.weeklyXp} XP</span>
              </li>
            </React.Fragment>
          );
        })}
      </ol>

      <p className={`${styles.status} ${styles[`status_${status.tone}`]}`}>
        <Glyph name={status.tone === 'up' ? 'arrowUp' : status.tone === 'down' ? 'arrowDown' : 'trendUp'} size={14} strokeWidth={2.8} />
        <span>{status.text}</span>
      </p>
    </section>
  );
}
