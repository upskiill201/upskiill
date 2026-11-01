import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';
import { VAL_BASE } from './code';

const D10 = VAL_BASE + 'tree = DecisionTreeClassifier(max_depth=10, random_state=42)\ntree.fit(train[feats], train["no_show"])\n';

/** Chapter 9 · Lesson 3 — Training score vs validation score. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Training score vs validation score',
  summary: 'Grow the tree one level at a time and watch two numbers. The training score always goes up. The validation score goes up, then down. The gap between them tells the story.',
  minutes: 11,
  outcomes: [
    'Track training and validation scores as complexity grows',
    'Read the gap between them',
    'Never trust a training score alone',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Depth 2 vs depth 10',
      before: {
        label: 'Depth 2 (4 leaves)',
        text: 'Training: 84.0%\nValidation: 80.2%\nGap: 3.8 points',
      },
      after: {
        label: 'Depth 10 (150 leaves)',
        text: 'Training: 89.1%\nValidation: 78.0%\nGap: 11.1 points',
      },
      notes: [
        'Deeper always looks better on training: each level can carve the training rows more finely.',
        'On new weeks it got worse. A growing gap is overfitting starting.',
        'With no limit at all: 96.9% training, 70.3% validation (six features).',
      ],
    },
    {
      kind: 'tryIt',
      title: 'Two numbers, ten depths',
      caption: 'Training and validation accuracy as the tree grows.',
      code: VAL_BASE + '\nfor depth in [1, 2, 4, 6, 8, 10, None]:\n    tree = DecisionTreeClassifier(max_depth=depth, random_state=42).fit(train[feats], train["no_show"])\n    print(depth, round(tree.score(train[feats], train["no_show"]), 3), round(tree.score(val[feats], val["no_show"]), 3))\n',
      challenge: 'At which depth does the validation score peak?',
    },
  ],
  apply: {
    scenario: 'Training vs validation.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print the depth-10 tree\'s training accuracy, rounded to 3 places',
        starter: D10,
        solution: D10 + 'print(round(tree.score(train[feats], train["no_show"]), 3))\n',
        hint: 'tree.score(train[feats], train["no_show"])',
        checks: [{ message: 'Print 0.891', outputEquals: '0.891' }],
      },
      {
        kind: 'mcq',
        prompt: 'As depth grows, the training score...',
        options: [
          { text: 'Goes up then down', why: 'That\'s the validation score.' },
          { text: 'Keeps going up: more leaves fit the training rows more closely' },
          { text: 'Stays the same', why: 'It rises with every level.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Print the depth-10 tree\'s validation accuracy, rounded to 3 places',
        starter: D10,
        solution: D10 + 'print(round(tree.score(val[feats], val["no_show"]), 3))\n',
        hint: 'tree.score(val[feats], val["no_show"])',
        checks: [{ message: 'Print 0.78', outputEquals: '0.78' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'Small gap or big gap?',
        groups: ['Small gap', 'Big gap'],
        items: [
          { text: 'Depth 2: 84.0 vs 80.2', group: 0 },
          { text: 'Logistic regression: 83.3 vs 79.7', group: 0 },
          { text: 'Depth 10: 89.1 vs 78.0', group: 1 },
          { text: 'No limit: 96.9 vs 70.3', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'emmanuel',
        message: 'Why report the training score at all if it\'s misleading?',
        prompt: 'Miracle\'s best reply?',
        options: [
          { text: 'We shouldn\'t.', why: 'It\'s useful for the gap.' },
          { text: 'It\'s the real score.', why: 'Validation is closer to real use.' },
          { text: 'On its own it\'s misleading. Next to the validation score, the gap is a diagnosis: small gap fine, big gap overfitting.' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the depth to its validation accuracy.',
        pairs: [
          ['1', '0.785'],
          ['2', '0.802'],
          ['10', '0.78'],
          ['No limit', '0.703'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The pattern.',
        template: 'Training scores always [[1]] with depth; validation scores rise, then [[2]].',
        blanks: [['rise'], ['fall']],
        distractors: ['fall', 'stop'],
      },
      {
        kind: 'findBug',
        prompt: 'Which choice uses the wrong score?',
        lines: ['Compare depths on validation accuracy.', 'Report training and validation together.', 'Pick the depth with the best training accuracy.'],
        bug: 2,
        fix: 'Pick the depth with the best validation result.',
        explanation: 'Training accuracy always favours the deepest tree.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many leaves does the depth-10 tree have?',
        answers: ['150'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Logistic regression: 83.3% training, 79.7% validation. What does that suggest?',
        options: [
          { text: 'Heavy overfitting', why: 'The gap is small.' },
          { text: 'It isn\'t memorising: the gap is small' },
          { text: 'It\'s useless', why: 'It saves the most minutes so far.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'Where else does practising on the same questions make you look better than you are?',
    starters: ['For example...'],
  },
  deepen: {
    title: 'Validation curves',
    summary: 'Plotting training and validation scores against a setting like depth gives a validation curve. scikit-learn\'s validation_curve does the loop for you.',
  },
  notes: 'v0.8 features, weeks 1-9 -> 10-11, DecisionTreeClassifier(random_state=42): depth 1 0.825/0.785; 2 0.84/0.802 (4 leaves); 3 0.842/0.795; 4 0.849/0.79; 5 0.853/0.795; 6 0.858/0.8; 8 0.871/0.802; 10 0.891/0.78 (150 leaves); None 0.969/0.703 (507 leaves). LR 0.833/0.797.',
};

export default lesson;
