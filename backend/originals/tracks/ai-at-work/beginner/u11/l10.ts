import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 11 · Lesson 10 — Checkpoint 2. Routine, chains, reuse, sharing. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Checkpoint: routines, chains, sharing',
  summary: 'A daily routine, chained tasks, captured conversations and a shared library. Show you can make AI habits that last.',
  minutes: 14,
  milestone: 'CHECKPOINT',
  outcomes: ['Show you can build routines and chains', 'Show you can capture and share prompts safely'],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Checkpoint 2. Ada\'s playbook, page two.', replies: ['Ready'] },
        { tey: 'Warm-up: why check between chain steps?', replies: ['Errors spread'] },
        { tey: 'Catch them early. Go.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint: the playbook grows.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order Ada\'s AI day.',
        lines: ['Inbox', 'Plan', 'Write and research', 'Follow-ups', 'Wrap up'],
      },
      {
        kind: 'sortGroups',
        prompt: 'With AI, or AI-free?',
        groups: ['With AI', 'AI-free'],
        items: [
          { text: 'Inbox sort', group: 0 },
          { text: 'Sketching a design idea', group: 1 },
          { text: 'Follow-up drafts', group: 0 },
          { text: 'A one-to-one with Tolu', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which chain link is risky?',
        lines: ['Summarise the table', 'Skip the check', 'Pick key points', 'Draft one-pager'],
        bug: 1,
        fix: 'Check the summary against the sheet.',
        explanation: 'Errors flow forward.',
      },
      {
        kind: 'sortGroups',
        prompt: 'Continue, or start fresh?',
        groups: ['Continue', 'Fresh'],
        items: [
          { text: 'One more tweak, same email', group: 0 },
          { text: 'A new task', group: 1 },
          { text: 'Shorten what you just got', group: 0 },
          { text: 'A drifting 80-message chat', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which request captures a chat that worked?',
        options: [
          { text: 'Thanks!', why: 'Captures nothing.' },
          { text: 'Write one prompt that would get this final result first time, including everything I clarified.' },
          { text: 'Again please.', why: 'Not reusable.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the library rule to what it prevents.',
        pairs: [
          ['Owner approves', 'Accidental breakage'],
          ['"Why" notes', 'Key lines removed'],
          ['Dates', 'Version confusion'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'arjun',
        message: 'Can I just edit the shared prompts directly when I improve them?',
        prompt: 'Best reply from Ada?',
        options: [
          { text: 'Edit anything, anytime.', why: 'That broke the follow-up.' },
          { text: 'Suggest the change and I\'ll test it; check the "why" notes first so we don\'t lose an important rule.' },
          { text: 'Never suggest changes.', why: 'Improvements are welcome.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the rules.',
        template: 'Small steps, [[1]] in between. Same task: [[2]].',
        blanks: [['check'], ['continue']],
        distractors: ['skip', 'delete'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the wrap-up prompt.',
        tiles: ['Done,', 'open,', 'and', 'tomorrow\'s', 'first', 'task'],
        distractors: ['diary'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many steps in Ada\'s report chain?',
        answers: ['5', 'five'],
        placeholder: 'A number',
      },
      {
        kind: 'findBug',
        prompt: 'Which shared prompt line is unsafe?',
        lines: ['[CLIENT] placeholder', 'Quality rules', 'A real login and password', '"Flag anything unclear"'],
        bug: 2,
        fix: 'Remove it and change the password.',
        explanation: 'Never share credentials.',
      },
      {
        kind: 'mcq',
        prompt: 'Why keep an hour a day AI-free?',
        options: [
          { text: 'Tools are down', why: 'It\'s deliberate.' },
          { text: 'No reason', why: 'For thinking.' },
          { text: 'Deep thinking needs space' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        prompt: 'Why test a captured prompt in a fresh chat?',
        options: [
          { text: 'To check it works without hidden earlier context' },
          { text: 'For fun', why: 'To check it stands alone.' },
          { text: 'No need', why: 'It may depend on old context.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Order a library change.',
        lines: ['Suggest', 'Owner checks why notes', 'Owner tests', 'Saved with a date'],
      },
    ],
  },
  reflect: {
    prompt: 'Which habit from this checkpoint will you build first?',
    starters: ['First:', 'Starting...'],
  },
  notes: 'Checkpoint for Unit 11 lessons 6-9.',
};

export default lesson;
