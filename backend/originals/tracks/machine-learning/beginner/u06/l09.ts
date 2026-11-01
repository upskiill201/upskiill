import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';
import { DATA, IMPORTS, TREE, VAL_SPLIT } from './code';

const VAL_BASE = IMPORTS + TREE + DATA + VAL_SPLIT;

/** Chapter 6 · Lesson 9 — How deep should a tree go? Choose on validation. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'How deep should a tree go?',
  summary: 'Shallow trees miss patterns. Deep trees memorise. The right depth is somewhere in between, and Chapter 4 already taught how to find it without peeking: try depths on weeks 10 and 11, keep week 12 locked.',
  minutes: 13,
  outcomes: [
    'Compare a shallow and a deep tree',
    'Choose a depth on the validation weeks',
    'Explain why the deepest tree isn\'t the best',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Shallow vs deep',
      before: {
        label: 'Depth 2',
        text: '4 leaves: rules anyone can read\nUses only past misses and distance\nValidation top 40: 18 no-shows\nWon\'t memorise\nMisses subtler patterns',
      },
      after: {
        label: 'Depth 8',
        text: '93 leaves: too many to read\nUses every feature, many times\nValidation top 40: 28 no-shows\nStarting to memorise\nUnlimited depth falls back to 17',
      },
      notes: [
        'Validation weeks (10 and 11), learning from weeks 1 to 9: depth 1: 16, 2: 18, 3: 20, 4: 25, 5: 24, 8: 28, unlimited: 17.',
        'Deeper helps up to a point, then hurts: the unlimited tree memorises the training weeks.',
        'Depth 8 wins on validation, but it has 93 leaves. Nobody can read that.',
        'Week 12 stays locked until a model is chosen (lesson 19).',
      ],
    },
    {
      kind: 'tryIt',
      title: 'Depths on validation',
      caption: 'Learn on weeks 1 to 9, compare on 10 and 11.',
      code: VAL_BASE + '\nfor d in [2, 4, 8, None]:\n    tree = DecisionTreeClassifier(max_depth=d, random_state=42)\n    tree.fit(train[feats], train["no_show"])\n    v = val.assign(p=tree.predict_proba(val[feats])[:, 1])\n    print(d, "top 40:", v.nlargest(40, "p")["no_show"].sum(), " leaves:", tree.get_n_leaves())\n',
      challenge: 'Add depths 5 and 10. Where does it peak?',
    },
  ],
  apply: {
    scenario: 'How deep?',
    items: [
      {
        kind: 'writeCode',
        prompt: 'On the validation weeks, print how many of a depth-8 tree\'s top 40 really missed',
        starter: VAL_BASE + 'tree = DecisionTreeClassifier(max_depth=8, random_state=42)\ntree.fit(train[feats], train["no_show"])\n',
        solution: VAL_BASE + 'tree = DecisionTreeClassifier(max_depth=8, random_state=42)\ntree.fit(train[feats], train["no_show"])\nv = val.assign(p=tree.predict_proba(val[feats])[:, 1])\nprint(v.nlargest(40, "p")["no_show"].sum())\n',
        hint: 'v = val.assign(p=tree.predict_proba(val[feats])[:, 1])',
        checks: [{ message: 'Print 28', outputEquals: '28' }],
      },
      {
        kind: 'mcq',
        prompt: 'Why is the unlimited tree worse on validation than depth 8?',
        options: [
          { text: 'It memorised the training weeks instead of learning patterns that carry over' },
          { text: 'It has too few leaves', why: 'It has the most.' },
          { text: 'Validation weeks are broken', why: 'They\'re fine. The tree overfits.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Print how many leaves the depth-8 tree has',
        starter: VAL_BASE + 'tree = DecisionTreeClassifier(max_depth=8, random_state=42)\ntree.fit(train[feats], train["no_show"])\n',
        solution: VAL_BASE + 'tree = DecisionTreeClassifier(max_depth=8, random_state=42)\ntree.fit(train[feats], train["no_show"])\nprint(tree.get_n_leaves())\n',
        hint: 'tree.get_n_leaves()',
        checks: [{ message: 'Print 93', outputEquals: '93' }],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the depth to its validation top 40.',
        pairs: [
          ['Depth 1', '16'],
          ['Depth 4', '25'],
          ['Depth 8', '28'],
          ['Unlimited', '17'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Shallow tree or deep tree?',
        groups: ['Shallow', 'Deep'],
        items: [
          { text: 'Rules fit on a sticky note', group: 0 },
          { text: 'Risks memorising', group: 1 },
          { text: 'Misses subtle patterns', group: 0 },
          { text: 'Dozens of leaves', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'chidi',
        message: 'Depth 8 wins on validation. Why not go straight to week 12 with it?',
        prompt: 'Miracle\'s best reply?',
        options: [
          { text: 'Try all depths on week 12 to be sure.', why: 'That\'s peeking.' },
          { text: 'Depth 8 is perfect.', why: 'It\'s best on validation. "Perfect" needs more evidence.' },
          { text: 'We will test one model on week 12, once. First decide what we need: if clinics must understand it, 93 leaves is a problem. Decide the rule, then open week 12.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Choosing depth.',
        template: 'Choose the depth on the [[1]] weeks; open week 12 only [[2]].',
        blanks: [['validation'], ['once']],
        distractors: ['test', 'twice'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line chooses the depth by peeking?',
        language: 'python',
        lines: ['for d in [2, 4, 8, None]:', '    tree = DecisionTreeClassifier(max_depth=d, random_state=42).fit(train[feats], train["no_show"])', '    print(d, tree.score(test[feats], test["no_show"]))'],
        bug: 2,
        fix: '    print(d, tree.score(val[feats], val["no_show"]))',
        explanation: 'Compare depths on the validation weeks, not the test week.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which depth had the best validation top 40?',
        answers: ['8', 'eight', 'depth 8'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'What usually happens as a tree gets deeper?',
        options: [
          { text: 'It always improves', why: 'The unlimited tree is worse.' },
          { text: 'It improves for a while, then starts memorising and gets worse on new data' },
          { text: 'It always gets worse', why: 'Depths 3 to 8 beat depth 2 here.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'Is there something you\'ve "overfitted" to, like a route you only know one way, or a recipe that only works in your kitchen?',
    starters: ['I overfitted to...', 'It broke when...'],
  },
  deepen: {
    title: 'Pruning',
    summary: 'Besides max_depth, trees can be limited by min_samples_leaf (each leaf needs enough bookings) or pruned after growing. Chapter 9 tunes these properly with cross-validation.',
  },
  notes: 'Trees (random_state=42) trained on weeks 1-9, validated on weeks 10-11 (400 rows, 86 no-shows), top 40 by predict_proba: depth 1 16, 2 18, 3 20, 4 25, 5 24, 6 26, 7 26, 8 28, 10 25, 12 19, None 17. Leaves on weeks 1-9: depth 2 4, 4 15, 8 93, None 487 (depth 8 on weeks 1-11 also 93).',
};

export default lesson;
