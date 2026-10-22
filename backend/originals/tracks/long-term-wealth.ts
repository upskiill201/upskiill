import type { OriginalTrackDef } from '../../src/originals/originals-authoring.types';
import u01 from './long-term-wealth/beginner/u01';
import u02 from './long-term-wealth/beginner/u02';
import u03 from './long-term-wealth/beginner/u03';
import u04 from './long-term-wealth/beginner/u04';

/**
 * Money Habits That Build Long-Term Wealth — storyline "Miracle's Long Game".
 * A SHORT Original (5 chapters × 10 lessons) in the Personal Finance set.
 * Miracle (25, team lead at Afiya, Lagos; after Machine Learning for
 * Beginners). Her dad, a schoolteacher in Buea, calls: he retires next year
 * with a small pension and almost no savings. Miracle sees that the habits
 * she builds in her twenties decide her sixties. Folake (COO) turns out to be
 * a quiet long-term saver. Device: the 40-year map (net worth and habits), v1–v5.
 * General principles only: no products, no personal investment advice
 * (playbook §9). Growth examples use stated example rates, never promises.
 *
 * Running numbers:
 * - Miracle: take-home ₦900,000/month; spends ₦780,000; saves ₦120,000 into
 *   a basic savings account. Savings ₦1,400,000; workplace pension pot
 *   ₦1,100,000 (never checked); staff loan ₦250,000 left. Net worth ₦2,250,000.
 * - Dad: 59, retires at 60; small pension; savings about 400,000 FCFA.
 * - Folake: started saving 20% at 23; now ~45.
 * Outline: docs/originals/money-track-outline.md (Part 2).
 */
const track: OriginalTrackDef = {
  slug: 'money-habits-long-term-wealth',
  title: 'Money Habits That Build Long-Term Wealth',
  category: 'Personal Finance',
  format: 'short',
  description:
    'The habits that quietly build wealth over decades: knowing your net worth, paying future you first, letting time and compounding work, growing the gap between income and spending, and staying the course.',
  levels: [
    {
      level: 1,
      slug: 'money-habits-long-term-wealth',
      title: 'Money Habits That Build Long-Term Wealth',
      thumbnailUrl: '/originals/money-habits-long-term-wealth.jpg',
      subtitle: 'Miracle\'s Long Game: the habits in your twenties decide your sixties',
      shortDescription:
        'Wealth isn\'t a salary; it\'s what you keep and grow over time. Learn the handful of habits that build it on any income: pay future you first, let compounding work, avoid expensive debt, grow the gap, and stay the course.',
      description:
        "Miracle is 25, leads a team at a Lagos health-tech startup, and earns more than she ever imagined. Then her dad calls from Buea. He's retiring next year after 35 years of teaching, with a small pension and almost nothing saved. \"I always thought I'd start next year.\" Miracle realises she's been doing exactly the same. Follow her as she works out her net worth for the first time, sets up saving that runs on its own, learns why starting early matters more than earning a lot, grows the gap between what she earns and spends, and builds a 40-year plan, while finding a way to help her dad. No get-rich-quick, no product tips: just the habits that work, explained simply.",
      startingPoint:
        'You earn some money and want it to add up to something over the years. No investing knowledge needed.',
      endOutcome: 'Set up the habits that build long-term wealth: a known net worth, automatic long-term saving, low expensive debt, and a plan you\'ll keep for decades.',
      outcomes: [
        'Work out your net worth and track it over time',
        'Pay future you first, automatically, including workplace pensions',
        'Explain compounding, inflation and the cost of expensive debt',
        'Grow the gap between income and spending as your income rises',
        'Stay the course through bad years and support family without sinking',
      ],
      skills: ['Wealth building', 'Long-term saving', 'Compound interest', 'Retirement planning', 'Personal finance'],
      upcomingUnits: 1,
      units: [u01, u02, u03, u04],
    },
  ],
};

export default track;
