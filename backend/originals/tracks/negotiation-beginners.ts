import type { OriginalTrackDef } from '../../src/originals/originals-authoring.types';
import u01 from './negotiation-beginners/beginner/u01';
import u02 from './negotiation-beginners/beginner/u02';
import u03 from './negotiation-beginners/beginner/u03';
import u04 from './negotiation-beginners/beginner/u04';
import u05 from './negotiation-beginners/beginner/u05';

/**
 * Negotiation Skills for Beginners — storyline "Ada Asks".
 * A SHORT Original: one level, 5 chapters × 10 lessons. Course 1 of 3 in the
 * Negotiation & Conflict track (also covers Negotiate Without Feeling
 * Awkward, Ask for What You Want and Find Win-Win Solutions). Ada says yes to
 * everything; over five weeks she learns to prepare, ask, trade and close,
 * ending at her salary review. Lesson 9 of every chapter is her ask card.
 * Outline and research: docs/originals/negotiation-skills-for-beginners-outline.md.
 */
const track: OriginalTrackDef = {
  slug: 'negotiation-skills-for-beginners',
  title: 'Negotiation Skills for Beginners',
  category: 'Negotiation & Conflict',
  format: 'short',
  description:
    'Ask for what you want without the awkwardness: preparation, walk-away points, first offers, win-win trades and closing well, at work and in everyday life.',
  levels: [
    {
      level: 1,
      slug: 'negotiation-skills-for-beginners',
      title: 'Negotiation Skills for Beginners',
      thumbnailUrl: '/originals/negotiation-skills-for-beginners.jpg',
      subtitle: 'Ada Asks: ask for what you want, and leave both sides better off',
      shortDescription:
        'Most people never ask, and pay for it for years. Learn to prepare, name a number, find deals where both sides win, and close calmly: at work, with a landlord, or with your first client.',
      description:
        "Ada says yes to everything. In one week she accepts a second project for the same pay, a 25% rent rise by text, and a logo job for \"whatever you think is fair\". Her salary review is in five weeks. Follow Ada as she learns to notice everyday negotiations, calm the nerves, prepare a walk-away point and an alternative, make a first offer with a reason, trade things that matter differently to each side, and close with a clear written agreement. Every lesson uses real research, from the study that found most graduates never negotiate their first offer to how first offers anchor the final deal. You'll plan a real ask of your own as you go. No experience needed.",
      startingPoint:
        'You find asking for things awkward, or you usually accept the first offer. No experience needed.',
      endOutcome:
        'Prepare and run a calm negotiation: know your walk-away and alternative, make a confident first offer, find trades that help both sides, and close in writing.',
      outcomes: [
        'Notice everyday negotiations and the cost of not asking',
        'Prepare a goal, a walk-away point and an alternative',
        'Make a first offer with a reason, and hold the silence',
        'Find win-win trades by asking about interests',
        'Handle "no" and close with a clear agreement',
      ],
      skills: ['Negotiation', 'Asking', 'Preparation', 'BATNA', 'Win-win deals', 'Confidence'],
      upcomingUnits: 0,
      units: [u01, u02, u03, u04, u05],
    },
  ],
};

export default track;
