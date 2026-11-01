import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';
import { LR_FIT } from './code';

/** Chapter 6 · Lesson 6 — The threshold: when do we say "will miss"? */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'The threshold',
  summary: 'At the default 0.5, the classifier flags 11 bookings and catches 6 of the 37 no-shows. Bisi can make far more calls than 11. Move the line to 0.3 and the list grows to 44, catching 22. Who decides where the line goes?',
  minutes: 12,
  outcomes: [
    'Explain what a decision threshold is',
    'Move the threshold and count what changes',
    'Choose a threshold from the job, not the default',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'predict says "miss" when the chance is 0.5 or more. That 0.5 is called the threshold. Who chose it?', replies: ['scikit-learn?'] },
        { tey: 'Yes, as a default. But it\'s your decision. At 0.5 on week 12: 11 flagged, 6 of them really missed. That\'s only 6 of the 37 no-shows.', replies: ['What if I lower it?'] },
        { tey: 'At 0.3: 44 flagged, 22 really missed. You catch far more no-shows, and also call more people who\'d have come anyway.', replies: ['So which is right?'] },
        { tey: 'Depends on the job. A reminder call is cheap and friendly, so wrong calls cost little and missed no-shows cost a lot. That argues for a lower threshold.', replies: ['And if the action were expensive?'] },
        { tey: 'Then you\'d want fewer, surer flags: a higher threshold. Chapter 7 gives this trade-off proper names. For now: the threshold is a business decision, not a maths one.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Moving the line',
      caption: 'Flags and catches at three thresholds.',
      code: LR_FIT + '\np = model.predict_proba(test[feats])[:, 1]\nfor cut in [0.5, 0.3, 0.2]:\n    flagged = p >= cut\n    caught = (flagged & (test["no_show"] == 1)).sum()\n    print(cut, "flagged:", flagged.sum(), " caught:", caught, "of 37")\n',
      challenge: 'Bisi can make about 40 calls. Which threshold fits?',
    },
  ],
  apply: {
    scenario: 'The threshold.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'At a threshold of 0.3, print how many week-12 bookings are flagged',
        starter: LR_FIT + 'p = model.predict_proba(test[feats])[:, 1]\n',
        solution: LR_FIT + 'p = model.predict_proba(test[feats])[:, 1]\nprint((p >= 0.3).sum())\n',
        hint: '(p >= 0.3).sum()',
        checks: [{ message: 'Print 44', outputEquals: '44' }],
      },
      {
        kind: 'mcq',
        prompt: 'What is the threshold?',
        options: [
          { text: 'The number of features', why: 'It\'s the cut-off on the chance.' },
          { text: 'The test week', why: 'It\'s the cut-off on the chance.' },
          { text: 'The chance at which the model switches from "come" to "miss"' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'At 0.3, print how many flagged bookings really missed',
        starter: LR_FIT + 'p = model.predict_proba(test[feats])[:, 1]\nflagged = p >= 0.3\n',
        solution: LR_FIT + 'p = model.predict_proba(test[feats])[:, 1]\nflagged = p >= 0.3\nprint((flagged & (test["no_show"] == 1)).sum())\n',
        hint: '(flagged & (test["no_show"] == 1)).sum()',
        checks: [{ message: 'Print 22', outputEquals: '22' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'Lower threshold or higher?',
        groups: ['Lower (flag more)', 'Higher (flag fewer, surer)'],
        items: [
          { text: 'A cheap, friendly reminder call', group: 0 },
          { text: 'Cancelling a booking automatically', group: 1 },
          { text: 'Missing a no-show is costly', group: 0 },
          { text: 'Each flag costs a home visit', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the threshold to the week-12 result.',
        pairs: [
          ['0.5', '11 flagged, 6 caught'],
          ['0.3', '44 flagged, 22 caught'],
          ['Call everyone', '200 calls, 37 caught'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'bisi',
        message: 'At 0.3 I\'d call 44 people and 22 wouldn\'t have missed anyway. Isn\'t that wasteful?',
        prompt: 'Halima\'s best reply?',
        options: [
          { text: 'Those 22 get a friendly reminder they didn\'t need. In exchange you reach 22 of the 37 no-shows instead of 6. For a cheap call, that\'s a good trade.' },
          { text: 'Yes, stay at 0.5.', why: 'Then 31 of 37 no-shows get no call.' },
          { text: 'Call all 200.', why: 'Possible, but it uses all your time for 37 no-shows.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Who sets it.',
        template: 'The threshold is a [[1]] decision, not a [[2]] one.',
        blanks: [['business'], ['maths', 'math']],
        distractors: ['random', 'legal'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line still uses the default 0.5 threshold?',
        language: 'python',
        lines: ['p = model.predict_proba(test[feats])[:, 1]', 'flagged = model.predict(test[feats])', 'print(flagged.sum())'],
        bug: 1,
        fix: 'flagged = p >= 0.3',
        explanation: 'predict always uses 0.5. To choose your own threshold, compare the chances yourself.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'At 0.5, 6 of the 37 no-shows were caught. How many were missed by the list?',
        answers: ['31'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why is 0.5 often the wrong threshold for Bisi\'s calls?',
        options: [
          { text: '0.5 is always wrong', why: 'It depends on the job.' },
          { text: 'scikit-learn ignores it', why: 'It uses it by default.' },
          { text: 'Few bookings reach 50%, so it catches very few no-shows, while calls are cheap' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'A smoke alarm has a threshold too. Would you rather it went off too often or too rarely? Why?',
    starters: ['I\'d rather...', 'Because...'],
  },
  deepen: {
    title: 'Thresholds in medicine',
    summary: 'Screening tests face the same choice: a low threshold catches more real cases but sends more healthy people for follow-up. Where to set it depends on the cost of each kind of mistake.',
  },
  notes: 'LogisticRegression, week 12: threshold 0.5 flags 11 (6 missed); 0.3 flags 44 (22 missed of 37). Threshold 0.2 is printed by the tryIt for exploration.',
};

export default lesson;
