import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';
import { DATA, IMPORTS, LR_FIT, VAL_SPLIT } from './code';

/** Chapter 6 · Lesson 15 — Checkpoint 3: chances compared, fair comparison, explaining, three classes. */
const lesson: OriginalLesson = {
  key: 'l15',
  title: 'Checkpoint: choosing a classifier',
  summary: 'Two models, one rule, one sentence for Mrs Okonkwo, and a three-way staffing forecast. Check you can compare classifiers fairly, explain one prediction and handle more than two classes.',
  minutes: 13,
  milestone: 'CHECKPOINT',
  outcomes: ['Compare classifiers fairly and explain a prediction', 'Work with three classes'],
  learn: [
    {
      kind: 'compare',
      title: 'The two finalists',
      before: {
        label: 'Logistic regression',
        text: 'Validation top 40: 24.\nA chance for every booking.\nFour coefficients you can read.',
      },
      after: {
        label: 'Tree, depth 8',
        text: 'Validation top 40: 28.\n93 leaves.\nA long, different path for each patient.',
      },
      notes: ['Miracle\'s rule, agreed first: best validation score, unless managers can\'t understand the model.'],
    },
  ],
  apply: {
    scenario: 'Checkpoint 3: choosing a classifier.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print how many different no-show chances logistic regression gives week 12',
        starter: LR_FIT + 'p = model.predict_proba(test[feats])[:, 1]\n',
        solution: LR_FIT + 'p = model.predict_proba(test[feats])[:, 1]\nprint(len(set(p.round(6))))\n',
        hint: 'len(set(p.round(6)))',
        checks: [{ message: 'Print 187', outputEquals: '187' }],
      },
      {
        kind: 'mcq',
        prompt: 'Why does a depth-2 tree rank bookings less finely?',
        options: [
          { text: 'It uses fewer features', why: 'It can use any of them; the problem is the leaves.' },
          { text: 'It has only 4 leaves, so only 4 possible chances, and many ties' },
          { text: 'It can\'t give chances', why: 'It can: the leaf\'s share of no-shows.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'On the validation weeks, print logistic regression\'s top-40 score',
        starter: IMPORTS + DATA + VAL_SPLIT + 'model = LogisticRegression().fit(train[feats], train["no_show"])\n',
        solution: IMPORTS + DATA + VAL_SPLIT + 'model = LogisticRegression().fit(train[feats], train["no_show"])\nv = val.assign(p=model.predict_proba(val[feats])[:, 1])\nprint(v.nlargest(40, "p")["no_show"].sum())\n',
        hint: 'v.nlargest(40, "p")["no_show"].sum()',
        checks: [{ message: 'Print 24', outputEquals: '24' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'Fair comparison, or not?',
        groups: ['Fair', 'Unfair'],
        items: [
          { text: 'Both scored on weeks 10 and 11', group: 0 },
          { text: 'Rule written before the scores', group: 0 },
          { text: 'One scored on its training weeks', group: 1 },
          { text: 'Winner picked on week 12', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'bisi',
        message: 'Mrs Okonkwo is asking why A12323 is first on the list. What do I tell her?',
        prompt: 'Halima\'s best reply?',
        options: [
          { text: 'Her chance is 0.733.', why: 'A number isn\'t a reason.' },
          { text: 'The computer said so.', why: 'That builds no trust.' },
          { text: 'She has missed four times before and didn\'t get a reminder text. Those are the two strongest warning signs.' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the band to its range of bookings.',
        pairs: [
          ['Quiet', 'Up to 24'],
          ['Normal', '25 to 34'],
          ['Busy', '35 or more'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Three classes.',
        language: 'python',
        template: 'print(model.[[1]])  # busy, normal, quiet\nprobs = model.[[2]](week)',
        blanks: [['classes_'], ['predict_proba']],
        distractors: ['coef_', 'predict'],
      },
      {
        kind: 'findBug',
        prompt: 'Which decision breaks Miracle\'s rule?',
        lines: ['The rule was agreed on Monday.', 'Both models were scored on validation.', 'After seeing week 12, the team added "and the higher week-12 score".'],
        bug: 2,
        fix: 'Keep the rule as agreed; week 12 is opened once, at the end.',
        explanation: 'Changing the rule after seeing results is exactly what the rule is there to stop.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'With the bands, how many columns does predict_proba return?',
        answers: ['3', 'three'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Review, lesson 9: which depth did the tree do best at on validation?',
        options: [
          { text: '8' },
          { text: 'Unlimited', why: 'It caught only 17 of the top 40: it memorised.' },
          { text: '2', why: '18: too simple.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Which part of choosing a model would you find hardest to stick to: the rule, the fair comparison, or explaining it?',
    starters: ['The hardest part would be...'],
  },
  notes: 'Checkpoint for Chapter 6 lessons 11-14. Week 12 LR: 187 distinct chances. Validation top 40: LR 24, depth-8 tree 28. Bands quiet <=24, normal 25-34, busy >=35.',
};

export default lesson;
