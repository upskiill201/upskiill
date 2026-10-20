import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 2 · Chapter 4 · Lesson 12 — keeping momentum through a long search. Card deck (text). */
const lesson: OriginalLesson = {
  key: 'l12',
  title: 'Keeping momentum',
  summary: 'Some job searches take weeks; many take months. Miracle\'s took seven months and 31 applications. She shares the five things that kept her going, so a single no never stopped everything.',
  minutes: 11,
  outcomes: ['Keep several opportunities going at once', 'Use routine and small wins to stay steady', 'Protect your energy and money'],
  learn: [
    {
      kind: 'text',
      html: '<p><strong>1. Never one door.</strong> Keep several conversations and applications going at the same time. When one closes, the others are still open. Clinton had Kmer, Njangi Pay and four conversations. The no hurt, but it didn\'t leave him with nothing.</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>2. A simple weekly routine.</strong> The same rhythm as Chapter 1: messages on Monday, follow-ups on Wednesday, one conversation, tracker on Friday, two good applications. Routine keeps you moving on days when motivation doesn\'t.</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>3. Count actions, not just outcomes.</strong> You can\'t control offers, but you can control messages sent, stories practised and applications finished. Miracle ticked off actions each week, so she always had progress to see.</p>',
    },
    {
      kind: 'check',
      question: 'What should Clinton count each week to stay motivated?',
      options: ['Only offers received', 'Actions he controls, like messages and applications', 'Other people\'s offers'],
      answer: 1,
      explanation: 'Actions are in your control. Offers come from enough good actions over time.',
    },
    {
      kind: 'text',
      html: '<p><strong>4. Protect your energy.</strong> Sleep, food, movement, people you like. A job search is a long game, and tired people write worse applications.</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>5. Plan your money if you can.</strong> If possible, work out how many weeks you can manage, and whether part-time work could help. Money pressure makes people accept the wrong thing in a panic.</p>',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Several doors. A weekly routine. Count actions. Protect your energy. Plan your money.',
    },
  ],
  apply: {
    scenario: 'Clinton keeps going after the no.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Action he controls, or outcome he doesn\'t?',
        groups: ['Action', 'Outcome'],
        items: [
          { text: 'Five messages sent', group: 0 },
          { text: 'An offer arriving', group: 1 },
          { text: 'Two stories practised', group: 0 },
          { text: 'A company replying', group: 1 },
          { text: 'One application finished', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why didn\'t the Njangi Pay no leave Clinton with nothing?',
        options: [
          { text: 'He had several doors open at once' },
          { text: 'Luck', why: 'He kept several doors open.' },
          { text: 'Njangi Pay changed its mind', why: 'He had other doors open.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each habit to why it helps.',
        pairs: [
          ['Several doors', 'One no doesn\'t stop everything'],
          ['A weekly routine', 'Keeps you moving without motivation'],
          ['Money plan', 'Avoids panic decisions'],
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'david',
        message: 'I\'ve applied to three places. If they all say no, I\'m done.',
        options: [
          { text: 'Many searches take months. Keep a few doors open and count your actions, not just replies.' },
          { text: 'Yes, three is enough.', why: 'Searches often take longer.' },
          { text: 'Then apply to 300 at once.', why: 'Steady and good beats huge and generic.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the habit that will drain Clinton.',
        lines: ['Football twice a week.', 'Applying until 3am every night.', 'Five messages every Monday.'],
        bug: 1,
        explanation: 'Tired people write worse applications. Protect your energy.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put Clinton\'s weekly routine in order.',
        lines: ['Monday: messages', 'Wednesday: follow-ups', 'One conversation', 'Friday: tracker and two applications'],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'How long did Miracle\'s search take?',
        options: [
          { text: 'Seven months' },
          { text: 'Seven days', why: 'Seven months, 31 applications.' },
          { text: 'Seven years', why: 'Seven months.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the tip.',
        template: 'Count [[1]], not just [[2]].',
        blanks: [['actions'], ['outcomes', 'offers']],
        distractors: ['hours', 'friends', 'excuses'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many applications did Miracle send? (a number)',
        answers: ['31', 'thirty-one', 'thirty one'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Protects energy, or drains it?',
        groups: ['Protects', 'Drains'],
        items: [
          { text: 'Sleeping properly', group: 0 },
          { text: 'Comparing yourself online all night', group: 1 },
          { text: 'Time with friends', group: 0 },
          { text: 'Skipping meals to apply more', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Which of the five habits do you most need right now? What\'s one thing you\'ll do this week?',
    starters: ['I most need...', 'This week I\'ll...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Start an "actions" list this week: tick off each message, story practised and application finished.',
  },
  notes: 'Miracle\'s seven months / 31 applications are story details, not a benchmark. Money planning kept general; circumstances vary.',
};

export default lesson;
