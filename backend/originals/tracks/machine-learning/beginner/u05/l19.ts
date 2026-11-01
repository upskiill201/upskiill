import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';
import { FEATS, SK_BASE } from './code';

const FIT4 = 'model = LinearRegression()\nmodel.fit(train[feats], train["bookings"])\n';
const PLAN =
  'plan = pd.DataFrame({\n' +
  '    "clinic": ["Yaba", "Surulere", "Ikeja", "Lekki", "Ibadan North", "Wuse", "Kano City", "Gumel"],\n' +
  '    "open_hours": [50, 48, 48, 44, 42, 44, 45, 32],\n' +
  '    "nurses": [4, 4, 4, 4, 4, 4, 4, 4],\n' +
  '    "holiday": [0, 0, 0, 0, 0, 0, 0, 0],\n' +
  '    "rain_days": [1, 1, 1, 1, 1, 1, 1, 1],\n' +
  '})\n';

/** Chapter 5 · Lesson 19 — The weekly forecast. */
const lesson: OriginalLesson = {
  key: 'l19',
  title: 'The weekly forecast',
  summary: 'Friday afternoon. Each clinic sends its plan for next week: hours, nurses, any holiday, the rain forecast. Halima\'s program turns the eight plans into eight forecasts and a total for Folake. Step by step.',
  minutes: 14,
  outcomes: [
    'Build a forecast table for every clinic at once',
    'Add a total and present it honestly',
    'Spot a forecast that doesn\'t look right',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'From plans to forecasts',
      steps: [
        { title: '1. Fit on last year\'s weeks', body: 'The four-feature model, learned from weeks 1 to 40 and tested on 41 to 52 (MAE 2.76).', code: 'model = LinearRegression()\nmodel.fit(train[feats], train["bookings"])', language: 'python' },
        { title: '2. The plans as a table', body: 'One row per clinic, the same four columns the model learned: hours, nurses, holiday, rain forecast.', code: 'plan = pd.DataFrame({"clinic": [...], "open_hours": [...], ...})', language: 'python' },
        { title: '3. Predict all eight', body: 'One call gives eight forecasts.', code: 'plan = plan.assign(forecast=model.predict(plan[feats]).round(1))', language: 'python' },
        { title: '4. Add it up', body: 'Next week, across all eight: about 239 bookings. Yaba: 34.2, Gumel: 21.1.' },
        { title: '5. Sanity check', body: 'Gumel at 21? Its usual week is about 15. The model doesn\'t know which clinic a row is, so it treats Gumel\'s plan like any other clinic\'s. Flag it.' },
        { title: '6. Send it honestly', body: '"About 239 bookings next week, each clinic usually within 3. Gumel\'s figure is likely too high; plan for about 15 to 18 there."' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Next week\'s forecast',
      caption: 'Eight plans in, eight forecasts out.',
      code: SK_BASE + FEATS + '\nmodel = LinearRegression()\nmodel.fit(train[feats], train["bookings"])\n' + PLAN + 'plan = plan.assign(forecast=model.predict(plan[feats]).round(1))\nprint(plan[["clinic", "forecast"]])\nprint("Total:", round(plan["forecast"].sum()))\n',
      challenge: 'Make next week a holiday for every clinic. What happens to the total?',
    },
  ],
  apply: {
    scenario: 'The weekly forecast.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Forecast every clinic\'s plan and print the total, rounded to a whole number',
        starter: SK_BASE + FEATS + FIT4 + PLAN,
        solution: SK_BASE + FEATS + FIT4 + PLAN + 'forecast = model.predict(plan[feats])\nprint(round(forecast.sum()))\n',
        hint: 'model.predict(plan[feats]), then round(... .sum())',
        checks: [{ message: 'Print 239', outputEquals: '239' }],
      },
      {
        kind: 'mcq',
        prompt: 'Why does the plan table need exactly the columns open_hours, nurses, holiday, rain_days?',
        options: [
          { text: 'pandas requires four columns', why: 'It\'s about matching what fit saw.' },
          { text: 'To look tidy', why: 'predict refuses tables that don\'t match.' },
          { text: 'They\'re the features the model was fitted on' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Print Gumel\'s forecast (the last row), rounded to 1 place',
        starter: SK_BASE + FEATS + FIT4 + PLAN + 'forecast = model.predict(plan[feats])\n',
        solution: SK_BASE + FEATS + FIT4 + PLAN + 'forecast = model.predict(plan[feats])\nprint(round(forecast[-1], 1))\n',
        hint: 'forecast[-1] is the last forecast',
        checks: [{ message: 'Print 21.1', outputEquals: '21.1' }],
      },
      {
        kind: 'orderLines',
        prompt: 'Order Friday\'s forecast.',
        lines: ['Fit on last year\'s weeks', 'Put the plans in a table', 'Predict all clinics', 'Add up the total', 'Sanity-check and send'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Looks right, or worth flagging?',
        groups: ['Looks right', 'Flag it'],
        items: [
          { text: 'Yaba 34.2 (usual: about 32)', group: 0 },
          { text: 'Gumel 21.1 (usual: about 15)', group: 1 },
          { text: 'Ikeja 32.7 (usual: about 32)', group: 0 },
          { text: 'A negative forecast', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'folake',
        message: 'Why flag Gumel? The model said 21.',
        prompt: 'Halima\'s best reply?',
        options: [
          { text: 'The model doesn\'t know which clinic a row is. Gumel is always much quieter than its hours suggest, and its forecasts miss the most.' },
          { text: 'Gumel is lying about its plan.', why: 'The plan is fine. The model lacks a clue.' },
          { text: 'No reason, just a feeling.', why: 'There\'s a reason: the biggest test errors are at Gumel.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the clinic to its forecast.',
        pairs: [
          ['Yaba', '34.2'],
          ['Lekki', '29.8'],
          ['Ibadan North', '28.4'],
          ['Gumel', '21.1'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Forecasting all clinics.',
        language: 'python',
        template: 'plan = plan.[[1]](forecast=model.[[2]](plan[feats]))',
        blanks: [['assign'], ['predict']],
        distractors: ['append', 'fit'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line forgets to use the plan?',
        language: 'python',
        lines: ['model.fit(train[feats], train["bookings"])', 'forecast = model.predict(test[feats])', 'print(round(forecast.sum()))'],
        bug: 1,
        fix: 'forecast = model.predict(plan[feats])',
        explanation: 'test is last year\'s weeks 41 to 52. Next week\'s plans are in plan.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'About how many bookings does the model forecast across all eight clinics next week?',
        answers: ['239'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Halima flagged a number her own model produced. When have you double-checked a result because it didn\'t match what you knew?',
    starters: ['I double-checked...', 'It didn\'t match because...'],
  },
  deepen: {
    title: 'Human sanity checks',
    summary: 'Forecasts go wrong in ways a person often spots at a glance: a quiet clinic suddenly busy, a negative number. A quick human look before sending is cheap and catches what the model can\'t know.',
  },
  notes: 'Four-feature model on next week\'s plan (hours 50/48/48/44/42/44/45/32, 4 nurses, no holiday, 1 rain day): 34.2, 32.7, 32.7, 29.8, 28.4, 29.8, 30.6, 21.1; total 239.4 -> 239. Gumel training mean 15.1; Gumel test MAE 4.59.',
};

export default lesson;
