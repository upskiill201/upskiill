import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 4. Before/After: boundary vs ultimatum. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Boundary vs ultimatum',
  summary: 'Jayden comes home at midnight with the car. Grace has two speeches ready: one is an ultimatum, one is a boundary. They sound similar. They work very differently.',
  minutes: 12,
  outcomes: [
    'Tell a boundary from an ultimatum',
    'Set consequences you control and can keep',
    'Keep the relationship while holding the line',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Ultimatum vs boundary',
      before: {
        label: 'Ultimatum',
        text: '"If you EVER take the car without asking again, you\'ll never drive it again. Do you hear me?"\nA threat, said in anger.\n"Never" is impossible to keep, and Jayden knows it.\nIt\'s about punishing him, not about what Grace needs.',
      },
      after: {
        label: 'Boundary',
        text: '"I need the car for work some mornings, and I worry when I don\'t know where you are. From now on, I\'ll lend it when you ask the day before. If it\'s taken without asking, I\'ll keep the keys with me for that week."\nCalm, about her needs.\nA consequence she controls and can actually keep.',
      },
      notes: [
        'Ultimatums threaten the other person. Boundaries describe what you\'ll do.',
        'Choose consequences you control and are willing to keep. "Never" usually isn\'t.',
        'Say the reason. It turns a rule into something the other person can understand.',
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'An ultimatum threatens. A boundary explains what you need and what you\'ll do, with a consequence you can keep.',
    },
  ],
  apply: {
    scenario: 'Midnight.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Ultimatum or boundary?',
        groups: ['Ultimatum', 'Boundary'],
        items: [
          { text: '"You\'ll never drive it again!"', group: 0 },
          { text: '"I\'ll lend it when you ask the day before."', group: 1 },
          { text: '"Do that again and you\'re out!"', group: 0 },
          { text: '"If it\'s taken without asking, I\'ll keep the keys that week."', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why is "never drive it again" a weak consequence?',
        options: [
          { text: 'It\'s impossible to keep, and Jayden knows it' },
          { text: 'It\'s too gentle', why: 'It\'s too extreme to keep.' },
          { text: 'It\'s a strong consequence', why: 'Unkeepable threats lose credibility.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the part of the boundary to its job.',
        pairs: [
          ['"I need the car for work"', 'Her need'],
          ['"I worry when I don\'t know"', 'Her feeling'],
          ['"I\'ll lend it when you ask"', 'The path'],
          ['"I\'ll keep the keys that week"', 'A consequence she controls'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'jayden',
        message: 'That\'s so unfair. Dad would let me.',
        prompt: "Grace's best reply?",
        options: [
          { text: '"I hear you. I\'m not saying no to the car. I\'m saying ask the day before. That\'s it."' },
          { text: '"Then go and live with Dad!"', why: 'That escalates into a family fight.' },
          { text: '"Fine, take it whenever."', why: 'The boundary disappears at the first push.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Choose consequences you [[1]] and are willing to [[2]].',
        blanks: [['control'], ['keep']],
        distractors: ['fear', 'forget'],
      },
      {
        kind: 'mcq',
        prompt: 'Why say the reason (work mornings, worry)?',
        options: [
          { text: 'It turns a rule into something Jayden can understand and respect' },
          { text: 'To make him feel guilty', why: 'It\'s to explain, not guilt-trip.' },
          { text: 'It\'s not needed', why: 'Reasons make boundaries easier to accept.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line turns Grace\'s boundary into an ultimatum?',
        lines: [
          'I need the car for work some mornings.',
          'I\'ll lend it when you ask the day before.',
          'And if you ever do it again, you\'re grounded for a year.',
          'If it\'s taken without asking, I\'ll keep the keys that week.',
        ],
        bug: 2,
        fix: 'Delete it.',
        explanation: 'An extreme threat she won\'t keep.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'For how long will Grace keep the keys if the car is taken without asking? (e.g. one week)',
        answers: ['week', 'a week', 'one week', '1 week'],
        placeholder: 'How long',
      },
      {
        kind: 'sortGroups',
        prompt: 'A consequence Grace controls, or one she doesn\'t?',
        groups: ['She controls', 'She doesn\'t'],
        items: [
          { text: 'Keeping the keys with her', group: 0 },
          { text: 'Making him feel sorry', group: 1 },
          { text: 'Not lending it that week', group: 0 },
          { text: 'Making him never want the car', group: 1 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Order a boundary conversation.',
        lines: ['Calm down first', 'Say your need and feeling', 'Say what you will do', 'Say the consequence you\'ll keep', 'Listen to their reply'],
      },
    ],
  },
  reflect: {
    prompt: 'Think of a threat you\'ve made (or wanted to). Rewrite it as a boundary with a consequence you\'ll actually keep.',
    starters: ['The threat was...', 'The boundary is...'],
  },
  deepen: {
    title: 'Ultimatums at work',
    summary: '"Give me a raise or I quit" is an ultimatum. "I\'m looking for a role that pays X; I\'d rather it was here" is a boundary with honest information. The second keeps doors open.',
  },
  notes: 'Boundary vs ultimatum framing from assertiveness and family-communication practice. Fictional dialogue.',
};

export default lesson;
