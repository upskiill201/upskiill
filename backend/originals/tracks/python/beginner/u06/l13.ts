import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 6 · Lesson 13 — Lists inside lists: each member paired with what they paid. */
const lesson: OriginalLesson = {
  key: 'l13',
  title: 'Lists inside lists',
  summary: 'Two separate lists, members and payments, have to stay in the same order or everything breaks. Arjun shows Ada another way: keep each name next to its amount, as a small list, inside one big list.',
  minutes: 12,
  outcomes: [
    'Store pairs as lists inside a list',
    'Read one value with two indexes: ledger[1][0]',
    'Change one amount inside a row',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'A list of rows',
      text: 'ledger = [["Ada", 30000], ["Tunde", 15000], ["Bisi", 30000]]. Each item is a row. ledger[1] is ["Tunde", 15000]. ledger[1][0] is "Tunde" and ledger[1][1] is 15000. When Tunde pays the rest, ledger[1][1] = 30000.',
      hotspots: [
        { phrase: 'Each item is a row', note: 'The big list holds three small lists. Like a table: one row per member.' },
        { phrase: 'ledger[1] is ["Tunde", 15000]', note: 'One index gives a whole row: the second member and their amount.' },
        { phrase: 'ledger[1][0] is "Tunde"', note: 'Two indexes: first the row, then the position inside it. 0 is the name.' },
        { phrase: 'ledger[1][1] is 15000', note: 'Position 1 inside the row is the amount.' },
        { phrase: 'ledger[1][1] = 30000', note: 'The inner lists can be changed too. Tunde\'s row now says 30000.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'The ledger',
      caption: 'Names and amounts can\'t drift apart now.',
      code: 'ledger = [["Ada", 30000], ["Tunde", 15000], ["Bisi", 30000]]\n\nprint(ledger[1])\nprint(f"{ledger[1][0]} paid {ledger[1][1]:,}")\n\nledger[1][1] = 30000\nprint(ledger)\n',
      challenge: 'Add Kemi\'s row with ledger.append(["Kemi", 25000]) and print her amount.',
    },
  ],
  apply: {
    scenario: 'The payment ledger.',
    items: [
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'ledger = [["Ada", 30000], ["Tunde", 15000]]\nprint(ledger[1][0])',
        language: 'python',
        options: [
          { text: 'Tunde' },
          { text: '15000', why: '[1][0] is the first thing in the second row: the name.' },
          { text: "['Tunde', 15000]", why: 'That\'s ledger[1]. The second index picks inside the row.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Print Bisi\'s amount from the ledger',
        starter: 'ledger = [["Ada", 30000], ["Tunde", 15000], ["Bisi", 25000]]\n',
        solution: 'ledger = [["Ada", 30000], ["Tunde", 15000], ["Bisi", 25000]]\nprint(ledger[2][1])\n',
        hint: 'Bisi is row 2; the amount is position 1.',
        checks: [
          { message: 'Print 25000', outputEquals: '25000' },
          { message: 'Use two indexes', codeIncludes: '[2][1]' },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'ledger = [["Ada", 30000], ["Tunde", 15000]]. Match the code to the value.',
        pairs: [
          ['ledger[0][0]', 'Ada'],
          ['ledger[0][1]', '30000'],
          ['ledger[1][1]', '15000'],
          ['len(ledger)', '2'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Tunde paid the rest. Change his amount to 30000 and print the ledger',
        starter: 'ledger = [["Ada", 30000], ["Tunde", 15000]]\n',
        solution: 'ledger = [["Ada", 30000], ["Tunde", 15000]]\nledger[1][1] = 30000\nprint(ledger)\n',
        hint: 'ledger[1][1] = 30000',
        checks: [{ message: "Print [['Ada', 30000], ['Tunde', 30000]]", outputEquals: "[['Ada', 30000], ['Tunde', 30000]]" }],
      },
      {
        kind: 'writeCode',
        prompt: 'Add Kemi\'s row ["Kemi", 25000], then print len(ledger)',
        starter: 'ledger = [["Ada", 30000], ["Tunde", 15000]]\n',
        solution: 'ledger = [["Ada", 30000], ["Tunde", 15000]]\nledger.append(["Kemi", 25000])\nprint(len(ledger))\n',
        hint: 'ledger.append(["Kemi", 25000]): one row is one item.',
        checks: [
          { message: 'Print 3', outputEquals: '3' },
          { message: 'Kemi\'s row is last', expr: 'ledger[-1] == ["Kemi", 25000]' },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why might a ledger be safer than two lists, members and payments?',
        options: [
          { text: 'Each name stays next to its own amount, so they can\'t get out of step' },
          { text: 'It\'s faster', why: 'Speed isn\'t the point. Keeping pairs together is.' },
          { text: 'Two lists can\'t hold numbers', why: 'They can. The risk is one list being sorted or changed without the other.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'This should print Ada\'s amount, but prints her name. Which line?',
        language: 'python',
        lines: ['ledger = [["Ada", 30000], ["Tunde", 15000]]', 'amount = ledger[0][0]', 'print(amount)'],
        bug: 1,
        fix: 'amount = ledger[0][1]',
        explanation: 'Inside each row, position 0 is the name and position 1 is the amount.',
      },
      {
        kind: 'fillBlank',
        prompt: 'Tunde\'s name, from the second row.',
        language: 'python',
        template: 'name = ledger[[[1]]][[[2]]]',
        blanks: [['1'], ['0']],
        distractors: ['2', '-0'],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'ledger[1][1] is hard to read. Which 1 is which?',
        prompt: "Arjun's best reply?",
        options: [
          { text: 'Fair. Read it left to right: row 1, then item 1. In Chapter 9 you\'ll get dictionaries, where you write ledger["Tunde"] instead.' },
          { text: 'Just memorise it.', why: 'Reading it left to right is the trick, not memorising.' },
          { text: 'The order doesn\'t matter.', why: 'It does: the first index is always the row.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'ledger = [["Ada", 30000]]. What does print(ledger[0][1]) show?',
        answers: ['30000'],
        placeholder: 'Output',
      },
    ],
  },
  reflect: {
    prompt: 'A spreadsheet is rows and columns. Where do you already read data in rows, and how would it look as a list of lists?',
    starters: ['I read rows in...', 'One row would be...'],
  },
  deepen: {
    title: 'Tuples for pairs',
    summary: '("Ada", 30000) with round brackets is a tuple: like a list, but it can\'t change. Many people use tuples for fixed pairs. You\'ll see them in Chapter 7 with enumerate().',
  },
  notes: 'Nested lists and double indexing (Python tutorial §3.1.3, §5.1). Tuples are immutable sequences (§5.3). Dictionaries arrive in Chapter 9.',
};

export default lesson;
