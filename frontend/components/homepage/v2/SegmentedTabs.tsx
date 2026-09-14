'use client';

/**
 * SegmentedTabs — the "click a control, the content changes" primitive.
 *
 * This is the Coddy mechanic (its editor tab strip: Code / SQL / Web / AI
 * Chat / Terminal swaps the panel below it) applied to two different Teyro
 * stories: the lesson phases, and the reward systems. One control, reused
 * twice rather than invented twice — same interaction, different content.
 *
 * Auto-advances on a timer so a visitor who never clicks still sees the
 * whole story, and stops advancing the moment they interact — nothing here
 * should keep changing under someone actively reading it.
 */

import React, { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';

interface SegmentedTabsProps {
  /** `textOnAccent` overrides the active tab's text color — needed for a
   *  light accent like the Monthly Quest's gold, where white text loses
   *  contrast. Defaults to white. */
  tabs: { id: string; label: string; accent: string; textOnAccent?: string }[];
  active: number;
  onChange: (index: number) => void;
}

export function useAutoAdvancingTabs(count: number, intervalMs = 3800) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const inView = useInView(containerRef, { margin: '-100px 0px' });

  useEffect(() => {
    if (paused || reducedMotion || !inView) return;
    const id = setInterval(() => setActive((a) => (a + 1) % count), intervalMs);
    return () => clearInterval(id);
  }, [paused, reducedMotion, inView, count, intervalMs]);

  const select = (index: number) => {
    setPaused(true);
    setActive(index);
  };

  return { active, select, containerRef, inView };
}

export function SegmentedTabs({ tabs, active, onChange }: SegmentedTabsProps) {
  return (
    <div className="flex flex-wrap justify-start gap-2" role="tablist">
      {tabs.map((tab, i) => {
        const isActive = i === active;
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(i)}
            className={[
              'rounded-full border-2 px-4 py-2 text-sm font-extrabold transition-colors',
              isActive ? '' : 'border-slate-200 bg-white text-ink-soft hover:border-slate-300',
            ].join(' ')}
            style={
              isActive
                ? { backgroundColor: tab.accent, borderColor: tab.accent, color: tab.textOnAccent ?? '#fff' }
                : undefined
            }
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
