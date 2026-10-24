import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';
import { FEATS, SK_BASE } from './code';

/** Chapter 5 · Lesson 11 — More than one feature. */
const lesson: OriginalLesson = {
  key: 'l11',
  title: 'More than one feature',
  summary: 'The line only knew opening hours, so it over-guessed every holiday. Give the model all four clues it has (hours, nurses, holiday, rainy days) and the typical miss drops from 3.8 bookings to 2.8. Same code, one change.',
  minutes: 12,
  outcomes: [
    'Fit a model on several features at once',
    'Compare a one-feature and a four-feature model fairly',
    'Explain why more relevant clues usually help',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'One clue vs four',
      before: {
        label: 'One feature: open_hours',
        text: 'model.fit(train[["open_hours"]], train["bookings"])\nKnows: how long the clinic opens\nDoesn\'t know: holidays, rain, staffing\nTest MAE: 3.77 bookings\nOver-guesses every holiday week',
      },
      after: {
        label: 'Four features',
        text: 'model.fit(train[feats], train["bookings"])\nKnows: hours, nurses, holiday, rainy days\nOne number learned for each\nTest MAE: 2.76 bookings\nHoliday weeks no longer surprise it',
      },
      notes: [
        'The code barely changes: a list of columns instead of one.',
        'A model with more relevant clues can explain more of what happens.',
        'It\'s still a straight-line model: it adds up a separate effect for each feature.',
        'Checked fairly: same training weeks (1 to 40), same test weeks (41 to 52).',
      ],
    },
    {
      kind: 'tryIt',
      title: 'One clue vs four',
      caption: 'The same test weeks, two models.',
      code: SK_BASE + FEATS + '\nfor cols in [["open_hours"], feats]:\n    model = LinearRegression()\n    model.fit(train[cols], train["bookings"])\n    pred = model.predict(test[cols])\n    print(len(cols), "feature(s): test MAE", round(mean_absolute_error(test["bookings"], pred), 2))\n',
      challenge: 'Try ["open_hours", "nurses"]. Where does it land between the two?',
    },
  ],
  apply: {
    scenario: 'More than one feature.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Fit LinearRegression on all four features and print the test MAE, rounded to 2 places',
        starter: SK_BASE + FEATS + 'model = LinearRegression()\n',
        solution: SK_BASE + FEATS + 'model = LinearRegression()\nmodel.fit(train[feats], train["bookings"])\npred = model.predict(test[feats])\nprint(round(mean_absolute_error(test["bookings"], pred), 2))\n',
        hint: 'model.fit(train[feats], train["bookings"]), then predict test[feats]',
        checks: [{ message: 'Print 2.76', outputEquals: '2.76' }],
      },
      {
        kind: 'mcq',
        prompt: 'Why did adding features help so much?',
        options: [
          { text: 'More features always help', why: 'Only relevant ones. Chapter 8 shows useless ones can hurt.' },
          { text: 'The model can now account for holidays, rain and staffing, which the line couldn\'t see' },
          { text: 'The test weeks changed', why: 'Same test weeks. Only the clues changed.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Fit on just open_hours and nurses, and print the test MAE, rounded to 2 places',
        starter: SK_BASE + 'cols = ["open_hours", "nurses"]\nmodel = LinearRegression()\n',
        solution: SK_BASE + 'cols = ["open_hours", "nurses"]\nmodel = LinearRegression()\nmodel.fit(train[cols], train["bookings"])\nprint(round(mean_absolute_error(test["bookings"], model.predict(test[cols])), 2))\n',
        hint: 'Same pattern with cols',
        checks: [{ message: 'Print 3.37', outputEquals: '3.37' }],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the features to the test MAE.',
        pairs: [
          ['open_hours', '3.77'],
          ['open_hours, nurses', '3.37'],
          ['All four', '2.76'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Changes between the one-feature and four-feature code?',
        groups: ['Changes', 'Stays the same'],
        items: [
          { text: 'The list of columns', group: 0 },
          { text: 'LinearRegression()', group: 1 },
          { text: 'How many numbers the model learns', group: 0 },
          { text: 'The training and test weeks', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'chidi',
        message: 'Let\'s add week too. More features, better model.',
        prompt: 'Halima\'s best reply?',
        options: [
          { text: 'Yes, always add everything.', why: 'Irrelevant features can mislead. Chapter 8 shows how.' },
          { text: 'Week is a leak.', why: 'It\'s known in advance. It\'s just unlikely to help here.' },
          { text: 'Only if it\'s a real clue. Next week is week 53, beyond anything it learned, and last year showed no trend over the weeks anyway. Test it, don\'t assume.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Four features.',
        language: 'python',
        template: 'feats = ["open_hours", "nurses", "[[1]]", "rain_days"]\nmodel.fit(train[[[2]]], train["bookings"])',
        blanks: [['holiday'], ['feats']],
        distractors: ['week', 'bookings'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line predicts with the wrong columns?',
        language: 'python',
        lines: ['model.fit(train[feats], train["bookings"])', 'pred = model.predict(test[["open_hours"]])', 'print(mean_absolute_error(test["bookings"], pred))'],
        bug: 1,
        fix: 'pred = model.predict(test[feats])',
        explanation: 'predict needs the same columns fit used. scikit-learn refuses a mismatch.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'How much did the test MAE drop going from one feature (3.77) to four (2.76)?',
        answers: ['1.01', '1'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Is the four-feature model still "a line"?',
        options: [
          { text: 'Yes: it adds a straight-line effect for each feature' },
          { text: 'No, it\'s a curve', why: 'Each feature still has a single fixed slope.' },
          { text: 'No, it\'s a tree', why: 'Trees come in Chapter 6.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Which extra clue would you add to predict your own weekly spending: payday, weekends, something else?',
    starters: ['I\'d add...', 'Because...'],
  },
  deepen: {
    title: 'Multiple linear regression',
    summary: 'A linear model with several features is called multiple linear regression. Its prediction is the intercept plus each feature times its own number. Next lesson: reading those numbers.',
  },
  notes: 'Train weeks 1-40, test 41-52. Test MAE: open_hours 3.77; open_hours + nurses 3.37; all four 2.76. Week has ~zero linear trend (coef -0.0 on training).',
};

export default lesson;
