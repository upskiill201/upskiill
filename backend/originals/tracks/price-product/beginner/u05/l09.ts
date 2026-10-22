import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 9. Tap to explore: price card v5, the card that explains itself. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Price card v5',
  summary: 'The last version of the card for this course. Same prices as v4, but now it says what\'s included, shows totals before payment, and has a review date. Tap each line to see why.',
  minutes: 11,
  outcomes: [
    'Read a complete, clear price card',
    'Link each line to a lesson from this chapter',
    'Know what goes on your own card',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'WashDay price card v5',
      text: 'A bag: up to 12 items, washed, dried and folded. Saver 1,400 (drop at the stand), Standard 1,800, Express 2,500. Ironing +200. Hill hostels +500, all year. Saturday Plan 6,400 a month for 4 bags. Mobile Money fees included. Your total is shown before you pay. Prices reviewed every three months.',
      hotspots: [
        { phrase: 'up to 12 items, washed, dried and folded', note: 'Says what\'s included, so nobody argues about a 13th shirt.' },
        { phrase: 'Saver 1,400 (drop at the stand)', note: 'The answer for Joseph and anyone who says "too expensive": a real option, not a secret discount.' },
        { phrase: 'Hill hostels +500, all year', note: 'Shown up front, tied to a real cost. Due for a check in February now rides cost 350.' },
        { phrase: 'Mobile Money fees included', note: 'Clinton\'s cost, inside the price. No "+ transaction fee" at the end.' },
        { phrase: 'Your total is shown before you pay', note: 'A hill Standard says 2,300 before money moves. No surprises.' },
        { phrase: 'Prices reviewed every three months', note: 'Changes happen calmly, with notice, not in a panic.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'A good price card says what\'s included, shows every fee, gives options, and tells people when prices are reviewed.',
    },
  ],
  apply: {
    scenario: 'Reading price card v5.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match the line to the lesson it came from.',
        pairs: [
          ['Up to 12 items', 'No hidden fees'],
          ['Saver 1,400', 'Answering "too expensive"'],
          ['Reviewed every three months', 'Review your prices regularly'],
          ['Total before you pay', 'No surprises at the end'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What\'s new on v5 compared with v4?',
        options: [
          { text: 'All the prices went up again', why: 'Prices are the same as v4.' },
          { text: 'The hill fee was removed', why: 'It stays; it\'s due for review.' },
          { text: 'It explains itself: what\'s included, totals shown first, and a review date' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'A hill student books Express. What total should they see before paying, in FCFA?',
        answers: ['3000', '3,000'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'On the v5 card, or not?',
        groups: ['On the card', 'Not on it'],
        items: [
          { text: 'What a bag includes', group: 0 },
          { text: '"Small extra charges may apply"', group: 1 },
          { text: 'A review date', group: 0 },
          { text: 'Secret prices for friends', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'clinton',
        message: 'Should I put the February hill-fee review on the card now?',
        prompt: "David's best reply?",
        options: [
          { text: 'No. "Reviewed every three months" is enough. If it changes, you\'ll announce it two weeks ahead with the reason.' },
          { text: 'Yes, warn everyone it\'s going up.', why: 'It isn\'t decided yet.' },
          { text: 'Raise it now instead.', why: 'Wait for the review and the numbers.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The card\'s promise.',
        template: 'Your [[1]] is shown before you [[2]].',
        blanks: [['total'], ['pay']],
        distractors: ['logo', 'complain'],
      },
      {
        kind: 'mcq',
        prompt: 'Why is "Mobile Money fees included" better than adding them at the end?',
        options: [
          { text: 'It\'s cheaper for Clinton', why: 'He pays them either way; it\'s about trust.' },
          { text: 'Mobile Money requires it', why: 'It\'s Clinton\'s choice, for clarity.' },
          { text: 'The price people see is the price they pay' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of this copy of the card is wrong?',
        lines: [
          'Saver 1,400 (drop at the stand).',
          'Standard 1,800, Express 2,500.',
          'Hill hostels +500, rainy days only.',
          'Saturday Plan 6,400 a month for 4 bags.',
        ],
        bug: 2,
        fix: 'Hill hostels +500, all year.',
        explanation: 'A rain-only fee is the unfair surcharge from Chapter 4.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'The Saturday Plan is 6,400 for 4 bags. How much is that per bag, in FCFA?',
        answers: ['1600', '1,600'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order the card from top to bottom, as Clinton wrote it.',
        lines: ['What a bag includes', 'The three speeds', 'Extras and the hill fee', 'The Saturday Plan', 'Totals and the review date'],
      },
    ],
  },
  reflect: {
    prompt: 'Draft your own price card. What does a customer need to know before they pay you?',
    starters: ['My card says...', 'A customer needs to know...'],
  },
  notes: 'Fictional WashDay price card v5: same prices as v4 (Saver 1,400, Standard 1,800, Express 2,500, ironing +200, hill +500 all year, Plan 6,400/4 bags), plus "up to 12 items", fees included, totals before payment, quarterly review.',
};

export default lesson;
