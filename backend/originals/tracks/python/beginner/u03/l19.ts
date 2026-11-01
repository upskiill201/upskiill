import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 19 — Reading maths in code: translate formulas into words before trusting them. */
const lesson: OriginalLesson = {
  key: 'l19',
  title: 'Reading maths in code',
  summary: 'The startup\'s app has a fee formula Arjun wrote two years ago. Ada\'s manager asks her to explain it in a meeting. She translates it line by line, into plain English.',
  minutes: 12,
  outcomes: [
    'Read a formula in code out loud, in words',
    'Work out its value by hand',
    'Spot when the words and the maths don\'t match',
  ],
  learn: [
    {
      kind: 'text',
      html: '<p>Arjun\'s formula: <code>fee_kobo = max(1000, amount_kobo * 15 // 1000)</code>. Read it out loud, piece by piece:</p><ul><li><code>amount_kobo * 15 // 1000</code>: "15 out of every 1000", so 1.5% of the amount, in whole kobo.</li><li><code>max(1000, ...)</code>: "whichever is bigger", so the fee is never less than 1000 kobo (₦10).</li></ul><p>In words: <strong>"the fee is 1.5% of the amount, but at least ₦10."</strong></p>',
    },
    {
      kind: 'text',
      html: '<p>Then <strong>try a number</strong>. For a ₦30,000 payment: 3,000,000 kobo × 15 // 1000 = 45,000 kobo, or ₦450. That\'s bigger than ₦10, so the fee is ₦450. For a ₦500 payment, 1.5% is ₦7.50, so the minimum, ₦10, wins. Reading the formula and testing it with real numbers are how you check that the code says what everyone thinks it says.</p>',
    },
    {
      kind: 'tryIt',
      title: "Arjun's fee formula",
      caption: 'Try amount_naira = 30000, then 500.',
      code: 'amount_naira = 30000\namount_kobo = amount_naira * 100\n\nfee_kobo = max(1000, amount_kobo * 15 // 1000)\n\nprint(f"Fee: ₦{fee_kobo / 100:,.2f}")\n',
      challenge: 'At what amount does the 1.5% fee become bigger than the ₦10 minimum?',
    },
  ],
  apply: {
    scenario: 'Explaining the fee formula.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What does amount_kobo * 15 // 1000 mean in words?',
        options: [
          { text: '15% of the amount', why: '15 out of 1000 is 1.5%, not 15%.' },
          { text: '1.5% of the amount, in whole kobo' },
          { text: 'The amount plus 15', why: 'It\'s multiplied by 15, then divided by 1000.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'print(max(1000, 750))',
        language: 'python',
        options: [
          { text: '1000' },
          { text: '750', why: 'max() picks the bigger one.' },
          { text: '1750', why: 'max() doesn\'t add.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Print the fee in kobo for a ₦30,000 payment, using the formula',
        starter: 'amount_kobo = 3000000\n',
        solution: 'amount_kobo = 3000000\nfee_kobo = max(1000, amount_kobo * 15 // 1000)\nprint(fee_kobo)\n',
        hint: 'fee_kobo = max(1000, amount_kobo * 15 // 1000)',
        checks: [
          { message: 'Print 45000', outputEquals: '45000' },
          { message: 'Use max()', codeIncludes: 'max(' },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the code to its meaning in words.',
        pairs: [
          ['x * 15 // 1000', '1.5% of x'],
          ['max(1000, fee)', 'At least 1000'],
          ['min(fee, 50000)', 'At most 50000'],
          ['x // 100', 'Kobo to whole naira'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Print the fee in kobo for a ₦500 payment: the minimum should win',
        starter: 'amount_kobo = 50000\n',
        solution: 'amount_kobo = 50000\nfee_kobo = max(1000, amount_kobo * 15 // 1000)\nprint(fee_kobo)\n',
        hint: 'Same formula. 1.5% of 50000 kobo is 750, less than 1000.',
        checks: [{ message: 'Print 1000', outputEquals: '1000' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'For which payments does the ₦10 minimum apply?',
        groups: ['Minimum applies', '1.5% applies'],
        items: [
          { text: '₦500', group: 0 },
          { text: '₦30,000', group: 1 },
          { text: '₦100', group: 0 },
          { text: '₦5,000', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'The rule is "1.5%, but at least ₦10". Which line doesn\'t match the words?',
        language: 'python',
        lines: ['fee = max(1000, amount_kobo * 15 // 1000)', 'fee = min(1000, amount_kobo * 15 // 1000)'],
        bug: 1,
        fix: 'fee = max(1000, amount_kobo * 15 // 1000)',
        explanation: 'min() would make ₦10 the most anyone pays, the opposite of the rule.',
      },
      {
        kind: 'fillBlank',
        prompt: 'Never less than 1000 kobo.',
        language: 'python',
        template: 'fee_kobo = [[1]](1000, amount_kobo * 15 // 1000)',
        blanks: [['max']],
        distractors: ['min', 'round'],
      },
      {
        kind: 'chatReply',
        from: 'arjun',
        message: 'How would you explain my fee formula to someone who doesn\'t code?',
        prompt: "Ada's best answer?",
        options: [
          { text: '"max of 1000 and amount times 15 floor 1000."', why: 'That\'s reading the code, not explaining it.' },
          { text: '"It\'s complicated."', why: 'It isn\'t, once it\'s in words.' },
          { text: '"1.5% of the payment, but never less than ₦10." Then show it with ₦30,000 and ₦500.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'What does print(min(3, 8)) show?',
        answers: ['3'],
        placeholder: 'Output',
      },
    ],
  },
  reflect: {
    prompt: 'Turning a formula into words is how you check it does what people think. What rule at work or school would you like to see written as a formula?',
    starters: ['I\'d like to see...', 'In words, it is...'],
  },
  deepen: {
    title: 'Comments that explain why',
    summary: 'A good comment above a formula says the rule in words: # 1.5% fee, minimum ₦10 (bank rule, 2024). Then the next reader doesn\'t have to translate.',
  },
  notes: 'max() and min() built-ins (Python docs, Built-in Functions). 3000000 * 15 // 1000 = 45000 kobo = ₦450; 50000 * 15 // 1000 = 750 < 1000. Crossover: 1.5% of X kobo = 1000 → X = 66,667 kobo ≈ ₦666.67. The fee formula is a fictional example from Arjun\'s client work.',
};

export default lesson;
