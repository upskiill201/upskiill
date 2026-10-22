import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';
import { SETUP } from './code';

/** Chapter 4 · Lesson 17 — Common testing mistakes. */
const lesson: OriginalLesson = {
  key: 'l17',
  title: 'Common testing mistakes',
  summary: 'Every mistake in this chapter has a famous cousin out in the world. Five beliefs people hold about testing models, tested, and a bug to fix that gives a "perfect" score.',
  minutes: 12,
  outcomes: [
    'Recognise the most common testing mistakes',
    'Fix a feature list that includes the answer',
    'Explain why a perfect score is a warning sign',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'A perfect score means you\'ve built a perfect model.',
          isFact: false,
          explain: 'Myth. On real problems like no-shows, a perfect score almost always means a leak: the answer got in somewhere.',
        },
        {
          text: 'Putting the label in the feature list by mistake is a real, common bug.',
          isFact: true,
          explain: 'Fact. One copy-paste and no_show is a feature. The predictor then gets 100%, and the bug looks like a breakthrough.',
        },
        {
          text: 'A bigger test set always fixes a leak.',
          isFact: false,
          explain: 'Myth. A leak is in the method. More test rows just give a more precise wrong answer.',
        },
        {
          text: 'Scores on a test set from the same weeks as training can look better than real life.',
          isFact: true,
          explain: 'Fact. Real use is always on the future. Mixing weeks can hide changes over time.',
        },
        {
          text: 'Once a model is tested, you never need to test it again.',
          isFact: false,
          explain: 'Myth. Clinics change. Chapter 13 covers monitoring: re-checking the score on each new week.',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'The "perfect" bug',
      caption: 'One wrong name in the feature list.',
      code: SETUP + '\nbad = feats + ["no_show"]\nt = test.assign(risk=knn_risk(train, test, bad))\nprint("With the answer as a feature:", t.nlargest(20, "risk")["no_show"].sum(), "of 20")\n\nt = test.assign(risk=knn_risk(train, test, feats))\nprint("Without it:", t.nlargest(20, "risk")["no_show"].sum(), "of 20")\n',
      challenge: 'Why can\'t this "perfect" predictor work the evening before?',
    },
  ],
  apply: {
    scenario: 'Testing mistakes.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'This feature list includes the answer. Fix it, then print how many of the top 20 week-12 bookings missed',
        starter: SETUP + 'bad = ["wait_days", "distance_km", "previous_no_shows", "sms_reminder", "no_show"]\n',
        solution: SETUP + 'good = ["wait_days", "distance_km", "previous_no_shows", "sms_reminder"]\nt = test.assign(risk=knn_risk(train, test, good))\nprint(t.nlargest(20, "risk")["no_show"].sum())\n',
        hint: 'Remove "no_show" from the list, then score as usual',
        checks: [{ message: 'Print 12', outputEquals: '12' }],
      },
      {
        kind: 'mcq',
        prompt: 'A no-show model scores 100% on its test week. What\'s your first thought?',
        options: [
          { text: 'Something leaked: find it' },
          { text: 'Ship it', why: 'On a real problem like this, 100% almost always means a leak.' },
          { text: 'The test week was easy', why: 'Look for a leak first.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Mistake or good practice?',
        groups: ['Mistake', 'Good practice'],
        items: [
          { text: 'no_show in the features', group: 0 },
          { text: 'A locked test week', group: 1 },
          { text: 'Celebrating a perfect score', group: 0 },
          { text: 'Re-checking on each new week', group: 1 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Show the bug: score the bad list and print how many of the top 20 missed',
        starter: SETUP + 'bad = feats + ["no_show"]\n',
        solution: SETUP + 'bad = feats + ["no_show"]\nt = test.assign(risk=knn_risk(train, test, bad))\nprint(t.nlargest(20, "risk")["no_show"].sum())\n',
        hint: 'Same scoring lines, with bad instead of feats',
        checks: [{ message: 'Print 20', outputEquals: '20' }],
      },
      {
        kind: 'chatReply',
        from: 'emmanuel',
        message: 'My test set has 2,000 bookings now, so my score is definitely right.',
        prompt: 'Halima\'s best reply?',
        options: [
          { text: 'Yes, size fixes everything.', why: 'Size can\'t fix a leak.' },
          { text: 'Make it 4,000.', why: 'Check for leaks first.' },
          { text: 'A big test set makes the number steadier, not honest. If something leaked, it\'s a very precise wrong number.' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the mistake to its fix.',
        pairs: [
          ['Label as a feature', 'Remove it from the list'],
          ['Choosing k on the test week', 'Use a validation set'],
          ['Random split on dated data', 'Split by time'],
          ['Tested once, years ago', 'Re-check every week'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The warning.',
        template: 'On a real problem, a [[1]] score usually means a [[2]].',
        blanks: [['perfect'], ['leak']],
        distractors: ['low', 'bug-free'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line is the mistake?',
        language: 'python',
        lines: ['feats = ["wait_days", "sms_reminder"]', 'feats.append("no_show")', 't = test.assign(risk=knn_risk(train, test, feats))'],
        bug: 1,
        fix: 'Delete it: no_show is the answer',
        explanation: 'The label can never be a feature.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'With no_show as a feature, how many of the top 20 missed?',
        answers: ['20', 'twenty'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why test again every new week?',
        options: [
          { text: 'To get a higher number', why: 'To check it\'s still working, high or low.' },
          { text: 'Clinics change, so a model that was good can quietly get worse' },
          { text: 'It\'s a legal rule', why: 'It\'s good practice, not law.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'Which of these mistakes do you think you\'d be most likely to make, and what would catch it?',
    starters: ['I\'d most likely...', 'It would be caught by...'],
  },
  deepen: {
    title: 'Too good to be true, in the news',
    summary: 'Medical imaging research has had cases where a model "learned" the hospital\'s scanner or a ruler in the photo instead of the illness. Same lesson: ask what the model could be seeing that it shouldn\'t.',
  },
  notes: 'Week 12, k = 15: with no_show as a feature, top 20 = 20 (accuracy 1.0); without, 12. Imaging shortcut examples are widely discussed in ML literature; stated generally, no specific study named.',
};

export default lesson;
