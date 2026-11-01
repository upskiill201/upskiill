import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 1 · Lesson 13 — flip it: let the AI interview you before it writes. */
const lesson: OriginalLesson = {
  key: 'l13',
  title: 'Let the AI ask you questions first',
  summary: "Not sure what context to give? Ask the AI what it needs to know. It's surprisingly good at that.",
  minutes: 12,
  outcomes: [
    'Ask the AI to question you before it writes',
    'Limit the questions so it stays quick',
    'Tell it to ask instead of guessing',
  ],
  learn: [
    {
      kind: 'story',
      title: 'The proposal Ada did not know how to start',
      beats: [
        { speaker: 'narrator', text: "Thursday. Ada's manager asks her to draft a short proposal: should the team add a dark mode to the app?" },
        { speaker: 'ada', text: "I don't even know what a proposal like this should include. What do I tell the AI?" },
        { speaker: 'tey', text: "Then don't guess. Flip it around. Let the AI ask YOU the questions." },
        { speaker: 'narrator', text: 'Ada types: "I need to write a one-page proposal for adding dark mode to our app. Before you write anything, ask me up to 5 questions."' },
        { speaker: 'narrator', text: 'The AI asks: who decides, what problem does it solve, how much work is it, any user requests, and what is the deadline?' },
        { speaker: 'ada', text: 'Oh. Those are exactly the things my manager will ask.' },
      ],
      choice: {
        prompt: 'Ada answers four of the five questions but does not know the workload. What should she do?',
        options: [
          {
            text: 'Say "I don\'t know the workload yet. Mark it as an open question in the proposal."',
            outcome: 'The proposal flags it honestly: "Workload estimate: pending from the developers." Her manager likes that it doesn\'t pretend.',
            best: true,
          },
          {
            text: 'Tell the AI to guess the workload.',
            outcome: 'It writes "about 2 weeks". Nobody said that. Her manager asks where the number came from.',
          },
          {
            text: 'Skip the question and hope it does not notice.',
            outcome: 'The AI fills the gap anyway, with a confident-sounding estimate. Same problem, less visible.',
          },
        ],
      },
    },
    {
      kind: 'compare',
      title: 'Guessing vs asking',
      before: { label: 'It guesses', text: 'Write a proposal for adding dark mode to our app.' },
      after: {
        label: 'It asks first',
        text: 'I need a one-page proposal for adding dark mode to our app. Before writing, ask me up to 5 questions. If anything is still unclear after that, ask instead of guessing.',
      },
      notes: ['It surfaces the context you forgot.', 'A limit keeps it quick.', '"Ask instead of guessing" protects you from invented facts.'],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Useful line to keep: "If anything is unclear, ask me instead of guessing."',
    },
    {
      kind: 'check',
      question: 'Why limit the AI to "up to 5 questions"?',
      options: ['So it stays quick and asks only what matters most', 'Because it can only count to 5', 'So it never asks anything'],
      answer: 0,
    },
  ],
  apply: {
    scenario: 'Ada is letting the AI ask first.',
    items: [
      {
        kind: 'mcq',
        prompt: 'When is "ask me questions first" most useful?',
        options: [
          { text: 'For a 2-line reply you already know', why: 'You already know the context. Just give it.' },
          { text: 'When you are not sure what context the task needs' },
          { text: 'Never, it wastes time', why: 'It often saves time by surfacing what you forgot.' },
        ],
        answer: 1,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the line that stops it from inventing facts.',
        tiles: ['If', 'unclear,', 'ask', 'me', 'instead', 'of', 'guessing'],
        distractors: ['always', 'guess'],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: "Could your team write a short case study about our project? I'm not sure what it needs to include.",
        prompt: 'Which request should Ada start with?',
        options: [
          { text: 'Write a case study about our project.', why: 'It will invent the results and the story.' },
          { text: 'Write a very long case study with everything.', why: 'Long and invented is worse.' },
          { text: 'I need a short case study about our project with Lucía\'s company. Before writing, ask me up to 5 questions.' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Ask-first, or just give the context?',
        groups: ['Let it ask first', 'Just give the context'],
        items: [
          { text: 'A proposal for something you have never written', group: 0 },
          { text: 'A 2-line "thanks, received" reply', group: 1 },
          { text: 'A plan for a project you are unsure about', group: 0 },
          { text: 'Fixing a typo in a sentence', group: 1 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the ask-first request.',
        template: 'Before you write [[1]], ask me up to [[2]] questions.',
        blanks: [['anything'], ['5', 'five', '3', 'three']],
        distractors: ['nothing', '500'],
      },
      {
        kind: 'findBug',
        prompt: 'Spot the risky instruction.',
        lines: ['Ask me up to 5 questions first.', 'If you are missing a number, just make one up.', 'Then write the one-page proposal.'],
        bug: 1,
        fix: 'If you are missing a number, mark it as an open question.',
        explanation: 'Invented numbers look real. Mark gaps instead.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'If Ada does not know a fact, the proposal should mark it as an ... question (one word)',
        answers: ['open', 'unanswered', 'outstanding'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the AI\'s question to the context it was missing.',
        pairs: [
          ['"Who decides?"', 'The reader'],
          ['"What problem does it solve?"', 'The goal'],
          ['"What is the deadline?"', 'The facts'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Ada must write onboarding notes for Grace, a new colleague, but is not sure what to cover. Which request is best?',
        options: [
          { text: 'Write onboarding notes.', why: 'It does not know your team, tools or Grace.' },
          { text: 'I need one-page onboarding notes for a new designer on our team. Ask me up to 5 questions first, then write them.' },
          { text: 'Write everything a new person could ever need.', why: 'Endless and generic.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Order the ask-first routine.',
        lines: ['Describe the task in one line', 'Ask it to question you first (with a limit)', 'Answer what you know, flag what you do not', 'Let it write'],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: "The AI asked me 15 questions before writing a 3-line email. That's too many!",
        prompt: 'What should Ada suggest?',
        options: [
          { text: 'Answer all 15.', why: 'Too slow for a 3-line email.' },
          { text: 'Add a limit: "ask me up to 3 questions", or just give it the context for short things.' },
          { text: 'Never let it ask questions.', why: 'Useful for bigger tasks. Just add a limit.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Honest gap handling, or risky?',
        groups: ['Honest', 'Risky'],
        items: [
          { text: 'Mark the workload as "estimate pending"', group: 0 },
          { text: 'Let it guess a budget', group: 1 },
          { text: 'Say "I don\'t know yet" in your answer', group: 0 },
          { text: 'Skip the question and hope', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Flip it: let the AI ... you questions (one word)',
        answers: ['ask'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the phrase to what it does.',
        pairs: [
          ['"Ask me questions first"', 'Surfaces missing context'],
          ['"Up to 5"', 'Keeps it quick'],
          ['"Ask instead of guessing"', 'Prevents invented facts'],
        ],
      },
      {
        kind: 'mcq',
        prompt: "Ada's manager asks where \"about 2 weeks\" came from. Ada let the AI guess it. What should she say?",
        options: [
          { text: '"The AI calculated it."', why: 'It guessed. Saying otherwise damages trust.' },
          { text: '"Everyone knows it takes 2 weeks."', why: 'Nobody said that.' },
          { text: '"It was a guess. I\'ll get a real estimate from the developers."' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'What task do you keep putting off because you do not know where to start? What would you ask the AI to question you about?',
    starters: ['The task is...', 'I would say: before writing, ask me...'],
  },
  deepen: { title: 'Try it today', summary: 'Add "If anything is unclear, ask me instead of guessing" to your next three requests.' },
  notes: 'Story is fictional. "About 2 weeks" is the AI\'s invented number in the story, deliberately shown as a mistake.',
};

export default lesson;
