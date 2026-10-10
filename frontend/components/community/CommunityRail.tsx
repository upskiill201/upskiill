'use client';

import React from 'react';
import Link from 'next/link';
import { Users, GraduationCap, Crown, Trophy } from 'lucide-react';
import Avatar from '@/components/ui/Avatar';
import ProfileLink from './ProfileLink';
import RankMedal from '@/components/leaderboard/RankMedal';
import type { CommunityOverview, LeaderboardBoard } from '@/lib/communityApi';
import shared from './community.module.css';
import styles from './CommunityRail.module.css';
import { courseHomeHref } from '@/lib/homeCourse';

interface CommunityRailProps {
  community: CommunityOverview;
  /** 30-day top 5. `undefined` = still loading, `null` = unavailable. */
  leaderboard: LeaderboardBoard | null | undefined;
  currentUserId?: string;
  /** Switches the page to the Leaderboards tab (and closes the mobile drawer). */
  onSeeLeaderboards: () => void;
}

/**
 * The community's right rail: who this room is, and who is carrying it.
 *
 * Rendered identically in the sticky desktop column and inside the mobile
 * drawer, so it owns no layout of its own beyond its cards.
 */
export default function CommunityRail({
  community,
  leaderboard,
  currentUserId,
  onSeeLeaderboards,
}: CommunityRailProps) {
  const adminCount = Math.max(1, community.membersPreview.filter((m) => m.isCreator).length);

  return (
    <>
      {/* ── About ── (the page header carries the cover, stats and faces) */}
      <section className={styles.card}>
        <h3 className={styles.cardTitle}>About</h3>
        {community.description && <p className={styles.description}>{community.description}</p>}
        {community.course?.instructor && (
          <div className={styles.creatorRow}>
            <Avatar src={community.course.instructor.avatarUrl ?? undefined} name={community.course.instructor.fullName} size="sm" />
            <span>
              Run by <strong>{community.course.instructor.fullName}</strong>
            </span>
          </div>
        )}
        {community.course && (
          <Link href={courseHomeHref(community.course.id)} className={styles.railLink}>
            <GraduationCap size={16} strokeWidth={2.5} /> Go to the course
          </Link>
        )}
        <div className={styles.rolePill}>
          {community.isModerator ? (
            <>
              <Crown size={15} strokeWidth={2.5} /> You teach this course
            </>
          ) : (
            <>
              <Users size={15} strokeWidth={2.5} /> You&apos;re a member · {adminCount} admin{adminCount === 1 ? '' : 's'}
            </>
          )}
        </div>
      </section>

      {/* ── Leaderboard (30-day) ──────────────────────────────────────────── */}
      <section className={styles.card}>
        <div className={styles.cardHead}>
          <h3 className={styles.cardTitle}>Leaderboard (30-day)</h3>
          <span className={styles.cardHint}>points</span>
        </div>

        {leaderboard === undefined ? (
          <div className={styles.railSkeleton}>
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className={shared.skeletonLine} />
            ))}
          </div>
        ) : leaderboard && leaderboard.entries.length > 0 ? (
          <>
            <div className={styles.rankList}>
              {leaderboard.entries.slice(0, 5).map((e) => (
                <div
                  key={e.userId}
                  className={`${styles.rankRow} ${e.userId === currentUserId ? styles.rankRowMe : ''}`}
                >
                  <RankMedal rank={e.rank} size={26} />
                  <ProfileLink userId={e.userId} label={`${e.fullName}'s profile`}>
                    <Avatar src={e.avatarUrl ?? undefined} name={e.fullName} size="xs" />
                  </ProfileLink>
                  <span className={styles.rankName}>
                    <ProfileLink userId={e.userId}>{e.fullName}</ProfileLink>
                  </span>
                  <span className={styles.rankPoints}>+{formatCount(e.points)}</span>
                </div>
              ))}
            </div>

            {/* Your own standing, even when you are nowhere near the top five —
                a board you can't find yourself on stops being motivating. */}
            <div className={styles.myRankRow}>
              <span>Your rank</span>
              <span>
                {leaderboard.me.rank
                  ? `#${leaderboard.me.rank} · +${formatCount(leaderboard.me.points)}`
                  : 'Not ranked yet'}
              </span>
            </div>

            <button type="button" className={styles.seeAll} onClick={onSeeLeaderboards}>
              See all leaderboards
            </button>
          </>
        ) : (
          <>
            <p className={styles.emptyRail}>
              <Trophy size={15} style={{ verticalAlign: '-2px', marginRight: 6 }} />
              No points scored yet. Post, answer a question, or get a like — the first board is
              yours to take.
            </p>
            <button type="button" className={styles.seeAll} onClick={onSeeLeaderboards}>
              How points work
            </button>
          </>
        )}
      </section>
    </>
  );
}

/** 15500 → "15.5k" — the rail is 328px wide and long numbers wrap it. */
export function formatCount(n: number): string {
  if (n < 1000) return String(n);
  if (n < 1_000_000) {
    const k = n / 1000;
    return `${k >= 10 ? Math.round(k) : k.toFixed(1).replace(/\.0$/, '')}k`;
  }
  return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, '')}m`;
}
