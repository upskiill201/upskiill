import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 1 · Chapter 5 · Lesson 16 — LinkedIn and online-profile myths. Myth or Fact. */
const lesson: OriginalLesson = {
  key: 'l16',
  title: 'Profile myths',
  summary: '"LinkedIn is only for people with jobs." "You need 500 connections." "Recruiters don\'t check." The group chat has opinions again. Myth or fact?',
  minutes: 11,
  outcomes: ['Spot common myths about professional profiles', 'Know what actually matters', 'Start without waiting to be "ready"'],
  learn: [
    {
      kind: 'myth',
      statements: [
        { text: 'LinkedIn is only for people who already have jobs.', isFact: false, explain: 'Students and graduates use it to be found, follow companies and connect with people in their field. It\'s most useful before you have a job.' },
        { text: 'You need hundreds of connections before a profile is worth having.', isFact: false, explain: 'A clear, honest profile works with 30 connections. Quality of profile matters more than count.' },
        { text: 'Recruiters often look candidates up before interviews.', isFact: true, explain: 'Checking a candidate\'s professional profile is common practice. Make sure it matches your CV.' },
        { text: 'Your headline and photo are some of the most important parts.', isFact: true, explain: 'They\'re what people see in search results, comments and messages before they click.' },
        { text: 'Posting every day is the only way to get noticed.', isFact: false, explain: 'One or two useful posts a month is plenty. A strong profile matters more than constant posting.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'You don\'t need a job, a big network or daily posts. You need a clear, honest profile that matches your CV.',
    },
  ],
  apply: {
    scenario: 'Clinton busts the group chat\'s myths.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Fact', 'Myth'],
        items: [
          { text: 'Recruiters often look candidates up', group: 0 },
          { text: 'You need 500 connections first', group: 1 },
          { text: 'Headline and photo matter a lot', group: 0 },
          { text: 'Only employed people use LinkedIn', group: 1 },
          { text: 'You must post daily', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'david',
        message: 'I only have 12 connections. Is my profile pointless?',
        options: [
          { text: 'Yes, delete it.', why: 'The profile is what matters.' },
          { text: 'No: a clear profile that matches your CV works with 12. Connections grow over time.' },
          { text: 'Buy connections.', why: 'Never. Fake networks help nobody.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        prompt: 'When is LinkedIn most useful?',
        options: [
          { text: 'Only after you\'re a manager', why: 'Students benefit a lot.' },
          { text: 'Never for graduates', why: 'Recruiters search for graduates.' },
          { text: 'Before you have a job, to be found and connect' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the myth.',
        lines: ['A clear photo helps people recognise you.', 'Recruiters never look at profiles.', 'Your profile should match your CV.'],
        bug: 1,
        explanation: 'Checking profiles before interviews is common.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each myth to the truth.',
        pairs: [
          ['You need 500 connections', 'A clear profile works with 30'],
          ['Post every day', 'One or two useful posts a month'],
          ['Only for people with jobs', 'Most useful before your first job'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'What\'s the one thing Clinton actually needs?',
        options: [
          { text: 'A clear, honest profile that matches his CV' },
          { text: 'A thousand followers', why: 'Not needed.' },
          { text: 'A paid premium account', why: 'A free profile works.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Tey\'s tip.',
        template: 'You need a [[1]], honest profile that [[2]] your CV.',
        blanks: [['clear'], ['matches']],
        distractors: ['famous', 'beats', 'hides'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'About how many useful posts a month is plenty? (a number)',
        answers: ['1', '2', 'one', 'two', '1 or 2', 'one or two'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Worth doing this week, or not needed?',
        groups: ['Worth doing', 'Not needed'],
        items: [
          { text: 'Fix headline and photo', group: 0 },
          { text: 'Buy a premium account', group: 1 },
          { text: 'Connect with five people you\'ve met', group: 0 },
          { text: 'Post ten times', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'Someone says recruiters only care about your CV, not your profile. True?',
        options: [
          { text: 'True, ignore the profile.', why: 'Profiles get checked and searched.' },
          { text: 'They only care about the profile.', why: 'Both matter.' },
          { text: 'They often check both, and compare them. Both need to be honest and match.' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Which myth has stopped you from building a profile, or from finishing it?',
    starters: ['The myth was...', 'Now I\'ll...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Pick the one profile section you\'ve been putting off and finish it today.',
  },
  notes: 'Myths reflect common misconceptions; claims kept qualitative (no platform statistics).',
};

export default lesson;
