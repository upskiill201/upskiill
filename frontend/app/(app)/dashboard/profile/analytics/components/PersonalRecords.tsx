import { Flame, Zap, type LucideIcon } from 'lucide-react';
import { Glyph, type GlyphName } from '@/components/art/Glyph';
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
        <Glyph name="trophy" size={22} color="var(--text-muted)" className="mx-auto mb-2" />
        <p className="text-sm text-[#64748B]">{pickRecordsEmptyLine()}</p>
      </div>
    );
  }

  const tiles = [
    { icon: Flame, color: '#FF9600', value: `${records.longestStreakDays} days`, label: 'Longest Streak' },
    records.bestXpDay && { icon: Zap, color: '#22C55E', value: `${records.bestXpDay.value} XP`, label: 'Best XP Day' },
    records.bestLessonsDay && { icon: 'book', color: 'var(--color-brand)', value: `${records.bestLessonsDay.value}`, label: 'Most Lessons/Day' },
    records.bestTimeDay && { icon: 'clock', color: 'var(--brand-purple)', value: formatSeconds(records.bestTimeDay.seconds), label: 'Longest Day' },
  ].filter(Boolean) as Array<{ icon: GlyphName | LucideIcon; color: string; value: string; label: string }>; // streak + XP keep their marks

  return (
    <div className="rounded-xl border border-[#E2E8F0] bg-white p-5">
      <div className="flex items-center gap-2 mb-4">
        <Glyph name="trophy" size={18} color="color-mix(in srgb, var(--warning) 60%, var(--error-red))" />
        <h2 className="text-sm font-extrabold text-[#1F2A44]">Your Best Self</h2>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {tiles.map((t) => (
          <div key={t.label} className="rounded-lg bg-[#F5F7FB] p-3">
            {typeof t.icon === 'string' ? <Glyph name={t.icon} size={16} color={t.color} /> : <t.icon size={16} color={t.color} />}
            <p className="text-base font-extrabold text-[#1F2A44] mt-1">{t.value}</p>
            <p className="text-[11px] font-semibold text-[#94A3B8]">{t.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
