import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 7 · Lesson 13 — percentages without panic. */
const lesson: OriginalLesson = {
  key: 'l13',
  title: 'Percentages without panic',
  summary: '"Active shops went from 60% to 75%. That\'s a 15% increase!" Not quite. Tey clears up the three percentage mix-ups that trip everyone.',
  minutes: 12,
  outcomes: [
    'Tell percentage points from percent change',
    'Work out a percentage change correctly',
    'Know why "up 50%" and "50% more" can mislead',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Active shops went from 60% to 75%. How much did it go up?', replies: ['15%?', '25%?'] },
        { tey: 'Both, depending how you say it. It rose by 15 percentage points. As a percent change, it\'s 25%: 15 is a quarter of 60.', replies: ['How do I work out percent change?'] },
        { tey: '(new - old) / old x 100. From 400 to 600 payments: (600 - 400) / 400 x 100 = 50%.', replies: ['And what\'s the third mix-up?'] },
        { tey: 'Going down then up. Down 50% then up 50% doesn\'t get you back: 100 becomes 50, then 75. Ask AI to show the working, and check it with the formula.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Percentage points: the difference between two percentages. Percent change: (new - old) / old x 100. Always say which.',
    },
  ],
  apply: {
    scenario: 'Ada checks the percentages in her notes.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: 'Payments went from 400 to 600. Percent change? (number)',
        answers: ['50', '50%'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Active shops went from 60% to 75%. Which is correct?',
        options: [
          { text: 'Up 15%', why: 'It\'s 15 points, or 25% change.' },
          { text: 'Up 15 percentage points, a 25% increase' },
          { text: 'Up 75%', why: '75 is the new value.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Order the percent change formula.',
        lines: ['New minus old', 'Divide by old', 'Multiply by 100'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Percentage points, or percent change?',
        groups: ['Percentage points', 'Percent change'],
        items: [
          { text: 'Failure rate from 5% to 4%: down 1 ...', group: 0 },
          { text: 'Payments 400 to 600: up 50 ...', group: 1 },
          { text: 'Active rate 60% to 75%: up 15 ...', group: 0 },
          { text: 'Revenue 10,000 to 12,000: up 20 ...', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'The failure rate fell from 5% to 4%. Can I say "failures fell 1%"?',
        prompt: 'Best reply from Ada?',
        options: [
          { text: 'Yes, 1%.', why: 'Ambiguous; it\'s 1 point or 20%.' },
          { text: 'Say it fell 5%.', why: 'Neither number is 5%.' },
          { text: 'Say "fell by 1 percentage point", or "fell by a fifth". "1%" sounds much smaller than it is.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the formula.',
        template: '(new - [[1]]) / old x [[2]]',
        blanks: [['old'], ['100']],
        distractors: ['new', '10'],
      },
      {
        kind: 'typeAnswer',
        prompt: '100 goes down 50%, then up 50%. Where does it end up?',
        answers: ['75'],
        placeholder: 'A number',
      },
      {
        kind: 'findBug',
        prompt: 'Which line in Ada\'s notes is wrong?',
        lines: [
          'Payments: 400 to 600, up 50%',
          'Active shops: 60% to 75%, up 15 percentage points',
          'Active shops: 60% to 75%, a 15% increase',
          'Failure rate: 5% to 4%, down 1 percentage point',
        ],
        bug: 2,
        fix: 'Active shops: 60% to 75%, a 25% increase',
        explanation: '15 points is a 25% increase on 60.',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which request avoids percentage mix-ups?',
        options: [
          { text: 'What\'s the change?', why: 'Ambiguous.' },
          { text: 'Active shops went from 60% to 75%. Give the change in percentage points and as a percent change, and show the working.' },
          { text: 'Make the change sound big.', why: 'That\'s spin.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the change to its correct description.',
        pairs: [
          ['200 to 300', 'Up 50%'],
          ['50% to 60%', 'Up 10 points'],
          ['5% to 4%', 'Down 1 point (a fifth)'],
        ],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the precise sentence.',
        tiles: ['up', '15', 'percentage', 'points'],
        distractors: ['%'],
      },
      {
        kind: 'mcq',
        prompt: 'Why always say "points" or "percent change"?',
        options: [
          { text: 'The same change can sound very different, and readers can\'t guess which you mean' },
          { text: 'To sound clever', why: 'It\'s about clarity.' },
          { text: 'They mean the same thing', why: 'They don\'t.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Find a percentage change in a recent report. Was it points or percent? Was it clear?',
    starters: ['The change:', 'It was...'],
  },
  deepen: { title: 'Try it today', summary: 'Next time you report a change in a rate, give it in both percentage points and percent change.' },
  notes: 'Standard arithmetic. Figures fictional.',
};

export default lesson;
