import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';
import { FOREST, TEST_BASE, VAL_BASE, VAL_MINUTES } from './code';

/** Chapter 10 · Lesson 15 — Checkpoint 3: size, tuning, simplicity, choosing. */
const lesson: OriginalLesson = {
  key: 'l15',
  title: 'Checkpoint: choosing a model',
  summary: 'Size and speed, tuning a forest, when simple wins and choosing for the clinic. Check you can make a model decision you\'d defend to a board.',
  minutes: 13,
  milestone: 'CHECKPOINT',
  outcomes: ['Compare models on more than one number', 'Defend a model choice with evidence'],
  learn: [
    {
      kind: 'compare',
      title: 'The two finalists',
      before: {
        label: 'Best forest (depth 3, 100 trees)',
        text: '11 weeks: 6,505 minutes\nThousands of leaves\nHard to explain one patient',
      },
      after: {
        label: 'v0.9 (logistic regression)',
        text: '11 weeks: 6,340 minutes\n6 coefficients, about 1.7 KB\n"Four past misses, no reminder"',
      },
      notes: ['v0.9 wins on evidence, size and explanation. The forest stays as a cross-check.'],
    },
  ],
  apply: {
    scenario: 'Checkpoint 3: choosing a model.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Fit a depth-4 forest (100 trees) on weeks 1 to 9 and print its validation minutes lost',
        starter: VAL_BASE,
        solution: VAL_BASE + 'forest = RandomForestClassifier(n_estimators=100, max_depth=4, random_state=42).fit(train[feats], train["no_show"])\n' + VAL_MINUTES('forest'),
        hint: 'max_depth=4',
        checks: [{ message: 'Print 1305', outputEquals: '1305' }],
      },
      {
        kind: 'mcq',
        prompt: 'Why does v0.9 beat the forests on this data?',
        options: [
          { text: 'Forests are broken', why: 'They\'re fine on other data.' },
          { text: 'Luck', why: 'Eleven weeks make luck unlikely.' },
          { text: 'The pattern is simple and the data small, which suits logistic regression' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Fit the standard forest on weeks 1 to 11 and print the importance of wait_days, rounded to 2 places',
        starter: TEST_BASE + FOREST + 'forest.fit(train[feats], train["no_show"])\n',
        solution: TEST_BASE + FOREST + 'forest.fit(train[feats], train["no_show"])\nprint(round(forest.feature_importances_[0], 2))\n',
        hint: 'wait_days is the first feature: feature_importances_[0]',
        checks: [{ message: 'Print 0.23', outputEquals: '0.23' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'Good reason or weak reason to choose a model?',
        groups: ['Good reason', 'Weak reason'],
        items: [
          { text: 'Wins over 11 weeks', group: 0 },
          { text: 'Staff can follow its reasons', group: 0 },
          { text: 'It\'s fashionable', group: 1 },
          { text: 'It won one lucky split', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'miracle',
        message: 'Give me v0.9\'s case in one sentence.',
        prompt: 'Halima\'s best reply?',
        options: [
          { text: 'It\'s logistic regression.', why: 'Give the reasons.' },
          { text: 'It beats every forest and booster over 11 weeks, it\'s 200 times smaller, and every clinic can see why a patient is on the list.' },
          { text: 'It won on week 12.', why: 'Week 12 isn\'t how we chose.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the lesson to its main finding.',
        pairs: [
          ['Speed and size', '1.7 KB vs about 380 KB'],
          ['Tuning a forest', 'Depth 3 best over 11 weeks'],
          ['When simple wins', 'Simple pattern, small data'],
          ['Choosing for the clinic', 'More than one number'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The decision.',
        template: 'v0.9 stays the predictor; the forest becomes a [[1]] and the source of a second [[2]] chart.',
        blanks: [['cross-check'], ['importance']],
        distractors: ['replacement', 'accuracy'],
      },
      {
        kind: 'findBug',
        prompt: 'Which step would be peeking?',
        lines: ['Compare models over 11 weeks.', 'Choose v0.9.', 'Swap to the forest if it wins on week 12.'],
        bug: 2,
        fix: 'Report week 12 for the record; the choice stands.',
        explanation: 'Week 12 isn\'t used to choose.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Across 11 weeks, which forest depth was best?',
        answers: ['3', 'three'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Review, lesson 7: what would show that reminders cause fewer no-shows?',
        options: [
          { text: 'A fair test: reminders for a random half, then compare' },
          { text: 'A higher importance score', why: 'Importance isn\'t cause.' },
          { text: 'A bigger forest', why: 'Models find patterns, not causes.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Would you have chosen differently if the forest had won by 50 minutes? Why?',
    starters: ['I would...'],
  },
  notes: 'Checkpoint for Chapter 10 lessons 11-14. RF(100, depth 4) weeks 1-9 -> 10-11: 1305 minutes. Best forest over 11 weeks: depth 3 (6505).',
};

export default lesson;
