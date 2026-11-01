import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 2 — Comparing values: == != < > <= >=. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'Comparing values',
  summary: 'Paid in full? Paid late? Paid too little? Every rule in the ajo is a comparison. Python has six ways to compare, and one of them looks like an assignment in disguise.',
  minutes: 11,
  outcomes: [
    'Use the six comparison operators',
    'Tell = (store) from == (compare)',
    'Write the ajo\'s rules as comparisons',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'paid = 30000 checks whether paid is 30000.',
          isFact: false,
          explain: 'Myth. One = stores. To compare, use two: paid == 30000.',
        },
        {
          text: '!= means "not equal to".',
          isFact: true,
          explain: 'Fact. paid != 30000 is True when the amount is anything other than 30000.',
        },
        {
          text: 'paid >= 30000 is True for exactly 30000.',
          isFact: true,
          explain: 'Fact. >= means "greater than or equal to", so 30000 counts. > alone would say False.',
        },
        {
          text: 'day > 25 and day >= 26 mean different things for whole days.',
          isFact: false,
          explain: 'Myth. For whole numbers they agree: both are True from the 26th. Pick the one that reads like the rule: "late after the 25th" is day > 25.',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'The ajo\'s rules',
      caption: 'Kemi paid 30000 on the 27th. Which rules are True?',
      code: 'SHARE = 30000\nPAY_DAY = 25\npaid = 30000\nday = 27\n\nprint(paid >= SHARE)   # paid in full?\nprint(paid < SHARE)    # short?\nprint(day > PAY_DAY)   # late?\nprint(paid != SHARE)   # anything but exact?\n',
      challenge: 'Change paid to 15000 and day to 20. Predict all four before running.',
    },
  ],
  apply: {
    scenario: 'Writing the rules as comparisons.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match the operator to its meaning.',
        pairs: [
          ['==', 'Equal to'],
          ['!=', 'Not equal to'],
          ['>=', 'At least'],
          ['<', 'Less than'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Print whether the payment covers the share (at least SHARE)',
        starter: 'SHARE = 30000\npaid = 31500\n',
        solution: 'SHARE = 30000\npaid = 31500\nprint(paid >= SHARE)\n',
        hint: 'paid >= SHARE',
        checks: [
          { message: 'Print True', outputEquals: 'True' },
          { message: 'Use >=', codeIncludes: '>=' },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'day = 25\nprint(day > 25)',
        language: 'python',
        options: [
          { text: 'True', why: '25 is not greater than 25.' },
          { text: 'False' },
          { text: '25', why: '> gives True or False.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Print whether the payment was late: day after PAY_DAY',
        starter: 'PAY_DAY = 25\nday = 27\n',
        solution: 'PAY_DAY = 25\nday = 27\nprint(day > PAY_DAY)\n',
        hint: 'day > PAY_DAY',
        checks: [{ message: 'Print True', outputEquals: 'True' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'paid = 15000, SHARE = 30000. True or False?',
        groups: ['True', 'False'],
        items: [
          { text: 'paid < SHARE', group: 0 },
          { text: 'paid >= SHARE', group: 1 },
          { text: 'paid != SHARE', group: 0 },
          { text: 'paid == SHARE', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line stores instead of comparing?',
        language: 'python',
        lines: ['print(paid == 30000)', 'print(paid = 30000)', 'print(paid >= 30000)'],
        bug: 1,
        fix: 'print(paid == 30000)',
        explanation: 'One = inside print() is an error. Two == compare.',
      },
      {
        kind: 'fillBlank',
        prompt: 'Short of the share?',
        language: 'python',
        template: 'short = paid [[1]] SHARE',
        blanks: [['<']],
        distractors: ['>', '='],
      },
      {
        kind: 'mcq',
        prompt: 'The rule is "late if paid after the 25th". Which comparison matches it best?',
        options: [
          { text: 'day > 25' },
          { text: 'day >= 25', why: 'That makes paying ON the 25th late.' },
          { text: 'day == 25', why: 'Only the 25th itself.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'I keep typing = when I mean ==.',
        prompt: "Arjun's best reply?",
        options: [
          { text: 'They\'re the same.', why: 'One stores, one compares.' },
          { text: 'Always use ===.', why: 'That\'s JavaScript. Python uses ==.' },
          { text: 'Everyone does. Read = as "becomes" and == as "is it equal?". Saying it out loud helps.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'What does print(10 != 10) show?',
        answers: ['False'],
        placeholder: 'Output',
      },
    ],
  },
  reflect: {
    prompt: 'Every rule you follow is a comparison in disguise ("at least 18", "before 9 a.m."). Write one rule from your life as a comparison.',
    starters: ['The rule is...', 'As a comparison...'],
  },
  deepen: {
    title: 'Chained comparisons',
    summary: 'Python lets you write 1 <= day <= 25 for "between the 1st and the 25th". Most languages need two comparisons for that.',
  },
  notes: 'Comparison operators <, >, ==, >=, <=, != (Python Language Reference §6.10). Chained comparisons a < b < c are evaluated as a < b and b < c.',
};

export default lesson;
