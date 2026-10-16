import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 8. Chat with Tey: agreeing "good enough" (perfectionism vs speed; fit-for-purpose quality). */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'What\'s good enough?',
  summary: 'Kavya moves fast and ships at 80%. Joel polishes everything to 120%, including the admin page only Mr Rao will ever see. Arjun has one of each. He asks Tey how to set "good enough" without sounding like he wants sloppy work.',
  minutes: 11,
  outcomes: [
    'Know that "good enough" depends on the piece of work',
    'Agree the quality level per piece, not one rule for everything',
    'Talk about quality without sounding like you want sloppy work',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        {
          tey: 'What\'s worrying you?',
          replies: ['If I tell Joel to do less, he\'ll think I want sloppy work.', 'If I tell Kavya to do more, she\'ll miss deadlines.'],
        },
        {
          tey: "Both fair. The trick is that \"good enough\" isn't one standard. It depends on the piece. The checkout must be close to perfect: real money, real customers. The admin page only Mr Rao sees can be plain and simple. Say that out loud, piece by piece.",
          replies: ['How do I say it to Joel?'],
        },
        {
          tey: "Tie it to the intent: \"The checkout is where we need your full Joel-level care. The admin page needs to work and be clear, nothing more. Your time is more valuable on checkout.\" That's not lowering the bar. It's spending care where it matters most.",
          replies: ['And Kavya?'],
        },
        {
          tey: "Same idea, other direction: \"For the product page, 'done' includes the cheap-Android test and Hindi. That's the must. Speed is great once those boxes are ticked.\" She's not slow or sloppy. She just needs to know which bars are non-negotiable.",
          replies: ['So I write it down?'],
        },
        {
          tey: "Yes. Add one word per piece on the team page: polished, solid, or simple. Polished for checkout, solid for product pages, simple for admin. Now nobody has to guess how much care each piece deserves.",
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Good enough depends on the piece. Say it per piece: polished, solid or simple. Tie it to the intent. Spend care where it matters most.',
    },
  ],
  apply: {
    scenario: 'Tey and Arjun: one fast, one perfect.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What\'s the main idea of "good enough"?',
        options: [
          { text: 'Lower the bar everywhere', why: 'Checkout still needs to be near perfect.' },
          { text: 'Everything should be perfect', why: 'Then the admin page eats checkout time.' },
          { text: 'It depends on the piece, so say it per piece' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'How much care does each piece need?',
        groups: ['Polished', 'Solid', 'Simple'],
        items: [
          { text: 'Checkout', group: 0 },
          { text: 'Product pages', group: 1 },
          { text: 'Admin page only Mr Rao sees', group: 2 },
          { text: 'Payment error messages', group: 0 },
          { text: 'Shipping page', group: 1 },
          { text: 'Internal test script', group: 2 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'joel',
        message: 'I\'m still polishing the admin page. Is that okay?',
        prompt: 'Arjun\'s best reply?',
        options: [
          { text: 'The admin page just needs to work and be clear. Your care matters most on checkout. Could you move there now?' },
          { text: 'Stop wasting time.', why: 'He was being careful, not wasteful.' },
          { text: 'Sure, take as long as you need.', why: 'Checkout is the polished piece.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Spend care where it ___ most. (one word)',
        answers: ['matters', 'Matters', 'counts'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the person to what they need to hear.',
        pairs: [
          ['Joel', 'Where full care matters most'],
          ['Kavya', 'Which bars are non-negotiable'],
          ['Both', 'One word per piece on the page'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why tie "good enough" to the intent?',
        options: [
          { text: 'To sound clever', why: 'It\'s about meaning.' },
          { text: 'It shows it\'s about where care matters, not about wanting sloppy work' },
          { text: 'It doesn\'t help', why: 'It\'s what makes it land.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Arjun\'s new team-page line. Which one causes trouble?',
        lines: [
          'Checkout: polished.',
          'Everything else: whatever, just ship it.',
          'Admin page: simple.',
        ],
        bug: 1,
        fix: 'Product and shipping pages: solid.',
        explanation: '"Whatever" isn\'t a quality level. Each piece needs its word.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put agreeing "good enough" in order.',
        lines: ['List the pieces', 'Ask how much each one matters', 'Give each one a word', 'Write it on the team page'],
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Polished, [[1]] or [[2]]. One word per piece.',
        blanks: [['solid'], ['simple']],
        distractors: ['sloppy', 'perfect'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Arjun\'s line to Joel.',
        tiles: ['Your', 'care', 'matters', 'most', 'on', 'checkout.'],
        distractors: ['admin'],
      },
    ],
  },
  reflect: {
    prompt: 'Are you more of a Kavya (fast, 80%) or a Joel (careful, 120%)? Which of your tasks deserve polished, solid or simple?',
    starters: ['I\'m more of a...', 'Polished: ...', 'Simple: ...'],
  },
  deepen: {
    title: 'One word per task',
    summary: 'Look at your tasks this week and write polished, solid or simple next to each. Spend your best care on the polished ones.',
  },
  notes: '"Fit-for-purpose" quality levels per deliverable: standard product and engineering practice (e.g. differentiating critical paths from internal tools). Fictional details.',
};

export default lesson;
