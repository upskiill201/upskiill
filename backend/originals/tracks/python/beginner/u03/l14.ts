import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 14 — Averages: total divided by count, and the traps (wrong count, outliers). */
const lesson: OriginalLesson = {
  key: 'l14',
  title: 'Averages',
  summary: 'Four people paid late this month: 2, 5, 1 and 12 days late. Tunde says "on average we\'re only a few days late, it\'s fine." Ada works out the average, and then what it hides.',
  minutes: 11,
  outcomes: [
    'Work out an average: total divided by how many',
    'Avoid dividing by the wrong count',
    'Notice when one big value skews an average',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'An average is the total divided by how many values there are.',
          isFact: true,
          explain: 'Fact. (2 + 5 + 1 + 12) / 4 is 20 / 4 = 5.0 days late.',
        },
        {
          text: 'You can divide by any count, as long as you\'re consistent.',
          isFact: false,
          explain: 'Myth. Divide by the number of values you added up. Dividing the four late payers\' days by all 11 members gives 1.8, which describes nobody.',
        },
        {
          text: 'The average tells you what a typical person did.',
          isFact: false,
          explain: 'Myth, often. Three people were 1 to 5 days late, but one was 12 days late and pulled the average up to 5.0. Always look at the values too.',
        },
        {
          text: 'Writing a + b + c + d / 4 gives the average.',
          isFact: false,
          explain: 'Myth. Order of operations: only d is divided. Brackets: (a + b + c + d) / 4.',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Days late',
      caption: 'The average, and the biggest value hiding inside it.',
      code: 'a, b, c, d = 2, 5, 1, 12\n\ntotal = a + b + c + d\ncount = 4\n\nprint(f"Average: {total / count} days late")\nprint(f"Without the 12: {(a + b + c) / 3:.1f}")\n',
      challenge: 'Tunde, the 12, pays 2 days late next month. Change d and run it again.',
    },
  ],
  apply: {
    scenario: 'How late, on average?',
    items: [
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'print((2 + 5 + 1 + 12) / 4)',
        language: 'python',
        options: [
          { text: '20', why: 'That\'s the total, before dividing.' },
          { text: '5', why: '/ gives a float.' },
          { text: '5.0' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Print the average of the four payments in naira',
        starter: 'a = 30000\nb = 30000\nc = 15000\nd = 25000\n',
        solution: 'a = 30000\nb = 30000\nc = 15000\nd = 25000\nprint((a + b + c + d) / 4)\n',
        hint: 'Brackets around the sum, then / 4.',
        checks: [
          { message: 'Print 25000.0', outputEquals: '25000.0' },
          { message: 'Bracket the sum', codeIncludes: '(a + b + c + d)' },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line gives the wrong average?',
        language: 'python',
        lines: ['total = 2 + 5 + 1 + 12', 'print(total / 4)', 'print(2 + 5 + 1 + 12 / 4)'],
        bug: 2,
        fix: 'print((2 + 5 + 1 + 12) / 4)',
        explanation: 'Only the 12 is divided without brackets: 8 + 3.0 = 11.0.',
      },
      {
        kind: 'sortGroups',
        prompt: 'Right count, or wrong count, for "average days late of the late payers"?',
        groups: ['Right count', 'Wrong count'],
        items: [
          { text: 'total_days / 4 (the four late payers)', group: 0 },
          { text: 'total_days / 11 (all members)', group: 1 },
          { text: 'total_days / late_payers', group: 0 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Print the average days late with one decimal place',
        starter: 'total_days = 20\nlate_payers = 4\n',
        solution: 'total_days = 20\nlate_payers = 4\nprint(f"{total_days / late_payers:.1f}")\n',
        hint: 'f"{total_days / late_payers:.1f}"',
        checks: [{ message: 'Print 5.0', outputEquals: '5.0' }],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the values to their average.',
        pairs: [
          ['2, 4', '3.0'],
          ['1, 2, 3', '2.0'],
          ['10, 20, 30, 40', '25.0'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Days late: 1, 2, 2 and 15. Why is the average (5.0) misleading?',
        options: [
          { text: 'One very late payment pulls it up; most people were only 1 or 2 days late' },
          { text: 'Averages are always wrong', why: 'They\'re useful, but check the values too.' },
          { text: 'It should be 20', why: 'That\'s the total.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'An average.',
        language: 'python',
        template: 'average = [[1]] / [[2]]',
        blanks: [['total'], ['count']],
        distractors: ['members', 'pot'],
      },
      {
        kind: 'chatReply',
        from: 'arjun',
        message: 'Tunde says "on average we\'re only 5 days late, it\'s fine". Is it?',
        prompt: "Ada's best reply?",
        options: [
          { text: 'Yes, 5 is small.', why: 'The average hides the 12-day outlier.' },
          { text: 'Three of us were 1 to 5 days late. One was 12. The average hides that. Tunde, it\'s you.' },
          { text: 'Averages don\'t apply to money.', why: 'They do. They just need care.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'What is the average of 6 and 10?',
        answers: ['8', '8.0'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Where have you heard an average that hid something (salaries, waiting times, marks)? What would the full list show?',
    starters: ['The average was...', 'It hid...'],
  },
  deepen: {
    title: 'Median, the middle value',
    summary: 'The median is the middle value when you sort them: for 1, 2, 5, 12 it\'s 3.5. It ignores how big the outlier is. Python\'s statistics module has statistics.median().',
  },
  notes: 'Arithmetic mean = sum / count. (2+5+1+12)/4 = 5.0; (2+5+1)/3 = 2.67; 20/11 = 1.818... (wrong count); (30000+30000+15000+25000)/4 = 25000.0; 2+5+1+12/4 = 11.0. statistics.median (Python docs, statistics module). The 12-day late payer is Tunde (story).',
};

export default lesson;
