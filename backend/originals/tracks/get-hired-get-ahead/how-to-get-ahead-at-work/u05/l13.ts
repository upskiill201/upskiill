import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 3 · Chapter 5 · Lesson 13 — when a change doesn't work out. Chat with Tey. */
const lesson: OriginalLesson = {
  key: 'l13',
  title: 'What if it doesn\'t work?',
  summary: 'The night before his first APM day, Clinton can\'t sleep. "What if I\'m bad at product? What if I\'ve thrown away engineering?" Tey talks him through what happens if a change doesn\'t work out.',
  minutes: 11,
  outcomes: ['Plan for a change not working out', 'See which moves are reversible', 'Set a fair review point'],
  learn: [
    {
      kind: 'chat',
      turns: [
        {
          tey: 'Many career changes are more reversible than they feel at midnight. If product doesn\'t fit, could Clinton go back to engineering?',
          replies: ['Probably, yes'],
        },
        {
          tey: 'Very likely: same company, same people, skills still fresh. Moves inside a company, or into a nearby field, are usually easier to undo than big leaps. That\'s another reason the bridge was smart.',
          replies: ['How will I know if it\'s not working?'],
        },
        {
          tey: 'Set a fair review point before you start. "At six months, with Aïcha: am I learning? Is my energy up? Are users better off?" Everything is hard at month one; judge at the review, not on a bad Tuesday.',
          replies: ['And if it really doesn\'t work?'],
        },
        {
          tey: 'Then it was an experiment that taught you something, which is what Ibarra\'s career changers did. You\'d go back with product skills most engineers lack. That\'s not failure; it\'s data.',
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Many changes are reversible. Set a fair review point. Judge at the review, not on a bad day. Either way, you learn.',
    },
  ],
  apply: {
    scenario: 'The night before APM day one.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Which kind of move is usually easiest to undo?',
        options: [
          { text: 'A big leap to a new country and field', why: 'Harder to undo.' },
          { text: 'A move inside the same company or a nearby field' },
          { text: 'None are undoable', why: 'Many are reversible.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Put Clinton\'s plan in order.',
        lines: ['Start the role', 'Work hard for six months', 'Review fairly with Aïcha', 'Decide: stay, adjust or go back'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Fair review question, or not?',
        groups: ['Fair', 'Not fair'],
        items: [
          { text: 'Am I learning?', group: 0 },
          { text: 'Was last Tuesday bad?', group: 1 },
          { text: 'Is my energy up overall?', group: 0 },
          { text: 'Are users better off?', group: 0 },
          { text: 'Did I feel nervous on day one?', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'Week two: a meeting went badly. Should I go back to engineering now?',
        options: [
          { text: 'Yes, today.', why: 'Judge at the review, not on a bad day.' },
          { text: 'Hide it from Aïcha.', why: 'Talk about it; judge later.' },
          { text: 'Not yet. Everything is hard at the start. I\'ll note it and judge at the six-month review.' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the unfair way to judge.',
        lines: ['Review at six months.', 'Decide after one bad meeting.', 'Ask: am I learning?'],
        bug: 1,
        explanation: 'One bad day isn\'t a fair test.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each outcome to what Clinton gains.',
        pairs: [
          ['Product fits', 'His chosen direction'],
          ['Product doesn\'t fit', 'Product skills most engineers lack'],
          ['Either way', 'Real data about himself'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Why was the bridge a smart choice, again?',
        options: [
          { text: 'It keeps the move reversible' },
          { text: 'It was the fastest', why: 'It\'s reversible and lower risk.' },
          { text: 'It was the most impressive', why: 'It\'s reversible.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Tey\'s tip.',
        template: 'Judge at the [[1]], not on a bad [[2]].',
        blanks: [['review'], ['day', 'Tuesday']],
        distractors: ['party', 'year', 'whim'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'After how many months is the fair review? (a number)',
        answers: ['6', 'six'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Reversible or hard to undo?',
        groups: ['Reversible', 'Hard to undo'],
        items: [
          { text: 'Internal move to product', group: 0 },
          { text: 'Quitting with no savings', group: 1 },
          { text: 'A side project', group: 0 },
          { text: 'Burning bridges on the way out', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'If you made a change, what would your fair review questions be, and when?',
    starters: ['At ___ months, I\'d ask...', 'I\'d know it\'s working if...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'For any change you\'re considering, write down: is it reversible? What\'s the fair review point? What would I gain either way?',
  },
  notes: 'Reversibility framing is common decision-making advice. Callback to Ibarra (l02).',
};

export default lesson;
