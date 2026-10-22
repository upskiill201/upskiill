import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';
import { BASE } from './code';

/** Chapter 5 · Lesson 6 — Mean absolute error. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Mean absolute error',
  summary: '96 test weeks, 96 errors, some positive, some negative. Folake wants one number: "how far off is it, usually?" That number has a name, and it\'s the most honest way to report a forecast.',
  minutes: 12,
  outcomes: [
    'Work out mean absolute error (MAE)',
    'Explain why errors must be made positive before averaging',
    'Compare a line with the baseline using MAE',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'One number for "how far off"',
      html: '<p>Every test week has an error: actual minus predicted. To sum them up, you can\'t just average them. A miss of +5 and a miss of -5 would average to 0, as if the line were perfect.</p><p>So first make every error positive (its <strong>absolute</strong> value: -3 becomes 3), then take the average. That\'s the <strong>mean absolute error</strong>, or <strong>MAE</strong>.</p><p>For Halima\'s line on the 96 test weeks (41 to 52): <strong>MAE = 3.8</strong>. In plain English: <em>the line is usually off by about 4 bookings a week</em>.</p><p>Now the baseline from lesson 1: predict the training average (27.8) for every week. Its MAE on the same test weeks is <strong>5.3</strong>.</p><p>So the line beats the baseline: 3.8 vs 5.3. That\'s the first honest proof that opening hours help.</p><p>Why MAE? It\'s in the same units as the thing you predict (bookings), so anyone can understand it. There are other ways to measure error, and you\'ll meet one later, but MAE is the clearest to explain to a board.</p>',
    },
    {
      kind: 'check',
      question: 'Errors are +4, -4 and +1. What\'s the MAE?',
      options: ['0.33', '3', '9'],
      answer: 1,
      explanation: 'Make them positive: 4, 4, 1. Their average is 9 / 3 = 3.',
    },
    {
      kind: 'tryIt',
      title: 'Line vs baseline',
      caption: 'The same test weeks, two predictions.',
      code: BASE + '\nline = 0.7 * test["open_hours"] - 3\nprint("Line MAE:", round((test["bookings"] - line).abs().mean(), 2))\n\naverage = train["bookings"].mean()\nprint("Baseline MAE:", round((test["bookings"] - average).abs().mean(), 2))\n',
      challenge: 'Remove .abs() from the line MAE. Why does the number get so small?',
    },
  ],
  apply: {
    scenario: 'Mean absolute error.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print the MAE of Halima\'s line (0.7 x open_hours - 3) on the test weeks, rounded to 2 places',
        starter: BASE + 'line = 0.7 * test["open_hours"] - 3\n',
        solution: BASE + 'line = 0.7 * test["open_hours"] - 3\nprint(round((test["bookings"] - line).abs().mean(), 2))\n',
        hint: '(test["bookings"] - line).abs().mean()',
        checks: [{ message: 'Print 3.8', outputEquals: '3.8' }],
      },
      {
        kind: 'mcq',
        prompt: 'Why make the errors positive before averaging?',
        options: [
          { text: 'Negative numbers aren\'t allowed', why: 'They\'re allowed. They just cancel out in an average.' },
          { text: 'To make the number bigger', why: 'To make it honest.' },
          { text: 'Otherwise misses too high and too low cancel out and the line looks better than it is' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Print the baseline\'s MAE: predict the training average for every test week. Round to 2 places',
        starter: BASE + 'average = train["bookings"].mean()\n',
        solution: BASE + 'average = train["bookings"].mean()\nprint(round((test["bookings"] - average).abs().mean(), 2))\n',
        hint: '(test["bookings"] - average).abs().mean()',
        checks: [{ message: 'Print 5.3', outputEquals: '5.3' }],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the prediction to its test MAE.',
        pairs: [
          ['Training average for every week', '5.3'],
          ['Halima\'s line', '3.8'],
          ['A perfect forecast', '0'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Better or worse than the baseline (MAE 5.3)?',
        groups: ['Better', 'Worse'],
        items: [
          { text: 'MAE 3.8', group: 0 },
          { text: 'MAE 6.1', group: 1 },
          { text: 'MAE 2.8', group: 0 },
          { text: 'MAE 7.0', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'folake',
        message: 'What does "MAE 3.8" mean, in English?',
        prompt: 'Halima\'s best reply?',
        options: [
          { text: 'The forecast is usually off by about 4 bookings a week. Guessing the average is off by about 5.' },
          { text: 'It\'s 3.8% wrong.', why: 'MAE is in bookings, not percent.' },
          { text: 'It\'s right 3.8 times.', why: 'It\'s an average miss, in bookings.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'MAE.',
        language: 'python',
        template: 'mae = (test["bookings"] - pred).[[1]]().[[2]]()',
        blanks: [['abs'], ['mean']],
        distractors: ['sum', 'round'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line makes the MAE look far too good?',
        language: 'python',
        lines: ['pred = 0.7 * test["open_hours"] - 3', 'errors = test["bookings"] - pred', 'mae = errors.mean()'],
        bug: 2,
        fix: 'mae = errors.abs().mean()',
        explanation: 'Without abs(), positive and negative errors cancel out.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Errors are -2, +6 and -4. What\'s the MAE?',
        answers: ['4', '4.0'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why is MAE easy to explain?',
        options: [
          { text: 'It\'s always small', why: 'It\'s easy because of its units.' },
          { text: 'It\'s a percentage', why: 'It\'s in bookings.' },
          { text: 'It\'s in the same units as the prediction: bookings' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Your bus app says "arrives in 10 minutes". What MAE would you want it to have before you trust it?',
    starters: ['I\'d want it to be off by...', 'Because...'],
  },
  deepen: {
    title: 'Squared errors',
    summary: 'Another common measure squares each error before averaging (mean squared error), which punishes big misses more. It\'s what LinearRegression minimises behind the scenes. MAE is easier to explain; both are useful.',
  },
  notes: 'Test weeks 41-52 (96 rows). Hand line 0.7h - 3: MAE 3.8 (3.82 on training weeks); mean error +1.1. Baseline (train mean 27.76): MAE 5.3.',
};

export default lesson;
