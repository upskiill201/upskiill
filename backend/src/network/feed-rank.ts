import {
  AFFINITY,
  FEED_CAP,
  FRESHNESS_HALF_LIFE_HOURS,
  LEARN_INTENT_COURSE_START,
  LEARN_INTENT_ENROLLED,
  TYPE_WEIGHT,
  type ActivityType,
} from './network.constants';
import { modelValue, nearPeer, type Model } from './ranking-model';

/**
 * The network feed's ranking, pure so it can be tested without a database
 * (docs/TEYRO_NETWORK_PLAN.md §4, phase 1 heuristic):
 *
 *   score = affinity × typeWeight × freshness × learnIntent
 *
 * then collapse a day's lessons in one course into one card, keep any one
 * person from taking more than two slots in a row, and stop at FEED_CAP.
 */

export interface RankInput {
  id: string;
  userId: string;
  activityType: ActivityType;
  createdAt: Date;
  courseId: string | null;
  /** Author's progress minus the viewer's in the card's course, when both take it. */
  progressLead?: number | null;
}

export interface RankContext {
  buddies: ReadonlySet<string>;
  follows: ReadonlySet<string>;
  /** Courses the viewer is enrolled in. */
  enrolled: ReadonlySet<string>;
  now: Date;
  /** The learned model (phase 5); without one, the hand-set formula below. */
  model?: Model | null;
}

/** Near-peer pull for the hand-set formula: a little ahead motivates, far ahead discourages. */
export const NEAR_PEER_BOOST = 1.3;
export const FAR_AHEAD_DAMP = 0.85;

export interface Ranked<T extends RankInput> {
  card: T;
  /** Earlier lesson cards folded into this one (same person, course, day). */
  folded: T[];
  score: number;
}

export function affinityOf(userId: string, ctx: RankContext): number {
  if (ctx.buddies.has(userId)) return AFFINITY.buddy;
  if (ctx.follows.has(userId)) return AFFINITY.follow;
  return AFFINITY.classmate;
}

export function scoreOf(card: RankInput, ctx: RankContext): number {
  const ageHours = Math.max(0, (ctx.now.getTime() - card.createdAt.getTime()) / 3_600_000);
  const freshness = Math.pow(0.5, ageHours / FRESHNESS_HALF_LIFE_HOURS);
  const lead = card.progressLead ?? null;
  const enrolled = !!card.courseId && ctx.enrolled.has(card.courseId);

  // Learned: expected value of the card for this viewer, kept fresh.
  if (ctx.model && Object.keys(ctx.model).length > 0) {
    return (
      modelValue(ctx.model, {
        activityType: card.activityType,
        isBuddy: ctx.buddies.has(card.userId),
        isFollow: ctx.follows.has(card.userId),
        enrolled,
        ageHours,
        progressLead: lead,
      }) * freshness
    );
  }

  let intent = 1;
  if (enrolled) intent = LEARN_INTENT_ENROLLED;
  else if (card.activityType === 'COURSE_STARTED') intent = LEARN_INTENT_COURSE_START;
  const peer = nearPeer(lead);
  const peerFactor = peer.nearAhead ? NEAR_PEER_BOOST : peer.farAhead ? FAR_AHEAD_DAMP : 1;
  return affinityOf(card.userId, ctx) * TYPE_WEIGHT[card.activityType] * freshness * intent * peerFactor;
}

const dayOf = (d: Date) => d.toISOString().slice(0, 10);

/** Input must be newest first. */
export function rankFeed<T extends RankInput>(cards: T[], ctx: RankContext, cap = FEED_CAP): Ranked<T>[] {
  // 1. Fold "finished a lesson" cards: newest one stands for the day.
  const heads = new Map<string, Ranked<T>>();
  const ranked: Ranked<T>[] = [];
  for (const card of cards) {
    if (card.activityType === 'LESSON_COMPLETED' && card.courseId) {
      const key = `${card.userId}:${card.courseId}:${dayOf(card.createdAt)}`;
      const head = heads.get(key);
      if (head) {
        head.folded.push(card);
        continue;
      }
      const r = { card, folded: [], score: 0 };
      heads.set(key, r);
      ranked.push(r);
    } else {
      ranked.push({ card, folded: [], score: 0 });
    }
  }

  // 2. Score. A folded run is worth a little more than one lesson.
  for (const r of ranked) {
    r.score = scoreOf(r.card, ctx) * (1 + Math.min(r.folded.length, 4) * 0.1);
  }
  ranked.sort((a, b) => b.score - a.score);

  // 3. Diversity: never three in a row from the same person.
  const out: Ranked<T>[] = [];
  const pool = [...ranked];
  while (out.length < cap && pool.length > 0) {
    const last = out[out.length - 1]?.card.userId;
    const prev = out[out.length - 2]?.card.userId;
    let i = 0;
    if (last && last === prev) {
      const j = pool.findIndex((r) => r.card.userId !== last);
      if (j >= 0) i = j;
    }
    out.push(pool.splice(i, 1)[0]);
  }
  return out;
}
