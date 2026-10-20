import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 8. Myth or Fact: preparation myths. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Preparation myths',
  summary: 'Remi is sure that good negotiators just "read the room". Ngozi thinks you should never share anything. Ada sorts what\'s true from what\'s myth before Saturday.',
  minutes: 11,
  outcomes: [
    'Avoid common preparation mistakes',
    'Know what to share and what to keep to yourself',
    'Keep your walk-away private',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'Good negotiators don\'t need to prepare; they read the room.',
          isFact: false,
          explain: 'Myth. Experienced negotiators prepare more, not less. Reading the room works best when you already know your numbers.',
        },
        {
          text: 'You should keep your walk-away point to yourself.',
          isFact: true,
          explain: 'Fact. If he knows your limit is ₦1,450,000, that\'s what he\'ll ask for. Share your interests; keep your walk-away private.',
        },
        {
          text: 'Never share any information in a negotiation.',
          isFact: false,
          explain: 'Myth. Sharing interests ("I want to stay, and I\'d like a stable budget") helps find a deal. Hiding everything makes both sides guess.',
        },
        {
          text: 'The side with a better alternative usually has more power.',
          isFact: true,
          explain: 'Fact. That\'s why Ada costed her BATNA, and his. Both turned out to need the deal.',
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Share your interests. Keep your walk-away to yourself.',
    },
  ],
  apply: {
    scenario: 'Preparation myths.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Myth', 'Fact'],
        items: [
          { text: 'Good negotiators don\'t prepare', group: 0 },
          { text: 'Keep your walk-away private', group: 1 },
          { text: 'Never share anything', group: 0 },
          { text: 'A better alternative means more power', group: 1 },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Share it, or keep it private?',
        groups: ['Share', 'Keep private'],
        items: [
          { text: '"I\'d like to stay."', group: 0 },
          { text: '"My limit is ₦1,450,000."', group: 1 },
          { text: '"A stable budget matters to me."', group: 0 },
          { text: '"I\'d pay anything to avoid moving."', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why keep your walk-away to yourself?',
        options: [
          { text: 'Once they know your limit, they\'ll aim for it' },
          { text: 'It\'s rude to share numbers', why: 'It\'s strategic, not about manners.' },
          { text: 'You don\'t need one', why: 'You need it; you just don\'t announce it.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'remi',
        message: 'Just go in and feel it out. Planning makes you robotic.',
        prompt: "Ada's best reply?",
        options: [
          { text: 'I\'ll be relaxed because I\'ve planned. I know my numbers, so I can listen properly.' },
          { text: 'You\'re right, I\'ll wing it.', why: 'Then she\'ll guess under pressure.' },
          { text: 'I\'ll read from a script word for word.', why: 'Plan the numbers, not every word.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the myth to the truth.',
        pairs: [
          ['"Just read the room"', 'Prepare, then read the room'],
          ['"Share nothing"', 'Share interests'],
          ['"Tell them your limit"', 'Keep your walk-away private'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Share your [[1]]. Keep your [[2]] to yourself.',
        blanks: [['interests'], ['walk-away', 'walkaway', 'limit']],
        distractors: ['feelings', 'name'],
      },
      {
        kind: 'mcq',
        prompt: 'What makes preparation feel less "robotic"?',
        options: [
          { text: 'Plan your numbers and key lines, not every word' },
          { text: 'Don\'t prepare at all', why: 'Then you guess.' },
          { text: 'Memorise a full script', why: 'Scripts break when they ask questions.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line Ada plans to say on Saturday is a mistake?',
        lines: [
          'I\'d really like to stay here.',
          'A stable budget matters to me.',
          'Honestly, I could go up to ₦1,450,000.',
          'Could we look at a two-year lease?',
        ],
        bug: 2,
        fix: 'Delete it: that\'s her walk-away.',
        explanation: 'Now ₦1,450,000 becomes the deal.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Ada\'s walk-away is a secret. What is it, in naira a year?',
        answers: ['1450000', '1,450,000'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order Ada\'s preparation, start to finish.',
        lines: ['Collect evidence', 'Set goal and walk-away', 'Cost both alternatives', 'Decide what to share', 'Write the first line'],
      },
    ],
  },
  reflect: {
    prompt: 'In your negotiation, what will you share, and what will you keep private?',
    starters: ['I will share...', 'I will keep private...'],
  },
  deepen: {
    title: 'Information in negotiation',
    summary: 'Research on negotiation shows that sharing priorities and asking questions helps both sides find better deals, while revealing your bottom line mostly helps the other side.',
  },
  notes: 'Sharing interests vs reservation price: standard negotiation teaching (Thompson; Getting to Yes). Fictional walk-away ₦1,450,000.',
};

export default lesson;
