import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';
import { DATA, IMPORTS, VAL_SPLIT } from './code';

const VAL_LR = IMPORTS + DATA + VAL_SPLIT;

/** Chapter 6 · Lesson 12 — Comparing two models fairly. */
const lesson: OriginalLesson = {
  key: 'l12',
  title: 'Comparing two models fairly',
  summary: 'Logistic regression or the depth-8 tree? Chidi wants a bake-off on week 12. Miracle wants rules first. Five beliefs about comparing models, tested, and the comparison done properly on the validation weeks.',
  minutes: 12,
  outcomes: [
    'Compare models on the same data with the same measure',
    'Agree the decision rule before seeing the result',
    'Keep the test week for the final check',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'The fairest way to choose between models is to test them all on week 12 and keep the winner.',
          isFact: false,
          explain: 'Myth. Choosing on week 12 is peeking: the winner\'s score becomes too hopeful. Compare on validation, then test the chosen one once.',
        },
        {
          text: 'Both models must be scored on the same bookings with the same measure.',
          isFact: true,
          explain: 'Fact. On validation (weeks 10 and 11, top 40): logistic regression catches 24, the depth-8 tree 28. Same weeks, same measure, so it\'s a real comparison.',
        },
        {
          text: 'The rule for choosing should be agreed before you look at the scores.',
          isFact: true,
          explain: 'Fact. Otherwise it\'s tempting to invent a rule that favours the model you already like.',
        },
        {
          text: 'The model with the best number always wins.',
          isFact: false,
          explain: 'Myth. Other things can matter: can clinics understand it? Is it stable? The rule can include them, as long as it\'s agreed first.',
        },
        {
          text: 'A small gap on a few hundred bookings might be luck.',
          isFact: true,
          explain: 'Fact. 28 vs 24 on 400 validation bookings is a real hint, not proof. Chapter 9 shows cross-validation for steadier comparisons.',
        },
      ],
    },
    {
      kind: 'story',
      title: 'The rule',
      beats: [
        { speaker: 'miracle', text: 'Before anyone opens week 12, write the rule. Mine: the best validation score, unless clinic managers can\'t understand the model.' },
        { speaker: 'halima', text: 'Agreed. Writing it in the notebook, with today\'s date.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'The bake-off, on validation',
      caption: 'Same weeks, same measure.',
      code: VAL_LR + 'from sklearn.tree import DecisionTreeClassifier\n\nmodels = {"logistic": LogisticRegression(), "tree depth 8": DecisionTreeClassifier(max_depth=8, random_state=42)}\nfor name, m in models.items():\n    m.fit(train[feats], train["no_show"])\n    v = val.assign(p=m.predict_proba(val[feats])[:, 1])\n    print(name, v.nlargest(40, "p")["no_show"].sum(), "of top 40")\n',
      challenge: 'Add a depth-4 tree to the dictionary.',
    },
  ],
  apply: {
    scenario: 'A fair comparison.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Train logistic regression on weeks 1 to 9 and print how many of its top 40 validation bookings really missed',
        starter: VAL_LR + 'model = LogisticRegression()\nmodel.fit(train[feats], train["no_show"])\n',
        solution: VAL_LR + 'model = LogisticRegression()\nmodel.fit(train[feats], train["no_show"])\nv = val.assign(p=model.predict_proba(val[feats])[:, 1])\nprint(v.nlargest(40, "p")["no_show"].sum())\n',
        hint: 'v = val.assign(p=model.predict_proba(val[feats])[:, 1])',
        checks: [{ message: 'Print 24', outputEquals: '24' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Myth', 'Fact'],
        items: [
          { text: 'Choose models on the test week', group: 0 },
          { text: 'Same bookings, same measure', group: 1 },
          { text: 'The best number always wins', group: 0 },
          { text: 'Agree the rule before looking', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why agree the decision rule before seeing the scores?',
        options: [
          { text: 'It\'s faster', why: 'It\'s about honesty, not speed.' },
          { text: 'So you can\'t bend the rule to favour the model you already like' },
          { text: 'scikit-learn requires it', why: 'It\'s a team habit.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Train a depth-8 tree (random_state=42) on weeks 1 to 9 and print its top-40 validation score',
        starter: VAL_LR + 'from sklearn.tree import DecisionTreeClassifier\ntree = DecisionTreeClassifier(max_depth=8, random_state=42)\n',
        solution: VAL_LR + 'from sklearn.tree import DecisionTreeClassifier\ntree = DecisionTreeClassifier(max_depth=8, random_state=42)\ntree.fit(train[feats], train["no_show"])\nv = val.assign(p=tree.predict_proba(val[feats])[:, 1])\nprint(v.nlargest(40, "p")["no_show"].sum())\n',
        hint: 'Same pattern as logistic regression',
        checks: [{ message: 'Print 28', outputEquals: '28' }],
      },
      {
        kind: 'chatReply',
        from: 'chidi',
        message: 'Let\'s just run both on week 12 and pick the higher one.',
        prompt: 'Miracle\'s best reply?',
        options: [
          { text: 'Fine.', why: 'That\'s peeking.' },
          { text: 'Run them on week 13 instead and pick.', why: 'Same problem: then week 13 isn\'t a clean test.' },
          { text: 'That turns week 12 into another validation set, and then we have no honest test left. Choose with the rule, then open week 12 once.' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the model to its validation top 40.',
        pairs: [
          ['Logistic regression', '24'],
          ['Tree, depth 8', '28'],
          ['Tree, depth 4', '25'],
          ['Tree, depth 2', '18'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The order.',
        template: 'Agree the [[1]], compare on [[2]], test the winner once.',
        blanks: [['rule'], ['validation']],
        distractors: ['score', 'week 12'],
      },
      {
        kind: 'findBug',
        prompt: 'Which step makes this comparison unfair?',
        lines: ['Both trained on weeks 1 to 9.', 'Logistic scored on weeks 10 and 11.', 'Tree scored on weeks 1 to 9.'],
        bug: 2,
        fix: 'Tree scored on weeks 10 and 11 too.',
        explanation: 'Scoring the tree on its own training weeks flatters it.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'On validation, by how many no-shows does the depth-8 tree beat logistic regression?',
        answers: ['4', 'four'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Miracle\'s rule: best validation score, unless managers can\'t understand it. Which model does it point to?',
        options: [
          { text: 'The tree, no questions asked', why: 'The rule has an "unless".' },
          { text: 'It depends on whether a 93-leaf tree counts as understandable: lesson 13 decides' },
          { text: 'Neither', why: 'One of them will be chosen.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'Think of a time someone changed the rules after seeing who won. How could they have avoided it?',
    starters: ['Someone changed...', 'They could have...'],
  },
  deepen: {
    title: 'Pre-registration',
    summary: 'In medical research, scientists often register their analysis plan before seeing results, for the same reason Miracle writes the rule first: it stops results from steering the method.',
  },
  notes: 'Weeks 1-9 -> validation 10-11, top 40: LogisticRegression 24; tree depth 2 18, 4 25, 8 28 (random_state=42).',
};

export default lesson;
