import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 7. Chat with Tey: one ask per message. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'One ask per message',
  summary: 'Brian sends Zanele an email with seven questions. She answers three; he\'s annoyed about the other four. Tey explains why multiple asks get partial answers, and what to do when you really need several.',
  minutes: 12,
  outcomes: [
    'Keep to one main ask per message',
    'Number asks when you need several',
    'Reply to multi-question emails fully',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Rogers and Lasky-Fink found readers often answer the first request and miss the rest. More asks, fewer answers.', replies: ['But Brian really does need seven things.'] },
        { tey: 'Then he should number them, one line each, and say which matter most: "Two urgent, five can wait."', replies: ['And when I reply to his seven?'] },
        { tey: 'Copy his numbers and answer each: "1. Yes. 2. Friday. 3. Attached." Nobody has to hunt for your answers.', replies: ['Should I split mine into separate emails?'] },
        { tey: 'If they go to different people, yes. If it\'s the same person and related, one email with numbered asks, the urgent one first.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'One ask per message when you can. If you need several, number them and say which are urgent.',
    },
  ],
  apply: {
    scenario: 'Seven questions.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What tends to happen to emails with many requests?',
        options: [
          { text: 'Readers answer some and miss the rest' },
          { text: 'They get answered faster', why: 'Fewer asks, more answers.' },
          { text: 'Nothing different', why: 'More asks, fewer answers.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Helps multiple asks get answered, or not?',
        groups: ['Helps', 'Doesn\'t'],
        items: [
          { text: 'Numbering each ask', group: 0 },
          { text: 'Hiding asks in paragraphs', group: 1 },
          { text: 'Marking which are urgent', group: 0 },
          { text: 'Seven asks in one sentence', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many questions did Brian send?',
        answers: ['7', 'seven'],
        placeholder: 'A number',
      },
      {
        kind: 'chatReply',
        from: 'brian',
        message: 'You only answered three of my seven questions!',
        prompt: "Zanele\'s best reply?",
        options: [
          { text: '"Your email was too long."', why: 'True, but answer him first.' },
          { text: '"Sorry, they were in different paragraphs. Here are all seven, numbered: 1. Yes. 2. Friday..."' },
          { text: '"Which seven?"', why: 'Find them and answer.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the situation to the approach.',
        pairs: [
          ['Asks for different people', 'Separate emails'],
          ['Several related asks, one person', 'One email, numbered'],
          ['One urgent, others can wait', 'Urgent one first, labelled'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Replying to many questions.',
        template: 'Copy their [[1]] and answer [[2]] one.',
        blanks: [['numbers'], ['each', 'every']],
        distractors: ['jokes', 'no'],
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the best layout for three asks to one person?',
        options: [
          { text: 'One long paragraph', why: 'Asks get lost.' },
          { text: 'Three separate emails at once', why: 'Related asks can share one email.' },
          { text: 'Numbered, one line each, urgent first' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Which line makes this multi-ask email harder?',
        lines: [
          'Two urgent asks, both by Friday:',
          '1. Approve the June pilot (yes/no).',
          '2. Approve two driver contracts (yes/no).',
          'Also, a few other things I\'ve been meaning to ask about, mixed in below...',
        ],
        bug: 3,
        fix: 'Send other questions separately, later.',
        explanation: 'It buries the urgent asks.',
      },
      {
        kind: 'sortGroups',
        prompt: 'Urgent or can wait?',
        groups: ['Urgent', 'Can wait'],
        items: [
          { text: 'Approve June by Friday', group: 0 },
          { text: 'Ideas for next year', group: 1 },
          { text: 'Sign driver contracts before 31 May', group: 0 },
          { text: 'Thoughts on new logo colours', group: 1 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Order an email with several asks.',
        lines: ['Say how many asks and the deadline', 'List the urgent ones first, numbered', 'Then any that can wait', 'Attach what they need'],
      },
    ],
  },
  reflect: {
    prompt: 'Look at an email where you asked several things. Which got answered? Rewrite it with numbered asks.',
    starters: ['Got answered:...', 'Rewritten:...'],
  },
  deepen: {
    title: 'Fewer requests',
    summary: 'In Rogers and Lasky-Fink\'s research, messages with fewer requests generally got more of them done. If an ask isn\'t essential, save it for another day.',
  },
  notes: 'Rogers & Lasky-Fink (2023): "make fewer requests" under less is more; readers tend to act on the first request. Fictional exchange.',
};

export default lesson;
