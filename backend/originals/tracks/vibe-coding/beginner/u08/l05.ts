import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 8 · Lesson 5. Checkpoint: lessons 1–4 of Chapter 8, plus review. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: the test run',
  summary: 'Thursday. Five parents, five phones, five different homes. Hazel sends the live link for a test run before Saturday\'s dinner. Show what you know before the replies come in.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Deploy and configure a live app', 'Test like real users before launch'],
  learn: [
    {
      kind: 'story',
      title: 'Thursday, 8 p.m.',
      beats: [
        { speaker: 'hazel', text: '(to five parents) Test run! Open this, log in, sign up for any gig. Tell me everything that\'s weird.' },
        { speaker: 'benny', text: 'I\'m one of the five. I\'m going to break it. Lovingly.' },
        { speaker: 'tey', text: 'Five testers in five homes beats any amount of "it works on my laptop".' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint: the test run.',
    items: [
      {
        kind: 'chatReply',
        from: 'benny',
        message: 'Login link opened localhost on my phone.',
        prompt: 'What does Hazel fix?',
        options: [
          { text: 'Benny\'s phone', why: 'The setting is wrong, not the phone.' },
          { text: 'The Site URL in Supabase: point it at the live address' },
          { text: 'Nothing, it\'s fine', why: 'No parent can log in like this.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Deploying, in order.',
        lines: ['Import the repository into Vercel', 'Add the VITE_ settings', 'Deploy', 'Point Supabase\'s Site URL at the live address', 'Test on phones'],
      },
      {
        kind: 'mcq',
        prompt: 'A parent says the page is completely blank. Hazel\'s first check?',
        options: [
          { text: 'The browser Console on her own phone, and the Vercel settings' },
          { text: 'Rewrite the app', why: 'Evidence first.' },
          { text: 'Ask the parent to restart their router', why: 'Check the app first.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Goes in Vercel\'s settings, or not?',
        groups: ['In Vercel', 'Not in Vercel'],
        items: [
          { text: 'VITE_SUPABASE_URL', group: 0 },
          { text: 'Supabase secret key', group: 1 },
          { text: 'VITE_SUPABASE_ANON_KEY', group: 0 },
          { text: 'The email service key', group: 1 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The auto-update rule.',
        template: 'Every push to [[1]] redeploys the [[2]] app.',
        blanks: [['main'], ['live']],
        distractors: ['a branch', 'old'],
      },
      {
        kind: 'findBug',
        prompt: 'Which item on Hazel\'s go-live list is missing a real check?',
        lines: [
          'Security pass: all yes.',
          'Site URL: live address.',
          'Email: probably fine.',
          'tests.md passes on the live address.',
        ],
        bug: 2,
        fix: 'Email: proper sender connected; five test logins all received.',
        explanation: '"Probably fine" is how the Monday 1 a.m. spiral started.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Settings changed in Vercel only apply after a... (one word)',
        answers: ['redeploy', 'redeployment', 'deploy', 'new build', 'rebuild'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the tester\'s report to the likely cause.',
        pairs: [
          ['Link opens localhost', 'Site URL'],
          ['Blank page', 'Missing Vercel settings'],
          ['No login email', 'Email sender limits'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Review from Chapter 7: a tester can see other parents\' phone numbers on the live app. What happened?',
        options: [
          { text: 'Nothing, live apps are public', why: 'The data must be locked by database rules.' },
          { text: 'A database rule is missing or too open: lock it before Saturday' },
          { text: 'The phone is hacked', why: 'Check the rules first.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        prompt: 'Review from Chapter 4: Benny pushes an untested change straight to main during the test run. What happens?',
        options: [
          { text: 'It goes live for all five testers immediately' },
          { text: 'Nothing until Monday', why: 'Vercel redeploys on every push to main.' },
          { text: 'Vercel refuses it', why: 'It deploys whatever is on main.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Who are your five testers, in five different places? Write their names.',
  },
  deepen: {
    title: 'On your computer: a real test run',
    summary: 'Send your live link to three to five people who\'ve never seen your app. Ask them to log in and do the main thing. Write every report as a recipe in tests.md and fix them one at a time.',
  },
  notes: 'Review of Chapter 8 lessons 1–4.',
};

export default lesson;
