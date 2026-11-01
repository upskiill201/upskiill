import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';
import { FOREST, TEST_BASE } from './code';

const FIT = TEST_BASE + FOREST + 'forest.fit(train[feats], train["no_show"])\n';

/** Chapter 10 · Lesson 2 — Many trees, one vote. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'Many trees, one vote',
  summary: 'A random forest grows hundreds of trees, each on its own draw of the data and each looking at only some of the clues at every split. Then it averages them. Six steps to how a forest decides.',
  minutes: 12,
  outcomes: [
    'Explain the two kinds of randomness in a forest',
    'Explain how a forest combines its trees',
    'Read a forest\'s chance for one booking',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'How a forest decides',
      steps: [
        { title: '1. Many draws', body: 'Each tree gets its own bootstrap draw of the training bookings, like lesson 1.' },
        { title: '2. Random clues at each split', body: 'At every split, a tree may only choose from a random handful of the features. This stops every tree asking the same first question.' },
        { title: '3. Many different trees', body: 'Two kinds of randomness give 100 trees that are each decent and each wrong in their own way.' },
        { title: '4. Combine', body: 'For a booking, every tree gives a chance of missing. The forest averages them. (You can picture it as a vote: of 100 trees, 47 lean "miss" for A12323.)' },
        { title: '5. One chance out', body: 'A12323, the riskiest booking for v0.9: the forest says 0.49. Logistic regression said 0.73.', code: 'forest.predict_proba(booking[feats])', language: 'python' },
        { title: '6. Same tools as always', body: 'fit, predict_proba, the 0.2 threshold and minutes lost all work exactly as before.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'A forest\'s chance',
      caption: 'One booking, 100 trees.',
      code: FIT + '\nbooking = test[test["appointment_id"] == "A12323"]\nprint("Forest chance:", forest.predict_proba(booking[feats])[0, 1].round(3))\nprint("Trees in the forest:", len(forest.estimators_))\n',
      challenge: 'Try the first booking in week 12. Is the forest confident?',
    },
  ],
  apply: {
    scenario: 'Many trees, one vote.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Fit the forest on weeks 1 to 11 and print its chance for booking A12323, rounded to 3 places',
        starter: FIT + 'booking = test[test["appointment_id"] == "A12323"]\n',
        solution: FIT + 'booking = test[test["appointment_id"] == "A12323"]\nprint(forest.predict_proba(booking[feats])[0, 1].round(3))\n',
        hint: 'forest.predict_proba(booking[feats])[0, 1]',
        checks: [{ message: 'Print 0.492', outputEquals: '0.492' }],
      },
      {
        kind: 'mcq',
        prompt: 'Why does each split only see some of the features?',
        options: [
          { text: 'To save memory', why: 'It\'s about making trees different.' },
          { text: 'Because some features are leaks', why: 'Leaks should be removed, not hidden.' },
          { text: 'So the trees differ, and their mistakes don\'t all line up' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Print how many trees the fitted forest contains',
        starter: FIT,
        solution: FIT + 'print(len(forest.estimators_))\n',
        hint: 'len(forest.estimators_)',
        checks: [{ message: 'Print 100', outputEquals: '100' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'Which randomness does a forest use?',
        groups: ['Used', 'Not used'],
        items: [
          { text: 'A different draw of bookings per tree', group: 0 },
          { text: 'A random handful of features per split', group: 0 },
          { text: 'Random answers', group: 1 },
          { text: 'Random test weeks', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'folake',
        message: 'So the forest asks 100 small committees and takes the average?',
        prompt: 'Halima\'s best reply?',
        options: [
          { text: 'No, it picks the best tree.', why: 'It averages all of them.' },
          { text: 'Exactly. Each committee saw slightly different patients and different clues, so their mistakes differ and the average is steadier.' },
          { text: 'It asks one tree 100 times.', why: 'They\'re 100 different trees.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the part to its job.',
        pairs: [
          ['Bootstrap draw', 'Different bookings per tree'],
          ['Random features per split', 'Different questions per tree'],
          ['Averaging', 'One steady chance'],
          ['n_estimators', 'How many trees'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'A forest.',
        language: 'python',
        template: 'forest = [[1]](n_estimators=100, max_depth=5, random_state=42)\nprint(len(forest.[[2]]))',
        blanks: [['RandomForestClassifier'], ['estimators_']],
        distractors: ['DecisionTreeClassifier', 'trees_'],
      },
      {
        kind: 'findBug',
        prompt: 'Which description of a forest is wrong?',
        lines: ['Each tree sees its own draw of bookings.', 'Each split sees only some features.', 'The forest uses whichever tree scores best.'],
        bug: 2,
        fix: 'The forest averages all its trees.',
        explanation: 'No single tree is chosen; they\'re combined.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'For A12323, roughly how many of the 100 trees lean "miss"?',
        answers: ['47', 'about 47', 'nearly half'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'The forest says 0.49 for A12323; logistic regression said 0.73. What does that show?',
        options: [
          { text: 'Different models can rank the same patient differently; neither is "the truth"' },
          { text: 'The forest is broken', why: 'It\'s a different model.' },
          { text: 'A12323 came', why: 'She missed.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'When have you trusted a group decision over one expert? Why?',
    starters: ['Once...'],
  },
  deepen: {
    title: 'Bagging',
    summary: 'Training many models on bootstrap draws and averaging them is called bagging (bootstrap aggregating). A random forest is bagged trees plus random features at each split.',
  },
  notes: 'RandomForestClassifier(n_estimators=100, max_depth=5, random_state=42) on weeks 1-11: A12323 chance 0.492 (47 of 100 trees predict miss); v0.9 gave 0.733.',
};

export default lesson;
