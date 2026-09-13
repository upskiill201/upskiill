'use client';

/**
 * CreatorStudioVisual — three real Teyro Creator Studio screens, recreated
 * in code from the shipped CSS, not invented:
 *
 *  - Analytics: app/creator/analytics/page.tsx's hub — HubOverviewTab's
 *    StatCard grid and the hand-drawn SVG TrendChart (bits.tsx/bits.module.css),
 *    Duolingo-style chunky-bordered cards, not the app's usual rounded-card look.
 *  - Earnings: app/creator/earnings/page.tsx's OverviewTab — the big green
 *    "Available to withdraw" balance card and tier badge
 *    (earnings.module.css — explicitly "Duolingo-style tokens matching analytics").
 *  - Dashboard: app/creator/page.tsx's CreatorDashboard.module.css focus
 *    hero — the blue gradient card with the flat "slab" 3D shadow
 *    (0 7px 0 0 #0050B3), the white 3D CTA button, and Tey's speech bubble.
 *
 * These three screens run their own Duolingo-chunky visual language
 * (2px + thick bottom-border cards, flat colored drop shadows) distinct from
 * the rounded-card/shadow-lift look everywhere else on this page — kept
 * as-is here because that IS the real Creator Studio, not a mismatch.
 */

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { ArrowRight, Crown, Hourglass, Landmark, Layers, Star, TrendingUp, Users } from 'lucide-react';
import { SegmentedTabs, useAutoAdvancingTabs } from '../SegmentedTabs';

const TABS = [
  { id: 'analytics', label: 'Analytics', accent: '#58cc02' },
  { id: 'earnings', label: 'Earnings', accent: '#1cb0f6' },
  { id: 'dashboard', label: 'Dashboard', accent: '#0172FD' },
];

/** bits.module.css .statCard — chunky 2px + 4px-bottom bordered card. */
function StatCard({
  icon: Icon,
  label,
  value,
  bg,
  iconColor,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  bg: string;
  iconColor: string;
}) {
  return (
    <div
      className="flex-1 rounded-2xl bg-white p-3"
      style={{ border: '2px solid #E5E5E5', borderBottomWidth: 4 }}
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-xl" style={{ backgroundColor: bg }}>
        <Icon size={18} color={iconColor} strokeWidth={2.5} />
      </span>
      <p className="mt-2 text-lg font-extrabold text-[#3c3c3c]">{value}</p>
      <p className="text-[10px] font-bold uppercase tracking-wide text-[#afafaf]">{label}</p>
    </div>
  );
}

/** bits.tsx's TrendChart — hand-drawn inline SVG, not a chart library. */
function TrendChart({ color, label }: { color: string; label: string }) {
  const points = [8, 14, 11, 20, 17, 26, 24, 32, 29, 38];
  const w = 280;
  const h = 64;
  const step = w / (points.length - 1);
  const max = Math.max(...points);
  const toXY = (v: number, i: number) => [i * step, h - (v / max) * (h - 8) - 4];
  const linePath = points.map((v, i) => `${i === 0 ? 'M' : 'L'} ${toXY(v, i).join(' ')}`).join(' ');
  const areaPath = `${linePath} L ${w} ${h} L 0 ${h} Z`;

  return (
    <div className="mt-4 rounded-2xl bg-white p-3" style={{ border: '2px solid #E5E5E5', borderBottomWidth: 4 }}>
      <p className="text-[11px] font-bold uppercase tracking-wide text-[#afafaf]">{label}</p>
      <svg viewBox={`0 0 ${w} ${h}`} className="mt-2 w-full">
        <path d={areaPath} fill={color} opacity={0.15} />
        <motion.path
          d={linePath}
          fill="none"
          stroke={color}
          strokeWidth={3}
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
        />
      </svg>
    </div>
  );
}

function AnalyticsBody() {
  return (
    <div>
      <div className="flex gap-2.5">
        <StatCard icon={Users} label="Total Learners" value="18.6K" bg="#D7FFB8" iconColor="#58A700" />
        <StatCard icon={Star} label="Avg Rating" value="4.9" bg="#FFF4CC" iconColor="#E6B000" />
      </div>
      <TrendChart color="#1cb0f6" label="New Enrollments (30 days)" />
    </div>
  );
}

