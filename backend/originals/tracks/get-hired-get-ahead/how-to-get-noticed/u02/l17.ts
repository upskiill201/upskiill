import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 1 · Chapter 2 · Lesson 17 — "Can you build ours too?" Scope creep and agreeing a small scope. Story with a choice. */
const lesson: OriginalLesson = {
  key: 'l17',
  title: '"Can you build ours too?"',
  summary: 'Word spreads. The church women\'s group wants a tracker too. Then a member asks for "just a small extra": reminders, a chart, an app, a website, and could it also do the choir rota? For free.',
  minutes: 12,
  outcomes: ['Recognise scope creep', 'Agree a small, clear scope before you start', 'Say no to extras politely, without losing the opportunity'],
  learn: [
    {
      kind: 'story',
      title: 'Just one more thing',
      beats: [
        { speaker: 'narrator', text: 'Sunday after church. Mrs Tanyi from the women\'s group stops Clinton at the gate.' },
        { speaker: 'narrator', text: '"Your mother says you built a magic book for her njangi! Can you make one for our group? We\'re 30 women. And it should send everyone reminders. And show charts. And be an app. And maybe run the choir rota too? For the church, so free, of course."' },
        { speaker: 'clinton', text: '(thinking) That\'s five projects. Plus a website. Plus the choir.' },
        { speaker: 'tey', text: 'This is called scope creep: a project that keeps growing, one "small extra" at a time, until it never finishes. It happens in every job. Learning to agree a clear scope, politely, is a skill managers will love you for.' },
      ],
      choice: {
        prompt: 'What should Clinton say to Mrs Tanyi?',
        options: [
          {
            text: '"I\'d love to help. I can set up the same tracker for your 30 members in two weeks. Reminders and charts could be a second step later."',
            outcome: 'Mrs Tanyi agrees. Two weeks later the group is using it, and Clinton has a second portfolio piece with 30 users. The choir rota can wait.',
            best: true,
          },
          {
            text: '"Yes to everything!"',
            outcome: 'Three months later: half an app, no charts, a confused choir and no finished piece. Everyone\'s disappointed, including Clinton.',
          },
          {
            text: '"No, I\'m too busy."',
            outcome: 'Safe, but he loses a second portfolio piece with 30 real users and a chance to practise saying "yes, and here\'s what I can do".',
          },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Say yes to a small, clear version, with a date. Put extras on a "later" list. Agree it before you start.',
    },
  ],
  apply: {
    scenario: 'Clinton agrees a scope with the church group.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What is scope creep?',
        options: [
          { text: 'A project that keeps growing with "small extras" until it never finishes' },
          { text: 'A scary bug', why: 'Not a bug: a project that keeps growing.' },
          { text: 'A project that finishes early', why: 'The opposite: it never finishes.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'In the first version, or later?',
        groups: ['First version', 'Later'],
        items: [
          { text: 'The tracker for 30 members', group: 0 },
          { text: 'Monthly reminders', group: 1 },
          { text: 'Charts', group: 1 },
          { text: 'The choir rota', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'Mrs Tanyi just asked for reminders too. How do I say not yet without sounding rude?',
        options: [
          { text: '"Great idea! Let\'s get the tracker working for everyone first, then reminders can be step two."' },
          { text: '"No."', why: 'Too blunt. Say yes to the idea, and when.' },
          { text: '"Sure, I\'ll add it now."', why: 'That\'s how scope creep starts.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Put the scope conversation in order.',
        lines: ['Thank them and say you\'d love to help', 'Offer a small, clear first version', 'Give a date', 'Put extras on a later list'],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that invites scope creep.',
        lines: ['First version: the tracker for 30 members.', 'Done in two weeks.', 'And anything else you think of, I\'ll add as we go.'],
        bug: 2,
        explanation: '"Anything else as we go" means it never ends. Extras go on a later list.',
      },
      {
        kind: 'mcq',
        prompt: 'Why is agreeing a scope a skill employers value?',
        options: [
          { text: 'In every job, work grows unless someone agrees what\'s in and what\'s not' },
          { text: 'It isn\'t, employers want you to say yes to everything', why: 'They want delivery. Clear scope makes delivery possible.' },
          { text: 'It only matters for software', why: 'Events, reports, campaigns: everything creeps.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each request to a good answer.',
        pairs: [
          ['Can it send reminders?', 'Step two, after the tracker works'],
          ['Can it run the choir rota?', 'A separate project, later'],
          ['When will it be ready?', 'In two weeks, for 30 members'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the rule.',
        template: 'Say yes to a [[1]], clear version, with a [[2]].',
        blanks: [['small'], ['date', 'deadline']],
        distractors: ['huge', 'logo', 'price'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'A project that keeps growing until it never finishes suffers from scope ___. (one word)',
        answers: ['creep'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which reply keeps the opportunity AND the scope?',
        options: [
          { text: '"Yes to everything, for free, starting today."', why: 'Scope creep, guaranteed.' },
          { text: '"I\'ll set up the tracker for your 30 members in two weeks. Let\'s talk about reminders after."' },
          { text: '"I don\'t do church projects."', why: 'Loses a great second portfolio piece.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'Has a task or favour ever grown far beyond what you agreed? What could you have said at the start?',
    starters: ['It started as...', 'I could have said...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'For your own portfolio piece, write a one-line scope: "Version 1 does ___ for ___ by ___ (date). Later: ___."',
  },
  notes: 'Scope creep is a standard project-management term (e.g. PMI guidance). Mrs Tanyi is a named extra (church women\'s group, Buea). Second piece: 30 users, same tracker, consistent with the case-study climax.',
};

export default lesson;
