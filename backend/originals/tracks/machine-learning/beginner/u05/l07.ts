import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';
import { BASE } from './code';

/** Chapter 5 · Lesson 7 — Finding the best line: try slopes, keep the smallest error. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'Finding the best line',
  summary: 'Halima chose 0.7 by eye. Could 0.6 or 0.8 be better? She tries five slopes on the training weeks and keeps whichever misses least. That search, done smarter, is what "training" a line means.',
  minutes: 12,
  outcomes: [
    'Compare several lines by their error',
    'Explain "training" as searching for the line with the smallest error',
    'Choose the best line using training weeks only',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Halima\'s slope search',
      text: 'Five lines, all passing through the middle of the data (27.8 bookings at 43.6 hours). Training MAE: slope 0.5 misses by 4.11. Slope 0.6: 3.91. Slope 0.7: 3.82. Slope 0.8: 3.83. Slope 0.9: 3.98. Too flat or too steep, and the error grows. The best is somewhere between 0.7 and 0.8.',
      hotspots: [
        { phrase: 'all passing through the middle of the data', note: 'A simple trick: fix the line through the average point, then only the slope needs choosing.' },
        { phrase: 'Training MAE', note: 'Chosen on training weeks only. The test weeks stay locked, as in Chapter 4.' },
        { phrase: 'slope 0.5 misses by 4.11', note: 'Too flat: long weeks get under-predicted.' },
        { phrase: 'Slope 0.9: 3.98', note: 'Too steep: long weeks get over-predicted.' },
        { phrase: 'between 0.7 and 0.8', note: 'Halima\'s eye was close. A computer can search finely and find the exact best: that\'s next lesson.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Training a line means searching for the slope and intercept with the smallest error on the training data. Libraries do the search with maths instead of trying values one by one.',
    },
    {
      kind: 'tryIt',
      title: 'Try five slopes',
      caption: 'Each line goes through the average point.',
      code: BASE + '\nmh = train["open_hours"].mean()\nmb = train["bookings"].mean()\nfor slope in [0.5, 0.6, 0.7, 0.8, 0.9]:\n    pred = slope * train["open_hours"] + (mb - slope * mh)\n    print(slope, round((train["bookings"] - pred).abs().mean(), 3))\n',
      challenge: 'Add 0.72 and 0.75 to the list. Which is best?',
    },
  ],
  apply: {
    scenario: 'The best line.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print the training MAE for slope 0.5 (line through the average point), rounded to 3 places',
        starter: BASE + 'mh = train["open_hours"].mean()\nmb = train["bookings"].mean()\nslope = 0.5\n',
        solution: BASE + 'mh = train["open_hours"].mean()\nmb = train["bookings"].mean()\nslope = 0.5\npred = slope * train["open_hours"] + (mb - slope * mh)\nprint(round((train["bookings"] - pred).abs().mean(), 3))\n',
        hint: 'pred = slope * train["open_hours"] + (mb - slope * mh)',
        checks: [{ message: 'Print 4.113', outputEquals: '4.113' }],
      },
      {
        kind: 'mcq',
        prompt: 'What does "training" a line mean?',
        options: [
          { text: 'Drawing it by eye', why: 'That\'s a guess. Training searches for the best.' },
          { text: 'Searching for the slope and intercept with the smallest error on training data' },
          { text: 'Testing it on week 52', why: 'That\'s testing, done once, at the end.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the slope to its training MAE.',
        pairs: [
          ['0.5', '4.11'],
          ['0.7', '3.82'],
          ['0.9', '3.98'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Loop over slopes 0.6, 0.7 and 0.8 and print each slope with its training MAE, rounded to 3 places',
        starter: BASE + 'mh = train["open_hours"].mean()\nmb = train["bookings"].mean()\nfor slope in [0.6, 0.7, 0.8]:\n',
        solution: BASE + 'mh = train["open_hours"].mean()\nmb = train["bookings"].mean()\nfor slope in [0.6, 0.7, 0.8]:\n    pred = slope * train["open_hours"] + (mb - slope * mh)\n    print(slope, round((train["bookings"] - pred).abs().mean(), 3))\n',
        hint: 'Inside the loop: pred = ..., then print(slope, round(..., 3))',
        checks: [{ message: 'Print 0.6 3.914, 0.7 3.816, 0.8 3.825', outputEquals: '0.6 3.914\n0.7 3.816\n0.8 3.825' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'Too flat or too steep?',
        groups: ['Too flat', 'Too steep'],
        items: [
          { text: 'Slope 0.5: long weeks under-predicted', group: 0 },
          { text: 'Slope 0.9: long weeks over-predicted', group: 1 },
          { text: 'Slope 0.3', group: 0 },
          { text: 'Slope 1.2', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'chidi',
        message: 'Why not test each slope on weeks 41 to 52 and pick the best there?',
        prompt: 'Halima\'s best reply?',
        options: [
          { text: 'That\'s Chapter 4\'s peeking. Choose on the training weeks; the test weeks get opened once, at the end.' },
          { text: 'Good idea.', why: 'Choosing on the test weeks makes the final score too hopeful.' },
          { text: 'The test weeks don\'t have bookings.', why: 'They do. That\'s exactly why they\'re kept for the end.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Training.',
        template: 'Training searches for the line with the [[1]] error on the [[2]] data.',
        blanks: [['smallest'], ['training']],
        distractors: ['biggest', 'test'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line chooses the slope on the wrong weeks?',
        language: 'python',
        lines: ['for slope in [0.5, 0.6, 0.7, 0.8, 0.9]:', '    pred = slope * test["open_hours"] + (mb - slope * mh)', '    print(slope, (test["bookings"] - pred).abs().mean())'],
        bug: 1,
        fix: '    pred = slope * train["open_hours"] + (mb - slope * mh)',
        explanation: 'Choosing on test weeks is peeking. Search on train.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Of 0.5, 0.6, 0.7, 0.8 and 0.9, which slope had the smallest training MAE?',
        answers: ['0.7'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Trying slopes one by one works for one feature. Why do libraries use maths instead?',
        options: [
          { text: 'Maths is more fun', why: 'It\'s about speed and exactness.' },
          { text: 'With many features there are far too many combinations to try one by one' },
          { text: 'Trying values is cheating', why: 'It\'s fine, just slow with many features.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'Training is "try, measure the error, adjust". Where do you do the same thing in daily life?',
    starters: ['When I...', 'I adjust by...'],
  },
  deepen: {
    title: 'Least squares',
    summary: 'LinearRegression finds the line with the smallest squared error in one calculation, a method called least squares, dating back to Legendre and Gauss around 1800. It doesn\'t try slopes one by one.',
  },
  notes: 'Train weeks 1-40: mean open_hours 43.6, mean bookings 27.76. Lines through the mean point, training MAE: 0.5 4.113, 0.6 3.914, 0.7 3.816, 0.8 3.825, 0.9 3.977. Least squares (sklearn) slope 0.724.',
};

export default lesson;
