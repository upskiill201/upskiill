import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 3 · Chapter 2 · Lesson 19 — the learner's impact record (kit piece 2). Step-by-step. */
const lesson: OriginalLesson = {
  key: 'l19',
  title: 'Your impact record',
  summary: 'Your turn. Build the impact record you\'ll use for every review, promotion conversation and future job interview. Five parts, one doc.',
  minutes: 12,
  outcomes: ['Set up your own impact record', 'Tie it to your team\'s goals', 'Keep it weekly and monthly'],
  learn: [
    {
      kind: 'steps',
      title: 'Kit piece 2: your impact record',
      steps: [
        { title: '1. Your team\'s goals at the top', body: 'The two or three things your team is measured on. If you don\'t know, ask: "What are we measured on?"' },
        { title: '2. A section for each goal', body: 'Plus two more: "Making others better" and "Problems nobody owned".' },
        { title: '3. Weekly lines', body: 'What, who it helped, a number, a quote. Five minutes every Friday.' },
        { title: '4. Evidence', body: 'Links, screenshots, thank-you messages. Paste them in.' },
        { title: '5. A monthly summary, and what you want next', body: 'Three lines to your manager each month, plus one line on what you\'d like to own next.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Goals at the top. Sections by goal. Weekly lines, saved evidence, a monthly summary, and what you want next.',
    },
  ],
  apply: {
    scenario: 'You build your impact record.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the record in order.',
        lines: ['Team goals at the top', 'A section for each goal', 'Weekly lines', 'Evidence', 'Monthly summary and what you want next'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Weekly or monthly?',
        groups: ['Weekly', 'Monthly'],
        items: [
          { text: 'One or two impact lines', group: 0 },
          { text: 'Three-line summary to your manager', group: 1 },
          { text: 'Paste in a thank-you message', group: 0 },
          { text: 'One line on what you want next', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What two extra sections go in the record?',
        options: [
          { text: 'Complaints and gossip', why: 'Never.' },
          { text: 'Making others better, and problems nobody owned' },
          { text: 'Hours worked and meetings', why: 'Those aren\'t impact.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'A learner works in a shop with no written goals. Can they still do this?',
        options: [
          { text: 'No, only offices have goals.', why: 'Every workplace has things it cares about.' },
          { text: 'Make up goals.', why: 'Ask the manager.' },
          { text: 'Yes: ask the manager what matters most (sales, waste, customer complaints) and use those as goals.' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the weak record entry.',
        lines: ['Cut waste by about 10% by reordering stock.', 'Was at work every day.', 'Trained two new staff on the till.'],
        bug: 1,
        explanation: 'Presence isn\'t impact. What changed?',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each part to its purpose.',
        pairs: [
          ['Goals at the top', 'Keeps entries tied to what matters'],
          ['Evidence', 'Proof that doesn\'t vanish'],
          ['What you want next', 'Helps your manager plan'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'How long should weekly entries take?',
        options: [
          { text: 'About five minutes' },
          { text: 'Two hours', why: 'Five minutes is enough.' },
          { text: 'No time; skip them', why: 'Five minutes weekly.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the record.',
        template: 'Weekly [[1]], saved evidence, a monthly [[2]].',
        blanks: [['lines'], ['summary']],
        distractors: ['excuses', 'complaint', 'rant'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many parts does the impact record have? (a number)',
        answers: ['5', 'five'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Impact or just presence?',
        groups: ['Impact', 'Presence'],
        items: [
          { text: 'Fewer customer complaints', group: 0 },
          { text: 'Attended every meeting', group: 1 },
          { text: 'Trained a new colleague', group: 0 },
          { text: 'Was online all day', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'What would the first three lines of your impact record say?',
    starters: ['1.', '2.'],
  },
  deepen: {
    title: 'Your kit, piece 2',
    summary: 'Set up your impact record with all five parts. Add this week\'s line, and set a Friday reminder.',
  },
  notes: 'Kit piece 2 of How to Get Ahead at Work.',
};

export default lesson;
