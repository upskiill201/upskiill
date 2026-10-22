import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';
import { LR_FIT } from './code';

const T = LR_FIT + 't = test.assign(p=model.predict_proba(test[feats])[:, 1])\n';

/** Chapter 6 · Lesson 19 — Version 0.6: the rule applied, week 12 opened once. */
const lesson: OriginalLesson = {
  key: 'l19',
  title: 'Version 0.6',
  summary: 'The rule is written, the comparison is done, the explanation is ready. Halima opens week 12 once for the chosen model and writes version 0.6 in the notebook. Six steps, start to finish.',
  minutes: 12,
  outcomes: [
    'Run the full honest classifier workflow end to end',
    'Record a model version with its test result',
    'Compare v0.6 with the earlier versions',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'From rule to version',
      steps: [
        { title: '1. The rule', body: 'Written before any scores: best validation score, unless managers can\'t understand the model.' },
        { title: '2. The comparison', body: 'Weeks 1 to 9 to learn, weeks 10 and 11 to judge. Logistic regression 24 of the top 40; depth-8 tree 28.' },
        { title: '3. The decision', body: 'The tree has 93 leaves: no manager can follow it. The rule picks logistic regression.' },
        { title: '4. Retrain', body: 'Fit the chosen model on all of weeks 1 to 11.', code: 'model = LogisticRegression().fit(train[feats], train["no_show"])', language: 'python' },
        { title: '5. Open week 12, once', body: 'Top 20 by chance: 12 really missed. Same as the hand-built k-nearest version, v0.4, now with a model anyone can read.' },
        { title: '6. Write it down', body: 'v0.6: logistic regression, four features, top 20 on week 12 = 12. Date, data, rule, result. And for the record: the depth-8 tree, checked afterwards, would have got 11.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Version 0.6',
      caption: 'The final run, start to finish.',
      code: T + '\nprint("v0.6: logistic regression")\nprint("Features:", feats)\nprint("Top 20 on week 12:", t.nlargest(20, "p")["no_show"].sum())\nfor name, c in zip(feats, model.coef_[0]):\n    print(" ", name, round(c, 3))\n',
      challenge: 'Add a line printing the top 40 as well.',
    },
  ],
  apply: {
    scenario: 'Version 0.6.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print v0.6\'s top-20 score on week 12',
        starter: T,
        solution: T + 'print(t.nlargest(20, "p")["no_show"].sum())\n',
        hint: 't.nlargest(20, "p")["no_show"].sum()',
        checks: [{ message: 'Print 12', outputEquals: '12' }],
      },
      {
        kind: 'mcq',
        prompt: 'Why retrain on weeks 1 to 11 after choosing on weeks 1 to 9?',
        options: [
          { text: 'The choice is made; now the model should learn from all the past data before the final test' },
          { text: 'To change the decision', why: 'The decision is fixed.' },
          { text: 'To include week 12', why: 'Week 12 stays out.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Print v0.6\'s top-40 score on week 12',
        starter: T,
        solution: T + 'print(t.nlargest(40, "p")["no_show"].sum())\n',
        hint: 'nlargest(40, "p")',
        checks: [{ message: 'Print 19', outputEquals: '19' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'Order of the workflow: early or late?',
        groups: ['Early', 'Late'],
        items: [
          { text: 'Write the rule', group: 0 },
          { text: 'Compare on validation', group: 0 },
          { text: 'Open week 12', group: 1 },
          { text: 'Record the version', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'chidi',
        message: 'The tree only got 11 on week 12. Lucky we didn\'t pick it, eh?',
        prompt: 'Halima\'s best reply?',
        options: [
          { text: 'Yes, we were clever.', why: 'Knowing it afterwards isn\'t evidence for the choice.' },
          { text: 'One point on one week is mostly luck. We picked by the rule, not by week 12. If the tree had got 13, we\'d still ship logistic regression.' },
          { text: 'Let\'s switch if the tree wins next week.', why: 'Choosing on test weeks is peeking.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the version to its model.',
        pairs: [
          ['v0.3', 'Nearest neighbours built from scratch'],
          ['v0.4', 'The same idea, tested fairly on week 12'],
          ['v0.5', 'Linear regression for weekly bookings'],
          ['v0.6', 'Logistic regression for no-shows'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The notebook line.',
        template: 'v0.6: logistic regression, four [[1]], top 20 on week 12 = [[2]].',
        blanks: [['features'], ['12']],
        distractors: ['leaves', '28'],
      },
      {
        kind: 'findBug',
        prompt: 'Which step breaks the workflow?',
        lines: ['Rule agreed first.', 'Logistic regression chosen on validation.', 'Week 12 opened three times while tuning.'],
        bug: 2,
        fix: 'Week 12 opened once, at the end.',
        explanation: 'Every extra look at the test week turns it into validation.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'What did the depth-8 tree get on week 12, checked only afterwards?',
        answers: ['11'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'v0.4 (hand-built k-nearest) and v0.6 both catch 12. What did v0.6 add?',
        options: [
          { text: 'Nothing', why: 'It\'s easier to explain, rerun and share.' },
          { text: 'Many more no-shows caught', why: 'Same 12 on week 12.' },
          { text: 'It\'s built with standard tools, gives smooth chances and can be explained with four coefficients' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Why might a team keep a model that isn\'t better, just clearer and easier to maintain?',
    starters: ['A team might...', 'Because...'],
  },
  deepen: {
    title: 'Model cards',
    summary: 'Many teams publish a short "model card" for each version: what it does, the data, how it was tested, the results and its limits. Halima\'s notebook line is a tiny one.',
  },
  notes: 'v0.6 = LogisticRegression on weeks 1-11, four features: week 12 top 20 = 12, top 40 = 19. Depth-8 tree on week 12 top 20 = 11 (checked after the decision). v0.4 k-NN (k=15) top 20 = 12.',
};

export default lesson;
