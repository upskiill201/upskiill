import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 7. Myth or Fact: "frugal means miserable". */
const lesson: OriginalLesson = {
  key: 'l07',
  title: '"Frugal means miserable"',
  summary: 'Yaw thinks saving means a sad, beige life with no fun. Kofi\'s week says otherwise: stew nights, a football final on the hall TV, a market trip that felt like an outing. Five myths about frugal living, tested.',
  minutes: 10,
  outcomes: [
    'Tell frugal from cheap',
    'Find free and low-cost ways to have fun',
    'Spend generously on what matters by saving on what doesn\'t',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'Frugal means spending as little as possible on everything.',
          isFact: false,
          explain: 'Myth. Frugal means spending on purpose: less on what you don\'t care about, so there\'s enough for what you do.',
        },
        {
          text: 'Frugal and cheap are the same thing.',
          isFact: false,
          explain: 'Myth. Cheap is buying the lowest price even when it breaks or hurts others. Frugal is good value: Kofi\'s GH₵160 screen repair with a guarantee, not the GH₵80 one that fails in a week.',
        },
        {
          text: 'Many of the things people enjoy most cost little or nothing.',
          isFact: true,
          explain: 'Fact. Time with friends, football, music, cooking together. Research on happiness keeps finding that relationships matter more than purchases.',
        },
        {
          text: 'Saving on small things you don\'t care about can let you spend more on things you love.',
          isFact: true,
          explain: 'Fact. That\'s the whole idea. Kofi cut the unused app and kept the Friday drinks.',
        },
        {
          text: 'People who save can\'t be generous.',
          isFact: false,
          explain: 'Myth. Planning money is often what makes generosity possible. Kofi can give his cousin GH₵30 because he has a family line.',
        },
      ],
    },
    {
      kind: 'story',
      title: 'The final',
      beats: [
        { speaker: 'yaw', text: 'Watching the final on the hall TV? With stew? This is the saddest Saturday of my life.' },
        { speaker: 'narrator', text: 'Ninety minutes later, forty students are screaming at the same TV, Efua is on a chair, and Yaw has lost his voice.' },
        { speaker: 'yaw', text: '...Okay. That was the best Saturday of my life.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Frugal isn\'t "less of everything". It\'s less of what you don\'t care about, so there\'s more for what you do.',
    },
  ],
  apply: {
    scenario: 'Frugal, not miserable.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Myth', 'Fact'],
        items: [
          { text: 'Frugal means spending the least on everything', group: 0 },
          { text: 'Frugal and cheap are the same', group: 0 },
          { text: 'Many of the best things cost little', group: 1 },
          { text: 'Saving can make generosity possible', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the difference between frugal and cheap?',
        options: [
          { text: 'Frugal is good value on purpose; cheap is the lowest price even when it costs more later' },
          { text: 'No difference', why: 'Kofi\'s screen repair shows the difference.' },
          { text: 'Cheap is better', why: 'Cheap that breaks costs more in the end.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each expensive plan to a frugal version with the same fun.',
        pairs: [
          ['Restaurant night', 'Cooking night with friends'],
          ['Stadium ticket', 'The match on the hall TV'],
          ['Paid gym', 'Football on the campus pitch'],
          ['New clothes for an event', 'Swap clothes with friends'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'yaw',
        message: 'If I start saving, I\'ll have a boring life.',
        prompt: 'Kofi\'s best reply?',
        options: [
          { text: 'You lost your voice at the final on Saturday. Cost: GH₵6 of stew. Boring?' },
          { text: 'Yes, saving is boring.', why: 'His own Saturday proves it doesn\'t have to be.' },
          { text: 'Then don\'t save.', why: 'Saving and fun can live together.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Frugal, defined.',
        template: 'Less of what you don\'t [[1]] about, so there\'s more for what you [[2]].',
        blanks: [['care'], ['do']],
        distractors: ['think', 'owe'],
      },
      {
        kind: 'findBug',
        prompt: 'Which choice is cheap, not frugal?',
        lines: [
          'A GH₵160 screen repair with a 30-day guarantee.',
          'Sharing a 5 kg rice bag with friends.',
          'A GH₵15 charger with no brand that heats up.',
        ],
        bug: 2,
        fix: 'A safe, known charger, even if it costs more.',
        explanation: 'An unsafe charger can damage the phone, or worse. Frugal never trades away safety.',
      },
      {
        kind: 'mcq',
        prompt: 'What does happiness research keep finding matters more than purchases?',
        options: [
          { text: 'Relationships and time with people' },
          { text: 'Expensive brands', why: 'The research points elsewhere.' },
          { text: 'Having the newest phone', why: 'The pleasure of new things fades fast.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Stadium ticket and transport: GH₵60. Hall TV and stew: GH₵6. How much is saved?',
        answers: ['54', 'GH₵54', '54 cedis'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order how to make a frugal plan you\'ll enjoy.',
        lines: ['List what you really love', 'Protect it in the budget', 'Cut what you don\'t care about', 'Find free versions of the rest'],
      },
      {
        kind: 'mcq',
        prompt: 'Kofi gives his cousin GH₵30 from his family line. What does it show?',
        options: [
          { text: 'Planning makes generosity possible' },
          { text: 'He\'s bad at saving', why: 'He planned for it.' },
          { text: 'Frugal people can\'t give', why: 'It shows the opposite.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'What are three things you love that cost little or nothing? And one thing you spend on that you don\'t really care about?',
    starters: ['I love...', 'I don\'t really care about...'],
  },
  deepen: {
    title: 'Relationships and happiness',
    summary: 'The Harvard Study of Adult Development, which has followed people since 1938, found that close relationships were among the strongest predictors of a long and happy life, more than money or fame.',
  },
  notes: 'Harvard Study of Adult Development (Waldinger & Schulz, The Good Life, 2023). Happiness and spending on experiences/others: Dunn, Gilbert & Wilson (2011). Prices fictional.',
};

export default lesson;
