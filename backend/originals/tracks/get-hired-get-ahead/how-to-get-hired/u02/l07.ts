import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 2 · Chapter 2 · Lesson 7 — asking good questions without being annoying. Chat with Tey. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'Asking good questions',
  summary: 'Clinton is stuck on how to store confirmations offline. Should he ask Mr Tamba straight away, or spend two days stuck on his own? Tey has a rule for exactly this.',
  minutes: 11,
  outcomes: ['Decide when to ask for help', 'Ask with what you\'ve already tried', 'Batch small questions'],
  learn: [
    {
      kind: 'chat',
      turns: [
        {
          tey: 'New interns worry about two opposite things: asking too much, and asking too little. Which one do you think hurts more?',
          replies: ['Asking too much', 'Asking too little'],
        },
        {
          tey: 'Usually too little. A question takes five minutes; two days stuck in silence can cost a week. A simple rule: try on your own for a set time, say 30 minutes, then ask. Your supervisor may prefer a different time, so ask them.',
          replies: ['How do I ask well?'],
        },
        {
          tey: 'Bring what you\'ve tried: "I\'m trying to save confirmations with no data. I tried localStorage, but it clears when the phone restarts. I\'m thinking IndexedDB. Is that the right direction?" That takes him 30 seconds to answer, and shows you\'ve thought about it.',
          replies: ['And small questions?'],
        },
        {
          tey: 'Batch them. Keep a list, and bring three small ones to your Friday check-in instead of interrupting him three times. Urgent or blocking? Ask now.',
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Try for a set time, then ask. Say what you tried and what you think. Batch small questions; ask blocking ones now.',
    },
  ],
  apply: {
    scenario: 'Clinton gets stuck on his project.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Which usually hurts a new intern more?',
        options: [
          { text: 'Asking one good question', why: 'One good question is cheap. Silence is expensive.' },
          { text: 'Asking too little and staying stuck for days' },
          { text: 'Writing notes', why: 'Notes help. Silence hurts.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Put a good question in order.',
        lines: ['What you\'re trying to do', 'What you tried', 'What happened', 'What you think the answer might be'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Ask now, or save for Friday?',
        groups: ['Ask now', 'Save for Friday'],
        items: [
          { text: 'You can\'t continue at all without an answer', group: 0 },
          { text: 'Which font to use in the menu', group: 1 },
          { text: 'You might have deleted real customer data', group: 0 },
          { text: 'A small naming question', group: 1 },
          { text: 'Whether to add a nice-to-have feature', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the weak question.',
        lines: ['I tried localStorage; it clears on restart.', 'It doesn\'t work. Help?', 'Is IndexedDB the right direction?'],
        bug: 1,
        explanation: 'No context. Say what you tried and what happened.',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'I\'ve been stuck for two days but didn\'t want to bother Mr Tamba. Was that right?',
        options: [
          { text: 'Yes, never bother your supervisor.', why: 'Two days stuck costs far more than one question.' },
          { text: 'I\'ll keep going alone for a week.', why: 'Ask now.' },
          { text: 'No: I should have asked after a set time. I\'ll ask now, with what I tried.' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each habit to why it helps.',
        pairs: [
          ['Try for a set time first', 'You often solve it yourself'],
          ['Say what you tried', 'Quicker for them to answer'],
          ['Batch small questions', 'Fewer interruptions'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which question is best?',
        options: [
          { text: '"I tried localStorage but it clears on restart. Is IndexedDB the right direction?"' },
          { text: '"How do I do my project?"', why: 'Too big. Be specific.' },
          { text: '"Why is this so hard?"', why: 'Not a question he can answer.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Tey suggests trying alone for about how many minutes first? (a number)',
        answers: ['30', 'thirty'],
        placeholder: 'A number',
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Tey\'s rule.',
        template: '[[1]] small questions. Ask [[2]] ones now.',
        blanks: [['Batch'], ['blocking', 'urgent']],
        distractors: ['Hide', 'easy', 'funny'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Good question habit, or not?',
        groups: ['Good habit', 'Not good'],
        items: [
          { text: 'Keeping a list for Friday', group: 0 },
          { text: 'Messaging him every ten minutes', group: 1 },
          { text: 'Sharing your best guess', group: 0 },
          { text: 'Pretending you understand', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Do you tend to ask too much or too little? What would a good "try first" time be for you?',
    starters: ['I tend to...', 'My rule will be...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Next time you\'re stuck, write your question in four parts before you send it: goal, what you tried, what happened, your guess.',
  },
  notes: 'The 30-minute "try first" time is a rule of thumb, not research; supervisors differ, so ask yours. localStorage/IndexedDB detail fits Clinton\'s web skills.',
};

export default lesson;
