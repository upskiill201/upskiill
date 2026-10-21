import type { OriginalTrackDef } from '../../src/originals/originals-authoring.types';
import u01 from './budgeting/beginner/u01';

/**
 * Budgeting for Beginners — storyline "The Case of the Missing Cedis".
 * A SHORT Original (5 chapters × 10 lessons). Course 1 of 3 in the Personal
 * Finance set (then How to Save Money on a Low Income, then How to Stop
 * Impulse Buying), all following Kofi's first year at KNUST, Kumasi.
 * Mum sends GH₵1,500 on the 1st; on day 12 Kofi has GH₵63 and no idea where
 * the rest went. Efua keeps a notebook, Yaw is his generous roommate, Miracle
 * mentors by voice note from Lagos. Outline and research:
 * docs/originals/money-track-outline.md.
 */
const track: OriginalTrackDef = {
  slug: 'budgeting-for-beginners',
  title: 'Budgeting for Beginners',
  category: 'Personal Finance',
  format: 'short',
  description:
    'Know where every cedi, naira or shilling goes and make your money last the whole month: track your spending, tell needs from wants and build a budget that fits real life, even on a small income.',
  levels: [
    {
      level: 1,
      slug: 'budgeting-for-beginners',
      title: 'Budgeting for Beginners',
      thumbnailUrl: '/originals/budgeting-for-beginners.jpg',
      subtitle: 'The Case of the Missing Cedis: make your money last the whole month',
      shortDescription:
        "If your money is gone before the month is, you don't need more willpower. You need a plan that fits real life. Learn to track your spending, tell needs from wants and build a budget you'll actually keep, even on a small income.",
      description:
        "Kofi has just started university in Kumasi. His mum sends GH₵1,500 on the 1st of every month. On day 12 he checks his balance: GH₵63. He hasn't bought anything big, he has no idea where the money went, and he's far too proud to tell her. Follow Kofi as he solves the case of the missing cedis, survives the rest of the month, and builds his first real budget: one that bends for birthdays, cracked screens and surprise costs without breaking. Bring your own money along: every lesson turns what Kofi learns onto your income, your spending and your month. No maths beyond adding up, and no spreadsheets needed.",
      startingPoint:
        'You get money from a job, an allowance, a side-hustle or family, and it never seems to last. No experience with budgets needed.',
      endOutcome: 'Build a monthly budget for your own income and stick to it for a full month.',
      outcomes: [
        'Track where your money really goes, from your own mobile money or bank history',
        'Tell needs from wants and decide what comes first when money is short',
        'Build a weekly budget where every unit of money has a job',
        'Plan for surprises, irregular income and costs that come once a term',
        'Keep your budget going with a ten-minute weekly money check',
      ],
      skills: ['Budgeting', 'Expense tracking', 'Money management', 'Financial planning', 'Personal finance'],
      upcomingUnits: 4,
      units: [u01],
    },
  ],
};

export default track;
