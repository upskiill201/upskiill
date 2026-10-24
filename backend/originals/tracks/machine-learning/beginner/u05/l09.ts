import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';
import { SK_BASE } from './code';

const FIT = 'model = LinearRegression()\nmodel.fit(train[["open_hours"]], train["bookings"])\n';

/** Chapter 5 · Lesson 9 — fit and predict, then score on the test weeks. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'fit and predict',
  summary: 'fit learns the line. predict uses it. Together with one scoring line they make the pattern you\'ll use for the rest of the course: learn on training weeks, predict the test weeks, measure the error once.',
  minutes: 13,
  outcomes: [
    'Use predict to get forecasts from a fitted model',
    'Score a model with mean_absolute_error',
    'Predict a single new week',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Learn, predict, score',
      steps: [
        { title: '1. Fit on training weeks', body: 'The model finds slope 0.724 and intercept -3.984.', code: 'model = LinearRegression()\nmodel.fit(train[["open_hours"]], train["bookings"])', language: 'python' },
        { title: '2. Predict the test weeks', body: 'One prediction for each of the 96 test weeks.', code: 'pred = model.predict(test[["open_hours"]])', language: 'python' },
        { title: '3. Score once', body: 'scikit-learn has MAE built in. Test MAE: 3.77, a hair better than Halima\'s pencil line (3.8).', code: 'from sklearn.metrics import mean_absolute_error\nmean_absolute_error(test["bookings"], pred)', language: 'python' },
        { title: '4. Predict one new week', body: 'Yaba plans 50 hours next week. Give predict a one-row table.', code: 'week = pd.DataFrame({"open_hours": [50]})\nmodel.predict(week)', language: 'python' },
        { title: '5. Read the answer', body: '32.2 bookings. The model only knows hours, so treat it as "about 32, give or take 4".' },
        { title: '6. The pattern', body: 'Create, fit on train, predict on test, score once. Every model from here on uses exactly these steps.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'The full pattern',
      caption: 'Fit, predict, score, forecast.',
      code: SK_BASE + '\nmodel = LinearRegression()\nmodel.fit(train[["open_hours"]], train["bookings"])\npred = model.predict(test[["open_hours"]])\nprint("Test MAE:", round(mean_absolute_error(test["bookings"], pred), 2))\n\nweek = pd.DataFrame({"open_hours": [50]})\nprint("Yaba at 50 hours:", round(model.predict(week)[0], 1))\n',
      challenge: 'What does the model predict for a 30-hour week?',
    },
  ],
  apply: {
    scenario: 'fit and predict.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Predict the test weeks and print the test MAE, rounded to 2 places',
        starter: SK_BASE + FIT,
        solution: SK_BASE + FIT + 'pred = model.predict(test[["open_hours"]])\nprint(round(mean_absolute_error(test["bookings"], pred), 2))\n',
        hint: 'pred = model.predict(test[["open_hours"]]), then mean_absolute_error(test["bookings"], pred)',
        checks: [{ message: 'Print 3.77', outputEquals: '3.77' }],
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the difference between fit and predict?',
        options: [
          { text: 'fit learns from data with answers; predict gives answers for new data' },
          { text: 'They\'re the same', why: 'One learns, the other uses what was learned.' },
          { text: 'predict learns, fit tests', why: 'It\'s the other way round.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Predict Yaba\'s bookings for a 50-hour week and print it, rounded to 1 place',
        starter: SK_BASE + FIT + 'week = pd.DataFrame({"open_hours": [50]})\n',
        solution: SK_BASE + FIT + 'week = pd.DataFrame({"open_hours": [50]})\nprint(round(model.predict(week)[0], 1))\n',
        hint: 'model.predict(week)[0]',
        checks: [{ message: 'Print 32.2', outputEquals: '32.2' }],
      },
      {
        kind: 'orderLines',
        prompt: 'Order the pattern.',
        lines: ['model = LinearRegression()', 'model.fit(train[["open_hours"]], train["bookings"])', 'pred = model.predict(test[["open_hours"]])', 'mean_absolute_error(test["bookings"], pred)'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the forecast to its test MAE.',
        pairs: [
          ['Training average', '5.3'],
          ['Halima\'s pencil line', '3.8'],
          ['scikit-learn\'s line', '3.77'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'folake',
        message: 'So Yaba will get exactly 32.2 patients next week?',
        prompt: 'Halima\'s best reply?',
        options: [
          { text: 'Exactly 32.2.', why: 'There\'s no 0.2 of a patient, and the MAE is about 4.' },
          { text: 'We can\'t say anything.', why: 'We can: about 32, give or take 4.' },
          { text: 'About 32, usually within 4 either way. The model only knows hours: a holiday or a rainy week would pull it down.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Predicting one week.',
        language: 'python',
        template: 'week = pd.[[1]]({"open_hours": [50]})\nprint(model.[[2]](week))',
        blanks: [['DataFrame'], ['predict']],
        distractors: ['Series', 'fit'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line scores the model on the weeks it learned from?',
        language: 'python',
        lines: ['model.fit(train[["open_hours"]], train["bookings"])', 'pred = model.predict(train[["open_hours"]])', 'print(mean_absolute_error(train["bookings"], pred))'],
        bug: 1,
        fix: 'pred = model.predict(test[["open_hours"]])',
        explanation: 'Score on the test weeks, the ones the model never saw (and change the last line to test too).',
      },
      {
        kind: 'typeAnswer',
        prompt: 'What was scikit-learn\'s test MAE for the one-feature line?',
        answers: ['3.77'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why give predict a table (DataFrame) with an open_hours column?',
        options: [
          { text: 'predict only accepts tables of 50', why: 'It accepts any number of rows, with the same columns.' },
          { text: 'It must look like the data the model was fitted on: same columns' },
          { text: 'It doesn\'t matter', why: 'The columns must match what fit saw.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'Create, fit, predict, score. Explain each step as if to a friend who\'s never coded.',
    starters: ['Create means...', 'Fit means...', 'Predict means...'],
  },
  deepen: {
    title: 'Why scores and forecasts are separate',
    summary: 'The test MAE tells you how much to trust a forecast. The forecast is what you hand to someone. Always give both: "about 32, usually within 4".',
  },
  notes: 'LinearRegression on open_hours (train weeks 1-40): test MAE 3.77 (hand line 3.8, baseline 5.3). predict 50 hours = 32.2 (0.724 x 50 - 3.984 = 32.2).',
};

export default lesson;
