import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 4. Chat with Tey: your one sentence ("We help ___ do ___ so ___"). */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Your one sentence',
  summary: 'The five boxes are full, but Ada\'s pitch is still 200 words. Tey: "Before we go long, we go short. If you only had one sentence, what would it be?"',
  minutes: 11,
  outcomes: [
    'Write one sentence that explains what you do',
    'Use the "I help ___ do ___ so ___" pattern',
    'Test your sentence on someone outside your field',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        {
          tey: "Ada! One sentence. What does your app do?",
          replies: ['It\'s a Python app with a database that tracks...', 'Can I have two sentences?'],
        },
        {
          tey: "No databases, and no. Try this pattern: \"I help ___ do ___ so ___.\" Who do you help?",
          replies: ['Office savings groups.'],
        },
        {
          tey: "Lovely. Do what?",
          replies: ['Track who\'s paid.'],
        },
        {
          tey: "So that...?",
          replies: ['So nobody argues about money!'],
        },
        {
          tey: "Put it together.",
          replies: ['"I help office savings groups track who\'s paid, so nobody argues about money."'],
        },
        {
          tey: "Twelve words. A taxi driver would understand it. A judge would understand it. Your grandmother would understand it. That's your anchor: everything else in your pitch hangs off that one sentence.",
          replies: ['Does it work for people, not just apps?'],
        },
        {
          tey: "Always. \"I help small shops get more customers with simple websites.\" \"I help nurses spend less time on paperwork.\" Who, what, so what. If someone can repeat it back after hearing it once, it works.",
        },
      ],
    },
    {
      kind: 'compare',
      title: 'Before and after',
      before: {
        label: 'Ada, Monday',
        text: 'It\'s built in Python and there\'s a SQLite database with a members table and a payments table...',
      },
      after: {
        label: 'Ada, today',
        text: 'I help office savings groups track who\'s paid, so nobody argues about money.',
      },
      notes: [
        'Who: office savings groups.',
        'What: track who\'s paid.',
        'So what: nobody argues about money.',
      ],
    },
  ],
  apply: {
    scenario: 'One sentence, with Tey.',
    items: [
      {
        kind: 'fillBlank',
        prompt: 'A web designer\'s one sentence.',
        template: 'I help small [[1]] get more [[2]] with simple [[3]].',
        blanks: [['shops', 'businesses'], ['customers'], ['websites']],
        distractors: ['servers', 'frameworks'],
      },
      {
        kind: 'mcq',
        prompt: 'Which one sentence is best?',
        options: [
          { text: '"It\'s an innovative fintech platform leveraging Python."', why: 'Buzzwords. Who? What for?' },
          { text: '"I help office savings groups track who\'s paid, so nobody argues about money."' },
          { text: '"It\'s an app."', why: 'Too little to be curious about.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which part of the sentence is it?',
        groups: ['Who', 'What', 'So what'],
        items: [
          { text: 'Office savings groups', group: 0 },
          { text: 'Track who\'s paid', group: 1 },
          { text: 'Nobody argues about money', group: 2 },
          { text: 'Small shops', group: 0 },
          { text: 'Get more customers', group: 2 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'Shouldn\'t I mention Python? I\'m proud of it.',
        prompt: 'What does Tey say?',
        options: [
          { text: 'Yes, put Python first.', why: 'That\'s Monday\'s pitch.' },
          { text: 'Never mention it, ever.', why: 'It\'s great detail for later.' },
          { text: 'Be proud! But save it for when they ask "How does it work?" The sentence is about what it does for people.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'A good one sentence passes the ___ test: a stranger could repeat it back. (one word)',
        answers: ['repeat', 'taxi', 'grandmother', 'stranger'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the person to their one sentence.',
        pairs: [
          ['A web designer', 'I help small shops get more customers'],
          ['A nurse turned UX researcher', 'I help nurses spend less time on paperwork'],
          ['Ada', 'I help savings groups track who\'s paid'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Ada\'s draft sentence. Which part breaks the pattern?',
        lines: [
          'I help office savings groups',
          'leverage a scalable relational database architecture',
          'so nobody argues about money.',
        ],
        bug: 1,
        fix: 'track who\'s paid,',
        explanation: 'Jargon in the middle hides the point. Say what it does in plain words.',
      },
      {
        kind: 'mcq',
        prompt: 'Why start with one sentence before the full pitch?',
        options: [
          { text: 'It\'s the anchor: everything else in the pitch hangs off it' },
          { text: 'Because judges only listen for one sentence', why: 'They listen longer, if the first sentence earns it.' },
          { text: 'It saves typing', why: 'Not the reason.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Build Ada\'s sentence in order.',
        lines: ['I help office savings groups', 'track who\'s paid,', 'so nobody argues about money.'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Ada\'s one sentence.',
        tiles: ['I', 'help', 'savings', 'groups', 'track', 'who\'s', 'paid.'],
        distractors: ['SQLite'],
      },
    ],
  },
  reflect: {
    prompt: 'Write your own one sentence using "I help ___ do ___ so ___." Then read it to someone outside your field. Could they repeat it?',
    starters: ['I help...', 'When I read it to someone, they...'],
  },
  deepen: {
    title: 'The repeat-back test',
    summary: 'Say your one sentence to three different people this week. Ask each one: "What do I do?" If they can\'t say it back, simplify it.',
  },
  notes: 'The "I help X do Y so Z" one-liner is a common positioning template in career and startup coaching. The repeat-back test echoes plain-language testing.',
};

export default lesson;
