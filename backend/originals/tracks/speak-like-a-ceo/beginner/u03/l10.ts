import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 10. Unit Challenge: the first run-through. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Challenge: the first run-through',
  summary: 'Two weeks to go. Lucía runs the whole talk for Carmen, Diego and her team. Everything from Chapter 3.',
  minutes: 14,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Build a complete 15-minute talk', 'Use everything from Chapter 3 together'],
  learn: [
    {
      kind: 'reading',
      title: 'The run-through',
      html: '<p><strong>Open:</strong> "In March, a shop owner in Guadalajara told Sofía what to make."</p><p><strong>Message:</strong> "We listened, and it worked. Three things it taught us."</p><p><strong>Part 1, what we heard:</strong> Doña Rosa, then 140 of 200 shop owners. <em>"That\'s the first lesson: shop owners know our buyers. The second..."</em></p><p><strong>Part 2, what we did:</strong> a small test in Guadalajara before a national launch.</p><p><strong>Part 3, what happened:</strong> one chart, 38% above target, the orange gap.</p><p><strong>Close:</strong> "We listened, and it worked. Let\'s keep listening. This month, talk to one customer."</p><p>12 slides, no bullets, 14 minutes 30 seconds. Carmen nods all the way through.</p>',
    },
    {
      kind: 'story',
      title: 'Diego\'s notes',
      beats: [
        { speaker: 'diego', text: 'The talk is great. The delivery isn\'t yet. I recorded it. Watch yourself.' },
        { speaker: 'lucia', text: 'I talk so fast. And I\'m looking at the screen the whole time.' },
        { speaker: 'tey', text: 'That\'s Chapter 3: one message, slides that help, structure, signposts, story and number. Next: voice and presence.' },
      ],
    },
  ],
  apply: {
    scenario: 'Chapter 3 challenge: the run-through.',
    items: [
      {
        kind: 'mcq',
        prompt: 'How long did the run-through take?',
        options: [
          { text: '14 minutes 30 seconds' },
          { text: '42 minutes', why: '14:30.' },
          { text: '5 minutes', why: '14:30.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which part of the talk?',
        groups: ['Open or close', 'Middle'],
        items: [
          { text: '"A shop owner told Sofía what to make."', group: 0 },
          { text: 'Doña Rosa and 140 of 200', group: 1 },
          { text: '"This month, talk to one customer."', group: 0 },
          { text: 'The 38% chart', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many slides in the final talk?',
        answers: ['12', 'twelve'],
        placeholder: 'A number',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the part to its content.',
        pairs: [
          ['Part 1', 'What we heard'],
          ['Part 2', 'What we did'],
          ['Part 3', 'What happened'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'I hate watching myself on video.',
        prompt: "Diego\'s best reply?",
        options: [
          { text: 'Everyone does. Watch it once with the sound off, once with it on. You\'ll see two fixes in five minutes.' },
          { text: 'Then don\'t watch it.', why: 'It\'s the fastest feedback.' },
          { text: 'Watch it ten times tonight.', why: 'Once or twice is enough.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Chapter 3 in one line.',
        template: 'One [[1]], slides that [[2]], a clear shape.',
        blanks: [['message'], ['help']],
        distractors: ['agenda', 'decorate'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line would fail talk card v3?',
        lines: [
          'Open: a shop owner told Sofía what to make.',
          '"That\'s the first lesson. The second..."',
          'Part 3: one chart, the orange gap.',
          'Close: "Any questions? Also, the packaging was blue."',
        ],
        bug: 3,
        fix: 'Close: "We listened. Let\'s keep listening."',
        explanation: 'The close should repeat the message and give one action.',
      },
      {
        kind: 'mcq',
        prompt: 'What did Diego say about the talk?',
        options: [
          { text: 'The talk is great; the delivery isn\'t yet' },
          { text: 'Start again from 42 slides', why: 'The talk is great.' },
          { text: 'It\'s perfect', why: 'The delivery needs work.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many weeks are left until the Encuentro?',
        answers: ['2', 'two'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order Lucía\'s talk.',
        lines: ['Open with a moment', 'The message', 'What we heard', 'What we did', 'What happened', 'Close with one action'],
      },
    ],
  },
  reflect: {
    prompt: 'Build a short talk with checks 11 to 15 and run it for one person. What did they remember?',
    starters: ['They remembered...'],
  },
  deepen: {
    title: 'Content, then delivery',
    summary: 'Fixing delivery is much easier once the content is solid. You can\'t rehearse your way out of a talk with no message.',
  },
  notes: 'Chapter 3 challenge (fictional): 12 slides, 14:30, structure open/message/3 parts/close. Hook: Diego\'s recording shows fast speech and eyes on the screen.',
};

export default lesson;
