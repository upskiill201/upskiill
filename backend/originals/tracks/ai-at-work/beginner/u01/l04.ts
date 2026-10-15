import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 1 · Lesson 4 — free. Adding a role, and putting the whole recipe together. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Role, goal, format',
  summary: 'Tell it who to be, what to achieve, and what shape the answer should take.',
  minutes: 12,
  outcomes: [
    'Give an AI tool a useful role',
    'Write a request with a role, a goal and a format',
    'Choose a format that fits what you will do with the answer',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Build a request in four steps',
      steps: [
        {
          title: 'Give it a role',
          body: 'Who should it act as? A role sets the expertise and the voice in one line. "You are an editor who writes for busy clients."',
        },
        {
          title: 'Give it a goal',
          body: 'What must the answer achieve? Not "write an email", but what the email is for. "Get Lucía to approve the palette by Wednesday."',
        },
        {
          title: 'Give it a format',
          body: 'What shape should the answer take? Lines, bullets, a table, a subject line plus body. "Five lines, one question at the end."',
        },
        {
          title: 'Add the facts, then put it together',
          body: 'Role, goal, format, then the facts it needs from Who, What, Why, How.',
          code:
            'You are an editor who writes for busy clients.\nGoal: get Lucía to approve the colour palette by Wednesday.\nFormat: five lines, one question at the end.\nFacts: sign-up screens are done; testing moved to Friday.',
          language: 'plaintext',
        },
      ],
    },
    {
      kind: 'compare',
      title: 'What a role changes',
      before: { label: 'No role', text: 'Explain what a "conversion rate" is.' },
      after: {
        label: 'With a role',
        text: 'You are a friendly teacher explaining to someone on their first week in marketing. Explain what a "conversion rate" is in 3 sentences, with one everyday example.',
      },
      notes: [
        'The role sets the level: a beginner, not an expert.',
        'The format keeps it short: 3 sentences.',
        'Asking for an example makes it stick.',
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Pick the format for what you will DO with the answer: bullets to scan, a table to compare, lines to send.',
    },
    {
      kind: 'check',
      question: 'Which part is the role? "You are a recruiter. Write 3 interview questions for a junior designer, as a numbered list."',
      options: ['You are a recruiter', 'Write 3 interview questions', 'As a numbered list'],
      answer: 0,
    },
  ],
  apply: {
    scenario: 'Ada is building full requests with a role, a goal and a format.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Role, goal or format?',
        groups: ['Role', 'Goal', 'Format'],
        items: [
          { text: 'You are a friendly recruiter', group: 0 },
          { text: 'Get a reply before Friday', group: 1 },
          { text: 'A table with 3 columns', group: 2 },
          { text: 'You are an experienced editor', group: 0 },
          { text: 'Help the team agree on one option', group: 1 },
          { text: 'Five bullet points', group: 2 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What does a role mostly change in the answer?',
        options: [
          { text: 'The expertise and the voice' },
          { text: 'The facts', why: 'Facts come from you. A role changes how it is said.' },
          { text: 'Nothing, it is just decoration', why: 'A role changes the level and tone a lot.' },
        ],
        answer: 0,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build a role for explaining things to a beginner.',
        tiles: ['You', 'are', 'a', 'patient', 'teacher'],
        distractors: ['angry', 'robot'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match what Ada will do with the answer to the best format.',
        pairs: [
          ['Compare three tools', 'A table'],
          ['Scan it in a meeting', 'Bullet points'],
          ['Send it to a client', 'A short email'],
          ['Follow it step by step', 'A numbered list'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: "Can you send me the three design options in a way I can compare quickly? I'm deciding today.",
        prompt: 'Which request should Ada give the AI?',
        options: [
          { text: 'Describe our three design options.', why: 'It ignores "compare quickly". She will get three long paragraphs.' },
          { text: 'Put our three design options in a table: name, main benefit, main risk, cost. One row each.' },
          { text: 'Write a long essay about design.', why: 'She is deciding today. An essay slows her down.' },
        ],
        answer: 1,
        explanation: 'She needs to compare, so the right format is a table.',
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Ada\'s request.',
        template: 'You are an [[1]] who writes for busy clients. Goal: get Lucía to [[2]] the palette. Format: five [[3]].',
        blanks: [['editor'], ['approve'], ['lines']],
        distractors: ['astronaut', 'forget', 'pages'],
      },
      {
        kind: 'findBug',
        prompt: 'Spot the problem: which line is the wrong format for the goal?',
        lines: [
          'You are a helpful assistant for a busy manager.',
          'Goal: help her decide between two suppliers in 2 minutes.',
          'Format: a 2,000-word report.',
          'Facts: Supplier A is cheaper; Supplier B delivers faster.',
        ],
        bug: 2,
        fix: 'Format: a two-row table (price, speed, risk), then one recommendation line.',
        explanation: 'A 2-minute decision needs something she can scan, not 2,000 words.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Lucía wants to compare options side by side. Which format? (one word)',
        answers: ['table', 'a table'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Ada needs a quick explanation of "API" before a meeting with developers. Which request is best?',
        options: [
          { text: 'What is an API?', why: 'It will answer at a random level, maybe very technical.' },
          {
            text: 'You are a patient teacher. Explain what an API is to a designer with no coding background, in 3 sentences with one everyday example.',
          },
          { text: 'Explain APIs in full technical detail.', why: 'She has a meeting soon and no coding background.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Put Ada\'s request in the recipe order.',
        lines: [
          'You are an editor who writes for busy clients.',
          'Goal: get Lucía to approve the palette by Wednesday.',
          'Format: five lines, one question at the end.',
          'Facts: sign-up screens done; testing moved to Friday.',
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Rewrite one request you made recently with a role, a goal and a format. What did each part add?',
    starters: ['Role: ...', 'Goal: ...', 'Format: ...'],
  },
  deepen: {
    title: 'Try it today',
    summary: 'Ask the same question twice: once with no role, once with a role. Compare the level and the tone.',
  },
  notes: 'Role/goal/format is common prompting practice; presented generically. No statistics.',
};

export default lesson;
