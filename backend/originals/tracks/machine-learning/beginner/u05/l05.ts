import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';
import { BASE, LOAD } from './code';

/** Chapter 5 · Lesson 5 — Checkpoint 1: numbers, lines, slopes, errors. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: a line by hand',
  summary: 'Halima\'s pencil line is taped above her desk: bookings = 0.7 x hours - 3. Before she lets a computer draw one, check you can read a line, use it, and measure where it misses.',
  minutes: 13,
  milestone: 'CHECKPOINT',
  outcomes: ['Use a line to predict a number', 'Work out errors and read slope and intercept'],
  learn: [
    {
      kind: 'story',
      title: 'Taped above the desk',
      beats: [
        { speaker: 'bisi', text: 'Is that the forecast? 0.7 times hours minus 3?' },
        { speaker: 'halima', text: 'A first draft. It\'s off by a few bookings most weeks. Next I\'ll measure exactly how much.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1: a line by hand.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print how many training weeks (1 to 40) there are in clinic_weeks.csv',
        starter: LOAD,
        solution: BASE + 'print(len(train))\n',
        hint: 'train = cw[cw["week"] <= 40], then len(train)',
        checks: [{ message: 'Print 320', outputEquals: '320' }],
      },
      {
        kind: 'mcq',
        prompt: '"How many bookings will Ikeja get next week?" is...',
        options: [
          { text: 'Regression: the answer is a number' },
          { text: 'Classification', why: 'That\'s for yes/no or categories.' },
          { text: 'Not machine learning', why: 'Predicting a number from examples is exactly ML.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Using bookings = 0.7 x hours - 3, predict a 30-hour week.',
        answers: ['18', '18.0'],
        placeholder: 'A number',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the term to its meaning.',
        pairs: [
          ['Slope', 'Change per extra hour'],
          ['Intercept', 'Where the line starts'],
          ['Error', 'Actual minus predicted'],
          ['Baseline', 'The simple guess to beat'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Add an error column to test (bookings minus 0.7 x open_hours - 3) and print the smallest error, rounded to 1 place',
        starter: BASE + 'test = test.assign(pred=0.7 * test["open_hours"] - 3)\n',
        solution: BASE + 'test = test.assign(pred=0.7 * test["open_hours"] - 3)\ntest = test.assign(error=test["bookings"] - test["pred"])\nprint(round(test["error"].min(), 1))\n',
        hint: 'test["error"].min()',
        checks: [{ message: 'Print -13.8', outputEquals: '-13.8' }],
      },
      {
        kind: 'chatReply',
        from: 'chidi',
        message: 'Lekki in week 52: the line said 20.8, they got 7. Your line is rubbish.',
        prompt: 'Halima\'s best reply?',
        options: [
          { text: 'You\'re right, delete it.', why: 'A miss with a reason is useful information.' },
          { text: 'Week 52 was a holiday and the line only knows hours. That miss tells us which clue to add next.' },
          { text: 'Lekki made a mistake.', why: 'Lekki was fine. The line was missing a clue.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Negative or positive error?',
        groups: ['Negative (guessed too high)', 'Positive (guessed too low)'],
        items: [
          { text: 'Lekki, week 52: line 20.8, actual 7', group: 0 },
          { text: 'Yaba, week 50: line 25, actual 35', group: 1 },
          { text: 'Line 32, actual 29', group: 0 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'A line.',
        language: 'python',
        template: 'pred = [[1]] * hours + [[2]]',
        blanks: [['slope'], ['intercept']],
        distractors: ['error', 'week'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line uses the test weeks to draw the line?',
        language: 'python',
        lines: ['train = cw[cw["week"] <= 40]', 'avg = cw.groupby("open_hours")["bookings"].mean()', 'print(avg[50])'],
        bug: 1,
        fix: 'avg = train.groupby("open_hours")["bookings"].mean()',
        explanation: 'cw includes weeks 41 to 52, the test weeks. Draw the line from train only.',
      },
      {
        kind: 'mcq',
        prompt: 'Review, Chapter 4: why learn from weeks 1 to 40 and test on 41 to 52?',
        options: [
          { text: 'Weeks 41 to 52 are messy', why: 'They\'re fine. They play the part of the future.' },
          { text: 'To have more test rows', why: 'It\'s about time order, not size.' },
          { text: 'The forecast is always about the future, so the test should be later weeks it never saw' },
        ],
        answer: 2,
      },
      {
        kind: 'orderLines',
        prompt: 'Order Halima\'s steps so far.',
        lines: ['Load last year\'s weeks', 'Split into training and test weeks', 'Draw a line from the training weeks', 'Work out the errors on test weeks'],
      },
    ],
  },
  reflect: {
    prompt: 'Explain slope, intercept and error to someone using a line from your own life.',
    starters: ['My line is...', 'The slope means...'],
  },
  notes: 'Checkpoint for Chapter 5 lessons 1-4. 320 training rows (weeks 1-40), 96 test rows. 0.7 x 30 - 3 = 18. Smallest test error of the hand line: Lekki week 52, 7 vs 20.8 = -13.8.',
};

export default lesson;
