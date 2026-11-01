import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';
import { FEATS, SK_BASE } from './code';

const FIT4 = 'model = LinearRegression()\nmodel.fit(train[feats], train["bookings"])\n';

/** Chapter 5 · Lesson 18 — Reading a regression result. */
const lesson: OriginalLesson = {
  key: 'l18',
  title: 'Reading a regression result',
  summary: 'An agency sends Folake a forecasting report: one big number and a confident chart. Halima reads it the way she\'d read a lab result. Here\'s her checklist, tried first on her own model.',
  minutes: 12,
  outcomes: [
    'Read a regression report with a checklist',
    'Find a model\'s weak spots by group',
    'Ask the questions a report should answer',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'Halima\'s checklist',
      html: '<p>The agency\'s report says: <em>"Our AI forecasts weekly bookings with 94% accuracy."</em> Halima asks five questions, and tries them on her own model first.</p><p><strong>1. What error measure?</strong> "94% accuracy" doesn\'t mean much for a number. Ask for the typical miss in bookings. Hers: MAE 2.76.</p><p><strong>2. Compared to what?</strong> Hers beats "one average for all" (5.3) and "each clinic\'s own average" (4.08).</p><p><strong>3. Tested on what?</strong> Hers: weeks 41 to 52, after learning from 1 to 40. A report without this could be a training score.</p><p><strong>4. Where is it weak?</strong> Average the misses for each clinic. Hers is worst at <strong>Gumel: 4.59</strong>, and best at Wuse (1.85). The small rural clinic gets the least accurate forecast. That matters for staffing there, and it\'s a fairness question you\'ll return to in Chapter 12.</p><p><strong>5. What does it use?</strong> Hours, nurses, holiday, rain. It doesn\'t know which clinic it\'s predicting, which is one reason Gumel is hard. Chapter 8 shows how to add that.</p>',
    },
    {
      kind: 'check',
      question: 'An agency says "94% accurate" for a weekly booking forecast. What should you ask first?',
      options: ['How many bookings does it usually miss by, and on which weeks?', 'Which colours are on the chart?', 'Can it reach 99%?'],
      answer: 0,
      explanation: 'For a number, the useful measure is the typical miss, on weeks it never saw.',
    },
    {
      kind: 'tryIt',
      title: 'Where is it weak?',
      caption: 'Typical miss for each clinic.',
      code: SK_BASE + FEATS + '\nmodel = LinearRegression()\nmodel.fit(train[feats], train["bookings"])\nmiss = (test["bookings"] - model.predict(test[feats])).abs()\nprint(test.assign(miss=miss).groupby("clinic")["miss"].mean().round(2).sort_values())\n',
      challenge: 'Why might the model struggle most with Gumel?',
    },
  ],
  apply: {
    scenario: 'Reading a result.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print the clinic with the largest average miss on the test weeks',
        starter: SK_BASE + FEATS + FIT4 + 'miss = (test["bookings"] - model.predict(test[feats])).abs()\nby_clinic = test.assign(miss=miss).groupby("clinic")["miss"].mean()\n',
        solution: SK_BASE + FEATS + FIT4 + 'miss = (test["bookings"] - model.predict(test[feats])).abs()\nby_clinic = test.assign(miss=miss).groupby("clinic")["miss"].mean()\nprint(by_clinic.idxmax())\n',
        hint: 'by_clinic.idxmax() gives the clinic with the biggest value',
        checks: [{ message: 'Print Gumel', outputEquals: 'Gumel' }],
      },
      {
        kind: 'orderLines',
        prompt: 'Order Halima\'s checklist.',
        lines: ['What error measure?', 'Compared to what?', 'Tested on what?', 'Where is it weak?', 'What does it use?'],
      },
      {
        kind: 'mcq',
        prompt: 'Why check the miss for each clinic, not just overall?',
        options: [
          { text: 'To make the report longer', why: 'To find weak spots.' },
          { text: 'An overall number can hide a clinic where the model is much worse' },
          { text: 'Each clinic needs its own model', why: 'Maybe, maybe not. First find out where it\'s weak.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Print Gumel\'s average miss on the test weeks, rounded to 2 places',
        starter: SK_BASE + FEATS + FIT4 + 'miss = (test["bookings"] - model.predict(test[feats])).abs()\nby_clinic = test.assign(miss=miss).groupby("clinic")["miss"].mean()\n',
        solution: SK_BASE + FEATS + FIT4 + 'miss = (test["bookings"] - model.predict(test[feats])).abs()\nby_clinic = test.assign(miss=miss).groupby("clinic")["miss"].mean()\nprint(round(by_clinic["Gumel"], 2))\n',
        hint: 'by_clinic["Gumel"]',
        checks: [{ message: 'Print 4.59', outputEquals: '4.59' }],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the clinic to its average test miss.',
        pairs: [
          ['Gumel', '4.59'],
          ['Yaba', '3.4'],
          ['Ikeja', '1.99'],
          ['Wuse', '1.85'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'folake',
        message: 'The agency\'s 94% beats your 2.76. Should we hire them?',
        prompt: 'Halima\'s best reply?',
        options: [
          { text: 'Yes, 94 is bigger.', why: 'Different measures can\'t be compared like that.' },
          { text: 'No, agencies always lie.', why: 'Ask the right questions instead of assuming.' },
          { text: 'Those aren\'t comparable. Ask them for the typical miss in bookings, on weeks their model never saw, and by clinic. Then we can compare.' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'A good sign in a report, or a warning sign?',
        groups: ['Good sign', 'Warning sign'],
        items: [
          { text: 'Error shown in bookings', group: 0 },
          { text: '"94% accurate", no details', group: 1 },
          { text: 'Results broken down by clinic', group: 0 },
          { text: 'No mention of test weeks', group: 1 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Finding weak spots.',
        language: 'python',
        template: 'by_clinic = test.assign(miss=miss).[[1]]("clinic")["miss"].[[2]]()',
        blanks: [['groupby'], ['mean']],
        distractors: ['sort', 'sum'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which clinic had the smallest average test miss?',
        answers: ['Wuse', 'wuse'],
        placeholder: 'A clinic',
      },
      {
        kind: 'mcq',
        prompt: 'One reason the model struggles at Gumel?',
        options: [
          { text: 'Gumel\'s data is fake', why: 'It\'s practice data, like all of it. The model is missing a clue.' },
          { text: 'It doesn\'t know which clinic it\'s predicting, and Gumel is much quieter than its hours suggest' },
          { text: 'Rain doesn\'t fall in Gumel', why: 'The missing clue is the clinic itself.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'Think of a statistic you\'ve seen with no "compared to what" or "tested on what". What would you ask?',
    starters: ['The statistic was...', 'I\'d ask...'],
  },
  deepen: {
    title: 'Errors by group',
    summary: 'Breaking errors down by group (clinic, age, region) is one of the most useful habits in machine learning. It finds the weak spots an overall number hides, and it\'s the first step of every fairness check.',
  },
  notes: 'Four-feature model, mean absolute test error by clinic: Gumel 4.59, Yaba 3.4, Kano City 2.84, Ibadan North 2.69, Surulere 2.62, Lekki 2.13, Ikeja 1.99, Wuse 1.85. The agency and its "94%" are fictional.',
};

export default lesson;
