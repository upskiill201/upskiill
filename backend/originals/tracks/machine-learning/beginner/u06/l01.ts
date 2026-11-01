import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';
import { LR_BASE, LR_FIT } from './code';

/** Chapter 6 · Lesson 1 — Classification: back to "who will miss?". */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'Classification',
  summary: 'Folake wants the no-show predictor, built with the real tools this time. The answer is "miss" or "come", not a number: that\'s classification. The same fit and predict work, with a different kind of model.',
  minutes: 12,
  outcomes: [
    'Explain classification and how it differs from regression',
    'Train a first scikit-learn classifier on the no-show data',
    'Compare it with the hand-built v0.4',
  ],
  learn: [
    {
      kind: 'story',
      title: 'The real question',
      beats: [
        { speaker: 'folake', text: 'Forecasts are nice. Now the one the board actually asked for: which patients won\'t come?' },
        { speaker: 'halima', text: 'Back to appointments.csv. Each booking is "missed" (1) or "came" (0). That\'s a class, not a number.' },
        { speaker: 'miracle', text: 'Predicting a class is classification. Same pattern you learned in Chapter 5: create, fit, predict, score once. Different model: LogisticRegression.' },
        { speaker: 'chidi', text: 'Logistic... regression? For yes/no? That name is a trap.' },
        { speaker: 'tey', text: 'It is. Despite "regression" in the name, it\'s a classifier. Halima has v0.4, her hand-built neighbours. What should she do with the new tool?' },
      ],
      choice: {
        prompt: 'What should Halima do first?',
        options: [
          { text: 'Train LogisticRegression on weeks 1 to 11, test on week 12, and compare it with v0.4 the same way.', outcome: 'Yes. Same split, same scoring, so the comparison is fair. A new tool earns its place by beating the old one honestly.', best: true },
          { text: 'Throw away v0.4: scikit-learn must be better.', outcome: 'Maybe, maybe not. Keep v0.4 as the bar to beat until the numbers say otherwise.' },
          { text: 'Train on all 12 weeks to give it the most data.', outcome: 'Then there\'s no honest test. Chapter 4\'s rules come with every tool.' },
        ],
      },
    },
    {
      kind: 'tryIt',
      title: 'A first classifier',
      caption: 'LogisticRegression on the four honest features.',
      code: LR_BASE + '\nmodel = LogisticRegression()\nmodel.fit(train[feats], train["no_show"])\nprint("Accuracy on week 12:", model.score(test[feats], test["no_show"]))\nprint("Everyone comes:", round(1 - test["no_show"].mean(), 3))\n',
      challenge: 'v0.4 scored 82.5%. How does this compare?',
    },
  ],
  apply: {
    scenario: 'Classification.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Train LogisticRegression on weeks 1 to 11 and print its accuracy on week 12',
        starter: LR_BASE + 'model = LogisticRegression()\n',
        solution: LR_FIT + 'print(model.score(test[feats], test["no_show"]))\n',
        hint: 'model.fit(train[feats], train["no_show"]), then model.score(test[feats], test["no_show"])',
        checks: [{ message: 'Print 0.82', outputEquals: '0.82' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'Classification or regression?',
        groups: ['Classification', 'Regression'],
        items: [
          { text: 'Will this patient miss?', group: 0 },
          { text: 'How many bookings next week?', group: 1 },
          { text: 'Is this message spam?', group: 0 },
          { text: 'How long will the wait be?', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Is LogisticRegression a regression model?',
        options: [
          { text: 'Yes: it predicts numbers', why: 'It predicts classes (and probabilities of them).' },
          { text: 'No: despite the name, it\'s a classifier' },
          { text: 'Only on Mondays', why: 'It\'s always a classifier. The name is historical.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Print how many week-12 bookings the classifier predicts will be missed (the sum of its predictions)',
        starter: LR_FIT,
        solution: LR_FIT + 'print(model.predict(test[feats]).sum())\n',
        hint: 'model.predict(test[feats]).sum()',
        checks: [{ message: 'Print 11', outputEquals: '11' }],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the step to its code.',
        pairs: [
          ['Create', 'LogisticRegression()'],
          ['Learn', 'model.fit(train[feats], train["no_show"])'],
          ['Use', 'model.predict(test[feats])'],
          ['Score', 'model.score(test[feats], test["no_show"])'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'folake',
        message: '82%. Is that better than Halima\'s old predictor?',
        prompt: 'Halima\'s best reply?',
        options: [
          { text: 'Much better.', why: '82% vs 82.5%: about the same.' },
          { text: 'Worse, so scikit-learn is useless.', why: 'Half a point on one week means very little.' },
          { text: 'About the same: v0.4 got 82.5%, and guessing "everyone comes" gets 81.5%. Accuracy alone won\'t show the difference; the call list will.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'The classifier.',
        language: 'python',
        template: 'model = [[1]]()\nmodel.fit(train[feats], train["[[2]]"])',
        blanks: [['LogisticRegression'], ['no_show']],
        distractors: ['LinearRegression', 'bookings'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line uses the wrong kind of model for "miss or come"?',
        language: 'python',
        lines: ['from sklearn.linear_model import LinearRegression', 'model = LinearRegression()', 'model.fit(train[feats], train["no_show"])'],
        bug: 1,
        fix: 'model = LogisticRegression()',
        explanation: 'LinearRegression predicts numbers like 0.37. For classes, use a classifier.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many week-12 bookings really were missed?',
        answers: ['37'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'The classifier flags only 11 of 200 bookings, though 37 were missed. Why so few?',
        options: [
          { text: 'It only says "miss" when it\'s more than 50% sure, and few bookings reach that' },
          { text: 'It\'s broken', why: 'It\'s cautious. Lesson 6 shows how to change that.' },
          { text: 'Only 11 people missed', why: '37 did.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Name two yes/no predictions in your life (will it rain, will the bus be late). What clues would you use?',
    starters: ['Prediction one...', 'Clues...'],
  },
  deepen: {
    title: 'Why "logistic regression"?',
    summary: 'Under the hood it does fit a line, then squeezes the result through an S-shaped curve (the logistic function) to turn it into a probability between 0 and 1. The name describes the maths, not the job.',
  },
  notes: 'LogisticRegression (default settings), 4 features, train weeks 1-11, test week 12: accuracy 0.82 (164/200); predicts 11 misses, 6 correct. Baseline 0.815; v0.4 (k-NN) 0.825.',
};

export default lesson;
