import { Target } from 'lucide-react';
import ProgressBar3D from '@/components/ui/ProgressBar3D';
import type { DashboardResponse } from '../types';

export function WeeklyGoal({ goal }: { goal: DashboardResponse['weeklyGoal'] }) {
  const percentage = goal.target > 0 ? Math.round((goal.current / goal.target) * 100) : 0;
  const met = goal.current >= goal.target;

  return (
    <div className="rounded-xl border border-[#E2E8F0] bg-white p-5">
      <div className="flex items-center gap-2 mb-3">
        <Target size={18} color="#0172FD" />
        <h2 className="text-sm font-extrabold text-[#1F2A44]">Weekly Goal</h2>
      </div>
      <ProgressBar3D
        percentage={percentage}
        color={met ? 'green' : 'blue'}
        label={`${goal.current} / ${goal.target} XP this week`}
        valueLabel={met ? 'Goal met! 🎉' : `${goal.daysActive} days active`}
      />
    </div>
  );
}
