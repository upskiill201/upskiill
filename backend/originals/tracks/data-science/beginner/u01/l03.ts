import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 3. Story: Emeka names the six drivers. Text, lists, len() and indexes. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Six drivers',
  summary: '5 weeks to Kamau. Emeka joins by video from Lagos and lists the six drivers on the March routes. "It\'s one of them," he says. "I know which." Zanele writes them down, in Python this time.',
  minutes: 11,
  outcomes: [
    'Store text in a variable',
    'Keep many values in a list',
    'Count a list with len() and pick items by position',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'From names to a list',
      steps: [
        {
          title: 'Text is a string',
          body: 'Text in quotes is called a string. Store it like a number.',
          code: 'depot = "Nairobi"\nprint(depot)',
          language: 'python',
        },
        {
          title: 'A list holds many values',
          body: 'Square brackets, commas between items. One name for the whole group.',
          code: 'drivers = ["Wanjiru", "Kiprop", "Mwangi", "Auma", "Juma", "Baraka"]',
          language: 'python',
        },
        {
          title: 'Count it with len()',
          body: 'len() tells you how many items are in a list. Here: 6.',
          code: 'print(len(drivers))',
          language: 'python',
        },
        {
          title: 'Pick by position',
          body: 'Python counts from 0. drivers[0] is the first item, drivers[1] the second. drivers[-1] is the last.',
          code: 'print(drivers[0])\nprint(drivers[-1])',
          language: 'python',
        },
      ],
    },
    {
      kind: 'story',
      beats: [
        { speaker: 'emeka', text: 'Six drivers on the March routes. Wanjiru, Kiprop, Mwangi, Auma, Juma and Baraka. It\'s Baraka. Everyone knows it\'s Baraka.' },
        { speaker: 'zanele', text: 'Everyone knows, or the data knows?' },
        { speaker: 'narrator', text: 'Emeka unmutes to answer, then mutes again by mistake. Zanele writes a note: "Check Baraka. Don\'t assume."' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'The driver list',
      code: 'drivers = ["Wanjiru", "Kiprop", "Mwangi", "Auma", "Juma", "Baraka"]\n\nprint(len(drivers))\nprint(drivers[0])\nprint(drivers[-1])\n',
      caption: 'Press Run: 6 drivers, the first, and the last.',
      challenge: 'Print drivers[2]. Who is third?',
    },
  ],
  apply: {
    scenario: 'Writing down Emeka\'s six drivers.',
    items: [
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'drivers = ["Wanjiru", "Kiprop", "Mwangi"]\nprint(drivers[0])',
        language: 'python',
        options: [
          { text: 'Kiprop', why: 'Python counts from 0, so [0] is the first item.' },
          { text: '0', why: '[0] picks the item at position 0, it doesn\'t print 0.' },
          { text: 'Wanjiru' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Make a list called depots with "Nairobi", "Mombasa" and "Kisumu". Print how many there are with len().',
        starter: 'depots = []\n',
        solution: 'depots = ["Nairobi", "Mombasa", "Kisumu"]\nprint(len(depots))\n',
        hint: 'Put the three names in the brackets, with commas. Then print(len(depots)).',
        checks: [
          { message: 'Print 3', outputIncludes: '3' },
          { message: 'Put all three depots in the list', expr: 'depots == ["Nairobi", "Mombasa", "Kisumu"]' },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'String, number or list?',
        groups: ['String', 'Number', 'List'],
        items: [
          { text: '"Baraka"', group: 0 },
          { text: '495', group: 1 },
          { text: '["Auma", "Juma"]', group: 2 },
          { text: '"Mombasa"', group: 0 },
          { text: '6', group: 1 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Count the drivers.',
        template: 'print([[1]](drivers))',
        blanks: [['len']],
        distractors: ['count', 'size'],
        language: 'python',
      },
      {
        kind: 'findBug',
        prompt: 'Which line has a mistake?',
        lines: ['drivers = ["Auma", "Juma", "Baraka"]', 'print(len(drivers))', 'print(drivers[3])'],
        bug: 2,
        fix: 'print(drivers[2])',
        explanation: 'Three items sit at positions 0, 1 and 2. There is no position 3, so Python stops with an IndexError.',
        language: 'python',
      },
      {
        kind: 'writeCode',
        prompt: 'Print the last driver in the list using -1.',
        starter: 'drivers = ["Wanjiru", "Kiprop", "Mwangi", "Auma", "Juma", "Baraka"]\n',
        solution: 'drivers = ["Wanjiru", "Kiprop", "Mwangi", "Auma", "Juma", "Baraka"]\nprint(drivers[-1])\n',
        hint: 'print(drivers[-1])',
        checks: [
          { message: 'Print Baraka', outputIncludes: 'Baraka' },
          { message: 'Use -1 for the last item', codeIncludes: '[-1]' },
        ],
      },
      {
        kind: 'chatReply',
        from: 'emeka',
        message: "It's Baraka. Everyone knows it's Baraka.",
        prompt: 'Zanele\'s best reply?',
        options: [
          { text: 'Then we don\'t need data.', why: 'Sarcasm won\'t help, and he might be right.' },
          { text: 'Maybe! I\'ll check it in the data and show you what I find, either way.' },
          { text: 'Okay, I\'ll write that he\'s the problem.', why: 'That\'s a guess, not a finding.' },
        ],
        answer: 1,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build a list of two depots.',
        tiles: ['[', '"Nairobi"', ',', '"Kisumu"', ']'],
        distractors: ['('],
        language: 'python',
      },
      {
        kind: 'matchPairs',
        prompt: 'drivers = ["Wanjiru", "Kiprop", "Mwangi"]. Match the code to what it gives.',
        pairs: [
          ['drivers[0]', 'Wanjiru'],
          ['drivers[1]', 'Kiprop'],
          ['drivers[-1]', 'Mwangi'],
          ['len(drivers)', '3'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Python counts list positions starting from which number?',
        answers: ['0', 'zero'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Emeka is sure it\'s Baraka. Have you ever been sure about something the facts later disagreed with?',
    starters: ['I was sure that...', 'What changed my mind was...'],
  },
  deepen: {
    title: 'A list of your own',
    summary: 'In the Try it card, make a list of five things you used today and print how many there are.',
  },
  notes: 'Six drivers as in deliveries_clean.csv. Emeka (Synergix logistics lead, Lagos, joins by video, forgets he\'s on mute) is from Corporate Jargon (docs/originals/CAST.md).',
};

export default lesson;
