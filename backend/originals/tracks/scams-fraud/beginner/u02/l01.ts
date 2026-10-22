import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 1. Story with a choice: the withdrawal fee. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'The withdrawal fee',
  summary: 'Femi\'s £500 now shows £2,600 on the platform. He tries to withdraw it. A message pops up: pay a £400 "tax release fee" first. His mentor says it\'s normal. What should he do?',
  minutes: 12,
  outcomes: [
    'Recognise the withdrawal-fee trap',
    'Stop sending money once a scam is suspected',
    'Know the first steps after an investment scam',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Thursday',
      beats: [
        { speaker: 'femi', text: 'It\'s at £2,600! I\'m taking some out for my mum\'s birthday.' },
        { speaker: 'narrator', text: 'The screen: "Withdrawal pending. To release funds, a 15% tax release fee (£400) must be paid by bank transfer within 24 hours."' },
        { speaker: 'narrator', text: 'His mentor on Instagram: "Totally normal bro, everyone pays it. After that it\'s instant. Don\'t lose your profits now."' },
        { speaker: 'grace', text: 'Femi. When did a real bank ever ask you to pay money to get your own money?' },
        { speaker: 'tey', text: 'The £2,600 is a number on a screen the scammers control. What should Femi do?' },
      ],
      choice: {
        prompt: 'What should Femi do?',
        options: [
          { text: 'Pay the £400; it\'s worth it to unlock £2,600.', outcome: 'There is no £2,600. After the £400 there\'s usually another fee: "anti-money-laundering check", "account upgrade". Each payment is just more loss.' },
          { text: 'Stop. Send nothing more, tell his bank straight away, report it, and keep every message and screenshot.', outcome: 'Yes. The £500 may be gone, but he stops it becoming £900, or £5,000. And reporting may help stop others being drawn in.', best: true },
          { text: 'Invest another £1,000 to reach "VIP level", where withdrawals are free.', outcome: '"VIP level" is the same trap with a bigger number. Fake platforms invent new tiers to take more.' },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'warning',
      text: 'If you have to pay to withdraw your own money, it\'s a scam. The "profit" on screen is just a number they type. Stop paying, tell your bank, report it.',
    },
  ],
  apply: {
    scenario: 'The withdrawal fee.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What is the "£2,600" on Femi\'s screen?',
        options: [
          { text: 'Real money he owns', why: 'It\'s never been invested.' },
          { text: 'A number on a fake dashboard the scammers control' },
          { text: 'A tax refund', why: 'It\'s a fake balance.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Trap or right move?',
        groups: ['Trap', 'Right move'],
        items: [
          { text: 'Paying the "tax release fee"', group: 0 },
          { text: 'Telling his bank straight away', group: 1 },
          { text: 'Upgrading to "VIP"', group: 0 },
          { text: 'Keeping all screenshots', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'femi',
        message: 'But what if it\'s real and I lose £2,600 by not paying?',
        prompt: 'Grace\'s best reply?',
        options: [
          { text: 'Pay half and see.', why: 'Any payment feeds the trap.' },
          { text: 'You\'re right, pay it.', why: 'Classic withdrawal-fee scam.' },
          { text: 'Real platforms take fees from your balance, not by making you send new money. This is the trap. Stop now.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Femi put in £500. If he paid the £400 fee too, how much would he have lost?',
        answers: ['900', '£900'],
        placeholder: 'A number',
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'If you have to [[1]] to withdraw your own money, it\'s a [[2]].',
        blanks: [['pay'], ['scam']],
        distractors: ['wait', 'bonus'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each trick to its purpose.',
        pairs: [
          ['Fake growing balance', 'Builds excitement and trust'],
          ['"Tax release fee"', 'Takes more money'],
          ['"VIP level"', 'Takes even more'],
          ['"Within 24 hours"', 'Creates urgency'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which step after the scam is wrong?',
        lines: [
          'Tell my bank straight away.',
          'Report it.',
          'Message the mentor to ask for a refund.',
        ],
        bug: 2,
        fix: 'Stop contact; keep evidence; let the bank and police act.',
        explanation: 'Contacting the scammer gives them another chance to manipulate you.',
      },
      {
        kind: 'mcq',
        prompt: 'Why tell his bank straight away?',
        options: [
          { text: 'The sooner they know, the better the chance of stopping or tracing payments' },
          { text: 'To get a loan', why: 'It\'s about stopping the money.' },
          { text: 'It\'s pointless', why: 'Speed can help.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'How do genuine investment platforms usually take fees?',
        options: [
          { text: 'By demanding a release fee', why: 'That\'s the scam.' },
          { text: 'They never charge anything', why: 'They charge disclosed fees.' },
          { text: 'From your balance, as disclosed fees, not by demanding new transfers to release funds' },
        ],
        answer: 2,
      },
      {
        kind: 'orderLines',
        prompt: 'Order Femi\'s next hour.',
        lines: ['Stop: send nothing more', 'Call his bank', 'Screenshot everything', 'Report it', 'Tell someone he trusts'],
      },
    ],
  },
  reflect: {
    prompt: 'Have you ever been asked to pay a fee to receive money: a prize, a refund, a payout? What happened?',
    starters: ['I was asked...', 'It turned out...'],
  },
  deepen: {
    title: 'Advance-fee fraud',
    summary: 'Paying a fee to release money you\'re owed is one of the oldest scams there is, from 1990s "Nigerian prince" emails to today\'s fake crypto platforms. The shape is the same: a big promised amount, and a small fee first.',
  },
  notes: 'Withdrawal-fee/upgrade traps: standard FCA/Action Fraud warnings on fake trading platforms. Femi per CAST. No platforms named.',
};

export default lesson;
