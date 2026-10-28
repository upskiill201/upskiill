import type { OriginalTrackDef } from '../../src/originals/originals-authoring.types';
import u01 from './typescript/beginner/u01';

/**
 * TypeScript for Beginners — storyline "Grace Ships It".
 * Outline and story: docs/originals/typescript-beginner-outline.md (approved 2026-10-18).
 *
 * Grace (44, Manchester, ex-nurse, junior UX researcher at Kinwell) builds a
 * Session Booker for the research team's patient sessions; Femi (Kinwell
 * developer) mentors her and Arjun reviews her code. Complete beginners learn
 * programming through TypeScript, with types from the first lesson. Every
 * lesson type-checks and runs real TypeScript in the browser
 * (runner: 'typescript' → frontend/public/typescript/runner.worker.js).
 *
 * Founder, 2026-10-20: courses have 5 chapters, so the track is three
 * 'focused' levels (5 chapters × 20 lessons each), 15 chapters in all:
 *
 *   1. TypeScript for Beginners (v0.0–v0.4): first code, types, numbers,
 *      text, decisions.
 *   2. TypeScript Functions and Objects (v0.5–v0.85): arrays, loops,
 *      functions, objects and interfaces, list methods.
 *   3. Real-World TypeScript (v0.9–v1.0): null and undefined, unions,
 *      async and JSON, modules and Node, Session Booker 1.0.
 */
const track: OriginalTrackDef = {
  slug: 'typescript-for-beginners',
  title: 'TypeScript',
  category: 'Coding',
  format: 'focused',
  description: 'Learn to code from zero with TypeScript, the language behind modern web apps, writing and checking real code in every lesson.',
  runner: 'typescript',
  levels: [
    {
      level: 1,
      slug: 'typescript-for-beginners',
      title: 'TypeScript for Beginners',
      subtitle: 'Grace Ships It: learn to code with a safety net that catches your mistakes',
      shortDescription:
        'Learn to code with TypeScript, the language behind modern web apps. Ten-minute lessons, a streak to keep, and real code you write, check and run in every lesson, right on your phone.',
      description:
        "TypeScript is JavaScript with a safety net: you describe what your data looks like, and it catches mistakes before your code ever runs. Most TypeScript courses assume you already know JavaScript. This one doesn't. You start from zero and learn to program through TypeScript, one 10 to 15 minute lesson at a time. Follow Grace, a nurse turned UX researcher in Manchester, as she replaces a spreadsheet that keeps breaking with a booking tool her whole team can trust, adding a feature every chapter. You write, check and run real TypeScript in every lesson, right in your browser, with nothing to install, and Tey explains every idea and every error in plain words.",
      startingPoint: 'You have never written code, or tried JavaScript once and got lost. You can use a phone or computer comfortably.',
      endOutcome:
        'Write small, typed TypeScript programs that store, calculate, format and check information, make decisions, and catch your own mistakes before they run.',
      outcomes: [
        'Write, check and run real TypeScript from your first lesson',
        'Describe your data with types so mistakes are caught before the code runs',
        'Calculate with numbers and avoid the NaN trap',
        'Join, clean and format text with template strings',
        'Make decisions with if, else and literal unions',
        'Read error messages calmly and fix your own bugs',
      ],
      skills: ['TypeScript', 'JavaScript', 'Programming basics', 'Debugging'],
      thumbnailUrl: '/originals/typescript-for-beginners.jpg',
      upcomingUnits: 4,
      units: [u01],
    },
  ],
};

export default track;
