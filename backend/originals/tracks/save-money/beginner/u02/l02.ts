import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 2. Card deck: subscriptions and bundles. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'Subscriptions and bundles',
  summary: 'A music app, night-data add-ons and call credit: GH₵80 a month Kofi never chose on purpose. Subscriptions and bundles are built to be forgotten. Here\'s how to find them and decide.',
  minutes: 11,
  outcomes: [
    'Find every recurring payment',
    'Decide keep, swap or cancel for each',
    'Compare bundles by what you actually use',
  ],
  learn: [
    {
      kind: 'text',
      html: '<p><strong>Why subscriptions leak.</strong> You decide once, then pay automatically, every month, without deciding again. That\'s convenient for things you use, and expensive for things you forget.</p><p>Businesses know most people won\'t cancel what they\'ve stopped using. Free trials that turn into paid plans rely on it.</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>Find them all.</strong> Search your history for anything that repeats on the same day each month: apps, streaming, data add-ons, "auto-renew" bundles, gym or club fees. Also check your phone\'s subscription settings and any card or wallet you\'ve linked to apps.</p><p>Kofi\'s three: music app GH₵25, night-data add-ons GH₵30, call credit GH₵25.</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>Decide: keep, swap or cancel.</strong></p><ul><li><strong>Keep</strong> if you use it weekly and it\'s worth the monthly price.</li><li><strong>Swap</strong> if there\'s a cheaper way to get the same thing: Kofi calls over data on Wi-Fi instead of buying call credit.</li><li><strong>Cancel</strong> if you haven\'t used it in a month.</li></ul><p><strong>Bundles:</strong> a bigger bundle is only cheaper if you use most of it. Check what you <em>actually</em> used last month, not what you might use.</p>',
    },
    {
      kind: 'check',
      question: 'Kofi\'s night-data add-on: GH₵30 a month, used twice last month. Keep, swap or cancel?',
      options: ['Cancel: hardly used, and campus Wi-Fi covers nights', 'Keep: it might be useful', 'Buy a bigger one'],
      answer: 0,
      explanation: 'Twice in a month isn\'t worth GH₵30. Wi-Fi does the same job.',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Once a month, list everything that renews automatically. For each: keep, swap or cancel.',
    },
  ],
  apply: {
    scenario: 'Kofi\'s automatic payments.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: 'Music app GH₵25 + night data GH₵30 + call credit GH₵25. Monthly total?',
        answers: ['80', 'GH₵80', '80 cedis'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Keep, swap or cancel?',
        groups: ['Keep', 'Swap', 'Cancel'],
        items: [
          { text: 'Data plan used every day for the class portal', group: 0 },
          { text: 'Call credit, when data calls on Wi-Fi work', group: 1 },
          { text: 'Music app not opened in 3 months', group: 2 },
          { text: 'Night-data add-on used twice', group: 2 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why do subscriptions leak so easily?',
        options: [
          { text: 'They\'re always expensive', why: 'Many are cheap. That\'s why they\'re forgotten.' },
          { text: 'Banks hide them', why: 'They appear in your history; we just stop looking.' },
          { text: 'You decide once, then pay every month without deciding again' },
        ],
        answer: 2,
      },
      {
        kind: 'chatReply',
        from: 'yaw',
        message: 'I\'ll keep my three streaming apps. I might watch something someday.',
        prompt: 'Kofi\'s best reply?',
        options: [
          { text: 'Good plan.', why: '"Someday" is how GH₵25 a month disappears for a year.' },
          { text: 'Which did you open this month? Keep that one. Cancel the others; you can rejoin any time.' },
          { text: 'Streaming is a waste.', why: 'Not if you use it. Paying for three you don\'t use is.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'The test for a bundle.',
        template: 'A bigger bundle is only cheaper if you [[1]] most of it.',
        blanks: [['use']],
        distractors: ['like', 'share'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each finding to the decision.',
        pairs: [
          ['Used weekly, worth it', 'Keep'],
          ['Cheaper way exists', 'Swap'],
          ['Not used in a month', 'Cancel'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Bundle A: 5 GB for GH₵50. Bundle B: 12 GB for GH₵90. Kofi used 4 GB last month. Which is better value for him?',
        options: [
          { text: 'Bundle B, more GB per cedi', why: 'Only if he\'d use it. He used 4 GB.' },
          { text: 'Bundle A' },
          { text: 'Both the same', why: 'He\'d pay GH₵40 more for data he won\'t use.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Which step will let leaks creep back in?',
        lines: [
          'List all automatic payments.',
          'Decide keep, swap or cancel.',
          'Never check again.',
        ],
        bug: 2,
        fix: 'Check once a month.',
        explanation: 'New trials and add-ons appear all the time. A monthly look catches them.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Kofi cancels the music app and night data, and swaps call credit. Monthly saving if all three go?',
        answers: ['80', 'GH₵80', '80 cedis'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order the subscription check.',
        lines: ['Search history for repeats', 'Check phone subscription settings', 'Decide keep, swap or cancel', 'Cancel today, not "later"'],
      },
    ],
  },
  reflect: {
    prompt: 'List every automatic payment you have. Which one would you cancel today?',
    starters: ['My automatic payments:...', 'I\'ll cancel...'],
  },
  deepen: {
    title: 'Cancelling should be easy',
    summary: 'Some services make signing up one tap and cancelling a maze. Consumer rules in a growing number of places say cancelling should be as easy as joining. If you\'re stuck, search the service\'s help page for "cancel", or remove your card or wallet from it.',
  },
  notes: 'Fictional subscription amounts. Bundle sizes/prices illustrative, no provider named. "Click to cancel" rules: e.g. US FTC (2024, later litigated) and UK DMCC Act provisions; stated generally as "a growing number of places".',
};

export default lesson;
