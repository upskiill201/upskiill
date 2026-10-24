import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';
import { LR_BASE, LR_FIT } from './code';

/** Chapter 6 · Lesson 4 — Training a classifier: the call list from probabilities. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Training a classifier',
  summary: 'Same pattern as every model so far, plus one new step: rank by probability. Three cards take the classifier from fit to Bisi\'s call list, and the first honest comparison with v0.4.',
  minutes: 11,
  outcomes: [
    'Train a classifier and rank bookings by risk',
    'Score it with the same top-20 call list as v0.4',
    'Compare two predictors fairly',
  ],
  learn: [
    {
      kind: 'text',
      html: '<p><strong>Card 1: fit.</strong> <code>model.fit(train[feats], train["no_show"])</code> learns from weeks 1 to 11. The answers (no_show) go in as the second argument, exactly like bookings in Chapter 5.</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>Card 2: rank.</strong> Add each week-12 booking\'s no-show chance as a column, then take the 20 riskiest: <code>test.assign(p=...).nlargest(20, "p")</code>. That\'s Bisi\'s evening, ranked by the new model.</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>Card 3: compare fairly.</strong> Same week, same 20 calls. v0.4 (neighbours): 12 of the 20 really missed. Logistic regression: also <strong>12</strong>. A tie. Its top 40 catch 19. Not a breakthrough, but now the work comes in 4 lines instead of 15, and the model explains itself with 4 numbers.</p>',
    },
    {
      kind: 'check',
      question: 'How do you compare logistic regression with v0.4 fairly?',
      options: ['Same test week, same top-20 call list', 'Each on its best week', 'By how long the code is'],
      answer: 0,
      explanation: 'Same test, same measure. Anything else isn\'t a comparison.',
    },
    {
      kind: 'tryIt',
      title: 'The call list',
      caption: 'Rank by the chance of missing.',
      code: LR_BASE + '\nmodel = LogisticRegression()\nmodel.fit(train[feats], train["no_show"])\nt = test.assign(p=model.predict_proba(test[feats])[:, 1])\ncalls = t.nlargest(20, "p")\nprint(calls[["appointment_id", "clinic", "p"]].round(3).head(10))\nprint(calls["no_show"].sum(), "of 20 really missed")\n',
      challenge: 'Change 20 to 40. How many no-shows do 40 calls reach?',
    },
  ],
  apply: {
    scenario: 'The classifier\'s call list.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Rank week 12 by the chance of missing and print how many of the top 20 really missed',
        starter: LR_FIT + 't = test.assign(p=model.predict_proba(test[feats])[:, 1])\n',
        solution: LR_FIT + 't = test.assign(p=model.predict_proba(test[feats])[:, 1])\nprint(t.nlargest(20, "p")["no_show"].sum())\n',
        hint: 't.nlargest(20, "p")["no_show"].sum()',
        checks: [{ message: 'Print 12', outputEquals: '12' }],
      },
      {
        kind: 'orderLines',
        prompt: 'Order the steps from model to call list.',
        lines: ['Fit on weeks 1 to 11', 'Get no-show chances for week 12', 'Add them as a column', 'Take the 20 largest'],
      },
      {
        kind: 'mcq',
        prompt: 'Logistic regression and v0.4 both catch 12 of 20. What\'s gained?',
        options: [
          { text: 'Nothing at all', why: 'Same score, but simpler and explainable.' },
          { text: 'A much better score', why: 'It\'s a tie on this week.' },
          { text: 'Far less code, and a model that explains itself with four numbers' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Now the top 40: print how many of them really missed',
        starter: LR_FIT + 't = test.assign(p=model.predict_proba(test[feats])[:, 1])\n',
        solution: LR_FIT + 't = test.assign(p=model.predict_proba(test[feats])[:, 1])\nprint(t.nlargest(40, "p")["no_show"].sum())\n',
        hint: 'nlargest(40, "p")',
        checks: [{ message: 'Print 19', outputEquals: '19' }],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the predictor to its week-12 top 20.',
        pairs: [
          ['20 random calls', 'About 3.7'],
          ['v0.4 (neighbours)', '12, from about 15 lines'],
          ['Logistic regression', '12, from 4 lines'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'chidi',
        message: 'A tie? All this for a tie?',
        prompt: 'Miracle\'s best reply?',
        options: [
          { text: 'You\'re right, delete it.', why: 'Simpler and explainable is a real gain.' },
          { text: 'A tie with a model that\'s four lines and four readable numbers. And it\'s the base we\'ll improve from in every chapter after this.' },
          { text: 'It must have won secretly.', why: 'It\'s a tie. Say so.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'The call list.',
        language: 'python',
        template: 't = test.assign(p=model.predict_proba(test[feats])[:, 1])\ncalls = t.[[1]](20, "[[2]]")',
        blanks: [['nlargest'], ['p']],
        distractors: ['nsmallest', 'no_show'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line ranks the safest bookings instead?',
        language: 'python',
        lines: ['t = test.assign(p=model.predict_proba(test[feats])[:, 1])', 'calls = t.nsmallest(20, "p")', 'print(calls["no_show"].sum())'],
        bug: 1,
        fix: 'calls = t.nlargest(20, "p")',
        explanation: 'The riskiest have the LARGEST chance of missing.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many of logistic regression\'s top 40 week-12 bookings missed?',
        answers: ['19'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why use the same top-20 measure as in Chapters 3 and 4?',
        options: [
          { text: 'So every version can be compared on the same scale' },
          { text: 'Because it\'s the highest number', why: 'Because it\'s comparable, and it matches Bisi\'s job.' },
          { text: 'scikit-learn requires it', why: 'It\'s our choice, kept on purpose.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'A new method that ties with the old one but is simpler: is that progress? When would you switch?',
    starters: ['It\'s progress if...', 'I\'d switch when...'],
  },
  deepen: {
    title: 'Ranking metrics',
    summary: '"How many of the top 20 were really missed" is called precision at 20. It\'s a natural measure when people can only act on the top of a list. Chapter 7 meets its relatives.',
  },
  notes: 'LogisticRegression, weeks 1-11 -> week 12: top 20 by predict_proba[:, 1] = 12 missed (v0.4 k-NN also 12); top 40 = 19. Random 20 expected 3.7.',
};

export default lesson;
