import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 7 · Lesson 5. Checkpoint: lessons 1–4 of Chapter 7, plus review. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: the parents\' list',
  summary: 'Principal Dupree read Hazel\'s honest note to parents. She has one question: "Prove to me, today, that a stranger can\'t see those numbers now." Show her.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Prove data is locked', 'Handle a leaked secret in the right order'],
  learn: [
    {
      kind: 'story',
      title: 'The principal\'s office, Thursday',
      beats: [
        { speaker: 'narrator', text: 'Principal Dupree has the parents\' note on her desk. She isn\'t angry. She is very serious.' },
        { speaker: 'hazel', text: 'I can show you. Benny\'s going to try to break in, live.' },
        { speaker: 'benny', text: '(cracking his knuckles) Legally.' },
        { speaker: 'tey', text: 'Prove it, don\'t promise it.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint: proving it\'s locked.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Benny, logged in, tries these. Which must fail?',
        groups: ['Should work', 'Must fail'],
        items: [
          { text: 'Read the gigs', group: 0 },
          { text: 'Read every phone number', group: 1 },
          { text: 'Sign himself up', group: 0 },
          { text: 'Sign Ruth up without asking', group: 1 },
          { text: 'Delete another parent\'s sign-up', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Benny logs out completely. What should he be able to read from profiles?',
        options: [
          { text: 'Only names', why: 'Logged out, nothing in profiles.' },
          { text: 'Everything, it\'s public', why: 'That was the hole.' },
          { text: 'Nothing' },
        ],
        answer: 2,
      },
      {
        kind: 'orderLines',
        prompt: 'A secret key leaked. In order.',
        lines: [
          'Replace the key in Supabase',
          'Put the new one only where it\'s needed, git-ignored',
          'git rm --cached the file',
          'Add it to .gitignore',
          'Commit and push',
        ],
      },
      {
        kind: 'chatReply',
        from: 'benny',
        message: 'The app shows "permission denied" when I try to read profiles. Did I break it?',
        prompt: 'Hazel\'s answer?',
        options: [
          { text: 'No: that\'s the lock working. That\'s exactly what we wanted to see.' },
          { text: 'Yes, turn the rules off.', why: 'That\'s fix 3 again.' },
          { text: 'Ask the AI to remove the error.', why: 'The error is the protection.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which item in Hazel\'s secret list is in the wrong place?',
        lines: [
          'Public (anon) key: in .env.local, fine in the page',
          'Database password: password manager',
          'Secret key: pasted into last week\'s chat with the AI',
        ],
        bug: 2,
        fix: 'Replace that key, and never paste secrets into chats.',
        explanation: 'A secret in a chat may be stored in logs or files. Treat it as leaked.',
      },
      {
        kind: 'fillBlank',
        prompt: 'Ruth\'s picture.',
        template: 'The public key opens the door. The [[1]] rules decide which [[2]].',
        blanks: [['database'], ['rooms']],
        distractors: ['page', 'colours'],
      },
      {
        kind: 'mcq',
        prompt: 'The AI suggests "using (true)" on profiles to fix an error. What does that mean?',
        options: [
          { text: 'Only true friends can read', why: 'It means everyone matching the role can read everything.' },
          { text: 'Everyone it applies to can read every row: the hole again' },
          { text: 'It turns on encryption', why: 'It allows, it doesn\'t encrypt.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'The step that actually protects you after a key leaks. (One word, starts with "r".)',
        answers: ['rotate', 'rotating', 'replace', 'replacing'],
        placeholder: 'r...',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the mistake to its fix.',
        pairs: [
          ['RLS off on a table', 'Turn it on, add rules'],
          ['Secret in git history', 'Replace the key'],
          ['.env not ignored', 'Add .env to .gitignore'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Review from Chapter 6: the database refuses a request. What should the page show the parent?',
        options: [
          { text: 'The raw error', why: 'Scary and unhelpful.' },
          { text: 'A friendly message, like "You can only change your own sign-ups."' },
          { text: 'Nothing', why: 'They\'ll keep trying and wonder why.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'How would you explain to a worried parent, in two sentences, what changed and why their number is safe now?',
  },
  deepen: {
    title: 'On your computer: the break-in test',
    summary: 'Log out of your app and try to read each table. Make a second test account and try to change the first account\'s data. Every "should not" must fail. Write the results in tests.md.',
  },
  notes: 'Review of Chapter 7 lessons 1–4.',
};

export default lesson;
