'use client';

import { Calendar } from 'lucide-react';
import { useAnalyticsHeatmap } from '../hooks/useAnalyticsHeatmap';
import { CardSkeleton } from './AnalyticsSkeleton';
import { AnalyticsSectionError } from './AnalyticsSectionError';

const INTENSITY_BG = ['#F1F5F9', '#BFDBFE', '#60A5FA', '#2563EB', '#1D4ED8'];

function formatDate(dateStr: string) {
  return new Date(`${dateStr}T00:00:00Z`).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

/** Chunks the chronological day list into 7-day columns for the GitHub-style grid. Sequential chunks, not calendar-week-aligned — a deliberate simplification, still reads correctly as a consistency map. */
function chunkIntoWeeks<T>(days: T[]): T[][] {
  const weeks: T[][] = [];
  for (let i = 0; i < days.length; i += 7) weeks.push(days.slice(i, i + 7));
  return weeks;
}

export function ActivityHeatmap() {
  const { data, error, isLoading } = useAnalyticsHeatmap(12);

  if (isLoading && !data) return <CardSkeleton height={140} />;
  if (error) return <AnalyticsSectionError label="your activity heatmap" />;
  if (!data) return null;

  const weeks = chunkIntoWeeks(data.days);

  return (
    <div className="rounded-xl border border-[#E2E8F0] bg-white p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Calendar size={18} color="#64748B" />
          <h2 className="text-sm font-extrabold text-[#1F2A44]">12-Week Activity</h2>
        </div>
        {data.mostActiveMonth && (
          <span className="text-xs font-semibold text-[#64748B]">
            Best month:{' '}
            {new Date(`${data.mostActiveMonth.month}-01T00:00:00Z`).toLocaleDateString('en-US', { month: 'long' })} (
            {data.mostActiveMonth.daysActive} days)
          </span>
        )}
      </div>

      <div className="overflow-x-auto pb-1">
        <div className="flex gap-1 min-w-max">
          {weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-1">
              {week.map((day) => (
                <div
                  key={day.date}
                  role="img"
                  aria-label={`${formatDate(day.date)}: ${day.lessonsCompleted} lesson${day.lessonsCompleted === 1 ? '' : 's'}, ${day.xpEarned} XP`}
                  title={`${formatDate(day.date)} — ${day.lessonsCompleted} lesson${day.lessonsCompleted === 1 ? '' : 's'}, ${day.xpEarned} XP`}
                  className="w-3.5 h-3.5 rounded-[3px]"
                  style={{ backgroundColor: INTENSITY_BG[day.intensity] }}
                  tabIndex={0}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-1.5 mt-3 justify-end">
        <span className="text-[11px] text-[#94A3B8]">Less</span>
        {INTENSITY_BG.map((bg) => (
          <div key={bg} className="w-2.5 h-2.5 rounded-[2px]" style={{ backgroundColor: bg }} />
        ))}
        <span className="text-[11px] text-[#94A3B8]">More</span>
      </div>
    </div>
  );
}
