'use client';

import { useRouter } from 'next/navigation';
import { Target } from 'lucide-react';
import type { DashboardResponse } from '../types';

export function AreasToImprove({ areas }: { areas: DashboardResponse['areasToImprove'] }) {
  const router = useRouter();
  if (areas.length === 0) return null;

  return (
    <div className="rounded-xl border border-[#E2E8F0] bg-white p-5">
      <div className="flex items-center gap-2 mb-3">
        <Target size={18} color="#F59E0B" />
        <h2 className="text-sm font-extrabold text-[#1F2A44]">Areas to Improve</h2>
      </div>
      <div className="flex flex-col gap-3">
        {areas.map((area, i) => (
          <div key={i} className="flex items-center justify-between gap-3 rounded-lg bg-[#F5F7FB] p-3">
            <div>
              <p className="text-sm font-bold text-[#1F2A44]">{area.courseTitle}</p>
              <p className="text-xs text-[#64748B]">
                {area.type === 'low_score'
                  ? `You've struggled with this more than others (avg ${area.avgScore}%).`
                  : `You haven't returned to this in ${area.idleDays} days.`}
              </p>
            </div>
            {area.courseId && (
              <button
                type="button"
                onClick={() => router.push(`/learn/${area.courseId}`)}
                className="shrink-0 text-xs font-bold text-[#0172FD] hover:text-[#00459E]"
              >
                {area.type === 'low_score' ? 'Practice Again' : 'Continue'}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
