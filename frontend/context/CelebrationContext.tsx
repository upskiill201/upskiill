'use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  useMemo,
} from 'react';
import type { LeagueTier } from '@/lib/leagues';

// ─── Types ───────────────────────────────────────────────────────────────────

export type CelebrationCurrency = 'COINS' | 'XP' | 'HEARTS' | 'STREAK' | 'FREEZE' | 'BOOST';

export interface CelebrationReward {
  currency: CelebrationCurrency;
  amount: number;
}

export interface StreakWeekDay {
  label: string;
  completed: boolean;
  isToday?: boolean;
}

export interface QuestRow {
  id?: string;
  label: string;
  current: number;
  target: number;
  /** Row that just completed — gets the shine-sweep treatment */
  highlight?: boolean;
  /** What completing this quest pays (coin/XP icon chip on the row). */
  reward?: { currency: CelebrationCurrency; amount: number };
}

/**
 * A single full-screen celebration scene. Scenes are queued and played one at a
 * time (Duolingo chaining: claim → streak → quest → chest). Every scene is a
 * full-page takeover rendered by <CelebrationEngine /> — never a centered dialog.
 */
export type CelebrationScene =
  | {
      kind: 'CLAIM';
      title?: string;
      subtitle?: string;
      rewards: CelebrationReward[];
      /** Server-first claim executed when the deposit beat begins. Omit when the reward was already persisted.
       * May resolve with exact post-claim balances (e.g. from the claim API response) so the count-up
       * includes server-side extras like the all-missions-claimed coin bonus — or with a `pendingCaption`
       * when the payout was recorded but settles at signup. */
      claim?: () =>
        | Promise<(Partial<Record<CelebrationCurrency, number>> & { pendingCaption?: string }) | void>
        | void;
      /** Exact post-claim balances for the count-up (falls back to live gamification state). */
      targetBalances?: Partial<Record<CelebrationCurrency, number>>;
      /** XP progress shown under the balance row: [current, target] for the current level. */
      levelProgress?: { current: number; target: number; level: number };
      progressCaption?: string;
      /** Shown under the balance row instead of an account total — used when the
       * payout is recorded now but settles at signup (pre-signup learners). */
      pendingCaption?: string;
      onComplete?: () => void;
      dedupeKey?: string;
    }
  | {
      kind: 'LEVEL_UP';
      oldLevel: number;
      newLevel: number;
      bonusCoins?: number;
      /** Tey's headline override — picked once by the scene itself (rotates
       * through a message pool — see lib/tey/levelUpVoice.ts) so re-renders
       * don't reroll it. Omit to let the scene pick its own. */
      teyLine?: string;
      onComplete?: () => void;
      dedupeKey?: string;
    }
  | {
      kind: 'STREAK';
      mode: 'EXTENDED' | 'SAVED' | 'LOST';
      days: number;
      /** Count-up origin (e.g. 4 → 5). Defaults to days - 1 for EXTENDED. */
      previousDays?: number;
      lostCount?: number;
      personalBest?: boolean;
      weekDays?: StreakWeekDay[];
      speech?: string;
      /** LOST only — repair action wired to the CTA. */
      onRepair?: () => Promise<void> | void;
      onComplete?: () => void;
      dedupeKey?: string;
    }
  | {
      /**
       * The learner returns after a gap since their last finished lesson,
       * with no live streak in play (a broken/frozen streak already gets its
       * own beat from the 'STREAK' scene above — see the producer in
       * GamificationContext.tsx). Sad-Tey moment, not celebratory: no
       * confetti, no fanfare, just "we noticed you were gone, glad you're
       * back."
       */
      kind: 'WELCOME_BACK';
      /** Full calendar days since the learner's last completed lesson. */
      days: number;
      speech?: string;
      onComplete?: () => void;
      dedupeKey?: string;
    }
  | {
      kind: 'CHEST';
      /** Daily Chest path: when omitted (and `claim` is not given) the scene
       * fetches/opens /chest/today itself. */
      chestId?: string;
      /** Generic path for any other chest-worthy reward (quest milestones,
       * achievements, course rewards, etc.) — mirrors CLAIM's `claim`
       * pattern: called server-first when the learner taps the chest, and
       * the resolved reward drives the Rive reveal. Takes priority over
       * `chestId` when both are given. */
      claim?: () => Promise<{ type: string; amount: number; rarityTier?: string }>;
      /** Analytics/debugging only — which feature opened this chest. */
      source?: string;
      onComplete?: () => void;
      dedupeKey?: string;
    }
  | {
      kind: 'QUEST';
      headline: string;
      subhead?: string;
      rows: QuestRow[];
      ctaText?: string;
      onComplete?: () => void;
      dedupeKey?: string;
    }
  | {
      kind: 'ACHIEVEMENT';
      badgeId: string;
      /** Display name of the achievement tier that just unlocked (e.g. "On Fire"). */
      badgeTitle: string;
      /** The tier that unlocked (1-based). */
      tier: number;
      maxTier: number;
      tierDescription: string;
      badgeBg: string;
      iconSrc?: string | null;
      /** CTA label — "CONTINUE" in-app, or a deep-link action like "VIEW ACHIEVEMENT". */
      ctaText?: string;
      /** Tey's reaction line — picked once by the scene itself (rotates
       * through a message pool — see lib/tey/achievementVoice.ts) so
       * re-renders don't reroll it. Omit to let the scene pick its own. */
      teyLine?: string;
      onComplete?: () => void;
      dedupeKey?: string;
    }
  | {
      kind: 'LEAGUE';
      /** Weekly settlement verdict. */
      outcome: 'PROMOTED' | 'DEMOTED' | 'INACTIVE_DEMOTED' | 'CHAMPION';
      /** LeagueTier keys the user moved from/to. */
      fromTier: LeagueTier;
      toTier: LeagueTier;
      /** Final rank in the settled cohort (null for inactivity demotions). */
      rank?: number | null;
      totalXp: number;
      weekStart: string;
      /** The settled cohort's final standings, for the animated rank-list
       * beat before the tier-shield reveal. Empty for inactivity demotions
       * (never joined that week — nothing to show). */
      finalStandings: RankRow[];
      /** Tey's headline for this outcome, picked once by the producer
       * (rotates through a message pool — see lib/leaderboard/teyMessages.ts)
       * so re-renders of the scene don't reroll it. */
      teyLine?: string;
      /** Tey's subhead for this outcome — same pooling/producer-picked
       * pattern as `teyLine`, but for the functional line under it. */
      teySubhead?: string;
      onComplete?: () => void;
      dedupeKey?: string;
    }
  | {
      kind: 'SECTION_COMPLETE';
      courseTitle: string;
      sectionTitle: string;
      /** e.g. "SECTION 2" — 1-based display label. */
      sectionIndexLabel: string;
      sectionProgress: {
        lessonsCompleted: number;
        lessonsTotal: number;
        activitiesCompleted?: number;
        activitiesTotal?: number;
      };
      results: {
        xpEarned: number;
        bonusXp: number;
        coinsEarned: number;
        streakDays: number;
      };
      onComplete?: () => void;
      dedupeKey?: string;
    }
  | {
      kind: 'COURSE_PROGRESS';
      courseTitle: string;
      /** Course-wide completion % immediately before vs after the section. */
      from: number;
      to: number;
      sectionsCompleted: number;
      sectionsTotal: number;
      lessonsCompleted: number;
      lessonsTotal: number;
      onComplete?: () => void;
      dedupeKey?: string;
    }
  | {
      kind: 'SECTION_UNLOCKED';
      sectionIndexLabel: string;
      sectionTitle: string;
      description?: string | null;
      lessonCount: number;
      estimatedMinutes: number;
      onStartSection: () => void;
      onBackToCourse: () => void;
      onComplete?: () => void;
      dedupeKey?: string;
    }
  | {
      kind: 'COURSE_COMPLETE';
      courseTitle: string;
      sectionsCompleted: number;
      sectionsTotal: number;
      lessonsCompleted: number;
      lessonsTotal: number;
      /** Learner's lifetime XP balance at the moment of completion. */
      xpTotal: number;
      streakDays: number;
      /** Primary CTA — usually back to the course overview. */
      onContinue: () => void;
      onComplete?: () => void;
      dedupeKey?: string;
    }
  | {
      /**
       * The learner's first look at their course community, fired the one time
       * completeLesson seats them (after their second lesson). Unlike every
       * other scene this one is a short *interactive* flow rather than a
       * single beat — arriving in a room full of strangers needs to explain
       * itself, and a passive splash would be skipped and forgotten.
       */
      kind: 'COMMUNITY_WELCOME';
      communityId: string;
      courseId: string;
      name: string;
      courseTitle: string;
      thumbnailUrl: string | null;
      memberCount: number;
      postCount: number;
      instructor: { id: string; fullName: string; avatarUrl: string | null } | null;
      members: { id: string; fullName: string; avatarUrl: string | null }[];
      /** A real post from the room, so the tour is never fabricated. */
      samplePost: {
        id: string;
        postType: string;
        title: string | null;
        excerpt: string;
        commentCount: number;
        likeCount: number;
        authorName: string;
        authorAvatarUrl: string | null;
      } | null;
      /** Opens the community with the composer expanded. */
      onEnter: () => void;
      onComplete?: () => void;
      dedupeKey?: string;
    }
  | {
      kind: 'LEADERBOARD';
      /** Mid-week rank moment — a real end-of-week promotion/demotion is
       * still the 'LEAGUE' scene above, not this one. Covers every
       * meaningful in-week movement: joining, rival crossings, big jumps,
       * promotion/demotion zone transitions, and reaching #1. */
      variant:
        | 'JOINED'
        | 'PASSED_RIVAL'
        | 'PASSED_BY_RIVAL'
        | 'REACHED_FIRST'
        | 'ENTERED_PROMOTION_ZONE'
        | 'ESCAPED_DEMOTION_ZONE'
        | 'ENTERED_DEMOTION_ZONE'
        | 'EXITED_PROMOTION_ZONE'
        | 'CLOSE_TO_PROMOTION'
        | 'BIG_JUMP_UP'
        | 'BIG_JUMP_DOWN';
      league: LeagueTier;
      myRank: number;
      /** Positions moved since the last check (0 for JOINED / zone-only
       * transitions with no rank change to animate). */
      deltaPositions?: number;
      /** Display window (rank ± a few) — never the whole cohort. Identical
       * shape before/after; only `rank` differs. Empty for JOINED (nothing
       * to animate past, just reveals the fresh cohort window). */
      beforeStandings: RankRow[];
      afterStandings: RankRow[];
      /** The specific person passed / who passed the learner. Only set for
       * PASSED_RIVAL / PASSED_BY_RIVAL. */
      rivalName?: string;
      rivalUserId?: string;
      weekStart: string;
      /** Tey's headline for this event, picked once by the producer
       * (rotates through a message pool — see lib/leaderboard/teyMessages.ts)
       * so re-renders of the scene don't reroll it. */
      teyLine?: string;
      /** Tey's subhead for this event — same pooling/producer-picked
       * pattern as `teyLine`, but for the functional line under it. */
      teySubhead?: string;
      onComplete?: () => void;
      dedupeKey?: string;
    };

