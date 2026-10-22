import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 1. Story: "I'd pay more". */
const lesson: OriginalLesson = {
  key: 'l01',
  title: '"I\'d pay more"',
  summary: 'Clinton asks Brenda, his most loyal regular, whether 1,500 FCFA feels fair. Her answer stops him: "It\'s cheaper than Mama Rose, and you carry it. I\'d pay more."',
  minutes: 11,
  outcomes: [
    'See that cost is only half of a price',
    'Compare your price with what customers pay elsewhere',
    'Notice when you\'re cheaper and better at the same time',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Cheaper and better',
      beats: [
        { speaker: 'narrator', text: 'Sunday evening. Clinton hands Brenda her clean bag on the third floor of her hostel.' },
        { speaker: 'clinton', text: 'Honest question: is 1,500 a fair price?' },
        { speaker: 'narrator', text: 'Brenda laughs. "Clinton, Mama Rose charges 2,400 for a basket, and I have to carry it down the hill and back up. Yours comes to my door. I\'d pay more to never carry that basket again."' },
        { speaker: 'clinton', text: 'Wait. I\'m cheaper than Mama Rose AND I do more?' },
        { speaker: 'david', text: 'Mama Rose gives you a bulk rate of 1,000 a bag. Students pay her 2,400. You set your price from your cost, not from what it\'s worth to them.' },
        { speaker: 'tey', text: 'That\'s this chapter: cost tells you the lowest you can charge. Value tells you what you could charge. The best price is somewhere between them.' },
      ],
      choice: {
        prompt: 'What should Clinton do with Brenda\'s comment?',
        options: [
          { text: 'Find out what WashDay is worth to students like her: what they pay and give up today.', outcome: 'Right. One regular\'s comment is a lead. The value to many customers sets the price.', best: true },
          { text: 'Raise the price to 2,400 tomorrow.', outcome: 'Brenda is a keen regular. Others may feel differently. Measure the value first.' },
          { text: 'Ignore it: she\'s just being nice.', outcome: 'She compared real prices she pays. That\'s evidence, not politeness.' },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Cost sets the floor. Value sets the ceiling. The price lives in between.',
    },
  ],
  apply: {
    scenario: 'Brenda\'s comparison.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: 'Students pay Mama Rose 2,400 FCFA a basket. WashDay charges 1,500. How much cheaper is WashDay, in FCFA?',
        answers: ['900'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why is Clinton\'s price so much lower than Mama Rose\'s?',
        options: [
          { text: 'His service is worse', why: 'It collects and delivers: it does more.' },
          { text: 'Students can\'t pay more', why: 'They already pay her 2,400.' },
          { text: 'He set it from his own cost (her bulk rate), not from what students pay or value' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Does Mama Rose\'s stand or WashDay do this?',
        groups: ['Mama Rose\'s stand', 'WashDay'],
        items: [
          { text: 'Collects from your room', group: 1 },
          { text: 'You carry the basket up the hill', group: 0 },
          { text: '2,400 FCFA a basket', group: 0 },
          { text: 'Back by Sunday evening', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the number to what it is.',
        pairs: [
          ['1,000 FCFA', 'Mama Rose\'s bulk rate to Clinton'],
          ['1,500 FCFA', 'What WashDay charges'],
          ['2,400 FCFA', 'What students pay at the stand'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'clinton',
        message: 'Brenda says she\'d pay more. Does that mean everyone will?',
        prompt: "Miracle's best reply?",
        options: [
          { text: 'Yes, everyone thinks like Brenda.', why: 'One regular isn\'t the whole market.' },
          { text: 'Not necessarily. Brenda is your keenest regular. Find out what the service is worth to most students, then test a price.' },
          { text: 'No, nobody else will.', why: 'Many already pay Mama Rose 2,400.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Floor and ceiling.',
        template: 'Cost sets the [[1]]. Value sets the [[2]].',
        blanks: [['floor'], ['ceiling']],
        distractors: ['price', 'logo'],
      },
      {
        kind: 'mcq',
        prompt: 'WashDay bags hold up to 12 items, like a basket. Per item, what does 1,500 FCFA work out to?',
        options: [
          { text: '200 FCFA an item', why: 'That\'s Mama Rose\'s price per item.' },
          { text: '1,500 FCFA an item', why: 'That\'s per bag of 12.' },
          { text: '125 FCFA an item' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Clinton\'s old pricing logic is the problem?',
        lines: [
          'Mama Rose charges me 1,000 a bag.',
          'I add 500 for my work.',
          'So 1,500 is the right price.',
          'Students pay her 2,400 at the stand.',
        ],
        bug: 2,
        fix: 'So 1,500 is my cost-based price; check what it\'s worth to students.',
        explanation: 'Cost-plus ignores what customers already pay elsewhere.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Mama Rose charges 200 FCFA an item. What does a basket of 12 items cost at the stand, in FCFA?',
        answers: ['2400', '2,400'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order these from lowest to highest.',
        lines: ['Clinton\'s cost per bag (1,125)', 'WashDay\'s price (1,500)', 'Mama Rose\'s basket (2,400)'],
      },
    ],
  },
  reflect: {
    prompt: 'What do your customers pay elsewhere for something similar? Are you cheaper, the same, or more expensive, and does your offer do more?',
    starters: ['Elsewhere they pay...', 'Mine does...'],
  },
  deepen: {
    title: 'Underpricing hides in plain sight',
    summary: 'If customers say "that\'s cheap!" without being asked, or never compare you with anything, your price may be leaving money on the table. Brenda\'s comment is a classic sign.',
  },
  notes: 'Fictional: Mama Rose retail 200 FCFA/item, 2,400/basket of 12; bulk rate to WashDay 1,000/bag; WashDay 1,500/bag of up to 12 items (125/item).',
};

export default lesson;
