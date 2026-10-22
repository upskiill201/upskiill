import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 3 · Chapter 3 · Lesson 9 — hinting vs. asking clearly about growth. Before / After. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Don\'t hint, ask',
  summary: 'Before his first ask, Clinton spent two months hinting: sighing about his title, mentioning friends who\'d been promoted. Ngozi never noticed. Miracle explains why hints almost never work.',
  minutes: 11,
  outcomes: ['Recognise hinting', 'Ask clearly about growth', 'Keep the ask about you, not others'],
  learn: [
    {
      kind: 'compare',
      title: 'Hinting vs. asking',
      before: { label: 'Hinting', text: '"My friend at another company just became a Developer after six months, haha." Sighs when "Graduate Developer" appears in an email. Jokes about his title in stand-up.\n\nNgozi hears small talk, or a complaint. She doesn\'t realise he wants a plan.' },
      after: { label: 'Asking clearly', text: '"In our next 1:1, could we spend ten minutes on my growth? I\'d like to work towards Developer and want to understand what that takes."\n\nClear, calm, about him. Ngozi puts it on the agenda.' },
      notes: [
        'Hints are easy to miss or misread as complaints.',
        'Ask for time to talk about growth, explicitly.',
        'Keep it about your criteria, not other people\'s promotions.',
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: '"Could we spend ten minutes on my growth?" Clear, calm, about you.',
    },
  ],
  apply: {
    scenario: 'Clinton stops hinting.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why didn\'t Ngozi notice the hints?',
        options: [
          { text: 'She ignores Clinton', why: 'Hints are just easy to miss.' },
          { text: 'Hints are easy to miss or sound like small talk or complaints' },
          { text: 'She was on leave', why: 'Hints are easy to miss.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Hint or clear ask?',
        groups: ['Hint', 'Clear ask'],
        items: [
          { text: 'Sighing about his title', group: 0 },
          { text: 'Could we spend ten minutes on my growth?', group: 1 },
          { text: 'My friend got promoted, haha', group: 0 },
          { text: 'I\'d like to work towards Developer', group: 1 },
          { text: 'Jokes about his title in stand-up', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick Clinton\'s clear ask.',
        from: 'clinton',
        message: 'How do I bring up growth without hinting?',
        options: [
          { text: '"Funny how some people get promoted fast..."', why: 'That\'s a hint.' },
          { text: 'Keep sighing until she asks.', why: 'Ask clearly.' },
          { text: '"In our next 1:1, could we spend ten minutes on my growth? I\'d like to work towards Developer."' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that makes it about others.',
        lines: ['I\'d like to work towards Developer.', 'If Kemi gets promoted before me I\'ll be upset.', 'What would that take?'],
        bug: 1,
        explanation: 'Keep it about your own criteria and growth.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put the clear ask in order.',
        lines: ['Ask for time in the next 1:1', 'Say what you\'d like to work towards', 'Ask what it would take'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each hint to a clear version.',
        pairs: [
          ['Sighing about the title', 'I\'d like to work towards Developer'],
          ['My friend got promoted', 'What would it take for me?'],
          ['Jokes in stand-up', 'Ten minutes on my growth in our 1:1?'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Where should Clinton raise growth?',
        options: [
          { text: 'In a 1:1, with time set aside' },
          { text: 'In a team stand-up, as a joke', why: 'A 1:1, clearly.' },
          { text: 'On social media', why: 'A 1:1.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the tip.',
        template: 'Clear, [[1]], about [[2]].',
        blanks: [['calm'], ['you']],
        distractors: ['loud', 'others', 'money'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many minutes does Clinton ask for? (a number)',
        answers: ['10', 'ten'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'About your growth, or about others?',
        groups: ['Your growth', 'Others'],
        items: [
          { text: 'What would it take for me?', group: 0 },
          { text: 'Why did he get promoted?', group: 1 },
          { text: 'Which gap should I work on first?', group: 0 },
          { text: 'She doesn\'t deserve it', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Is there something you\'ve been hinting about instead of asking for? How could you ask clearly?',
    starters: ['I\'ve been hinting about...', 'I could ask...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Replace one hint with a clear ask this week: "Could we spend ten minutes on...?"',
  },
  notes: 'Common communication advice. Where you live: directness norms vary; a clear but polite request travels well.',
};

export default lesson;
