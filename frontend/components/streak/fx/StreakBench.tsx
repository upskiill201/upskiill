'use client';

/**
 * Dev bench (/dev/tey-scenes): replay the lesson's streak screen in every
 * variant, and the in-lesson combo burst, without finishing real lessons or
 * breaking a real streak. The calendar is made up; nothing is saved.
 */

import { useCallback, useState } from 'react';
import { X } from 'lucide-react';
import { ComboBurst, type ComboBurstEvent } from '@/components/lesson/ComboBurst';
import { StreakDay, type StreakDayKind } from '@/components/lesson/outro/StreakDay';
import lessonStyles from '@/components/lesson/Lesson.module.css';
import type { CalendarDay } from '@/context/StreakContext';
import { dayKey } from '@/hooks/useStreak';
import { streakMoment } from '@/lib/lesson/moments';

/** A fake calendar: `days` lessons ending yesterday, yesterday frozen if asked. */
function fakeCalendar(days: number, frozenYesterday: boolean): CalendarDay[] {
  const out: CalendarDay[] = [];
  const now = new Date();
  for (let back = 13; back >= 1; back--) {
    const d = new Date(now);
    d.setDate(now.getDate() - back);
    const inRun = back <= days - 1;
    const frozen = frozenYesterday && back === 1;
    out.push({
      date: dayKey(d),
      dayNumber: d.getDate(),
      lessonsCompleted: inRun && !frozen ? 1 : 0,
      xpEarned: 0,
      isCompleted: inRun,
      isToday: false,
      isFuture: false,
      isFreezeUsed: frozen,
      status: frozen ? 'frozen' : inRun ? 'lesson' : 'none',
      inCurrentStreak: inRun,
    });
  }
  return out;
}

const CASES: { label: string; kind: StreakDayKind; days: number; longest: number; frozen?: boolean }[] = [
  { label: 'Streak started (day 1)', kind: 'start', days: 1, longest: 4 },
  { label: 'Streak extended (4 → 5)', kind: 'extend', days: 5, longest: 9 },
  { label: 'Unfrozen (freeze held yesterday, 6 → 7 milestone)', kind: 'thaw', days: 7, longest: 12, frozen: true },
  { label: 'Unfrozen (plain, 4 → 5)', kind: 'thaw', days: 5, longest: 12, frozen: true },
  { label: 'Milestone + personal best (29 → 30)', kind: 'extend', days: 30, longest: 21 },
  { label: 'Big number (99 → 100)', kind: 'extend', days: 100, longest: 120 },
];

const btn: React.CSSProperties = {
  display: 'block',
  width: '100%',
  textAlign: 'left',
  padding: '10px 14px',
  marginBottom: 8,
  borderRadius: 10,
  border: '2px solid var(--border)',
  background: 'var(--bg-section)',
  fontWeight: 700,
  fontSize: 13,
  cursor: 'pointer',
};

export default function StreakBench() {
  const [open, setOpen] = useState<(typeof CASES)[number] | null>(null);
  const [run, setRun] = useState(0);
  const [burst, setBurst] = useState<ComboBurstEvent | null>(null);
  const done = useCallback(() => setBurst(null), []);

  return (
    <>
      {CASES.map((c) => (
        <button key={c.label} style={btn} onClick={() => setOpen(c)}>
          Lesson streak screen — {c.label}
        </button>
      ))}
      {[3, 5, 7, 10].map((n) => (
        <button key={n} style={btn} onClick={() => setBurst({ run: n, key: Date.now() })}>
          Combo burst — {n} in a row
        </button>
      ))}

      {burst && (
        <div className={`${lessonStyles.player} fixed inset-0 z-[90000] pointer-events-none`}>
          <ComboBurst burst={burst} onDone={done} />
        </div>
      )}

      {open && (
        <div
          key={`${open.label}-${run}`}
          className={`${lessonStyles.player} fixed inset-0 z-[90000] flex flex-col bg-white overflow-y-auto`}
        >
          <div className="flex justify-between p-4">
            <button type="button" onClick={() => setOpen(null)} aria-label="Close" className="cursor-pointer">
              <X className="w-7 h-7" />
            </button>
            <button type="button" onClick={() => setRun((r) => r + 1)} className="font-extrabold cursor-pointer">
              Replay
            </button>
          </div>
          <div className="mx-auto w-full max-w-[640px] px-4 flex-1 flex flex-col">
            <StreakDay
              days={open.days}
              kind={open.kind}
              line="Bench line: what Tey says under the week."
              moment={streakMoment(open.days, open.longest)}
              calendar={fakeCalendar(open.days, Boolean(open.frozen))}
            />
          </div>
        </div>
      )}
    </>
  );
}
