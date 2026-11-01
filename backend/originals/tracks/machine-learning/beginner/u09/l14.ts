import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';
import { DATA, F6, IMPORTS } from './code';

const BASE = IMPORTS + DATA + F6 + 'val = df[df["week"].isin([10, 11])]\n';

/** Chapter 9 · Lesson 14 — Learning curves, in words. */
const lesson: OriginalLesson = {
  key: 'l14',
  title: 'Learning curves, in words',
  summary: 'Plot a score against how much data the model learned from and you get a learning curve. You don\'t need the chart to read one. A short reading on what v0.8\'s curve says about what to do next.',
  minutes: 11,
  outcomes: [
    'Read a learning curve in plain words',
    'Use the train-validation gap to decide next steps',
    'Tell "more data" problems from "better features" problems',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'Two lines',
      html: '<p>A learning curve has two lines: the training score and the validation score, as the training data grows.</p><p><strong>v0.8\'s curve.</strong> Trained on 1 week, it gets 83.0% of its own training bookings right and 81.0% of weeks 10 and 11. On 9 weeks: 83.3% and 79.7%. The two lines start close and stay close.</p><p><strong>What close lines mean.</strong> The model isn\'t memorising: it does about as well on new weeks as on old ones. More data steadies it (minutes lost fell from 1,405 to 1,225), but it won\'t suddenly become brilliant: it\'s already learned roughly what four to six clues can tell.</p><p><strong>What a wide gap would mean.</strong> Chidi\'s tree is the opposite: 99.5% on training, 71.3% on validation. A gap that wide says "memorising". For that model, more data or less depth would help most.</p><p><strong>So, what next for v0.8?</strong> Close lines suggest the limit is the information in the features, not the amount of data. The next big step would be new kinds of clues (Chapter 8\'s lesson), or a model that can combine clues in more flexible ways without memorising. Chapter 10 tries the second.</p>',
    },
    {
      kind: 'check',
      question: 'Training and validation lines stay close and flat. What\'s the likely limit?',
      options: ['Memorising', 'A bug', 'The information in the features'],
      answer: 2,
      explanation: 'Close lines: no memorising. Flat: more of the same data adds little.',
    },
    {
      kind: 'tryIt',
      title: 'v0.8\'s learning curve',
      caption: 'Training and validation accuracy as weeks are added.',
      code: BASE + '\nfor k in [1, 3, 5, 7, 9]:\n    small = df[df["week"] <= k]\n    model = make_pipeline(StandardScaler(), LogisticRegression()).fit(small[feats], small["no_show"])\n    print(k, "weeks:", round(model.score(small[feats], small["no_show"]), 3), round(model.score(val[feats], val["no_show"]), 3))\n',
      challenge: 'Swap in DecisionTreeClassifier(random_state=42). How does the gap change?',
    },
  ],
  apply: {
    scenario: 'Learning curves.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Train v0.8\'s recipe on week 1 only and print its validation accuracy, rounded to 2 places',
        starter: BASE + 'small = df[df["week"] <= 1]\nmodel = make_pipeline(StandardScaler(), LogisticRegression()).fit(small[feats], small["no_show"])\n',
        solution: BASE + 'small = df[df["week"] <= 1]\nmodel = make_pipeline(StandardScaler(), LogisticRegression()).fit(small[feats], small["no_show"])\nprint(round(model.score(val[feats], val["no_show"]), 2))\n',
        hint: 'model.score(val[feats], val["no_show"])',
        checks: [{ message: 'Print 0.81', outputEquals: '0.81' }],
      },
      {
        kind: 'mcq',
        prompt: 'What does a wide gap between the two lines mean?',
        options: [
          { text: 'Underfitting', why: 'That shows as close, poor lines.' },
          { text: 'Memorising: more data or a simpler model would help' },
          { text: 'A perfect model', why: 'A gap means it does worse on new data.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Train on weeks 1 to 9 and print the training accuracy, rounded to 3 places',
        starter: BASE + 'small = df[df["week"] <= 9]\nmodel = make_pipeline(StandardScaler(), LogisticRegression()).fit(small[feats], small["no_show"])\n',
        solution: BASE + 'small = df[df["week"] <= 9]\nmodel = make_pipeline(StandardScaler(), LogisticRegression()).fit(small[feats], small["no_show"])\nprint(round(model.score(small[feats], small["no_show"]), 3))\n',
        hint: 'model.score(small[feats], small["no_show"])',
        checks: [{ message: 'Print 0.833', outputEquals: '0.833' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'Best next step?',
        groups: ['New clues or a more flexible model', 'More data or less complexity'],
        items: [
          { text: 'Close, flat lines (v0.8)', group: 0 },
          { text: 'Underfitting stump', group: 0 },
          { text: 'Wide gap (Chidi\'s tree)', group: 1 },
          { text: '100% training, 80% validation', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'folake',
        message: 'If more data barely helps v0.8, what will?',
        prompt: 'Halima\'s best reply?',
        options: [
          { text: 'Nothing, it\'s finished.', why: 'There are things to try.' },
          { text: 'Ten times more weeks.', why: 'The curve says the gain would be small.' },
          { text: 'New kinds of clues, or a model that combines the clues more flexibly without memorising. Miracle wants to try forests next.' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the curve to its diagnosis.',
        pairs: [
          ['Close lines, both good', 'Learning well'],
          ['Close lines, both near baseline', 'Underfitting'],
          ['Wide gap', 'Overfitting'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Reading the curve.',
        template: 'A wide gap means [[1]]; close lines near the baseline mean [[2]].',
        blanks: [['overfitting'], ['underfitting']],
        distractors: ['leaking', 'tuning'],
      },
      {
        kind: 'findBug',
        prompt: 'Which reading is wrong?',
        lines: ['v0.8\'s lines are close: it isn\'t memorising.', 'Chidi\'s gap is wide: it\'s memorising.', 'v0.8 needs less depth.'],
        bug: 2,
        fix: 'v0.8 needs new clues or a more flexible model.',
        explanation: 'Logistic regression has no depth, and it isn\'t overfitting.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Trained on 9 weeks, what is v0.8\'s validation accuracy? (3 decimal places)',
        answers: ['0.797', '.797'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why read learning curves "in words"?',
        options: [
          { text: 'The decision (more data? simpler? new clues?) matters more than the chart' },
          { text: 'Charts are wrong', why: 'Charts are fine; the reading is the point.' },
          { text: 'scikit-learn can\'t plot', why: 'It has learning_curve for the numbers.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Think of a skill where more practice stopped helping. Did you need more practice, or a new approach?',
    starters: ['When I...'],
  },
  deepen: {
    title: 'learning_curve',
    summary: 'scikit-learn\'s learning_curve function trains on growing slices of the data with cross-validation and returns both lines, ready to plot.',
  },
  notes: 'StandardScaler + LR, v0.8 features, trained on weeks 1..k, validated on 10-11: train/val acc k=1 0.83/0.81; 2 0.833/0.80; 3 0.828/0.805; 5 0.834/0.80; 7 0.829/0.80; 9 0.833/0.797.',
};

export default lesson;
