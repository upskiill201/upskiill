import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';
import { CV_BASE, F7, V8 } from './code';

const CHIDI = CV_BASE + F7 + 'chidi = DecisionTreeClassifier(random_state=42)\n';

/** Chapter 9 · Lesson 12 — Simpler is often better. */
const lesson: OriginalLesson = {
  key: 'l12',
  title: 'Simpler is often better',
  summary: 'Six coefficients beat 27 leaves, and 27 leaves beat 443. Three cards on why the simplest model that does the job is usually the one to ship.',
  minutes: 11,
  outcomes: [
    'Compare simple and complex models fairly',
    'Explain why simple models generalise well',
    'Prefer the simpler model when scores are close',
  ],
  learn: [
    {
      kind: 'text',
      html: '<p><strong>Card 1: the league table.</strong> Average minutes lost per week, over 11 weeks: v0.8 (6 coefficients) <strong>577.7</strong>. Best tree, depth 5 (about 27 leaves) <strong>601.4</strong>. Chidi\'s unlimited tree (hundreds of leaves) <strong>680.9</strong>. Doing nothing <strong>730.9</strong>. Simplest wins.</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>Card 2: why simple travels well.</strong> A simple model can\'t carve out tiny pockets of training data, so it can\'t memorise noise. What it learns has to be broad patterns, like "past misses raise risk", and broad patterns hold next week too. This data really is broad-patterned: each clue nudges risk up or down a little.</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>Card 3: when scores are close, go simple.</strong> Grid search found C = 0.1, a slightly simpler logistic regression, about as good as the default. Simpler is easier to explain to Mrs Okonkwo, faster to run on a phone, and less likely to break when next month looks different. Complex models earn their place only when they clearly win on cross-validation.</p>',
    },
    {
      kind: 'check',
      question: 'Two models tie on cross-validation. One has 6 coefficients, the other 89 leaves. Which do you ship?',
      options: ['The 89-leaf tree', 'The 6-coefficient model', 'Toss a coin'],
      answer: 1,
      explanation: 'Same score, easier to explain and less likely to break.',
    },
    {
      kind: 'tryIt',
      title: 'The league table',
      caption: 'Eleven weeks each.',
      code: CV_BASE + V8 + '\nfor name, model in [("v0.8", v8), ("tree depth 5", DecisionTreeClassifier(max_depth=5, random_state=42)), ("unlimited tree", DecisionTreeClassifier(random_state=42))]:\n    scores = cross_val_score(model, train[feats], train["no_show"], groups=train["week"], cv=weeks, scoring=minutes_score)\n    print(name, round(-scores.mean(), 1))\n',
      challenge: 'Chidi\'s tree also used hour. Add "hour" to feats for the unlimited tree. Does it help?',
    },
  ],
  apply: {
    scenario: 'Simpler is often better.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Cross-validate Chidi\'s unlimited tree (seven features) by week and print its average minutes lost, rounded to 1 place',
        starter: CHIDI,
        solution: CHIDI + 'scores = cross_val_score(chidi, train[feats], train["no_show"], groups=train["week"], cv=weeks, scoring=minutes_score)\nprint(round(-scores.mean(), 1))\n',
        hint: 'cross_val_score with cv=weeks and scoring=minutes_score',
        checks: [{ message: 'Print 680.9', outputEquals: '680.9' }],
      },
      {
        kind: 'mcq',
        prompt: 'Why do simple models often do well on new data?',
        options: [
          { text: 'They\'re trained longer', why: 'It\'s about what they can learn.' },
          { text: 'They use more features', why: 'Not necessarily.' },
          { text: 'They can only learn broad patterns, which tend to hold next week too' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Print how many coefficients v0.8 has after fitting on weeks 1 to 11',
        starter: CV_BASE + V8 + 'v8.fit(train[feats], train["no_show"])\n',
        solution: CV_BASE + V8 + 'v8.fit(train[feats], train["no_show"])\nprint(len(v8[-1].coef_[0]))\n',
        hint: 'len(v8[-1].coef_[0])',
        checks: [{ message: 'Print 6', outputEquals: '6' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'Simpler or more complex?',
        groups: ['Simpler', 'More complex'],
        items: [
          { text: 'Six coefficients', group: 0 },
          { text: 'C = 0.1', group: 0 },
          { text: 'Unlimited depth', group: 1 },
          { text: 'C = 10', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'chidi',
        message: 'Simple models are for beginners. Real data scientists use complex ones.',
        prompt: 'Miracle\'s best reply?',
        options: [
          { text: 'Real data scientists use whatever wins on honest evidence. Here that\'s six coefficients. Complexity has to earn its place.' },
          { text: 'True.', why: 'The evidence says otherwise here.' },
          { text: 'Complex models never work.', why: 'They do on some data.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the model to its average weekly minutes.',
        pairs: [
          ['v0.8', '577.7'],
          ['Tree, depth 5', '601.4'],
          ['Chidi\'s unlimited tree', '680.9'],
          ['Doing nothing', '730.9'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule of thumb.',
        template: 'When two models score about the [[1]], ship the [[2]] one.',
        blanks: [['same'], ['simpler']],
        distractors: ['worst', 'bigger'],
      },
      {
        kind: 'findBug',
        prompt: 'Which reason for choosing a model is weakest?',
        lines: ['It wins on cross-validation.', 'It\'s easier to explain to clinic staff.', 'It sounds more advanced.'],
        bug: 2,
        fix: 'It\'s less likely to break next month.',
        explanation: 'Sounding advanced isn\'t evidence.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'On average, how many more minutes a week does Chidi\'s tree lose than v0.8? (whole number)',
        answers: ['103', '103.2'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'When should a complex model replace a simple one?',
        options: [
          { text: 'Whenever it\'s available', why: 'It must earn its place.' },
          { text: 'Never', why: 'Sometimes complex models do win.' },
          { text: 'When it clearly wins on cross-validation, by more than the week-to-week wobble' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Where in your life has a simple rule beaten a complicated system?',
    starters: ['For example...'],
  },
  deepen: {
    title: 'Occam\'s razor',
    summary: 'The old principle "don\'t add complexity you don\'t need" is called Occam\'s razor. In machine learning it\'s backed by evidence: simpler models usually generalise better when data is limited.',
  },
  notes: 'Leave-one-week-out mean minutes per week: v0.8 577.7, depth-5 tree 601.4, Chidi\'s unlimited tree (7 features incl. hour) 680.9, doing nothing 730.9. v0.8 has 6 coefficients.',
};

export default lesson;
