import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 3. Step-by-step: present, past, future — a three-line personal intro. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Present, past, future',
  summary: 'Arjun gives Ada a recipe for introducing herself in three lines. "Where you are now. How you got here. Where you\'re going. That\'s it. It works for everyone."',
  minutes: 12,
  outcomes: [
    'Build a three-line personal pitch',
    'Pick the right proof from your past',
    'End on a future that invites a conversation',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'The three-line intro',
      steps: [
        {
          title: '1. Present: what you do now',
          body: 'Not just your title: what you do for people. Ada: "I design money apps at a fintech in Lagos, and I try to make them simple enough that anyone can use them."',
        },
        {
          title: '2. Past: one piece of proof',
          body: 'One thing you\'ve done that shows you\'re good at the present. Not your whole CV. Ada: "I built an app for my office\'s savings group; ten colleagues have used it every month since."',
        },
        {
          title: '3. Future: where you\'re heading',
          body: 'What you want next. This is where conversations start, because people can help with a future. Ada: "Now I\'m trying to get it into a hundred offices. It\'s a finalist at 60 Seconds on Friday."',
        },
        {
          title: '4. Then: hand it back',
          body: 'End with a question: "What about you? What brings you here?" The intro is the door; the conversation is the room.',
        },
      ],
    },
    {
      kind: 'text',
      html: "<p><strong>It works for anyone:</strong></p><ul><li><em>A student:</em> \"I'm studying nursing in Accra (present). I spent last summer volunteering at a rural clinic (past). I want to work in community health (future).\"</li><li><em>A career-changer:</em> \"I'm a teacher moving into UX design (present). I've redesigned our school's parent app as a side project (past). I'm looking for my first junior design role (future).\"</li></ul>",
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Present: what you do for people. Past: one piece of proof. Future: where you\'re heading. Then a question back.',
    },
  ],
  apply: {
    scenario: 'Arjun\'s three-line recipe.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put Ada\'s intro in order.',
        lines: ['I design money apps at a fintech in Lagos.', 'I built an app my office\'s savings group uses every month.', 'Now I\'m trying to get it into a hundred offices.', 'What brings you here tonight?'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Present, past, or future?',
        groups: ['Present', 'Past', 'Future'],
        items: [
          { text: 'I\'m studying nursing in Accra', group: 0 },
          { text: 'I volunteered at a rural clinic last summer', group: 1 },
          { text: 'I want to work in community health', group: 2 },
          { text: 'I redesigned our school\'s parent app', group: 1 },
          { text: 'I\'m looking for my first design role', group: 2 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why is the "future" line where conversations start?',
        options: [
          { text: 'It\'s the longest part', why: 'It\'s one line.' },
          { text: 'It\'s where you list your CV', why: 'The CV is not the future.' },
          { text: 'People can help with a future: introductions, advice, opportunities' },
        ],
        answer: 2,
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'For "past", should I list everything? School, my internship, my first job, the app...?',
        prompt: 'What does Arjun say?',
        options: [
          { text: 'Yes, everything since primary school.', why: 'That\'s a CV, not an intro.' },
          { text: 'One piece of proof, the one that best supports your present. For you, that\'s the app.' },
          { text: 'Skip the past.', why: 'Proof makes people believe the present.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'The three parts: present, past and ___. (one word)',
        answers: ['future'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the line to the career-changer\'s intro.',
        pairs: [
          ['Present', 'A teacher moving into UX design'],
          ['Past', 'Redesigned the school\'s parent app'],
          ['Future', 'Looking for a first junior design role'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Ada\'s draft. Which line breaks the recipe?',
        lines: [
          'I design money apps at a fintech in Lagos.',
          'Then in 2019 I finished school, then I did an internship, then I joined a startup, then...',
          'Now I\'m trying to get my app into a hundred offices.',
        ],
        bug: 1,
        fix: 'I built an app ten colleagues use every month.',
        explanation: 'The past line is ONE piece of proof, not a timeline.',
      },
      {
        kind: 'mcq',
        prompt: 'What comes right after the three lines?',
        options: [
          { text: 'A question back: "What about you?"' },
          { text: 'Three more lines', why: 'Hand it back.' },
          { text: 'Your phone number', why: 'Maybe later, if the chat goes well.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Ada\'s future line.',
        template: 'Now I\'m trying to get it into a [[1]] offices. It\'s a [[2]] at 60 Seconds on [[3]].',
        blanks: [['hundred'], ['finalist'], ['Friday']],
        distractors: ['just', 'Monday'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the recipe.',
        tiles: ['Present,', 'past,', 'future,', 'then', 'a', 'question.'],
        distractors: ['CV,'],
      },
    ],
  },
  reflect: {
    prompt: 'Write your own three-line intro: present, past, future. Then add a question to hand it back.',
    starters: ['Present: ...', 'Past: ...', 'Future: ...', 'Question: ...'],
  },
  deepen: {
    title: 'Say it in the mirror',
    summary: 'Say your three lines out loud five times. Then try them on one real person this week, at work, at school or at an event.',
  },
  notes: 'Present–past–future is a widely taught personal-pitch structure in career services and interview coaching ("Tell me about yourself").',
};

export default lesson;
