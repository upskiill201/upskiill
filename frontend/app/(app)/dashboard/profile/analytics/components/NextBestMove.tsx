'use client';

import { useRouter } from 'next/navigation';
import { Target } from 'lucide-react';
import DuolingoButton3D from '@/components/creator-onboarding/DuolingoButton3D';
import { getNextBestMoveCopy } from '@/lib/tey/analyticsVoice';
import type { DashboardResponse } from '../types';

export function NextBestMove({ move }: { move: DashboardResponse['nextBestMove'] }) {
  const router = useRouter();
  const copy = getNextBestMoveCopy(move.action, move.data);

  const handleClick = () => {
    router.push(move.courseId ? `/learn/${move.courseId}` : '/dashboard');
  };

  return (
    <div className="rounded-xl border border-[#E2E8F0] bg-gradient-to-br from-[#1F2A44] to-[#3D5AFE] p-6 text-white">
      <div className="flex items-center gap-2 mb-2 opacity-80">
        <Target size={16} />
        <span className="text-xs font-bold uppercase tracking-wide">Your Next Best Move</span>
      </div>
      <h3 className="text-lg font-extrabold mb-1">{copy.headline}</h3>
      <p className="text-sm text-white/85 mb-5">{copy.detail}</p>
      <DuolingoButton3D onClick={handleClick} showArrow>
        {copy.cta}
      </DuolingoButton3D>
    </div>
  );
}
