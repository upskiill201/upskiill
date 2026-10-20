import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 8. Myth or Fact: options myths. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Options myths',
  summary: 'Clinton is having fun with options: scented bags, folding, a "Weekend Warrior" plan, a midnight express. David reins him in with what research says about choice. Fact or myth?',
  minutes: 11,
  outcomes: [
    'Know when more options stop helping',
    'Understand why the middle option is popular',
    'Keep every option earning its place',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'More choice is always better for customers.',
          isFact: false,
          explain: 'Myth. In a famous jam-tasting study, shoppers offered 24 flavours were far less likely to buy than those offered 6. Later studies find the effect varies, but too many options can stall a decision.',
        },
        {
          text: 'With three options, many people choose the middle one.',
          isFact: true,
          explain: 'Fact. Researchers call it the compromise effect: the middle feels safe. For WashDay, that\'s Standard.',
        },
        {
          text: 'Customers always pick the cheapest option.',
          isFact: false,
          explain: 'Myth. Saver means carrying your own bag. Most students happily pay more not to.',
        },
        {
          text: 'Every option should earn its place: a real need and a positive margin.',
          isFact: true,
          explain: 'Fact. An option nobody needs adds confusion; one that loses money adds losses.',
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Three clear tiers plus a couple of extras is plenty for most small businesses.',
    },
  ],
  apply: {
    scenario: 'How many options?',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Myth', 'Fact'],
        items: [
          { text: 'More choice is always better', group: 0 },
          { text: 'The middle option is often chosen', group: 1 },
          { text: 'People always pick the cheapest', group: 0 },
          { text: 'Each option needs a need and a margin', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'In the jam study, which display led to more purchases?',
        options: [
          { text: 'The one with 6 flavours' },
          { text: 'The one with 24 flavours', why: 'More people stopped there, but fewer bought.' },
          { text: 'They were the same', why: 'The smaller display sold more.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'clinton',
        message: 'What about a scented-bag option? It sounds premium.',
        prompt: "David's best reply?",
        options: [
          { text: 'Has anyone asked for it? If not, it\'s one more thing to explain and stock. Keep options that match real requests.' },
          { text: 'Yes, add everything premium.', why: 'Unrequested options add confusion.' },
          { text: 'Make scented the only option.', why: 'That removes the options people asked for.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the idea to its name.',
        pairs: [
          ['Too many options, fewer decisions', 'Choice overload'],
          ['Picking the middle', 'Compromise effect'],
          ['A worse option that boosts another', 'Decoy'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Every option needs a real [[1]] and a positive [[2]].',
        blanks: [['need'], ['margin']],
        distractors: ['logo', 'discount'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'In the jam study, shoppers saw either 24 flavours or how many?',
        answers: ['6', 'six'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why might "midnight express" be a poor option for WashDay?',
        options: [
          { text: 'Nobody asked for it, and Mama Rose doesn\'t wash at midnight' },
          { text: 'It\'s too cheap', why: 'The problem is need and cost, not price.' },
          { text: 'Midnight is too early', why: 'It\'s about need and whether it can be delivered.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Clinton\'s option list should go?',
        lines: [
          'Saver, Standard, Express (asked for by students).',
          'Hill zone fee (covers a real cost).',
          'Ironing (regulars already pay for it).',
          'Scented bags, folding, midnight express and a VIP plan (nobody asked).',
        ],
        bug: 3,
        fix: 'Drop them until customers ask.',
        explanation: 'Unrequested options add confusion and cost.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order the check for a new option.',
        lines: ['Did a customer ask for it?', 'Can we actually deliver it?', 'What does it cost us?', 'Does it earn a margin?'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Keep the option, or drop it?',
        groups: ['Keep', 'Drop'],
        items: [
          { text: 'Express: third-years asked, margin 1,075', group: 0 },
          { text: 'Scented bags: nobody asked', group: 1 },
          { text: 'Saver: Esther asked, margin 275', group: 0 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'How many options do you offer? Which one would you drop, and which would you keep?',
    starters: ['I offer...', 'I\'d drop...'],
  },
  deepen: {
    title: 'The jam study, carefully',
    summary: 'Iyengar and Lepper\'s 2000 study is famous, but later research found choice overload doesn\'t always happen. The safe lesson: make options easy to compare and don\'t add them for their own sake.',
  },
  notes: 'Iyengar & Lepper (2000), Journal of Personality and Social Psychology: 24 vs 6 jams (about 3% vs 30% purchased). Meta-analysis Scheibehenne, Greifeneder & Todd (2010) found mixed effects. Compromise effect: Simonson (1989).',
};

export default lesson;
