import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 6 · Lesson 1 — Lists hold many things: one variable for all eleven members. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'Lists hold many things',
  summary: 'Ada\'s tracker has member1 = "Ada", member2 = "Tunde"... all the way to member11. Then Chika joins and she needs a twelfth variable. Arjun: "You need one box that holds many things."',
  minutes: 11,
  outcomes: [
    'Make a list with square brackets',
    'Store all the members in one variable',
    'Print a list and read the output',
  ],
  learn: [
    {
      kind: 'story',
      title: 'member12',
      beats: [
        { speaker: 'narrator', text: 'Ada\'s file has eleven lines: member1 = "Ada", member2 = "Tunde", and so on. Chika joins. Ada types member12 = "Chika" and sighs.' },
        { speaker: 'arjun', text: '(on the call) What happens when you want to print everyone? Eleven prints? Twelve? Put them in a list.' },
        { speaker: 'ada', text: 'members = ["Ada", "Tunde", "Bisi", ...]' },
        { speaker: 'arjun', text: 'One name, all the members, in order. When someone joins, the list grows. No new variables.' },
      ],
      choice: {
        prompt: 'How should the tracker store the members?',
        options: [
          {
            text: 'One list: members = ["Ada", "Tunde", "Bisi", ...].',
            outcome: 'Twelve members, one variable. This chapter teaches everything you can do with it.',
            best: true,
          },
          {
            text: 'Keep adding member12, member13...',
            outcome: 'Every new member means editing the code in several places. It doesn\'t scale.',
          },
          {
            text: 'One long string: "Ada, Tunde, Bisi..."',
            outcome: 'You can split it, but every change means rebuilding the string. A list is made for this.',
          },
        ],
      },
    },
    {
      kind: 'text',
      html: '<p>A <strong>list</strong> holds many values, in order, in one variable. Write it with <strong>square brackets</strong> and commas between the items:</p><p><code>members = ["Ada", "Tunde", "Bisi"]</code></p><p><code>print(members)</code> shows the whole list, brackets and quotes included: <code>[\'Ada\', \'Tunde\', \'Bisi\']</code>. Lists can hold numbers too: <code>payments = [30000, 30000, 15000]</code>. You met one by accident in Chapter 4: <code>.split()</code> gives a list.</p>',
    },
    {
      kind: 'tryIt',
      title: 'The member list',
      caption: 'Twelve members, one variable.',
      code: 'members = ["Ada", "Tunde", "Bisi", "Kemi", "Ngozi", "Yusuf",\n           "Ifeoma", "Segun", "Amaka", "Dayo", "Tobi", "Chika"]\n\nprint(members)\nprint(type(members))\n',
      challenge: 'Make a list called payments with three amounts and print it.',
    },
  ],
  apply: {
    scenario: 'One list for everyone.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Which line makes a list?',
        options: [
          { text: 'members = ["Ada", "Tunde"]' },
          { text: 'members = ("Ada" "Tunde")', why: 'Lists use square brackets and commas.' },
          { text: 'members = "Ada", "Tunde"', why: 'That makes a tuple; a list needs [ ].' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Make a list called members with "Ada", "Tunde" and "Bisi", then print it',
        starter: '',
        solution: 'members = ["Ada", "Tunde", "Bisi"]\nprint(members)\n',
        hint: 'members = ["Ada", "Tunde", "Bisi"]',
        checks: [
          { message: "Print ['Ada', 'Tunde', 'Bisi']", outputEquals: "['Ada', 'Tunde', 'Bisi']" },
          { message: 'Make the list', expr: 'members == ["Ada", "Tunde", "Bisi"]' },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'A list, or not?',
        groups: ['A list', 'Not a list'],
        items: [
          { text: '["Ada", "Tunde"]', group: 0 },
          { text: '"Ada, Tunde"', group: 1 },
          { text: '[30000, 15000]', group: 0 },
          { text: '30000', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'print(type(["Ada"]))',
        language: 'python',
        options: [
          { text: "<class 'list'>" },
          { text: "<class 'str'>", why: 'The brackets make it a list, even with one item.' },
          { text: 'Ada', why: 'type() shows the type.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Make a list called payments with 30000, 30000 and 15000, then print it',
        starter: '',
        solution: 'payments = [30000, 30000, 15000]\nprint(payments)\n',
        hint: 'Numbers go in without quotes.',
        checks: [{ message: 'Print [30000, 30000, 15000]', outputEquals: '[30000, 30000, 15000]' }],
      },
      {
        kind: 'findBug',
        prompt: 'Which line is a SyntaxError?',
        language: 'python',
        lines: ['members = ["Ada", "Tunde"]', 'payments = [30000, 15000]', 'months = ["Jan" "Feb", "Mar"'],
        bug: 2,
        fix: 'months = ["Jan", "Feb", "Mar"]',
        explanation: 'A missing comma (Python glues "Jan" "Feb" into "JanFeb") and a missing closing bracket.',
      },
      {
        kind: 'fillBlank',
        prompt: 'A list of two members.',
        language: 'python',
        template: 'members = [[1]]"Ada"[[2]] "Tunde"[[3]]',
        blanks: [['['], [','], [']']],
        distractors: ['(', ';'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the brackets to what they make.',
        pairs: [
          ['[ ]', 'A list'],
          ['" "', 'A string'],
          ['( ) after a name', 'A function call'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'Can a list hold names AND amounts together?',
        prompt: "Arjun's best reply?",
        options: [
          { text: 'It can hold any mix, but keep each list to one kind of thing. Lesson 13 shows a neat way to pair names with amounts.' },
          { text: 'No, never.', why: 'Python allows mixed lists.' },
          { text: 'Only numbers.', why: 'Lists hold any values.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which brackets make a list: round ( ), square [ ] or curly { }? (one word)',
        answers: ['square', 'square brackets'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'Where in your life do you keep a list on paper or in your head (shopping, guests, tasks)? What would you want to do with it in code?',
    starters: ['I keep a list of...', 'I\'d want to...'],
  },
  deepen: {
    title: 'Lists are everywhere',
    summary: 'A contact list, a playlist, a queue at the bank: most programs are lists of things plus rules for them. You\'re about to write one.',
  },
  notes: 'Lists (Python tutorial §3.1.3, §5.1). Adjacent string literals concatenate ("Jan" "Feb" == "JanFeb"). "a", "b" without brackets makes a tuple. From Chapter 6 the ajo has 12 members: Ada, Tunde, Bisi, Kemi, Ngozi, Yusuf, Ifeoma, Segun, Amaka, Dayo, Tobi and Chika (newest).',
};

export default lesson;
