import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 18 — Checking your answers: estimate, reverse the sum, and let Python check with ==. */
const lesson: OriginalLesson = {
  key: 'l18',
  title: 'Checking your answers',
  summary: 'Before pay day, Ada wants proof the payout is right. Arjun teaches her three checks programmers use: estimate first, work backwards, and make Python say True.',
  minutes: 12,
  outcomes: [
    'Estimate an answer before running',
    'Check a result by working backwards',
    'Make Python check itself with ==',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Check 1: estimate. 11 people, about 30000 each: roughly 330000. If the program says 33000 or 3300000, something\'s wrong before you even look at the code.', replies: ['Check 2?'] },
        { tey: 'Work backwards. If each of 7 people gets 47142 with 6 left over, then 47142 * 7 + 6 must give the pot. Reverse the sum and see if you get back where you started.', replies: ['And check 3?'] },
        { tey: 'Let Python say it: print(each * 7 + left == pot). If it prints True, the pieces add up. == compares and gives True or False.', replies: ['Why bother if it runs?'] },
        { tey: 'Because "it runs" only means there was no error. Last lesson\'s five bugs all ran. A check that prints True is evidence.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Three checks on the payout',
      caption: 'Run it. Every check should print True.',
      code: 'pot_kobo = 33000000\npeople = 7\neach_kobo = pot_kobo // people\nleft_kobo = pot_kobo % people\n\n# 1. Estimate: about 47,000 naira each?\nprint(40000 < each_kobo // 100 < 50000)\n# 2 and 3. Work backwards, let Python check\nprint(each_kobo * people + left_kobo == pot_kobo)\n',
      challenge: 'Break it on purpose: change // to /. What does the check print now?',
    },
  ],
  apply: {
    scenario: 'Proving the payout is right.',
    items: [
      {
        kind: 'mcq',
        prompt: '11 members pay ₦30,000. The program says the pot is ₦33,000. What\'s your first reaction?',
        options: [
          { text: 'Fine, the program ran', why: 'Running isn\'t the same as being right.' },
          { text: 'Wrong: the estimate is about ₦330,000, ten times more' },
          { text: 'The members must have paid less', why: 'Check the code before blaming people.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Check the seven-way split works backwards: print each * 7 + left == pot',
        starter: 'pot = 330000\neach = pot // 7\nleft = pot % 7\n',
        solution: 'pot = 330000\neach = pot // 7\nleft = pot % 7\nprint(each * 7 + left == pot)\n',
        hint: 'print(each * 7 + left == pot)',
        checks: [
          { message: 'Print True', outputEquals: 'True' },
          { message: 'Compare with ==', codeIncludes: '==' },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'print(11 * 30000 == 330000)',
        language: 'python',
        options: [
          { text: '330000', why: '== compares and gives True or False.' },
          { text: 'False', why: '11 * 30000 is 330000.' },
          { text: 'True' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the check to what it catches.',
        pairs: [
          ['Estimate first', 'Answers that are wildly off'],
          ['Work backwards', 'Pieces that don\'t add up'],
          ['print(... == ...)', 'Proof in black and white'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Check the payout: shares + late fees - bank fee == 33295000',
        starter: 'shares_kobo = 33000000\nlate_fees_kobo = 300000\nBANK_FEE_KOBO = 5000\npayout_kobo = shares_kobo + late_fees_kobo - BANK_FEE_KOBO\n',
        solution: 'shares_kobo = 33000000\nlate_fees_kobo = 300000\nBANK_FEE_KOBO = 5000\npayout_kobo = shares_kobo + late_fees_kobo - BANK_FEE_KOBO\nprint(payout_kobo == 33295000)\n',
        hint: 'print(payout_kobo == 33295000)',
        checks: [{ message: 'Print True', outputEquals: 'True' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'True or False?',
        groups: ['True', 'False'],
        items: [
          { text: '47142 * 7 + 6 == 330000', group: 0 },
          { text: '330000 / 7 == 47142', group: 1 },
          { text: '0.1 + 0.2 == 0.3', group: 1 },
          { text: '3000000 // 100 == 30000', group: 0 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which check uses = instead of ==?',
        language: 'python',
        lines: ['print(each * 7 + left == pot)', 'print(payout = 33295000)', 'print(11 * 30000 == 330000)'],
        bug: 1,
        fix: 'print(payout == 33295000)',
        explanation: '= stores; == compares. Inside print() a single = is an error here.',
      },
      {
        kind: 'fillBlank',
        prompt: 'Let Python check the pieces add up.',
        language: 'python',
        template: 'print(each * people + left [[1]] pot)',
        blanks: [['==']],
        distractors: ['=', '+='],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'My program runs with no errors. Isn\'t that enough?',
        prompt: "Arjun's best reply?",
        options: [
          { text: 'No errors means Python understood you. A True check means the answer is right. You want both.' },
          { text: 'Yes, ship it.', why: 'All five puzzle bugs ran with no errors.' },
          { text: 'Run it again to be sure.', why: 'Same code, same wrong answer.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'What does print(10 // 3 * 3 + 10 % 3 == 10) show?',
        answers: ['True'],
        placeholder: 'Output',
      },
    ],
  },
  reflect: {
    prompt: 'Estimating first catches big mistakes. When did a quick estimate save you from a wrong number?',
    starters: ['I estimated...', 'It caught...'],
  },
  deepen: {
    title: 'assert',
    summary: 'In Chapter 10, Ada uses assert to make a failing check stop the program: assert each * 7 + left == pot.',
  },
  notes: 'Comparison == returns bool (Python Language Reference §6.10). Chained comparison 40000 < x < 50000 is valid Python. 47142 * 7 + 6 = 330000; 330000 / 7 != 47142; 10 // 3 * 3 + 10 % 3 = 9 + 1 = 10. print(payout = 33295000) raises TypeError (unexpected keyword argument).',
};

export default lesson;
