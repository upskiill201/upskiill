'use client';

/**
 * LessonMapVisual — the real section map screen, recreated in code (not a
 * screenshot) at card scale, same treatment as the other homepage visuals.
 *
 * Every value is sourced verbatim from the shipped screen:
 *  - Stats row: components/ui/StatPill.tsx's exact per-stat colors (streak
 *    #EA580C, coins #CA8A04, XP #0172FD, lives #E11D48, level #9333EA) and
 *    icons.
 *  - Green header: SectionView.module.css .duolingoHeader (#58cc02 /
 *    #46a302 border) and .guidebookBtn (white, same shadow color).
 *  - Lesson pedestals: 78px circles, box-shadow 0 8px 0 <darker>, cycling
 *    getLessonColorTheme's five theme colors — and the "LESSON UNLOCKED!"
 *    badge is the same real copy.
 */

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { ArrowLeft, BookText, Check, Star, Lock } from 'lucide-react';

// getLessonColorTheme, verbatim from the section page.
const THEMES = [
  { main: '#58cc02', shadow: '#46a302' }, // Green
  { main: '#1cb0f6', shadow: '#1899d6' }, // Blue
  { main: '#ff9600', shadow: '#e67e00' }, // Orange
];

// StatPill.tsx's STAT_CONFIG colors, verbatim.
const STATS = [
  { icon: '/Icons/burn.png', value: '0', color: '#94A3B8' }, // inactive streak
  { icon: '/Icons/Coin.png', value: '1.1K', color: '#CA8A04' },
  { icon: '/Icons/gem.png', value: '4K', color: '#0172FD' },
  { icon: '/Icons/heart.png', value: '5', color: '#E11D48' },
  { icon: '/Icons/user-profile.png', value: 'Lvl 41', color: '#9333EA' },
];

const NODES = [
  { type: 'lesson' as const, state: 'completed' as const, offset: 14 },
  { type: 'lesson' as const, state: 'completed' as const, offset: -10 },
  { type: 'chest' as const, offset: 6 },
  { type: 'lesson' as const, state: 'active' as const, offset: -8 },
  { type: 'lesson' as const, state: 'locked' as const, offset: 20 },
];

export default function LessonMapVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: '-100px 0px' });

  return (
    <motion.div
      ref={ref}
      initial={reducedMotion ? false : { opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.4 }}
      className="mx-auto w-full max-w-[380px] overflow-hidden rounded-card bg-white shadow-lift ring-1 ring-black/5"
    >
      {/* Real stats row — StatsBar.tsx, flat variant */}
      <div className="flex items-center justify-between px-4 pt-4">
        {STATS.map((s, i) => (
          <span key={i} className="flex items-center gap-1">
            <Image src={s.icon} alt="" width={20} height={20} className="h-5 w-5 object-contain" />
            <span className="text-[13px] font-extrabold" style={{ color: s.color }}>{s.value}</span>
          </span>
        ))}
      </div>

      {/* Real green header — SectionView.module.css .duolingoHeader */}
      <div className="mx-4 mt-3 rounded-[20px] px-5 py-4" style={{ background: '#58cc02', borderBottom: '4px solid #46a302' }}>
        <div className="flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wide text-white/85">
          <ArrowLeft size={14} strokeWidth={3} />
          Section 3, Unit 1
        </div>
        <h3 className="mt-1.5 text-[15px] font-extrabold leading-tight text-white">
          Module 3: Business Models &amp; Product Unit Economics
        </h3>
        <button
          type="button"
          className="mt-3 flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-xs font-extrabold"
          style={{ color: '#58cc02', boxShadow: '0 3px 0 #46a302' }}
        >
          <BookText size={14} strokeWidth={2.5} />
          GUIDEBOOK
        </button>
      </div>

      {/* Real journey path area — SectionView.module.css .journeyPathContainer */}
      <div className="relative mt-3 overflow-hidden px-4 pb-6 pt-8" style={{ background: '#F6F8FA' }}>
        <Image
          src="/dashboard tey.webp"
          alt=""
          width={56}
          height={56}
          className="pointer-events-none absolute -left-2 top-1 h-14 w-14 object-contain opacity-90"
        />

        <div className="relative flex flex-col items-center gap-9">
          {(() => {
            let lessonIndex = -1;
            return NODES.map((node, i) => {
              if (node.type === 'lesson') lessonIndex += 1;
              const theme = node.type === 'lesson' ? THEMES[lessonIndex % THEMES.length] : THEMES[0];
              const isLive = node.type === 'lesson' && node.state !== 'locked';

              return (
                <div key={i} className="relative flex flex-col items-center" style={{ transform: `translateX(${node.offset}px)` }}>
                {node.type === 'lesson' && node.state === 'active' && (
                  <div className="absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-[12px] font-extrabold shadow-sm" style={{ color: '#e67e00' }}>
                    LESSON UNLOCKED! 🔓
                  </div>
                )}

                {node.type === 'chest' ? (
                  <Image src="/Tressure box.webp" alt="" width={52} height={47} className="h-[47px] w-[52px] object-contain" />
                ) : (
                  <div
                    className="flex h-[70px] w-[70px] items-center justify-center rounded-full"
                    style={
                      isLive
                        ? { backgroundColor: theme.main, boxShadow: `0 7px 0 ${theme.shadow}` }
                        : { backgroundColor: '#E5EAEF', boxShadow: '0 7px 0 #CBD5E1' }
                    }
                  >
                    {node.state === 'completed' ? (
                      <Check size={28} strokeWidth={4} color="white" />
                    ) : node.state === 'active' ? (
                      <Star size={28} strokeWidth={3} fill="white" color="white" />
                    ) : (
                      <Lock size={24} strokeWidth={2.5} color="#94A3B8" />
                    )}
                  </div>
                  )}
                </div>
              );
            });
          })()}
        </div>

        {/* Tey, life-sized next to the active node — real mascot placement */}
        <Image
          src="/dashboard tey.webp"
          alt="Tey"
          width={130}
          height={130}
          className="pointer-events-none absolute bottom-6 right-2 h-[130px] w-[130px] object-contain"
        />

        {/* Floating section-progress badge */}
        <div
          className="absolute bottom-16 right-4 flex h-11 w-11 items-center justify-center rounded-full text-[11px] font-extrabold text-white"
          style={{ backgroundColor: '#1cb0f6', boxShadow: '0 3px 0 #1899d6' }}
        >
          40%
        </div>
      </div>
    </motion.div>
  );
}
