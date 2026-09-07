'use client';

import { useMemo, useState } from 'react';
import { useAnalyticsActivity } from '../hooks/useAnalyticsActivity';
import { CardSkeleton } from './AnalyticsSkeleton';
import { AnalyticsSectionError } from './AnalyticsSectionError';
import type { ActivityMetric, ActivityPeriod } from '../types';

const PERIODS: { key: ActivityPeriod; label: string }[] = [
  { key: '7d', label: '7D' },
  { key: '30d', label: '30D' },
  { key: '3m', label: '3M' },
  { key: 'all', label: 'All' },
];

const METRICS: { key: ActivityMetric; label: string }[] = [
  { key: 'xp', label: 'XP' },
  { key: 'time', label: 'Time' },
  { key: 'lessons', label: 'Lessons' },
  { key: 'activity', label: 'Active Days' },
];

/** Hand-rolled SVG line chart — no charting library is installed, and one point-array like this doesn't need one (precedent: components/creator/students/bits.tsx's QuizSparkline). */
export function ActivityChart() {
  const [period, setPeriod] = useState<ActivityPeriod>('30d');
  const [metric, setMetric] = useState<ActivityMetric>('xp');
  const { data, error, isLoading, mutate } = useAnalyticsActivity(period, metric);

  const { path, area, hasData } = useMemo(() => {
    if (!data || data.points.length < 2) return { path: '', area: '', hasData: false };
    const w = 600;
    const h = 120;
    const max = Math.max(...data.points.map((p) => p.value), 1);
    const stepX = w / (data.points.length - 1);
    const coords = data.points.map((p, i) => [i * stepX, h - (p.value / max) * (h - 8) - 4] as const);
    const linePath = coords.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`).join(' ');
    const areaPath = `${linePath} L${w},${h} L0,${h} Z`;
    const hasAnyValue = data.points.some((p) => p.value > 0);
    return { path: linePath, area: areaPath, hasData: hasAnyValue };
  }, [data]);

  return (
    <div className="rounded-xl border border-[#E2E8F0] bg-white p-5">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <h2 className="text-sm font-extrabold text-[#1F2A44]">Activity Over Time</h2>
        <div className="flex gap-1 rounded-full bg-[#F5F7FB] p-1">
          {PERIODS.map((p) => (
            <button
              key={p.key}
              type="button"
              onClick={() => setPeriod(p.key)}
              className={`px-2.5 py-1 text-xs font-semibold rounded-full ${period === p.key ? 'bg-white text-[#0172FD] border border-[#E2E8F0]' : 'text-[#64748B]'}`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-2 mb-4 flex-wrap">
        {METRICS.map((m) => (
          <button
            key={m.key}
            type="button"
            onClick={() => setMetric(m.key)}
            className={`px-3 py-1 text-xs font-bold rounded-full border ${
              metric === m.key ? 'bg-[#EEF2FF] border-[#3D5AFE] text-[#3D5AFE]' : 'border-[#E2E8F0] text-[#64748B]'
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      {isLoading && !data ? (
        <CardSkeleton height={120} />
      ) : error ? (
        <AnalyticsSectionError label="this chart" onRetry={() => mutate()} />
      ) : !hasData ? (
        <p className="text-sm text-[#64748B] text-center py-8">No activity in this period yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <svg viewBox="0 0 600 120" preserveAspectRatio="none" className="w-full h-28 min-w-[400px]">
            <path d={area} fill="#EEF2FF" stroke="none" />
            <path d={path} fill="none" stroke="#3D5AFE" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      )}
    </div>
  );
}
