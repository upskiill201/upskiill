'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Lock, Users, GraduationCap, Crown, Trophy } from 'lucide-react';
import Avatar from '@/components/ui/Avatar';
import type { CommunityOverview, LeaderboardBoard } from '@/lib/communityApi';
import shared from './community.module.css';
import styles from './CommunityRail.module.css';

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
  const thumb = community.course?.thumbnailUrl;
  const adminCount = Math.max(1, community.membersPreview.filter((m) => m.isCreator).length);

  return (
    <>
      {/* ── About ─────────────────────────────────────────────────────────── */}
      <section className={styles.card}>
        <div className={styles.cover}>
          {thumb ? (
            <Image src={thumb} alt="" fill className={styles.coverImg} sizes="328px" />
          ) : (
            <div className={styles.coverFallback}>{community.name.charAt(0).toUpperCase()}</div>
          )}
        </div>

        <div className={styles.aboutBody}>
          <h2 className={styles.name}>{community.name}</h2>
          <span className={styles.visibility}>
            <Lock size={13} /> Members of this course
          </span>

          {community.description && <p className={styles.description}>{community.description}</p>}

          {community.course && (
            <Link href={`/learn/${community.course.id}`} className={styles.railLink}>
              <GraduationCap size={15} /> Go to the course
            </Link>
          )}

          <div className={styles.statStrip}>
            <div className={styles.stat}>
              <span className={styles.statValue}>{formatCount(community.stats.totalMembers)}</span>
              <span className={styles.statLabel}>Members</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statValue}>{formatCount(community.stats.totalPosts)}</span>
              <span className={styles.statLabel}>Posts</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statValue}>{adminCount}</span>
              <span className={styles.statLabel}>Admins</span>
            </div>
          </div>

          {community.membersPreview.length > 0 && (
            <div className={styles.facepile}>
              {community.membersPreview.slice(0, 8).map((m) => (
                <Avatar key={m.id} src={m.avatarUrl ?? undefined} name={m.fullName} size="sm" />
              ))}
            </div>
          )}

          <div className={styles.rolePill}>
            {community.isModerator ? (
              <>
                <Crown size={15} /> You teach this course
              </>
            ) : (
              <>
                <Users size={15} /> You’re a member
              </>
            )}
          </div>
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
                  <span className={`${styles.rankBadge} ${podiumClass(e.rank)}`}>{e.rank}</span>
                  <Avatar src={e.avatarUrl ?? undefined} name={e.fullName} size="xs" />
                  <span className={styles.rankName}>{e.fullName}</span>
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

function podiumClass(rank: number): string {
  if (rank === 1) return styles.rank1;
  if (rank === 2) return styles.rank2;
  if (rank === 3) return styles.rank3;
  return '';
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
