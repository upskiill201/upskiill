import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';
import { BASE, PRED, PROBS } from './code';

/** Chapter 7 · Lesson 7 — Recall. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'Recall',
  summary: 'Folake asks the other question: "Of all the patients who missed, how many did we warn about?" That\'s recall. Precision and recall side by side, on the same week 12.',
  minutes: 11,
  outcomes: [
    'Explain recall in plain words',
    'Calculate recall with recall_score',
    'Tell precision and recall apart',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Two questions, one week',
      before: {
        label: 'Precision (Bisi\'s question)',
        text: 'Of the bookings we flagged, how many missed?\nTrue positives ÷ flagged\n6 ÷ 11 = 0.545\nAbout wasted calls.',
      },
      after: {
        label: 'Recall (Folake\'s question)',
        text: 'Of the patients who missed, how many did we flag?\nTrue positives ÷ all no-shows\n6 ÷ 37 = 0.162\nAbout empty chairs.',
      },
      notes: [
        'Same top number, different bottom number.',
        'v0.6 at 0.5 has decent precision but poor recall: its calls are good, but it warns about only 1 no-show in 6.',
        '"Everyone comes" has recall 0. That\'s what accuracy couldn\'t show.',
      ],
    },
    {
      kind: 'tryIt',
      title: 'Recall, two ways',
      caption: 'By hand and with scikit-learn.',
      code: PRED + '\ntp = ((pred == 1) & (y == 1)).sum()\nprint("By hand:", tp, "/", y.sum(), "=", round(tp / y.sum(), 3))\nprint("recall_score:", round(recall_score(y, pred), 3))\nprint("Precision:", round(precision_score(y, pred), 3))\n',
      challenge: 'What would recall be if the model flagged everyone?',
    },
  ],
  apply: {
    scenario: 'Recall.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print v0.6\'s recall on week 12 with recall_score, rounded to 3 places',
        starter: PRED,
        solution: PRED + 'print(round(recall_score(y, pred), 3))\n',
        hint: 'recall_score(y, pred)',
        checks: [{ message: 'Print 0.162', outputEquals: '0.162' }],
      },
      {
        kind: 'mcq',
        prompt: 'Recall answers which question?',
        options: [
          { text: 'Of the flagged, how many missed?', why: 'That\'s precision.' },
          { text: 'How many flags were made?', why: 'That\'s just a count.' },
          { text: 'Of the patients who missed, how many did we flag?' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Print the recall of Bisi\'s top-20 list: no-shows in the top 20 divided by all week-12 no-shows, rounded to 3',
        starter: PROBS + 't = test.assign(p=p)\ncaught = t.nlargest(20, "p")["no_show"].sum()\n',
        solution: PROBS + 't = test.assign(p=p)\ncaught = t.nlargest(20, "p")["no_show"].sum()\nprint(round(caught / y.sum(), 3))\n',
        hint: 'caught / y.sum()',
        checks: [{ message: 'Print 0.324', outputEquals: '0.324' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'Precision or recall?',
        groups: ['Precision', 'Recall'],
        items: [
          { text: 'Divide by everyone flagged', group: 0 },
          { text: 'Divide by everyone who missed', group: 1 },
          { text: 'How good are my calls?', group: 0 },
          { text: 'How many empty chairs did we see coming?', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'folake',
        message: 'Precision 0.55 sounds fine. Why are you worried?',
        prompt: 'Halima\'s best reply?',
        options: [
          { text: 'I\'m not.', why: 'Recall is very low.' },
          { text: 'Because recall is 0.16: we warn about only 6 of 37 no-shows. The calls are decent, but most empty chairs still surprise us.' },
          { text: 'Precision should be 1.0.', why: 'The worry is recall.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the model to its recall on week 12.',
        pairs: [
          ['Everyone comes', '0'],
          ['v0.6 at 0.5', '0.162'],
          ['Top 20 list', '0.324'],
          ['Flag everyone', '1.0'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Recall by hand.',
        template: 'recall = true positives ÷ all [[1]] who really [[2]]',
        blanks: [['patients'], ['missed']],
        distractors: ['flags', 'came'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line gets recall wrong?',
        language: 'python',
        lines: ['tp = ((pred == 1) & (y == 1)).sum()', 'recall = tp / pred.sum()', 'print(recall)'],
        bug: 1,
        fix: 'recall = tp / y.sum()',
        explanation: 'Recall divides by all real no-shows; dividing by flags gives precision.',
      },
      {
        kind: 'writeCode',
        prompt: 'Print the recall of "everyone comes": predict 0 for every week-12 booking',
        starter: BASE + 'everyone = [0] * len(y)\n',
        solution: BASE + 'everyone = [0] * len(y)\nprint(recall_score(y, everyone))\n',
        hint: 'recall_score(y, everyone)',
        checks: [{ message: 'Print 0.0', outputEquals: '0.0' }],
      },
      {
        kind: 'mcq',
        prompt: 'Flagging everyone gives recall 1.0. What\'s the catch?',
        options: [
          { text: 'Precision falls to 0.185: Bisi would call 200 people to reach 37' },
          { text: 'There\'s no catch', why: 'Look at the number of calls.' },
          { text: 'Recall can\'t be 1.0', why: 'Flag everyone and you catch everyone.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'For a cancer screening test, would you rather have high precision or high recall? Why?',
    starters: ['I\'d want high...', 'Because...'],
  },
  deepen: {
    title: 'Other names',
    summary: 'Recall is also called sensitivity (in medicine) or the true positive rate. Precision is also called positive predictive value. Same fractions, different fields.',
  },
  notes: 'Week 12 v0.6 at 0.5: recall 6/37 = 0.162, precision 0.545. Top 20: recall 12/37 = 0.324. Everyone comes: recall 0. Flag everyone: recall 1, precision 37/200 = 0.185.',
};

export default lesson;
