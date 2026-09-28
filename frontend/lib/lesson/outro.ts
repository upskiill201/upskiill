/**
 * The numbers and words on the screens after a lesson — lesson complete,
 * streak, daily quests. Pure, so the rules are pinned by tests:
 *
 *  - every number is something that really happened (the server's XP, the
 *    learner's own accuracy and time, quest progress read before and after),
 *  - the streak week only ticks days the streak actually covers,
 *  - a screen with nothing new to say is skipped, never padded.
 */

export interface LessonStats {
  /** Questions in the lesson's quiz (0 = no quiz). */
  questions: number;
  /** Questions answered wrong at least once. */
  missed: number;
  /** Wall-clock seconds from opening the lesson to FINISH. */
  seconds: number;
  /** Words written in Reflect. */
  words: number;
  /** The lesson's estimate, if the creator set one. */
  expectedMinutes: number | null;
}

export type StatTone = 'gold' | 'green' | 'blue' | 'purple';

export interface StatCard {
  id: 'xp' | 'accuracy' | 'words' | 'time';
  label: string;
  /** Numeric value to count up to; null while the server hasn't answered. */
  value: number | null;
  format: 'xp' | 'percent' | 'count' | 'clock';
  tone: StatTone;
}

export function accuracyPct(s: LessonStats): number | null {
  if (s.questions === 0) return null;
  return Math.round(((s.questions - Math.min(s.missed, s.questions)) / s.questions) * 100);
}

export function isPerfect(s: LessonStats): boolean {
  return s.questions > 0 && s.missed === 0;
}

/** Label pools per tier — the first is the plain one; the rest keep it fresh. */
const LABELS = {
  perfect: ['Amazing', 'Flawless', 'Spot on'],
  great: ['Great', 'Sharp', 'Strong'],
  good: ['Good', 'Solid', 'Nice'],
  low: ['Keep going', 'Getting there', 'Learning'],
  words: ['Thoughtful', 'Reflective', 'In your words'],
  fast: ['Speedy', 'Quick', 'Swift'],
  steady: ['Committed', 'Steady', 'Thorough'],
};

type LabelPick = (list: string[]) => string;
const plain: LabelPick = (list) => list[0];

function accuracyLabel(pct: number, pick: LabelPick): string {
  if (pct === 100) return pick(LABELS.perfect);
  if (pct >= 80) return pick(LABELS.great);
  if (pct >= 60) return pick(LABELS.good);
  return pick(LABELS.low);
}

/** Fast against the lesson's own estimate when there is one, else 3 minutes. */
function timeLabel(s: LessonStats, pick: LabelPick): string {
  const budget = s.expectedMinutes && s.expectedMinutes > 0 ? s.expectedMinutes * 60 : 180;
  return s.seconds <= budget ? pick(LABELS.fast) : pick(LABELS.steady);
}

/**
 * Three cards, Duolingo's shape: what you earned, how well, how long.
 * A lesson with no quiz shows the words written in Reflect instead of an
 * accuracy score it never measured. A replay earns no XP, so no XP card.
 */
export function statCards(
  s: LessonStats,
  xp: number | null,
  opts: { isReview: boolean; pick?: LabelPick },
): StatCard[] {
  const pick = opts.pick ?? plain;
  const cards: StatCard[] = [];
  if (!opts.isReview) cards.push({ id: 'xp', label: 'Total XP', value: xp, format: 'xp', tone: 'gold' });
  const pct = accuracyPct(s);
  if (pct !== null) {
    cards.push({ id: 'accuracy', label: accuracyLabel(pct, pick), value: pct, format: 'percent', tone: 'green' });
  } else if (s.words > 0) {
    cards.push({ id: 'words', label: pick(LABELS.words), value: s.words, format: 'count', tone: 'purple' });
  }
  cards.push({ id: 'time', label: timeLabel(s, pick), value: s.seconds, format: 'clock', tone: 'blue' });
  return cards;
}

export function formatStat(format: StatCard['format'], n: number): string {
  if (format === 'clock') {
    const m = Math.floor(n / 60);
    const sec = Math.floor(n % 60);
    return `${m}:${String(sec).padStart(2, '0')}`;
  }
  if (format === 'percent') return `${Math.round(n)}%`;
  if (format === 'xp') return `${Math.round(n)}`;
  return `${Math.round(n)}`;
}

