'use client';

/**
 * LessonPhaseDemo — the real Learn → Apply → Reflect → Deepen screens,
 * reproduced from components/learn/Learn.module.css and PhaseStepper.tsx /
 * PhaseHeader.tsx, not invented.
 *
 * The progress indicator is the real one: PhaseStepper.tsx is four numbered,
 * 3D-tactile circles (a colored fill, box-shadow: 0 4px 0 <a darker shade of
 * the same color> — the same pressed-button look as the CHECK button below
 * it) linked by a thin track, not a slim filled bar. A completed circle
 * inverts to a white disc with an inset accent ring and a check; the
 * upcoming ones sit flat grey. Each phase carries its own accent
 * (--phase-accent / --phase-accent-deep / --phase-accent-wash, set once by
 * LessonShell) — Learn #3D5AFE, Apply #22C55E, Reflect #9333EA, Deepen
 * #F59E0B — which retints the stepper, the badge pill and the header's top
 * edge together. That retint IS the interaction this component drives:
 * click a phase, or wait, and the tab, the stepper and the card all change.
 *
 * The Apply card's lettered options, the pressed-shadow "CHECK" button
 * (#58CC02), the Reflect textarea's live word count, and the Deepen
 * resource-icon colors are all pulled from the real CSS too.
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, FileText, Link2, Video, X } from 'lucide-react';
import { SegmentedTabs, useAutoAdvancingTabs } from '../SegmentedTabs';

const PHASES = [
  { id: 'learn', label: 'Learn', accent: '#3D5AFE', deep: '#2D4AEE', wash: 'rgba(61,90,254,0.06)' },
  { id: 'apply', label: 'Apply', accent: '#22C55E', deep: '#16A34A', wash: 'rgba(34,197,94,0.07)' },
  { id: 'reflect', label: 'Reflect', accent: '#9333EA', deep: '#7420C4', wash: 'rgba(147,51,234,0.06)' },
  { id: 'deepen', label: 'Deepen', accent: '#F59E0B', deep: '#C77C08', wash: 'rgba(245,158,11,0.08)' },
];

function PhaseBadge({ deep, wash, children }: { deep: string; wash: string; children: React.ReactNode }) {
  return (
    <span
      className="inline-flex self-start rounded-lg px-3 py-1 text-[11px] font-extrabold uppercase tracking-wide"
      style={{ backgroundColor: wash, color: deep }}
    >
      {children}
    </span>
  );
}

/**
 * PhaseStepper — the real components/learn/PhaseStepper.tsx, recreated at
 * card scale: 4 numbered 3D-tactile circles on a track, not a progress bar.
 * The real component also plays a three-beat seal/travel/unlock choreography
 * on advance; this keeps the shapes and colors but skips that timing —
 * proving the visual is more valuable here than a millisecond-accurate
 * replay of an animation this card triggers every few seconds anyway.
 */
