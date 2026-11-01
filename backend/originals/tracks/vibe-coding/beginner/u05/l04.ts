import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 4. Walkthrough: a database on Supabase. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Your database on Supabase',
  summary: 'Saturday morning, coffee, Ruth reading over her shoulder. Hazel makes the band\'s database in a web dashboard, no code, and connects her app to it with two settings. One of the keys on the screen must never leave it.',
  minutes: 13,
  outcomes: [
    'Create a Supabase project',
    'Find the project URL and the public key',
    'Store them in .env.local, and keep the secret key out',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'From zero to connected',
      steps: [
        { title: '1. Sign up', body: 'At supabase.com. The free plan is enough for this course.' },
        { title: '2. New project', body: 'Give it a name (esplanade-brass), let it generate a strong database password and save that in a password manager, and pick a region near your users.' },
        { title: '3. Find the two settings', body: 'In the project\'s settings, find the API keys. You need the Project URL and the public key (called anon or publishable). The public key is designed to be used in a web page.' },
        { title: '4. Leave the secret key alone', body: 'The same screen shows a secret key (called service_role or secret). It skips every safety rule. It never goes in your app, a prompt, or GitHub.' },
        { title: '5. Put the settings in .env.local', body: 'A file in your project folder. Vite reads names that start with VITE_.', code: 'VITE_SUPABASE_URL=https://your-project.supabase.co\nVITE_SUPABASE_ANON_KEY=your-public-key', language: 'bash' },
        { title: '6. Check .gitignore', body: 'Open .gitignore and check it covers .env.local (Vite\'s default has *.local). Then git status should NOT list .env.local.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'warning',
      text: 'Paste keys into .env.local yourself, in a text editor. Don\'t paste them into your chat with the AI. Tell it: "The settings are in .env.local as VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY."',
    },
  ],
  apply: {
    scenario: 'Setting up the band\'s database.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Connect the app, in order.',
        lines: [
          'Sign up at supabase.com',
          'Create a new project and save the database password',
          'Copy the Project URL and public key',
          'Paste them into .env.local yourself',
          'Check git status doesn\'t list .env.local',
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Which key is which?',
        groups: ['Public key: OK in the app', 'Secret key: never in the app'],
        items: [
          { text: 'anon / publishable key', group: 0 },
          { text: 'service_role / secret key', group: 1 },
          { text: 'The key that skips every safety rule', group: 1 },
          { text: 'The key designed for web pages', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'hazel',
        message: 'Can I just paste both keys into the chat so the AI sets it all up?',
        prompt: 'Tey\'s answer?',
        options: [
          { text: 'Yes, it\'s faster.', why: 'Keys pasted into chats can end up in logs and files.' },
          { text: 'Only the secret one.', why: 'The secret one least of all.' },
          { text: 'Put the public settings in .env.local yourself and tell it the names. The secret key goes nowhere near the app.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete .env.local.',
        template: 'VITE_SUPABASE_[[1]]=https://your-project.supabase.co\nVITE_SUPABASE_[[2]]_KEY=your-public-key',
        blanks: [['URL'], ['ANON']],
        distractors: ['SECRET', 'PASSWORD'],
        language: 'bash',
      },
      {
        kind: 'mcq',
        prompt: 'git status lists .env.local as a new file. What does that mean?',
        options: [
          { text: 'All good, commit it', why: 'Settings files shouldn\'t be committed.' },
          { text: '.gitignore isn\'t covering it: add .env.local to .gitignore before committing' },
          { text: 'Delete git', why: 'Just fix .gitignore.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which file tells git which files to never save?',
        answers: ['.gitignore', 'gitignore'],
        placeholder: '.git...',
      },
      {
        kind: 'findBug',
        prompt: 'Which line in Hazel\'s .env.local must come out?',
        lines: [
          'VITE_SUPABASE_URL=https://abcd.supabase.co',
          'VITE_SUPABASE_ANON_KEY=eyJhbGciOi...public',
          'VITE_SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOi...secret',
        ],
        bug: 2,
        fix: 'Delete it. The secret key never goes in a front-end app.',
        explanation: 'Anything starting VITE_ ends up in the page, where anyone can read it.',
        language: 'bash',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the thing to where it lives.',
        pairs: [
          ['Database password', 'A password manager'],
          ['Public key', '.env.local'],
          ['Secret key', 'Nowhere in the app'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why tell the AI the names of the settings, not the values?',
        options: [
          { text: 'It only needs to know where to read them; the values stay out of the chat' },
          { text: 'It can\'t read values', why: 'It could. You just don\'t want them in the chat.' },
          { text: 'Names are shorter', why: 'It\'s about keeping keys out of the conversation.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'Review from Chapter 4: Hazel accidentally commits .env.local. Is git revert enough?',
        options: [
          { text: 'Yes, it\'s gone completely', why: 'The old commit still has it in the history.' },
          { text: 'No: the key is still in the history. Chapter 7 covers what to do (change the key).' },
          { text: 'Keys can\'t be committed', why: 'They can, by mistake. That\'s why .gitignore matters.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'Where do you keep passwords today? Is it somewhere you\'d be happy for a stranger to look?',
  },
  deepen: {
    title: 'On your computer: connect Supabase',
    summary: 'Create a free Supabase project. Put the Project URL and public key in .env.local yourself. Check .gitignore covers it and git status doesn\'t list it. Then tell Claude Code the setting names and ask it to connect the app and show "Connected" on the page.',
  },
  notes: 'Supabase dashboard (October 2026): new project with generated DB password and region; API keys page shows Project URL, publishable/anon key (safe in browsers with RLS on) and secret/service_role key (bypasses RLS; server only). Key naming is changing (anon/service_role → publishable/secret), so both names are given. Vite exposes VITE_-prefixed env vars to client code; Vite\'s default .gitignore includes *.local.',
};

export default lesson;
