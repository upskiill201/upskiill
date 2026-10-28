import { backedOff } from '../tey/notify/notify.catalogue';
import { rankFeed, scoreOf, type RankContext, type RankInput } from './feed-rank';
import { FEATURES, featuresOf, logLoss, modelValue, nearPeer, predict, trainLogistic, type CardFacts } from './ranking-model';

const facts = (over: Partial<CardFacts> = {}): CardFacts => ({
  activityType: 'LESSON_COMPLETED',
  isBuddy: false,
  isFollow: false,
  enrolled: false,
  ageHours: 2,
  progressLead: null,
  position: 0,
  ...over,
});

/** Deterministic pseudo-random, so the training test never flakes. */
function rng(seed: number) {
  return () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  };
}

describe('nearPeer', () => {
  it('marks a little ahead and far ahead, not behind', () => {
    expect(nearPeer(10)).toEqual({ nearAhead: 1, farAhead: 0 });
    expect(nearPeer(70)).toEqual({ nearAhead: 0, farAhead: 1 });
    expect(nearPeer(-10)).toEqual({ nearAhead: 0, farAhead: 0 });
    expect(nearPeer(null)).toEqual({ nearAhead: 0, farAhead: 0 });
  });
});

describe('trainLogistic', () => {
  it('learns that buddy cards get tapped and beats guessing the average', () => {
    const r = rng(7);
    const xs: number[][] = [];
    const ys: number[] = [];
    for (let i = 0; i < 2000; i++) {
      const isBuddy = r() < 0.3;
      xs.push(featuresOf(facts({ isBuddy, position: Math.floor(r() * 10) })));
      ys.push(r() < (isBuddy ? 0.4 : 0.05) ? 1 : 0);
    }
    const w = trainLogistic(xs, ys);
    expect(w.buddy).toBeGreaterThan(1);
    const ps = xs.map((x) => predict(w, x));
    const rate = ys.reduce((a, b) => a + b, 0) / ys.length;
    expect(logLoss(ps, ys)).toBeLessThan(logLoss(xs.map(() => rate), ys));
  });

  it('returns a weight for every feature', () => {
    expect(Object.keys(trainLogistic([featuresOf(facts())], [1]))).toEqual([...FEATURES]);
  });
});

describe('modelValue', () => {
  it('values a lesson-starting card above a cheer-only one', () => {
    const zero = Object.fromEntries(FEATURES.map((f) => [f, 0])) as Record<(typeof FEATURES)[number], number>;
    const model = { lesson: { ...zero, bias: -3, buddy: 3 }, cheer: { ...zero, bias: 0 } };
    expect(modelValue(model, facts({ isBuddy: true }))).toBeGreaterThan(modelValue(model, facts()));
  });
});

describe('feed ranking with a model and near-peers', () => {
  const now = new Date('2026-10-28T12:00:00Z');
  const ctx: RankContext = { buddies: new Set(), follows: new Set(), enrolled: new Set(['py']), now };
  const card = (id: string, over: Partial<RankInput> = {}): RankInput => ({
    id,
    userId: id,
    activityType: 'LESSON_COMPLETED',
    createdAt: new Date(now.getTime() - 3_600_000),
    courseId: 'py',
    ...over,
  });

  it('without a model, someone a little ahead outranks someone far ahead', () => {
    expect(scoreOf(card('near', { progressLead: 10 }), ctx)).toBeGreaterThan(scoreOf(card('far', { progressLead: 80 }), ctx));
  });

  it('with a model, the model decides', () => {
    const zero = Object.fromEntries(FEATURES.map((f) => [f, 0])) as Record<(typeof FEATURES)[number], number>;
    const model = { cta: { ...zero, bias: -4, farAhead: 6 } }; // a model that (oddly) loves far-ahead cards
    const ranked = rankFeed([card('near', { progressLead: 10 }), card('far', { progressLead: 80 })], { ...ctx, model });
    expect(ranked[0].card.id).toBe('far');
  });
});

describe('backedOff', () => {
  const now = new Date('2026-10-28T12:00:00Z');
  const sent = (daysAgo: number, opened = false) => ({
    sentAt: new Date(now.getTime() - daysAgo * 86_400_000),
    openedAt: opened ? new Date() : null,
  });

  it('holds a kind after five ignored pushes in a row', () => {
    expect(backedOff([1, 2, 3, 4, 5].map((d) => sent(d)), now)).toBe(true);
  });

  it('does not hold when any of the last five was opened', () => {
    expect(backedOff([sent(1), sent(2, true), sent(3), sent(4), sent(5)], now)).toBe(false);
  });

  it('tries again a week after the last ignored one', () => {
    expect(backedOff([8, 9, 10, 11, 12].map((d) => sent(d)), now)).toBe(false);
  });

  it('needs five before it holds anything', () => {
    expect(backedOff([1, 2, 3, 4].map((d) => sent(d)), now)).toBe(false);
  });
});
