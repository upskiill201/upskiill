import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 9. "Pitch check" (Tap to explore): Ada's new LinkedIn About section. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Pitch check: Ada\'s new "About"',
  summary: 'Ada rewrites her LinkedIn "About" section and sends it to Arjun at midnight. He replies at 6 a.m.: "This is the first time your profile sounds like you." Tap through it to see why.',
  minutes: 11,
  outcomes: [
    'See every Chapter 2 tool in one written personal pitch',
    'Spot what makes a bio work',
    'Plan your own',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Ada\'s LinkedIn "About"',
      text: 'I make money apps simple enough that people actually use them. By day, I\'m a product designer at a Lagos fintech. By night, I built Ajo Tracker, which runs my office\'s savings group: ten colleagues, four months, zero arguments about who paid. A church group of forty is trying it next. I\'m a finalist at 60 Seconds at the Lagos Tech Fest, and I\'m looking for a mentor who has grown a product from one office to many. If you run an ajo, I\'d love to hear how.',
      hotspots: [
        { phrase: 'I make money apps simple enough that people actually use them.', note: 'The problem she solves, not her title. It\'s the same line she uses out loud, so her online and spoken pitch match.' },
        { phrase: 'By day, I\'m a product designer at a Lagos fintech.', note: 'The title is still there, just not first. And no "just".' },
        { phrase: 'ten colleagues, four months, zero arguments about who paid', note: 'Proof as facts, not adjectives. No "passionate" or "hard-working" needed.' },
        { phrase: 'A church group of forty is trying it next.', note: 'The bus-stop chat became proof that it\'s growing. Every conversation can feed your pitch.' },
        { phrase: 'I\'m looking for a mentor who has grown a product from one office to many.', note: 'The future, and a specific ask. Readers know exactly how they could help.' },
        { phrase: 'If you run an ajo, I\'d love to hear how.', note: 'An invitation to start a conversation, the online version of "What about you?"' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'A good bio: what you do for people first, your title second, facts as proof, a specific ask, and an invitation to talk.',
    },
  ],
  apply: {
    scenario: 'Arjun\'s 6 a.m. review.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why does Ada\'s bio start with what she does, not her title?',
        options: [
          { text: 'She\'s embarrassed by her title', why: 'The title is still there, second.' },
          { text: 'LinkedIn requires it', why: 'It\'s a choice, not a rule.' },
          { text: 'It tells readers what she does for people, which is more interesting than a rank' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which part of the bio is it?',
        groups: ['Present', 'Past (proof)', 'Future'],
        items: [
          { text: 'I make money apps people actually use', group: 0 },
          { text: 'Ten colleagues, four months, zero arguments', group: 1 },
          { text: 'I\'m looking for a mentor', group: 2 },
          { text: 'A church group of forty is trying it next', group: 2 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Put the bio\'s parts in order.',
        lines: ['What she does for people', 'Her job title', 'Proof: facts and numbers', 'What\'s next', 'A specific ask', 'An invitation to talk'],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'Should I add "passionate, hard-working, detail-oriented team player"?',
        prompt: 'What does Arjun say?',
        options: [
          { text: 'No. Your facts already show it. "Ten colleagues, zero arguments" beats any adjective.' },
          { text: 'Yes, at the top.', why: 'Everyone writes those. Nobody remembers them.' },
          { text: 'Add ten more adjectives.', why: 'More of the same problem.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'The last line invites readers to start a ___. (one word)',
        answers: ['conversation', 'chat'],
        placeholder: 'One word',
      },
      {
        kind: 'findBug',
        prompt: 'Ada\'s first draft. Which line breaks Chapter 2\'s rules?',
        lines: [
          'I make money apps simple enough that people actually use them.',
          'I\'m just a junior designer, so this is only a small side project.',
          'Ten colleagues, four months, zero arguments about who paid.',
        ],
        bug: 1,
        fix: 'By day, I\'m a product designer at a Lagos fintech.',
        explanation: '"Just" and "only" sneaked back in. Same facts, without the shrinkers.',
      },
      {
        kind: 'mcq',
        prompt: 'Why is "a mentor who has grown a product from one office to many" a good ask?',
        options: [
          { text: 'It\'s vague, so anyone can help', why: 'It\'s specific on purpose.' },
          { text: 'It\'s specific, so the right reader knows it\'s them' },
          { text: 'It sounds impressive', why: 'It\'s useful, not just impressive.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the bio line to the Chapter 2 lesson.',
        pairs: [
          ['"I make money apps people use"', 'Job title vs problem solved'],
          ['"Zero arguments about who paid"', 'Facts beat adjectives'],
          ['"If you run an ajo, I\'d love to hear how"', 'Turn it into a conversation'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Ada\'s proof line.',
        template: 'Ten [[1]], four [[2]], zero [[3]] about who paid.',
        blanks: [['colleagues'], ['months'], ['arguments']],
        distractors: ['features', 'adjectives'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the bio\'s first line.',
        tiles: ['I', 'make', 'money', 'apps', 'people', 'actually', 'use.'],
        distractors: ['just'],
      },
    ],
  },
  reflect: {
    prompt: 'Draft your own "About" (5–6 lines): what you do for people, your title, proof as facts, what\'s next, a specific ask, and an invitation.',
    starters: ['I...', 'By day...', 'Proof: ...', 'I\'m looking for...'],
  },
  deepen: {
    title: 'Publish it',
    summary: 'Update your real profile with your new headline and About section. Then ask one friend: "From this, what do I do?" If they can answer, it works.',
  },
  notes: 'Synthesis of Chapter 2 tools in a written bio. Explore hotspot phrases appear verbatim in the text.',
};

export default lesson;
