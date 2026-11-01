import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';
import { BASE, SK_BASE } from './code';

const FIT = 'model = LinearRegression()\nmodel.fit(train[["open_hours"]], train["bookings"])\n';

/** Chapter 5 · Lesson 10 — Checkpoint 2: MAE, the best line, scikit-learn, fit and predict. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Checkpoint: scikit-learn',
  summary: 'Halima\'s pencil line came down from the wall; scikit-learn\'s line went up. Check you can measure a forecast with MAE, fit and predict, and explain why the new line is only a little better.',
  minutes: 13,
  milestone: 'CHECKPOINT',
  outcomes: ['Fit, predict and score a line with scikit-learn', 'Compare forecasts with MAE'],
  learn: [
    {
      kind: 'story',
      title: 'Down from the wall',
      beats: [
        { speaker: 'chidi', text: 'All that, and scikit-learn only beats your pencil by 0.03?' },
        { speaker: 'halima', text: 'Because both only know opening hours. A better line can\'t fix a missing clue. Holidays are next.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 2: scikit-learn.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print the training average of bookings, rounded to 2 places: the baseline forecast',
        starter: BASE,
        solution: BASE + 'print(round(train["bookings"].mean(), 2))\n',
        hint: 'train["bookings"].mean()',
        checks: [{ message: 'Print 27.76', outputEquals: '27.76' }],
      },
      {
        kind: 'mcq',
        prompt: 'Errors are +3, -3, +2 and -2. What\'s the MAE?',
        options: [
          { text: '2.5' },
          { text: '0', why: 'That\'s the plain average. Make them positive first.' },
          { text: '10', why: 'That\'s the total. Divide by 4.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Fit a line on open_hours and print its prediction for a 40-hour week, rounded to 1 place',
        starter: SK_BASE + FIT,
        solution: SK_BASE + FIT + 'print(round(model.predict(pd.DataFrame({"open_hours": [40]}))[0], 1))\n',
        hint: 'model.predict(pd.DataFrame({"open_hours": [40]}))[0]',
        checks: [{ message: 'Print 25.0', outputEquals: '25.0' }],
      },
      {
        kind: 'orderLines',
        prompt: 'Order the scikit-learn pattern.',
        lines: ['Create the model', 'Fit on the training weeks', 'Predict the test weeks', 'Score once with MAE'],
      },
      {
        kind: 'sortGroups',
        prompt: 'fit or predict?',
        groups: ['fit', 'predict'],
        items: [
          { text: 'Learns the slope and intercept', group: 0 },
          { text: 'Gives a forecast for new weeks', group: 1 },
          { text: 'Needs the answers (bookings)', group: 0 },
          { text: 'Works on a week that hasn\'t happened', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'folake',
        message: 'Why is the scikit-learn line barely better than your pencil?',
        prompt: 'Halima\'s best reply?',
        options: [
          { text: 'scikit-learn is broken.', why: 'It found the best line. The limit is having only one clue.' },
          { text: 'My pencil was already close to the best line. To do much better, the model needs more clues, like holidays and rain.' },
          { text: 'Pencils are better than computers.', why: 'The computer\'s line is a little better, and exact.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the forecast to its test MAE.',
        pairs: [
          ['Training average', '5.3'],
          ['Pencil line', '3.8'],
          ['scikit-learn line', '3.77'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Scoring.',
        language: 'python',
        template: 'pred = model.[[1]](test[["open_hours"]])\nprint([[2]](test["bookings"], pred))',
        blanks: [['predict'], ['mean_absolute_error']],
        distractors: ['fit', 'accuracy'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line fits on the wrong weeks?',
        language: 'python',
        lines: ['model = LinearRegression()', 'model.fit(test[["open_hours"]], test["bookings"])', 'pred = model.predict(test[["open_hours"]])'],
        bug: 1,
        fix: 'model.fit(train[["open_hours"]], train["bookings"])',
        explanation: 'Fitting on the test weeks then scoring them is a memory test.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'scikit-learn\'s slope for opening hours, to 3 places?',
        answers: ['0.724'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Review, lesson 7: what does training a line search for?',
        options: [
          { text: 'The longest line', why: 'It searches for the smallest error.' },
          { text: 'The test weeks\' answers', why: 'It never sees the test weeks.' },
          { text: 'The slope and intercept with the smallest error on the training data' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Why can\'t a better line make up for a missing clue? Use an example from your own life.',
    starters: ['A better line can\'t...', 'For example...'],
  },
  notes: 'Checkpoint for Chapter 5 lessons 6-9. Training mean bookings 27.76. sklearn line (0.724h - 3.984) at 40 h = 24.97 -> 25.0. MAE: baseline 5.3, hand 3.8, sklearn 3.77.',
};

export default lesson;
