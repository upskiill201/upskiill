import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';
import { PRED } from './code';

/** Chapter 7 · Lesson 3 — Four kinds of right and wrong. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Four kinds of right and wrong',
  summary: 'Every prediction lands in one of four boxes: a no-show caught, a no-show missed, a wasted call, or a correct "she\'ll come". Accuracy adds two boxes together and hides the other two. Tap to meet all four.',
  minutes: 11,
  outcomes: [
    'Name the four outcomes of a yes/no prediction',
    'Count each outcome in code',
    'Say which outcomes matter to the clinic',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Week 12, at threshold 0.5',
      text: 'v0.6 flagged 11 bookings. 6 were true positives: flagged and really missed. 5 were false positives: flagged, but the patient came. Of the 189 it did not flag, 158 were true negatives, and 31 were false negatives: no-shows it never warned about.',
      hotspots: [
        { phrase: 'true positives', note: 'Predicted "miss", and they missed. A call that might save the slot.' },
        { phrase: 'false positives', note: 'Predicted "miss", but they came. A wasted call: annoying, but cheap.' },
        { phrase: 'true negatives', note: 'Predicted "come", and they came. Nothing to do.' },
        { phrase: 'false negatives', note: 'Predicted "come", but they missed. An empty chair nobody saw coming. This is the costly one here.' },
        { phrase: 'never warned about', note: '31 of 37 no-shows slipped through. Accuracy of 82% hid this completely.' },
      ],
    },
    {
      kind: 'check',
      question: 'The model says "she\'ll come", and she misses. Which box?',
      options: ['False positive', 'False negative', 'True negative'],
      answer: 1,
      explanation: 'Negative = predicted "come"; false = it was wrong.',
    },
    {
      kind: 'tryIt',
      title: 'Counting the four boxes',
      caption: 'Each box is a simple condition.',
      code: PRED + '\nprint("True positives:", ((pred == 1) & (y == 1)).sum())\nprint("False positives:", ((pred == 1) & (y == 0)).sum())\nprint("False negatives:", ((pred == 0) & (y == 1)).sum())\nprint("True negatives:", ((pred == 0) & (y == 0)).sum())\n',
      challenge: 'Check that the four add up to 200.',
    },
  ],
  apply: {
    scenario: 'Four kinds of right and wrong.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print the number of false negatives on week 12: predicted come, really missed',
        starter: PRED,
        solution: PRED + 'print(((pred == 0) & (y == 1)).sum())\n',
        hint: '((pred == 0) & (y == 1)).sum()',
        checks: [{ message: 'Print 31', outputEquals: '31' }],
      },
      {
        kind: 'mcq',
        prompt: 'Flagged as a no-show, but the patient came. Which box?',
        options: [
          { text: 'False negative', why: 'That\'s a missed no-show.' },
          { text: 'True positive', why: 'She came, so the flag was wrong.' },
          { text: 'False positive' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Print the number of false positives on week 12',
        starter: PRED,
        solution: PRED + 'print(((pred == 1) & (y == 0)).sum())\n',
        hint: 'Predicted 1, really 0',
        checks: [{ message: 'Print 5', outputEquals: '5' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'Right or wrong?',
        groups: ['Right', 'Wrong'],
        items: [
          { text: 'True positive', group: 0 },
          { text: 'False positive', group: 1 },
          { text: 'True negative', group: 0 },
          { text: 'False negative', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'bisi',
        message: 'Which mistake hurts my clinic more?',
        prompt: 'Halima\'s best reply?',
        options: [
          { text: 'They\'re the same.', why: 'Their costs are very different.' },
          { text: 'A false negative: an empty chair with no warning. A false positive costs you a five-minute call to someone who was coming anyway.' },
          { text: 'False positives: they annoy patients.', why: 'A short reminder call rarely does.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the box to week 12\'s count.',
        pairs: [
          ['True positives', '6'],
          ['False positives', '5'],
          ['False negatives', '31'],
          ['True negatives', '158'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Counting a box.',
        language: 'python',
        template: 'tp = ((pred == 1) [[1]] (y == [[2]])).sum()',
        blanks: [['&'], ['1']],
        distractors: ['and', '0'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line counts the wrong box for "true negatives"?',
        language: 'python',
        lines: ['tp = ((pred == 1) & (y == 1)).sum()', 'fp = ((pred == 1) & (y == 0)).sum()', 'tn = ((pred == 0) & (y == 1)).sum()'],
        bug: 2,
        fix: 'tn = ((pred == 0) & (y == 0)).sum()',
        explanation: 'True negative: predicted come, and they came.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Accuracy adds which two boxes together? (Name them, e.g. "true positives and ...")',
        answers: ['true positives and true negatives', 'true negatives and true positives', 'tp and tn', 'tn and tp'],
        placeholder: 'Two boxes',
      },
      {
        kind: 'mcq',
        prompt: 'Why does 82% accuracy hide the 31 false negatives?',
        options: [
          { text: 'False negatives aren\'t counted at all', why: 'They count as wrong; there just aren\'t many compared with 158.' },
          { text: 'Accuracy rounds them away', why: 'It\'s about proportions, not rounding.' },
          { text: 'The 158 true negatives swamp everything else' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'A smoke alarm: what is a false positive, and what is a false negative? Which is worse?',
    starters: ['A false positive is...', 'A false negative is...'],
  },
  deepen: {
    title: 'Type I and Type II errors',
    summary: 'Statisticians call false positives "Type I errors" and false negatives "Type II errors". Same idea, older names. You\'ll meet them in science and medicine.',
  },
  notes: 'Week 12, v0.6 at 0.5: TP 6, FP 5, FN 31, TN 158 (flagged 11).',
};

export default lesson;