/** One row in a leaderboard display window. */
export interface RankRow {
  userId: string;
  name: string;
  avatarUrl: string | null;
  rank: number;
  isMe: boolean;
}

interface CelebrationContextValue {
  /** Queue one or more scenes. They play one at a time, in order. */
  celebrate: (input: CelebrationScene | CelebrationScene[]) => void;
  /** Advance past the current scene (CTA press) → next scene or close. */
  advance: () => void;
  /** Drop everything (navigation, logout). */
  closeAll: () => void;
  activeScene: CelebrationScene | null;
  isCelebrating: boolean;
}

const CelebrationContext = createContext<CelebrationContextValue | null>(null);

// ─── Session dedup + cross-layer visibility (module scope, SSR-safe) ─────────

/** transitionKeys already surfaced this session — cleared on full reload. */
const surfacedKeys = new Set<string>();

/** Module-level flag so non-React layers (Herald) can suppress while a scene plays. */
let activeCount = 0;
export function isCelebrationActive(): boolean {
  return activeCount > 0;
}

// ─── Provider ────────────────────────────────────────────────────────────────

export function CelebrationProvider({ children }: { children: React.ReactNode }) {
  const [queue, setQueue] = useState<CelebrationScene[]>([]);
  const [activeScene, setActiveScene] = useState<CelebrationScene | null>(null);

  // Mirror of activeScene so advance() can read it without a side-effecting
  // state updater (StrictMode double-invokes updaters → onComplete fired twice).
  const activeSceneRef = useRef<CelebrationScene | null>(null);
  activeSceneRef.current = activeScene;

  const celebrate = useCallback((input: CelebrationScene | CelebrationScene[]) => {
    const incoming = Array.isArray(input) ? input : [input];
    if (incoming.length === 0) return;

    setQueue((prev) => {
      const next = [...prev];
      for (const scene of incoming) {
        if (scene.dedupeKey) {
          // Skip if already surfaced this session OR already waiting in queue
          if (surfacedKeys.has(scene.dedupeKey)) continue;
          if (next.some((s) => s.dedupeKey === scene.dedupeKey)) continue;
        }
        next.push(scene);
      }
      return next;
    });
  }, []);

  const advance = useCallback(() => {
    const current = activeSceneRef.current;
    if (!current) return; // re-entry guard (double-tap on the CTA)
    activeSceneRef.current = null;
    setActiveScene(null);
    if (current.onComplete) {
      try {
        current.onComplete();
      } catch (e) {
        console.error('CelebrationScene onComplete failed:', e);
      }
    }
  }, []);

  const closeAll = useCallback(() => {
    activeSceneRef.current = null;
    setQueue([]);
    setActiveScene(null);
  }, []);

  // ── Drain queue → active ──────────────────────────────────────────────────

  useEffect(() => {
    if (activeScene !== null) return;
    if (queue.length === 0) {
      return;
    }
    const [next, ...rest] = queue;
    if (next.dedupeKey) surfacedKeys.add(next.dedupeKey);
    setActiveScene(next);
    setQueue(rest);
  }, [queue, activeScene]);

  // Track active count for isCelebrationActive()
  useEffect(() => {
    activeCount = activeScene !== null || queue.length > 0 ? 1 : 0;
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('celebration:visibility'));
    }
    return () => {
      activeCount = 0;
    };
  }, [activeScene, queue.length]);

  // ── Global triggers (decoupled producers dispatch window events) ──────────

  useEffect(() => {
    const handleLevelUp = (e: Event) => {
      const detail = (e as CustomEvent<{ oldLevel: number; newLevel: number; bonusCoins?: number }>).detail;
      if (!detail || typeof detail.newLevel !== 'number') return;
      celebrate({
        kind: 'LEVEL_UP',
        oldLevel: detail.oldLevel,
        newLevel: detail.newLevel,
        bonusCoins: detail.bonusCoins,
        // Stable key per level transition — a Date.now() suffix would defeat
        // dedupe entirely (every dispatch would look unique).
        dedupeKey: `level-up-${detail.oldLevel}-${detail.newLevel}`,
      });
    };

    const handleStreakStatus = (e: Event) => {
      const detail = (e as CustomEvent<{
        mode: 'SAVED' | 'LOST';
        days: number;
        lostCount?: number;
        personalBest?: boolean;
        weekDays?: StreakWeekDay[];
      }>).detail;
      if (!detail) return;
      celebrate({
        kind: 'STREAK',
        mode: detail.mode,
        days: detail.days,
        lostCount: detail.lostCount,
        personalBest: detail.personalBest,
        weekDays: detail.weekDays,
        dedupeKey: `streak-${detail.mode}-${detail.days}-${detail.lostCount ?? 0}`,
      });
    };

    const handleWelcomeBack = (e: Event) => {
      const detail = (e as CustomEvent<{ days: number }>).detail;
      if (!detail || typeof detail.days !== 'number' || detail.days <= 0) return;
      celebrate({
        kind: 'WELCOME_BACK',
        days: detail.days,
        // Keyed by day count (not a timestamp) — resurfaces if the gap grows
        // on a later app open, but not on every poll for the same gap.
        dedupeKey: `welcome-back-${detail.days}`,
      });
    };

    window.addEventListener('teyro:level-up', handleLevelUp);
    window.addEventListener('teyro:streak-status', handleStreakStatus);
    window.addEventListener('teyro:welcome-back', handleWelcomeBack);
    return () => {
      window.removeEventListener('teyro:level-up', handleLevelUp);
      window.removeEventListener('teyro:streak-status', handleStreakStatus);
      window.removeEventListener('teyro:welcome-back', handleWelcomeBack);
    };
  }, [celebrate]);

  // PERF: memoized. An inline object literal here produced a new context
  // value on every render of this provider, which re-renders every consumer
  // beneath it whether or not the underlying state actually changed.
  const value = useMemo(
    () => ({
      celebrate,
      advance,
      closeAll,
      activeScene,
      isCelebrating: activeScene !== null,
    }),
    [
    celebrate,
    advance,
    closeAll,
    activeScene,
    ]
  );

  return (
    <CelebrationContext.Provider value={value}>
      {children}
    </CelebrationContext.Provider>
  );
}

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useCelebration() {
  const ctx = useContext(CelebrationContext);
  if (!ctx) {
    throw new Error('useCelebration must be used inside <CelebrationProvider>');
  }
  return ctx;
}
