import { TrendingUp } from 'lucide-react';
import { pickImprovementInsufficientLine } from '@/lib/tey/analyticsVoice';
import type { DashboardResponse } from '../types';

export function ImprovementTrend({ improvement }: { improvement: DashboardResponse['improvement'] }) {
  return (
    <div className="rounded-xl border border-[#E2E8F0] bg-white p-5">
      <div className="flex items-center gap-2 mb-3">
        <TrendingUp size={18} color="#22C55E" />
        <h2 className="text-sm font-extrabold text-[#1F2A44]">Am I Improving?</h2>
      </div>

      {!improvement.hasEnoughData ? (
        <p className="text-sm text-[#64748B]">{pickImprovementInsufficientLine()}</p>
      ) : (
        <div className="flex items-center gap-4">
          <div className="text-center">
            <p className="text-2xl font-extrabold text-[#94A3B8]">{improvement.fromPct}%</p>
            <p className="text-[11px] font-semibold text-[#94A3B8]">Earlier lessons</p>
          </div>
          <TrendingUp size={20} color="#22C55E" />
          <div className="text-center">
            <p className="text-2xl font-extrabold text-[#22C55E]">{improvement.toPct}%</p>
            <p className="text-[11px] font-semibold text-[#94A3B8]">Recent lessons</p>
          </div>
          <p className="text-sm text-[#1F2A44] font-semibold ml-2">
            {(improvement.toPct ?? 0) > (improvement.fromPct ?? 0)
              ? "You're getting better 🚀"
              : 'Consistent so far — keep at it.'}
          </p>
        </div>
      )}
    </div>
  );
}
