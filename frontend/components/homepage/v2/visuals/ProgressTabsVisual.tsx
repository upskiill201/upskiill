'use client';

/**
 * ProgressTabsVisual — one card, three tabs, all real Teyro reward UI,
 * recreated in code (not a screenshot) so it sits directly on the page the
 * way Coddy's own mockups do — no device frame, no phone bezel.
 *
 * Each tab keeps its own background. (The Lucky Wheel tab was removed on
 * 2026-09-24 — the wheel was folded into streak chests.)
 */

import React, { useRef } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { SegmentedTabs, useAutoAdvancingTabs } from '../SegmentedTabs';

const TABS = [
  { id: 'celebrate', label: 'Celebrate', accent: '#3D5AFE' },
  { id: 'quest', label: 'Monthly Challenge', accent: '#FFC800', textOnAccent: '#101a2e' },
  { id: 'chest', label: 'Treasure Chest', accent: '#22C55E' },
];

// Per-tab card background.
const CARD_BG: Record<string, string> = {
  celebrate: 'radial-gradient(120% 90% at 50% -10%, rgba(61,90,254,0.22) 0%, rgba(16,26,46,0) 55%), #101a2e',
  quest: 'radial-gradient(120% 90% at 50% -10%, rgba(61,90,254,0.18) 0%, rgba(16,26,46,0) 55%), #101a2e',
  chest: 'radial-gradient(120% 90% at 50% -10%, rgba(34,197,94,0.16) 0%, rgba(16,26,46,0) 55%), #101a2e',
};

function CelebrateBody() {
  return (
    <div className="flex flex-col items-center px-4 py-8 text-center">
      <Image src="/dashboard tey.webp" alt="Tey celebrating" width={110} height={110} className="h-[110px] w-[110px] object-contain" />
      {/* The real ClaimScene headline runs on --font-celebration too
          (Scene.module.css .headline) — matching it here, not just the
          marketing headlines around it. */}
      <h3 className="mt-3 text-xl font-extrabold text-white" style={{ fontFamily: 'var(--font-celebration)' }}>
        Lesson complete!
      </h3>
      <p className="mt-1 text-sm font-semibold text-[#b7c4d6]">&ldquo;Nice work, that&rsquo;s your streak for today. 🔥&rdquo;</p>
      <div className="mt-5 flex items-center gap-6">
        <div className="flex items-center gap-2">
          <Image src="/Icons/gem.png" alt="" width={30} height={30} className="h-7.5 w-7.5 object-contain" />
          <span className="text-2xl font-extrabold text-white">+10</span>
        </div>
        <div className="flex items-center gap-2">
          <Image src="/Icons/Coin.png" alt="" width={30} height={30} className="h-7.5 w-7.5 object-contain" />
          <span className="text-2xl font-extrabold text-white">+5</span>
        </div>
      </div>
    </div>
  );
}

function QuestBody() {
  return (
    <div className="px-5 py-6">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#8FA3BD]">Monthly Challenge</span>
        <span className="text-[10px] font-extrabold text-[#8FA3BD]">12d left</span>
      </div>
      <div className="mt-2 flex items-baseline justify-between">
        <span className="text-base font-extrabold text-white">September Quest</span>
        <span className="text-[19px] font-extrabold" style={{ color: '#FFC800' }}>8 / 15 <span className="text-xs font-bold text-[#8FA3BD]">goal days</span></span>
      </div>
      <div className="relative mt-5 h-3 rounded-full" style={{ background: 'rgba(255,255,255,0.1)', boxShadow: 'inset 0 2px 3px rgba(0,0,0,0.35)' }}>
        <div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{ width: '53%', background: 'linear-gradient(180deg, #FFDD55 0%, #FFC800 100%)' }}
        />
        {[33, 66, 100].map((pos) => (
          <div
            key={pos}
            className="absolute top-1/2 h-5 w-5 -translate-y-1/2 rounded-full"
            style={{
              left: `${pos}%`,
              transform: 'translate(-50%, -50%)',
              background: pos <= 53 ? 'radial-gradient(circle at 32% 28%, #FFE38A 0%, #FFD54A 52%, #FFC800 100%)' : '#14213A',
              boxShadow: pos <= 53 ? '0 3px 0 #C98A00' : 'inset 0 2.5px 5px rgba(0,0,0,0.5)',
            }}
          />
        ))}
      </div>
      <p className="mt-4 text-xs font-semibold text-[#8FA3BD]">Hit your daily XP goal to fill the track. Reach a milestone, claim a reward.</p>
    </div>
  );
}

function ChestBody() {
  return (
    <div className="flex flex-col items-center px-4 py-7 text-center">
      <Image src="/Tressure box.webp" alt="Teyro treasure chest" width={150} height={135} className="h-[135px] w-[150px] object-contain" />
      <p className="mt-3 text-sm font-semibold text-[#b7c4d6]">Finish your first lesson each day to unlock one. Keep your streak going for bonus chests.</p>
    </div>
  );
}

const BODIES: Record<string, () => React.JSX.Element> = {
  celebrate: CelebrateBody,
  quest: QuestBody,
  chest: ChestBody,
};

export default function ProgressTabsVisual() {
  const { active, select, containerRef } = useAutoAdvancingTabs(TABS.length, 4200);
  const tab = TABS[active];
  const Body = BODIES[tab.id];
  const inRef = useRef<HTMLDivElement>(null);
  const inView = useInView(inRef, { once: true, margin: '-100px 0px' });

  return (
    <div ref={containerRef} className="w-full">
      <SegmentedTabs tabs={TABS} active={active} onChange={select} />

      <motion.div
        ref={inRef}
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.4 }}
        className="mt-6 overflow-hidden rounded-card shadow-lift ring-1 ring-black/5"
        style={{ background: CARD_BG[tab.id] }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={tab.id}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <Body />
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
