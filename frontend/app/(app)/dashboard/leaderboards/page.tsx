'use client';

/**
 * LEADERBOARDS — the weekly Duolingo-style league screen. Big league badge,
 * the full ladder strip, a live week countdown, and the cohort standings with
 * promotion/demotion zones. Settlement results play as a full-page LEAGUE
 * celebration scene via LeagueResultWatcher (mounted in the dashboard layout).
 *
 * Live: re-reads every 30s and on returning to the tab, and rows glide to
 * their new places when the order changes. Arrows mark who moved since the
 * learner last looked; the "your race" card says exactly what to beat next.
 */

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { LayoutGroup, motion, useReducedMotion } from 'framer-motion';
import { ChevronDown, ChevronUp, RefreshCw, ShieldAlert, ShieldCheck, Trophy, Users } from 'lucide-react';
import Avatar from '@/components/ui/Avatar';
import CosmeticFrame from '@/components/cosmetics/CosmeticFrame';
import LeagueBadge from '@/components/leaderboard/LeagueBadge';
import RankMedal from '@/components/leaderboard/RankMedal';
import ProfileLink from '@/components/community/ProfileLink';
import Button from '@/components/ui/Button';
import { playHaptic } from '@/lib/haptics';
import {
  LEAGUE_LADDER,
  formatWeekCountdown,
  getLeagueMeta,
  type LeagueTier,
} from '@/lib/leagues';
import styles from './Leaderboards.module.css';

// ─── Types (mirror of backend LeagueService responses) ──────────────────────

interface LeaderboardRow {
  rank: number;
  userId: string;
  name: string;
  avatarUrl: string | null;
  weeklyXp: number;
  isMe: boolean;
  /** The member's own tier — shared boards mix tiers. */
  league?: LeagueTier;
}

interface MyLeaderboard {
  weekStart: string;
  weekEndsAt: string;
  league: LeagueTier;
  tournamentWins: number;
  joined: boolean;
  myRank: number | null;
  promotionCutoff: number | null;
  demotionStartRank: number | null;
  cohortSize: number;
  /** Everyone active this week shares one board (see backend league.config). */
  shared?: boolean;
  standings: LeaderboardRow[];
}

/** Ranks from the learner's last visit — where the movement arrows come from. */
const LAST_VISIT_KEY = 'teyro:leaderboard-last-visit';
const REFRESH_MS = 30_000;

function readLastVisit(weekStart: string): Record<string, number> {
  try {
    const raw = localStorage.getItem(LAST_VISIT_KEY);
    const saved = raw ? (JSON.parse(raw) as { weekStart: string; ranks: Record<string, number> }) : null;
    return saved?.weekStart === weekStart ? saved.ranks : {};
  } catch {
    return {};
  }
}

