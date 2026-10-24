import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 7 · Lesson 4. Reading: database rules (row level security). */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Database rules',
  summary: 'The real lock. Supabase calls it row level security: rules, inside the database, about who can read and change each row. Hazel writes the band\'s rules in plain words first. Then the AI turns them into code.',
  minutes: 13,
  outcomes: [
    'Explain row level security in plain words',
    'Write access rules in plain words before any code',
    'Test the rules with two accounts and with none',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'Rules that live in the database',
      html:
        '<p><strong>Row level security</strong> (RLS) means the database checks every request against rules, row by row. Turn it on and, until you add rules, nobody gets anything through the public key. Then you add rules for exactly what each person may do.</p>' +
        '<p><strong>Step 1: write the rules in plain words.</strong> Hazel and Ruth agreed these:</p>' +
        '<ul><li><strong>gigs:</strong> logged-in parents can read them. Only Hazel can add or change them.</li>' +
        '<li><strong>signups:</strong> logged-in parents can read who\'s signed up for which gig (names only), and can add or delete only their own sign-ups.</li>' +
        '<li><strong>profiles:</strong> each person can read and change only their own profile. Phone numbers are never shown to other parents.</li></ul>' +
        '<p><strong>Step 2: ask the AI to turn them into rules, and explain each one.</strong> One of the rules it wrote:</p>' +
        '<p><code>create policy "Sign yourself up" on signups for insert to authenticated with check (auth.uid() = user_id);</code></p>' +
        '<p>In plain words: logged-in people may add a sign-up only if its user_id is their own. You don\'t need to write this. You need to read its explanation and check it matches your plain words.</p>' +
        '<p><strong>Step 3: test like a stranger.</strong> Log out and try to read profiles. Log in as Benny and try to delete Ruth\'s sign-up. Every "should not" must fail.</p>',
    },
    {
      kind: 'callout',
      tone: 'warning',
      text: 'If the AI ever suggests turning RLS off, or a rule that allows everything ("using (true)" on private data) to make an error go away: stop. That\'s fix 3 again. Ask why the error happens instead.',
    },
  ],
  apply: {
    scenario: 'Writing the band\'s rules.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What does row level security do?',
        options: [
          { text: 'Hides rows on the page with CSS', why: 'It works in the database, not the page.' },
          { text: 'Checks every request against rules about who may read or change each row' },
          { text: 'Makes the database faster', why: 'It\'s about access, not speed.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Setting up the rules, in order.',
        lines: [
          'Write the rules in plain words',
          'Ask the AI to turn them into database rules and explain each one',
          'Check each explanation matches your plain words',
          'Turn on RLS and add the rules',
          'Test as a stranger, and as two different people',
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Should Benny (a logged-in parent) be able to do this?',
        groups: ['Allowed', 'Must fail'],
        items: [
          { text: 'Read the gig list', group: 0 },
          { text: 'Sign himself up to drive', group: 0 },
          { text: 'Read Ruth\'s phone number', group: 1 },
          { text: 'Delete Ruth\'s sign-up', group: 1 },
          { text: 'Add a new gig', group: 1 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The plain-words version of the rule.',
        template: 'Logged-in people may add a sign-up only if its user_id is their [[1]].',
        blanks: [['own']],
        distractors: ['friend\'s', 'teacher\'s'],
      },
      {
        kind: 'chatReply',
        from: 'hazel',
        message: 'The AI says: "Sign-ups fail with a row-level security error. Easiest fix: disable RLS on signups." Do it?',
        prompt: 'Tey\'s answer?',
        options: [
          { text: 'Yes, easiest is best.', why: 'That\'s exactly how Benny could read everything.' },
          { text: 'No. Ask why the rule blocks this sign-up. Usually the user_id isn\'t being set, and that\'s a one-line fix.' },
          { text: 'Disable it just for the weekend.', why: 'A weekend is plenty of time for a leak.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Which rule the AI wrote doesn\'t match "only your own profile"?',
        lines: [
          'profiles: select using (auth.uid() = id)',
          'profiles: update using (auth.uid() = id)',
          'profiles: select to anon using (true)',
        ],
        bug: 2,
        fix: 'Delete it.',
        explanation: '"anon ... true" means anyone, even logged out, can read every profile. The same hole Benny found.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'What does RLS stand for? (Three words.)',
        answers: ['row level security', 'row-level security'],
        placeholder: '... ... ...',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the table to its plain-words rule.',
        pairs: [
          ['gigs', 'Logged-in parents read; only Hazel changes'],
          ['signups', 'Add or delete only your own'],
          ['profiles', 'Only your own, phone never shared'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'How does Hazel prove the rules work?',
        options: [
          { text: 'The AI says they\'re secure', why: 'A claim.' },
          { text: 'They look right in the code', why: 'Looking isn\'t testing.' },
          { text: 'Log out and try to read profiles; log in as Benny and try to delete Ruth\'s sign-up; both must fail' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        prompt: 'Review from Chapter 5: why can\'t the page alone protect phone numbers?',
        options: [
          { text: 'Anything sent to the page can be read; the database must refuse to send it' },
          { text: 'Pages are too slow', why: 'It\'s about visibility.' },
          { text: 'It can, with CSS', why: 'Hidden on screen is still sent.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Write the plain-words rules for one table in your own app: who can read, who can add, who can change, who can delete.',
    starters: ['Read:', 'Add:', 'Change:', 'Delete:'],
  },
  deepen: {
    title: 'On your computer: lock the tables',
    summary: 'Write your plain-words rules. Ask Claude Code: "Turn these into Supabase RLS policies as SQL, and explain each in plain words. Don\'t run anything." Check them, run them yourself in Supabase\'s SQL editor, then test as a stranger and as two users.',
  },
  notes: 'Supabase RLS (October 2026): `alter table ... enable row level security`; policies use auth.uid(); roles anon and authenticated; with RLS on and no policies, the public key gets no rows. Policy syntax shown is standard Postgres/Supabase. Admin-only writes for gigs can be done with a policy checking Hazel\'s user id or an admin flag.',
};

export default lesson;
