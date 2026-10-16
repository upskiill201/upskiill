import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 9. Tap to explore: the review checklist and quality page, marked up. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Line check: the quality page',
  summary: 'Day 16. The team page gets a new section: what good looks like. Kavya says it\'s the first time she\'s known when to stop. Tap through to see every Chapter 3 tool on it.',
  minutes: 11,
  outcomes: [
    'See every Chapter 3 tool in one short section',
    'Write a quality section for your own team or project',
    'Make quality something people can check themselves',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Team page: what good looks like',
      text: 'Before review: tests pass, Hindi and English, clear error messages, no keys in the code, works on a cheap Android. Example of great: Joel\'s order-email PR. Care: checkout polished, product pages solid, admin simple. Show every page at about 30%: boxes and words are fine. Launch musts: 14. Won\'t this time: wishlists, reviews, loyalty points. Estimates come from the person doing it, compared with past work, plus buffer.',
      hotspots: [
        { phrase: 'Before review: tests pass, Hindi and English', note: 'The quality bar, checkable line by line, shared before the work.' },
        { phrase: 'Example of great: Joel\'s order-email PR.', note: 'An example carries the details. And it\'s Joel\'s, so it\'s also credit.' },
        { phrase: 'checkout polished, product pages solid, admin simple', note: 'Good enough, per piece. Nobody has to guess how much care each deserves.' },
        { phrase: 'Show every page at about 30%', note: 'The early check, agreed up front, so it never feels like checking up.' },
        { phrase: 'Launch musts: 14.', note: 'Priorities with a number. Not 31 "important" things.' },
        { phrase: 'Won\'t this time: wishlists, reviews, loyalty points.', note: 'The Won\'t list: an expectation as clear as any must.' },
        { phrase: 'Estimates come from the person doing it, compared with past work', note: 'Beating the planning fallacy with the outside view.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'A quality section: the checkable bar, an example of great, care per piece, the early check, the musts, the won\'ts and how you estimate.',
    },
  ],
  apply: {
    scenario: 'Line check, the quality page.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why does Kavya finally know when to stop?',
        options: [
          { text: 'Arjun tells her daily', why: 'The page does that now.' },
          { text: 'She\'s slowed down', why: 'She\'s just as fast, aimed better.' },
          { text: 'The bar for each piece is written and checkable' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which Chapter 3 tool is it?',
        groups: ['Quality bar', 'Priorities', 'Estimates'],
        items: [
          { text: 'Tests pass before review', group: 0 },
          { text: 'Launch musts: 14', group: 1 },
          { text: 'Compared with past work', group: 2 },
          { text: 'No keys in the code', group: 0 },
          { text: 'Won\'t this time: wishlists', group: 1 },
          { text: 'Plus buffer', group: 2 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'kavya',
        message: 'Can my product page be an "example of great" too?',
        prompt: 'Arjun\'s best reply?',
        options: [
          { text: 'Once it ticks every line, absolutely. You\'re two boxes away: the cheap-Android test and the error message.' },
          { text: 'No, only Joel\'s.', why: 'Examples should grow, and it\'s great motivation.' },
          { text: 'Sure, add it now.', why: 'It doesn\'t meet the bar yet.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Showing work at about 30% is the early ___. (one word)',
        answers: ['check', 'Check', 'draft', 'review'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Why include "admin simple" on the page?',
        options: [
          { text: 'Because admin doesn\'t matter at all', why: 'It must work. It just doesn\'t need polish.' },
          { text: 'So nobody spends checkout-level care on a page only Mr Rao sees' },
          { text: 'To annoy Joel', why: 'It frees his care for checkout.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Draft 1. Which line breaks Chapter 3?',
        lines: [
          'Before review: tests pass, Hindi and English.',
          'Quality: high, always, on everything.',
          'Won\'t this time: wishlists.',
        ],
        bug: 1,
        fix: 'Care: checkout polished, product pages solid, admin simple.',
        explanation: '"High, always, on everything" isn\'t checkable and spends care in the wrong places.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put the quality section in order.',
        lines: ['The checkable bar', 'An example of great', 'Care per piece', 'The early check', 'Musts and won\'ts'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the line to the research.',
        pairs: [
          ['Checkable bar', 'Rubrics (Panadero and Jonsson)'],
          ['Compared with past work', 'Planning fallacy'],
          ['Won\'t this time', 'MoSCoW'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Make quality something people can [[1]] [[2]].',
        blanks: [['check', 'judge'], ['themselves']],
        distractors: ['ignore', 'later'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Kavya\'s discovery.',
        tiles: ['Now', 'I', 'know', 'when', 'to', 'stop.'],
        distractors: ['never'],
      },
    ],
  },
  reflect: {
    prompt: 'Write a five-line "what good looks like" section for something you\'re working on. Include one example of great.',
    starters: ['Before review: ...', 'Example of great: ...'],
  },
  deepen: {
    title: 'Add the example',
    summary: 'Find one piece of great work in your team or class and link it in your quality section. Credit whoever made it.',
  },
  notes: 'Synthesis of Chapter 3 tools: rubrics/checklists, examples, fit-for-purpose quality, early drafts, MoSCoW, planning-fallacy-aware estimates. Fictional page.',
};

export default lesson;
