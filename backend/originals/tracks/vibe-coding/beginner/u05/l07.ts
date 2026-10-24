import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 7. Reading: login by email link. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'Login by email link',
  summary: 'Parents won\'t remember another password. Ruth won\'t allow "no login". The answer: type your email, tap the link it sends you, you\'re in. Here\'s how it works and the two settings that make it work.',
  minutes: 12,
  outcomes: [
    'Explain how an email-link login works',
    'Set the address the link sends people back to',
    'Know that the built-in email sender is for testing',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'No passwords to forget',
      html:
        '<p>An <strong>email-link login</strong> (often called a "magic link") works like this:</p>' +
        '<ol><li>A parent types their email and taps "Send me a link".</li>' +
        '<li>Supabase emails them a one-time link.</li>' +
        '<li>They tap it. It opens the app, and they\'re logged in. Supabase now knows their user id.</li></ol>' +
        '<p>No passwords to store, forget or leak. Supabase does the hard parts; the AI writes a small form that calls it.</p>' +
        '<p><strong>Two settings in Supabase\'s Authentication settings matter:</strong></p>' +
        '<ul><li><strong>Site URL:</strong> where the link sends people back to. While building, that\'s your laptop\'s address, like <code>http://localhost:5173</code>. When the app goes live (Chapter 8), it must change to the real address, or links will point at your laptop.</li>' +
        '<li><strong>Redirect URLs:</strong> the list of addresses links are allowed to go to. Add each one you use.</li></ul>' +
        '<p><strong>One honest limit:</strong> the email sender that comes with Supabase is meant for testing and only sends a small number of emails an hour. Fine for Hazel and Benny testing; not for thirty parents on a Friday night. Before launch you connect a proper email service. (That limit becomes a real bug in Chapter 6.)</p>',
    },
    {
      kind: 'code',
      language: 'plaintext',
      code: 'Add an email-link login with Supabase Auth.\nShow a "Send me a link" form when logged out, and the gig list plus a "Log out" button when logged in.\nOnly logged-in people can sign up for a gig. Keep everything else the same.',
      caption: 'Hazel\'s login brief.',
    },
  ],
  apply: {
    scenario: 'Logins without passwords.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'An email-link login, in order.',
        lines: [
          'The parent types their email',
          'Supabase emails a one-time link',
          'The parent taps the link',
          'The app opens, logged in',
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why use an email link instead of passwords?',
        options: [
          { text: 'Nobody has a password to forget, reuse or leak' },
          { text: 'It\'s required by law', why: 'It\'s a choice that suits this app.' },
          { text: 'It\'s less secure, but faster', why: 'Done properly, it avoids weak passwords altogether.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the setting to what it does.',
        pairs: [
          ['Site URL', 'Where the login link sends people back'],
          ['Redirect URLs', 'Addresses links are allowed to go to'],
          ['Email sender', 'Sends the link'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'benny',
        message: 'I tapped the link and it opened localhost... on my phone. Nothing loads.',
        prompt: 'What\'s going on?',
        options: [
          { text: 'His phone is broken.', why: 'The phone is fine.' },
          { text: 'The link points at Hazel\'s laptop address (localhost), which only exists on her laptop. Fine for testing on the laptop; it changes when the app goes live.' },
          { text: 'Supabase is down.', why: 'It sent the email fine.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'While building, the Site URL is the laptop.',
        template: 'http://[[1]]:5173',
        blanks: [['localhost']],
        distractors: ['teyro', 'google'],
      },
      {
        kind: 'sortGroups',
        prompt: 'OK for testing, or needs fixing before launch?',
        groups: ['OK for testing', 'Fix before launch'],
        items: [
          { text: 'Site URL is localhost', group: 0 },
          { text: 'Built-in email sender with a small hourly limit', group: 0 },
          { text: 'Thirty parents logging in on a Friday', group: 1 },
          { text: 'Links that point at the laptop, sent to parents', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line of the login brief is risky?',
        lines: [
          'Add an email-link login with Supabase Auth.',
          'Only logged-in people can sign up for a gig.',
          'Store each parent\'s email and a password in the profiles table too.',
        ],
        bug: 2,
        fix: 'Delete it: Supabase Auth handles login. Never store passwords yourself.',
        explanation: 'Storing passwords yourself is risky, and the whole point of email links is having none.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'What\'s the common nickname for an email-link login? (Two words.)',
        answers: ['magic link', 'magic links'],
        placeholder: '.... ....',
      },
      {
        kind: 'mcq',
        prompt: '"Only logged-in people can sign up." How should Hazel check it?',
        options: [
          { text: 'Ask the AI if it works', why: 'That\'s a claim.' },
          { text: 'Log out, try to sign up, and check it refuses; log in and check it works' },
          { text: 'Look at the login button', why: 'Looking isn\'t testing the rule.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        prompt: 'Review from Chapter 3: what goes in tests.md for the login?',
        options: [
          { text: 'Logged out can\'t sign up; logged in can; log out works; a wrong email shows a message' },
          { text: '"Login works"', why: 'Not checkable as written.' },
          { text: 'Nothing, logins are Supabase\'s job', why: 'Your app\'s rules are your job to test.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Which apps do you log into with a link or code instead of a password? How did it feel the first time?',
  },
  deepen: {
    title: 'On your computer: add the login',
    summary: 'In Supabase\'s Authentication settings, set the Site URL to your local address (the one npm run dev prints) and add it to Redirect URLs. Then give Claude Code the login brief. Test: logged out can\'t sign up; logged in can. Commit.',
  },
  notes: 'Supabase Auth (October 2026): email magic links via supabase.auth.signInWithOtp({ email }); URL Configuration has Site URL and Redirect URLs. Built-in SMTP is for testing with a low hourly rate limit; custom SMTP recommended for production (Supabase docs). No number quoted.',
};

export default lesson;
