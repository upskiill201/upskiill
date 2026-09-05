'use client';

import React from 'react';
import { Lock, AlertCircle, ThumbsUp, MessageSquare, PenLine, Heart } from 'lucide-react';
import Avatar from '@/components/ui/Avatar';
import Button from '@/components/ui/Button';
import {
  getLeaderboards,
  type LeaderboardBoard,
  type LeaderboardBundle,
} from '@/lib/communityApi';
import { formatCount } from './CommunityRail';
import shared from './community.module.css';
import styles from './LeaderboardPanel.module.css';

interface LeaderboardPanelProps {
  communityId: string;
  currentUserId?: string;
  currentUserName?: string;
  currentUserAvatarUrl?: string | null;
}

/**
 * The Leaderboards tab: the learner's community level card over the 7-day,
 * 30-day and all-time boards.
 *
 * Community points are deliberately a different currency from platform XP —
 * XP measures learning, points measure showing up for other learners — so the
 * scoring is spelled out on the page rather than left to be reverse-engineered.
 */
export default function LeaderboardPanel({
  communityId,
  currentUserId,
  currentUserName,
  currentUserAvatarUrl,
}: LeaderboardPanelProps) {
  const [bundle, setBundle] = React.useState<LeaderboardBundle | null>(null);
  const [state, setState] = React.useState<'loading' | 'error' | 'ready'>('loading');
  const [errorMsg, setErrorMsg] = React.useState('');

  const load = React.useCallback(() => {
    setState('loading');
    let alive = true;
    getLeaderboards(communityId)
      .then((b) => {
        if (!alive) return;
        setBundle(b);
        setState('ready');
      })
      .catch((err) => {
        if (!alive) return;
        setErrorMsg(err instanceof Error ? err.message : 'Could not load the leaderboards.');
        setState('error');
      });
    return () => {
      alive = false;
    };
  }, [communityId]);

  React.useEffect(() => load(), [load]);

  if (state === 'error') {
    return (
      <div className={shared.errorBanner}>
        <AlertCircle size={26} />
        <span>{errorMsg}</span>
        <Button variant="outline" onClick={load}>
          Try again
        </Button>
      </div>
    );
  }

  if (state === 'loading' || !bundle) {
    return (
      <div className={styles.panel}>
        <div className={styles.levelCard}>
          <div className={styles.identity}>
            <div className={styles.ring} style={{ ['--ring-progress' as string]: 0 }}>
              <div className={styles.ringInner} />
            </div>
            <div className={`${shared.skeletonLine} ${shared.skeletonLineShort}`} />
          </div>
          <div className={styles.ladder}>
            {Array.from({ length: 8 }, (_, i) => (
              <div key={i} className={shared.skeletonLine} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  const { me, levels } = bundle;

  return (
    <div className={styles.panel}>
      {/* ── Level card ──────────────────────────────────────────────────── */}
      <section className={styles.levelCard}>
        <div className={styles.identity}>
          <div
            className={styles.ring}
            style={{ ['--ring-progress' as string]: me.levelProgress }}
            role="img"
            aria-label={`Level ${me.level}, ${Math.round(me.levelProgress * 100)}% to the next level`}
          >
            <div className={styles.ringInner}>
              <Avatar
                src={currentUserAvatarUrl ?? undefined}
                name={currentUserName ?? 'You'}
                size="xl"
              />
            </div>
            <span className={styles.levelBadge}>{me.level}</span>
          </div>

          <div>
            <h2 className={styles.myName}>{currentUserName ?? 'You'}</h2>
            <span className={styles.myLevel}>
              Level {me.level} — {me.levelName}
            </span>
          </div>

          <span className={styles.toNext}>
            {me.pointsToNextLevel === null ? (
              <>Top of the ladder — {formatCount(me.points)} points</>
            ) : (
              <>
                <b>{formatCount(me.pointsToNextLevel)}</b> point
                {me.pointsToNextLevel === 1 ? '' : 's'} to level up
              </>
            )}
          </span>
        </div>

        <div className={styles.ladder}>
          {levels.map((rung) => {
            const reached = me.level >= rung.level;
            const current = me.level === rung.level;
            return (
              <div key={rung.level} className={styles.rung}>
                <span
                  className={`${styles.rungIcon} ${
                    current
                      ? styles.rungIconCurrent
                      : reached
                        ? styles.rungIconReached
                        : ''
                  }`}
                >
                  {reached ? rung.level : <Lock size={14} />}
                </span>
                <div className={styles.rungBody}>
                  <div
                    className={`${styles.rungName} ${reached ? '' : styles.rungNameLocked}`}
                  >
                    Level {rung.level} — {rung.name}
                  </div>
                  <div className={styles.rungMeta}>
                    {rung.unlocks && !reached && (
                      <>
                        <span className={styles.rungUnlock}>{rung.unlocks}</span>
                        {' · '}
                      </>
                    )}
                    {rung.memberPct}% of members
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Boards ──────────────────────────────────────────────────────── */}
      <div className={styles.boards}>
        <Board
          title="Leaderboard (7-day)"
          hint="Points earned this week"
          board={bundle.weekly}
          currentUserId={currentUserId}
        />
        <Board
          title="Leaderboard (30-day)"
          hint="Points earned this month"
          board={bundle.monthly}
          currentUserId={currentUserId}
        />
        <Board
          title="Leaderboard (all-time)"
          hint="Every point since day one"
          board={bundle.allTime}
          currentUserId={currentUserId}
        />
      </div>

      {/* ── How points work ─────────────────────────────────────────────── */}
      <section className={styles.scoring}>
        <h3 className={styles.scoringTitle}>How community points work</h3>
        <ul className={styles.scoringList}>
          <li className={styles.scoringItem}>
            <PenLine size={14} /> Write a post <b>+3</b>
          </li>
          <li className={styles.scoringItem}>
            <MessageSquare size={14} /> Leave a comment <b>+1</b>
          </li>
          <li className={styles.scoringItem}>
            <ThumbsUp size={14} /> Someone likes your post <b>+2</b>
          </li>
          <li className={styles.scoringItem}>
            <Heart size={14} /> Someone likes your comment <b>+1</b>
          </li>
        </ul>
      </section>
    </div>
  );
}

function Board({
  title,
  hint,
  board,
  currentUserId,
}: {
  title: string;
  hint: string;
  board: LeaderboardBoard;
  currentUserId?: string;
}) {
  return (
    <section className={styles.board}>
      <h3 className={styles.boardTitle}>{title}</h3>
      <span className={styles.boardHint}>{hint}</span>

      {board.entries.length === 0 ? (
        <p className={styles.boardEmpty}>
          Nobody has scored in this window yet. Post something and you take the top spot.
        </p>
      ) : (
        <div className={styles.rows}>
          {board.entries.map((e) => (
            <div
              key={e.userId}
              className={`${styles.row} ${e.userId === currentUserId ? styles.rowMe : ''}`}
            >
              <span className={`${styles.badge} ${podium(e.rank)}`}>{e.rank}</span>
              <Avatar src={e.avatarUrl ?? undefined} name={e.fullName} size="xs" />
              <span className={styles.name}>{e.fullName}</span>
              <span className={styles.points}>+{formatCount(e.points)}</span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

function podium(rank: number): string {
  if (rank === 1) return styles.rank1;
  if (rank === 2) return styles.rank2;
  if (rank === 3) return styles.rank3;
  return '';
}
