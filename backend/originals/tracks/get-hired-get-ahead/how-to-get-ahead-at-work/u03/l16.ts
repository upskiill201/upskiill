import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 3 · Chapter 3 · Lesson 16 — promotion myths. Myth or Fact. */
const lesson: OriginalLesson = {
  key: 'l16',
  title: 'Promotion myths',
  summary: '"Promotions come with time." "The best coder always gets promoted." "Asking for one makes you look arrogant." The graduate group chat again. Myth or fact?',
  minutes: 11,
  outcomes: ['Spot promotion myths', 'Know what promotions are usually based on', 'Ask without fear'],
  learn: [
    {
      kind: 'myth',
      statements: [
        { text: 'Promotions come automatically with time.', isFact: false, explain: 'Time alone rarely decides it. Evidence that you\'re working at the next level usually does.' },
        { text: 'The best individual performer always gets promoted.', isFact: false, explain: 'Higher levels often need more than individual skill: leading work, explaining decisions, helping others.' },
        { text: 'Asking about promotion criteria is usually welcome.', isFact: true, explain: 'Most managers would rather you ask than guess. "What would you need to see?" is a respected question.' },
        { text: 'A "not yet" can be the start of a promotion.', isFact: true, explain: 'Clinton\'s "not yet" in month six turned into a plan with a date.' },
        { text: 'A promotion always comes with an immediate raise.', isFact: false, explain: 'Often, but not always. Some companies change titles first and pay at the next review. Ask.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Evidence over time. More than individual skill. Ask about criteria and pay. "Not yet" can be a beginning.',
    },
  ],
  apply: {
    scenario: 'Clinton busts promotion myths.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Fact', 'Myth'],
        items: [
          { text: 'Asking about criteria is welcome', group: 0 },
          { text: 'Promotions come with time', group: 1 },
          { text: '"Not yet" can start a promotion', group: 0 },
          { text: 'The best coder always gets promoted', group: 1 },
          { text: 'Promotion always means an instant raise', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'david',
        message: 'I\'m the best student on my rotation. Surely I\'ll be picked for chief resident?',
        options: [
          { text: 'Definitely, skill is all that matters.', why: 'Higher roles need more than skill.' },
          { text: 'Maybe, but they\'ll likely want leadership and teaching too. Ask what they look for.' },
          { text: 'Never ask, just wait.', why: 'Ask what they look for.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        prompt: 'What do higher levels usually need beyond individual skill?',
        options: [
          { text: 'Longer hours', why: 'Leadership and influence.' },
          { text: 'Nothing more', why: 'They usually need more.' },
          { text: 'Leading work, explaining decisions, helping others' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the myth.',
        lines: ['Evidence at the next level matters.', 'Asking for criteria looks arrogant.', 'Pay may change at the next review.'],
        bug: 1,
        explanation: 'Asking for criteria is usually welcome.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each myth to the truth.',
        pairs: [
          ['Promotions come with time', 'Evidence decides'],
          ['Best performer wins', 'Leading and helping matter too'],
          ['Always an instant raise', 'Ask when pay changes'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'What\'s a respected question about promotions?',
        options: [
          { text: '"What would you need to see from me?"' },
          { text: '"Why not me already?"', why: 'Ask what they\'d need to see.' },
          { text: '"Who else is up for it?"', why: 'Ask about your own criteria.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the tip.',
        template: '[[1]] over time. "Not yet" can be a [[2]].',
        blanks: [['Evidence'], ['beginning', 'start']],
        distractors: ['Luck', 'end', 'wall'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Does time alone usually decide a promotion? (yes or no)',
        answers: ['no'],
        placeholder: 'Yes or no',
      },
      {
        kind: 'sortGroups',
        prompt: 'Helps your promotion, or not?',
        groups: ['Helps', 'Doesn\'t'],
        items: [
          { text: 'Evidence against the ladder', group: 0 },
          { text: 'Waiting quietly for years', group: 1 },
          { text: 'A sponsor who\'s seen your work', group: 0 },
          { text: 'Complaining about others\' promotions', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'Someone says asking for a promotion makes you look arrogant. What do you say?',
        options: [
          { text: 'True, never ask.', why: 'Asking well is professional.' },
          { text: 'Demand it loudly instead.', why: 'Ask with evidence.' },
          { text: 'Asking what it takes, with evidence, usually looks professional, not arrogant.' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Which promotion myth have you believed? What would you do differently now?',
    starters: ['I believed...', 'Now I would...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Ask someone who has been promoted: "What made the difference?" Compare their answer with these myths.',
  },
  notes: 'Myths reflect common beliefs; kept qualitative.',
};

export default lesson;
