import type { OriginalTrackDef } from '../../src/originals/originals-authoring.types';
import u01 from './needs-wants/beginner/u01';

/**
 * Needs vs. Wants: Making Better Spending Decisions — storyline "Ada's Raise".
 * A SHORT Original (5 chapters × 10 lessons) in the Personal Finance set.
 * Ada (Lagos) after Negotiation Skills for Beginners: her salary is now
 * ₦480,000, and three months later she's saving less than before the raise.
 * Lucía (mentor) invites her to a design conference in Mexico City in six
 * months if she can fund half: ₦900,000. Ngozi (flatmate, narrated) sells
 * ankara online. Device: Ada's line (where she draws need vs want), v1–v5.
 *
 * Running numbers (monthly, ₦):
 * - Before the raise (₦420,000): saved 60,000. After (₦480,000): saves 20,000.
 *   The 100,000 of creep: transport 40,000 → 75,000; food 70,000 → 95,000;
 *   phone instalment 20,000 (new); gym 12,000 (rarely used); subscriptions
 *   +8,000.
 * - Goal: ₦900,000 in 6 months = 150,000/month.
 * - Final (Ch5): saving rises to 135,000/month (transport 45,000, food 70,000,
 *   gym cancelled, subscriptions trimmed, delivery cut, art class kept) =
 *   810,000 + old phone and laptop sold 90,000 = 900,000.
 * Outline: docs/originals/money-track-outline.md (Part 2).
 */
const track: OriginalTrackDef = {
  slug: 'needs-vs-wants',
  title: 'Needs vs. Wants: Making Better Spending Decisions',
  category: 'Personal Finance',
  format: 'short',
  description:
    'Tell needs from wants when it\'s genuinely hard, stop lifestyle creep, spend on what matters to you, and make big spending choices on purpose.',
  levels: [
    {
      level: 1,
      slug: 'needs-vs-wants',
      title: 'Needs vs. Wants: Making Better Spending Decisions',
      thumbnailUrl: '/originals/needs-vs-wants.jpg',
      subtitle: 'Ada\'s Raise: spend on what matters, and stop the rest',
      shortDescription:
        'Earning more doesn\'t help if wants quietly become "needs". Learn to spot lifestyle creep, draw your own line between needs and wants, spend on what you actually value, and make hard money choices you won\'t regret.',
      description:
        "Ada fought for her raise. She got it: ₦480,000 a month. Three months later she's saving less than before. Nothing dramatic happened. Rides replaced the bus, delivery replaced cooking, a new phone arrived on instalments, and every one of them now feels like a need. Then Lucía offers her a seat at a design conference in Mexico City, if Ada can fund half: ₦900,000 in six months. Follow Ada as she finds where her raise went, draws her own line between needs and wants, discovers what she really values, and makes the hard choices that get her on the plane. No guilt, no bans: just better decisions. Bring your own spending; every lesson works on yours.",
      startingPoint:
        'You earn or receive money and find it disappears on things that felt necessary at the time. No budgeting experience needed.',
      endOutcome: 'Draw a clear line between your needs and wants, and make spending choices that match what you value.',
      outcomes: [
        'Spot lifestyle creep and "need inflation" in your own spending',
        'Sort spending into needs, nice-to-haves and wants, with the basic version of each need',
        'Spend more on what you value and less on what you don\'t',
        'Use opportunity cost and simple decision tests for big choices',
        'Build a spending plan from your values and stick to it',
      ],
      skills: ['Spending decisions', 'Needs vs wants', 'Lifestyle creep', 'Values-based spending', 'Personal finance'],
      upcomingUnits: 4,
      units: [u01],
    },
  ],
};

export default track;
