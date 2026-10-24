import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 4 — Guess the rule: be the machine, find the pattern in 12 patients. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Guess the rule',
  summary: 'Miracle hands Halima a page with 12 patients and says: "Be the machine. Find a rule that tells who missed." This is exactly what a model does, just with thousands of rows.',
  minutes: 12,
  outcomes: [
    'Look for a pattern in examples, like a model does',
    'Write the pattern as a simple rule',
    'Check how many examples the rule gets right',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Be the machine',
      steps: [
        {
          title: '1. The 12 patients',
          body: 'Five of the twelve missed: Tolu, Chioma, Sani, Hauwa and Obi.',
          code: 'name     wait  reminder  km | missed\nAmina      3     yes      2 | no\nTolu      21     no       9 | yes\nMusa       5     yes      4 | no\nChioma    30     no      12 | yes\nBello      2     no       3 | no\nIreti     18     yes      6 | no\nSani      25     no      15 | yes\nKelechi    7     no       5 | no\nHauwa     16     no       8 | yes\nDapo       4     yes      1 | no\nZainab    20     yes     10 | no\nObi        9     no      14 | yes',
          language: 'plaintext',
        },
        {
          title: '2. Look at the missed ones',
          body: 'Tolu, Chioma, Sani and Hauwa all waited more than 14 days AND got no reminder.',
        },
        {
          title: '3. Check the others',
          body: 'Ireti and Zainab waited long too, but got a reminder, and came. Bello and Kelechi had no reminder, but short waits, and came.',
        },
        {
          title: '4. Write the rule',
          body: 'If wait > 14 days and no reminder: they will miss. Otherwise: they will come.',
        },
        {
          title: '5. Count',
          body: 'The rule is right for 11 of 12 patients. It gets Obi wrong: short wait, but 14 km away. No rule is perfect, and that\'s normal.',
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'You just did what a model does: looked at examples with answers, found a pattern, wrote it as a rule, and counted how often it\'s right.',
    },
  ],
  apply: {
    scenario: 'Finding the rule in 12 patients.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Using the rule (wait > 14 and no reminder → miss), what do we predict for Tolu: 21 days, no reminder?',
        options: [
          { text: 'Will come', why: '21 is more than 14, and there was no reminder: both parts are true.' },
          { text: 'Will miss' },
          { text: 'Can\'t tell', why: 'The rule gives an answer for every patient.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: "5 of the 12 patients missed. Print how many came",
        starter: "total = 12\nmissed = 5\n",
        solution: "total = 12\nmissed = 5\nprint(total - missed)\n",
        hint: "print(total - missed)",
        checks: [
          { message: "Print 7", outputEquals: "7" },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Ireti: 18 days, got a reminder. What does the rule predict?',
        options: [
          { text: 'Will miss', why: 'She got a reminder, so the second part of the rule is false.' },
          { text: 'Will miss, because 18 > 14', why: 'Both parts must be true. She had a reminder.' },
          { text: 'Will come' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'What does the rule predict?',
        groups: ['Will miss', 'Will come'],
        items: [
          { text: '25 days, no reminder', group: 0 },
          { text: '2 days, no reminder', group: 1 },
          { text: '16 days, no reminder', group: 0 },
          { text: '20 days, reminder', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'The rule is right for how many of the 12 patients?',
        answers: ['11', 'eleven'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Which patient does the rule get wrong?',
        options: [
          { text: 'Tolu: 21 days, no reminder, missed', why: 'The rule predicts a miss, and Tolu missed. Correct.' },
          { text: 'Obi: 9 days, no reminder, 14 km, missed' },
          { text: 'Dapo: 4 days, reminder, came', why: 'The rule predicts he\'ll come, and he did. Correct.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'chidi',
        message: 'Easy fix: add "or the patient\'s name is Obi". Now it\'s 12 out of 12.',
        prompt: "Halima's best reply?",
        options: [
          { text: 'Great, ship it!', why: 'A rule built around one person has memorised, not learned.' },
          { text: 'Then add every name.', why: 'That\'s memorising the page. Chapter 4 shows why that fails.' },
          { text: 'That only works for this page. Next month there\'s a new Obi and a new exception. The rule has to work on patients it hasn\'t seen.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the rule.',
        template: 'If wait is more than [[1]] days [[2]] there was no reminder: predict a miss.',
        blanks: [['14'], ['and']],
        distractors: ['30', 'or'],
      },
      {
        kind: 'mcq',
        prompt: 'Obi lives 14 km away. What might Halima try adding to the rule?',
        options: [
          { text: 'A distance clue: patients who live far away miss more' },
          { text: 'His name', why: 'A name won\'t help with the next patient.' },
          { text: 'Nothing: rules must never change', why: 'Improving the rule with a new feature is exactly how models get better.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Put the steps of "being the machine" in order.',
        lines: [
          'Look at examples where you know the answer',
          'Find what the missed ones have in common',
          'Write the pattern as a rule',
          'Count how often the rule is right',
        ],
      },
      {
        kind: 'chatReply',
        from: 'miracle',
        message: 'You found that rule in two minutes. Why do we need a computer at all?',
        prompt: "Halima's best reply?",
        options: [
          { text: 'We don\'t. I\'ll do it by hand forever.', why: 'Twelve rows is fine by hand. Twenty-four hundred, with ten features, is not.' },
          { text: 'Computers are always smarter.', why: 'They\'re faster at checking patterns, not smarter about what they mean.' },
          { text: 'Because the real list has thousands of patients and many more clues. I can\'t check every combination by hand.' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Chidi\'s "add Obi\'s name" trick made the rule perfect on paper. Have you ever "passed" something by memorising answers rather than understanding?',
    starters: ['I once memorised...', 'It failed when...'],
  },
  deepen: {
    title: 'Too few examples',
    summary: 'Twelve patients is a tiny sample. A rule that fits 12 might not fit 1,200. The more examples you have, the more you can trust a pattern.',
  },
  notes: 'Made-up 12-patient table. Missed: Tolu, Chioma, Sani, Hauwa, Obi (5 of 12). Rule "wait > 14 and no reminder" predicts miss for Tolu, Chioma, Sani, Hauwa: all correct. Wrong only for Obi (missed, rule says come): 11/12.',
};

export default lesson;
