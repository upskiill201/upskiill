import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';
import { VAL_BASE, VAL_MINUTES } from './code';

const BOOST =
  VAL_BASE + 'from sklearn.ensemble import HistGradientBoostingClassifier\n' +
  'boost = HistGradientBoostingClassifier(learning_rate=0.03, max_iter=100, max_depth=3, random_state=42)\n';

/** Chapter 10 · Lesson 8 — Boosting, in words. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Boosting, in words',
  summary: 'A forest grows trees side by side. Boosting grows them one after another, each fixing the last one\'s mistakes. A short reading on the method that wins many competitions, and how it does on Afiya\'s data.',
  minutes: 11,
  outcomes: [
    'Explain boosting in plain words',
    'Contrast it with a forest',
    'Judge it by the same rules',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'One after another',
      html: '<p>A random forest grows its trees <strong>independently</strong> and averages them. <strong>Boosting</strong> grows small trees <strong>in sequence</strong>. Tree 1 makes rough guesses. Tree 2 is trained to fix where tree 1 went wrong. Tree 3 fixes what\'s still wrong. After 100 small steps, the corrections add up.</p><p>The <strong>learning rate</strong> controls how big each correction is. Small steps (like 0.03) are slower but more careful; big steps can overshoot and start learning noise.</p><p>Boosting methods (scikit-learn\'s HistGradientBoostingClassifier, and popular libraries like XGBoost and LightGBM) win many competitions on spreadsheet-style data.</p><p><strong>On Afiya\'s data:</strong> on weeks 10 and 11, a boosted model with depth-3 trees loses 1,230 minutes, just behind v0.8\'s 1,225. Across all 11 weeks it loses 6,470, against v0.9\'s 6,340. Good, not better.</p><p>That\'s not a failure of boosting. This data is mostly simple: each clue nudges the risk up or down. When the truth is simple, a simple model is hard to beat.</p>',
    },
    {
      kind: 'check',
      question: 'What\'s the key difference between a forest and boosting?',
      options: ['Boosting uses one tree', 'Forest trees are independent; boosting trees are built in sequence, each fixing the last', 'Forests can\'t predict chances'],
      answer: 1,
      explanation: 'Side by side vs one after another.',
    },
    {
      kind: 'tryIt',
      title: 'A boosted model',
      caption: 'Weeks 1 to 9 to learn, 10 and 11 to judge.',
      code: BOOST + '\nboost.fit(train[feats], train["no_show"])\nflags = (boost.predict_proba(val[feats])[:, 1] >= 0.2).astype(int)\nprint("Minutes lost:", minutes(flags, val["no_show"]))\n',
      challenge: 'Try learning_rate=0.3. Better or worse?',
    },
  ],
  apply: {
    scenario: 'Boosting.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Fit the boosted model on weeks 1 to 9 and print its validation minutes lost',
        starter: BOOST,
        solution: BOOST + 'boost.fit(train[feats], train["no_show"])\n' + VAL_MINUTES('boost'),
        hint: 'boost.fit(...), then flag val at 0.2',
        checks: [{ message: 'Print 1230', outputEquals: '1230' }],
      },
      {
        kind: 'mcq',
        prompt: 'What does each new tree in boosting learn?',
        options: [
          { text: 'To fix the mistakes the earlier trees still make' },
          { text: 'The same thing as every other tree', why: 'That\'s closer to a forest.' },
          { text: 'A random subset of answers', why: 'It targets the errors.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Print the boosted model\'s validation accuracy, rounded to 3 places',
        starter: BOOST + 'boost.fit(train[feats], train["no_show"])\n',
        solution: BOOST + 'boost.fit(train[feats], train["no_show"])\nprint(round(boost.score(val[feats], val["no_show"]), 3))\n',
        hint: 'boost.score(val[feats], val["no_show"])',
        checks: [{ message: 'Print 0.797', outputEquals: '0.797' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'Forest or boosting?',
        groups: ['Forest', 'Boosting'],
        items: [
          { text: 'Trees grown independently', group: 0 },
          { text: 'Average of many trees', group: 0 },
          { text: 'Each tree fixes the last', group: 1 },
          { text: 'Has a learning rate', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'chidi',
        message: 'Boosting wins competitions. Why isn\'t it winning here?',
        prompt: 'Miracle\'s best reply?',
        options: [
          { text: 'We set it up wrong.', why: 'It\'s set up fine; the data is simple.' },
          { text: 'Competitions often have huge, complicated data. Ours is small and mostly simple: each clue nudges risk a bit. Simple truths suit simple models.' },
          { text: 'Boosting is overrated.', why: 'It\'s excellent on the right data.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the model to its 11-week minutes lost.',
        pairs: [
          ['v0.9 (logistic regression)', '6,340'],
          ['Boosting', '6,470'],
          ['Best forest (depth 3)', '6,505'],
          ['Best single tree', '6,615'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'A careful booster.',
        language: 'python',
        template: 'HistGradientBoostingClassifier([[1]]=0.03, max_iter=100, [[2]]=3)',
        blanks: [['learning_rate'], ['max_depth']],
        distractors: ['step', 'n_estimators'],
      },
      {
        kind: 'findBug',
        prompt: 'Which statement is wrong?',
        lines: ['Boosting builds trees one after another.', 'A smaller learning rate takes smaller steps.', 'Boosting always beats logistic regression.'],
        bug: 2,
        fix: 'Boosting often does well; here logistic regression still wins.',
        explanation: '11 weeks: 6,470 vs 6,340.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Across 11 weeks, how many more minutes does boosting lose than v0.9?',
        answers: ['130'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why can a big learning rate hurt?',
        options: [
          { text: 'It makes training slower', why: 'Big steps are faster; the risk is noise.' },
          { text: 'It can\'t hurt', why: 'It can lead to overfitting.' },
          { text: 'Big corrections can overshoot and start fitting noise' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Learning one mistake at a time: where does that work well for people?',
    starters: ['For example...'],
  },
  deepen: {
    title: 'Gradient boosting',
    summary: 'The full name is gradient boosting: each new tree follows the direction that most reduces the errors. XGBoost and LightGBM are fast, popular versions used across industry.',
  },
  notes: 'HistGradientBoostingClassifier(learning_rate=0.03, max_iter=100, max_depth=3, random_state=42): weeks 1-9 -> 10-11 minutes 1230; leave-one-week-out 6470 (v0.9 6340); week 12 580.',
};

export default lesson;
