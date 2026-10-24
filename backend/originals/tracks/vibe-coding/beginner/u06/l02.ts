import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 6 · Lesson 2. Before / After: give it the real error. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'Give it the real error',
  summary: 'Tuesday morning. Hazel has the real error message now: "email rate limit exceeded". She pastes it in. One answer, no guessing: the problem was never the code.',
  minutes: 11,
  outcomes: [
    'Write a bug report the AI can act on',
    'Include the exact error, what you did and what you expected',
    'Let the error point at the cause',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Two bug reports',
      before: { label: 'Monday, 11 p.m.', text: 'login is broken, fix it' },
      after: {
        label: 'Tuesday, 8 a.m.',
        text: 'What I did: typed my email, tapped "Send me a link", three times in a minute.\nWhat I expected: an email with a login link.\nWhat happened: no email. The browser console shows:\n  AuthApiError: email rate limit exceeded (429)\nDon\'t change any code yet. Explain what this error means.',
      },
      notes: [
        'The exact error, copied word for word, is the best clue you have. "Rate limit exceeded" means too many emails, not broken code.',
        '"What I did / expected / happened" lets it reproduce the problem instead of imagining one.',
        '"Don\'t change any code yet. Explain." stops it guessing. Understand first, fix second.',
      ],
    },
    {
      kind: 'text',
      html: '<p>The AI\'s answer: <em>"This means Supabase\'s built-in email sender has hit its hourly limit. It\'s for testing and sends only a few emails an hour. The code is fine. Fix 4 (retry) made it worse by sending extra emails. For launch, connect a proper email service in Supabase\'s settings."</em></p><p>Five guesses on Monday. One error message on Tuesday.</p>',
    },
  ],
  apply: {
    scenario: 'The real error.',
    items: [
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which bug report gets the fastest real answer?',
        options: [
          { text: 'still broken!!', why: 'No clues at all.' },
          { text: 'Login doesn\'t work, try something else', why: 'Invites another guess.' },
          { text: 'I tapped "Send me a link". No email came. The console says: AuthApiError: email rate limit exceeded (429). Explain this before changing code.' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the part of the report to why it helps.',
        pairs: [
          ['What I did', 'So it can repeat it'],
          ['What I expected', 'So it knows what "working" means'],
          ['What happened, with the exact error', 'The best clue to the cause'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'A good bug report.',
        template: 'What I [[1]]. What I [[2]]. What [[3]], with the exact error.',
        blanks: [['did'], ['expected'], ['happened']],
        distractors: ['felt', 'wished'],
      },
      {
        kind: 'chatReply',
        from: 'hazel',
        message: 'The error is long and scary. Can I just describe it?',
        prompt: 'Tey\'s answer?',
        options: [
          { text: 'Copy it exactly, word for word. The scary-looking parts are usually the useful ones.' },
          { text: 'Yes, describe it in your own words.', why: 'Descriptions lose the details that matter.' },
          { text: 'Skip the error.', why: 'The error is the best clue.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which part of the error message points at the real cause?',
        lines: ['AuthApiError:', 'email rate limit exceeded', '(429)'],
        bug: 1,
        fix: 'Too many emails sent; the built-in sender is for testing.',
        explanation: 'The words say exactly what happened: a limit on emails.',
      },
      {
        kind: 'mcq',
        prompt: 'Why add "Don\'t change any code yet. Explain this error"?',
        options: [
          { text: 'To make it slower', why: 'It makes it more accurate.' },
          { text: 'So it explains the cause before guessing at a fix' },
          { text: 'The AI can\'t fix errors', why: 'It can, once it understands them.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Useful in a bug report, or not?',
        groups: ['Useful', 'Not useful'],
        items: [
          { text: 'The exact error message', group: 0 },
          { text: '"Ugh, this AI"', group: 1 },
          { text: 'Which page and button', group: 0 },
          { text: 'What you expected to happen', group: 0 },
          { text: 'How tired you are', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'The error says "rate limit exceeded". In plain words: too many what? (One word.)',
        answers: ['emails', 'email', 'requests'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'The code was fine all along. What should Hazel do about fixes 1 to 5?',
        options: [
          { text: 'Keep them, they might help', why: 'They\'re untested changes and caused new bugs.' },
          { text: 'Go back to the last good commit, so none of the guesses stay' },
          { text: 'Ask for fix 6', why: 'The loop is over.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        prompt: 'Review from Chapter 5: what\'s the long-term fix for login emails?',
        options: [
          { text: 'Ask parents to tap slowly', why: 'Thirty parents will still hit a small limit.' },
          { text: 'Remove logins', why: 'Logins protect sign-ups.' },
          { text: 'Connect a proper email service in Supabase before launch' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Think of the last time something on a computer went wrong for you. What was the exact error message? Did you read it?',
  },
  deepen: {
    title: 'On your computer: a real bug report',
    summary: 'Next time something breaks in your app, write the report in three lines: what I did, what I expected, what happened (with the exact error). End with "Don\'t change any code yet. Explain this." Compare the answer to a "fix it" answer.',
  },
  notes: 'Supabase Auth returns HTTP 429 with an "email rate limit exceeded" message when the built-in SMTP limit is hit (Supabase docs, Auth rate limits). Exact error text can vary by library version.',
};

export default lesson;
