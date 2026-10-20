import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 3 · Chapter 4 · Lesson 12 — where skills actually come from: work, people, courses. Card deck (text). */
const lesson: OriginalLesson = {
  key: 'l12',
  title: 'Where skills come from',
  summary: 'Clinton thinks building a skill means buying a course. Ngozi tells him most of what she knows came from three places, and courses were the smallest one.',
  minutes: 11,
  outcomes: ['Name three sources of skill growth', 'Balance work, people and courses', 'Find growth inside your current job'],
  learn: [
    {
      kind: 'text',
      html: '<p><strong>1. Stretch work.</strong> Projects slightly beyond what you can do today. Clinton\'s user-research summary was one. Most of what people learn at work comes from doing hard, real things.</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>2. People.</strong> Feedback, mentors, watching someone skilled, pairing. Aïcha\'s one comment taught Clinton more than a chapter of a book.</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>3. Structured learning.</strong> Courses, books, workshops. Useful for foundations and vocabulary, best when you use them straight away on real work.</p>',
    },
    {
      kind: 'check',
      question: 'Clinton wants to get better at writing product specs. What\'s the best first step?',
      options: ['Buy three courses', 'Write a real spec and ask Aïcha to review it', 'Wait until he\'s a product manager'],
      answer: 1,
      explanation: 'Real work plus feedback. A course can help alongside it.',
    },
    {
      kind: 'text',
      html: '<p><strong>A rough rule.</strong> A popular rule of thumb, often called "70-20-10", suggests most development comes from experience, some from people, and a little from courses. The exact numbers aren\'t research-proven, but the order is a useful reminder.</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>Inside your job.</strong> Ask your manager for one stretch task in your plan\'s direction. Clinton asks Ngozi: "Could I lead the user research for the sync-service split?"</p>',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Stretch work first, then people, then courses, used straight away. Ask for one stretch task.',
    },
  ],
  apply: {
    scenario: 'Clinton plans how to build skills.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Which source of growth?',
        groups: ['Stretch work', 'People'],
        items: [
          { text: 'Leading the user research', group: 0 },
          { text: 'Aïcha\'s review comment', group: 1 },
          { text: 'Writing a real spec', group: 0 },
          { text: 'Pairing with Paul', group: 1 },
          { text: 'Running a driver interview', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What does "70-20-10" remind you of?',
        options: [
          { text: 'Most growth comes from experience, then people, then courses' },
          { text: 'An exact proven formula', why: 'It\'s a rule of thumb, not proven numbers.' },
          { text: 'A salary split', why: 'It\'s about how people learn.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each source to an example.',
        pairs: [
          ['Stretch work', 'User research for the split'],
          ['People', 'Feedback from Aïcha'],
          ['Courses', 'A short course on product specs'],
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick Clinton\'s stretch-task ask.',
        from: 'clinton',
        message: 'How do I ask Ngozi for a stretch task?',
        options: [
          { text: '"Could I lead the user research for the sync-service split? It fits my plan and helps the team."' },
          { text: '"Give me something hard."', why: 'Be specific and tie it to the plan.' },
          { text: 'Don\'t ask.', why: 'Ask for one stretch task.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the weakest way to build a skill.',
        lines: ['Write a real spec and get it reviewed.', 'Buy five courses and watch none.', 'Pair with someone skilled.'],
        bug: 1,
        explanation: 'Unused courses don\'t build skills.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put the sources in their usual order of impact.',
        lines: ['Stretch work', 'People', 'Courses'],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'When are courses most useful?',
        options: [
          { text: 'When you use them straight away on real work' },
          { text: 'Instead of real work', why: 'Alongside real work.' },
          { text: 'Never', why: 'They help with foundations.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the tip.',
        template: '[[1]] work first, then people, then [[2]].',
        blanks: [['Stretch'], ['courses']],
        distractors: ['Easy', 'nothing', 'luck'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'In "70-20-10", which number is for courses? (a number)',
        answers: ['10', 'ten'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Builds the skill, or just looks like it?',
        groups: ['Builds it', 'Looks like it'],
        items: [
          { text: 'A reviewed spec', group: 0 },
          { text: 'A certificate with no practice', group: 1 },
          { text: 'Running interviews', group: 0 },
          { text: 'Bookmarking articles', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'For one skill you want, what stretch work, which person, and what course (if any) would help?',
    starters: ['Stretch work:', 'Person:'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Ask your manager, teacher or mentor for one stretch task in the direction you want. Be specific.',
  },
  notes: 'The 70-20-10 model is usually attributed to McCall, Lombardo & Eichinger (Center for Creative Leadership, 1980s); its numbers lack strong empirical support, so the lesson calls it a rule of thumb.',
};

export default lesson;
