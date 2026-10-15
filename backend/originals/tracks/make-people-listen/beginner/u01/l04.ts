import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 4 — free. Step-by-step ("The Studio Whiteboard"): find your one point. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'The Studio Whiteboard: find your one point',
  summary: 'Tey wheels out the studio whiteboard. "Clinton, before you say anything to anyone, ever again, you do this." Five steps that turn a ramble into one sentence people remember.',
  minutes: 12,
  outcomes: [
    'Find the one point of any message before you say it',
    'Use the "one sentence, one action" test',
    'Cut everything that doesn\'t serve the point',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'The Studio Whiteboard: five steps to one point',
      steps: [
        {
          title: 'Dump it all out',
          body: 'Write down everything you want to say, messily. Clinton\'s list: exam stress, library, his new playlist, Saturday, snacks, why nobody replies, the lecturer\'s weird slides, 4 p.m.',
        },
        {
          title: 'Ask: what do I want them to DO?',
          body: 'Not think, not feel: do. Clinton: "Come to a study session." Everything else is decoration.',
        },
        {
          title: 'Ask: why should THEY care?',
          body: 'The listener\'s reason, not yours. "Revising together before the exam is easier and more fun than alone." If you can\'t find their reason, people won\'t listen.',
        },
        {
          title: 'Write one sentence',
          body: 'Action + reason + details. "Study session for the exam, library, Sunday 4 p.m., bring the topics you\'re stuck on." Twenty words. If it doesn\'t fit in one or two sentences, you don\'t know your point yet.',
        },
        {
          title: 'Cut the rest, or save it',
          body: 'The playlist, the weird slides, the snacks: cut, or save for later in the chat. One message, one point. Then stop.',
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'The one-point test: can you say it in one or two sentences, with an action and a reason for them? If not, you\'re not ready to send it.',
    },
  ],
  apply: {
    scenario: 'Tey FM. The Studio Whiteboard.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the five whiteboard steps in order.',
        lines: ['Dump it all out', 'What do I want them to do?', 'Why should they care?', 'Write one sentence', 'Cut the rest'],
      },
      {
        kind: 'mcq',
        prompt: 'Which is Clinton\'s one point?',
        options: [
          { text: 'The lecturer\'s slides are weird', why: 'True, perhaps. Not the point.' },
          { text: 'Come to a study session before the exam' },
          { text: 'Check out his new playlist', why: 'Save it for later.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Keep in the message, or cut?',
        groups: ['Keep', 'Cut'],
        items: [
          { text: 'Library, Sunday, 4 p.m.', group: 0 },
          { text: 'My new playlist', group: 1 },
          { text: 'Bring topics you\'re stuck on', group: 0 },
          { text: 'Why nobody ever replies to me', group: 1 },
          { text: 'It\'s easier to revise together', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'clinton',
        message: 'I can\'t fit it in one sentence. There\'s too much to say!',
        prompt: 'What does Tey tell him?',
        options: [
          { text: 'Then write a paragraph for each idea.', why: 'That\'s how sixty-three messages happen.' },
          { text: 'Use smaller font.', why: 'Ha. No.' },
          { text: 'Then you don\'t know your point yet. Go back to: what do you want them to DO?' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Step 3: why should ___ care? (one word: the listeners)',
        answers: ['they', 'them'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Why ask "why should THEY care" and not "why do I care"?',
        options: [
          { text: 'People listen for their own reasons, not yours' },
          { text: 'Your reasons don\'t matter at all', why: 'They matter to you. The listener needs their own.' },
          { text: 'It sounds more polite', why: 'It\'s about attention, not politeness.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Clinton\'s one sentence. Which part should go?',
        lines: [
          'Study session for the exam: library, Sunday 4 p.m.',
          'Bring the topics you\'re stuck on.',
          'Also has anyone heard my new playlist, link below, also the slides are weird.',
        ],
        bug: 2,
        fix: 'Delete it, or send it another day.',
        explanation: 'One message, one point. Extras bury the action.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the part of the sentence to its job.',
        pairs: [
          ['"Study session"', 'The action'],
          ['"for the exam"', 'Their reason'],
          ['"library, Sunday 4 p.m."', 'The details'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Lucía (who calls in Chapter 4) needs her team to send their reports by Thursday. Which passes the one-point test?',
        options: [
          { text: '"So, reports, there\'s a lot going on, the board, the deck, you know how it is..."', why: 'No clear action or deadline.' },
          { text: '"Please send your reports by Thursday noon so I can build the board deck on Friday."' },
          { text: '"Reports."', why: 'Too short: no deadline, no reason.' },
        ],
        answer: 1,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Clinton\'s one sentence.',
        tiles: ['Study', 'session:', 'library,', 'Sunday', '4', 'p.m.', 'Bring', 'your', 'questions.'],
        distractors: ['playlist'],
      },
    ],
  },
  reflect: {
    prompt: 'Think of something you need to tell someone this week. Do the whiteboard: what do you want them to do, why should they care, and your one sentence.',
    starters: ['I want them to...', 'They should care because...', 'My sentence: ...'],
  },
  deepen: {
    title: 'The one-sentence habit',
    summary: 'Before every important message this week, write your one sentence first, even just in your head. If you can\'t, wait until you can.',
  },
  notes: 'One-point/single-message discipline is standard communication advice (e.g. "commander\'s intent", BLUF); the "one point vs ten" finding is reported in Heath & Heath, Made to Stick (memorable speeches stressed a single point).',
};

export default lesson;
