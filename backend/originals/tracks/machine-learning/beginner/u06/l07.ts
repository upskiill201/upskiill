import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';
import { TREE_BASE } from './code';

/** Chapter 6 · Lesson 7 — Decision trees. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'Decision trees',
  summary: 'Bisi says: "I don\'t think in coefficients. I think: has she missed before? Does she live far?" That\'s a decision tree: a flowchart of yes/no questions, learned from the data. scikit-learn grows one in two lines.',
  minutes: 12,
  outcomes: [
    'Explain a decision tree as learned yes/no questions',
    'Train a DecisionTreeClassifier',
    'Limit a tree\'s depth',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Bisi\'s questions',
      beats: [
        { speaker: 'bisi', text: 'When I decide who to call, I don\'t add numbers. I ask: missed a lot before? Lives far? Then I decide.' },
        { speaker: 'miracle', text: 'That\'s a decision tree. The model asks yes/no questions, one after another, and learns which questions split misses from comes best.' },
        { speaker: 'halima', text: 'And it can bend. Remember the nurses curve? A tree can say "more than 2 nurses: busy" without needing a straight line.' },
        { speaker: 'chidi', text: 'How many questions does it ask?' },
        { speaker: 'tey', text: 'As many as you let it. max_depth sets the limit. Bisi wants something she could read on one page. Where should Halima start?' },
      ],
      choice: {
        prompt: 'Where should Halima start?',
        options: [
          { text: 'A tree of depth 2: just two questions, so everyone can read it.', outcome: 'Yes. Start small and readable. Depth 2 scores 83.5% on week 12 with only four end points. Deeper trees come later, with care.', best: true },
          { text: 'No depth limit: let it ask everything.', outcome: 'An unlimited tree memorises the training weeks (93.8%) and does worse on week 12 (79.5%). Chapter 9 is about exactly this.' },
          { text: 'Skip trees: logistic regression is enough.', outcome: 'Trees can bend and read like Bisi\'s own thinking. Worth trying.' },
        ],
      },
    },
    {
      kind: 'tryIt',
      title: 'A two-question tree',
      caption: 'DecisionTreeClassifier with max_depth=2.',
      code: TREE_BASE + '\ntree = DecisionTreeClassifier(max_depth=2, random_state=42)\ntree.fit(train[feats], train["no_show"])\nprint("Week 12 accuracy:", tree.score(test[feats], test["no_show"]))\nprint("End points (leaves):", tree.get_n_leaves())\n',
      challenge: 'Try max_depth=None. What happens to the training and test scores?',
    },
  ],
  apply: {
    scenario: 'Decision trees.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Train a depth-2 tree (random_state=42) on weeks 1 to 11 and print its week-12 accuracy',
        starter: TREE_BASE + 'tree = DecisionTreeClassifier(max_depth=2, random_state=42)\n',
        solution: TREE_BASE + 'tree = DecisionTreeClassifier(max_depth=2, random_state=42)\ntree.fit(train[feats], train["no_show"])\nprint(tree.score(test[feats], test["no_show"]))\n',
        hint: 'tree.fit(...), then tree.score(test[feats], test["no_show"])',
        checks: [{ message: 'Print 0.835', outputEquals: '0.835' }],
      },
      {
        kind: 'mcq',
        prompt: 'What is a decision tree?',
        options: [
          { text: 'A list of coefficients', why: 'That\'s logistic regression.' },
          { text: 'A flowchart of yes/no questions learned from the data' },
          { text: 'A random guess', why: 'Its questions are learned to split misses from comes.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Train an unlimited tree (max_depth=None, random_state=42) and print its accuracy on the training weeks, rounded to 3 places',
        starter: TREE_BASE + 'tree = DecisionTreeClassifier(max_depth=None, random_state=42)\ntree.fit(train[feats], train["no_show"])\n',
        solution: TREE_BASE + 'tree = DecisionTreeClassifier(max_depth=None, random_state=42)\ntree.fit(train[feats], train["no_show"])\nprint(round(tree.score(train[feats], train["no_show"]), 3))\n',
        hint: 'tree.score(train[feats], train["no_show"])',
        checks: [{ message: 'Print 0.938', outputEquals: '0.938' }],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the tree to its scores.',
        pairs: [
          ['Depth 2, week 12', '83.5%'],
          ['Unlimited, training weeks', '93.8%'],
          ['Unlimited, week 12', '79.5%'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Decision tree or logistic regression?',
        groups: ['Decision tree', 'Logistic regression'],
        items: [
          { text: 'Asks yes/no questions in order', group: 0 },
          { text: 'Adds up feature x coefficient', group: 1 },
          { text: 'Can bend to fit shapes like the nurse curve', group: 0 },
          { text: 'Gives one number per feature', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'chidi',
        message: 'The unlimited tree gets 93.8%! Best model yet!',
        prompt: 'Halima\'s best reply?',
        options: [
          { text: 'On the training weeks. On week 12 it gets 79.5%, below guessing. It memorised; Chapter 9 is all about this.' },
          { text: 'Yes, ship it.', why: 'That\'s a training score. The test score is worse than guessing.' },
          { text: 'Trees are always wrong.', why: 'The depth-2 tree is the best on week 12 so far.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'A small tree.',
        language: 'python',
        template: 'tree = DecisionTreeClassifier([[1]]=2, [[2]]=42)',
        blanks: [['max_depth'], ['random_state']],
        distractors: ['depth', 'seed'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line grows a tree with no limit?',
        language: 'python',
        lines: ['tree = DecisionTreeClassifier(random_state=42)', 'tree.fit(train[feats], train["no_show"])', 'print(tree.get_n_leaves())'],
        bug: 0,
        fix: 'tree = DecisionTreeClassifier(max_depth=2, random_state=42)',
        explanation: 'Without max_depth, the tree keeps splitting until it memorises the training data.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many end points (leaves) does a depth-2 tree have, at most?',
        answers: ['4', 'four'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why set random_state on a tree?',
        options: [
          { text: 'To make it more accurate', why: 'It makes it repeatable.' },
          { text: 'When splits tie, it picks the same one every run, so results repeat' },
          { text: 'Trees need a seed to work', why: 'They work without it, but results can vary.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'Write two yes/no questions you\'d ask to decide whether someone might miss an appointment.',
    starters: ['Question one...', 'Question two...'],
  },
  deepen: {
    title: 'How a tree picks its questions',
    summary: 'At each step the tree tries many possible questions ("distance over 40?", "past misses over 2?") and keeps the one that best separates misses from comes in the training data. Then it repeats inside each branch.',
  },
  notes: 'DecisionTreeClassifier(random_state=42), 4 features, weeks 1-11 -> 12: depth 2 test 0.835 (4 leaves); unlimited train 0.938, test 0.795. Depth 8: 93 leaves.',
};

export default lesson;
