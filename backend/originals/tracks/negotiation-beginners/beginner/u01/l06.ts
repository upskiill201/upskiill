import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 6. Before/After: accept vs ask, the rent text. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Accept vs ask: the rent text',
  summary: 'Ada\'s "OK sir" went out in four minutes. Mr Adeyemi hasn\'t sent the new agreement yet, so it isn\'t too late. Remi helps her write the text she should have sent.',
  minutes: 11,
  outcomes: [
    'Turn an instant yes into an open question',
    'Keep a message polite, short and clear',
    'Ask for a conversation, not a fight',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Accepting vs asking',
      before: {
        label: 'Accepting',
        text: 'OK sir. No problem. Thank you.',
      },
      after: {
        label: 'Asking',
        text: 'Good morning, Mr Adeyemi. Thank you for letting me know. I\'ve been here two years, always paid on time, and I\'d like to stay. ₦1,500,000 is a big jump for me. Could we meet this week to talk about it?',
      },
      notes: [
        'It\'s still polite. Respect and asking go together.',
        'It reminds him what she\'s worth to him: two years, always on time.',
        'It asks for a conversation, not a number yet. She\'ll prepare that in Chapter 2.',
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'If you said yes too fast, it\'s often not too late. "Could we talk about it?" reopens the door politely.',
    },
  ],
  apply: {
    scenario: 'Rewriting "OK sir".',
    items: [
      {
        kind: 'mcq',
        prompt: 'What does Ada\'s new text ask for?',
        options: [
          { text: 'A conversation about the rent' },
          { text: 'A specific lower number', why: 'Not yet; she\'ll prepare one first.' },
          { text: 'An apology', why: 'He has done nothing wrong.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Asking well, or accepting?',
        groups: ['Asking well', 'Accepting'],
        items: [
          { text: '"Could we meet to talk about it?"', group: 0 },
          { text: '"OK sir, no problem."', group: 1 },
          { text: '"I\'ve always paid on time."', group: 0 },
          { text: '"Whatever you decide."', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the line to its job.',
        pairs: [
          ['"Thank you for letting me know."', 'Keeps it polite'],
          ['"Two years, always on time."', 'Shows her value'],
          ['"I\'d like to stay."', 'Shows she wants a deal'],
          ['"Could we meet this week?"', 'Opens the conversation'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'But I already said OK. Isn\'t it rude to change my mind?',
        prompt: "Remi's best reply?",
        options: [
          { text: 'He hasn\'t sent the agreement yet. Saying "I\'d like to talk about it first" is honest, not rude.' },
          { text: 'Yes, you\'re stuck now.', why: 'Nothing is signed yet.' },
          { text: 'Just ignore him.', why: 'Silence makes it worse.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Reopening the door.',
        template: '"Could we [[1]] about it?" reopens the door [[2]].',
        blanks: [['talk'], ['politely']],
        distractors: ['argue', 'angrily'],
      },
      {
        kind: 'mcq',
        prompt: 'Why does Ada mention two years of paying on time?',
        options: [
          { text: 'A reliable tenant is worth a lot to a landlord' },
          { text: 'To show off', why: 'It\'s relevant: it\'s her value to him.' },
          { text: 'It\'s not useful', why: 'It\'s one of her strongest points.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of this draft text is the problem?',
        lines: [
          'Good morning, Mr Adeyemi.',
          'I\'ve been here two years, always on time.',
          'This rise is greedy and I won\'t pay it.',
          'Could we meet this week?',
        ],
        bug: 2,
        fix: '₦1,500,000 is a big jump for me.',
        explanation: 'Attacking him turns a talk into a fight.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order Ada\'s new text.',
        lines: ['Greet him', 'Thank him for telling her', 'Show her value', 'Say she wants to stay', 'Ask to meet'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many years has Ada lived in the flat?',
        answers: ['2', 'two'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Good to include now, or save for the meeting?',
        groups: ['Include now', 'Save for later'],
        items: [
          { text: 'That she wants to stay', group: 0 },
          { text: 'Her exact counter-offer', group: 1 },
          { text: 'A request to meet', group: 0 },
          { text: 'A list of repairs she wants', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Is there a recent yes you\'d like to reopen? Write a polite "Could we talk about it?" message.',
    starters: ['I said yes to...', 'My message:...'],
  },
  deepen: {
    title: 'Ask for the meeting first',
    summary: 'For bigger negotiations, asking for a conversation gives both sides time to prepare. Numbers that arrive by surprise in a text are easy to refuse.',
  },
  notes: 'Fictional landlord exchange. Ada has rented for two years, always on time; the new agreement hasn\'t been sent.',
};

export default lesson;
