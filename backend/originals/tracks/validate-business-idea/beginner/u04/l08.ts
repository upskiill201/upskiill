import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 8. Reading: reading results honestly. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Reading results honestly',
  summary: 'Sunday night. Clinton opens the pass mark he sent on Thursday and checks each line against what really happened, including the bits he\'d rather not mention.',
  minutes: 12,
  outcomes: [
    'Compare results to the pass mark line by line',
    'Report the bad parts with the good',
    'Know what a small test can and can\'t prove',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'Thursday\'s pass mark vs Sunday\'s results',
      html: '<table><tr><th>Pass mark (set Thursday)</th><th>Result</th><th></th></tr><tr><td>At least 10 paid bookings</td><td>12 paid</td><td>Pass</td></tr><tr><td>At least half from strangers</td><td>9 of 12 (3 were friends)</td><td>Pass</td></tr><tr><td>At least 80% of bags on time</td><td>11 of 12 (one late, rain)</td><td>Pass</td></tr></table><p>Three passes. Now the honest part:</p><ul><li><strong>Small numbers.</strong> Twelve customers is a strong signal, not a proven business. One good weekend could be luck: first-weekend curiosity, a heavy rain week.</li><li><strong>Report everything.</strong> The late bag, the near mix-up, the locked gates and the 500 FCFA Clinton keeps per bag all go in the report. Leaving them out would fool the only person who matters: him.</li><li><strong>Look for the next signal.</strong> Seven of the twelve asked "same next weekend?". Will they actually book again? That\'s the real test of whether WashDay solves the problem (Chapter 5).</li></ul><p>A test passing doesn\'t mean "go all in". It means "the riskiest card survived; test the next one".</p>',
    },
    {
      kind: 'callout',
      tone: 'warning',
      text: 'Don\'t change the pass mark after the fact, and don\'t leave out the bad news. Both only fool you.',
    },
  ],
  apply: {
    scenario: 'Sunday night report.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Pass or fail against the pass mark?',
        groups: ['Pass', 'Fail'],
        items: [
          { text: '12 paid bookings (needed 10)', group: 0 },
          { text: '9 of 12 from strangers (needed half)', group: 0 },
          { text: '11 of 12 on time (needed 80%)', group: 0 },
          { text: 'If only 7 had paid (needed 10)', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: '11 of 12 bags came back on time. What percentage is that, to the nearest whole number?',
        answers: ['92', '92%', '91.7', '91.67'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'What does passing this test prove?',
        options: [
          { text: 'WashDay will definitely succeed', why: 'Twelve customers on one weekend can\'t prove that.' },
          { text: 'Nothing at all', why: 'Real payments from strangers are strong evidence.' },
          { text: 'The riskiest card survived one test; it\'s a strong signal, not a proven business' },
        ],
        answer: 2,
      },
      {
        kind: 'chatReply',
        from: 'clinton',
        message: 'Should I leave the late bag and the mix-up out of the report? It looks bad.',
        prompt: "David's best reply?",
        options: [
          { text: 'Yes, keep it positive.', why: 'Hiding problems only fools him.' },
          { text: 'Put them in. The report is for you. If you hide problems, you\'ll repeat them at 50 bags.' },
          { text: 'Only mention the bad parts.', why: 'Report everything, good and bad.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the finding to what to do next.',
        pairs: [
          ['12 paid, pass', 'Run a second weekend'],
          ['7 asked about next week', 'See if they really rebook'],
          ['500 FCFA kept per bag', 'Look at pricing later'],
          ['One late bag', 'Warn customers about rain'],
        ],
      },
      {
        kind: 'mcq',
        prompt: '3 of the 12 were Clinton\'s friends. How many paid customers were strangers?',
        options: [
          { text: '9' },
          { text: '3', why: 'That\'s the friends.' },
          { text: '12', why: 'Take away the 3 friends.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'What a pass means.',
        template: 'The riskiest card [[1]]; test the [[2]] one.',
        blanks: [['survived'], ['next']],
        distractors: ['won', 'same'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line of the report is moving the goalposts?',
        lines: [
          'Pass mark: 10 paid. Result: 12. Pass.',
          'Strangers: 9 of 12. Pass.',
          'On time: 11 of 12. Pass.',
          'Also, 41 interested, so really we passed by 31.',
        ],
        bug: 3,
        fix: 'Delete it: the pass mark counted payments, not interest.',
        explanation: 'Swapping the measure after the test is moving the goalposts.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order an honest results review.',
        lines: ['Open the pass mark you set before', 'Check each line against the results', 'List the problems as well as the passes', 'Decide the next test'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many of the 12 customers asked "same next weekend?"',
        answers: ['7', 'seven'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Think of a result you were proud of. What would an honest report have included that you left out?',
    starters: ['I was proud of...', 'An honest report would add...'],
  },
  deepen: {
    title: 'Small numbers',
    summary: 'With twelve customers, one or two people can change a percentage a lot. Treat early results as direction, not certainty, and keep testing as numbers grow.',
  },
  notes: 'Fictional weekend 1 vs pass mark: 12 paid (≥10), 9 of 12 strangers (≥50%), 11 of 12 on time (≈92%, ≥80%). 7 of 12 asked about next weekend.',
};

export default lesson;
