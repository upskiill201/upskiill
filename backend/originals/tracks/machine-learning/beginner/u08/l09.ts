import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';
import { DATA, F4, F5, IMPORTS, MINUTES, PIPE, PIPE_IMPORTS, VAL_SPLIT } from './code';

const BASE = IMPORTS + DATA;
const VAL = IMPORTS + PIPE_IMPORTS + DATA + VAL_SPLIT + MINUTES;
const SCORE = 'model.fit(train[feats], train["no_show"])\nflags = (model.predict_proba(val[feats])[:, 1] >= 0.2).astype(int)\nprint(minutes(flags, val["no_show"]))\n';

/** Chapter 8 · Lesson 9 — The rain feature. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'The rain feature',
  summary: 'Halima\'s first hunch from her nursing days: when it rains, patients don\'t come. The rain column has been in the spreadsheet all along. A story about testing a hunch properly.',
  minutes: 12,
  outcomes: [
    'Turn a hunch into a feature and test it',
    'Check a feature is known before the appointment',
    'Add a feature only if it earns its place on validation',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Rainy Tuesdays',
      beats: [
        { speaker: 'halima', text: 'When I was on the wards, rainy days were empty days. Buses full, roads flooded, children kept home.' },
        { speaker: 'miracle', text: 'Then test it. First question: would we know about the rain before the appointment?' },
        { speaker: 'halima', text: 'The forecast comes the evening before, when Bisi makes her calls. The data has the day\'s real rain; we\'ll treat that as a good forecast, and say so.' },
        { speaker: 'narrator', text: 'Halima checks the rates. On rainy days, 21.5% of bookings missed. On dry days, 17.2%.' },
        { speaker: 'miracle', text: 'A real gap. Now the rule we wrote down: it joins only if it saves at least 20 minutes on validation, one empty chair\'s worth.' },
        { speaker: 'halima', text: 'Without rain: 1,265 minutes. With rain: 1,245. Exactly 20. It\'s in, just.' },
        { speaker: 'tey', text: 'A hunch, a reason it\'s known in advance, a rule agreed first and a validation test. That\'s how a feature earns its place.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Rain or dry',
      caption: 'The no-show rate both ways.',
      code: BASE + '\nprint(df.groupby("rain")["no_show"].mean().round(3))\nprint("Rainy-day bookings:", df["rain"].sum())\n',
      challenge: 'Is rain worse at Gumel, the rural clinic?',
    },
  ],
  apply: {
    scenario: 'The rain feature.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print the no-show rate on rainy days, rounded to 3 places',
        starter: BASE + 'rainy = df[df["rain"] == 1]\n',
        solution: BASE + 'rainy = df[df["rain"] == 1]\nprint(round(rainy["no_show"].mean(), 3))\n',
        hint: 'rainy["no_show"].mean()',
        checks: [{ message: 'Print 0.215', outputEquals: '0.215' }],
      },
      {
        kind: 'mcq',
        prompt: 'What must be true for rain to be a fair feature?',
        options: [
          { text: 'It rains often', why: 'Frequency isn\'t the test.' },
          { text: 'It\'s a number', why: 'It must be known in advance.' },
          { text: 'We\'d know it before the appointment, from the forecast' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'On validation, print minutes lost with the four original features (scaled)',
        starter: VAL + F4 + PIPE,
        solution: VAL + F4 + PIPE + SCORE,
        hint: 'Fit, flag at 0.2, minutes',
        checks: [{ message: 'Print 1265', outputEquals: '1265' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'Rain passes which test?',
        groups: ['Passes', 'Needs care'],
        items: [
          { text: 'A hunch written down first', group: 0 },
          { text: 'Saves 20 validation minutes', group: 0 },
          { text: 'Forecasts can be wrong', group: 1 },
          { text: 'Only just meets the rule', group: 1 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Now add rain: print validation minutes with the five features',
        starter: VAL + F5 + PIPE,
        solution: VAL + F5 + PIPE + SCORE,
        hint: 'Same code, five features',
        checks: [{ message: 'Print 1245', outputEquals: '1245' }],
      },
      {
        kind: 'chatReply',
        from: 'chidi',
        message: '20 minutes is nothing. Why bother?',
        prompt: 'Halima\'s best reply?',
        options: [
          { text: 'It\'s one empty chair saved across two weeks: small but real, and it\'s exactly the bar we agreed. Rain has a clear reason too.' },
          { text: 'You\'re right, drop it.', why: 'It met the agreed rule.' },
          { text: 'It\'s huge.', why: 'It\'s small; honesty matters.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the number to its meaning.',
        pairs: [
          ['0.215', 'No-show rate on rainy days'],
          ['0.172', 'No-show rate on dry days'],
          ['1,265', 'Validation minutes without rain'],
          ['1,245', 'Validation minutes with rain'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Halima\'s rule.',
        template: 'A feature joins if it saves at least [[1]] validation minutes and is known [[2]] the appointment.',
        blanks: [['20'], ['before']],
        distractors: ['5', 'after'],
      },
      {
        kind: 'findBug',
        prompt: 'Which claim goes too far?',
        lines: ['Rainy days miss more often.', 'Adding rain saved 20 validation minutes.', 'Rain causes a fifth of all no-shows.'],
        bug: 2,
        fix: 'Rain is linked to a few more no-shows.',
        explanation: 'The data shows a link, not how much rain causes.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many minutes does an empty chair cost in our measure?',
        answers: ['20', 'twenty'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'What hunch from your own work could become a feature? How would you check it\'s known in advance?',
    starters: ['My hunch...', 'I\'d check...'],
  },
  deepen: {
    title: 'Forecasts vs real weather',
    summary: 'In real use, the model would get the forecast, not the actual rain. Forecasts are sometimes wrong, so the real-world gain would be a bit smaller. Saying so is part of an honest report.',
  },
  notes: 'Rain: 599 rainy-day bookings; no-show 0.215 vs 0.172 dry. Validation (scaled LR, 0.2): four features 1265, five (+rain) 1245.',
};

export default lesson;
