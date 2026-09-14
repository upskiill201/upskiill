'use client';

/**
 * LevelProgressVisual — the Celebration Engine's ClaimScene, recreated in
 * code (not a screenshot) at card scale, same as the other homepage visuals.
 *
 * Every color and shape is sourced from the real scene
 * (components/celebration/Scene.module.css + ScenePrimitives.tsx): the dark
 * stage gradient, the stat-pill chrome, the XP (#6C8CFF) / Coins (#EAB308)
 * currency colors, and the green "fluid" progress bar are all the shipped
 * values, not approximations.
 */

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView, useReducedMotion } from 'framer-motion';

export default function LevelProgressVisual() {
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
        <h3
          className="text-2xl font-extrabold text-white"
          style={{ fontFamily: 'var(--font-celebration)' }}
        >
          Okayyy, I see you! 👀
        </h3>

        {/* Stat pills — real ScenePrimitives.tsx StatPillRow chrome */}
        <div className="flex items-center justify-center gap-2.5">
          <span
            className="inline-flex items-center gap-2 rounded-2xl px-3.5 py-2"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderBottom: '3px solid rgba(0,0,0,0.35)' }}
          >
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#8FA3BD]">XP</span>
            <Image src="/Icons/gem.png" alt="" width={16} height={16} className="h-4 w-4 object-contain" />
            <span className="text-[15px] font-extrabold" style={{ color: '#6C8CFF' }}>+10</span>
          </span>
          <span
            className="inline-flex items-center gap-2 rounded-2xl px-3.5 py-2"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderBottom: '3px solid rgba(0,0,0,0.35)' }}
          >
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#8FA3BD]">Coins</span>
            <Image src="/Icons/Coin.png" alt="" width={16} height={16} className="h-4 w-4 object-contain" />
            <span className="text-[15px] font-extrabold" style={{ color: '#EAB308' }}>+5</span>
          </span>
        </div>

        <Image src="/dashboard tey.webp" alt="Tey celebrating" width={110} height={110} className="h-[110px] w-[110px] object-contain" />

        {/* Balance rows — real ScenePrimitives.tsx BalanceRow */}
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-3">
            <Image src="/Icons/gem.png" alt="" width={40} height={40} className="h-10 w-10 object-contain" />
            <span className="text-4xl font-extrabold text-white">4,030</span>
          </div>
          <div className="flex items-center gap-3">
            <Image src="/Icons/Coin.png" alt="" width={40} height={40} className="h-10 w-10 object-contain" />
            <span className="text-4xl font-extrabold text-white">1,089</span>
          </div>
        </div>

        {/* Level progress bar — real .progressTrack / .progressFill (green) */}
        <div className="mt-1 w-full max-w-[280px]">
          <div
            className="relative h-3.5 w-full overflow-hidden rounded-full"
            style={{
              background: 'linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.16) 100%)',
              boxShadow: 'inset 0 3px 6px rgba(0,0,0,0.55), inset 0 -1px 0 rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <div
              className="absolute inset-y-0.5 left-0.5 rounded-full"
              style={{
                width: '30%',
                background: 'linear-gradient(180deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0) 45%), linear-gradient(180deg, #4ade80 0%, #22c55e 65%, #16a34a 100%)',
                boxShadow: '0 0 12px rgba(74,222,128,0.55), inset 0 -3px 3px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.6)',
              }}
            />
          </div>
          <p className="mt-2 text-xs font-semibold text-[#8FA3BD]">LEVEL 41 &middot; 30 / 100 XP</p>
        </div>
      </div>
    </motion.div>
  );
}
