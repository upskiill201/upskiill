import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 5. Checkpoint: lessons 1–4 of Chapter 5, plus review. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: the first sign-up',
  summary: 'Sunday night. The app says "Connected". Benny, on his phone across town, is about to become the first real sign-up in the band\'s database. Check what you know before he taps.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Explain the parts of the app and where data lives', 'Keep keys in the right places'],
  learn: [
    {
      kind: 'story',
      title: 'Sunday, 8 p.m., on the phone',
      beats: [
        { speaker: 'benny', text: 'Ready, Miss B? I\'m tapping "Drive on Saturday".' },
        { speaker: 'hazel', text: 'Wait. Before you do, let me make sure I know where your name\'s going.' },
        { speaker: 'tey', text: 'Good instinct. Quick check first.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint: before the first real sign-up.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Benny taps "Drive on Saturday". Where does his sign-up go?',
        options: [
          { text: 'Only onto his phone', why: 'That was the old version.' },
          { text: 'Into the Supabase database, where everyone\'s app can read it' },
          { text: 'Into Hazel\'s email', why: 'It goes into the database.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the part to its job.',
        pairs: [
          ['Front end', 'The button Benny taps'],
          ['Database', 'Where his sign-up is stored'],
          ['Login', 'Knows it was Benny'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Where does each thing belong?',
        groups: ['.env.local', 'Never in the app'],
        items: [
          { text: 'Project URL', group: 0 },
          { text: 'Public (anon) key', group: 0 },
          { text: 'Secret (service_role) key', group: 1 },
          { text: 'The database password', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Hazel\'s message to the AI. Which line is a mistake?',
        lines: [
          'The Supabase settings are in .env.local.',
          'They\'re called VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.',
          'Here\'s the secret key too, in case: eyJhbGciOi...',
        ],
        bug: 2,
        fix: 'Never paste keys into the chat, least of all the secret one.',
        explanation: 'Names, yes. Values, no. Secret key, never.',
      },
      {
        kind: 'chatReply',
        from: 'ruth',
        message: 'What happens if two parents sign up for the same car seat at once?',
        prompt: 'Hazel\'s honest answer?',
        options: [
          { text: 'I don\'t know yet. That\'s an edge case to test before we go live.' },
          { text: 'That can\'t happen.', why: 'It can. Edge cases are real.' },
          { text: 'The AI will handle it.', why: 'Only if someone asks and tests.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The stack rule.',
        template: 'The [[1]] moving parts that do the job. Everything else goes on the [[2]] list.',
        blanks: [['fewest'], ['later']],
        distractors: ['most', 'shopping'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which file must cover .env.local so git never saves it?',
        answers: ['.gitignore', 'gitignore'],
        placeholder: '.git...',
      },
      {
        kind: 'mcq',
        prompt: 'Review from Chapter 3: what\'s the done-when for this first piece?',
        options: [
          { text: 'It says "Connected"', why: 'That\'s only half: it has to share data.' },
          { text: 'Benny signs up on his phone and Hazel sees his name on her laptop' },
          { text: 'It looks nice', why: '"Looks" isn\'t a check.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'benny',
        message: 'IT WORKED! I see my name on your screen! Now what?',
        prompt: 'Review from Chapter 4: Hazel\'s next move?',
        options: [
          { text: 'Close the laptop and celebrate.', why: 'Save the working version first.' },
          { text: 'git add . and commit straight away.', why: 'Check git status first: .env.local must not be in it.' },
          { text: 'git status to check .env.local isn\'t listed, then commit and push.' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        prompt: 'Why not hide parents\' phone numbers with CSS?',
        options: [
          { text: 'Anything sent to the page can be seen by anyone who opens it' },
          { text: 'CSS can\'t hide things', why: 'It can hide them visually; the data is still sent.' },
          { text: 'Phone numbers are public anyway', why: 'They\'re private.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'What data in your own app idea would you least want a stranger to see?',
  },
  deepen: {
    title: 'On your computer: first shared entry',
    summary: 'Ask Claude Code to add one simple form that saves to a Supabase table and lists what\'s there. Add an entry on your laptop, then open the app on another device or browser and check it appears. Commit (without .env.local).',
  },
  notes: 'Review of Chapter 5 lessons 1–4 and earlier chapters. To open the local Vite app from a phone on the same Wi-Fi, `npm run dev -- --host` exposes it on the network; otherwise test in a second browser.',
};

export default lesson;
