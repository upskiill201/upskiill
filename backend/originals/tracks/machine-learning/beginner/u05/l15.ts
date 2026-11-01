import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';
import { BASE, FEATS, SK_BASE } from './code';

const FIT4 = 'model = LinearRegression()\nmodel.fit(train[feats], train["bookings"])\n';

/** Chapter 5 · Lesson 15 — Checkpoint 3: several features, coefficients, baselines, shapes. */
const lesson: OriginalLesson = {
  key: 'l15',
  title: 'Checkpoint: four clues',
  summary: 'The four-clue model misses by 2.76 bookings a week, against 5.3 for guessing. Before it goes in front of the board, check you can fit it, read it, beat the right baseline, and say where a line is the wrong shape.',
  minutes: 14,
  milestone: 'CHECKPOINT',
  outcomes: ['Fit and read a multi-feature model', 'Judge it against baselines and spot wrong shapes'],
  learn: [
    {
      kind: 'story',
      title: 'The draft slide',
      beats: [
        { speaker: 'miracle', text: 'Four clues, MAE 2.76, beats both baselines. What\'s the weakest part?' },
        { speaker: 'halima', text: 'Nurses. The line gives one number for something that levels off.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 3: four clues.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Fit the four-feature model and print the intercept, rounded to 1 place',
        starter: SK_BASE + FEATS,
        solution: SK_BASE + FEATS + FIT4 + 'print(round(model.intercept_, 1))\n',
        hint: 'model.intercept_',
        checks: [{ message: 'Print -7.2', outputEquals: '-7.2' }],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the forecast to its test MAE.',
        pairs: [
          ['One average for all', '5.3'],
          ['Each clinic\'s average', '4.08'],
          ['open_hours line', '3.77'],
          ['Four features', '2.76'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'The holiday coefficient is -7.48. What should Folake take from it?',
        options: [
          { text: 'Close clinics on holidays', why: 'It shows fewer bookings, not zero.' },
          { text: 'Plan for about 7 fewer bookings in holiday weeks' },
          { text: 'Holidays cause 7.48% fewer bookings', why: 'It\'s bookings, not percent.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Print the training average for weeks with 4 nurses, rounded to 1 place',
        starter: BASE,
        solution: BASE + 'print(round(train[train["nurses"] == 4]["bookings"].mean(), 1))\n',
        hint: 'train[train["nurses"] == 4]["bookings"].mean()',
        checks: [{ message: 'Print 30.7', outputEquals: '30.7' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'A good fit for a straight line, or the wrong shape?',
        groups: ['Line fits', 'Wrong shape'],
        items: [
          { text: 'Opening hours: steady rise', group: 0 },
          { text: 'Nurses: steep, then flat', group: 1 },
          { text: 'Rainy days: steady small drop', group: 0 },
          { text: 'Something that peaks then falls', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'chidi',
        message: 'We beat the average baseline. Done?',
        prompt: 'Halima\'s best reply?',
        options: [
          { text: 'We also beat each clinic\'s own average (4.08), the harder baseline. That\'s the one that matters.' },
          { text: 'Yes, done.', why: 'Check the stronger baseline too.' },
          { text: 'Baselines don\'t matter now.', why: 'They\'re how we know the model is worth it.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Multi-feature fit.',
        language: 'python',
        template: 'model.fit(train[[[1]]], train["[[2]]"])',
        blanks: [['feats'], ['bookings']],
        distractors: ['test', 'week'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line builds the baseline from the wrong weeks?',
        language: 'python',
        lines: ['per_clinic = cw.groupby("clinic")["bookings"].mean()', 'guess = test["clinic"].map(per_clinic)', 'print((test["bookings"] - guess).abs().mean())'],
        bug: 0,
        fix: 'per_clinic = train.groupby("clinic")["bookings"].mean()',
        explanation: 'cw includes the test weeks. The baseline must come from training weeks.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Using -0.8 per rainy day, how much lower is a 3-rain-day week than a dry one?',
        answers: ['2.4'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Review, lesson 8: why does the first scikit-learn lesson ask about Wi-Fi?',
        options: [
          { text: 'scikit-learn only works on Wi-Fi', why: 'It works on any connection. Wi-Fi just saves your data bundle.' },
          { text: 'It downloads about 70 MB once' },
          { text: 'It uploads your data', why: 'Nothing is uploaded. Everything runs in your browser.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Order a fair model comparison.',
        lines: ['Split by time', 'Score the baselines', 'Fit models on training weeks', 'Compare test MAEs'],
      },
    ],
  },
  reflect: {
    prompt: 'Which result in this chapter surprised you most, and why?',
    starters: ['I was surprised that...'],
  },
  notes: 'Checkpoint for Chapter 5 lessons 11-14. Four-feature intercept -7.2. Training mean bookings with 4 nurses 30.7. MAEs: 5.3, 4.08, 3.77, 2.76.',
};

export default lesson;
