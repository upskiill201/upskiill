import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 1. Story: Auntie Bih's price. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'Auntie Bih\'s price',
  summary: 'Rainy-season Saturdays now bring 30 bags, and Mama Rose stops at 25. Her sister, Auntie Bih, will wash the rest, for 1,100 FCFA a bag. At 1,500, those bags barely pay. The price has to rise.',
  minutes: 11,
  outcomes: [
    'See how a rising cost forces a price decision',
    'Work out the margin on the more expensive supplier',
    'Name the risks of raising a price',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Thirty bags',
      beats: [
        { speaker: 'narrator', text: 'Thirty bags booked for Saturday. Mama Rose can wash 25. "Ask my sister," she says. "Bih washes well, but she won\'t do it for my price."' },
        { speaker: 'narrator', text: 'Auntie Bih: 1,100 FCFA a bag, paid when Clinton collects the clean bags.' },
        { speaker: 'david', text: 'At 1,500, a Bih bag costs you 1,225 and leaves 275. At 1,800, it leaves 575.' },
        { speaker: 'clinton', text: 'So I have to switch to the new prices. But what if the regulars leave? And three friends just asked for "a small discount".' },
        { speaker: 'miracle', text: 'Then this chapter is for you: what discounts really cost, how to raise a price without losing your best customers, and how to test it first.' },
        { speaker: 'tey', text: 'Raising prices is scary because it feels personal. Done well, with notice, reasons and a test, most good customers stay.' },
      ],
      choice: {
        prompt: 'What should Clinton do about the price?',
        options: [
          { text: 'Plan the rise to the new price card: test it, give notice, look after regulars.', outcome: 'Right. That\'s exactly this chapter.', best: true },
          { text: 'Keep 1,500 and use only Mama Rose.', outcome: 'Then he turns away 5 bags every Saturday, and still earns under the library rate.' },
          { text: 'Switch everyone to 1,800 tonight, without telling anyone.', outcome: 'A surprise rise is the fastest way to lose regulars.' },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'When costs rise, the price has to follow, or the margin quietly disappears.',
    },
  ],
  apply: {
    scenario: 'Thirty bags.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: 'Thirty bags booked, Mama Rose washes 25. How many go to Auntie Bih?',
        answers: ['5', 'five'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'A Bih bag costs 1,100 + 50 + 30 + 45. What is the full cost?',
        options: [
          { text: '1,225 FCFA' },
          { text: '1,125 FCFA', why: 'That\'s a Mama Rose bag.' },
          { text: '1,100 FCFA', why: 'Add the bag, fees and running costs.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'At 1,500, what margin does a Bih bag (cost 1,225) leave, in FCFA?',
        answers: ['275'],
        placeholder: 'A number',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the washer and price to the margin.',
        pairs: [
          ['Mama Rose bag at 1,500', '375'],
          ['Bih bag at 1,500', '275'],
          ['Mama Rose bag at 1,800', '675'],
          ['Bih bag at 1,800', '575'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'A risk of raising the price, or a reason to do it?',
        groups: ['Risk', 'Reason'],
        items: [
          { text: 'Some regulars may leave', group: 0 },
          { text: 'Bih bags barely pay at 1,500', group: 1 },
          { text: 'Friends may feel it\'s unfair', group: 0 },
          { text: 'Clinton earns under the library rate', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'clinton',
        message: 'Raising prices feels mean. These are my friends.',
        prompt: "Miracle's best reply?",
        options: [
          { text: 'Running at a loss isn\'t kind either: it ends with no WashDay at all. A fair price, explained honestly, is how you keep serving them.' },
          { text: 'Then never raise prices.', why: 'Then the second washer can\'t be paid.' },
          { text: 'Raise it secretly.', why: 'Secret rises break trust.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Costs and prices.',
        template: 'When costs [[1]], the price has to follow, or the [[2]] disappears.',
        blanks: [['rise'], ['margin']],
        distractors: ['fall', 'logo'],
      },
      {
        kind: 'mcq',
        prompt: 'What does Clinton lose if he keeps 1,500 and turns away 5 bags each Saturday?',
        options: [
          { text: 'Those customers, who may go elsewhere and not come back' },
          { text: 'Nothing', why: 'Turned-away customers often don\'t return.' },
          { text: 'Mama Rose', why: 'She stays; the customers might not.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Clinton\'s plan will lose regulars fastest?',
        lines: [
          'Test the new prices in one hostel first.',
          'Tell regulars two weeks ahead.',
          'Raise everyone\'s price tonight without telling them.',
          'Offer regulars the Saturday Plan.',
        ],
        bug: 2,
        fix: 'Give notice and explain why.',
        explanation: 'Surprise price rises feel like a betrayal.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order the price-rise plan, as this chapter teaches it.',
        lines: ['Know what discounts and deals really cost', 'Test the new price on one hostel', 'Give notice and reasons', 'Look after regulars', 'Switch, then check results'],
      },
    ],
  },
  reflect: {
    prompt: 'Has a cost of yours gone up recently? Did your price follow? What happened to your margin?',
    starters: ['My cost went up...', 'My margin...'],
  },
  deepen: {
    title: 'Margins leak quietly',
    summary: 'Rising supplier prices, fees and fuel slowly eat margins if prices never move. Many small businesses review prices once a year at least for this reason (Chapter 5).',
  },
  notes: 'Fictional: Saturday demand 30 bags; Mama Rose capacity 25; Auntie Bih 1,100 FCFA/bag; Bih bag full cost 1,225 (margin 275 at 1,500, 575 at 1,800); Mama Rose bag margins 375 / 675.',
};

export default lesson;
