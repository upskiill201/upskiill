import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 12 · Lesson 10 — Checkpoint 2. Words vs numbers, voice, image/video, agents. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Checkpoint: the right kind of AI',
  summary: 'Words vs numbers, voice assistants, image and video tools, and agents. Show you know which kind of AI fits which job.',
  minutes: 14,
  milestone: 'CHECKPOINT',
  outcomes: ['Show you can match AI types to tasks', 'Show you can use voice, video and agents safely'],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Checkpoint 2. Different kinds of AI, different jobs.', replies: ['Ready'] },
        { tey: 'Warm-up: numbers from where?', replies: ['Tools that calculate'] },
        { tey: 'Words from AI, numbers from tools that calculate. Go.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint: picking the right AI.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Chat AI, or a calculating tool?',
        groups: ['Chat AI', 'Calculating'],
        items: [
          { text: 'Simplify a paragraph', group: 0 },
          { text: 'Monthly total', group: 1 },
          { text: 'Explain a trend', group: 0 },
          { text: 'Percentage change', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'AI says 1.2 million reached; dashboard says 120,000.',
        prompt: 'Best reply from Ada?',
        options: [
          { text: 'Trust the dashboard; use AI only for the words around it.' },
          { text: 'Use the bigger.', why: 'Source wins.' },
          { text: 'Average them.', why: 'Source wins.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Good voice use, or risky?',
        groups: ['Good', 'Risky'],
        items: [
          { text: 'Notes in the car', group: 0 },
          { text: 'ID numbers aloud in a market', group: 1 },
          { text: 'Read-back before sending', group: 0 },
          { text: 'Sending unread voice text', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What does voice typing often mishear?',
        options: [
          { text: 'Nothing', why: 'It mishears.' },
          { text: 'Names and numbers' },
          { text: 'Only long words', why: 'Names and numbers.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Which ad element must change?',
        lines: ['AI mood clip', 'AI payment animation', 'AI clone of the CEO\'s voice, no consent', 'AI label'],
        bug: 2,
        fix: 'CEO records it, or remove it.',
        explanation: 'Consent for real people.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the need to the right choice.',
        pairs: [
          ['Explain payments', 'AI animation'],
          ['Customer views', 'Real interviews, with permission'],
          ['Official figures', 'The dashboard'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What makes an AI agent different?',
        options: [
          { text: 'It\'s faster at writing', why: 'It acts.' },
          { text: 'Nothing', why: 'It acts.' },
          { text: 'It takes actions, not just drafts' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Agent alone, or needs approval?',
        groups: ['Alone', 'Approval'],
        items: [
          { text: 'Research venues', group: 0 },
          { text: 'Pay a deposit', group: 1 },
          { text: 'Draft invites', group: 0 },
          { text: 'Email 20 shops', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which agent instruction is safest?',
        options: [
          { text: 'Handle the invites.', why: 'Too open.' },
          { text: 'Draft an invite for each of the 20 shops and show me all drafts before sending anything.' },
          { text: 'Whatever it takes.', why: 'No limits.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the rules.',
        template: 'Words from AI; numbers from tools that [[1]]. Agents need [[2]] before they act.',
        blanks: [['calculate'], ['approval']],
        distractors: ['guess', 'snacks'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the agent rule.',
        tiles: ['Show', 'me', 'before', 'you', 'send'],
        distractors: ['after'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Using someone\'s likeness in AI video needs their ... (one word)',
        answers: ['consent', 'permission'],
        placeholder: 'One word',
      },
      {
        kind: 'findBug',
        prompt: 'Which agent setting is risky?',
        lines: ['Launch folder access only', 'Approval before sending', 'Bank access, no approval', 'Action log'],
        bug: 2,
        fix: 'Approval for every payment, or no bank access.',
        explanation: 'Money needs a human.',
      },
      {
        kind: 'mcq',
        prompt: 'Why use shop IDs in voice notes?',
        options: [
          { text: 'Shorter', why: 'Privacy.' },
          { text: 'No personal details spoken or stored' },
          { text: 'No reason', why: 'Privacy.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'Which kind of AI do you use for the wrong job? What would fit better?',
    starters: ['I use...', 'Better fit:'],
  },
  notes: 'Checkpoint for Unit 12 lessons 6-9.',
};

export default lesson;
