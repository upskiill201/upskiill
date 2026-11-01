import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 6 · Lesson 16 — Whose turn is it? members[(month - 1) % len(members)], wrapping round after the last member. */
const lesson: OriginalLesson = {
  key: 'l16',
  title: 'Whose turn is it?',
  summary: 'The question Ada gets most: "Whose turn is it this month?" With twelve members and a cycle that starts again after month 12, one line can answer it for any month, even month 14.',
  minutes: 12,
  outcomes: [
    'Turn a month number into a position with month - 1',
    'Wrap round the list with % len(members)',
    'Answer "whose turn?" for any month',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'For month 3, the collector is members[3].',
          isFact: false,
          explain: 'Myth. Months start at 1, positions at 0. Month 3 is members[2]: members[month - 1].',
        },
        {
          text: 'Month 13 needs members[12], which crashes with 12 members.',
          isFact: false,
          explain: 'Myth, once you use %. (13 - 1) % 12 is 0, so month 13 is Ada again: the second cycle starts.',
        },
        {
          text: 'x % len(members) is always a valid position.',
          isFact: true,
          explain: 'Fact. % gives the remainder, which is always from 0 to len - 1. It can never run off the end (as long as the list isn\'t empty).',
        },
        {
          text: 'If someone joins, the formula has to be rewritten.',
          isFact: false,
          explain: 'Myth. len(members) updates itself. The same line works for 12, 13 or 20 members.',
        },
      ],
    },
    {
      kind: 'code',
      language: 'python',
      caption: 'The whole rule in one line.',
      code: 'collector = members[(month - 1) % len(members)]',
    },
    {
      kind: 'tryIt',
      title: 'Any month',
      caption: 'Try months 1, 12, 13 and 14.',
      code: 'members = ["Ada", "Tunde", "Bisi", "Kemi", "Ngozi", "Yusuf",\n           "Ifeoma", "Segun", "Amaka", "Dayo", "Tobi", "Chika"]\nmonth = 13\n\ncollector = members[(month - 1) % len(members)]\nprint(f"Month {month}: {collector}")\n',
      challenge: 'Which month is Chika\'s second turn?',
    },
  ],
  apply: {
    scenario: 'Whose turn is it?',
    items: [
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'members = ["Ada", "Tunde", "Bisi"]\nmonth = 2\nprint(members[(month - 1) % len(members)])',
        language: 'python',
        options: [
          { text: 'Bisi', why: '(2 - 1) % 3 is 1: position 1.' },
          { text: 'Ada', why: 'Month 1 is Ada; month 2 is the next.' },
          { text: 'Tunde' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'members = ["Ada", "Tunde", "Bisi"]\nmonth = 4\nprint(members[(month - 1) % len(members)])',
        language: 'python',
        options: [
          { text: 'An IndexError', why: '% keeps it in range: (4 - 1) % 3 is 0.' },
          { text: 'Ada' },
          { text: 'Bisi', why: 'Month 3 is Bisi; month 4 wraps back to the start.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Print the collector for month as "Month 5: Ngozi"',
        starter: 'members = ["Ada", "Tunde", "Bisi", "Kemi", "Ngozi", "Yusuf"]\nmonth = 5\n',
        solution: 'members = ["Ada", "Tunde", "Bisi", "Kemi", "Ngozi", "Yusuf"]\nmonth = 5\ncollector = members[(month - 1) % len(members)]\nprint(f"Month {month}: {collector}")\n',
        hint: 'members[(month - 1) % len(members)]',
        checks: [
          { message: 'Print Month 5: Ngozi', outputEquals: 'Month 5: Ngozi' },
          { message: 'Use % len(members)', codeIncludes: '% len(members)' },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Same code, month 8. With 6 members it should wrap round to Tunde',
        starter: 'members = ["Ada", "Tunde", "Bisi", "Kemi", "Ngozi", "Yusuf"]\nmonth = 8\nprint(members[month - 1])\n',
        solution: 'members = ["Ada", "Tunde", "Bisi", "Kemi", "Ngozi", "Yusuf"]\nmonth = 8\nprint(members[(month - 1) % len(members)])\n',
        hint: 'The starter crashes. Add % len(members) inside the brackets.',
        checks: [{ message: 'Print Tunde', outputEquals: 'Tunde' }],
      },
      {
        kind: 'matchPairs',
        prompt: '12 members. Match the month to the position (month - 1) % 12.',
        pairs: [
          ['Month 1', '0'],
          ['Month 12', '11'],
          ['Month 13', '0 again'],
          ['Month 15', '2'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Month 1 shows Tunde instead of Ada. Which line?',
        language: 'python',
        lines: ['members = ["Ada", "Tunde", "Bisi"]', 'month = 1', 'collector = members[month % len(members)]', 'print(collector)'],
        bug: 2,
        fix: 'collector = members[(month - 1) % len(members)]',
        explanation: 'Forgot the - 1. Months start at 1; positions start at 0.',
      },
      {
        kind: 'fillBlank',
        prompt: 'The collector for any month.',
        language: 'python',
        template: 'collector = members[(month - 1) [[1]] [[2]](members)]',
        blanks: [['%'], ['len']],
        distractors: ['//', 'sum'],
      },
      {
        kind: 'sortGroups',
        prompt: '12 members. Whose turn: Ada or Tunde?',
        groups: ['Ada', 'Tunde'],
        items: [
          { text: 'Month 1', group: 0 },
          { text: 'Month 2', group: 1 },
          { text: 'Month 13', group: 0 },
          { text: 'Month 14', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'I could just restart the month count at 1 each year. Why bother with %?',
        prompt: "Arjun's best reply?",
        options: [
          { text: 'Because the cycle isn\'t a year. With 13 members it\'s 13 months. % works for any size; a calendar doesn\'t.' },
          { text: '% is faster.', why: 'Speed isn\'t the point; correctness for any group size is.' },
          { text: 'You\'re right, never use %.', why: 'Restarting at 1 each year breaks as soon as the group isn\'t 12.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: '12 members. What is (13 - 1) % 12?',
        answers: ['0'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Rotas wrap round everywhere: chores, night shifts, who hosts the meeting. Which rota in your life could this one line run?',
    starters: ['Our rota for...', 'It would wrap round after...'],
  },
  deepen: {
    title: 'Which cycle are we in?',
    summary: '(month - 1) // len(members) + 1 gives the cycle number: months 1 to 12 are cycle 1, month 13 starts cycle 2. // and % are partners.',
  },
  notes: 'Modulo (%) from Chapter 3. (13-1)%12 = 0; (15-1)%12 = 2; (8-1)%6 = 1 -> Tunde; (4-1)%3 = 0 -> Ada. x % n is in range 0..n-1 for positive n. Chika (position 11) collects in months 12 and 24.',
};

export default lesson;
