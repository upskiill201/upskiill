import { Rocket, Flame, ArrowRight, TrendingDown, HeartPulse } from 'lucide-react';
import { pickMomentumLine } from '@/lib/tey/analyticsVoice';
import ProgressBar3D from '@/components/ui/ProgressBar3D';
import type { DashboardResponse } from '../types';

const MOMENTUM_CONFIG = {
  rising: { icon: Rocket, color: 'blue' as const, label: 'Rising' },
  strong: { icon: Flame, color: 'green' as const, label: 'Strong' },
  steady: { icon: ArrowRight, color: 'blue' as const, label: 'Steady' },
  slowing: { icon: TrendingDown, color: 'purple' as const, label: 'Slowing' },
  stalled: { icon: HeartPulse, color: 'purple' as const, label: 'Stalled' },
};

export function MomentumCard({ momentum }: { momentum: DashboardResponse['momentum'] }) {
  const cfg = MOMENTUM_CONFIG[momentum.state];
  const Icon = cfg.icon;

  return (
    <div className="rounded-xl border border-[#E2E8F0] bg-white p-5">
      <div className="flex items-center gap-2 mb-3">
        <Icon size={18} color="#0172FD" />
        <h2 className="text-sm font-extrabold text-[#1F2A44]">Your Momentum</h2>
      </div>
      <p className="text-sm font-semibold text-[#1F2A44] mb-4">{pickMomentumLine(momentum.state)}</p>
      <ProgressBar3D percentage={momentum.score} color={cfg.color} valueLabel={cfg.label} size="sm" />
    </div>
  );
}
