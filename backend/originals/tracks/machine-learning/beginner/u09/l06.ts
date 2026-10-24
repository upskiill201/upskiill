import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';
import { DATA, F6, IMPORTS, MINUTES, SPLIT, V8 } from './code';

const BASE = IMPORTS + DATA + F6 + SPLIT + MINUTES + V8;
const ONE_WEEK = 'fold_train = train[train["week"] != 3]\nfold_val = train[train["week"] == 3]\nv8.fit(fold_train[feats], fold_train["no_show"])\nflags = (v8.predict_proba(fold_val[feats])[:, 1] >= 0.2).astype(int)\n';

/** Chapter 9 · Lesson 6 — Cross-validation. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Cross-validation',
  summary: 'Two validation weeks crowned depth 6. Would two different weeks agree? Cross-validation gives every week a turn as the validation week, so one lucky pair can\'t decide. Tey explains.',
  minutes: 12,
  outcomes: [
    'Explain cross-validation in plain words',
    'Run one fold by hand',
    'See why many folds beat one split',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Weeks 10 and 11 said depth 6 is best. But that\'s 400 bookings and 86 no-shows. A few patients either way could change the winner.', replies: ['So use more validation weeks?'] },
        { tey: 'Use all of them, in turns. Hold out week 1, train on weeks 2 to 11, score week 1. Then hold out week 2, train on the rest, score week 2. And so on, 11 times.', replies: ['Every week gets a turn?'] },
        { tey: 'Exactly once. That\'s cross-validation. Each turn is a "fold". Here, one fold per week: leave-one-week-out.', replies: ['And week 12?'] },
        { tey: 'Still locked away. Cross-validation only uses the 11 learning weeks. Week 12 stays the one-time test.', replies: ['What does it say about depth?'] },
        { tey: 'Averaged over 11 weeks, depth 5 loses the fewest minutes, not depth 6. And logistic regression beats every depth. One split had picked a lucky winner.', replies: ['Is there a catch?'] },
        { tey: 'It costs 11 fits instead of 1. With 2,200 bookings that\'s a second or two. Worth it.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Every week takes a turn',
      caption: 'Leave-one-week-out by hand, for v0.8.',
      code: BASE + '\nfor week in range(1, 12):\n    fold_train = train[train["week"] != week]\n    fold_val = train[train["week"] == week]\n    v8.fit(fold_train[feats], fold_train["no_show"])\n    flags = (v8.predict_proba(fold_val[feats])[:, 1] >= 0.2).astype(int)\n    print("Week", week, minutes(flags, fold_val["no_show"]))\n',
      challenge: 'Add up all 11 numbers. How do the weeks vary?',
    },
  ],
  apply: {
    scenario: 'Cross-validation.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Run one fold by hand: hold out week 3 and print v0.8\'s minutes lost on it',
        starter: BASE + 'fold_train = train[train["week"] != 3]\nfold_val = train[train["week"] == 3]\n',
        solution: BASE + ONE_WEEK + 'print(minutes(flags, fold_val["no_show"]))\n',
        hint: 'Fit on fold_train, flag fold_val at 0.2, minutes',
        checks: [{ message: 'Print 645', outputEquals: '645' }],
      },
      {
        kind: 'mcq',
        prompt: 'What is cross-validation?',
        options: [
          { text: 'Testing on week 12 many times', why: 'Week 12 stays locked.' },
          { text: 'Giving each part of the learning data a turn as the validation set, then averaging' },
          { text: 'Training on all the data twice', why: 'Each fold holds part out.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Hold out week 5 instead and print v0.8\'s minutes lost',
        starter: BASE + 'fold_train = train[train["week"] != 5]\nfold_val = train[train["week"] == 5]\n',
        solution: BASE + ONE_WEEK.replace(/3/g, '5') + 'print(minutes(flags, fold_val["no_show"]))\n',
        hint: 'Same steps, week 5',
        checks: [{ message: 'Print 450', outputEquals: '450' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'In leave-one-week-out, is week 12 used?',
        groups: ['Used in cross-validation', 'Kept locked'],
        items: [
          { text: 'Week 1', group: 0 },
          { text: 'Week 7', group: 0 },
          { text: 'Week 11', group: 0 },
          { text: 'Week 12', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'chidi',
        message: 'Week 3 cost 645 minutes and week 5 cost 450. Which is the real score?',
        prompt: 'Miracle\'s best reply?',
        options: [
          { text: 'Week 5, it\'s better.', why: 'Picking the nicer week is cherry-picking.' },
          { text: 'Neither: there\'s a bug.', why: 'Weeks just differ.' },
          { text: 'Both. Weeks really do vary. That\'s exactly why we average over all 11 instead of trusting one.' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the term to its meaning.',
        pairs: [
          ['Fold', 'One turn: train on the rest, score the held-out part'],
          ['Leave-one-week-out', 'One fold per week'],
          ['Validation split', 'A single held-out part'],
          ['Test week', 'Opened once, at the end'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'One fold.',
        language: 'python',
        template: 'fold_train = train[train["week"] [[1]] 3]\nfold_val = train[train["week"] [[2]] 3]',
        blanks: [['!='], ['==']],
        distractors: ['<', '>='],
      },
      {
        kind: 'findBug',
        prompt: 'Which line breaks cross-validation?',
        language: 'python',
        lines: ['for week in range(1, 12):', '    fold_train = train[train["week"] != week]', '    v8.fit(train[feats], train["no_show"])'],
        bug: 2,
        fix: '    v8.fit(fold_train[feats], fold_train["no_show"])',
        explanation: 'Fitting on all of train includes the held-out week.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'With leave-one-week-out on weeks 1 to 11, how many folds are there?',
        answers: ['11', 'eleven'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Across 11 weeks, which tree depth did best?',
        options: [
          { text: 'Depth 6', why: 'That was only weeks 10 and 11.' },
          { text: 'Depth 5, not the depth 6 that two weeks had picked' },
          { text: 'No limit', why: 'That\'s the worst.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'Would you judge a restaurant from one visit, or several? How is that like cross-validation?',
    starters: ['I\'d...'],
  },
  deepen: {
    title: 'Why by week?',
    summary: 'Splitting by week keeps each fold honest about time: the model never sees any booking from the week it\'s judged on. Random folds would mix bookings from the same rainy Monday into both sides.',
  },
  notes: 'Leave-one-week-out on weeks 1-11, v0.8 at 0.2, minutes per held-out week: 565, 555, 645, 600, 450, 610, 650, 475, 565, 720, 520 (total 6355). Tree depth by LOWO mean: 2 629.1, 3 691.4, 4 645.9, 5 601.4, 6 622.7, 8 648.2.',
};

export default lesson;
