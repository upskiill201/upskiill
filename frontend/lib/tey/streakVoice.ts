/**
 * Tey's voice for the Streak scene — replaces the single fixed line per mode
 * in `StreakScene.tsx` with pools tiered by magnitude (small continuation vs.
 * a milestone day count), matching the "small win / big win / huge
 * achievement" framing used across the rest of the Celebration Engine.
 * `scene.speech` (an existing override prop) still wins over all of this.
 */

import { pickFromPool } from './pool';

export type StreakVoiceMode = 'EXTENDED_SMALL' | 'EXTENDED_MILESTONE' | 'SAVED' | 'LOST';

const MILESTONE_DAYS = new Set([7, 14, 21, 30, 50, 75, 100, 150, 200, 250, 300, 365]);

export interface StreakVoiceContext {
  days: number;
  personalBest?: boolean;
}

function extendedSmall(days: number): string[] {
  const s = days === 1 ? '' : 's';
  return [
    `${days} day${s} in a row! Come back tomorrow to keep the fire alive.`,
    'Nice one! Keep going! 🔥',
    'Okayyy, I see you! 👀',
    "That's how it's done!",
    'Little wins become BIG wins 😤',
  ];
}

function extendedMilestone(days: number): string[] {
  return [
    `${days} DAYS?! YOU DID ITTTT! 🏆🔥`,
    'Okay, somebody is showing off! 😤',
    `${days} days straight. This deserves a celebration! 🎊`,
    'Look at you goooo! 🚀',
    "I KNEW YOU HAD IT IN YOU!!! 😤🔥",
  ];
}

const SAVED = [
  'Your streak freeze jumped in and saved your streak. Phew!',
  'Okay… small setback avoided. Let\'s keep going 😤',
  'Crisis averted. Carry on!',
  'That freeze earned its keep today 🧊',
];

const LOST = [
  'You missed a day and the streak reset — but your progress is safe.',
  'Oof. That one hurt a little 😭 But we\'re not done yet.',
  "Not our best moment… but the comeback starts now 💪",
  'Okay… small setback. Let\'s fix it 😤',
];

export function pickStreakSpeech(mode: 'EXTENDED' | 'SAVED' | 'LOST', ctx: StreakVoiceContext): string {
  if (mode === 'SAVED') return pickFromPool(SAVED, 'streak:SAVED');
  if (mode === 'LOST') return pickFromPool(LOST, 'streak:LOST');
  const isMilestone = MILESTONE_DAYS.has(ctx.days) || ctx.personalBest;
  return isMilestone
    ? pickFromPool(extendedMilestone(ctx.days), 'streak:EXTENDED_MILESTONE')
    : pickFromPool(extendedSmall(ctx.days), 'streak:EXTENDED_SMALL');
}

/**
 * The Herald "streak committed" full-screen overlay (`HeraldStreakReveal.tsx`)
 * — separate moment from the Celebration Engine's StreakScene above, but the
 * same voice. Previously an inline, un-pooled, un-deduped 4-line array
 * (earnest motivational-poster tone, zero emoji — read as a different,
 * generic fitness-app coach rather than Tey).
 */
const HERALD_REVEAL_LINES = [
  "Try to make it a whole week — I'll be watching 👀",
  'Keep this up and I might start taking credit for it.',
  "Don't stop now, we're just getting started.",
  'One more day and this becomes a whole thing.',
];

export function pickHeraldStreakLine(): string {
  return pickFromPool(HERALD_REVEAL_LINES, 'streak:herald-reveal');
}
