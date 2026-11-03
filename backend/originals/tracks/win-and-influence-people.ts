import type { OriginalTrackDef } from '../../src/originals/originals-authoring.types';
import u01 from './win-and-influence-people/u01';
import u02 from './win-and-influence-people/u02';
import u03 from './win-and-influence-people/u03';
import u04 from './win-and-influence-people/u04';
import u05 from './win-and-influence-people/u05';
import u06 from './win-and-influence-people/u06';

/**
 * Win and Influence People — built only from Dale Carnegie's "How to Win
 * Friends and Influence People" (founder, 2026-11-03). No cast storyline: a
 * narrator in Carnegie's voice, true stories from the book, a real-world
 * mission after every lesson. 10 chapters × 10 lessons, one per rule ×3 plus
 * a finale (short format: 10-lesson chapters). HOT course (frontend/lib/courses/hot.ts keys on the level slug).
 * Outline and voice guide: docs/originals/win-and-influence-people-outline.md.
 */
const track: OriginalTrackDef = {
  slug: 'win-and-influence-people',
  title: 'Win and Influence People',
  category: 'Communication',
  format: 'short',
  description:
    'The 30 people rules from the most famous book ever written on getting along with people, turned into short, practical lessons you use the same day.',
  levels: [
    {
      level: 1,
      slug: 'win-and-influence-people',
      title: 'Win and Influence People',
      subtitle: 'The 30 people rules: be liked, be trusted, be followed',
      shortDescription:
        'Stop criticising, make people like you, win them to your way of thinking and change them without resentment: every rule from Dale Carnegie\'s classic, practised in real situations.',
      description:
        'Built on the principles of Dale Carnegie\'s How to Win Friends and Influence People. Every lesson opens on a true story from the book and stops at the turn, so you guess what happened before you find out. Then you learn the rule behind it, practise it in the situations you actually face, and leave with one small mission to try that day. Thirty rules, ten chapters, and a lot of people who will find you easier to deal with.',
      startingPoint: 'Anyone who deals with people: at work, at home, with friends or customers. No experience needed.',
      endOutcome: 'Handle people so they like you, agree with you and change for you, without arguments or resentment.',
      outcomes: [
        'Stop criticising and start getting cooperation',
        'Make people like you within minutes of meeting them',
        'Win arguments by avoiding them, and bring people round to your view',
        'Correct and lead people without offending them',
      ],
      skills: ['Getting along with people', 'Listening', 'Persuasion', 'Handling disagreement', 'Giving feedback', 'Leadership'],
      upcomingUnits: 4,
      units: [u01, u02, u03, u04, u05, u06],
    },
  ],
};

export default track;
