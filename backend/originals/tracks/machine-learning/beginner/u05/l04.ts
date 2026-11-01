import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';
import { BASE } from './code';

/** Chapter 5 · Lesson 4 — How wrong is a line? Errors, one week at a time. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'How wrong is a line?',
  summary: 'Yaba, last week of the year: the line said 32, the clinic got 29. Gumel, week 41: the line said 19.4, Gumel got 16. Every prediction has an error. Tey shows how to measure it, week by week.',
  minutes: 12,
  outcomes: [
    'Work out the error for one prediction',
    'Explain why errors can be positive or negative',
    'Add an error column for every week',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Every prediction misses by something. The miss is called the error. Want to work one out?', replies: ['Yes.'] },
        { tey: 'Yaba, week 52: open 50 hours, so the line says 0.7 x 50 - 3 = 32. Yaba really got 29. Error = actual minus predicted = 29 - 32 = -3.', replies: ['Why minus?'] },
        { tey: 'Negative means the line guessed too high. Positive means too low. Week 52 was a holiday week; the line knows nothing about holidays, so it over-guessed.', replies: ['And Gumel?'] },
        { tey: 'Gumel, week 41: 32 hours, line says 19.4, Gumel got 16. Error -3.4. Too high again: Gumel is quieter than its hours suggest.', replies: ['Can I do every week?'] },
        { tey: 'One line of pandas: actual minus prediction, for every row. Then you can look for patterns in the errors: which clinics, which weeks the line always misses.', replies: ['What do I do with them?'] },
        { tey: 'Next lesson: boil them down to one number that says "on average, the line is off by this much". That number is how you compare one line with another.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Errors on the test weeks',
      caption: 'Actual minus predicted, for every test week.',
      code: BASE + '\ntest = test.assign(pred=0.7 * test["open_hours"] - 3)\ntest = test.assign(error=test["bookings"] - test["pred"])\nprint(test[["clinic", "week", "bookings", "pred", "error"]].head(8))\n',
      challenge: 'Which test week has the biggest negative error? Try test.nsmallest(1, "error").',
    },
  ],
  apply: {
    scenario: 'How wrong is a line?',
    items: [
      {
        kind: 'writeCode',
        prompt: 'For Yaba in week 52 (50 hours, 29 bookings), print the error of the line: actual minus 0.7 x 50 - 3',
        starter: 'actual = 29\nhours = 50\n',
        solution: 'actual = 29\nhours = 50\nprint(actual - (0.7 * hours - 3))\n',
        hint: 'actual - (0.7 * hours - 3)',
        checks: [{ message: 'Print -3.0', outputEquals: '-3.0' }],
      },
      {
        kind: 'mcq',
        prompt: 'An error of -3 means...',
        options: [
          { text: 'The line guessed 3 too high' },
          { text: 'The line guessed 3 too low', why: 'Actual minus predicted is negative when the guess is too high.' },
          { text: 'Three patients missed', why: 'It\'s the size of the line\'s miss.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Add pred and error columns to test and print the error for the first test row, rounded to 1 place',
        starter: BASE + 'test = test.assign(pred=0.7 * test["open_hours"] - 3)\n',
        solution: BASE + 'test = test.assign(pred=0.7 * test["open_hours"] - 3)\ntest = test.assign(error=test["bookings"] - test["pred"])\nprint(round(test["error"].iloc[0], 1))\n',
        hint: 'error = bookings - pred',
        checks: [
          { message: 'Print 0.0 (Yaba, week 41: the line was spot on)', outputEquals: '0.0' },
          { message: 'test has an error column', expr: '"error" in test.columns' },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Guessed too high or too low?',
        groups: ['Too high (negative error)', 'Too low (positive error)'],
        items: [
          { text: 'Line 32, actual 29', group: 0 },
          { text: 'Line 25, actual 28', group: 1 },
          { text: 'Line 19.4, actual 16', group: 0 },
          { text: 'Line 30, actual 34', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'emmanuel',
        message: 'Why did the line over-guess Yaba in week 52?',
        prompt: 'Halima\'s best reply?',
        options: [
          { text: 'Yaba\'s data is wrong.', why: 'The data is fine. The line is missing a clue.' },
          { text: 'Lines always over-guess.', why: 'Some weeks it guesses too low.' },
          { text: 'Week 52 was a holiday week. The line only knows opening hours, so it can\'t know bookings dip on holidays.' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the week to its error.',
        pairs: [
          ['Yaba, week 52 (line 32, actual 29)', '-3'],
          ['Gumel, week 41 (line 19.4, actual 16)', '-3.4'],
          ['Line 25, actual 28', '+3'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The error.',
        template: 'error = [[1]] minus [[2]]',
        blanks: [['actual'], ['predicted']],
        distractors: ['average', 'slope'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line flips the error\'s sign?',
        language: 'python',
        lines: ['test = test.assign(pred=0.7 * test["open_hours"] - 3)', 'test = test.assign(error=test["pred"] - test["bookings"])', 'print(test["error"].head())'],
        bug: 1,
        fix: 'test = test.assign(error=test["bookings"] - test["pred"])',
        explanation: 'By convention, error is actual minus predicted, so negative means "guessed too high".',
      },
      {
        kind: 'typeAnswer',
        prompt: 'The line says 25 and the clinic got 28. What\'s the error?',
        answers: ['3', '+3', '3.0'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why look at errors for every week, not just one?',
        options: [
          { text: 'One error is enough', why: 'One week can be bad luck.' },
          { text: 'Patterns in the errors show what the line is missing, like holidays or quiet clinics' },
          { text: 'To make the line longer', why: 'It\'s to find what the line doesn\'t know.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'Think of a prediction you made recently that was off. Was it too high or too low, and what were you missing?',
    starters: ['I predicted...', 'I was missing...'],
  },
  deepen: {
    title: 'Residuals',
    summary: 'Statisticians call these errors "residuals": what\'s left over after the model. Looking at residuals by clinic, week or holiday is one of the best ways to find the next useful feature.',
  },
  notes: 'Hand line 0.7h - 3. Yaba week 52: 50 h, holiday, 29 bookings -> pred 32.0, error -3.0. Gumel week 41: 32 h, 16 bookings -> pred 19.4, error -3.4. First test row is Yaba week 41: 50 h, 32 bookings -> error 0.0. Biggest test misses: Lekki week 52 (holiday) 7 vs 20.8 (-13.8); Yaba week 50 35 vs 25.0 (+10.0).',
};

export default lesson;
