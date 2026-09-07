import { Scale } from 'lucide-react';
import ProgressBar3D from '@/components/ui/ProgressBar3D';
import type { DashboardResponse } from '../types';

const COLORS: Array<'blue' | 'green' | 'purple'> = ['blue', 'green', 'purple'];

export function LearningBalance({ balance }: { balance: DashboardResponse['learningBalance'] }) {
  if (balance.length < 2) return null; // only meaningful once split across >1 course

  return (
    <div className="rounded-xl border border-[#E2E8F0] bg-white p-5">
      <div className="flex items-center gap-2 mb-4">
        <Scale size={18} color="#8B5CF6" />
        <h2 className="text-sm font-extrabold text-[#1F2A44]">Learning Balance</h2>
      </div>
      <div className="flex flex-col gap-3">
        {balance.slice(0, 5).map((entry, i) => (
          <ProgressBar3D
            key={entry.courseId}
            percentage={entry.percentage}
            label={entry.title}
            valueLabel={`${entry.percentage}%`}
            size="sm"
            color={COLORS[i % COLORS.length]}
          />
        ))}
      </div>
    </div>
  );
}
