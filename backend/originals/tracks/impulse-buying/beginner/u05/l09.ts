import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 9. Tap to explore: the pause list v5, Kofi's rules. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'The pause list v5: Kofi\'s rules',
  summary: 'From 11 urges and a wrong-size box to a one-page set of rules. Tap through Kofi\'s final pause list, the version he keeps pinned to his phone.',
  minutes: 11,
  outcomes: [
    'Read a complete personal spending rule set',
    'See how every chapter shows up in it',
    'Write your own one-page pause list',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Kofi\'s pause list v5',
      text: 'BEFORE ANY BUY: HALT + BS. Am I hungry, angry, lonely, tired, bored or stressed? Fix that first. THE PAUSE: unplanned under GH₵200, 24 hours. Over GH₵200, 30 days. Screenshot to the wishlist. THREE QUESTIONS: still want it? Fits a planned line? Fair against the usual price? MY TRIGGERS: in bed after 10 (phone by the door), after a loss (practice, voice note), Kejetia with Yaw (list and cash limit). TRICKS: ignore "was" prices, test countdowns, untick boxes, close the app after buying. PEOPLE: pay later only if I could pay in full, and never more than one. Suggest the cheaper plan early. My savings aren\'t a friend\'s emergency fund. FUN: GH₵25 a week, no guilt. THE TEST: will I still be glad in a year?',
      hotspots: [
        { phrase: 'HALT + BS', note: 'Chapter 2. The feeling first, the purchase second.' },
        { phrase: 'Over GH₵200, 30 days.', note: 'Chapter 5. The pause rule: most urges fade; the real wants survive.' },
        { phrase: 'Fair against the usual price?', note: 'Chapter 3. His own anchor, not the seller\'s.' },
        { phrase: 'in bed after 10 (phone by the door)', note: 'Chapter 2. His biggest trigger, with its swap.' },
        { phrase: 'close the app after buying', note: 'Chapter 5. The list, not the scroll.' },
        { phrase: 'never more than one', note: 'Chapter 4. Yaw\'s nine payments across three apps.' },
        { phrase: 'FUN: GH₵25 a week, no guilt.', note: 'Chapter 5. Spending on purpose includes joy.' },
        { phrase: 'will I still be glad in a year?', note: 'Things vs experiences. The last question before any big buy.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Your pause list should fit on one screen: your check, your pause, your questions, your triggers, your tricks, your people rules, your fun.',
    },
  ],
  apply: {
    scenario: 'Reading the final list.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each part of v5 to its chapter.',
        pairs: [
          ['HALT + BS', 'Ch 2: why I really bought it'],
          ['Ignore "was" prices', 'Ch 3: the tricks'],
          ['Never more than one pay-later plan', 'Ch 4: everyone\'s buying it'],
          ['24 hours or 30 days', 'Ch 5: spend on purpose'],
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Order the pause list versions.',
        lines: ['v1: count the urges', 'v2: map the triggers', 'v3: spot the tricks', 'v4: the pressure rules', 'v5: Kofi\'s rules'],
      },
      {
        kind: 'sortGroups',
        prompt: 'In Kofi\'s rules, or not?',
        groups: ['In his rules', 'Not in his rules'],
        items: [
          { text: 'Phone by the door after 10', group: 0 },
          { text: 'Buy anything with a countdown', group: 1 },
          { text: 'Fun money, no guilt', group: 0 },
          { text: 'Lend savings to any friend who asks', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the last question before any big buy?',
        options: [
          { text: 'Is there a countdown?', why: 'Countdowns are tested, not obeyed.' },
          { text: 'Will I still be glad in a year?' },
          { text: 'Does Yaw have one?', why: 'That\'s comparison.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'efua',
        message: 'Your list is long. Will you really remember all of it?',
        prompt: 'Kofi\'s best reply?',
        options: [
          { text: 'No, I\'ll delete it.', why: 'It\'s his guide; it doesn\'t need memorising.' },
          { text: 'I\'ll make it longer.', why: 'It should fit on one screen.' },
          { text: 'I don\'t need to. It\'s pinned. In the moment I remember one thing: HALT, then pause.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'The pause.',
        template: 'Unplanned under GH₵200: [[1]] hours. Over: [[2]] days.',
        blanks: [['24'], ['30']],
        distractors: ['2', '3'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line doesn\'t belong on a pause list?',
        lines: [
          'Fix the feeling first.',
          'Screenshot to the wishlist.',
          'If it\'s 70% off, buy it immediately.',
        ],
        bug: 2,
        fix: 'If it\'s 70% off, check the usual price.',
        explanation: 'A big percentage is often an anchor.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Kofi\'s fun line is GH₵25 a week. How much over a year?',
        answers: ['1300', '1,300', 'GH₵1,300', 'GH₵1300'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why keep the list pinned instead of memorising it?',
        options: [
          { text: 'Memorising is impossible', why: 'Possible, but not necessary.' },
          { text: 'In the moment you only need to remember to look' },
          { text: 'To show people', why: 'It\'s for him.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        prompt: 'What is the one thing Kofi remembers in the moment?',
        options: [
          { text: 'Buy fast before it\'s gone', why: 'The opposite.' },
          { text: 'Ask Yaw', why: 'He has his own rules now.' },
          { text: 'HALT, then pause' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Write your own pause list v5 on one screen: check, pause, questions, triggers, tricks, people rules, fun.',
    starters: ['Check:...', 'Pause:...', 'Triggers:...', 'Fun:...'],
  },
  deepen: {
    title: 'Revisit it',
    summary: 'Lives change: a new job, a new city, more money, less money. Read your pause list every few months, and update the triggers and lines. It should grow with you.',
  },
  notes: 'Pause list v5 consolidates Ch1–Ch5. Fun 25 × 52 = 1,300.',
};

export default lesson;
