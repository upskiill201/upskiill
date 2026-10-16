import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 9 — Numbers inside f-strings: maths in the braces, then a first look at formatting. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Numbers inside f-strings',
  summary: 'Ada\'s tracker has a pot variable that she has to remember to update. Arjun: "Why store it at all? Work it out inside the f-string."',
  minutes: 12,
  outcomes: [
    'Put a calculation inside the braces',
    'Show a whole number from a division',
    'Keep the working in one place',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'From variables to a sentence',
      steps: [
        {
          title: '1. Any expression can go in the braces',
          body: 'Python works out what\'s inside, then puts the answer in the text.',
          code: 'members = 11\nshare = 25000\nprint(f"Pot: {members * share}")\n# Pot: 275000',
          language: 'python',
        },
        {
          title: '2. Division gives a decimal',
          body: 'Splitting the pot with / gives a float, so it shows .0.',
          code: 'pot = 275000\nprint(f"Each: {pot / 11}")\n# Each: 25000.0',
          language: 'python',
        },
        {
          title: '3. Ask for no decimal places',
          body: 'After the value, :.0f means "a number with 0 decimal places". :.2f would show two.',
          code: 'print(f"Each: {pot / 11:.0f}")\n# Each: 25000',
          language: 'python',
        },
        {
          title: '4. Keep the sums with the words',
          body: 'One f-string, three values. Change members, and every number in the sentence updates.',
          code: 'print(f"{members} members x {share} = {members * share}")',
          language: 'python',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'The working, in one line',
      caption: 'Change members to 12 and run it. Every number updates.',
      code: 'members = 11\nshare = 25000\n\nprint(f"{members} members x {share} = {members * share}")\nprint(f"Half a share: {share / 2:.0f}")\n',
      challenge: 'Print the pot divided between 4 people with :.2f. How many decimal places do you get?',
    },
  ],
  apply: {
    scenario: 'Sums inside sentences.',
    items: [
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'a = 3\nb = 4\nprint(f"{a} + {b} = {a + b}")',
        language: 'python',
        options: [
          { text: '3 + 4 = a + b', why: 'Inside braces, Python works the sum out.' },
          { text: '3 + 4 = 7' },
          { text: '{a} + {b} = {a + b}', why: 'With the f, every brace is filled in.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Print Pot: 275000, working out the pot inside the f-string',
        starter: 'members = 11\nshare = 25000\n',
        solution: 'members = 11\nshare = 25000\nprint(f"Pot: {members * share}")\n',
        hint: 'print(f"Pot: {members * share}")',
        checks: [
          { message: 'Print Pot: 275000', outputEquals: 'Pot: 275000' },
          { message: 'Do the maths inside the braces', codeIncludes: '{members * share}' },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'print(f"{10 / 4:.2f}")',
        language: 'python',
        options: [
          { text: '2.5', why: ':.2f always shows two decimal places.' },
          { text: '3', why: 'That would be :.0f.' },
          { text: '2.50' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Show the share with no decimal places.',
        language: 'python',
        template: 'print(f"Each: {pot / 11[[1]]}")',
        blanks: [[':.0f']],
        distractors: [':.2f', '.0'],
      },
      {
        kind: 'writeCode',
        prompt: 'Print 11 members x 25000 = 275000 from the variables',
        starter: 'members = 11\nshare = 25000\n',
        solution: 'members = 11\nshare = 25000\nprint(f"{members} members x {share} = {members * share}")\n',
        hint: 'Three sets of braces: {members}, {share} and {members * share}.',
        checks: [
          { message: 'Print 11 members x 25000 = 275000', outputEquals: '11 members x 25000 = 275000' },
          { message: 'Use the variables', codeIncludes: '{members}' },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'x = 7.5. Match the f-string to what it shows.',
        pairs: [
          ['f"{x}"', '7.5'],
          ['f"{x:.2f}"', '7.50'],
          ['f"{x * 2}"', '15.0'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Ada wants Each: 25000 with no .0. Which line shows the .0?',
        language: 'python',
        lines: ['pot = 275000', 'print(f"Each: {pot / 11}")'],
        bug: 1,
        fix: 'print(f"Each: {pot / 11:.0f}")',
        explanation: '/ gives a float. Add :.0f inside the braces to hide the decimals.',
      },
      {
        kind: 'sortGroups',
        prompt: 'Will the output have a decimal point?',
        groups: ['Has a decimal point', 'Whole number'],
        items: [
          { text: 'f"{275000 / 11}"', group: 0 },
          { text: 'f"{11 * 25000}"', group: 1 },
          { text: 'f"{275000 / 11:.0f}"', group: 1 },
          { text: 'f"{5:.2f}"', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'arjun',
        message: 'Why work the pot out inside the f-string instead of storing pot?',
        prompt: "Ada's best answer?",
        options: [
          { text: 'There\'s no pot variable to forget to update. It\'s always members * share.' },
          { text: 'Variables are bad.', why: 'Variables are great. This just avoids one that can go stale.' },
          { text: 'It\'s the only way f-strings work.', why: 'Plain variables in braces work too.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'What does print(f"{2 * 3}") show?',
        answers: ['6'],
        placeholder: 'Output',
      },
    ],
  },
  reflect: {
    prompt: 'Storing a value you could work out means two things to keep in sync. Where in life do you keep a number that could go out of date?',
    starters: ['I keep track of...', 'It goes out of date when...'],
  },
  deepen: {
    title: 'More format codes',
    summary: 'Chapter 3 adds commas to big numbers: f"{275000:,}" shows 275,000. Try it now if you\'re curious.',
  },
  notes: 'f-string expressions and format specs (PEP 498; Format Specification Mini-Language: .0f, .2f). 275000 / 11 = 25000.0; 10 / 4 = 2.5 → "2.50" with .2f; 7.5 * 2 = 15.0.',
};

export default lesson;
