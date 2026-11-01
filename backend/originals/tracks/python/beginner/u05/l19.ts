import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 19 — The payment checker: input, validation, rules and a clear answer, together. */
const lesson: OriginalLesson = {
  key: 'l19',
  title: 'The payment checker',
  summary: 'Ada puts the chapter together: one program that asks for the amount and the day, checks the answers, applies every rule and says exactly what the member owes.',
  minutes: 13,
  outcomes: [
    'Combine input, validation and decisions in one program',
    'Give a clear answer for every case',
    'Read a whole decision program top to bottom',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Building the checker',
      steps: [
        {
          title: '1. The rules, as constants',
          body: 'Everything from the whiteboard, named once at the top.',
          code: 'SHARE = 30000\nPAY_DAY = 25\nGRACE_END = 28',
          language: 'python',
        },
        {
          title: '2. Ask and check',
          body: 'Clean the amount, check it\'s digits before converting.',
          code: 'raw = input("Amount paid: ").strip().replace(",", "")\nday = int(input("Day of the month: "))',
          language: 'python',
        },
        {
          title: '3. The fee',
          body: 'The whiteboard chain from lesson 12, with the edge fixed.',
          code: 'if day <= PAY_DAY:\n    fee = 0\nelif day <= GRACE_END:\n    fee = SHARE * 5 // 100\nelse:\n    fee = SHARE * 10 // 100',
          language: 'python',
        },
        {
          title: '4. The answer',
          body: 'What\'s still owed: the share plus the fee, minus what they paid.',
          code: 'owed = SHARE + fee - paid\nif owed <= 0:\n    print("All settled")\nelse:\n    print(f"Still owed: {owed:,}")',
          language: 'python',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'The checker',
      caption: 'Kemi pays 30,000 on the 27th.',
      code: 'SHARE = 30000\nPAY_DAY = 25\nGRACE_END = 28\n\nraw = input("Amount paid: ").strip().replace(",", "")\nday = int(input("Day of the month: "))\n\nif not raw.isdigit():\n    print("Numbers only, please")\nelse:\n    paid = int(raw)\n    if day <= PAY_DAY:\n        fee = 0\n    elif day <= GRACE_END:\n        fee = SHARE * 5 // 100\n    else:\n        fee = SHARE * 10 // 100\n    owed = SHARE + fee - paid\n    if owed <= 0:\n        print("All settled")\n    else:\n        print(f"Still owed: {owed:,}")\n',
      stdin: ['30,000', '27'],
      challenge: 'Try 31,500 on the 27th. And 30000 on the 20th.',
    },
  ],
  apply: {
    scenario: 'The whole payment checker.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Kemi pays 30,000 on the 27th. What does the checker say?',
        options: [
          { text: 'All settled', why: 'The 27th adds a 1,500 fee.' },
          { text: 'Still owed: 3,000', why: 'That\'s the after-the-28th fee.' },
          { text: 'Still owed: 1,500' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Work out what\'s owed: SHARE + fee - paid. Print Still owed: 1,500',
        starter: 'SHARE = 30000\nfee = 1500\npaid = 30000\n',
        solution: 'SHARE = 30000\nfee = 1500\npaid = 30000\nowed = SHARE + fee - paid\nif owed <= 0:\n    print("All settled")\nelse:\n    print(f"Still owed: {owed:,}")\n',
        hint: 'owed = SHARE + fee - paid, then if/else.',
        checks: [{ message: 'Print Still owed: 1,500', outputEquals: 'Still owed: 1,500' }],
      },
      {
        kind: 'orderLines',
        prompt: 'Order the checker\'s steps.',
        lines: ['Name the rules as constants', 'Ask for the amount and the day', 'Check the amount is digits', 'Work out the fee', 'Work out what\'s owed', 'Print a clear answer'],
      },
      {
        kind: 'writeCode',
        prompt: 'Run the full checker for 30000 paid on the 20th. It should say All settled',
        starter: 'SHARE = 30000\nPAY_DAY = 25\nGRACE_END = 28\npaid = int(input("Amount paid: "))\nday = int(input("Day: "))\n',
        solution: 'SHARE = 30000\nPAY_DAY = 25\nGRACE_END = 28\npaid = int(input("Amount paid: "))\nday = int(input("Day: "))\nif day <= PAY_DAY:\n    fee = 0\nelif day <= GRACE_END:\n    fee = SHARE * 5 // 100\nelse:\n    fee = SHARE * 10 // 100\nowed = SHARE + fee - paid\nif owed <= 0:\n    print("All settled")\nelse:\n    print(f"Still owed: {owed:,}")\n',
        hint: 'The fee chain, then the owed check.',
        stdin: ['30000', '20'],
        checks: [{ message: 'Print All settled', outputIncludes: 'All settled' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'What does the checker say?',
        groups: ['All settled', 'Still owed'],
        items: [
          { text: '30,000 on the 20th', group: 0 },
          { text: '30,000 on the 27th', group: 1 },
          { text: '31,500 on the 27th', group: 0 },
          { text: '30,000 on the 29th', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line gives the wrong amount owed?',
        language: 'python',
        lines: ['fee = 1500', 'paid = 30000', 'owed = SHARE - fee - paid'],
        bug: 2,
        fix: 'owed = SHARE + fee - paid',
        explanation: 'The fee is added to what they owe, not taken away.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the part of the checker to its job.',
        pairs: [
          ['raw.isdigit()', 'Refuses words and blanks'],
          ['if day <= PAY_DAY', 'Starts the fee rules'],
          ['SHARE + fee - paid', 'What\'s still owed'],
          ['f"{owed:,}"', 'A readable amount'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The final answer.',
        language: 'python',
        template: 'if owed [[1]] 0:\n    print("All settled")\n[[2]]:\n    print(f"Still owed: {owed:,}")',
        blanks: [['<='], ['else']],
        distractors: ['>=', 'elif'],
      },
      {
        kind: 'chatReply',
        from: 'arjun',
        message: 'Why owed <= 0 and not owed == 0?',
        prompt: "Ada's best answer?",
        options: [
          { text: 'No reason.', why: 'Overpayment is a real case.' },
          { text: '== doesn\'t work with numbers.', why: 'It does; it just misses overpayments.' },
          { text: 'Someone might overpay, so owed goes negative. They\'re still settled.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'SHARE = 30000, fee = 3000, paid = 30000. What is owed?',
        answers: ['3000', '3,000'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'The checker answers one person at a time. What would you want it to do next for the whole group?',
    starters: ['I\'d want it to...', 'For everyone at once...'],
  },
  deepen: {
    title: 'Next: lists',
    summary: 'The checker handles one member. Chapter 6 gives the tracker a list of all eleven, and Chapter 7 checks them all with a loop.',
  },
  notes: 'Combines Chapter 4 cleaning, isdigit validation and the Chapter 5 fee chain. 30000 + 1500 - 30000 = 1500; 30000 + 3000 - 30000 = 3000; 31500 on the 27th → owed 0.',
};

export default lesson;
