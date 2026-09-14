'use client';

/**
 * EarningsGrowthVisual — recreates the Creator Studio Earnings screen
 * (components/creator/earnings/OverviewTab.tsx, earnings.module.css) as a
 * static marketing visual: the "Available to withdraw" balance card plus a
 * month-over-month trend line, to sell that income compounds over time
 * rather than just showing a single balance snapshot. Same chunky-card
 * language as the homepage's CreatorStudioVisual (2px + 4px-bottom borders,
 * flat colored accents) — illustrative numbers only, not real platform
 * stats.
 */

import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { Crown, Hourglass, Landmark } from 'lucide-react';

const MONTHS = [
  { label: 'Apr', value: 3200 },
  { label: 'May', value: 4100 },
  { label: 'Jun', value: 5400 },
  { label: 'Jul', value: 6800 },
  { label: 'Aug', value: 8900 },
  { label: 'Sep', value: 11600 },
];

function GrowthChart() {
  const w = 280;
  const h = 72;
  const max = Math.max(...MONTHS.map((m) => m.value));
  const step = w / (MONTHS.length - 1);
  const toXY = (v: number, i: number) => [i * step, h - (v / max) * (h - 10) - 4];
  const linePath = MONTHS.map((m, i) => `${i === 0 ? 'M' : 'L'} ${toXY(m.value, i).join(' ')}`).join(' ');
  const areaPath = `${linePath} L ${w} ${h} L 0 ${h} Z`;

  return (
    <div className="mt-4 rounded-2xl bg-white p-3" style={{ border: '2px solid #E5E5E5', borderBottomWidth: 4 }}>
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-bold uppercase tracking-wide text-[#afafaf]">Monthly earnings</p>
        <span className="text-[11px] font-extrabold" style={{ color: '#58A700' }}>+263% in 6 months</span>
      </div>
      <svg viewBox={`0 0 ${w} ${h}`} className="mt-2 w-full">
        <path d={areaPath} fill="#58A700" opacity={0.12} />
        <motion.path
          d={linePath}
          fill="none"
          stroke="#58A700"
          strokeWidth={3}
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
        />
      </svg>
      <div className="mt-1 flex justify-between text-[10px] font-bold uppercase tracking-wide text-[#afafaf]">
        {MONTHS.map((m) => (
          <span key={m.label}>{m.label}</span>
        ))}
      </div>
    </div>
  );
}

export default function EarningsGrowthVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: '-100px 0px' });

  return (
    <motion.div
      ref={ref}
      initial={reducedMotion ? false : { opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.4 }}
      className="w-full rounded-card p-5"
      style={{ background: '#F8FAFC' }}
    >
      <div className="rounded-2xl bg-white p-4" style={{ border: '2px solid #E5E5E5', borderBottomWidth: 4 }}>
        <div className="flex items-center justify-between">
          <p className="text-[11px] font-bold uppercase tracking-wide text-[#afafaf]">Available to withdraw</p>
          <span
            className="flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-extrabold"
            style={{ backgroundColor: '#FFF4CC', color: '#B45309' }}
          >
            <Crown size={12} /> Founding &middot; 70%
          </span>
        </div>
        <p className="mt-1 text-[2rem] font-extrabold leading-none" style={{ color: '#58A700' }}>$11,600.00</p>

        <div className="mt-4 flex flex-col gap-2.5 border-t border-slate-100 pt-3">
          <div className="flex items-center gap-2.5 text-sm">
            <Hourglass size={16} color="#FF9600" />
            <span className="flex-1 font-semibold text-slate-500">Pending clearing</span>
            <span className="font-extrabold text-[#3c3c3c]">$1,240.00</span>
          </div>
          <div className="flex items-center gap-2.5 text-sm">
            <Landmark size={16} color="#1899D6" />
            <span className="flex-1 font-semibold text-slate-500">Lifetime earned</span>
            <span className="font-extrabold text-[#3c3c3c]">$39,900.00</span>
          </div>
        </div>
      </div>

      <GrowthChart />
    </motion.div>
  );
}
