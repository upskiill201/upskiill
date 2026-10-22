import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 8 · Lesson 19 — Ada's presentation recipe. */
const lesson: OriginalLesson = {
  key: 'l19',
  title: 'Your presentation recipe',
  summary: 'Everything from Unit 8 in one recipe Ada can reuse for any talk: from outline to the last question.',
  minutes: 12,
  outcomes: [
    'Use a seven-step presentation recipe',
    'Link each step to a lesson in this unit',
    'Know where AI helps and where you decide',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Ada\'s presentation recipe',
      steps: [
        { title: '1. Audience, time, goal', body: 'Then ask AI for a one-line-per-slide outline.' },
        { title: '2. Story', body: 'Situation, problem, answer, ask. Read the titles in order.' },
        { title: '3. Slides', body: 'One idea per slide, the title is the point, detail in notes.' },
        { title: '4. Visuals', body: 'Simple diagrams, real charts, real photos with permission, AI images only for mood, all in your template.' },
        { title: '5. Notes', body: 'Three bullets per slide in your voice. Memorise the first and last line.' },
        { title: '6. Feedback', body: 'AI as your audience, "be direct". Then one real person who knows them.' },
        { title: '7. Rehearse and prepare', body: 'Out loud, timed. AI plays your toughest listener. Short answers, backup slides, honest "I don\'t know yet".' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Goal, story, slides, visuals, notes, feedback, rehearse. AI drafts and challenges; you decide and deliver.',
    },
  ],
  apply: {
    scenario: 'Ada writes down her recipe.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the recipe.',
        lines: ['Audience, time, goal', 'Story', 'Slides', 'Visuals', 'Notes', 'Feedback', 'Rehearse and prepare'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the step to the lesson.',
        pairs: [
          ['Story', 'Telling a story with slides'],
          ['Visuals', 'Image tools: what they\'re good at'],
          ['Feedback', 'Feedback on your slides'],
          ['Rehearse', 'Practising your talk with AI'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'AI drafts or challenges, or Ada decides?',
        groups: ['AI helps', 'Ada decides'],
        items: [
          { text: 'A first outline', group: 0 },
          { text: 'What the ask is', group: 1 },
          { text: 'Likely questions', group: 0 },
          { text: 'Which slides to cut', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Which step catches unanswered questions?',
        options: [
          { text: 'Visuals', why: 'Rehearsal does.' },
          { text: 'Rehearse and prepare' },
          { text: 'Notes', why: 'Rehearsal does.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Can I borrow your recipe for my team\'s quarterly review?',
        prompt: 'Best reply from Ada?',
        options: [
          { text: 'It only works for founders.', why: 'It works for any talk.' },
          { text: 'Just let the AI make it.', why: 'AI helps; you decide.' },
          { text: 'Of course. Start with step 1: audience, time and goal in one line each. Everything else follows.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the summary.',
        template: 'AI drafts and [[1]]; you [[2]] and deliver.',
        blanks: [['challenges'], ['decide']],
        distractors: ['decides', 'sleep'],
      },
      {
        kind: 'findBug',
        prompt: 'Which step in Lucía\'s version is a mistake?',
        lines: [
          '1. Audience, time, goal',
          '2. Ask AI to design all slides, then start the story',
          '3. Notes in my voice',
          '4. Rehearse out loud',
        ],
        bug: 1,
        fix: '2. Story first, then slides.',
        explanation: 'Design comes after the story is fixed.',
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the recipe\'s first step.',
        tiles: ['Audience,', 'time,', 'goal'],
        distractors: ['font'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many steps are in the recipe?',
        answers: ['7', 'seven'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Which step is this?',
        groups: ['Slides', 'Visuals'],
        items: [
          { text: 'Title is the point', group: 0 },
          { text: 'Real photo with permission', group: 1 },
          { text: 'Detail in notes', group: 0 },
          { text: 'Simple diagram, 3-5 boxes', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why is the recipe in this order?',
        options: [
          { text: 'Each step builds on the one before; the story must exist before slides' },
          { text: 'Alphabetical', why: 'It\'s logical order.' },
          { text: 'Random', why: 'Each builds on the last.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the simplest step to try this week?',
        options: [
          { text: 'Redesigning every old deck', why: 'Start small.' },
          { text: 'All seven at once', why: 'One at a time.' },
          { text: 'Asking for a one-line-per-slide outline before designing' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Which step of the recipe do you usually skip? What will you do instead?',
    starters: ['I skip...', 'Next time...'],
  },
  deepen: { title: 'Try it today', summary: 'Save the seven steps as a checklist for your next talk.' },
  notes: 'Summary of Unit 8.',
};

export default lesson;
