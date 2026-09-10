'use client';

import { useState } from 'react';
import useSWR from 'swr';
import { fetcher } from '@/lib/swr';
import { Flame, Clock, BookOpen, Zap, Calendar } from 'lucide-react';
import { CardSkeleton } from './AnalyticsSkeleton';
import { AnalyticsSectionError } from './AnalyticsSectionError';

type Period = 'week' | 'month' | 'all';

interface StatsSummary {
  lessonsCompleted: number;
  hoursLearned: string;
  xpEarned: number;
  activeDays: number;
  currentStreak: number;
}

const PERIODS: { key: Period; label: string }[] = [
  { key: 'week', label: 'This Week' },
  { key: 'month', label: 'This Month' },
  { key: 'all', label: 'All Time' },
];

/**
 * Reuses the existing, already-real `/v2/progress/stats-summary` endpoint
 * (progress.service.ts's getStatsSummary) rather than duplicating
 * week/month/all filtering inside the new learner-analytics module — one
 * source of truth for these numbers across the app.
 */
export function LearningSnapshot() {
  const [period, setPeriod] = useState<Period>('week');
  const offset = typeof window !== 'undefined' ? new Date().getTimezoneOffset() : 0;
  const { data, error, isLoading, mutate } = useSWR<StatsSummary>(
    `/api/v2/progress/stats-summary?filter=${period}&timezoneOffset=${offset}`,
    fetcher,
  );

  if (isLoading && !data) return <CardSkeleton height={80} />;
  if (error) return <AnalyticsSectionError label="your snapshot" onRetry={() => mutate()} />;

  const stats = [
    { icon: Calendar, color: '#0172FD', value: data?.activeDays ?? 0, label: 'Days' },
    { icon: Clock, color: '#8B5CF6', value: data?.hoursLearned ?? '0m', label: 'Time' },
    { icon: BookOpen, color: '#0EA5E9', value: data?.lessonsCompleted ?? 0, label: 'Lessons' },
    { icon: Zap, color: '#22C55E', value: `${data?.xpEarned ?? 0} XP`, label: 'XP' },
    { icon: Flame, color: '#FF9600', value: `${data?.currentStreak ?? 0}`, label: 'Streak' },
  ];

  return (
    <div className="rounded-xl border border-[#E2E8F0] bg-white p-5">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <h2 className="text-sm font-extrabold text-[#1F2A44]">Learning Snapshot</h2>
        <div className="flex gap-1 rounded-full bg-[#F5F7FB] p-1">
          {PERIODS.map((p) => (
            <button
              key={p.key}
              type="button"
              onClick={() => setPeriod(p.key)}
              className={`px-3 py-1 text-xs font-semibold rounded-full transition-colors ${
                period === p.key ? 'bg-white text-[#0172FD] shadow-none border border-[#E2E8F0]' : 'text-[#64748B]'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {stats.map((s) => (
          <div key={s.label} className="flex flex-col items-center gap-1 rounded-lg bg-[#F5F7FB] py-3">
            <s.icon size={18} color={s.color} />
            <span className="text-sm font-extrabold text-[#1F2A44]">{s.value}</span>
            <span className="text-[11px] font-semibold text-[#94A3B8]">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
