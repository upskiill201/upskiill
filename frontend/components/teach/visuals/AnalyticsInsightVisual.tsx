'use client';

/**
 * AnalyticsInsightVisual — recreates the Creator Studio Analytics hub
 * (components/creator/analytics/hub/HubOverviewTab.tsx, RevenueTab.tsx,
 * bits.tsx's StatCard/TrendChart pattern) as a static marketing visual.
 * Framed around "you can see exactly what's working" — a KPI row plus an
 * enrollment trend and a per-course ranked bar, not a feature list. Same
 * chunky-card visual language as CreatorStudioVisual; illustrative numbers
 * only.
 */

import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { Star, TrendingUp, Users } from 'lucide-react';

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
    <div className="flex-1 rounded-2xl bg-white p-3" style={{ border: '2px solid #E5E5E5', borderBottomWidth: 4 }}>
      <span className="flex h-9 w-9 items-center justify-center rounded-xl" style={{ backgroundColor: bg }}>
        <Icon size={18} color={iconColor} strokeWidth={2.5} />
      </span>
      <p className="mt-2 text-lg font-extrabold text-[#3c3c3c]">{value}</p>
      <p className="text-[10px] font-bold uppercase tracking-wide text-[#afafaf]">{label}</p>
    </div>
  );
}

function TrendChart() {
  const points = [12, 18, 15, 24, 21, 30, 27, 36, 33, 44, 40, 52];
  const w = 280;
  const h = 64;
  const step = w / (points.length - 1);
  const max = Math.max(...points);
  const toXY = (v: number, i: number) => [i * step, h - (v / max) * (h - 8) - 4];
  const linePath = points.map((v, i) => `${i === 0 ? 'M' : 'L'} ${toXY(v, i).join(' ')}`).join(' ');
  const areaPath = `${linePath} L ${w} ${h} L 0 ${h} Z`;

  return (
    <div className="mt-4 rounded-2xl bg-white p-3" style={{ border: '2px solid #E5E5E5', borderBottomWidth: 4 }}>
      <p className="text-[11px] font-bold uppercase tracking-wide text-[#afafaf]">New enrollments (30 days)</p>
      <svg viewBox={`0 0 ${w} ${h}`} className="mt-2 w-full">
        <path d={areaPath} fill="#1cb0f6" opacity={0.15} />
        <motion.path
          d={linePath}
          fill="none"
          stroke="#1cb0f6"
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

function TopCourseRow() {
  return (
    <div className="mt-4 rounded-2xl bg-white p-3" style={{ border: '2px solid #E5E5E5', borderBottomWidth: 4 }}>
      <p className="text-[11px] font-bold uppercase tracking-wide text-[#afafaf]">Best performing course</p>
      <div className="mt-2 flex items-center gap-3">
        <span className="flex-1 truncate text-[13px] font-bold text-[#3c3c3c]">UI Design Fundamentals</span>
        <span className="text-[13px] font-extrabold" style={{ color: '#1899D6' }}>+68% enrollments</span>
      </div>
      <div className="mt-1.5 h-2.5 w-full overflow-hidden rounded-full" style={{ backgroundColor: '#F0F2F5' }}>
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: '#1cb0f6' }}
          initial={{ width: 0 }}
          animate={{ width: '82%' }}
          transition={{ duration: 0.7, delay: 0.2 }}
        />
      </div>
    </div>
  );
}

export default function AnalyticsInsightVisual() {
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
      <div className="flex gap-2.5">
        <StatCard icon={Users} label="Total Learners" value="6.2K" bg="#D7FFB8" iconColor="#58A700" />
        <StatCard icon={Star} label="Avg Rating" value="4.9" bg="#FFF4CC" iconColor="#E6B000" />
        <StatCard icon={TrendingUp} label="Growth" value="+68%" bg="#DDF4FF" iconColor="#1899D6" />
      </div>
      <TrendChart />
      <TopCourseRow />
    </motion.div>
  );
}
