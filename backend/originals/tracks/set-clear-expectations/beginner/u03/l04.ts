import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 4. Myth or Fact: priorities and trade-offs (MoSCoW; the scope–time–quality triangle). */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Not everything is a must',
  summary: 'Day 14. Arjun\'s list has 31 items for launch. Everything is "important". Kavya asks: "If we can\'t do all of them, which ones go?" Arjun can\'t answer. Tey: "Let\'s play myth or fact about priorities."',
  minutes: 11,
  outcomes: [
    'Know why "everything is important" isn\'t a priority',
    'Sort work into must, should, could and won\'t',
    'Know the trade-off between scope, time and quality',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        { text: 'If everything is important, the team will work harder.', isFact: false, explain: 'Myth. If everything is important, nothing is. People choose for themselves, usually whatever is in front of them. A priority means something else comes second.' },
        { text: 'MoSCoW sorts work into Must, Should, Could and Won\'t (this time).', isFact: true, explain: 'Fact. MoSCoW comes from project methods developed in the 1990s (Dai Clegg, DSDM). "Won\'t this time" is the most useful word: it says out loud what\'s not happening, so nobody quietly works on it.' },
        { text: 'You can always get more scope, less time AND higher quality.', isFact: false, explain: 'Myth. Project managers talk about a triangle of scope, time and quality (with cost alongside). With a fixed team and a fixed date like Diwali, adding scope means something else gives. Usually quality, if nobody decides.' },
        { text: 'Deciding what you WON\'T do is part of setting expectations.', isFact: true, explain: 'Fact. "Won\'t this time: gift wrapping, wishlists, reviews" is as clear an expectation as any must. It protects the team and tells the client what to expect.' },
        { text: 'Priorities should be set once and never changed.', isFact: false, explain: 'Myth. Priorities can change, but on purpose, out loud, with the trade-off named: "If loyalty points come in, wishlists move to Won\'t."' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'If everything is important, nothing is. Must, Should, Could, Won\'t (this time). With a fixed date, more scope means something gives. Say what.',
    },
  ],
  apply: {
    scenario: 'Myth or fact: 31 "important" items.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What does MoSCoW stand for?',
        options: [
          { text: 'Monday, Saturday, Sunday', why: 'Nice try.' },
          { text: 'Must, Should, Could, Won\'t (this time)' },
          { text: 'More, Sooner, Cheaper, Wider', why: 'Not quite.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Myth', 'Fact'],
        items: [
          { text: 'Everything important means harder work', group: 0 },
          { text: '"Won\'t" is part of setting expectations', group: 1 },
          { text: 'More scope, less time, better quality', group: 0 },
          { text: 'Priorities can change on purpose', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'kavya',
        message: 'If we can\'t do all 31, which ones go?',
        prompt: 'Arjun\'s best reply?',
        options: [
          { text: 'None go. We do all 31.', why: 'Then quality gives, quietly.' },
          { text: 'You choose.', why: 'Priorities are Arjun\'s call, with the team.' },
          { text: 'Let\'s sort them together: musts for Diwali, shoulds, coulds, and won\'t-this-time. Then nobody has to guess.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'The most useful MoSCoW word is "won\'t this ___". (one word)',
        answers: ['time', 'Time'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Sort these into MoSCoW.',
        pairs: [
          ['Checkout works', 'Must'],
          ['Coupon codes', 'Should'],
          ['Wishlists', 'Won\'t this time'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'With Diwali fixed and the team fixed, what happens if scope grows and nobody decides?',
        options: [
          { text: 'Quality usually gives' },
          { text: 'Nothing; people work faster', why: 'Not for 30 days straight.' },
          { text: 'Diwali moves', why: 'Diwali doesn\'t move.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Arjun\'s priority list. Which line breaks it?',
        lines: [
          'Must: product pages, cart, checkout, order emails.',
          'Should: coupons. Could: gift wrapping.',
          'Won\'t: nothing, we\'ll try to fit it all in.',
        ],
        bug: 2,
        fix: 'Won\'t this time: wishlists, reviews, loyalty points.',
        explanation: 'An empty Won\'t list means nothing has really been decided.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put setting priorities in order.',
        lines: ['List everything', 'Pick the musts', 'Sort the rest into should and could', 'Say out loud what you won\'t do'],
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'If everything is [[1]], nothing is. A priority means something else comes [[2]].',
        blanks: [['important', 'urgent'], ['second', 'later']],
        distractors: ['first', 'free'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Arjun\'s honest line.',
        tiles: ['Won\'t', 'this', 'time:', 'wishlists.'],
        distractors: ['Must'],
      },
    ],
  },
  reflect: {
    prompt: 'Take your current to-do list. Mark each item Must, Should, Could or Won\'t this time. How long is your Won\'t list?',
    starters: ['My musts are...', 'Won\'t this time: ...'],
  },
  deepen: {
    title: 'Write the Won\'t list',
    summary: 'For one project, write down three things you won\'t do this time. Share it with whoever expects them.',
  },
  notes: 'MoSCoW prioritisation: Dai Clegg (1994), Oracle; adopted in DSDM (Dynamic Systems Development Method). Scope/time/cost/quality "iron triangle": project-management convention (Martin Barnes, 1969), simplified here. Fictional details.',
};

export default lesson;
