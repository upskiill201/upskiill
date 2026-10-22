import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';
import { CV_BASE, V8 } from './code';

const GRID = CV_BASE + V8 + 'grid = GridSearchCV(v8, {"logisticregression__C": [0.01, 0.1, 1, 10]}, cv=weeks, scoring=minutes_score)\ngrid.fit(train[feats], train["no_show"], groups=train["week"])\nresults = grid.cv_results_\n';

/** Chapter 9 · Lesson 18 — Reading a tuning result. */
const lesson: OriginalLesson = {
  key: 'l18',
  title: 'Reading a tuning result',
  summary: 'GridSearchCV hands back a table: averages, spreads and ranks for every setting. Folake wants to know if "rank 1" means anything. Tey reads it with her.',
  minutes: 12,
  outcomes: [
    'Read cv_results_: mean, spread and rank',
    'Judge whether a winner is clearly better',
    'Report a tuning result honestly',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'The grid tried four values of C. cv_results_ has a row for each. Three columns matter: mean_test_score, std_test_score and rank_test_score.', replies: ['What do they say?'] },
        { tey: 'Means, in minutes per week: 580.5, 576.4, 577.7, 577.7. Ranks: 4, 1, 2, 2. C = 1 and C = 10 tie exactly.', replies: ['So C = 0.1 is the winner.'] },
        { tey: 'It\'s rank 1. Now look at the spreads: about 75 to 77 minutes for every setting. That\'s how much a single week wobbles.', replies: ['And the gap between first and second?'] },
        { tey: '1.3 minutes a week. Tiny next to a 75-minute wobble. Honestly, the four settings perform about the same; C = 0.01 is a touch worse.', replies: ['Then why pick 0.1?'] },
        { tey: 'Because when settings tie, pick the simpler one, and a smaller C is a simpler model. The grid\'s winner and the simplicity rule agree, so it\'s an easy call.', replies: ['How do I report it?'] },
        { tey: '"Tuned C over four values with leave-one-week-out. C = 0.1 was best by about a minute a week, well within the weekly wobble: tuning C makes little difference." Short, true, useful.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'The results table',
      caption: 'Mean, spread and rank for each C.',
      code: GRID + '\ntable = pd.DataFrame({\n    "C": [0.01, 0.1, 1, 10],\n    "minutes": (-results["mean_test_score"]).round(1),\n    "spread": results["std_test_score"].round(1),\n    "rank": results["rank_test_score"],\n})\nprint(table.to_string(index=False))\n',
      challenge: 'Which two settings tie exactly?',
    },
  ],
  apply: {
    scenario: 'Reading a tuning result.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print the ranks of the four settings as a list',
        starter: GRID,
        solution: GRID + 'print(results["rank_test_score"].tolist())\n',
        hint: 'results["rank_test_score"].tolist()',
        checks: [{ message: 'Print [4, 1, 2, 2]', outputEquals: '[4, 1, 2, 2]' }],
      },
      {
        kind: 'mcq',
        prompt: 'C = 0.1 wins by 1.3 minutes; the spread is about 75. What should you conclude?',
        options: [
          { text: 'C = 0.1 is far better', why: '1.3 is tiny next to 75.' },
          { text: 'The settings perform about the same; tuning C makes little difference' },
          { text: 'The grid is broken', why: 'It worked; the settings are close.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Print the spread (std_test_score) for C = 0.1, rounded to 1 place',
        starter: GRID,
        solution: GRID + 'print(round(results["std_test_score"][1], 1))\n',
        hint: 'C = 0.1 is the second setting: index 1',
        checks: [{ message: 'Print 76.9', outputEquals: '76.9' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'Useful column or not, for judging a winner?',
        groups: ['Useful', 'Not needed here'],
        items: [
          { text: 'mean_test_score', group: 0 },
          { text: 'std_test_score', group: 0 },
          { text: 'rank_test_score', group: 0 },
          { text: 'mean_fit_time', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'folake',
        message: 'So tuning was pointless?',
        prompt: 'Halima\'s best reply?',
        options: [
          { text: 'Not pointless: we learned C hardly matters, so nobody needs to fiddle with it again, and the slightly simpler setting is safe to use.' },
          { text: 'Yes, a waste.', why: 'It answered a question.' },
          { text: 'It made a huge difference.', why: 'About a minute a week.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the column to what it tells you.',
        pairs: [
          ['mean_test_score', 'Average across the 11 weeks'],
          ['std_test_score', 'How much weeks wobble'],
          ['rank_test_score', 'Order, best first'],
          ['params', 'Which setting'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'An honest report.',
        template: 'C = 0.1 was best by about a [[1]] a week, well within the weekly [[2]].',
        blanks: [['minute'], ['wobble']],
        distractors: ['hour', 'threshold'],
      },
      {
        kind: 'findBug',
        prompt: 'Which report line overclaims?',
        lines: ['Tried four values of C with leave-one-week-out.', 'C = 0.1 ranked first by 1.3 minutes a week.', 'Tuning C transformed the model.'],
        bug: 2,
        fix: 'Tuning C made little difference.',
        explanation: 'The gap is far inside the wobble.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which two values of C tied exactly?',
        answers: ['1 and 10', '10 and 1', '1, 10'],
        placeholder: 'Two values',
      },
      {
        kind: 'mcq',
        prompt: 'When settings tie, which do you pick?',
        options: [
          { text: 'The one with the biggest C', why: 'That\'s the most complex.' },
          { text: 'The simpler one' },
          { text: 'Whichever was tried last', why: 'Order isn\'t evidence.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'When was "it doesn\'t matter much" a useful answer for you?',
    starters: ['Once...'],
  },
  deepen: {
    title: 'The one-standard-error rule',
    summary: 'A common habit: among settings whose score is within one spread (standard error) of the best, choose the simplest. It formalises "ties go to the simpler model".',
  },
  notes: 'GridSearchCV v8 C [0.01, 0.1, 1, 10], leave-one-week-out minutes: means 580.5 / 576.4 / 577.7 / 577.7; std 75.0 / 76.9 / 75.4 / 75.4; ranks [4, 1, 2, 2].',
};

export default lesson;
