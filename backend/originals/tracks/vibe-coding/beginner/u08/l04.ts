import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 8 · Lesson 4. Before / After: settings for the live app. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Settings for the live app',
  summary: 'The live app loads. Mrs Castillo taps "Send me a link". The email arrives, she taps it, and it opens... localhost. Two settings still think the app lives on Hazel\'s laptop.',
  minutes: 12,
  outcomes: [
    'Point login links at the live address',
    'Connect a proper email sender before launch',
    'Make a go-live checklist',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Laptop settings vs live settings',
      before: {
        label: 'Still set for the laptop',
        text: 'Site URL: http://localhost:5173\nRedirect URLs: http://localhost:5173\nEmail sender: Supabase\'s built-in test sender',
      },
      after: {
        label: 'Set for launch',
        text: 'Site URL: https://esplanade-brass.vercel.app\nRedirect URLs: https://esplanade-brass.vercel.app and http://localhost:5173 (for building)\nEmail sender: a proper email service, connected in Supabase\'s settings',
      },
      notes: [
        'The Site URL is where login links send people. It must be the live address now.',
        'Keep localhost in Redirect URLs too, so you can still build and test on your laptop.',
        'The built-in email sender is for testing and sends only a few emails an hour. Thirty parents on a Friday need a proper email service, set up in Supabase\'s email (SMTP) settings.',
      ],
    },
    {
      kind: 'code',
      language: 'plaintext',
      code: 'Go-live checklist\n[ ] Security pass: all yes\n[ ] Vercel settings added, redeployed\n[ ] Supabase Site URL = live address\n[ ] Redirect URLs: live + localhost\n[ ] Proper email sender connected\n[ ] tests.md passes on the live address, on a phone',
      caption: 'Hazel\'s go-live checklist, now in tests.md.',
    },
  ],
  apply: {
    scenario: 'The login link opens localhost.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why does the live login link open localhost?',
        options: [
          { text: 'The Site URL in Supabase still points at the laptop' },
          { text: 'Mrs Castillo\'s phone is broken', why: 'The setting is wrong, not the phone.' },
          { text: 'Vercel changed it', why: 'It\'s a Supabase setting Hazel set in Chapter 5.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Laptop setting, or live setting?',
        groups: ['Laptop', 'Live'],
        items: [
          { text: 'http://localhost:5173', group: 0 },
          { text: 'https://esplanade-brass.vercel.app', group: 1 },
          { text: 'Built-in test email sender', group: 0 },
          { text: 'A proper email service', group: 1 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The live Site URL.',
        template: 'https://esplanade-brass.[[1]].app',
        blanks: [['vercel']],
        distractors: ['localhost', 'github'],
      },
      {
        kind: 'chatReply',
        from: 'ruth',
        message: 'Thirty parents will try to log in on Friday night. Will the emails arrive?',
        prompt: 'Hazel\'s answer?',
        options: [
          { text: 'Yes, Supabase sends them.', why: 'The built-in sender only sends a few an hour.' },
          { text: 'Only if they tap slowly.', why: 'Thirty parents will hit a small limit anyway.' },
          { text: 'Only once I\'ve connected a proper email service. The built-in one is for testing.' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Which Redirect URLs setting breaks building on the laptop?',
        lines: [
          'Site URL: https://esplanade-brass.vercel.app',
          'Redirect URLs: https://esplanade-brass.vercel.app only',
          'Email: proper email service connected',
        ],
        bug: 1,
        fix: 'Keep http://localhost:5173 in Redirect URLs too.',
        explanation: 'Without localhost, login links can\'t come back to the laptop while building.',
      },
      {
        kind: 'mcq',
        prompt: 'Where does the email service\'s key go?',
        options: [
          { text: 'In the app\'s code', why: 'It\'s a secret. Never in code.' },
          { text: 'In Supabase\'s email (SMTP) settings, in the dashboard' },
          { text: 'In a VITE_ setting', why: 'VITE_ settings end up in the page for anyone to read.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'The go-live checklist, in order.',
        lines: [
          'Security pass: all yes',
          'Deploy with the settings',
          'Point Site URL at the live address',
          'Connect a proper email sender',
          'Run tests.md on the live address, on a phone',
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which Supabase setting decides where login links send people? (Two words.)',
        answers: ['site url', 'siteurl'],
        placeholder: '.... ...',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the setting to where it lives.',
        pairs: [
          ['VITE_ settings', 'Vercel project settings'],
          ['Site URL', 'Supabase Authentication settings'],
          ['Email service key', 'Supabase email (SMTP) settings'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Review from Chapter 6: the login link works for Hazel but not a parent. First move?',
        options: [
          { text: 'Ask the AI to rewrite the login', why: 'Evidence first.' },
          { text: 'Find the recipe: which parent, which phone, what exactly happens, and any error' },
          { text: 'Tell the parent to try harder', why: 'The bug is the app\'s, not theirs.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'What setting in your own app still points at your laptop? Write your own go-live checklist.',
  },
  deepen: {
    title: 'On your computer: live settings',
    summary: 'In Supabase\'s Authentication settings, set the Site URL to your live address and keep localhost in Redirect URLs. Before real users arrive, connect a proper email sender in Supabase\'s SMTP settings (Supabase\'s docs list how). Test a login on your phone from the live address.',
  },
  notes: 'Supabase Auth URL Configuration: Site URL and Redirect URLs allow-list. Built-in SMTP is rate-limited and for testing; custom SMTP configured in the dashboard for production (Supabase docs, October 2026). No email provider named.',
};

export default lesson;
