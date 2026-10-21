import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 8. Myth or Fact: "I'm just bad with money". */
const lesson: OriginalLesson = {
  key: 'l08',
  title: '"I\'m just bad with money"',
  summary: 'Yaw says it every week. Kofi used to say it too. Is being "good with money" something you\'re born with, or something you learn? Five myths about money and who you are.',
  minutes: 10,
  outcomes: [
    'Replace "I\'m bad with money" with a skill you can learn',
    'Know that money habits can change at any age',
    'Judge your progress by habits, not one bad week',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'Some people are just born good with money.',
          isFact: false,
          explain: 'Myth. Money management is a set of learnable habits: tracking, planning, checking. Kofi learned them in three months.',
        },
        {
          text: 'How your family handled money can shape your habits, but it doesn\'t decide them.',
          isFact: true,
          explain: 'Fact. Childhood examples influence us, and people change those patterns all the time once they see them.',
        },
        {
          text: 'Earning more automatically makes you better with money.',
          isFact: false,
          explain: 'Myth. Without habits, spending tends to rise with income. Plenty of high earners run out before payday.',
        },
        {
          text: 'Calling yourself "bad with money" can make it harder to change.',
          isFact: true,
          explain: 'Fact. If it\'s "who you are", why try? Calling it a skill you\'re learning keeps the door open.',
        },
        {
          text: 'It\'s too late to learn once you\'ve made money mistakes.',
          isFact: false,
          explain: 'Myth. Most people who are good with money learned after making mistakes. Miracle kept a list of hers.',
        },
      ],
    },
    {
      kind: 'story',
      title: 'The list',
      beats: [
        { speaker: 'yaw', text: 'You\'re good with money. I\'m just bad with money.' },
        { speaker: 'kofi', text: 'Three months ago I had GH₵63 and no idea why. I\'m not good with money. I just do the Sunday check.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Not "I\'m bad with money", but "I\'m learning money habits". It\'s a skill, and skills improve with practice.',
    },
  ],
  apply: {
    scenario: 'Who you are vs what you do.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Myth', 'Fact'],
        items: [
          { text: 'Some people are born good with money', group: 0 },
          { text: 'Family habits influence but don\'t decide yours', group: 1 },
          { text: 'Earning more fixes money habits', group: 0 },
          { text: 'It\'s too late after mistakes', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'yaw',
        message: 'I\'m just bad with money. That\'s who I am.',
        prompt: 'Kofi\'s best reply?',
        options: [
          { text: 'Yeah, you are.', why: 'Agreeing locks the door Yaw is standing at.' },
          { text: 'I was "bad with money" three months ago. It\'s habits, not who you are. Want to do the Sunday check with me?' },
          { text: 'Just try harder.', why: 'Effort without a habit fades. Offer the habit.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        prompt: 'What does "earning more" usually do without good habits?',
        options: [
          { text: 'Spending rises with income, and the money still runs out' },
          { text: 'Savings rise automatically', why: 'Only if saving is planned first.' },
          { text: 'Nothing changes at all', why: 'Spending usually changes: upwards.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Swap the sentence.',
        template: 'Not "I\'m [[1]] with money", but "I\'m [[2]] money habits".',
        blanks: [['bad'], ['learning']],
        distractors: ['rich', 'hiding'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the "bad with money" thought to the habit that fixes it.',
        pairs: [
          ['"I never know where it goes"', 'The weekly check'],
          ['"I always run out"', 'A zero-based plan'],
          ['"Surprises always wreck me"', 'A surprises line'],
          ['"I can\'t save"', 'Savings first, before spending'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which thought keeps Yaw stuck?',
        lines: [
          'I overspent this week.',
          'I can rebalance on Sunday.',
          'This proves I\'m just a bad-with-money person.',
        ],
        bug: 2,
        fix: 'This is one week. I\'ll check on Sunday and adjust.',
        explanation: 'Turning a week into an identity makes change feel pointless.',
      },
      {
        kind: 'mcq',
        prompt: 'What made Kofi "good with money" in three months?',
        options: [
          { text: 'He started earning much more', why: 'His income barely changed.' },
          { text: 'He was secretly good all along', why: 'Day 12 says otherwise.' },
          { text: 'He built habits: track, plan, check, adjust' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many lines left without a job does a good zero-based budget have? (A number.)',
        answers: ['0', 'zero', 'none'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order Kofi\'s three months.',
        lines: ['Month 1: GH₵63 on day 12', 'Month 1: solved the case', 'Month 2: first plan, bent not broken', 'Month 3: kept going without a crisis'],
      },
      {
        kind: 'mcq',
        prompt: 'How should you judge your money progress?',
        options: [
          { text: 'By your habits over months, not one bad week' },
          { text: 'By how much your friends have', why: 'Their money isn\'t your measure.' },
          { text: 'Only by your savings total', why: 'Habits come first; the total follows.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'What money sentence do you say about yourself? Rewrite it as a habit you\'re learning.',
    starters: ['I used to say "I\'m..."', 'Now: "I\'m learning to..."'],
  },
  deepen: {
    title: 'Money scripts',
    summary: 'Financial psychologists use the term "money scripts" for beliefs about money we picked up growing up, like "money is always short" or "talking about money is rude". Noticing your scripts is the first step to choosing new ones.',
  },
  notes: '"Money scripts": Klontz et al. (2011), Journal of Financial Therapy; stated generally. Growth-mindset framing (Dweck) applied loosely; claims kept qualitative.',
};

export default lesson;
