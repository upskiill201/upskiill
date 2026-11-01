import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';
import { BASE } from './code';

/** Chapter 5 · Lesson 2 — A line through the points: opening hours vs bookings. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'A line through the points',
  summary: 'Halima notices that clinics open longer get more bookings. Not exactly, but roughly. Roughly is enough to draw a line, and a line is a model: give it the hours, it gives you a number.',
  minutes: 12,
  outcomes: [
    'See a rough straight-line pattern in data',
    'Use a line as a model to predict a number',
    'Check a line against real averages',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'From a pattern to a line',
      steps: [
        { title: '1. One question', body: 'Do clinics open longer get more bookings? Look at the training weeks (1 to 40).', code: 'train = cw[cw["week"] <= 40]\ntest = cw[cw["week"] > 40]', language: 'python' },
        { title: '2. Average by hours', body: 'Weeks open 32 hours averaged 17 bookings. 40 hours: about 27. 50 hours: 32. 55 hours: about 37. Rising, but not perfectly.', code: 'train.groupby("open_hours")["bookings"].mean()', language: 'python' },
        { title: '3. Draw a line by eye', body: 'Halima pencils one in: every extra hour adds about 0.7 bookings, and the line is 3 below zero at 0 hours. bookings = 0.7 x hours - 3.' },
        { title: '4. Use it', body: '50 hours: 0.7 x 50 - 3 = 32. 40 hours: 0.7 x 40 - 3 = 25.', code: 'def line(hours):\n    return 0.7 * hours - 3', language: 'python' },
        { title: '5. Compare', body: 'At 50 hours the real training average is 32.3; the line says 32. Close. At 40 hours: 26.7 real, 25 from the line. A bit low.' },
        { title: '6. That\'s a model', body: 'A line takes an input (hours) and gives a prediction (bookings). It will never be exactly right, but it captures the pattern. Next: how to measure "not exactly right".' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Halima\'s line',
      caption: 'The line next to the real averages.',
      code: BASE + '\ndef line(hours):\n    return 0.7 * hours - 3\n\navg = train.groupby("open_hours")["bookings"].mean()\nfor hours in [32, 40, 50, 55]:\n    print(hours, "hours: real", round(avg[hours], 1), " line", round(line(hours), 1))\n',
      challenge: 'Try a slope of 0.8 and a start of -6. Better or worse?',
    },
  ],
  apply: {
    scenario: 'A line through the points.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print the average bookings in training weeks when the clinic opened 50 hours, rounded to 1 place',
        starter: BASE,
        solution: BASE + 'print(round(train[train["open_hours"] == 50]["bookings"].mean(), 1))\n',
        hint: 'train[train["open_hours"] == 50]["bookings"].mean()',
        checks: [{ message: 'Print 32.3', outputEquals: '32.3' }],
      },
      {
        kind: 'mcq',
        prompt: 'What makes a line a model?',
        options: [
          { text: 'It\'s drawn on a chart', why: 'Any rule that turns inputs into a prediction is a model.' },
          { text: 'It\'s always right', why: 'No model is. It captures the pattern.' },
          { text: 'It takes an input (hours) and gives a prediction (bookings)' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Write line(hours) = 0.7 x hours - 3 and print its prediction for 40 hours, rounded to 1 place',
        starter: 'def line(hours):\n',
        solution: 'def line(hours):\n    return 0.7 * hours - 3\nprint(round(line(40), 1))\n',
        hint: 'return 0.7 * hours - 3',
        checks: [{ message: 'Print 25.0', outputEquals: '25.0' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'Does the pattern go up or down?',
        groups: ['More of it, more bookings', 'More of it, fewer bookings'],
        items: [
          { text: 'Opening hours', group: 0 },
          { text: 'Holiday weeks', group: 1 },
          { text: 'Rainy days', group: 1 },
          { text: 'Nurses (at first)', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'chidi',
        message: 'Your line is wrong at 40 hours: it says 25, the real average is 26.7.',
        prompt: 'Halima\'s best reply?',
        options: [
          { text: 'Then lines are useless.', why: 'A slightly-off line is still far better than one number for everything.' },
          { text: 'Every line will be off somewhere. The question is how far off on average, and whether another line does better. Let\'s measure it.' },
          { text: 'I\'ll move it to fit 40 exactly.', why: 'Then it might fit worse elsewhere.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the opening hours to the real training average.',
        pairs: [
          ['32 hours', '17.0 bookings'],
          ['40 hours', '26.7 bookings'],
          ['50 hours', '32.3 bookings'],
          ['55 hours', '36.6 bookings'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Halima\'s line.',
        language: 'python',
        template: 'def line(hours):\n    return [[1]] * hours [[2]] 3',
        blanks: [['0.7'], ['-']],
        distractors: ['7', '+'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line of this function is wrong?',
        language: 'python',
        lines: ['def line(hours):', '    prediction = 0.7 * hours - 3', '    print(prediction)'],
        bug: 2,
        fix: '    return prediction',
        explanation: 'print shows the number but doesn\'t give it back. Use return so the prediction can be used.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Using bookings = 0.7 x hours - 3, what does the line predict for 60 hours?',
        answers: ['39', '39.0'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Which weeks did Halima use to draw the line?',
        options: [
          { text: 'The training weeks, 1 to 40' },
          { text: 'All 52 weeks', why: 'Weeks 41 to 52 are kept for testing.' },
          { text: 'Only week 52', why: 'One week can\'t show a pattern.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Think of two things in your life that rise together roughly, like distance and travel time. Could a line predict one from the other?',
    starters: ['The two things are...', 'A line would...'],
  },
  deepen: {
    title: 'Scatter plots',
    summary: 'The usual way to spot a line is a scatter plot: one dot per week, hours across, bookings up. If the dots drift upward like a cloud along a slope, a line is a fair first model.',
  },
  notes: 'clinic_weeks.csv, train weeks 1-40 (320 rows). Mean bookings by open_hours: 32 -> 17.0, 40 -> 26.7, 50 -> 32.3, 55 -> 36.6. Hand line 0.7h - 3: 50 -> 32.0, 40 -> 25.0, 60 -> 39.0.',
};

export default lesson;
