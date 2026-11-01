import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 10. Chapter Challenge: thirty parents. Build: an app with data + login, local. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Challenge: thirty parents',
  summary: 'Thursday\'s band meeting: thirty parents, thirty phones, one app on Hazel\'s laptop (and a few test phones on the school Wi-Fi). Gigs, sign-ups and email login, built in layers. Make it work.',
  minutes: 15,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Build an app with a shared database and login, layer by layer', 'Keep keys and personal data in the right places'],
  learn: [
    {
      kind: 'story',
      title: 'The band room, Thursday, 6 p.m.',
      beats: [
        { speaker: 'narrator', text: 'Folding chairs again. This time Hazel\'s laptop is plugged into the projector, and the list of gigs is coming from a real database.' },
        { speaker: 'ruth', text: 'Before anyone taps anything: where do their names go, and who can see them?' },
        { speaker: 'hazel', text: 'Into Supabase. Logged-in parents only. And I\'ll show you exactly who can see what next week.' },
        { speaker: 'tey', text: 'Everything from Chapter 5. Let\'s get thirty parents signed up.' },
      ],
    },
  ],
  apply: {
    scenario: 'Chapter Challenge: the parents\' meeting.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'The whole build, in order.',
        lines: [
          'Set up Vite and the Supabase library',
          'Create the Supabase project; settings in .env.local',
          'Design the tables before creating them',
          'Layer 1: show gigs',
          'Layer 2: save sign-ups',
          'Layer 3: email-link login, sign-ups for logged-in only',
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each part of the stack to its job.',
        pairs: [
          ['Vite', 'Runs the app while building'],
          ['Supabase', 'Database and logins'],
          ['.env.local', 'Settings, kept out of GitHub'],
          ['Vercel', 'Live on the internet (Chapter 8)'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'The AI\'s proposed signups table. Which column should go?',
        lines: ['id', 'gig_id', 'user_id', 'role', 'credit_card_number'],
        bug: 4,
        fix: 'Delete it: the app doesn\'t take payments.',
        explanation: 'Only store what the app needs. Card numbers are the last thing to store by accident.',
      },
      {
        kind: 'mcq',
        prompt: 'A parent taps their login link on their phone and it opens "localhost". Why?',
        options: [
          { text: 'The Site URL is the laptop\'s address, which only exists on the laptop' },
          { text: 'Their phone needs an update', why: 'The phone is fine.' },
          { text: 'Supabase is broken', why: 'It\'s a setting.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'ruth',
        message: 'Did you put that secret key thing in the app to get it working?',
        prompt: 'Hazel\'s answer?',
        options: [
          { text: 'Just for tonight.', why: 'Even one night is a night anyone can read it.' },
          { text: 'No. Only the public URL and key are in .env.local. The secret key isn\'t anywhere in the app.' },
          { text: 'I don\'t know what\'s in there.', why: 'Ruth will be unimpressed. Know your settings.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Test for tonight, or not needed?',
        groups: ['Test it', 'Not needed'],
        items: [
          { text: 'Logged out: can\'t sign up', group: 0 },
          { text: 'Two parents see each other\'s sign-ups', group: 0 },
          { text: 'The logo is exactly centred', group: 1 },
          { text: 'Log out works', group: 0 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Ruth\'s database rules.',
        template: 'Store things [[1]]. Only store what the app [[2]]. Rules about who sees what live in the [[3]].',
        blanks: [['once'], ['needs'], ['database']],
        distractors: ['twice', 'page'],
      },
      {
        kind: 'mcq',
        prompt: 'Layer 3 (login) breaks sign-ups. What\'s the safest move?',
        options: [
          { text: 'Keep adding layer 4', why: 'Never build on a broken layer.' },
          { text: 'Delete Supabase', why: 'Much too far.' },
          { text: 'Fix layer 3, or revert to layer 2\'s commit and try again' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Gig needs 3 drivers; 1 signed up. How many more? (Number only.)',
        answers: ['2', 'two'],
        placeholder: 'Number',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which brief starts layer 2 well?',
        options: [
          { text: 'Add a "Sign up" button next to each gig that saves a row in signups with the gig_id and role "driver". Then refresh the list. No login yet.' },
          { text: 'Add sign-ups and login and pledges', why: 'Three layers at once.' },
          { text: 'Make sign-ups happen', why: 'How? Where? Saved where?' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'benny',
        message: 'Can I add a photo upload so parents can post selfies?',
        prompt: 'Hazel\'s reply?',
        options: [
          { text: 'Later list. Photos are a new layer with their own privacy questions.' },
          { text: 'Yes, tonight!', why: 'Not in the middle of the meeting.' },
          { text: 'Never.', why: 'Maybe later, planned properly.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'Review from Chapter 3: the AI says "Login is done and secure." Next?',
        options: [
          { text: 'Believe it', why: '"Secure" is a claim.' },
          { text: 'Test it: logged out can\'t sign up, logged in can, log out works' },
          { text: 'Ask it to say it again', why: 'Repeating a claim doesn\'t prove it.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'You built an app with a real database and login. What part are you proudest of? What part do you trust least?',
    starters: ['Proudest of...', 'Trust least...'],
  },
  deepen: {
    title: 'Build it: your real app, local',
    summary: 'Your app running on your laptop with npm run dev: a shared Supabase table, email-link login, and one rule (only logged-in people can add). Settings in .env.local (not in git), tables designed first, each layer tested and committed, pushed to GitHub. Chapter 5 shipped.',
  },
  notes: 'Chapter 5 review. Phones on the same Wi-Fi can reach a Vite dev server started with --host (school networks may block this; testing in a second browser also works).',
};

export default lesson;
