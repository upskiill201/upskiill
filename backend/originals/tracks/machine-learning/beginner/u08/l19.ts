import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';
import { DATA, F6, IMPORTS, MINUTES, MONDAY, PIPE8, PIPE_IMPORTS, SPLIT } from './code';

const FIT = IMPORTS + PIPE_IMPORTS + 'from sklearn.metrics import confusion_matrix\n' + DATA + MONDAY + SPLIT + F6 + MINUTES + PIPE8 + 'model.fit(train[feats], train["no_show"])\np = model.predict_proba(test[feats])[:, 1]\nflags = (p >= 0.2).astype(int)\n';

/** Chapter 8 · Lesson 19 — Version 0.8. */
const lesson: OriginalLesson = {
  key: 'l19',
  title: 'Version 0.8',
  summary: 'Two new ingredients, one pipeline, the threshold re-checked, and week 12 opened once. The result is honest and a little awkward: on week 12, v0.8 does exactly as well as v0.7.',
  minutes: 12,
  outcomes: [
    'Run the full v0.8 workflow',
    'Report a result that didn\'t improve',
    'Explain why one test week can\'t separate two close models',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'From v0.7 to v0.8',
      steps: [
        { title: '1. Features', body: 'The four originals plus rain and monday: both hunches written down first, both saved 20 validation minutes.' },
        { title: '2. Pipeline', body: 'SimpleImputer (median), StandardScaler, LogisticRegression. Runs on Emmanuel\'s raw export, blanks and all.' },
        { title: '3. Re-check the threshold', body: 'New features can shift the chances, so the threshold is checked again on validation: 0.15 costs 1,350 minutes, 0.2 costs 1,225, 0.25 costs 1,315. 0.2 stays.' },
        { title: '4. Retrain and test once', body: 'Fit on weeks 1 to 11, flag week 12 at 0.2.', code: 'flags = (model.predict_proba(test[feats])[:, 1] >= 0.2).astype(int)', language: 'python' },
        { title: '5. The result', body: 'Confusion matrix [[126, 37], [11, 26]]. 535 minutes lost. Exactly v0.7\'s result. Bisi\'s top 20 still reaches 12.' },
        { title: '6. Write it down, honestly', body: 'v0.8: better validation (1,225 vs 1,265 minutes), same week 12. Easier to run on raw files. Whether it\'s truly better is still an open question.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Version 0.8',
      caption: 'Week 12, opened once.',
      code: FIT + '\nprint(confusion_matrix(test["no_show"], flags))\nprint("Minutes lost:", minutes(flags, test["no_show"]))\nprint("Top 20 reach:", test.assign(p=p).nlargest(20, "p")["no_show"].sum())\n',
      challenge: 'Compare with v0.7\'s report from Chapter 7. What changed?',
    },
  ],
  apply: {
    scenario: 'Version 0.8.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print v0.8\'s minutes lost on week 12',
        starter: FIT,
        solution: FIT + 'print(minutes(flags, test["no_show"]))\n',
        hint: 'minutes(flags, test["no_show"])',
        checks: [{ message: 'Print 535', outputEquals: '535' }],
      },
      {
        kind: 'mcq',
        prompt: 'v0.8 saved 40 validation minutes but tied on week 12. What\'s the honest conclusion?',
        options: [
          { text: 'v0.8 is definitely better', why: 'Week 12 doesn\'t show it.' },
          { text: 'The new features are useless', why: 'Validation suggests a small gain.' },
          { text: 'It might be slightly better, but one week of 37 no-shows is too small to tell' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Print v0.8\'s confusion matrix on week 12 as a list',
        starter: FIT,
        solution: FIT + 'print(confusion_matrix(test["no_show"], flags).tolist())\n',
        hint: 'confusion_matrix(test["no_show"], flags).tolist()',
        checks: [{ message: 'Print [[126, 37], [11, 26]]', outputEquals: '[[126, 37], [11, 26]]' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'What did v0.8 change?',
        groups: ['Changed', 'Same as v0.7'],
        items: [
          { text: 'Two new features', group: 0 },
          { text: 'Runs on the raw export', group: 0 },
          { text: 'Threshold 0.2', group: 1 },
          { text: 'Week 12: 26 of 37 reached', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'folake',
        message: 'A whole chapter and the same result? What did we get?',
        prompt: 'Halima\'s best reply?',
        options: [
          { text: 'Nothing.', why: 'The pipeline and features are real gains.' },
          { text: 'A model that runs safely on next week\'s messy file, two tested features, and honest numbers. Whether it\'s better needs a fairer test than one week: that\'s next.' },
          { text: 'A much better model.', why: 'Week 12 doesn\'t show that.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the version to its validation minutes.',
        pairs: [
          ['v0.7 (four features)', '1,265'],
          ['Four + rain', '1,245'],
          ['v0.8 (four + rain + monday)', '1,225'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The notebook line.',
        template: 'v0.8: pipeline with rain and [[1]]; validation 1,225, week 12 [[2]] minutes, same as v0.7.',
        blanks: [['monday'], ['535']],
        distractors: ['age', '480'],
      },
      {
        kind: 'findBug',
        prompt: 'Which report line overclaims?',
        lines: ['Validation minutes improved from 1,265 to 1,225.', 'Week 12 matched v0.7: 535 minutes.', 'v0.8 is proven better than v0.7.'],
        bug: 2,
        fix: 'Whether v0.8 is better is not yet clear.',
        explanation: 'A tie on one week proves nothing either way.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which threshold had the lowest validation minutes for v0.8?',
        answers: ['0.2', '.2'],
        placeholder: 'A threshold',
      },
      {
        kind: 'mcq',
        prompt: 'Why re-check the threshold after adding features?',
        options: [
          { text: 'Thresholds expire', why: 'They depend on the model\'s chances.' },
          { text: 'To use week 12 again', why: 'It\'s re-checked on validation.' },
          { text: 'New features change the chances, so a different threshold might now be best' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'How do you feel about reporting "no improvement" after a lot of work? Why does it matter to do it anyway?',
    starters: ['It feels...', 'It matters because...'],
  },
  deepen: {
    title: 'Null results',
    summary: 'In science, "we tried it and it made no clear difference" is called a null result. They\'re under-reported, which makes everyone think ideas work more often than they do. Halima reports hers.',
  },
  notes: 'v0.8 = SimpleImputer(median) + StandardScaler + LR on wait, distance, previous, sms, rain, monday. Validation thresholds: 0.15 1350, 0.2 1225, 0.25 1315, 0.3 1375. Week 12 at 0.2: cm [[126, 37], [11, 26]], 535 minutes (= v0.7), top 20 12, top 40 18.',
};

export default lesson;
