import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 4. Step-by-step: reading your mobile money history. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'The evidence is on your phone',
  summary: 'Every cedi Kofi paid by mobile money left a trail. Tonight he pulls up twelve days of history and learns to read it like a detective, line by line.',
  minutes: 12,
  outcomes: [
    'Find and read your mobile money or bank history',
    'Mark every line as in or out, and give it a category',
    'Fill the gaps for cash spending',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Read your history like a detective',
      steps: [
        { title: '1. Get the history', body: 'Most mobile money services and banks let you see a statement or recent transactions in their app or through their phone menu. Pick the dates: here, the 1st to today.' },
        { title: '2. Mark each line in or out', body: 'Money in: the allowance, the GH₵80 beat sale. Money out: everything else. Don\'t judge anything yet. Just mark it.' },
        { title: '3. Decode the names', body: 'Lines often show a shop code or a person\'s name, not what you bought. "AMA SERWAA K." is the waakye seller. "MERCHANT 4471" is the printing shop. Write what each one really was.' },
        { title: '4. Give each line a category', body: 'Use a few simple groups: food, data and airtime, transport, school, fun, lending, fees. Seven groups is plenty for a first look.' },
        { title: '5. Fill the cash gaps', body: 'Cash doesn\'t leave a trail. If you cashed out GH₵100, write down what you remember spending it on. Whatever you can\'t remember goes in "unknown".' },
        { title: '6. Add up each category', body: 'Total each group. Now you can see the shape of your month instead of 94 separate lines.' },
      ],
    },
    {
      kind: 'story',
      title: 'Ninety-four lines',
      beats: [
        { speaker: 'narrator', text: 'Room 214, 11 p.m. Yaw is asleep. Kofi opens his mobile money history for the 1st to the 12th.' },
        { speaker: 'kofi', text: 'Ninety-four transactions. In twelve days. I thought I\'d done maybe twenty.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Don\'t try to remember your spending. Look it up. Memory is kind to us; statements aren\'t.',
    },
  ],
  apply: {
    scenario: 'Kofi\'s 94 lines.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the detective steps in order.',
        lines: ['Get the history for the dates', 'Mark each line in or out', 'Write what each line really was', 'Give each line a category', 'Add up each category'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Which category does each line go in?',
        groups: ['Food', 'Data and airtime', 'School'],
        items: [
          { text: 'AMA SERWAA K. (waakye seller)', group: 0 },
          { text: 'Daily data bundle', group: 1 },
          { text: 'MERCHANT 4471 (printing shop)', group: 2 },
          { text: 'Kelewele by the hall', group: 0 },
          { text: 'Airtime top-up', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Kofi cashed out GH₵100 on day 5 and spent it in cash. What should he do with it?',
        options: [
          { text: 'Ignore it; there\'s no record', why: 'Then GH₵100 of the case goes unsolved. Write what you remember.' },
          { text: 'Write down what he remembers buying, and put the rest under "unknown"' },
          { text: 'Count it all as food', why: 'Guessing hides the truth. "Unknown" is honest, and shows how much cash slips away.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Tey\'s rule.',
        template: 'Don\'t [[1]] your spending. [[2]] it up.',
        blanks: [['remember'], ['Look']],
        distractors: ['hide', 'Make'],
      },
      {
        kind: 'mcq',
        prompt: 'A line says "MERCHANT 4471 − GH₵35". What\'s the first thing to do?',
        options: [
          { text: 'Work out what it really was' },
          { text: 'Report it as fraud', why: 'Shop codes are normal. If you truly don\'t recognise a payment, then contact your provider.' },
          { text: 'Skip it', why: 'Skipped lines are where the money hides.' },
        ],
        answer: 0,
        explanation: 'Most codes are just how shops appear on statements. Match the date and amount to what you did that day.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Kofi bought a GH₵10 data bundle 12 times in 12 days. How much is that?',
        answers: ['120', 'GH₵120', '120 cedis'],
        placeholder: 'A number',
      },
      {
        kind: 'chatReply',
        from: 'kofi',
        message: 'There are 94 lines. Can I just skim them and guess the totals?',
        prompt: 'Tey\'s best reply?',
        options: [
          { text: 'Sure, close enough is fine.', why: 'Guessing is how the GH₵1,517 went missing in the first place.' },
          { text: 'You only need to do the big ones.', why: 'The case is probably in the small ones. There are a lot of them.' },
          { text: 'Do it properly once. It takes about half an hour, and you\'ll never have to guess again.' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the line to what it probably is.',
        pairs: [
          ['ALLOWANCE FROM A. MENSAH', 'Money in from Mum'],
          ['CASH OUT − GH₵100', 'Cash to track by memory'],
          ['FEE − GH₵1.50', 'A charge for a transfer'],
          ['TRANSFER TO YAW B.', 'Money lent'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Kofi\'s categories. Which one will cause trouble?',
        lines: ['Food', 'Data and airtime', 'Transport', 'Stuff', 'Lending'],
        bug: 3,
        fix: 'Split "Stuff" into clear groups like school, fun and personal care.',
        explanation: '"Stuff" is a hiding place. A category should tell you what the money was for.',
      },
      {
        kind: 'mcq',
        prompt: 'Why add up each category instead of reading all 94 lines again?',
        options: [
          { text: 'It shows the shape of the month: which groups are big and which are small' },
          { text: 'To make the numbers look smaller', why: 'The total is the same. Grouping just makes it readable.' },
          { text: 'Because banks require it', why: 'Nobody requires it. It\'s for you.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Open your own mobile money or bank history for the last seven days. How many transactions are there? More or fewer than you guessed?',
    starters: ['I guessed about...', 'There were actually...'],
  },
  deepen: {
    title: 'Real-world challenge: your seven-day case file',
    summary: 'Do the six steps on your last seven days. It takes about 15 minutes. Keep the result: you\'ll use it in lesson 9.',
  },
  notes: 'Fictional: 94 transactions in 12 days; GH₵10 daily data bundle ×12 = GH₵120. Merchant/person names fictional. No provider named (playbook §9). Ama Serwaa = waakye seller (narrated).',
};

export default lesson;
