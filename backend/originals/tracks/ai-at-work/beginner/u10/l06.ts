import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 10 · Lesson 6 — passwords, keys and secrets. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Passwords, keys and secrets',
  summary: 'Tolu pasted an error message into AI for help. It contained the bank\'s API key. What now? Five steps, fast.',
  minutes: 12,
  outcomes: [
    'Recognise secrets hiding in error messages and files',
    'Remove secrets before asking AI for help',
    'Act fast if a secret has been exposed',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Five steps when a secret gets pasted',
      steps: [
        { title: '1. Stop and don\'t hide it', body: 'Tell your manager and IT straight away. Speed matters more than embarrassment.' },
        { title: '2. Change the secret', body: 'Passwords get changed. API keys get "rotated": the old key is switched off and a new one issued.' },
        { title: '3. Delete the chat', body: 'It may not remove every copy, but it helps.' },
        { title: '4. Check for misuse', body: 'IT checks whether the key or account was used by anyone else.' },
        { title: '5. Prevent next time', body: 'Before pasting logs or errors, search for "key", "token", "password" and long random strings, and replace them with [REDACTED].' },
      ],
    },
    {
      kind: 'callout',
      tone: 'warning',
      text: 'Secrets hide in error messages, logs and config files. Replace them with [REDACTED] before pasting. If one slips, tell IT and change it immediately.',
    },
  ],
  apply: {
    scenario: 'Tolu pasted an error message with the bank API key.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the five steps.',
        lines: ['Tell manager and IT', 'Change or rotate the secret', 'Delete the chat', 'Check for misuse', 'Prevent next time'],
      },
      {
        kind: 'mcq',
        prompt: 'What does "rotating" an API key mean?',
        options: [
          { text: 'Typing it backwards', why: 'It means replacing it.' },
          { text: 'Switching off the old key and issuing a new one' },
          { text: 'Sharing it with more people', why: 'The opposite.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Which line in the error message is a secret?',
        lines: [
          'Error 401: unauthorised',
          'Endpoint: /payments/settle',
          'api_key=sk_live_8fK29xQ7pL0vT3',
          'Time: 09:14',
        ],
        bug: 2,
        fix: 'api_key=[REDACTED]',
        explanation: 'API keys give access to accounts.',
      },
      {
        kind: 'sortGroups',
        prompt: 'Secret, or safe to share?',
        groups: ['Secret', 'Safe'],
        items: [
          { text: 'A password', group: 0 },
          { text: 'An error code like 401', group: 1 },
          { text: 'An access token', group: 0 },
          { text: 'The name of the endpoint', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Tolu says he might have pasted a key into an AI chat but it\'s probably fine.',
        prompt: 'Best reply from Ada?',
        options: [
          { text: 'Probably fine, leave it.', why: 'Treat it as exposed.' },
          { text: 'Fire Tolu.', why: 'Fix it; learn from it.' },
          { text: 'Let\'s treat it as exposed: tell IT now and rotate the key. It takes ten minutes and removes the risk.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the rule.',
        template: 'Replace secrets with [[1]] before pasting. If one slips, tell [[2]].',
        blanks: [['[REDACTED]', 'REDACTED'], ['IT']],
        distractors: ['nothing', 'nobody'],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which way of asking AI for help with the error is safe?',
        options: [
          { text: 'Paste the full log as is.', why: 'Contains the key.' },
          { text: 'Paste the log with the key replaced by [REDACTED], and ask what a 401 error on this endpoint usually means.' },
          { text: 'Paste the key separately so AI can test it.', why: 'Never.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the secret to the fix if exposed.',
        pairs: [
          ['Password', 'Change it'],
          ['API key', 'Rotate it'],
          ['Access token', 'Revoke it'],
        ],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the safe log line.',
        tiles: ['api_key=', '[REDACTED]'],
        distractors: ['sk_live_8fK29'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which team should Tolu tell first, besides his manager? (two letters)',
        answers: ['IT', 'it'],
        placeholder: 'Two letters',
      },
      {
        kind: 'sortGroups',
        prompt: 'Search for this before pasting a log?',
        groups: ['Search for it', 'No need'],
        items: [
          { text: '"key"', group: 0 },
          { text: '"token"', group: 0 },
          { text: '"Monday"', group: 1 },
          { text: 'Long random strings', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why tell IT fast instead of hiding it?',
        options: [
          { text: 'The sooner the key is rotated, the less time anyone has to misuse it' },
          { text: 'To get Tolu in trouble', why: 'It\'s about limiting damage.' },
          { text: 'No need if deleted', why: 'Copies may remain.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Where might secrets hide in the files or messages you handle?',
    starters: ['They might hide in...', 'I\'ll check by...'],
  },
  deepen: { title: 'Try it today', summary: 'Before pasting your next log or error into AI, search it for "key", "token" and "password".' },
  notes: 'The key shown is fictional. Key rotation and revocation are standard security practice.',
};

export default lesson;
