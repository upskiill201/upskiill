import { Eye } from 'lucide-react';
import { formatInsightLine } from '@/lib/tey/analyticsVoice';
import type { DashboardResponse } from '../types';

export function TeyInsights({ insights }: { insights: DashboardResponse['insights'] }) {
  if (insights.length === 0) return null;

  return (
    <div className="rounded-xl border border-[#E2E8F0] bg-white p-5">
      <div className="flex items-center gap-2 mb-3">
        <Eye size={18} color="#0172FD" />
        <h2 className="text-sm font-extrabold text-[#1F2A44]">What Tey Notices</h2>
      </div>
      <div className="flex flex-col gap-2.5">
        {insights.map((insight) => (
          <div key={insight.id} className="rounded-lg bg-[#F5F7FB] px-4 py-3">
            <p className="text-sm font-semibold text-[#1F2A44]">{formatInsightLine(insight.id, insight.data)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