function PhaseStepperVisual({ activeIndex }: { activeIndex: number }) {
  const phase = PHASES[activeIndex];
  const fillPct = [8, 33, 66, 100][activeIndex];

  return (
    <div className="relative border-b border-slate-100 bg-white px-5 pb-5 pt-4">
      {/* .headerBar::after — the 3px phase-accent edge along the top */}
      <div className="absolute inset-x-0 top-0 h-[3px] transition-colors" style={{ backgroundColor: phase.accent }} />

      <div className="flex items-start">
        <div className="relative flex flex-1 justify-between">
          {/* .lineTrack / .lineFill */}
          <div className="absolute left-[22px] right-[22px] top-[22px] h-1 rounded-full bg-slate-200" />
          <motion.div
            className="absolute left-[22px] top-[22px] h-1 rounded-full"
            style={{ backgroundColor: phase.accent }}
            animate={{ width: `calc((100% - 44px) * ${fillPct / 100})` }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
          />

          {PHASES.map((p, idx) => {
            const isDone = idx < activeIndex;
            const isCurrent = idx === activeIndex;
            return (
              <div key={p.id} className="relative z-[1] flex w-16 flex-col items-center">
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-full text-[15px] font-extrabold transition-colors"
                  style={
                    isDone
                      ? { backgroundColor: '#fff', color: phase.accent, boxShadow: `0 0 0 3px ${phase.accent} inset, 0 4px 0 #E2E8F0` }
                      : isCurrent
                        ? { backgroundColor: phase.accent, color: '#fff', boxShadow: `0 4px 0 ${phase.deep}` }
                        : { backgroundColor: '#E5E7EB', color: '#94A3B8', boxShadow: '0 4px 0 #CBD5E1' }
                  }
                >
                  {isDone ? <Check size={18} strokeWidth={3.5} /> : idx + 1}
                </div>
                <span
                  className="mt-1.5 whitespace-nowrap text-[12px] font-bold"
                  style={{ color: isCurrent ? '#1E293B' : isDone ? '#475569' : '#94A3B8' }}
                >
                  {p.label}
                </span>
              </div>
            );
          })}
        </div>

        <button
          type="button"
          aria-label="Close lesson"
          className="ml-3 mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-400"
        >
          <X size={18} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}

/** The real Apply card: lettered options, one selected, the CHECK button. */
function ApplyBody() {
  const [selected, setSelected] = useState(1);
  const options = ['A three-column card grid', 'Whatever the content actually needs', 'Copy the last project'];
  return (
    <div>
      <PhaseBadge deep="#16A34A" wash="rgba(34,197,94,0.07)">Apply</PhaseBadge>
      <h3 className="mt-2 text-xl font-extrabold text-ink">Which layout should you reach for first?</h3>
      <div className="mt-4 space-y-2.5">
        {options.map((text, i) => {
          const isSelected = i === selected;
          return (
            <button
              key={text}
              type="button"
              onClick={() => setSelected(i)}
              className="flex w-full items-center gap-3 rounded-2xl border-2 bg-white px-4 py-3 text-left transition-colors"
              style={
                isSelected
                  ? { backgroundColor: '#F0F6FF', borderColor: '#0172FD', boxShadow: '0 4px 0 #005AD5' }
                  : { borderColor: '#E2E8F0' }
              }
            >
              <span
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 text-sm font-extrabold"
                style={
                  isSelected
                    ? { backgroundColor: '#0172FD', borderColor: '#0172FD', color: '#fff' }
                    : { borderColor: '#CBD5E1', color: '#64748B' }
                }
              >
                {String.fromCharCode(65 + i)}
              </span>
              <span className="text-[15px] font-semibold text-ink">{text}</span>
            </button>
          );
        })}
      </div>
      <button
        type="button"
        className="mt-4 w-full rounded-2xl py-3.5 text-center text-sm font-extrabold text-white"
        style={{ backgroundColor: '#58CC02' }}
      >
        CHECK
      </button>
    </div>
  );
}

/** The real Reflect card: guided prompt, textarea, live word count. */
function ReflectBody() {
  const [text, setText] = useState('This will help me pick layouts on purpose instead of');
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return (
    <div>
      <PhaseBadge deep="#7420C4" wash="rgba(147,51,234,0.06)">Reflect</PhaseBadge>
      <h3 className="mt-2 text-xl font-extrabold text-ink">How will you use this?</h3>
      <div className="relative mt-4">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={4}
          className="w-full resize-none rounded-2xl border-2 border-slate-200 bg-white p-4 pb-9 text-[15px] text-ink outline-none focus:border-[#58CC02]"
        />
        <span className="absolute bottom-3 right-4 text-xs font-bold text-slate-400">
          {words} / 20 words
        </span>
      </div>
    </div>
  );
}

/**
 * The real Deepen card: getResourceIconInfo's exact per-type colors on
 * circular, 3D-tactile nodes (80px, box-shadow: 0 8px 0 <darker>, the same
 * pressed-button family as the CHECK button and the stepper circles) laid
 * out along a dashed connector — not a flat bordered list. A resource's kind
 * decides its color: PDF/Doc is red, Video is purple, Link is gold.
 */
function DeepenBody() {
  const resources = [
    { label: 'Layout cheat sheet', kind: 'PDF Guide', bg: '#FF4B4B', shadow: '#EA2B2B', Icon: FileText },
    { label: 'Walkthrough recording', kind: 'Video Tutorial', bg: '#7C5CFF', shadow: '#613EEA', Icon: Video },
    { label: 'Reference gallery', kind: 'Useful Link', bg: '#FFC800', shadow: '#E6B000', Icon: Link2 },
  ];
  return (
    <div>
      <PhaseBadge deep="#C77C08" wash="rgba(245,158,11,0.08)">Deepen</PhaseBadge>
      <h3 className="mt-2 text-xl font-extrabold text-ink">More rabbit holes! 🐰</h3>

      <div className="relative mt-6 flex justify-around">
        {/* Dashed connector — same idea as the real page's serpentine SVG path,
            simplified to a straight run since these three sit in one row. */}
        <div className="absolute left-10 right-10 top-8 h-0.5 border-t-2 border-dashed border-slate-200" />

        {resources.map((r) => (
          <div key={r.label} className="relative flex w-[92px] flex-col items-center text-center">
            <motion.button
              type="button"
              whileTap={{ y: 6, boxShadow: '0 0px 0 transparent' }}
              className="mb-2 flex h-16 w-16 items-center justify-center rounded-full"
              style={{ backgroundColor: r.bg, boxShadow: `0 6px 0 ${r.shadow}` }}
            >
              <r.Icon size={24} strokeWidth={2.5} color="white" />
            </motion.button>
            <span className="text-xs font-bold leading-tight text-[#3C4D6E]">{r.label}</span>
          </div>
        ))}
      </div>

      <button
        type="button"
        className="mt-7 w-full rounded-2xl py-3.5 text-center text-sm font-extrabold uppercase tracking-wide text-white"
        style={{ backgroundColor: '#58CC02', boxShadow: '0 5px 0 #46A302' }}
      >
        Finish Lesson
      </button>
    </div>
  );
}

/** The real Learn card: video-style block with the phase badge. */
function LearnBody() {
  return (
    <div>
      <PhaseBadge deep="#2D4AEE" wash="rgba(61,90,254,0.06)">Learn</PhaseBadge>
      <h3 className="mt-2 text-xl font-extrabold text-ink">Auto layout, in one idea</h3>
      <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
        Constraints decide how a frame resizes, not you, resizing it by hand every time content changes.
      </p>
      <div className="mt-4 flex aspect-video items-center justify-center rounded-2xl bg-[#0B1220]">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/15">
          <span className="ml-0.5 h-0 w-0 border-y-[10px] border-l-[16px] border-y-transparent border-l-white" />
        </span>
      </div>
    </div>
  );
}

const BODIES = [LearnBody, ApplyBody, ReflectBody, DeepenBody];

export default function LessonPhaseDemo() {
  const { active, select, containerRef } = useAutoAdvancingTabs(4);
  const Body = BODIES[active];

  return (
    <div ref={containerRef} className="w-full">
      <SegmentedTabs tabs={PHASES} active={active} onChange={select} />

      <div className="mt-6 overflow-hidden rounded-card bg-white shadow-lift ring-1 ring-black/4">
        <PhaseStepperVisual activeIndex={active} />

        <div className="p-6 md:p-7">
          <AnimatePresence mode="wait">
            <motion.div
              key={PHASES[active].id}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <Body />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
