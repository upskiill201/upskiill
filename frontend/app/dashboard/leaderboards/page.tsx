'use client';

/**
 * LEADERBOARDS — the weekly Duolingo-style league screen. Big league badge,
 * the full ladder strip, a live week countdown, and the cohort standings with
 * promotion/demotion zones. Settlement results play as a full-page LEAGUE
 * celebration scene via LeagueResultWatcher (mounted in the dashboard layout).
 */

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, RefreshCw, ShieldAlert, ShieldCheck, Trophy } from 'lucide-react';
import Avatar from '@/components/ui/Avatar';
import CosmeticFrame from '@/components/cosmetics/CosmeticFrame';
import LeagueBadge from '@/components/leaderboard/LeagueBadge';
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
  standings: LeaderboardRow[];
}

const RANK_MEDAL_COLORS: Record<number, string> = {
  1: '#EDB514', // gold
  2: '#98A2AE', // silver
  3: '#B4713E', // bronze
};

export default function LeaderboardsPage() {
  const [data, setData] = useState<MyLeaderboard | null>(null);
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
  }, [refresh]);

  // Live countdown — tick every second under a day, every 30s otherwise.
  useEffect(() => {
    if (!data) return;
    const remaining = new Date(data.weekEndsAt).getTime() - now;
    const interval = setInterval(() => setNow(Date.now()), remaining < 86_400_000 ? 1000 : 30_000);
    return () => clearInterval(interval);
  }, [data, now]);

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
      <Link href="/dashboard" className={styles.backLink}>
        <ArrowLeft size={15} strokeWidth={2.8} />
        Back to Dashboard
      </Link>

      {loading ? (
        <LoadingState />
      ) : error ? (
        <ErrorState message={error} onRetry={() => void refresh()} />
      ) : data && meta ? (
        <>
          {/* ── League badge + ladder strip ─────────────────────────────── */}
          <header className={styles.header}>
            <LeagueBadge tier={data.league} size="xl" className={styles.heroBadge} />
            <h1 className={styles.title}>{meta.name}</h1>
            {data.tournamentWins > 0 && (
              <p className={styles.tournamentWins}>
                <Trophy size={13} strokeWidth={2.6} />
                {data.tournamentWins} {data.tournamentWins === 1 ? 'win' : 'wins'}
              </p>
            )}

            <div className={styles.ladderStrip} aria-label="League ladder">
              {LEAGUE_LADDER.map((l) => (
                <LeagueBadge
                  key={l.tier}
                  tier={l.tier}
                  size="xs"
                  locked={l.tier !== data.league}
                  className={l.tier === data.league ? styles.currentRung : undefined}
                />
              ))}
            </div>
          </header>

          {/* ── Week status line ──────────────────────────────────────────── */}
          <section className={styles.weekStatus} aria-live="polite">
            {data.joined ? (
              <>
                <p className={styles.zoneLine}>{meta.zone}</p>
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

          {/* ── Standings ─────────────────────────────────────────────────── */}
          <section className={styles.board} aria-label="Weekly standings">
            {data.joined && data.standings.length > 0 ? (
              <>
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
                      <div
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
                        <span
                          className={styles.rank}
                          style={
                            RANK_MEDAL_COLORS[row.rank]
                              ? { backgroundColor: RANK_MEDAL_COLORS[row.rank] }
                              : undefined
                          }
                        >
                          {row.rank}
                        </span>
                        <CosmeticFrame userId={row.userId} thickness={2}>
                          <Avatar src={row.avatarUrl ?? undefined} name={row.name} size="sm" />
                        </CosmeticFrame>
                        <span className={styles.name}>{row.name}</span>
                        <span className={styles.xp}>
                          <strong>{row.weeklyXp.toLocaleString()}</strong> XP
                        </span>
                      </div>
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
              </>
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
              <span className={styles.rank} style={data.myRank && RANK_MEDAL_COLORS[data.myRank]
                ? { backgroundColor: RANK_MEDAL_COLORS[data.myRank] }
                : undefined}>
                {data.myRank ?? '–'}
              </span>
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
