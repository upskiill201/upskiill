import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 9. Myth or Fact: environment variables and keys. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Settings outside the code',
  summary: 'Benny reads the app\'s code on GitHub and finds no Supabase address anywhere. "Is it broken?" No: it\'s in .env.local, on purpose. Myth or fact about settings, keys and what\'s really secret.',
  minutes: 11,
  outcomes: [
    'Explain environment variables in plain words',
    'Tell public settings from real secrets',
    'Know that anything in a web page can be read',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        { text: 'An environment variable is a setting kept outside the code, like the database address, read when the app runs.', isFact: true, explain: 'The code says "use VITE_SUPABASE_URL"; the value lives in .env.local on your laptop, and in the hosting settings when live.' },
        { text: 'Putting a key in .env.local makes it secret, even in a web page.', isFact: false, explain: 'Anything the browser needs ends up in the page, where anyone can read it. .env.local keeps it out of GitHub, not out of the browser.' },
        { text: 'The Supabase public (anon) key is designed to be seen; the database rules are what keep data safe.', isFact: true, explain: 'That\'s why Chapter 7\'s database rules matter so much: the key alone protects nothing.' },
        { text: 'The secret (service_role) key is fine in the app if the code is hidden well.', isFact: false, explain: 'There\'s no hiding code in a web page. The secret key never goes in front-end code at all.' },
        { text: 'Keeping settings outside the code lets the same code use your laptop\'s settings and the live site\'s settings.', isFact: true, explain: 'Same code, different .env per place. Chapter 8 sets the live ones on Vercel.' },
        { text: 'If a key is in the code on GitHub, deleting the line fixes it.', isFact: false, explain: 'Git keeps history, so the key is still in old commits. A leaked secret must be replaced (rotated). Chapter 7.' },
      ],
    },
    {
      kind: 'code',
      language: 'javascript',
      code: 'const supabase = createClient(\n  import.meta.env.VITE_SUPABASE_URL,\n  import.meta.env.VITE_SUPABASE_ANON_KEY,\n);',
      caption: 'The code names the settings; .env.local holds the values.',
    },
  ],
  apply: {
    scenario: 'Benny\'s "it\'s broken" scare.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What is an environment variable?',
        options: [
          { text: 'A setting kept outside the code, read when the app runs' },
          { text: 'A variable about the weather', why: 'It\'s about the app\'s settings.' },
          { text: 'A password for your laptop', why: 'It\'s an app setting.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Public setting, or real secret?',
        groups: ['Public setting', 'Real secret'],
        items: [
          { text: 'Supabase project URL', group: 0 },
          { text: 'Supabase anon / publishable key', group: 0 },
          { text: 'Supabase service_role / secret key', group: 1 },
          { text: 'The database password', group: 1 },
          { text: 'An email service\'s sending key', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'benny',
        message: 'So the anon key is in the page anyway. Anyone could use it to read our data?!',
        prompt: 'Hazel\'s answer?',
        options: [
          { text: 'Yes, so we\'re doomed.', why: 'Database rules decide what that key can do.' },
          { text: 'Only if the database lets them. That\'s why we turn on database rules in Chapter 7: the key opens the door, the rules decide which rooms.' },
          { text: 'No, keys are invisible.', why: 'They\'re visible to anyone who looks.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'The code reads the setting.',
        template: 'import.meta.env.[[1]]',
        blanks: [['VITE_SUPABASE_URL']],
        distractors: ['SUPABASE_SECRET', 'password'],
        language: 'javascript',
      },
      {
        kind: 'findBug',
        prompt: 'Which line in Hazel\'s notes is wrong?',
        lines: [
          '.env.local keeps settings out of GitHub.',
          'The anon key is meant to be public.',
          '.env.local makes keys invisible in the browser.',
          'The secret key never goes in the app.',
        ],
        bug: 2,
        fix: 'Anything the page uses can be read in the browser.',
        explanation: '.env.local protects GitHub, not the browser.',
      },
      {
        kind: 'mcq',
        prompt: 'A secret key was committed to GitHub last week. Hazel deletes the line today. Is it safe?',
        options: [
          { text: 'Yes, it\'s gone', why: 'Git history still has it.' },
          { text: 'Yes, if the repository is private', why: 'Private helps, but the key must still be replaced.' },
          { text: 'No: it\'s still in old commits. The key must be replaced with a new one' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'What must every setting name start with for Vite to give it to the page? (Five characters.)',
        answers: ['vite_', 'VITE_', 'vite'],
        placeholder: '....._',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the place to the settings it holds.',
        pairs: [
          ['.env.local', 'Your laptop\'s settings'],
          ['Vercel project settings', 'The live site\'s settings'],
          ['GitHub', 'No secrets at all'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'The AI suggests VITE_SUPABASE_SERVICE_ROLE_KEY "to fix a permissions error". What should Hazel do?',
        options: [
          { text: 'Approve it: errors are bad', why: 'This puts the master key in the page for anyone to read.' },
          { text: 'Refuse: the secret key never goes in the page. Ask what the permissions error actually says' },
          { text: 'Add it but rename it', why: 'Renaming doesn\'t hide it.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        prompt: 'Review from Chapter 5 lesson 4: where do you paste key values?',
        options: [
          { text: 'Into .env.local yourself, in a text editor' },
          { text: 'Into the chat with the AI', why: 'Keep values out of chats.' },
          { text: 'Into CLAUDE.md', why: 'CLAUDE.md is shared like any file.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'What\'s the difference between something being "out of sight" and being "secret"? Where else in life does that matter?',
  },
  deepen: {
    title: 'On your computer: check your settings',
    summary: 'Open your .env.local. Check: only VITE_ settings the page needs, and no secret or service_role key. Run git status: .env.local must not be listed. Search your code for "service_role": nothing should come up.',
  },
  notes: 'Vite env (vite.dev): only VITE_-prefixed variables are exposed to client code via import.meta.env, and they are embedded in the built bundle. Supabase anon/publishable keys are safe to expose when RLS is enabled; service_role/secret bypasses RLS. Leaked secrets must be rotated because git history retains them.',
};

export default lesson;
