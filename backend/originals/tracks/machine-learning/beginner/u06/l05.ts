import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';
import { LR_BASE, LR_FIT } from './code';

/** Chapter 6 · Lesson 5 — Checkpoint 1: classification, probabilities, logistic regression, the call list. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: the first classifier',
  summary: 'Four lines of scikit-learn now match fifteen lines of hand-built neighbours. Check you can train a classifier, get its chances, read its coefficients and build Bisi\'s list.',
  minutes: 13,
  milestone: 'CHECKPOINT',
  outcomes: ['Train a classifier and use its probabilities', 'Read coefficients and build a call list'],
  learn: [
    {
      kind: 'story',
      title: 'Four lines',
      beats: [
        { speaker: 'emmanuel', text: 'Four lines. I spent a week on that neighbours loop.' },
        { speaker: 'miracle', text: 'And because you did, you know what the four lines are doing. That\'s the point.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1: the first classifier.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Train LogisticRegression on weeks 1 to 11 and print the classes it knows (model.classes_) as a list',
        starter: LR_BASE + 'model = LogisticRegression()\n',
        solution: LR_FIT + 'print(model.classes_.tolist())\n',
        hint: 'model.classes_.tolist()',
        checks: [{ message: 'Print [0, 1]', outputEquals: '[0, 1]' }],
      },
      {
        kind: 'mcq',
        prompt: 'Which gives a chance of a no-show for each booking?',
        options: [
          { text: 'model.predict(test[feats])', why: 'That gives labels: 0 or 1.' },
          { text: 'model.predict_proba(test[feats])[:, 1]' },
          { text: 'model.coef_', why: 'Those are the learned numbers, not per-booking chances.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Raises or lowers the no-show chance, according to the model?',
        groups: ['Raises', 'Lowers'],
        items: [
          { text: 'previous_no_shows (+0.607)', group: 0 },
          { text: 'sms_reminder (-0.985)', group: 1 },
          { text: 'wait_days (+0.050)', group: 0 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Print the average no-show chance the model gives week 12, rounded to 3 places',
        starter: LR_FIT + 'p = model.predict_proba(test[feats])[:, 1]\n',
        solution: LR_FIT + 'p = model.predict_proba(test[feats])[:, 1]\nprint(round(p.mean(), 3))\n',
        hint: 'p.mean()',
        checks: [{ message: 'Print 0.192', outputEquals: '0.192' }],
      },
      {
        kind: 'chatReply',
        from: 'folake',
        message: 'The model\'s average chance is 19%, and 18.5% of week 12 really missed. Is that a coincidence?',
        prompt: 'Halima\'s best reply?',
        options: [
          { text: 'Pure coincidence.', why: 'Matching overall rates is a sign of sensible probabilities.' },
          { text: 'It means it\'s 100% accurate.', why: 'It means the chances are well sized, not perfect.' },
          { text: 'No: it means its chances are about the right size overall. That\'s a good sign we can trust them.' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the result to its value on week 12.',
        pairs: [
          ['Accuracy', '0.82'],
          ['Flagged at 0.5', '11 bookings'],
          ['Top 20 that missed', '12'],
          ['Top 40 that missed', '19'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Training.',
        language: 'python',
        template: 'model.[[1]](train[feats], train["no_show"])\np = model.[[2]](test[feats])[:, 1]',
        blanks: [['fit'], ['predict_proba']],
        distractors: ['score', 'predict'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line trains on the test week?',
        language: 'python',
        lines: ['model = LogisticRegression()', 'model.fit(test[feats], test["no_show"])', 'print(model.score(test[feats], test["no_show"]))'],
        bug: 1,
        fix: 'model.fit(train[feats], train["no_show"])',
        explanation: 'Fit on weeks 1 to 11; week 12 is only for scoring.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'A score of 0 inside logistic regression becomes what chance? (A decimal.)',
        answers: ['0.5', '.5'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Review, Chapter 4: why test on week 12 only?',
        options: [
          { text: 'It\'s the smallest week', why: 'All weeks have 200. It\'s about time order.' },
          { text: 'It plays the part of the future, which the model never saw' },
          { text: 'It has no leaks', why: 'It\'s about being unseen and in the future.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Order the classifier pattern.',
        lines: ['LogisticRegression()', 'fit on weeks 1 to 11', 'predict_proba on week 12', 'rank and score the top 20'],
      },
    ],
  },
  reflect: {
    prompt: 'Explain predict and predict_proba to Bisi in one sentence each.',
    starters: ['predict tells you...', 'predict_proba tells you...'],
  },
  notes: 'Checkpoint for Chapter 6 lessons 1-4. classes_ [0, 1]; mean predicted no-show chance on week 12 0.192 (actual rate 0.185). Accuracy 0.82; 11 flagged at 0.5; top 20 12; top 40 19.',
};

export default lesson;
