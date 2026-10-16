import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 3 — Order of operations: precedence and brackets, with ajo sums. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Order of operations',
  summary: 'Ada writes pot - BANK_FEE / members to split the fee between everyone, and gets 329995.45. The fee was meant to be shared, not shrunk. Order matters.',
  minutes: 11,
  outcomes: [
    'Predict which part of a sum Python does first',
    'Use brackets to choose the order',
    'Spot a sum that needs brackets',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'Python works sums out left to right, like reading.',
          isFact: false,
          explain: 'Myth. Like school maths, * and / come before + and -. 2 + 3 * 4 is 14, not 20.',
        },
        {
          text: 'Brackets always go first.',
          isFact: true,
          explain: 'Fact. (pot - BANK_FEE) / members takes the fee off first, then divides. Brackets are how you say what you mean.',
        },
        {
          text: 'Extra brackets slow your program down.',
          isFact: false,
          explain: 'Myth. Brackets cost nothing. If you\'re unsure of the order, add them: they make the intent clear to readers too.',
        },
        {
          text: 'When two operators have the same rank, like * and /, Python goes left to right.',
          isFact: true,
          explain: 'Fact. 330000 / 11 * 2 is (330000 / 11) * 2 = 60000.0.',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Sharing the fee',
      caption: 'Same numbers, different brackets, different answers.',
      code: 'pot = 330000\nBANK_FEE = 50\nmembers = 11\n\nprint(pot - BANK_FEE / members)\nprint((pot - BANK_FEE) / members)\n',
      challenge: 'Which line gives what each member really receives from the pot after the fee?',
    },
  ],
  apply: {
    scenario: 'Getting the order right.',
    items: [
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'print(10 + 20 * 3)',
        language: 'python',
        options: [
          { text: '90', why: '* goes first: 20 * 3 = 60, then + 10.' },
          { text: '33', why: 'That\'s not any order of these operations.' },
          { text: '70' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Print the pot after the fee, divided by members: (pot - BANK_FEE) / members',
        starter: 'pot = 330000\nBANK_FEE = 55\nmembers = 11\n',
        solution: 'pot = 330000\nBANK_FEE = 55\nmembers = 11\nprint((pot - BANK_FEE) / members)\n',
        hint: 'Brackets around pot - BANK_FEE.',
        checks: [
          { message: 'Print 29995.0', outputEquals: '29995.0' },
          { message: 'Use brackets', codeIncludes: '(pot - BANK_FEE)' },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'In 2 + 3 * 4 - 1, which happens first?',
        groups: ['First', 'Later'],
        items: [
          { text: '3 * 4', group: 0 },
          { text: '2 + ...', group: 1 },
          { text: '... - 1', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'print((10 + 20) * 3)',
        language: 'python',
        options: [
          { text: '70', why: 'Brackets first: 30 * 3.' },
          { text: '63', why: 'Brackets go first.' },
          { text: '90' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Ada wants the average of two payments, 30000 and 15000. Which line is wrong?',
        language: 'python',
        lines: ['a = 30000', 'b = 15000', 'print(a + b / 2)'],
        bug: 2,
        fix: 'print((a + b) / 2)',
        explanation: 'Without brackets, only b is halved: 30000 + 7500 = 37500.0.',
      },
      {
        kind: 'writeCode',
        prompt: 'Print the average of a and b',
        starter: 'a = 30000\nb = 15000\n',
        solution: 'a = 30000\nb = 15000\nprint((a + b) / 2)\n',
        hint: 'Add first, then divide: (a + b) / 2',
        checks: [{ message: 'Print 22500.0', outputEquals: '22500.0' }],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the sum to its answer.',
        pairs: [
          ['2 + 3 * 4', '14'],
          ['(2 + 3) * 4', '20'],
          ['12 / 2 * 3', '18.0'],
          ['12 / (2 * 3)', '2.0'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Take the fee off before dividing.',
        language: 'python',
        template: 'share_after_fee = [[1]]pot - BANK_FEE[[2]] / members',
        blanks: [['('], [')']],
        distractors: ['[', ']'],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'Should I add brackets even when I know Python would get it right?',
        prompt: "Arjun's best reply?",
        options: [
          { text: 'Never add extra brackets.', why: 'Clarity beats minimalism.' },
          { text: 'If it makes the meaning clearer to a reader, yes. Brackets are free.' },
          { text: 'Always bracket everything.', why: '((2) + (3)) is noise. Bracket where it helps.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'What does print(100 - 10 * 5) show?',
        answers: ['50'],
        placeholder: 'Output',
      },
    ],
  },
  reflect: {
    prompt: 'Brackets say what you mean. Where else does the order of steps change the result (recipes, discounts, taxes)?',
    starters: ['Order matters when...', 'For example...'],
  },
  deepen: {
    title: 'The full table',
    summary: 'Python\'s docs have a full precedence table (** is above * and /). You only need the school rules plus "brackets first" for now.',
  },
  notes: 'Operator precedence: Python Language Reference §6.17. Left-to-right for operators of equal precedence (except **). 330000 - 50/11 = 329995.4545...; (330000 - 55) / 11 = 29995.0; (30000 + 15000) / 2 = 22500.0; 12 / 2 * 3 = 18.0.',
};

export default lesson;
