import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 4. Chat with Tey: don't ask what they'd pay; watch what they do. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Watch what they pay',
  summary: 'Clinton wants to run a poll: "How much would you pay for WashDay?" Tey reminds him what course 1 taught: ask about the future and you get guesses. Watch what people already pay instead.',
  minutes: 12,
  outcomes: [
    'Know why "what would you pay?" gives weak answers',
    'Find willingness to pay in what people already do',
    'Use behaviour as evidence for a price',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Ask "what would you pay?" and people guess. Some say high to be nice, some say low hoping you\'ll charge less. Neither costs them anything.', replies: ['So how do I find out?'] },
        { tey: 'Look at what they already do. Six of Clinton\'s 15 interviewees paid Mama Rose 2,400 a basket at least once this semester. That\'s a price they actually paid.', replies: ['What else?'] },
        { tey: 'Three of WashDay\'s regulars still pay Mama Rose 2,400 for ironing shirts before exams. And nobody quit when the end of the month came round. Each of those is a clue about what they\'ll pay.', replies: ['And if I really need a number?'] },
        { tey: 'Then test it: offer a real price to real customers and count who pays. That\'s Chapter 4. Behaviour beats opinions, again.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'The best evidence of what people will pay is what they already pay, for you or for anything similar.',
    },
  ],
  apply: {
    scenario: 'Evidence about price.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Strong or weak evidence about what students will pay?',
        groups: ['Strong', 'Weak'],
        items: [
          { text: 'Six paid Mama Rose 2,400 this semester', group: 0 },
          { text: 'A poll: "I\'d pay about 1,000"', group: 1 },
          { text: 'Regulars kept booking at the end of the month', group: 0 },
          { text: '"I\'d pay anything for this!"', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why is "what would you pay?" a weak question?',
        options: [
          { text: 'It\'s rude', why: 'It\'s fine to ask; it just doesn\'t give reliable answers.' },
          { text: 'Guesses cost nothing, so people answer to be nice or to get a lower price' },
          { text: 'It\'s the best question there is', why: 'Behaviour is far more reliable.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the clue to what it suggests.',
        pairs: [
          ['Paid Mama Rose 2,400', 'Will pay that much for laundry'],
          ['Pays extra for ironing', 'Values looking smart for exams'],
          ['Kept booking at month end', 'Price isn\'t stopping them'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'clinton',
        message: 'My poll says students would pay 1,000. Should I lower the price?',
        prompt: "Tey's best reply?",
        options: [
          { text: 'Yes, the poll says 1,000.', why: 'A hypothetical answer against real payments.' },
          { text: 'Poll again until it says 3,000.', why: 'That\'s just fishing for a nicer guess.' },
          { text: 'Polls invite low guesses. Many of them pay Mama Rose 2,400. Trust what they do over what they say.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: '[[1]] beats opinions: watch what people already [[2]].',
        blanks: [['Behaviour', 'Behavior'], ['pay']],
        distractors: ['Polls', 'say'],
      },
      {
        kind: 'typeAnswer',
        prompt: '6 of 15 interviewees paid Mama Rose this semester. What percentage is that?',
        answers: ['40', '40%'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'What does "three regulars also pay Mama Rose for ironing before exams" tell Clinton?',
        options: [
          { text: 'Some students will pay more for extras like ironing at busy times' },
          { text: 'They don\'t like WashDay', why: 'They\'re regulars; they want more, not less.' },
          { text: 'Nothing', why: 'It\'s a hint about extra services and timing.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Clinton\'s price research is weakest?',
        lines: [
          'Six students paid Mama Rose 2,400 this semester.',
          'No regular quit at month end.',
          'In a poll, students said they\'d pay about 1,000.',
          'Three regulars pay extra for ironing before exams.',
        ],
        bug: 2,
        fix: 'Treat the poll as a rough hint; test a real price instead.',
        explanation: 'It\'s the only line based on guesses rather than behaviour.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order these from strongest to weakest price evidence.',
        lines: ['Customers paying your new price', 'Customers paying a rival a similar price', 'Customers saying a price in a poll'],
      },
      {
        kind: 'sortGroups',
        prompt: 'What they do, or what they say?',
        groups: ['Do', 'Say'],
        items: [
          { text: 'Booked three weekends in a row', group: 0 },
          { text: '"It\'s too expensive" (but booked anyway)', group: 1 },
          { text: 'Paid for ironing during exams', group: 0 },
          { text: '"I\'d pay double"', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'What do your customers already pay, to you or to anyone else, for something like your offer? What does that suggest about your price?',
    starters: ['They already pay...', 'That suggests...'],
  },
  deepen: {
    title: 'Survey methods',
    summary: 'Some surveys ask what price would feel "too cheap" or "too expensive" (the Van Westendorp method). They can give a rough range, but real purchases are still the stronger test.',
  },
  notes: 'Hypothetical bias in stated willingness to pay (see course 1). Van Westendorp price-sensitivity meter (1976) mentioned as a rough guide only. Fictional evidence: 6 of 15 paid Mama Rose; 3 regulars pay for ironing before exams.',
};

export default lesson;
