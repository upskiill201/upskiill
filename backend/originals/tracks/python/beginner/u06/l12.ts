import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 6 · Lesson 12 — Lists of numbers: sum(), min(), max(), and the average. */
const lesson: OriginalLesson = {
  key: 'l12',
  title: 'sum, min and max',
  summary: 'End of the month. The group wants three numbers: how much came in, the smallest payment, and the biggest. Ada has every payment in one list now, so each answer is one word.',
  minutes: 11,
  outcomes: [
    'Add up a list with sum()',
    'Find the smallest and biggest with min() and max()',
    'Work out how much is missing from the pot',
  ],
  learn: [
    {
      kind: 'story',
      title: 'The month in three numbers',
      beats: [
        { speaker: 'narrator', text: 'Five members have paid so far: 30,000, 30,000, 15,000, 30,000 and 25,000. Ada used to add them on her phone calculator, twice, to be sure.' },
        { speaker: 'arjun', text: 'payments is a list now. sum(payments). That\'s the total.' },
        { speaker: 'ada', text: '130,000. And min(payments) is 15,000: that\'s Bisi\'s half payment. max(payments) is 30,000.' },
        { speaker: 'arjun', text: 'Now the useful one: what should have come in, minus what did.' },
        { speaker: 'ada', text: 'len(payments) * SHARE - sum(payments). 150,000 minus 130,000. We\'re 20,000 short.' },
      ],
      choice: {
        prompt: 'Which number does the group most need to see?',
        options: [
          {
            text: 'How much is still missing: 20,000.',
            outcome: 'That\'s what someone has to act on. The total is nice; the gap is useful.',
            best: true,
          },
          {
            text: 'The biggest payment.',
            outcome: 'Everyone paid at most the share, so max() tells them little this month.',
          },
          {
            text: 'Every single payment, in a long list.',
            outcome: 'Accurate, but nobody reads it on a bus. Lead with the gap.',
          },
        ],
      },
    },
    {
      kind: 'tryIt',
      title: 'Month summary',
      caption: 'Three built-in functions, one list.',
      code: 'SHARE = 30000\npayments = [30000, 30000, 15000, 30000, 25000]\n\nprint(f"Collected: {sum(payments):,}")\nprint(f"Smallest: {min(payments):,}")\nprint(f"Biggest: {max(payments):,}")\nprint(f"Short by: {len(payments) * SHARE - sum(payments):,}")\n',
      challenge: 'Add a sixth payment of 30000 with .append() and run it again.',
    },
  ],
  apply: {
    scenario: 'The month in numbers.',
    items: [
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'print(sum([30000, 15000, 25000]))',
        language: 'python',
        options: [
          { text: '3', why: 'That\'s len(). sum() adds the values.' },
          { text: '70000' },
          { text: '30000', why: 'That\'s max().' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Print the total of payments with sum()',
        starter: 'payments = [30000, 30000, 15000, 30000, 25000]\n',
        solution: 'payments = [30000, 30000, 15000, 30000, 25000]\nprint(sum(payments))\n',
        hint: 'sum(payments)',
        checks: [
          { message: 'Print 130000', outputEquals: '130000' },
          { message: 'Use sum()', codeIncludes: 'sum(' },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Print the smallest payment, then the biggest, on two lines',
        starter: 'payments = [30000, 15000, 25000, 30000]\n',
        solution: 'payments = [30000, 15000, 25000, 30000]\nprint(min(payments))\nprint(max(payments))\n',
        hint: 'min(payments), then max(payments).',
        checks: [{ message: 'Print 15000 then 30000', outputEquals: '15000\n30000' }],
      },
      {
        kind: 'matchPairs',
        prompt: 'payments = [30000, 15000, 25000]. Match the code to the value.',
        pairs: [
          ['sum(payments)', '70000'],
          ['min(payments)', '15000'],
          ['max(payments)', '30000'],
          ['len(payments)', '3'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Print how much the pot is short: len(payments) * SHARE minus sum(payments)',
        starter: 'SHARE = 30000\npayments = [30000, 15000, 25000, 30000]\n',
        solution: 'SHARE = 30000\npayments = [30000, 15000, 25000, 30000]\nprint(len(payments) * SHARE - sum(payments))\n',
        hint: '4 x 30000 is 120000. What came in?',
        checks: [{ message: 'Print 20000', outputEquals: '20000' }],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'payments = [30000, 30000, 15000, 25000]\nprint(sum(payments) / len(payments))',
        language: 'python',
        options: [
          { text: '25000', why: '/ always gives a float, so it shows .0.' },
          { text: '100000', why: 'That\'s just the sum. Dividing by the count gives the average.' },
          { text: '25000.0' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'This crashes with a TypeError. Which line?',
        language: 'python',
        lines: ['payments = [30000, "15000", 25000]', 'total = sum(payments)', 'print(total)'],
        bug: 0,
        fix: 'payments = [30000, 15000, 25000]',
        explanation: '"15000" is text, and sum() can\'t add text to numbers. Store numbers as numbers (int() when they come from input).',
      },
      {
        kind: 'fillBlank',
        prompt: 'The average payment.',
        language: 'python',
        template: 'average = [[1]](payments) / [[2]](payments)',
        blanks: [['sum'], ['len']],
        distractors: ['max', 'count'],
      },
      {
        kind: 'chatReply',
        from: 'arjun',
        message: 'Why tell the group we\'re 20,000 short? Isn\'t the total enough?',
        prompt: "Ada's best reply?",
        options: [
          { text: 'The total says what we have. The gap says what someone needs to do. People act on the gap.' },
          { text: 'To shame Bisi.', why: 'The summary is about the pot, not about blaming anyone.' },
          { text: 'The total is wrong.', why: 'It\'s right; it just isn\'t the useful number.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which built-in gives the biggest number in a list? (no brackets)',
        answers: ['max', 'max()'],
        placeholder: 'Function name',
      },
    ],
  },
  reflect: {
    prompt: 'The total, the smallest, the biggest, the gap: which one would you lead with in a message to your group, and why?',
    starters: ['I\'d lead with...', 'Because people need to...'],
  },
  deepen: {
    title: 'min and max on text',
    summary: 'min(members) gives the name that comes first alphabetically; max(members) the last. Same rules as sorted(): capitals before small letters.',
  },
  notes: 'sum(), min(), max() built-ins (Python docs, Built-in Functions). 30000+30000+15000+30000+25000 = 130000; 5 x 30000 = 150000; gap 20000. [30000,30000,15000,25000]: sum 100000 / 4 = 25000.0. sum() of a list containing a str raises TypeError.',
};

export default lesson;
