/**
 * Every lesson should end like it mattered — and not like the last one.
 *
 * The finish screen picks ONE headline moment from what actually happened
 * (came back after a break, a flawless quiz, a long run, a fast finish, a
 * busy day, the day's first lesson), and up to two personal-record badges
 * measured against the learner's own recent lessons. Each moment brings its
 * own title pool, Tey pose, entrance and confetti pattern, so two finishes in
 * a row look and feel different — and every word on them is true.
 *
 * Pure: randomness comes in through `pick`, so tests pin the rules.
 */

import type { LessonRecord } from './history';
import { accuracyPct, isPerfect, type LessonStats } from './outro';

export type MomentId = 'practice' | 'comeback' | 'perfect' | 'onFire' | 'dayRoll' | 'fast' | 'firstOfDay' | 'standard';

export type MomentPose = 'cheering' | 'flame' | 'welcome';
export type ConfettiStyle = 'burst' | 'cannons' | 'stars' | 'rain';
export type Entrance = 'drop' | 'spin' | 'bounce';

export interface Moment {
  id: MomentId;
  title: string;
  pose: MomentPose;
  confetti: ConfettiStyle;
  entrance: Entrance;
}

export interface Badge {
  id: 'fastest' | 'bestRun' | 'perfectRun' | 'lessonsToday';
  label: string;
}

export interface MomentInput {
  stats: LessonStats;
  /** Longest run of right answers in this lesson. */
  bestCombo: number;
  isReview: boolean;
  /** This learner's earlier lessons on this device, oldest first. */
  history: LessonRecord[];
  now: Date;
  /** From the server, read when the lesson opened. */
  daysSinceLastLesson: number;
  /** From the server, read when the lesson opened. */
  lastLessonAt: string | null;
}

export type Pick = <T>(list: T[]) => T;
export const randomPick: Pick = (list) => list[Math.floor(Math.random() * list.length)];

/** A break long enough that coming back deserves saying so. */
export const COMEBACK_DAYS = 3;
/** Records need something to beat — no "record" on a learner's 2nd lesson. */
export const RECORD_MIN_HISTORY = 3;
/** A run worth calling out in the headline. */
export const ON_FIRE_RUN = 5;

const sameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

export function lessonsToday(input: MomentInput): number {
  return input.history.filter((r) => sameDay(new Date(r.at), input.now)).length + 1;
}

export function isFast(s: LessonStats): boolean {
  const budget = s.expectedMinutes && s.expectedMinutes > 0 ? s.expectedMinutes * 60 : 180;
  return s.seconds <= budget;
}

function firstOfDay(input: MomentInput): boolean {
  if (input.lastLessonAt) return !sameDay(new Date(input.lastLessonAt), input.now);
  return lessonsToday(input) === 1;
}

const TITLES: Record<Exclude<MomentId, 'dayRoll'>, string[]> = {
  practice: ['Practice complete!', 'Sharper than before!', 'Practice makes perfect!'],
  comeback: ['Welcome back!', "You're back!", 'Good to see you!'],
  perfect: ['Perfect lesson!', 'Flawless!', 'Not one slip!'],
  onFire: ['On fire!', 'Unstoppable!', 'What a run!'],
  fast: ['Speedy finish!', 'Lightning fast!', 'Quick work!'],
  firstOfDay: ['First one today!', 'Day off to a flying start!', 'Great start to the day!'],
  standard: ['Lesson complete!', 'Nicely done!', 'Lesson done!'],
};

const LOOK: Record<MomentId, Omit<Moment, 'id' | 'title' | 'entrance'> & { entrances: Entrance[] }> = {
  practice: { pose: 'cheering', confetti: 'burst', entrances: ['bounce', 'drop'] },
  // Waving from the pedestal: "there you are".
  comeback: { pose: 'welcome', confetti: 'rain', entrances: ['drop'] },
  perfect: { pose: 'flame', confetti: 'stars', entrances: ['spin'] },
  onFire: { pose: 'flame', confetti: 'cannons', entrances: ['bounce', 'spin'] },
  dayRoll: { pose: 'cheering', confetti: 'cannons', entrances: ['bounce', 'drop'] },
  fast: { pose: 'cheering', confetti: 'cannons', entrances: ['bounce'] },
  firstOfDay: { pose: 'cheering', confetti: 'burst', entrances: ['drop', 'bounce'] },
  standard: { pose: 'cheering', confetti: 'burst', entrances: ['bounce', 'drop', 'spin'] },
};

/** The one thing this finish is about. First match wins. */
export function momentId(input: MomentInput): MomentId {
  const s = input.stats;
  if (input.isReview) return 'practice';
  if (input.daysSinceLastLesson >= COMEBACK_DAYS) return 'comeback';
  if (isPerfect(s)) return 'perfect';
  if (input.bestCombo >= ON_FIRE_RUN) return 'onFire';
  if (lessonsToday(input) >= 3) return 'dayRoll';
  if (isFast(s) && s.questions > 0) return 'fast';
  if (firstOfDay(input)) return 'firstOfDay';
  return 'standard';
}

export function lessonMoment(input: MomentInput, pick: Pick = randomPick): Moment {
  const id = momentId(input);
  const look = LOOK[id];
  const n = lessonsToday(input);
  const title =
    id === 'dayRoll' ? pick([`Lesson ${n} today!`, 'On a roll!', `That's ${n} today!`]) : pick(TITLES[id]);
  return { id, title, pose: look.pose, confetti: look.confetti, entrance: pick(look.entrances) };
}

/** Personal records — true, earned, at most two. */
export function lessonBadges(input: MomentInput): Badge[] {
  if (input.isReview) return [];
  const badges: Badge[] = [];
  const prev = input.history;
  const s = input.stats;

  if (prev.length >= RECORD_MIN_HISTORY) {
    const fastest = Math.min(...prev.map((r) => r.seconds));
    if (s.seconds > 0 && s.seconds < fastest) badges.push({ id: 'fastest', label: 'New record · Fastest lesson' });
    const bestRun = Math.max(...prev.map((r) => r.bestCombo ?? 0));
    if (input.bestCombo >= 3 && input.bestCombo > bestRun) {
      badges.push({ id: 'bestRun', label: `Best run yet · ${input.bestCombo} in a row` });
    }
  }

  if (accuracyPct(s) === 100) {
    let run = 1;
    for (let i = prev.length - 1; i >= 0 && prev[i].accuracy === 100; i--) run++;
    if (run >= 2) badges.push({ id: 'perfectRun', label: `${run} perfect lessons in a row` });
  }

  const today = lessonsToday(input);
  if (today >= 2) badges.push({ id: 'lessonsToday', label: `${today} lessons today` });

  return badges.slice(0, 2);
}

/** Streak days worth their own name. */
const STREAK_NAMES: Record<number, string> = {
  3: '3 day streak!',
  7: 'One week streak!',
  14: 'Two week streak!',
  30: 'One month streak!',
  50: '50 day streak!',
  100: '100 day streak!',
  365: 'One year streak!',
};

export interface StreakMoment {
  /** Replaces "day streak!" under the number. */
  title: string;
  /** Longer than any streak this learner has had. */
  personalBest: boolean;
  milestone: boolean;
}

/**
 * @param longestBefore the learner's longest streak, read before this lesson
 *                      (null if unknown — then no personal-best claim).
 */
export function streakMoment(days: number, longestBefore: number | null): StreakMoment {
  const named = STREAK_NAMES[days];
  const personalBest = longestBefore !== null && days > longestBefore && days > 1;
  return {
    title: named ?? 'day streak!',
    personalBest,
    milestone: Boolean(named),
  };
}
