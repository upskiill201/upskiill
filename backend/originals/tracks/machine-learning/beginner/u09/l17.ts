import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';
import { CV_BASE, V8 } from './code';

/** Chapter 9 · Lesson 17 — Common tuning mistakes. */
const lesson: OriginalLesson = {
  key: 'l17',
  title: 'Common tuning mistakes',
  summary: 'Tuning on the wrong measure, preparing data outside the folds, trying hundreds of settings and trusting the best. Five beliefs about tuning, tested against this chapter\'s numbers.',
  minutes: 12,
  outcomes: [
    'Spot the common tuning mistakes',
    'Tune on the measure that matters',
    'Know when a "best" setting is just noise',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'Tuning on accuracy is fine; it\'s the default.',
          isFact: false,
          explain: 'Myth. Accuracy prefers models that flag almost nobody (Chapter 7). Tune on the measure you\'ll be judged by: here, minutes lost.',
        },
        {
          text: 'The more settings you try, the more likely the "best" one is just lucky.',
          isFact: true,
          explain: 'Fact. Even cross-validation has noise. Try 4 values of C and the best wins by about a minute a week; try 400 and one will win by luck.',
        },
        {
          text: 'Scaling before cross-validation is harmless.',
          isFact: false,
          explain: 'Myth. It leaks each held-out week into the scaler. Keep every learning step inside the pipeline.',
        },
        {
          text: 'A setting that wins by less than the week-to-week wobble isn\'t clearly better.',
          isFact: true,
          explain: 'Fact. v0.8\'s weekly minutes wobble by about 75. A 1-minute win is a tie in practice.',
        },
        {
          text: 'Once tuned, a model never needs re-tuning.',
          isFact: false,
          explain: 'Myth. When the data changes (a new clinic, a new reminder system), the best settings can change too. Re-check on fresh weeks.',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Tuning on the wrong measure',
      caption: 'Accuracy vs minutes for the same grid of depths.',
      code: CV_BASE + '\nfor depth in [1, 2, 5]:\n    tree = DecisionTreeClassifier(max_depth=depth, random_state=42)\n    acc = cross_val_score(tree, train[feats], train["no_show"], groups=train["week"], cv=weeks)\n    mins = cross_val_score(tree, train[feats], train["no_show"], groups=train["week"], cv=weeks, scoring=minutes_score)\n    print(depth, "accuracy", round(acc.mean(), 3), "minutes", round(-mins.mean(), 1))\n',
      challenge: 'Do the two measures agree on the best depth?',
    },
  ],
  apply: {
    scenario: 'Common tuning mistakes.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Cross-validate a depth-1 tree by week on accuracy (the default) and print the average, rounded to 3 places',
        starter: CV_BASE + 'tree = DecisionTreeClassifier(max_depth=1, random_state=42)\n',
        solution: CV_BASE + 'tree = DecisionTreeClassifier(max_depth=1, random_state=42)\nacc = cross_val_score(tree, train[feats], train["no_show"], groups=train["week"], cv=weeks)\nprint(round(acc.mean(), 3))\n',
        hint: 'Leave out scoring= to get accuracy',
        checks: [{ message: 'Print the average accuracy', expr: 'round(acc.mean(), 3) > 0.8' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Myth', 'Fact'],
        items: [
          { text: 'Tune on accuracy by default', group: 0 },
          { text: 'More settings, more luck', group: 1 },
          { text: 'Scale before folding', group: 0 },
          { text: 'Wins inside the wobble are ties', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why tune on minutes lost instead of accuracy?',
        options: [
          { text: 'Minutes are bigger numbers', why: 'Size isn\'t the reason.' },
          { text: 'Accuracy can\'t be cross-validated', why: 'It can; it\'s the default.' },
          { text: 'It\'s what the clinic cares about; accuracy rewards flagging nobody' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Cross-validate a depth-1 tree by week on minutes and print the average, rounded to 1 place',
        starter: CV_BASE + 'tree = DecisionTreeClassifier(max_depth=1, random_state=42)\n',
        solution: CV_BASE + 'tree = DecisionTreeClassifier(max_depth=1, random_state=42)\nmins = cross_val_score(tree, train[feats], train["no_show"], groups=train["week"], cv=weeks, scoring=minutes_score)\nprint(round(-mins.mean(), 1))\n',
        hint: 'scoring=minutes_score, then -mins.mean()',
        checks: [{ message: 'Print 659.5', outputEquals: '659.5' }],
      },
      {
        kind: 'chatReply',
        from: 'chidi',
        message: 'I\'ll try 500 values of C. The best one must be great.',
        prompt: 'Miracle\'s best reply?',
        options: [
          { text: 'The best of 500 will win partly by luck. Four values already showed C barely matters. Spend the time on new clues instead.' },
          { text: 'Try 5,000.', why: 'More luck, not more truth.' },
          { text: 'C can only be 1.', why: 'It can be anything positive.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the mistake to its fix.',
        pairs: [
          ['Tuning on accuracy', 'Tune on the clinic\'s measure'],
          ['Scaling before folding', 'Scaler inside the pipeline'],
          ['Hundreds of settings', 'A few sensible values'],
          ['Tuning once forever', 'Re-check on fresh weeks'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Measure first.',
        language: 'python',
        template: 'cross_val_score(model, X, y, groups=train["week"], cv=weeks, [[1]]=[[2]])',
        blanks: [['scoring'], ['minutes_score']],
        distractors: ['measure', '"accuracy"'],
      },
      {
        kind: 'findBug',
        prompt: 'Which conclusion is noise-chasing?',
        lines: ['C = 0.1 averages 576.4 minutes a week.', 'C = 1 averages 577.7.', 'So C = 0.1 is clearly better.'],
        bug: 2,
        fix: 'So they tie; either is fine.',
        explanation: 'A 1.3-minute gap is tiny next to a 75-minute weekly wobble.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Roughly how much do v0.8\'s weekly minutes wobble (standard deviation)?',
        answers: ['75', '75.4', 'about 75'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'When should you re-tune?',
        options: [
          { text: 'Every morning', why: 'Only when there\'s reason and fresh data.' },
          { text: 'Never', why: 'Data changes.' },
          { text: 'When the data changes, checked on fresh weeks' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Which tuning mistake feels most tempting to you, and why?',
    starters: ['The most tempting...'],
  },
  deepen: {
    title: 'Overfitting the validation set',
    summary: 'Try enough settings and you can overfit even the cross-validation scores. That\'s why a locked test week, opened once, is still needed at the end.',
  },
  notes: 'Leave-one-week-out: depth-1 tree accuracy mean > 0.8, minutes mean 659.5 (7255 total). C grid means 580.5 / 576.4 / 577.7 / 577.7; v0.8 weekly std 75.4.',
};

export default lesson;
