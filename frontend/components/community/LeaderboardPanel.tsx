'use client';

/**
 * A community's Leaderboards tab — Duolingo's board with Skool's levels:
 *
 *   your level card (avatar in its level ring, points to level up)
 *   a week / month / all-time switch
 *   the podium (top 3 on medals), then everyone else, you highlighted
 *   the level ladder, and how points are earned
 *
 * Community points are a different currency from platform XP — XP measures
 * learning, points measure showing up for other learners — so the scoring is
 * spelled out on the page. Cached by SWR (the hero's level chip reads the
 * same key), so switching tabs back is instant.
 */

import React, { useState } from 'react';
import Image from 'next/image';
import useSWR from 'swr';
import { AlertCircle, Lock } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import Avatar from '@/components/ui/Avatar';
import Button from '@/components/ui/Button';
import RankMedal from '@/components/leaderboard/RankMedal';
import { fetcher } from '@/lib/swr';
import { playSound } from '@/lib/audio/lessonSounds';
import { playHaptic } from '@/lib/haptics';
import type { LeaderboardBoard, LeaderboardBundle, LeaderboardEntry } from '@/lib/communityApi';
import { formatCount } from './CommunityRail';
import ProfileLink from './ProfileLink';
import PostTypeArt from './PostTypeArt';
import shared from './community.module.css';
import styles from './LeaderboardPanel.module.css';

export const leaderboardsKey = (communityId: string) => `/api/community/${communityId}/leaderboards`;

type Window = 'weekly' | 'monthly' | 'allTime';

const WINDOWS: { key: Window; label: string; hint: string }[] = [
  { key: 'weekly', label: 'This week', hint: 'Points earned in the last 7 days' },
  { key: 'monthly', label: 'This month', hint: 'Points earned in the last 30 days' },
  { key: 'allTime', label: 'All time', hint: 'Every point since day one' },
];

interface LeaderboardPanelProps {
  communityId: string;
  currentUserId?: string;
  currentUserName?: string;
  currentUserAvatarUrl?: string | null;
}

