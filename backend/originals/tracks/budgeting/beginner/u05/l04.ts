import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 4. Chat with Tey: tracking without hating it. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Tracking without hating it',
  summary: 'Yaw finally starts a budget, and quits after four days: "Writing down every kelewele is torture." Tey shares the tricks that make tracking light enough to keep.',
  minutes: 10,
  outcomes: [
    'Track spending with as little effort as possible',
    'Choose the right amount of detail',
    'Keep tracking after you miss a few days',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Yaw wrote down every payment, in a spreadsheet, with 30 categories, the moment he paid. He lasted four days. What went wrong?', replies: ['Too much work?'] },
        { tey: 'Way too much. Tracking only has to answer one question: is each line under, on or over? You don\'t need a diary of every snack for that.', replies: ['So what\'s the minimum?'] },
        { tey: 'Trick one: let your phone do it. Most payments already sit in your mobile money or bank history. You don\'t write them down; you read them once a week.', replies: ['And cash?'] },
        { tey: 'Trick two: cash gets a quick note. A line in your phone\'s notes app, "kelewele 12", takes three seconds. Or take cash out once a week for one line, like fun, and when it\'s gone, it\'s gone. No tracking needed.', replies: ['How detailed should categories be?'] },
        { tey: 'Trick three: few categories, round numbers. Seven to ten lines is plenty. GH₵12.50 is GH₵13. Nobody\'s marking you on pesewas.', replies: ['What if I miss a week?'] },
        { tey: 'Trick four: never catch up on everything. Missed two weeks? Just check the totals, rebalance, and start fresh from today. The goal is a useful picture, not a perfect record.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Let the history do the work, note cash in seconds, keep categories few and numbers round, and never try to catch up perfectly.',
    },
  ],
  apply: {
    scenario: 'Yaw\'s second try.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What one question does tracking need to answer?',
        options: [
          { text: 'Is each line under, on or over?' },
          { text: 'What exactly did I buy every hour?', why: 'Far more detail than a budget needs.' },
          { text: 'How much did my friends spend?', why: 'Their money isn\'t on your sheet.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Light tracking or heavy tracking?',
        groups: ['Light (keeps going)', 'Heavy (quits fast)'],
        items: [
          { text: 'Read your history once a week', group: 0 },
          { text: 'Thirty categories', group: 1 },
          { text: 'Round to the nearest cedi', group: 0 },
          { text: 'Write every payment in a spreadsheet the moment you pay', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'yaw',
        message: 'I missed two weeks of tracking. Should I go back and log every payment?',
        prompt: 'Kofi\'s best reply?',
        options: [
          { text: 'Yes, every single one.', why: 'That\'s how a missed fortnight becomes quitting.' },
          { text: 'No. Check the totals, rebalance, start fresh from today.' },
          { text: 'Just give up then.', why: 'Two missed weeks are fixable in ten minutes.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Trick three.',
        template: 'Few [[1]], round [[2]].',
        blanks: [['categories'], ['numbers']],
        distractors: ['friends', 'loans'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each trick to what it fixes.',
        pairs: [
          ['Read your history', 'No writing down phone payments'],
          ['Quick cash note', 'Cash leaves no trail'],
          ['Cash for one line', 'No tracking needed for it'],
          ['Start fresh', 'Missed weeks don\'t become quitting'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Rounded to the nearest cedi, what is GH₵12.50? (Round up.)',
        answers: ['13', 'GH₵13', '13 cedis'],
        placeholder: 'A number',
      },
      {
        kind: 'findBug',
        prompt: 'Which part of Yaw\'s new system will make him quit?',
        lines: [
          'Weekly check on Sunday.',
          'Eight categories.',
          'If I miss a payment, the whole week doesn\'t count.',
          'Cash notes in my phone.',
        ],
        bug: 2,
        fix: 'If I miss a payment, I estimate it and move on.',
        explanation: 'Perfection rules make one slip feel like failure. Good enough keeps it going.',
      },
      {
        kind: 'mcq',
        prompt: 'How does "cash for one line" work?',
        options: [
          { text: 'Take the week\'s fun money out in cash; when it\'s gone, fun is done for the week' },
          { text: 'Pay for everything in cash', why: 'Only one line, to make it self-tracking.' },
          { text: 'Never use cash', why: 'Cash can be the simplest tracker for one line.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Order Yaw\'s light-tracking week.',
        lines: ['Pay by phone as usual', 'Note cash in seconds', 'Sunday: read the history', 'Sort into eight lines', 'Rebalance and set up next week'],
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the goal of tracking?',
        options: [
          { text: 'A perfect record of every pesewa', why: 'Perfect records are what make people quit.' },
          { text: 'A useful picture of where money is going' },
          { text: 'Proof for your family', why: 'Nice if you share it, but the picture is for you.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'What\'s the lightest tracking system you\'d actually keep? What would you drop from a "perfect" one?',
    starters: ['I\'d keep...', 'I\'d drop...'],
  },
  deepen: {
    title: 'Apps or notebook?',
    summary: 'Budgeting apps can sort payments for you; a notebook makes you look at every line. Both work. Choose the one you\'ll open every Sunday, and be careful which apps you give access to your accounts or messages.',
  },
  notes: 'Practice guidance, no specific study. No app named (playbook §9).',
};

export default lesson;
