import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 9. Tap to explore: price card v2, a range not a guess. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Price card v2',
  summary: 'The price card gets its first real update. It still has one line, but now there\'s a reason behind it: a range to test, an anchor, and a floor nobody goes below.',
  minutes: 11,
  outcomes: [
    'Read a value-based price card',
    'Link the price to floor, ceiling and anchor',
    'See what the card still doesn\'t handle',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'WashDay price card v2',
      text: 'Standard bag, picked up from your room: 1,800 to 2,000 FCFA, to be tested. Less than the 2,400 at the stand, and we carry it. Never below the 1,125 cost. Still one price for every hostel and every weather.',
      hotspots: [
        { phrase: '1,800 to 2,000 FCFA, to be tested', note: 'A range from value, not a single guess. Chapter 4 tests it with real customers before it changes for everyone.' },
        { phrase: 'Less than the 2,400 at the stand', note: 'The anchor: a real price students know. Honest, and it makes the value clear.' },
        { phrase: 'we carry it', note: 'The main value, in Brenda\'s words. Price cards should say what you get, not just what you pay.' },
        { phrase: 'Never below the 1,125 cost', note: 'The floor. Any deal or discount has to stay above it.' },
        { phrase: 'Still one price for every hostel and every weather', note: 'Not fixed yet: the rainy hill pickup still loses money. Chapter 3 adds options and a zone fee.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'A good price card says what customers get, gives an honest comparison, and is backed by a cost floor.',
    },
  ],
  apply: {
    scenario: 'Reading price card v2.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What changed between price card v1 and v2?',
        options: [
          { text: 'Nothing', why: 'The basis for the price changed completely.' },
          { text: 'It added a hill fee', why: 'That comes in Chapter 3.' },
          { text: 'The price is now a value-based range with an anchor, not a cost-plus guess' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Fixed by v2, or still to fix?',
        groups: ['Fixed', 'Still to fix'],
        items: [
          { text: 'Price based on value', group: 0 },
          { text: 'Rainy hill pickups lose money', group: 1 },
          { text: 'An honest anchor', group: 0 },
          { text: 'One price for very different orders', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the part of the card to its job.',
        pairs: [
          ['1,800 to 2,000', 'The range to test'],
          ['2,400 at the stand', 'The anchor'],
          ['1,125', 'The floor'],
          ['We carry it', 'The value'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'In the middle of the range, at 1,900, what margin does Clinton keep per bag?',
        answers: ['775'],
        placeholder: 'A number',
      },
      {
        kind: 'chatReply',
        from: 'clinton',
        message: 'Can I just put 1,800 to 2,000 on the card for customers?',
        prompt: "Miracle's best reply?",
        options: [
          { text: 'Yes, let them choose.', why: 'A range on the card confuses customers.' },
          { text: 'The range is for you to test. Customers need one clear price per option. Test, then pick one.' },
          { text: 'Never show any price.', why: 'Clear prices build trust.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'A good price card.',
        template: 'Says what customers [[1]], gives an honest [[2]], and is backed by a cost floor.',
        blanks: [['get'], ['comparison', 'anchor']],
        distractors: ['owe', 'discount'],
      },
      {
        kind: 'mcq',
        prompt: 'Why say "we carry it" on the card?',
        options: [
          { text: 'To fill space', why: 'It\'s the reason to pay.' },
          { text: 'It\'s a legal requirement', why: 'It\'s about value.' },
          { text: 'It names the main value students get, in their own words' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Which line on this draft card breaks a rule from Chapter 2?',
        lines: [
          'Standard bag: 1,800 FCFA.',
          'Less than the 2,400 at the stand.',
          'Was 5,000, now only 1,800!',
          'Picked up from your room.',
        ],
        bug: 2,
        fix: 'Delete it: there was never a 5,000 price.',
        explanation: 'Fake anchors are dishonest.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order the card\'s versions so far.',
        lines: ['v1: one guessed price (1,500)', 'v2: a value range with an anchor', 'v3 (next): options and a zone fee'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What is the lowest price any WashDay deal may go to, in FCFA (the floor)?',
        answers: ['1125', '1,125'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Update your own price card: one value-based price, an honest anchor, and your floor written underneath.',
    starters: ['My price:...', 'My anchor:...'],
  },
  deepen: {
    title: 'Words on the card',
    summary: 'The words around a price matter as much as the number. Use customers\' own words ("we carry it", "your Saturday back") rather than features ("pickup service").',
  },
  notes: 'Price card v2 (fictional): standard bag 1,800-2,000 FCFA to be tested; anchor Mama Rose 2,400; floor 1,125; still single-price. 1,900 − 1,125 = 775.',
};

export default lesson;
