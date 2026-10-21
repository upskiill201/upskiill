import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 10 · Lesson 10 — Checkpoint 2. Secrets, confidential docs, copyright, honesty. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Checkpoint: secrets, rights and honesty',
  summary: 'Secrets in logs, confidential documents, copyright and honest disclosure. Show you can use AI without putting anyone at risk.',
  minutes: 14,
  milestone: 'CHECKPOINT',
  outcomes: ['Show you can protect secrets and confidential documents', 'Show you can handle copyright and disclosure honestly'],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Checkpoint 2. A busy week of near-misses.', replies: ['Ready'] },
        { tey: 'Warm-up: a key got pasted into a chat. First move?', replies: ['Tell IT', 'Rotate it'] },
        { tey: 'Both, fast. Go.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint: near-miss week.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the steps after a secret is pasted.',
        lines: ['Tell manager and IT', 'Rotate or change it', 'Delete the chat', 'Check for misuse', 'Prevent next time'],
      },
      {
        kind: 'findBug',
        prompt: 'Which log line is a secret?',
        lines: ['Error 500', 'Endpoint: /settle', 'token=eyJhbGciOiJIUzI1NiJ9xyz', 'Time 10:02'],
        bug: 2,
        fix: 'token=[REDACTED]',
        explanation: 'Tokens give access.',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which request helps with a confidential contract safely?',
        options: [
          { text: 'Here\'s the contract; summarise it.', why: 'Confidential text.' },
          { text: 'What do outage liability clauses usually say, and what words should I look for?' },
          { text: 'Here\'s just one page.', why: 'Still confidential.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Myth', 'Fact'],
        items: [
          { text: 'All AI text is automatically protected by copyright', group: 0 },
          { text: 'AI can produce text close to published work', group: 1 },
          { text: 'Copying a living author\'s style is always fine', group: 0 },
          { text: 'Your own facts make content more original', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Did you use AI on our work? Legal is asking.',
        prompt: 'Best reply from Ada?',
        options: [
          { text: 'Yes, for drafts and summaries in our approved tool; no confidential data entered, and I checked every figure.' },
          { text: 'No.', why: 'Never pretend.' },
          { text: 'Does it matter?', why: 'Answer plainly.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the secret to its fix.',
        pairs: [
          ['Password', 'Change it'],
          ['API key', 'Rotate it'],
          ['Access token', 'Revoke it'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the rules.',
        template: 'Ask [[1]] questions instead of pasting confidential text. Use AI to draft, then make it [[2]].',
        blanks: [['general'], ['yours']],
        distractors: ['secret', 'longer'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What placeholder replaces a secret before pasting? (one word, capitals)',
        answers: ['REDACTED', '[REDACTED]', 'redacted'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Lucía asks for the confidential bank contract. What should Ada do?',
        options: [
          { text: 'Decline, and offer to explain what the relevant clause says' },
          { text: 'Send it', why: 'Confidential.' },
          { text: 'Ignore her', why: 'Offer what she can share.' },
        ],
        answer: 0,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Ada\'s AI note line.',
        tiles: ['No', 'client', 'data', 'entered'],
        distractors: ['maybe'],
      },
      {
        kind: 'findBug',
        prompt: 'Which blog plan step is a problem?',
        lines: ['Draft from our facts', 'Add real shop stories', 'Publish a paragraph copied word for word', 'Edit into our voice'],
        bug: 2,
        fix: 'Rewrite it or quote and credit.',
        explanation: 'Copying is a copyright risk.',
      },
      {
        kind: 'sortGroups',
        prompt: 'Must disclose AI use, or optional?',
        groups: ['Must', 'Optional'],
        items: [
          { text: 'Client asks directly', group: 0 },
          { text: 'AI fixed an internal typo', group: 1 },
          { text: 'Contract requires it', group: 0 },
          { text: 'AI suggested a meeting title', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why tell IT immediately about a pasted key?',
        options: [
          { text: 'Rotating it quickly limits the chance of misuse' },
          { text: 'To blame someone', why: 'To limit damage.' },
          { text: 'No need if the chat is deleted', why: 'Copies may remain.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Order the confidential-document approach.',
        lines: ['Notice it\'s confidential', 'Ask a general question', 'Read the clause yourself', 'Approved tool or legal if needed'],
      },
    ],
  },
  reflect: {
    prompt: 'Which of these near-misses could happen to you? How will you prevent it?',
    starters: ['It could happen when...', 'I\'ll prevent it by...'],
  },
  notes: 'Checkpoint for Unit 10 lessons 6-9. Token shown is fictional.',
};

export default lesson;
