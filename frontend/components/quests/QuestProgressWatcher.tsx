'use client';

/**
 * QuestProgressWatcher — surfaces Monthly Quest moments as full-page
 * Celebration scenes right after the learner finishes a lesson.
 *
 * Flow: the learn flow dispatches `lesson:completed` → we give the backend's
 * async gamification listener ~1.2s to settle (it writes UserDailyActivity
 * then advances the quest), re-fetch the quest, and diff it against the last
 * snapshot persisted in localStorage:
 *
 *   new goal-day counted            → QUEST progress beat (+1 goal day!)
 *   milestone just became claimable → QUEST recap + server-first CLAIM deposit
 *                                     (chained behind the lesson's payout run)
 *
 * The snapshot is written BEFORE celebrating, so reloads never replay old
 * moments (mirrors DailyRewardWatcher). First sight / new month sync silently.
 */

import { useCallback, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import {
  buildMilestoneClaimScenes,
  buildQuestRows,
  fetchCurrentQuest,
  QUEST_REFRESH_EVENT,
  type MonthlyQuest,
  type QuestMilestoneId,
} from '@/lib/monthlyQuest';
import { useCelebration } from '@/context/CelebrationContext';

/** Routes where full-page student takeovers must never appear. */
const SKIP_ROUTE_PREFIXES = [
  '/creator',
  '/onboarding',
  '/login',
  '/signup',
  '/forgot-password',
  '/reset-password',
  '/role-select',
];

/** Long enough for the backend listener's mission/chest/quest writes to land. */
const LISTENER_SETTLE_MS = 1200;

const SNAPSHOT_KEY = 'teyro:mquest-state';

interface QuestSnapshot {
  monthKey: string;
  goalDays: number;
  claimed: QuestMilestoneId[];
}

function readSnapshot(): QuestSnapshot | null {
  try {
    const raw = window.localStorage.getItem(SNAPSHOT_KEY);
    return raw ? (JSON.parse(raw) as QuestSnapshot) : null;
  } catch {
    return null;
  }
}

function writeSnapshot(quest: MonthlyQuest): void {
  try {
    window.localStorage.setItem(
      SNAPSHOT_KEY,
      JSON.stringify({
        monthKey: quest.monthKey,
        goalDays: quest.goalDays,
        claimed: quest.milestones.filter((m) => m.claimed).map((m) => m.id),
      }),
    );
  } catch {
    /* storage unavailable (private mode) — dedupeKeys still guard */
  }
}

export default function QuestProgressWatcher() {
  const pathname = usePathname();
  const { celebrate } = useCelebration();

  const handleLessonCompleted = useCallback(() => {
    const path = pathname || window.location.pathname;
    if (SKIP_ROUTE_PREFIXES.some((p) => path.startsWith(p))) return;

    window.setTimeout(async () => {
      let quest: MonthlyQuest;
      try {
        quest = await fetchCurrentQuest();
      } catch {
        return; // logged out / network blip — nothing to celebrate
      }

      const prev = readSnapshot();
      writeSnapshot(quest);

      // First sight or a fresh month: sync silently, never celebrate history.
      if (!prev || prev.monthKey !== quest.monthKey) return;

      // Claims change goalDays never — only a freshly counted day beats here.
      if (quest.goalDays <= prev.goalDays) return;

      // Milestones whose threshold was just crossed and are still unclaimed
      const newlyClaimable = quest.milestones.filter(
        (m) => m.unlocked && !m.claimed && !prev.claimed.includes(m.id),
      );

      if (newlyClaimable.length > 0) {
        // Their recap+deposit chains already carry the QUEST grammar with the
        // gold shine on the crossed row — play them back-to-back in order.
        const scenes = newlyClaimable.flatMap((m) => buildMilestoneClaimScenes(quest, m));
        celebrate(scenes);
        return;
      }

      celebrate({
        kind: 'QUEST',
        headline: `+${quest.goalDays - prev.goalDays} goal day${quest.goalDays - prev.goalDays === 1 ? '' : 's'}!`,
        subhead: `${quest.monthLabel} Quest · ${quest.goalDays} / ${quest.targetDays}`,
        rows: buildQuestRows(quest),
        dedupeKey: `mq-beat:${quest.monthKey}:${quest.goalDays}`,
        onComplete: () => window.dispatchEvent(new Event(QUEST_REFRESH_EVENT)),
      });
    }, LISTENER_SETTLE_MS);
  }, [pathname, celebrate]);

  useEffect(() => {
    // Silent catch-up on entry so cross-tab completions never replay later.
    const syncQuietly = () => {
      const path = window.location.pathname;
      if (SKIP_ROUTE_PREFIXES.some((p) => path.startsWith(p))) return;
      fetchCurrentQuest()
        .then(writeSnapshot)
        .catch(() => {});
    };
    const t = window.setTimeout(syncQuietly, 4000);

    window.addEventListener('lesson:completed', handleLessonCompleted);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener('lesson:completed', handleLessonCompleted);
    };
  }, [handleLessonCompleted]);

  return null;
}
