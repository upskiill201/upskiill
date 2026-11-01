import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';
import { FOREST, VAL_BASE, VAL_MINUTES } from './code';

/** Chapter 10 · Lesson 5 — Checkpoint 1: wobble, forests, settings. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: from one tree to a forest',
  summary: 'Wobbly trees, how a forest combines them, building one in scikit-learn and choosing how many trees. Check you can grow a forest and judge it fairly.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Explain and build a random forest', 'Judge forest sizes without over-reading one split'],
  learn: [
    {
      kind: 'text',
      html: '<p><strong>So far.</strong> One tree wobbles with small changes in the data. A forest grows many trees on different draws, with random features at each split, and averages them. On weeks 10 and 11, a 100-tree depth-5 forest loses 1,260 minutes: better than any single tree, a touch behind v0.8. More trees steady it, up to a point.</p>',
    },
  ],
  apply: {
    scenario: 'Checkpoint 1: from one tree to a forest.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Grow a single tree as a "forest" of 1 (depth 5) and print its validation minutes lost',
        starter: VAL_BASE,
        solution: VAL_BASE + 'forest = RandomForestClassifier(n_estimators=1, max_depth=5, random_state=42).fit(train[feats], train["no_show"])\n' + VAL_MINUTES('forest'),
        hint: 'n_estimators=1',
        checks: [{ message: 'Print 1475', outputEquals: '1475' }],
      },
      {
        kind: 'mcq',
        prompt: 'How does a forest turn 100 trees into one answer?',
        options: [
          { text: 'It uses the best tree', why: 'It combines all of them.' },
          { text: 'It averages the trees\' chances' },
          { text: 'It uses the first tree', why: 'All trees count.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Fit the standard forest (100 trees, depth 5) on weeks 1 to 9 and print its training accuracy, rounded to 3 places',
        starter: VAL_BASE + FOREST,
        solution: VAL_BASE + FOREST + 'forest.fit(train[feats], train["no_show"])\nprint(round(forest.score(train[feats], train["no_show"]), 3))\n',
        hint: 'forest.score(train[feats], train["no_show"])',
        checks: [{ message: 'Print 0.857', outputEquals: '0.857' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'Does it make a forest\'s trees differ?',
        groups: ['Makes trees differ', 'Doesn\'t'],
        items: [
          { text: 'Bootstrap draws', group: 0 },
          { text: 'Random features per split', group: 0 },
          { text: 'random_state=42', group: 1 },
          { text: 'max_depth=5', group: 1 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Grow a 200-tree forest (depth 5) and print its validation minutes lost',
        starter: VAL_BASE,
        solution: VAL_BASE + 'forest = RandomForestClassifier(n_estimators=200, max_depth=5, random_state=42).fit(train[feats], train["no_show"])\n' + VAL_MINUTES('forest'),
        hint: 'n_estimators=200',
        checks: [{ message: 'Print 1270', outputEquals: '1270' }],
      },
      {
        kind: 'chatReply',
        from: 'emmanuel',
        message: 'Why does the forest need random_state?',
        prompt: 'Halima\'s best reply?',
        options: [
          { text: 'The draws and feature choices are random. Fixing random_state means we all get the same forest, so results can be checked.' },
          { text: 'It makes it more accurate.', why: 'It makes it repeatable.' },
          { text: 'It doesn\'t need it.', why: 'Without it, results change every run.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the idea to the lesson.',
        pairs: [
          ['Five draws, five scores', 'Why one tree wobbles'],
          ['Random features per split', 'Many trees, one vote'],
          ['n_estimators and max_depth', 'Forests in scikit-learn'],
          ['Diminishing returns', 'How many trees?'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The standard forest.',
        language: 'python',
        template: 'RandomForestClassifier([[1]]=100, max_depth=5, [[2]]=42)',
        blanks: [['n_estimators'], ['random_state']],
        distractors: ['n_trees', 'seed'],
      },
      {
        kind: 'findBug',
        prompt: 'Which claim is wrong?',
        lines: ['A forest is steadier than one tree.', 'More trees cost more time.', 'More trees make a forest overfit.'],
        bug: 2,
        fix: 'More trees make a forest steadier, not more overfit.',
        explanation: 'Overfitting comes from depth and leaf size.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'On weeks 10 and 11, which forest size did best? (number of trees)',
        answers: ['50', 'fifty'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'What surprised you most about forests so far?',
    starters: ['I was surprised...'],
  },
  notes: 'Checkpoint for Chapter 10 lessons 1-4. RF depth 5 weeks 1-9 -> 10-11: 1 tree 1475, 100 trees train 0.857, 200 trees 1270, best 50 trees 1205.',
};

export default lesson;
