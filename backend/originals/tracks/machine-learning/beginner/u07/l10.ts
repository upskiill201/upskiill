import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';
import { PRED, PROBS, VAL } from './code';

/** Chapter 7 · Lesson 10 — Checkpoint 2: precision, recall, the trade-off, thresholds. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Checkpoint: precision and recall',
  summary: 'Two questions, one trade-off and a threshold chosen the honest way. Check you can calculate both measures and move the threshold without peeking.',
  minutes: 13,
  milestone: 'CHECKPOINT',
  outcomes: ['Calculate precision and recall', 'Move a threshold on validation'],
  learn: [
    {
      kind: 'story',
      title: 'Two questions',
      beats: [
        { speaker: 'bisi', text: 'My question: when it says call, is it right?' },
        { speaker: 'folake', text: 'Mine: of the empty chairs, how many did we see coming?' },
        { speaker: 'halima', text: 'Precision and recall. You\'re both right, and you pull in opposite directions.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 2: precision and recall.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print v0.6\'s precision and recall at 0.5 on week 12, each rounded to 3 places, on one line',
        starter: PRED,
        solution: PRED + 'print(round(precision_score(y, pred), 3), round(recall_score(y, pred), 3))\n',
        hint: 'print(a, b) puts them on one line',
        checks: [{ message: 'Print 0.545 0.162', outputEquals: '0.545 0.162' }],
      },
      {
        kind: 'mcq',
        prompt: 'Whose question is recall?',
        options: [
          { text: 'Bisi\'s: is each call worth it?', why: 'That\'s precision.' },
          { text: 'Folake\'s: of the empty chairs, how many did we see coming?' },
          { text: 'Chidi\'s: what\'s the accuracy?', why: 'That\'s the trap.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'On week 12, print how many bookings a threshold of 0.3 flags',
        starter: PROBS,
        solution: PROBS + 'print((p >= 0.3).sum())\n',
        hint: '(p >= 0.3).sum()',
        checks: [{ message: 'Print 44', outputEquals: '44' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'Lowering the threshold: what usually happens?',
        groups: ['Goes up', 'Goes down'],
        items: [
          { text: 'Recall', group: 0 },
          { text: 'Number flagged', group: 0 },
          { text: 'Precision', group: 1 },
          { text: 'Missed no-shows', group: 1 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'On validation, print the precision at a threshold of 0.25, rounded to 3 places',
        starter: VAL + 'f = (pv >= 0.25).astype(int)\n',
        solution: VAL + 'f = (pv >= 0.25).astype(int)\nprint(round(precision_score(yv, f), 3))\n',
        hint: 'precision_score(yv, f)',
        checks: [{ message: 'Print 0.526', outputEquals: '0.526' }],
      },
      {
        kind: 'chatReply',
        from: 'emmanuel',
        message: 'Recall is 1.0 if we flag everyone. Why not do that?',
        prompt: 'Halima\'s best reply?',
        options: [
          { text: 'Then precision is 0.185: Bisi makes 200 calls to reach 37. Recall alone can be gamed, just like precision.' },
          { text: 'Good idea.', why: '200 calls a week is impossible.' },
          { text: 'Recall can\'t be 1.0.', why: 'It can, by flagging everyone.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the fraction to its measure.',
        pairs: [
          ['TP ÷ flagged', 'Precision'],
          ['TP ÷ all no-shows', 'Recall'],
          ['(TP + TN) ÷ all', 'Accuracy'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'scikit-learn\'s versions.',
        language: 'python',
        template: 'print([[1]](y, pred))  # of the flagged\nprint([[2]](y, pred))  # of the no-shows',
        blanks: [['precision_score'], ['recall_score']],
        distractors: ['accuracy_score', 'f1_score'],
      },
      {
        kind: 'findBug',
        prompt: 'Which step is peeking?',
        lines: ['Train on weeks 1 to 9.', 'Try thresholds on weeks 10 and 11.', 'Pick the threshold with the best week-12 recall.'],
        bug: 2,
        fix: 'Pick the threshold with the agreed rule on weeks 10 and 11.',
        explanation: 'Week 12 is opened once, after choosing.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'A list flags 50 bookings and catches 23 of 37 no-shows. What\'s its recall? (2 decimal places)',
        answers: ['0.62', '.62'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Bisi or Folake: whose question matters more to you, and why?',
    starters: ['I\'d side with...'],
  },
  notes: 'Checkpoint for Chapter 7 lessons 6-9. Week 12 v0.6 at 0.5: P 0.545, R 0.162; 0.3 flags 44. Validation 0.25: P 0.526. 23/37 = 0.622.',
};

export default lesson;
