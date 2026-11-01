import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';
import { FEATS, SK_BASE } from './code';

const FIT4 = 'model = LinearRegression()\nmodel.fit(train[feats], train["bookings"])\n';

/** Chapter 5 · Lesson 12 — Reading the coefficients. */
const lesson: OriginalLesson = {
  key: 'l12',
  title: 'Reading the coefficients',
  summary: 'The four-feature model learned one number per clue. Read them and the model talks: "a holiday costs about 7.5 bookings", "each rainy day about 0.8". Tap through Halima\'s notes on what each one means, and what it doesn\'t.',
  minutes: 12,
  outcomes: [
    'Print and read a model\'s coefficients',
    'Turn each coefficient into a plain sentence',
    'Spot where a coefficient can mislead',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'What the model learned',
      text: 'open_hours: +0.72 per hour. nurses: +1.49 per nurse. holiday: -7.48 in a holiday week. rain_days: -0.80 per rainy day. intercept: -7.2. Prediction = -7.2 + 0.72 x hours + 1.49 x nurses - 7.48 x holiday - 0.80 x rainy days.',
      hotspots: [
        { phrase: 'open_hours: +0.72 per hour', note: 'Holding the other clues fixed, one more opening hour adds about 0.7 bookings. Almost the same as the one-feature line.' },
        { phrase: 'nurses: +1.49 per nurse', note: 'Careful: the real effect isn\'t the same for every nurse. The first extra nurse helps a lot, the fifth barely. A line gives one average number (lesson 14).' },
        { phrase: 'holiday: -7.48 in a holiday week', note: 'The clue the line was missing. A holiday week loses about 7 bookings.' },
        { phrase: 'rain_days: -0.80 per rainy day', note: 'Small but real: a five-rain-day week loses about 4 bookings.' },
        { phrase: 'intercept: -7.2', note: 'Just sets the height. No clinic has 0 hours and 0 nurses.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'warning',
      text: 'A coefficient shows how the prediction moves with a feature, holding the others fixed. It shows a pattern in last year\'s data, not proof of cause: hiring a nurse may not add exactly 1.49 bookings.',
    },
    {
      kind: 'tryIt',
      title: 'Read the model',
      caption: 'One number per feature.',
      code: SK_BASE + FEATS + '\nmodel = LinearRegression()\nmodel.fit(train[feats], train["bookings"])\nfor name, c in zip(feats, model.coef_):\n    print(name, round(c, 2))\nprint("intercept", round(model.intercept_, 2))\n',
      challenge: 'Use the numbers to predict a holiday week with 50 hours, 4 nurses and 2 rainy days, by hand.',
    },
  ],
  apply: {
    scenario: 'Reading the coefficients.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print each feature name with its coefficient, rounded to 2 places',
        starter: SK_BASE + FEATS + FIT4 + 'for name, c in zip(feats, model.coef_):\n',
        solution: SK_BASE + FEATS + FIT4 + 'for name, c in zip(feats, model.coef_):\n    print(name, round(c, 2))\n',
        hint: 'print(name, round(c, 2))',
        checks: [{ message: 'Print the four coefficients', outputEquals: 'open_hours 0.72\nnurses 1.49\nholiday -7.48\nrain_days -0.8' }],
      },
      {
        kind: 'mcq',
        prompt: 'The holiday coefficient is -7.48. In plain words?',
        options: [
          { text: '7.48% fewer patients', why: 'It\'s in bookings, not percent.' },
          { text: 'There are 7.48 holidays', why: 'It\'s the effect of a holiday on bookings.' },
          { text: 'A holiday week gets about 7.5 fewer bookings, other things equal' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Predict a holiday week at Yaba: 50 hours, 4 nurses, holiday 1, 2 rainy days. Print it, rounded to 1 place',
        starter: SK_BASE + FEATS + FIT4 + 'week = pd.DataFrame({"open_hours": [50], "nurses": [4], "holiday": [1], "rain_days": [2]})\n',
        solution: SK_BASE + FEATS + FIT4 + 'week = pd.DataFrame({"open_hours": [50], "nurses": [4], "holiday": [1], "rain_days": [2]})\nprint(round(model.predict(week)[0], 1))\n',
        hint: 'model.predict(week)[0]',
        checks: [{ message: 'Print 25.9', outputEquals: '25.9' }],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the feature to its sentence.',
        pairs: [
          ['open_hours', 'About +0.7 per extra hour'],
          ['nurses', 'About +1.5 per nurse, on average'],
          ['holiday', 'About -7.5 in a holiday week'],
          ['rain_days', 'About -0.8 per rainy day'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Does it raise or lower the forecast?',
        groups: ['Raises', 'Lowers'],
        items: [
          { text: 'More opening hours', group: 0 },
          { text: 'A holiday week', group: 1 },
          { text: 'More nurses', group: 0 },
          { text: 'More rainy days', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'folake',
        message: 'So if I hire one nurse at Gumel, I get exactly 1.49 more patients?',
        prompt: 'Halima\'s best reply?',
        options: [
          { text: 'Yes, exactly 1.49.', why: 'A coefficient is an average pattern, not a guarantee.' },
          { text: 'Not exactly. 1.49 is an average from last year, and the real nurse effect levels off. It\'s a pattern, not a promise.' },
          { text: 'Nurses don\'t matter.', why: 'They do, especially the first extra one.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Reading a coefficient.',
        template: 'A coefficient shows how the prediction moves with one feature, holding the others [[1]]. It\'s a [[2]], not proof of cause.',
        blanks: [['fixed'], ['pattern']],
        distractors: ['random', 'promise'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line pairs the coefficients with the wrong names?',
        language: 'python',
        lines: ['model.fit(train[feats], train["bookings"])', 'names = ["holiday", "nurses", "open_hours", "rain_days"]', 'for n, c in zip(names, model.coef_): print(n, c)'],
        bug: 1,
        fix: 'names = feats',
        explanation: 'coef_ follows the order of the columns given to fit. A different order mislabels them.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Using -0.8 per rainy day, how many bookings does a 5-rain-day week lose?',
        answers: ['4', '4.0'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why is the holiday coefficient so useful to Folake?',
        options: [
          { text: 'It tells her to plan for about 7 fewer bookings in holiday weeks' },
          { text: 'It\'s the biggest number', why: 'Size alone doesn\'t make it useful. The action does.' },
          { text: 'It proves holidays are bad', why: 'It shows a pattern in bookings, nothing more.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Pick one coefficient and write the sentence you\'d say to a clinic manager.',
    starters: ['I\'d say...'],
  },
  deepen: {
    title: 'Comparing coefficients',
    summary: 'You can\'t compare coefficients directly when features use different units: one hour and one nurse are very different amounts. Chapter 8 shows scaling, which puts features on the same ruler first.',
  },
  notes: 'LinearRegression on open_hours, nurses, holiday, rain_days (train weeks 1-40): coefs 0.72, 1.49, -7.48, -0.80; intercept -7.2. Holiday week prediction 50 h / 4 nurses / holiday / 2 rain: -7.197 + 36.2 + 5.96 - 7.48 - 1.59 = 25.9.',
};

export default lesson;
