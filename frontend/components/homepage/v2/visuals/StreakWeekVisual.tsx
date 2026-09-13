'use client';

/**
 * StreakWeekVisual — a crop of the real StreakModal (components/streak,
 * verified against StreakModal.module.css), not an invented weekly card.
 *
 * Every color is the shipped one: the orange banner is the exact gradient
 * (#FF9600 → #FF8A00), the medal card and its copy pattern ("Longest streak:
 * N days") are verbatim, and the day bubbles use the real states — filled
 * orange for completed (with the flame overlay), an orange outline ring for
 * today, plain grey for the rest of the month. The Streak Society lock card
 * is real product copy, not a stand-in.
 */

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { Crown } from 'lucide-react';

const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
// September 2026 starts on a Tuesday — firstDayOffset 2, matching the real
// calendar's own padding-cell math.
const PAD = 2;
// 25 days straight — shown as a personal best, so consistency (not a single
// lucky week) is the claim this visual makes.
const STREAK_DAYS = 25;
const DAYS = Array.from({ length: 30 }, (_, i) => {
  const day = i + 1;
  return { day, completed: day <= STREAK_DAYS, isToday: day === STREAK_DAYS };
});

export default function StreakWeekVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: '-120px 0px' });
  const revealDay = STREAK_DAYS;

  return (
    <div ref={ref} className="mx-auto w-full max-w-[380px] rounded-card bg-white p-5 shadow-lift ring-1 ring-black/4">
      {/* Real hero banner */}
      <div
        className="flex items-center justify-between rounded-3xl p-6"
        style={{ background: 'linear-gradient(135deg, #FF9600 0%, #FF8A00 100%)' }}
      >
        <h3 className="text-[1.75rem] font-extrabold leading-none tracking-tight text-white">
          {STREAK_DAYS} day streak
        </h3>
        <Image src="/Icons/burn.png" alt="" width={64} height={64} className="h-16 w-16 object-contain" />
      </div>

      {/* Real "personal best" card */}
      <div className="mt-3.5 flex items-center gap-3 rounded-2xl border-2 border-slate-200 px-4.5 py-3.5">
        <span className="text-2xl" aria-hidden>🎖️</span>
        <span className="text-sm font-extrabold text-ink-soft">Longest streak: {STREAK_DAYS} days</span>
      </div>

      {/* Real calendar */}
      <div className="mt-4 rounded-[20px] border-2 border-slate-200 p-4">
        <div className="flex items-center justify-center">
          <span className="text-[13px] font-extrabold uppercase tracking-wide text-slate-500">
            September 2026
          </span>
        </div>

        <div className="mt-3 grid grid-cols-7 gap-1.5">
          {WEEKDAYS.map((d, i) => (
            <span key={i} className="text-center text-xs font-extrabold uppercase text-slate-400">
              {d}
            </span>
          ))}
        </div>

        <div className="mt-1.5 grid grid-cols-7 gap-1.5">
          {Array.from({ length: PAD }).map((_, i) => <div key={`pad-${i}`} />)}
          {DAYS.map((d) => {
            const shown = reducedMotion || (inView && d.day <= revealDay);
            const isDone = d.completed && shown;
            return (
              <div key={d.day} className="flex items-center justify-center">
                <motion.div
                  className="relative flex h-9 w-9 items-center justify-center rounded-full text-[13px] font-bold"
                  style={
                    isDone
                      ? { backgroundColor: '#FF8A00', color: '#fff', boxShadow: '0 3px 8px rgba(255,138,0,0.35)' }
                      : d.isToday
                        ? { border: '3px solid #FF8A00', color: '#FF8A00' }
                        : d.day > revealDay
                          ? { color: '#CBD5E1' }
                          : { color: '#64748B' }
                  }
                  animate={isDone ? { scale: [1, 1.2, 1] } : {}}
                  transition={{ duration: 0.28 }}
                >
                  {d.day}
                  {isDone && (
                    <span className="absolute -right-1 -top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-white">
                      <Image src="/Icons/burn.png" alt="" width={11} height={11} className="h-[11px] w-[11px] object-contain" />
                    </span>
                  )}
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Real Streak Society card — unlocked past a 7 day streak, and this
          learner is 18 days clear of that bar. */}
      <div className="mt-3.5 flex items-center gap-3.5 rounded-2xl border-2 p-4" style={{ borderColor: '#F59E0B', background: '#FEF3C7' }}>
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100">
          <Crown size={20} className="text-[#EAB308]" />
        </span>
        <p className="text-[13px] font-semibold leading-snug text-ink-soft">
          You&rsquo;ve unlocked the exclusive Streak Society! Keep learning daily to maintain your status.
        </p>
      </div>
    </div>
  );
}
