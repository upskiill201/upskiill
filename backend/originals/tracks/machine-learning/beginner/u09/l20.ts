import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';
import { CV_BASE, F7 } from './code';

const SCORE = (model: string) => `scores = cross_val_score(${model}, train[feats], train["no_show"], groups=train["week"], cv=weeks, scoring=minutes_score)\n`;

/** Chapter 9 · Lesson 20 — Chapter Challenge: the eleven-week league table. Cliffhanger: many trees (Chapter 10). */
const lesson: OriginalLesson = {
  key: 'l20',
  title: 'Chapter Challenge: the eleven-week table',
  summary: 'Miracle\'s sign-off needs one table: every model the team has built, judged the same way over 11 weeks. Build it. Then Chidi, outvoted by the evidence, has one more idea.',
  minutes: 15,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Compare every model honestly over 11 weeks', 'Use every Chapter 9 skill together'],
  learn: [
    {
      kind: 'story',
      title: 'The table',
      beats: [
        { speaker: 'miracle', text: 'One table. Doing nothing, v0.7, v0.8, v0.9, the best tree and Chidi\'s tree. Same folds, same measure.' },
        { speaker: 'halima', text: 'Minutes lost over 11 weeks: doing nothing 8,040. Chidi\'s tree 7,490. Best tree 6,615. v0.7 6,540. v0.8 6,355. v0.9 6,340.' },
        { speaker: 'miracle', text: 'Signed. v0.9 goes to the clinics.' },
        { speaker: 'narrator', text: 'Chidi stares at the table for a long time.' },
        { speaker: 'chidi', text: 'One tree overfits. Fine. But each tree overfits differently, right? What if a hundred trees voted? Their mistakes might cancel out.' },
        { speaker: 'miracle', text: 'That\'s not a bad idea. It has a name.' },
        { speaker: 'tey', text: 'That\'s Chapter 9: overfitting, underfitting, the gap, the sweet spot, cross-validation, tuning, grid search, more data, simplicity, honest tuning, learning curves and reading results. Chapter 10 grows Chidi\'s idea: random forests.' },
      ],
    },
  ],
  apply: {
    scenario: 'Chapter 9 challenge: the eleven-week league table.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Row 1: print the total minutes lost by doing nothing over weeks 1 to 11',
        starter: CV_BASE,
        solution: CV_BASE + 'print(20 * train["no_show"].sum())\n',
        hint: '20 minutes for every no-show',
        checks: [{ message: 'Print 8040', outputEquals: '8040' }],
      },
      {
        kind: 'mcq',
        prompt: 'Why must every row use the same folds and measure?',
        options: [
          { text: 'Otherwise the differences could come from the test, not the models' },
          { text: 'It looks tidier', why: 'It\'s about fairness.' },
          { text: 'scikit-learn requires it', why: 'It\'s our rule.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Row 2: cross-validate Chidi\'s unlimited tree (seven features) and print its total minutes',
        starter: CV_BASE + F7 + 'chidi = DecisionTreeClassifier(random_state=42)\n',
        solution: CV_BASE + F7 + 'chidi = DecisionTreeClassifier(random_state=42)\n' + SCORE('chidi') + 'print(-scores.sum())\n',
        hint: '-scores.sum()',
        checks: [{ message: 'Print 7490', outputEquals: '7490' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'Better or worse than v0.7 over 11 weeks?',
        groups: ['Better than v0.7', 'Worse than v0.7'],
        items: [
          { text: 'v0.8', group: 0 },
          { text: 'v0.9', group: 0 },
          { text: 'Best tree (depth 5)', group: 1 },
          { text: 'Chidi\'s tree', group: 1 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Row 3: cross-validate v0.9 (v0.8 with C = 0.1) and print its total minutes',
        starter: CV_BASE + 'v9 = make_pipeline(SimpleImputer(strategy="median"), StandardScaler(), LogisticRegression(C=0.1))\n',
        solution: CV_BASE + 'v9 = make_pipeline(SimpleImputer(strategy="median"), StandardScaler(), LogisticRegression(C=0.1))\n' + SCORE('v9') + 'print(-scores.sum())\n',
        hint: 'Same as Chidi\'s row',
        checks: [{ message: 'Print 6340', outputEquals: '6340' }],
      },
      {
        kind: 'chatReply',
        from: 'chidi',
        message: 'What if a hundred trees voted? Their mistakes might cancel out.',
        prompt: 'Miracle\'s best reply?',
        options: [
          { text: 'Trees are banned.', why: 'Forests are worth testing.' },
          { text: 'Ship it without testing.', why: 'Same rules as everything else.' },
          { text: 'That\'s a real method, a random forest. And now we know how to judge it: eleven weeks, same measure, against v0.9.' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the model to its 11-week minutes.',
        pairs: [
          ['Doing nothing', '8,040'],
          ['Chidi\'s tree', '7,490'],
          ['v0.8', '6,355'],
          ['v0.9', '6,340'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The chapter in one line.',
        template: 'Judge models on [[1]] data, with [[2]] across every week.',
        blanks: [['unseen'], ['cross-validation']],
        distractors: ['training', 'accuracy'],
      },
      {
        kind: 'findBug',
        prompt: 'Which table row would be unfair?',
        lines: ['v0.8: leave-one-week-out, minutes.', 'Best tree: leave-one-week-out, minutes.', 'Chidi\'s tree: training-week accuracy.'],
        bug: 2,
        fix: 'Chidi\'s tree: leave-one-week-out, minutes.',
        explanation: 'Every row needs the same folds and measure.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Over 11 weeks, how many minutes does v0.9 save compared with doing nothing?',
        answers: ['1700', '1,700'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Chapter 9 done: you can now tell real improvements from lucky ones. Where else would an "eleven-week table" help you?',
    starters: ['I\'d use it for...'],
  },
  notes: 'Chapter 9 challenge. Leave-one-week-out totals: nothing 8040; Chidi\'s tree (7 features) 7490; best tree (depth 5) 6615; v0.7 6540; v0.8 6355; v0.9 (C = 0.1) 6340. Cliffhanger: Chidi suggests many trees voting -> Chapter 10 (random forests).',
};

export default lesson;