export default function LeaderboardsPage() {
  const reducedMotion = useReducedMotion();
  const [data, setData] = useState<MyLeaderboard | null>(null);
  // Ranks as they were on the previous visit (captured once per load), then
  // this visit's ranks are saved for next time.
  const [lastVisit, setLastVisit] = useState<Record<string, number> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [now, setNow] = useState(() => Date.now());
  // The pinned "you" bar only exists while your in-list row is scrolled out of
  // view — with a short board it would just duplicate your row and overlap the
  // zone dividers.
  const meRowRef = useRef<HTMLDivElement | null>(null);
  const [meRowVisible, setMeRowVisible] = useState(true);

  const refresh = useCallback(async () => {
    setError(null);
    try {
      const res = await fetch('/api/leagues/me', { credentials: 'include' });
      if (!res.ok) throw new Error(`Request failed (${res.status})`);
      setData(await res.json());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not load the leaderboard.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
    // Live board: a rival's XP moves ranks while you watch.
    const timer = setInterval(() => {
      if (document.visibilityState === 'visible') void refresh();
    }, REFRESH_MS);
    const onVisible = () => {
      if (document.visibilityState === 'visible') void refresh();
    };
    document.addEventListener('visibilitychange', onVisible);
    return () => {
      clearInterval(timer);
      document.removeEventListener('visibilitychange', onVisible);
    };
  }, [refresh]);

  // First data of this visit: remember the last visit's ranks for the
  // arrows, and save this visit's for next time.
  useEffect(() => {
    if (!data?.joined || lastVisit !== null) return;
    const previous = readLastVisit(data.weekStart);
    try {
      localStorage.setItem(
        LAST_VISIT_KEY,
        JSON.stringify({ weekStart: data.weekStart, ranks: Object.fromEntries(data.standings.map((r) => [r.userId, r.rank])) }),
      );
    } catch {
      // Storage blocked — no arrows, nothing else changes.
    }
    queueMicrotask(() => setLastVisit(previous));
  }, [data, lastVisit]);

  // Live countdown — tick every second under a day, every 30s otherwise.
  //
  // PERF: this used to be a setInterval with `now` in its dependency array.
  // Because the interval is what sets `now`, every single tick invalidated the
  // effect, tore the interval down and built a new one — 60 teardown/rebuild
  // cycles a minute on a page that is already animating a leaderboard.
  //
  // A self-rescheduling timeout keeps the exact same behaviour, including
  // speeding up from 30s to 1s when the week drops under a day remaining
  // (the cadence is recomputed on each tick), but depends only on `data`.
  useEffect(() => {
    if (!data) return;
    const endsAt = new Date(data.weekEndsAt).getTime();
    const cadence = (from: number) => (endsAt - from < 86_400_000 ? 1000 : 30_000);

    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      const current = Date.now();
      setNow(current);
      timer = setTimeout(tick, cadence(current));
    };

    timer = setTimeout(tick, cadence(Date.now()));
    return () => clearTimeout(timer);
  }, [data]);

  // Track whether my row is on screen → pinned "you" bar visibility.
  useEffect(() => {
    const el = meRowRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(
      ([entry]) => setMeRowVisible(entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [data]);

  const meta = data ? getLeagueMeta(data.league) : null;
  const countdown = data ? formatWeekCountdown(data.weekEndsAt, now) : '';

  return (
    <div className={styles.page}>
      {loading ? (
        <LoadingState />
      ) : error ? (
        <ErrorState message={error} onRetry={() => void refresh()} />
      ) : data && meta ? (
        <>
          {/* ── League badge + ladder strip ─────────────────────────────── */}
          <header className={styles.header}>
            <LeagueBadge tier={data.league} size="xl" className={styles.heroBadge} priority />
            <h1 className={styles.title}>{meta.name}</h1>
            {data.tournamentWins > 0 && (
              <p className={styles.tournamentWins}>
                <Trophy size={13} strokeWidth={2.6} />
                {data.tournamentWins} {data.tournamentWins === 1 ? 'win' : 'wins'}
              </p>
            )}

            <div className={styles.ladderStrip} aria-label="League ladder">
              {/* Leagues you've climbed through keep their colour; the ones
                  ahead stay locked — Duolingo's ladder. */}
              {LEAGUE_LADDER.map((l, i) => {
                const mine = LEAGUE_LADDER.findIndex((x) => x.tier === data.league);
                return (
                  <LeagueBadge
                    key={l.tier}
                    tier={l.tier}
                    size="xs"
                    locked={i > mine}
                    className={i === mine ? styles.currentRung : i < mine ? styles.passedRung : undefined}
                  />
                );
              })}
            </div>
          </header>

          {/* ── Week status line ──────────────────────────────────────────── */}
          <section className={styles.weekStatus} aria-live="polite">
            {data.joined ? (
              <>
                <p className={styles.zoneLine}>
                  {data.promotionCutoff ? `Top ${data.promotionCutoff} advance to the next league` : meta.zone}
                </p>
                <p className={styles.countdown}>{countdown} remaining</p>
              </>
            ) : (
              <>
                <p className={styles.zoneLine}>
                  Complete a lesson to join this week&apos;s leaderboard
                </p>
                <Link href="/dashboard" className={styles.startCta}>
                  START A LESSON
                </Link>
              </>
            )}
          </section>

          {data.joined && data.myRank !== null && <YourRace data={data} />}

          {data.shared && data.joined && (
            <p className={styles.sharedNote}>
              <Users size={15} strokeWidth={2.6} />
              Teyro is growing — this week everyone active races on one board. You move up or down from your own league.
            </p>
          )}

          {/* ── Standings ─────────────────────────────────────────────────── */}
          <section className={styles.board} aria-label="Weekly standings">
            {data.joined && data.standings.length > 0 ? (
              <LayoutGroup>
                {data.standings.map((row) => {
                  const inPromotion =
                    data.promotionCutoff !== null && row.rank <= data.promotionCutoff;
                  const inDemotion =
                    data.demotionStartRank !== null && row.rank >= data.demotionStartRank;
                  return (
                    <React.Fragment key={row.userId}>
                      {/* Zone dividers render just before their first row */}
                      {data.demotionStartRank === row.rank && (
                        <ZoneDivider
                          kind="demotion"
                          label="DEMOTION ZONE"
                          icon={<ShieldAlert size={13} strokeWidth={2.6} />}
                        />
                      )}
                      <motion.div
                        layout={!reducedMotion}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        ref={row.isMe ? meRowRef : undefined}
                        className={[
                          styles.row,
                          inPromotion ? styles.rowPromo : '',
                          inDemotion ? styles.rowDemotion : '',
                          row.isMe ? styles.rowMe : '',
                        ]
                          .filter(Boolean)
                          .join(' ')}
                      >
                        <RankMedal rank={row.rank} zone={inPromotion ? 'promo' : inDemotion ? 'demotion' : null} />
                        <ProfileLink userId={row.isMe ? null : row.userId} label={`${row.name}'s profile`}>
                          <CosmeticFrame userId={row.userId} thickness={2}>
                            <Avatar src={row.avatarUrl ?? undefined} name={row.name} size="md" />
                          </CosmeticFrame>
                        </ProfileLink>
                        <span className={styles.name}>
                          {row.isMe ? row.name : <ProfileLink userId={row.userId}>{row.name}</ProfileLink>}
                        </span>
                        {data.shared && row.league && <LeagueBadge tier={row.league} size="xs" />}
                        <Movement from={lastVisit?.[row.userId]} to={row.rank} />
                        <span className={styles.xp}>
                          {row.weeklyXp.toLocaleString()} XP
                        </span>
                      </motion.div>
                      {data.promotionCutoff === row.rank && (
                        <ZoneDivider
                          kind="promotion"
                          label="PROMOTION ZONE"
                          icon={<ShieldCheck size={13} strokeWidth={2.6} />}
                        />
                      )}
                    </React.Fragment>
                  );
                })}
              </LayoutGroup>
            ) : data.joined ? (
              <EmptyBoard />
            ) : (
              // Duolingo shows grayed placeholder rows before you join.
              <div aria-hidden>
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className={styles.skeletonRow}>
                    <span className={styles.skeletonRank} />
                    <span className={styles.skeletonAvatar} />
                    <span
                      className={styles.skeletonName}
                      style={{ width: `${34 + ((i * 13) % 30)}%` }}
                    />
                    <span className={styles.skeletonXp} />
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* ── Pinned "you" bar — only while my row is scrolled out of view ─ */}
          {data.joined && data.standings.length > 0 && !meRowVisible && (
            <div className={styles.meBar} aria-label="Your standing">
              <RankMedal rank={data.myRank} />
              <Avatar
                src={data.standings.find((s) => s.isMe)?.avatarUrl ?? undefined}
                name={data.standings.find((s) => s.isMe)?.name ?? 'You'}
                size="sm"
              />
              <span className={styles.name}>You</span>
              <span className={styles.xp}>
                <strong>
                  {data.standings.find((s) => s.isMe)?.weeklyXp.toLocaleString() ?? 0}
                </strong>{' '}
                XP
              </span>
            </div>
          )}

          <p className={styles.weekRange}>{formatWeekRange(data.weekStart)}</p>
        </>
      ) : null}
    </div>
  );
}

// ─── Pieces ──────────────────────────────────────────────────────────────────

/** ▲2 / ▼1 since the learner's last visit — how the board moved without them. */
function Movement({ from, to }: { from: number | undefined; to: number }) {
  if (from === undefined || from === to) return null;
  const up = to < from;
  return (
    <span
      className={styles.movement}
      style={{ color: up ? 'var(--success-green)' : 'var(--error-red)' }}
      aria-label={`${up ? 'Up' : 'Down'} ${Math.abs(from - to)} since your last visit`}
    >
      {up ? <ChevronUp size={14} strokeWidth={3} /> : <ChevronDown size={14} strokeWidth={3} />}
      {Math.abs(from - to)}
    </span>
  );
}

/**
 * The learner's race in one card: where they are, the XP it takes to pass
 * the next person, and how far promotion (or safety) is.
 */
function YourRace({ data }: { data: MyLeaderboard }) {
  const me = data.standings.find((r) => r.isMe);
  if (!me || data.myRank === null) return null;
  const above = data.standings.find((r) => r.rank === data.myRank! - 1);
  const inPromo = data.promotionCutoff !== null && data.myRank <= data.promotionCutoff;
  const inDanger = data.demotionStartRank !== null && data.myRank >= data.demotionStartRank;
  const cutoffRow = data.promotionCutoff !== null ? data.standings.find((r) => r.rank === data.promotionCutoff) : undefined;

  const headline = inPromo
    ? "You're in the promotion zone"
    : inDanger
      ? "You're in the demotion zone"
      : `You're #${data.myRank} this week`;
  const detail = above
    ? `${above.weeklyXp - me.weeklyXp + 1} XP to pass ${above.name.split(' ')[0]}`
    : 'Everyone is chasing you — keep your lead.';
  const zoneLine = inPromo
    ? 'Stay here until the week ends to move up a league.'
    : cutoffRow
      ? `${Math.max(1, cutoffRow.weeklyXp - me.weeklyXp + 1)} XP to reach the promotion zone`
      : null;

  return (
    <section
      className={styles.yourRace}
      data-tone={inPromo ? 'promo' : inDanger ? 'danger' : 'neutral'}
      aria-label="Your race this week"
    >
      <span className={styles.yourRaceRank}>#{data.myRank}</span>
      <span className={styles.yourRaceText}>
        <strong>{headline}</strong>
        <span>{detail}</span>
        {zoneLine && <span>{zoneLine}</span>}
      </span>
      {!inPromo && (
        <Link href="/dashboard" className={styles.yourRaceCta} onClick={() => playHaptic('light')}>
          Earn XP
        </Link>
      )}
    </section>
  );
}

function ZoneDivider({
  kind,
  label,
  icon,
}: {
  kind: 'promotion' | 'demotion';
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <div className={`${styles.zoneDivider} ${kind === 'promotion' ? styles.zonePromo : styles.zoneDemotion}`}>
      <span className={styles.zoneLine2} />
      <span className={styles.zoneLabel}>
        {icon}
        {label}
      </span>
      <span className={styles.zoneLine2} />
    </div>
  );
}

function EmptyBoard() {
  return (
    <div className={styles.emptyBoard}>
      <Trophy size={28} strokeWidth={2} />
      <p>You&apos;re the first one in this week&apos;s cohort.</p>
      <p className={styles.emptyHint}>Earn XP to set the pace — others will join as they learn.</p>
    </div>
  );
}

function formatWeekRange(weekStart: string): string {
  const start = new Date(weekStart + 'T00:00:00Z');
  const end = new Date(start.getTime() + 6 * 86_400_000);
  const opts: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', timeZone: 'UTC' };
  return `${start.toLocaleDateString('en-US', opts)} – ${end.toLocaleDateString('en-US', opts)}`;
}

function LoadingState() {
  return (
    <div aria-busy="true" aria-label="Loading leaderboard">
      <div className={styles.skeletonHero} />
      <div className={styles.skeletonTitle} />
      <div className={styles.skeletonStrip} />
      <div aria-hidden>
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className={styles.skeletonRow}>
            <span className={styles.skeletonRank} />
            <span className={styles.skeletonAvatar} />
            <span
              className={styles.skeletonName}
              style={{ width: `${34 + ((i * 13) % 30)}%` }}
            />
            <span className={styles.skeletonXp} />
          </div>
        ))}
      </div>
    </div>
  );
}

function ErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className={styles.errorState} role="alert">
      <ShieldAlert size={30} strokeWidth={2} />
      <p>{message}</p>
      <Button
        variant="primary"
        size="md"
        leftIcon={<RefreshCw size={16} />}
        onClick={() => {
          playHaptic('light');
          onRetry();
        }}
      >
        Try again
      </Button>
    </div>
  );
}
