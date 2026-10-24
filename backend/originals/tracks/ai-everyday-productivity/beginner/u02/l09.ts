import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 9. Tap to explore: prompt cards v2. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Prompt cards v2',
  summary: 'A week of flat hunting gave Lucía two new prompt cards. Tap through card #2, "Compare it", the one she\'ll use for anything with options.',
  minutes: 11,
  outcomes: [
    'Save a reusable comparison prompt',
    'Build checks into the card itself',
    'Add research cards to your own kit',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Lucía\'s prompt card #2: "Compare it"',
      text: 'COMPARE IT. Use for: choosing between options (flats, machines, courses). Prompt: "I\'m choosing between [OPTIONS, pasted]. What matters to me: [CRITERIA]. My limits: [BUDGET, TIME]. Compare them in a table, one row per option. If something isn\'t stated, write unknown, don\'t guess. Then tell me what I should check before deciding." Ask open, never leading: not "isn\'t X better?" Checks: source, date, second source. Numbers and dates first. Card #3, "Read it": "List every fee, deadline and penalty with its section number." Then read those sections myself. Version: v2, Day 8.',
      hotspots: [
        { phrase: 'Use for: choosing between options', note: 'Flats this week. Venues and caterers next.' },
        { phrase: 'What matters to me: [CRITERIA]', note: 'Without this, the AI judges by its own taste. Flat 3 and its balcony, remember?' },
        { phrase: 'write unknown, don\'t guess', note: 'The line that exposed the fake "Quiet: Yes".' },
        { phrase: 'what I should check before deciding', note: 'Every comparison ends in a checking list.' },
        { phrase: 'not "isn\'t X better?"', note: 'Leading questions get leaning answers.' },
        { phrase: 'Numbers and dates first', note: 'They\'re easy to get slightly wrong and they drive decisions.' },
        { phrase: 'with its section number', note: 'So she can find and read the parts that cost money. Clause 14 taught her that.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Put your checks on the card itself. When you\'re tired and in a hurry, the card remembers for you.',
    },
  ],
  apply: {
    scenario: 'Reading prompt cards #2 and #3.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each line on the card to the lesson behind it.',
        pairs: [
          ['"What matters to me"', 'Twelve listings, one table'],
          ['"Unknown, don\'t guess"', 'The fake "Quiet: Yes"'],
          ['"With its section number"', 'Fourteen pages'],
          ['"Not isn\'t X better?"', 'Research myths'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why put the three checks on the card?',
        options: [
          { text: 'The AI reads them and checks itself', why: 'They\'re reminders for Lucía.' },
          { text: 'They look professional', why: 'They\'re there to be used.' },
          { text: 'So she remembers to check even when she\'s tired and rushed' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Fill in card #2 for choosing a caterer in Oaxaca.',
        template: 'I\'m choosing between [[1]] caterers. What matters to me: [[2]] under MX$20,000, food for 60, delivery to the venue.',
        blanks: [['3', 'three'], ['price', 'cost', 'total']],
        distractors: ['balconies', '100'],
      },
      {
        kind: 'chatReply',
        from: 'sofia',
        message: 'Can I copy your "Compare it" card? I\'m choosing between two courses.',
        prompt: 'What should Lucía say?',
        options: [
          { text: 'Yes. Swap the brackets for your options and criteria, and keep the "unknown, don\'t guess" line.' },
          { text: 'No, it only works for flats.', why: 'The brackets make it work for anything.' },
          { text: 'Yes, but delete the checks, they slow you down.', why: 'The checks are the point.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Card #2 "Compare it" or card #3 "Read it"?',
        groups: ['Compare it', 'Read it'],
        items: [
          { text: 'Two gym memberships', group: 0 },
          { text: 'A phone contract\'s small print', group: 1 },
          { text: 'Three caterers', group: 0 },
          { text: 'A venue\'s booking terms', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line on Tomás\'s copy of card #2 breaks it?',
        lines: [
          'Isn\'t [OPTION 1] obviously the best?',
          'Compare them in a table, one row per option.',
          'Write unknown, don\'t guess.',
        ],
        bug: 0,
        fix: '"What matters to me: [CRITERIA]."',
        explanation: 'A leading question pulls the AI towards agreeing, before it has compared anything.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'What\'s card #3 called? (Two words.)',
        answers: ['Read it', 'read it'],
        placeholder: 'Card name',
      },
      {
        kind: 'mcq',
        prompt: 'Which card will Lucía reach for next, when she picks a venue for the party?',
        options: [
          { text: 'Card #1 "Plan it" only', why: 'She\'ll plan, but first she has venues to choose between.' },
          { text: 'Card #2 "Compare it", then card #3 for the booking terms' },
          { text: 'No card: venues are simple', why: 'Venues have options and terms.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Order the steps on card #2.',
        lines: ['Paste the options', 'Give criteria and limits', 'Ask for a table', 'Unknown, don\'t guess', 'Ask what to check'],
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the biggest change from card v1 to v2?',
        options: [
          { text: 'Checking is built in: unknowns, sources, numbers first' },
          { text: 'It\'s longer', why: 'Length isn\'t the point.' },
          { text: 'It uses more brackets', why: 'The new part is the checking.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Write your own card #2 for a choice you\'ll make this month. Put your three checks on it.',
    starters: ['Use for:...', 'What matters to me:...', 'Checks:...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Add "Compare it" and "Read it" to your prompt-cards note. Use one this week on a real choice or a real document.',
  },
  notes: 'Prompt cards v2 (fictional). Running device.',
};

export default lesson;
