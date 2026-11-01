import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 4. Card deck: liquidity risk. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Can you get it back when you need it?',
  summary: 'Appa once had money in a chit fund that took two years to pay out. Arjun remembers the stress at home. Three cards on liquidity risk: the risk of not being able to turn something into cash when you need it.',
  minutes: 10,
  outcomes: [
    'Explain liquidity risk',
    'Spot lock-ins, slow sales and penalties',
    'Keep enough money liquid for real life',
  ],
  learn: [
    {
      kind: 'text',
      html: '<p><strong>Card 1: what liquidity means.</strong> Liquidity is how fast you can turn something into cash without losing much value. A savings account: today. Widely traded shares: a few days, at that day\'s price. Land: months or years, if a buyer appears. Some schemes: only when they decide.</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>Card 2: the hidden cost of hurry.</strong> If you must sell something illiquid fast, you often sell cheap. A plot worth ₹10 lakh might go for ₹7 lakh to a buyer who knows you\'re desperate. Early withdrawals from locked deposits often carry penalties.</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>Card 3: keep life liquid.</strong> Before locking anything away, keep enough in easy-to-reach places for emergencies and known costs. Then lock away only what you\'re sure you won\'t need until the lock ends. Appa\'s chit fund wasn\'t a disaster because it failed; it was stressful because the family needed the money first.</p>',
    },
    {
      kind: 'check',
      question: 'Which is the most liquid?',
      options: ['A savings account', 'A plot of land', 'A 5-year locked scheme'],
      answer: 0,
      explanation: 'A savings account can be cash today.',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Keep life liquid first. Lock away only money you\'re sure you won\'t need until the lock ends. Forced sales are usually cheap sales.',
    },
  ],
  apply: {
    scenario: 'Liquidity.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order from most liquid to least.',
        lines: ['Savings account', 'Widely traded shares', 'Fixed deposit with a penalty', 'Land'],
      },
      {
        kind: 'mcq',
        prompt: 'Why do forced sales of illiquid things usually go cheap?',
        options: [
          { text: 'The law requires a discount', why: 'It\'s about bargaining power.' },
          { text: 'Buyers know you\'re in a hurry, and there are few of them' },
          { text: 'They don\'t', why: 'Hurry usually costs money.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'A plot worth ₹10 lakh sells for ₹7 lakh in a hurry. How much is lost, in lakh?',
        answers: ['3', '3 lakh', 'three', '300000', '3,00,000'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Liquid or illiquid?',
        groups: ['Liquid', 'Illiquid'],
        items: [
          { text: 'Savings account', group: 0 },
          { text: 'A scheme that pays out "when we decide"', group: 1 },
          { text: 'Cash in a current account', group: 0 },
          { text: 'A share in a family business', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'joel',
        message: 'The scheme has a 1-year lock-in, but the return is so good.',
        prompt: 'Arjun\'s best reply?',
        options: [
          { text: 'Lock-ins don\'t matter.', why: 'They matter when life happens.' },
          { text: 'Lock in your savings too.', why: 'Then nothing\'s liquid.' },
          { text: 'A lock-in means you can\'t get out if something goes wrong, with them or with you. That\'s a big risk on top of everything else.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Liquidity.',
        template: 'How fast you can turn something into [[1]] without losing much [[2]].',
        blanks: [['cash'], ['value']],
        distractors: ['debt', 'time'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each thing to how fast it becomes cash.',
        pairs: [
          ['Savings account', 'Today'],
          ['Widely traded shares', 'A few days'],
          ['Land', 'Months or years'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which plan ignores liquidity?',
        lines: [
          'Keep emergency money in a savings account.',
          'Lock away only money I won\'t need for years.',
          'Lock everything into the highest-paying 5-year deposit.',
        ],
        bug: 2,
        fix: 'Keep enough liquid first; lock away only the rest.',
        explanation: 'With everything locked, any emergency means penalties or debt.',
      },
      {
        kind: 'mcq',
        prompt: 'Why was Appa\'s chit fund stressful?',
        options: [
          { text: 'It failed completely', why: 'It paid out, just too late.' },
          { text: 'The family needed the money before it paid out' },
          { text: 'It paid too much', why: 'It was about timing.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        prompt: 'What should come before locking money away?',
        options: [
          { text: 'Nothing', why: 'Liquid money comes first.' },
          { text: 'A loan', why: 'Debt adds risk.' },
          { text: 'Enough liquid money for emergencies and known costs' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'If you needed a large sum next week, how much could you reach without penalties or selling cheap?',
    starters: ['I could reach...', 'That feels...'],
  },
  deepen: {
    title: 'Chit funds',
    summary: 'Chit funds are a traditional savings-and-borrowing arrangement in parts of India. Registered chit funds operate under the Chit Funds Act; unregistered ones carry extra risk. Like any arrangement, check the timing of payouts against when you might need the money.',
  },
  notes: 'Chit Funds Act 1982 (general). Appa narrated. Liquidity ordering general.',
};

export default lesson;
