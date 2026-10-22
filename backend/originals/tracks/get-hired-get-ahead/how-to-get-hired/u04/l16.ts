import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 2 · Chapter 4 · Lesson 16 — rejection myths. Myth or Fact. */
const lesson: OriginalLesson = {
  key: 'l16',
  title: 'Rejection myths',
  summary: '"If they say no, it means you were bad." "Asking for feedback is rude." "Successful people don\'t get rejected." The group chat has opinions again. Myth or fact?',
  minutes: 11,
  outcomes: ['Spot common myths about rejection', 'Ask for feedback with confidence', 'See rejection as a normal part of a search'],
  learn: [
    {
      kind: 'myth',
      statements: [
        { text: 'A rejection means you were a bad candidate.', isFact: false, explain: 'Often someone was a slightly closer fit, there was an internal candidate, or the role changed. Brenda said Clinton was "very close".' },
        { text: 'Asking for feedback after a rejection is rude.', isFact: false, explain: 'A short, polite request is normal. Not every company answers, but many respect being asked.' },
        { text: 'Many people get rejected many times before a yes.', isFact: true, explain: 'A no is a normal part of most searches, including for people with great careers later.' },
        { text: 'Replying graciously can help you later.', isFact: true, explain: 'People remember how you handled a no. Brenda\'s "I hope our paths cross again" came from Clinton\'s reply.' },
        { text: 'Successful people rarely get rejected.', isFact: false, explain: 'You see their wins, not their noes. Many describe long lists of rejections on the way.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'A no is normal, often not about you, and handled well it can open doors later.',
    },
  ],
  apply: {
    scenario: 'Clinton sorts the group chat\'s rejection myths.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Fact', 'Myth'],
        items: [
          { text: 'Gracious replies can help later', group: 0 },
          { text: 'A no means you were bad', group: 1 },
          { text: 'Asking for feedback is rude', group: 1 },
          { text: 'Many people hear no many times', group: 0 },
          { text: 'Successful people are rarely rejected', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'david',
        message: 'I\'m scared to ask why they rejected me. Won\'t they think I\'m annoying?',
        options: [
          { text: 'Yes, never ask.', why: 'A polite ask is normal.' },
          { text: 'A short, polite ask is normal. If they don\'t reply, that\'s fine too.' },
          { text: 'Demand an explanation.', why: 'Ask politely, without pressure.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        prompt: 'Why do successful people seem to never get rejected?',
        options: [
          { text: 'They\'re never rejected', why: 'Most were, often many times.' },
          { text: 'They hide in caves', why: 'Ha. You just don\'t see the noes.' },
          { text: 'You see their wins, not their noes' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the myth.',
        lines: ['Brenda said it was very close.', 'So Clinton must be a terrible developer.', 'He can work on testing.'],
        bug: 1,
        explanation: '"Very close" is the opposite of terrible.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each myth to the truth.',
        pairs: [
          ['A no means you were bad', 'Often a closer fit or timing'],
          ['Feedback requests are rude', 'A polite ask is normal'],
          ['Winners aren\'t rejected', 'You only see their wins'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'What did Clinton\'s gracious reply lead to?',
        options: [
          { text: 'Real feedback and "I hope our paths cross again"' },
          { text: 'Nothing', why: 'It led to real feedback and an open door.' },
          { text: 'An instant job', why: 'Not instantly. It opened a door.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the tip.',
        template: 'A no is [[1]], and often not about [[2]].',
        blanks: [['normal'], ['you']],
        distractors: ['final', 'forever', 'money'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Is it normal to be rejected many times in a job search? (yes or no)',
        answers: ['yes'],
        placeholder: 'Yes or no',
      },
      {
        kind: 'sortGroups',
        prompt: 'Helpful belief, or harmful?',
        groups: ['Helpful', 'Harmful'],
        items: [
          { text: 'Each no teaches me something', group: 0 },
          { text: 'One no means I should stop', group: 1 },
          { text: 'I can ask for feedback', group: 0 },
          { text: 'Rejection proves I\'m worthless', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'Someone says, "Real winners never get rejected." What do I say?',
        options: [
          { text: 'True, I\'m not a winner.', why: 'It\'s a myth.' },
          { text: 'Agree and give up.', why: 'It\'s a myth.' },
          { text: 'Most people with great careers were rejected a lot. We just don\'t see those posts.' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Which myth about rejection have you believed? How would your next week change if you stopped believing it?',
    starters: ['I believed...', 'Without it, I\'d...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Ask someone you admire: "How many times have you been rejected?" Listen to the answer.',
  },
  notes: 'Myths reflect common beliefs; claims kept qualitative.',
};

export default lesson;
