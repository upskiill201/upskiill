import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';
import { BASE, PRED } from './code';

/** Chapter 7 · Lesson 5 — Checkpoint 1: the trap, baselines, four boxes, the matrix. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: the four boxes',
  summary: 'Accuracy\'s trap, a dummy baseline and a confusion matrix. Check you can count every kind of right and wrong before we turn them into better measures.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Spot the accuracy trap and build a baseline', 'Make and read a confusion matrix'],
  learn: [
    {
      kind: 'story',
      title: 'The whiteboard',
      beats: [
        { speaker: 'halima', text: 'I drew the matrix on the whiteboard. Folake walked past, read the bottom row, and stopped.' },
        { speaker: 'folake', text: 'Thirty-one empty chairs we didn\'t see coming. That\'s the number I care about.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1: the four boxes.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print how many week-12 bookings v0.6 flags as no-shows at the default threshold',
        starter: PRED,
        solution: PRED + 'print(pred.sum())\n',
        hint: 'pred.sum()',
        checks: [{ message: 'Print 11', outputEquals: '11' }],
      },
      {
        kind: 'mcq',
        prompt: 'Why is accuracy misleading for no-shows?',
        options: [
          { text: 'Accuracy is always wrong', why: 'It\'s fine when classes are balanced.' },
          { text: 'Most patients come, so predicting "come" for everyone already scores high' },
          { text: 'It ignores true negatives', why: 'It\'s dominated by them.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Print the true positives on week 12: cell [1, 1] of the confusion matrix',
        starter: PRED + 'cm = confusion_matrix(y, pred)\n',
        solution: PRED + 'cm = confusion_matrix(y, pred)\nprint(cm[1, 1])\n',
        hint: 'cm[1, 1]',
        checks: [{ message: 'Print 6', outputEquals: '6' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'Which box?',
        groups: ['Positive (said miss)', 'Negative (said come)'],
        items: [
          { text: 'True positive', group: 0 },
          { text: 'False negative', group: 1 },
          { text: 'False positive', group: 0 },
          { text: 'True negative', group: 1 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Print how many no-shows week 12 had in total',
        starter: BASE,
        solution: BASE + 'print(y.sum())\n',
        hint: 'y.sum()',
        checks: [{ message: 'Print 37', outputEquals: '37' }],
      },
      {
        kind: 'chatReply',
        from: 'chidi',
        message: 'The dummy scored 0.815 and we scored 0.82. Should I add it to the report?',
        prompt: 'Halima\'s best reply?',
        options: [
          { text: 'No, it makes us look bad.', why: 'Hiding baselines is how people fool themselves.' },
          { text: 'Only if we win by 10 points.', why: 'Always include it.' },
          { text: 'Yes, always: and show it on every measure, not just accuracy. That\'s how readers see what the model adds.' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the term to its meaning.',
        pairs: [
          ['Baseline', 'What "doing nothing" scores'],
          ['False negative', 'A no-show nobody saw coming'],
          ['False positive', 'A call to someone who came'],
          ['Confusion matrix', 'All four boxes in one table'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The dummy.',
        language: 'python',
        template: 'dummy = DummyClassifier(strategy="most_frequent")\ndummy.[[1]](train[feats], train["no_show"])\nprint(dummy.[[2]](test[feats], y))',
        blanks: [['fit'], ['score']],
        distractors: ['predict', 'cut'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line reads the matrix wrongly?',
        lines: ['Top left 158: came, and the model said come.', 'Bottom right 6: missed, and the model said miss.', 'Top right 5: missed, and the model said come.'],
        bug: 2,
        fix: 'Top right 5: came, but the model said miss.',
        explanation: 'Top row = came. Right column = said miss.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which cell is costliest for the clinic? (Name the box.)',
        answers: ['false negatives', 'false negative', 'fn', 'bottom left'],
        placeholder: 'A box',
      },
    ],
  },
  reflect: {
    prompt: 'Which number would you put on Folake\'s whiteboard first, and why?',
    starters: ['I\'d put...'],
  },
  notes: 'Checkpoint for Chapter 7 lessons 1-4. Week 12 v0.6 at 0.5: flagged 11, cm [[158, 5], [31, 6]], 37 no-shows. Dummy 0.815.',
};

export default lesson;
