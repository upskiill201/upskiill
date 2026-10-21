import type { OriginalTrackDef } from '../../src/originals/originals-authoring.types';
import u01 from './save-money/beginner/u01';
import u02 from './save-money/beginner/u02';
import u03 from './save-money/beginner/u03';

/**
 * How to Save Money on a Low Income — storyline "Kofi's Laptop Fund".
 * A SHORT Original (5 chapters × 10 lessons). Course 2 of 3 in the Personal
 * Finance set; picks up the night Kofi's laptop dies (end of Budgeting for
 * Beginners). He needs about GH₵3,500 for a used laptop in 16 weeks.
 *
 * Running numbers (keep consistent across chapters):
 * - Start (week 0): savings 550 + leftover 210 + laptop line 30 = 790 →
 *   emergency fund 300 (separate), laptop jar 490. Rate before leaks GH₵55/week
 *   → projected 490 + 16 × 55 = 1,370; gap 2,130.
 * - Ch2 leaks found: GH₵70/week → rate 125/week. Jar week 4: 850.
 * - Weeks 5–6 transfers missed; GH₵90 of the GH₵250 got spent, GH₵160 moved in
 *   week 7. Ch3 automated from week 7. Jar week 8: 850 + 160 + 2 × 125 = 1,260.
 * - Ch4 week 9 malaria: GH₵280 from the emergency fund (300 → 20), refilled
 *   over weeks 9–12 at 70/week from the leak money (jar gets 55/week). Jar week 12: 1,480.
 * - Ch5 weeks 13–16: 4 × 125 = 500 → 1,980; beats extra 450; Christmas money
 *   200 (of 300); old laptop sold for parts 250 → 2,880. Laptop found at
 *   GH₵3,200 (same spec), Yaw haggles it to GH₵2,850. Paid in cash, GH₵30 left,
 *   emergency fund full.
 * Outline: docs/originals/money-track-outline.md.
 */
const track: OriginalTrackDef = {
  slug: 'how-to-save-money-on-a-low-income',
  title: 'How to Save Money on a Low Income',
  category: 'Personal Finance',
  format: 'short',
  description:
    'Save on a small income: set a goal you can reach, build a small emergency fund first, find spending you won\'t miss, and make saving automatic.',
  levels: [
    {
      level: 1,
      slug: 'how-to-save-money-on-a-low-income',
      title: 'How to Save Money on a Low Income',
      thumbnailUrl: '/originals/how-to-save-money-on-a-low-income.jpg',
      subtitle: "Kofi's Laptop Fund: an emergency fund first, then the thing you're saving for",
      shortDescription:
        '"Save 20%" is easy advice when you earn a lot. This course is for when you don\'t. Set a goal you can reach, build a small emergency fund, find the spending you won\'t miss and make saving automatic.',
      description:
        "Kofi's laptop has just died. Next semester's programming module needs one, a used laptop that meets the spec costs about GH₵3,500, and he has 16 weeks. His budget saves about GH₵55 a week. Do the maths and he's more than GH₵2,000 short. Follow Kofi as he closes the gap the honest way: a small emergency fund first, a hunt for spending he won't miss, saving that happens automatically, a fever that tests everything, and a little extra income from his beats. No get-rich tricks, no loans: just how saving really works when there isn't much to save. Bring your own goal: every lesson helps you reach it.",
      startingPoint:
        'Your income is small or irregular and saving feels impossible. You may have a budget already (Budgeting for Beginners helps, but isn\'t required).',
      endOutcome: 'Set a savings goal with a weekly target, build a starter emergency fund and save toward the goal every week.',
      outcomes: [
        'Set a savings goal with an amount, a date and a weekly target',
        'Build a starter emergency fund before saving for anything else',
        'Find spending you won\'t miss: leaks, fees and costly habits',
        'Make saving automatic and hard to undo',
        'Handle emergencies, lending and windfalls without losing your progress',
      ],
      skills: ['Saving money', 'Emergency fund', 'Goal setting', 'Frugal living', 'Personal finance'],
      upcomingUnits: 2,
      units: [u01, u02, u03],
    },
  ],
};

export default track;
