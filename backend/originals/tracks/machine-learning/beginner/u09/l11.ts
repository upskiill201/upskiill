import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';
import { DATA, F6, IMPORTS, MINUTES } from './code';

const BASE = IMPORTS + DATA + F6 + MINUTES + 'val = df[df["week"].isin([10, 11])]\n';
const WEEKS = (k: number) => `small = df[df["week"] <= ${k}]\nmodel = make_pipeline(StandardScaler(), LogisticRegression()).fit(small[feats], small["no_show"])\nflags = (model.predict_proba(val[feats])[:, 1] >= 0.2).astype(int)\n`;

/** Chapter 9 · Lesson 11 — More data vs a better model. */
const lesson: OriginalLesson = {
  key: 'l11',
  title: 'More data vs a better model',
  summary: 'Chidi wants a cleverer model. Miracle asks a different question: what if we just had more weeks? Same model, trained on 1 week, then 9. Side by side.',
  minutes: 12,
  outcomes: [
    'Measure how a model improves with more data',
    'Compare that with switching models',
    'Decide which to invest in',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Same model, more weeks',
      before: {
        label: 'Trained on week 1 only (200 bookings)',
        text: 'v0.8\'s recipe, logistic regression\nValidation minutes lost (weeks 10-11): 1,405',
      },
      after: {
        label: 'Trained on weeks 1 to 9 (1,800 bookings)',
        text: 'Exactly the same recipe\nValidation minutes lost: 1,225\n180 minutes better',
      },
      notes: [
        'In between it wobbles: 2 weeks 1,335, 3 weeks 1,370, 5 weeks 1,295, 7 weeks 1,310. More data helps on the whole, not at every step.',
        'No model swap in this chapter has gained anything like 180 minutes: the best tree was worse.',
        'Getting more good data is often the most reliable improvement there is.',
      ],
    },
    {
      kind: 'tryIt',
      title: 'Growing the training data',
      caption: 'v0.8\'s recipe, trained on more and more weeks.',
      code: BASE + '\nfor k in [1, 2, 3, 5, 7, 9]:\n    small = df[df["week"] <= k]\n    model = make_pipeline(StandardScaler(), LogisticRegression()).fit(small[feats], small["no_show"])\n    flags = (model.predict_proba(val[feats])[:, 1] >= 0.2).astype(int)\n    print(k, "weeks:", minutes(flags, val["no_show"]))\n',
      challenge: 'Why does 3 weeks do worse than 2?',
    },
  ],
  apply: {
    scenario: 'More data vs a better model.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Train v0.8\'s recipe on week 1 only and print its validation minutes lost',
        starter: BASE + 'small = df[df["week"] <= 1]\n',
        solution: BASE + WEEKS(1) + 'print(minutes(flags, val["no_show"]))\n',
        hint: 'Fit on small, flag val at 0.2, minutes',
        checks: [{ message: 'Print 1405', outputEquals: '1405' }],
      },
      {
        kind: 'mcq',
        prompt: 'What did going from 1 week to 9 weeks of data do?',
        options: [
          { text: 'Saved 180 validation minutes with the same model' },
          { text: 'Nothing', why: '1,405 → 1,225.' },
          { text: 'Made it overfit', why: 'It improved on new weeks.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Train on weeks 1 to 5 and print the validation minutes lost',
        starter: BASE + 'small = df[df["week"] <= 5]\n',
        solution: BASE + WEEKS(5) + 'print(minutes(flags, val["no_show"]))\n',
        hint: 'Same steps, weeks 1 to 5',
        checks: [{ message: 'Print 1295', outputEquals: '1295' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'More data, or a different model?',
        groups: ['More data', 'Different model'],
        items: [
          { text: 'Another 8 weeks of bookings', group: 0 },
          { text: 'Data from a ninth clinic', group: 0 },
          { text: 'Swap to a depth-5 tree', group: 1 },
          { text: 'Chidi\'s unlimited tree', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'chidi',
        message: 'More data is boring. I want a smarter model.',
        prompt: 'Miracle\'s best reply?',
        options: [
          { text: 'Fine, ignore data.', why: 'Data gave the biggest gain.' },
          { text: 'Boring and effective: 8 more weeks saved 180 minutes. Every model swap so far has lost minutes. Ask Emmanuel for older exports first.' },
          { text: 'Models don\'t matter.', why: 'They matter; here data mattered more.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the training weeks to validation minutes lost.',
        pairs: [
          ['1 week', '1,405'],
          ['2 weeks', '1,335'],
          ['5 weeks', '1,295'],
          ['9 weeks', '1,225'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The lesson.',
        template: 'Often, more good [[1]] beats a cleverer [[2]].',
        blanks: [['data'], ['model']],
        distractors: ['features', 'threshold'],
      },
      {
        kind: 'findBug',
        prompt: 'Which conclusion is too strong?',
        lines: ['On the whole, more weeks helped.', '3 weeks did worse than 2: small samples wobble.', 'Every extra week will always help.'],
        bug: 2,
        fix: 'Extra weeks help on average, not every time.',
        explanation: 'The curve wobbles: 2 weeks beat 3.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many bookings are there in 9 weeks?',
        answers: ['1800', '1,800'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'When does more data help least?',
        options: [
          { text: 'When the model overfits', why: 'More data often helps overfitting most.' },
          { text: 'Never', why: 'A stump stays a stump.' },
          { text: 'When the model is too simple to use it (underfitting)' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'In your work, what would "more data" look like? What would it cost to collect?',
    starters: ['More data would be...'],
  },
  deepen: {
    title: 'Data-centric AI',
    summary: 'Some practitioners argue that improving the data (more of it, cleaner labels, better features) usually beats tweaking the model. This chapter\'s numbers lean the same way.',
  },
  notes: 'Recipe: StandardScaler + LR, v0.8 features, trained on weeks 1..k, validated on weeks 10-11 at 0.2: k=1 1405, 2 1335, 3 1370, 5 1295, 7 1310, 9 1225.',
};

export default lesson;
