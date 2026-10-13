import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 2 · Lesson 17 — the patterns that make writing feel machine-made, and how to remove them. */
const lesson: OriginalLesson = {
  key: 'l17',
  title: 'When AI writing sounds fake',
  summary: 'Readers can feel generic writing even when they cannot say why. Learn the patterns, and how to remove them.',
  minutes: 13,
  outcomes: [
    'Spot the patterns that make writing feel generic',
    'Fix them with specifics and your own details',
    'Understand why "AI detectors" are not something to rely on',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'Generic writing is mostly a grammar problem.',
          isFact: false,
          explain: 'Generic text is usually perfectly grammatical. The problem is that it says nothing specific.',
        },
        {
          text: 'Adding one real detail ("the darker blue we chose on Monday") makes a message feel human.',
          isFact: true,
          explain: 'Specifics only you could know are the strongest signal that a real person wrote it.',
        },
        {
          text: 'AI-writing detectors reliably tell you whether a person or an AI wrote something.',
          isFact: false,
          explain: 'They are often wrong in both directions. Write well instead of worrying about detectors.',
        },
      ],
    },
    {
      kind: 'reading',
      title: 'Six patterns that make writing feel generic',
      html:
        '<ol>' +
        '<li><strong>Empty openers.</strong> "I hope this email finds you well." "In today\'s fast-paced world..."</li>' +
        '<li><strong>Stacked transitions.</strong> "Moreover", "Furthermore", "Additionally", one after another.</li>' +
        '<li><strong>Everything in threes.</strong> "Fast, simple and powerful." Once is fine; every paragraph is a pattern.</li>' +
        '<li><strong>Big words with no proof.</strong> "Exciting", "game-changing", "seamless", "robust" with nothing to back them up.</li>' +
        '<li><strong>Same rhythm.</strong> Every sentence the same length. Real writing varies.</li>' +
        '<li><strong>Unneeded wrap-ups.</strong> "In conclusion..." at the end of a five-line email.</li>' +
        '</ol>' +
        '<h3>The fix: specifics</h3>' +
        '<p>Replace big words with facts. "Seamless sign-up" becomes "sign-up now takes about 30 seconds on a phone". Add one detail only you would know. Cut the opener and the wrap-up. Then add these patterns to your never-say list.</p>',
    },
    {
      kind: 'compare',
      title: 'Generic vs specific',
      before: {
        label: 'Generic',
        text: 'I hope this finds you well! We are thrilled to share that our seamless, robust and game-changing sign-up experience is now live. Moreover, it is fast. In conclusion, we are excited!',
      },
      after: {
        label: 'Specific',
        text: "Hi Lucía! Sign-up is live. It now takes about 30 seconds on a phone, and the darker blue you picked looks great. Thanks for the quick approval.",
      },
      notes: ['Opener and wrap-up gone.', 'Big words replaced by a real number.', 'A detail only Ada would know.'],
    },
    {
      kind: 'check',
      question: 'What is the strongest fix for generic writing?',
      options: ['More adjectives', 'Specific facts and details only you know', 'Longer sentences'],
      answer: 1,
    },
  ],
  apply: {
    scenario: 'Ada is making her AI drafts sound real.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Generic pattern, or specific?',
        groups: ['Generic', 'Specific'],
        items: [
          { text: 'A seamless, game-changing experience', group: 0 },
          { text: 'Sign-up takes about 30 seconds on a phone', group: 1 },
          { text: "In today's fast-paced world", group: 0 },
          { text: 'The darker blue you picked on Monday', group: 1 },
          { text: 'Moreover, furthermore, additionally', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Should Ada rely on an "AI detector" to check her writing?',
        options: [
          { text: 'No. They are often wrong; write specifically instead' },
          { text: 'Yes, they are always accurate', why: 'They make mistakes in both directions.' },
          { text: 'Only for long documents', why: 'Length does not make them reliable.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the big word to a specific replacement.',
        pairs: [
          ['"Seamless"', '"Takes 30 seconds"'],
          ['"Robust"', '"Handled 5,000 test sign-ups"'],
          ['"Exciting news"', '"Sign-up is live"'],
        ],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build a specific sentence.',
        tiles: ['Sign-up', 'now', 'takes', 'about', '30', 'seconds'],
        distractors: ['seamlessly', 'robust'],
      },
      {
        kind: 'findBug',
        prompt: 'Spot the generic line.',
        lines: ['Hi Lucía!', 'Sign-up is live.', 'In conclusion, we are thrilled and excited about this journey.', 'Thanks for the quick approval!'],
        bug: 2,
        explanation: 'An empty wrap-up in a short message. Delete it.',
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: "Our newsletter reads like every other company's. Everything is 'exciting' and 'innovative'.",
        prompt: 'What should Ada suggest?',
        options: [
          { text: 'Replace each big word with a fact or number, and add one detail only your team knows.' },
          { text: 'Use even stronger adjectives.', why: 'More big words, more generic.' },
          { text: 'Make it longer.', why: 'Length is not the problem; specifics are.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Ada\'s de-generic request.',
        template: 'Remove empty [[1]] and wrap-ups. Replace big words with [[2]]. Vary sentence [[3]].',
        blanks: [['openers'], ['facts', 'specifics'], ['length']],
        distractors: ['adjectives', 'jargon', 'colour'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'The strongest signal a human wrote it: a detail only you would ... (one word)',
        answers: ['know'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which follow-up removes the generic feel best?',
        options: [
          { text: 'Make it sound less like AI.', why: 'Vague; it may swap one cliché for another.' },
          { text: 'Cut the opener and the wrap-up. Replace "seamless" and "exciting" with the fact that sign-up takes 30 seconds. Mention the darker blue Lucía chose.' },
          { text: 'Add more transitions.', why: 'Stacked transitions are part of the problem.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Order Ada\'s de-generic routine.',
        lines: ['Cut the opener and wrap-up', 'Replace big words with facts', 'Add one detail only you know', 'Read it aloud for rhythm'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Keep or cut?',
        groups: ['Keep', 'Cut'],
        items: [
          { text: 'I hope this email finds you well.', group: 1 },
          { text: 'Sign-up is live.', group: 0 },
          { text: 'Furthermore, moreover, additionally...', group: 1 },
          { text: 'It takes 30 seconds on a phone.', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: "A colleague ran your email through an AI detector and it said '90% AI'. Should I worry?",
        prompt: "What's Ada's honest answer?",
        options: [
          { text: "Detectors are often wrong. What matters is whether it's accurate, specific and sounds like us. I wrote it with AI help and checked every fact." },
          { text: 'The detector must be right.', why: 'Detectors are frequently wrong.' },
          { text: "I've never used AI, ever.", why: 'Honesty about AI use builds more trust.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Real writing varies sentence ... (one word)',
        answers: ['length', 'lengths', 'rhythm'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the pattern to its fix.',
        pairs: [
          ['Empty opener', 'Start with the point'],
          ['Big words, no proof', 'A fact or number'],
          ['Same rhythm', 'Mix short and long sentences'],
          ['"In conclusion"', 'Just stop'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Where should Ada record the patterns she keeps removing?',
        options: [
          { text: 'In her never-say list, in her style guide' },
          { text: 'Nowhere', why: 'Then she removes them by hand forever.' },
          { text: 'In the email signature', why: 'Not the right place.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Find one generic sentence in something you wrote or received recently. Rewrite it with a specific fact.',
    starters: ['Generic:', 'Specific:'],
  },
  deepen: { title: 'Try it today', summary: 'Add the six patterns to your never-say list and watch your next drafts change.' },
  notes:
    'Detector unreliability is widely reported; phrased as "often wrong" without a statistic. "5,000 test sign-ups" and "30 seconds" are fictional product details in the story. "90%" is a fictional detector score in dialogue.',
};

export default lesson;
