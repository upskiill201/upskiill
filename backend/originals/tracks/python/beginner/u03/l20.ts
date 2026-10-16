import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 20 — Chapter Challenge. Climax: the payout calculator matches the notebook to the last kobo. */
const lesson: OriginalLesson = {
  key: 'l20',
  title: 'Chapter Challenge: Ajo Tracker v0.2',
  summary: 'Pay day. Kemi reads the notebook, Ada reads the tracker, and they match to the last kobo. Build the v0.2 payout screen: everything from Chapter 3, harder.',
  minutes: 15,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Build a money calculator that is exact to the kobo', 'Use everything from Chapter 3 together'],
  learn: [
    {
      kind: 'story',
      title: 'Pay day, the 25th',
      beats: [
        { speaker: 'narrator', text: 'Eleven colleagues around a desk. Kemi holds the old notebook; Ada holds her phone.' },
        { speaker: 'narrator', text: 'Kemi reads: "Shares, 330,000. Late fees, 3,000. Bank fee, 50." Ada presses Run. ₦332,950. Kemi turns the notebook round to show the same number.' },
        { speaker: 'narrator', text: 'Tunde, who started all this by insisting he\'d paid in March, applauds.' },
        { speaker: 'arjun', text: '(on the call) Version 0.2. It does the money properly now.' },
        { speaker: 'tey', text: 'Your turn: build v0.2, then prove it\'s right.' },
      ],
    },
  ],
  apply: {
    scenario: 'Chapter Challenge: Ajo Tracker v0.2.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Build the v0.2 payout screen',
        starter:
          'MEMBERS = 11\nSHARE_KOBO = 3000000\nLATE_FEE_PERCENT = 5\nlate_payers = 2\nBANK_FEE_KOBO = 5000\n# Work out, all in kobo:\n#   shares_kobo, late_fees_kobo, payout_kobo\n# Then print, in this order:\n#   OFFICE AJO v0.2\n#   Shares: ₦330,000\n#   Late fees: ₦3,000\n#   Payout: ₦332,950\n',
        solution:
          'MEMBERS = 11\nSHARE_KOBO = 3000000\nLATE_FEE_PERCENT = 5\nlate_payers = 2\nBANK_FEE_KOBO = 5000\nshares_kobo = MEMBERS * SHARE_KOBO\nlate_fees_kobo = late_payers * SHARE_KOBO * LATE_FEE_PERCENT // 100\npayout_kobo = shares_kobo + late_fees_kobo - BANK_FEE_KOBO\nprint("OFFICE AJO v0.2")\nprint(f"Shares: ₦{shares_kobo // 100:,}")\nprint(f"Late fees: ₦{late_fees_kobo // 100:,}")\nprint(f"Payout: ₦{payout_kobo // 100:,}")\n',
        hint: 'Three steps in kobo, then four prints. Format with // 100 and :,',
        checks: [
          { message: 'Print the screen exactly, in order', outputEquals: 'OFFICE AJO v0.2\nShares: ₦330,000\nLate fees: ₦3,000\nPayout: ₦332,950' },
          { message: 'Keep the payout in kobo', expr: 'payout_kobo == 33295000' },
          { message: 'Use the LATE_FEE_PERCENT constant', codeIncludes: 'LATE_FEE_PERCENT' },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'print(33295000 // 100 % 1000)',
        language: 'python',
        options: [
          { text: '332950', why: '% 1000 keeps only the last three digits.' },
          { text: '0', why: '332950 % 1000 is 950.' },
          { text: '950' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Split the payout between 7 people in kobo, and prove it adds back up',
        starter: 'payout_kobo = 33295000\npeople = 7\n',
        solution: 'payout_kobo = 33295000\npeople = 7\neach_kobo = payout_kobo // people\nleft_kobo = payout_kobo % people\nprint(each_kobo, left_kobo)\nprint(each_kobo * people + left_kobo == payout_kobo)\n',
        hint: '// and %, then the golden check with ==.',
        checks: [{ message: 'Print 4756428 4, then True', outputEquals: '4756428 4\nTrue' }],
      },
      {
        kind: 'writeCode',
        prompt: 'Fix every bug in this draft',
        starter: 'share = "30000"\nmembers = 11\npot = members * share\npot =+ 3000\nprint(f"Pot: {pot}")\n',
        solution: 'share = 30000\nmembers = 11\npot = members * share\npot += 3000\nprint(f"Pot: {pot:,}")\n',
        hint: 'A number in quotes, a backwards +=, and the pot should show commas.',
        checks: [{ message: 'Print Pot: 333,000', outputEquals: 'Pot: 333,000' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'Which operator does the job?',
        groups: ['//', '%', '**'],
        items: [
          { text: 'Whole naira each', group: 0 },
          { text: 'What\'s left over', group: 1 },
          { text: 'How fast a chain grows', group: 2 },
          { text: 'Kobo to whole naira', group: 0 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each idea to its lesson.',
        pairs: [
          ['0.1 + 0.2 isn\'t 0.3', 'Floats are approximate'],
          ['Store kobo', 'Exact money'],
          ['round(2.5) is 2', 'Banker\'s rounding'],
          ['f"{x:,}"', 'Readable money'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'print(f"{3000000 * 5 // 100 // 100:,}")',
        language: 'python',
        options: [
          { text: '150,000', why: 'That\'s still kobo. The second // 100 turns it into naira.' },
          { text: '1,500' },
          { text: '15', why: 'Divide by 100 twice: 15000000 → 150000 → 1500.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Which line breaks Kemi\'s kobo rule?',
        language: 'python',
        lines: ['shares_kobo = 33000000', 'late_fees = 2 * 30000 * 0.05', 'payout_kobo = shares_kobo - 5000'],
        bug: 1,
        fix: 'late_fees_kobo = 2 * 3000000 * 5 // 100',
        explanation: 'A float in naira, in the middle of kobo maths. Keep every step in whole kobo.',
      },
      {
        kind: 'orderLines',
        prompt: "Order Ada's chapter.",
        lines: ['Kemi pays in halves: floats', 'Seven ways: // and %', '0.1 + 0.2: floats are approximate', 'Kemi\'s rule: store kobo', 'Late fees and commas', 'v0.2 matches the notebook'],
      },
      {
        kind: 'fillBlank',
        prompt: 'The golden check.',
        language: 'python',
        template: 'print(each * people [[1]] left [[2]] total)',
        blanks: [['+'], ['==']],
        distractors: ['-', '='],
      },
      {
        kind: 'chatReply',
        from: 'arjun',
        message: 'v0.2 matches the notebook. What\'s the single biggest lesson of Chapter 3?',
        prompt: "Ada's best answer?",
        options: [
          { text: 'Money is whole kobo: do all the maths in ints, check it adds up, and format only at the end.' },
          { text: 'Always use round().', why: 'Rounding is for showing. Kobo makes it exact.' },
          { text: 'Floats are evil.', why: 'They\'re fine for measurements. Just not for exact money.' },
        ],
        answer: 0,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the line that shows the payout in naira with commas.',
        language: 'python',
        tiles: ['print(', 'f"Payout: ₦{payout_kobo // 100:,}"', ')'],
        distractors: ['f"Payout: ₦{payout_kobo:,}"', 'f"Payout: ₦{payout_kobo / 100}"'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many kobo is the ₦50 bank fee?',
        answers: ['5000', '5,000'],
        placeholder: 'Kobo',
      },
    ],
  },
  reflect: {
    prompt: 'Chapter 3 done. The tracker is exact to the kobo. Which money calculation in your own life would you trust more if it showed its working?',
    starters: ['I\'d trust more...', 'If it showed...'],
  },
  deepen: {
    title: 'Next: Chapter 4',
    summary: 'Members\' names come in typed ten different ways: "TUNDE ", "tunde", "Tunde". Chapter 4: working with words.',
  },
  notes: 'Chapter Challenge for Chapter 3. 33295000 // 7 = 4756428, % 7 = 4 (4756428 * 7 = 33294996); 33295000 // 100 % 1000 = 950; 11 * 30000 + 3000 = 333000; 3000000 * 5 // 100 // 100 = 1500.',
};

export default lesson;
