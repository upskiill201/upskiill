import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 3 · Chapter 1 · Lesson 8 — earning the trust of a senior colleague. Step-by-step. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Earning Paul',
  summary: 'Paul knows everything and explains nothing. Clinton could avoid him, or win him over. Miracle says senior people rarely trust new people because they\'re nice. They trust them because they\'re easy to help.',
  minutes: 12,
  outcomes: ['Make yourself easy to help', 'Respect a senior colleague\'s time', 'Turn small help into a working relationship'],
  learn: [
    {
      kind: 'steps',
      title: 'Four steps to earn a senior\'s trust',
      steps: [
        { title: '1. Do your homework first', body: 'Read the docs and try for a while before asking. When Clinton asks, he says what he read and tried. Paul notices.' },
        { title: '2. Ask small, specific questions', body: '"Is the request ID added in the middleware or in each handler?" takes Paul ten seconds. "How does logging work?" takes an hour, so Paul avoids it.' },
        { title: '3. Use the answer, visibly', body: 'Paul\'s tip shows up in Clinton\'s next pull request. Nothing tells a senior person "worth helping" like seeing their advice used.' },
        { title: '4. Give something back', body: 'Clinton adds the logging rule to the onboarding doc and credits Paul. A week later, he spots a typo in Paul\'s README and fixes it. Small, but it counts.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Homework first. Small, specific questions. Use the answer where they\'ll see it. Give something back.',
    },
  ],
  apply: {
    scenario: 'Clinton wins Paul over.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the steps in order.',
        lines: ['Do your homework first', 'Ask small, specific questions', 'Use the answer, visibly', 'Give something back'],
      },
      {
        kind: 'mcq',
        prompt: 'Why do senior people trust new people, according to Miracle?',
        options: [
          { text: 'Because they\'re very nice', why: 'Nice helps, but easy to help matters more.' },
          { text: 'Because they\'re easy to help' },
          { text: 'Because they flatter them', why: 'Being easy to help matters more.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Small and specific, or too big?',
        groups: ['Specific', 'Too big'],
        items: [
          { text: 'Is the request ID added in the middleware?', group: 0 },
          { text: 'How does logging work?', group: 1 },
          { text: 'Should this test mock the network?', group: 0 },
          { text: 'Can you explain the whole system?', group: 1 },
          { text: 'Which branch do hotfixes go on?', group: 0 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the step that will make Paul avoid Clinton.',
        lines: ['Reads the docs before asking.', 'Asks Paul to explain the whole architecture, now.', 'Uses Paul\'s tip in his next PR.'],
        bug: 1,
        explanation: 'An hour-long ask. Make it small and specific.',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best question for Paul.',
        from: 'clinton',
        message: 'I read the logging docs. What do I ask Paul?',
        options: [
          { text: '"Logging is confusing, help?"', why: 'Say what you read; ask one thing.' },
          { text: 'Nothing, guess.', why: 'A specific question is welcome.' },
          { text: '"I read the logging page. Is the request ID added in the middleware or in each handler?"' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each step to Clinton\'s action.',
        pairs: [
          ['Homework first', 'Reads the logging page'],
          ['Use it visibly', 'Paul\'s tip in his next PR'],
          ['Give back', 'Adds the rule to the onboarding doc, crediting Paul'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'What tells a senior person "worth helping" most?',
        options: [
          { text: 'Seeing their advice used' },
          { text: 'A thank-you gift', why: 'Seeing their advice used.' },
          { text: 'Agreeing with everything they say', why: 'Using their advice.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the tip.',
        template: 'Homework [[1]]. Small, specific [[2]].',
        blanks: [['first'], ['questions']],
        distractors: ['later', 'demands', 'jokes'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'About how many seconds does a small, specific question take Paul? (a number)',
        answers: ['10', 'ten'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Gives something back, or not?',
        groups: ['Gives back', 'Doesn\'t'],
        items: [
          { text: 'Fixing a typo in his README', group: 0 },
          { text: 'Taking credit for his tip', group: 1 },
          { text: 'Crediting him in the onboarding doc', group: 0 },
          { text: 'Ignoring his advice', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Who is the "Paul" in your world: someone who knows a lot but doesn\'t explain much? How could you be easier to help?',
    starters: ['My Paul is...', 'I could...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Next time you ask someone senior for help, say what you tried first, and ask one specific question. Then show them you used the answer.',
  },
  notes: 'Paul Tabi (CastId paul) is course-only cast. Common workplace advice.',
};

export default lesson;
