import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';
import { DATA, F7, IMPORTS, MINUTES, VAL_SPLIT } from './code';

const CHIDI = IMPORTS + DATA + F7 + VAL_SPLIT + MINUTES + 'tree = DecisionTreeClassifier(random_state=42)\ntree.fit(train[feats], train["no_show"])\n';

/** Chapter 9 · Lesson 1 — Overfitting. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'Overfitting',
  summary: 'Chidi\'s unlimited tree gets 99.5% of the training weeks right. On weeks it hasn\'t seen, 71%: worse than saying "everyone comes". That gap has a name: overfitting.',
  minutes: 12,
  outcomes: [
    'Explain overfitting in plain words',
    'Spot it from a training score and a validation score',
    'Connect it to memorising',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Ninety-nine and a half',
      beats: [
        { speaker: 'chidi', text: 'Unlimited depth, every number column. Weeks 1 to 9: 99.5% right. Beat that.' },
        { speaker: 'miracle', text: 'Weeks 10 and 11, please.' },
        { speaker: 'narrator', text: 'Chidi runs it. 71.3%. Saying "everyone comes" would get 78.5%.' },
        { speaker: 'chidi', text: '...How? It was nearly perfect.' },
        { speaker: 'halima', text: 'It has 443 leaves for 1,800 bookings. Most leaves describe a handful of patients. It learned them, not the pattern.' },
        { speaker: 'tey', text: 'That\'s overfitting: fitting the training data so closely that the noise gets learned too. What should the team do next?' },
      ],
      choice: {
        prompt: 'What should the team do about Chidi\'s tree?',
        options: [
          { text: 'Judge every model on data it hasn\'t seen, and find the depth where it stops learning patterns and starts memorising.', outcome: 'Yes. That\'s this chapter: the gap, the sweet spot, then cross-validation to make the judgement trustworthy.', best: true },
          { text: 'Grow it even deeper.', outcome: 'It\'s already memorising. Deeper means more memorising.' },
          { text: 'Give up on trees forever.', outcome: 'Too hasty. A tree with sensible depth can be decent. The point is to measure it fairly.' },
        ],
      },
    },
    {
      kind: 'tryIt',
      title: 'Chidi\'s tree',
      caption: 'Training weeks vs new weeks.',
      code: CHIDI + '\nprint("Training accuracy:", round(tree.score(train[feats], train["no_show"]), 3))\nprint("Validation accuracy:", round(tree.score(val[feats], val["no_show"]), 3))\nprint("Leaves:", tree.get_n_leaves())\nflags = (tree.predict_proba(val[feats])[:, 1] >= 0.2).astype(int)\nprint("Validation minutes lost:", minutes(flags, val["no_show"]))\n',
      challenge: 'v0.8 lost 1,225 minutes on the same weeks. How does Chidi\'s tree compare?',
    },
  ],
  apply: {
    scenario: 'Overfitting.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print the accuracy of Chidi\'s tree on its own training weeks, rounded to 3 places',
        starter: CHIDI,
        solution: CHIDI + 'print(round(tree.score(train[feats], train["no_show"]), 3))\n',
        hint: 'tree.score(train[feats], train["no_show"])',
        checks: [{ message: 'Print 0.995', outputEquals: '0.995' }],
      },
      {
        kind: 'mcq',
        prompt: 'What is overfitting?',
        options: [
          { text: 'Training for too long', why: 'It\'s about fitting too closely, not time.' },
          { text: 'Learning the training data so closely that its noise gets learned too, so new data goes worse' },
          { text: 'Using too little data', why: 'That can cause it, but it isn\'t the definition.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Now print its accuracy on the validation weeks, rounded to 3 places',
        starter: CHIDI,
        solution: CHIDI + 'print(round(tree.score(val[feats], val["no_show"]), 3))\n',
        hint: 'tree.score(val[feats], val["no_show"])',
        checks: [{ message: 'Print 0.713', outputEquals: '0.713' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'Sign of overfitting, or not?',
        groups: ['Overfitting', 'Not overfitting'],
        items: [
          { text: '99.5% training, 71% validation', group: 0 },
          { text: '443 leaves for 1,800 rows', group: 0 },
          { text: '83% training, 80% validation', group: 1 },
          { text: 'Similar scores on old and new weeks', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'chidi',
        message: 'But it\'s nearly perfect on real data! The training weeks are real.',
        prompt: 'Miracle\'s best reply?',
        options: [
          { text: 'Fair point, ship it.', why: 'Validation says otherwise.' },
          { text: 'Training data isn\'t real.', why: 'It is; it\'s just already known.' },
          { text: 'Real, and already answered. The clinic needs predictions for weeks nobody has seen. On those, it\'s worse than doing nothing.' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the number to Chidi\'s tree.',
        pairs: [
          ['99.5%', 'Training accuracy'],
          ['71.3%', 'Validation accuracy'],
          ['443', 'Leaves'],
          ['1,540', 'Validation minutes lost'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The sign.',
        template: 'High [[1]] score, much lower [[2]] score: overfitting.',
        blanks: [['training'], ['validation']],
        distractors: ['test-week', 'baseline'],
      },
      {
        kind: 'findBug',
        prompt: 'Which conclusion is wrong?',
        lines: ['The tree scored 99.5% on weeks 1 to 9.', 'It scored 71.3% on weeks 10 and 11.', 'So it will score about 99% next week.'],
        bug: 2,
        fix: 'So it will probably score about 71% next week.',
        explanation: 'New weeks look like validation, not training.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'What does "everyone comes" score on weeks 10 and 11? (a percentage)',
        answers: ['78.5', '78.5%'],
        placeholder: 'A percentage',
      },
      {
        kind: 'mcq',
        prompt: 'Where have you seen overfitting before in this course?',
        options: [
          { text: 'Chapter 8\'s one-hot IDs: 100% training, no gain on validation' },
          { text: 'The rain feature', why: 'Rain helped on validation.' },
          { text: 'The DummyClassifier', why: 'It can\'t memorise anything.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Think of someone who "studied to the test" and struggled with real problems. How is that like Chidi\'s tree?',
    starters: ['It\'s like...'],
  },
  deepen: {
    title: 'Noise',
    summary: 'Every dataset has noise: outcomes that happened by chance. A patient who missed because of a flat tyre is noise. A model that learns noise will be wrong about everyone who didn\'t have that flat tyre.',
  },
  notes: 'Chidi\'s tree: DecisionTreeClassifier(random_state=42), no depth limit, features v0.8 six + hour. Weeks 1-9 -> 10-11: train 0.995, val 0.713, 443 leaves, val minutes 1540 (v0.8 1225; nothing 1720; everyone comes 0.785).',
};

export default lesson;
