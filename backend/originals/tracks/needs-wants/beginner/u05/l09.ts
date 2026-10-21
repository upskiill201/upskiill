import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 9. Tap to explore: Ada's line v5. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Ada\'s line v5: on purpose',
  summary: 'The final version of Ada\'s line, the one pinned to her fridge with the Nopal magnet. Tap through a spending plan that finally sounds like her.',
  minutes: 11,
  outcomes: [
    'Read a complete values-based spending plan',
    'See every chapter\'s tool in one place',
    'Write your own final line',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Ada\'s line v5',
      text: 'BASE (protected): Food ₦70,000. Transport ₦45,000. Utilities and data ₦30,000. Rent savings ₦55,000. FAMILY: Support ₦40,000. Family line ₦20,000. GROWTH: Art class ₦15,000. Course ₦10,000. Laptop fund ₦50,000. ADVENTURE: Car fund ₦50,000. Next trip ₦30,000. CONNECTION: Friday dinners ₦32,000. GIVING: Church ₦20,000. SECURITY: Emergency fund ₦13,000. CHECKS: 15 minutes on the 1st. Next raise: half to goals. Freelance: 50, 25, 25.',
      hotspots: [
        { phrase: 'BASE (protected)', note: 'Must-haves at their basic versions. These never flex.' },
        { phrase: 'Transport ₦45,000', note: 'Bus on dry days, rides at night and in rain. Down from ₦75,000.' },
        { phrase: 'Family line ₦20,000', note: 'New after the freezer: family help, planned instead of panicked.' },
        { phrase: 'Art class ₦15,000', note: 'Never cut. Generous where it matters.' },
        { phrase: 'Car fund ₦50,000', note: '"Not now" became a real goal with a number and a date.' },
        { phrase: 'Friday dinners ₦32,000', note: 'Joy per naira: 9 out of 10. Protected.' },
        { phrase: 'Next raise: half to goals.', note: 'The creep lesson from Chapter 1, turned into a rule.' },
        { phrase: 'Freelance: 50, 25, 25.', note: 'Extra income gets a job before it lands.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Your final line: a protected base, your values in order with amounts, security, and the rules that keep it going.',
    },
  ],
  apply: {
    scenario: 'Reading line v5.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: 'Base: 70,000 + 45,000 + 30,000 + 55,000. Total?',
        answers: ['200000', '200,000', '₦200,000', '₦200000'],
        placeholder: 'A number',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each part of v5 to its chapter.',
        pairs: [
          ['Base at basic versions', 'Ch 2: the space between'],
          ['Values with amounts', 'Ch 3: what matters'],
          ['Car fund', 'Ch 4: hard choices'],
          ['Family line', 'Ch 5: choosing on purpose'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Which value does each line serve?',
        groups: ['Family', 'Growth', 'Adventure'],
        items: [
          { text: 'Family line', group: 0 },
          { text: 'Laptop fund', group: 1 },
          { text: 'Car fund', group: 2 },
          { text: 'Course', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Which rule stops the next raise from vanishing?',
        options: [
          { text: 'Next raise: half to goals' },
          { text: 'Freelance: 50, 25, 25', why: 'That\'s for freelance income.' },
          { text: 'Checks on the 1st', why: 'Helpful, but the raise rule is the one.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'v1 was "where did my money go?". v5 is "this is where it goes."',
        prompt: 'Lucía\'s best reply?',
        options: [
          { text: 'And every line has a reason you care about. That\'s the whole course in one sentence.' },
          { text: 'Same thing really.', why: 'Opposite things.' },
          { text: 'Start again at v1.', why: 'She\'s done the work.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The final line.',
        template: 'A protected [[1]], values in [[2]], security, and the [[3]] that keep it going.',
        blanks: [['base'], ['order'], ['rules']],
        distractors: ['loan', 'secret'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line on a copy of v5 is wrong?',
        lines: [
          'Art class ₦15,000.',
          'Friday dinners ₦32,000.',
          'Gym ₦12,000 (2 visits).',
        ],
        bug: 2,
        fix: 'Gym cancelled; Saturday runs with Ngozi.',
        explanation: 'The gym was cut in Chapter 2.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Family: support ₦40,000 + family line ₦20,000. Total?',
        answers: ['60000', '60,000', '₦60,000', '₦60000'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order the five versions of Ada\'s line.',
        lines: ['v1: where the raise went', 'v2: the first ₦65,000', 'v3: the values map', 'v4: the hard choices', 'v5: on purpose'],
      },
      {
        kind: 'mcq',
        prompt: 'What makes v5 different from all the others?',
        options: [
          { text: 'It\'s a plan for life, with rules for raises and extra income, not just a fix for one goal' },
          { text: 'It has the most cuts', why: 'It\'s about direction, not cuts.' },
          { text: 'Nothing', why: 'It\'s built to last.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Write your own line v5: base, values with amounts, security and your rules.',
    starters: ['Base:...', 'Values:...', 'Rules:...'],
  },
  deepen: {
    title: 'Pin it',
    summary: 'Ada\'s line lives on her fridge and in her phone notes. Somewhere you see it every week is enough. A plan you can see is a plan you follow.',
  },
  notes: 'Line v5 (fictional): base 200,000 (food 70, transport 45, utilities/data 30, rent savings 55); family 60; growth 75; adventure 80; connection 32; giving 20; security 13 → 480,000.',
};

export default lesson;
