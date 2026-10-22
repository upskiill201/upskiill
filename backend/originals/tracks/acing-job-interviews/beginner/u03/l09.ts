import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 9. Tap to explore: interview card v3, the story bank. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Interview card v3',
  summary: 'Remi\'s interview card now has the most important section of all: six STAR stories, each tagged with the questions it answers. Tap each one.',
  minutes: 11,
  outcomes: [
    'Add a story bank to your interview card',
    'Tag each story with the questions it answers',
    'Check your stories for honesty and numbers',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Remi\'s interview card v3: story bank',
      text: 'Booking app: 120 weekly users; initiative, real users. Kevin: tested both designs, two days early, A-minus; conflict, teamwork. Hackathon: crash at three minutes, five phones, memory bug; failure, learning. Coding club: 8 members; leadership. Exam week: fixed the app by midnight; deadlines. Uncle\'s spreadsheet: stock for a small shop; customers. Rules: STAR, Action longest, "I" for my actions, real numbers only, one to two minutes.',
      hotspots: [
        { phrase: 'Booking app: 120 weekly users', note: 'Lesson 6: the real number, not 1,200.' },
        { phrase: 'tested both designs, two days early, A-minus', note: 'Lesson 2: the Kevin story rebuilt in STAR.' },
        { phrase: 'Hackathon: crash at three minutes', note: 'Lesson 4: a failure story with numbers and a lesson.' },
        { phrase: 'Uncle\'s spreadsheet', note: 'Lesson 8: real experience counts wherever it happened.' },
        { phrase: 'Action longest', note: 'Lesson 2: the part interviewers score.' },
        { phrase: 'real numbers only', note: 'Lesson 6: polish the telling, never the facts.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'v3 adds six STAR stories, tagged with the questions each one answers.',
    },
  ],
  apply: {
    scenario: 'Interview card v3.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match the story to its main tag.',
        pairs: [
          ['Booking app', 'Initiative'],
          ['Kevin', 'Conflict'],
          ['Hackathon', 'Failure'],
          ['Coding club', 'Leadership'],
          ['Exam week', 'Deadlines'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'At how many minutes into the demo did the hackathon app crash?',
        answers: ['3', 'three'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: '"Tell me about a time you helped a customer." Which story?',
        options: [
          { text: 'The Kevin story', why: 'That\'s conflict.' },
          { text: 'The uncle\'s spreadsheet' },
          { text: 'The coding club', why: 'That\'s leadership.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Story rule on the card, or not?',
        groups: ['On the card', 'Not'],
        items: [
          { text: 'Action longest', group: 0 },
          { text: 'Round numbers up', group: 1 },
          { text: '"I" for my actions', group: 0 },
          { text: 'Five minutes per story', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'remi',
        message: 'What if they ask something none of my six stories fits?',
        prompt: "Ada's best reply?",
        options: [
          { text: 'Pause, pick the closest story and stress the part they asked about. Or say honestly you haven\'t faced that, and how you\'d approach it.' },
          { text: 'Invent a seventh.', why: 'Never invent.' },
          { text: 'Refuse to answer.', why: 'Closest fit or an honest approach.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Card rules.',
        template: 'STAR, Action [[1]], "I" for my actions, real [[2]] only.',
        blanks: [['longest'], ['numbers']],
        distractors: ['shortest', 'friends'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many stories are on card v3?',
        answers: ['6', 'six'],
        placeholder: 'A number',
      },
      {
        kind: 'findBug',
        prompt: 'Which line in this copy of the card is wrong?',
        lines: [
          'Booking app: 120 weekly users.',
          'Kevin: two days early, A-minus.',
          'Hackathon: we won first prize.',
          'Coding club: 8 members.',
        ],
        bug: 2,
        fix: 'Hackathon: crash at three minutes; didn\'t place.',
        explanation: 'They didn\'t win; the story is about what he changed.',
      },
      {
        kind: 'mcq',
        prompt: 'What\'s new on v3?',
        options: [
          { text: 'A salary answer', why: 'That\'s Chapter 4.' },
          { text: 'A bank of six STAR stories with tags' },
          { text: 'Nothing', why: 'v3 adds the story bank.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Order how to use the story bank in an interview.',
        lines: ['Hear the question', 'Pick the best-fit story', 'Tell it in STAR', 'Stress what they asked about'],
      },
    ],
  },
  reflect: {
    prompt: 'Add your six stories to your own card, each with a tag and one number.',
    starters: ['Story 1:...', 'Tag:...'],
  },
  notes: 'Interview card v3 (fictional) adds the story bank.',
};

export default lesson;
