import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 9 — Money in kobo: store money as whole kobo, split exactly, convert back for display. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Money in kobo: whole numbers for exact money',
  summary: 'Kemi, who does the office accounts, tells Ada the real trick: "We never store naira with decimals. We store kobo." 100 kobo is a naira, and kobo are always whole.',
  minutes: 13,
  outcomes: [
    'Store money as whole kobo',
    'Split money exactly with // and %',
    'Turn kobo back into naira and kobo for display',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Kemi\'s rule',
      beats: [
        { speaker: 'narrator', text: 'Ada shows Kemi the 0.30000000000000004 problem. Kemi isn\'t surprised.' },
        { speaker: 'narrator', text: '"Every accounting system I\'ve used stores money in the smallest unit. For us that\'s kobo. 100 kobo to the naira. No decimals, so nothing to go wrong."' },
        { speaker: 'ada', text: 'So 30000 naira is 3000000 kobo. And splitting the pot seven ways...' },
        { speaker: 'arjun', text: '(on the call) ...is 33000000 kobo // 7. Whole kobo for everyone, % tells you exactly what\'s left. Banks and payment apps work like this.' },
      ],
      choice: {
        prompt: 'How should the tracker store the share?',
        options: [
          {
            text: 'SHARE_KOBO = 3000000, and only convert to naira when printing.',
            outcome: 'All the maths is with whole numbers. Nothing drifts, every check with == works.',
            best: true,
          },
          {
            text: 'SHARE = 30000.00 as a float.',
            outcome: 'Fine until the first awkward split, then the 0.30000000000000004 problem comes back.',
          },
          {
            text: 'As text, "30000.00".',
            outcome: 'Then every sum needs a conversion first. Text is for showing, not counting.',
          },
        ],
      },
    },
    {
      kind: 'text',
      html: '<p>The recipe:</p><ol><li><strong>Store kobo:</strong> <code>pot_kobo = 33000000</code> (that\'s ₦330,000).</li><li><strong>Split with // and %:</strong> <code>pot_kobo // 7</code> is 4714285 kobo each, and <code>pot_kobo % 7</code> is 5 kobo left over.</li><li><strong>Show as naira:</strong> <code>4714285 // 100</code> is 47142 naira and <code>4714285 % 100</code> is 85 kobo. Or divide by 100 only at the very end, for display.</li></ol>',
    },
    {
      kind: 'tryIt',
      title: 'The exact seven-way split',
      caption: 'Every number is a whole number until the last line.',
      code: 'pot_kobo = 330000 * 100\npeople = 7\n\neach_kobo = pot_kobo // people\nleft_kobo = pot_kobo % people\n\nprint(f"Each: {each_kobo // 100} naira {each_kobo % 100} kobo")\nprint(f"Left over: {left_kobo} kobo")\n',
      challenge: 'Check it adds up: print(each_kobo * people + left_kobo == pot_kobo).',
    },
  ],
  apply: {
    scenario: 'Kemi\'s rule: store kobo.',
    items: [
      {
        kind: 'mcq',
        prompt: 'How many kobo is ₦30,000?',
        options: [
          { text: '3000000' },
          { text: '300000', why: 'That\'s ×10. There are 100 kobo in a naira.' },
          { text: '30000', why: 'That\'s still naira.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Convert the share to kobo and print it',
        starter: 'SHARE_NAIRA = 30000\n',
        solution: 'SHARE_NAIRA = 30000\nprint(SHARE_NAIRA * 100)\n',
        hint: 'Multiply by 100.',
        checks: [{ message: 'Print 3000000', outputEquals: '3000000' }],
      },
      {
        kind: 'writeCode',
        prompt: 'Split 33000000 kobo between 7: print each share in kobo, then the kobo left over',
        starter: 'pot_kobo = 33000000\npeople = 7\n',
        solution: 'pot_kobo = 33000000\npeople = 7\nprint(pot_kobo // people)\nprint(pot_kobo % people)\n',
        hint: '// for each share, % for what\'s left.',
        checks: [{ message: 'Print 4714285 then 5', outputEquals: '4714285\n5' }],
      },
      {
        kind: 'matchPairs',
        prompt: 'each_kobo = 4714285. Match the code to the result.',
        pairs: [
          ['each_kobo // 100', '47142 (naira)'],
          ['each_kobo % 100', '85 (kobo)'],
          ['each_kobo / 100', '47142.85'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Kobo (whole) or naira with decimals?',
        groups: ['Kobo, int', 'Naira, float'],
        items: [
          { text: '3000000', group: 0 },
          { text: '30000.0', group: 1 },
          { text: '4714285', group: 0 },
          { text: '47142.85', group: 1 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Print 47142 naira 85 kobo from each_kobo, using // and % by 100',
        starter: 'each_kobo = 4714285\n',
        solution: 'each_kobo = 4714285\nprint(f"{each_kobo // 100} naira {each_kobo % 100} kobo")\n',
        hint: 'f"{each_kobo // 100} naira {each_kobo % 100} kobo"',
        checks: [{ message: 'Print 47142 naira 85 kobo', outputEquals: '47142 naira 85 kobo' }],
      },
      {
        kind: 'findBug',
        prompt: 'Which line brings floats back into the maths too early?',
        language: 'python',
        lines: ['pot_kobo = 33000000', 'each = pot_kobo / 100 / 7', 'left = pot_kobo % 7'],
        bug: 1,
        fix: 'each = pot_kobo // 7',
        explanation: 'Divide by 100 only for display. Keep the maths in whole kobo.',
      },
      {
        kind: 'fillBlank',
        prompt: 'The kobo rule.',
        template: 'Store money in the [[1]] unit, as [[2]] numbers, and convert only to [[3]] it.',
        blanks: [['smallest'], ['whole'], ['show', 'display', 'print']],
        distractors: ['largest', 'decimal'],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'So what do we do with the 5 kobo left over?',
        prompt: "Kemi's rule, via Arjun?",
        options: [
          { text: 'Round it away.', why: 'Then the books don\'t balance.' },
          { text: 'Same as before: the group decides. The point is the program knows it\'s exactly 5 kobo.' },
          { text: 'Give it to the bank.', why: 'The bank already has its fee.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many kobo are in one naira?',
        answers: ['100'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Kemi\'s rule came from years of accounting, not from a textbook. What rule have you learned from experience that saves you mistakes?',
    starters: ['My rule is...', 'I learned it when...'],
  },
  deepen: {
    title: 'Python\'s decimal module',
    summary: 'Python also has a Decimal type for exact decimals (from decimal import Decimal). Whole kobo is simpler for the ajo, and it\'s what many payment systems do.',
  },
  notes: '100 kobo = 1 naira (Central Bank of Nigeria). Storing currency as integer minor units is standard practice (e.g. Stripe and Paystack APIs take amounts in the smallest currency unit, such as kobo). 33000000 // 7 = 4714285; % 7 = 5 (4714285 * 7 = 32999995). 4714285 // 100 = 47142; % 100 = 85. decimal module: Python docs, decimal — Decimal fixed point and floating point arithmetic.',
};

export default lesson;
