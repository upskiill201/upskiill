/**
 * What Tey says on a lesson's start screen. One line, picked from what's
 * true right now, so the start of lesson 3 today doesn't sound like the
 * start of lesson 1, and a streak at risk is said out loud.
 *
 * Pure: randomness comes in through `pick`.
 */

import type { LessonMilestone } from '@/lib/originals';

export interface IntroContext {
  resuming: boolean;
  firstEver: boolean;
  isReview: boolean;
  /** Lessons already finished today (0 = this is the first). */
  lessonsToday: number;
  streakAtStake: number | null;
  milestone: LessonMilestone | null;
  /** This lesson ends its chapter. */
  endsChapter: boolean;
}

type Pick = <T>(list: T[]) => T;

const LINES = {
  resuming: ['I saved your spot. Right where you left off.', 'You came back! Let’s finish this one.', 'Your place is still warm. Pick it up?'],
  firstEver: ['Your very first lesson. Mistakes are free today, so go for it.', 'First lesson! No pressure, no hearts lost. Let’s go.'],
  review: ['Practice round. No pressure, just sharper.', 'Back for more? Practice makes it stick.'],
  challenge: ['The big one: everything this chapter, in one challenge.', 'Unit Challenge! Show me what you’ve got.'],
  checkpoint: ['Checkpoint! Let’s see what stuck.', 'Quick checkpoint. You know more than you think.'],
  chapterEnd: ['Last lesson of the chapter. Finish strong!', 'One more and this chapter is yours.'],
  streak: (n: number) => [`Your ${n}-day streak is on the line. Let’s keep it burning.`, `Day ${n + 1} of your streak starts with this lesson.`],
  roll: (n: number) => [`Lesson ${n + 1} today? I like your style.`, `${n} down today. Let’s make it ${n + 1}.`, 'You’re on a roll today. Keep it going!'],
  plain: ['Ready? This one’s a good one.', 'Let’s learn something you’ll actually use.', 'A few minutes. One new skill. Let’s go.'],
};

export function introLine(c: IntroContext, pick: Pick): string {
  if (c.resuming) return pick(LINES.resuming);
  if (c.firstEver) return pick(LINES.firstEver);
  if (c.isReview) return pick(LINES.review);
  if (c.milestone === 'UNIT_CHALLENGE') return pick(LINES.challenge);
  if (c.streakAtStake) return pick(LINES.streak(c.streakAtStake));
  if (c.milestone === 'CHECKPOINT') return pick(LINES.checkpoint);
  if (c.lessonsToday > 0) return pick(LINES.roll(c.lessonsToday));
  if (c.endsChapter) return pick(LINES.chapterEnd);
  return pick(LINES.plain);
}
