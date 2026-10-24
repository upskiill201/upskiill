import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 9. Tap to explore: ask card v3, the logo quote. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Ask card v3',
  summary: 'Monday night. Ada\'s ask card for the logo is ready, and it now has her exact words. Tap each line to see why it\'s there.',
  minutes: 11,
  outcomes: [
    'Read an ask card with an opening offer and script',
    'Link each line to a lesson from this chapter',
    'Add a first offer and lines to your own card',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Ada\'s ask card v3: the logo',
      text: 'Goal: ₦150,000. Range: logos for small businesses here cost ₦80,000 to ₦200,000. Time: about 15 hours. Walk-away (private): ₦90,000. BATNA: spend those weekends on my own portfolio. Opening: ₦150,000 to ₦180,000, depending on revisions and files. Because: it includes concepts, two revisions and every file she needs. Then: silence. If "too much": "What part feels too much?"',
      hotspots: [
        { phrase: 'Range: logos for small businesses here cost ₦80,000 to ₦200,000', note: 'Lesson 4: she knows the range, so she goes first.' },
        { phrase: 'Walk-away (private): ₦90,000', note: '15 hours at about ₦6,000 an hour. Below that, her weekend is worth more.' },
        { phrase: 'Opening: ₦150,000 to ₦180,000', note: 'Lesson 6: a bolstering range. The bottom is her goal.' },
        { phrase: 'Because:', note: 'Lesson 7: a real reason makes the ask feel fair.' },
        { phrase: 'Then: silence.', note: 'Lesson 3: don\'t fill it with a discount.' },
        { phrase: '"What part feels too much?"', note: 'Lesson 8: ask a question instead of dropping the price.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'v3 adds your opening offer, your "because", and your answer to "too much".',
    },
  ],
  apply: {
    scenario: 'Ask card v3.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match the line to the lesson.',
        pairs: [
          ['Bolstering range', 'One number vs a range'],
          ['Because', 'The photocopier study'],
          ['Silence', 'How to make an ask'],
          ['"What part feels too much?"', 'Scripts'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Walk-away ₦90,000 for 15 hours. What hourly rate is that, in naira?',
        answers: ['6000', '6,000'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why does Ada go first with Mrs Okon?',
        options: [
          { text: 'It\'s polite to go first', why: 'It\'s about information and anchoring.' },
          { text: 'She knows the range, so her number sets the anchor' },
          { text: 'She has to by law', why: 'It\'s a strategic choice.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'On the quote she sends, or private?',
        groups: ['On the quote', 'Private'],
        items: [
          { text: '₦150,000 to ₦180,000', group: 0 },
          { text: 'Walk-away ₦90,000', group: 1 },
          { text: 'Two revisions included', group: 0 },
          { text: 'Her BATNA', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'What if she says her budget is lower than ₦150,000?',
        prompt: "Lucía's best reply?",
        options: [
          { text: 'Don\'t just drop the price. Change what\'s included: fewer revisions or files for less. That\'s the challenge.' },
          { text: 'Drop to her budget straight away.', why: 'Lower price, same work, means a discount.' },
          { text: 'Refuse to talk.', why: 'There may be a deal that works.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'What v3 adds.',
        template: 'Your opening [[1]], your "[[2]]", and your answer to "too much".',
        blanks: [['offer'], ['because']],
        distractors: ['apology', 'fear'],
      },
      {
        kind: 'mcq',
        prompt: 'Why is the BATNA "my own portfolio" and not "nothing"?',
        options: [
          { text: 'It\'s the same as nothing', why: 'Her time is worth something.' },
          { text: 'Her weekends have value; she\'d use them to grow her own work' },
          { text: 'To sound busy', why: 'It\'s her real alternative.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of this copy of the card is wrong?',
        lines: [
          'Goal: ₦150,000.',
          'Opening: ₦90,000 to ₦150,000.',
          'Because: concepts, two revisions, all files.',
          'Then: silence.',
        ],
        bug: 1,
        fix: 'Opening: ₦150,000 to ₦180,000.',
        explanation: 'That\'s a backdown range starting at her walk-away.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'About how many hours will the logo take Ada?',
        answers: ['15', 'fifteen'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order Ada\'s quote moment.',
        lines: ['State the range', 'Give the "because"', 'Silence', 'Answer with a question if needed'],
      },
    ],
  },
  reflect: {
    prompt: 'Add an opening offer, a "because" and an answer to "too much" to your own ask card.',
    starters: ['Opening:...', 'Because:...'],
  },
  notes: 'Ask card v3 (fictional): logo goal ₦150,000; range ₦80,000–₦200,000 (illustrative); ~15 hours; walk-away ₦90,000 (₦6,000/hour); opening ₦150,000–₦180,000.',
};

export default lesson;
