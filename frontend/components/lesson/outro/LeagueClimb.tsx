'use client';

/**
 * The league beat after a lesson — "You moved up to #2 in Ruby League!"
 *
 * The league trophy lands, then a mini board of the people around the
 * learner: it opens in the OLD order, and a beat later the learner's row
 * slides up past everyone this lesson's XP beat, while their weekly XP
 * counts up. Who they passed is named; the next person up, and the XP it
 * takes to pass them, is the hook for the next lesson.
 */

import { LayoutGroup, motion, useReducedMotion } from 'framer-motion';
import { ChevronsUp, ShieldCheck, Users } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import Avatar from '@/components/ui/Avatar';
import LeagueBadge from '@/components/leaderboard/LeagueBadge';
import { playSound } from '@/lib/audio/lessonSounds';
import { passedLine, type Climb } from '@/lib/leaderboard/leagueClimb';
import { getLeagueMeta } from '@/lib/leagues';
import { useCountUp } from './useCountUp';

const SLIDE_AT_MS = 900;

export function LeagueClimb({ climb }: { climb: Climb }) {
  const reducedMotion = useReducedMotion();
  const meta = getLeagueMeta(climb.league);
  const [moved, setMoved] = useState(Boolean(reducedMotion));

  useEffect(() => {
    if (climb.kind === 'joined') {
      playSound('leagueJoin');
      setTimeout(() => setMoved(true), 0);
      return;
    }
    const t = setTimeout(() => {
      setMoved(true);
      playSound('leagueUp', climb.passed.length);
    }, reducedMotion ? 0 : SLIDE_AT_MS);
    return () => clearTimeout(t);
  }, [climb, reducedMotion]);

  // Before the slide: rows in their old order (the learner at their old rank,
  // or at the bottom when they've only just joined). After: the new order.
  const order = useMemo(() => {
    if (moved) return climb.rows;
    return [...climb.rows].sort((a, b) => {
      const ra = climb.previousRank[a.userId] ?? Infinity;
      const rb = climb.previousRank[b.userId] ?? Infinity;
      return ra - rb;
    });
  }, [moved, climb]);

  const xp = useCountUp(moved ? climb.myXpAfter : climb.myXpBefore, {
    from: climb.myXpBefore,
    duration: 900,
    instant: Boolean(reducedMotion),
  });

  const title =
    climb.kind === 'joined'
      ? `You joined the ${meta.name}!`
      : climb.kind === 'zone'
        ? "You're in the promotion zone!"
        : `You moved up to #${climb.toRank}!`;
  const line =
    passedLine(climb.passed) ??
    (climb.inPromotion
      ? `Finish the week here and you move up a league.`
      : climb.nextUp
        ? `${climb.nextUp.xpToPass} XP to pass ${climb.nextUp.name.split(' ')[0]}.`
        : "Earn XP this week to climb the board.");

  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center py-6">
      <motion.div
        initial={reducedMotion ? false : { scale: 0.3, y: 30, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 420, damping: 14 }}
      >
        <LeagueBadge tier={climb.league} size="lg" priority />
      </motion.div>

      <motion.h1
        className="mt-4 text-[28px] md:text-[34px] font-extrabold text-ink leading-tight"
        style={{ fontFamily: 'var(--font-jakarta)' }}
        initial={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.15, type: 'spring', stiffness: 520, damping: 18 }}
      >
        {title}
      </motion.h1>
      <p className="mt-1.5 text-[16px] font-bold text-[var(--text-secondary)]">{line}</p>

      <LayoutGroup>
        <ol className="mt-6 w-full max-w-[440px] flex flex-col gap-2 text-left" aria-label={`${meta.name} standings`}>
          {order.map((r, i) => {
            const shownRank = moved ? r.rank : climb.previousRank[r.userId] ?? r.rank;
            const promo = climb.inPromotion && r.isMe && moved;
            return (
              <motion.li
                key={r.userId}
                layout={!reducedMotion}
                transition={{ type: 'spring', stiffness: 260, damping: 26 }}
                initial={r.isMe && climb.kind === 'joined' && !reducedMotion ? { opacity: 0, y: 40 } : false}
                animate={{ opacity: 1, y: 0, scale: r.isMe && moved && climb.kind === 'up' ? [1, 1.04, 1] : 1 }}
                className="relative flex items-center gap-3 rounded-[16px] border-2 px-3.5 py-2.5"
                style={{
                  zIndex: r.isMe ? 2 : 1,
                  borderColor: r.isMe ? 'var(--color-brand)' : 'var(--border)',
                  backgroundColor: r.isMe ? 'var(--light-blue-bg)' : 'white',
                  boxShadow: r.isMe ? '0 4px 0 var(--color-brand)' : '0 3px 0 var(--border)',
                }}
                data-index={i}
              >
                <span
                  className="w-7 text-center text-[16px] font-extrabold tabular-nums"
                  style={{ color: r.isMe ? 'var(--color-brand)' : 'var(--text-secondary)' }}
                >
                  {shownRank}
                </span>
                <Avatar src={r.avatarUrl ?? undefined} name={r.name} size="sm" />
                <span className="flex-1 min-w-0 truncate text-[15.5px] font-extrabold text-ink">
                  {r.isMe ? 'You' : r.name}
                </span>
                {climb.shared && r.league && !r.isMe && <LeagueBadge tier={r.league} size="xs" />}
                <span className="text-[14.5px] font-extrabold tabular-nums text-[var(--text-secondary)]">
                  {r.isMe ? Math.round(xp ?? climb.myXpAfter) : r.weeklyXp} XP
                </span>
                {promo && (
                  <ShieldCheck className="absolute -right-2 -top-2 w-6 h-6 text-white rounded-full p-0.5" style={{ backgroundColor: 'var(--success-green)' }} aria-label="In the promotion zone" />
                )}
                {r.isMe && moved && climb.kind === 'up' && (
                  <motion.span
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.35 }}
                    className="absolute -left-2 -top-2 flex items-center justify-center w-6 h-6 rounded-full text-white"
                    style={{ backgroundColor: 'var(--success-green)' }}
                    aria-hidden="true"
                  >
                    <ChevronsUp className="w-4 h-4 stroke-[3]" />
                  </motion.span>
                )}
              </motion.li>
            );
          })}
        </ol>
      </LayoutGroup>

      {climb.shared && (
        <p className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-bold text-[var(--text-muted)]">
          <Users className="w-4 h-4" aria-hidden="true" />
          This week, every active learner shares one board.
        </p>
      )}
    </div>
  );
}

export default LeagueClimb;
