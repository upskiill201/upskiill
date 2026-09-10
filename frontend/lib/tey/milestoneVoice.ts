/**
 * Tey's voice for the progress/completion milestone scenes — Section
 * Complete, Section Unlocked, Course Progress, Course Complete. All four
 * previously had a single fixed headline/line and (for Course Progress) no
 * mascot commentary at all.
 */

import { pickFromPool } from './pool';

const SECTION_COMPLETE_SPEECH = [
  'One section down. Keep that momentum!',
  "That's how it's done!",
  'Nice work — onward to the next one 🔥',
];

const SECTION_UNLOCKED_HEADLINES = ['Section unlocked!', 'A new challenge appears! 👀', "Let's see what's next..."];

const COURSE_COMPLETE_SPEECH = [
  'You did it! Every lesson, every step — all yours now.',
  "I'm not saying I'm proud... okay, I'm saying it. I'm proud. 🥹",
  'A whole course. From nothing to this. Look at you.',
];

/** Crossing one of these percentages is treated as a "big" milestone. */
const BIG_MILESTONES = [25, 50, 75, 100];

const PROGRESS_SMALL = ["Every bit counts.", 'Steady progress!', 'Keep that momentum going.'];

const PROGRESS_BIG = [
  "You're on a roll! 🔥",
  'Look at that bar move!',
  'Okay, somebody is committed 😤',
];

export function pickSectionCompleteSpeech(): string {
  return pickFromPool(SECTION_COMPLETE_SPEECH, 'section-complete:speech');
}

export function pickSectionUnlockedHeadline(): string {
  return pickFromPool(SECTION_UNLOCKED_HEADLINES, 'section-unlocked:headline');
}

export function pickCourseCompleteSpeech(): string {
  return pickFromPool(COURSE_COMPLETE_SPEECH, 'course-complete:speech');
}

export function pickCourseProgressLine(from: number, to: number): string {
  const crossedBig = BIG_MILESTONES.some((m) => from < m && to >= m);
  return crossedBig
    ? pickFromPool(PROGRESS_BIG, 'course-progress:BIG')
    : pickFromPool(PROGRESS_SMALL, 'course-progress:SMALL');
}
