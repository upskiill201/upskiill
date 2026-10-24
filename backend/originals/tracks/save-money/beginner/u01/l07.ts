import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 7. Chat with Tey: emergency fund first. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'Emergency fund first',
  summary: 'Kofi wants every cedi on the laptop. Miracle sends a voice note: "Before the laptop, put GH₵300 aside you never touch." He thinks she\'s wrong. Tey explains why she isn\'t.',
  minutes: 11,
  outcomes: [
    'Explain what an emergency fund is for',
    'Decide how much to start with',
    'Keep it separate from goal savings',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Kofi has GH₵790 he can use. He wants all of it in the laptop jar. Miracle says: GH₵300 in an emergency fund first. Who\'s right?', replies: ['Kofi? The laptop is urgent.'] },
        { tey: 'Here\'s the problem. Imagine week 9, the jar has GH₵1,350, and Kofi needs GH₵250 for a clinic visit. Where does it come from?', replies: ['The laptop jar?'] },
        { tey: 'Right. And now the laptop is GH₵250 further away, and he\'s stressed. Or worse, he takes a fast loan to protect the jar. An emergency fund stops one bad week from undoing months of saving.', replies: ['How big should it be?'] },
        { tey: 'For a start: enough for a typical surprise. For Kofi, GH₵300 covers a clinic visit, a phone repair or an urgent bus home. Later it can grow. Many people aim for one month of essential costs, then three.', replies: ['And what counts as an emergency?'] },
        { tey: 'Something urgent, necessary and unexpected. Illness, a safety problem, a broken thing you can\'t study or work without. Not a sale, a party or a laptop you\'ve planned for.', replies: ['So the GH₵300 is separate?'] },
        { tey: 'Completely. Different place, different name: "Emergency. Do not touch." Then the laptop jar starts at GH₵490 instead of GH₵790. Slower, but it can\'t be knocked over by one bad week.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Starter emergency fund first, then the goal. It stops one bad week from undoing months of saving.',
    },
  ],
  apply: {
    scenario: 'Miracle\'s advice.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What is an emergency fund for?',
        options: [
          { text: 'Planned purchases like the laptop', why: 'That\'s goal savings. Separate jar.' },
          { text: 'Sales and bargains', why: 'A sale isn\'t an emergency, however good the price.' },
          { text: 'Urgent, necessary, unexpected costs' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Kofi has GH₵790. GH₵300 goes to the emergency fund. What\'s left for the laptop jar?',
        answers: ['490', 'GH₵490', '490 cedis'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Emergency or not?',
        groups: ['Emergency', 'Not an emergency'],
        items: [
          { text: 'Clinic visit with a fever', group: 0 },
          { text: 'Sneakers on sale', group: 1 },
          { text: 'Urgent bus home for a family crisis', group: 0 },
          { text: 'A friend\'s birthday trip', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'kofi',
        message: 'Why not put all GH₵790 in the laptop jar and use it if there\'s an emergency?',
        prompt: 'Miracle\'s best reply?',
        options: [
          { text: 'Because then every emergency eats your laptop, and you start borrowing to protect it. Separate jars, separate jobs.' },
          { text: 'Good point, do that.', why: 'One jar for two jobs means the urgent one always wins.' },
          { text: 'Because emergencies never happen.', why: 'They happen to everyone. That\'s why the fund exists.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'What makes an emergency.',
        template: 'Urgent, [[1]] and [[2]].',
        blanks: [['necessary'], ['unexpected']],
        distractors: ['fun', 'planned'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each stage to a common emergency fund size.',
        pairs: [
          ['Starter', 'One typical surprise'],
          ['Next step', 'One month of essential costs'],
          ['Later', 'Three months of essential costs'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which part of Kofi\'s set-up undoes the point?',
        lines: [
          'Emergency fund: GH₵300.',
          'Kept in a separate place, named "Do not touch".',
          'Also used for anything that feels urgent, like sales ending soon.',
        ],
        bug: 2,
        fix: 'Used only for urgent, necessary, unexpected costs.',
        explanation: 'Sales are designed to feel urgent. They aren\'t emergencies.',
      },
      {
        kind: 'mcq',
        prompt: 'Starting the jar at GH₵490 instead of GH₵790 makes the goal slower. Why is it still worth it?',
        options: [
          { text: 'It isn\'t worth it', why: 'Without it, week 9 would have cost him the laptop money.' },
          { text: 'Because emergency funds earn more', why: 'It\'s about protection, not earnings.' },
          { text: 'One emergency can\'t knock the laptop plan over' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Kofi\'s essential costs are about GH₵900 a month. How much would a one-month emergency fund be?',
        answers: ['900', 'GH₵900', '900 cedis'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order Kofi\'s money set-up.',
        lines: ['Build a GH₵300 emergency fund', 'Keep it separate and named', 'Start the laptop jar with the rest', 'Save toward the laptop weekly'],
      },
    ],
  },
  reflect: {
    prompt: 'What would a starter emergency fund be for you: enough for one typical surprise? Where would you keep it separate?',
    starters: ['A typical surprise for me costs...', 'I\'d keep it...'],
  },
  deepen: {
    title: 'Why the first one is small',
    summary: 'Many people never start an emergency fund because "three months of costs" sounds impossible. Starting with one typical surprise makes it reachable, and the first small fund is the one that changes how money stress feels.',
  },
  notes: 'Emergency fund staging (starter → 1 month → 3–6 months) is common guidance from consumer finance bodies; stated generally. Kofi\'s essentials ~900/month (from Budgeting: needs ~860). EF 300, jar starts 490 (Course 2 running numbers).',
};

export default lesson;
