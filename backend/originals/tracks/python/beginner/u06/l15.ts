import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 6 · Lesson 15 — Checkpoint 3. Reviews lessons 11–14: slicing, sum/min/max, nested lists, copying. */
const lesson: OriginalLesson = {
  key: 'l15',
  title: 'Checkpoint: the month summary',
  summary: 'The next three to collect, the month in numbers, a ledger of names and amounts, and a backup that really is a backup. Quick check before the payout rota.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Slice and summarise lists without notes', 'Tell sharing from copying'],
  learn: [
    {
      kind: 'story',
      title: 'Friday\'s message',
      beats: [
        { speaker: 'narrator', text: 'Ada\'s Friday message to the group is four lines, all from the tracker: next three to collect, collected so far, short by, and who still owes.' },
        { speaker: 'narrator', text: 'Kemi replies: "This is the first time I\'ve understood the ajo without asking."' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 3: slices, sums and copies.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print the next three members to collect: the first three in the list',
        starter: 'members = ["Bisi", "Kemi", "Ngozi", "Yusuf", "Ifeoma"]\n',
        solution: 'members = ["Bisi", "Kemi", "Ngozi", "Yusuf", "Ifeoma"]\nprint(members[:3])\n',
        hint: 'members[:3]',
        checks: [{ message: "Print ['Bisi', 'Kemi', 'Ngozi']", outputEquals: "['Bisi', 'Kemi', 'Ngozi']" }],
      },
      {
        kind: 'writeCode',
        prompt: 'Print "Collected: 85,000" using sum() and a comma format',
        starter: 'payments = [30000, 30000, 25000]\n',
        solution: 'payments = [30000, 30000, 25000]\nprint(f"Collected: {sum(payments):,}")\n',
        hint: 'f"Collected: {sum(payments):,}"',
        checks: [
          { message: 'Print Collected: 85,000', outputEquals: 'Collected: 85,000' },
          { message: 'Use sum()', codeIncludes: 'sum(' },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'members = ["Ada", "Tunde", "Bisi", "Kemi"]\nprint(members[1:])',
        language: 'python',
        options: [
          { text: "['Tunde', 'Bisi', 'Kemi']" },
          { text: "['Ada']", why: 'That\'s members[:1].' },
          { text: 'Tunde', why: 'A slice is always a list.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'payments = [30000, 15000, 25000]. Match the code to the value.',
        pairs: [
          ['min(payments)', '15000'],
          ['payments[-2:]', '[15000, 25000]'],
          ['sum(payments[:2])', '45000'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Print Tunde\'s amount from the ledger',
        starter: 'ledger = [["Ada", 30000], ["Tunde", 15000], ["Bisi", 30000]]\n',
        solution: 'ledger = [["Ada", 30000], ["Tunde", 15000], ["Bisi", 30000]]\nprint(ledger[1][1])\n',
        hint: 'Row 1, item 1.',
        checks: [{ message: 'Print 15000', outputEquals: '15000' }],
      },
      {
        kind: 'findBug',
        prompt: 'backup changed too. Which line?',
        language: 'python',
        lines: ['members = ["Ada", "Tunde"]', 'backup = members', 'members.append("Ola")', 'print(backup)'],
        bug: 1,
        fix: 'backup = members.copy()',
        explanation: 'backup = members shares the list. .copy() makes a separate one.',
      },
      {
        kind: 'sortGroups',
        prompt: 'Makes a new list, or changes the old one?',
        groups: ['New list', 'Changes the old one'],
        items: [
          { text: 'members[:3]', group: 0 },
          { text: 'members.copy()', group: 0 },
          { text: 'members.sort()', group: 1 },
          { text: 'members.pop()', group: 1 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'How much the pot is short.',
        language: 'python',
        template: 'short = len(payments) * SHARE - [[1]](payments)',
        blanks: [['sum']],
        distractors: ['max', 'len'],
      },
      {
        kind: 'writeCode',
        prompt: 'Print how much the pot is short',
        starter: 'SHARE = 30000\npayments = [30000, 15000, 30000]\n',
        solution: 'SHARE = 30000\npayments = [30000, 15000, 30000]\nprint(len(payments) * SHARE - sum(payments))\n',
        hint: 'What should have come in, minus what did.',
        checks: [{ message: 'Print 15000', outputEquals: '15000' }],
      },
      {
        kind: 'chatReply',
        from: 'arjun',
        message: 'Kemi understood the ajo without asking. What made the difference?',
        prompt: "Ada's best reply?",
        options: [
          { text: 'Four numbers, all from one list, in plain words. Nobody had to add anything up.' },
          { text: 'The code is long.', why: 'It\'s short. Clarity, not length.' },
          { text: 'Kemi got lucky.', why: 'She got a clear message.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Order the lines: keep a backup, then remove Yusuf.',
        language: 'python',
        lines: ['members = ["Ada", "Yusuf", "Bisi"]', 'backup = members.copy()', 'members.remove("Yusuf")', 'print(backup)'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'members has 12 items. How many are in members[:6]?',
        answers: ['6', 'six'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Kemi understood because the message was short and plain. What\'s one message you send often that could be made that clear?',
    starters: ['I often send...', 'It could say...'],
  },
  notes: 'Checkpoint for Chapter 6 lessons 11-14. 30000+30000+25000 = 85000. 30000+15000 = 45000. 3 x 30000 - 75000 = 15000.',
};

export default lesson;
