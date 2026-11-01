import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 3 · Chapter 2 · Lesson 12 — skills that compound over a career. Card deck (text). */
const lesson: OriginalLesson = {
  key: 'l12',
  title: 'Skills that compound',
  summary: 'Paul, surprisingly, gives Clinton advice: "Frameworks come and go. Some skills just keep paying." Over coffee, he lists five. Clinton writes them on a napkin.',
  minutes: 11,
  outcomes: ['Name skills that stay useful across jobs', 'Choose one to build deliberately', 'Practise it in your current work'],
  learn: [
    {
      kind: 'text',
      html: '<p><strong>1. Clear writing.</strong> Updates, docs, incident reviews, proposals. People who write clearly get their ideas adopted, in every job and every field.</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>2. Debugging, or problem-solving in general.</strong> Narrowing down what\'s really wrong, step by step. It works on code, on processes, and on a broken payout report.</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>3. Knowing the business.</strong> How the company makes money, what customers need, what the numbers mean. Clinton learning how driver payouts work makes him more useful than another framework would.</p>',
    },
    {
      kind: 'check',
      question: 'Which skill helped Clinton spot the cause of the payout problem?',
      options: ['Typing speed', 'Knowing the business and debugging', 'A new framework'],
      answer: 1,
      explanation: 'He knew how offline syncs feed payouts, and narrowed down the cause.',
    },
    {
      kind: 'text',
      html: '<p><strong>4. Explaining technical things simply.</strong> To finance, support, customers, managers. Clinton\'s years of explaining phones at his aunt\'s stall keep paying off.</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>5. Learning how to learn.</strong> Maps, glossaries, explaining back, asking good questions. Every new tool, team or job gets easier.</p>',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Writing, problem-solving, knowing the business, explaining simply, learning to learn. They pay in every job.',
    },
  ],
  apply: {
    scenario: 'Paul\'s napkin list.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Compounds over a career, or might fade?',
        groups: ['Compounds', 'Might fade'],
        items: [
          { text: 'Clear writing', group: 0 },
          { text: 'One specific framework version', group: 1 },
          { text: 'Explaining things simply', group: 0 },
          { text: 'Knowing the business', group: 0 },
          { text: 'A trendy tool\'s shortcuts', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why does "knowing the business" make Clinton more valuable?',
        options: [
          { text: 'He can replace finance', why: 'He can connect his work to what matters.' },
          { text: 'It doesn\'t', why: 'It helped him spot the payout cause.' },
          { text: 'He can connect his work to money, customers and goals' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each skill to where Clinton used it.',
        pairs: [
          ['Clear writing', 'The incident review'],
          ['Explaining simply', 'Talking to finance about syncs'],
          ['Learning to learn', 'His glossary and map'],
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply to Paul.',
        from: 'paul',
        message: 'Pick one of those five to get much better at this year.',
        options: [
          { text: 'Clear writing. Every incident review and proposal I write will be practice.' },
          { text: 'All five, by next week.', why: 'Pick one and practise it deliberately.' },
          { text: 'None, I\'ll learn a new framework.', why: 'Frameworks fade; these compound.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the skill that\'s least likely to compound.',
        lines: ['Problem-solving step by step.', 'Memorising one tool\'s menu shortcuts.', 'Explaining technical ideas simply.'],
        bug: 1,
        explanation: 'Useful today, but tools change. The others last.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put Clinton\'s plan to grow a skill in order.',
        lines: ['Pick one skill', 'Find daily chances to practise it', 'Ask for feedback on it', 'Notice improvement over months'],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Where did Clinton first build "explaining simply"?',
        options: [
          { text: 'In a lecture hall', why: 'At his aunt\'s stall.' },
          { text: 'He never did', why: 'At his aunt\'s stall.' },
          { text: 'At his aunt\'s phone stall' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Paul\'s line.',
        template: 'Frameworks come and [[1]]. Some skills just keep [[2]].',
        blanks: [['go'], ['paying']],
        distractors: ['stay', 'failing', 'hiding'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many compounding skills did Paul list? (a number)',
        answers: ['5', 'five'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Practises clear writing, or not?',
        groups: ['Practises it', 'Doesn\'t'],
        items: [
          { text: 'A short, clear incident review', group: 0 },
          { text: 'One-word chat replies', group: 1 },
          { text: 'A five-part team update', group: 0 },
          { text: 'Avoiding writing anything down', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Which of the five skills do you most want to build this year? Where could you practise it every week?',
    starters: ['I want to build...', 'I\'ll practise it in...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Pick one compounding skill. Write down three places in your current week where you can practise it on purpose.',
  },
  notes: 'A Teyro synthesis of widely shared career advice; not a ranked study.',
};

export default lesson;
