import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 5. Checkpoint 1: lessons 1–4. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: Sofía checks',
  summary: 'Lucía shows Sofía her shortlist. Sofía says nothing, opens three links, and puts a sticky note on the screen: "Which of these did you check?" Check what you know about AI research.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Separate checked facts from AI guesses', 'Compare options with your own criteria'],
  learn: [
    {
      kind: 'story',
      title: 'The sticky note',
      beats: [
        { speaker: 'sofia', text: 'Which of these did you check?' },
        { speaker: 'lucia', text: 'The rents. Not the noise. And the "2023 city study" doesn\'t exist.' },
        { speaker: 'sofia', text: 'Then you know what to do on Saturday.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1: research with AI.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'On Lucía\'s shortlist: checked, or still an AI guess?',
        groups: ['Checked', 'AI guess'],
        items: [
          { text: 'Flat 5 rent: MX$14,800 (listing)', group: 0 },
          { text: 'Flat 5 is "quiet" (no source)', group: 1 },
          { text: 'Commute 25 min (tested on a map app at 8 a.m.)', group: 0 },
          { text: '"A 2023 city study says..."', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the right role for AI in Lucía\'s flat hunt?',
        options: [
          { text: 'The source of current prices', why: 'Listings are the source for prices.' },
          { text: 'The final decision-maker', why: 'She decides with checked facts.' },
          { text: 'A fast assistant for comparing, summarising and preparing questions' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each check to what it asks.',
        pairs: [
          ['Source', 'Where does it come from?'],
          ['Date', 'Is it from this year?'],
          ['Second source', 'Does somewhere independent agree?'],
          ['Visit', 'What\'s it like in real life?'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'sofia',
        message: 'Why did the table say "Quiet: Yes" for Flat 2 at first?',
        prompt: 'Lucía\'s answer?',
        options: [
          { text: 'It guessed, because I hadn\'t told it to write "unknown".' },
          { text: 'Because Flat 2 is quiet.', why: 'Nobody knows yet; it\'s on a main road.' },
          { text: 'Because the listing said so.', why: 'The listing said nothing about noise.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The comparison prompt.',
        template: 'Give your [[1]], ask for a [[2]], and say "unknown, don\'t guess".',
        blanks: [['criteria'], ['table']],
        distractors: ['feelings', 'poem'],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which is the open, non-leading research question?',
        options: [
          { text: 'Isn\'t Narvarte safer than Roma?', why: 'Leading.' },
          { text: 'What should I check to judge how safe a street is at night?' },
          { text: 'Roma is dangerous, right?', why: 'Leading, and vague.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Which statement is wrong?',
        lines: [
          'A link must be opened to count.',
          'Asking "are you sure?" is a good check.',
          'Prices and rules need a current source.',
        ],
        bug: 1,
        fix: '"Are you sure?" just asks the same source again.',
        explanation: 'A real check uses something independent you can read yourself.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which neighbourhood\'s rent did the AI get wrong? (Two words.)',
        answers: ['Roma Norte', 'roma norte', 'Roma'],
        placeholder: 'Neighbourhood',
      },
      {
        kind: 'orderLines',
        prompt: 'Order Lucía\'s research routine.',
        lines: ['Ask AI for a first picture', 'Give criteria and compare', 'Mark the unknowns', 'Check sources and dates', 'Visit in person'],
      },
      {
        kind: 'mcq',
        prompt: 'Sofía\'s sticky note asks "Which of these did you check?" What\'s the lesson?',
        options: [
          { text: 'Know which parts of your research are checked and which are guesses' },
          { text: 'Don\'t use sticky notes', why: 'The note is the point.' },
          { text: 'Never use AI for research', why: 'Use it, and know what\'s checked.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Think of something you believe about your area or your job. Is it checked, or something you heard once?',
    starters: ['I believe...', 'It\'s checked / a guess because...'],
  },
  notes: 'Checkpoint for Chapter 2 lessons 1–4.',
};

export default lesson;
