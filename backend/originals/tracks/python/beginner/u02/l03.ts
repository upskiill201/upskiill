import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 3 — Changing a variable: reassignment, top-to-bottom order, using the old value. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Changing a variable',
  summary: 'Bisi joins the ajo, and the member count goes from 10 to 11. Ada changes the box, and learns that Python only cares what is in it right now.',
  minutes: 11,
  outcomes: [
    'Give a variable a new value',
    'Predict which value a line will see',
    'Update a variable using its old value',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'What happens when a box changes',
      steps: [
        {
          title: '1. Store a value',
          body: 'members holds 10.',
          code: 'members = 10\nprint(members)  # 10',
          language: 'python',
        },
        {
          title: '2. Store a new one',
          body: 'Assigning again replaces the old value. The 10 is gone.',
          code: 'members = 11\nprint(members)  # 11',
          language: 'python',
        },
        {
          title: '3. Order matters',
          body: 'Python runs top to bottom. A line only sees the value the box has at that moment.',
          code: 'members = 10\nprint(members)  # 10\nmembers = 11\nprint(members)  # 11',
          language: 'python',
        },
        {
          title: '4. Use the old value',
          body: 'The right side is worked out first, using the current value, then stored. So this adds one to whatever was there.',
          code: 'members = 10\nmembers = members + 1\nprint(members)  # 11',
          language: 'python',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Bisi joins',
      caption: 'Watch the pot change after Bisi joins.',
      code: 'members = 10\nshare = 25000\nprint("Pot before:", members * share)\n\nmembers = members + 1  # Bisi joins\nprint("Pot after:", members * share)\n',
      challenge: 'Two more people join next month. Add a line that adds 2 to members, then print the new pot.',
    },
  ],
  apply: {
    scenario: 'Bisi joins the ajo.',
    items: [
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'members = 10\nmembers = 11\nprint(members)',
        language: 'python',
        options: [
          { text: '10', why: 'The second line replaced the 10.' },
          { text: '21', why: 'Assigning replaces the value. It does not add.' },
          { text: '11' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Bisi joins: add 1 to members, then print it',
        starter: 'members = 10\n# Add one to members\n\nprint(members)\n',
        solution: 'members = 10\nmembers = members + 1\nprint(members)\n',
        hint: 'members = members + 1',
        checks: [
          { message: 'Print 11', outputEquals: '11' },
          { message: 'Use the old value of members', codeIncludes: 'members + 1' },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Order the lines so it prints 10, then 11.',
        language: 'python',
        lines: ['members = 10', 'print(members)', 'members = 11', 'print(members)'],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'share = 25000\nshare = share - 5000\nprint(share)',
        language: 'python',
        options: [
          { text: '25000', why: 'The second line changed share.' },
          { text: '20000' },
          { text: '-5000', why: 'The right side uses the current value: 25000 - 5000.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Add 2 members to the current count.',
        language: 'python',
        template: 'members = [[1]] + 2',
        blanks: [['members']],
        distractors: ['10', 'member'],
      },
      {
        kind: 'writeCode',
        prompt: 'Print the pot before and after the share rises to 30000',
        starter: 'members = 11\nshare = 25000\nprint(members * share)\n# Change share to 30000, then print the pot again\n',
        solution: 'members = 11\nshare = 25000\nprint(members * share)\nshare = 30000\nprint(members * share)\n',
        hint: 'share = 30000, then the same print line again.',
        checks: [{ message: 'Print 275000, then 330000', outputEquals: '275000\n330000' }],
      },
      {
        kind: 'findBug',
        prompt: 'Ada wants this to print 11. Which line is in the wrong place?',
        language: 'python',
        lines: ['members = 10', 'print(members)', 'members = members + 1'],
        bug: 1,
        fix: 'Move print(members) to after members = members + 1',
        explanation: 'Python runs top to bottom, so print sees 10 before the + 1 happens.',
      },
      {
        kind: 'sortGroups',
        prompt: 'members = 10, then members = members + 1. What does each line see?',
        groups: ['Sees 10', 'Sees 11'],
        items: [
          { text: 'A print(members) before the + 1', group: 0 },
          { text: 'A print(members) after the + 1', group: 1 },
          { text: 'The members on the right of members + 1', group: 0 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'pot = 100, then pot = pot * 2. What is pot now?',
        answers: ['200'],
        placeholder: 'A number',
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'members = members + 1 looks wrong. A number can\'t equal itself plus one!',
        prompt: "Arjun's best reply?",
        options: [
          { text: 'It\'s not "equals". = means: work out the right side, then store it on the left.' },
          { text: 'You\'re right, it\'s a bug.', why: 'It is valid, and very common.' },
          { text: 'Use == instead.', why: '== compares. It would not change members.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'A variable only knows its current value, not its history. What would you want a program to remember about how a number changed?',
    starters: ['I\'d want to know...', 'Because...'],
  },
  deepen: {
    title: 'A shortcut is coming',
    summary: 'members = members + 1 is so common that Python has a shortcut: members += 1. It\'s in Chapter 3.',
  },
  notes: 'Reassignment rebinds the name (Python Language Reference §7.2 Assignment statements: the expression is evaluated before binding). 11 * 25000 = 275000; 11 * 30000 = 330000.',
};

export default lesson;
