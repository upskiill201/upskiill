import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 2. Story: Zanele checks Kamau's "1 in 3". Numbers, maths and variables. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'Is it really 1 in 3?',
  summary: '5 weeks to Kamau. Kamau said 135 of 400 March deliveries were late. Zanele\'s first instinct as an analyst: check the number before believing it. Python is a calculator that remembers.',
  minutes: 10,
  outcomes: [
    'Do maths in Python: + - * /',
    'Store a value in a variable and reuse it',
    'Turn a count into a percentage',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Kamau says 135 of 400 deliveries were late. Is that really 1 in 3? Python can check. It does maths like a calculator: + - * and / for divide.', replies: ['Show me'] },
        { tey: 'print(135 / 400) shows 0.3375. Times 100, that\'s 33.75%. So yes, about 1 in 3.', replies: ['What if the numbers change?'] },
        { tey: 'Then use variables: names that hold a value. late = 135 stores 135 in a box called late. Now print(late / total) works for any month.', replies: ['Like a named cell in a spreadsheet?'] },
        { tey: 'Exactly like that. Change the cell, and everything that uses it updates when you run it again.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Check the boss\'s number',
      code: 'late = 135\ntotal = 400\n\nprint(late / total)\nprint(late / total * 100)\nprint(round(late / total * 100))\n',
      caption: 'Press Run. round() tidies a long number: round(33.75) is 34.',
      challenge: 'Change late to 100 and run it again. What percentage is that?',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'In Python, = means "store this", not "is equal to". late = 135 puts 135 into late.',
    },
  ],
  apply: {
    scenario: 'Checking Kamau\'s 1 in 3.',
    items: [
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'print(400 - 135)',
        language: 'python',
        options: [
          { text: '400 - 135', why: 'No quotes, so Python does the maths.' },
          { text: '265' },
          { text: '535', why: 'That\'s adding.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Store 135 in a variable called late and 400 in total. Then print late divided by total.',
        starter: 'late = 135\n',
        solution: 'late = 135\ntotal = 400\nprint(late / total)\n',
        hint: 'Add total = 400, then print(late / total).',
        checks: [
          { message: 'Print 0.3375', outputIncludes: '0.3375' },
          { message: 'Make a variable called total', expr: 'total == 400' },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the symbol to what it does.',
        pairs: [
          ['+', 'Add'],
          ['-', 'Subtract'],
          ['*', 'Multiply'],
          ['/', 'Divide'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Store 400 in a variable called total.',
        template: 'total [[1]] 400',
        blanks: [['=']],
        distractors: ['==', ':'],
        language: 'python',
      },
      {
        kind: 'writeCode',
        prompt: 'Print the late percentage: late divided by total, times 100.',
        starter: 'late = 135\ntotal = 400\n',
        solution: 'late = 135\ntotal = 400\nprint(late / total * 100)\n',
        hint: 'print(late / total * 100)',
        checks: [{ message: 'Print 33.75', outputIncludes: '33.75' }],
      },
      {
        kind: 'mcq',
        prompt: 'Is "1 in 3" a fair way to say 33.75%?',
        options: [
          { text: 'Yes: a third is 33.3%, close enough for a headline' },
          { text: 'No: it should be 1 in 4', why: '1 in 4 is 25%.' },
          { text: 'No: you must always give every decimal', why: 'Precision you don\'t need makes people stop listening.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line will cause an error?',
        lines: ['late = 135', 'total = 400', 'print(late / totl)'],
        bug: 2,
        fix: 'print(late / total)',
        explanation: 'totl is spelled wrong, so Python has never heard of it (a NameError).',
        language: 'python',
      },
      {
        kind: 'chatReply',
        from: 'remi',
        message: 'Kamau said 1 in 3. Do we really need to check his number?',
        prompt: 'Zanele\'s best reply?',
        options: [
          { text: 'No, he\'s the CEO.', why: 'Being senior doesn\'t make a number right.' },
          { text: 'Only if it looks wrong.', why: 'Wrong numbers often look fine.' },
          { text: 'Always. If the starting number is wrong, everything after it is too. It took one line.' },
        ],
        answer: 2,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build: print 33.75 rounded to a whole number.',
        tiles: ['print(', 'round(', '33.75', '))'],
        distractors: ['"33.75"'],
        language: 'python',
      },
      {
        kind: 'writeCode',
        prompt: 'How many deliveries were on time? Make on_time = total - late and print it.',
        starter: 'late = 135\ntotal = 400\n',
        solution: 'late = 135\ntotal = 400\non_time = total - late\nprint(on_time)\n',
        hint: 'on_time = total - late, then print(on_time).',
        checks: [
          { message: 'Print 265', outputIncludes: '265' },
          { message: 'Make a variable called on_time', expr: 'on_time == 265' },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What does round(33.75) give?',
        answers: ['34'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'When did you last believe a number without checking it? What would checking have taken?',
    starters: ['I believed...', 'Checking would have taken...'],
  },
  deepen: {
    title: 'Check one number',
    summary: 'Find a percentage in today\'s news. If it gives the counts, check the maths in the Try it card.',
  },
  notes: 'Counts from deliveries_clean.csv: 135 late, 265 on time, 400 total. Python round() uses banker\'s rounding for exact halves; 33.75 is not a half, so round() gives 34.',
};

export default lesson;
