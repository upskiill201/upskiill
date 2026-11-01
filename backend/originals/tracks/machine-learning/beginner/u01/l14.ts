import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 14 — Kinds of problems: predict a number, predict a category, find groups. */
const lesson: OriginalLesson = {
  key: 'l14',
  title: 'Kinds of problems',
  summary: 'Three questions land on Halima\'s desk in one day. Folake: "How many patients next week?" Bisi: "Who will miss tomorrow?" Emmanuel: "Are there kinds of clinics?" Miracle: "Three questions, three kinds of machine learning."',
  minutes: 11,
  outcomes: [
    'Tell regression, classification and clustering apart',
    'Match a question to the right kind of problem',
    'Know which kinds need labels',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Three questions',
      text: 'How many patients will Yaba see next week? That predicts a number: regression. Will this patient miss? That predicts a category: classification. Are there kinds of clinics? There\'s no answer column to learn from: clustering finds groups. The first two learn from labels; clustering doesn\'t.',
      hotspots: [
        { phrase: 'That predicts a number: regression', note: 'The answer is a quantity: 140 patients, 3.5 days, ₦20,000. Chapter 5.' },
        { phrase: 'That predicts a category: classification', note: 'The answer is one of a few choices: miss or come, spam or not. Chapter 6. This is Halima\'s main problem.' },
        { phrase: 'clustering finds groups', note: 'Nobody has labelled the clinics. The model groups similar ones together. Chapter 11.' },
        { phrase: 'The first two learn from labels', note: 'Learning from examples with answers is called supervised learning. Clustering, with no answers, is unsupervised learning.' },
      ],
    },
  ],
  apply: {
    scenario: 'Which kind of problem is it?',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Regression (a number) or classification (a category)?',
        groups: ['Regression', 'Classification'],
        items: [
          { text: 'How many patients next week?', group: 0 },
          { text: 'Will this patient miss?', group: 1 },
          { text: 'How many days until the next booking?', group: 0 },
          { text: 'Is this email spam?', group: 1 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: "If answer_type is \"number\" print \"Regression\", otherwise print \"Classification\"",
        starter: "answer_type = \"category\"\n",
        solution: "answer_type = \"category\"\nif answer_type == \"number\":\n    print(\"Regression\")\nelse:\n    print(\"Classification\")\n",
        hint: "if answer_type == \"number\":",
        checks: [
          { message: "Print Classification", outputEquals: "Classification" },
          { message: "Use if", codeIncludes: "if " },
        ],
      },
      {
        kind: 'mcq',
        prompt: '"Are there kinds of clinics?" No one has labelled them. Which kind of problem?',
        options: [
          { text: 'Classification', why: 'Classification needs labels to learn from. There are none.' },
          { text: 'Clustering' },
          { text: 'Regression', why: 'There\'s no number to predict.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the question to the kind of problem.',
        pairs: [
          ['How long will the visit take?', 'Regression'],
          ['Miss or come?', 'Classification'],
          ['Which clinics are alike?', 'Clustering'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Halima\'s main question: "Will this booking be missed?" Which kind is it?',
        options: [
          { text: 'Classification' },
          { text: 'Regression', why: 'The answer is yes or no, not a number.' },
          { text: 'Clustering', why: 'We have the answer for past bookings: labels.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The two big families.',
        template: 'Learning with labels is [[1]] learning. Without labels it\'s [[2]] learning.',
        blanks: [['supervised'], ['unsupervised']],
        distractors: ['robot', 'deep'],
      },
      {
        kind: 'chatReply',
        from: 'folake',
        message: 'Can one model answer all three questions?',
        prompt: "Halima's best reply?",
        options: [
          { text: 'Yes, one model does everything.', why: 'Each problem needs its own kind of model.' },
          { text: 'Not well. Each is a different kind of problem: a number, a yes/no, and groups. We\'d build one for each.' },
          { text: 'None of them can be answered.', why: 'All three are classic ML problems.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Needs labels to learn, or not?',
        groups: ['Needs labels', 'No labels needed'],
        items: [
          { text: 'Predicting no-shows', group: 0 },
          { text: 'Grouping similar clinics', group: 1 },
          { text: 'Predicting next week\'s patient count', group: 0 },
          { text: 'Finding patients with similar habits', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line in Emmanuel\'s notes is wrong?',
        lines: [
          'Regression predicts a number.',
          'Classification predicts a category.',
          'Clustering needs labelled examples.',
          'Halima\'s no-show model is classification.',
        ],
        bug: 2,
        fix: 'Clustering works without labels.',
        explanation: 'Clustering finds groups when there\'s no answer column.',
      },
      {
        kind: 'mcq',
        prompt: '"What chance (0 to 1) does this patient have of missing?" The output is a number. Which kind is it, usually?',
        options: [
          { text: 'Regression, always', why: 'The thing being predicted is still miss-or-come. The chance is its confidence.' },
          { text: 'Clustering', why: 'We have labels.' },
          { text: 'Classification: the chance is how sure it is about "miss"' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'The kind of problem that predicts a number. (one word)',
        answers: ['regression'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'Think of a question at your work or school. Is it a number, a category, or groups? What examples would a model learn from?',
    starters: ['My question is...', 'It\'s a ... problem because'],
  },
  deepen: {
    title: 'More than two categories',
    summary: 'Classification can have many categories: which clinic, which kind of visit, which language. Two categories (miss or come) is called binary classification.',
  },
  notes: 'Supervised (regression, classification) vs unsupervised (clustering) learning: standard taxonomy. Probabilistic classifiers output class probabilities (Chapter 6 predict_proba).',
};

export default lesson;
