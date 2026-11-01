import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 16 — The payout calculator: shares + late fees - bank fee, all in kobo, formatted. */
const lesson: OriginalLesson = {
  key: 'l16',
  title: 'The payout calculator',
  summary: 'Pay day is next week, and for the first time Ada will read out the payout from the tracker, not the notebook. Shares, late fees and the bank\'s cut, in one program.',
  minutes: 13,
  outcomes: [
    'Combine several money rules in one program',
    'Keep every step in kobo, format at the end',
    'Name each step so anyone can check it',
  ],
  learn: [
    {
      kind: 'story',
      title: 'A week before pay day',
      beats: [
        { speaker: 'narrator', text: 'Ada writes the rules on a sticky note: 11 shares of ₦30,000. Two late fees of 5%. The bank takes ₦50 to send the pot.' },
        { speaker: 'ada', text: 'Every one of those is a variable. Every step gets a name. Kemi has to be able to check it line by line.' },
        { speaker: 'arjun', text: '(on the call) And all in kobo until the last line.' },
      ],
      choice: {
        prompt: 'How should Ada write the calculator?',
        options: [
          {
            text: 'Inputs as constants at the top, one named step per line, format only in the final print.',
            outcome: 'Kemi reads it top to bottom and checks every line against her own sums.',
            best: true,
          },
          {
            text: 'One long line that does everything.',
            outcome: 'It might be right, but nobody can check it, and Tunde will ask.',
          },
          {
            text: 'Work it out on a calculator and type the answer in.',
            outcome: 'Back to the notebook problem: no working shown.',
          },
        ],
      },
    },
    {
      kind: 'tryIt',
      title: 'The payout, step by step',
      caption: 'Read each line out loud. Then run it.',
      code: 'MEMBERS = 11\nSHARE_KOBO = 3000000\nLATE_FEE_PERCENT = 5\nlate_payers = 2\nBANK_FEE_KOBO = 5000\n\nshares_kobo = MEMBERS * SHARE_KOBO\nlate_fees_kobo = late_payers * SHARE_KOBO * LATE_FEE_PERCENT // 100\npayout_kobo = shares_kobo + late_fees_kobo - BANK_FEE_KOBO\n\nprint(f"Shares:    ₦{shares_kobo // 100:,}")\nprint(f"Late fees: ₦{late_fees_kobo // 100:,}")\nprint(f"Payout:    ₦{payout_kobo // 100:,}")\n',
      challenge: 'Nobody is late next month. Change late_payers to 0. What\'s the payout?',
    },
  ],
  apply: {
    scenario: 'Building the payout calculator.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Work out shares_kobo: MEMBERS times SHARE_KOBO. Print it',
        starter: 'MEMBERS = 11\nSHARE_KOBO = 3000000\n',
        solution: 'MEMBERS = 11\nSHARE_KOBO = 3000000\nshares_kobo = MEMBERS * SHARE_KOBO\nprint(shares_kobo)\n',
        hint: 'shares_kobo = MEMBERS * SHARE_KOBO',
        checks: [
          { message: 'Print 33000000', outputEquals: '33000000' },
          { message: 'Store it in shares_kobo', expr: 'shares_kobo == 33000000' },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'late_payers = 2, SHARE_KOBO = 3000000, 5% fee. What is late_fees_kobo?',
        code: 'print(2 * 3000000 * 5 // 100)',
        language: 'python',
        options: [
          { text: '150000', why: 'That\'s one late fee. There are two.' },
          { text: '300000' },
          { text: '3000', why: 'That\'s in naira, for both.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Order the calculator.',
        language: 'python',
        lines: [
          'SHARE_KOBO = 3000000',
          'shares_kobo = 11 * SHARE_KOBO',
          'late_fees_kobo = 2 * SHARE_KOBO * 5 // 100',
          'payout_kobo = shares_kobo + late_fees_kobo - 5000',
          'print(f"₦{payout_kobo // 100:,}")',
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Work out payout_kobo and print it in naira with commas',
        starter: 'shares_kobo = 33000000\nlate_fees_kobo = 300000\nBANK_FEE_KOBO = 5000\n',
        solution: 'shares_kobo = 33000000\nlate_fees_kobo = 300000\nBANK_FEE_KOBO = 5000\npayout_kobo = shares_kobo + late_fees_kobo - BANK_FEE_KOBO\nprint(f"₦{payout_kobo // 100:,}")\n',
        hint: 'Shares plus fees minus the bank fee, then f"₦{payout_kobo // 100:,}".',
        checks: [
          { message: 'Print ₦332,950', outputEquals: '₦332,950' },
          { message: 'Store payout_kobo', expr: 'payout_kobo == 33295000' },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Input (a rule or fact) or step (worked out)?',
        groups: ['Input', 'Step'],
        items: [
          { text: 'LATE_FEE_PERCENT = 5', group: 0 },
          { text: 'late_fees_kobo = ...', group: 1 },
          { text: 'BANK_FEE_KOBO = 5000', group: 0 },
          { text: 'payout_kobo = ...', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line adds the bank fee instead of taking it away?',
        language: 'python',
        lines: ['shares_kobo = 33000000', 'late_fees_kobo = 300000', 'payout_kobo = shares_kobo + late_fees_kobo + 5000'],
        bug: 2,
        fix: 'payout_kobo = shares_kobo + late_fees_kobo - 5000',
        explanation: 'The bank takes its fee: subtract it.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the step to its value in naira.',
        pairs: [
          ['Shares', '330,000'],
          ['Late fees', '3,000'],
          ['Bank fee', '50'],
          ['Payout', '332,950'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the payout line.',
        language: 'python',
        template: 'payout_kobo = shares_kobo [[1]] late_fees_kobo [[2]] BANK_FEE_KOBO',
        blanks: [['+'], ['-']],
        distractors: ['*', '//'],
      },
      {
        kind: 'chatReply',
        from: 'arjun',
        message: 'Kemi wants to check your calculator. What makes that easy?',
        prompt: "Ada's best answer?",
        options: [
          { text: 'Every rule is a named constant and every step is its own line, so she can check each one.' },
          { text: 'It\'s short.', why: 'Short helps, but named steps are what make it checkable.' },
          { text: 'She can just trust it.', why: 'The point is that she doesn\'t have to.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'With no late payers, what is the payout in naira? (330000 - 50)',
        answers: ['329950', '329,950', '₦329,950'],
        placeholder: 'Naira',
      },
    ],
  },
  reflect: {
    prompt: 'Ada\'s calculator turns a sticky note of rules into code. What rules from your life could you write as a calculator?',
    starters: ['My rules are...', 'A calculator would...'],
  },
  deepen: {
    title: 'Functions are coming',
    summary: 'In Chapter 8 the payout calculator becomes a function: payout(members, late_payers), reusable every month.',
  },
  notes: '11 x 3000000 = 33000000 kobo; 2 x 3000000 x 5 // 100 = 300000; 33000000 + 300000 - 5000 = 33295000 kobo = ₦332,950. With no late payers: 32995000 kobo = ₦329,950.',
};

export default lesson;
