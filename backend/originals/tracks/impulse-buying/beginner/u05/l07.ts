import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 7. Before/After: the list vs the scroll. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'The list vs the scroll',
  summary: 'Two ways to spend Black Friday morning. Last year\'s Kofi scrolled. This year\'s Kofi has a list. Same sale, same phone, same person. Side by side.',
  minutes: 11,
  outcomes: [
    'Shop a sale from a list, not a feed',
    'Use a price limit and the usual price on the day',
    'Leave with only what you planned',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Black Friday morning, two ways',
      before: {
        label: 'The scroll (last year)',
        text: 'Wakes up, opens every app\nSees 200 "deals", feels he\'s missing out\nAdds things to baskets "just to see"\nCountdowns everywhere; buys 5 things in 40 minutes\nSaved card, one tap, pay later on two\nSpent: GH₵620. Still using any of it a month later: 1',
      },
      after: {
        label: 'The list (this year)',
        text: 'Wakes up, opens one app, types one search\nList: audio interface. Limit: GH₵800. Usual: GH₵880 to GH₵950\nFinds it at GH₵720, checks two other shops: GH₵890, GH₵910\nTypes card details in; no pay later\nCloses the app. Goes to play football\nSpent: GH₵720 on a planned item, GH₵160 below the lowest usual price',
      },
      notes: [
        'A list turns a sale from a feed into a search: you look for one thing, instead of being shown everything.',
        'The price limit and usual price make it easy to tell a real deal from an anchor.',
        'Closing the app after buying is a big part of it: the longer you browse, the more the tricks work.',
        'Last year: GH₵620 on things he barely used. This year: GH₵720 on something he\'ll use 400 times.',
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Search, don\'t scroll. Check against your usual price and limit. Buy what\'s on the list. Close the app.',
    },
  ],
  apply: {
    scenario: 'Black Friday morning.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the list way.',
        lines: ['Open one app', 'Search for the list item', 'Check the price against the usual price and limit', 'Check two other shops', 'Buy and close the app'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Lowest usual price GH₵880, Black Friday price GH₵720. How much is genuinely saved?',
        answers: ['160', 'GH₵160', '160 cedis'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'The scroll or the list?',
        groups: ['The scroll', 'The list'],
        items: [
          { text: 'Opening every app "to see"', group: 0 },
          { text: 'Searching for one item', group: 1 },
          { text: 'Buying five things in 40 minutes', group: 0 },
          { text: 'Closing the app after buying', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Last year Kofi spent GH₵620 and still used 1 of 5 things a month later. What was the problem?',
        options: [
          { text: 'He scrolled a feed of deals instead of searching for planned items' },
          { text: 'He bought from the wrong shops', why: 'The way he shopped was the problem.' },
          { text: 'The deals were too good', why: 'They were good at getting him to buy.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'yaw',
        message: 'You bought the interface. Now browse a bit, there might be other deals!',
        prompt: 'Kofi\'s best reply?',
        options: [
          { text: 'Nope. List done, app closed. Football?' },
          { text: 'Just five minutes.', why: 'Five minutes is how five purchases happen.' },
          { text: 'Fine, show me.', why: 'The plan was one item and close.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The method.',
        template: '[[1]], don\'t [[2]].',
        blanks: [['Search'], ['scroll']],
        distractors: ['Buy', 'save'],
      },
      {
        kind: 'findBug',
        prompt: 'Which step lets the tricks back in?',
        lines: [
          'Search for the interface.',
          'Compare with GH₵880 to GH₵950.',
          'After buying, browse the "recommended for you" section.',
        ],
        bug: 2,
        fix: 'After buying, close the app.',
        explanation: '"Recommended for you" is designed to start a new urge right after a purchase.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'GH₵720 interface, used about 400 times. Cost per use, in cedis?',
        answers: ['1.8', '1.80', 'GH₵1.80', 'GH₵1.8'],
        placeholder: 'A number',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match last year\'s habit to this year\'s fix.',
        pairs: [
          ['Opening every app', 'Open one app, search one item'],
          ['Saved card, one tap', 'Type card details in'],
          ['Pay later on two items', 'No pay later'],
          ['Browsing for 40 minutes', 'Close the app after buying'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What did Kofi do right after buying?',
        options: [
          { text: 'Closed the app and went to play football' },
          { text: 'Browsed for more deals', why: 'That\'s last year\'s Kofi.' },
          { text: 'Bought a case for the interface', why: 'Not on the list.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Next time you shop online, try "search, don\'t scroll" and close the app after. What happened?',
    starters: ['I searched for...', 'Then I...'],
  },
  deepen: {
    title: 'Lists work in markets too',
    summary: 'Research on grocery shopping suggests lists reduce unplanned purchases. At Kejetia or Makola, a written list and a cash limit do the same job: you see everything, and buy what you came for.',
  },
  notes: 'Black Friday (fictional): interface 720; other shops 890, 910; last year 620 on 5 items. Shopping lists and unplanned purchases: e.g. Thomas & Garland (1993); Inman, Winer & Ferraro (2009); stated qualitatively.',
};

export default lesson;
