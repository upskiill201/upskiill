import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';
import { FEATS, SK_BASE } from './code';

const FIT4 = 'model = LinearRegression()\nmodel.fit(train[feats], train["bookings"])\n';

/** Chapter 5 · Lesson 16 — Predictions vs certainty: "about 34, give or take 3". */
const lesson: OriginalLesson = {
  key: 'l16',
  title: 'Predictions vs certainty',
  summary: 'Yaba\'s manager reads "34.2 bookings" and rosters for exactly 34. Then 30 turn up, and she blames the model. The forecast wasn\'t wrong: it was never that certain. How do you say how sure a forecast is?',
  minutes: 12,
  outcomes: [
    'Express a forecast with its typical error',
    'Count how often forecasts land close',
    'Choose wording that sets the right expectations',
  ],
  learn: [
    {
      kind: 'story',
      title: '34.2',
      beats: [
        { speaker: 'narrator', text: 'Yaba\'s manager, Mrs Okonkwo, on the phone to Bisi: "Your computer said 34.2. We got 30. I staffed for 34."' },
        { speaker: 'bisi', text: '(to Halima) She thinks the decimal means it\'s precise.' },
        { speaker: 'halima', text: 'On the test weeks, the model was within 3 bookings 59 times out of 96: about 6 weeks in 10. 30 against 34 is a normal week.' },
        { speaker: 'miracle', text: 'So stop sending 34.2. Send "about 34, usually within 3, sometimes more".' },
        { speaker: 'tey', text: 'A forecast is a best guess with a spread around it. How should Halima send forecasts from now on?' },
      ],
      choice: {
        prompt: 'How should Halima send forecasts?',
        options: [
          { text: 'A rounded number with its usual spread: "about 34, usually within 3".', outcome: 'Yes. It\'s honest about uncertainty, and managers can plan for a range instead of a single number.', best: true },
          { text: 'With more decimals, so it looks precise: 34.21.', outcome: 'More decimals make it look surer, not be surer. That\'s exactly what misled Mrs Okonkwo.' },
          { text: 'Stop sending forecasts: they\'re sometimes wrong.', outcome: '"About 34, within 3" is far more useful than no forecast. Every forecast is sometimes off.' },
        ],
      },
    },
    {
      kind: 'tryIt',
      title: 'How often is it close?',
      caption: 'Count test weeks within 3 bookings.',
      code: SK_BASE + FEATS + '\nmodel = LinearRegression()\nmodel.fit(train[feats], train["bookings"])\nmiss = (test["bookings"] - model.predict(test[feats])).abs()\nprint("Within 3:", (miss <= 3).sum(), "of", len(miss))\nprint("Within 5:", (miss <= 5).sum(), "of", len(miss))\nprint("Worst miss:", round(miss.max(), 1))\n',
      challenge: 'What share of weeks are within 5?',
    },
  ],
  apply: {
    scenario: 'Predictions vs certainty.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print how many of the 96 test weeks the four-feature model gets within 3 bookings',
        starter: SK_BASE + FEATS + FIT4 + 'miss = (test["bookings"] - model.predict(test[feats])).abs()\n',
        solution: SK_BASE + FEATS + FIT4 + 'miss = (test["bookings"] - model.predict(test[feats])).abs()\nprint((miss <= 3).sum())\n',
        hint: '(miss <= 3).sum()',
        checks: [{ message: 'Print 59', outputEquals: '59' }],
      },
      {
        kind: 'mcq',
        prompt: 'Why did "34.2" mislead Mrs Okonkwo?',
        options: [
          { text: 'The model was broken', why: '30 vs 34 is within the normal spread.' },
          { text: 'She can\'t read decimals', why: 'She read it right. It just didn\'t say how sure it was.' },
          { text: 'The decimal made it look precise, but forecasts are usually off by a few' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Print the worst miss on the test weeks, rounded to 1 place',
        starter: SK_BASE + FEATS + FIT4 + 'miss = (test["bookings"] - model.predict(test[feats])).abs()\n',
        solution: SK_BASE + FEATS + FIT4 + 'miss = (test["bookings"] - model.predict(test[feats])).abs()\nprint(round(miss.max(), 1))\n',
        hint: 'miss.max()',
        checks: [{ message: 'Print 10.7', outputEquals: '10.7' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'Honest forecast wording, or not?',
        groups: ['Honest', 'Misleading'],
        items: [
          { text: '"About 34, usually within 3"', group: 0 },
          { text: '"Exactly 34.21"', group: 1 },
          { text: '"Between 31 and 37 most weeks"', group: 0 },
          { text: '"Guaranteed 34"', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'bisi',
        message: 'Mrs Okonkwo asks: how many weeks is it way off?',
        prompt: 'Halima\'s best reply?',
        options: [
          { text: 'Never.', why: 'The worst test week was off by 10.7.' },
          { text: '83 of 96 test weeks were within 5. The rest were further off, up to about 11, usually around holidays.' },
          { text: 'Most weeks.', why: '6 in 10 are within 3, and most are within 5.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the number to its meaning.',
        pairs: [
          ['59 of 96', 'Test weeks within 3'],
          ['83 of 96', 'Test weeks within 5'],
          ['10.7', 'The worst miss'],
          ['2.76', 'The typical miss (MAE)'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Honest wording.',
        template: 'A forecast is a best [[1]] with a [[2]] around it.',
        blanks: [['guess'], ['spread', 'range']],
        distractors: ['promise', 'decimal'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line of this message to Yaba is misleading?',
        lines: ['Next week: about 34 bookings.', 'Usually within 3 either way.', 'Plan for exactly 34.2 patients.'],
        bug: 2,
        fix: 'Plan for 31 to 37, and a little more cover on rainy weeks.',
        explanation: 'Planning for an exact decimal ignores the spread.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'About what share of test weeks were within 3 bookings? (59 / 96, as a percent to the nearest whole number.)',
        answers: ['61', '61%'],
        placeholder: 'A percent',
      },
      {
        kind: 'mcq',
        prompt: 'Which forecast helps a manager plan staff best?',
        options: [
          { text: '"34.2"', why: 'It hides the spread.' },
          { text: '"Somewhere between 0 and 60"', why: 'True but useless.' },
          { text: '"About 34; most weeks 31 to 37"' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Weather apps say "70% chance of rain". How is that like "about 34, within 3"?',
    starters: ['Both...', 'It helps me because...'],
  },
  deepen: {
    title: 'Prediction intervals',
    summary: 'Statisticians call a forecast\'s range a prediction interval. A simple honest version is the one Halima used: look at how far off the model was on test weeks, and quote that.',
  },
  notes: 'Four-feature model, test weeks 41-52: |error| <= 3 in 59 of 96 (61%), <= 5 in 83 of 96; worst 10.7. Yaba next-week plan (50 h, 4 nurses, no holiday, 1 rain day) forecast 34.2. Mrs Okonkwo is narrated (Yaba clinic manager).',
};

export default lesson;
