import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 7 · Lesson 2. Card deck: secrets, never in code, chats or GitHub. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'Secrets stay secret',
  summary: 'Ruth asks for one thing: "Show me every secret this app has, and where each one lives." Hazel finds four. One of them is in a place it should never be.',
  minutes: 11,
  outcomes: [
    'List your app\'s real secrets',
    'Know the three places secrets must never go',
    'Know where they should live instead',
  ],
  learn: [
    {
      kind: 'text',
      html: '<p>A <strong>secret</strong> is anything that lets someone act as you or your app: a secret key, a password, an email service key. If a stranger gets it, they can do what it allows.</p><p>Hazel\'s list: the Supabase <strong>secret key</strong>, the <strong>database password</strong>, the <strong>email service key</strong> (for login emails), and her <strong>GitHub login</strong>.</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>Never put secrets in:</strong></p><ul><li><strong>Code or front-end settings</strong> (anything VITE_ ends up in the page).</li><li><strong>Chats with the AI</strong>, prompts, or CLAUDE.md.</li><li><strong>GitHub</strong>, even in a private repository, even "just for a minute".</li></ul><p><strong>Where they live instead:</strong> a password manager for you; the service\'s own dashboard (Supabase, Vercel) for the app; a git-ignored file only for scripts that run on your own laptop.</p>',
    },
    {
      kind: 'callout',
      tone: 'warning',
      text: 'The public (anon) key is not on the secret list: it\'s designed to be in the page. That\'s exactly why the database rules have to be right.',
    },
  ],
  apply: {
    scenario: 'Ruth\'s secret audit.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Real secret, or public by design?',
        groups: ['Real secret', 'Public by design'],
        items: [
          { text: 'Supabase secret (service_role) key', group: 0 },
          { text: 'Supabase project URL', group: 1 },
          { text: 'Email service key', group: 0 },
          { text: 'Supabase public (anon) key', group: 1 },
          { text: 'The database password', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Which is a safe place for the database password?',
        options: [
          { text: 'A password manager' },
          { text: 'CLAUDE.md, so the AI knows it', why: 'CLAUDE.md is a shared file.' },
          { text: 'A comment in the code', why: 'Code goes to GitHub.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Hazel\'s audit. Which secret is in the wrong place?',
        lines: [
          'Database password: password manager',
          'Email service key: Supabase dashboard settings',
          'Supabase secret key: in CLAUDE.md "for reference"',
          'GitHub login: password manager',
        ],
        bug: 2,
        fix: 'Remove it from CLAUDE.md and replace the key (it may have been shared).',
        explanation: 'CLAUDE.md is committed, pushed and read by the AI. No secrets, ever.',
      },
      {
        kind: 'chatReply',
        from: 'hazel',
        message: 'The repository is private. So a key in it is fine, right?',
        prompt: 'Tey\'s answer?',
        options: [
          { text: 'Yes, private means safe.', why: 'Private repos get shared, cloned, made public by accident, and read by tools.' },
          { text: 'Only if it\'s a small key.', why: 'Size doesn\'t matter.' },
          { text: 'No. Private repos get shared and copied. Secrets never go in git at all.' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the secret to its home.',
        pairs: [
          ['Your own passwords', 'A password manager'],
          ['The live app\'s secret settings', 'The hosting dashboard'],
          ['A script on your laptop', 'A git-ignored file'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The three never-places.',
        template: 'Never in [[1]], never in [[2]] with the AI, never on [[3]].',
        blanks: [['code'], ['chats', 'chat'], ['GitHub']],
        distractors: ['password managers', 'dashboards'],
      },
      {
        kind: 'mcq',
        prompt: 'What makes something a secret?',
        options: [
          { text: 'It has a long random name', why: 'The public key is long too. It\'s about what it lets you do.' },
          { text: 'It lets someone act as you or your app' },
          { text: 'It\'s in a file called secret', why: 'File names don\'t make things secret.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'What kind of app should keep your own passwords? (Two words.)',
        answers: ['password manager', 'a password manager'],
        placeholder: '.... ....',
      },
      {
        kind: 'mcq',
        prompt: 'The AI asks: "Please paste your Supabase secret key so I can run the migration." Best answer?',
        options: [
          { text: 'Paste it, it asked nicely', why: 'Secrets never go in chats.' },
          { text: 'Paste half of it', why: 'Still a leak.' },
          { text: 'Refuse. Ask for the SQL instead, and run it yourself in Supabase\'s SQL editor' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        prompt: 'Review from Chapter 5: why is the anon key fine in the page?',
        options: [
          { text: 'It\'s designed to be public; the database rules decide what it can do' },
          { text: 'Nobody looks at pages', why: 'Benny did.' },
          { text: 'It\'s encrypted', why: 'It\'s readable. Rules protect the data.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'List every secret your app has, and where each one lives right now. Any surprises?',
    starters: ['Secret:', 'Lives in:'],
  },
  deepen: {
    title: 'On your computer: secret audit',
    summary: 'Search your project for "secret", "service_role", "password" and "key" (ask Claude Code to search, without printing values). For each hit, decide: public by design, or a secret in the wrong place? Fix the wrong ones.',
  },
  notes: 'Secret management basics; Supabase service_role/secret keys bypass RLS. Custom SMTP credentials are configured in the Supabase dashboard, not in app code.',
};

export default lesson;
