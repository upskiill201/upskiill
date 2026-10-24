import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';
import { PROBS } from './code';

const FLAG = PROBS + 'flags = (p >= 0.2).astype(int)\n';

/** Chapter 7 · Lesson 19 — Version 0.7: same model, measured properly, with a chosen threshold. */
const lesson: OriginalLesson = {
  key: 'l19',
  title: 'Version 0.7',
  summary: 'The model hasn\'t changed. Everything around it has: an agreed measure, a cost-based threshold chosen on validation, and an honest report. Six steps to version 0.7.',
  minutes: 12,
  outcomes: [
    'Run the full measure-then-decide workflow',
    'Report a classifier with a confusion matrix, precision, recall and cost',
    'Explain what changed from v0.6',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'From v0.6 to v0.7',
      steps: [
        { title: '1. Agree the measures', body: 'Top 20 reached each week (Bisi\'s list) and minutes lost (the clinic flag), at 20 minutes per missed no-show and 5 per call.' },
        { title: '2. Keep the model', body: 'Logistic regression, the same four features. v0.7 is about measuring and deciding, not a new model.' },
        { title: '3. Choose the threshold on validation', body: 'Weeks 1 to 9 to learn, weeks 10 and 11 to judge. Minutes lost is lowest at 0.2 (1,265, against 1,720 for doing nothing).' },
        { title: '4. Retrain and test once', body: 'Fit on weeks 1 to 11, flag week 12 at 0.2.', code: 'flags = (p >= 0.2).astype(int)', language: 'python' },
        { title: '5. The report', body: 'Confusion matrix [[126, 37], [11, 26]]. Precision 0.41, recall 0.70. Minutes 535 against 740 for doing nothing. Bisi\'s top 20 still reaches 12.' },
        { title: '6. Write it down', body: 'v0.7: v0.6 + threshold 0.2 chosen by cost on validation. Week 12: 26 of 37 no-shows reached, 205 nurse-minutes saved.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Version 0.7',
      caption: 'The full report in one run.',
      code: FLAG + '\nprint("v0.7: logistic regression, threshold 0.2")\nprint(confusion_matrix(y, flags))\nprint("Precision:", round(precision_score(y, flags), 2))\nprint("Recall:", round(recall_score(y, flags), 2))\nprint("Accuracy (for the record):", round((flags == y).mean(), 2))\n',
      challenge: 'Add the minutes lost to the report.',
    },
  ],
  apply: {
    scenario: 'Version 0.7.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print v0.7\'s confusion matrix on week 12 as a list',
        starter: FLAG,
        solution: FLAG + 'print(confusion_matrix(y, flags).tolist())\n',
        hint: 'confusion_matrix(y, flags).tolist()',
        checks: [{ message: 'Print [[126, 37], [11, 26]]', outputEquals: '[[126, 37], [11, 26]]' }],
      },
      {
        kind: 'mcq',
        prompt: 'What changed from v0.6 to v0.7?',
        options: [
          { text: 'A new kind of model', why: 'Still logistic regression.' },
          { text: 'The threshold and how the model is measured, not the model itself' },
          { text: 'More features', why: 'Still the same four.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Print v0.7\'s recall on week 12, rounded to 2 places',
        starter: FLAG,
        solution: FLAG + 'print(round(recall_score(y, flags), 2))\n',
        hint: 'recall_score(y, flags)',
        checks: [{ message: 'Print 0.7', outputEquals: '0.7' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'Chosen on validation, or measured on week 12?',
        groups: ['Chosen on validation', 'Measured on week 12'],
        items: [
          { text: 'The threshold 0.2', group: 0 },
          { text: 'Which threshold costs least', group: 0 },
          { text: 'Recall 0.70', group: 1 },
          { text: '205 minutes saved', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'chidi',
        message: 'v0.7\'s accuracy is 76%, lower than v0.6\'s 82%. Isn\'t that worse?',
        prompt: 'Halima\'s best reply?',
        options: [
          { text: 'Yes, go back to v0.6.', why: 'v0.6 at 0.5 reaches only 6.' },
          { text: 'Accuracy can\'t go down.', why: 'It did, and that\'s fine here.' },
          { text: 'On accuracy, yes, but accuracy is the wrong measure here. v0.7 reaches 26 no-shows instead of 6 and saves 205 nurse-minutes. That\'s what the clinic agreed to measure.' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the version to its week-12 result.',
        pairs: [
          ['v0.6 at 0.5', 'Reaches 6 of 37'],
          ['v0.7 at 0.2', 'Reaches 26 of 37'],
          ['Doing nothing', 'Reaches 0 of 37'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The notebook line.',
        template: 'v0.7: v0.6 + threshold [[1]], chosen by [[2]] on validation.',
        blanks: [['0.2'], ['cost']],
        distractors: ['0.5', 'accuracy'],
      },
      {
        kind: 'findBug',
        prompt: 'Which v0.7 step would break the rules?',
        lines: ['Measures agreed before comparing.', 'Threshold chosen on weeks 10 and 11.', 'Threshold nudged to 0.25 after seeing week 12.'],
        bug: 2,
        fix: 'Threshold stays at 0.2; week 12 is only reported.',
        explanation: 'Nudging after seeing the test week is peeking.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many wasted calls (false positives) does v0.7 make on week 12?',
        answers: ['37'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why can a version number go up without the model changing?',
        options: [
          { text: 'How it\'s used and measured changed, which changes what it does for the clinic' },
          { text: 'It can\'t', why: 'v0.7 is exactly that.' },
          { text: 'To look busy', why: 'The clinic gets 20 more no-shows reached.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'What changed more for the clinic in this chapter: the model, or the way it\'s used?',
    starters: ['I think...', 'Because...'],
  },
  deepen: {
    title: 'Decision vs model',
    summary: 'Professionals separate the model (which gives chances) from the decision rule (what to do with them). The same model can serve a 20-call list, a 0.2 flag and a 0.5 alert. Each is tested on its own.',
  },
  notes: 'v0.7 = v0.6 LR + threshold 0.2 (lowest validation minutes, 1265 vs 1720). Week 12: cm [[126, 37], [11, 26]], precision 0.413, recall 0.703, accuracy 0.76, minutes 535 vs 740.',
};

export default lesson;
