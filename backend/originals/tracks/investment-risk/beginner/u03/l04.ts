import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 4. Card deck: emergency fund first. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'The fund that makes risk possible',
  summary: 'Mr Rao\'s late payment taught Arjun something: without safe money, any investment can be forced into a sale at the worst time. Three cards on the emergency fund, the foundation for everything else.',
  minutes: 10,
  outcomes: [
    'Explain why an emergency fund comes before investing',
    'Size one for steady or uneven income',
    'Know where to keep it and when to use it',
  ],
  learn: [
    {
      kind: 'text',
      html: '<p><strong>Card 1: why first.</strong> Without safe money, a late client, a medical bill or a lost contract forces you to sell investments, maybe in a fall, or borrow. The emergency fund is what lets your other money take risk calmly.</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>Card 2: how big.</strong> A common guide is three to six months of essential costs. With steady pay, nearer three can work. With uneven income, like Arjun\'s freelancing, nearer six is safer. Arjun\'s costs are ₹60,000 a month, so he aims for ₹3.6 lakh.</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>Card 3: where and when.</strong> Somewhere safe and reachable within a day or two, not invested, not locked. Use it for real emergencies: lost income, health, urgent repairs. Not for sales or holidays. When you use it, refill it before investing more.</p>',
    },
    {
      kind: 'check',
      question: 'Arjun\'s costs are ₹60,000 a month and his income is uneven. Which target fits best?',
      options: ['About six months: ₹3.6 lakh', 'One week: ₹15,000', 'Two years: ₹14.4 lakh'],
      answer: 0,
      explanation: 'Uneven income points to the higher end of three to six months.',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Three to six months of essential costs, nearer six if your income is uneven. Safe, reachable, used only for real emergencies, refilled first.',
    },
  ],
  apply: {
    scenario: 'Emergency fund first.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What does an emergency fund let your other money do?',
        options: [
          { text: 'Grow faster by itself', why: 'It protects; it doesn\'t speed growth.' },
          { text: 'Take risk calmly, without being forced to sell' },
          { text: 'Avoid tax', why: 'It\'s about protection.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Joel\'s costs are ₹30,000 a month; he wants four months. How much?',
        answers: ['120000', '1,20,000', '120,000', '₹1,20,000'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Real emergency, or not?',
        groups: ['Real emergency', 'Not an emergency'],
        items: [
          { text: 'A client paying three months late', group: 0 },
          { text: 'A festival sale on phones', group: 1 },
          { text: 'An urgent medical bill', group: 0 },
          { text: 'A friend\'s "sure thing" tip', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'kavya',
        message: 'An emergency fund just sits there doing nothing.',
        prompt: 'Arjun\'s best reply?',
        options: [
          { text: 'True, invest it.', why: 'Then it might be down when needed.' },
          { text: 'Spend it.', why: 'It\'s for emergencies.' },
          { text: 'It\'s doing the most important job: making sure nothing forces you to sell or borrow.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Sizing.',
        template: 'Three to [[1]] months of essential costs, nearer six if income is [[2]].',
        blanks: [['six'], ['uneven']],
        distractors: ['twelve', 'steady'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each situation to a sensible fund size.',
        pairs: [
          ['Steady salary, no dependants', 'Nearer three months'],
          ['Freelance, uneven income', 'Nearer six months'],
          ['Single income, family depending on it', 'Toward the higher end'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which rule is wrong?',
        lines: [
          'Keep it safe and reachable.',
          'Use it for real emergencies.',
          'After using it, invest more before refilling.',
        ],
        bug: 2,
        fix: 'Refill it before investing more.',
        explanation: 'An empty fund leaves you exposed to the next shock.',
      },
      {
        kind: 'mcq',
        prompt: 'Where should the emergency fund be kept?',
        options: [
          { text: 'In a 5-year locked scheme', why: 'Not reachable.' },
          { text: 'Somewhere safe, reachable in a day or two' },
          { text: 'In one coin', why: 'Not safe.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Order Arjun\'s priorities.',
        lines: ['Set aside Appa\'s operation', 'Build the emergency fund', 'Then think about investing'],
      },
      {
        kind: 'mcq',
        prompt: 'What did Mr Rao\'s late payment show Arjun?',
        options: [
          { text: 'Clients always pay on time', why: 'He paid late.' },
          { text: 'He should invest everything', why: 'The opposite.' },
          { text: 'Without safe money, a late client could force a bad sale' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'How many months of essential costs could you cover today? What target fits your income?',
    starters: ['Today I could cover...', 'My target is...'],
  },
  deepen: {
    title: 'Essential costs',
    summary: 'Size the fund on essential costs (rent, food, bills, transport, loan repayments), not on everything you spend. In an emergency, extras can pause.',
  },
  notes: '3–6 months is a common guide. Arjun EF ₹3.6L. Mr Rao narrated.',
};

export default lesson;
