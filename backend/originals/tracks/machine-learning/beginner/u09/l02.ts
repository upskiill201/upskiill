import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';
import { VAL_BASE } from './code';

const STUMP = VAL_BASE + 'stump = DecisionTreeClassifier(max_depth=1, random_state=42)\nstump.fit(train[feats], train["no_show"])\n';

/** Chapter 9 · Lesson 2 — Underfitting. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'Underfitting',
  summary: 'The opposite mistake: a model too simple to learn the pattern at all. A one-question tree gets similar scores on old and new weeks, and both are poor. Six steps to recognise it.',
  minutes: 11,
  outcomes: [
    'Explain underfitting',
    'Tell underfitting from overfitting by the scores',
    'Know what to try when a model underfits',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Too simple',
      steps: [
        { title: '1. A one-question tree', body: 'max_depth=1: the tree asks a single question and has 2 leaves. Some people call it a stump.', code: 'DecisionTreeClassifier(max_depth=1)', language: 'python' },
        { title: '2. Its scores', body: 'Training weeks: 82.5%. Validation weeks: 78.5%. Close together, so it isn\'t memorising.' },
        { title: '3. But close to doing nothing', body: '"Everyone comes" scores 78.5% on the validation weeks too. The stump has learned almost nothing.' },
        { title: '4. In minutes', body: 'It loses 1,580 validation minutes. v0.8 loses 1,225; doing nothing, 1,720.' },
        { title: '5. The signature', body: 'Underfitting: training and validation both poor, and close together. Overfitting: training great, validation much worse.' },
        { title: '6. The fixes', body: 'Give it more to work with: more depth, better features, or a different model. The opposite of fixing overfitting.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'The stump',
      caption: 'One question, two leaves.',
      code: STUMP + '\nprint("Training:", round(stump.score(train[feats], train["no_show"]), 3))\nprint("Validation:", round(stump.score(val[feats], val["no_show"]), 3))\nflags = (stump.predict_proba(val[feats])[:, 1] >= 0.2).astype(int)\nprint("Minutes lost:", minutes(flags, val["no_show"]))\n',
      challenge: 'Which feature does the stump ask about? Use tree.feature_importances_ or export_text.',
    },
  ],
  apply: {
    scenario: 'Underfitting.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print the stump\'s training accuracy, rounded to 3 places',
        starter: STUMP,
        solution: STUMP + 'print(round(stump.score(train[feats], train["no_show"]), 3))\n',
        hint: 'stump.score(train[feats], train["no_show"])',
        checks: [{ message: 'Print 0.825', outputEquals: '0.825' }],
      },
      {
        kind: 'mcq',
        prompt: 'Training 82.5%, validation 78.5%, doing nothing 78.5%. What\'s wrong?',
        options: [
          { text: 'Overfitting', why: 'The scores are close; it isn\'t memorising.' },
          { text: 'Nothing', why: 'It matches doing nothing.' },
          { text: 'Underfitting: too simple to learn the pattern' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Print the stump\'s validation minutes lost',
        starter: STUMP + 'flags = (stump.predict_proba(val[feats])[:, 1] >= 0.2).astype(int)\n',
        solution: STUMP + 'flags = (stump.predict_proba(val[feats])[:, 1] >= 0.2).astype(int)\nprint(minutes(flags, val["no_show"]))\n',
        hint: 'minutes(flags, val["no_show"])',
        checks: [{ message: 'Print 1580', outputEquals: '1580' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'Underfitting or overfitting?',
        groups: ['Underfitting', 'Overfitting'],
        items: [
          { text: 'Both scores poor and close', group: 0 },
          { text: 'A one-question tree', group: 0 },
          { text: 'Training great, validation poor', group: 1 },
          { text: '443 leaves', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'chidi',
        message: 'So my deep tree overfits and this stump underfits. Is there anything in between?',
        prompt: 'Halima\'s best reply?',
        options: [
          { text: 'No, trees can\'t work.', why: 'A middle depth can.' },
          { text: 'Yes: somewhere between 1 question and 443 leaves there\'s a depth that learns the pattern but not the noise. That\'s the sweet spot, in lesson 4.' },
          { text: 'Use depth 1000.', why: 'That\'s even more overfitting.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the problem to its fix.',
        pairs: [
          ['Underfitting', 'More depth or better features'],
          ['Overfitting', 'Less depth or more data'],
          ['Leak', 'Remove the column'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'A stump.',
        language: 'python',
        template: 'stump = DecisionTreeClassifier([[1]]=1)\nprint(stump.fit(train[feats], train["no_show"]).[[2]]())',
        blanks: [['max_depth'], ['get_n_leaves']],
        distractors: ['depth', 'leaves'],
      },
      {
        kind: 'findBug',
        prompt: 'Which diagnosis is wrong?',
        lines: ['Training 99%, validation 71%: overfitting.', 'Training 82%, validation 78%, baseline 78%: underfitting.', 'Training 83%, validation 80%, saves many minutes: underfitting.'],
        bug: 2,
        fix: 'Training 83%, validation 80%, saves many minutes: a reasonable fit.',
        explanation: 'Close scores are fine when the model clearly beats doing nothing.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many leaves does a depth-1 tree have?',
        answers: ['2', 'two'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Close training and validation scores are good news only when...',
        options: [
          { text: 'Both are clearly better than doing nothing' },
          { text: 'Both are above 50%', why: 'Doing nothing scores 78.5% here.' },
          { text: 'Always', why: 'The stump has close scores and learns little.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Think of advice so simple it\'s useless ("just work harder"). How is it like a stump?',
    starters: ['It\'s like...'],
  },
  deepen: {
    title: 'Bias and variance',
    summary: 'Statisticians call underfitting "high bias" (too rigid) and overfitting "high variance" (too wobbly). Good models balance the two.',
  },
  notes: 'Depth-1 tree on v0.8 features, weeks 1-9 -> 10-11: train 0.825, val 0.785, 2 leaves, minutes 1580 (v0.8 1225, nothing 1720).',
};

export default lesson;
