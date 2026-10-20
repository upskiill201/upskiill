import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 9. Tap to explore: evidence board v1, all untested. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Evidence board v1',
  summary: 'Clinton turns his wall of sticky notes into an evidence board: every assumption, its risk score, and what he actually knows. Tap each card to see why it\'s marked the way it is.',
  minutes: 11,
  outcomes: [
    'Read an evidence board',
    'Mark assumptions untested, supported or killed',
    'Plan the next test from the board',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'CampusEats: evidence board v1',
      text: 'Students will pay 500 FCFA for delivery: untested, risk 25. Students struggle to get food at night: untested, risk 16. Restaurants will give a discount: untested, risk 9. The group chats will bring customers: untested, risk 8. I can deliver in 30 minutes: untested, risk 2. Next test: ask ten hostel students to pay for one Friday delivery.',
      hotspots: [
        { phrase: 'Students will pay 500 FCFA for delivery', note: 'The riskiest card. Forty emojis don\'t count; three doubts point the other way. Untested until someone pays.' },
        { phrase: 'Students struggle to get food at night', note: 'Clinton believes it because he does. One person is not evidence. Chapter 2 tests it with real conversations.' },
        { phrase: 'The group chats will bring customers', note: 'Forty reactions from 900 members, zero order requests. Hints, not evidence.' },
        { phrase: 'I can deliver in 30 minutes', note: 'Low risk: he\'s fairly sure, and if it takes 40 minutes the business survives.' },
        { phrase: 'Next test', note: 'The board decides what to do next: the highest-risk untested card. Not the easiest one.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Three labels only: untested, supported, killed. "Probably true" is just untested with confidence.',
    },
  ],
  apply: {
    scenario: 'Reading the board.',
    items: [
      {
        kind: 'mcq',
        prompt: 'On evidence board v1, how many assumptions are supported by evidence?',
        options: [
          { text: 'None: they\'re all untested' },
          { text: 'All five', why: 'Nothing has been tested yet.' },
          { text: 'Two', why: 'Believing isn\'t evidence; none are supported yet.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which label?',
        groups: ['Untested', 'Supported', 'Killed'],
        items: [
          { text: '"I\'m sure students will pay"', group: 0 },
          { text: 'Eight of ten students paid for a Friday delivery', group: 1 },
          { text: 'None of ten students paid, even at 200 FCFA', group: 2 },
          { text: 'Forty fire emojis', group: 0 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the card to its risk score.',
        pairs: [
          ['Students will pay for delivery', '25'],
          ['Students struggle at night', '16'],
          ['Restaurants give a discount', '9'],
          ['Deliver in 30 minutes', '2'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'clinton',
        message: 'Can I mark "students struggle at night" as supported? I struggle at night!',
        prompt: "Miracle's best reply?",
        options: [
          { text: 'You\'re one person who already wants this business to work. Keep it untested until other students show you.' },
          { text: 'Yes, you count.', why: 'One founder is the most biased source there is.' },
          { text: 'Mark it killed.', why: 'There\'s no evidence either way yet.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The three labels.',
        template: 'Untested, [[1]] or [[2]].',
        blanks: [['supported'], ['killed']],
        distractors: ['probably', 'liked'],
      },
      {
        kind: 'mcq',
        prompt: 'Which card should Clinton test next?',
        options: [
          { text: 'Students will pay 500 FCFA for delivery (risk 25)' },
          { text: 'Deliver in 30 minutes (risk 2)', why: 'Lowest risk; it can wait.' },
          { text: 'The app\'s colours', why: 'Not even on the board.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many students does Clinton plan to ask to pay for a Friday delivery?',
        answers: ['10', 'ten'],
        placeholder: 'A number',
      },
      {
        kind: 'findBug',
        prompt: 'Which card on this board is mislabelled?',
        lines: [
          'Students will pay: untested',
          'Students struggle at night: supported (I do)',
          'Group chats bring customers: untested',
          'Deliver in 30 minutes: untested',
        ],
        bug: 1,
        fix: 'Students struggle at night: untested',
        explanation: 'The founder\'s own experience isn\'t customer evidence.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order how a card changes on the board.',
        lines: ['Write the assumption', 'Score the risk', 'Mark it untested', 'Test it', 'Mark it supported or killed'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Is it evidence that could move a card?',
        groups: ['Evidence', 'Not evidence'],
        items: [
          { text: 'Ten students were asked to pay; three did', group: 0 },
          { text: 'Clinton feels confident', group: 1 },
          { text: 'Six students describe skipping dinner last week', group: 0 },
          { text: 'A friend says "sounds good"', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Make your own evidence board: your five assumptions, a risk score for each, and an honest label. Which card do you test first?',
    starters: ['My riskiest card is...', 'I\'ll test it by...'],
  },
  deepen: {
    title: 'A board you update every week',
    summary: 'The evidence board appears in every chapter of this course. By the end, Clinton\'s cards are supported or killed, and the board tells him whether to go ahead.',
  },
  notes: 'Evidence board scores are Clinton\'s estimates (bad-if-wrong × unsure, each 1-5): pay for delivery 25, struggle at night 16, restaurant discount 9, group chats 8, delivery time 2. Fictional.',
};

export default lesson;
