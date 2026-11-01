import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 8. Chat with Tey: writing in a second language. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Writing in your second (or third) language',
  summary: 'Zanele still rehearses important messages in her head. Tey gives her habits that make writing in another language easier, and clearer for international readers too.',
  minutes: 12,
  outcomes: [
    'Use habits that help when writing in another language',
    'Avoid idioms that confuse international readers',
    'Write with confidence, not apology',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Your plain style is a strength here. Short sentences are easier to get right in any language, and easier for Emeka in Lagos or a client in Johannesburg to read.', replies: ['What else helps?'] },
        { tey: 'Avoid idioms: "ballpark", "touch base", "hit the ground running". Readers from other places may not know them. Say the plain meaning.', replies: ['And grammar worries?'] },
        { tey: 'Read it aloud, slowly. You\'ll catch most mistakes by ear. For important messages, a spell-checker or a trusted colleague helps.', replies: ['Should I apologise for my English?'] },
        { tey: 'No. "Sorry for my English" makes readers look for mistakes. Your English is clear. Clear is the goal, not perfect.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Short sentences, no idioms, read it aloud, and never apologise for your English. Clear beats perfect.',
    },
  ],
  apply: {
    scenario: 'Second-language writing.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match the idiom to its plain version.',
        pairs: [
          ['"Ballpark figure"', '"Rough estimate"'],
          ['"Hit the ground running"', '"Start working quickly"'],
          ['"Touch base"', '"Talk"'],
          ['"Ahead of the curve"', '"Early"'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why avoid idioms with international readers?',
        options: [
          { text: 'They may not know them, so the meaning gets lost' },
          { text: 'Idioms are rude', why: 'They\'re just unclear to some.' },
          { text: 'They\'re too short', why: 'It\'s about meaning.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Helps second-language writing, or not?',
        groups: ['Helps', 'Doesn\'t'],
        items: [
          { text: 'Reading it aloud slowly', group: 0 },
          { text: '"Sorry for my bad English"', group: 1 },
          { text: 'Short sentences', group: 0 },
          { text: 'Long words to sound fluent', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'zanele',
        message: 'I always add "sorry for any mistakes in my English".',
        prompt: "Tey's best reply?",
        options: [
          { text: 'Keep it, it\'s polite.', why: 'It draws attention to errors.' },
          { text: 'Write in capitals so it\'s clearer.', why: 'No.' },
          { text: 'Drop it. It makes people hunt for mistakes, and your English is clear. Let the message speak.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'The goal.',
        template: '[[1]] beats [[2]].',
        blanks: [['Clear'], ['perfect']],
        distractors: ['Long', 'short'],
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the simplest way to catch mistakes?',
        options: [
          { text: 'Write it faster', why: 'Slow down.' },
          { text: 'Read it aloud slowly' },
          { text: 'Add more words', why: 'Read it aloud.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Zanele\'s email to a client in Johannesburg is risky?',
        lines: [
          'Thank you for the meeting.',
          'Here is a rough estimate: KES 2 million a year.',
          'Let\'s touch base and circle back once we\'ve got our ducks in a row.',
          'Could we talk on Thursday?',
        ],
        bug: 2,
        fix: 'Let\'s talk again once we have the final numbers.',
        explanation: 'Three idioms in one sentence.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'What\'s the plain version of "ballpark figure"? (two words)',
        answers: ['rough estimate', 'estimate', 'rough figure'],
        placeholder: 'Two words',
      },
      {
        kind: 'sortGroups',
        prompt: 'Idiom or plain?',
        groups: ['Idiom', 'Plain'],
        items: [
          { text: '"Low-hanging fruit"', group: 0 },
          { text: '"Easy first steps"', group: 1 },
          { text: '"Move the needle"', group: 0 },
          { text: '"Make a real difference"', group: 1 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Order Zanele\'s routine for important messages.',
        lines: ['Write draft one', 'Cut and simplify', 'Remove idioms', 'Read it aloud', 'Send without apologising'],
      },
    ],
  },
  reflect: {
    prompt: 'List three idioms you use at work. Write their plain versions.',
    starters: ['Idiom:... Plain:...'],
  },
  deepen: {
    title: 'Global English',
    summary: 'In international teams, many readers use English as an additional language. Writing in plain "global English" makes your messages easier for everyone, including native speakers.',
  },
  notes: 'Advice synthesised from plain-language and international business-writing guidance.',
};

export default lesson;
