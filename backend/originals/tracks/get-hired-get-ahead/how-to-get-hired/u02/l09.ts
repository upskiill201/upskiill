import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 2 · Chapter 2 · Lesson 9 — busy intern vs. valuable intern. Before / After. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Busy isn\'t useful',
  summary: 'Nadia, another intern, is always busy: three tabs, two chats, headphones on. Clinton\'s days look calmer. At the end of week three, Mr Tamba asks each intern one question: "What changed because you were here?"',
  minutes: 11,
  outcomes: ['Tell busy apart from useful', 'Describe your work as what changed', 'Focus on the work that matters most'],
  learn: [
    {
      kind: 'compare',
      title: 'Two answers to "What changed?"',
      before: { label: 'Busy', text: '"I\'ve done loads! I redesigned the logo, set up a team chat, made a presentation about our values, and tidied the shared drive."\n\nAll real work, none of it in her brief, and none of it touches the problem Mr Tamba worries about. He nods politely.' },
      after: { label: 'Useful', text: '"One driver confirmed 23 deliveries on Saturday with no data. Customers got updates by 2pm instead of evening. Next: two more drivers."\n\nOne change, with a number, tied to the problem that matters most. Mr Tamba writes it down.' },
      notes: [
        'Useful work is tied to what your supervisor worries about most.',
        'Say what changed, with a number if you can.',
        'Extra work is fine, but only after your main job is going well.',
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: '"What changed because you were here?" Have an answer, with a number, every week.',
    },
  ],
  apply: {
    scenario: 'Mr Tamba asks what changed.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why did Nadia\'s answer land badly?',
        options: [
          { text: 'She didn\'t work hard', why: 'She worked hard, on the wrong things.' },
          { text: 'None of it touched the problem Mr Tamba worries about' },
          { text: 'Her logo was ugly', why: 'It\'s about what matters, not the logo.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Useful (tied to the main problem) or just busy?',
        groups: ['Useful', 'Just busy'],
        items: [
          { text: '23 deliveries confirmed with no data', group: 0 },
          { text: 'Tidied the shared drive', group: 1 },
          { text: 'Customers updated by 2pm', group: 0 },
          { text: 'A presentation about values', group: 1 },
          { text: 'Tested with a real driver', group: 0 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that\'s activity, not change.',
        lines: ['One driver used it for a full Saturday.', 'I was online every evening.', 'Updates now arrive by 2pm.'],
        bug: 1,
        explanation: 'Being online isn\'t a change. Results are.',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'Nadia says I\'m lazy because I don\'t look busy. Should I look busier?',
        options: [
          { text: 'Yes, open more tabs.', why: 'Looking busy doesn\'t change anything.' },
          { text: 'Tell Mr Tamba Nadia is wasting time.', why: 'Not his job. Focus on his own results.' },
          { text: 'No: I\'ll keep focusing on what changes things for Mr Tamba, and show results.' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each busy line to a useful one.',
        pairs: [
          ['I worked on storage', 'Confirmations save with no data'],
          ['I did loads of testing', 'One driver confirmed 23 deliveries'],
          ['I improved updates', 'Customers get updates by 2pm'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'When is extra work (like a new logo) fine?',
        options: [
          { text: 'After your main job is going well' },
          { text: 'Instead of your main job', why: 'Main job first.' },
          { text: 'Never', why: 'Extra is fine once the main job is on track.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Mr Tamba\'s question.',
        template: 'What [[1]] because you were [[2]]?',
        blanks: [['changed'], ['here']],
        distractors: ['broke', 'away', 'cost'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many deliveries did the driver confirm with no data? (a number)',
        answers: ['23', 'twenty-three', 'twenty three'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Good answer to "What changed?" or weak?',
        groups: ['Good', 'Weak'],
        items: [
          { text: 'Updates by 2pm instead of evening', group: 0 },
          { text: 'I stayed late', group: 1 },
          { text: 'Three drivers now use it', group: 0 },
          { text: 'I learned a lot', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What makes Clinton\'s answer strong?',
        options: [
          { text: 'It\'s long', why: 'It\'s short. It\'s specific.' },
          { text: 'It sounds confident', why: 'The substance matters: a real change.' },
          { text: 'One change, with a number, tied to the main problem' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'If someone asked "What changed because you were here?" about your last week, what would you say?',
    starters: ['Because I was there...', 'The number is...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Ask the person you report to (or a teacher): "What\'s the one thing you most want to see change?" Then tie your next week to it.',
  },
  notes: 'Nadia is a named extra (fellow intern), not a villain: hard-working, misdirected. The 23 deliveries are a story detail.',
};

export default lesson;
