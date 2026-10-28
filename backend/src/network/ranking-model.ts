/**
 * The learned feed ranking (docs/TEYRO_NETWORK_PLAN.md §4, phase 5) — pure,
 * no database, so it can be tested exactly.
 *
 * For every outcome we can observe on a card we fit one logistic regression
 * P(outcome | card, viewer) from network_events, and rank by expected value:
 *
 *   value = Σ OUTCOME_VALUE[o] · P(o)        (then × freshness, in feed-rank)
 *
 * A lesson started from a card is worth the most — that's the north star.
 * Position is a training feature only (to learn and then remove the "people
 * tap whatever is on top" bias): at ranking time every card is scored as if
 * it were in slot 0.
 */

import type { ActivityType } from './network.constants';

export const OUTCOMES = ['lesson', 'cta', 'cheer'] as const;
export type Outcome = (typeof OUTCOMES)[number];

/** What each outcome is worth (plan §4). */
export const OUTCOME_VALUE: Record<Outcome, number> = { lesson: 10, cta: 3, cheer: 1 };

export const FEATURES = [
  'bias',
  'buddy',
  'follow',
  'courseStarted',
  'streakMilestone',
  'achievement',
  'courseFinished',
  'workShared',
  'enrolled',
  'logAge',
  'nearAhead',
  'farAhead',
  'position',
] as const;
export type Feature = (typeof FEATURES)[number];
export type Weights = Record<Feature, number>;
export type Model = Partial<Record<Outcome, Weights>>;

export interface CardFacts {
  activityType: ActivityType;
  isBuddy: boolean;
  isFollow: boolean;
  /** The viewer is taking the card's course. */
  enrolled: boolean;
  ageHours: number;
  /** Author's progress minus the viewer's in the card's course (points), or null. */
  progressLead: number | null;
  /** Feed slot; 0 at ranking time. */
  position: number;
}

/** Near-peer: a little ahead pulls you along; far ahead just discourages. */
export function nearPeer(lead: number | null): { nearAhead: number; farAhead: number } {
  if (lead === null) return { nearAhead: 0, farAhead: 0 };
  return { nearAhead: lead > 0 && lead <= 20 ? 1 : 0, farAhead: lead > 50 ? 1 : 0 };
}

export function featuresOf(c: CardFacts): number[] {
  const peer = nearPeer(c.progressLead);
  const f: Record<Feature, number> = {
    bias: 1,
    buddy: c.isBuddy ? 1 : 0,
    follow: !c.isBuddy && c.isFollow ? 1 : 0,
    courseStarted: c.activityType === 'COURSE_STARTED' ? 1 : 0,
    streakMilestone: c.activityType === 'STREAK_MILESTONE' ? 1 : 0,
    achievement: c.activityType === 'ACHIEVEMENT_UNLOCKED' ? 1 : 0,
    courseFinished: c.activityType === 'COURSE_FINISHED' ? 1 : 0,
    workShared: c.activityType === 'WORK_SHARED' ? 1 : 0,
    enrolled: c.enrolled ? 1 : 0,
    // Scaled so every feature lives in roughly 0..1.
    logAge: Math.log1p(Math.max(0, c.ageHours)) / 5,
    nearAhead: peer.nearAhead,
    farAhead: peer.farAhead,
    position: Math.min(c.position, 15) / 15,
  };
  return FEATURES.map((k) => f[k]);
}

const sigmoid = (z: number) => 1 / (1 + Math.exp(-Math.max(-30, Math.min(30, z))));

export function predict(w: Weights, x: number[]): number {
  let z = 0;
  FEATURES.forEach((k, i) => (z += (w[k] ?? 0) * x[i]));
  return sigmoid(z);
}

/**
 * Logistic regression by batch gradient descent with a little L2 — a few
 * thousand rows × 13 features trains in milliseconds; no ML library needed.
 */
export function trainLogistic(xs: number[][], ys: number[], opts: { epochs?: number; lr?: number; l2?: number } = {}): Weights {
  const epochs = opts.epochs ?? 400;
  const lr = opts.lr ?? 0.5;
  const l2 = opts.l2 ?? 0.01;
  const n = xs.length;
  const d = FEATURES.length;
  const w = new Array<number>(d).fill(0);
  // Start the bias at the base rate so rare outcomes converge.
  const rate = Math.min(0.999, Math.max(0.001, ys.reduce((a, b) => a + b, 0) / Math.max(1, n)));
  w[0] = Math.log(rate / (1 - rate));
  for (let e = 0; e < epochs; e++) {
    const grad = new Array<number>(d).fill(0);
    for (let r = 0; r < n; r++) {
      let z = 0;
      for (let i = 0; i < d; i++) z += w[i] * xs[r][i];
      const err = sigmoid(z) - ys[r];
      for (let i = 0; i < d; i++) grad[i] += err * xs[r][i];
    }
    for (let i = 0; i < d; i++) w[i] -= lr * (grad[i] / n + (i === 0 ? 0 : l2 * w[i]));
  }
  return Object.fromEntries(FEATURES.map((k, i) => [k, Number(w[i].toFixed(5))])) as Weights;
}

export function logLoss(ps: number[], ys: number[]): number {
  if (ps.length === 0) return 0;
  const eps = 1e-6;
  return ps.reduce((s, p, i) => s - (ys[i] * Math.log(p + eps) + (1 - ys[i]) * Math.log(1 - p + eps)), 0) / ps.length;
}

/** The ranking score the feed uses when a model is active (slot 0, no freshness). */
export function modelValue(model: Model, c: Omit<CardFacts, 'position'>): number {
  const x = featuresOf({ ...c, position: 0 });
  let v = 0;
  for (const o of OUTCOMES) {
    const w = model[o];
    if (w) v += OUTCOME_VALUE[o] * predict(w, x);
  }
  return v;
}
