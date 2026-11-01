import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';
import { FEATS, SK_BASE } from './code';

const FIT4 = 'model = LinearRegression()\nmodel.fit(train[feats], train["bookings"])\n';
const EASTER =
  'easter = pd.DataFrame({\n' +
  '    "open_hours": [50, 48, 48, 44, 42, 44, 45, 32],\n' +
  '    "nurses": [4, 4, 4, 4, 4, 4, 4, 4],\n' +
  '    "holiday": [1, 1, 1, 1, 1, 1, 1, 1],\n' +
  '    "rain_days": [2, 2, 2, 2, 2, 2, 2, 2],\n' +
  '})\n';

/** Chapter 5 · Lesson 20 — Chapter Challenge: the Easter forecast. Cliffhanger: back to no-shows. */
const lesson: OriginalLesson = {
  key: 'l20',
  title: 'Chapter Challenge: the Easter forecast',
  summary: 'The board meets on Monday, and Easter week is coming: a holiday, with two rainy days forecast. Folake needs one honest forecast slide. Use the whole chapter. Then she asks the question everyone has been waiting for.',
  minutes: 15,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Produce and present an honest forecast', 'Use every Chapter 5 skill together'],
  learn: [
    {
      kind: 'story',
      title: 'Easter week',
      beats: [
        { speaker: 'folake', text: 'Easter week. Every clinic open its normal hours, four nurses each, rain forecast for two days. How many patients?' },
        { speaker: 'halima', text: 'The model knows holidays cost about 7.5 and rain about 0.8 a day. I\'ll show the forecast, the usual miss, and the Gumel warning.' },
        { speaker: 'narrator', text: 'The board takes the slide without a single question about it. Then Folake turns to Halima.' },
        { speaker: 'folake', text: 'Good. Now the real one. Not how many patients: which ones won\'t come. You\'ve got scikit-learn now. Build me the no-show predictor.' },
        { speaker: 'tey', text: 'That\'s Chapter 5: regression, lines, slopes, errors, MAE, scikit-learn\'s fit and predict, more features, coefficients, baselines, shapes, uncertainty and forecasts. Chapter 6 brings scikit-learn back to the yes-or-no question. First, Easter.' },
      ],
    },
  ],
  apply: {
    scenario: 'Chapter 5 challenge: the Easter week forecast for Folake\'s board slide.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Forecast Easter week for all eight clinics and print the total, rounded to 1 place',
        starter: SK_BASE + FEATS + FIT4 + EASTER,
        solution: SK_BASE + FEATS + FIT4 + EASTER + 'print(round(model.predict(easter[feats]).sum(), 1))\n',
        hint: 'model.predict(easter[feats]).sum()',
        checks: [{ message: 'Print 173.2', outputEquals: '173.2' }],
      },
      {
        kind: 'mcq',
        prompt: 'A normal week forecast was about 239. Why is Easter so much lower?',
        options: [
          { text: 'Fewer nurses', why: 'Nurses are the same: 4 each.' },
          { text: 'The model is broken', why: 'It\'s applying the holiday and rain effects it learned.' },
          { text: 'Each clinic loses about 7.5 for the holiday and a little more for the extra rainy day' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Print the test MAE of the four-feature model, rounded to 2 places, to quote on the slide',
        starter: SK_BASE + FEATS + FIT4,
        solution: SK_BASE + FEATS + FIT4 + 'print(round(mean_absolute_error(test["bookings"], model.predict(test[feats])), 2))\n',
        hint: 'mean_absolute_error(test["bookings"], model.predict(test[feats]))',
        checks: [{ message: 'Print 2.76', outputEquals: '2.76' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'On the slide, or not?',
        groups: ['On the slide', 'Leave off'],
        items: [
          { text: 'Total: about 173, each clinic usually within 3', group: 0 },
          { text: '"Exactly 173.2"', group: 1 },
          { text: 'Gumel likely forecast too high', group: 0 },
          { text: 'The training MAE', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each Chapter 5 idea to the Easter slide.',
        pairs: [
          ['Coefficients', 'Holiday costs about 7.5'],
          ['MAE', 'Usually within 3'],
          ['Baseline', 'Beats each clinic\'s average'],
          ['Errors by clinic', 'The Gumel warning'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'chidi',
        message: 'Easter is a one-off. Can we trust a forecast for a holiday?',
        prompt: 'Halima\'s best reply?',
        options: [
          { text: 'Fully, like any week.', why: 'Holiday test weeks had bigger misses (3.59 vs 2.69).' },
          { text: 'Last year\'s data had 6 holiday weeks, so the model has seen some. Holiday weeks miss a bit more, so I\'ll say "within about 4" for Easter.' },
          { text: 'Not at all.', why: 'It has seen holidays. Just quote a wider spread.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'The slide headline.',
        template: 'Easter week: about [[1]] bookings across all clinics, each usually within [[2]] to 4.',
        blanks: [['173'], ['3']],
        distractors: ['239', '10'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line of the Easter table is wrong?',
        language: 'python',
        lines: ['"nurses": [4, 4, 4, 4, 4, 4, 4, 4],', '"holiday": [0, 0, 0, 0, 0, 0, 0, 0],', '"rain_days": [2, 2, 2, 2, 2, 2, 2, 2],'],
        bug: 1,
        fix: '"holiday": [1, 1, 1, 1, 1, 1, 1, 1],',
        explanation: 'Easter is a holiday week. Leaving it at 0 over-forecasts by about 7.5 a clinic.',
      },
      {
        kind: 'writeCode',
        prompt: 'Print Yaba\'s Easter forecast (the first row), rounded to 1 place',
        starter: SK_BASE + FEATS + FIT4 + EASTER,
        solution: SK_BASE + FEATS + FIT4 + EASTER + 'print(round(model.predict(easter[feats])[0], 1))\n',
        hint: 'model.predict(easter[feats])[0]',
        checks: [{ message: 'Print 25.9', outputEquals: '25.9' }],
      },
      {
        kind: 'orderLines',
        prompt: 'Order the challenge.',
        lines: ['Fit the four-feature model on weeks 1 to 40', 'Check its test MAE on weeks 41 to 52', 'Forecast Easter for all clinics', 'Flag Gumel and quote the spread'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What did Folake ask for next?',
        answers: ['no-show predictor', 'a no-show predictor', 'the no-show predictor', 'no show predictor', 'which patients will miss', 'who will miss'],
        placeholder: 'A few words',
      },
      {
        kind: 'mcq',
        prompt: '"Which patients won\'t come?" What kind of prediction is that?',
        options: [
          { text: 'Classification: yes or no for each booking' },
          { text: 'Regression: a number', why: 'Each answer is "miss" or "come".' },
          { text: 'Clustering', why: 'It has labels: missed or came.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'You built a model that forecasts a number, read its coefficients, and said honestly where it\'s weak. Which part would you explain to a friend first?',
    starters: ['I\'d explain...', 'Because...'],
  },
  notes: 'Chapter 5 challenge. Easter plan (normal hours, 4 nurses, holiday 1, 2 rain days): total 173.2 (normal week 239.4); Yaba 25.9. Test MAE 2.76; holiday test weeks MAE 3.59 vs 2.69 non-holiday. clinic_weeks has 6 holiday weeks (1, 14, 15, 22, 40, 52). Cliffhanger: Folake asks for the no-show classifier -> Chapter 6.',
};

export default lesson;
