import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 1 · Chapter 2 · Lesson 3 — tutorials vs. real problems. Before / After. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Tutorials vs. real problems',
  summary: 'Miracle opens Clinton\'s GitHub and reads it like a recruiter: "To-do app. Weather app. Calculator. I\'ve seen these exact three 200 times." Then she shows him what one real project looks like next to them.',
  minutes: 11,
  outcomes: ['Explain why tutorial projects don\'t stand out', 'Describe what makes a project "real"', 'Turn a tutorial skill into a real project idea'],
  learn: [
    {
      kind: 'compare',
      title: 'Two portfolios, same skills',
      before: { label: 'Tutorial projects', text: 'To-do app (from a YouTube course)\nWeather app (from a YouTube course)\nCalculator (from a YouTube course)\n\nAll three teach real skills. But thousands of people built the exact same thing, following the same video. They show you can follow instructions, not that you can solve a problem nobody gave you the answer to.' },
      after: { label: 'One real project', text: 'Njangi Tracker: a small app my mum\'s savings group uses to track who paid and who\'s next. Built because 12 members argued every month about payments.\n\nSame skills (forms, a list, saving data), but now there\'s a real problem, real users and a result. Nobody else has this project.' },
      notes: [
        'Tutorials are great for learning. Keep them, but don\'t lead with them.',
        'A real project has three things: a real problem, real people who use it, and a result.',
        'Take a skill from a tutorial and point it at a problem near you.',
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Real problem, real users, real result. That\'s what turns practice into proof.',
    },
  ],
  apply: {
    scenario: 'Clinton rethinks his GitHub.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What do tutorial projects mostly show a recruiter?',
        options: [
          { text: 'That you can solve new problems', why: 'Tutorials give you the answer. They show you can follow steps.' },
          { text: 'That you can follow instructions' },
          { text: 'Nothing at all', why: 'They do show learning. They just don\'t stand out.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each part of a real project to the Njangi Tracker.',
        pairs: [
          ['Real problem', 'Members argue about who paid'],
          ['Real users', 'Twelve women in his mum\'s njangi'],
          ['Result', 'No more payment arguments'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Tutorial practice, or real project?',
        groups: ['Tutorial practice', 'Real project'],
        items: [
          { text: 'A weather app from a video course', group: 0 },
          { text: 'A sign-up form the meet-up actually uses', group: 1 },
          { text: 'A calculator copied step by step', group: 0 },
          { text: 'A stock sheet for his aunt\'s stall', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'So should I delete my tutorial projects?',
        options: [
          { text: 'Keep them for learning, but lead with the real project. Put it first.' },
          { text: 'Yes, delete everything.', why: 'They show learning. Just don\'t lead with them.' },
          { text: 'Make ten more tutorials.', why: 'More of the same won\'t stand out.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Clinton learned to build forms in a tutorial. Which real project uses that skill?',
        options: [
          { text: 'Another tutorial form', why: 'Still practice. Point the skill at a real problem.' },
          { text: 'A sign-up form for the tech meet-up, so he stops collecting names on WhatsApp' },
          { text: 'A form nobody will ever use', why: 'Real users make it real.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the project missing a real result.',
        lines: ['Fixtures sheet: captains stopped double-booking pitches.', 'Weather app: it shows the weather.', 'Meet-up sign-up form: 25 sign-ups in the first week.'],
        bug: 1,
        explanation: 'No problem solved, no users, no change. Just a copy that works.',
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the rule.',
        template: 'Real problem, real [[1]], real [[2]].',
        blanks: [['users', 'people'], ['result']],
        distractors: ['tutorial', 'video', 'code'],
      },
      {
        kind: 'mcq',
        prompt: 'Why does nobody else have the Njangi Tracker?',
        options: [
          { text: 'It came from a problem in Clinton\'s own life, not from a video' },
          { text: 'It\'s secret', why: 'It\'s not secret. It\'s unique because the problem is his.' },
          { text: 'It uses rare technology', why: 'It uses common skills. The problem is what makes it unique.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which kind of project should Clinton put first: tutorial or real?',
        answers: ['real'],
        placeholder: 'One word',
      },
      {
        kind: 'sortGroups',
        prompt: 'Turn each tutorial skill into a real project idea, or not?',
        groups: ['Real idea', 'Still just practice'],
        items: [
          { text: 'To-do skills → a chore rota for his flatmates', group: 0 },
          { text: 'To-do skills → another to-do app', group: 1 },
          { text: 'Chart skills → a chart of the meet-up\'s growth', group: 0 },
          { text: 'Chart skills → a chart of made-up data', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Think of something you learned by following steps (a recipe, a tutorial, a class). What real problem near you could you point that skill at?',
    starters: ['I learned to...', 'I could use it to fix...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Write one sentence for a real project idea: "I\'ll build/make ___ for ___ because ___ keeps going wrong."',
  },
  notes: 'Advice to lead with original projects over tutorial clones is common recruiter and developer-community guidance. Same structure works outside tech (see l06).',
};

export default lesson;
