import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';
import { SK_BASE } from './code';

const FIT1 = 'model = LinearRegression()\nmodel.fit(train[["open_hours"]], train["bookings"])\n';

/** Chapter 5 · Lesson 17 — Common regression bugs. */
const lesson: OriginalLesson = {
  key: 'l17',
  title: 'Common regression bugs',
  summary: 'Emmanuel asks the line what happens if Yaba opens 100 hours a week. It happily answers 68.4. No clinic in the data opened more than 60. Five beliefs about regression, tested, starting with that one.',
  minutes: 12,
  outcomes: [
    'Recognise extrapolation and why it\'s risky',
    'Fix the most common scikit-learn shape bug',
    'Avoid the classic regression mistakes',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'A line works just as well far outside the data it learned from.',
          isFact: false,
          explain: 'Myth. The data covers 22 to 60 opening hours. At 100 hours the line says 68.4, but nothing tells us bookings keep rising: staff, rooms and patients all run out. Predicting outside the data is called extrapolating, and it\'s risky.',
        },
        {
          text: 'scikit-learn needs a table of features, even for one feature.',
          isFact: true,
          explain: 'Fact. train[["open_hours"]] (double brackets) is a table. train["open_hours"] is a single column, and fit refuses it.',
        },
        {
          text: 'A forecast that ignores holidays will be wrong in holiday weeks.',
          isFact: true,
          explain: 'Fact. If the model has no holiday feature, or you forget to set holiday=1 for next week, it over-guesses by about 7.',
        },
        {
          text: 'A lower training error always means a better model.',
          isFact: false,
          explain: 'Myth. Training error measures memory. Always compare on test weeks. Chapter 9 shows models that ace training and fail tests.',
        },
        {
          text: 'Negative predictions are a sign something might be wrong.',
          isFact: true,
          explain: 'Fact. At 0 hours the line predicts -4 bookings. Impossible, so it\'s a reminder: stay within the range the model learned from.',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Asking the line about 100 hours',
      caption: 'Extrapolation, in two numbers.',
      code: SK_BASE + '\nmodel = LinearRegression().fit(train[["open_hours"]], train["bookings"])\nprint("Hours in the data:", cw["open_hours"].min(), "to", cw["open_hours"].max())\nfor h in [0, 60, 100]:\n    print(h, "hours:", round(model.predict(pd.DataFrame({"open_hours": [h]}))[0], 1))\n',
      challenge: 'Which of these three predictions would you trust, and why?',
    },
  ],
  apply: {
    scenario: 'Regression bugs.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'This fit fails because of single brackets. Fix it, then print the slope rounded to 3 places',
        starter: SK_BASE + 'model = LinearRegression()\nmodel.fit(train["open_hours"], train["bookings"])\n',
        solution: SK_BASE + FIT1 + 'print(round(model.coef_[0], 3))\n',
        hint: 'train[["open_hours"]] with double brackets',
        checks: [{ message: 'Print 0.724', outputEquals: '0.724' }],
      },
      {
        kind: 'mcq',
        prompt: 'What is extrapolating?',
        options: [
          { text: 'Predicting for inputs outside the range the model learned from' },
          { text: 'Predicting the test weeks', why: 'Test weeks are inside the data\'s range.' },
          { text: 'Adding more features', why: 'It\'s about going beyond the data.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Print the line\'s prediction for 100 opening hours, rounded to 1 place',
        starter: SK_BASE + FIT1,
        solution: SK_BASE + FIT1 + 'print(round(model.predict(pd.DataFrame({"open_hours": [100]}))[0], 1))\n',
        hint: 'model.predict(pd.DataFrame({"open_hours": [100]}))[0]',
        checks: [{ message: 'Print 68.4', outputEquals: '68.4' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'Safe to trust, or extrapolating?',
        groups: ['Inside the data (22 to 60 h)', 'Extrapolating'],
        items: [
          { text: '45 hours', group: 0 },
          { text: '100 hours', group: 1 },
          { text: '60 hours', group: 0 },
          { text: '0 hours', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'emmanuel',
        message: 'The line says 100 hours gives 68 bookings. Let\'s open Yaba 100 hours!',
        prompt: 'Halima\'s best reply?',
        options: [
          { text: 'Great plan.', why: 'It\'s extrapolation. The line has no evidence past 60 hours.' },
          { text: 'Make it 200 for 140.', why: 'Even further from anything it learned.' },
          { text: 'No clinic in our data opened more than 60. The line is guessing past what it knows; nurses, rooms and patients would run out long before.' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the bug to its fix.',
        pairs: [
          ['train["open_hours"] in fit', 'Use train[["open_hours"]]'],
          ['Forecast ignores a holiday', 'Set holiday to 1'],
          ['Judging by training error', 'Compare on test weeks'],
          ['Predicting 100 hours', 'Stay within 22 to 60'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'One feature, the right shape.',
        language: 'python',
        template: 'model.fit(train[[1]]"open_hours"[[2]], train["bookings"])',
        blanks: [['[['], [']]']],
        distractors: ['(', ')'],
      },
      {
        kind: 'findBug',
        prompt: 'Next week is a holiday. Which line makes the forecast too high?',
        language: 'python',
        lines: ['week = pd.DataFrame({"open_hours": [50], "nurses": [4],', '                     "holiday": [0], "rain_days": [1]})', 'print(model.predict(week))'],
        bug: 1,
        fix: '                     "holiday": [1], "rain_days": [1]})',
        explanation: 'Forgetting the holiday makes the model over-guess by about 7.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'What\'s the most opening hours any week had in clinic_weeks.csv?',
        answers: ['60'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'The line predicts -4 bookings at 0 hours. What does that tell you?',
        options: [
          { text: 'Clinics lose patients when closed', why: 'Negative bookings are impossible. It\'s extrapolation.' },
          { text: 'You\'re outside the range it learned from: don\'t trust predictions there' },
          { text: 'The model is broken everywhere', why: 'It\'s fine between 22 and 60 hours.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'Have you ever extended a trend too far, like "if I save this much every month for 50 years..."? What would really change?',
    starters: ['I once assumed...', 'In reality...'],
  },
  deepen: {
    title: 'The famous extrapolation joke',
    summary: 'Data scientists joke that if a baby doubles its weight in a few months, a straight line predicts a several-hundred-kilo teenager. Patterns hold within the data; beyond it, check reality first.',
  },
  notes: 'One-feature line (0.724h - 3.984): 0 h -4.0, 60 h 39.5, 100 h 68.4. open_hours range in clinic_weeks.csv 22-60. Holiday coefficient -7.48 in the four-feature model.',
};

export default lesson;
