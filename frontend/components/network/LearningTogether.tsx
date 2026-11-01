'use client';

/**
 * Co-learning inside the lesson player: a heartbeat about once a minute
 * while the lesson is open and on screen (so buddies see "learning now", and
 * a new sitting can tell them), and a small pill when a buddy is learning
 * the same course right now: "Ben is learning too".
 *
 * Silent outside real lessons (reviews, previews) and when nobody's around.
 */

import React from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Avatar from '@/components/ui/Avatar';
import { useLessonContext } from '@/lib/lesson/LessonContext';
import { leavePresence, pingPresence, type LiveBuddy } from '@/lib/network';

const BEAT_MS = 60_000;

export default function LearningTogether() {
  const ctx = useLessonContext();
  const reduce = useReducedMotion();
  const [live, setLive] = React.useState<LiveBuddy[]>([]);
  const lessonId = ctx?.shareable ? ctx.lessonId : null;

  React.useEffect(() => {
    if (!lessonId) return;
    let stopped = false;
    const beat = () => {
      if (document.visibilityState !== 'visible') return;
      pingPresence(lessonId)
        .then((r) => !stopped && setLive(r.learningToo))
        .catch(() => undefined);
    };
    beat();
    const t = window.setInterval(beat, BEAT_MS);
    document.addEventListener('visibilitychange', beat);
    return () => {
      stopped = true;
      window.clearInterval(t);
      document.removeEventListener('visibilitychange', beat);
      leavePresence();
    };
  }, [lessonId]);

  const first = live[0];
  const label = first
    ? live.length === 1
      ? `${(first.name ?? 'Your buddy').split(' ')[0]} is learning too`
      : `${(first.name ?? 'Your buddy').split(' ')[0]} and ${live.length - 1} more are learning too`
    : '';

  return (
    <AnimatePresence>
      {first && (
        <motion.div
          role="status"
          initial={reduce ? false : { opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="absolute right-4 top-[calc(env(safe-area-inset-top)+64px)] md:top-[76px] z-[2] inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[13px] font-extrabold"
          style={{
            background: 'color-mix(in srgb, var(--success-green) 14%, var(--bg-card))',
            color: 'var(--success-green)',
            border: '2px solid color-mix(in srgb, var(--success-green) 35%, var(--bg-card))',
          }}
        >
          <span className="relative inline-flex">
            <Avatar size="xs" src={first.avatar ?? undefined} name={first.name ?? 'Buddy'} />
            <span
              className="absolute -right-0.5 -bottom-0.5 h-2.5 w-2.5 rounded-full"
              style={{ background: 'var(--success-green)', boxShadow: '0 0 0 2px var(--bg-card)' }}
            />
          </span>
          {label}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
