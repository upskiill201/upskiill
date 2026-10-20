import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 9. Tap to explore: Ada's ask card v1. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Ask card v1',
  summary: 'Lucía gives Ada one rule: before any negotiation, fill in an ask card. Version 1 is short. Tap each line to see why it\'s there. The card grows every chapter.',
  minutes: 11,
  outcomes: [
    'Know the first lines of a negotiation plan',
    'List the negotiations in your own life',
    'Start an ask card of your own',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Ada\'s ask card v1',
      text: 'My negotiations: the rent, the bakery logo, the fuel bill, my review in five weeks. What I want: a fair rent, a real price for my work, a fair split, pay that matches my role. First step for each: ask for a conversation. My first line: "I\'d like to talk about it." My fear: they\'ll think I\'m greedy. What\'s true: a polite ask with a reason isn\'t greedy.',
      hotspots: [
        { phrase: 'My negotiations', note: 'Lesson 1: Ada didn\'t notice any of them. Listing them is step one.' },
        { phrase: 'my review in five weeks', note: 'The big one. Every chapter prepares for it.' },
        { phrase: 'ask for a conversation', note: 'Lesson 6: reopen the door before naming numbers.' },
        { phrase: '"I\'d like to talk about it."', note: 'Lesson 4: a rehearsed first line makes the ask feel small.' },
        { phrase: 'a polite ask with a reason isn\'t greedy', note: 'Lesson 7: kind and firm go together.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Before any negotiation, write down what it is, what you want, and your first line.',
    },
  ],
  apply: {
    scenario: 'Ask card v1.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match the card line to the lesson behind it.',
        pairs: [
          ['My negotiations', 'Noticing them'],
          ['Ask for a conversation', 'Reopening the door'],
          ['My first line', 'Taming the awkwardness'],
          ['What\'s true', 'Asking myths'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many negotiations are on Ada\'s list?',
        answers: ['4', 'four'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'What is the first step for every negotiation on v1?',
        options: [
          { text: 'Ask for a conversation' },
          { text: 'Name a number', why: 'She\'ll prepare numbers in Chapters 2 and 3.' },
          { text: 'Say yes', why: 'That\'s what she did before.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'On v1, or coming later?',
        groups: ['On v1', 'Coming later'],
        items: [
          { text: 'A list of negotiations', group: 0 },
          { text: 'Her walk-away point', group: 1 },
          { text: 'Her first line', group: 0 },
          { text: 'Trades she could offer', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'Is a card like this overkill for a fuel bill?',
        prompt: "Lucía's best reply?",
        options: [
          { text: 'For the fuel bill, one line in your head is enough. For the rent and your review, write it down.' },
          { text: 'Yes, never write anything down.', why: 'Big negotiations deserve a plan.' },
          { text: 'Write ten pages for each.', why: 'Match the effort to the stakes.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The card\'s core.',
        template: 'What it is, what I [[1]], and my first [[2]].',
        blanks: [['want'], ['line']],
        distractors: ['fear', 'price'],
      },
      {
        kind: 'mcq',
        prompt: 'Why is "my fear" on the card?',
        options: [
          { text: 'Writing the fear down next to what\'s true makes it smaller' },
          { text: 'To give up early', why: 'It\'s there to be answered.' },
          { text: 'It isn\'t useful', why: 'Naming it helps.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line doesn\'t belong on Ada\'s ask card?',
        lines: [
          'The rent: I want a fair rent.',
          'First step: ask for a conversation.',
          'My first line: "I\'d like to talk about it."',
          'Plan: hope he forgets about the rise.',
        ],
        bug: 3,
        fix: 'Plan: ask to meet this week.',
        explanation: 'Hope isn\'t a plan.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many weeks until Ada\'s review?',
        answers: ['5', 'five'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order the lines of ask card v1.',
        lines: ['My negotiations', 'What I want', 'First step', 'My first line', 'My fear and what\'s true'],
      },
    ],
  },
  reflect: {
    prompt: 'Start your own ask card: list your negotiations, what you want from each, and your first line.',
    starters: ['My negotiations:...', 'My first line:...'],
  },
  notes: 'Ask card v1 (fictional) is this course\'s recurring device, growing to v5 in Chapter 5.',
};

export default lesson;
