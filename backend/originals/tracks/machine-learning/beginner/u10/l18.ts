import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';
import { FOREST, TEST_BASE } from './code';

const FIT = TEST_BASE + FOREST + 'forest.fit(train[feats], train["no_show"])\nbooking = test[test["appointment_id"] == "A12323"]\n';

/** Chapter 10 · Lesson 18 — Explaining a forest to Folake. */
const lesson: OriginalLesson = {
  key: 'l18',
  title: 'Explaining a forest to Folake',
  summary: 'Folake asks for a forest explanation she can repeat to the board in thirty seconds. Tey and Halima try three versions. Only one is both true and short.',
  minutes: 12,
  outcomes: [
    'Explain a random forest in plain words',
    'Explain one forest prediction',
    'Avoid jargon and overclaiming',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Version one: "An ensemble of bootstrap-aggregated decision trees with random feature subsets." Folake\'s face?', replies: ['Blank.'] },
        { tey: 'Version two: "It\'s AI, it learns patterns." True, and useless. It explains nothing.', replies: ['Version three?'] },
        { tey: '"Picture 100 nurses, each shown a different handful of old bookings and told to write a few yes/no rules. For a new patient, we average their guesses. One nurse can be fooled; a hundred rarely all are."', replies: ['And one patient?'] },
        { tey: '"For A12323, the average guess is a 49% chance she\'ll miss: about half the nurses lean that way. Most nurses\' rules mention her four past misses."', replies: ['And why we didn\'t pick it?'] },
        { tey: '"It did well, but our simpler model did better over eleven weeks, is easier to explain patient by patient, and is 200 times smaller. We keep the forest as a second opinion."', replies: ['Short enough?'] },
        { tey: 'Thirty seconds, no jargon, nothing claimed that we haven\'t measured. That\'s the bar.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'One patient, many trees',
      caption: 'The forest\'s chance for A12323, and the share of trees leaning "miss".',
      code: FIT + '\nchance = forest.predict_proba(booking[feats])[0, 1]\nleaning = sum(tree.predict_proba(booking[feats].to_numpy())[0, 1] >= 0.5 for tree in forest.estimators_)\nprint("Forest chance:", round(chance, 2))\nprint("Trees leaning miss:", leaning, "of", len(forest.estimators_))\n',
      challenge: 'Try a booking the forest thinks is safe. How many trees lean "miss"?',
    },
  ],
  apply: {
    scenario: 'Explaining a forest.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print the forest\'s chance for A12323, rounded to 2 places',
        starter: FIT,
        solution: FIT + 'print(round(forest.predict_proba(booking[feats])[0, 1], 2))\n',
        hint: 'forest.predict_proba(booking[feats])[0, 1]',
        checks: [{ message: 'Print 0.49', outputEquals: '0.49' }],
      },
      {
        kind: 'mcq',
        prompt: 'Which explanation would Folake repeat to the board?',
        options: [
          { text: '"Bootstrap-aggregated trees with feature subsampling"', why: 'Jargon.' },
          { text: '"100 nurses, each with a few rules from different old bookings; we average their guesses"' },
          { text: '"It\'s AI"', why: 'Explains nothing.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Print A12323\'s past misses, to back up the explanation',
        starter: FIT,
        solution: FIT + 'print(booking["previous_no_shows"].iloc[0])\n',
        hint: 'booking["previous_no_shows"].iloc[0]',
        checks: [{ message: 'Print 4', outputEquals: '4' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'Good explanation habit, or not?',
        groups: ['Good habit', 'Bad habit'],
        items: [
          { text: 'An everyday picture (nurses)', group: 0 },
          { text: 'Saying what was measured', group: 0 },
          { text: 'Technical terms for the board', group: 1 },
          { text: '"It\'s AI, trust it"', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'folake',
        message: 'If the forest is so clever, why aren\'t we using it?',
        prompt: 'Halima\'s best reply?',
        options: [
          { text: 'Because over eleven weeks our simpler model did better, it\'s easier to explain patient by patient, and it\'s 200 times smaller. The forest stays as a second opinion.' },
          { text: 'Forests are too clever.', why: 'Give the evidence.' },
          { text: 'We are using it.', why: 'v0.9 is the predictor.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the forest idea to its everyday picture.',
        pairs: [
          ['Bootstrap draw', 'Each nurse sees different old bookings'],
          ['Random features per split', 'Each nurse uses only some clues'],
          ['Averaging', 'Pool all the guesses'],
          ['Depth limit', 'Only a few rules per nurse'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The thirty-second version.',
        template: 'One nurse can be [[1]]; a hundred rarely all are, so we [[2]] their guesses.',
        blanks: [['fooled'], ['average']],
        distractors: ['fired', 'ignore'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line overclaims?',
        lines: ['The forest averages many simple rule sets.', 'For A12323 it gives about a 49% chance.', 'The forest knows exactly why she\'ll miss.'],
        bug: 2,
        fix: 'Most of its rules point to her four past misses.',
        explanation: 'A chance isn\'t knowledge of why.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'In the picture, how many "nurses" does the standard forest have?',
        answers: ['100', 'a hundred', 'one hundred'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the bar for any explanation to the board?',
        options: [
          { text: 'As technical as possible', why: 'They need to understand it.' },
          { text: 'Short, no jargon, nothing claimed that wasn\'t measured' },
          { text: 'As exciting as possible', why: 'Truth first.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'Explain a random forest to a friend in two sentences. Write it here.',
    starters: ['A random forest...'],
  },
  deepen: {
    title: 'The wisdom of crowds',
    summary: 'Averaging many independent guesses often beats most individual guesses: the "wisdom of crowds". It works best when the guessers are diverse and don\'t copy each other, which is exactly why forests randomise.',
  },
  notes: 'RF(100, depth 5) on weeks 1-11: A12323 chance 0.492 (47 trees lean miss); A12323 has 4 previous no-shows.',
};

export default lesson;
