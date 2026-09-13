'use client';

/**
 * StreakCelebrationVisual — the Celebration Engine's StreakScene (EXTENDED
 * mode), recreated in code at card scale. Colors sourced verbatim from
 * components/celebration/Scene.module.css: the flame's orange glow, the
 * week-day cells (#0EA5E9 done / #F59E0B today), and the "DAY STREAK" stat
 * pill (#FF8A00) are the shipped values.
 */

import React, { useRef } from 'react';
import Image from 'next/image';
import { Check } from 'lucide-react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

const WEEK = [
  { label: 'M', done: true },
  { label: 'T', done: true },
  { label: 'W', done: true },
  { label: 'T', done: true },
  { label: 'F', done: true },
  { label: 'S', done: true },
  { label: 'S', done: true, isToday: true },
];

export default function StreakCelebrationVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: '-100px 0px' });

  return (
    <motion.div
      ref={ref}
      initial={reducedMotion ? false : { opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.4 }}
      className="mx-auto w-full max-w-[380px] overflow-hidden rounded-card shadow-lift ring-1 ring-black/5"
      style={{
        background: 'radial-gradient(120% 90% at 50% -10%, rgba(61,90,254,0.16) 0%, rgba(16,26,46,0) 55%), #101a2e',
      }}
    >
      <div className="flex flex-col items-center gap-4 px-6 py-9 text-center">
        <h3 className="text-2xl font-extrabold text-white" style={{ fontFamily: 'var(--font-celebration)' }}>
          Streak extended!
        </h3>

        <Image
          src="/Icons/burn.png"
          alt="Streak flame"
          width={90}
          height={90}
          className="h-[90px] w-[90px] object-contain"
          style={{ filter: 'drop-shadow(0 0 24px rgba(255,138,0,0.55))' }}
        />

        <div className="flex items-end justify-center gap-1.5">
          <span className="text-5xl font-extrabold leading-none text-white">1</span>
          <span className="pb-1 text-lg font-bold" style={{ color: '#FFB020' }}>day</span>
        </div>

        {/* Week calendar row — real ScenePrimitives.tsx WeekCalendarRow */}
        <div className="flex items-start justify-center gap-2.5">
          {WEEK.map((d, i) => (
            <div key={i} className="flex flex-col items-center gap-1.5">
              <span
                className="text-[10px] font-extrabold uppercase tracking-wide"
                style={{ color: d.isToday ? '#FFB020' : '#8FA3BD' }}
              >
                {d.label}
              </span>
              <span
                className="flex h-8 w-8 items-center justify-center rounded-full"
                style={
                  d.isToday
                    ? { background: '#F59E0B', border: '1px solid #D97706', boxShadow: '0 3px 0 rgba(180,83,9,0.55)' }
                    : { background: '#0EA5E9', border: '1px solid #0284C7', boxShadow: '0 3px 0 rgba(2,132,199,0.55)' }
                }
              >
                <Check size={14} strokeWidth={3.4} color="#fff" />
              </span>
            </div>
          ))}
        </div>

        {/* Stat pill — real "DAY STREAK" chip */}
        <span
          className="inline-flex items-center gap-2 rounded-2xl px-3.5 py-2"
          style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderBottom: '3px solid rgba(0,0,0,0.35)' }}
        >
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#8FA3BD]">Day Streak</span>
          <span className="text-[15px] font-extrabold" style={{ color: '#FF8A00' }}>1</span>
        </span>

        <Image src="/dashboard tey.webp" alt="Tey celebrating" width={100} height={100} className="h-[100px] w-[100px] object-contain" />

        {/* Speech bubble — real .speechBubble chrome */}
        <p
          className="max-w-[30ch] rounded-2xl px-4 py-2.5 text-sm font-bold text-[#E6EDF6]"
          style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }}
        >
          1 day in a row! Come back tomorrow to keep the fire alive.
        </p>
      </div>
    </motion.div>
  );
}
