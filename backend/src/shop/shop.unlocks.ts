/**
 * Unlock evaluation — the rule that decides whether an item is even *offered*.
 *
 * The economy has two gates on purpose. Learning opens the gate; coins pay the
 * toll. Coins alone must never reach the best cosmetics, or the shop stops
 * rewarding learning and starts rewarding grinding — which is the failure mode
 * this whole design exists to avoid.
 *
 * Every rule reports progress (current/target), not just a boolean, because
 * "12 / 25 lessons" is what turns a locked card into a goal.
 */

import type { LeagueTier } from '@prisma/client';
import {
  LEAGUE_ORDER,
  type ShopItemDef,
  type UnlockRule,
} from './shop.registry';

/** Everything the unlock rules are allowed to look at. Assembled once per request. */
export interface LearnerMetrics {
  level: number;
  xp: number;
  streakDays: number;
  longestStreak: number;
  lessonsCompleted: number;
  coursesCompleted: number;
  leagueTier: LeagueTier;
  /** Lifetime shop purchases — drives the "regular customer" unlocks. */
  purchaseCount: number;
  /** Collection ids the learner has already completed. */
  completedCollections: string[];
}

export interface UnlockStatus {
  unlocked: boolean;
  /** Progress toward the requirement, in the rule's own unit. */
  current: number;
  target: number;
  /** Human requirement line for locked cards, e.g. "Reach a 7-day streak". */
  label: string;
  /** 0–100, clamped — drives the progress bar on locked cards. */
  percent: number;
}

function status(current: number, target: number, label: string): UnlockStatus {
  const safeTarget = Math.max(1, target);
  return {
    unlocked: current >= target,
    current,
    target,
    label,
    percent: Math.max(
      0,
      Math.min(100, Math.round((current / safeTarget) * 100)),
    ),
  };
}

export function evaluateUnlock(
  rule: UnlockRule,
  m: LearnerMetrics,
): UnlockStatus {
  switch (rule.type) {
    case 'ALWAYS':
      return status(1, 1, 'Available to everyone');

    case 'LEVEL':
      return status(m.level, rule.level, `Reach level ${rule.level}`);

    case 'STREAK':
      // Longest streak counts too: breaking a streak should not confiscate an
      // unlock the learner already earned once.
      return status(
        Math.max(m.streakDays, m.longestStreak),
        rule.days,
        `Reach a ${rule.days}-day streak`,
      );

    case 'LESSONS':
      return status(
        m.lessonsCompleted,
        rule.count,
        `Complete ${rule.count} lessons`,
      );

    case 'COURSES':
      return status(
        m.coursesCompleted,
        rule.count,
        `Complete ${rule.count} course${rule.count === 1 ? '' : 's'}`,
      );

    case 'XP':
      return status(
        m.xp,
        rule.amount,
        `Earn ${rule.amount.toLocaleString()} XP`,
      );

    case 'LEAGUE': {
      const current = LEAGUE_ORDER.indexOf(m.leagueTier);
      const target = LEAGUE_ORDER.indexOf(rule.tier);
      const tierName = rule.tier.charAt(0) + rule.tier.slice(1).toLowerCase();
      // +1 so Bronze (index 0) reads as 1/3 rather than 0/2 on the bar.
      return status(current + 1, target + 1, `Reach the ${tierName} league`);
    }

    case 'COLLECTION': {
      const done = m.completedCollections.includes(rule.collectionId) ? 1 : 0;
      const name =
        rule.collectionId.charAt(0) + rule.collectionId.slice(1).toLowerCase();
      return status(done, 1, `Complete the ${name} Collection`);
    }

    case 'PURCHASES':
      return status(
        m.purchaseCount,
        rule.count,
        `Buy ${rule.count} shop items`,
      );

    default: {
      // Exhaustiveness guard — a new rule type must be handled here.
      const _never: never = rule;
      return status(0, 1, 'Locked');
    }
  }
}

/** Ids of every item the learner currently satisfies the unlock rule for. */
export function unlockedItemIds(
  items: ShopItemDef[],
  m: LearnerMetrics,
): string[] {
  return items
    .filter((i) => evaluateUnlock(i.unlock, m).unlocked)
    .map((i) => i.id);
}
