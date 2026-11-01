import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';
import { PRED, PROBS } from './code';

/** Chapter 7 · Lesson 6 — Precision. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Precision',
  summary: 'Bisi asks a simple question: "When the model tells me to call someone, how often is it right?" That question has a name: precision. Tey walks through it.',
  minutes: 11,
  outcomes: [
    'Explain precision in plain words',
    'Calculate precision by hand and with precision_score',
    'Connect precision to Bisi\'s call list',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Bisi\'s question: of the people the model flags, how many really miss? That\'s precision.', replies: ['How do I work it out?'] },
        { tey: 'True positives divided by everyone flagged. At 0.5, v0.6 flagged 11 and 6 really missed: 6 ÷ 11 = 0.545.', replies: ['So just over half her calls are useful?'] },
        { tey: 'Yes. And her top-20 list? 12 of 20 really missed: precision 0.6. You\'ve been measuring precision since Chapter 4 without the name.', replies: ['Is high precision always good?'] },
        { tey: 'It means few wasted calls. But a model could flag just its single surest booking, be right, and score precision 1.0 while missing 36 no-shows.', replies: ['So precision isn\'t enough on its own.'] },
        { tey: 'Exactly. It answers "how good are my calls?", not "how many empty chairs did I prevent?". That second question is the next lesson.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Precision, two ways',
      caption: 'By hand and with scikit-learn.',
      code: PRED + '\ntp = ((pred == 1) & (y == 1)).sum()\nprint("By hand:", tp, "/", pred.sum(), "=", round(tp / pred.sum(), 3))\nprint("precision_score:", round(precision_score(y, pred), 3))\n',
      challenge: 'What would precision be if the model flagged nobody?',
    },
  ],
  apply: {
    scenario: 'Precision.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print v0.6\'s precision on week 12 with precision_score, rounded to 3 places',
        starter: PRED,
        solution: PRED + 'print(round(precision_score(y, pred), 3))\n',
        hint: 'precision_score(y, pred)',
        checks: [{ message: 'Print 0.545', outputEquals: '0.545' }],
      },
      {
        kind: 'mcq',
        prompt: 'Precision answers which question?',
        options: [
          { text: 'Of the no-shows, how many were flagged?', why: 'That\'s recall, next lesson.' },
          { text: 'Of the bookings flagged, how many really missed?' },
          { text: 'How many predictions were right overall?', why: 'That\'s accuracy.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Print the precision of Bisi\'s top-20 list: the share of the top 20 who really missed',
        starter: PROBS + 't = test.assign(p=p)\ntop = t.nlargest(20, "p")\n',
        solution: PROBS + 't = test.assign(p=p)\ntop = t.nlargest(20, "p")\nprint(top["no_show"].mean())\n',
        hint: 'top["no_show"].mean()',
        checks: [{ message: 'Print 0.6', outputEquals: '0.6' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'High precision or low precision?',
        groups: ['High', 'Low'],
        items: [
          { text: '9 of 10 flags really miss', group: 0 },
          { text: '2 of 10 flags really miss', group: 1 },
          { text: 'Few wasted calls', group: 0 },
          { text: 'Most calls go to people who\'d come', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'chidi',
        message: 'I flagged only the single riskiest booking. Precision 1.0! Best model ever?',
        prompt: 'Halima\'s best reply?',
        options: [
          { text: 'Yes, ship it.', why: 'It catches one no-show a week.' },
          { text: 'Precision can\'t be 1.0.', why: 'It can, with one correct flag.' },
          { text: 'Precision 1.0, and 36 no-shows missed. Precision alone can be gamed by flagging almost nobody.' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the list to its precision.',
        pairs: [
          ['v0.6 at 0.5 (6 of 11)', '0.545'],
          ['Top 20 (12 of 20)', '0.6'],
          ['Top 1 (1 of 1)', '1.0'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Precision by hand.',
        template: 'precision = true positives ÷ [[1]] [[2]]',
        blanks: [['all'], ['flagged']],
        distractors: ['no-shows', 'bookings'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line calculates precision wrongly?',
        language: 'python',
        lines: ['tp = ((pred == 1) & (y == 1)).sum()', 'flagged = pred.sum()', 'precision = tp / y.sum()'],
        bug: 2,
        fix: 'precision = tp / flagged',
        explanation: 'Divide by everyone flagged, not by every no-show (that would be recall).',
      },
      {
        kind: 'typeAnswer',
        prompt: 'A list flags 40 bookings and 19 really miss. What\'s its precision? (2 decimal places)',
        answers: ['0.48', '.48'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why is precision not enough on its own?',
        options: [
          { text: 'A model can score high by flagging very few, missing most no-shows' },
          { text: 'It\'s always low', why: 'It can be high.' },
          { text: 'It ignores true positives', why: 'They\'re on top of the fraction.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Think of a friend who only recommends films they\'re sure about. High precision? What might they be missing?',
    starters: ['They...', 'They might miss...'],
  },
  deepen: {
    title: 'Precision at k',
    summary: 'Precision of the top k items of a ranked list is called "precision at k". Search engines and recommendation systems live by it. Bisi\'s list has precision at 20 of 0.6.',
  },
  notes: 'Week 12 v0.6 at 0.5: precision 6/11 = 0.545. Top-20 list precision 12/20 = 0.6. 40 flagged, 19 hit -> 0.475 ~ 0.48.',
};

export default lesson;
