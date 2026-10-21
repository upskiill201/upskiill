import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 9. Tap to explore: plain checklist v2. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Plain checklist v2',
  summary: 'Zanele\'s checklist grows. Five new checks about words and sentences. Tap each one.',
  minutes: 11,
  outcomes: [
    'Add word and sentence checks to your checklist',
    'Link each check to a lesson from this chapter',
    'Use the checklist on a real draft',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Zanele\'s plain checklist v2',
      text: 'Checks 1 to 5 from v1, plus: 6. Who reads it, on what, in what language? 7. Have I swapped long words and jargon for plain ones? 8. Is the doer first in each sentence? 9. Do my sentences average 15 to 20 words, one idea each? 10. No idioms, no "sorry for my English".',
      hotspots: [
        { phrase: 'Who reads it, on what, in what language?', note: 'Lesson 1: Baraka, on his phone, on Friday night.' },
        { phrase: 'swapped long words and jargon', note: 'Lesson 3: the swap list.' },
        { phrase: 'Is the doer first', note: 'Lesson 4: active voice.' },
        { phrase: 'average 15 to 20 words, one idea each', note: 'Lesson 4: short sentences.' },
        { phrase: 'No idioms, no "sorry for my English"', note: 'Lesson 8: clear beats perfect.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'v2 adds: know the reader, plain words, doer first, short sentences, no idioms.',
    },
  ],
  apply: {
    scenario: 'Plain checklist v2.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match the check to the lesson.',
        pairs: [
          ['Who reads it?', '"Operationalise weekend throughput"'],
          ['Plain swaps', 'The swap list'],
          ['Doer first', 'Active voice, short sentences'],
          ['No idioms', 'Writing in a second language'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many checks are on v2 in total?',
        answers: ['10', 'ten'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'From v1 or new on v2?',
        groups: ['v1', 'New on v2'],
        items: [
          { text: 'Point in two lines', group: 0 },
          { text: 'Doer first', group: 1 },
          { text: 'Phone test', group: 0 },
          { text: 'Plain swaps', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Check 9 asks for sentences that average how many words?',
        options: [
          { text: '15 to 20' },
          { text: '40 to 50', why: 'Far too long.' },
          { text: '3 to 5', why: 'Too choppy as an average.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'remi',
        message: 'Ten checks? I\'ll never remember all that.',
        prompt: "Zanele\'s best reply?",
        options: [
          { text: 'You don\'t have to remember. It\'s taped to my screen. Thirty seconds before I hit send.' },
          { text: 'Then don\'t bother.', why: 'It works.' },
          { text: 'Memorise it tonight.', why: 'Keep it visible instead.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Check 8.',
        template: 'Is the [[1]] first in each [[2]]?',
        blanks: [['doer'], ['sentence']],
        distractors: ['date', 'paragraph'],
      },
      {
        kind: 'mcq',
        prompt: 'Why is "who reads it, on what, in what language" check 6?',
        options: [
          { text: 'Every word choice depends on the reader' },
          { text: 'To fill the list', why: 'It\'s the foundation.' },
          { text: 'It isn\'t important', why: 'It decides everything else.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which check in this copy of v2 is wrong?',
        lines: [
          'Who reads it, on what, in what language?',
          'Have I added impressive words to sound senior?',
          'Is the doer first?',
          'No idioms.',
        ],
        bug: 1,
        fix: 'Have I swapped long words and jargon for plain ones?',
        explanation: 'That\'s the opposite of the swap list.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'What\'s the plain swap for "commence"?',
        answers: ['start', 'begin'],
        placeholder: 'One word',
      },
      {
        kind: 'orderLines',
        prompt: 'Order the new checks as written.',
        lines: ['Who reads it', 'Plain swaps', 'Doer first', 'Short sentences', 'No idioms'],
      },
    ],
  },
  reflect: {
    prompt: 'Add word and sentence checks to your own list. Run them on today\'s most important message.',
    starters: ['I changed...'],
  },
  notes: 'Plain checklist v2 (fictional) adds Chapter 2 checks.',
};

export default lesson;
