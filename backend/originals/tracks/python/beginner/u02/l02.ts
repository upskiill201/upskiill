import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 2 — Naming rules: what Python allows, what PEP 8 recommends, and Arjun's bad names. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: "Naming rules (and Arjun's bad names)",
  summary: 'Arjun sends Ada some of his old code: x1, tmp2, a. It runs perfectly. Neither of them can tell what it does. Time for the rules, and the habits.',
  minutes: 11,
  outcomes: [
    'Know the rules a variable name must follow',
    'Write names in snake_case',
    'Spot names Python will refuse',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'A variable name can start with a number, like 2nd_member.',
          isFact: false,
          explain: 'Myth. Names can contain letters, digits and underscores, but must not start with a digit. second_member works; 2nd_member is a SyntaxError.',
        },
        {
          text: 'Share and share are the same variable.',
          isFact: false,
          explain: 'Myth. Python is case-sensitive: Share, share and SHARE are three different names.',
        },
        {
          text: 'You can\'t name a variable if, for or class.',
          isFact: true,
          explain: 'Fact. Those are keywords: words Python keeps for itself. There are about 35 of them.',
        },
        {
          text: 'Python style is to join words with underscores: monthly_share.',
          isFact: true,
          explain: 'Fact. PEP 8, Python\'s style guide, recommends lowercase words joined by underscores for variables. People call it snake_case.',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Good names, bad names',
      caption: 'Both halves work. Only one tells you what it means.',
      code: '# Arjun, 2019\nx1 = 10\ntmp2 = 25000\nprint(x1 * tmp2)\n\n# Ada, today\nmembers = 10\nmonthly_share = 25000\nprint(members * monthly_share)\n',
      challenge: 'Try renaming monthly_share to monthly share (with a space). Read the error, then put the underscore back.',
    },
  ],
  apply: {
    scenario: "Ada renames Arjun's variables.",
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Will Python accept this name?',
        groups: ['Allowed', 'Not allowed'],
        items: [
          { text: 'monthly_share', group: 0 },
          { text: '2nd_member', group: 1 },
          { text: 'pay day', group: 1 },
          { text: 'member2', group: 0 },
          { text: 'for', group: 1 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Rename x1 and tmp2 to members and monthly_share',
        starter: 'x1 = 10\ntmp2 = 25000\nprint(x1 * tmp2)\n',
        solution: 'members = 10\nmonthly_share = 25000\nprint(members * monthly_share)\n',
        hint: 'Change every x1 to members and every tmp2 to monthly_share, including in the print line.',
        checks: [
          { message: 'Still print 250000', outputEquals: '250000' },
          { message: 'Use the name members', expr: 'members == 10' },
          { message: 'Use the name monthly_share', expr: 'monthly_share == 25000' },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Which name follows Python style (PEP 8)?',
        options: [
          { text: 'MonthlyShare', why: 'Capitalised words are for class names, which come much later.' },
          { text: 'monthly_share' },
          { text: 'monthlyshare', why: 'Allowed, but hard to read. Use underscores between words.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Which line is a SyntaxError?',
        language: 'python',
        lines: ['members = 10', 'pay day = 25', 'share = 25000'],
        bug: 1,
        fix: 'pay_day = 25',
        explanation: 'Names cannot contain spaces. Use an underscore: pay_day.',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What happens?',
        code: 'share = 25000\nprint(Share)',
        language: 'python',
        options: [
          { text: 'NameError: name \'Share\' is not defined' },
          { text: 'It prints 25000', why: 'Share with a capital S is a different name.' },
          { text: 'It prints Share', why: 'No quotes, so Python looks for a variable called Share.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Store 25 in a variable called pay_day and print it',
        starter: '# The ajo pays out on the 25th\n',
        solution: 'pay_day = 25\nprint(pay_day)\n',
        hint: 'Join the words with an underscore: pay_day = 25',
        checks: [
          { message: 'Print 25', outputEquals: '25' },
          { message: 'Name it pay_day', expr: 'pay_day == 25' },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: "Match Arjun's old name to a better one.",
        pairs: [
          ['x1', 'members'],
          ['tmp2', 'monthly_share'],
          ['a', 'pay_day'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'arjun',
        message: 'But x1 is shorter to type!',
        prompt: "Ada's best reply?",
        options: [
          { text: 'True, let\'s keep x1.', why: 'In a month, nobody will know what x1 is.' },
          { text: 'Long names are always better.', why: 'Clear beats long. the_number_of_members_in_the_ajo is too much.' },
          { text: 'Code is read far more often than it\'s typed. members tells me what it is.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'What is Python\'s style of joining words with underscores called? (two words or one)',
        answers: ['snake case', 'snake_case', 'snakecase'],
        placeholder: 'Style name',
      },
      {
        kind: 'tapBuild',
        prompt: 'Build a line that stores the group name.',
        language: 'python',
        tiles: ['group_name', '=', '"OFFICE AJO"'],
        distractors: ['group name', 'Group-Name'],
      },
    ],
  },
  reflect: {
    prompt: 'Think of a folder or file you named badly ("final_final2"). What would a name that explains itself look like?',
    starters: ['I once named a file...', 'A better name would be...'],
  },
  deepen: {
    title: 'All the keywords',
    summary: 'In the Try it card, run import keyword then print(keyword.kwlist) to see every word Python keeps for itself.',
  },
  notes: 'Identifier rules: Python Language Reference §2.3 (letters, digits, underscore; not starting with a digit; case-sensitive). Keywords: §2.3.1; keyword.kwlist has 35 entries in Python 3.12. Naming style: PEP 8, "Function and Variable Names" (lowercase with words separated by underscores).',
};

export default lesson;
