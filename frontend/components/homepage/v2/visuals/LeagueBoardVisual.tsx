'use client';

/**
 * LeagueBoardVisual — the weekly league standings, cropped to the rows around
 * you and the promotion cut-off.
 *
 * Reuses the real LeagueBadge (an authored SVG shield, and import-clean — it
 * only pulls lucide and the pure lib/leagues data), so the shield on the
 * homepage is the same artwork learners see in the app.
 *
 * Shows the Gold League rule honestly: top 10 promote, so the divider sits
 * under rank 10. That is why the visible ranks start at 8 rather than 1 —
 * the cut-off is the thing worth showing, not the winner.
 */

import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import LeagueBadge from '@/components/leaderboard/LeagueBadge';

interface Row {
  rank: number;
  name: string;
  xp: number;
  you?: boolean;
}

const ROWS: Row[] = [
  { rank: 8, name: 'Amara', xp: 640 },
  { rank: 9, name: 'Ibrahim', xp: 615 },
  { rank: 10, name: 'You', xp: 580, you: true },
  { rank: 11, name: 'Wei', xp: 545 },
  { rank: 12, name: 'Noor', xp: 520 },
];

const AVATAR_TINTS = ['bg-violet-100 text-violet-700', 'bg-emerald-100 text-emerald-700', 'bg-brand text-white', 'bg-amber-100 text-amber-700', 'bg-rose-100 text-rose-700'];

export default function LeagueBoardVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: '-120px 0px' });

  return (
    <div ref={ref} className="mx-auto max-w-[420px]">
      <div className="flex flex-col items-center">
        <LeagueBadge tier="GOLD" size="lg" />
        <p className="mt-3 text-sm font-extrabold uppercase tracking-wider text-ink-soft">
          Gold League
        </p>
      </div>

      <div className="mt-6 overflow-hidden rounded-card bg-white shadow-lift ring-1 ring-black/4">
        {ROWS.map((row, i) => (
          <React.Fragment key={row.rank}>
            <motion.div
              initial={reducedMotion ? false : { opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{ delay: 0.15 + i * 0.08, duration: 0.35, ease: 'easeOut' }}
              className={[
                'flex items-center gap-3 px-5 py-3.5',
                row.you ? 'bg-band' : 'bg-white',
              ].join(' ')}
            >
              <span
                className={[
                  'w-5 shrink-0 text-sm font-extrabold tabular-nums',
                  row.you ? 'text-brand' : 'text-slate-400',
                ].join(' ')}
              >
                {row.rank}
              </span>
              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-extrabold ${AVATAR_TINTS[i]}`}
                aria-hidden
              >
                {row.name.charAt(0)}
              </span>
              <span
                className={[
                  'flex-1 truncate text-sm font-bold',
                  row.you ? 'text-brand' : 'text-ink',
                ].join(' ')}
              >
                {row.name}
              </span>
              <span className="shrink-0 text-sm font-bold tabular-nums text-ink-soft">
                {row.xp} XP
              </span>
            </motion.div>

            {/* Promotion cut-off — Gold promotes the top 10. */}
            {row.rank === 10 && (
              <motion.div
                initial={reducedMotion ? false : { opacity: 0 }}
                animate={inView ? { opacity: 1 } : undefined}
                transition={{ delay: 0.55, duration: 0.4 }}
                className="flex items-center gap-3 px-5 py-1.5"
              >
                <span className="h-px flex-1 bg-emerald-300" />
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-600">
                  Promotion zone
                </span>
                <span className="h-px flex-1 bg-emerald-300" />
              </motion.div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
