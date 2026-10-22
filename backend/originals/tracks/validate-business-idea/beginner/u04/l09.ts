import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 9. Tap to explore: evidence board v4, the weekend test. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Evidence board v4',
  summary: 'For the first time, the riskiest card moves. Clinton updates his board after the weekend: two cards supported, one new worry, and a new riskiest card.',
  minutes: 11,
  outcomes: [
    'Update the board after a real test',
    'Add new cards the test revealed',
    'Choose the next riskiest card',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Evidence board v4',
      text: 'They would pay me for pickup: supported, 12 paid at 1,500 FCFA. Mama Rose would partner with me: supported for one weekend, at 1,000 FCFA a bag. We can return bags on time: supported, 11 of 12. They will come back every week: untested, risk 25. The price leaves enough for me: doubtful, 500 FCFA a bag.',
      hotspots: [
        { phrase: 'They would pay me for pickup: supported', note: '12 paid, 9 of them strangers, against a pass mark set before the test. The card that started as risk 25 has finally moved.' },
        { phrase: 'Mama Rose would partner with me', note: 'She washed 12 bags at 1,000 FCFA each and can handle about 25 a Saturday. Supported, for now.' },
        { phrase: 'return bags on time', note: '11 of 12 on time; one was a day late after heavy rain.' },
        { phrase: 'They will come back every week: untested, risk 25', note: 'The new riskiest card. Paying once could be curiosity. Paying again means WashDay really solves the problem.' },
        { phrase: 'The price leaves enough for me: doubtful', note: '500 FCFA a bag for a weekend of hills. A new card, and the starting point of the pricing course.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'When the riskiest card passes, the next riskiest becomes the focus. Validation is a series of tests, not one.',
    },
  ],
  apply: {
    scenario: 'Reading board v4.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What is the new riskiest card?',
        options: [
          { text: 'They would pay me for pickup', why: 'That one just passed.' },
          { text: 'They will come back every week' },
          { text: 'Gates open at 9', why: 'Known and fixed.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which label on board v4?',
        groups: ['Supported', 'Untested', 'Doubtful'],
        items: [
          { text: 'They would pay for pickup', group: 0 },
          { text: 'They will come back every week', group: 1 },
          { text: 'The price leaves enough for Clinton', group: 2 },
          { text: 'Bags return on time', group: 0 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the card to its evidence.',
        pairs: [
          ['Pay for pickup', '12 paid, 9 strangers'],
          ['On-time returns', '11 of 12'],
          ['Partnership', 'Mama Rose washed 12 bags'],
          ['Price is enough', 'Only 500 FCFA a bag kept'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'clinton',
        message: 'The big card passed! Can I quit testing now?',
        prompt: "Miracle's best reply?",
        options: [
          { text: 'Yes, you\'re done.', why: 'New risky cards just appeared.' },
          { text: 'Start the app now.', why: 'Repeat demand and price are still open.' },
          { text: 'One weekend of curious customers isn\'t a business. Find out if they come back, and if the money works for you.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Validation is...',
        template: 'A [[1]] of tests, not [[2]].',
        blanks: [['series'], ['one']],
        distractors: ['guess', 'app'],
      },
      {
        kind: 'mcq',
        prompt: 'Why is "they will come back every week" so important?',
        options: [
          { text: 'It isn\'t important', why: 'A business needs repeat customers.' },
          { text: 'Paying once could be curiosity; paying again shows the service really solves the problem' },
          { text: 'Because the app needs users', why: 'There\'s no app yet; it\'s about real value.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'About how many bags can Mama Rose handle on a Saturday?',
        answers: ['25', 'twenty-five'],
        placeholder: 'A number',
      },
      {
        kind: 'findBug',
        prompt: 'Which card on this board is over-claimed?',
        lines: [
          'They would pay for pickup: supported (12 paid).',
          'On-time returns: supported (11 of 12).',
          'They will come back every week: supported (7 said "same next week?").',
          'Price leaves enough for me: doubtful.',
        ],
        bug: 2,
        fix: 'They will come back every week: untested.',
        explanation: 'Saying "same next week?" is interest, not a second booking.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order the riskiest cards across the course so far.',
        lines: ['Students will pay for food delivery (killed)', 'Students would pay me for pickup (supported)', 'They will come back every week (next)'],
      },
      {
        kind: 'sortGroups',
        prompt: 'New card from the weekend, or older card?',
        groups: ['New from the weekend', 'Older'],
        items: [
          { text: 'The price leaves enough for me', group: 0 },
          { text: 'Gates open at 9', group: 0 },
          { text: 'Laundry is a struggle', group: 1 },
          { text: 'Mama Rose is overloaded', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'After your first test, which card moved? What\'s your new riskiest card?',
    starters: ['The card that moved...', 'Next riskiest...'],
  },
  deepen: {
    title: 'The next riskiest card',
    summary: 'Most early businesses don\'t fail at the first test. They fail at "will people come back?" or "does the money work?" Testing those next is what Chapter 5 and the pricing course are for.',
  },
  notes: 'Board v4 (fictional): pay-for-pickup supported (12 paid at 1,500 FCFA, 9 strangers); partnership supported for one weekend (1,000 FCFA a bag, capacity ~25/Saturday); on time 11/12; repeat weekly untested (risk 25); price leaves enough doubtful (500 FCFA kept per bag).',
};

export default lesson;
