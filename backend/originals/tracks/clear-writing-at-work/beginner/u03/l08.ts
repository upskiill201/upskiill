import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 8. Myth or Fact: point-first myths. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Point-first myths',
  summary: 'Zanele\'s manager says context should come first. Remi says deadlines are pushy. Felix says nobody reads subject lines. Fact or myth?',
  minutes: 11,
  outcomes: [
    'Answer common objections to point-first writing',
    'Use deadlines without sounding pushy',
    'Know where context belongs',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'You must give background before the ask, or it\'s rude.',
          isFact: false,
          explain: 'Myth. A greeting and a clear ask is polite. Background can follow for anyone who needs it.',
        },
        {
          text: 'A deadline with a reason helps people plan.',
          isFact: true,
          explain: 'Fact. "By Friday, so rotas go out Monday" gives a clear target and a reason, which most readers appreciate.',
        },
        {
          text: 'Nobody reads subject lines.',
          isFact: false,
          explain: 'Myth. The subject line is often the first and only thing people see when deciding what to open.',
        },
        {
          text: 'Specific asks usually get faster, more useful replies than vague ones.',
          isFact: true,
          explain: 'Fact. "Send weekend counts using this template by Thursday" got a reply in an hour; "send some data" would get questions.',
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Ask first, background after. Deadlines with reasons help. Subject lines matter. Specific beats vague.',
    },
  ],
  apply: {
    scenario: 'Point-first myths.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Myth', 'Fact'],
        items: [
          { text: 'Background must come first', group: 0 },
          { text: 'A deadline with a reason helps', group: 1 },
          { text: 'Nobody reads subject lines', group: 0 },
          { text: 'Specific asks get better replies', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'How do you keep a deadline from sounding pushy?',
        options: [
          { text: 'Use capitals', why: 'That\'s pushier.' },
          { text: 'Give the reason: "By Friday, so rotas go out Monday."' },
          { text: 'Never give deadlines', why: 'They help planning.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'remi',
        message: 'Putting "by Friday" in an email to the CEO feels pushy.',
        prompt: "Zanele\'s best reply?",
        options: [
          { text: 'You\'re right, I\'ll remove it.', why: 'Then he can\'t prioritise.' },
          { text: 'Make it "by today".', why: 'Use the real deadline.' },
          { text: 'With the reason, it\'s helpful: he knows when, and why. Without it, he has to guess how urgent it is.' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the myth to the truth.',
        pairs: [
          ['"Background first is polite"', 'Greeting plus ask is polite'],
          ['"Deadlines are pushy"', 'Deadlines with reasons help'],
          ['"Subjects don\'t matter"', 'Subjects decide what gets opened'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'A good deadline.',
        template: '"By [[1]], so [[2]] go out Monday."',
        blanks: [['Friday'], ['rotas']],
        distractors: ['whenever', 'trucks'],
      },
      {
        kind: 'mcq',
        prompt: 'Where should background go?',
        options: [
          { text: 'After the ask, or in an attachment' },
          { text: 'Before the ask', why: 'That buries it.' },
          { text: 'Nowhere, ever', why: 'After the ask is fine.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which belief in Felix\'s notes is a myth?',
        lines: [
          'Put the ask first.',
          'Attach what people need.',
          'Subject lines don\'t matter; write "hi".',
          'Number multiple asks.',
        ],
        bug: 2,
        fix: 'Write type, topic and deadline in the subject.',
        explanation: 'Subjects decide what gets opened.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'How long did Emeka take to reply to the specific ask, in hours?',
        answers: ['1', 'one'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Specific or vague ask?',
        groups: ['Specific', 'Vague'],
        items: [
          { text: '"Weekend counts by Thursday, in this template"', group: 0 },
          { text: '"Some data when you can"', group: 1 },
          { text: '"Approve June: yes or no?"', group: 0 },
          { text: '"Let me know"', group: 1 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Order a polite, point-first email.',
        lines: ['Greeting', 'The ask', 'The reason and deadline', 'Background if needed', 'Thanks'],
      },
    ],
  },
  reflect: {
    prompt: 'Which point-first myth has held you back? Rewrite one email to prove it wrong.',
    starters: ['I believed...', 'Rewritten:...'],
  },
  deepen: {
    title: 'Culture and directness',
    summary: 'Some workplaces and cultures prefer more context before an ask. Even then, a clear subject line and an ask that\'s easy to find help every reader.',
  },
  notes: 'Myth/fact synthesis; cultural directness differences (e.g. Erin Meyer, The Culture Map, 2014).',
};

export default lesson;
