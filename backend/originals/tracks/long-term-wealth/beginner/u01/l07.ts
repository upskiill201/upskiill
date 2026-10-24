import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 7. Chat with Tey: Folake's story. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'Folake\'s boring secret',
  summary: 'Folake, Afiya\'s COO, the fastest, most demanding person Miracle knows, turns out to have the most boring money habits imaginable. Tey tells her story, and why boring works.',
  minutes: 11,
  outcomes: [
    'See how ordinary habits build wealth over decades',
    'Understand why "boring" beats exciting',
    'Pick one boring habit to start',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Miracle asks Folake over lunch: "How did you build your money?" Folake laughs. "You\'ll be disappointed. It\'s boring."', replies: ['What did she do?'] },
        { tey: 'At 23, on her first salary, she decided: 20% goes away the day pay arrives. Every month. She never saw it. When she got raises, half of each raise went to the 20% too.', replies: ['Where did it go?'] },
        { tey: 'First, an emergency fund of six months. Then her workplace pension, plus extra. Then long-term investments she understood, spread across many things, left alone for years. She didn\'t chase tips.', replies: ['Did she ever lose money?'] },
        { tey: 'Of course. Some years her investments fell. She\'s been through two crashes. She didn\'t sell in a panic, and kept adding. That\'s the hardest part, and the part that mattered most.', replies: ['So what\'s the secret?'] },
        { tey: 'There isn\'t one. Spend less than you earn, automatically. Avoid expensive debt. Invest steadily for the long term. Don\'t panic. Do it for twenty years. Folake: "The secret is that there\'s no secret. Just time."', replies: ['That really is boring.'] },
        { tey: 'Exactly. Exciting money stories usually involve big risks. Boring ones involve patience. Folake drives a ten-year-old car and has never once worried about rent.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'The boring secret: save automatically, avoid expensive debt, invest steadily for the long term, don\'t panic, and give it decades.',
    },
  ],
  apply: {
    scenario: 'Folake\'s habits.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order where Folake\'s 20% went first to last.',
        lines: ['Emergency fund of six months', 'Workplace pension plus extra', 'Long-term investments, spread out'],
      },
      {
        kind: 'mcq',
        prompt: 'What did Folake do with each raise?',
        options: [
          { text: 'Spent all of it', why: 'That\'s lifestyle creep.' },
          { text: 'Nothing changed', why: 'She grew her saving with every raise.' },
          { text: 'Half of the raise went to her saving too' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Folake\'s habit, or not?',
        groups: ['Folake\'s habit', 'Not her habit'],
        items: [
          { text: '20% saved the day pay arrives', group: 0 },
          { text: 'Chasing hot tips', group: 1 },
          { text: 'Not selling in a panic', group: 0 },
          { text: 'Buying a new car every two years', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'miracle',
        message: 'Did your investments ever fall?',
        prompt: 'What would Folake say?',
        options: [
          { text: 'Never. I\'m a genius.', why: 'Everyone\'s investments fall sometimes.' },
          { text: 'Many times. I didn\'t sell in a panic and kept adding. That\'s the hardest part, and the part that mattered most.' },
          { text: 'Yes, so I stopped investing.', why: 'That\'s what she didn\'t do.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Folake\'s line.',
        template: '"The secret is that there\'s no [[1]]. Just [[2]]."',
        blanks: [['secret'], ['time']],
        distractors: ['luck', 'money'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'If Miracle saved 20% of ₦900,000, how much a month?',
        answers: ['180000', '180,000', '₦180,000', '₦180000'],
        placeholder: 'A number',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each boring habit to what it protects against.',
        pairs: [
          ['Saving automatically', 'Forgetting or spending it'],
          ['Six-month emergency fund', 'Selling investments in a crisis'],
          ['Spreading investments', 'One bad bet ruining everything'],
          ['Not panicking', 'Locking in losses'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which habit is the opposite of Folake\'s?',
        lines: [
          'Save 20% the day pay arrives.',
          'Spread investments across many things.',
          'Move everything into whatever went up most last month.',
        ],
        bug: 2,
        fix: 'Keep a steady plan; don\'t chase last month\'s winners.',
        explanation: 'Chasing recent winners is exciting, and often how people buy high and sell low.',
      },
      {
        kind: 'mcq',
        prompt: 'Why does boring often beat exciting with money?',
        options: [
          { text: 'Exciting stories usually involve big risks; boring ones involve patience that compounds' },
          { text: 'Boring is always safe', why: 'Nothing is risk-free, but steady habits are reliable.' },
          { text: 'It doesn\'t', why: 'Folake\'s 22 years say it does.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'Folake drives a ten-year-old car. What does that show?',
        options: [
          { text: 'She can\'t afford a new one', why: 'She chooses not to.' },
          { text: 'She spends on what matters to her, not on looking wealthy' },
          { text: 'Cars don\'t matter to anyone', why: 'They don\'t matter much to her.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'Which one of Folake\'s boring habits could you start this month?',
    starters: ['I could start...', 'This month I\'ll...'],
  },
  deepen: {
    title: 'The Psychology of Money',
    summary: 'Morgan Housel\'s The Psychology of Money (2020) argues that how you behave with money matters more than how clever you are. Time, patience and avoiding big mistakes do most of the work.',
  },
  notes: 'Folake backstory (fictional, new detail). General principles; no products (playbook §9). Housel (2020).',
};

export default lesson;
