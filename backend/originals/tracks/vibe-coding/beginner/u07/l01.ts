import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 7 · Lesson 1. Story: Benny can see everything. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'Benny can see everything',
  summary: 'Two weeks to go. Benny, bored in Chemistry, opens the app\'s developer tools on his phone. Twenty seconds later he texts Hazel a screenshot: every parent\'s name and phone number. Then: "I can delete them too."',
  minutes: 12,
  outcomes: [
    'Explain why "it works" isn\'t the same as "it\'s safe"',
    'Name what went wrong: switched-off database rules',
    'Know the first moves when data is exposed',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Tuesday, Chemistry, 10:12 a.m.',
      beats: [
        { speaker: 'benny', text: '(text) Miss B. Don\'t panic. Look at this.' },
        { speaker: 'narrator', text: 'A screenshot: the profiles table. Thirty names, thirty phone numbers. Benny pulled them using only the public key that\'s in every page.' },
        { speaker: 'benny', text: '(text) I could delete them too. I didn\'t!! But I could.' },
        { speaker: 'hazel', text: '(to Ruth, at lunch) How? He\'s not even logged in as me.' },
        { speaker: 'ruth', text: 'Remember fix 3, from the 1 a.m. spiral? The database rules on signups were switched off. And the profiles table never had proper rules. The key opened the door, and nothing said which rooms.' },
        { speaker: 'tey', text: 'The app worked perfectly. It just wasn\'t safe. Those are different tests. This chapter is the second one.' },
      ],
      choice: {
        prompt: 'What should Hazel do first?',
        options: [
          { text: 'Ask Benny to keep quiet and fix it next week.', outcome: 'For a week, anyone who looks can read and delete parents\' numbers. Not okay.' },
          { text: 'Today: turn the database rules on for every table, check what\'s exposed, then tell the parents honestly.', outcome: 'By 4 p.m. the data is locked. Ruth helps her write a short, honest note to parents. Two reply "thank you for telling us".', best: true },
          { text: 'Delete the whole app.', outcome: 'The data was exposed either way. Fixing and being honest is better than vanishing.' },
        ],
      },
    },
  ],
  apply: {
    scenario: 'Benny\'s screenshot.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why could Benny read every phone number?',
        options: [
          { text: 'He hacked Supabase', why: 'He used the public key the page already had. The rules were missing.' },
          { text: 'The database rules were off, so the public key could read everything' },
          { text: 'Phones can read all databases', why: 'Only when the database allows it.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: '"It works" test, or "it\'s safe" test?',
        groups: ['It works', 'It\'s safe'],
        items: [
          { text: 'A parent can sign up for a gig', group: 0 },
          { text: 'A stranger can\'t read parents\' numbers', group: 1 },
          { text: 'The total adds up', group: 0 },
          { text: 'Nobody can delete someone else\'s sign-up', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'benny',
        message: 'Am I in trouble? I only looked.',
        prompt: 'Hazel\'s reply?',
        options: [
          { text: 'You\'re banned from the app.', why: 'He did the right thing by telling her straight away.' },
          { text: 'No. You found it and told me straight away. That\'s exactly right. Now help me test the fix.' },
          { text: 'Pretend you never saw it.', why: 'Hiding it helps nobody.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Ruth\'s picture.',
        template: 'The key opens the [[1]]. The database rules decide which [[2]].',
        blanks: [['door'], ['rooms']],
        distractors: ['window', 'colours'],
      },
      {
        kind: 'findBug',
        prompt: 'Which step in the 1 a.m. spiral caused this?',
        lines: [
          'Fix 1: rewrote the login form',
          'Fix 3: turned off the database rules on signups',
          'Fix 5: switched the login library version',
        ],
        bug: 1,
        fix: 'Turn the rules back on, and give every table proper rules.',
        explanation: 'A security switch flipped to make an error go away. Git couldn\'t undo it.',
      },
      {
        kind: 'mcq',
        prompt: 'What should Hazel tell the parents?',
        options: [
          { text: 'Nothing, it\'s fixed now', why: 'Their data was exposed. They deserve to know.' },
          { text: 'A short, honest note: what was exposed, that it\'s fixed, and what changed' },
          { text: 'That Benny did it', why: 'Benny found it. Blaming him is wrong and unfair.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which table held the names and phone numbers?',
        answers: ['profiles'],
        placeholder: 'Table name',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the problem to today\'s fix.',
        pairs: [
          ['Rules off on signups', 'Turn them on'],
          ['No rules on profiles', 'Add rules: see only your own'],
          ['Parents in the dark', 'An honest note'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Review from Chapter 6: why didn\'t going back to the last good commit fix this?',
        options: [
          { text: 'The rules were switched off in Supabase, not in a file git tracks' },
          { text: 'Git was broken', why: 'Git was fine; the change lived in Supabase.' },
          { text: 'She forgot to push', why: 'Pushing doesn\'t change Supabase settings either.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'ruth',
        message: 'In a bank, we\'d have caught this in review. What will you check before anything goes live from now on?',
        prompt: 'Hazel\'s answer?',
        options: [
          { text: 'Whether it works.', why: 'It worked. That was the problem.' },
          { text: 'Nothing, the AI checks security.', why: 'The AI switched the rules off.' },
          { text: 'Whether a stranger, with only the public key, can read or change anything they shouldn\'t.' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'What data in your own app would hurt someone if a stranger saw it? Write it down: that\'s your list to protect.',
  },
  deepen: {
    title: 'On your computer: the stranger test',
    summary: 'In Supabase, open each table in your project and check whether row level security is on. Supabase\'s dashboard also has a security advisor that warns about tables without it. Write down any table without rules. Don\'t change anything yet: lesson 4 shows how.',
  },
  notes: 'Supabase: with RLS disabled, the anon/publishable key can read and write the table via the auto-generated API. Supabase docs strongly recommend enabling RLS on all tables in exposed schemas; the dashboard Security Advisor flags tables without RLS (October 2026).',
};

export default lesson;