export function completeTitle(s: LessonStats, opts: { isReview: boolean }): string {
  if (opts.isReview) return 'Practice complete!';
  if (isPerfect(s)) return 'Perfect lesson!';
  return 'Lesson complete!';
}

// ─── Streak ──────────────────────────────────────────────────────────────────

export interface WeekDay {
  label: string;
  done: boolean;
  isToday: boolean;
}

/**
 * Monday-first week with today marked. Only the days the streak really
 * covers are ticked — a 2-day streak on a Thursday ticks Wednesday and
 * Thursday, not the whole week so far.
 */
export function streakWeek(days: number, now: Date = new Date()): WeekDay[] {
  const todayIdx = (now.getDay() + 6) % 7;
  const covered = Math.max(0, Math.min(days, todayIdx + 1));
  return ['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((label, idx) => ({
    label,
    done: idx <= todayIdx && idx > todayIdx - covered,
    isToday: idx === todayIdx,
  }));
}

// ─── Daily quests ────────────────────────────────────────────────────────────

export interface Mission {
  id: string;
  title: string;
  currentProgress: number;
  targetValue: number;
  isCompleted?: boolean;
  isClaimed?: boolean;
  status?: string;
  reward?: { type: string; amount: number };
}

export interface QuestRow {
  id: string;
  title: string;
  from: number;
  to: number;
  target: number;
  /** Crossed the finish line during this lesson. */
  justCompleted: boolean;
  /** The quest's chest has already been opened. */
  claimed: boolean;
  reward: { type: 'XP' | 'COINS'; amount: number } | null;
}

/**
 * Today's quests with their progress before and after the lesson. Empty
 * when nothing moved — then the quests screen is skipped.
 */
export function questProgress(before: Mission[] | null, after: Mission[] | null): QuestRow[] {
  if (!before || !after) return [];
  const prev = new Map(before.map((m) => [m.id, m]));
  const rows: QuestRow[] = after.map((m) => {
    const target = Math.max(1, m.targetValue);
    const from = Math.min(target, Math.max(0, prev.get(m.id)?.currentProgress ?? 0));
    const to = Math.min(target, Math.max(from, m.currentProgress));
    return {
      id: m.id,
      title: m.title,
      from,
      to,
      target,
      justCompleted: from < target && to >= target,
      claimed: Boolean(m.isClaimed || m.status === 'CLAIMED'),
      reward: m.reward
        ? { type: m.reward.type === 'XP' ? 'XP' : 'COINS', amount: m.reward.amount }
        : null,
    };
  });
  return rows.some((r) => r.to > r.from) ? rows : [];
}

// ─── Monthly Challenge ───────────────────────────────────────────────────────

export interface MonthlyQuestLite {
  monthKey: string;
  goalDays: number;
  targetDays: number;
  status?: string;
  milestones: { id: string; kind: string; label: string; requiredDays: number; claimable: boolean; claimed: boolean; reward: { type: 'COINS' | 'FREEZE'; amount: number } }[];
}

export interface MonthlyBeat {
  monthKey: string;
  from: number;
  to: number;
  target: number;
  /** Milestone chests this lesson made openable. */
  newlyClaimable: MonthlyQuestLite['milestones'];
}

/**
 * Did this lesson earn a goal day? Then the quest screen after it shows the
 * month's badge ring moving, and any milestone chest it unlocked. No goal
 * day → null (a lesson that didn't count shouldn't pretend it did).
 */
export function monthlyBeat(before: MonthlyQuestLite | null, after: MonthlyQuestLite | null): MonthlyBeat | null {
  if (!before || !after || before.monthKey !== after.monthKey) return null;
  if (after.goalDays <= before.goalDays) return null;
  const wasClaimable = new Set(before.milestones.filter((m) => m.claimable || m.claimed).map((m) => m.id));
  return {
    monthKey: after.monthKey,
    from: before.goalDays,
    to: Math.min(after.goalDays, after.targetDays),
    target: after.targetDays,
    newlyClaimable: after.milestones.filter((m) => m.claimable && !m.claimed && !wasClaimable.has(m.id)),
  };
}
