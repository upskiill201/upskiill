import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 4. Card deck: helping family without sinking. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Help family without sinking',
  summary: 'Her uncle wants ₦800,000. Her dad needs support. Her cousins need school fees. Miracle loves them all, and she can\'t say yes to everything. Three cards for giving generously and sustainably.',
  minutes: 10,
  outcomes: [
    'Set a family pot you can sustain',
    'Choose between a gift and a loan',
    'Say no kindly when you need to',
  ],
  learn: [
    {
      kind: 'text',
      html: '<p><strong>Card 1: a family pot.</strong> Miracle decides a fixed amount for family each month: ₦100,000, taken from her wants budget, not from saving. When a request comes, she checks the pot. Giving becomes a plan, not a crisis.</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>Card 2: gift, not loan, when you can.</strong> Money lent to family often isn\'t paid back, and that can hurt the relationship. Folake\'s rule: only give what you can afford never to see again, and call it a gift. If it comes back, it\'s a nice surprise.</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>Card 3: say what you <em>can</em> do.</strong> Instead of "no", say: "I can\'t do ₦800,000, but I can give ₦100,000 this month." Or offer help that isn\'t money: a call to the school, help with a budget, a job lead. Saying no to one request lets you keep saying yes to Dad every month.</p>',
    },
    {
      kind: 'check',
      question: 'Her uncle asks for ₦800,000. Her family pot is ₦100,000 a month. What fits Folake\'s rules?',
      options: ['Offer ₦100,000 as a gift', 'Lend ₦800,000 from her emergency fund', 'Ignore the message'],
      answer: 0,
      explanation: 'A gift within the pot, said warmly. The emergency fund stays safe.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'A fixed family pot, gifts rather than loans, and "here\'s what I can do". Generous and sustainable beats generous and broke.',
    },
  ],
  apply: {
    scenario: 'Family requests.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Where does Miracle\'s family pot come from?',
        options: [
          { text: 'Her emergency fund', why: 'That stays safe for emergencies.' },
          { text: 'Her wants budget, not her saving' },
          { text: 'Her pension', why: 'Pensions are for retirement.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Sustainable or sinking?',
        groups: ['Sustainable', 'Sinking'],
        items: [
          { text: 'A fixed monthly family pot', group: 0 },
          { text: 'Lending from the emergency fund', group: 1 },
          { text: '"Here\'s what I can do"', group: 0 },
          { text: 'Saying yes to every request', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'miracle',
        message: 'My uncle will be upset if I don\'t give him ₦800,000.',
        prompt: 'Folake\'s best reply?',
        options: [
          { text: 'Then give it all.', why: 'It would empty her emergency fund.' },
          { text: 'Block him.', why: 'Warm limits beat silence.' },
          { text: 'He might be, at first. Tell him warmly what you can do. Saying no to this is how you keep saying yes to your dad.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Folake\'s rule.',
        template: 'Only give what you can afford never to see [[1]], and call it a [[2]].',
        blanks: [['again'], ['gift']],
        distractors: ['twice', 'loan'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each request to a good response.',
        pairs: [
          ['Uncle: ₦800,000', '₦100,000 gift this month'],
          ['Cousin: school fees', 'Help plan and part-pay from the pot'],
          ['Friend: a loan for a party', 'A kind no'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'A ₦100,000 family pot every month. How much is that a year?',
        answers: ['1200000', '1,200,000', '₦1,200,000', '₦1200000'],
        placeholder: 'A number',
      },
      {
        kind: 'findBug',
        prompt: 'Which family plan will sink Miracle?',
        lines: [
          'Family pot: ₦100,000 a month from wants.',
          'Gifts, not loans.',
          'Any extra requests: take from the emergency fund.',
        ],
        bug: 2,
        fix: 'Extra requests wait for next month\'s pot.',
        explanation: 'An empty emergency fund leaves her one shock from debt.',
      },
      {
        kind: 'mcq',
        prompt: 'Why can lending to family hurt the relationship?',
        options: [
          { text: 'It never does', why: 'Unpaid loans often strain relationships.' },
          { text: 'If it isn\'t paid back, resentment grows on both sides' },
          { text: 'Banks forbid it', why: 'It\'s about the relationship.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Order how Miracle handles a request.',
        lines: ['Listen to the need', 'Check the family pot', 'Say what she can do', 'Give it as a gift'],
      },
      {
        kind: 'mcq',
        prompt: 'Which help isn\'t money?',
        options: [
          { text: 'A bank transfer', why: 'That\'s money.' },
          { text: 'A loan', why: 'That\'s money.' },
          { text: 'Calling the school to ask about a payment plan' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Who do you support, or expect to support? What would a fixed, sustainable amount look like?',
    starters: ['I support...', 'A sustainable amount would be...'],
  },
  deepen: {
    title: 'Black tax',
    summary: '"Black tax" is a term used across many African countries for the expectation that people who earn more will support extended family. It comes from love and real need. Planning it, rather than reacting to it, protects both the giver and the family.',
  },
  notes: 'Family pot ₦100,000 from wants (₦365,000 → ₦265,000); saving unchanged at ₦355,000. Uncle: narrated. "Black tax": widely used term.',
};

export default lesson;
