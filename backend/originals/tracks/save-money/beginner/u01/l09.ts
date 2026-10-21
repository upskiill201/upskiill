import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 9. Tap to explore: the jar v1, the gap. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'The jar v1: the gap',
  summary: 'Kofi draws a jar on the back of his door and writes the numbers next to it. Week 0. Tap through the first version of his savings tracker and see the size of the problem.',
  minutes: 11,
  outcomes: [
    'Read a savings tracker',
    'See a goal, a rate and a gap on one page',
    'Build a tracker for your own goal',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'The jar v1 (week 0)',
      text: 'GOAL: Laptop, GH₵3,500, by week 16. EMERGENCY FUND: GH₵300, separate, do not touch. IN THE JAR: GH₵490. SAVING NOW: GH₵55 a week. AT THIS RATE BY WEEK 16: GH₵1,370. GAP: GH₵2,130. WEEKLY TARGET: about GH₵188. NOT AN OPTION: GH₵480 a month for 12 months.',
      hotspots: [
        { phrase: 'GH₵3,500, by week 16', note: 'Exact thing, honest middle price, fixed date. A goal, not a wish.' },
        { phrase: 'EMERGENCY FUND: GH₵300, separate', note: 'Miracle\'s rule. Built first, kept apart, so one bad week can\'t empty the jar.' },
        { phrase: 'IN THE JAR: GH₵490', note: 'GH₵790 minus the GH₵300 emergency fund.' },
        { phrase: 'SAVING NOW: GH₵55 a week', note: 'His Budgeting savings line plus the phone and laptop line: about GH₵230 a month.' },
        { phrase: 'AT THIS RATE BY WEEK 16: GH₵1,370', note: '490 + 16 × 55 = 1,370. Honest maths, before any changes.' },
        { phrase: 'GAP: GH₵2,130', note: 'The real problem. Chapters 2 to 5 close it: leaks, automatic saving, protecting the plan and a little more income.' },
        { phrase: 'NOT AN OPTION: GH₵480 a month for 12 months', note: 'Written on the jar on purpose: GH₵5,760 total. A reminder on the bad days.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'A tracker has five numbers: goal, date, what you have, your rate, and the gap. Update it every Sunday.',
    },
  ],
  apply: {
    scenario: 'Reading the jar.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: '16 weeks × GH₵55. How much does Kofi add at his current rate?',
        answers: ['880', 'GH₵880', '880 cedis'],
        placeholder: 'A number',
      },
      {
        kind: 'typeAnswer',
        prompt: 'GH₵490 + GH₵880. What will the jar hold by week 16 at this rate?',
        answers: ['1370', '1,370', 'GH₵1,370', 'GH₵1370'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'What does the gap of GH₵2,130 tell Kofi?',
        options: [
          { text: 'Exactly how much more he needs to find, save, earn or cut from the price' },
          { text: 'That the goal is impossible', why: 'It tells him the size of the problem, not that it can\'t be solved.' },
          { text: 'That he should take the payment plan', why: 'That costs GH₵2,260 extra, more than the gap.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each jar number to where it came from.',
        pairs: [
          ['GH₵490', '790 minus the emergency fund'],
          ['GH₵55 a week', 'His budget\'s savings lines'],
          ['GH₵1,370', '490 + 16 × 55'],
          ['GH₵2,130', '3,500 − 1,370'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Which numbers go on a savings tracker?',
        groups: ['Belongs', 'Doesn\'t belong'],
        items: [
          { text: 'The goal amount', group: 0 },
          { text: 'The date', group: 0 },
          { text: 'What friends are saving', group: 1 },
          { text: 'Your weekly rate', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'yaw',
        message: 'GH₵2,130 short? Just take my cousin\'s deal.',
        prompt: 'Kofi\'s best reply?',
        options: [
          { text: 'It\'s on the jar: GH₵5,760 total. I\'d pay more extra than my whole gap.' },
          { text: 'Fine.', why: 'He\'d pay GH₵2,260 extra to avoid a GH₵2,130 gap.' },
          { text: 'I\'ll give up.', why: 'The gap is a problem to solve, not a verdict.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Five numbers.',
        template: 'Goal, date, what you [[1]], your [[2]], and the [[3]].',
        blanks: [['have'], ['rate'], ['gap']],
        distractors: ['owe', 'friends'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line on this copy of the jar is wrong?',
        lines: [
          'Goal: GH₵3,500.',
          'In the jar: GH₵490.',
          'At this rate by week 16: GH₵3,370.',
          'Gap: GH₵2,130.',
        ],
        bug: 2,
        fix: 'At this rate by week 16: GH₵1,370.',
        explanation: '490 + 880 = 1,370. With 3,370 the gap would be only 130.',
      },
      {
        kind: 'mcq',
        prompt: 'Why write "NOT AN OPTION" on the jar?',
        options: [
          { text: 'To remind himself on bad days why the slow road is cheaper' },
          { text: 'To annoy Yaw', why: 'A side effect, maybe. Not the reason.' },
          { text: 'Because the shop requires it', why: 'It\'s for Kofi.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Order how to build your own jar.',
        lines: ['Write the goal and date', 'Write what you have', 'Write your weekly rate', 'Work out where that gets you', 'Write the gap'],
      },
    ],
  },
  reflect: {
    prompt: 'Draw your own jar: goal, date, what you have, rate, gap. Where will you put it so you see it every day?',
    starters: ['My goal:...', 'My gap:...', 'I\'ll put it...'],
  },
  deepen: {
    title: 'Visible progress',
    summary: 'Seeing progress toward a goal tends to keep people going. Kofi\'s jar is on his door; others use a photo on their lock screen or a number in their notes app. Pick somewhere you\'ll see daily.',
  },
  notes: 'Jar v1 numbers per tracks/save-money.ts running numbers.',
};

export default lesson;
