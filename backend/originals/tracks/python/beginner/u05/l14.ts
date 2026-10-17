import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 14 — Truthy and falsy: if name:, if amount:, and what counts as False. */
const lesson: OriginalLesson = {
  key: 'l14',
  title: 'Truthy and falsy',
  summary: 'Arjun\'s code says if name: with no comparison at all. Ada thinks it\'s a bug. It\'s a Python habit: every value counts as true or false, and empty things count as false.',
  minutes: 11,
  outcomes: [
    'Know which values count as False in an if',
    'Read if name: and if amount: in other people\'s code',
    'Know when to write the comparison out in full',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Spelled out vs the Python habit',
      before: {
        label: 'Spelled out',
        text: 'if name != "":\n    print("Thanks")\nif amount != 0:\n    print("Recorded")',
      },
      after: {
        label: 'Truthy',
        text: 'if name:\n    print("Thanks")\nif amount:\n    print("Recorded")\n\nSame meaning, shorter.',
      },
      notes: [
        'In an if, every value counts as true or false. These count as False: False, 0, 0.0, "" (empty text) and None. Almost everything else counts as True.',
        'So if name: means "if name isn\'t empty", and if amount: means "if amount isn\'t 0".',
        'Careful with money: if amount: treats a real payment of 0 the same as "nothing typed". When 0 means something, spell it out: if amount > 0:.',
      ],
    },
    {
      kind: 'tryIt',
      title: 'True or false enough?',
      caption: 'bool() shows how an if would see each value.',
      code: 'print(bool("Tunde"))\nprint(bool(""))\nprint(bool(30000))\nprint(bool(0))\n\nname = input("Your name: ").strip()\nif name:\n    print(f"Thanks, {name}")\nelse:\n    print("You didn\'t type a name")\n',
      stdin: [''],
      challenge: 'Change the typed answer to Bisi. Which branch runs now?',
    },
  ],
  apply: {
    scenario: 'Reading Arjun\'s shortcuts.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'In an if, does it count as True or False?',
        groups: ['Truthy', 'Falsy'],
        items: [
          { text: '"Tunde"', group: 0 },
          { text: '""', group: 1 },
          { text: '30000', group: 0 },
          { text: '0', group: 1 },
          { text: '" " (one space)', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'name = ""\nif name:\n    print("Hi")\nelse:\n    print("No name")',
        language: 'python',
        options: [
          { text: 'Hi', why: 'The empty string counts as False.' },
          { text: 'No name' },
          { text: 'An error', why: 'if works with any value.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Ask "Your name: ", strip it, and if it\'s empty print Please type your name, otherwise print Thanks',
        starter: '',
        solution: 'name = input("Your name: ").strip()\nif name:\n    print("Thanks")\nelse:\n    print("Please type your name")\n',
        hint: 'if name: ... else: ...',
        stdin: ['   '],
        checks: [{ message: 'Print Please type your name', outputIncludes: 'Please type your name' }],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'print(bool(" "))',
        language: 'python',
        options: [
          { text: 'True' },
          { text: 'False', why: 'A space is a character, so the string isn\'t empty.' },
          { text: 'An error', why: 'bool() works on any value.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which check wrongly treats a member who typed only spaces as having typed a name?',
        language: 'python',
        lines: ['name = input("Your name: ")', 'if name:', '    print("Thanks")'],
        bug: 0,
        fix: 'name = input("Your name: ").strip()',
        explanation: '"   " counts as True. Strip it first, then "" counts as False.',
      },
      {
        kind: 'writeCode',
        prompt: 'If paid is truthy, print Recorded; otherwise print Nothing paid (paid is 0)',
        starter: 'paid = 0\n',
        solution: 'paid = 0\nif paid:\n    print("Recorded")\nelse:\n    print("Nothing paid")\n',
        hint: 'if paid:',
        checks: [{ message: 'Print Nothing paid', outputEquals: 'Nothing paid' }],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the short form to its spelled-out meaning.',
        pairs: [
          ['if name:', 'if name != "":'],
          ['if amount:', 'if amount != 0:'],
          ['if not name:', 'if name == "":'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Run the block only when nothing was typed.',
        language: 'python',
        template: 'if [[1]] name:\n    print("Please type your name")',
        blanks: [['not']],
        distractors: ['no', '!'],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'Should I always use if amount: instead of if amount > 0:?',
        prompt: "Arjun's best reply?",
        options: [
          { text: 'Yes, always shorter is better.', why: 'Clearer beats shorter, especially with money.' },
          { text: 'They\'re identical.', why: 'if amount: is True for -5; if amount > 0: is not.' },
          { text: 'No. If 0 or a negative number means something different, spell it out. Shortcuts are for "empty or not".' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'What does print(bool(0)) show?',
        answers: ['False'],
        placeholder: 'Output',
      },
    ],
  },
  reflect: {
    prompt: 'Shortcuts save typing but can hide meaning. Where do you use a shortcut that confuses other people?',
    starters: ['I write...', 'People think it means...'],
  },
  deepen: {
    title: 'None',
    summary: 'None is Python\'s "no value at all". It\'s falsy too. You\'ll meet it with functions in Chapter 8.',
  },
  notes: 'Truth value testing: None, False, numeric zero, empty sequences are false; most other objects are true (Python docs, Built-in Types: Truth Value Testing). bool(" ") is True.',
};

export default lesson;
