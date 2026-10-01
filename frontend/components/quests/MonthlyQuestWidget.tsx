'use client';

/**
 * MONTHLY CHALLENGE — the compact sidebar version (My Learning, Shop, course
 * pages): the month's badge with its ring, the name, the goal-day bar.
 * Chests are opened on the Quests tab (its tab dot says when one is ready).
 */

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { useMonthlyQuest } from '@/hooks/useMonthlyQuest';
import { monthBadge, monthName } from '@/lib/quests/monthBadges';
import { MonthBadge } from './MonthBadge';
import tokens from './MonthTokens.module.css';

export default function MonthlyQuestWidget() {
  const { quest, loading, error } = useMonthlyQuest();
  if (error || (!quest && !loading)) return null;

  if (!quest) {
    return (
      <div className="rounded-[18px] border-2 border-[var(--border)] bg-white p-4 animate-pulse" aria-busy="true" aria-label="Loading monthly challenge">
        <div className="h-4 w-2/3 rounded" style={{ backgroundColor: 'var(--bg-section)' }} />
        <div className="mt-3 h-3 rounded-full" style={{ backgroundColor: 'var(--bg-section)' }} />
      </div>
    );
  }

  const b = monthBadge(quest.monthKey);
  const earned = quest.status === 'FULLY_CLAIMED';
  const pct = Math.min(100, (quest.goalDays / Math.max(1, quest.targetDays)) * 100);
  const ready = quest.milestones.some((m) => m.claimable);

  return (
    <Link
      href="/dashboard/quests"
      className={`${tokens.monthTokens} block rounded-[18px] border-2 border-[var(--border)] bg-white p-4 hover:bg-[var(--bg-section)] transition-colors`}
      style={{ boxShadow: '0 3px 0 var(--border)' }}
      aria-label={`${monthName(quest.monthKey)} Challenge: ${quest.goalDays} of ${quest.targetDays} goal days`}
    >
      <div className="flex items-center gap-3">
        <MonthBadge monthKey={quest.monthKey} state={earned ? 'earned' : 'progress'} progress={pct / 100} size={52} />
        <div className="flex-1 min-w-0">
          <p className="text-[11.5px] font-extrabold uppercase tracking-[0.08em]" style={{ color: b.color }}>
            {monthName(quest.monthKey)} Challenge
          </p>
          <p className="text-[15px] font-extrabold text-ink truncate">{b.name}</p>
          <div className="mt-1.5 h-2.5 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--border)' }}>
            <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: b.color }} />
          </div>
          <p className="mt-1 text-[12px] font-bold text-[var(--text-secondary)]">
            {earned
              ? 'Badge earned'
              : ready
                ? 'A chest is ready to open'
                : `${quest.goalDays} / ${quest.targetDays} days · ${quest.daysRemaining}d left`}
          </p>
        </div>
        <ChevronRight className="w-5 h-5 shrink-0 text-[var(--text-muted)]" aria-hidden="true" />
      </div>
    </Link>
  );
}
