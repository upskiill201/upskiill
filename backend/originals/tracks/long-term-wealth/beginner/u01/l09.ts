import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 9. Tap to explore: the 40-year map v1. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'The 40-year map v1: where I stand',
  summary: 'Miracle starts the document she\'ll update for the rest of her life: the 40-year map. Version 1 is just honest numbers and one picture of the future. Tap through it.',
  minutes: 11,
  outcomes: [
    'Read a first long-term money map',
    'See net worth, habits and a future picture together',
    'Start your own map',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Miracle\'s 40-year map v1',
      text: 'TODAY (age 25): Net worth ₦2,250,000. Savings ₦1,400,000 (basic account, almost no interest). Pension ₦1,100,000 (first time checked). Staff loan ₦250,000. HABITS: Saving 13% (₦120,000), by hand, when I remember. Pension: whatever payroll does. Long-term investing: none. FUTURE ME (age 60): A house in Buea near Papa\'s old school. Helping my nieces with school fees. Never worried about rent. DAD: 59, retiring next September. Small pension. Savings about 400,000 FCFA. Our plan: starts Sunday.',
      hotspots: [
        { phrase: 'Net worth ₦2,250,000', note: 'The starting point. Not a grade. What matters is the direction from here.' },
        { phrase: 'basic account, almost no interest', note: 'Fine for an emergency fund. For money she won\'t touch for 30 years, it probably won\'t keep up with inflation. Chapter 3.' },
        { phrase: 'Pension ₦1,100,000 (first time checked)', note: 'Three years of contributions she\'d never looked at. Chapter 2 starts here.' },
        { phrase: 'Saving 13% (₦120,000), by hand, when I remember', note: 'Good amount, fragile system. "When I remember" is Dad\'s "next year".' },
        { phrase: 'Long-term investing: none', note: 'Everything she owns sits in cash or the pension. Chapter 3 explains why time and growth matter.' },
        { phrase: 'A house in Buea near Papa\'s old school', note: 'Future-me made real. Specific, so it\'s easier to save for.' },
        { phrase: 'Our plan: starts Sunday', note: 'Miracle\'s map includes Dad. Chapter 5 builds his plan.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Start your map with three parts: today\'s numbers, today\'s habits, and a specific picture of future-you. Honest beats impressive.',
    },
  ],
  apply: {
    scenario: 'Reading the map.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each part of the map to its purpose.',
        pairs: [
          ['Today\'s numbers', 'Where she stands'],
          ['Habits', 'What she does every month'],
          ['Future me', 'What it\'s all for'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Strong habit, or fragile habit?',
        groups: ['Strong', 'Fragile'],
        items: [
          { text: 'Saving by hand "when I remember"', group: 1 },
          { text: 'Pension taken by payroll automatically', group: 0 },
          { text: 'No long-term investing at all', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why might a basic savings account be a problem for 30-year money?',
        options: [
          { text: 'It may not keep up with rising prices over decades' },
          { text: 'It\'s illegal', why: 'It\'s fine for emergency money.' },
          { text: 'It\'s too risky', why: 'It\'s low-risk; the issue is inflation.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'miracle',
        message: 'My map looks so... unimpressive.',
        prompt: 'Folake\'s best reply?',
        options: [
          { text: 'Honest beats impressive. Mine at 25 was worse. Update it every quarter and watch it change.' },
          { text: 'It is unimpressive.', why: 'Unhelpful and unkind.' },
          { text: 'Make the numbers up.', why: 'Then it\'s useless.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The three parts.',
        template: 'Today\'s [[1]], today\'s [[2]], and a picture of [[3]]-you.',
        blanks: [['numbers'], ['habits'], ['future']],
        distractors: ['debts', 'past'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Miracle is 25. How many years until 60?',
        answers: ['35', 'thirty-five'],
        placeholder: 'A number',
      },
      {
        kind: 'findBug',
        prompt: 'Which line on a copy of the map isn\'t honest?',
        lines: [
          'Net worth: ₦2,250,000.',
          'Saving: 13%, by hand.',
          'Long-term investing: a well-balanced plan.',
        ],
        bug: 2,
        fix: 'Long-term investing: none yet.',
        explanation: 'She has none yet. An honest map is a useful map.',
      },
      {
        kind: 'mcq',
        prompt: 'Why is "a house in Buea near Papa\'s old school" a good future-me picture?',
        options: [
          { text: 'It\'s specific, so it feels real and worth saving for' },
          { text: 'It\'s cheap', why: 'It\'s about being specific.' },
          { text: 'It isn\'t; it\'s too detailed', why: 'Details make it real.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Order how to start your map.',
        lines: ['Write today\'s net worth', 'Write today\'s habits honestly', 'Describe future-you specifically', 'Date it'],
      },
      {
        kind: 'mcq',
        prompt: 'Which fragile habit does Chapter 2 tackle first?',
        options: [
          { text: 'Saving by hand when she remembers' },
          { text: 'Her house picture', why: 'That\'s the goal, not a habit.' },
          { text: 'Her net worth', why: 'That\'s a number, not a habit.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Start your own 40-year map: today\'s numbers, habits, and future-you. What\'s your most fragile habit?',
    starters: ['Today:...', 'Habits:...', 'Future me:...', 'Most fragile:...'],
  },
  deepen: {
    title: 'A living document',
    summary: 'Miracle\'s map will change: a new job, a home, children perhaps, Dad\'s needs. That\'s the point. Updating it every quarter keeps decades of decisions connected to one picture.',
  },
  notes: 'Map v1 per running numbers in long-term-wealth.ts.',
};

export default lesson;
