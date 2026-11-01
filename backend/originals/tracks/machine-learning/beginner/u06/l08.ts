import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';
import { TREE_BASE } from './code';

const TREE2 = 'tree = DecisionTreeClassifier(max_depth=2, random_state=42)\ntree.fit(train[feats], train["no_show"])\n';

/** Chapter 6 · Lesson 8 — Reading a tree. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Reading a tree',
  summary: 'A depth-2 tree is short enough to print and pin to the wall. Halima prints it and finds two questions about past misses and distance, the same things Bisi asks. Tap through what each branch means.',
  minutes: 12,
  outcomes: [
    'Print a tree\'s rules with export_text',
    'Follow a booking down the tree',
    'Explain a tree\'s decision in plain words',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'The depth-2 tree',
      text: 'Question 1: previous_no_shows <= 2.5? If yes, Question 2: distance_km <= 40.5? Yes: predict come. No: predict miss. If no (3 or more past misses), Question 2: distance_km <= 8.5? Yes: predict come. No: predict miss.',
      hotspots: [
        { phrase: 'previous_no_shows <= 2.5?', note: 'The first, most useful question: has the patient missed 3 or more times before? (2.5 just sits between 2 and 3.)' },
        { phrase: 'distance_km <= 40.5?', note: 'For patients with few past misses, only a very long trip (over 40 km, almost always Gumel) tips the prediction to "miss".' },
        { phrase: 'distance_km <= 8.5?', note: 'For frequent missers, even a moderate trip is enough: anyone more than 8.5 km away is predicted to miss.' },
        { phrase: 'predict come', note: 'Each end point (leaf) predicts the majority answer of the training bookings that landed there.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'A small tree is a set of rules anyone can check against their experience. Bisi read this one and said: "Yes. That\'s who I worry about."',
    },
    {
      kind: 'tryIt',
      title: 'Print the tree',
      caption: 'export_text turns a tree into readable rules.',
      code: TREE_BASE + 'from sklearn.tree import export_text\n\ntree = DecisionTreeClassifier(max_depth=2, random_state=42)\ntree.fit(train[feats], train["no_show"])\nprint(export_text(tree, feature_names=feats))\n',
      challenge: 'Follow a patient with 1 past miss who lives 12 km away. What does the tree say?',
    },
  ],
  apply: {
    scenario: 'Reading a tree.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print the depth-2 tree\'s rules with export_text',
        starter: TREE_BASE + 'from sklearn.tree import export_text\n' + TREE2,
        solution: TREE_BASE + 'from sklearn.tree import export_text\n' + TREE2 + 'print(export_text(tree, feature_names=feats))\n',
        hint: 'export_text(tree, feature_names=feats)',
        checks: [{ message: 'The printed rules start with previous_no_shows', outputIncludes: '|--- previous_no_shows <= 2.50' }],
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the tree\'s first question?',
        options: [
          { text: 'Did they get a reminder?', why: 'The first split is on previous_no_shows.' },
          { text: 'How long did they wait?', why: 'The first split is on previous_no_shows.' },
          { text: 'Has the patient missed 3 or more times before?' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Follow each patient. What does the tree predict?',
        groups: ['Come', 'Miss'],
        items: [
          { text: '0 past misses, 5 km', group: 0 },
          { text: '1 past miss, 50 km', group: 1 },
          { text: '3 past misses, 6 km', group: 0 },
          { text: '4 past misses, 12 km', group: 1 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Ask the tree about a patient with 4 past misses, 12 km away, a 10-day wait and no reminder. Print its prediction',
        starter: TREE_BASE + TREE2 + 'patient = pd.DataFrame({"wait_days": [10], "distance_km": [12], "previous_no_shows": [4], "sms_reminder": [0]})\n',
        solution: TREE_BASE + TREE2 + 'patient = pd.DataFrame({"wait_days": [10], "distance_km": [12], "previous_no_shows": [4], "sms_reminder": [0]})\nprint(tree.predict(patient)[0])\n',
        hint: 'tree.predict(patient)[0]',
        checks: [{ message: 'Print 1 (miss)', outputEquals: '1' }],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the branch to the rule.',
        pairs: [
          ['Question 1', 'previous_no_shows <= 2.5'],
          ['Question 2, few past misses', 'distance_km <= 40.5'],
          ['Question 2, frequent missers', 'distance_km <= 8.5'],
          ['Each leaf', 'The majority answer of its bookings'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'folake',
        message: 'Why does the tree ignore reminders and waiting?',
        prompt: 'Halima\'s best reply?',
        options: [
          { text: 'They don\'t matter.', why: 'They do. Two questions just aren\'t enough to include them.' },
          { text: 'With only two questions, it picks the two that split best. Reminders matter too; a deeper tree, or logistic regression, uses them.' },
          { text: 'It\'s a bug.', why: 'It\'s a choice forced by depth 2.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Printing rules.',
        language: 'python',
        template: 'from sklearn.tree import [[1]]\nprint(export_text(tree, feature_names=[[2]]))',
        blanks: [['export_text'], ['feats']],
        distractors: ['plot_tree', 'test'],
      },
      {
        kind: 'findBug',
        prompt: 'Which reading of the tree is wrong?',
        lines: ['The first split is on past no-shows.', 'Frequent missers living over 8.5 km are flagged.', 'Anyone over 8.5 km is flagged.'],
        bug: 2,
        fix: 'Only frequent missers over 8.5 km; others need over 40.5 km.',
        explanation: 'The distance cut-off depends on which branch you\'re in.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'For patients with 2 or fewer past misses, over how many km does the tree predict "miss"?',
        answers: ['40.5'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why did Bisi trust this tree quickly?',
        options: [
          { text: 'It scored 100%', why: 'It scored 83.5% on week 12.' },
          { text: 'It was printed', why: 'Printing helped her read it. Matching her experience built the trust.' },
          { text: 'Its questions match what she already worries about' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Is there a rule in the tree you\'d question, from your own experience? Which one?',
    starters: ['I\'d question...', 'Because...'],
  },
  deepen: {
    title: 'Drawing trees',
    summary: 'scikit-learn can also draw a tree with plot_tree. Text is often clearer for small trees, and it fits on a phone screen.',
  },
  notes: 'Depth-2 tree (random_state=42), weeks 1-11: root previous_no_shows <= 2.5; left: distance_km <= 40.5 -> 0 else 1; right: distance_km <= 8.5 -> 0 else 1. Patient (wait 10, 12 km, 4 previous, no sms) -> 1.',
};

export default lesson;
