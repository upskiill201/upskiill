import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 17 — Common maths bugs: missing brackets, / vs //, text numbers, rounding too early, =+. */
const lesson: OriginalLesson = {
  key: 'l17',
  title: 'Common maths bugs',
  summary: 'Arjun sends Ada a "find five bugs" puzzle: a payout program that runs without a single error and gets the wrong answer five different ways.',
  minutes: 12,
  outcomes: [
    'Spot the five most common maths bugs',
    'Know that maths bugs often give no error',
    'Fix each one',
  ],
  learn: [
    {
      kind: 'explore',
      title: "Arjun's puzzle",
      text: 'share = "30000" makes the share text. each = pot / 7 gives decimals nobody can pay. avg = a + b / 2 halves only b. fee = round(share * 0.05) rounds too early. And total =+ 1500 replaces the total instead of adding.',
      hotspots: [
        { phrase: 'share = "30000"', note: 'A number in quotes is text. * repeats it and + fails. Fix: share = 30000.' },
        { phrase: 'each = pot / 7', note: '/ gives a float with endless decimals. For payouts, use // and % (in kobo).' },
        { phrase: 'avg = a + b / 2', note: 'Order of operations: only b is halved. Fix: (a + b) / 2.' },
        { phrase: 'rounds too early', note: 'Rounding in the middle of a calculation loses a little each time. Round (or format) only at the end, or stay in whole kobo.' },
        { phrase: 'total =+ 1500', note: '=+ means "store plus 1500", so the total becomes 1500. Fix: +=.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Five bugs, no errors',
      caption: 'It runs. Every answer is wrong. Fix them one at a time.',
      code: 'a = 30000\nb = 15000\nprint(a + b / 2)        # want the average\n\ntotal = 330000\ntotal =+ 1500            # want to add a late fee\nprint(total)\n\nprint(330000 / 7)        # want whole naira each\n',
      challenge: 'After fixing, you should see 22500.0, 331500 and 47142.',
    },
  ],
  apply: {
    scenario: "Arjun's five bugs.",
    items: [
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'total = 330000\ntotal =+ 1500\nprint(total)',
        language: 'python',
        options: [
          { text: '331500', why: '=+ is not +=. It stores +1500.' },
          { text: '1500' },
          { text: 'SyntaxError', why: '=+ is valid Python, which is why it\'s sneaky.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Fix the average so it prints 22500.0',
        starter: 'a = 30000\nb = 15000\nprint(a + b / 2)\n',
        solution: 'a = 30000\nb = 15000\nprint((a + b) / 2)\n',
        hint: 'Brackets around a + b.',
        checks: [{ message: 'Print 22500.0', outputEquals: '22500.0' }],
      },
      {
        kind: 'writeCode',
        prompt: 'Fix the late fee so it\'s added to the total: 331500',
        starter: 'total = 330000\ntotal =+ 1500\nprint(total)\n',
        solution: 'total = 330000\ntotal += 1500\nprint(total)\n',
        hint: '+= with the + first.',
        checks: [
          { message: 'Print 331500', outputEquals: '331500' },
          { message: 'Use +=', codeIncludes: '+=' },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Error, or silently wrong?',
        groups: ['Error', 'Silently wrong'],
        items: [
          { text: '"30000" + 1', group: 0 },
          { text: 'a + b / 2 for an average', group: 1 },
          { text: 'total =+ 1500', group: 1 },
          { text: 'print(totl) (typo)', group: 0 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the bug to its fix.',
        pairs: [
          ['share = "30000"', 'share = 30000'],
          ['a + b / 2', '(a + b) / 2'],
          ['total =+ 1500', 'total += 1500'],
          ['pot / 7 for payouts', 'pot // 7 and pot % 7'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line rounds too early?',
        language: 'python',
        lines: ['share = 30333', 'fee = round(share * 0.05) * 3', 'print(fee)'],
        bug: 1,
        fix: 'fee = round(share * 0.05 * 3)',
        explanation: 'Rounding each fee first gives 4551; rounding once at the end gives 4550. Round at the end, or stay in whole kobo.',
      },
      {
        kind: 'mcq',
        prompt: 'Why are maths bugs more dangerous than typos?',
        options: [
          { text: 'They crash the computer', why: 'They don\'t crash anything. That\'s the danger.' },
          { text: 'Python can\'t find them', why: 'Python can\'t, but a prediction or a check can.' },
          { text: 'They often give no error, just a believable wrong number' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Add a late fee to the total.',
        language: 'python',
        template: 'total [[1]] 1500',
        blanks: [['+=']],
        distractors: ['=+', '=='],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'How do I catch bugs that don\'t give errors?',
        prompt: "Arjun's best reply?",
        options: [
          { text: 'Predict the answer before running, and check it a second way. That\'s the next lesson.' },
          { text: 'You can\'t.', why: 'Predicting and checking catches them.' },
          { text: 'Add more print()s.', why: 'Helpful, but you still need to know what\'s right.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'What does print(330000 // 7) show?',
        answers: ['47142'],
        placeholder: 'Output',
      },
    ],
  },
  reflect: {
    prompt: 'Which of the five bugs do you think you\'re most likely to make? What will help you catch it?',
    starters: ['I\'m most likely to...', 'I\'ll catch it by...'],
  },
  deepen: {
    title: 'Linters',
    summary: 'Tools called linters (like Ruff or pylint) flag some of these, like =+ with a space problem. You\'ll meet one when you install Python in Chapter 12.',
  },
  notes: 'x =+ 1500 parses as x = (+1500). (30000 + 15000) / 2 = 22500.0; 330000 + 1500 = 331500; 330000 // 7 = 47142; round(30333 * 0.05) * 3 = 1517 * 3 = 4551 vs round(30333 * 0.05 * 3) = round(4549.95) = 4550. Ruff and pylint are Python linters.',
};

export default lesson;
