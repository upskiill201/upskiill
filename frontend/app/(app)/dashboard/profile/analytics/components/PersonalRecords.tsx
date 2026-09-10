import { Flame, Zap, BookOpen, Clock, Trophy } from 'lucide-react';
import { pickRecordsEmptyLine } from '@/lib/tey/analyticsVoice';
import type { DashboardResponse } from '../types';

function formatSeconds(seconds: number): string {
  const minutes = Math.round(seconds / 60);
  if (minutes < 60) return `${minutes}m`;
  return `${Math.floor(minutes / 60)}h ${minutes % 60}m`;
}

export function PersonalRecords({ records }: { records: DashboardResponse['records'] }) {
  if (!records.hasAnyRecord) {
    return (
      <div className="rounded-xl border border-[#E2E8F0] bg-white p-5 text-center">
        <Trophy size={22} color="#94A3B8" className="mx-auto mb-2" />
        <p className="text-sm text-[#64748B]">{pickRecordsEmptyLine()}</p>
      </div>
    );
  }

  const tiles = [
    { icon: Flame, color: '#FF9600', value: `${records.longestStreakDays} days`, label: 'Longest Streak' },
    records.bestXpDay && { icon: Zap, color: '#22C55E', value: `${records.bestXpDay.value} XP`, label: 'Best XP Day' },
    records.bestLessonsDay && { icon: BookOpen, color: '#0EA5E9', value: `${records.bestLessonsDay.value}`, label: 'Most Lessons/Day' },
    records.bestTimeDay && { icon: Clock, color: '#8B5CF6', value: formatSeconds(records.bestTimeDay.seconds), label: 'Longest Day' },
  ].filter(Boolean) as Array<{ icon: typeof Flame; color: string; value: string; label: string }>;

  return (
    <div className="rounded-xl border border-[#E2E8F0] bg-white p-5">
      <div className="flex items-center gap-2 mb-4">
        <Trophy size={18} color="#FF9600" />
        <h2 className="text-sm font-extrabold text-[#1F2A44]">Your Best Self</h2>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {tiles.map((t) => (
          <div key={t.label} className="rounded-lg bg-[#F5F7FB] p-3">
            <t.icon size={16} color={t.color} />
            <p className="text-base font-extrabold text-[#1F2A44] mt-1">{t.value}</p>
            <p className="text-[11px] font-semibold text-[#94A3B8]">{t.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
