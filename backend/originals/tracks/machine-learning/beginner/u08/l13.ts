import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';
import { DATA, F5, IMPORTS, PIPE_IMPORTS, VAL_SPLIT } from './code';

const BASE = IMPORTS + PIPE_IMPORTS + DATA + VAL_SPLIT + F5;
const ID_MODEL =
  'from sklearn.compose import make_column_transformer\nfrom sklearn.preprocessing import OneHotEncoder\n' +
  'prep = make_column_transformer((StandardScaler(), feats), (OneHotEncoder(handle_unknown="ignore"), ["appointment_id"]))\n' +
  'model = make_pipeline(prep, LogisticRegression(C=100, max_iter=2000))\n' +
  'cols = feats + ["appointment_id"]\nmodel.fit(train[cols], train["no_show"])\n';

/** Chapter 8 · Lesson 13 — Too many features. */
const lesson: OriginalLesson = {
  key: 'l13',
  title: 'Too many features',
  summary: 'Chidi one-hot encodes appointment_id: 1,800 new columns, one per training booking. Training accuracy hits 100%. Validation doesn\'t move. Before and after, side by side.',
  minutes: 12,
  outcomes: [
    'Explain how too many features lead to memorising',
    'Compare training and validation scores',
    'Prefer a few meaningful features over many',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Five features vs 1,805',
      before: {
        label: 'Five features',
        text: 'wait, distance, past misses, reminder, rain\nTraining accuracy: 83.4%\nValidation accuracy: 80.0%\nA small gap: it learned patterns.',
      },
      after: {
        label: 'Five + one-hot appointment_id',
        text: '1,800 extra columns, one per training booking\nTraining accuracy: 100%\nValidation accuracy: 80.5%\nA huge gap: it memorised each patient.',
      },
      notes: [
        'Each ID column describes exactly one booking, so the model can learn "booking A10234 missed" by heart. That helps with nobody new.',
        'A big gap between training and validation is the classic sign of memorising (overfitting). Chapter 9 is all about it.',
        'C=100 lets the model fit very closely; Chapter 9 explains settings like it.',
      ],
    },
    {
      kind: 'tryIt',
      title: 'Memorising IDs',
      caption: 'Training vs validation accuracy.',
      code: BASE + ID_MODEL + '\nprint("Training:", round(model.score(train[cols], train["no_show"]), 3))\nprint("Validation:", round(model.score(val[cols], val["no_show"]), 3))\n',
      challenge: 'How many columns did the encoder make?',
    },
  ],
  apply: {
    scenario: 'Too many features.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print how many one-hot columns appointment_id makes on the training weeks (1 to 9)',
        starter: BASE,
        solution: BASE + 'print(pd.get_dummies(train["appointment_id"]).shape[1])\n',
        hint: 'pd.get_dummies(train["appointment_id"]).shape[1]',
        checks: [{ message: 'Print 1800', outputEquals: '1800' }],
      },
      {
        kind: 'mcq',
        prompt: 'Why does training accuracy reach 100%?',
        options: [
          { text: 'The model got smarter', why: 'It memorised; validation didn\'t improve.' },
          { text: 'Each booking has its own column, so the model can memorise every answer' },
          { text: 'A bug in scikit-learn', why: 'It\'s doing exactly what it\'s allowed to.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Fit Chidi\'s ID model and print its training accuracy, rounded to 3 places',
        starter: BASE + ID_MODEL,
        solution: BASE + ID_MODEL + 'print(round(model.score(train[cols], train["no_show"]), 3))\n',
        hint: 'model.score(train[cols], train["no_show"])',
        checks: [{ message: 'Print 1.0', outputEquals: '1.0' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'Sign of memorising, or not?',
        groups: ['Memorising', 'Learning'],
        items: [
          { text: '100% training, 80% validation', group: 0 },
          { text: 'One column per patient', group: 0 },
          { text: '83% training, 80% validation', group: 1 },
          { text: 'A few features with clear reasons', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'chidi',
        message: '100% training accuracy! That\'s the best model we\'ve had.',
        prompt: 'Miracle\'s best reply?',
        options: [
          { text: 'It knows the past by heart and nothing about the future: validation is 80.5%, about the same as before. Next week\'s IDs will all be new.' },
          { text: 'Ship it.', why: 'Next week\'s IDs have never been seen.' },
          { text: '100% is impossible.', why: 'It\'s possible by memorising.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the model to its accuracy.',
        pairs: [
          ['Five features, training', '83.4%'],
          ['Five features, validation', '80.0%'],
          ['With IDs, training', '100%'],
          ['With IDs, validation', '80.5%'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The warning sign.',
        template: 'A big gap between [[1]] and validation scores means the model is [[2]].',
        blanks: [['training'], ['memorising']],
        distractors: ['test', 'learning'],
      },
      {
        kind: 'findBug',
        prompt: 'Which feature can only be memorised?',
        lines: ['previous_no_shows', 'rain', 'appointment_id'],
        bug: 2,
        fix: 'Drop appointment_id: it identifies a booking, it doesn\'t describe one.',
        explanation: 'New bookings have new IDs the model has never seen.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many training rows are there in weeks 1 to 9?',
        answers: ['1800', '1,800'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the general lesson about adding features?',
        options: [
          { text: 'More features is always better', why: 'IDs just proved otherwise.' },
          { text: 'Each feature should describe something that repeats, and earn its place on validation' },
          { text: 'Never add features', why: 'Rain earned its place.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'Have you ever memorised answers for a test without understanding them? What happened with new questions?',
    starters: ['I memorised...', 'With new questions...'],
  },
  deepen: {
    title: 'The curse of dimensionality',
    summary: 'With many columns and few rows, models find patterns that are just noise. A rough rule: you want many more rows than columns. Here, 1,805 columns for 1,800 rows is hopeless.',
  },
  notes: 'Weeks 1-9 (1,800 rows) -> validation 10-11. Five features, scaled LR C=100: train 0.834, val 0.80. + one-hot appointment_id (1,800 cols): train 1.0, val 0.805.',
};

export default lesson;
