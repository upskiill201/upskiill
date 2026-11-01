import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 5. Checkpoint 1: lessons 1–4, plus Chapter 1 review. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: the first pot of stew',
  summary: 'Day 15. The first shared pot of rice and stew in the hall kitchen, and Yaw admits it\'s good. Check what you know: the loan trap, needs vs wants, scarcity and swaps.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Tell needs from wants under pressure', 'Spot tunnel thinking and cheap swaps'],
  learn: [
    {
      kind: 'story',
      title: 'Hall kitchen, 7 p.m.',
      beats: [
        { speaker: 'yaw', text: 'Chale. This stew is... actually better than the canteen.' },
        { speaker: 'efua', text: 'And it cost each of us GH₵6. Pass the pepper.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1: needs first.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Need, want or later?',
        groups: ['Need', 'Want', 'Later'],
        items: [
          { text: 'Basic food', group: 0 },
          { text: 'A party ticket', group: 1 },
          { text: 'Replacing a charger that still works', group: 2 },
          { text: 'Medicine when ill', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'The first question in the need-or-want test is:',
        options: [
          { text: 'What happens if I go without it for a month?' },
          { text: 'Can I afford it today?', why: 'Being able to afford it doesn\'t make it a need.' },
          { text: 'Does Yaw have one?', why: 'That\'s about wanting, not needing.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'kofi',
        message: 'There\'s an ad: GH₵500 in 5 minutes. Should I?',
        prompt: 'Efua\'s best reply?',
        options: [
          { text: 'Go for it, you\'ll pay it back.', why: 'From an allowance that already doesn\'t last, with more owed.' },
          { text: 'Never, loans are evil.', why: 'Not all borrowing is bad. This kind, at 1 a.m., in a panic, usually is.' },
          { text: 'Not at 1 a.m., and not before you know the total cost. Let\'s plan the 18 days first.' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the word to the idea.',
        pairs: [
          ['Tunnelling', 'Only today\'s problem in view'],
          ['Swap', 'Cheaper version, same need'],
          ['Slack', 'A small "don\'t touch" buffer'],
          ['Want on top', 'The extra beyond the basic need'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Canteen lunch GH₵25, cooked lunch GH₵6. How much is saved per day?',
        answers: ['19', 'GH₵19', '19 cedis'],
        placeholder: 'A number',
      },
      {
        kind: 'findBug',
        prompt: 'Which line in Kofi\'s survival plan breaks the swap rule?',
        lines: [
          'Cook dinner with Efua and Yaw.',
          'Skip all meals on Wednesdays to save.',
          'Use campus Wi-Fi for downloads.',
        ],
        bug: 1,
        fix: 'Eat a cheap meal on Wednesdays instead of skipping.',
        explanation: 'Swap the version, never the need. Skipping meals hurts studying and health.',
      },
      {
        kind: 'mcq',
        prompt: 'Review, Chapter 1: Kofi\'s biggest leak was...',
        options: [
          { text: 'The welcome party', why: 'GH₵150, once.' },
          { text: 'Fees', why: 'GH₵27. Small.' },
          { text: 'Food bought out, about four times a day' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Review, Chapter 1.',
        template: 'Price × how [[1]] = the [[2]] cost.',
        blanks: [['often'], ['real']],
        distractors: ['much', 'fake'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Big decision in the tunnel, or a calm plan?',
        groups: ['In the tunnel', 'Calm plan'],
        items: [
          { text: 'Signing up for monthly payments at midnight', group: 0 },
          { text: 'A Saturday-afternoon food plan', group: 1 },
          { text: 'Tapping an instant-loan ad', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why did the sugarcane farmers score lower before harvest?',
        options: [
          { text: 'They were less clever than after harvest', why: 'Same people. Money worry took up mental space.' },
          { text: 'Money worry used up mental "bandwidth"' },
          { text: 'They hadn\'t slept', why: 'The study pointed at money worry, not sleep.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Order the need-or-want test.',
        lines: ['Go without it for a month: what happens?', 'Is there a cheaper way?', 'Now or later?', 'Mark need, want or later'],
      },
    ],
  },
  reflect: {
    prompt: 'Which swap from this week could you actually keep for a whole month?',
    starters: ['I could keep...', 'Because...'],
  },
  notes: 'Checkpoint for Chapter 2 lessons 1–4 with 2 Chapter 1 review items.',
};

export default lesson;
