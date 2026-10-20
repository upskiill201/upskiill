import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 7. Myth or Fact: closing myths. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'Closing myths',
  summary: 'Remi says you should get everything in one go. Ngozi says the handshake is the deal. Ada checks each belief against what happened at her review. Fact or myth?',
  minutes: 11,
  outcomes: [
    'Avoid common mistakes at the end of a negotiation',
    'Know when a deal is really done',
    'Accept a good deal without chasing a perfect one',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'Once they say no, the negotiation is over.',
          isFact: false,
          explain: 'Myth. Tobi\'s no became a staged deal in ten minutes. Many first nos mean "not like this" or "not now".',
        },
        {
          text: 'The deal is done at the handshake.',
          isFact: false,
          explain: 'Myth. The handshake is the start. The written summary, and both sides keeping their promises, make it a deal.',
        },
        {
          text: 'A good deal you can live with beats holding out for a perfect one.',
          isFact: true,
          explain: 'Fact. ₦420,000 now with a written path to ₦480,000 is above Ada\'s walk-away. Holding out for ₦480,000 today might have got nothing.',
        },
        {
          text: 'How the other side feels at the end affects whether the deal works.',
          isFact: true,
          explain: 'Fact. Research on "subjective value" finds people who feel respected and fairly treated are more satisfied and more willing to work with you again.',
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'A no can be a start, a handshake isn\'t the end, and a good deal you can keep beats a perfect one you can\'t get.',
    },
  ],
  apply: {
    scenario: 'Closing myths.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Myth', 'Fact'],
        items: [
          { text: 'A no ends the negotiation', group: 0 },
          { text: 'The handshake is the deal', group: 0 },
          { text: 'A good deal beats a perfect one you can\'t get', group: 1 },
          { text: 'Feelings at the end matter', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What turns a handshake into a deal?',
        options: [
          { text: 'A written summary, and both sides keeping their promises' },
          { text: 'A firmer handshake', why: 'Writing and follow-through do it.' },
          { text: 'Nothing, it\'s already done', why: 'Spoken deals are easy to forget.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the myth to the truth.',
        pairs: [
          ['"No means it\'s over"', 'No is often "not now"'],
          ['"Handshake = deal"', 'Writing makes it real'],
          ['"Hold out for perfect"', 'A good deal you can keep'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'remi',
        message: 'You should have pushed for ₦480,000 today. Never settle!',
        prompt: "Ada's best reply?",
        options: [
          { text: '₦420,000 is above my walk-away, and ₦480,000 is written down for February. Pushing harder might have got nothing.' },
          { text: 'You\'re right, I failed.', why: 'It was a good deal.' },
          { text: 'I\'ll go back and demand it now.', why: 'That would damage the trust she built.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Subjective value.',
        template: 'People who feel [[1]] and fairly treated are more willing to work with you [[2]].',
        blanks: [['respected'], ['again']],
        distractors: ['tricked', 'never'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many minutes did it take to turn Tobi\'s no into a staged deal?',
        answers: ['10', 'ten'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why does it matter that Tobi felt good at the end?',
        options: [
          { text: 'He\'s the one who has to approve the February raise' },
          { text: 'It doesn\'t matter', why: 'He decides her next review.' },
          { text: 'So he gives her a gift', why: 'It\'s about the working relationship.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Ada\'s closing plan is a myth?',
        lines: [
          'Thank him for being honest.',
          'Send the summary the same day.',
          'Squeeze one more extra out of him as I leave.',
          'Deliver the two goals before February.',
        ],
        bug: 2,
        fix: 'Leave on a good note.',
        explanation: 'A last-second squeeze can sour a good deal.',
      },
      {
        kind: 'sortGroups',
        prompt: 'Helps the deal last, or hurts it?',
        groups: ['Helps', 'Hurts'],
        items: [
          { text: 'Keeping your promises', group: 0 },
          { text: 'Gloating to colleagues', group: 1 },
          { text: 'A friendly summary email', group: 0 },
          { text: 'Reopening it the next day', group: 1 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Order a good close.',
        lines: ['Check it\'s above your walk-away', 'Agree the terms out loud', 'Thank them', 'Send the summary', 'Keep your promises'],
      },
    ],
  },
  reflect: {
    prompt: 'Have you ever lost a good deal by holding out for a perfect one, or ended a negotiation too early?',
    starters: ['I once...', 'Next time I will...'],
  },
  deepen: {
    title: 'Subjective value',
    summary: 'Jared Curhan and colleagues found that how people feel about a negotiation (fairness, respect, the relationship) predicts later satisfaction and even future pay, sometimes more than the numbers.',
  },
  notes: 'Subjective value: Curhan, Elfenbein & Xu (2006), JPSP 91(3); Curhan, Elfenbein & Kilduff (2009), "Getting off on the right foot", Journal of Applied Psychology 94(2).',
};

export default lesson;
