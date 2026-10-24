import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 7 · Lesson 3. Walkthrough: the key on GitHub (rotate, remove, ignore). */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'The key on GitHub',
  summary: 'Ruth scrolls the band\'s GitHub history and stops at a commit from the 1 a.m. spiral: "temp: seed test gigs". Inside is a file called .env with the Supabase secret key. Here\'s what to do, in the right order.',
  minutes: 12,
  outcomes: [
    'Replace (rotate) a leaked key first',
    'Stop git tracking the file and ignore it',
    'Know why deleting the file isn\'t enough',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'A secret leaked: the order matters',
      steps: [
        { title: '1. Replace the key, right now', body: 'In Supabase\'s API keys settings, make a new secret key and delete or roll the old one, so the leaked key stops working. This is the step that actually protects you.' },
        { title: '2. Put the new key only where it\'s needed', body: 'Here, only Hazel\'s seed script on her laptop uses it. It goes in a git-ignored file there. Nowhere else.' },
        { title: '3. Stop git tracking the file', body: 'Takes .env out of the next commit but keeps it on the laptop.', code: 'git rm --cached .env', language: 'bash' },
        { title: '4. Ignore it from now on', body: 'Add these lines to .gitignore. Vite\'s default only ignores *.local files, so a plain .env slipped through.', code: '.env\n.env.*', language: 'bash' },
        { title: '5. Commit and push', body: '"Stop tracking .env; key rotated". The old commit still holds the old key, but that key no longer works.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Deleting a file doesn\'t delete it from git\'s history. Anyone with the repository can still find it. That\'s why step 1 is replacing the key, not deleting the file.',
    },
  ],
  apply: {
    scenario: 'The commit from 1 a.m.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'A leaked key, in the right order.',
        lines: [
          'Replace the key in Supabase so the old one stops working',
          'Put the new key only in a git-ignored file',
          'git rm --cached .env',
          'Add .env to .gitignore',
          'Commit and push',
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why is replacing the key step 1, not step 5?',
        options: [
          { text: 'It\'s the step that stops the leaked key working; the old commit still has it' },
          { text: 'It\'s the easiest step', why: 'It\'s the most important one.' },
          { text: 'Order doesn\'t matter', why: 'Every minute the old key works, someone could use it.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Replacing a leaked key with a new one is called... (starts with "rot")',
        answers: ['rotating', 'rotate', 'rotation', 'rotating the key'],
        placeholder: 'rot...',
      },
      {
        kind: 'findBug',
        prompt: 'Hazel\'s .gitignore. Why did .env slip through?',
        lines: ['node_modules', 'dist', '*.local'],
        bug: 2,
        fix: 'Add .env and .env.* as well.',
        explanation: '*.local only matches names ending in .local. A plain .env doesn\'t.',
        language: 'bash',
      },
      {
        kind: 'chatReply',
        from: 'benny',
        message: 'I deleted .env and pushed. We\'re safe now, right?',
        prompt: 'Hazel\'s reply?',
        options: [
          { text: 'Yes, it\'s gone.', why: 'Git history still has it.' },
          { text: 'Not yet. The old commit still has the key. We have to replace it in Supabase so it stops working.' },
          { text: 'Only if we delete GitHub.', why: 'Replacing the key is the real fix.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Stop tracking the file but keep it on the laptop.',
        template: 'git rm --[[1]] .env',
        blanks: [['cached']],
        distractors: ['force', 'all'],
        language: 'bash',
      },
      {
        kind: 'sortGroups',
        prompt: 'Protects you, or only tidies up?',
        groups: ['Protects you', 'Only tidies up'],
        items: [
          { text: 'Replacing the key', group: 0 },
          { text: 'Deleting the file in a new commit', group: 1 },
          { text: 'Adding .env to .gitignore', group: 1 },
          { text: 'Checking nobody else has a copy of the old key', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which CLAUDE.md rule would have prevented this?',
        options: [
          { text: 'Be careful with keys', why: 'Careful how?' },
          { text: 'Use keys sparingly', why: 'Still vague.' },
          { text: 'Never write secret keys into files. Never commit .env files. Ask me before any script that needs the secret key.' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the command or place to its job.',
        pairs: [
          ['git rm --cached .env', 'Stop git tracking the file'],
          ['.gitignore', 'Never track it again'],
          ['Supabase API keys settings', 'Replace the key'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Review from Chapter 4: which command shows, before a commit, that a secret file is about to go in?',
        options: [
          { text: 'git log', why: 'That shows past commits.' },
          { text: 'git status' },
          { text: 'git push', why: 'That sends it. Too late.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'If one of your own passwords leaked tonight, do you know how to change it quickly? Which one would you change first?',
  },
  deepen: {
    title: 'On your computer: leak-proof',
    summary: 'Make sure your .gitignore covers .env and .env.* as well as *.local. Run git log --stat and look for any .env file ever committed. If you find a real secret, replace it first, then stop tracking the file.',
  },
  notes: 'Supabase API keys (October 2026): new secret keys can be created and old ones deleted; legacy JWT-based keys rotate by rolling the JWT secret. Vite\'s default .gitignore includes *.local, not .env. `git rm --cached` untracks without deleting the working file. Rewriting history (git filter-repo) is out of scope; rotation is the fix.',
};

export default lesson;
