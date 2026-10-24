import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 9 · Lesson 14 — when not to use AI for a message. */
const lesson: OriginalLesson = {
  key: 'l14',
  title: 'When not to use AI for a message',
  summary: 'Tolu\'s grandmother died, and Ada wants to send him a message. She opens the AI tool, then stops. Some messages should only come from you.',
  minutes: 12,
  outcomes: [
    'Know which messages should be fully your own',
    'Know a real case where an AI message backfired',
    'Use AI only for polish, or not at all, on personal messages',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'If an AI message reads well, it doesn\'t matter that AI wrote it.',
          isFact: false,
          explain: 'In 2023, a US university office sent a condolence email after a campus shooting that said it was "paraphrased from ChatGPT". It caused anger and an apology.',
        },
        {
          text: 'Condolences, apologies to close colleagues and personal thanks are best in your own words.',
          isFact: true,
          explain: 'These messages matter because a person took the time. Imperfect and real beats polished and generated.',
        },
        {
          text: 'You should never use AI for anything emotional.',
          isFact: false,
          explain: 'AI can help you think about what to say or check a tricky work message. For personal ones, write it yourself first.',
        },
        {
          text: 'Messages about someone\'s job, like a dismissal, need a human conversation, not just a written message.',
          isFact: true,
          explain: 'Big news about someone\'s life deserves a real conversation first. A written note can follow.',
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'warning',
      text: 'Condolences, personal thanks, close apologies and life-changing news: your words, ideally your voice. AI can help you think, not speak for you.',
    },
  ],
  apply: {
    scenario: 'Ada decides when to use AI.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Fine to draft with AI, or write it yourself?',
        groups: ['AI draft is fine', 'Write it yourself'],
        items: [
          { text: 'A meeting follow-up', group: 0 },
          { text: 'Condolences to Tolu', group: 1 },
          { text: 'A project status update', group: 0 },
          { text: 'A personal thank-you to a mentor', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What happened with the 2023 university condolence email?',
        options: [
          { text: 'Nobody noticed', why: 'People were upset.' },
          { text: 'It said it was paraphrased from ChatGPT, causing anger and an apology' },
          { text: 'It won an award', why: 'It caused anger.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'I need to tell a team member her role is ending. Can AI write the email?',
        prompt: 'Best reply from Ada?',
        options: [
          { text: 'Sure, send an AI email.', why: 'Life-changing news needs a person.' },
          { text: 'Don\'t tell her.', why: 'She deserves to know, properly.' },
          { text: 'That needs a conversation first, in person or on a call. AI could help you prepare what to say, but the news should come from you.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the rule.',
        template: 'AI can help you [[1]], not [[2]] for you.',
        blanks: [['think'], ['speak']],
        distractors: ['sleep', 'pay'],
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the best way for Ada to write to Tolu?',
        options: [
          { text: 'A short message in her own words, even if it\'s imperfect' },
          { text: 'Ask AI for a perfect condolence message', why: 'It should be hers.' },
          { text: 'Say nothing', why: 'A short real message helps.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which message plan is a mistake?',
        lines: [
          'Status update: AI draft, Ada checks',
          'Meeting notes: AI summary',
          'Condolences to Tolu: copy an AI template',
          'Client follow-up: AI draft, Ada checks promises',
        ],
        bug: 2,
        fix: 'Condolences: a few lines in Ada\'s own words.',
        explanation: 'Personal messages matter because they\'re personal.',
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Ada\'s message to Tolu.',
        tiles: ['I\'m', 'so', 'sorry', 'about', 'your', 'grandmother'],
        distractors: ['inconvenience'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the message to the right approach.',
        pairs: [
          ['Condolences', 'Your own words'],
          ['Dismissal news', 'A conversation first'],
          ['Project update', 'AI draft, you check'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Myth', 'Fact'],
        items: [
          { text: 'Never use AI for anything emotional', group: 0 },
          { text: 'Personal messages are best in your words', group: 1 },
          { text: 'It doesn\'t matter who wrote it if it reads well', group: 0 },
          { text: 'Big news deserves a conversation', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'In which year was the ChatGPT condolence email sent?',
        answers: ['2023'],
        placeholder: 'A year',
      },
      {
        kind: 'mcq',
        prompt: 'How can AI still help with a hard personal message?',
        options: [
          { text: 'Writing and sending it for you', why: 'It should be yours.' },
          { text: 'It can\'t help at all', why: 'It can help you think.' },
          { text: 'Helping you think about what matters to say, before you write it yourself' },
        ],
        answer: 2,
      },
      {
        kind: 'orderLines',
        prompt: 'Order how Ada handles a personal message.',
        lines: ['Notice it\'s personal', 'Close the AI tool', 'Write a few honest lines', 'Send it today'],
      },
    ],
  },
  reflect: {
    prompt: 'What kinds of messages will you always write yourself?',
    starters: ['I\'ll always write...', 'Because...'],
  },
  deepen: { title: 'Try it today', summary: 'Send one short personal thank-you today, in your own words, no AI.' },
  notes: 'Vanderbilt University\'s Peabody College, February 2023: a condolence email after the Michigan State shooting noted it was "paraphrased from OpenAI\'s ChatGPT"; administrators apologised.',
};

export default lesson;
