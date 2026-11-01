import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 6. Before/After: fake bank text vs real bank text. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Two bank texts',
  summary: 'Grace puts a fake bank text next to a real one her bank sent last year. The real one is almost boring. That\'s the point.',
  minutes: 11,
  outcomes: [
    'Compare fake and genuine bank messages',
    'Notice what genuine messages don\'t do',
    'Respond safely to either',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Two texts "from the bank"',
      before: {
        label: 'The fake',
        text: '"ALERT: A new payee was added to your account. If this was NOT you, verify now at secure-account-review.co, or call 0300 *** ****."\nUrgent capitals\nA link to a lookalike site\nA phone number in the text\nAppears in the same thread as real bank texts (spoofed)',
      },
      after: {
        label: 'The genuine',
        text: '"We\'ve noticed a payment of £89.99 to an online shop. If you don\'t recognise it, please contact us using the number on the back of your card or in our app."\nCalm tone\nNo link\nPoints you to the number you already have\nNo request for codes or details',
      },
      notes: [
        'Genuine messages usually point you to channels you already trust: the app, the card, the official website.',
        'Fake ones give you their own link or number. That\'s the trap.',
        'Spoofed texts can land in the same thread as real ones, so the thread proves nothing.',
        'Either way, the safe move is identical: ignore the link and number, open the app or call the card number.',
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Genuine messages send you to channels you already have. Fakes give you their own link or number. Whatever the message, use your own channel.',
    },
  ],
  apply: {
    scenario: 'Two bank texts.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Fake text or genuine?',
        groups: ['Fake', 'Genuine'],
        items: [
          { text: '"Verify now at [link]"', group: 0 },
          { text: '"Use the number on the back of your card"', group: 1 },
          { text: 'Urgent capitals', group: 0 },
          { text: 'No request for codes', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why doesn\'t appearing in the same thread as real bank texts prove anything?',
        options: [
          { text: 'It does prove it\'s real', why: 'Spoofing can do this.' },
          { text: 'Spoofed texts can land in the same thread' },
          { text: 'Threads are random', why: 'Spoofing uses the sender name.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each fake feature to its genuine opposite.',
        pairs: [
          ['Their own link', 'Points to the app'],
          ['Their own phone number', 'Number on your card'],
          ['Urgent capitals', 'Calm tone'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'priya',
        message: 'So should I just ignore every bank text?',
        prompt: 'Grace\'s best reply?',
        options: [
          { text: 'Yes, ignore all of them.', why: 'Some are real and important.' },
          { text: 'Click only the calm ones.', why: 'Calm fakes exist too.' },
          { text: 'Don\'t ignore it; just never use its link or number. Open the app or call the card number to check.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Whatever the message, use your [[1]] channel, not [[2]].',
        blanks: [['own'], ['theirs']],
        distractors: ['fastest', 'yours'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'The genuine text mentioned a payment of how many pounds? (e.g. 89.99)',
        answers: ['89.99', '£89.99'],
        placeholder: 'A number',
      },
      {
        kind: 'findBug',
        prompt: 'Which response to the fake text is unsafe?',
        lines: [
          'Open the banking app myself.',
          'Call the number on my card.',
          'Call the 0300 number in the text, since it looks official.',
        ],
        bug: 2,
        fix: 'Never use a number from the message.',
        explanation: 'It goes to the scammers.',
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the same about the safe response to a fake and a genuine text?',
        options: [
          { text: 'Click the link in both', why: 'Never needed.' },
          { text: 'Ignore the message\'s link and number; use your own channel' },
          { text: 'Reply to both', why: 'Use your own channel.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Order the response to any bank alert.',
        lines: ['Don\'t tap the link', 'Don\'t call the number in it', 'Open the app or call the card number', 'Check the alert there'],
      },
      {
        kind: 'mcq',
        prompt: 'What makes the genuine text "almost boring"?',
        options: [
          { text: 'It\'s long', why: 'It\'s calm and link-free.' },
          { text: 'It has no information', why: 'It informs without pressure.' },
          { text: 'Calm tone, no link, no pressure' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Look at a real message from your bank. Does it point you to your own channels?',
    starters: ['It says...', 'It points me to...'],
  },
  deepen: {
    title: 'Sender ID protection',
    summary: 'In the UK, a registry allows organisations to protect their text sender names so scammers can\'t easily copy them. It reduces spoofed texts, but doesn\'t eliminate them, so the rule still applies.',
  },
  notes: 'UK SMS SenderID Protection Registry (Mobile Ecosystem Forum), stated generally. Fake domain fictional. Priya per CAST.',
};

export default lesson;
