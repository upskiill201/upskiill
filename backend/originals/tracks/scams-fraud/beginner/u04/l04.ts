import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 4. Card deck: shopping and ticket scams. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Too cheap to be true',
  summary: 'Jayden finds concert tickets for a sold-out gig on social media: two for £140, "bank transfer only, I\'m selling for a mate". Three cards on shopping and ticket scams.',
  minutes: 10,
  outcomes: [
    'Spot online shopping and ticket scams',
    'Choose safer ways to pay',
    'Know your protections when paying by card',
  ],
  learn: [
    {
      kind: 'text',
      html: '<p><strong>Card 1: the signs.</strong> Prices well below normal, or tickets for sold-out events. Sellers on social media or marketplaces who push you to pay by bank transfer, "friends and family" payment, or gift cards. Pressure: "Three other people want them."</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>Card 2: pay the safer way.</strong> Bank transfers are like handing over cash: hard to get back. Paying by card, or through a platform\'s own checkout, usually gives you more protection. In the UK, credit card purchases between £100 and £30,000 have extra legal protection, and debit cards can often use a chargeback.</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>Card 3: check the seller.</strong> For tickets, use the official seller or a reputable resale platform with buyer protection. For shops, search the name plus "reviews" from sources you trust, check the website address carefully, and be wary of very new sites with huge discounts.</p>',
    },
    {
      kind: 'check',
      question: 'A seller will only accept bank transfer for £140 of tickets. What\'s the safest response?',
      options: ['Walk away, or buy through an official or protected platform', 'Pay by bank transfer quickly', 'Pay half by bank transfer'],
      answer: 0,
      explanation: 'Bank-transfer-only is a big warning sign, and gives you little protection.',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Too cheap, sold-out, social media, bank transfer only: walk away. Pay by card or protected checkout, and buy tickets from official or protected sellers.',
    },
  ],
  apply: {
    scenario: 'The concert tickets.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Warning sign, or safer?',
        groups: ['Warning sign', 'Safer'],
        items: [
          { text: '"Bank transfer only"', group: 0 },
          { text: 'Paying by card', group: 1 },
          { text: 'Tickets for a sold-out gig, cheap', group: 0 },
          { text: 'Official ticket seller', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why is a bank transfer riskier than paying by card?',
        options: [
          { text: 'It\'s slower', why: 'It\'s about getting money back.' },
          { text: 'It\'s much harder to get back if the seller is fake' },
          { text: 'It isn\'t', why: 'Cards usually have more protection.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'jayden',
        message: 'The seller has a real profile with photos and friends.',
        prompt: 'Grace\'s best reply?',
        options: [
          { text: 'Then it\'s safe.', why: 'Profiles can be fake or hacked.' },
          { text: 'Pay and hope.', why: 'Hope isn\'t protection.' },
          { text: 'Profiles can be hacked or faked. If they\'ll only take bank transfer, walk away.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Paying.',
        template: 'Bank transfers are like handing over [[1]]; cards usually give more [[2]].',
        blanks: [['cash'], ['protection']],
        distractors: ['gifts', 'points'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each payment to its typical protection.',
        pairs: [
          ['Bank transfer to a stranger', 'Very little'],
          ['Credit card, £100 to £30,000', 'Extra legal protection'],
          ['Gift cards', 'Almost none'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'In the UK, credit card purchases between £100 and how many pounds have extra legal protection?',
        answers: ['30000', '30,000', '£30,000', '£30000'],
        placeholder: 'A number',
      },
      {
        kind: 'findBug',
        prompt: 'Which step in buying tickets is risky?',
        lines: [
          'Check the official seller first.',
          'Use a resale platform with buyer protection.',
          'Pay a stranger on social media by bank transfer to beat other buyers.',
        ],
        bug: 2,
        fix: 'Only buy through protected routes.',
        explanation: 'Pressure plus bank transfer is the classic ticket scam.',
      },
      {
        kind: 'mcq',
        prompt: 'Why would a scammer ask for gift cards?',
        options: [
          { text: 'They\'re a gift', why: 'They\'re untraceable.' },
          { text: 'They\'re almost impossible to trace or reverse' },
          { text: 'It\'s normal for shops', why: 'Real shops don\'t ask for gift-card payment.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Order Jayden\'s ticket check.',
        lines: ['Notice "too cheap" and "bank transfer only"', 'Don\'t pay', 'Look on the official seller or a protected resale site', 'Report the fake listing'],
      },
      {
        kind: 'mcq',
        prompt: 'What does "three other people want them" try to do?',
        options: [
          { text: 'Help you', why: 'It\'s urgency.' },
          { text: 'Prove they\'re real', why: 'It\'s pressure.' },
          { text: 'Rush you past your checks' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'How do you usually pay for things online from people you don\'t know? Is it protected?',
    starters: ['I usually pay by...', 'It\'s / it\'s not protected because...'],
  },
  deepen: {
    title: 'Section 75',
    summary: 'In the UK, Section 75 of the Consumer Credit Act makes credit card providers jointly responsible for purchases between £100 and £30,000. Debit cards don\'t have Section 75, but banks can often help through a "chargeback" scheme.',
  },
  notes: 'Section 75 CCA 1974 (£100–£30,000). Chargeback: card scheme rules. No platforms named. Jayden per CAST.',
};

export default lesson;
