import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';
import { DATA, FOREST, IMPORTS, TEST_BASE, VAL_BASE, VAL_MINUTES } from './code';

/** Chapter 10 · Lesson 10 — Checkpoint 2: importance, cause, boosting, forest vs tree. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Checkpoint: what forests can and can\'t do',
  summary: 'Feature importance, importance vs cause, boosting, and forests vs trees. Check you can read a forest honestly.',
  minutes: 13,
  milestone: 'CHECKPOINT',
  outcomes: ['Read feature importance without over-claiming', 'Compare ensembles with single models fairly'],
  learn: [
    {
      kind: 'story',
      title: 'The chart',
      beats: [
        { speaker: 'folake', text: 'I put the importance chart on the board slide: "What causes no-shows".' },
        { speaker: 'halima', text: 'Can we call it "What helps the model guess"? Causes need a different kind of test.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 2: what forests can and can\'t do.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Fit the standard forest on weeks 1 to 11 and print the importance of sms_reminder, rounded to 2 places',
        starter: TEST_BASE + FOREST + 'forest.fit(train[feats], train["no_show"])\nimportance = pd.Series(forest.feature_importances_, index=feats)\n',
        solution: TEST_BASE + FOREST + 'forest.fit(train[feats], train["no_show"])\nimportance = pd.Series(forest.feature_importances_, index=feats)\nprint(round(importance["sms_reminder"], 2))\n',
        hint: 'importance["sms_reminder"]',
        checks: [{ message: 'Print 0.13', outputEquals: '0.13' }],
      },
      {
        kind: 'mcq',
        prompt: 'Folake\'s slide says "What causes no-shows". What should it say?',
        options: [
          { text: 'Keep it', why: 'Importance isn\'t cause.' },
          { text: '"What doesn\'t matter"', why: 'It shows what helps prediction.' },
          { text: '"What helps the model guess no-shows"' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Print the no-show rate for patients without a reminder, rounded to 3 places',
        starter: IMPORTS + DATA,
        solution: IMPORTS + DATA + 'print(round(df[df["sms_reminder"] == 0]["no_show"].mean(), 3))\n',
        hint: 'Filter sms_reminder == 0',
        checks: [{ message: 'Print 0.262', outputEquals: '0.262' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'Forest or boosting?',
        groups: ['Forest only', 'Boosting only'],
        items: [
          { text: 'Trees grown independently', group: 0 },
          { text: 'Bootstrap draws per tree', group: 0 },
          { text: 'Trees built in sequence', group: 1 },
          { text: 'A learning rate', group: 1 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Fit an unlimited single tree on weeks 1 to 9 and print its validation minutes lost',
        starter: VAL_BASE + 'wild_tree = DecisionTreeClassifier(random_state=42).fit(train[feats], train["no_show"])\n',
        solution: VAL_BASE + 'wild_tree = DecisionTreeClassifier(random_state=42).fit(train[feats], train["no_show"])\n' + VAL_MINUTES('wild_tree'),
        hint: 'Flag val at 0.2, then minutes',
        checks: [{ message: 'Print 1615', outputEquals: '1615' }],
      },
      {
        kind: 'chatReply',
        from: 'chidi',
        message: 'Forests beat trees. Boosting beats forests. So boosting beats logistic regression?',
        prompt: 'Miracle\'s best reply?',
        options: [
          { text: 'Yes, logically.', why: 'The evidence says otherwise.' },
          { text: 'Rankings don\'t chain like that. Across 11 weeks, v0.9 beats them all: 6,340 vs boosting 6,470 and the best forest 6,505.' },
          { text: 'Nothing beats anything.', why: 'Some differences are real.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the idea to its lesson.',
        pairs: [
          ['feature_importances_', 'Feature importance'],
          ['Ice cream and sunburn', 'Importance isn\'t cause'],
          ['Each tree fixes the last', 'Boosting, in words'],
          ['640 minutes rescued', 'Comparing forest and tree'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Cause.',
        template: 'To show reminders [[1]] fewer no-shows, send them to a [[2]] half and compare.',
        blanks: [['cause'], ['random']],
        distractors: ['predict', 'chosen'],
      },
      {
        kind: 'findBug',
        prompt: 'Which statement is wrong?',
        lines: ['The forest\'s top clue is past misses.', 'Distance partly stands in for Gumel.', 'Reminders barely matter because their importance is 0.13.'],
        bug: 2,
        fix: 'Reminder patients miss far less; importance just favours many-valued features.',
        explanation: '12.4% vs 26.2%: hardly "barely matters".',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Across 11 weeks, which model is still best?',
        answers: ['v0.9', 'logistic regression', 'v9', 'LR'],
        placeholder: 'A model',
      },
    ],
  },
  reflect: {
    prompt: 'How would you title Folake\'s chart so nobody misreads it?',
    starters: ['I\'d call it...'],
  },
  notes: 'Checkpoint for Chapter 10 lessons 6-9. RF importance sms 0.131; no-reminder no-show rate 0.262; unlimited tree weeks 1-9 -> 10-11 1615 minutes.',
};

export default lesson;
