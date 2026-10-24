import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';
import { BASE, FEATS, SK_BASE } from './code';

/** Chapter 5 · Lesson 13 — A baseline: just guess the average. */
const lesson: OriginalLesson = {
  key: 'l13',
  title: 'A baseline: guess the average',
  summary: 'Every regression model has a humble rival: predict the average every time. It sounds too simple to matter, yet beginners skip it all the time. Five beliefs about baselines, tested, and the numbers to back them.',
  minutes: 11,
  outcomes: [
    'Build an average baseline and score it',
    'Use the baseline to judge whether a model is worth it',
    'Try a smarter baseline: each clinic\'s own average',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'A baseline is too simple to bother with.',
          isFact: false,
          explain: 'Myth. Without one, you can\'t tell if a model helps at all. Here, guessing the average misses by 5.3 bookings: the bar every model must clear.',
        },
        {
          text: 'A good baseline can be smarter than one number for everything.',
          isFact: true,
          explain: 'Fact. Each clinic\'s own training average is a stronger baseline: Gumel and Yaba are very different. A model should beat that too.',
        },
        {
          text: 'If a model beats the baseline, it\'s good enough to use.',
          isFact: false,
          explain: 'Myth. Beating it by a tiny amount might not be worth the complexity. Ask: is the gain big enough to change a decision?',
        },
        {
          text: 'The baseline should be built from the training weeks only.',
          isFact: true,
          explain: 'Fact. Its average comes from weeks 1 to 40, like any model. Averaging the test weeks would be peeking.',
        },
        {
          text: 'Complicated models always beat simple baselines.',
          isFact: false,
          explain: 'Myth. On some problems nothing beats a well-chosen baseline. That\'s why you always measure it.',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Three forecasts, one test',
      caption: 'Average, each clinic\'s average, and the four-feature model.',
      code: SK_BASE + FEATS + '\nflat = train["bookings"].mean()\nprint("Average:", round(mean_absolute_error(test["bookings"], [flat] * len(test)), 2))\n\nper_clinic = train.groupby("clinic")["bookings"].mean()\nguess = test["clinic"].map(per_clinic)\nprint("Clinic average:", round(mean_absolute_error(test["bookings"], guess), 2))\n\nmodel = LinearRegression().fit(train[feats], train["bookings"])\nprint("Model:", round(mean_absolute_error(test["bookings"], model.predict(test[feats])), 2))\n',
      challenge: 'How much does the model beat the clinic-average baseline by?',
    },
  ],
  apply: {
    scenario: 'The baseline.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Score the clinic-average baseline: predict each test week with its clinic\'s training average. Print the MAE, rounded to 2 places',
        starter: BASE + 'per_clinic = train.groupby("clinic")["bookings"].mean()\nguess = test["clinic"].map(per_clinic)\n',
        solution: BASE + 'per_clinic = train.groupby("clinic")["bookings"].mean()\nguess = test["clinic"].map(per_clinic)\nprint(round((test["bookings"] - guess).abs().mean(), 2))\n',
        hint: '(test["bookings"] - guess).abs().mean()',
        checks: [{ message: 'Print 4.08', outputEquals: '4.08' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Myth', 'Fact'],
        items: [
          { text: 'Baselines are too simple to bother with', group: 0 },
          { text: 'Build the baseline from training weeks only', group: 1 },
          { text: 'Beating the baseline means it\'s good enough', group: 0 },
          { text: 'A clinic\'s own average is a smarter baseline', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Each clinic\'s own average misses by 4.08, one average for all by 5.3. Why is it stronger?',
        options: [
          { text: 'It uses the test weeks', why: 'It uses training weeks only.' },
          { text: 'Clinics differ a lot: Gumel averages about 15, Yaba about 32' },
          { text: 'It\'s more complicated', why: 'It\'s barely more complicated. It\'s stronger because clinics differ.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Print Gumel\'s training average, rounded to 1 place',
        starter: BASE,
        solution: BASE + 'print(round(train[train["clinic"] == "Gumel"]["bookings"].mean(), 1))\n',
        hint: 'train[train["clinic"] == "Gumel"]["bookings"].mean()',
        checks: [{ message: 'Print 15.1', outputEquals: '15.1' }],
      },
      {
        kind: 'chatReply',
        from: 'chidi',
        message: 'My fancy model beat the average baseline by 0.1. Ship it?',
        prompt: 'Halima\'s best reply?',
        options: [
          { text: 'Yes, any win counts.', why: 'A tiny gain may not be worth the complexity.' },
          { text: 'Baselines don\'t count.', why: 'They\'re the whole reason we know it\'s 0.1.' },
          { text: 'Is 0.1 bookings a week worth a model nobody understands? Check it beats the clinic-average baseline too, and by enough to change a decision.' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the forecast to how smart it is.',
        pairs: [
          ['One average for everything', 'Simplest baseline'],
          ['Each clinic\'s average', 'Smarter baseline'],
          ['Four-feature model', 'Uses this week\'s clues'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The baseline habit.',
        template: 'Always score a [[1]] first, built from the [[2]] weeks only.',
        blanks: [['baseline'], ['training']],
        distractors: ['model', 'test'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line makes the baseline peek?',
        language: 'python',
        lines: ['per_clinic = test.groupby("clinic")["bookings"].mean()', 'guess = test["clinic"].map(per_clinic)', 'print((test["bookings"] - guess).abs().mean())'],
        bug: 0,
        fix: 'per_clinic = train.groupby("clinic")["bookings"].mean()',
        explanation: 'Averages for a baseline come from training weeks. Using test weeks is peeking.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'The simplest baseline (one average) has a test MAE of 5.3. The four-feature model has 2.76. How much better is the model? (2 decimal places.)',
        answers: ['2.54'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'When is a model not worth using, even though it beats the baseline?',
        options: [
          { text: 'Never', why: 'A tiny gain may not justify the cost and complexity.' },
          { text: 'When the gain is too small to change any decision' },
          { text: 'When it uses scikit-learn', why: 'The tool isn\'t the issue. The size of the gain is.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'What\'s the "baseline" in something you do: the simple way you\'d compare a clever new method against?',
    starters: ['The simple way is...', 'A new method would need to beat it by...'],
  },
  deepen: {
    title: 'Baselines in forecasting',
    summary: 'Forecasters often use "same as last time" or "same as this time last year" as baselines. Plenty of real forecasting systems have been found to barely beat them, which is why every serious report shows one.',
  },
  notes: 'Test MAE: simple baseline (train mean 27.76) 5.3; clinic-average baseline 4.08; four-feature LinearRegression 2.76 (adding clinic one-hot gives 2.15, saved for Chapter 8). Training means: Gumel 15.1, Yaba 32.5.',
};

export default lesson;
