/**
 * Tey's voice for the LEVEL_UP scene — this scene has never had a headline
 * pool or a spoken line at all (mascot cheers silently). Adds both, tiered
 * by whether the new level lands on a milestone (every 5th level).
 */

import { pickFromPool } from './pool';

const HEADLINE_NORMAL = (level: number) => [`You reached level ${level}!`, `Level ${level}! Keep it up!`, `Level ${level}. Nice climb!`];

const HEADLINE_MILESTONE = (level: number) => [
  `LEVEL ${level}?! LOOK AT YOU!`,
  `Okay, somebody's leveling up FAST!`,
  `Level ${level} — that's a big one!`,
];

const SPEECH_NORMAL = ['One level closer to whatever you\'re building', 'Onward and upward!', "That's the way to do it."];

const SPEECH_MILESTONE = [
  'This is the part where I brag about you to the other learners.',
  "I'm not saying I'm proud... okay, I'm saying it. I'm proud.",
  'Somebody tell the leaderboard we\'re coming.',
];

export function pickLevelUpVoice(newLevel: number): { headline: string; speech: string } {
  const isMilestone = newLevel % 5 === 0;
  return {
    headline: pickFromPool(isMilestone ? HEADLINE_MILESTONE(newLevel) : HEADLINE_NORMAL(newLevel), isMilestone ? 'levelup-h:MILESTONE' : 'levelup-h:NORMAL'),
    speech: pickFromPool(isMilestone ? SPEECH_MILESTONE : SPEECH_NORMAL, isMilestone ? 'levelup-s:MILESTONE' : 'levelup-s:NORMAL'),
  };
}
