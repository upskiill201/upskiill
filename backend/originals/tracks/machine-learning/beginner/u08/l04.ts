import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';
import { DATA, F4, IMPORTS, PIPE, PIPE_IMPORTS, SPLIT } from './code';

const BASE = IMPORTS + PIPE_IMPORTS + DATA + F4 + SPLIT;

/** Chapter 8 · Lesson 4 — Scaling numbers. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Scaling numbers',
  summary: 'Waits run from 0 to 45 days, reminders from 0 to 1. Scaling puts every number on the same footing, so the model\'s weights can be compared fairly. Three cards and StandardScaler.',
  minutes: 11,
  outcomes: [
    'Explain why features on different scales cause trouble',
    'Scale features with StandardScaler',
    'Compare coefficients before and after scaling',
  ],
  learn: [
    {
      kind: 'text',
      html: '<p><strong>Card 1: different rulers.</strong> wait_days runs 0 to 45, distance_km 1 to 60, sms_reminder only 0 or 1. In Chapter 6, sms_reminder\'s coefficient looked biggest (−0.985). But one unit of sms is a whole yes/no, while one unit of wait is a single day. The numbers weren\'t comparable.</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>Card 2: StandardScaler.</strong> It subtracts each feature\'s average and divides by its spread (standard deviation). Average wait in training is 7.42 days, spread 7.67. A 1-day wait becomes about −0.84: "a bit shorter than usual". After scaling, every feature is measured in "spreads from average".</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>Card 3: fairer weights.</strong> After scaling, the coefficients are wait 0.38, distance 0.35, previous misses 0.61, reminder −0.49. Past misses is the strongest clue, and the reminder is strong but not the giant it looked. For k-nearest neighbours (Chapter 3), scaling isn\'t just fairer: without it, distance would swamp everything.</p>',
    },
    {
      kind: 'check',
      question: 'After StandardScaler, what does 0 mean for a feature?',
      options: ['Exactly average', 'Zero days', 'Missing'],
      answer: 0,
      explanation: 'The scaler subtracts the average, so average becomes 0.',
    },
    {
      kind: 'tryIt',
      title: 'Before and after',
      caption: 'The same model, raw and scaled.',
      code: BASE + '\nraw_model = LogisticRegression().fit(train[feats], train["no_show"])\n' + PIPE + 'model.fit(train[feats], train["no_show"])\nprint("Raw:   ", raw_model.coef_[0].round(3))\nprint("Scaled:", model[-1].coef_[0].round(3))\n',
      challenge: 'Which feature moved most after scaling?',
    },
  ],
  apply: {
    scenario: 'Scaling numbers.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Fit a StandardScaler on the training weeks and print the average it learned for wait_days, rounded to 2 places',
        starter: BASE + 'scaler = StandardScaler().fit(train[feats])\n',
        solution: BASE + 'scaler = StandardScaler().fit(train[feats])\nprint(round(scaler.mean_[0], 2))\n',
        hint: 'scaler.mean_[0]',
        checks: [{ message: 'Print 7.42', outputEquals: '7.42' }],
      },
      {
        kind: 'mcq',
        prompt: 'Why compare coefficients only after scaling?',
        options: [
          { text: 'Scaling makes the model more accurate', why: 'For logistic regression it mostly makes weights comparable.' },
          { text: 'Coefficients can\'t be read before scaling', why: 'They can, just not compared.' },
          { text: 'Before scaling, each coefficient is "per unit", and the units are very different' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Train the scaled pipeline and print the coefficient for previous_no_shows, rounded to 2 places',
        starter: BASE + PIPE + 'model.fit(train[feats], train["no_show"])\n',
        solution: BASE + PIPE + 'model.fit(train[feats], train["no_show"])\nprint(round(model[-1].coef_[0][2], 2))\n',
        hint: 'model[-1] is the logistic regression; coef_[0][2] is the third feature',
        checks: [{ message: 'Print 0.61', outputEquals: '0.61' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'Scaled wait_days: above or below average?',
        groups: ['Positive (longer than usual)', 'Negative (shorter than usual)'],
        items: [
          { text: '20-day wait', group: 0 },
          { text: '1-day wait', group: 1 },
          { text: '15-day wait', group: 0 },
          { text: '3-day wait', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'chidi',
        message: 'Raw coefficients said the reminder mattered most. Now it\'s past misses. Which is true?',
        prompt: 'Miracle\'s best reply?',
        options: [
          { text: 'The raw ones.', why: 'They mixed units.' },
          { text: 'The raw ones compared a whole yes/no with a single day. Scaled, each is "one spread", so the comparison is fair: past misses is strongest.' },
          { text: 'Neither: coefficients mean nothing.', why: 'Scaled, they compare well.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the feature to its scaled coefficient.',
        pairs: [
          ['wait_days', '0.38'],
          ['distance_km', '0.35'],
          ['previous_no_shows', '0.61'],
          ['sms_reminder', '−0.49'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'A scaled model.',
        language: 'python',
        template: 'model = make_pipeline([[1]](), [[2]]())',
        blanks: [['StandardScaler'], ['LogisticRegression']],
        distractors: ['SimpleImputer', 'DummyClassifier'],
      },
      {
        kind: 'findBug',
        prompt: 'Which statement about scaling is wrong?',
        lines: ['Average becomes 0.', 'One unit becomes one standard deviation.', 'Scaling changes which patients missed.'],
        bug: 2,
        fix: 'Scaling changes the features\' units, not the answers.',
        explanation: 'The labels are untouched.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Average training wait is 7.42 days, spread 7.67. Roughly what is a 15-day wait in spreads? (1 decimal place)',
        answers: ['1.0', '1', '0.99'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'For which Chapter 3 model was scaling essential, not just tidy?',
        options: [
          { text: 'k-nearest neighbours: it measures distances between patients' },
          { text: 'DummyClassifier', why: 'It ignores features.' },
          { text: 'None', why: 'Neighbours depend on distances, so units matter a lot.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Comparing a price in naira and a weight in kilograms: why do you need a common ruler before saying which "matters more"?',
    starters: ['Because...'],
  },
  deepen: {
    title: 'Other scalers',
    summary: 'MinMaxScaler squeezes each feature into 0 to 1. RobustScaler uses the median and is less upset by extreme values. StandardScaler is the usual first choice.',
  },
  notes: 'Training weeks 1-11: wait mean 7.42, scale 7.67; distance mean 10.73, scale 8.11. Coefs raw [0.05, 0.043, 0.607, -0.985]; scaled [0.38, 0.348, 0.614, -0.491]. (15 - 7.42) / 7.67 = 0.99.',
};

export default lesson;
