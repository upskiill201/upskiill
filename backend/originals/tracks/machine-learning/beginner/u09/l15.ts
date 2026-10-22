import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';
import { CV_BASE, V8 } from './code';

/** Chapter 9 · Lesson 15 — Checkpoint 3: data vs models, simplicity, honest tuning, curves. */
const lesson: OriginalLesson = {
  key: 'l15',
  title: 'Checkpoint: what to try next',
  summary: 'More data or a better model, simple over complex, tuning without cheating and reading learning curves. Check you can decide what to try next from the evidence.',
  minutes: 13,
  milestone: 'CHECKPOINT',
  outcomes: ['Choose between more data, simpler models and new clues', 'Tune every setting honestly'],
  learn: [
    {
      kind: 'compare',
      title: 'Two kinds of problem',
      before: {
        label: 'Memorising (wide gap)',
        text: 'Chidi\'s tree: 99.5% training, 71.3% new weeks\nTry: less depth, more data',
      },
      after: {
        label: 'Plateau (close lines)',
        text: 'v0.8: 83.3% training, 79.7% new weeks\nTry: new clues, a more flexible model',
      },
      notes: ['The same "make it better" request needs opposite fixes depending on the gap.'],
    },
  ],
  apply: {
    scenario: 'Checkpoint 3: what to try next.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Cross-validate v0.8 by week and print the spread of its weekly minutes (standard deviation), rounded to 1 place',
        starter: CV_BASE + V8 + 'scores = cross_val_score(v8, train[feats], train["no_show"], groups=train["week"], cv=weeks, scoring=minutes_score)\n',
        solution: CV_BASE + V8 + 'scores = cross_val_score(v8, train[feats], train["no_show"], groups=train["week"], cv=weeks, scoring=minutes_score)\nprint(round(scores.std(), 1))\n',
        hint: 'scores.std()',
        checks: [{ message: 'Print 75.4', outputEquals: '75.4' }],
      },
      {
        kind: 'mcq',
        prompt: 'v0.8\'s weekly minutes vary by about 75. C = 0.1 beats the default by about 1. What does that mean?',
        options: [
          { text: 'C = 0.1 is far better', why: '1 minute vs a 75-minute wobble.' },
          { text: 'Cross-validation failed', why: 'It worked; the settings are just close.' },
          { text: 'The difference is tiny compared with normal week-to-week wobble' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Cross-validate a depth-4 tree by week and print its average minutes lost, rounded to 1 place',
        starter: CV_BASE + 'tree = DecisionTreeClassifier(max_depth=4, random_state=42)\n',
        solution: CV_BASE + 'tree = DecisionTreeClassifier(max_depth=4, random_state=42)\nscores = cross_val_score(tree, train[feats], train["no_show"], groups=train["week"], cv=weeks, scoring=minutes_score)\nprint(round(-scores.mean(), 1))\n',
        hint: '-scores.mean()',
        checks: [{ message: 'Print 645.9', outputEquals: '645.9' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'Honest or cheating?',
        groups: ['Honest', 'Cheating'],
        items: [
          { text: 'Threshold chosen over 11 weeks', group: 0 },
          { text: 'Imputer inside the pipeline', group: 0 },
          { text: 'Depth picked on week 12', group: 1 },
          { text: 'Scaling all weeks before folding', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'chidi',
        message: 'v0.8 has plateaued. So let\'s use my unlimited tree!',
        prompt: 'Miracle\'s best reply?',
        options: [
          { text: 'Good idea.', why: 'It\'s much worse on cross-validation.' },
          { text: 'A plateau calls for a more flexible model that doesn\'t memorise. Your tree memorises: 681 minutes a week against 578. We need something in between.' },
          { text: 'Plateaus can\'t be fixed.', why: 'New clues or better models can help.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the evidence to the next step.',
        pairs: [
          ['Wide train-validation gap', 'Simplify or add data'],
          ['Close, flat lines', 'New clues or a flexible model'],
          ['Two settings within the wobble', 'Keep the simpler one'],
          ['A step outside the pipeline', 'Move it inside'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Simplicity.',
        template: 'Complexity must [[1]] its place on [[2]].',
        blanks: [['earn'], ['cross-validation']],
        distractors: ['buy', 'training'],
      },
      {
        kind: 'findBug',
        prompt: 'Which plan ignores the evidence?',
        lines: ['v0.8 plateaus: try new clues.', 'Chidi\'s tree memorises: limit it.', 'v0.8 plateaus: make it memorise more.'],
        bug: 2,
        fix: 'v0.8 plateaus: try a flexible model that doesn\'t memorise.',
        explanation: 'Memorising is the opposite of what a plateau needs.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many minutes did 8 more weeks of data save on validation?',
        answers: ['180'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Review, lesson 6: in leave-one-week-out, how many times is each learning week the validation week?',
        options: [
          { text: 'Exactly once' },
          { text: 'Never', why: 'Each week gets one turn.' },
          { text: 'Eleven times', why: 'There are eleven folds; each week is held out once.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Which tells you more about a model: its best score, or how much it wobbles?',
    starters: ['I think...'],
  },
  notes: 'Checkpoint for Chapter 9 lessons 11-14. v0.8 weekly minutes std 75.4 (mean 577.7). Depth-4 tree mean 645.9.',
};

export default lesson;
