import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';
import { PROBS } from './code';

/** Chapter 7 · Lesson 8 — The precision-recall trade-off. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'The trade-off',
  summary: 'Flag more bookings and you catch more no-shows, with more wasted calls. Flag fewer and your calls get sharper while more chairs go empty. Five beliefs about the trade-off, tested on week 12.',
  minutes: 11,
  outcomes: [
    'Explain the precision-recall trade-off',
    'See how both move as the threshold changes',
    'Avoid the "max both" myth',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'A good model has high precision and high recall at the same time.',
          isFact: false,
          explain: 'Myth, mostly. Better models push both up, but for any one model, moving the threshold trades one for the other.',
        },
        {
          text: 'Lowering the threshold usually raises recall and lowers precision.',
          isFact: true,
          explain: 'Fact. On week 12: at 0.5, recall 0.16 and precision 0.55; at 0.2, recall 0.70 and precision 0.41.',
        },
        {
          text: 'Precision always goes down as the threshold goes down.',
          isFact: false,
          explain: 'Myth. Usually, not always. On week 12, precision is 0.50 at 0.3 but 0.49 at 0.35. With small numbers, it wobbles.',
        },
        {
          text: 'You can\'t choose the threshold until you know what each mistake costs.',
          isFact: true,
          explain: 'Fact. The trade-off has no "right" point in maths. It depends on the clinic: lesson 11.',
        },
        {
          text: 'Recall of 1.0 is easy to get.',
          isFact: true,
          explain: 'Fact, sadly. Flag everyone. That\'s why recall always needs precision next to it.',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Watching the trade-off',
      caption: 'Precision and recall at five thresholds on week 12.',
      code: PROBS + '\nfor th in [0.2, 0.3, 0.4, 0.5, 0.6]:\n    flags = (p >= th).astype(int)\n    print(th, "flags", flags.sum(), "precision", round(precision_score(y, flags), 2), "recall", round(recall_score(y, flags), 2))\n',
      challenge: 'Add 0.1 to the list. What happens to precision?',
    },
  ],
  apply: {
    scenario: 'The trade-off.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print the recall at a threshold of 0.2, rounded to 3 places',
        starter: PROBS + 'flags = (p >= 0.2).astype(int)\n',
        solution: PROBS + 'flags = (p >= 0.2).astype(int)\nprint(round(recall_score(y, flags), 3))\n',
        hint: 'recall_score(y, flags)',
        checks: [{ message: 'Print 0.703', outputEquals: '0.703' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Myth', 'Fact'],
        items: [
          { text: 'Max both at once is easy', group: 0 },
          { text: 'Lower threshold, higher recall', group: 1 },
          { text: 'Precision always falls smoothly', group: 0 },
          { text: 'Flag everyone: recall 1.0', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Lowering the threshold from 0.5 to 0.2 on week 12...',
        options: [
          { text: 'Improves everything', why: 'Wasted calls go up a lot.' },
          { text: 'Catches 26 no-shows instead of 6, with 37 wasted calls instead of 5' },
          { text: 'Changes nothing', why: 'Many more bookings are flagged.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Print the precision at a threshold of 0.2, rounded to 3 places',
        starter: PROBS + 'flags = (p >= 0.2).astype(int)\n',
        solution: PROBS + 'flags = (p >= 0.2).astype(int)\nprint(round(precision_score(y, flags), 3))\n',
        hint: 'precision_score(y, flags)',
        checks: [{ message: 'Print 0.413', outputEquals: '0.413' }],
      },
      {
        kind: 'chatReply',
        from: 'chidi',
        message: 'Can\'t we just pick the threshold where both are highest?',
        prompt: 'Miracle\'s best reply?',
        options: [
          { text: 'Yes, 0.5 always.', why: '0.5 is just a default.' },
          { text: 'Use 0.0.', why: 'That flags everyone.' },
          { text: 'There usually isn\'t one: when one goes up, the other goes down. We pick the point that suits the clinic\'s costs.' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the threshold to its week-12 recall.',
        pairs: [
          ['0.2', '0.70'],
          ['0.3', '0.59'],
          ['0.4', '0.35'],
          ['0.5', '0.16'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The trade-off.',
        template: 'Lower the threshold: [[1]] goes up, [[2]] usually goes down.',
        blanks: [['recall'], ['precision']],
        distractors: ['accuracy', 'cost'],
      },
      {
        kind: 'findBug',
        prompt: 'Which conclusion is wrong?',
        lines: ['At 0.2, recall is 0.70.', 'At 0.5, precision is 0.55.', 'So 0.2 is better on every measure.'],
        bug: 2,
        fix: 'So 0.2 catches more, with more wasted calls.',
        explanation: 'Precision is lower at 0.2. It\'s a trade, not a win.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'At 0.6, how many week-12 bookings are flagged? (It\'s a very short list.)',
        answers: ['3', 'three'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'What decides where on the trade-off to sit?',
        options: [
          { text: 'Whatever gives the highest accuracy', why: 'That\'s the trap again.' },
          { text: 'What each kind of mistake costs the clinic' },
          { text: 'Always 0.5', why: 'It\'s just the default.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'Airport security: should it lean towards recall or precision? What does that cost travellers?',
    starters: ['It should lean...', 'The cost is...'],
  },
  deepen: {
    title: 'Precision-recall curves',
    summary: 'Plot precision against recall for every threshold and you get a precision-recall curve. It shows a model\'s whole trade-off at once. scikit-learn\'s precision_recall_curve gives the points.',
  },
  notes: 'Week 12 thresholds (flags, P, R): 0.2 (63, 0.413, 0.703); 0.3 (44, 0.5, 0.595); 0.35 (33, 0.485, 0.432); 0.4 (24, 0.542, 0.351); 0.5 (11, 0.545, 0.162); 0.6 (3, 0.667, 0.054). At 0.2: TP 26, FP 37.',
};

export default lesson;