function EarningsBody() {
  return (
    <div>
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
        <p className="mt-1 text-[2rem] font-extrabold leading-none" style={{ color: '#58A700' }}>$18,240.00</p>

        <div className="mt-4 flex flex-col gap-2.5 border-t border-slate-100 pt-3">
          <div className="flex items-center gap-2.5 text-sm">
            <Hourglass size={16} color="#FF9600" />
            <span className="flex-1 font-semibold text-slate-500">Pending clearing</span>
            <span className="font-extrabold text-[#3c3c3c]">$1,860.00</span>
          </div>
          <div className="flex items-center gap-2.5 text-sm">
            <Landmark size={16} color="#1899D6" />
            <span className="flex-1 font-semibold text-slate-500">Lifetime earned</span>
            <span className="font-extrabold text-[#3c3c3c]">$142,300.00</span>
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-2xl bg-white p-3" style={{ border: '2px solid #E5E5E5', borderBottomWidth: 4 }}>
        <p className="text-[11px] font-bold uppercase tracking-wide text-[#afafaf]">Earnings by course</p>
        <div className="mt-2 flex items-center gap-3">
          <span className="flex-1 truncate text-[13px] font-bold text-[#3c3c3c]">UI Design Fundamentals</span>
          <span className="text-[13px] font-extrabold" style={{ color: '#B45309' }}>$6,420</span>
        </div>
        <div className="mt-1.5 h-2.5 w-full overflow-hidden rounded-full" style={{ backgroundColor: '#F0F2F5' }}>
          <div className="h-full rounded-full" style={{ width: '85%', backgroundColor: '#FFC800' }} />
        </div>
      </div>
    </div>
  );
}

function DashboardBody() {
  return (
    <div
      className="relative overflow-hidden rounded-3xl p-5"
      style={{
        background: 'linear-gradient(135deg, #0172FD 0%, #3A96FF 100%)',
        border: '2px solid rgba(255,255,255,0.3)',
        boxShadow: '0 7px 0 0 #0050B3, 0 14px 24px -6px rgba(1,114,253,0.35)',
      }}
    >
      <span
        className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wide text-white"
        style={{ background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.35)' }}
      >
        <Layers size={12} /> Published Course
      </span>

      <h3 className="mt-3 text-lg font-black text-white" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.12)' }}>
        UI Design Fundamentals
      </h3>
      <p className="mt-1 text-[12px] font-bold uppercase tracking-wide text-white/70">
        18.6K students enrolled &middot; 4.9 rating
      </p>
      <p className="mt-2 text-[13px] font-medium leading-relaxed text-white/85">
        Keep up the momentum! Finish refining your curriculum modules and interactive practice cards.
      </p>

      <button
        type="button"
        className="mt-4 flex items-center gap-2 rounded-2xl bg-white px-4 py-2.5 text-[13px] font-extrabold text-[#0172FD]"
        style={{ boxShadow: '0 3.5px 0 0 #D4E5F9' }}
      >
        Manage Curriculum
        <span className="flex h-5 w-5 items-center justify-center rounded-full" style={{ backgroundColor: '#EEF6FF' }}>
          <ArrowRight size={12} />
        </span>
      </button>

      <div className="absolute -bottom-3 -right-3 h-24 w-24 opacity-90">
        <Image src="/dashboard tey.webp" alt="" fill className="object-contain" style={{ filter: 'drop-shadow(0 6px 14px rgba(0,0,0,0.25))' }} />
      </div>
    </div>
  );
}

const BODIES: Record<string, () => React.JSX.Element> = {
  analytics: AnalyticsBody,
  earnings: EarningsBody,
  dashboard: DashboardBody,
};

export default function CreatorStudioVisual() {
  const { active, select, containerRef } = useAutoAdvancingTabs(3, 4200);
  const tab = TABS[active];
  const Body = BODIES[tab.id];
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: '-100px 0px' });

  return (
    <div ref={containerRef} className="w-full">
      <SegmentedTabs tabs={TABS} active={active} onChange={select} />

      <motion.div
        ref={ref}
        initial={reducedMotion ? false : { opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.4 }}
        className="mt-6 rounded-card p-5"
        style={{ background: '#F8FAFC' }}
      >
        <Body key={tab.id} />
      </motion.div>
    </div>
  );
}
