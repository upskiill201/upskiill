import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 4 — Floor division // and remainder %: splitting into whole amounts and what's left over. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Floor division // and remainder %',
  summary: 'Four members are away for the holidays, so this month\'s 330000 is shared by 7. 330000 / 7 is 47142.857142857145. Nobody can be paid 0.857142857145 of a naira.',
  minutes: 12,
  outcomes: [
    'Get whole shares with //',
    'Get what\'s left over with %',
    'Check that the pieces add back up',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Splitting 330000 seven ways',
      text: '330000 // 7 is 47142: each person gets 47142 whole naira. 330000 % 7 is 6: six naira are left over. Check: 47142 * 7 + 6 is 330000, so nothing is lost.',
      hotspots: [
        { phrase: '330000 // 7', note: '// is floor division: divide, then drop everything after the decimal point. It gives an int when both sides are ints.' },
        { phrase: '330000 % 7', note: '% is the remainder (also called modulo): what\'s left after taking out as many 7s as fit.' },
        { phrase: 'six naira are left over', note: 'The group decides what happens to the 6: the next payout, a tip jar, or Ada\'s biscuit fund.' },
        { phrase: '47142 * 7 + 6 is 330000', note: 'The golden check: whole part times divisor, plus remainder, always gives back the original.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Seven ways',
      caption: 'Compare /, // and %, then check the pieces add back up.',
      code: 'pot = 330000\npeople = 7\n\nprint(pot / people)\nprint(pot // people)\nprint(pot % people)\nprint((pot // people) * people + pot % people)\n',
      challenge: 'Try people = 11. What is the remainder, and why?',
    },
  ],
  apply: {
    scenario: 'Sharing 330000 between 7 people.',
    items: [
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'print(17 // 5)',
        language: 'python',
        options: [
          { text: '3' },
          { text: '3.4', why: '// drops the decimal part.' },
          { text: '2', why: 'That\'s 17 % 5.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Print each person\'s whole share with //',
        starter: 'pot = 330000\npeople = 7\n',
        solution: 'pot = 330000\npeople = 7\nprint(pot // people)\n',
        hint: 'print(pot // people)',
        checks: [
          { message: 'Print 47142', outputEquals: '47142' },
          { message: 'Use //', codeIncludes: '//' },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'print(17 % 5)',
        language: 'python',
        options: [
          { text: '3', why: 'That\'s 17 // 5.' },
          { text: '2' },
          { text: '0.4', why: '% gives the remainder as a whole amount: 17 - 15 = 2.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Print the naira left over with %',
        starter: 'pot = 330000\npeople = 7\n',
        solution: 'pot = 330000\npeople = 7\nprint(pot % people)\n',
        hint: 'print(pot % people)',
        checks: [
          { message: 'Print 6', outputEquals: '6' },
          { message: 'Use %', codeIncludes: '%' },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the code to its answer.',
        pairs: [
          ['20 // 6', '3'],
          ['20 % 6', '2'],
          ['20 / 8', '2.5'],
          ['30 % 10', '0'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Does it divide exactly (remainder 0)?',
        groups: ['Remainder 0', 'Something left over'],
        items: [
          { text: '330000 % 11', group: 0 },
          { text: '330000 % 7', group: 1 },
          { text: '30000 % 2', group: 0 },
          { text: '25 % 4', group: 1 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Print Each: 47142, Left over: 6 using // and % in one f-string',
        starter: 'pot = 330000\npeople = 7\n',
        solution: 'pot = 330000\npeople = 7\nprint(f"Each: {pot // people}, Left over: {pot % people}")\n',
        hint: 'f"Each: {pot // people}, Left over: {pot % people}"',
        checks: [{ message: 'Print Each: 47142, Left over: 6', outputEquals: 'Each: 47142, Left over: 6' }],
      },
      {
        kind: 'fillBlank',
        prompt: 'Whole share, then the remainder.',
        language: 'python',
        template: 'each = pot [[1]] people\nleft = pot [[2]] people',
        blanks: [['//'], ['%']],
        distractors: ['/', '*'],
      },
      {
        kind: 'chatReply',
        from: 'arjun',
        message: 'How do you check your // and % answers are right?',
        prompt: "Ada's answer?",
        options: [
          { text: 'Run it twice.', why: 'Same code, same answer. That proves nothing.' },
          { text: 'Ask Tunde.', why: 'Tunde would want to check too. The maths check is better.' },
          { text: 'Multiply the whole share by the people and add the remainder. It must equal the pot.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'What does print(10 % 3) show?',
        answers: ['1'],
        placeholder: 'Output',
      },
    ],
  },
  reflect: {
    prompt: 'Splitting a bill evenly often leaves a remainder. What does your group do with the leftover?',
    starters: ['We usually...', 'A fair rule would be...'],
  },
  deepen: {
    title: 'Even or odd',
    summary: 'n % 2 is 0 for even numbers and 1 for odd ones. Programmers use it all the time, for example to colour every other row.',
  },
  notes: '// floor division and % modulo (Python Language Reference §6.7). 330000 / 7 = 47142.857142857145 (float repr); 330000 // 7 = 47142; 330000 % 7 = 6; 47142 * 7 + 6 = 330000. 330000 % 11 = 0.',
};

export default lesson;
