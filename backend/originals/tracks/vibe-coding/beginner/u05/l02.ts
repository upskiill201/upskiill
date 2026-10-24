import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 2. Card deck: front end, back end, database. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'The three parts of an app',
  summary: 'Benny draws the app on a napkin at a diner on Esplanade Avenue: a phone, a cloud, a filing cabinet. It\'s actually a pretty good diagram. Here are the three parts every app has.',
  minutes: 11,
  outcomes: [
    'Name the front end, back end and database',
    'Say which part each feature lives in',
    'Know where the AI\'s code runs',
  ],
  learn: [
    {
      kind: 'text',
      html: '<p>Every app has three parts:</p><ul><li><strong>Front end:</strong> what people see and tap, running in their browser. Your pages so far are all front end.</li><li><strong>Back end:</strong> code running on a server, out of sight, doing jobs the browser shouldn\'t (checking who\'s logged in, deciding who may see what).</li><li><strong>Database:</strong> where the shared data lives: gigs, sign-ups, pledges.</li></ul>',
    },
    {
      kind: 'text',
      html: '<p>Hazel won\'t build a back end from scratch. She\'ll use <strong>Supabase</strong>, a service that gives her a database, logins and rules about who can see what, ready-made. Her front end talks to it.</p><p>That\'s a common, sensible way for beginners and small teams to build: write the part that\'s yours (the pages), rent the hard parts (database, logins).</p>',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Anything in the front end can be seen by anyone who opens the page. So the rules about who can see data must live in the back end or the database, never only in the page.',
    },
    {
      kind: 'check',
      question: 'Where does the list of gigs everyone shares live?',
      options: ['Front end', 'Database', 'Each phone'],
      answer: 1,
      explanation: 'Shared data lives in the database.',
    },
  ],
  apply: {
    scenario: 'Benny\'s napkin diagram.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match Benny\'s napkin drawing to the part.',
        pairs: [
          ['The phone', 'Front end'],
          ['The cloud', 'Back end'],
          ['The filing cabinet', 'Database'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Which part does each thing belong to?',
        groups: ['Front end', 'Database'],
        items: [
          { text: 'The "Sign up to drive" button', group: 0 },
          { text: 'The list of everyone who signed up', group: 1 },
          { text: 'The gold colour of the page', group: 0 },
          { text: 'Every pledge ever made', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What does Supabase give Hazel?',
        options: [
          { text: 'A ready-made database, logins and access rules' },
          { text: 'A new laptop', why: 'It\'s an online service.' },
          { text: 'The pages themselves', why: 'Hazel builds the pages; Supabase provides the back-end parts.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'benny',
        message: 'I\'ll just hide the phone numbers on the page with CSS. Problem solved?',
        prompt: 'Hazel\'s reply?',
        options: [
          { text: 'Perfect, nobody will ever look.', why: 'Anyone can view a page\'s data with a few clicks.' },
          { text: 'Anything sent to the page can be seen. The database has to refuse to send what people shouldn\'t see.' },
          { text: 'Use a smaller font.', why: 'Still sent, still visible.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the three parts.',
        template: 'The [[1]] end is what you see. The [[2]] end runs out of sight. The [[3]] keeps the data.',
        blanks: [['front'], ['back'], ['database']],
        distractors: ['side', 'browser'],
      },
      {
        kind: 'mcq',
        prompt: 'Why rent the database and logins instead of building them?',
        options: [
          { text: 'They\'re hard to build safely, and a service has already done it well' },
          { text: 'It\'s against the rules to build them', why: 'You can; it\'s just much harder to do safely.' },
          { text: 'The AI refuses to', why: 'It would try. Doing it safely is the hard part.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which service will Hazel use for the database and logins?',
        answers: ['supabase'],
        placeholder: 'Name',
      },
      {
        kind: 'findBug',
        prompt: 'Which line in Hazel\'s notes is wrong?',
        lines: [
          'Pages are the front end.',
          'Supabase holds the database and logins.',
          'Hiding data on the page keeps it secret.',
          'Rules about who sees what live in the database.',
        ],
        bug: 2,
        fix: 'Anything sent to the page can be seen; the database must refuse it.',
        explanation: 'Front-end code and data are visible to anyone who opens the page.',
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the rule.',
        tiles: ['Rules about who sees what', 'live in the database,', 'never only in the page.'],
        distractors: ['in CSS', 'in a comment'],
      },
      {
        kind: 'mcq',
        prompt: 'Review from Chapter 2: what goes in the brief for the real app\'s first piece?',
        options: [
          { text: 'Everything the app will ever do', why: 'One piece at a time.' },
          { text: 'Just "make the band app"', why: 'No context, limits or done-when.' },
          { text: 'Goal, context, limits and a done-when, for the shared gig list only' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Think of an app you use every day. What\'s its front end? What\'s in its database?',
  },
  deepen: {
    title: 'Ask your AI',
    summary: 'In your real app folder, ask Claude Code (no code changes): "Explain, in plain words, which parts of my app idea would be front end, back end and database." Compare with this lesson.',
  },
  notes: 'Supabase (supabase.com) provides Postgres database, Auth, and Row Level Security; free plan with limits (no numbers quoted).',
};

export default lesson;
