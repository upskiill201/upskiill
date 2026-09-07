'use client';

import { useMemo } from 'react';
import Image from 'next/image';
import { pickHeroLine } from '@/lib/tey/analyticsVoice';
import type { DashboardResponse } from '../types';

export function AnalyticsHero({ data }: { data: DashboardResponse }) {
  const { heroState, snapshot, momentum } = data;

  const line = useMemo(
    () =>
      pickHeroLine(heroState, {
        daysSinceLastActive: momentum.daysSinceLastActive,
        streakDays: snapshot.streakDays,
        monthDaysActive: snapshot.monthDaysActive,
      }),
    [heroState, momentum.daysSinceLastActive, snapshot.streakDays, snapshot.monthDaysActive],
  );

  return (
    <div className="relative overflow-hidden rounded-xl border border-[#E2E8F0] bg-gradient-to-br from-[#EEF2FF] to-[#F5F7FB] p-6 sm:p-8">
      <div className="flex items-start gap-4">
        <div className="hidden sm:block shrink-0">
          <Image src="/Icons/burn.png" alt="" width={48} height={48} />
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-[#0172FD]">Your Learning Intelligence</p>
          <h1 className="mt-1 text-xl sm:text-2xl font-extrabold text-[#1F2A44] leading-snug">{line}</h1>
        </div>
      </div>
    </div>
  );
}
