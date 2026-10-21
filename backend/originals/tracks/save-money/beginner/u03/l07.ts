import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 7. Before/After: locking it away with commitment devices. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'Tie your own hands',
  summary: 'Yaw\'s sneaker fund keeps getting raided at 11 p.m. Kofi\'s laptop jar doesn\'t. The difference isn\'t willpower. It\'s three small rules set up in advance. Before and after.',
  minutes: 11,
  outcomes: [
    'Set up commitment devices for a goal',
    'Add a waiting rule before withdrawals',
    'Use other people as gentle checks',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Yaw\'s fund vs Kofi\'s jar',
      before: {
        label: 'Yaw\'s sneaker fund',
        text: 'Kept in his main wallet, "set aside in my head"\nOne tap to spend\nNo rule for taking money out\nNobody knows about it\nRaided three times this month, all after 10 p.m.',
      },
      after: {
        label: 'Kofi\'s laptop jar',
        text: 'Separate place, named "Laptop for my degree"\nNot linked to any spending app\nWithdrawal rule: wait 24 hours, then explain it to Efua\nProgress number on the door and the lock screen\nRaided: never',
      },
      notes: [
        'A separate, named place stops accidental spending.',
        'No link to spending apps adds a few steps: enough to stop impulse raids.',
        'The 24-hour rule lets the late-night urge pass. Real emergencies come from the emergency fund anyway.',
        'Telling one trusted person adds a gentle social check without giving them control.',
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Set the rules for future-you today: separate place, no spending link, a waiting rule, and one person who knows.',
    },
  ],
  apply: {
    scenario: 'Protecting the jar.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Does it protect savings, or expose them?',
        groups: ['Protects', 'Exposes'],
        items: [
          { text: 'A 24-hour waiting rule', group: 0 },
          { text: 'Savings "set aside in my head"', group: 1 },
          { text: 'One trusted person who knows the goal', group: 0 },
          { text: 'One-tap spending from savings', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'When were all of Yaw\'s raids?',
        options: [
          { text: 'After 10 p.m.' },
          { text: 'On payday', why: 'Late at night, every time.' },
          { text: 'At the market', why: 'Late at night, on his phone.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'Why does a 24-hour rule work against late-night raids?',
        options: [
          { text: 'The urge usually passes by morning' },
          { text: 'Banks close at night', why: 'Apps work all night. The rule is about the urge.' },
          { text: 'It doesn\'t work', why: 'Most impulses fade with a little time.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'yaw',
        message: 'But what if I REALLY need the sneaker money tonight?',
        prompt: 'Kofi\'s best reply?',
        options: [
          { text: 'If it\'s a real emergency, that\'s what the emergency fund is for. Sneakers can wait 24 hours.' },
          { text: 'Then take it.', why: 'That\'s exactly the raid the rule prevents.' },
          { text: 'You never need anything.', why: 'Real emergencies happen. They have their own fund.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The four rules.',
        template: 'Separate [[1]], no spending [[2]], a [[3]] rule, and one person who [[4]].',
        blanks: [['place'], ['link'], ['waiting'], ['knows']],
        distractors: ['loan', 'pays'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each rule to what it stops.',
        pairs: [
          ['Separate place', 'Accidental spending'],
          ['No spending link', 'One-tap impulse buys'],
          ['24-hour wait', 'Late-night urges'],
          ['A trusted person', 'Quiet raids nobody sees'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which rule gives too much control away?',
        lines: [
          'Tell Efua my goal.',
          'Explain any withdrawal to her first.',
          'Give Efua my PIN so she decides for me.',
        ],
        bug: 2,
        fix: 'Keep my PIN private; Efua just asks "why?"',
        explanation: 'Never share PINs or passwords, even with friends. A gentle check is enough.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Yaw raided his fund three times this month for about GH₵60 each. How much is that?',
        answers: ['180', 'GH₵180', '180 cedis'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why is this better than "just having more willpower"?',
        options: [
          { text: 'It doesn\'t depend on how you feel at 11 p.m.' },
          { text: 'Willpower doesn\'t exist', why: 'It exists. It just runs low when you\'re tired.' },
          { text: 'It\'s more complicated', why: 'It\'s simpler: set once, then it works.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Order Yaw\'s new set-up.',
        lines: ['Move the fund to a separate place', 'Remove any spending link', 'Agree a 24-hour rule', 'Tell Kofi the goal'],
      },
    ],
  },
  reflect: {
    prompt: 'When are you most likely to raid your savings? Which rule would protect you at that moment?',
    starters: ['I\'d raid it when...', 'The rule that helps:...'],
  },
  deepen: {
    title: 'Never share your PIN',
    summary: 'A trusted friend can ask "why?" without knowing your PIN or password. Sharing them, even with someone you trust, puts your money at risk and can break your provider\'s terms. The course How Scams and Financial Fraud Work covers this.',
  },
  notes: 'Commitment device practice (general). Yaw\'s raids fictional: 3 × ~60 = 180. PIN-sharing warning consistent with Scams course.',
};

export default lesson;