export default function LeaderboardPanel({
  communityId,
  currentUserId,
  currentUserName,
  currentUserAvatarUrl,
}: LeaderboardPanelProps) {
  const { data: bundle, error, mutate } = useSWR<LeaderboardBundle>(leaderboardsKey(communityId), fetcher, {
    revalidateOnFocus: false,
  });
  const [win, setWin] = useState<Window>('weekly');

  if (error && !bundle) {
    return (
      <div className={shared.errorBanner}>
        <AlertCircle size={26} />
        <span>{error instanceof Error ? error.message : 'Could not load the leaderboards.'}</span>
        <Button variant="outline" onClick={() => void mutate()}>
          Try again
        </Button>
      </div>
    );
  }

  if (!bundle) {
    return (
      <div className={styles.panel} aria-busy="true" aria-label="Loading leaderboards">
        <div className={`${styles.skeleton} ${styles.skeletonLevel}`} />
        <div className={`${styles.skeleton} ${styles.skeletonPodium}`} />
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className={`${styles.skeleton} ${styles.skeletonRow}`} />
        ))}
      </div>
    );
  }

  const { me, levels } = bundle;
  const board = bundle[win];
  const meta = WINDOWS.find((w) => w.key === win)!;
  const nextRung = levels.find((l) => l.level === me.level + 1);

  return (
    <div className={styles.panel}>
      {/* ── Your level ─────────────────────────────────────────────────── */}
      <section className={styles.levelCard} aria-label="Your community level">
        <div
          className={styles.ring}
          style={{ ['--ring-progress' as string]: me.levelProgress }}
          role="img"
          aria-label={`Level ${me.level}, ${Math.round(me.levelProgress * 100)}% to the next level`}
        >
          <div className={styles.ringInner}>
            <Avatar src={currentUserAvatarUrl ?? undefined} name={currentUserName ?? 'You'} size="xl" />
          </div>
          <span className={styles.levelBadge}>{me.level}</span>
        </div>
        <div className={styles.levelText}>
          <span className={styles.levelEyebrow}>Level {me.level}</span>
          <h2 className={styles.levelName}>{me.levelName}</h2>
          <span className={styles.levelTrack}>
            <span className={styles.levelFill} style={{ width: `${Math.round(me.levelProgress * 100)}%` }} />
          </span>
          <span className={styles.toNext}>
            {me.pointsToNextLevel === null ? (
              <>Top of the ladder · {formatCount(me.points)} points</>
            ) : (
              <>
                <b>{formatCount(me.pointsToNextLevel)}</b> point{me.pointsToNextLevel === 1 ? '' : 's'} to{' '}
                {nextRung ? nextRung.name : `Level ${me.level + 1}`}
              </>
            )}
          </span>
        </div>
      </section>

      {/* ── Board ──────────────────────────────────────────────────────── */}
      <section className={styles.boardCard} aria-label="Leaderboard">
        <div className={styles.switch} role="tablist" aria-label="Leaderboard window">
          {WINDOWS.map((w, i) => (
            <button
              key={w.key}
              type="button"
              role="tab"
              aria-selected={win === w.key}
              className={`${styles.switchBtn} ${win === w.key ? styles.switchOn : ''}`}
              onClick={() => {
                if (win === w.key) return;
                playSound('navTap', i);
                playHaptic('selection', false);
                setWin(w.key);
              }}
            >
              {w.label}
            </button>
          ))}
        </div>
        <p className={styles.boardHint}>{meta.hint}</p>

        <BoardView key={win} board={board} currentUserId={currentUserId} />
      </section>

      {/* ── Levels ─────────────────────────────────────────────────────── */}
      <section className={styles.ladderCard} aria-label="Community levels">
        <h3 className={styles.cardTitle}>Levels</h3>
        <div className={styles.ladder}>
          {levels.map((rung) => {
            const reached = me.level >= rung.level;
            const current = me.level === rung.level;
            return (
              <div key={rung.level} className={`${styles.rung} ${current ? styles.rungCurrent : ''}`}>
                <span
                  className={`${styles.rungIcon} ${current ? styles.rungIconCurrent : reached ? styles.rungIconReached : ''}`}
                >
                  {reached ? rung.level : <Lock size={14} strokeWidth={2.75} />}
                </span>
                <div className={styles.rungBody}>
                  <div className={`${styles.rungName} ${reached ? '' : styles.rungNameLocked}`}>{rung.name}</div>
                  <div className={styles.rungMeta}>
                    {rung.unlocks && !reached ? <span className={styles.rungUnlock}>{rung.unlocks} · </span> : null}
                    {rung.memberPct}% of members
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── How points work ────────────────────────────────────────────── */}
      <section className={styles.scoring} aria-label="How community points work">
        <h3 className={styles.cardTitle}>How to earn points</h3>
        <ul className={styles.scoringList}>
          <li className={styles.scoringItem}>
            <PostTypeArt postType="DISCUSSION" size={28} /> <span>Write a post</span> <b>+3</b>
          </li>
          <li className={styles.scoringItem}>
            <Image src="/art/ui/comment.svg" alt="" width={28} height={28} /> <span>Leave a comment</span> <b>+1</b>
          </li>
          <li className={styles.scoringItem}>
            <Image src="/art/ui/like.svg" alt="" width={28} height={28} /> <span>Someone likes your post</span> <b>+2</b>
          </li>
          <li className={styles.scoringItem}>
            <Image src="/art/ui/like.svg" alt="" width={28} height={28} /> <span>Someone likes your comment</span> <b>+1</b>
          </li>
        </ul>
      </section>
    </div>
  );
}

function BoardView({ board, currentUserId }: { board: LeaderboardBoard; currentUserId?: string }) {
  const reducedMotion = useReducedMotion();
  if (board.entries.length === 0) {
    return (
      <div className={styles.boardEmpty}>
        <Image src="/art/ui/medal-1.svg" alt="" width={64} height={64} />
        <p>Nobody has scored here yet.</p>
        <span>Post, comment or help someone and the top spot is yours.</span>
      </div>
    );
  }

  const podium = board.entries.slice(0, 3);
  const rest = board.entries.slice(3);
  const meListed = board.entries.some((e) => e.userId === currentUserId);
  // Duolingo's podium order: 2nd · 1st · 3rd.
  const order = [podium[1], podium[0], podium[2]].filter(Boolean) as LeaderboardEntry[];

  return (
    <>
      <div className={styles.podium}>
        {order.map((e, i) => (
          <motion.div
            key={e.userId}
            className={`${styles.podiumCol} ${e.rank === 1 ? styles.podiumFirst : ''} ${e.userId === currentUserId ? styles.podiumMe : ''}`}
            initial={reducedMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 380, damping: 24, delay: i * 0.06 }}
          >
            <ProfileLink userId={e.userId === currentUserId ? null : e.userId} label={`${e.fullName}'s profile`}>
              <span className={styles.podiumAvatar}>
                <Avatar src={e.avatarUrl ?? undefined} name={e.fullName} size={e.rank === 1 ? 'xl' : 'lg'} />
              </span>
            </ProfileLink>
            <RankMedal rank={e.rank} size={e.rank === 1 ? 40 : 34} />
            <span className={styles.podiumName}>{e.userId === currentUserId ? 'You' : e.fullName.split(' ')[0]}</span>
            <span className={styles.podiumPoints}>{formatCount(e.points)} pts</span>
          </motion.div>
        ))}
      </div>

      {rest.length > 0 && (
        <div className={styles.rows}>
          {rest.map((e) => (
            <Row key={e.userId} e={e} me={e.userId === currentUserId} />
          ))}
        </div>
      )}

      {/* You, even when you're not on the visible board. */}
      {!meListed && board.me.rank !== null && (
        <div className={`${styles.row} ${styles.rowMe} ${styles.rowPinned}`}>
          <RankMedal rank={board.me.rank} size={32} />
          <span className={styles.name}>You</span>
          <span className={styles.points}>{formatCount(board.me.points)} pts</span>
        </div>
      )}
      {!meListed && board.me.rank === null && (
        <p className={styles.notRanked}>
          Earn your first point{board.window === '7d' ? ' this week' : board.window === '30d' ? ' this month' : ''} to join the board.
        </p>
      )}
    </>
  );
}

function Row({ e, me }: { e: LeaderboardEntry; me: boolean }) {
  return (
    <div className={`${styles.row} ${me ? styles.rowMe : ''}`}>
      <RankMedal rank={e.rank} size={32} />
      <ProfileLink userId={me ? null : e.userId} label={`${e.fullName}'s profile`}>
        <Avatar src={e.avatarUrl ?? undefined} name={e.fullName} size="md" />
      </ProfileLink>
      <span className={styles.name}>
        {me ? 'You' : <ProfileLink userId={e.userId}>{e.fullName}</ProfileLink>}
        {e.isCreator && <span className={styles.creatorTag}>Creator</span>}
      </span>
      <span className={styles.points}>{formatCount(e.points)} pts</span>
    </div>
  );
}
