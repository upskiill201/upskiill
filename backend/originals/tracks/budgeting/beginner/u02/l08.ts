import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 8. Myth or Fact: "cheap is always better". */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Is cheap always better?',
  summary: 'Kofi buys GH₵1 sachets of washing powder every few days. Efua buys one bag a month. Who pays more? Five money myths about "cheap", tested.',
  minutes: 11,
  outcomes: [
    'Compare prices per unit, not per pack',
    'Know when the cheapest option costs more',
    'Buy in bulk only when it makes sense',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'The cheapest price on the shelf always saves you the most money.',
          isFact: false,
          explain: 'Myth. Small packs often cost more per gram or per use. GH₵1 sachets can cost far more per wash than one bigger bag.',
        },
        {
          text: 'Buying bigger packs is usually cheaper per unit.',
          isFact: true,
          explain: 'Fact, usually, if you\'ll actually use it all before it goes off and can afford the bigger payment. Sharing a big bag with roommates fixes the "can afford" part.',
        },
        {
          text: 'People with less money often pay more for the same things.',
          isFact: true,
          explain: 'Fact. Economists call it the "poverty premium": buying in small amounts, paying fees on small cash-outs and paying for fast loans all cost more over time. Planning and sharing beat it.',
        },
        {
          text: 'Cheap shoes are always the smart choice when you\'re broke.',
          isFact: false,
          explain: 'Myth, sometimes. Shoes that fall apart in a month and need replacing three times cost more than one decent pair. Think "cost per use".',
        },
        {
          text: 'Comparing price per unit takes a calculator and lots of time.',
          isFact: false,
          explain: 'Myth. Divide the price by the amount: GH₵1 for 30 g is about 3.3 pesewas a gram; GH₵18 for 1 kg is 1.8 pesewas a gram. Ten seconds, phone calculator.',
        },
      ],
    },
    {
      kind: 'story',
      title: 'The washing powder audit',
      beats: [
        { speaker: 'efua', text: 'How many sachets did you buy this month?' },
        { speaker: 'kofi', text: 'About twenty. GH₵1 each. Cheap!' },
        { speaker: 'efua', text: 'Twenty sachets is 600 grams for GH₵20. My 1 kg bag is GH₵18 and lasts me a month and a half.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Compare price per unit, not price per pack: price ÷ amount. And for things that wear out, think cost per use.',
    },
  ],
  apply: {
    scenario: 'Cheap vs good value.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Myth', 'Fact'],
        items: [
          { text: 'The cheapest pack always saves most', group: 0 },
          { text: 'Small packs often cost more per unit', group: 1 },
          { text: 'People with less money often pay more for the same things', group: 1 },
          { text: 'Per-unit maths needs lots of time', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Kofi\'s sachets: 20 × 30 g for GH₵20. Efua\'s bag: 1,000 g for GH₵18. Which is cheaper per gram?',
        options: [
          { text: 'Kofi\'s sachets', why: 'GH₵20 for 600 g is about 3.3 pesewas a gram. The bag is about 1.8.' },
          { text: 'Efua\'s bag' },
          { text: 'They\'re the same', why: 'Kofi pays almost twice as much per gram.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: '20 sachets of 30 g each. How many grams is that?',
        answers: ['600', '600g', '600 g', '600 grams'],
        placeholder: 'A number',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the idea to its meaning.',
        pairs: [
          ['Price per unit', 'Price divided by amount'],
          ['Cost per use', 'Price divided by times used'],
          ['Poverty premium', 'Paying more for being short'],
          ['Buying in bulk', 'Bigger pack, often cheaper per unit'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'kofi',
        message: 'But I can\'t afford GH₵18 at once. That\'s why I buy sachets.',
        prompt: 'Efua\'s best reply?',
        options: [
          { text: 'Then keep buying sachets forever.', why: 'That keeps him paying the premium.' },
          { text: 'Just find GH₵18 somehow.', why: 'Easier said than done on GH₵63.' },
          { text: 'Split it with me and Yaw. GH₵6 each, and we all pay the bag price.' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        prompt: 'Shoes: GH₵60 pair lasts 2 months. GH₵150 pair lasts 10 months. Which costs less per month?',
        options: [
          { text: 'The GH₵150 pair, at GH₵15 a month' },
          { text: 'The GH₵60 pair, at GH₵30 a month', why: '60 ÷ 2 = 30 a month. That\'s double.' },
          { text: 'Same', why: '30 vs 15 a month.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The comparison rule.',
        template: 'Compare price per [[1]], not price per [[2]].',
        blanks: [['unit'], ['pack']],
        distractors: ['day', 'shop'],
      },
      {
        kind: 'findBug',
        prompt: 'Which "bulk buy" is a mistake?',
        lines: [
          'A big bag of rice shared by three roommates.',
          'A 1 kg bag of washing powder.',
          'A crate of 30 eggs for one person, with no fridge.',
        ],
        bug: 2,
        fix: 'Buy a few eggs at a time, or share the crate.',
        explanation: 'Bulk only saves money if you use it all before it goes off.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'A 1 kg bag split three ways costs GH₵18. What does each person pay?',
        answers: ['6', 'GH₵6', '6 cedis'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the best way to beat the poverty premium on a small budget?',
        options: [
          { text: 'Plan ahead and share bulk buys with people you trust' },
          { text: 'Always buy the smallest size', why: 'That\'s exactly how the premium is paid.' },
          { text: 'Take a loan to buy in bulk', why: 'The loan costs more than the bulk saving.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'What do you buy in small amounts often? Work out the price per unit against a bigger size. Who could you share with?',
    starters: ['I often buy small...', 'Per unit it costs...', 'I could share with...'],
  },
  deepen: {
    title: 'The poverty premium',
    summary: 'Researchers and charities in many countries have shown that lower-income households pay more for the same essentials: through small pack sizes, fees, higher-cost credit and less access to bulk prices. Sharing, planning and avoiding fast loans are the main ways round it.',
  },
  notes: 'Illustrative prices (fictional): sachet GH₵1 / 30 g; 1 kg bag GH₵18. 20 × 30 = 600 g → 3.33 p/g; bag 1.8 p/g. Poverty premium: e.g. UK research by Bristol University Personal Finance Research Centre (Davies, Finney & Hartfree, 2016); concept widely documented; stated qualitatively.',
};

export default lesson;
