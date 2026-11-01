import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 1 · Chapter 5 · Lesson 3 — the headline. Before / After. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'The headline',
  summary: 'The headline follows you everywhere on LinkedIn: in search results, under every comment, at the top of every message. Clinton\'s says "Student at UB". Here\'s how to make 200 characters do real work.',
  minutes: 11,
  outcomes: ['Write a headline that says what you do and what you offer', 'Use the words people search for', 'Keep it honest and specific'],
  learn: [
    {
      kind: 'compare',
      title: 'Clinton\'s headline, before and after',
      before: { label: 'Default', text: 'Student at UB\n\nThe default most students leave. It doesn\'t say what he studies, what he can do, or why anyone should click. Nobody searches for "student at UB".' },
      after: { label: 'Working headline', text: 'Final-year Computer Science student · JavaScript & Python · Built a savings-group tracker used by 42 people\n\nWho he is, the words recruiters search for, and one piece of proof. All true, all checkable, under 200 characters.' },
      notes: [
        'Formula: who you are · your key skills · one proof or focus.',
        'Use words people actually search for: your field, your role, your tools.',
        'No "aspiring guru" or "visionary": plain and specific beats clever.',
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Who you are · what you do · one proof. The headline appears everywhere, so make it work.',
    },
  ],
  apply: {
    scenario: 'Clinton rewrites his headline.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the headline formula in order.',
        lines: ['Who you are', 'Your key skills', 'One proof or focus'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Strong headline or weak?',
        groups: ['Strong', 'Weak'],
        items: [
          { text: 'Final-year CS student · JavaScript & Python · Built a tracker used by 42 people', group: 0 },
          { text: 'Student at UB', group: 1 },
          { text: 'Accounting graduate · Excel · Ran a club\'s accounts to a surplus', group: 0 },
          { text: 'Aspiring tech visionary', group: 1 },
          { text: 'Open to opportunities', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why use words people search for?',
        options: [
          { text: 'To sound clever', why: 'Search words are plain, not clever.' },
          { text: 'So recruiters\' searches find you' },
          { text: 'They\'re required', why: 'Not required, just useful.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the headline that overclaims.',
        lines: ['Final-year CS student · JavaScript & Python', 'Senior Software Engineer · 10 years\' experience', 'Graduate developer · Built a tracker used by 42 people'],
        bug: 1,
        explanation: 'He\'s a student. Headlines must be as honest as CVs.',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'david',
        message: 'My headline is "Medical student". Enough?',
        options: [
          { text: 'Yes, perfect.', why: 'True, but says nothing that makes someone click.' },
          { text: 'Say "Doctor".', why: 'He isn\'t one yet. Honest only.' },
          { text: 'Add what you do and one proof: "3rd-year medical student · Anatomy tutor · Organised a 60-donor blood drive".' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each part of Clinton\'s headline to its job.',
        pairs: [
          ['Final-year Computer Science student', 'Who he is'],
          ['JavaScript & Python', 'Words recruiters search'],
          ['Built a tracker used by 42 people', 'Proof'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which headline is best for Ngum?',
        options: [
          { text: '"Accounting graduate · Excel & Sage · Ran a club\'s accounts to a 40,000-franc surplus"' },
          { text: '"Numbers person"', why: 'Too vague to search or trust.' },
          { text: '"CFO in training"', why: 'Clever but overclaims.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the formula.',
        template: 'Who you are · your key [[1]] · one [[2]].',
        blanks: [['skills'], ['proof']],
        distractors: ['hobbies', 'joke', 'photo'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Where does your headline appear? Everywhere: in ___ results, comments and messages. (one word)',
        answers: ['search'],
        placeholder: 'One word',
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Clinton\'s headline.',
        tiles: ['Final-year CS student ·', 'JavaScript & Python ·', 'Built a tracker used by 42 people'],
        distractors: ['Visionary', 'Guru'],
      },
    ],
  },
  reflect: {
    prompt: 'Write your own headline with the formula: who you are · key skills · one proof.',
    starters: ['My headline: ...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Change your LinkedIn headline today (or write it in your notes if you don\'t have a profile yet). Search your job title and see whose headlines make you want to click.',
  },
  notes: 'LinkedIn headline limit is about 220 characters (platform limits change; "under 200" is a safe guide). Formula follows common LinkedIn profile guidance.',
};

export default lesson;
