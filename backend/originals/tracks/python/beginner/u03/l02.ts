import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 2 — + - * / with variables: building the pot, the fee and the payout from names. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: '+ - * / with variables',
  summary: 'The bank takes a ₦50 fee when Ada sends the pot. Now there are four numbers: members, share, fee and payout. Arjun: "Give every number a name, then write the sums with names."',
  minutes: 11,
  outcomes: [
    'Do maths with variables instead of numbers',
    'Store a result in a new variable',
    'Build one result from another',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'From members to payout',
      steps: [
        {
          title: '1. Name the inputs',
          body: 'Everything that could change gets a name.',
          code: 'members = 11\nSHARE = 30000\nBANK_FEE = 50',
          language: 'python',
        },
        {
          title: '2. Work out the pot',
          body: 'Multiply, and store the answer in its own variable.',
          code: 'pot = members * SHARE  # 330000',
          language: 'python',
        },
        {
          title: '3. Build on it',
          body: 'The payout uses the pot you just worked out.',
          code: 'payout = pot - BANK_FEE  # 329950',
          language: 'python',
        },
        {
          title: '4. Divide for a share',
          body: 'Dividing gives a float, as you saw last lesson.',
          code: 'per_member = pot / members  # 30000.0',
          language: 'python',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'The payout',
      caption: 'Change members to 12 and run it. Every number follows.',
      code: 'members = 11\nSHARE = 30000\nBANK_FEE = 50\n\npot = members * SHARE\npayout = pot - BANK_FEE\n\nprint(f"Pot: {pot}")\nprint(f"Payout after fee: {payout}")\n',
      challenge: 'The bank raises its fee to 100. Change one line.',
    },
  ],
  apply: {
    scenario: 'Pot, fee and payout.',
    items: [
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'pot = 330000\nfee = 50\nprint(pot - fee)',
        language: 'python',
        options: [
          { text: '330050', why: '- subtracts.' },
          { text: '329950' },
          { text: 'pot - fee', why: 'No quotes, so Python works it out.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Store the payout (pot minus BANK_FEE) and print it',
        starter: 'pot = 330000\nBANK_FEE = 50\n',
        solution: 'pot = 330000\nBANK_FEE = 50\npayout = pot - BANK_FEE\nprint(payout)\n',
        hint: 'payout = pot - BANK_FEE, then print(payout).',
        checks: [
          { message: 'Print 329950', outputEquals: '329950' },
          { message: 'Store it in payout', expr: 'payout == 329950' },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Order the lines so each uses only what already exists.',
        language: 'python',
        lines: ['members = 11', 'SHARE = 30000', 'pot = members * SHARE', 'payout = pot - 50', 'print(payout)'],
      },
      {
        kind: 'matchPairs',
        prompt: 'members = 11, SHARE = 30000. Match the code to its value.',
        pairs: [
          ['members * SHARE', '330000'],
          ['SHARE - 5000', '25000'],
          ['SHARE / 2', '15000.0'],
          ['members + 1', '12'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Build pot from members and SHARE, then print the payout after the fee',
        starter: 'members = 11\nSHARE = 30000\nBANK_FEE = 50\n',
        solution: 'members = 11\nSHARE = 30000\nBANK_FEE = 50\npot = members * SHARE\npayout = pot - BANK_FEE\nprint(payout)\n',
        hint: 'Two new variables: pot, then payout.',
        checks: [
          { message: 'Print 329950', outputEquals: '329950' },
          { message: 'Make pot from the variables', codeIncludes: 'members * SHARE' },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line uses a variable before it exists?',
        language: 'python',
        lines: ['members = 11', 'payout = pot - 50', 'pot = members * 30000'],
        bug: 1,
        fix: 'Move payout = pot - 50 below the pot line',
        explanation: 'pot isn\'t created until line 3: NameError on line 2.',
      },
      {
        kind: 'fillBlank',
        prompt: 'Work out the payout.',
        language: 'python',
        template: 'payout = [[1]] - [[2]]',
        blanks: [['pot'], ['BANK_FEE']],
        distractors: ['members', 'SHARE'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Input (set by people) or result (worked out)?',
        groups: ['Input', 'Result'],
        items: [
          { text: 'members = 11', group: 0 },
          { text: 'pot = members * SHARE', group: 1 },
          { text: 'BANK_FEE = 50', group: 0 },
          { text: 'payout = pot - BANK_FEE', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'arjun',
        message: 'Why store pot in a variable when you could write members * SHARE - 50 every time?',
        prompt: "Ada's best answer?",
        options: [
          { text: 'Naming the step makes the next line readable: payout = pot - BANK_FEE says what it means.' },
          { text: 'Python can\'t do two operations in one line.', why: 'It can. Naming is for readers.' },
          { text: 'It uses less memory.', why: 'Readability, not memory.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'pot = 330000, members = 11. What does print(pot / members) show?',
        answers: ['30000.0'],
        placeholder: 'Output',
      },
    ],
  },
  reflect: {
    prompt: 'Naming each step makes a long calculation readable. Where would naming the steps help you check a bill or a budget?',
    starters: ['I\'d name...', 'It would help me...'],
  },
  deepen: {
    title: 'Inputs at the top',
    summary: 'Good programs put inputs first, results after. Read any of Ada\'s programs top to bottom and you\'ll see the story of the maths.',
  },
  notes: 'Ajo numbers from Chapter 2 finale: 11 members x 30000 = 330000. ₦50 bank fee on the payout transfer is a fictional, plausible figure for the story. 330000 - 50 = 329950.',
};

export default lesson;
